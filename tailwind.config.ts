import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: ["class", '[data-theme="daylight"]'],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-geist-mono)", "'JetBrains Mono'", "monospace"],
      },
      colors: {
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        subtle: "var(--bg-subtle)",
        ink: {
          primary: "var(--ink-primary)",
          secondary: "var(--ink-secondary)",
          tertiary: "var(--ink-tertiary)",
        },
        hairline: "var(--border-hairline)",
        focus: "var(--border-focus)",
        signal: "var(--accent-signal)",
        verified: "var(--accent-verified)",
      },
      maxWidth: {
        container: "1360px",
      },
      boxShadow: {
        blueprint: "0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border-hairline)",
        drawer: "-20px 0 60px rgba(0, 0, 0, 0.4)",
      }
    }
  },
  plugins: [forms]
};

export default config;
