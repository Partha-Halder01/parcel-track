import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'OneWorldCourier Privacy Policy — how we collect, use, and protect your personal information when using our parcel tracking platform.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
