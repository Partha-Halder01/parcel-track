import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about OneWorldCourier — our mission to provide real-time, secure parcel tracking for businesses and customers across 200+ cities. Founded in 2023.',
  openGraph: {
    title: 'About OneWorldCourier',
    description:
      'Meet the team behind OneWorldCourier. Engineers and logistics enthusiasts building the tracking experience customers deserve.',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
