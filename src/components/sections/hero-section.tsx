"use client";

import { createScope, createTimeline, set, stagger } from "animejs";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { profile, socialLinks } from "@/lib/profile";

const roleLines = ["Aspiring Full-Stack", "& AI Engineer."];
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root }).add(() => {
      set("[data-hero-kicker], [data-hero-copy], [data-hero-actions], [data-hero-social]", {
        opacity: 0,
        translateY: 20
      });
      set("[data-hero-line]", { opacity: 0, translateY: "105%" });
      set("[data-hero-rule]", { scaleX: 0 });

      createTimeline({ defaults: { ease: "outExpo" } })
        .add("[data-hero-rule]", { scaleX: 1, duration: 1000 }, 0)
        .add("[data-hero-kicker]", { opacity: 1, translateY: 0, duration: 600 }, 80)
        .add(
          "[data-hero-line]",
          {
            opacity: 1,
            translateY: "0%",
            delay: stagger(95),
            duration: 820
          },
          170
        )
        .add("[data-hero-copy]", { opacity: 1, translateY: 0, duration: 650 }, 430)
        .add("[data-hero-actions]", { opacity: 1, translateY: 0, duration: 580 }, 520)
        .add("[data-hero-social]", { opacity: 1, translateY: 0, duration: 520 }, 600);
    });

    return () => scope.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-[88svh] overflow-hidden bg-[#070707] text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-[30%] border-t border-white/[0.055]" />
        <div className="absolute inset-x-0 bottom-24 border-t border-white/[0.055]" />
        <div className="absolute bottom-0 right-[10%] top-0 border-l border-white/[0.055]" />
        <div
          data-hero-rule
          className="absolute left-0 top-[30%] h-px w-28 origin-left bg-white/45 sm:w-40"
        />
      </div>

      <div className="section-shell relative z-10 flex min-h-[88svh] flex-col justify-end pb-8 pt-28 md:pb-10">
        <div className="max-w-6xl">
          <div
            data-hero-kicker
            className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase text-white/58"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              Third-year B.Tech Computer Science
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>

          <h1 className="max-w-6xl font-semibold">
            <span className="block overflow-hidden text-2xl text-white/72 md:text-3xl">
              <span data-hero-line className="inline-block">Krishiv Arora.</span>
            </span>
            <span className="mt-3 block text-[2.55rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
              {roleLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <span data-hero-line className="metal-text inline-block">{line}</span>
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero-copy
            className="mt-6 max-w-2xl text-base leading-7 text-white/64 md:text-lg md:leading-8"
          >
            I am learning by building full-stack products and applied AI systems across interfaces, APIs, data, and agent workflows.
          </p>

          <div data-hero-actions className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="pressable focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-black hover:bg-white/86"
            >
              View selected work
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href={profile.links.resume}
              download
              className="pressable focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/22 bg-white/[0.04] px-5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4" />
              Download resume
            </a>
          </div>

          <div data-hero-social className="mt-6 flex flex-wrap items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="pressable focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-xs text-white/52 hover:bg-white/[0.06] hover:text-white"
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
                {link.href.startsWith("http") ? <ArrowUpRight className="h-3 w-3" /> : null}
              </a>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
