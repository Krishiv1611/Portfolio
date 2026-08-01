import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        graphite: "#101012",
        canvas: "#08080a",
        steel: "#18181c",
        paper: "#f5f5f7",
        muted: "#98989f",
        dim: "#68686f",
        line: "rgba(255, 255, 255, 0.12)",
        primary: "#f5f5f7",
        accent: "#c8c8ce",
        coral: "#e8a2a2"
      },
      boxShadow: {
        card: "0 24px 72px rgba(0, 0, 0, 0.3)",
        lift: "0 32px 90px rgba(0, 0, 0, 0.45)"
      }
    }
  },
  plugins: [forms]
};

export default config;
