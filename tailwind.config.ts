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
        black: "#000000",
        white: "#ffffff",
        yellow: "#ffff00",
        red: "#ff0000",
        blue: "#0000ff",
        muted: "rgba(255,255,255,0.36)",
        border: "rgba(255,255,255,0.09)",
        dim: "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        display: ['"Montserrat"', "system-ui", "sans-serif"],
        body: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        mono: ['"Roboto"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
