import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

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
        ink: "#05070b",
        panel: "rgba(12, 18, 29, 0.72)",
        line: "rgba(148, 163, 184, 0.16)",
        primary: "#67e8f9",
        accent: "#a7f3d0",
        violet: "#c4b5fd"
      },
      boxShadow: {
        glow: "0 0 60px rgba(103, 232, 249, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "radial-soft": "radial-gradient(circle at top left, rgba(103,232,249,0.18), transparent 34%), radial-gradient(circle at 80% 10%, rgba(167,243,208,0.13), transparent 30%)"
      }
    }
  },
  plugins: [forms]
};

export default config;
