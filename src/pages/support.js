const C = require('../components');
const { site } = require('../site');
const { img, section, pageTitle, panel, button, ctaBanner, relatedLinks, icons, formField } = C;

const tier = (name, amount, items, featured = false) => `
<div class="tier ${featured ? 'tier--featured' : ''}">
  <h3 class="tier__name">${name}</h3>
  <p class="tier__amount">${amount}</p>
  <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
</div>`;

const sponsor = {
  path: '/sponsor/',
  title: 'Sponsorship',
  description: 'Sponsor Spartronics, FRC Team 2141 from De La Salle High School in Concord, CA. Tiers, benefits and how to put your logo on a competition robot.',
  body:
    ctaBanner('Power the next generation of engineers', 'Sponsoring Spartronics puts your name on a robot that competes across Northern California — and on the résumés of the students who built it.', [
      button('Become a Sponsor', `mailto:${site.email}?subject=Sponsorship`, 'white'),
      button('Download Sponsor Packet (PDF)', '#', 'outline-light', 'data-todo="link the sponsor packet PDF"')
    ], false, true) +
    section(`
      <h2 class="center">Why Sponsor</h2>
      <div class="grid grid--3">
        ${panel('<p>Your logo on the robot, the team shirts, our pit banner, this website and our social channels — seen at every event by thousands of students, families, mentors and engineers from the Bay Area\'s biggest technology companies.</p>', 'Brand visibility')}
        ${panel('<p>Spartronics has competed from Concord for twenty seasons and brings robots to local schools, parishes and community events. Your support keeps that going for the East Bay.</p>', 'Community impact')}
        ${panel('<p>FRC alumni go into engineering, software and skilled trades at far higher rates than their peers. Sponsors meet students at shop tours and demo days — and more than a few have hired them later.</p>', 'Talent pipeline')}
      </div>`) +
    section(`
      <h2 class="center">Sponsorship Tiers</h2>
      <p class="center muted">[EDIT: adjust amounts and benefits to match your sponsor packet.]</p>
      <div class="tiers">
        ${tier('Bronze', '$500+', ['Logo on website', 'Social media thank-you'])}
        ${tier('Silver', '$1,000+', ['Everything in Bronze', 'Logo on team shirt', 'Logo on pit banner'])}
        ${tier('Gold', '$2,500+', ['Everything in Silver', 'Logo on the robot', 'Shop tour and robot demo'], true)}
        ${tier('Platinum', '$5,000+', ['Everything in Gold', 'Named in all team materials and award submissions', 'Private demo at your site'])}
      </div>`, 'section--flush-top') +
    section(`
      <h2 class="center">Our Sponsors</h2>
      <p class="tier-heading center">Current sponsors</p>
      <div class="logo-wall">
        <a class="logo-wall__tile" href="https://www.dlshs.org/" rel="noopener">De La Salle High School</a>
        <a class="logo-wall__tile" href="#">[EDIT: Sponsor logo + link]</a>
        <a class="logo-wall__tile" href="#">[EDIT: Sponsor logo + link]</a>
        <a class="logo-wall__tile" href="#">[EDIT: Sponsor logo + link]</a>
      </div>
      <p class="tier-heading center">Past supporters</p>
      <div class="logo-wall">
        <a class="logo-wall__tile" href="https://www.nvidia.com/" rel="noopener">Nvidia (2016–2023)</a>
        <a class="logo-wall__tile" href="#">AT&amp;T West (founding years)</a>
      </div>
      <p class="small muted center" style="margin-top:16px">Logos shown as labeled tiles until official files are added. Don't recreate sponsor logos — use the files they provide.</p>`, 'section--flush-top') +
    section(`
      <div class="grid grid--2">
        ${panel('<p>We also welcome <strong>machining and fabrication</strong>, <strong>materials</strong> (aluminum, polycarbonate, electronics) and <strong>mentorship</strong> from engineers, machinists and software developers. An hour a week in the shop changes what students can build.</p>', 'In-kind support')}
        ${panel('<p>[EDIT: Add the statement that applies — e.g. "Donations are made to De La Salle High School, a 501(c)(3) nonprofit, designated for the Robotics program, and are tax-deductible to the extent allowed by law."]</p>', 'Tax note')}
      </div>`, 'section--flush-top') +
    ctaBanner('Let\'s talk', 'Email us and a student from the Business sub-team will follow up with the packet and a shop-tour invitation.', [button('Become a Sponsor', `mailto:${site.email}?subject=Sponsorship`, 'white'), button('Donate instead', '/donate/', 'outline-light')], true) +
    relatedLinks([{ label: 'Donate', href: '/donate/' }, { label: 'Our Robots', href: '/robots/' }, { label: 'Contact', href: '/contact/' }])
};

