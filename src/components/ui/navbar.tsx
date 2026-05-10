"use client";

import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-4 z-40 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300",
          scrolled
            ? "border-white/10 bg-slate-950/72 shadow-card backdrop-blur-2xl"
            : "border-white/5 bg-white/[0.035] backdrop-blur-xl"
        )}
      >
        <a href="#home" className="focus-ring rounded-full text-sm font-semibold tracking-tight text-white">
          Krishiv<span className="text-primary">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={profile.links.resume}
          className="focus-ring hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primary md:flex"
          download
        >
          <Download className="h-4 w-4" />
          Resume
        </a>

        <button
          type="button"
          className="focus-ring rounded-full border border-white/10 p-2 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <motion.div
          className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-card backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-white/8 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      ) : null}
    </motion.header>
  );
}
