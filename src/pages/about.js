const C = require('../components');
const { img, section, pageTitle, panel, button, mediaText, ctaBanner, relatedLinks, icons, sectionLabel } = C;

/* ---------- /about/ ---------- */
const about = {
  path: '/about/',
  title: 'About the Team',
  description: 'Spartronics, FRC Team 2141, has represented De La Salle and Carondelet High Schools in Concord, CA since 2007. Learn who we are, how the team is organized, and what we value.',
  body:
    section(pageTitle('About the Team', 'FRC Team 2141 · De La Salle &amp; Carondelet High Schools · Concord, California'), 'section--tight') +
    section(mediaText(
      img('about-shop', 'Students in the De La Salle Fabrication Room', 800, 600),
      `<h2>Who We Are</h2>
       <p>Spartronics is the <em>FIRST</em>® Robotics Competition team of <strong>De La Salle High School</strong> and its sister school <strong>Carondelet High School</strong> in Concord, California. Founded as a rookie team in <strong>2007</strong>, we've now competed for twenty seasons and 23 events across Northern California — from the Silicon Valley and Sacramento Regionals to the new <em>FIRST</em> California District.</p>
       <p>The name blends <em>Spartans</em> — De La Salle's mascot — with <em>electronics</em>. For most of our history we spelled it "Spartonics"; since 2024 the official records read "Spartronics." Same number, same school, same team.</p>
       <p class="small muted">[EDIT: add current team size, founders, and anything else you'd like visitors to know.]</p>`
    ), 'section--flush-top') +
    section(mediaText(
      img('about-subteams', 'Sub-team leads reviewing the robot', 800, 600),
      `<h2>How the Team Works</h2>
       <p>Students run the team; mentors coach. Work is split across five sub-teams, and most members end up touching more than one over their time on the team:</p>
       <ul>
         <li><a href="/join/#mechanical"><strong>Mechanical</strong></a> — fabrication, machining and assembly in the Fabrication Room</li>
         <li><a href="/join/#design"><strong>Design</strong></a> — CAD and 3D modeling; turning ideas into parts</li>
         <li><a href="/join/#electrical"><strong>Electrical</strong></a> — wiring, sensors and pneumatics; the bridge between Mechanical and Programming</li>
         <li><a href="/join/#programming"><strong>Programming</strong></a> — Java with WPILib in VS Code; drive code, autonomous routines and vision</li>
         <li><a href="/join/#business"><strong>Business</strong></a> — sponsors, budget, outreach, awards submissions and social media</li>
       </ul>`, true
    ), 'section--flush-top') +
    section(`
      <h2 class="center">What We Value</h2>
      <div class="grid grid--3">
        ${panel('<p>We build to compete and we compete to learn. Every subsystem gets designed, tested, broken and rebuilt until it works under match pressure.</p>', 'Craft')}
        ${panel('<p>Three of our four playoff runs since 2016 came because another team\'s scouts chose us. Being a dependable partner — on the field and in the pits — is who we are.</p>', 'Reliability')}
        ${panel('<p><em>FIRST</em> calls it Gracious Professionalism®: fierce competition and real kindness at the same time. Lending a part to a rival in the pits is a point of pride.</p>', 'Gracious Professionalism')}
      </div>`, 'section--flush-top') +
    section(`
      ${sectionLabel('A Lasallian Program')}
      ${panel(`<p>De La Salle is a Catholic, Lasallian school, and the team's recorded motto comes from Albert Einstein: <em>"Science without religion is lame, religion without science is blind."</em> We take it as a reminder that curiosity and character belong together. The team works out of the school's <strong>Fabrication Room</strong>, a shared shop for robotics, technical theatre, sculpture and engineering classes, and draws students from the for-credit <em>Robotics, Engineering, and Programming</em> course as well as the Robotics Club.</p>`)}`, 'section--flush-top') +
    ctaBanner('Meet the people behind the robot', 'Students lead every sub-team. Mentors keep the shop safe and the ideas sharp.', [button('Meet Our Team', '/team/', 'white')]) +
    relatedLinks([{ label: 'Competition History', href: '/history/' }, { label: 'Our Robots', href: '/robots/' }, { label: 'Join the Team', href: '/join/' }])
};

