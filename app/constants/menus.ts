import type { NavMenu, NavMenuItems } from '~/types/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'Dashboard',
    items: [
      {
        title: 'Overview',
        icon: 'lucide:layout-dashboard',
  link: '/admin',
      },
      {
        title: 'Analytics',
        icon: 'lucide:bar-chart-3',
  link: '/admin/analytics',
      },
    ],
  },
  {
    heading: 'Management',
    items: [
      {
        title: 'Agents',
        icon: 'lucide:users',
  link: '/admin/agents',
      },
      {
        title: 'Onboarding Requests',
        icon: 'lucide:file-text',
  link: '/admin/onboarding',
      },
      {
        title: 'Customers',
        icon: 'lucide:user',
        link: '/admin/customers',
      },
      {
        title: 'Loans',
        icon: 'lucide:banknote',
        children: [
          {
            title: 'Applications',
            link: '/admin/loans/applications',
          },
          {
            title: 'Portfolio',
            link: '/admin/loans/portfolio',
          },
        ],
      },
      {
        title: 'Transactions',
        icon: 'lucide:arrow-left-right',
        link: '/admin/transactions',
      },
      {
        title: 'Staff',
        icon: 'lucide:shield',
        link: '/admin/staff',
      },
      {
        title: 'Audit Logs',
        icon: 'lucide:activity',
        link: '/admin/audit',
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        title: 'Account',
        icon: 'lucide:user-cog',
  link: '/admin/settings',
      },
    ],
  },
]

export const navMenuBottom: NavMenuItems = [
  {
    title: 'Help & Support',
    icon: 'lucide:circle-help',
    link: 'https://github.com/Syentia-io/innovative_finance',
  },
]
