import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'OneWorldCourier Terms of Service — the rules and guidelines governing use of our parcel tracking platform and services.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
