import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HUE Unlimited | Creative Agency",
  description:
    "HUE Unlimited is a creative agency that brings bold ideas to life through design, branding, and digital experiences.",
  keywords: ["creative agency", "branding", "design", "digital", "HUE Unlimited"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
