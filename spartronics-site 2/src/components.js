// Reusable HTML components. Each is a plain function returning a string.
const { site } = require('./site');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- Icons (inline SVG, currentColor) ---------- */
const icons = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="currentColor"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5v10M6.5 5.5v.01M11 18.5v-6a3 3 0 0 1 6 0v6M11 8.5v10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  chevronUp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5M12 13v4M8 21h8M9 17h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a6 6 0 0 1 3.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9zM20 4l-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12L3 7M12 12v10" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4M5 4h12l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l4-3 5 2 3-2 4 3 4-3v9l-4 3-3-2-3 3-4-2-6-3zM11 8l-3 3 3 2M14 6l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="9" width="18" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v12M3 13h18M12 9c-2-4-6-4-6-1.5S10 9 12 9zm0 0c2-4 6-4 6-1.5S14 9 12 9z" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
};

/* ---------- Logo ----------
   The mark: a simplified Spartan helmet with circuit traces (echoing the "electronics" half of the name)
   and "— 2141 —" underneath. variant: 'color' (white backgrounds) | 'reverse' (dark backgrounds). */
function logoMark(variant = 'color', size = 56) {
  const green = variant === 'reverse' ? 'var(--sp-green-bright)' : 'var(--sp-green)';
  const ink = variant === 'reverse' ? '#fff' : 'var(--sp-ink)';
  return `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <g fill="none" stroke="${ink}" stroke-width="1.8" stroke-linecap="round">
    <path d="M2 30h9M2 36h7"/><circle cx="2.5" cy="30" r="1.6" fill="${ink}" stroke="none"/><circle cx="2.5" cy="36" r="1.6" fill="${ink}" stroke="none"/>
    <path d="M62 30h-9M62 36h-7"/><circle cx="61.5" cy="30" r="1.6" fill="${ink}" stroke="none"/><circle cx="61.5" cy="36" r="1.6" fill="${ink}" stroke="none"/>
  </g>
  <path d="M23 12c3-8 15-8 18 0l-2.4 3.2c-3.4-4.6-9.8-4.6-13.2 0z" fill="${green}"/>
  <path d="M15 31c0-17 34-17 34 0v12l-7 11h-5V43h-10v11h-5l-7-11z" fill="${green}"/>
  <path d="M20.5 30.5h8.5v4h-8.5zM35 30.5h8.5v4H35z" fill="${variant === 'reverse' ? 'var(--sp-ink)' : '#fff'}"/>
  <text x="32" y="63" text-anchor="middle" font-family="Poppins, system-ui, sans-serif" font-size="8.5" font-weight="600" letter-spacing="1.5" fill="${ink}">—2141—</text>
</svg>`;
}

function logo(variant = 'color') {
  const green = variant === 'reverse' ? 'var(--sp-green-bright)' : 'var(--sp-green)';
  const ink = variant === 'reverse' ? '#fff' : 'var(--sp-ink)';
  return `<span class="logo logo--${variant}">${logoMark(variant)}<span class="logo-word" style="--w1:${green};--w2:${ink}"><span class="logo-word__top">SPARTRONICS</span><span class="logo-word__bottom">FRC TEAM 2141</span></span></span>`;
}

/* ---------- Placeholder images ----------
   Registers an SVG placeholder (generated at build time) and returns an <img>. Swap the src for a real photo. */
const placeholders = new Map();
function img(id, caption, w, h, alt, extra = '', opts = {}) {
  placeholders.set(id, { caption, w, h, corner: !!opts.corner });
  return `<img src="/assets/img/placeholders/${id}.svg" width="${w}" height="${h}" alt="${esc(alt || caption)}" loading="lazy" decoding="async" ${extra}>`;
}

/* ---------- Layout primitives ---------- */
const section = (inner, cls = '', attrs = '') => `<section class="section ${cls}" ${attrs}><div class="container">${inner}</div></section>`;

const pageTitle = (title, intro) => `
<div class="page-title">
  <h1>${esc(title)}</h1>
  ${intro ? `<p class="page-title__intro">${intro}</p>` : ''}
  <hr class="rule">
</div>`;

const panel = (inner, title, cls = '') => `<div class="panel ${cls}">${title ? `<h3 class="panel__title">${esc(title)}</h3>` : ''}${inner}</div>`;

const button = (label, href, kind = 'primary', attrs = '') => {
  const ext = /^https?:/.test(href);
  return `<a class="btn btn--${kind}" href="${href}" ${ext ? 'target="_blank" rel="noopener"' : ''} ${attrs}>${label}${ext ? ' <span class="visually-hidden">(opens in new tab)</span>' : ''}</a>`;
};

const mediaText = (image, text, flip = false, id = '') => `
<div class="media-text ${flip ? 'media-text--flip' : ''}" ${id ? `id="${id}"` : ''}>
  <div class="media-text__media">${image}</div>
  <div class="media-text__body">${text}</div>
</div>`;

