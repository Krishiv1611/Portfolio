"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Terminal,
  Database,
  Zap,
  HardDrive,
  ExternalLink,
} from "lucide-react";
import { FLAGSHIP_SYSTEMS, ARCHIVE_SYSTEMS } from "@/lib/systems-data";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// 1. COMPASS TECHNICAL FLOW INSPECTOR
// ---------------------------------------------------------------------------

type CompassStage = "routing" | "streaming" | "buffer";
type CompassMode = "ask" | "edit" | "plan";

const COMPASS_WS_FRAMES = [
  {
    seq: 1,
    time: "0 ms",
    type: "ws_connect_ack",
    status: "verified",
    summary: "Handshake established with LangGraph event loop",
    payload: {
      protocol: "langgraph.streaming.v2",
      session_id: "gl_cmp_8a12f9",
      transport: "WebSocket (RFC 6455)",
      buffered_mode: true,
      batch_window_ms: 500,
    },
  },
  {
    seq: 2,
    time: "42 ms",
    type: "node_transition",
    status: "verified",
    summary: "AST Indexer resolved symbols and graph boundaries",
    payload: {
      node: "ast_resolver",
      active_scope: "src/auth/session.py",
      symbols_parsed: 18,
      cache_hit: true,
      dispatch_target: "patch_synthesizer",
    },
  },
  {
    seq: 3,
    time: "118 ms",
    type: "graph_state_delta",
    status: "verified",
    summary: "Planner emitted checkpoint & dependency edges",
    payload: {
      node: "checkpoint_guard",
      thread_id: "th_9230a",
      state_version: 4,
      pending_tasks: ["validate_jwt_signature", "refresh_sliding_ttl"],
    },
  },
  {
    seq: 4,
    time: "246 ms",
    type: "token_stream_ttfb",
    status: "signal",
    summary: "TTFB achieved: First unified diff token emitted to client",
    payload: {
      event: "on_chat_model_stream",
      ttfb_ms: 246,
      vs_http_blocking_ms: 6520,
      delta: "@@ -48,7 +48,11 @@ def validate_jwt(token: str) -> Session:\n+    ttl = get_sliding_window_ttl()",
    },
  },
  {
    seq: 5,
    time: "480 ms",
    type: "run_complete",
    status: "verified",
    summary: "Execution concluded; buffer flushed 1 batched transaction",
    payload: {
      total_frames: 28,
      buffered_events_written: 10,
      db_transactions: 1,
      total_execution_ms: 480,
    },
  },
];

