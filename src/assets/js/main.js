/* Spartronics – FRC Team 2141 · main.js
   Nav, mobile menu, sticky header, reveal, back-to-top, accordions, sliders,
   JSON-driven pages (team, history, robots) and forms. No dependencies. */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  document.documentElement.classList.remove('no-js');

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- External links ---------- */
  $$('a[href^="http"]').forEach(a => {
    if (a.hostname === location.hostname) return;
    a.target = '_blank'; a.rel = 'noopener';
    if (!a.querySelector('.visually-hidden')) {
      const s = document.createElement('span'); s.className = 'visually-hidden'; s.textContent = ' (opens in new tab)'; a.appendChild(s);
    }
  });

  /* ---------- Desktop dropdowns ---------- */
  const navItems = $$('.nav__item--has-sub');
  const closeAll = (except) => navItems.forEach(li => { if (li !== except) { li.classList.remove('is-open'); $('.nav__parent', li).setAttribute('aria-expanded', 'false'); } });
  navItems.forEach(li => {
    const btn = $('.nav__parent', li);
    let hoverTimer;
    const open = () => { closeAll(li); li.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
    const close = () => { li.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => (li.classList.contains('is-open') ? close() : open()));
    li.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(open, 60); });
    li.addEventListener('mouseleave', () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(close, 180); });
    li.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); btn.focus(); }
      if (e.key === 'ArrowDown' && document.activeElement === btn) { e.preventDefault(); open(); const first = $('.nav__sub a', li); first && first.focus(); }
    });
    li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.nav__item--has-sub')) closeAll(); });

  /* ---------- Mobile menu ---------- */
  const toggle = $('.menu-toggle'), menu = $('#mobile-menu');
  if (toggle && menu) {
    const panel = $('.mobile-menu__panel', menu);
    let lastFocus;
    const focusables = () => $$('a[href], button:not([disabled])', panel).filter(el => el.offsetParent !== null);
    const openMenu = () => {
      lastFocus = document.activeElement;
      menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open'));
      toggle.setAttribute('aria-expanded', 'true'); document.body.classList.add('is-locked');
      $('.mobile-menu__close', menu).focus();
    };
    const closeMenu = () => {
      menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('is-locked');
      const done = () => { menu.hidden = true; };
      reduced ? done() : setTimeout(done, 250);
      lastFocus && lastFocus.focus();
    };
    toggle.addEventListener('click', openMenu);
    $$('[data-close-menu]', menu).forEach(el => el.addEventListener('click', closeMenu));
    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
      if (e.key === 'Tab') {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$('.mnav__parent', menu).forEach(btn => {
      const sub = document.getElementById(btn.getAttribute('aria-controls'));
      if (btn.querySelector('a[aria-current]') || sub.querySelector('[aria-current]')) { sub.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
      btn.addEventListener('click', () => { const open = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!open)); sub.hidden = open; });
    });
  }

  /* ---------- Sticky revealing header ---------- */
  const band = $('#logo-band'), navBar = $('#nav-bar');
  if (band && navBar && 'IntersectionObserver' in window) {
    let lastY = window.scrollY, ticking = false, fixed = false;
    const io = new IntersectionObserver(([entry]) => {
      fixed = !entry.isIntersecting && window.scrollY > band.offsetHeight;
      navBar.classList.toggle('is-fixed', fixed);
      document.body.classList.toggle('has-fixed-nav', fixed);
      if (!fixed) navBar.classList.remove('is-hidden');
    }, { threshold: 0 });
    io.observe(band);
    window.addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (fixed && !reduced) {
          if (y > lastY + 4 && y > 200) navBar.classList.add('is-hidden');
          else if (y < lastY - 4) navBar.classList.remove('is-hidden');
        }
        lastY = y; ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Back to top ---------- */
  const btt = $('#back-to-top');
  if (btt) {
    const check = () => { btt.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', check, { passive: true }); check();
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  /* ---------- Scroll reveal ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    const targets = $$('main > .section, main > .stats-band, main > .cta-banner, .media-text, .pathway, .card, .robot, .season, .season-featured, .feature');
    targets.forEach(el => el.classList.add('reveal'));
    const ro = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); ro.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(el => ro.observe(el));
  }

  /* ---------- Sliders ---------- */
  $$('[data-slider]').forEach(sl => {
    const track = $('.slider__track', sl), slides = $$('.slider__slide', sl), prev = $('[data-prev]', sl), next = $('[data-next]', sl), cur = $('[data-current]', sl);
    let i = 0;
    const go = (n) => {
      i = Math.max(0, Math.min(slides.length - 1, n));
      track.style.transform = `translateX(-${i * 100}%)`;
      cur.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === slides.length - 1;
      slides.forEach((s, k) => s.setAttribute('aria-hidden', String(k !== i)));
    };
    prev.addEventListener('click', () => go(i - 1)); next.addEventListener('click', () => go(i + 1));
    sl.tabIndex = 0;
    sl.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1); });
    let x0 = null;
    sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1); x0 = null; });
    $$('img', sl).forEach(im => { const mark = () => im.classList.add('is-loaded'); im.complete ? mark() : im.addEventListener('load', mark); });
    go(0);
  });

  /* ---------- Lite YouTube ---------- */
  $$('.lite-yt').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.video; if (!id) return;
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`; f.title = btn.getAttribute('aria-label') || 'Robot video';
    f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'; f.allowFullscreen = true;
    btn.replaceChildren(f);
  }));

  /* ---------- JSON helpers ---------- */
  const loadJSON = (url) => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  const helmet = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M23 12c3-8 15-8 18 0l-2.4 3.2c-3.4-4.6-9.8-4.6-13.2 0z" fill="#fff"/><path d="M15 31c0-17 34-17 34 0v12l-7 11h-5V43h-10v11h-5l-7-11z" fill="#fff"/><path d="M20.5 30.5h8.5v4h-8.5zM35 30.5h8.5v4H35z" fill="#D9DFDC"/></svg>';
  const trophy = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5M12 13v4M8 21h8M9 17h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const placeholderImg = (caption, w, h) => `<img src="data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#E9EDEB'/><rect x='1' y='1' width='${w - 2}' height='${h - 2}' fill='none' stroke='#C5CDC9' stroke-width='2' stroke-dasharray='8 6'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='Poppins,system-ui,sans-serif' font-size='22' font-weight='600' fill='#5F6B66'>${caption.replace(/'/g, '')}</text></svg>`)}" width="${w}" height="${h}" alt="${esc(caption)}" loading="lazy" decoding="async">`;

  /* ---------- Team page ---------- */
  const teamRoot = $('[data-render="team"]');
  if (teamRoot) loadJSON('/assets/data/team.json').then(data => {
    const label = $('[data-season-label]'); if (label) label.textContent = data.season;
    teamRoot.innerHTML = data.sections.map(sec => {
      const n = sec.people.length;
      const cols = n === 1 ? 'people-grid--1' : n === 2 ? 'people-grid--2' : '';
      return `<div class="section-label"><hr class="rule"><h2>${esc(sec.title)}</h2><hr class="rule"></div>
      <div class="people-grid ${cols}">${sec.people.map(p => `
        <div class="person ${p.placeholder ? 'person--placeholder' : ''}">
          ${p.photo ? `<img class="person__photo" src="${esc(p.photo)}" width="250" height="250" alt="${esc(p.name)}" loading="lazy" decoding="async">` : `<div class="person__fallback" role="img" aria-label="${p.placeholder ? 'Photo coming soon' : esc(p.name)}">${helmet}</div>`}
          <p class="person__name">${esc(p.name)}${p.placeholder ? ' <span class="visually-hidden">(placeholder)</span>' : ''}</p>
          <p class="person__role">${esc(p.role)}</p>
        </div>`).join('')}</div>`;
    }).join('');
  }).catch(() => { teamRoot.innerHTML = '<p class="panel">The roster could not be loaded. Please try again later.</p>'; });

  /* ---------- History page ---------- */
  const seasonsRoot = $('[data-render="seasons"]');
  if (seasonsRoot) loadJSON('/assets/data/seasons.json').then(data => {
    const seasons = data.seasons.slice().sort((a, b) => b.year - a.year);
    const events = (s) => `<ul class="season__events">${s.events.map(e => `<li><strong>${esc(e.name)}${e.location ? ` · ${esc(e.location)}` : ''}</strong><span>${e.dates ? esc(e.dates) + ' · ' : ''}${esc(e.result)}</span></li>`).join('')}</ul>`;
    const chips = (s) => s.highlights.length ? `<div class="season__chips">${s.highlights.map(h => `<span class="chip">${trophy}${esc(h)}</span>`).join('')}</div>` : '';
    const body = (s) => `<p class="season__year">${s.year}</p><p class="season__game">${esc(s.game)}</p>${events(s)}${s.note ? `<p class="season__note">${esc(s.note)}</p>` : ''}${chips(s)}`;
    const featured = seasons.filter(s => s.status === 'complete').slice(0, 2);
    const rest = seasons.filter(s => !featured.includes(s));
    seasonsRoot.innerHTML =
      featured.map(s => `<article class="season-featured" id="season-${s.year}"><div class="season-featured__logo">${s.logo ? `<img src="${esc(s.logo)}" width="280" height="280" alt="${esc(s.game)} game logo" loading="lazy" decoding="async">` : placeholderImg(`${s.game} logo`, 280, 280)}</div><div class="season">${body(s)}</div></article>`).join('') +
      `<div class="season-grid">${rest.map(s => `<article class="season ${s.status !== 'complete' ? 'season--muted' : ''}" id="season-${s.year}">${body(s)}</article>`).join('')}</div>`;
  }).catch(() => { seasonsRoot.innerHTML = '<p class="panel">Season history could not be loaded. Please try again later.</p>'; });

  /* ---------- Robots page ---------- */
  const robotsRoot = $('[data-render="robots"]');
  if (robotsRoot) loadJSON('/assets/data/robots.json').then(data => {
    const robots = data.robots.slice().sort((a, b) => b.year - a.year);
    robotsRoot.innerHTML = robots.map(r => `
      <article class="robot" id="robot-${r.year}">
        <div class="robot__media">${r.image ? `<img src="${esc(r.image)}" width="800" height="600" alt="${esc(r.name)} robot" loading="lazy" decoding="async">` : placeholderImg(r.placeholderCaption || `${r.year} robot photo`, 800, 600)}
          ${r.video ? `<button type="button" class="lite-yt" data-video="${esc(r.video)}" aria-label="Play ${esc(r.name)} video"><span class="lite-yt__play"></span></button>` : ''}</div>
        <div class="robot__body">
          <h2 class="robot__name">${esc(r.name)}</h2>
          <p class="robot__meta">${r.year} · ${esc(r.game)}</p>
          <p>${esc(r.description)}</p>
          ${r.specs && r.specs.length ? `<ul class="spec-list">${r.specs.map(s => `<li><span>${esc(s.label)}</span><span>${esc(s.value)}</span></li>`).join('')}</ul>` : ''}
          <a class="text-link" href="/history/#season-${r.year}">See the ${r.year} season</a>
        </div>
      </article>`).join('');
  }).catch(() => { robotsRoot.innerHTML = '<p class="panel">Robot history could not be loaded. Please try again later.</p>'; });

  /* ---------- Forms (Formspree) ---------- */
  const params = new URLSearchParams(location.search);
  const subjectSel = $('#subject');
  if (subjectSel && params.get('subject')) {
    const want = params.get('subject').toLowerCase();
    Array.from(subjectSel.options).forEach(o => { if (o.value.toLowerCase().startsWith(want)) subjectSel.value = o.value; });
  }
  $$('form[data-ajax]').forEach(form => {
    const status = $('.form__status', form);
    const setErr = (field, msg) => {
      const wrap = field.closest('.field'); const err = wrap && $('.field__error', wrap);
      if (wrap) wrap.classList.toggle('has-error', !!msg); if (err) err.textContent = msg || '';
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    form.noValidate = true;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      let ok = true, firstBad;
      $$('input, select, textarea', form).forEach(f => {
        if (f.type === 'checkbox' || f.classList.contains('hp')) return;
        let msg = '';
        if (f.required && !f.value.trim()) msg = 'This field is required.';
        else if (f.type === 'email' && f.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)) msg = 'Please enter a valid email address.';
        setErr(f, msg); if (msg) { ok = false; firstBad = firstBad || f; }
      });
      if (!ok) { firstBad.focus(); return; }
      if ($('.hp input', form) && $('.hp input', form).value) return; // honeypot
      const action = form.getAttribute('action');
      status.hidden = false; status.classList.remove('form__status--error'); status.textContent = 'Sending…';
      if (!action || action.includes('YOUR_FORM_ID')) {
        status.classList.add('form__status--error');
        status.textContent = 'This form isn\'t connected yet. Please email us directly: ' + (form.dataset.fallback || '');
        return;
      }
      try {
        const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.status);
        form.reset(); status.textContent = form.dataset.success || 'Thanks! Your message has been sent. We usually reply within a few days.';
      } catch (err) {
        status.classList.add('form__status--error');
        status.textContent = 'Something went wrong. Please try again, or email us at ' + (form.dataset.fallback || '') + '.';
      }
    });
  });
})();
