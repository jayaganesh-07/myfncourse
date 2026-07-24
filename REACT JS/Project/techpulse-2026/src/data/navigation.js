export const navLinks = [
  { id: 'nav-home', label: 'Home', path: '/' },
  { id: 'nav-news', label: 'News', path: '/news' },
  { id: 'nav-gallery', label: 'Gallery', path: '/gallery' },
  { id: 'nav-reviews', label: 'Reviews', path: '/reviews' },
  { id: 'nav-about', label: 'About', path: '/about' },
]

export const footerLinks = [
  {
    id: 'footer-explore',
    heading: 'Explore',
    links: [
      { label: 'Home', path: '/' },
      { label: 'All News', path: '/news' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Reviews', path: '/reviews' },
    ],
  },
  {
    id: 'footer-company',
    heading: 'Project',
    links: [
      { label: 'About TechPulse', path: '/about' },
      { label: 'Sign Up', path: '/signup' },
      { label: 'Login', path: '/login' },
    ],
  },
  {
    id: 'footer-topics',
    heading: 'Topics',
    links: [
      { label: 'Space & Rockets', path: '/news?category=Space' },
      { label: 'Rail & Green Mobility', path: '/news?category=Mobility' },
      { label: 'Human Spaceflight', path: '/news?category=Space' },
      { label: 'Semiconductors', path: '/news?category=Hardware' },
    ],
  },
]