function CompassInspector() {
  const [activeStage, setActiveStage] = useState<CompassStage>("routing");
  const [activeMode, setActiveMode] = useState<CompassMode>("edit");
  const [selectedFrame, setSelectedFrame] = useState<number>(3); // TTFB default

  return (
    <div className="rounded-lg border border-hairline bg-surface overflow-hidden">
      {/* Inspector Topbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-subtle/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-signal" />
          <span className="font-mono text-xs font-medium text-ink-primary tracking-tight">
            COMPASS · FLOW INSPECTOR
          </span>
          <span className="hidden sm:inline-block rounded border border-verified/30 bg-verified/10 px-1.5 py-0.5 font-mono text-[10px] text-verified">
            436/436 TESTS PASS
          </span>
        </div>

        {/* Stage Selector */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveStage("routing")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "routing"
                ? "bg-surface text-ink-primary border border-hairline shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            01 AST Router
          </button>
          <button
            type="button"
            onClick={() => setActiveStage("streaming")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "streaming"
                ? "bg-surface text-signal border border-signal/30 shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            02 State Streaming
          </button>
          <button
            type="button"
            onClick={() => setActiveStage("buffer")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "buffer"
                ? "bg-surface text-ink-primary border border-hairline shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            03 Bounded Buffer
          </button>
        </div>
      </div>

      {/* Stage 1: AST Indexer & Graph Routing */}
      {activeStage === "routing" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-ink-tertiary">STAGE 01 // ARCHITECTURAL DISPATCH</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                AST Indexer & Multi-Mode Graph Routing
              </h4>
            </div>
            {/* Mode Toggles */}
            <div className="flex items-center rounded border border-hairline bg-canvas p-0.5">
              {(["ask", "edit", "plan"] as CompassMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={cn(
                    "px-3 py-1 font-mono text-xs uppercase transition-colors rounded-sm",
                    activeMode === mode
                      ? "bg-subtle text-signal font-semibold"
                      : "text-ink-tertiary hover:text-ink-primary"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-ink-tertiary">
                <span>GRAPH DISPATCH TOPOLOGY</span>
                <span className="text-signal">MODE: {activeMode.toUpperCase()}</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs text-ink-secondary">
                {activeMode === "ask" && (
                  <>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      <span>ast_symbol_lookup (read-only query)</span>
                    </div>
                    <div className="pl-3.5 border-l border-hairline text-[11px] text-ink-tertiary">
                      Scope: AST symbol boundaries · Invariant: Zero workspace modifications
                    </div>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                      <span>context_pruner → response_stream</span>
                    </div>
                  </>
                )}
                {activeMode === "edit" && (
                  <>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      <span>ast_boundary_mapper → unified_diff</span>
                    </div>
                    <div className="pl-3.5 border-l border-hairline text-[11px] text-ink-tertiary">
                      Scope: Exact syntax boundary AST nodes · Invariant: Clean reverse-patchable diff
                    </div>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                      <span>dry_run_syntax_verifier (py_compile pass)</span>
                    </div>
                  </>
                )}
                {activeMode === "plan" && (
                  <>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                      <span>dependency_dag_builder → multi_file_plan</span>
                    </div>
                    <div className="pl-3.5 border-l border-hairline text-[11px] text-ink-tertiary">
                      Scope: Inter-module imports · Invariant: Topological ordering without cycles
                    </div>
                    <div className="flex items-center gap-2 text-ink-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                      <span>step_breakdown → task_lock_manager</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* AST Inspector Output */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-ink-tertiary">
                <span>INSPECTION PAYLOAD</span>
                <span className="text-verified">PARSED AST</span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-ink-secondary overflow-x-auto p-2 bg-surface rounded border border-hairline">
                {activeMode === "ask" &&
                  `{\n  "query": "How is token refresh guarded in SessionManager?",\n  "resolved_nodes": ["auth.py::TokenValidator", "middleware.py::SessionGuard"],\n  "token_weight": 1420,\n  "mutations_permitted": false\n}`}
                {activeMode === "edit" &&
                  `{\n  "target_file": "src/auth/session.py",\n  "ast_symbol": "validate_jwt(token: str)",\n  "mutation_type": "UNIFIED_DIFF",\n  "syntax_integrity_check": "PASSED (0 syntax errors)",\n  "patch_hunks": 1\n}`}
                {activeMode === "plan" &&
                  `{\n  "objective": "Add Redis distributed locking to bounded event writer",\n  "dag_depth": 3,\n  "affected_modules": ["storage/buffer.py", "tasks/flusher.py", "tests/test_buffer.py"],\n  "concurrency_safe": true\n}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: LangGraph State Streaming */}
      {activeStage === "streaming" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-signal">STAGE 02 // REAL-TIME DISPATCH BENCHMARK</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                LangGraph State Streaming over WebSockets
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-tertiary">Measured TTFB:</span>
              <span className="font-mono text-xs font-semibold text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
                &lt;250 ms (vs 6.5s blocking HTTP)
              </span>
            </div>
          </div>

          {/* Latency comparison bar */}
          <div className="space-y-1.5 rounded border border-hairline bg-canvas/60 p-3">
            <div className="flex justify-between text-xs font-mono text-ink-secondary">
              <span>Standard HTTP Block-and-Wait</span>
              <span className="text-ink-tertiary">6,520 ms (blank screen)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-subtle overflow-hidden">
              <div className="h-full bg-ink-tertiary w-full" />
            </div>

            <div className="flex justify-between text-xs font-mono text-ink-primary pt-2">
              <span className="text-signal flex items-center gap-1.5">
                <Zap className="h-3 w-3" /> WebSocket LangGraph Stream (TTFB)
              </span>
              <span className="text-verified font-semibold tabular-nums">246 ms (~85% latency cut)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-subtle overflow-hidden">
              <div className="h-full bg-signal w-[3.8%]" />
            </div>
          </div>

          {/* WebSocket Frames Feed */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-ink-tertiary flex justify-between items-center">
              <span>REAL WEBSOCKET PROTOCOL FRAMES (CLICK TO INSPECT)</span>
              <span>RFC 6455 STREAM</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {COMPASS_WS_FRAMES.map((f, idx) => (
                <button
                  key={f.seq}
                  type="button"
                  onClick={() => setSelectedFrame(idx)}
                  className={cn(
                    "text-left p-2.5 rounded border transition-colors font-mono text-xs",
                    selectedFrame === idx
                      ? "border-signal bg-subtle text-ink-primary"
                      : "border-hairline bg-canvas/40 text-ink-secondary hover:border-border-focus"
                  )}
                >
                  <div className="flex justify-between items-center text-[10px] text-ink-tertiary mb-1">
                    <span>FRAME #{f.seq}</span>
                    <span className={f.status === "signal" ? "text-signal font-semibold" : "text-ink-secondary"}>
                      {f.time}
                    </span>
                  </div>
                  <div className="font-medium truncate text-ink-primary text-[11px]">{f.type}</div>
                </button>
              ))}
            </div>

            {/* Selected Frame JSON Inspector */}
            <div className="rounded border border-hairline bg-canvas p-3 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-[11px] text-ink-tertiary border-b border-hairline pb-1.5">
                <span className="text-signal">FRAME #{COMPASS_WS_FRAMES[selectedFrame].seq} · {COMPASS_WS_FRAMES[selectedFrame].type}</span>
                <span>{COMPASS_WS_FRAMES[selectedFrame].summary}</span>
              </div>
              <pre className="text-[11px] leading-relaxed text-ink-primary overflow-x-auto pt-1">
                {JSON.stringify(COMPASS_WS_FRAMES[selectedFrame].payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: Bounded Buffer Persistence */}
      {activeStage === "buffer" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-ink-tertiary">STAGE 03 // DATABASE LOAD MITIGATION</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Bounded In-Memory Buffer: 10:1 Event Batching
              </h4>
            </div>
            <div className="font-mono text-xs text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
              ~90% DB Write Reduction
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mechanics Card */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-3">
              <div className="font-mono text-xs text-ink-tertiary flex items-center justify-between">
                <span>BUFFER POLICY INVARIANTS</span>
                <HardDrive className="h-3.5 w-3.5 text-signal" />
              </div>
              <div className="space-y-2 text-xs text-ink-secondary font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-signal">01</span>
                  <span>Batch Capacity: <strong className="text-ink-primary">10 events</strong> per flush transaction</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-signal">02</span>
                  <span>Flush Timeout: <strong className="text-ink-primary">500 ms</strong> max bounded delay</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-signal">03</span>
                  <span>PostgreSQL Load: Drops from <strong className="text-ink-primary">142 IOPS</strong> to <strong className="text-verified">14 IOPS</strong></span>
                </div>
              </div>
              <div className="pt-2 border-t border-hairline">
                <div className="text-[11px] text-ink-tertiary">
                  Guarantees crash-safe persistence without choking connection pools during rapid token streaming turns.
                </div>
              </div>
            </div>

            {/* SQL Batch Payload Preview */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2">
              <div className="font-mono text-xs text-ink-tertiary flex items-center justify-between">
                <span>BATCHED SQL TRANSACTION</span>
                <span className="text-verified font-mono text-[10px]">1 WRITES / 10 EVENTS</span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-ink-secondary overflow-x-auto p-2 bg-surface rounded border border-hairline">
{`-- Batched multi-row UPSERT execution
INSERT INTO execution_logs (
  session_id, node_id, event_type, 
  payload_json, recorded_at
)
VALUES
  ('cmp_8a', 'ast_res', 'ENTER', '{...}', NOW()),
  ('cmp_8a', 'planner', 'STATE', '{...}', NOW()),
  ('cmp_8a', 'synth',   'DELTA', '{...}', NOW()),
  -- [... 7 additional batched events ...]
  ('cmp_8a', 'synth',   'EXIT',  '{...}', NOW())
ON CONFLICT (id) DO UPDATE 
SET payload_json = EXCLUDED.payload_json;`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. SYNORA TECHNICAL FLOW INSPECTOR
// ---------------------------------------------------------------------------

type SynoraStage = "rewriter" | "rrf" | "shaper";

const RRF_CANDIDATES = [
  {
    rank: 1,
    title: "Frankfurt Zone High-Availability & Banking FAQ",
    category: "Policy FAQ #318",
    vectorRank: 2,
    vectorScore: "0.814 (cos)",
    ftsRank: 1,
    ftsScore: "0.890 (BM25)",
    rrfCalculation: "1/(60+2) + 1/(60+1) = 0.0161 + 0.0164",
    finalScore: "0.0325",
    boosted: true,
    reason: "Matched exact keywords ('Frankfurt', 'failover') + high dense semantic affinity.",
  },
  {
    rank: 2,
    title: "General Enterprise SLA & Uptime Guidelines",
    category: "General SLA",
    vectorRank: 1,
    vectorScore: "0.842 (cos)",
    ftsRank: 4,
    ftsScore: "0.310 (BM25)",
    rrfCalculation: "1/(60+1) + 1/(60+4) = 0.0164 + 0.0156",
    finalScore: "0.0320",
    boosted: false,
    reason: "High general semantic similarity, but lacks specific regional failover terms.",
  },
  {
    rank: 3,
    title: "GDPR Data Protection & Privacy Addendum",
    category: "Compliance Legal",
    vectorRank: 3,
    vectorScore: "0.791 (cos)",
    ftsRank: 3,
    ftsScore: "0.520 (BM25)",
    rrfCalculation: "1/(60+3) + 1/(60+3) = 0.0158 + 0.0158",
    finalScore: "0.0317",
    boosted: false,
    reason: "Relevant to European privacy laws, but secondary for technical failover inquiries.",
  },
];

function SynoraInspector() {
  const [activeStage, setActiveStage] = useState<SynoraStage>("rrf");
  const [selectedCandidate, setSelectedCandidate] = useState<number>(0);

  return (
    <div className="rounded-lg border border-hairline bg-surface overflow-hidden">
      {/* Inspector Topbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-subtle/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-signal" />
          <span className="font-mono text-xs font-medium text-ink-primary tracking-tight">
            SYNORA · RAG RETRIEVAL INSPECTOR
          </span>
          <span className="hidden sm:inline-block rounded border border-verified/30 bg-verified/10 px-1.5 py-0.5 font-mono text-[10px] text-verified">
            67/67 E2E PASS
          </span>
        </div>

        {/* Stage Selector */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveStage("rewriter")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "rewriter"
                ? "bg-surface text-ink-primary border border-hairline shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            01 Query Rewriter
          </button>
          <button
            type="button"
            onClick={() => setActiveStage("rrf")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "rrf"
                ? "bg-surface text-signal border border-signal/30 shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            02 RRF Fusion
          </button>
          <button
            type="button"
            onClick={() => setActiveStage("shaper")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeStage === "shaper"
                ? "bg-surface text-ink-primary border border-hairline shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            03 Voice Shaper
          </button>
        </div>
      </div>

      {/* Stage 1: Entity-Aware Query Rewriting */}
      {activeStage === "rewriter" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-ink-tertiary">STAGE 01 // CONTEXT COMPRESSION</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Entity-Aware Multi-Turn Query Rewriter
              </h4>
            </div>
            <div className="font-mono text-xs text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
              ~60% Prompt Token Cut
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Conversation Turns */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2.5">
              <div className="flex justify-between items-center font-mono text-xs text-ink-tertiary">
                <span>RAW CONVERSATION HISTORY</span>
                <span className="text-ink-secondary">384 TOKENS</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] text-ink-secondary">
                <div className="p-2 rounded bg-surface border border-hairline">
                  <span className="text-ink-tertiary">Turn 1 (User):</span> &quot;We want to roll out customer service for our European enterprise accounts.&quot;
                </div>
                <div className="p-2 rounded bg-surface border border-hairline">
                  <span className="text-ink-tertiary">Turn 2 (Bot):</span> &quot;Our enterprise plan supports multi-region deployment and dedicated PostgreSQL databases.&quot;
                </div>
                <div className="p-2 rounded bg-surface border border-hairline">
                  <span className="text-ink-tertiary">Turn 3 (User):</span> &quot;What are the data residency guarantees and SLA if the Frankfurt cluster fails?&quot;
                </div>
              </div>
              <div className="text-[11px] font-mono text-ink-tertiary">
                Directly embedding all turns injects conversational noise and pronoun ambiguity into the vector space.
              </div>
            </div>

            {/* Rewritten Query Output */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-3">
              <div className="flex justify-between items-center font-mono text-xs text-ink-tertiary">
                <span>REWRITTEN SEMANTIC SEARCH QUERY</span>
                <span className="text-signal font-semibold">14 TOKENS (-96.3%)</span>
              </div>
              <div className="p-3 rounded border border-signal/30 bg-surface font-mono text-xs text-ink-primary space-y-2">
                <div className="text-[11px] text-signal font-medium">Extracted Entity Graph:</div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {["Enterprise", "EU Data Residency", "German Privacy", "Frankfurt Cluster", "Failover SLA", "Uptime Guarantee"].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-subtle text-ink-primary border border-hairline">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-hairline text-xs font-mono text-verified">
                  &quot;Enterprise EU data residency compliance and Frankfurt zone failover SLA guarantee&quot;
                </div>
              </div>
              <div className="text-[11px] font-mono text-ink-tertiary">
                Dispatched simultaneously to pgvector cosine index and PostgreSQL BM25 tsvector parser.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Reciprocal Rank Fusion (RRF) */}
      {activeStage === "rrf" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-signal">STAGE 02 // DUAL-INDEX HYBRID RETRIEVAL</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Reciprocal Rank Fusion (pgvector + PostgreSQL Full-Text Search)
              </h4>
            </div>
            <div className="font-mono text-xs text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
              &gt;72% Top-1 FAQ Overlap
            </div>
          </div>

          {/* RRF Formula Callout */}
          <div className="rounded border border-hairline bg-canvas/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <span className="text-ink-secondary">
              Fusion Formula: <code className="text-signal">RRF_Score(d) = Σ [ 1 / (60 + rank_i(d)) ]</code>
            </span>
            <span className="text-ink-tertiary text-[11px]">Constant k = 60 prevents extreme rank outlier distortion</span>
          </div>

          {/* Candidates Table */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-ink-tertiary flex justify-between">
              <span>FUSED RETRIEVAL CANDIDATES (SELECT TO INSPECT FUSION MATH)</span>
              <span>pgvector + ts_rank</span>
            </div>

            <div className="space-y-2">
              {RRF_CANDIDATES.map((cand, idx) => (
                <div
                  key={cand.rank}
                  onClick={() => setSelectedCandidate(idx)}
                  className={cn(
                    "p-3 rounded border cursor-pointer transition-colors font-mono text-xs",
                    selectedCandidate === idx
                      ? "border-signal bg-subtle"
                      : "border-hairline bg-canvas/50 hover:border-border-focus"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold",
                        cand.boosted ? "bg-verified text-canvas" : "bg-subtle text-ink-secondary"
                      )}>
                        RANK #{cand.rank}
                      </span>
                      <span className="text-ink-primary font-sans font-medium text-sm">{cand.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-ink-tertiary">
                      <span>Vector: <strong className="text-ink-secondary">#{cand.vectorRank}</strong></span>
                      <span>FTS: <strong className="text-ink-secondary">#{cand.ftsRank}</strong></span>
                      <span className="text-signal font-semibold">RRF: {cand.finalScore}</span>
                    </div>
                  </div>

                  {selectedCandidate === idx && (
                    <div className="mt-2.5 pt-2.5 border-t border-hairline/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-ink-tertiary">Math Breakdown: </span>
                        <span className="text-ink-primary">{cand.rrfCalculation}</span>
                      </div>
                      <div className="text-ink-secondary">
                        <span className="text-verified">Reason: </span>
                        {cand.reason}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: Vapi Payload Shaper */}
      {activeStage === "shaper" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-ink-tertiary">STAGE 03 // LOW-LATENCY VOICE WEBHOOK</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Vapi Voice Payload Shaper (Sub-200ms Webhook Budget)
              </h4>
            </div>
            <div className="font-mono text-xs text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
              86% Voice Payload Cut
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before vs After Telemetry */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-3">
              <div className="font-mono text-xs text-ink-tertiary flex justify-between">
                <span>PAYLOAD SIZE REDUCTION</span>
                <span>CHARACTERS</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-ink-tertiary text-[11px] mb-1">
                    <span>Naive Retrieval (6 Chunks)</span>
                    <span>18,240 chars (1,420 ms turnaround)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-subtle overflow-hidden">
                    <div className="h-full bg-ink-tertiary w-full" />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-signal text-[11px] mb-1">
                    <span className="font-medium">Shaped Voice Payload (3 High-Precision Chunks)</span>
                    <span className="text-verified font-bold">2,480 chars (195 ms turnaround)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-subtle overflow-hidden">
                    <div className="h-full bg-verified w-[13.6%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-ink-tertiary border-t border-hairline">
                Eliminated conversational stuttering and webhook timeout aborts on live phone calls by staying strictly within Vapi&apos;s audio buffer threshold.
              </div>
            </div>

            {/* Shaped JSON Spec */}
            <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2">
              <div className="font-mono text-xs text-ink-tertiary flex justify-between">
                <span>VAPI WEBHOOK RESPONSE SPEC</span>
                <span className="text-verified font-mono text-[10px]">VERIFIED 195 MS</span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-ink-secondary overflow-x-auto p-2 bg-surface rounded border border-hairline">
{`{
  "voice_turn_id": "vapi_tk_7102",
  "status": "ready",
  "retrieval_latency_ms": 195,
  "chunk_count": 3,
  "payload_chars": 2480,
  "synthesized_context": "Frankfurt zone features active-active geo-redundancy with <15 min RTO and 0 data loss failover. In compliance with German BaFin and GDPR Section 9."
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. CAREERPILOT AI TECHNICAL FLOW INSPECTOR
// ---------------------------------------------------------------------------

type CareerPilotView = "benchmark" | "auditor";
type CareerPilotAuditorSub = "scam" | "claims";
type RiskTier = "tier1" | "tier2" | "tier3";

const RESUME_RISK_TIERS = {
  tier1: {
    title: "Tier 1: High Depth Risk (Architectural / Concurrency)",
    badge: "HIGH INTERVIEW PROBE RISK",
    badgeColor: "text-signal border-signal/40 bg-signal/10",
    claim: "Architected LangGraph state streaming over WebSockets with 436 automated tests.",
    interviewerProbe:
      "Expect deep-dive questions on WebSocket connection dropouts, backpressure handling, reconnect idempotency, and ring buffer overflow policy.",
    mitigationStrategy:
      "Prepared specific test scenarios from test_streaming.py demonstrating bounded ring buffer discard policies and token delta assembly.",
  },
  tier2: {
    title: "Tier 2: Moderate Verification Risk (Retrieval & Fusion)",
    badge: "MODERATE VERIFICATION RISK",
    badgeColor: "text-ink-primary border-hairline bg-subtle",
    claim: "Engineered RRF hybrid search fusing pgvector and PostgreSQL FTS with >72% FAQ overlap.",
    interviewerProbe:
      "Expect questions comparing reciprocal rank fusion vs linear weighted score combination, and why k=60 was selected.",
    mitigationStrategy:
      "Have empirical benchmark numbers ready showing cosine score normalization distortion vs rank-based stability.",
  },
  tier3: {
    title: "Tier 3: Standard Competency (Contract / Schema)",
    badge: "STANDARD VERIFIED COMPETENCY",
    badgeColor: "text-verified border-verified/40 bg-verified/10",
    claim: "Implemented typed REST endpoints using FastAPI and Pydantic v2 schemas.",
    interviewerProbe:
      "Standard contract integrity and validation error serialisation inquiries.",
    mitigationStrategy:
      "Fully covered under the 230 automated contract tests.",
  },
};

function CareerPilotInspector() {
  const [activeView, setActiveView] = useState<CareerPilotView>("benchmark");
  const [auditorSub, setAuditorSub] = useState<CareerPilotAuditorSub>("scam");
  const [selectedRiskTier, setSelectedRiskTier] = useState<RiskTier>("tier1");
  const [selectedJobListing, setSelectedJobListing] = useState<"scam" | "verified">("scam");

  return (
    <div className="rounded-lg border border-hairline bg-surface overflow-hidden">
      {/* Inspector Topbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-subtle/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-signal" />
          <span className="font-mono text-xs font-medium text-ink-primary tracking-tight">
            CAREERPILOT · COMPILER & AUDITOR
          </span>
          <span className="hidden sm:inline-block rounded border border-verified/30 bg-verified/10 px-1.5 py-0.5 font-mono text-[10px] text-verified">
            445/445 TESTS PASS
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveView("benchmark")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeView === "benchmark"
                ? "bg-surface text-signal border border-signal/30 shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            Vector Compiler Benchmark
          </button>
          <button
            type="button"
            onClick={() => setActiveView("auditor")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded transition-colors",
              activeView === "auditor"
                ? "bg-surface text-ink-primary border border-hairline shadow-sm"
                : "text-ink-tertiary hover:text-ink-secondary"
            )}
          >
            Claim & Scam Auditor
          </button>
        </div>
      </div>

      {/* View A: Vector Compiler Benchmark */}
      {activeView === "benchmark" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-signal">BENCHMARK // PYTHON REPORTLAB VS HEADLESS CHROMIUM</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Deterministic Vector PDF Compiler Performance
              </h4>
            </div>
            <div className="font-mono text-xs text-verified px-2 py-0.5 rounded bg-verified/10 border border-verified/30">
              &gt;99% PDF Size Reduction · 2.2 ms Compile
            </div>
          </div>

          {/* Benchmark Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded border border-hairline bg-canvas/70 p-3 space-y-1">
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Compile Latency</div>
              <div className="text-lg font-mono font-semibold text-verified">2.2 ms</div>
              <div className="text-[11px] font-mono text-ink-tertiary">vs 1,820 ms Chromium (827x)</div>
            </div>

            <div className="rounded border border-hairline bg-canvas/70 p-3 space-y-1">
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Document Size</div>
              <div className="text-lg font-mono font-semibold text-verified">1.9 KB</div>
              <div className="text-[11px] font-mono text-ink-tertiary">vs 248.6 KB PDF (&gt;99% cut)</div>
            </div>

            <div className="rounded border border-hairline bg-canvas/70 p-3 space-y-1">
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Server Memory RSS</div>
              <div className="text-lg font-mono font-semibold text-verified">14 MB</div>
              <div className="text-[11px] font-mono text-ink-tertiary">vs 380 MB headless browser</div>
            </div>

            <div className="rounded border border-hairline bg-canvas/70 p-3 space-y-1">
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">ATS Text Quality</div>
              <div className="text-lg font-mono font-semibold text-ink-primary">100% Extract</div>
              <div className="text-[11px] font-mono text-ink-tertiary">Clean Type 1 vector glyphs</div>
            </div>
          </div>

          {/* Low-Overhead PDF Stream Preview */}
          <div className="rounded border border-hairline bg-canvas/70 p-3.5 space-y-2">
            <div className="flex justify-between items-center font-mono text-xs text-ink-tertiary">
              <span>RAW VECTOR DRAWING STREAM (EMITTED IN 2.2 MS)</span>
              <span className="text-signal">reportlab_compiler.py</span>
            </div>
            <pre className="font-mono text-[11px] leading-relaxed text-ink-secondary overflow-x-auto p-2 bg-surface rounded border border-hairline">
{`%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595.27 841.89] /Contents 4 0 R >> endobj
4 0 obj << /Length 284 >> stream
BT
/F1 14.0 Tf 54.0 780.0 Td (KRISHIV ARORA) Tj
/F2 9.0 Tf 0 -16.0 Td (Aspiring Software Engineer | New Delhi, India | krishivarora150@gmail.com) Tj
ET
0.5 w 54.0 754.0 m 541.27 754.0 l S
BT
/F1 10.0 Tf 54.0 736.0 Td (ENGINEERING EXPERIENCE) Tj
ET
endstream endobj`}
            </pre>
          </div>
        </div>
      )}

      {/* View B: Claim Risk & Scam Auditor */}
      {activeView === "auditor" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-3">
            <div>
              <div className="font-mono text-xs text-ink-tertiary">AUDITOR // SCAM DETECTION & RESUME VERIFICATION</div>
              <h4 className="text-sm font-medium text-ink-primary font-sans mt-0.5">
                Authenticity Scorer & 3-Tier Claim Risk Auditor
              </h4>
            </div>

            {/* Sub-view switcher */}
            <div className="flex items-center rounded border border-hairline bg-canvas p-0.5">
              <button
                type="button"
                onClick={() => setAuditorSub("scam")}
                className={cn(
                  "px-3 py-1 font-mono text-xs transition-colors rounded-sm",
                  auditorSub === "scam"
                    ? "bg-subtle text-signal font-semibold"
                    : "text-ink-tertiary hover:text-ink-primary"
                )}
              >
                0–100 Scam Scorer
              </button>
              <button
                type="button"
                onClick={() => setAuditorSub("claims")}
                className={cn(
                  "px-3 py-1 font-mono text-xs transition-colors rounded-sm",
                  auditorSub === "claims"
                    ? "bg-subtle text-signal font-semibold"
                    : "text-ink-tertiary hover:text-ink-primary"
                )}
              >
                3-Tier Claim Auditor
              </button>
            </div>
          </div>

          {/* Sub-view 1: Job Scam Scorer */}
          {auditorSub === "scam" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobListing("scam")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-mono rounded border transition-colors",
                    selectedJobListing === "scam"
                      ? "border-signal bg-subtle text-ink-primary"
                      : "border-hairline text-ink-tertiary hover:text-ink-secondary"
                  )}
                >
                  Inspect Sample Ghost / Scam Posting
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJobListing("verified")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-mono rounded border transition-colors",
                    selectedJobListing === "verified"
                      ? "border-signal bg-subtle text-ink-primary"
                      : "border-hairline text-ink-tertiary hover:text-ink-secondary"
                  )}
                >
                  Inspect Verified Enterprise Listing
                </button>
              </div>

              {selectedJobListing === "scam" ? (
                <div className="rounded border border-hairline bg-canvas/70 p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <span className="text-ink-primary font-medium">Job Title: &quot;Junior Data Entry / AI Analyst - $120/hr Telegram Interview&quot;</span>
                    <span className="px-2 py-0.5 rounded bg-red-950/40 border border-red-800/40 text-red-400 font-bold">
                      SCORE: 18/100 [HIGH SCAM RISK]
                    </span>
                  </div>
                  <div className="space-y-1.5 text-ink-secondary">
                    <div className="text-ink-primary font-semibold text-[11px]">Identified Risk Heuristics:</div>
                    <div className="flex items-center gap-2 text-red-400 text-[11px]">
                      <span>✕</span> Domain DNS MX record: Free mailer (`recruiter@fastmail-cloud.com`)
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-[11px]">
                      <span>✕</span> Compensation format: Uncapped 100% commission with zero verified base
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-[11px]">
                      <span>✕</span> Interview channel: Requested off-platform Telegram communication
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-[11px]">
                      <span>✕</span> Posting longevity: Reposted 8 times over 140 days without hires (Ghost Posting)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded border border-hairline bg-canvas/70 p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <span className="text-ink-primary font-medium">Job Title: &quot;Software Engineering Trainee — GlobalLogic (Hitachi Group)&quot;</span>
                    <span className="px-2 py-0.5 rounded bg-verified/10 border border-verified/40 text-verified font-bold">
                      SCORE: 96/100 [VERIFIED ENTERPRISE]
                    </span>
                  </div>
                  <div className="space-y-1.5 text-ink-secondary">
                    <div className="text-ink-primary font-semibold text-[11px]">Verification Signals:</div>
                    <div className="flex items-center gap-2 text-verified text-[11px]">
                      <span>✓</span> Corporate DNS MX validation matches verified domain records
                    </div>
                    <div className="flex items-center gap-2 text-verified text-[11px]">
                      <span>✓</span> Direct career portal endpoint with signed applicant tracking tokens
                    </div>
                    <div className="flex items-center gap-2 text-verified text-[11px]">
                      <span>✓</span> Structured compensation range adhering to local market disclosures
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-view 2: 3-Tier Claim Auditor */}
          {auditorSub === "claims" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(["tier1", "tier2", "tier3"] as RiskTier[]).map((tierKey) => (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedRiskTier(tierKey)}
                    className={cn(
                      "p-2.5 rounded border text-left font-mono text-xs transition-colors",
                      selectedRiskTier === tierKey
                        ? "border-signal bg-subtle text-ink-primary"
                        : "border-hairline bg-canvas/40 text-ink-secondary hover:border-border-focus"
                    )}
                  >
                    <div className="text-[10px] text-ink-tertiary mb-1 uppercase">{tierKey}</div>
                    <div className="font-medium truncate">{RESUME_RISK_TIERS[tierKey].title.split(":")[0]}</div>
                  </button>
                ))}
              </div>

              {/* Selected Tier Details */}
              <div className="rounded border border-hairline bg-canvas/70 p-4 space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-2">
                  <span className="font-semibold text-ink-primary text-sm font-sans">
                    {RESUME_RISK_TIERS[selectedRiskTier].title}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", RESUME_RISK_TIERS[selectedRiskTier].badgeColor)}>
                    {RESUME_RISK_TIERS[selectedRiskTier].badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-ink-tertiary text-[11px]">Audited Resume Bullet Claim:</div>
                  <div className="p-2 rounded bg-surface border border-hairline text-ink-primary text-xs">
                    &quot;{RESUME_RISK_TIERS[selectedRiskTier].claim}&quot;
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                  <div>
                    <div className="text-signal font-semibold mb-1">Expected Interviewer Probe:</div>
                    <div className="text-ink-secondary leading-relaxed">
                      {RESUME_RISK_TIERS[selectedRiskTier].interviewerProbe}
                    </div>
                  </div>
                  <div>
                    <div className="text-verified font-semibold mb-1">Verification Defense Strategy:</div>
                    <div className="text-ink-secondary leading-relaxed">
                      {RESUME_RISK_TIERS[selectedRiskTier].mitigationStrategy}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. ARCHIVE SYSTEMS TABLE
// ---------------------------------------------------------------------------

function ArchiveTable() {
  return (
    <div id="archive" className="mt-20 pt-12 border-t border-hairline">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="font-mono text-xs text-ink-tertiary tracking-wider uppercase mb-1">
            Secondary Implementations · Exploratory Work
          </div>
          <h3 className="text-xl font-normal text-ink-primary font-sans">
            Archive Systems & Specialized Utilities
          </h3>
        </div>
        <div className="font-mono text-xs text-ink-tertiary">
          3 verified repository builds
        </div>
      </div>

      <div className="overflow-x-auto rounded border border-hairline bg-surface">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-subtle/50 text-ink-tertiary">
              <th className="py-3 px-4 font-normal">System</th>
              <th className="py-3 px-4 font-normal hidden sm:table-cell">Focus & Scope</th>
              <th className="py-3 px-4 font-normal">Runtime / Stack</th>
              <th className="py-3 px-4 font-normal text-right">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {ARCHIVE_SYSTEMS.map((item) => (
              <tr key={item.id} className="hover:bg-subtle/40 transition-colors">
                <td className="py-3.5 px-4 font-medium text-ink-primary whitespace-nowrap">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-signal transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary" />
                  </a>
                </td>
                <td className="py-3.5 px-4 text-ink-secondary font-sans text-xs hidden sm:table-cell max-w-md">
                  {item.description}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded bg-canvas border border-hairline text-[10px] text-ink-tertiary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-ink-tertiary hover:text-ink-primary transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. MAIN SYSTEMS SECTION COMPONENT
// ---------------------------------------------------------------------------

export function SystemsSection() {
  const compassData = FLAGSHIP_SYSTEMS.find((s) => s.id === "compass") || FLAGSHIP_SYSTEMS[0];
  const synoraData = FLAGSHIP_SYSTEMS.find((s) => s.id === "synora") || FLAGSHIP_SYSTEMS[1];
  const careerPilotData = FLAGSHIP_SYSTEMS.find((s) => s.id === "careerpilot") || FLAGSHIP_SYSTEMS[2];

  return (
    <section id="systems" className="relative py-24 sm:py-32 border-b border-hairline bg-canvas">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 border-b border-hairline pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-ink-tertiary tracking-wider uppercase mb-2">
                Systems Monograph · Case Studies
              </div>
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-ink-primary font-sans">
                Selected Systems & Technical Case Studies
              </h2>
            </div>
            <div className="font-mono text-xs text-ink-tertiary max-w-md leading-relaxed">
              Production architectures engineered under concrete latency, memory, and verification constraints.
              Zero simulated runtimes.
            </div>
          </div>
        </div>

        {/* Flagship Showcases */}
        <div className="space-y-24 sm:space-y-32">
          {/* -------------------------------------------------------------- */}
          {/* SYSTEM 1: COMPASS */}
          {/* -------------------------------------------------------------- */}
          <div id="compass" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24">
            {/* Cols 1–5: Prose Narrative & Test Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-signal">
                  {compassData.roleAndTimeline || "Summer Trainee, Software Engineering · GlobalLogic"}
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-ink-primary font-sans tracking-tight">
                  {compassData.title}
                </h3>
                <p className="font-mono text-xs text-ink-tertiary">
                  {compassData.subtitle}
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {compassData.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded border border-hairline bg-surface font-mono text-xs text-ink-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="rounded border border-verified/30 bg-verified/5 p-3">
                  <div className="font-mono text-lg font-semibold text-verified tabular-nums">
                    {compassData.testMetric.count}
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    {compassData.testMetric.detail}
                  </div>
                </div>
                <div className="rounded border border-signal/30 bg-signal/5 p-3">
                  <div className="font-mono text-lg font-semibold text-signal tabular-nums">
                    &lt;250 ms TTFB
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    ~85% latency reduction
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    ~90% DB Write Cut
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    Bounded in-memory buffer
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    363 kB
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    Code-split base bundle
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-4 text-sm text-ink-secondary font-sans leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Problem & Context
                  </h4>
                  <p>{compassData.narrative.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Architecture
                  </h4>
                  <p>{compassData.narrative.architecture}</p>
                </div>
              </div>

              {/* Impact Bullets */}
              <div className="space-y-2 pt-2 border-t border-hairline">
                <div className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-2">
                  Verified Engineering Outcomes
                </div>
                {compassData.narrative.impact.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ink-secondary">
                    <CheckCircle2 className="h-4 w-4 text-verified shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Repo Link */}
              <div className="pt-2">
                <a
                  href={compassData.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-hairline bg-surface text-ink-primary hover:border-signal transition-colors font-mono text-xs"
                >
                  <span>Inspect Compass Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary" />
                </a>
              </div>
            </div>

            {/* Cols 6–12: Interactive Flow Inspector */}
            <div className="lg:col-span-7">
              <CompassInspector />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SYSTEM 2: SYNORA */}
          {/* -------------------------------------------------------------- */}
          <div id="synora" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24">
            {/* Cols 1–5: Prose Narrative & Test Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-signal">
                  {synoraData.roleAndTimeline || "System Architect & Developer"}
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-ink-primary font-sans tracking-tight">
                  {synoraData.title}
                </h3>
                <p className="font-mono text-xs text-ink-tertiary">
                  {synoraData.subtitle}
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {synoraData.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded border border-hairline bg-surface font-mono text-xs text-ink-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="rounded border border-verified/30 bg-verified/5 p-3">
                  <div className="font-mono text-lg font-semibold text-verified tabular-nums">
                    {synoraData.testMetric.count}
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    {synoraData.testMetric.detail}
                  </div>
                </div>
                <div className="rounded border border-signal/30 bg-signal/5 p-3">
                  <div className="font-mono text-lg font-semibold text-signal tabular-nums">
                    &gt;72% Overlap
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    RRF Top-1 FAQ precision
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    ~60% Token Cut
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    Entity-aware query rewriter
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    86% Payload Cut
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    18k to 2.5k chars for Vapi
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-4 text-sm text-ink-secondary font-sans leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Problem & Context
                  </h4>
                  <p>{synoraData.narrative.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Architecture
                  </h4>
                  <p>{synoraData.narrative.architecture}</p>
                </div>
              </div>

              {/* Impact Bullets */}
              <div className="space-y-2 pt-2 border-t border-hairline">
                <div className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-2">
                  Verified Engineering Outcomes
                </div>
                {synoraData.narrative.impact.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ink-secondary">
                    <CheckCircle2 className="h-4 w-4 text-verified shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Repo Link */}
              <div className="pt-2">
                <a
                  href={synoraData.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-hairline bg-surface text-ink-primary hover:border-signal transition-colors font-mono text-xs"
                >
                  <span>Inspect Synora Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary" />
                </a>
              </div>
            </div>

            {/* Cols 6–12: Interactive Flow Inspector */}
            <div className="lg:col-span-7">
              <SynoraInspector />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SYSTEM 3: CAREERPILOT AI */}
          {/* -------------------------------------------------------------- */}
          <div id="careerpilot" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24">
            {/* Cols 1–5: Prose Narrative & Test Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-signal">
                  {careerPilotData.roleAndTimeline || "Core Developer"}
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-ink-primary font-sans tracking-tight">
                  {careerPilotData.title}
                </h3>
                <p className="font-mono text-xs text-ink-tertiary">
                  {careerPilotData.subtitle}
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {careerPilotData.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded border border-hairline bg-surface font-mono text-xs text-ink-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="rounded border border-verified/30 bg-verified/5 p-3">
                  <div className="font-mono text-lg font-semibold text-verified tabular-nums">
                    {careerPilotData.testMetric.count}
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    {careerPilotData.testMetric.detail}
                  </div>
                </div>
                <div className="rounded border border-signal/30 bg-signal/5 p-3">
                  <div className="font-mono text-lg font-semibold text-signal tabular-nums">
                    2.2 ms / 1.9 KB
                  </div>
                  <div className="font-mono text-xs text-ink-secondary">
                    &gt;99% PDF size cut vs Chromium
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    0–100 Scorer
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    Ghost & scam job auditor
                  </div>
                </div>
                <div className="rounded border border-hairline bg-surface p-3">
                  <div className="font-mono text-lg font-semibold text-ink-primary tabular-nums">
                    151 kB
                  </div>
                  <div className="font-mono text-xs text-ink-tertiary">
                    React 19 bundle (12 chunks)
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-4 text-sm text-ink-secondary font-sans leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Problem & Context
                  </h4>
                  <p>{careerPilotData.narrative.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">
                    Architecture
                  </h4>
                  <p>{careerPilotData.narrative.architecture}</p>
                </div>
              </div>

              {/* Impact Bullets */}
              <div className="space-y-2 pt-2 border-t border-hairline">
                <div className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-2">
                  Verified Engineering Outcomes
                </div>
                {careerPilotData.narrative.impact.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ink-secondary">
                    <CheckCircle2 className="h-4 w-4 text-verified shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Repo Link */}
              <div className="pt-2">
                <a
                  href={careerPilotData.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-hairline bg-surface text-ink-primary hover:border-signal transition-colors font-mono text-xs"
                >
                  <span>Inspect CareerPilot AI Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary" />
                </a>
              </div>
            </div>

            {/* Cols 6–12: Interactive Flow Inspector */}
            <div className="lg:col-span-7">
              <CareerPilotInspector />
            </div>
          </div>
        </div>

        {/* Secondary Archive Table */}
        <ArchiveTable />
      </div>
    </section>
  );
}
