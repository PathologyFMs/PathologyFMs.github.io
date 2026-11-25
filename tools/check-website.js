const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');
const { loadCatalog, normalizeBibtex } = require('./catalog');

const root = path.resolve(__dirname, '..');
const catalog = loadCatalog(root);
const models = catalog.flatMap(cat => cat.models);
const summary = (entries, categories) => `${entries} ${entries === 1 ? 'entry' : 'entries'} in ${categories} ${categories === 1 ? 'category' : 'categories'}`;
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.bib': 'text/plain' };

async function main() {
    const server = http.createServer((req, res) => {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
        if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
        fs.readFile(file, (error, content) => {
            if (error) { res.writeHead(404).end(); return; }
            res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
            res.end(content);
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    let browser;
    try {
        const executablePath = [process.env.BROWSER_PATH, '/usr/bin/chromium', '/usr/bin/google-chrome'].find(file => file && fs.existsSync(file));
        const options = { ...(executablePath ? { executablePath } : {}), headless: true, args: ['--no-sandbox'] };
        const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
        if (proxy) {
            const url = new URL(proxy);
            options.proxy = { server: url.origin, bypass: 'localhost,127.0.0.1' };
            if (url.username) options.proxy.username = decodeURIComponent(url.username);
            if (url.password) options.proxy.password = decodeURIComponent(url.password);
        }
        browser = await chromium.launch(options);
        const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] });
        const page = await context.newPage(), errors = [], failedLocal = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failedLocal.push(response.url()); });
        await page.goto(base, { waitUntil: 'networkidle' });
        assert.deepEqual(await page.evaluate(() => modelData), catalog, 'Browser and generator catalog differ');
        assert.equal(await page.locator('.main-row').count(), models.length);
        assert.equal(await page.locator('#catalogSummary').innerText(), summary(models.length, catalog.length));
        assert.deepEqual(await page.locator('#categoryFilter option').evaluateAll(options => options.slice(1).map(o => o.value).filter(value => !value.includes('::'))), catalog.map(cat => cat.category));
        assert.equal(await page.evaluate(() => typeof d3), 'object', 'Local tree dependency failed to load');
        await page.evaluate(() => document.fonts.ready);
        assert.ok(await page.evaluate(() => [...document.fonts].some(font => font.family.includes('Phosphor') && font.status === 'loaded')), 'Local icon font failed to load');

        let checked = 0;
        for (const cat of catalog) {
            await page.selectOption('#categoryFilter', cat.category);
            const count = cat.models.length;
            assert.deepEqual(await page.locator('.main-row .model-name').allTextContents(), cat.models.map(m => m.name));
            assert.equal(await page.locator('#catalogSummary').innerText(), summary(count, 1));
            if (cat.subcategories) {
                assert.deepEqual(await page.locator('.subcategory-title').allTextContents(), cat.subcategories);
                for (const name of cat.subcategories) {
                    const section = page.locator('.subcategory-section').filter({ has: page.locator('.subcategory-title', { hasText: name }) });
                    assert.deepEqual(await section.locator('.main-row .model-name').allTextContents(), cat.models.filter(m => m.subcategory === name).map(m => m.name));
                }
            }
            for (let i = 0; i < count; i++) {
                const model = cat.models[i];
                await page.locator('.main-row').nth(i).locator('.expand-btn').click();
                assert.equal(await page.locator('#modalTitle').innerText(), model.name);
                for (const [field, cls] of [['paper', 'paper'], ['github', 'github'], ['hf', 'hf'], ['dataset', 'dataset'], ['website', 'website']]) {
                    const link = page.locator('#modalBody .link-' + cls);
                    assert.equal(await link.count(), model[field] ? 1 : 0, model.name + ': ' + field);
                    if (model[field]) assert.equal(await link.getAttribute('href'), model[field]);
                }
                assert.equal(await page.locator('.variant-row').count(), (model.variants || []).length);
                await page.getByRole('button', { name: 'Cite (BibTeX)', exact: true }).click();
                assert.equal(normalizeBibtex(await page.locator('.bibtex-block').innerText()), normalizeBibtex(model.bibtex), model.name + ': citation');
                await page.keyboard.press('Escape');
                checked++;
            }
            await page.locator('#gridBtn').click();
            assert.deepEqual(await page.locator('.card .model-name').allTextContents(), cat.models.map(m => m.name));
            await page.locator('#timelineBtn').click();
            assert.equal(await page.locator('.spiral-dot').count(), count);
            assert.deepEqual(await page.locator('.spiral-leg').allTextContents(), [cat.category]);
            await page.locator('#swimlaneBtn').click();
            assert.equal(await page.locator('.swim-dot').count(), count);
            assert.equal(await page.locator('.swim-lane-count').innerText(), String(count));
            await page.locator('#treeBtn').click();
            assert.equal(await page.locator('.tn-cat').count(), 1);
            assert.ok((await page.locator('.tn-cat').textContent()).includes(cat.category + ' (' + count + ')'));
            await page.locator('.tn-cat').dispatchEvent('click');
            if (cat.subcategories) {
                assert.equal(await page.locator('.tn-subcat').count(), cat.subcategories.length);
                for (let i = 0; i < cat.subcategories.length; i++) await page.locator('.tn-subcat').nth(i).dispatchEvent('click');
            }
            assert.deepEqual((await page.locator('.tn-model .tree-label').allTextContents()).sort(), cat.models.map(m => m.name).sort());
            await page.locator('#tableBtn').click();
            if (count > 1) {
                await page.locator('.compare-btn').click();
                assert.equal(await page.locator('.cmp-model').count(), count);
                await page.locator('.cmp-remove[data-col="0"]').click();
                assert.equal(await page.locator('.cmp-model').count(), count - 1);
                assert.equal(await page.locator('#compareTitle').innerText(), `Compare · ${cat.category} (${count - 1})`);
                assert.equal(await page.locator('.cmp-corner').innerText(), (count - 1) + ' entries');
                await page.locator('#closeCompare').click();
            }
            console.log(`PASS ${cat.category}: ${count} entries, metadata/citations, five views and comparison counts`);
        }

        await page.selectOption('#categoryFilter', 'all');
        await page.locator('#timelineBtn').click();
        assert.equal(await page.locator('.spiral-dot').count(), models.length);
        assert.equal(await page.locator('.spiral-leg').count(), catalog.length);
        const year = String(Math.max(...models.map(m => +(m.date || String(m.year)).slice(0, 4))));
        const yearGroups = catalog.map(cat => ({ ...cat, models: cat.models.filter(m => (m.date || String(m.year)).slice(0, 4) === year) }));
        const yearCount = yearGroups.reduce((sum, cat) => sum + cat.models.length, 0);
        await page.getByRole('button', { name: year, exact: true }).click();
        assert.equal(await page.locator('.spiral-dot').count(), yearCount);
        assert.equal(await page.locator('#catalogSummary').innerText(), summary(yearCount, yearGroups.filter(cat => cat.models.length).length));
        await page.getByRole('button', { name: 'All', exact: true }).click();
        await page.locator('#swimlaneBtn').click();
        assert.equal(await page.locator('.swim-dot').count(), models.length);
        assert.equal((await page.locator('.swim-lane-count').allTextContents()).reduce((sum, n) => sum + Number(n), 0), models.length);
        await page.locator('#treeBtn').click();
        assert.equal(await page.locator('.tn-cat').count(), catalog.length);
        for (let i = 0; i < catalog.length; i++) await page.locator('.tn-cat').nth(i).dispatchEvent('click');
        for (let i = 0; i < await page.locator('.tn-subcat').count(); i++) await page.locator('.tn-subcat').nth(i).dispatchEvent('click');
        assert.equal(await page.locator('.tn-model').count(), models.length);
        await page.locator('#tableBtn').click();
        for (const cat of catalog.filter(cat => cat.subcategories)) for (const name of cat.subcategories) {
            const count = cat.models.filter(m => m.subcategory === name).length;
            await page.selectOption('#categoryFilter', cat.category + '::' + name);
            assert.equal(await page.locator('.main-row').count(), count);
            assert.deepEqual(await page.locator('.subcategory-title').allTextContents(), [name]);
            assert.equal(await page.locator('#catalogSummary').innerText(), summary(count, 1));
        }
        await page.selectOption('#categoryFilter', 'all');
        await page.locator('#facetBtn').click();
        const chips = await page.locator('.facet-chip').evaluateAll(nodes => nodes.map(n => ({ key: n.dataset.key, value: n.dataset.val, count: Number(n.querySelector('.facet-chip-n').textContent) })));
        for (const chip of chips) {
            await page.locator('.facet-chip').filter({ hasText: chip.value }).evaluateAll((nodes, key) => nodes.find(n => n.dataset.key === key).click(), chip.key);
            assert.equal(await page.locator('.main-row').count(), chip.count, chip.key + ': ' + chip.value);
            assert.equal(await page.locator('#catalogSummary').innerText(), summary(chip.count, await page.locator('.category-section').count()));
            await page.locator('#facetClear').click();
        }
        await page.locator('#facetBtn').click();
        for (const name of ['PAST', 'CytoFormer', 'TissueFormer', 'C-LiTE', 'SciCore-Omics', 'PathTokScale']) {
            await page.locator('#searchInput').fill(name);
            await page.waitForFunction(n => [...document.querySelectorAll('.main-row .model-name')].some(el => el.textContent === n), name);
            const row = page.locator('.main-row').filter({ has: page.locator('.model-name', { hasText: new RegExp('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }) });
            const expected = catalog.find(cat => cat.models.some(m => m.name === name));
            assert.equal(await row.evaluate(el => el.closest('.category-section').querySelector('.category-title').textContent), expected.category);
        }
        await page.locator('#searchInput').fill('__catalog_no_match_9a2b__');
        await page.waitForFunction(() => document.querySelectorAll('.main-row').length === 0);
        for (const button of ['gridBtn', 'timelineBtn', 'swimlaneBtn', 'treeBtn', 'tableBtn']) {
            await page.locator('#' + button).click();
            assert.equal(await page.locator('#catalogSummary').innerText(), summary(0, 0));
            assert.equal(await page.locator('.empty-state').count(), 1);
        }
        await page.locator('#searchInput').fill('');
        await page.waitForFunction(n => document.querySelectorAll('.main-row').length === n, models.length);
        await page.locator('#bibtexBtn').click();
        assert.ok((await page.evaluate(() => navigator.clipboard.readText())).includes('@misc{pfms2026,'));
        await page.selectOption('#categoryFilter', 'Cell Level Histopathology Foundation Models');
        await page.locator('#gridBtn').click();
        await page.screenshot({ path: '/tmp/pfms-sweep-desktop.png', animations: 'disabled' });
        await page.setViewportSize({ width: 390, height: 844 });
        const lightBefore = await page.locator('body').evaluate(el => el.classList.contains('light-mode'));
        await page.locator('#themeToggle').click();
        assert.equal(await page.locator('body').evaluate(el => el.classList.contains('light-mode')), !lightBefore);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Mobile page overflows horizontally');
        await page.screenshot({ path: '/tmp/pfms-sweep-mobile.png', animations: 'disabled' });
        assert.deepEqual(errors, []);
        assert.deepEqual(failedLocal, []);
        console.log(`PASS entire website: ${checked} metadata/citation dialogs, ${catalog.length} categories, all five views, ${chips.length} facet counts, search/empty states, clipboard and desktop/mobile layouts`);
    } finally {
        if (browser) await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