/* ---------- /team/ ---------- */
const team = {
  path: '/team/',
  title: 'Our Team',
  description: 'Meet the students, captains, coach and mentors of Spartronics, FRC Team 2141 from De La Salle and Carondelet High Schools in Concord, CA.',
  body:
    section(pageTitle('Our Team') + `<p class="season-label" data-season-label>2026–27 Season</p>`, 'section--tight') +
    section(`
      <div data-render="team" aria-live="polite">
        <noscript>
          <div class="panel"><p><strong>Roster</strong> — the full roster loads from <code>assets/data/team.json</code>. Captains, sub-team leads, coach and mentors are listed there. Enable JavaScript to see the photo grid.</p></div>
        </noscript>
      </div>
      <p class="small muted" style="margin-top:32px">Students are listed by first name and last initial. Mentors are listed by full name. To update the roster, edit <code>assets/data/team.json</code>.</p>`, 'section--flush-top') +
    ctaBanner('Want to see your name here?', 'Spartronics is open to every De La Salle and Carondelet student. No experience required.', [button('Join the Team', '/join/', 'white')]) +
    relatedLinks([{ label: 'About the Team', href: '/about/' }, { label: 'Our Robots', href: '/robots/' }, { label: 'Contact', href: '/contact/' }])
};

/* ---------- /robots/ ---------- */
const robots = {
  path: '/robots/',
  title: 'Our Robots',
  description: 'Every Spartronics robot from Sparticus and Leonidas to our district-era machines — specs, results and the games they were built for.',
  body:
    section(pageTitle('Our Robots', 'From <em>Sparticus</em> to <em>Leonidas</em> and beyond — twenty seasons of Spartan machines.'), 'section--tight') +
    section(`
      <div data-render="robots" aria-live="polite">
        <noscript><div class="panel"><p>Robot history loads from <code>assets/data/robots.json</code>. Our robots have included <strong>Sparticus</strong> (founding era) and <strong>Leonidas</strong> (2015–2023), named for the Spartan king. Enable JavaScript to see photos and specs.</p></div></noscript>
      </div>`, 'section--flush-top') +
    section(`
      <h2>Robot Names</h2>
      <div class="grid grid--2">
        ${panel('<p>Our first named robot, recorded on an early Silicon Valley Regional roster alongside sponsors De La Salle High School and AT&amp;T West. A playful spelling of <em>Spartacus</em>.</p>', 'Sparticus (founding era)')}
        ${panel('<p>Named for the Spartan king of Thermopylae, <em>Leonidas</em> appears on official records from 2015 to 2023 — covering our three straight semifinal seasons from 2016 to 2018.</p>', 'Leonidas (2015–2023)')}
      </div>`, 'section--flush-top') +
    relatedLinks([{ label: 'Competition History', href: '/history/' }, { label: 'Our Code on GitHub', href: '/resources/code/' }, { label: 'Join the Team', href: '/join/' }])
};

