const fs = require('fs');
let content = fs.readFileSync('/users/home/dchanda/pfm_website/data.js', 'utf8');
content = content.replace('const modelData =', '').replace(';', '');
const modelData = eval('(' + content + ')');

const emojiMap = {
    "Tile-Level Vision Foundation Models": "🔬",
    "Slide-Level & Patient-Level Foundation Models": "🧬",
    "Vision-Language Foundation Models": "👁️‍🗨️",
    "Multimodal & Molecular Foundation Models": "🧪",
    "Multi-FM Integration & Distillation": "⚗️",
    "Segmentation & Interactive Foundation Models": "🎯",
    "Generative Foundation Models": "🎨",
    "Foundation Model Benchmarking": "📊"
};

let md = "# Pathology Foundation Models (PFMs)\n\nA comprehensive, curated summary of state-of-the-art foundation models mapping the latent space of pathology. This repository contains the source code for an interactive web viewer of this taxonomy.\n\n";

modelData.forEach(cat => {
    const emoji = emojiMap[cat.category] || "📌";
    md += `## ${emoji} ${cat.category}\n\n`;
    
    if (cat.category.includes("Benchmarking")) {
        md += "| Name | Year | Scope | Key Contribution | Resources |\n|---|---|---|---|---|\n";
        cat.models.forEach(m => {
            let res = [];
            if (m.paper) res.push(`[Paper](${m.paper})`);
            if (m.github) res.push(`[Code](${m.github})`);
            if (m.hf) res.push(`[Model](${m.hf})`);
            if (m.website) res.push(`[Website](${m.website})`);
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${res.join(" • ")} |\n`;
        });
    } else {
        md += "| Model | Year | Pretraining Data | Key Idea | Resources |\n|---|---|---|---|---|\n";
        cat.models.forEach(m => {
            let res = [];
            if (m.paper) res.push(`[Paper](${m.paper})`);
            if (m.github) res.push(`[Code](${m.github})`);
            if (m.hf) res.push(`[Model](${m.hf})`);
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${res.join(" • ")} |\n`;
        });
    }
    md += "\n---\n\n";
});

md += `## 📝 Citation\n\nIf you find this repository useful in your research, please consider citing it using the following BibTeX:\n\n\`\`\`bibtex\n@misc{pfms2026,\n  author = {Chanda, Dibaloke},\n  title = {Pathology Foundation Models (PFMs)},\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository},\n  howpublished = {\\url{https://github.com/dibalokechanda/PFMs}}\n}\n\`\`\`\n`;

fs.writeFileSync('/users/home/dchanda/pfm_website/README.md', md);
console.log("README.md updated");
