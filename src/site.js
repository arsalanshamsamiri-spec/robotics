// Single source of truth for site-wide settings and the menu.
// Edit here and run `node build.js` — every page picks up the change.

const site = {
  name: 'Spartronics',
  teamNumber: '2141',
  fullName: 'Spartronics – FRC Team 2141',
  tagline: 'Spartan Spirit, Engineered.',            // [EDIT] official tagline, if the team has one
  school: 'De La Salle High School',
  sisterSchool: 'Carondelet High School',
  city: 'Concord, CA',
  address: '1130 Winton Drive, Concord, CA 94518',
  url: 'https://spartronics2141.vercel.app',          // [EDIT] final domain, e.g. https://spartronics2141.org
  email: 'robotics@dlshs.org',                        // [EDIT] team email address
  rookieYear: 2007,
  currentSeason: '2026–27',
  // Social links. Leave a value empty ('') to hide that icon everywhere.
  social: {
    instagram: 'https://instagram.com/',               // [EDIT]
    youtube: 'https://www.youtube.com/',               // [EDIT]
    github: 'https://github.com/2141-Spartonics',
    linkedin: ''                                       // [EDIT] optional
  },
  // Third-party services
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',   // [EDIT] contact + interest forms
  donateUrl: '',                                               // [EDIT] donation page URL (school giving page, Zeffy, etc.)
  // Google Analytics / Site Kit replacement. Leave blank to disable.
  gaMeasurementId: ''
};

// Menu structure. `children[0]` is always the section overview page.
const menu = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About the Team', href: '/about/' },
      { label: 'Our Team', href: '/team/' },
      { label: 'Our Robots', href: '/robots/' }
    ]
  },
  {
    label: 'Join',
    href: '/join/',
    children: [
      { label: 'Join the Team', href: '/join/' },
      { label: 'Robotics Club', href: '/join/robotics-club/' }
    ]
  },
  {
    label: 'Outreach',
    href: '/outreach/',
    children: [
      { label: 'Overview', href: '/outreach/' },
      { label: 'Community Demos', href: '/outreach/community-demos/' },
      { label: 'FLL Mentoring', href: '/outreach/fll-mentoring/' }
    ]
  },
  {
    label: 'Resources',
    href: '/resources/',
    children: [
      { label: 'Overview', href: '/resources/' },
      { label: 'Sub-Team Training', href: '/resources/training/' },
      { label: 'Code', href: '/resources/code/' },
      { label: 'Team Handbook', href: '/resources/handbook/' },
      { label: 'FIRST Programs', href: '/resources/first/' }
    ]
  },
  {
    label: 'Support Us',
    href: '/sponsor/',
    children: [
      { label: 'Sponsorship', href: '/sponsor/' },
      { label: 'Donate', href: '/donate/' }
    ]
  },
  { label: 'History', href: '/history/', highlight: true },
  { label: 'Contact', href: '/contact/' }
];

module.exports = { site, menu };
