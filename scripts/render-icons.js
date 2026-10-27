// Renders favicon.png (32px), apple-touch-icon.png (180px) and og-default.png (1200×630)
// from the SVG sources using the pre-installed Playwright Chromium. Run: node scripts/render-icons.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const IMG = path.join(__dirname, '..', 'src', 'assets', 'img');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const favicon = fs.readFileSync(path.join(IMG, 'favicon.svg'), 'utf8');

  for (const [name, size] of [['favicon.png', 32], ['apple-touch-icon.png', 180]]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<html><body style="margin:0;background:transparent">${favicon.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    await page.screenshot({ path: path.join(IMG, name), omitBackground: true });
  }

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet"></head>
  <body style="margin:0;width:1200px;height:630px;background:#0B1210;font-family:Poppins,system-ui,sans-serif;color:#fff;display:flex;align-items:center;justify-content:center">
    <div style="display:flex;align-items:center;gap:56px;padding:0 80px">
      <div style="width:260px;height:260px">${favicon.replace('<svg ', '<svg width="260" height="260" ')}</div>
      <div>
        <div style="font-size:22px;letter-spacing:.18em;color:#C9A84C;font-weight:600">FRC TEAM 2141 · CONCORD, CA</div>
        <div style="font-size:82px;font-weight:700;line-height:1.05;margin:10px 0 14px;color:#3DBF7A">SPARTRONICS</div>
        <div style="font-size:30px;font-weight:500;color:#E8ECEA">De La Salle &amp; Carondelet High Schools</div>
        <div style="font-size:22px;color:#B9C2BD;margin-top:12px">FIRST® Robotics Competition · Est. 2007</div>
      </div>
    </div></body></html>`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(IMG, 'og-default.png') });
  await browser.close();
  console.log('Icons rendered.');
})();
