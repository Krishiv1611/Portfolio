"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "obsidian" | "daylight";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "obsidian",
  toggleTheme: () => {},
  setTheme: () => {},
});

const THEME_KEY = "krishiv_portfolio_theme";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "daylight" || saved === "obsidian" ? saved : "obsidian";
  } catch {
    return "obsidian";
  }
}

function getServerSnapshot(): Theme {
  return "obsidian";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (next: Theme) => {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore storage write errors
    }
    document.documentElement.setAttribute("data-theme", next);
    listeners.forEach((listener) => listener());
  };

  const toggleTheme = () => {
    const next = theme === "obsidian" ? "daylight" : "obsidian";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
