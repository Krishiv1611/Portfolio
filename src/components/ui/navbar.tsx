"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, FileText, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [istTime, setIstTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setIstTime(formatter.format(now));
      } catch {
        setIstTime("12:00:00");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/85 backdrop-blur-md hairline-b transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Left: Identity & Live Telemetry */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="font-medium text-ink-primary hover:text-signal transition-colors text-sm md:text-base tracking-tight"
          >
            Krishiv Arora
          </a>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-ink-tertiary px-2.5 py-1 rounded bg-surface hairline-border">
            <span className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse" />
            <span>New Delhi · IST</span>
            <span className="text-ink-secondary tabular-nums">{istTime || "--:--:--"}</span>
          </div>
        </div>

        {/* Right: Navigation Anchors, Theme Toggle & Resume Drawer Trigger */}
        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden md:flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-ink-secondary">
            <a
              href="#systems"
              className="hover:text-ink-primary transition-colors py-1 hover:border-b hover:border-signal"
            >
              Systems
            </a>
            <a
              href="#about"
              className="hover:text-ink-primary transition-colors py-1 hover:border-b hover:border-signal"
            >
              About
            </a>
            <a
              href="#archive"
              className="hover:text-ink-primary transition-colors py-1 hover:border-b hover:border-signal"
            >
              Archive
            </a>
          </nav>

          <div className="h-4 w-px bg-hairline hidden md:block" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "obsidian" ? "Daylight" : "Obsidian"} mode`}
            className="p-2 rounded bg-surface hover:bg-subtle hairline-border text-ink-secondary hover:text-ink-primary transition-colors"
            title={`Switch to ${theme === "obsidian" ? "Swiss Daylight" : "Obsidian Carbon"} mode`}
          >
            {theme === "obsidian" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-ink-primary" />
            )}
          </button>

          {/* Resume Spec Drawer Trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-surface hover:bg-subtle hairline-border text-ink-primary hover:border-focus transition-all group"
          >
            <FileText className="w-3.5 h-3.5 text-signal" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-ink-tertiary group-hover:text-signal transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
