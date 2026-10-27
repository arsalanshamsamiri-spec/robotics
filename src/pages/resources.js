const C = require('../components');
const { site } = require('../site');
const { img, section, pageTitle, panel, button, mediaText, slider, linkBlock, ctaBanner, relatedLinks, formField, icons } = C;

const card = (icon, title, text, href) => `<a class="card" href="${href}"><span class="card__icon">${icons[icon]}</span><h3>${title}</h3><p>${text}</p><span class="text-link">Open ${icons.arrowRight}</span></a>`;

const hub = {
  path: '/resources/',
  title: 'Member Resources',
  description: 'Training slides, code, the team handbook and FIRST program information for Spartronics members and parents.',
  body:
    section(pageTitle('Member Resources', 'Training, code, and team documents.'), 'section--tight') +
    section(`<div class="grid grid--4">
      ${card('wrench', 'Sub-Team Training', 'Fall training decks for Mechanical, Design, Electrical and Programming, plus the Java bootcamp.', '/resources/training/')}
      ${card('code', 'Code', 'Our open-source robot code on GitHub, and how we write it.', '/resources/code/')}
      ${card('book', 'Team Handbook', 'Expectations, safety, travel and the parent presentation.', '/resources/handbook/')}
      ${card('flag', 'FIRST Programs', 'FLL, FTC and FRC — the progression from PreK to grade 12.', '/resources/first/')}
    </div>`, 'section--flush-top') +
    relatedLinks([{ label: 'Join the Team', href: '/join/' }, { label: 'Contact', href: '/contact/' }])
};

const trainingSection = (id, title, desc, n) => `
<section class="training-section" id="${id}"><div class="container">
  <h2>${title}</h2>
  <p class="lede">${desc}</p>
  ${slider(`slider-${id}`, `${title} training slides`, Array.from({ length: n }, (_, i) => img(`training-${id}-${i + 1}`, `${title} slide ${i + 1}`, 1280, 720)))}
</div></section>`;

const training = {
  path: '/resources/training/',
  title: 'Sub-Team Training',
  description: 'Fall training materials for every Spartronics sub-team: Mechanical, Design, Electrical, Programming and the Java coding bootcamp.',
  body:
    section(pageTitle('Sub-Team Training', 'Everything a rookie needs before build season.') + `
      <ul class="jump-links">
        <li><a href="#mechanical">Mechanical</a></li><li><a href="#design">Design</a></li><li><a href="#electrical">Electrical</a></li><li><a href="#programming">Programming</a></li><li><a href="#java">Java Coding Bootcamp</a></li>
      </ul>
      <p class="small muted" style="margin-top:16px">Slides are placeholders. Export each deck as images into <code>assets/img/training/&lt;section&gt;/</code> and link the PDF. [EDIT]</p>`, 'section--tight') +
    trainingSection('mechanical', 'Mechanical', 'Shop safety, hand tools, the mill and lathe, fasteners and how a drivetrain goes together. [EDIT]', 3) +
    trainingSection('design', 'Design', 'CAD fundamentals, sketching mechanisms, assemblies, and design-for-manufacturing. [EDIT]', 3) +
    trainingSection('electrical', 'Electrical', 'The control system, wiring standards, sensors and pneumatics. [EDIT]', 3) +
    trainingSection('programming', 'Programming', 'WPILib, command-based robot code, autonomous routines and vision. [EDIT]', 3) +
    trainingSection('java', 'Java Coding Bootcamp', 'From zero to your first robot subsystem in Java. [EDIT]', 3) +
    relatedLinks([{ label: 'Code', href: '/resources/code/' }, { label: 'Team Handbook', href: '/resources/handbook/' }, { label: 'Join the Team', href: '/join/' }])
};

const code = {
  path: '/resources/code/',
  title: 'Code',
  description: 'Spartronics robot code is open source: Java with WPILib, written in Visual Studio Code, on GitHub at 2141-Spartonics.',
  body:
    section(pageTitle('Code', 'Open source, MIT-licensed, fork-friendly.'), 'section--tight') +
    section(mediaText(
      img('code-dashboard', 'Screenshot of robot code in Visual Studio Code', 800, 600),
      `<h2>How we write it</h2>
       <p>Our robots run <strong>Java</strong> on the standard WPILib stack, written in <strong>Visual Studio Code</strong>. Everything lives in our public GitHub organization, <strong>2141-Spartonics</strong>, under the MIT license — other teams are welcome to fork it, and rookies are expected to read it.</p>
       <p>The main repository includes a <em>Getting Started</em> guide for new programmers and a list of VS Code shortcuts, so a freshman can go from a blank laptop to running the robot in simulation in one session.</p>
       <div class="btn-row">${button('View on GitHub', 'https://github.com/2141-Spartonics', 'primary')}</div>`
    ), 'section--flush-top') +
    section(`
      <h2>Repositories</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Repository</th><th>What's in it</th><th>Language</th></tr></thead>
        <tbody>
          <tr><td><a href="https://github.com/2141-Spartonics/Spartonics-Code">Spartonics-Code</a></td><td>Season code folders (2017, 2018, 2019), a BattleBot project, the Getting Started guide and VS Code shortcuts. MIT-licensed; ~275 commits.</td><td>Java</td></tr>
          <tr><td>[EDIT: current season repo]</td><td>[EDIT: description]</td><td>Java</td></tr>
        </tbody>
      </table></div>
      <p class="small muted">[EDIT: add the 2024–2027 repositories, and a note on which is active.]</p>`, 'section--flush-top') +
    ctaBanner('Want to write robot code?', 'The Programming sub-team takes rookies every fall.', [button('Join the Team', '/join/#programming', 'white')], true) +
    relatedLinks([{ label: 'Sub-Team Training', href: '/resources/training/' }, { label: 'Our Robots', href: '/robots/' }])
};

