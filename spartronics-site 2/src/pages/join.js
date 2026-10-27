const C = require('../components');
const { site } = require('../site');
const { img, section, pageTitle, panel, button, mediaText, accordion, slider, relatedLinks, ctaBanner, formField, icons } = C;

const interestForm = `
<form class="form form--two" data-ajax action="${site.formspreeEndpoint}" method="POST" data-fallback="${site.email}" data-success="Thanks! We'll be in touch before the next meeting." id="interest">
  <input type="hidden" name="_subject" value="New team interest form">
  ${formField({ id: 'name', label: 'Your name', required: true, autocomplete: 'name' })}
  ${formField({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
  ${formField({ id: 'school', label: 'School', type: 'select', required: true, options: ['De La Salle High School', 'Carondelet High School', 'Other / incoming student'] })}
  ${formField({ id: 'grade', label: 'Grade', type: 'select', required: true, options: ['9', '10', '11', '12', 'Incoming freshman'] })}
  <fieldset class="field field--full" style="border:0;padding:0;margin:0">
    <legend style="font-weight:600;color:var(--sp-text-strong);font-size:var(--fs-sm);margin-bottom:6px">I'm interested in (check all that apply)</legend>
    <div class="checks">
      <label><input type="checkbox" name="interests" value="Mechanical"> Mechanical</label>
      <label><input type="checkbox" name="interests" value="Design (CAD)"> Design (CAD)</label>
      <label><input type="checkbox" name="interests" value="Electrical"> Electrical</label>
      <label><input type="checkbox" name="interests" value="Programming"> Programming</label>
      <label><input type="checkbox" name="interests" value="Business"> Business &amp; Outreach</label>
      <label><input type="checkbox" name="interests" value="Not sure yet"> Not sure yet</label>
    </div>
  </fieldset>
  <div class="field--full">${formField({ id: 'message', label: 'Anything you want us to know?', type: 'textarea', placeholder: 'Questions, prior experience, friends who want to join…' })}</div>
  <p class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></p>
  <div class="field--full btn-row">
    <button type="submit" class="btn btn--primary">I'm Interested</button>
    ${button('Email us instead', `mailto:${site.email}?subject=Joining%20Spartronics`, 'outline')}
  </div>
  <p class="form__status field--full" hidden aria-live="polite"></p>
</form>`;

