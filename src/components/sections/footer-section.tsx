"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Mail,
  FileText,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { IDENTITY, RESUME_DATA } from "@/lib/systems-data";

interface FooterSectionProps {
  onOpenResume?: () => void;
}

export function FooterSection({ onOpenResume }: FooterSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email || "krishivarora150@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${IDENTITY.email || "krishivarora150@gmail.com"}`;
    }
  };

  const links = [
    {
      label: "GitHub",
      handle: "@Krishiv1611",
      href: IDENTITY.links?.github || "https://github.com/Krishiv1611",
      note: "Repositories & source code",
    },
    {
      label: "LinkedIn",
      handle: "/in/krishivarora25",
      href: IDENTITY.links?.linkedin || "https://linkedin.com/in/krishivarora25",
      note: "Professional network",
    },
    {
      label: "LeetCode",
      handle: "1,625 · 500+ Solved",
      href: IDENTITY.links?.leetcode || "https://leetcode.com/u/krishivarora25/",
      note: "Data structures & algorithms",
    },
    {
      label: "CodeChef",
      handle: "3★ Rating",
      href: IDENTITY.links?.codechef || "https://www.codechef.com/users/krishivarora25",
      note: "Competitive programming",
    },
    {
      label: "Direct Phone",
      handle: IDENTITY.phone || "+91 9557187881",
      href: `tel:${(IDENTITY.phone || "+91 9557187881").replace(/\s+/g, "")}`,
      note: "Phone & WhatsApp",
    },
  ];

  return (
    <footer id="contact" className="bg-canvas border-t border-hairline relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Top Region: Closing Thesis & Interactive Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columns 1-7: Headline & Status */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex items-center gap-2.5 font-mono text-xs text-ink-tertiary">
              <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
              <span className="text-ink-secondary">Availability &amp; Engineering Status</span>
              <span>·</span>
              <span className="text-verified font-medium">Open to Opportunities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-ink-primary leading-[1.12] max-w-[24ch]">
              Building software where performance, reliability, and product craft matter.
            </h2>

            <p className="text-base text-ink-secondary max-w-[54ch] font-sans leading-relaxed">
              Open to software engineering and AI systems opportunities. Based in New Delhi, India.
              Always glad to discuss distributed architectures, agent streaming pipelines, or hard
              engineering problems.
            </p>

            {/* Interactive Email Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Primary Interactive Copy Email Button */}
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 px-5 py-3 rounded bg-surface border border-hairline hover:border-focus text-ink-primary text-sm font-mono transition-all"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-verified animate-in fade-in zoom-in" />
                    <span className="text-verified font-medium">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-ink-tertiary group-hover:text-signal transition-colors" />
                    <span className="text-ink-primary font-medium">{IDENTITY.email || "krishivarora150@gmail.com"}</span>
                    <span className="text-[11px] text-ink-tertiary font-normal border-l border-hairline pl-3">
                      Click to copy
                    </span>
                  </>
                )}
              </button>

              {/* Direct Mailto Anchor */}
              <a
                href={`mailto:${IDENTITY.email || "krishivarora150@gmail.com"}`}
                className="flex items-center gap-2 px-4 py-3 rounded bg-subtle border border-hairline hover:border-focus text-ink-secondary hover:text-ink-primary text-xs font-mono transition-colors"
                title="Open default email client"
              >
                <Mail className="w-3.5 h-3.5 text-signal" />
                <span>Send Mail</span>
              </a>

              {/* Optional Resume Drawer Trigger */}
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="flex items-center gap-2 px-4 py-3 rounded bg-subtle border border-hairline hover:border-focus text-ink-secondary hover:text-ink-primary text-xs font-mono transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-signal" />
                  <span>Inspect Resume Sheet</span>
                </button>
              )}
            </div>
          </div>

          {/* Columns 8-12: Direct Profiles & Coordinates Panel */}
          <div className="lg:col-span-5 bg-surface border border-hairline rounded p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-1 border-b border-hairline pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary">
                Direct Profiles &amp; Telemetry
              </span>
              <p className="text-xs text-ink-secondary">
                Verified developer platforms &amp; engineering records.
              </p>
            </div>

            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between p-2.5 rounded bg-subtle/50 hover:bg-subtle border border-transparent hover:border-hairline transition-all"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-medium text-ink-primary group-hover:text-signal transition-colors flex items-center gap-1.5">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 text-ink-tertiary group-hover:text-signal transition-colors" />
                    </span>
                    <span className="text-[11px] font-mono text-ink-tertiary">
                      {link.note}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-ink-secondary group-hover:text-ink-primary tabular-nums">
                    {link.handle}
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-ink-tertiary">
              <span>PDF Specification:</span>
              <a
                href={RESUME_DATA?.pdfUrl || "/2401030298_Krishiv_Arora.pdf"}
                download="2401030298_Krishiv_Arora.pdf"
                className="text-signal hover:underline flex items-center gap-1"
              >
                <span>/2401030298_Krishiv_Arora.pdf</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-ink-tertiary">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-ink-secondary font-medium">Krishiv Arora</span>
            <span>·</span>
            <span>Aspiring Software Engineer</span>
            <span>·</span>
            <span>New Delhi, India</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-ink-tertiary">
            <span>Precision Systems Monograph</span>
            <span>·</span>
            <span>Zero Simulated Timers</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}