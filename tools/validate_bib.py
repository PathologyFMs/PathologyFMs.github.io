#!/usr/bin/env python3
"""Validate references.bib against authoritative sources.

Every entry is checked against the publisher of record:
  * arXiv preprints  -> the arXiv Atom API (export.arxiv.org)
  * anything with a DOI -> CrossRef (api.crossref.org)
Title, first-author surname and year are compared. Entries with neither an
arXiv id nor a DOI cannot be machine-checked and are reported separately.

Usage:  python3 tools/validate_bib.py [path/to/references.bib]
"""
import html, json, re, subprocess, sys, time, unicodedata, urllib.parse, xml.etree.ElementTree as ET

BIB = sys.argv[1] if len(sys.argv) > 1 else 'references.bib'
UA = 'PFMs-bib-validator (https://github.com/dibalokechanda/PFMs; mailto:dibaloke.chanda@marquette.edu)'

def get(url, tries=3):
    """Return (http_status, body). Retries, because a throttled request must not
    be mistaken for a missing record."""
    for attempt in range(tries):
        r = subprocess.run(['curl', '-sS', '-L', '--max-time', '40', '-A', UA,
                            '-w', '\n%{http_code}', url], capture_output=True, text=True)
        body, _, code = r.stdout.rpartition('\n')
        if code.strip() == '200':
            return 200, body
        if code.strip() == '404':
            return 404, body
        time.sleep(2 * (attempt + 1))
    return (int(code.strip()) if code.strip().isdigit() else 0), body

def norm(t):
    """Compare meaning, not encoding: CrossRef returns HTML entities and BibTeX
    carries LaTeX accents, so 'H&amp;E' and 'Charit\\'e' must fold to the same
    string as 'H&E' and 'Charité'."""
    t = html.unescape(t or '')
    t = re.sub(r"\\['\"^~=.`]\s*", '', t)   # LaTeX accents: \'e -> e
    t = unicodedata.normalize('NFKD', t)
    t = re.sub(r'\{|\}|\\\w+|\$|\^|[\u0300-\u036f]', '', t)
    t = t.replace('–', '-').replace('—', '-').replace('’', "'")
    t = re.sub(r'[^a-z0-9]+', ' ', t.lower())
    return ' '.join(t.split())

def surname(author_field):
    first = (author_field or '').split(' and ')[0].strip().strip('{}')
    if ',' in first:
        return norm(first.split(',')[0])
    return norm(first.split()[-1]) if first.split() else ''

# ---- parse the .bib ----
entries = []
for block in re.split(r'\n(?=@)', open(BIB, encoding='utf-8').read()):
    if not block.lstrip().startswith('@'):
        continue
    def grab(name):
        """Read one field, honouring nested braces. A lazy regex is not enough:
        many entries are a single line, so a pattern anchored on a newline runs
        past every closing brace to the end of the record."""
        m = re.search(r'(?:^|[,{\s])' + name + r'\s*=\s*', block)
        if not m:
            return ''
        i = m.end()
        if i < len(block) and block[i] == '"':
            j = block.index('"', i + 1)
            return ' '.join(block[i + 1:j].split())
        if i >= len(block) or block[i] != '{':
            j = re.search(r'[,}\n]', block[i:])
            return block[i:i + j.start()].strip() if j else block[i:].strip()
        depth, j = 0, i
        while j < len(block):
            if block[j] == '{':
                depth += 1
            elif block[j] == '}':
                depth -= 1
                if depth == 0:
                    break
            j += 1
        return ' '.join(block[i + 1:j].split())
    key = re.match(r'@\w+\{\s*([^,]+),', block.lstrip()).group(1)
    doi = grab('DOI') or grab('doi')
    url = grab('url')
    eprint = grab('eprint')
    if not eprint:
        m = re.search(r'arxiv\.org/abs/([\d.]+)', url or '')
        eprint = m.group(1) if m else ''
    if doi.startswith('http'):
        doi = re.sub(r'^https?://(dx\.)?doi\.org/', '', doi)
    entries.append(dict(key=key, title=grab('title'), author=grab('author'),
                        year=grab('year'), eprint=eprint, doi=doi, url=url))

