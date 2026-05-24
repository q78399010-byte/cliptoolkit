import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d12",
        panel: "#11141b",
        line: "#242936",
        mint: "#2ee9a6",
        signal: "#62a8ff",
        ember: "#ffb86c"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
