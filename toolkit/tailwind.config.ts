import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0C0C0C",
        "surface-card": "#141414",
        "surface-elevated": "#1A1A1A",
        "surface-inset": "#0A0A0A",
        border: "#1F1F1F",
        "border-medium": "#2A2A2A",
        "border-accent": "#3D3224",
        text: "#E8E4E0",
        muted: "#9A9590",
        dim: "#5C5854",
        accent: "#C4A67A",
        "accent-warm": "#A68B5B",
        "accent-glow": "rgba(196, 166, 122, 0.08)",
        status: {
          green: "#6B9E6A",
          red: "#C45B5B",
          blue: "#6B8EC4",
          orange: "#C49B6B",
          purple: "#9B7EC4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        "section": "40px",
      },
      borderRadius: {
        card: "8px",
      },
      transitionDuration: {
        card: "200ms",
        fast: "150ms",
      },
      keyframes: {
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease",
        "overlay-in": "overlay-in 0.2s ease",
      },
    },
  },
  plugins: [],
};
export default config;