arx = [e for e in entries if e['eprint']]
crf = [e for e in entries if not e['eprint'] and e['doi']]
non = [e for e in entries if not e['eprint'] and not e['doi']]
print(f"{len(entries)} entries: {len(arx)} arXiv, {len(crf)} DOI, {len(non)} unverifiable\n")

results = []

# ---- arXiv, batched ----
for i in range(0, len(arx), 50):
    chunk = arx[i:i + 50]
    _, xml = get('http://export.arxiv.org/api/query?max_results=100&id_list=' +
                 ','.join(e['eprint'] for e in chunk))
    time.sleep(3)
    ns = {'a': 'http://www.w3.org/2005/Atom'}
    found = {}
    for ent in ET.fromstring(xml).findall('a:entry', ns):
        eid = ent.find('a:id', ns).text
        m = re.search(r'abs/([\d.]+)', eid)
        if not m:
            continue
        authors = [a.find('a:name', ns).text for a in ent.findall('a:author', ns)]
        found[m.group(1)] = dict(title=ent.find('a:title', ns).text,
                                 first=authors[0] if authors else '',
                                 published=ent.find('a:published', ns).text)
    for e in chunk:
        src = found.get(e['eprint'])
        if not src:
            results.append(('NOT FOUND', e, 'arXiv has no record of this id'))
            continue
        problems = []
        if norm(src['title']) != norm(e['title']):
            problems.append(f"title\n        bib:    {e['title']}\n        arXiv:  {' '.join(src['title'].split())}")
        if surname(e['author']) and surname(src['first']) not in surname(e['author']) \
           and surname(e['author']) not in surname(src['first']):
            problems.append(f"first author: bib={surname(e['author'])!r} arXiv={surname(src['first'])!r}")
        results.append(('MISMATCH' if problems else 'OK', e, '; '.join(problems)))

# ---- CrossRef, parallel ----
def check_doi(e):
    status, raw = get('https://api.crossref.org/works/' + urllib.parse.quote(e['doi'], safe='/'))
    if status == 404:
        return ('NOT FOUND', e, 'CrossRef has no record of this DOI')
    try:
        msg = json.loads(raw)['message']
    except Exception:
        return ('UNCHECKED', e, f'CrossRef request failed (HTTP {status}) - not a verdict on the DOI')
    problems = []
    src_title = (msg.get('title') or [''])[0]
    if norm(src_title) != norm(e['title']):
        problems.append(f"title\n        bib:       {e['title']}\n        CrossRef:  {src_title}")
    auths = msg.get('author') or []
    if auths and surname(e['author']):
        fam = norm(auths[0].get('family', ''))
        if fam and fam not in surname(e['author']) and surname(e['author']) not in fam:
            problems.append(f"first author: bib={surname(e['author'])!r} CrossRef={fam!r}")
    yr = ((msg.get('issued') or {}).get('date-parts') or [[None]])[0][0]
    if e['year'] and yr and str(yr) != e['year']:
        problems.append(f"year: bib={e['year']} CrossRef={yr}")
    return ('MISMATCH' if problems else 'OK', e, '; '.join(problems))

for i, e in enumerate(crf):          # serial: CrossRef throttles parallel clients
    results.append(check_doi(e))
    time.sleep(1)
    if (i + 1) % 10 == 0:
        print(f'  ...checked {i + 1}/{len(crf)} DOIs', file=sys.stderr)

for e in non:
    results.append(('UNVERIFIABLE', e, 'no arXiv id and no DOI in the entry'))

# ---- report ----
order = {'NOT FOUND': 0, 'MISMATCH': 1, 'UNCHECKED': 2, 'UNVERIFIABLE': 3, 'OK': 4}
results.sort(key=lambda r: (order[r[0]], r[1]['key']))
counts = {}
for status, e, why in results:
    counts[status] = counts.get(status, 0) + 1
    if status != 'OK':
        print(f"[{status}] {e['key']}\n    {why}\n")
print('summary: ' + '  '.join(f'{k}={v}' for k, v in sorted(counts.items())))
sys.exit(1 if counts.get('NOT FOUND') or counts.get('MISMATCH') else 0)
