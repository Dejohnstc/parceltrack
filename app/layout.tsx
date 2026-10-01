import type { Metadata } from "next";
import "./globals.css";

import TawkChat from "@/components/chat/TawkChat";

const siteUrl = "https://www.validxpress.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ValidXpress | Global Shipment Tracking",
    template: "%s | ValidXpress",
  },

  description:
    "Track shipments worldwide with real-time shipment tracking, delivery updates, and secure logistics management with ValidXpress.",

  keywords: [
    "ValidXpress",
    "shipment tracking",
    "parcel tracking",
    "package tracking",
    "track shipment",
    "track package",
    "tracking number",
    "courier tracking",
    "delivery tracking",
    "logistics",
    "freight tracking",
    "cargo tracking",
    "global shipment tracking",
  ],

  authors: [
    {
      name: "ValidXpress",
      url: siteUrl,
    },
  ],

  creator: "ValidXpress",
  publisher: "ValidXpress",

  applicationName: "ValidXpress",

  category: "logistics",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ValidXpress",
    title: "ValidXpress | Global Shipment Tracking",
    description:
      "Track shipments worldwide with ValidXpress. Get real-time tracking updates, delivery information, and shipment status from one secure platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ValidXpress Global Shipment Tracking",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ValidXpress | Global Shipment Tracking",
    description:
      "Track shipments worldwide with ValidXpress.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}

        <TawkChat />
      </body>
    </html>
  );
}