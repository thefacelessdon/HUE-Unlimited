import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HUE Unlimited | Embedded Creative Studio",
  description:
    "The embedded creative partner for brands that produce at volume. Spotify. Disney. Red Bull. Death Row Records. 250M+ video views. Six global regions.",
  keywords: [
    "embedded creative studio",
    "brand campaigns",
    "creative direction",
    "content production",
    "HUE Unlimited",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
