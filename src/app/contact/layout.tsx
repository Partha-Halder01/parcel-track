import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact OneWorldCourier for support, partnership enquiries, or questions about our real-time parcel tracking platform. Email, phone, or send us a message.',
  openGraph: {
    title: 'Contact OneWorldCourier',
    description:
      'Have questions about parcel tracking? Reach out to us via email, phone, or our contact form.',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
