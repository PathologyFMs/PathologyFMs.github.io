const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const hash = value => crypto.createHash('sha256').update(value).digest('hex');

function socialPreviewState(root, svg, counts) {
    const png = path.join(root, 'og-image.png');
    return { ...counts, svgSha256: hash(svg), pngSha256: fs.existsSync(png) ? hash(fs.readFileSync(png)) : null };
}

function renderSocialPreview(root) {
    execFileSync(process.execPath, [__filename, root], { stdio: 'inherit', timeout: 30000 });
}

module.exports = { hash, socialPreviewState, renderSocialPreview };

if (require.main === module) {
    (async () => {
        const root = process.argv[2];
        const executablePath = [process.env.BROWSER_PATH, '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/opt/google/chrome/chrome'].find(file => file && fs.existsSync(file));
        const { chromium } = require('playwright');
        const browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true, args: ['--no-sandbox'] });
        try {
            const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
            await page.setContent('<!doctype html><html><head><style>html,body{margin:0;width:1200px;height:630px;overflow:hidden}</style></head><body>' + fs.readFileSync(path.join(root, 'og-image.svg'), 'utf8') + '</body></html>');
            await page.screenshot({ path: path.join(root, 'og-image.png') });
        } finally {
            await browser.close();
        }
    })().catch(error => { console.error(error.message); process.exitCode = 1; });
}
