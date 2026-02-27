import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

const siteUrl = "https://hueunlimited.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HUE Unlimited | Embedded Creative Studio",
    template: "%s | HUE Unlimited",
  },
  description:
    "The embedded creative partner for brands that produce at volume. Spotify. Disney. Red Bull. Death Row Records. 250M+ video views. Six global regions.",
  keywords: [
    "embedded creative studio",
    "brand campaigns",
    "creative direction",
    "content production",
    "HUE Unlimited",
    "Spotify Frequency",
    "creative agency Los Angeles",
  ],
  authors: [{ name: "HUE Unlimited" }],
  openGraph: {
    type: "website",
    siteName: "HUE Unlimited",
    title: "HUE Unlimited | Embedded Creative Studio",
    description:
      "The embedded creative partner for brands that produce at volume. Spotify. Disney. Red Bull. 250M+ video views.",
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUE Unlimited — Embedded Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUE Unlimited | Embedded Creative Studio",
    description:
      "The embedded creative partner for brands that produce at volume.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientShell>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
