const C = require('../components');
const { site } = require('../site');
const { img, section, panel, button, mediaText, statsBand, pathwayCard, icons } = C;

const hero = `
<div class="container container--hero"><section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg">${img('hero-team', 'Team group photo with robot outdoors', 1600, 900, 'Spartronics team members gathered around their robot on the De La Salle campus', 'loading="eager" fetchpriority="high"', { corner: true })}</div>
  <div class="hero__inner">
    <p class="hero__eyebrow">FRC Team 2141 · Concord, CA · Est. 2007</p>
    <h1 id="hero-title">${site.tagline}</h1>
    <p class="hero__sub">The student-led, mentor-driven FIRST Robotics Competition team of De La Salle and Carondelet High Schools — twenty seasons of building robots, engineers, and Spartan spirit.</p>
    <div class="btn-row">
      ${button('Join the Team', '/join/', 'primary')}
      ${button('Support Us', '/sponsor/', 'outline-light')}
    </div>
  </div>
</section></div>`;

const stats = statsBand([
  { number: '20', label: 'Seasons since 2007' },
  { number: '23', label: 'Competition events' },
  { number: '4', label: 'Playoff runs since 2016' },
  { number: '5', label: 'Sub-teams' }
]);

const mission = section(`
  <h2 class="center">Our Mission</h2>
  ${panel(`<p>Spartronics exists to give De La Salle and Carondelet students a place to build real things with real stakes. Every January a new <em>FIRST</em>® game is revealed, and in a few short weeks our students design, machine, wire, program and drive a 120-pound robot — then put it on the field against the best teams in California. Along the way they learn to lead, to document their work, to speak for the team, and to compete with <em>Gracious Professionalism</em>®. We measure success in engineers made, not just matches won.</p>
  <p class="small muted" style="margin-top:12px">[EDIT: swap in the team's official mission statement if one exists.]</p>`)}`);

const thisSeason = section(mediaText(
  img('season-robot', '2026 robot on the field', 800, 600, 'The 2026 REBUILT robot on the competition field'),
  `<h2>This Season</h2>
   <p><strong>2026 · REBUILT.</strong> In California's first year as a <em>FIRST</em> district, Spartronics played two district events and earned a <strong>4th-place alliance finish</strong> at the Contra Costa District Event in Pittsburg — our first playoff run since 2018 — with a season-best <strong>315-point match</strong> at Sacramento.</p>
   <p><strong>Next up:</strong> BIOCORE™ presented by Haas, kicking off January 2027. We're registered for the CA District Contra Costa Event, April 2–4, 2027.</p>
   <div class="btn-row"><a class="text-link" href="/history/">See our full history ${icons.arrowRight}</a><a class="text-link" href="/robots/">Meet our robots ${icons.arrowRight}</a></div>`
), 'section--flush-top');

const pathways = section(`
  <h2 class="center">Find Your Way In</h2>
  <div class="grid grid--3">
    ${pathwayCard({ eyebrow: 'Students', title: 'Join the Team', text: 'De La Salle and Carondelet students: no experience needed. Pick a sub-team and start building.', cta: 'How to join', href: '/join/', image: img('pathway-students', 'Students working on the robot in the Fabrication Room', 600, 400) })}
    ${pathwayCard({ eyebrow: 'Businesses & Donors', title: 'Become a Sponsor', text: 'Put your name on a robot that competes across Northern California, and invest in the engineers of tomorrow.', cta: 'Sponsorship tiers', href: '/sponsor/', image: img('pathway-sponsor', 'Robot with sponsor logos on the bumpers', 600, 400) })}
    ${pathwayCard({ eyebrow: 'Community', title: 'Outreach & Demos', text: 'Invite us to drive the robot at your school, scout troop, or community event.', cta: 'See our outreach', href: '/outreach/', image: img('pathway-outreach', 'Team demo at a community event', 600, 400) })}
  </div>`, 'section--flush-top');

const highlights = section(`
  <h2 class="center">Two Decades on the Field</h2>
  <div class="grid grid--3">
    <div class="panel"><p class="eyebrow">2017</p><h3>Alliance Captain</h3><p>Ranked 9th of 56 at the Sacramento Regional with a 6–2–1 record, captained Alliance 6, and reached the semifinals.</p></div>
    <div class="panel"><p class="eyebrow">2016–2018</p><h3>Three Straight Semifinals</h3><p>Picked for the playoffs three years running — as a second pick, a captain, and a first pick.</p></div>
    <div class="panel"><p class="eyebrow">2026</p><h3>4th-Place Alliance</h3><p>Back in the playoffs in our first district season, winning two bracket matches at the Contra Costa District Event.</p></div>
  </div>
  <p class="center" style="margin-top:28px"><a class="text-link" href="/history/">Season-by-season history ${icons.arrowRight}</a></p>`, 'section--flush-top');

const sponsors = section(`
  <h2 class="center">Thank You to Our Sponsors</h2>
  <div class="logo-wall">
    <a class="logo-wall__tile" href="https://www.dlshs.org/" rel="noopener">De La Salle High School</a>
    <a class="logo-wall__tile" href="/sponsor/">[EDIT: Sponsor logo]</a>
    <a class="logo-wall__tile" href="/sponsor/">[EDIT: Sponsor logo]</a>
    <a class="logo-wall__tile" href="/sponsor/">[EDIT: Sponsor logo]</a>
  </div>
  <p class="center" style="margin-top:24px"><a class="text-link" href="/sponsor/">Become a sponsor ${icons.arrowRight}</a></p>`, 'section--flush-top');

const aboutFirst = section(`
  <h2 class="center">About <em>FIRST</em>®</h2>
  ${panel(`<p><em>FIRST</em>® (For Inspiration and Recognition of Science and Technology) is a global nonprofit founded in 1989 by inventor Dean Kamen. Its flagship <em>FIRST</em> Robotics Competition challenges high-school teams to design and build a robot in a few short weeks to play a new game each season — guided by mentors and the values of <em>Gracious Professionalism</em>® and <em>Coopertition</em>®.</p>
  <p style="margin-top:12px"><a class="text-link" href="/resources/first/">Learn about FIRST programs ${icons.arrowRight}</a></p>`)}`, 'section--flush-top');

module.exports = {
  path: '/',
  title: 'Home',
  description: 'Spartronics is FRC Team 2141, the FIRST Robotics Competition team of De La Salle and Carondelet High Schools in Concord, CA. Join, sponsor, or follow our 20-season history.',
  preload: '/assets/img/placeholders/hero-team.svg',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: 'Spartronics – FRC Team 2141',
    alternateName: ['Spartonics', 'FRC 2141'],
    sport: 'FIRST Robotics Competition',
    foundingDate: '2007',
    url: site.url,
    logo: site.url + '/assets/img/logo-horizontal.svg',
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: '1130 Winton Drive', addressLocality: 'Concord', addressRegion: 'CA', postalCode: '94518', addressCountry: 'US' },
    memberOf: { '@type': 'Organization', name: 'FIRST', url: 'https://www.firstinspires.org/' },
    sameAs: Object.values(site.social).filter(Boolean)
  },
  body: hero + stats + mission + thisSeason + pathways + highlights + sponsors + aboutFirst
};
