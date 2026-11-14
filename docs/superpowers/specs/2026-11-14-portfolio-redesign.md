# Design Specification: Krishiv Arora Personal Engineering Website

**Date:** 2026-11-14  
**Subject:** Production Overhaul for Krishiv Arora's Engineering Website  
**Aesthetic Family:** Precision Systems Monograph (Obsidian Carbon Default + Swiss Daylight Mode)  
**Tone & Grounding:** Aspiring Software Engineer, strictly verified achievements, zero mockness, zero false claims of full-stack.

---

## 1. Executive Summary & Identity Grounding

### Core Directives
1. **Title & Headline:**
   - **Role:** `Aspiring Software Engineer`
   - **Headline:** `Aspiring software engineer building AI systems and dependable web applications.`
   - **Subhead / Lead:** `I design and build web applications where language models operate under real systems constraints—streaming multi-step agent state over WebSockets, fusing vector and lexical search in PostgreSQL, and keeping frontend bundles fast and verifiable.`
   - **Grounding:** B.Tech Computer Science & Engineering undergraduate at Jaypee Institute of Information Technology (JIIT), Noida (2024–2028), Summer Trainee at GlobalLogic (Hitachi Group).
2. **Zero Mockness:**
   - No simulated fake timers, no pseudo-runtimes pretending to execute live commands in the browser, no fake counters.
   - All performance benchmarks (<250 ms TTFB, 436 tests, >72% FAQ overlap, 86% payload reduction, 2.2 ms / 1.9 KB compile time, 445 tests) are presented as verified engineering measurements directly from project test suites and the official resume record.
   - The interactive blueprints act as **Technical Flow Inspectors**: interactive step-throughs of real data transformations and architectural stages.
3. **No False Claims of Full-Stack:**
   - Avoid generic "Full Stack Engineer" claims.
   - Clearly delineate specific frontend (React 19, Next.js, TypeScript), backend (FastAPI, Python, Node.js), and database/systems (PostgreSQL, pgvector, LangGraph) competencies.

---

## 2. Design System & Visual Grammar

### Color Palette
- **Obsidian Carbon (Default):**
  - Canvas: `#090A0C`
  - Elevated Surface: `#101216`
  - Subtle Surface: `#161920`
  - Primary Ink: `#F2F4F8`
  - Secondary Ink: `#949BA6`
  - Tertiary / Mono Ink: `#5E6572`
  - Structural Hairlines: `1px solid #1E222B`
  - Focus Ring: `#333A48`
  - Telemetry Signal: `#38BDF8` (Cyan, reserved for active flows & accents)
  - Verified State: `#10B981` (Emerald, reserved for test metrics & latency indicators)
- **Swiss Daylight Spec Mode (Toggleable):**
  - Canvas: `#F7F6F2`, Surface: `#EFECE6`, Ink: `#141413`, Hairlines: `#E2DFD7`.

### Typography System
- **Display & Prose:** `Geist Sans` with fallback to system sans (`clamp(2.2rem, 4.5vw, 3.75rem)` for headlines, `17px / 1.68` for body copy, max line-length `65ch`).
- **Telemetry & Schematics:** `Geist Mono` or `JetBrains Mono` with `font-variant-numeric: tabular-nums`.
- **Anti-Patterns Banned:** No numbered eyebrows (`01 / About`), no generic ALL-CAPS tracked eyebrows, no single-word gradient highlights, no purple/indigo meshes.

---

## 3. Four-Section Architecture

### Section 1: Hero & Real Telemetry Strip
- **12-Column Asymmetric Grid (`min-h-[100dvh]`):**
  - **Cols 1–8:** Name, Role (`Aspiring Software Engineer`), Headline, Lead copy, CTAs:
    - `Explore Selected Systems` (smooth anchor scroll to `#systems`)
    - `Inspect Resume Sheet` (opens the interactive Resume Modal)
    - Profile links: GitHub (`@Krishiv1611`), LinkedIn (`/in/krishivarora25`), one-click copyable email (`krishivarora150@gmail.com` with inline visual feedback).
  - **Cols 9–12 (Context Rail):**
    - Current: Summer Trainee, Software Engineering — GlobalLogic (Hitachi Group)
    - Focus Areas: Agentic Workflows (LangGraph), Hybrid RAG (pgvector + FTS), FastAPI & Next.js Architecture, Automated Testing
    - Academic Base: B.Tech CSE, JIIT Noida (2024–2028, CGPA: 7.44)
  - **Viewport Bottom Telemetry Strip:**
    - 3 verified benchmarks with click-to-scroll targets:
      1. `Compass (GlobalLogic)`: `<250 ms TTFB` (~85% latency cut via WebSocket LangGraph streaming)
      2. `Synora RAG Engine`: `>72% Top-1 Overlap` (pgvector + FTS Reciprocal Rank Fusion)
      3. `CareerPilot Compiler`: `2.2 ms / 1.9 KB` (>99% PDF size cut via vector ReportLab compiler)

### Section 2: Selected Systems (3 Deep-Dive Showcases + Archive)
Each flagship system features a split 12-column layout (Cols 1–5: Prose Narrative & Test Metrics; Cols 6–12: Interactive Technical Flow Inspector).

