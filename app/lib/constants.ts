export const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/#about'
  },
  {
    label: 'Services',
    href: '/#services',
  },
  {
    label: 'Blog',
    href: '#'
  },
  {
    label: 'Sign up',
    href: '/register',
    onlyMobile: true,
    signedOutOnly: true
  },
  {
    label: 'Sign in',
    href: '/login',
    onlyMobile: true,
    signedOutOnly: true
  },
  {
    label: 'Logout',
    href: '/api/auth/signout',
    onlyMobile: true,
    signedInOnly: true
  }
];