/* ---------- /history/ ---------- */
const history = {
  path: '/history/',
  title: 'Competition History',
  description: 'Season-by-season results for FRC Team 2141 Spartronics since 2007: regionals, district events, playoff runs, records and milestones.',
  body:
    section(pageTitle('Competition History', 'Twenty seasons · 23 events · every result we can document, 2007 to today.'), 'section--tight') +
    C.statsBand([
      { number: '9th', label: 'Best rank, 2017 Sacramento (6–2–1)' },
      { number: '4th', label: 'Best qualification rank, 2011 Silicon Valley' },
      { number: '407', label: 'Highest alliance score, 2018 playoffs' },
      { number: '3', label: 'Straight semifinals, 2016–2018' }
    ]) +
    section(`
      <h2>Eras of the Team</h2>
      <ul class="timeline">
        <li><p class="timeline__era">2007–2009</p><h3>Founding years</h3><p>Rookie season at the Silicon Valley Regional in 2007. By our second year we were attending two regionals — including San Diego, still our only event outside Northern California — and were featured on ABC7 News.</p></li>
        <li><p class="timeline__era">2010–2013</p><h3>Rising at Sacramento</h3><p>We moved to the Sacramento Regional and produced our best qualifying results: 7th in 2010, a remarkable 4th at Silicon Valley in 2011, and 10th in 2013, with two quarterfinal appearances.</p></li>
        <li><p class="timeline__era">2016–2018</p><h3>The playoff era</h3><p>Three straight semifinal runs in three different roles — second pick (2016), alliance captain (2017) and first pick (2018). Scouts kept choosing us even when our rank was middling: a reliable partner who did its job.</p></li>
        <li><p class="timeline__era">2019–2023</p><h3>Disruption and rebuilding</h3><p>The pandemic erased 2020 and 2021. We came back in 2022 with few veterans and climbed steadily: 3–5–1, then 5–5, then 6–6.</p></li>
        <li><p class="timeline__era">2026–</p><h3>The district era</h3><p>California's new <em>FIRST</em> district gave us 24 qualification matches, a home event in Pittsburg, and our first playoff berth in eight years — a 4th-place alliance at the Contra Costa District Event.</p></li>
      </ul>`, 'section--flush-top') +
    section(`
      <h2>Season by Season</h2>
      <p class="muted small">Ranks for 2010–2013 come from FRC-DB; 2016 onward from official <em>FIRST</em> event records. Where the public record is silent, the entry says "Competed."</p>
      <div data-render="seasons" aria-live="polite">
        <noscript><div class="table-wrap"><table>
          <tr><th>Year</th><th>Game</th><th>Event(s)</th><th>Result</th></tr>
          <tr><td>2026</td><td>REBUILT</td><td>CA District Sacramento; CA District Contra Costa</td><td>24/38, 5–7; 19/35, 5–7, 4th-place alliance</td></tr>
          <tr><td>2025</td><td>REEFSCAPE</td><td>East Bay Regional</td><td>27/55, 5–4</td></tr>
          <tr><td>2024</td><td>CRESCENDO</td><td>Sacramento Regional</td><td>23/38, 6–6</td></tr>
          <tr><td>2018</td><td>POWER UP</td><td>Sacramento Regional</td><td>23/65, 5–3, Semifinalist</td></tr>
          <tr><td>2017</td><td>STEAMWORKS</td><td>Sacramento Regional</td><td>9/56, 6–2–1, Semifinalist (captain)</td></tr>
          <tr><td>2016</td><td>STRONGHOLD</td><td>Sacramento Regional</td><td>44/60, 2–6, Semifinalist</td></tr>
          <tr><td>2007</td><td>Rack 'N' Roll</td><td>Silicon Valley Regional</td><td>Rookie season</td></tr>
        </table></div><p>Full history is in <code>assets/data/seasons.json</code>.</p></noscript>
      </div>`, 'section--flush-top') +
    section(`
      <h2>Records &amp; Milestones</h2>
      <ul class="record-list">
        <li><strong>4th</strong>Best qualification rank — 2011 Silicon Valley Regional</li>
        <li><strong>6–2–1</strong>Best documented qualification record — 2017 Sacramento</li>
        <li><strong>Alliance 6 Captain</strong>Only alliance captaincy — 2017 Sacramento</li>
        <li><strong>3 in a row</strong>Consecutive playoff appearances, 2016–2018, each reaching the semifinals</li>
        <li><strong>407</strong>Highest alliance score — 2018 Sacramento Quarterfinal 2-2</li>
        <li><strong>393</strong>Highest qualification score — 2018 Sacramento Q84</li>
        <li><strong>+285</strong>Biggest win margin (315–30) — 2026 Sacramento District Q57</li>
        <li><strong>2008</strong>Only out-of-region event — San Diego Regional</li>
      </ul>`, 'section--flush-top') +
    section(`
      <h2>Familiar Faces on the Field</h2>
      <p class="prose">Two decades at the same Northern California events means a lot of shared history. We've been allied with <strong>1678 Citrus Circuits</strong> and <strong>254 The Cheesy Poofs</strong> — and lost to both. <strong>1072 Harker Robotics</strong> was our first pick when we captained in 2017 and a playoff opponent in 2026. <strong>2135 Presentation Invasion</strong>, a fellow 2007 rookie, was our playoff partner in 2026. And <strong>701 RoboVikes</strong>, <strong>1323 MadTown Robotics</strong>, <strong>2073 EagleForce</strong>, <strong>5496 Robo Knights</strong> and <strong>6619</strong> have all shaped our playoff story.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Event</th><th>Appearances</th><th>Years</th></tr></thead>
        <tbody>
          <tr><td>Sacramento Regional (Davis, CA)</td><td>12</td><td>2010–2019, 2023, 2024 (plus the cancelled 2020)</td></tr>
          <tr><td>Silicon Valley Regional (San Jose, CA)</td><td>6</td><td>2007, 2008, 2009, 2011, 2014, 2022</td></tr>
          <tr><td>CA District Contra Costa Event (Pittsburg, CA)</td><td>1 (+2027)</td><td>2026, 2027</td></tr>
          <tr><td>CA District Sacramento Event (Elk Grove, CA)</td><td>1</td><td>2026</td></tr>
          <tr><td>East Bay Regional</td><td>1</td><td>2025</td></tr>
          <tr><td>San Diego Regional</td><td>1</td><td>2008</td></tr>
        </tbody>
      </table></div>`, 'section--flush-top') +
    ctaBanner('Help us write the next chapter', 'The 2027 BIOCORE™ season kicks off in January. Sponsors and new members make it possible.', [button('Become a Sponsor', '/sponsor/', 'white'), button('Join the Team', '/join/', 'outline-light')]) +
    relatedLinks([{ label: 'Our Robots', href: '/robots/' }, { label: 'About the Team', href: '/about/' }, { label: 'Team 2141 on The Blue Alliance', href: 'https://www.thebluealliance.com/team/2141' }])
};

module.exports = [about, team, robots, history];
