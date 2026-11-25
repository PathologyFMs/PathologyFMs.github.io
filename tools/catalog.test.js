const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { loadCatalog, normalizeBibtex } = require('./catalog');

test('documentation reads supplemental entries and links in website script order', t => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pfms-catalog-test-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    fs.writeFileSync(path.join(root, 'index.html'), '<script src="https://example.org/third-party.js"></script><!-- Data and Scripts --><script src="data.js?v=2"></script><script src="supplement.js?v=1"></script><script src="script.js"></script>');
    fs.writeFileSync(path.join(root, 'data.js'), 'const modelData = [{category:"Models",models:[{name:"A",year:2026}]}];');
    fs.writeFileSync(path.join(root, 'supplement.js'), 'modelData[0].models[0].paper="https://example.org/paper";modelData.push({category:"Studies",models:[{name:"B",year:2025}]});');
    fs.writeFileSync(path.join(root, 'script.js'), 'throw new Error("UI must not execute in the generator");');
    const expected = [{ category: 'Models', models: [{ name: 'A', year: 2026, paper: 'https://example.org/paper' }] }, { category: 'Studies', models: [{ name: 'B', year: 2025 }] }];
    assert.deepEqual(loadCatalog(root), expected);
    assert.deepEqual(loadCatalog(root), expected, 'Repeated loads must not accumulate supplemental entries');
});

test('a missing script section fails instead of silently generating an empty catalog', t => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pfms-catalog-test-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    fs.writeFileSync(path.join(root, 'index.html'), '<html></html>');
    assert.throws(() => loadCatalog(root), /script section is missing/);
});

test('citation normalization removes trailing whitespace without changing fields', () => {
    assert.equal(normalizeBibtex(' @misc{x,  \n  title={One}, \n}\n'), '@misc{x,\n  title={One},\n}');
    assert.notEqual(normalizeBibtex('@misc{x,title={One}}'), normalizeBibtex('@misc{x,title={Two}}'));
});
