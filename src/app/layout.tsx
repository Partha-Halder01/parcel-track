import type { Metadata, Viewport } from "next";
import { Bungee, Josefin_Sans } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
  preload: true,
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#237227",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oneworldcourier.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneWorldCourier — Real-Time Parcel & Shipment Tracking",
    template: "%s | OneWorldCourier",
  },
  description:
    "Track your parcels in real-time with OneWorldCourier. Secure, credential-based shipment tracking with live status updates, full timeline history, and estimated delivery dates for businesses and customers across 200+ cities.",
  keywords: [
    "parcel tracking",
    "shipment tracking",
    "real-time tracking",
    "delivery tracking",
    "courier service",
    "logistics platform",
    "package tracking",
    "live delivery updates",
    "oneworldcourier",
    "one world courier",
    "track parcel online",
    "courier tracking India",
  ],
  authors: [{ name: "OneWorldCourier" }],
  creator: "OneWorldCourier",
  publisher: "OneWorldCourier",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "OneWorldCourier — Real-Time Parcel & Shipment Tracking",
    description:
      "Secure parcel tracking with live status updates, full timeline history, and estimated delivery dates across 200+ cities.",
    type: "website",
    locale: "en_US",
    siteName: "OneWorldCourier",
    url: siteUrl,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "OneWorldCourier - Real-Time Parcel Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneWorldCourier — Real-Time Parcel Tracking",
    description:
      "Track parcels in real-time with secure, credential-based tracking across 200+ cities.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "logistics",
};

// JSON-LD structured data for the organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OneWorldCourier",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "Real-time parcel tracking platform with secure, credential-based shipment tracking for businesses and customers.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "customer service",
    email: "support@oneworldcourier.com",
    availableLanguage: "English",
    areaServed: "IN",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bungee.variable} ${josefin.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
