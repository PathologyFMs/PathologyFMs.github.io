const fs = require('fs');
const path = require('path');

const { loadCatalog, normalizeBibtex } = require('./tools/catalog');
const { hash, socialPreviewState, renderSocialPreview } = require('./tools/render-social-preview');
const modelData = loadCatalog(__dirname);
const counts = { entries: modelData.reduce((sum, cat) => sum + cat.models.length, 0), categories: modelData.length };
const check = process.argv.includes('--check');
const stale = [];
function generatedFile(name, content) {
    const file = path.join(__dirname, name);
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return;
    if (check) stale.push(name);
    else fs.writeFileSync(file, content);
}

const emojiMap = {
    "Tile-Level Vision Foundation Models": "🔬",
    "Cell Level Histopathology Foundation Models": "🧫",
    "Slide-Level Foundation Models": "🧬",
    "Patient-Level & Longitudinal Foundation Models": "👤",
    "Vision-Language Foundation Models": "👁️‍🗨️",
    "Multimodal & Molecular Foundation Models": "🧪",
    "Task & Domain Adaptation": "🧩",
    "Compression & Distillation": "⚗️",
    "Multi-FM Fusion & Ensembling": "🔗",
    "Segmentation & Interactive Foundation Models": "🎯",
    "Generative Foundation Models": "🎨",
    "General Benchmarking & Leaderboards": "📊",
    "Organ- & Task-Specific Benchmarking": "📈",
    "Survey and Perspectives": "📚",
    "Interpretability and Analysis": "🔎",
    "Robustness and Generalization": "🛡️",
    "Data Curation & Pretraining Strategies": "🗂️"
};

function resources(m) {
    const res = [];
    if (m.paper) res.push(`[Paper](${m.paper})`);
    if (m.github) res.push(`[Code](${m.github})`);
    if (m.hf) res.push(`[Model](${m.hf})`);
    if (m.dataset) res.push(`[Dataset](${m.dataset})`);
    if (m.website) res.push(`[Website](${m.website})`);
    (m.variants || []).forEach(v => {
        const link = v.hf || v.paper;
        res.push(link ? `[${v.name}](${link})` : v.name);
    });
    return res.join(" • ");
}

let md = "# Pathology Foundation Models (PFMs)\n\n" +
    "### 🌐 [**Explore the interactive website →**](https://dibalokechanda.github.io/PFMs/)\n\n" +
    "A comprehensive, curated summary of state-of-the-art foundation models mapping the latent space of pathology. " +
    "This repository contains the source code for an interactive web viewer of this taxonomy.\n\n" +
    `**${counts.entries} catalog entries across ${counts.categories} categories.**\n\n`;

modelData.forEach(cat => {
    const emoji = emojiMap[cat.category] || "📌";
    md += `## ${emoji} ${cat.category}\n\n`;

    const isBenchmark = cat.category.includes("Benchmarking");
    const isPaperList = cat.category.includes("Survey") || cat.category.includes("Interpretability") || cat.category.includes("Robustness");
    const groups = cat.subcategories ? cat.subcategories.map(name => ({ name, models: cat.models.filter(m => m.subcategory === name) })) : [{ models: cat.models }];
    groups.filter(group => group.models.length).forEach(group => {
    if (group.name) md += `### ${group.name}\n\n`;

    if (isBenchmark) {
        md += "| Name | Year | Scope | Key Contribution | Resources |\n|---|---|---|---|---|\n";
        group.models.forEach(m => {
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${resources(m)} |\n`;
        });
    } else if (isPaperList) {
        md += "| Paper | Year | Focus | Resources |\n|---|---|---|---|\n";
        group.models.forEach(m => {
            const title = m.paper_title ? ` · *${m.paper_title}*` : "";
            md += `| **${m.name}**${title} | ${m.year} | ${m.idea} | ${resources(m)} |\n`;
        });
    } else {
        md += "| Model | Year | Pretraining Data | Key Idea | Resources |\n|---|---|---|---|---|\n";
        group.models.forEach(m => {
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${resources(m)} |\n`;
        });
    }
    md += '\n';
    });
    md += "---\n\n";
});