const handbook = {
  path: '/resources/handbook/',
  title: 'Team Handbook',
  description: 'The Spartronics team handbook and parent presentation, plus the parent email sign-up for FRC Team 2141 families.',
  body:
    section(pageTitle('Team Handbook'), 'section--tight') +
    section(`
      <h2 class="center">Official Spartronics Team Handbook</h2>
      ${linkBlock('View Team Handbook', `Updated for the ${site.currentSeason} season`, '#', 'link the handbook PDF or Google Doc')}
      ${linkBlock('Team Parent Presentation', `Parent presentation for the ${site.currentSeason} season`, '#', 'link the parent presentation')}`, 'section--flush-top') +
    section(`
      <h2>Parent Email Sign-Up</h2>
      <p class="prose">Get schedule changes, competition logistics and volunteer requests by email. [EDIT: connect via Formspree in <code>src/site.js</code>.]</p>
      <form class="form form--two" data-ajax action="${site.formspreeEndpoint}" method="POST" data-fallback="${site.email}" data-success="You're on the list. Thank you!">
        <input type="hidden" name="_subject" value="Parent email sign-up">
        ${formField({ id: 'parent_email', label: 'Parent email', type: 'email', required: true, autocomplete: 'email' })}
        ${formField({ id: 'parent_phone', label: 'Parent phone', type: 'tel', autocomplete: 'tel' })}
        ${formField({ id: 'parent_first', label: 'Parent first name', required: true, autocomplete: 'given-name' })}
        ${formField({ id: 'parent_last', label: 'Parent last name', required: true, autocomplete: 'family-name' })}
        ${formField({ id: 'student_name', label: 'Student name' })}
        ${formField({ id: 'student_grade', label: 'Student grade', type: 'select', options: ['9', '10', '11', '12'] })}
        <p class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></p>
        <div class="field--full"><button type="submit" class="btn btn--secondary">Subscribe</button></div>
        <p class="form__status field--full" hidden aria-live="polite"></p>
      </form>`, 'section--flush-top') +
    relatedLinks([{ label: 'Join the Team', href: '/join/' }, { label: 'Sub-Team Training', href: '/resources/training/' }, { label: 'Contact', href: '/contact/' }])
};

const first = {
  path: '/resources/first/',
  title: 'FIRST Programs',
  description: 'An overview of FIRST programs from FIRST LEGO League to FIRST Tech Challenge and FIRST Robotics Competition — and where Spartronics, Team 2141, fits.',
  body:
    section(pageTitle('FIRST Programs', 'A progression from PreK to grade 12.'), 'section--tight') +
    section(`
      <p class="lede"><em>FIRST</em>® (For Inspiration and Recognition of Science and Technology) was founded in 1989 by inventor Dean Kamen to make science and technology as celebrated as sports. Its programs are organized by age, so a student can start with LEGO bricks in elementary school and finish by building a 120-pound competition robot.</p>
      <div class="grid grid--4" style="margin-top:32px">
        <div class="panel"><p class="eyebrow">PreK – Grade 8</p><h3>FIRST LEGO League</h3><p class="small"><strong>Discover</strong> (ages 4–6), <strong>Explore</strong> (ages 6–10) and <strong>Challenge</strong> (ages 9–16) — build and program LEGO robots and research a real-world theme.</p><a class="text-link" href="https://www.firstinspires.org/robotics/fll">firstinspires.org ${icons.arrowRight}</a></div>
        <div class="panel"><p class="eyebrow">Grades 7 – 12</p><h3>FIRST Tech Challenge</h3><p class="small">Teams of up to 15 design, build and code a smaller robot to play a floor game — often the step before FRC.</p><a class="text-link" href="https://www.firstinspires.org/robotics/ftc">firstinspires.org ${icons.arrowRight}</a></div>
        <div class="panel panel--green"><p class="eyebrow">Grades 9 – 12</p><h3>FIRST Robotics Competition</h3><p class="small">The varsity sport of the mind: a new game each January, a few weeks to build, then district and championship events. <strong>This is us.</strong></p><a class="text-link" href="https://www.firstinspires.org/robotics/frc">firstinspires.org ${icons.arrowRight}</a></div>
        <div class="panel"><p class="eyebrow">All ages</p><h3>Core values</h3><p class="small"><em>Gracious Professionalism</em>® and <em>Coopertition</em>® — compete hard, treat everyone with respect, and help your rivals when they need it.</p><a class="text-link" href="https://www.firstinspires.org/">About FIRST ${icons.arrowRight}</a></div>
      </div>
      <p class="small muted" style="margin-top:16px">[EDIT: verify current program names and age ranges at firstinspires.org.]</p>`, 'section--flush-top') +
    section(`${panel(`<p><strong>Where Team 2141 fits.</strong> Spartronics is De La Salle and Carondelet's <em>FIRST</em> Robotics Competition team, competing in the <em>FIRST</em> California District since 2026. For younger students in the Concord area, our <a href="/outreach/fll-mentoring/">FLL mentoring</a> and <a href="/outreach/community-demos/">community demos</a> are the on-ramp.</p>`, 'Where Team 2141 fits')}`, 'section--flush-top') +
    relatedLinks([{ label: 'Join the Team', href: '/join/' }, { label: 'Outreach', href: '/outreach/' }, { label: 'Competition History', href: '/history/' }])
};

module.exports = [hub, training, code, handbook, first];
