const { site, menu } = require('./site');
const { esc, icons, logo, logoMark } = require('./components');

const socialLinks = () => Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([key, url]) => `<a class="social" href="${url}" target="_blank" rel="noopener" aria-label="${key[0].toUpperCase() + key.slice(1)} (opens in new tab)">${icons[key]}</a>`)
  .join('');

const isCurrent = (href, path) => href === path;
const isWithin = (item, path) => isCurrent(item.href, path) || (item.children || []).some(c => isCurrent(c.href, path));

function renderNav(path) {
  return menu.map((item, i) => {
    if (item.children) {
      const id = `menu-${i}`;
      return `<li class="nav__item nav__item--has-sub ${isWithin(item, path) ? 'is-within' : ''}">
        <button type="button" class="nav__link nav__parent" aria-expanded="false" aria-controls="${id}" ${isWithin(item, path) ? 'aria-current="true"' : ''}>${esc(item.label)} ${icons.chevronDown}</button>
        <ul class="nav__sub" id="${id}">
          ${item.children.map(c => `<li><a href="${c.href}" ${isCurrent(c.href, path) ? 'aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}
        </ul>
      </li>`;
    }
    return `<li class="nav__item"><a class="nav__link ${item.highlight ? 'nav__link--pill' : ''}" href="${item.href}" ${isCurrent(item.href, path) ? 'aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }).join('');
}

function renderMobileNav(path) {
  return menu.map((item, i) => {
    if (item.children) {
      return `<li class="mnav__item">
        <button type="button" class="mnav__parent" aria-expanded="false" aria-controls="mmenu-${i}">${esc(item.label)} ${icons.chevronDown}</button>
        <ul class="mnav__sub" id="mmenu-${i}" hidden>
          ${item.children.map(c => `<li><a href="${c.href}" ${isCurrent(c.href, path) ? 'aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}
        </ul>
      </li>`;
    }
    return `<li class="mnav__item"><a href="${item.href}" ${isCurrent(item.href, path) ? 'aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }).join('');
}

function header(path) {
  return `
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" id="header">
  <div class="logo-band" id="logo-band"><div class="container logo-band__inner">
    <a class="logo-link" href="/" aria-label="${esc(site.fullName)} – Home">${logo('color')}</a>
    <div class="logo-band__right">
      <div class="social-row">${socialLinks()}</div>
      <a class="btn btn--pill-primary" href="/donate/">Donate</a>
      <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu">${icons.menu}<span>Menu</span></button>
    </div>
  </div></div>
  <div class="nav-bar" id="nav-bar"><div class="container">
    <nav class="nav" aria-label="Main"><ul class="nav__list">${renderNav(path)}</ul></nav>
  </div></div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="mobile-menu__backdrop" data-close-menu></div>
  <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="mobile-menu__top">
      ${logoMark('reverse', 40)}
      <button type="button" class="mobile-menu__close" data-close-menu aria-label="Close menu">${icons.close}</button>
    </div>
    <nav aria-label="Mobile"><ul class="mnav">${renderMobileNav(path)}</ul></nav>
    <div class="mobile-menu__bottom">
      <a class="btn btn--primary" href="/donate/">Donate</a>
      <div class="social-row social-row--light">${socialLinks()}</div>
    </div>
  </div>
</div>`;
}

function footer() {
  const s = site;
  return `
<footer class="site-footer">
  <div class="container footer__grid">
    <div class="footer__col footer__brand">
      ${logo('reverse')}
      <p class="footer__tagline">${esc(s.tagline)}</p>
      <p>${esc(s.name)} · FRC Team ${s.teamNumber}</p>
      <p>${esc(s.school)} &amp; ${esc(s.sisterSchool)}, ${esc(s.city)}</p>
    </div>
    <div class="footer__col">
      <h2 class="footer__heading">Team</h2>
      <ul class="footer__links">
        <li><a href="/about/">About</a></li>
        <li><a href="/team/">Our Team</a></li>
        <li><a href="/history/">Competition History</a></li>
        <li><a href="/robots/">Our Robots</a></li>
        <li><a href="/join/">Join the Team</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h2 class="footer__heading">Connect</h2>
      <ul class="footer__links">
        <li><a href="/contact/">Contact</a></li>
        <li><a href="mailto:${s.email}">${s.email}</a></li>
      </ul>
      <div class="social-row social-row--light">${socialLinks()}</div>
    </div>
    <div class="footer__col">
      <h2 class="footer__heading">Support</h2>
      <ul class="footer__links">
        <li><a href="/sponsor/">Sponsorship</a></li>
        <li><a href="/donate/">Donate</a></li>
        <li><a href="/outreach/">Outreach</a></li>
      </ul>
      <a class="first-badge" href="https://www.firstinspires.org/" target="_blank" rel="noopener">
        <span class="first-badge__box">FIRST® Robotics Competition logo</span>
        <span class="visually-hidden">FIRST Robotics Competition (opens in new tab)</span>
      </a>
    </div>
  </div>
  <div class="footer__strip"><div class="container footer__strip-inner">
    <p>${esc(s.name)} is the FIRST Robotics Competition team of ${esc(s.school)} and ${esc(s.sisterSchool)} in ${esc(s.city)}. <span data-todo="confirm tax status">[EDIT: add the team's nonprofit or school-program giving statement here.]</span></p>
    <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(s.name)}, FRC Team ${s.teamNumber}. All rights reserved.</p>
  </div></div>
</footer>
<button type="button" class="back-to-top" id="back-to-top" aria-label="Back to top" hidden>${icons.chevronUp}</button>`;
}

function head(page) {
  const title = page.path === '/'
    ? `${site.fullName} | ${site.city}`
    : `${page.title} | ${site.fullName}`;
  const canonical = site.url.replace(/\/$/, '') + page.path;
  const og = site.url.replace(/\/$/, '') + '/assets/img/og-default.png';
  const ld = page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : '';
  const ga = site.gaMeasurementId ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaMeasurementId}');</script>` : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.fullName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${og}">
  <meta name="theme-color" content="#0A4D2B">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${page.preload ? `<link rel="preload" as="image" href="${page.preload}">` : ''}
  ${ld}${ga}
</head>`;
}

function renderPage(page) {
  return `${head(page)}
<body class="${page.bodyClass || ''}" data-path="${page.path}">
${header(page.path)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { renderPage };
