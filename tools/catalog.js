const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Use the same data scripts, in the same order, as the website.
function loadCatalog(root = path.resolve(__dirname, '..')) {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const start = html.indexOf('<!-- Data and Scripts -->');
    if (start < 0) throw new Error('Catalog script section is missing');
    const context = vm.createContext({});
    let loaded = false;
    for (const match of html.slice(start).matchAll(/<script\s+src="([^"?]+)(?:\?[^\"]*)?"/g)) {
        const source = match[1];
        if (source === 'script.js') break;
        const file = path.resolve(root, source);
        if (!file.startsWith(root + path.sep)) throw new Error('Catalog scripts must be local');
        vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: source, timeout: 5000 });
        loaded = true;
    }
    if (!loaded) throw new Error('No catalog data scripts found');
    return JSON.parse(vm.runInContext('JSON.stringify(modelData)', context));
}

const normalizeBibtex = value => value.split('\n').map(line => line.trimEnd()).join('\n').trim();

module.exports = { loadCatalog, normalizeBibtex };
