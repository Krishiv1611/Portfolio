"use client";

import React from "react";
import {
  Users,
  Award,
  Trophy,
  Code2,
  ExternalLink,
  FileText,
  Terminal,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import {
  IDENTITY,
  RECOGNITION_RECORD,
  TECHNICAL_SPEC_LINE,
  ABOUT_ESSAY,
} from "@/lib/systems-data";

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  // Recognition badges and icons aligned with the verified record
  const recognitionMeta = [
    {
      badge: "100+ Students Mentored",
      badgeColor: "text-signal bg-signal/10 border-signal/20",
      icon: Users,
    },
    {
      badge: "Elite + Silver · Top 1%",
      badgeColor: "text-verified bg-verified/10 border-verified/20",
      icon: Award,
    },
    {
      badge: "2nd Place Winner",
      badgeColor: "text-signal bg-signal/10 border-signal/20",
      icon: Trophy,
    },
    {
      badge: "500+ LeetCode · 1,625 · 3-Star",
      badgeColor: "text-ink-primary bg-subtle border-hairline",
      icon: Code2,
    },
  ];

  const essayHeaders = [
    {
      label: "Computational Foundations",
      subtitle: "Asymptotic bounds and memory layout in C++",
    },
    {
      label: "Systems Engineering at GlobalLogic",
      subtitle: "WebSocket streaming and bounded buffers under load",
    },
    {
      label: "Trade-offs & Mentorship",
      subtitle: "Grounded architecture, high test density, and teaching",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 hairline-b bg-canvas text-ink-primary relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 w-full">
        {/* Editorial Section Header - Zero numbered eyebrows */}
        <div data-reveal className="mb-14 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="font-mono text-xs text-signal tracking-wide uppercase font-semibold">
              Engineering Practice & Foundations
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-ink-primary tracking-tight max-w-[22ch]">
              How I Approach Software
            </h2>
            <p className="text-ink-secondary text-base md:text-lg font-sans max-w-[50ch] leading-relaxed">
              Decomposing complex distributed systems from algorithmic bounds to dependable web architectures.
            </p>
          </div>
        </div>

        {/* 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (Cols 1–4): Recognition, Leadership & Technical Spec */}
          <div className="lg:col-span-4 flex flex-col gap-6" data-reveal>
            {/* Recognition & Leadership Header */}
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                Recognition & Leadership
              </h3>
              <span className="font-mono text-[11px] text-ink-tertiary tabular-nums">
                Verified Record
              </span>
            </div>

            {/* Recognition Cards */}
            <div className="space-y-3.5">
              {RECOGNITION_RECORD.map((item, idx) => {
                const meta = recognitionMeta[idx] || {
                  badge: "Verified",
                  badgeColor: "text-ink-primary bg-subtle border-hairline",
                  icon: Award,
                };
                const IconComponent = meta.icon;
                const isCompetitiveCoding = idx === 3;

                return (
                  <article
                    key={item.title}
                    className="p-4 rounded-lg bg-surface hairline-border hover:border-focus transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar with Badge and Timeline */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${meta.badgeColor}`}
                        >
                          <IconComponent className="w-3 h-3 shrink-0" />
                          <span>{meta.badge}</span>
                        </span>
                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tabular-nums">
                          {item.timeline}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h4 className="text-sm font-medium text-ink-primary font-sans leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs text-signal mt-0.5">
                        {item.org}
                      </p>

                      {/* Detail Text */}
                      <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                        {item.details}
                      </p>
                    </div>

                    {/* Quick profile links for competitive programming */}
                    {isCompetitiveCoding && (
                      <div className="flex items-center gap-3 pt-3 mt-3 border-t border-hairline font-mono text-[11px]">
                        <a
                          href={IDENTITY.links.leetcode}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-ink-secondary hover:text-ink-primary transition-colors"
                        >
                          <span>LeetCode (1,625)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-ink-tertiary">/</span>
                        <a
                          href={IDENTITY.links.codechef}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-ink-secondary hover:text-ink-primary transition-colors"
                        >
                          <span>CodeChef (3-Star)</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Quiet Typographic Technical Specification Line */}
            <div className="rounded-lg bg-surface hairline-border p-4.5 sm:p-5 mt-1">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-signal" />
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-primary font-medium">
                    Technical Specification
                  </span>
                </div>
                <span className="font-mono text-[10px] text-ink-tertiary uppercase tabular-nums">
                  Core Stack
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-ink-tertiary tracking-wider mb-1">
                    Languages
                  </span>
                  <p className="font-mono text-xs text-ink-primary leading-relaxed">
                    {TECHNICAL_SPEC_LINE.languages.join(" · ")}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-[10px] uppercase text-ink-tertiary tracking-wider mb-1">
                    Frameworks & Runtimes
                  </span>
                  <p className="font-mono text-xs text-ink-primary leading-relaxed">
                    {TECHNICAL_SPEC_LINE.frameworks.join(" · ")}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-[10px] uppercase text-ink-tertiary tracking-wider mb-1">
                    Data & Vector Storage
                  </span>
                  <p className="font-mono text-xs text-ink-primary leading-relaxed">
                    {TECHNICAL_SPEC_LINE.dataStorage.join(" · ")}
                  </p>
                </div>

                <div>
                  <span className="block font-mono text-[10px] uppercase text-ink-tertiary tracking-wider mb-1">
                    Tooling & Systems
                  </span>
                  <p className="font-mono text-xs text-ink-primary leading-relaxed">
                    {TECHNICAL_SPEC_LINE.tooling.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 5–12): Authentic 3-Paragraph Engineering Essay */}
          <div className="lg:col-span-8 flex flex-col" data-reveal>
            {/* Essay Header Bar */}
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                  Engineering Monograph
                </span>
                <span className="text-ink-tertiary text-xs">/</span>
                <span className="font-mono text-xs text-signal font-medium">
                  Systems & Principles
                </span>
              </div>
              <span className="font-mono text-[11px] text-ink-tertiary">
                3 Disciplines
              </span>
            </div>

            {/* Lead Editorial Thesis */}
            <blockquote className="mb-10 pl-5 border-l-2 border-signal/60">
              <p className="text-xl sm:text-2xl font-sans font-medium text-ink-primary tracking-tight leading-snug">
                &ldquo;Algorithmic rigor is only the first half of the equation; software that users actually depend on demands understanding the entire execution path down to I/O and network boundaries.&rdquo;
              </p>
            </blockquote>

            {/* The Authentic 3-Paragraph Essay */}
            <div className="space-y-8 font-sans">
              {ABOUT_ESSAY.map((item, idx) => {
                const header = essayHeaders[idx];

                return (
                  <article key={item.id} className="group">
                    {/* Rubric for each discipline */}
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                      <span className="text-signal font-medium">
                        {header.label}
                      </span>
                      <span className="text-ink-tertiary">—</span>
                      <span className="text-ink-tertiary">{header.subtitle}</span>
                    </div>

                    {/* Paragraph Prose */}
                    <p className="text-ink-secondary text-base sm:text-[17px] leading-[1.78] font-normal max-w-[65ch]">
                      {item.paragraph}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Engineering Principles Card */}
            <div className="mt-12 pt-8 border-t border-hairline">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                  Core Engineering Disciplines
                </span>
                <span className="font-mono text-[11px] text-verified flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Verified</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-surface hairline-border">
                  <span className="font-mono text-xs text-signal block mb-1 font-medium">
                    Deterministic Bounds
                  </span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Typed schemas, contract validation, and bounded ring buffers preventing runaway I/O.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-surface hairline-border">
                  <span className="font-mono text-xs text-verified block mb-1 font-medium">
                    Verified Telemetry
                  </span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Empirical metrics: &lt;250 ms TTFB, 436 automated tests, and 100% test pass rate.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-surface hairline-border">
                  <span className="font-mono text-xs text-ink-primary block mb-1 font-medium">
                    Architectural Restraint
                  </span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    2.2 ms vector ReportLab compiler over heavy browser runtimes; route-level code splitting.
                  </p>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mt-8">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-surface hairline-border hover:bg-subtle text-ink-primary text-xs font-mono transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-signal" />
                    <span>Inspect Full Resume Record</span>
                  </button>
                )}

                <a
                  href="#systems"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-surface hairline-border hover:bg-subtle text-ink-secondary hover:text-ink-primary text-xs font-mono transition-colors"
                >
                  <span>Review Flagship Systems</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href={IDENTITY.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded text-ink-tertiary hover:text-ink-primary text-xs font-mono transition-colors ml-auto"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
