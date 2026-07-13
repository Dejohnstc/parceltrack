import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL ?? "https://parceltrack-git-main-dejohnstcs-projects.vercel.app/"
  ),

  title: {
    default: "ValidXpress | Global Shipment Tracking",
    template: "%s | ValidXpress",
  },

  description:
    "Track shipments worldwide with real-time parcel tracking, secure logistics management and enterprise delivery solutions.",

  keywords: [
    "Parcel Tracking",
    "Shipment Tracking",
    "Courier",
    "Logistics",
    "Delivery",
    "Freight",
    "Cargo",
    "Tracking Number",
    "ValidXpress",
  ],

  authors: [
    {
      name: "ValidXpress",
    },
  ],

  creator: "ValidXpress",

  publisher: "ValidXpress",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.APP_URL,
    siteName: "ValidXpress",
    title: "ValidXpress | Global Shipment Tracking",
    description:
      "Enterprise shipment tracking platform with real-time logistics updates.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ValidXpress",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ValidXpress",
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
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
