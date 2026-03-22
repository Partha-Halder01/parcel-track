import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Parcel',
  description:
    'Enter your Tracking ID and password to track your parcel in real-time. View live status, location updates, and estimated delivery date on OneWorldCourier.',
  openGraph: {
    title: 'Track Your Parcel | OneWorldCourier',
    description:
      'Real-time parcel tracking with live status updates and full shipment timeline.',
  },
  alternates: {
    canonical: '/track',
  },
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}
