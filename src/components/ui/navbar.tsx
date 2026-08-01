"use client";

import { animate, createScope } from "animejs";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const rootRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root }).add(() => {
      animate("[data-nav-shell]", {
        opacity: [0, 1],
        translateY: [-14, 0],
        duration: 700,
        ease: "outExpo"
      });
    });

    return () => scope.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menu.style.opacity = open ? "1" : "0";
      menu.style.transform = open ? "translateY(0)" : "translateY(-10px)";
      return;
    }

    const control = animate(menu, {
      opacity: open ? [0, 1] : [1, 0],
      translateY: open ? [-10, 0] : [0, -10],
      duration: open ? 320 : 190,
      ease: open ? "outExpo" : "inQuad"
    });

    return () => {
      control.revert();
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-40">
      <nav
        data-nav-shell
        aria-label="Primary navigation"
        className={cn(
          "border-b px-4 text-paper transition-[background-color,border-color] duration-300",
          scrolled || open
            ? "border-white/12 bg-ink/92 backdrop-blur-xl"
            : "border-white/10 bg-ink/45 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between">
          <a href="#home" className="focus-ring rounded-sm text-sm font-semibold">
            Krishiv Arora
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md px-3 py-2 text-sm text-white/58 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={profile.links.resume}
            download
            className="pressable focus-ring hidden min-h-10 items-center gap-2 rounded-md border border-white/16 bg-white/[0.06] px-4 text-sm font-medium text-white hover:border-white/32 hover:bg-white/[0.1] sm:flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            type="button"
            className="pressable focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-white/16 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-navigation"
        aria-hidden={!open}
        className={cn(
          "mx-3 mt-2 border border-white/12 bg-[#0a0a0c]/98 p-2 shadow-lift backdrop-blur-xl lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ opacity: 0, transform: "translateY(-10px)" }}
      >
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            tabIndex={open ? 0 : -1}
            className="focus-ring flex min-h-12 items-center justify-between rounded-md px-4 text-sm text-white/66 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
            onClick={() => setOpen(false)}
          >
            {item.label}
            <span className="font-mono text-[10px] text-white/28">0{index + 1}</span>
          </a>
        ))}
      </div>
    </header>
  );
}
