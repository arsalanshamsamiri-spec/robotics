#!/usr/bin/env node
/* Build script: renders src/pages/*.js through the shared layout into dist/.
   No dependencies. Run `node build.js`. */
const fs = require('fs');
const path = require('path');
const { renderPage } = require('./src/layout');
const { placeholders, esc } = require('./src/components');
const { site } = require('./src/site');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'src');

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function copyDir(from, to) {
  mkdirp(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name), b = path.join(to, entry.name);
    entry.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

rmrf(DIST);
mkdirp(DIST);

// 1. Pages
const pagesDir = path.join(SRC, 'pages');
const pages = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.js'))
  .map(f => require(path.join(pagesDir, f)))
  .flat();

const written = [];
for (const page of pages) {
  const html = renderPage(page);
  let out;
  if (page.file) out = path.join(DIST, page.file);              // e.g. 404.html
  else out = path.join(DIST, page.path.replace(/^\//, ''), 'index.html');
  mkdirp(path.dirname(out));
  fs.writeFileSync(out, html);
  if (!page.file) written.push(page.path);
}

// 2. Assets (css, js, img, data)
copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
for (const f of ['favicon.svg', 'favicon.png', 'apple-touch-icon.png']) {
  const p = path.join(SRC, 'assets', 'img', f);
  if (fs.existsSync(p)) fs.copyFileSync(p, path.join(DIST, f));
}

// 3. Placeholder images (SVG with a caption). Replace with real photos by changing the <img src>.
const phDir = path.join(DIST, 'assets', 'img', 'placeholders');
mkdirp(phDir);
for (const [id, { caption, w, h, corner }] of placeholders) {
  const fs_ = Math.max(14, Math.min(28, Math.round(w / 32)));
  const label = corner
    ? '' // dark, caption-free placeholder for hero backgrounds (text sits over it)
    : `<g fill="#5F6B66" font-family="Poppins, system-ui, sans-serif" text-anchor="middle">
<text x="${w / 2}" y="${h / 2 - 4}" font-size="${fs_}" font-weight="600">${esc(caption)}</text>
<text x="${w / 2}" y="${h / 2 + fs_ + 6}" font-size="${Math.round(fs_ * 0.7)}">Placeholder — replace with a team photo</text>
</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(caption)}">
<rect width="${w}" height="${h}" fill="${corner ? '#2F4A3C' : '#E9EDEB'}"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="${corner ? '#4E6B5C' : '#C5CDC9'}" stroke-width="2" stroke-dasharray="8 6"/>
${corner ? label.replace('#5F6B66', '#C9D3CE') : label}</svg>`;
  fs.writeFileSync(path.join(phDir, `${id}.svg`), svg);
}

// 4. sitemap.xml + robots.txt
const base = site.url.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${written.sort().map(p => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);

console.log(`Built ${written.length} pages + 404 into dist/ (${placeholders.size} placeholder images).`);
