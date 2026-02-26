import type { Metadata } from "next";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cultural Architecture Toolkit",
  description:
    "Practice surface for cultural ecosystem analysis and intervention",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          ["--font-display" as string]: "'DM Serif Display', serif",
          ["--font-body" as string]: "'DM Sans', sans-serif",
          ["--font-mono" as string]: "'JetBrains Mono', monospace",
        }}
      >
        {children}
      </body>
    </html>
  );
}
