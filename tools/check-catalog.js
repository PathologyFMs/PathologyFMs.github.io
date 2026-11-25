const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const { loadCatalog, normalizeBibtex } = require('./catalog');

const root = path.resolve(__dirname, '..');
const catalog = loadCatalog(root);
const models = catalog.flatMap(cat => cat.models);
assert.equal(new Set(catalog.map(cat => cat.category)).size, catalog.length, 'Duplicate category');
for (const cat of catalog) {
    assert.ok(cat.category && cat.models.length, 'Empty category');
    assert.equal(new Set(cat.models.map(m => m.name)).size, cat.models.length, 'Duplicate entry in ' + cat.category);
    if (cat.subcategories) {
        assert.equal(new Set(cat.subcategories).size, cat.subcategories.length, 'Duplicate subsection');
        for (const model of cat.models) assert.ok(cat.subcategories.includes(model.subcategory), 'Missing subsection: ' + model.name);
    }
    for (const model of cat.models) {
        assert.ok(model.name && Number.isInteger(model.year) && model.bibtex, 'Incomplete entry: ' + model.name);
        if (model.date) assert.match(model.date, /^\d{4}-\d{2}-\d{2}$/, 'Invalid date: ' + model.name);
        for (const item of [model, ...(model.variants || [])]) {
            for (const field of ['paper', 'github', 'hf', 'dataset', 'website']) {
                if (item[field]) assert.ok(['http:', 'https:'].includes(new URL(item[field]).protocol), model.name + ': ' + field);
            }
        }
        assert.ok(!model.hf || !/huggingface\.co\/(datasets|spaces)\//.test(model.hf), 'Dataset/demo mislabeled as model weights: ' + model.name);
    }
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const sections = [...readme.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
let rows = 0;
for (const cat of catalog) {
    const section = sections.find(s => s[1].endsWith(cat.category));
    assert.ok(section, 'Missing README category: ' + cat.category);
    if (cat.subcategories) for (const name of cat.subcategories) assert.ok(section[2].includes('### ' + name + '\n'), 'Missing README subsection: ' + name);
    const names = [...section[2].matchAll(/^\| \*\*(.*?)\*\*/gm)].map(m => m[1]);
    assert.deepEqual(names, cat.models.map(m => m.name), 'README membership/order: ' + cat.category);
    rows += names.length;
}
assert.equal(rows, models.length);

const bib = fs.readFileSync(path.join(root, 'references.bib'), 'utf8');
const keys = [...bib.matchAll(/^@\w+\{\s*([^,]+),/gm)].map(m => m[1]);
assert.equal(new Set(keys).size, keys.length, 'Duplicate bibliography key');
const withoutKey = value => normalizeBibtex(value).replace(/^(@\w+\{)[^,]+,/, '$1_,');
const references = new Set(bib.split(/(?=^% .+\n@)/m).slice(1).map(block => withoutKey(block.slice(block.indexOf('\n') + 1))));
for (const model of models) assert.ok(references.has(withoutKey(model.bibtex)), 'Missing reference: ' + model.name);
assert.equal(keys.length, new Set(models.map(m => normalizeBibtex(m.bibtex))).size);

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
assert.ok(canonical, 'Missing canonical website URL');
assert.ok(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').includes('<loc>' + canonical + '</loc>'), 'Sitemap and website URLs differ');
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Sitemap: ' + canonical + 'sitemap.xml'), 'Robots sitemap URL differs');
assert.ok(html.includes(`>${models.length} entries in ${catalog.length} categories</p>`), 'Incorrect initial website counts');
const svg = fs.readFileSync(path.join(root, 'og-image.svg'), 'utf8');
assert.ok(svg.includes(`>${models.length} entries · ${catalog.length} categories ·`), 'Incorrect social preview counts');
for (const field of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    const content = html.match(new RegExp('<meta ' + field + ' content="([^"]+)"'))?.[1];
    assert.ok(content?.includes(String(models.length)) && content.includes(String(catalog.length)), 'Incorrect metadata counts: ' + field);
}
for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    const source = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(source)) continue;
    assert.ok(fs.existsSync(path.join(root, source)), 'Missing local resource: ' + source);
    if (source.endsWith('.js')) new vm.Script(fs.readFileSync(path.join(root, source), 'utf8'), { filename: source });
    if (source.endsWith('.css')) {
        const css = fs.readFileSync(path.join(root, source), 'utf8');
        for (const font of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
            if (/^(https?:|data:|\/\/)/.test(font[1])) continue;
            assert.ok(fs.existsSync(path.resolve(root, path.dirname(source), font[1].split(/[?#]/)[0])), 'Missing CSS resource: ' + font[1]);
        }
    }
}
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const palette = vm.runInNewContext('(' + script.match(/const SPIRAL_COLORS = (\{[\s\S]*?\n    \});/)[1] + ')');
for (const cat of catalog) assert.ok(palette[cat.category], 'Missing category color: ' + cat.category);
const png = fs.readFileSync(path.join(root, 'og-image.png'));
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
execFileSync(process.execPath, [path.join(root, 'sync.js'), '--check'], { stdio: 'inherit' });
console.log(`PASS: ${models.length} entries, ${catalog.length} categories, ${keys.length} references; README, metadata, social preview and local resources agree.`);