md += "## Maintaining the catalog\n\n" +
    "Edit the catalog data, then run `npm ci`, `npm run sync`, `npm test`, and `npm run test:browser` before opening a pull request. " +
    "The generator uses all data scripts loaded by `index.html`, including supplemental entries and resource links. " +
    "It updates this README, the bibliography, metadata counts, and social preview together. " +
    "Updating the social image requires Chromium/Chrome or a Playwright browser; set `BROWSER_PATH` if needed.\n\n";

md += "## 📝 Citation\n\n" +
    "If you find this repository useful in your research, please consider citing it using the following BibTeX:\n\n" +
    "```bibtex\n@misc{pfms2026,\n  author = {Chanda, Dibaloke},\n  title = {Pathology Foundation Models (PFMs)}," +
    "\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository}," +
    "\n  howpublished = {\\url{https://github.com/dibalokechanda/PFMs}}\n}\n```\n";

generatedFile('README.md', md);

// --- references.bib: one entry per unique paper, deduped, keys disambiguated ---
const seenBib = new Map(); // bibtex content -> [model names]
modelData.forEach(cat => cat.models.forEach(m => {
    if (!m.bibtex) return;
    const bibtex = normalizeBibtex(m.bibtex);
    if (!seenBib.has(bibtex)) seenBib.set(bibtex, [m.name]);
    else seenBib.get(bibtex).push(m.name);
}));
const keyOf = c => (c.match(/^@\w+\{\s*([^,]+),/) || [, 'ref'])[1].trim();
const usedKeys = new Map();
let bibOut = "% Pathology Foundation Models (PFMs) - reference list\n" +
    "% Auto-generated from the website catalog by sync.js; one entry per unique paper.\n\n";
for (const [content, names] of seenBib) {
    let c = content, key = keyOf(c);
    if (usedKeys.has(key) && usedKeys.get(key) !== c) {
        let i = 2, nk;
        do { nk = `${key}_${i++}`; } while (usedKeys.has(nk));
        c = c.replace(/^(@\w+\{\s*)[^,]+,/, `$1${nk},`);
        key = nk;
    }
    usedKeys.set(key, c);
    bibOut += `% ${names.join(', ')}\n${c}\n\n`;
}
generatedFile('references.bib', bibOut);

const svgPath = path.join(__dirname, 'og-image.svg');
const svg = fs.readFileSync(svgPath, 'utf8').replace(/(<text\b[^>]*\bid="catalogCounts"[^>]*>)[\s\S]*?(<\/text>)/, `$1${counts.entries} entries · ${counts.categories} categories · vision · language · multimodal · generative$2`);
generatedFile('og-image.svg', svg);
const description = `A curated catalog of ${counts.entries} pathology models, benchmarks and papers across ${counts.categories} categories, with training details, citations, code and model weights.`;
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
html = html.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*(")/g, (_, prefix, suffix) => prefix + description + suffix);
html = html.replace(/("@type": "Dataset",[\s\S]*?"description": ")[^"]*(")/, (_, prefix, suffix) => prefix + description + suffix);
html = html.replace(/(id="catalogSummary"[^>]*>)[^<]*(<\/p>)/, `$1${counts.entries} entries in ${counts.categories} categories$2`);
html = html.replace(/og-image\.png(?:\?v=[^"\s]*)?(?=")/g, 'og-image.png?v=' + hash(svg).slice(0, 12));
generatedFile('index.html', html);

const statePath = path.join(__dirname, 'tools/og-image-state.json');
let state;
try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch { state = {}; }
const expectedState = socialPreviewState(__dirname, svg, counts);
if (JSON.stringify(state) !== JSON.stringify(expectedState) || !expectedState.pngSha256) {
    if (check) stale.push('og-image.png / tools/og-image-state.json');
    else {
        renderSocialPreview(__dirname);
        fs.writeFileSync(statePath, JSON.stringify(socialPreviewState(__dirname, svg, counts), null, 2) + '\n');
    }
}
if (stale.length) {
    console.error('Out of sync: ' + stale.join(', ') + '. Run node sync.js.');
    process.exitCode = 1;
} else {
    console.log(`${counts.entries} entries, ${counts.categories} categories and ${seenBib.size} unique references ${check ? 'are in sync' : 'synchronized'}.`);
}
