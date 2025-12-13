import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Dev Tech Enterprises - Semiconductors, Sensors & More",
    template: "%s | Dev Tech Enterprises",
  },
  description: "Leading provider of semiconductors, sensors, cables & wires, switches, and lab equipment. Quality electronic components for businesses worldwide.",
  keywords: ["semiconductors", "sensors", "electronic components", "cables", "wires", "switches", "lab equipment", "electronics supplier"],
  authors: [{ name: "Dev Tech Enterprises" }],
  creator: "Dev Tech Enterprises",
  publisher: "Dev Tech Enterprises",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://devtechenterprises.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Dev Tech Enterprises",
    title: "Dev Tech Enterprises - Semiconductors, Sensors & More",
    description: "Leading provider of semiconductors, sensors, cables & wires, switches, and lab equipment",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dev Tech Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Tech Enterprises - Semiconductors, Sensors & More",
    description: "Leading provider of semiconductors, sensors, cables & wires, switches, and lab equipment",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
