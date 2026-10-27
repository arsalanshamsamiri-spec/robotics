// Visual check: serves dist/ and screenshots pages at desktop + mobile widths into scratch dir.
// Usage: node scripts/screenshot.js <outDir> [path ...]
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');
const out = process.argv[2] || '/tmp/shots';
const pages = process.argv.slice(3).length ? process.argv.slice(3) : ['/', '/about/', '/team/', '/history/', '/robots/', '/join/', '/outreach/', '/resources/training/', '/sponsor/', '/donate/', '/contact/', '/404.html'];
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(DIST, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { f = path.join(DIST, '404.html'); res.statusCode = 404; }
  res.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(4321, r));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const errors = [];
  for (const [label, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(`${label} ${page.url()}: ${e.message}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`${label} ${page.url()}: console ${m.text()}`); });
    for (const p of pages) {
      await page.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible')); });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w) errors.push(`${label} ${p}: horizontal overflow scrollWidth=${sw}`);
      const name = p === '/' ? 'home' : p.replace(/[\/.]/g, '_').replace(/^_|_$/g, '');
      await page.screenshot({ path: path.join(out, `${label}-${name}.png`), fullPage: true });
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
  console.log(errors.length ? 'ISSUES:\n' + errors.join('\n') : 'No page errors, no horizontal overflow.');
})();
