export const siteConfig = {
  name: 'Kecker',
  description: 'Bridging UX, software, and classical philosophy.',
  colors: {
    primary: '#971B2F',
    light: '#D54E6B',
    primaryBg: '#fce8eb',
  },
  font: 'Cardo',
  topbarLinks: [
    { name: 'Support', url: 'mailto:frontdoor@kecker.co' },
  ],
  footerSocials: {
    github: 'https://github.com/KeckerCo',
    x: 'https://x.com/vlukereddy',
  },
  navigation: [
    {
      group: 'About',
      pages: [
        { slug: 'home', title: 'Home', file: 'home.md' },
        { slug: 'privacy', title: 'Privacy Policy', file: 'privacy.md' },
      ],
    },
  ],
}
