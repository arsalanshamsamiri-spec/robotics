const C = require('../components');
const { site } = require('../site');
const { img, section, pageTitle, panel, button, mediaText, statsBand, pathwayCard, ctaBanner, relatedLinks } = C;

const overview = {
  path: '/outreach/',
  title: 'Outreach',
  description: 'Spartronics brings robots to schools, scout troops and community events across Concord and Contra Costa County. Invite FRC Team 2141 to your event.',
  body:
    section(pageTitle('Outreach', 'Bringing STEM to Concord and the East Bay.'), 'section--tight') +
    section(`
      <p class="lede">A robot that drives up to you is the best STEM pitch there is. Spartronics takes ours to schools, youth groups and community events across Contra Costa County — and mentors younger students in <em>FIRST</em>'s earlier programs.</p>
      <div class="grid grid--2" style="margin-top:32px">
        ${pathwayCard({ eyebrow: 'Events', title: 'Community Demos', text: 'Drive the robot, meet the students, see what a season looks like. Available for school fairs, parish events and local festivals.', cta: 'See demos', href: '/outreach/community-demos/', image: img('outreach-demo', 'Robot demo for young visitors', 600, 400) })}
        ${pathwayCard({ eyebrow: 'Mentoring', title: 'FIRST LEGO League Mentoring', text: 'Our students coach elementary and middle-school FLL teams on robot design, programming and the engineering notebook.', cta: 'About FLL mentoring', href: '/outreach/fll-mentoring/', image: img('outreach-fll', 'Spartronics students mentoring an FLL team', 600, 400) })}
      </div>`, 'section--flush-top') +
    statsBand([
      { number: '[EDIT]', label: 'Students reached last year' },
      { number: '[EDIT]', label: 'Events attended' },
      { number: '[EDIT]', label: 'FLL teams mentored' },
      { number: '20', label: 'Seasons in the community' }
    ]) +
    section(`
      ${panel(`<p>Outreach is one of the ways <em>FIRST</em> judges recognize teams — the <strong>Impact Award</strong>, <strong>Engineering Inspiration</strong> and others reward what a team does off the field. In twenty seasons Spartronics has never submitted for a judged award. Changing that is a team goal, and it starts with the events on this page. [EDIT: keep or remove this note.]</p>`, 'Why it matters to us')}`, 'section--flush-top') +
    ctaBanner('Invite us to your school or event', 'We bring the robot, the drivers and the enthusiasm. You bring the crowd.', [button('Request a demo', '/contact/?subject=Outreach', 'white')]) +
    relatedLinks([{ label: 'Community Demos', href: '/outreach/community-demos/' }, { label: 'FLL Mentoring', href: '/outreach/fll-mentoring/' }, { label: 'FIRST Programs', href: '/resources/first/' }])
};

const demos = {
  path: '/outreach/community-demos/',
  title: 'Community Demos',
  description: 'Spartronics brings its competition robot to schools, parishes and community events around Concord, CA. Visitors can drive the robot and talk with the students who built it.',
  body:
    section(pageTitle('Community Demos'), 'section--tight') +
    section(mediaText(
      img('demos-1', 'A young visitor driving the robot at a community event', 800, 600),
      `<h2>Drive the robot</h2>
       <p>Our booth is simple: the competition robot, a few of the students who built it, and a controller for visitors to try. Kids drive, parents ask questions, and everyone leaves knowing that a high-school team built a 120-pound machine from scratch in a few weeks.</p>
       <p>We've set up at school events, parish festivals and local STEM nights, and we're glad to come to yours. [EDIT: list the events you've actually attended.]</p>`
    ) + mediaText(
      img('demos-2', 'Spartronics booth with team banner', 800, 600),
      `<h2>What we bring</h2>
       <ul class="check-list">
         <li>The current competition robot and a safe driving area</li>
         <li>Student drivers and presenters from every sub-team</li>
         <li>Hands-on activities for younger kids</li>
         <li>Information on joining the team, the Robotics Club and <em>FIRST</em> programs for all ages</li>
       </ul>`, true
    ), 'section--flush-top') +
    section(`
      <h2>Upcoming Appearances</h2>
      ${panel('<p>[EDIT: list upcoming demos with date, place and time.] Nothing scheduled yet? Follow us on <a href="' + (site.social.instagram || '#') + '">Instagram</a> for announcements.</p>')}`, 'section--flush-top') +
    ctaBanner('Book a demo', 'Tell us the date, place and audience and we\'ll make it work.', [button('Request a demo', '/contact/?subject=Outreach', 'white')]) +
    relatedLinks([{ label: 'Outreach overview', href: '/outreach/' }, { label: 'FLL Mentoring', href: '/outreach/fll-mentoring/' }, { label: 'Contact', href: '/contact/' }])
};

const fll = {
  path: '/outreach/fll-mentoring/',
  title: 'FIRST LEGO League Mentoring',
  description: 'Spartronics students mentor FIRST LEGO League teams at local elementary and middle schools, coaching robot design, programming and teamwork.',
  body:
    section(pageTitle('FLL Mentoring', 'Coaching the teams that will one day join ours.'), 'section--tight') +
    section(mediaText(
      img('fll-1', 'Spartronics students coaching a FIRST LEGO League team', 800, 600),
      `<h2>How it works</h2>
       <p><em>FIRST</em> LEGO League (FLL) is the elementary and middle-school version of what we do: teams build and program a LEGO robot to complete missions, research a real-world problem, and present their work. Our students visit local FLL teams during their fall season to help with robot design, programming and practice judging.</p>
       <p>[EDIT: name the schools and teams you work with.]</p>`
    ) + mediaText(
      img('fll-2', 'FLL robot on the mission table', 800, 600),
      `<h2>Start a team</h2>
       <p>Want to start an FLL team at your school or parish? We can help you find the kit, the season challenge and a coach, and we'll come by for practice sessions. See <a href="/resources/first/">FIRST programs</a> for age ranges.</p>`, true
    ), 'section--flush-top') +
    ctaBanner('Ask about mentoring', 'Coaches and parents: we\'d love to hear from you.', [button('Contact us', '/contact/?subject=Outreach', 'white')]) +
    relatedLinks([{ label: 'Outreach overview', href: '/outreach/' }, { label: 'Community Demos', href: '/outreach/community-demos/' }, { label: 'FIRST Programs', href: '/resources/first/' }])
};

module.exports = [overview, demos, fll];
