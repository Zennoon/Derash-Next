import { Award, CookingPot, Gauge, History, ListOrdered } from "lucide-react";

export const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Dashboard',
    href: '/redirect',
    signedInOnly: true
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
    label: 'Contact',
    href: '/#contact'
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
  },
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

export const foodImages = [
  {
    href: '/chicken-cartoon.png',
    label: 'Cartoon chicken'
  },
  {
    href: '/fruit-punch.png',
    label: 'Cartoon fruit punch'
  },
  {
    href: '/avocado-cartoon.png',
    label: 'Cartoon avocado'
  },
  {
    href: '/burger.png',
    label: 'Cartoon burger'
  },
  {
    href: '/lemonade-cartoon.png',
    label: 'Cartoon lemonade'
  },
  {
    href: '/pizza.png',
    label: 'Cartoon pizza'
  },
  {
    href: '/salad-cartoon.png',
    label: 'Cartoon salad'
  },
  {
    href: '/watermelon-cartoon.png',
    label: 'Cartoon watermelon'
  }
]

export const authProviders = [
  {
    name: 'Google',
    id: 'google',
    icon: '/google-icon.png'
  },
  {
    name: 'Facebook',
    id: 'facebook',
    icon: '/facebook-icon.png'
  },
  {
    name: 'Twitter',
    id: 'twitter',
    icon: '/twitter-icon.png'
  }
];

export const managerSidebarItems = [
  {
    label: 'Dashboard',
    href: '/m/dashboard',
    icon: Gauge
  },
  {
    label: 'Orders',
    href: '/m/orders',
    icon: ListOrdered
  },
  {
    label: 'Restaurants',
    href: '/m/restaurants',
    icon: CookingPot
  },
  {
    label: 'Leaderboard',
    href: '/m/leaderboard',
    icon: Award
  },
  {
    label: 'History',
    href: '/m/history',
    icon: History
  }
];

export const timeSpans = [
  {
    label: 'Today',
    queryKey: 'today'
  },
  {
    label: 'This week',
    queryKey: 'weekly'
  },
  {
    label: 'This month',
    queryKey: 'monthly'
  },
  {
    label: 'This half year',
    queryKey: 'semiAnnual'
  },
  {
    label: 'This year',
    queryKey: 'annual'
  },
  {
    label: 'All time',
    queryKey: 'allTime'
  }
]