const statsBand = (stats) => `
<section class="stats-band" aria-label="Team statistics"><div class="container stats-band__grid">
  ${stats.map(s => `<div class="stat"><span class="stat__number">${s.number}</span><span class="stat__label">${s.label}</span></div>`).join('')}
</div></section>`;

const pathwayCard = (c) => `
<a class="pathway" href="${c.href}">
  ${c.image}
  <div class="pathway__body">
    <span class="pathway__eyebrow">${esc(c.eyebrow)}</span>
    <h3 class="pathway__title">${esc(c.title)}</h3>
    <p>${c.text}</p>
    <span class="text-link">${esc(c.cta)} ${icons.arrowRight}</span>
  </div>
</a>`;

const ctaBanner = (title, sub, buttons, dark = false, asH1 = false) => `
<section class="cta-banner ${dark ? 'cta-banner--dark' : ''}"><div class="container">
  ${asH1 ? `<h1>${esc(title)}</h1>` : `<h2>${esc(title)}</h2>`}
  ${sub ? `<p>${sub}</p>` : ''}
  <div class="btn-row">${buttons.join('')}</div>
</div></section>`;

const accordion = (items, name = '') => `
<div class="accordion">
  ${items.map((it, i) => `<details class="accordion__item" ${name ? `name="${name}"` : ''} ${i === 0 && it.open ? 'open' : ''}>
    <summary><span>${esc(it.q)}</span>${icons.chevronDown}</summary>
    <div class="accordion__body">${it.a}</div>
  </details>`).join('')}
</div>`;

const linkBlock = (title, sub, href, todo = '') => `
${todo ? `<!-- TODO: ${todo} -->` : ''}
<a class="link-block" href="${href}">
  <span class="link-block__title">${esc(title)}</span>
  <span class="link-block__sub">${esc(sub)}</span>
</a>`;

const featureTile = (icon, title, text) => `
<div class="feature">
  <div class="feature__ring"><svg class="feature__arc" viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="44" fill="none" stroke="#D5DBD8" stroke-width="3"/><path d="M48 4a44 44 0 0 1 44 44" fill="none" stroke="var(--sp-green)" stroke-width="3" stroke-linecap="round"/></svg><span class="feature__icon">${icons[icon] || ''}</span></div>
  <h3>${esc(title)}</h3>
  <p>${text}</p>
</div>`;

/* A slider of slide images with prev/next, counter and a PDF link. Slide images are placeholders by default. */
const slider = (id, label, slides, pdfHref = '#') => `
<div class="slider" id="${id}" data-slider aria-roledescription="carousel" aria-label="${esc(label)}">
  <div class="slider__viewport">
    <div class="slider__track">
      ${slides.map((s, i) => `<div class="slider__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">${s}</div>`).join('')}
    </div>
  </div>
  <div class="slider__controls">
    <button type="button" class="slider__btn" data-prev aria-label="Previous slide">${icons.chevronLeft}</button>
    <span class="slider__counter" aria-live="polite"><span data-current>1</span> / ${slides.length}</span>
    <button type="button" class="slider__btn" data-next aria-label="Next slide">${icons.chevronRight}</button>
  </div>
  <p class="slider__download"><a href="${pdfHref}" ${pdfHref === '#' ? 'data-todo="link the PDF export"' : ''}>Download slides (PDF)</a></p>
</div>`;

const sectionLabel = (text) => `<div class="section-label"><hr class="rule"><h2>${esc(text)}</h2><hr class="rule"></div>`;

const chip = (text) => `<span class="chip">${icons.trophy}${esc(text)}</span>`;

const formField = (opts) => {
  const { id, label, type = 'text', required = false, placeholder = '', autocomplete = '' } = opts;
  const req = required ? '<span class="req" aria-hidden="true">*</span><span class="visually-hidden"> (required)</span>' : '';
  const common = `id="${id}" name="${id}" ${required ? 'required' : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} aria-describedby="${id}-err"`;
  let control;
  if (type === 'textarea') control = `<textarea ${common} rows="6" placeholder="${esc(placeholder)}"></textarea>`;
  else if (type === 'select') control = `<select ${common}>${opts.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select>`;
  else control = `<input type="${type}" ${common} placeholder="${esc(placeholder)}">`;
  return `<div class="field"><label for="${id}">${esc(label)}${req}</label>${control}<p class="field__error" id="${id}-err" role="alert"></p></div>`;
};

const relatedLinks = (links) => `
<nav class="related" aria-label="Related pages"><div class="container">
  <h2>Keep exploring</h2>
  <ul>${links.map(l => `<li><a href="${l.href}">${esc(l.label)} ${icons.arrowRight}</a></li>`).join('')}</ul>
</div></nav>`;

module.exports = {
  esc, icons, logo, logoMark, img, placeholders, section, pageTitle, panel, button, mediaText, statsBand,
  pathwayCard, ctaBanner, accordion, linkBlock, featureTile, slider, sectionLabel, chip, formField, relatedLinks, site
};
