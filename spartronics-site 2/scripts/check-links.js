// Verifies every internal link/asset in dist/ resolves to a file. Run after build.
const fs = require('fs'); const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const htmlFiles = walk(DIST).filter(f => f.endsWith('.html'));
let bad = 0, checked = 0;
const exists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;
  let f = path.join(DIST, clean);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  return fs.existsSync(f);
};
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const re = /(?:href|src)="(\/[^"]*)"/g; let m;
  while ((m = re.exec(html))) {
    checked++;
    if (!exists(m[1])) { bad++; console.log(`MISSING  ${path.relative(DIST, file)} -> ${m[1]}`); }
  }
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) console.log(`H1 COUNT ${path.relative(DIST, file)}: ${h1s}`);
}
// JSON validity
for (const j of walk(path.join(DIST, 'assets', 'data'))) { try { JSON.parse(fs.readFileSync(j, 'utf8')); } catch (e) { bad++; console.log('BAD JSON', j, e.message); } }
console.log(`${checked} internal references checked across ${htmlFiles.length} pages, ${bad} problems.`);
process.exit(bad ? 1 : 0);
