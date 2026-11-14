"use client";

import React, { useState } from "react";
import { ArrowDown, Copy, Check, ExternalLink, FileText, Activity } from "lucide-react";
import { IDENTITY } from "@/lib/systems-data";

interface HeroSectionProps {
  onOpenResume: () => void;
  onSelectSystem?: (systemId: string) => void;
}

export function HeroSection({ onOpenResume, onSelectSystem }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${IDENTITY.email}`;
    }
  };

  const handleBenchmarkClick = (targetId: string) => {
    if (onSelectSystem) {
      onSelectSystem(targetId);
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[100dvh] pt-24 md:pt-32 pb-10 flex flex-col justify-between hairline-b bg-canvas relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start py-8">
          {/* Columns 1-8: Primary Thesis & Identity Statement */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Identity Pre-title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-signal tracking-wide uppercase font-semibold">
                {IDENTITY.name}
              </span>
              <span className="text-ink-tertiary text-xs">/</span>
              <span className="font-mono text-xs text-ink-tertiary">
                {IDENTITY.role}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-ink-primary font-medium leading-[1.08] max-w-[20ch] mb-6">
              {IDENTITY.headline}
            </h1>

            {/* Lead Narrative */}
            <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-[62ch] mb-8 font-sans font-normal">
              {IDENTITY.lead}
            </p>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#systems"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-ink-primary text-canvas font-medium text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
              >
                <span>Explore Selected Systems</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface hairline-border hover:bg-subtle text-ink-primary text-xs font-mono transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-signal" />
                <span>Inspect Resume Sheet</span>
              </button>

              {/* Instant Copy Email Button */}
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface hairline-border hover:bg-subtle text-ink-secondary hover:text-ink-primary text-xs font-mono transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-verified" />
                    <span className="text-verified font-medium">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-ink-tertiary" />
                    <span>{IDENTITY.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Direct Profiles */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-ink-tertiary pt-4 hairline-t">
              <a
                href={IDENTITY.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-signal transition-colors"
              >
                <span>GitHub (@Krishiv1611)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={IDENTITY.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-signal transition-colors"
              >
                <span>LinkedIn (/in/krishivarora25)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={IDENTITY.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-signal transition-colors"
              >
                <span>LeetCode (1,625 · 500+ Solved)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={IDENTITY.links.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-signal transition-colors"
              >
                <span>CodeChef (3★)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Columns 9-12: Architectural Context Rail */}
          <div className="lg:col-span-4 bg-surface p-6 rounded hairline-border flex flex-col gap-6">
            <div className="flex items-center justify-between hairline-b pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                System Context
              </span>
              <span className="w-2 h-2 rounded-full bg-verified" title="Active development record" />
            </div>

            {/* Experience Spec */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-wider">
                Recent Engineering
              </span>
              <div className="text-sm font-medium text-ink-primary">
                {IDENTITY.contextRail.recent.role}
              </div>
              <div className="text-xs text-ink-secondary">
                {IDENTITY.contextRail.recent.company} · {IDENTITY.contextRail.recent.timeline}
              </div>
              <div className="text-xs font-mono text-signal mt-1">
                ↳ {IDENTITY.contextRail.recent.note}
              </div>
            </div>

            <div className="h-px bg-hairline" />

            {/* Focus Areas */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-wider">
                Focus Areas
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {IDENTITY.contextRail.focusAreas.map((focus) => (
                  <div key={focus} className="flex items-center gap-2 text-xs font-mono text-ink-secondary">
                    <span className="text-signal text-[10px]">■</span>
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-hairline" />

            {/* Academic Base */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-ink-tertiary uppercase tracking-wider">
                Academic Base
              </span>
              <div className="text-xs font-medium text-ink-primary">
                {IDENTITY.contextRail.education.degree}
              </div>
              <div className="text-xs text-ink-secondary">
                {IDENTITY.contextRail.education.institution} ({IDENTITY.contextRail.education.timeline})
              </div>
              <div className="text-[11px] font-mono text-verified mt-0.5">
                CGPA: {IDENTITY.contextRail.education.cgpa}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Viewport Bottom: Interactive System Telemetry Bar */}
      <div className="w-full hairline-t bg-surface/60 backdrop-blur-sm mt-6">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-3.5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-ink-tertiary uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-signal" />
              <span>Verified Systems Telemetry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              {IDENTITY.telemetryMetrics.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => handleBenchmarkClick(item.targetId)}
                  className="flex flex-col sm:items-start text-left p-2.5 rounded bg-subtle/50 hover:bg-subtle hairline-border transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-[11px] font-mono text-ink-secondary group-hover:text-signal transition-colors">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-verified bg-verified/10 px-1.5 py-0.5 rounded">
                      {item.delta}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-ink-primary mt-1 tabular-nums">
                    {item.metric}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
