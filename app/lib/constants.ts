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

export const accountTypes = [
  {
    name: 'Customer',
    tagline: 'Find your next meal, fast and easy.',
    features: [
      'Browse menus from nearby restaurants',
      'Place orders and track delivery in real-time',
      'Save favorite restaurants and orders',
      'Rate and review restaurants and delivery drivers'
    ],
    href: '/register/customer'
  },
  {
    name: 'Restaurant Manager',
    tagline: 'Simplify orders, grow your business.',
    features: [
      'Manage multiple restaurants with a single account',
      'Manage menus and item availability',
      'Receive and process orders seamlessly',
      'Track real-time sales and revenue reports'
    ],
    href: '/register/manager'
  },
  {
    name: 'Delivery Driver',
    tagline: 'Deliver meals, earn on your time.',
    features: [
      'View and accept delivery requests',
      'Track earnings and completed deliveries',
      'Flexible schedule management',
      'Instant notification for new orders'
    ],
    href: '/register/driver'
  }
]