const join = {
  path: '/join/',
  title: 'Join the Team',
  description: 'How to join Spartronics, FRC Team 2141 at De La Salle and Carondelet High Schools: meeting times, the five sub-teams, FAQs and an interest form. No experience needed.',
  body:
    section(pageTitle('Join the Team', 'No experience needed — just bring your curiosity.'), 'section--tight') +
    section(`
      ${panel(`<h2 style="font-size:var(--fs-h3);margin-bottom:8px">Meetings</h2>
        <p><strong>De La Salle and Carondelet students:</strong> come to Robotics Club in the <strong>Fabrication Room</strong> every <strong>[EDIT: day], [EDIT: time]</strong>. Build season (January–April) adds extra evenings and Saturdays.</p>
        <p class="small muted" style="margin-bottom:0">Carondelet students are full members of the team. Parents and guardians are welcome at our first meeting of the year.</p>`, '', 'panel--highlight')}`, 'section--flush-top') +
    section(mediaText(
      img('join-overview', 'Full-team info session in the shop', 800, 600),
      `<h2>Team Overview</h2>
       <p>We have five sub-teams — <strong>Mechanical, Design, Electrical, Programming, and Business</strong>. Each plays a key role in helping the team run smoothly and perform at its best, and most members end up working across more than one.</p>
       <p>You don't need to know how to code or use a mill before you show up. Veterans teach rookies during the fall, then everyone builds together in January.</p>`
    ), 'section--flush-top') +
    section(
      mediaText(img('join-mechanical', 'Students machining parts in the Fabrication Room', 800, 600), `<h2>Mechanical</h2><p>Fabrication, machining and assembly. Mechanical turns CAD into aluminum: cutting, drilling, riveting and bolting the drivetrain, intake and climber, then rebuilding whatever breaks at competition. You'll learn the shop tools in the Fabrication Room and how to make parts that survive a match.</p>`, false, 'mechanical') +
      mediaText(img('join-design', 'Students at CAD workstations', 800, 600), `<h2>Design</h2><p>CAD and 3D modeling — turning whiteboard ideas into parts. Design sketches mechanisms, models the full robot, checks that everything fits inside the size limit and weight budget, and produces the drawings Mechanical builds from. Expect to get very comfortable with assemblies and 3D printing.</p>`, true, 'design') +
      mediaText(img('join-electrical', 'Students wiring the robot\'s electrical board', 800, 600), `<h2>Electrical</h2><p>The bridge between Mechanical and Programming. Electrical wires the robot base — the roboRIO, power distribution, motor controllers and sensors — and manages and calibrates pneumatics. A clean electrical board is the difference between a robot that works all weekend and one that dies in Q3.</p>`, false, 'electrical') +
      mediaText(img('join-programming', 'Students writing robot code on laptops', 800, 600), `<h2>Programming</h2><p>Java, written in Visual Studio Code with WPILib. Programming handles robot movement, mechanism control and autonomous routines, plus troubleshooting and optimization at the field. Our code is open source on <a href="https://github.com/2141-Spartonics">GitHub</a> — read it before you join if you like.</p>`, true, 'programming') +
      mediaText(img('join-business', 'Team members at an outreach booth', 800, 600), `<h2>Business</h2><p>Sponsor outreach, grant writing, financial tracking, the yearly business plan and social media. Business also leads our awards submissions — a real opportunity, since judged awards reward documentation and outreach as much as robot performance. If you like writing, pitching or organizing, this is your sub-team.</p>`, false, 'business'),
      'section--flush-top') +
    section(`
      <h2 class="center">Recruitment Presentation</h2>
      <p class="center muted">Slides from our most recent recruitment session. [EDIT: replace with the real slide images and PDF.]</p>
      ${slider('recruit-slides', 'Recruitment presentation', [1, 2, 3].map(n => img(`recruit-slide-${n}`, `Recruitment slide ${n}`, 1280, 720)))}`, 'section--flush-top') +
    section(`
      <h2 id="interest-form">Tell Us You're Interested</h2>
      <p class="prose">Fill this in and a student lead will reach out before the next meeting. [EDIT: connect the form by adding your Formspree ID in <code>src/site.js</code>.]</p>
      ${interestForm}`, 'section--flush-top') +
    section(`
      <h2>Frequently Asked Questions</h2>
      ${accordion([
        { q: 'How much time does it take?', a: '<p>Fall is light: one meeting a week for training. Build season (January through our last event in April) is the real commitment — several evenings a week plus Saturdays. [EDIT: adjust to your actual schedule.]</p>' },
        { q: 'Does it cost anything?', a: '<p>[EDIT: team dues, if any, and what they cover. Note that no student is turned away for cost.]</p>' },
        { q: 'Which grades can join?', a: '<p>All four grades at De La Salle and Carondelet. Freshmen are especially welcome — our best leads started as rookies.</p>' },
        { q: 'I have no experience. Is that OK?', a: '<p>Yes. Nearly everyone starts with none. Veterans run fall training sessions for each sub-team, and the <a href="/resources/training/">training materials</a> are online.</p>' },
        { q: 'What does the build season schedule look like?', a: '<p>Kickoff is the first Saturday in January, when <em>FIRST</em> reveals the game. We design in week one, build through February, test and practice in March, and compete at our district events in March and April.</p>' },
        { q: 'What should parents know?', a: '<p>Students need a signed <em>FIRST</em> consent form and a school activity form. Competitions are weekend events and we travel as a team. Parents are welcome to volunteer — we always need help with food, transport and the pit. See the <a href="/resources/handbook/">Team Handbook</a>.</p>' }
      ], 'join-faq')}`, 'section--flush-top') +
    relatedLinks([{ label: 'Robotics Club', href: '/join/robotics-club/' }, { label: 'Sub-Team Training', href: '/resources/training/' }, { label: 'Team Handbook', href: '/resources/handbook/' }])
};

const club = {
  path: '/join/robotics-club/',
  title: 'Robotics Club',
  description: 'The De La Salle Robotics Club is the on-campus home of Spartronics, FRC Team 2141 — where new members learn the shop, the code and the game before build season.',
  body:
    section(pageTitle('Robotics Club', 'The on-campus home of Team 2141.'), 'section--tight') +
    section(`
      <p class="lede">The Robotics Club is how most students find their way onto the competition team. It meets in the De La Salle <strong>Fabrication Room</strong>, the shared shop used by robotics, technical theatre, sculpture and engineering classes, and it's open to any De La Salle or Carondelet student.</p>
      <div class="photo-grid" style="margin-top:32px">
        ${img('club-1', 'Club members at a fall training session', 600, 450)}
        ${img('club-2', 'Students learning the drill press', 600, 450)}
        ${img('club-3', 'A programming workshop', 600, 450)}
        ${img('club-4', 'The Fabrication Room', 600, 450)}
      </div>`, 'section--flush-top') +
    section(`
      <div class="grid grid--2">
        ${panel(`<p><strong>Who can join:</strong> any De La Salle or Carondelet student, any grade. [EDIT]</p><p><strong>When it meets:</strong> [EDIT: day and time] in the Fabrication Room.</p><p><strong>How to sign up:</strong> show up, or use the <a href="/join/#interest-form">interest form</a>. Students in the <em>Robotics, Engineering, and Programming</em> class are already halfway there.</p>`, 'Club basics')}
        ${panel(`<p>Fall: shop safety, CAD basics, a Java bootcamp and a mini-build. Winter and spring: the <em>FIRST</em> build season with the competition team. Off-season: BattleBot-style side projects and demos for the community.</p>`, 'What you\'ll do')}
      </div>`, 'section--flush-top') +
    ctaBanner('Ready to build?', 'Tell us you\'re interested and a student lead will reach out.', [button('I\'m Interested', '/join/#interest-form', 'white')]) +
    relatedLinks([{ label: 'Join the Team', href: '/join/' }, { label: 'About the Team', href: '/about/' }, { label: 'Outreach', href: '/outreach/' }])
};

module.exports = [join, club];