const donate = {
  path: '/donate/',
  title: 'Donate',
  description: 'Support Spartronics, FRC Team 2141 at De La Salle High School in Concord, CA. Every gift funds parts, tools, registration and travel for student engineers.',
  body:
    section(`<div style="margin-top:24px">${img('donate-hero', 'Team photo in green shirts', 1160, 420, 'Spartronics team members in green team shirts with the robot')}</div>`, 'section--tight') +
    section(`
      <div class="donate-grid">
        <div>
          <h1 style="font-size:var(--fs-h2)">You Can Make a Difference Right Now</h1>
          <p>Through Spartronics, students build not only robots but a strong sense of community and teamwork. Robotics teaches leadership — managing time, money and complex projects toward a common goal — and it costs real money: district registration, motors and controllers, aluminum, travel and food for a weekend of competition.</p>
          <ul class="impact-list">
            <li><strong>$100</strong><span>A set of competition bumpers, or a season of 3D-printer filament. [EDIT]</span></li>
            <li><strong>$250</strong><span>A swerve module or a drivetrain's worth of motors. [EDIT]</span></li>
            <li><strong>$500</strong><span>Team meals and transport for one competition weekend. [EDIT]</span></li>
            <li><strong>$1,000</strong><span>A second district event — twice the matches, twice the learning. [EDIT]</span></li>
          </ul>
        </div>
        <div>
          <div class="embed">
            ${site.donateUrl ? `<iframe title="Donate to Spartronics – FRC Team 2141" src="${site.donateUrl}" loading="lazy"></iframe>` : `
            <div class="embed__fallback">
              <h3>Give online</h3>
              <p>[EDIT: embed your donation form here (Zeffy, GiveButter, or the school's giving page) by setting <code>donateUrl</code> in <code>src/site.js</code>.]</p>
              ${button('Donate online', '#', 'primary', 'data-todo="donation URL"')}
              <p class="small muted" style="margin-top:16px">Prefer a check? Email <a href="mailto:${site.email}?subject=Donation">${site.email}</a> for instructions.</p>
            </div>`}
          </div>
        </div>
      </div>`, 'section--flush-top') +
    section(`${panel('<p class="center" style="margin:0">[EDIT: tax-status statement — use the same wording as the footer and the Sponsorship page. Do not claim "100% tax deductible"; use "to the extent allowed by law."]</p>')}`, 'section--flush-top') +
    section(`
      <h2 class="center">Other Ways to Give</h2>
      <div class="grid grid--3">
        ${panel('<p>Many Bay Area employers match gifts to school programs. Ask your HR team about matching, and email us if they need a form.</p>', 'Employer matching')}
        ${panel('<p>Tools, materials, a used laptop, a trailer for competition weekends — in-kind gifts stretch our budget further than cash.</p>', 'In-kind donations')}
        ${panel('<p>Businesses get logo placement and a shop tour. <a href="/sponsor/">See the sponsorship tiers →</a></p>', 'Sponsorship')}
      </div>`, 'section--flush-top') +
    relatedLinks([{ label: 'Sponsorship', href: '/sponsor/' }, { label: 'About the Team', href: '/about/' }, { label: 'Contact', href: '/contact/' }])
};

const contact = {
  path: '/contact/',
  title: 'Contact Us',
  description: 'Contact Spartronics, FRC Team 2141 at De La Salle High School, 1130 Winton Drive, Concord, CA 94518 — for joining, sponsorship, donations, outreach and media.',
  body:
    section(pageTitle('Contact Us', 'We usually reply within a few days.'), 'section--tight') +
    section(`
      <div class="contact-grid">
        <form class="form" data-ajax action="${site.formspreeEndpoint}" method="POST" data-fallback="${site.email}">
          ${formField({ id: 'name', label: 'Name', required: true, autocomplete: 'name' })}
          ${formField({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
          ${formField({ id: 'subject', label: 'Subject', type: 'select', options: ['General', 'Joining the team', 'Sponsorship', 'Donations', 'Outreach request', 'Media'] })}
          ${formField({ id: 'message', label: 'Message', type: 'textarea', required: true })}
          <p class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></p>
          <div><button type="submit" class="btn btn--secondary">Submit</button></div>
          <p class="form__status" hidden aria-live="polite"></p>
        </form>
        ${panel(`
          <ul class="contact-list">
            <li>${icons.mail}<span><strong>Team</strong><br><a href="mailto:${site.email}">${site.email}</a></span></li>
            <li>${icons.pin}<span><strong>Location</strong><br>De La Salle High School<br>1130 Winton Drive, Concord, CA 94518</span></li>
            <li>${icons.clock}<span><strong>Meetings</strong><br>[EDIT: day and time], Fabrication Room</span></li>
          </ul>
          <div class="social-row">${Object.entries(site.social).filter(([, u]) => u).map(([k, u]) => `<a class="social" href="${u}" aria-label="${k}">${icons[k]}</a>`).join('')}</div>
          <p class="small muted" style="margin:16px 0 0">Students: ask a lead in the shop, or use the <a href="/join/#interest-form">interest form</a>.</p>`, 'Reach us directly')}
      </div>`, 'section--flush-top') +
    relatedLinks([{ label: 'Join the Team', href: '/join/' }, { label: 'Sponsorship', href: '/sponsor/' }, { label: 'Outreach', href: '/outreach/' }])
};

const notFound = {
  path: '/404/',
  file: '404.html',
  title: 'Page not found',
  description: 'That page wandered off the field. Find your way back to Spartronics, FRC Team 2141.',
  body: section(`
    <div class="notfound">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="lede">That page wandered off the field.</p>
      <div class="btn-row" style="margin-top:24px">
        ${button('Home', '/', 'primary')}${button('Join the Team', '/join/', 'outline')}${button('History', '/history/', 'outline')}${button('Contact', '/contact/', 'outline')}
      </div>
    </div>`)
};

module.exports = [sponsor, donate, contact, notFound];
