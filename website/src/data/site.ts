export const BRAND = 'AR website developmenTURS'
export const EMAIL = 'zirnitisarturs@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('New website project')}`

export const NAV = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
] as const

export const DEPOSIT = 300

export const PACKAGES = [
  {
    id: 'business',
    name: 'Business Website',
    price: 2900,
    tagline: 'Everything a local or service business needs to win customers online.',
    features: [
      'Professional, one-of-a-kind design',
      'Up to 5 pages',
      'Bug-proof, fully responsive Webflow website',
      'Online booking',
      'Show off your services with high-quality images',
      'Customer reviews section',
    ],
  },
  {
    id: 'ecommerce',
    name: 'eCommerce Website',
    price: 5200,
    tagline: 'A complete online shop that takes orders and payments for you.',
    features: [
      'Professional, one-of-a-kind design',
      'Up to 20 pages',
      'Bug-proof, fully responsive Webflow website',
      'Ordering and payments built right in',
    ],
  },
] as const

export const formatUSD = (n: number) => `$${n.toLocaleString('en-US')}`