#### System 1: Compass — Repository-Aware Engineering Workbench (GlobalLogic / Hitachi Group)
- **Context:** Summer Trainee, Software Engineering · Jun 2026 – Jul 2026
- **Stack:** Python, FastAPI, React, TypeScript, LangGraph, PostgreSQL
- **Verified Metrics:** 436 automated tests (100% pass rate) · ~85% latency reduction (<250 ms TTFB) · ~90% database write reduction via bounded buffer · 363 kB base frontend bundle.
- **Interactive Flow Inspector:**
  - Clickable architectural stages:
    1. `AST Indexer & Graph Routing`: AST parsing and mode dispatch (Ask / Edit / Plan).
    2. `LangGraph State Streaming`: WebSocket frame dispatch emitting token & node deltas (<250 ms TTFB vs 6.5s blocking HTTP).
    3. `Bounded Buffer Persistence`: 10:1 event batching before PostgreSQL write (~90% I/O load reduction).
  - Real input query & output patch inspection data from the workbench.

#### System 2: Synora — Multi-Tenant AI Customer Support & Voice RAG Platform
- **Stack:** Next.js, TypeScript, PostgreSQL, pgvector, Tailwind CSS
- **Verified Metrics:** 67-test E2E suite (100% pass) · >72% FAQ top-1 overlap · ~60% prompt token reduction · 86% voice payload reduction (18k to 2.5k chars) for Vapi webhooks.
- **Interactive Flow Inspector:**
  - Multi-turn customer inquiry inspector:
    1. `Entity-Aware Query Rewriting`: Compresses conversational history into a clean search query (-60% synthetic tokens).
    2. `Reciprocal Rank Fusion (RRF)`: Side-by-side scoring of pgvector cosine similarity and PostgreSQL Full-Text Search showing how the exact FAQ is boosted to Rank #1.
    3. `Vapi Payload Shaper`: Pruning context chunks from 6 to 3 high-precision passages (18,000 -> 2,500 chars).

#### System 3: CareerPilot AI — Job Application & Verification Workspace
- **Stack:** Python, FastAPI, React 19, LangGraph, PostgreSQL, ReportLab, Vite, Tailwind CSS
- **Verified Metrics:** 445 automated tests (184 unit, 230 contract, 31 UI, 100% pass) · >99% PDF size reduction (1.9 KB, 2.2 ms compile time) vs Chromium/Puppeteer · 151 kB React 19 gzipped bundle.
- **Interactive Flow Inspector:**
  - Toggle between two inspection views:
    1. `Vector Compiler Benchmark`: Real performance breakdown comparing headless Chromium (~240 KB / 1,800 ms) against the Python ReportLab vector compiler (1.9 KB / 2.2 ms).
    2. `Claim Risk & Scam Auditor`: Scoring model (0–100) flagging ghost/scam job listings and sorting resume claims into 3 interview verification risk tiers.

#### Archive Table (Clean Editorial Index):
- `agentic-RagChatbot` (Python, FastAPI, Vector Search)
- `SummarizeYou` (Python, FastAPI, LangChain, ChromaDB)
- `RideMates` (JavaScript, React, Node.js, Express, MongoDB, Socket.io)

### Section 3: About & How I Approach Software
- **Left Column (Cols 1–4):**
  - Recognition & Leadership Record:
    - **AIML Hub Mentor (JIIT Noida):** Mentored 100+ students in DSA, competitive programming, and development (Jul 2025 – May 2026).
    - **NPTEL Scalable Data Science (IIT Kharagpur):** Elite + Silver Medal, Top 1% nationally.
    - **Execute 26.2 Team Contest:** 2nd Place (Knuth Programming Hub, JIIT).
    - **Competitive Programming:** 500+ LeetCode problems (1,625 contest rating) · 3-Star on CodeChef.
  - Quiet typographic Technical Specification line (languages, frameworks, databases, tools).
- **Right Column (Cols 5–12):**
  - Genuine 3-paragraph engineering essay explaining:
    1. Computational curiosity moving from C++ algorithms into full product systems.
    2. Practical systems engineering at GlobalLogic: streaming LangGraph state, event buffering, high test density.
    3. Measurable trade-offs and mentorship experience.

### Section 4: Built-In Resume Drawer & Closing Footer
- **Interactive Resume Specification Drawer:**
  - Accessible via `Resume` button in Navbar or Hero.
  - Slide-over / modal containing the exact structured content from `Krishiv_Arora_Resume_v2.pdf` rendered in crisp Swiss monospace typography.
  - Dedicated `Download PDF` button (downloading `/Krishiv-Arora-Resume.pdf` or `2401030298_Krishiv_Arora.pdf`).
  - Print styling (`@media print`) allowing direct 1-page printing via `window.print()`.
- **Closing Footer (`footer.closing`):**
  - Headline: `Building software where performance, reliability, and product craft matter.`
  - Location & Status: `Open to software engineering and AI systems opportunities. Based in New Delhi, India.`
  - Large interactive email button (`krishivarora150@gmail.com`) with instant copy confirmation and mailto link.
  - Direct links to GitHub, LinkedIn, LeetCode, CodeChef, and Phone.

---

## 4. Verification & Quality Gates
- **Zero Console Errors & Zero Type Warnings:** Strict TypeScript compilation with `tsc --noEmit`.
- **Build Verification:** Successful production build with `pnpm build`.
- **Responsiveness:** Flawless rendering at 1440px desktop, 1024px tablet, and 390px mobile viewport widths.
- **Copy Discipline:** Zero instances of "Passionate", "Full Stack" false claims, "01 /", or broken live counters.
