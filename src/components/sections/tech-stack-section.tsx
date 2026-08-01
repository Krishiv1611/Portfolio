"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillPathways } from "@/lib/profile";
import { cn } from "@/lib/utils";

type Pathway = (typeof skillPathways)[number];

export function TechStackSection() {
  const [activePathId, setActivePathId] = useState<Pathway["id"]>("ai");
  const detailRef = useRef<HTMLDivElement>(null);
  const activeIndex = skillPathways.findIndex((path) => path.id === activePathId);
  const activePath = skillPathways[activeIndex] ?? skillPathways[0];

  useEffect(() => {
    const detail = detailRef.current;
    if (!detail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const control = animate(detail, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 380,
      ease: "outExpo"
    });

    return () => {
      control.revert();
    };
  }, [activePathId]);

  function moveTab(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + skillPathways.length) % skillPathways.length;
    const nextPath = skillPathways[nextIndex];
    setActivePathId(nextPath.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`skill-tab-${nextPath.id}`)?.focus();
    });
  }

  return (
    <section id="skills" className="section-band bg-canvas py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="04 / Capabilities" title="A focused stack for systems I can ship.">
          Technologies are grouped by responsibility, keeping the signal concise while preserving the full technical range from the resume.
        </SectionHeading>

        <div data-reveal className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-12">
          <div className="border-t border-white/12" role="tablist" aria-label="Technical skill areas">
            {skillPathways.map((path, index) => {
              const selected = path.id === activePathId;
              return (
                <button
                  key={path.id}
                  id={`skill-tab-${path.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="skill-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActivePathId(path.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      moveTab(index, 1);
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      moveTab(index, -1);
                    }
                  }}
                  className={cn(
                    "focus-ring flex min-h-14 w-full items-center justify-between border-b border-white/12 px-2 text-left transition-colors duration-200",
                    selected ? "bg-white/[0.055] text-white" : "text-white/46 hover:bg-white/[0.025] hover:text-white/78"
                  )}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <path.icon className="h-4 w-4" />
                    {path.label}
                  </span>
                  <span className="font-mono text-[10px] text-white/26">0{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div
            id="skill-panel"
            ref={detailRef}
            role="tabpanel"
            aria-labelledby={`skill-tab-${activePath.id}`}
            className="min-h-[330px] border border-white/12 bg-white/[0.018] p-6 md:p-9"
          >
            <div className="flex items-start justify-between gap-5 border-b border-white/12 pb-7">
              <div>
                <p className="font-mono text-[10px] uppercase text-white/30">Selected area</p>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{activePath.label}</h3>
              </div>
              <activePath.icon className="h-6 w-6 text-white/48" />
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 md:text-base md:leading-8">
              {activePath.summary}
            </p>

            <div className="mt-8 grid border-l border-t border-white/10 sm:grid-cols-2 md:grid-cols-3">
              {activePath.nodes.map((node, index) => (
                <div key={node} className="flex min-h-14 items-center border-b border-r border-white/10 px-4">
                  <span className="mr-3 font-mono text-[9px] text-white/22">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium text-white/72">{node}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
