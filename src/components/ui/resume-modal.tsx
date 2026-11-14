"use client";

import React, { useEffect, useState } from "react";
import {
  Printer,
  Download,
  X,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
} from "lucide-react";
import { IDENTITY } from "@/lib/systems-data";

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("krishivarora150@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = "mailto:krishivarora150@gmail.com";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume Specification Sheet"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm no-print cursor-pointer transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-4xl h-full bg-surface border-l border-hairline shadow-drawer overflow-y-auto flex flex-col focus:outline-none">
        {/* Sticky Spec Header & Controls */}
        <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-hairline px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
            <div className="flex items-center gap-2 font-mono text-xs text-ink-primary">
              <span className="font-semibold tracking-wider">RESUME_SPEC.V2</span>
              <span className="text-ink-tertiary">/</span>
              <span className="text-ink-secondary tabular-nums">2026 RECORD</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-subtle border border-hairline hover:border-focus text-ink-secondary hover:text-ink-primary text-xs font-mono transition-colors"
              title="Print spec sheet (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5 text-signal" />
              <span className="hidden sm:inline">Print Spec</span>
            </button>

            <a
              href="/2401030298_Krishiv_Arora.pdf"
              download="2401030298_Krishiv_Arora.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-ink-primary text-canvas hover:opacity-90 text-xs font-mono font-medium transition-opacity"
              title="Download official PDF record"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close resume drawer"
              className="p-1.5 rounded hover:bg-subtle text-ink-secondary hover:text-ink-primary border border-hairline transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Swiss Typographic Spec Sheet Body */}
        <div id="resume-spec-content" className="p-6 sm:p-10 md:p-14 text-ink-primary space-y-10">
          {/* Header & Candidate Identity */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-hairline pb-6">
              <div>
                <div className="text-[11px] font-mono tracking-widest text-signal uppercase mb-1">
                  Candidate Engineering Specification
                </div>
                <h1 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-ink-primary">
                  KRISHIV ARORA
                </h1>
                <p className="text-sm font-mono text-ink-secondary mt-1">
                  Aspiring Software Engineer · Systems &amp; Web Applications
                </p>
                <p className="text-xs font-mono text-ink-tertiary mt-0.5">
                  B.Tech CSE (2024–2028), JIIT Noida · Summer Trainee, GlobalLogic (Hitachi Group)
                </p>
              </div>

              {/* Coordinates Block */}
              <div className="flex flex-col gap-1.5 font-mono text-xs text-ink-secondary border border-hairline bg-subtle/40 p-3.5 rounded">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-signal shrink-0" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-signal shrink-0" />
                  <a href="tel:+919557187881" className="hover:text-ink-primary transition-colors">
                    +91-9557187881
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-signal shrink-0" />
                  <a
                    href="mailto:krishivarora150@gmail.com"
                    className="hover:text-ink-primary transition-colors"
                  >
                    krishivarora150@gmail.com
                  </a>
                </div>
                <div className="pt-2 border-t border-hairline grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  <a
                    href={IDENTITY?.links?.github || "https://github.com/Krishiv1611"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal flex items-center gap-1 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 text-ink-tertiary" />
                  </a>
                  <a
                    href={IDENTITY?.links?.linkedin || "https://linkedin.com/in/krishivarora25"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal flex items-center gap-1 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5 text-ink-tertiary" />
                  </a>
                  <a
                    href={IDENTITY?.links?.leetcode || "https://leetcode.com/u/krishivarora25/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal flex items-center gap-1 transition-colors"
                  >
                    <span>LeetCode</span>
                    <ExternalLink className="w-2.5 h-2.5 text-ink-tertiary" />
                  </a>
                  <a
                    href={IDENTITY?.links?.codechef || "https://www.codechef.com/users/krishivarora25"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-signal flex items-center gap-1 transition-colors"
                  >
                    <span>CodeChef</span>
                    <ExternalLink className="w-2.5 h-2.5 text-ink-tertiary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Positioning Statement */}
            <p className="text-sm leading-relaxed text-ink-secondary font-sans max-w-3xl">
              Software engineering undergraduate with hands-on systems experience in agentic workflows,
              REST API design, hybrid retrieval, and dependable web applications. Proficient in Python,
              TypeScript, and C++. Solid foundation in Data Structures &amp; Algorithms, Object-Oriented
              Programming, Computer Networks, and DBMS. Seeking a Software Engineer Internship to
              contribute to production software systems.
            </p>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5 flex items-center justify-between">
              <span>Education Record</span>
              <span className="text-[11px] text-verified font-medium">CGPA: 7.44 / 10.0</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <h3 className="font-medium text-ink-primary text-base">
                  Jaypee Institute of Information Technology (JIIT)
                </h3>
                <p className="text-xs font-mono text-ink-secondary">
                  Bachelor of Technology in Computer Science and Engineering
                </p>
              </div>
              <div className="text-xs font-mono text-ink-tertiary sm:text-right">
                Noida, India · 2024 – 2028
              </div>
            </div>
            <p className="text-xs font-mono text-ink-tertiary">
              Relevant Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database
              Management Systems, Computer Networks, Operating Systems, Software Engineering.
            </p>
          </section>

          {/* Engineering Experience */}
          <section className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5 flex items-center justify-between">
              <span>Engineering Experience</span>
              <span className="text-[11px] text-ink-secondary">Production Traineeship</span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="font-medium text-ink-primary text-base">
                    GlobalLogic (Hitachi Group)
                  </h3>
                  <p className="text-xs font-mono text-signal">
                    Summer Trainee — Software Engineering
                  </p>
                </div>
                <div className="text-xs font-mono text-ink-tertiary sm:text-right">
                  Noida, India · Jun 2026 – Jul 2026
                </div>
              </div>

              {/* Sub-item: Compass Workbench */}
              <div className="bg-subtle/30 border border-hairline p-4 rounded space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-ink-primary">
                    Compass — Repository-Aware Engineering Workbench
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-verified bg-verified/10 px-2 py-0.5 rounded">
                      436 tests (100% pass)
                    </span>
                    <a
                      href="https://github.com/Krishiv1611/Compass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                    >
                      <span>[GitHub]</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-ink-tertiary">
                  Stack: Python · FastAPI · React · TypeScript · LangGraph · PostgreSQL · ChromaDB
                </div>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-ink-secondary leading-relaxed pl-1">
                  <li>
                    Architected and developed Compass as an individual developer workbench under senior
                    engineering mentorship to eliminate developer context switching across repository
                    exploration, code changes, debugging, and patch review.
                  </li>
                  <li>
                    Implemented LangGraph multi-agent workflows with tool-calling nodes for codebase
                    inspection, AST parsing, and patch generation across Ask, Edit, and Plan modes.
                  </li>
                  <li>
                    Re-architected synchronous HTTP endpoints into WebSocket streaming, reducing
                    time-to-first-byte ~85% (~6.5 s to &lt;250 ms) while emitting token and node deltas.
                  </li>
                  <li>
                    Engineered bounded in-memory buffer batching run events (10:1) prior to PostgreSQL
                    persistence, reducing write load by ~90%.
                  </li>
                  <li>
                    Applied route-level code splitting across workbenches to restrict client bundle to 363 kB,
                    verified by a 436-test suite at a 100% pass rate.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Systems & Applied AI Projects */}
          <section className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5">
              Flagship Systems &amp; Projects
            </div>

            {/* Project 1: Synora */}
            <div className="bg-subtle/30 border border-hairline p-4 rounded space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-ink-primary">
                  Synora — Multi-Tenant AI Customer Support &amp; Voice RAG Platform
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-verified bg-verified/10 px-2 py-0.5 rounded">
                    67 E2E tests (100% pass)
                  </span>
                  <a
                    href="https://synora-dev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                  >
                    <span>[Live Demo]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href="https://github.com/Krishiv1611/Synora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                  >
                    <span>[GitHub]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] font-mono text-ink-tertiary">
                Stack: Next.js · TypeScript · PostgreSQL · pgvector · Vapi · Tailwind CSS · AWS
              </div>

              <ul className="list-disc list-inside space-y-1.5 text-xs text-ink-secondary leading-relaxed pl-1">
                <li>
                  Engineered a B2B SaaS platform enabling businesses to deploy grounded AI support agents
                  across text chat, real-time voice, and phone channels.
                </li>
                <li>
                  Built a hybrid retrieval engine fusing 3072-dimensional pgvector cosine similarity with
                  PostgreSQL full-text search via Reciprocal Rank Fusion (RRF), achieving &gt;72% top-1 overlap
                  on verified customer FAQs.
                </li>
                <li>
                  Built an entity-aware conversational query rewriter compressing multi-turn chat history,
                  reducing synthetic prompt tokens by ~60%.
                </li>
                <li>
                  Pruned retrieved context passages from 6 to 3 high-precision chunks, cutting Vapi voice
                  webhook payload 86% (18,000 to 2,500 chars) for ultra-low latency audio response.
                </li>
                <li>
                  Refactored database schema across 10 tables to enforce strict tenant isolation, verified
                  by a 67-test end-to-end suite.
                </li>
              </ul>
            </div>

            {/* Project 2: CareerPilot AI */}
            <div className="bg-subtle/30 border border-hairline p-4 rounded space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-ink-primary">
                  CareerPilot AI — Job Application &amp; Verification Workspace
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-verified bg-verified/10 px-2 py-0.5 rounded">
                    445 tests (184 unit · 230 contract · 31 UI)
                  </span>
                  <a
                    href="https://career-pilot-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                  >
                    <span>[Live Demo]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href="https://github.com/Krishiv1611/careerPilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                  >
                    <span>[GitHub]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] font-mono text-ink-tertiary">
                Stack: Python · FastAPI · React 19 · LangGraph · PostgreSQL · ReportLab · Docker
              </div>

              <ul className="list-disc list-inside space-y-1.5 text-xs text-ink-secondary leading-relaxed pl-1">
                <li>
                  Built a deterministic vector-based ReportLab compiler in Python generating ATS-compliant
                  resume PDFs in 2.2 ms at 1.9 KB (&gt;99% payload reduction compared to headless
                  Chromium/Puppeteer).
                </li>
                <li>
                  Designed a multi-agent LangGraph pipeline executing semantic resume parsing, ATS scoring,
                  and live job discovery using ChromaDB vector search and SerpAPI.
                </li>
                <li>
                  Built a 0–100 authenticity scoring model flagging ghost and scam listings, sorting candidate
                  claims into 3 risk tiers to prepare applicants for technical interviews.
                </li>
                <li>
                  Containerized full-stack application using Docker Compose with OAuth2/JWT auth, isolated
                  PostgreSQL persistence, and 151 kB React 19 frontend bundle across 12 split chunks.
                </li>
              </ul>
            </div>

            {/* Project 3: RideMates */}
            <div className="bg-subtle/30 border border-hairline p-4 rounded space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-ink-primary">
                  RideMates — Peer-to-Peer Campus Ride Coordination
                </div>
                <a
                  href="https://github.com/Krishiv1611/RideMates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ink-secondary hover:text-signal flex items-center gap-1"
                >
                  <span>[GitHub]</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="text-[11px] font-mono text-ink-tertiary">
                Stack: React · Node.js · Express.js · MongoDB · Socket.io · JWT
              </div>

              <ul className="list-disc list-inside space-y-1.5 text-xs text-ink-secondary leading-relaxed pl-1">
                <li>
                  Engineered campus ride coordination platform with role-based JWT authentication, route
                  scheduling, and seat reservation workflows.
                </li>
                <li>
                  Implemented live bidirectional driver-passenger messaging and trip status notifications
                  using Socket.io.
                </li>
              </ul>
            </div>
          </section>

          {/* Technical Skill Matrix */}
          <section className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5">
              Technical Specification Matrix
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-subtle/30 border border-hairline rounded space-y-1">
                <span className="text-signal font-semibold">Programming Languages:</span>
                <p className="text-ink-secondary">Python, TypeScript, JavaScript, C++, SQL, HTML, CSS</p>
              </div>

              <div className="p-3 bg-subtle/30 border border-hairline rounded space-y-1">
                <span className="text-signal font-semibold">Frameworks &amp; Web:</span>
                <p className="text-ink-secondary">React 19, Next.js, FastAPI, Node.js, Express.js, Tailwind CSS, Vite</p>
              </div>

              <div className="p-3 bg-subtle/30 border border-hairline rounded space-y-1">
                <span className="text-signal font-semibold">AI &amp; Systems Engineering:</span>
                <p className="text-ink-secondary">LangGraph, LangChain, pgvector, ChromaDB, RAG Architecture, ReportLab</p>
              </div>

              <div className="p-3 bg-subtle/30 border border-hairline rounded space-y-1">
                <span className="text-signal font-semibold">Databases &amp; Delivery:</span>
                <p className="text-ink-secondary">PostgreSQL, MongoDB, MySQL, Docker, Git, GitHub, WebSockets, REST APIs</p>
              </div>
            </div>

            <div className="p-3 bg-subtle/20 border border-hairline rounded text-xs font-mono">
              <span className="text-ink-tertiary uppercase tracking-wider block mb-1">
                Core Computer Science Foundations:
              </span>
              <p className="text-ink-secondary">
                Data Structures &amp; Algorithms, Object-Oriented Programming, Computer Networks, Database
                Management Systems (DBMS), Systems Design, SDLC.
              </p>
            </div>
          </section>

          {/* Leadership & Mentorship */}
          <section className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5 flex items-center justify-between">
              <span>Leadership &amp; Technical Mentorship</span>
              <span className="text-[11px] text-ink-secondary">100+ Students</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <h3 className="font-medium text-ink-primary text-sm">
                  AIML Hub, Jaypee Institute of Information Technology (JIIT)
                </h3>
                <p className="text-xs font-mono text-signal">
                  Technical Volunteer &amp; Mentor
                </p>
              </div>
              <div className="text-xs font-mono text-ink-tertiary sm:text-right">
                Noida, India · Jul 2025 – May 2026
              </div>
            </div>

            <ul className="list-disc list-inside space-y-1 text-xs text-ink-secondary leading-relaxed pl-1">
              <li>
                Mentored 100+ students in data structures, algorithms, competitive programming fundamentals,
                and software development.
              </li>
              <li>
                Organized technical workshops, coding contests, and peer-learning sessions for aspiring engineers.
              </li>
            </ul>
          </section>

          {/* Honors & Verified Benchmarks */}
          <section className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-tertiary border-b border-hairline pb-1.5">
              Verified Achievements &amp; Benchmarks
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-start gap-2 text-ink-secondary">
                <span className="text-verified shrink-0">■</span>
                <div>
                  <span className="text-ink-primary font-medium">NPTEL Scalable Data Science (IIT Kharagpur)</span>
                  {" — "}
                  <span>Elite + Silver Medal, Top 1% nationally in scalable data systems (Jul – Sep 2026).</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-ink-secondary">
                <span className="text-verified shrink-0">■</span>
                <div>
                  <span className="text-ink-primary font-medium">2nd Place, Execute 26.2 Contest</span>
                  {" — "}
                  <span>Competitive team coding contest organized by Knuth Programming Hub, JIIT (May 2026).</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-ink-secondary">
                <span className="text-verified shrink-0">■</span>
                <div>
                  <span className="text-ink-primary font-medium">Competitive Programming Foundation</span>
                  {" — "}
                  <span>
                    Solved <strong className="text-ink-primary">500+</strong> DSA problems on LeetCode
                    (1,625 contest rating); achieved <strong className="text-ink-primary">3-Star</strong> rating
                    on CodeChef.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Callout inside Drawer */}
          <footer className="pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ink-tertiary no-print">
            <div className="space-y-0.5">
              <div>DOC REF: KA-2026-SPEC-SHEET // DIRECT LINK</div>
              <div className="text-[11px] text-ink-secondary">
                Compiled for ATS and technical review from verified records.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-subtle border border-hairline text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-verified" />
                    <span className="text-verified font-medium">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="/2401030298_Krishiv_Arora.pdf"
                download="2401030298_Krishiv_Arora.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-ink-primary text-canvas font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Sheet</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}