export interface FlowInspectorStage {
  id: string;
  label: string;
  headline: string;
  description: string;
  telemetry: Record<string, string>;
  codeSample: string;
}

export interface SystemCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  roleAndTimeline?: string;
  repoUrl: string;
  stack: string[];
  testMetric: {
    count: string;
    detail: string;
  };
  metricsSummary: {
    label: string;
    value: string;
    note: string;
  }[];
  narrative: {
    problem: string;
    architecture: string;
    impact: string[];
  };
  flowInspector?: {
    title: string;
    stages: FlowInspectorStage[];
  };
}

export const IDENTITY = {
  name: "Krishiv Arora",
  role: "Aspiring Software Engineer",
  headline: "Aspiring software engineer building AI systems and dependable web applications.",
  lead: "I design and build web applications where language models operate under real systems constraints—streaming multi-step agent state over WebSockets, fusing vector and lexical search in PostgreSQL, and keeping frontend bundles fast and verifiable.",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  email: "krishivarora150@gmail.com",
  phone: "+91 9557187881",
  links: {
    github: "https://github.com/Krishiv1611",
    linkedin: "https://linkedin.com/in/krishivarora25",
    leetcode: "https://leetcode.com/u/krishivarora25/",
    codechef: "https://www.codechef.com/users/krishivarora25",
    resume: "/2401030298_Krishiv_Arora.pdf",
  },
  contextRail: {
    status: "Undergraduate & Software Engineering Trainee",
    recent: {
      role: "Summer Trainee, Software Engineering",
      company: "GlobalLogic (Hitachi Group)",
      timeline: "Jun 2026 – Jul 2026",
      note: "Engineered Compass developer workbench",
    },
    focusAreas: [
      "Agentic Workflows (LangGraph)",
      "Hybrid RAG (pgvector + FTS)",
      "FastAPI & Next.js Architecture",
      "Automated Testing & Benchmarks",
    ],
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Jaypee Institute of Information Technology (JIIT)",
      location: "Noida, India",
      timeline: "2024 – 2028",
      cgpa: "7.44 / 10",
    },
  },
  telemetryMetrics: [
    {
      targetId: "compass",
      tag: "Compass (GlobalLogic)",
      metric: "<250 ms TTFB",
      delta: "~85% latency cut",
      detail: "LangGraph state streaming over WebSockets",
    },
    {
      targetId: "synora",
      tag: "Synora RAG Engine",
      metric: ">72% Top-1 Overlap",
      delta: "Rank #1 FAQ precision",
      detail: "pgvector + PostgreSQL Full-Text RRF fusion",
    },
    {
      targetId: "careerpilot",
      tag: "CareerPilot Compiler",
      metric: "2.2 ms / 1.9 KB",
      delta: ">99% PDF size cut",
      detail: "Vector ReportLab compiler vs headless Chromium",
    },
  ],
};

export const FLAGSHIP_SYSTEMS: SystemCaseStudy[] = [
  {
    id: "compass",
    title: "Compass",
    subtitle: "Repository-Aware Engineering Workbench",
    roleAndTimeline: "Summer Trainee, Software Engineering · GlobalLogic (Hitachi Group) · Jun 2026 – Jul 2026",
    repoUrl: "https://github.com/Krishiv1611/Compass",
    stack: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "PostgreSQL"],
    testMetric: {
      count: "436 tests",
      detail: "100% pass rate",
    },
    metricsSummary: [
      { label: "TTFB Latency", value: "<250 ms", note: "~85% cut vs 6.5s blocking" },
      { label: "DB Write Load", value: "-90%", note: "10:1 bounded buffer batching" },
      { label: "Client Bundle", value: "363 kB", note: "Route-split Ask/Edit/Plan" },
      { label: "Automated Suite", value: "436 tests", note: "100% passing contract tests" },
    ],
    narrative: {
      problem:
        "Built during my software engineering traineeship at GlobalLogic to eliminate developer context switching across repository exploration, implementation planning, code edits, and patch review. Early synchronous iterations blocked the interface for over six seconds while waiting for complete LangGraph execution and hammered PostgreSQL with high-frequency unbuffered event writes.",
      architecture:
        "I re-architected the execution pipeline to stream LangGraph state transitions directly over WebSockets and introduced a bounded in-memory buffer that batches run events before flushing to PostgreSQL. Route-level code splitting was applied across the Ask, Edit, and Plan workbenches to preserve strict client bundle budgets.",
      impact: [
        "Cut response latency ~85% (~6.5 s to <250 ms time-to-first-byte) by streaming LangGraph state over WebSockets.",
        "Cut database write load ~90% by batching run events through a bounded buffer.",
        "Kept the base frontend bundle to 363 kB by applying route-level code splitting across Ask, Edit, and Plan workbenches.",
        "Maintained 436 automated tests at a 100% pass rate.",
      ],
    },
    flowInspector: {
      title: "Execution Pipeline & State Streaming Inspector",
      stages: [
        {
          id: "ast-routing",
          label: "AST Indexer & Graph Routing",
          headline: "Deterministic multi-file AST traversal & mode dispatch",
          description:
            "Parses target workspace AST into a lightweight symbol graph. Routes the query to Ask, Edit, or Plan LangGraph topologies based on intent classification.",
          telemetry: {
            "Parse Time": "14.2 ms",
            "Symbols Indexed": "342 nodes",
            "Mode Dispatched": "Edit",
            "Context Files": "4 targets",
          },
          codeSample: `# ast_engine.py
async def route_execution(repo_path: Path, intent: Intent) -> GraphState:
    symbols = await parse_ast_symbols(repo_path)
    state = GraphState(repo=repo_path, symbols=symbols, mode=intent.mode)
    return await langgraph_router.compile().ainvoke(state)`,
        },
        {
          id: "state-streaming",
          label: "LangGraph State Streaming",
          headline: "Sub-250ms TTFB via WebSocket frame dispatch",
          description:
            "Streams intermediate LangGraph state transitions directly to the browser over persistent WebSockets, replacing blocking HTTP polling.",
          telemetry: {
            TTFB: "184 ms",
            Protocol: "WebSocket (RFC 6455)",
            "Frame Cadence": "42 tok/s",
            "Blocking Reduction": "96.4%",
          },
          codeSample: `// useWorkbenchStream.ts
const ws = new WebSocket(\`\${WS_ENDPOINT}/api/workbench/stream/\${sessionId}\`);
ws.onmessage = (event) => {
  const delta: NodeDelta = JSON.parse(event.data);
  applyGraphTransition(delta.node, delta.patch);
};`,
        },
        {
          id: "buffer-persistence",
          label: "Bounded Buffer Persistence",
          headline: "10:1 event batching before PostgreSQL write",
          description:
            "Absorbs high-frequency LangGraph node events into a bounded in-memory ring buffer, executing transactional bulk writes every 250ms or 10 events.",
          telemetry: {
            "Buffer Capacity": "100 frames",
            "Flush Interval": "250 ms",
            "DB Load Cut": "90.2%",
            "Write Latency": "3.1 ms",
          },
          codeSample: `# event_buffer.py
class BoundedEventBuffer:
    def __init__(self, capacity: int = 10, timeout: float = 0.25):
        self.queue = asyncio.Queue(maxsize=capacity)
    async def flush_batch(self, db: AsyncSession):
        batch = self.drain()
        await db.execute(insert(WorkflowEvent).values(batch))`,
        },
      ],
    },
  },
  {
    id: "synora",
    title: "Synora",
    subtitle: "Multi-Tenant AI Customer Support & Voice RAG Platform",
    roleAndTimeline: "System Architect & Engineer",
    repoUrl: "https://github.com/Krishiv1611/Synora",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Tailwind CSS"],
    testMetric: {
      count: "67 tests",
      detail: "100% passing E2E suite",
    },
    metricsSummary: [
      { label: "Top-1 Precision", value: ">72%", note: "pgvector + PostgreSQL FTS RRF fusion" },
      { label: "Token Overhead", value: "-60%", note: "Entity-aware multi-turn rewrite" },
      { label: "Voice Payload", value: "-86%", note: "18,000 to 2,500 chars for Vapi" },
      { label: "Tenant Isolation", value: "10 tables", note: "100% verified by 67 E2E tests" },
    ],
    narrative: {
      problem:
        "An AI customer support platform built for both multi-turn chat and real-time voice webhooks. Pure vector embeddings frequently produced retrieval misses on exact policy clauses and SKU identifiers, while naive multi-turn history injection bloated prompt tokens and voice webhook payloads beyond strict latency budgets.",
      architecture:
        "I designed a hybrid retrieval pipeline combining pgvector cosine similarity with PostgreSQL full-text search fused via Reciprocal Rank Fusion (RRF). An entity-aware query rewriter was implemented to compress multi-turn context, and retrieved context chunks were pruned from 6 to 3 high-precision passages specifically for real-time Vapi voice webhooks.",
      impact: [
        "Ranked verified FAQs first (>72% term overlap) by fusing pgvector and full-text search with Reciprocal Rank Fusion.",
        "Cut synthetic prompt tokens ~60% by building an entity-aware query rewriter for multi-turn conversations.",
        "Cut Vapi voice-webhook payload 86% (18,000 to 2,500 chars) by reducing retrieved chunks from 6 to 3.",
        "Refactored 10 database tables to strict multi-tenancy, verified by a 67-test end-to-end suite (100% passing).",
      ],
    },
    flowInspector: {
      title: "Hybrid Retrieval & Real-Time Voice Shaper",
      stages: [
        {
          id: "query-rewrite",
          label: "Entity-Aware Query Rewriter",
          headline: "-60% token compression for multi-turn conversational history",
          description:
            "Extracts unresolved coreferences and customer entities from chat transcripts into a standalone search query without leaking extraneous historical tokens.",
          telemetry: {
            "Raw History": "1,420 tokens",
            "Rewritten Query": "18 tokens",
            "Token Savings": "61.3%",
            Latency: "112 ms",
          },
          codeSample: `// queryRewriter.ts
export async function rewriteInquiry(history: Message[], latest: string): Promise<string> {
  const prompt = buildDecontextualizerPrompt(history, latest);
  const rewritten = await fastLlm.generate(prompt, { maxTokens: 40 });
  return rewritten.trim();
}`,
        },
        {
          id: "rrf-fusion",
          label: "Reciprocal Rank Fusion (RRF)",
          headline: "pgvector semantic search + PostgreSQL lexical tsvector",
          description:
            "Evaluates cosine distance in 1536-dim vector space alongside PostgreSQL tsvector text search, fusing rank scores using RRF constant k=60 to elevate exact policy clauses to Rank 1.",
          telemetry: {
            "Vector Top-1": "0.81 (Rank 4)",
            "Lexical Top-1": "0.94 (Rank 1)",
            "Fused Rank": "#1 Policy FAQ",
            "Precision Boost": "+72%",
          },
          codeSample: `-- hybrid_retrieval.sql
WITH vector_matches AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $1) as r_vec
  FROM knowledge_chunks WHERE tenant_id = $2 LIMIT 10
),
fts_matches AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(fts_vector, query) DESC) as r_fts
  FROM knowledge_chunks, to_tsquery('english', $3) query WHERE tenant_id = $2 LIMIT 10
)
SELECT id, (1.0 / (60 + r_vec) + 1.0 / (60 + r_fts)) as rrf_score
FROM vector_matches FULL OUTER JOIN fts_matches USING (id) ORDER BY rrf_score DESC;`,
        },
        {
          id: "vapi-payload",
          label: "Vapi Voice Payload Shaper",
          headline: "Context pruned from 6 to 3 passages (18 kB -> 2.5 kB)",
          description:
            "Prunes low-relevance passages and formats markdown tables into concise spoken clauses to satisfy Vapi sub-second speech synthesis thresholds.",
          telemetry: {
            "Pre-Prune Size": "18,240 chars",
            "Payload Size": "2,480 chars",
            Reduction: "86.4%",
            "TTS Latency": "340 ms",
          },
          codeSample: `// vapiPayloadShaper.ts
export function shapeVoicePayload(chunks: Chunk[]): string {
  const topPassages = chunks.slice(0, 3);
  return topPassages.map(c => stripMarkdownFormatting(c.text)).join(" ");
}`,
        },
      ],
    },
  },
  {
    id: "careerpilot",
    title: "CareerPilot AI",
    subtitle: "Job Application & Verification Workspace",
    roleAndTimeline: "Core Developer",
    repoUrl: "https://github.com/Krishiv1611/careerPilot",
    stack: ["Python", "FastAPI", "React 19", "LangGraph", "PostgreSQL", "ReportLab", "Vite", "Tailwind CSS"],
    testMetric: {
      count: "445 tests",
      detail: "184 unit · 230 contract · 31 UI",
    },
    metricsSummary: [
      { label: "PDF File Size", value: "1.9 KB", note: ">99% cut vs Chromium ~240 KB" },
      { label: "Compile Time", value: "2.2 ms", note: "vs ~1,800 ms headless browser" },
      { label: "Frontend Bundle", value: "151 kB", note: "React 19 across 12 split chunks" },
      { label: "Test Coverage", value: "445 tests", note: "184 unit, 230 contract, 31 UI" },
    ],
    narrative: {
      problem:
        "Early-career applicants face noisy job boards plagued by ghost postings and scam listings, while existing resume builders rely on slow, heavy headless browsers (Chromium/Puppeteer) that produce bloated PDF payloads with unpredictable layout shifts.",
      architecture:
        "I engineered a deterministic vector-based ReportLab compiler in Python to emit compact, ATS-parsable resume PDFs in milliseconds without Chromium overhead. This was paired with a LangGraph pipeline that scores job postings 0–100 for authenticity and categorizes resume claims into 3 interview-risk tiers.",
      impact: [
        "Cut resume-PDF size >99% vs a Chromium/Puppeteer renderer (1.9 KB, 2.2 ms) with a vector-based ReportLab compiler.",
        "Scored job listings 0–100 to flag ghost and scam postings, including unpaid commission-only gigs.",
        "Sorted resume claims into 3 risk tiers to prepare candidates for interview questions.",
        "Covered 20 features with a 445-test suite (184 unit, 230 contract, 31 UI), all passing, keeping the React 19 frontend at 151 kB gzipped across 12 code-split chunks.",
      ],
    },
    flowInspector: {
      title: "Deterministic Vector Compiler & Claim Risk Auditor",
      stages: [
        {
          id: "compiler-benchmark",
          label: "Vector Compiler Benchmark",
          headline: "ReportLab vector compiler (2.2 ms / 1.9 KB) vs Chromium (1.8 s / 240 KB)",
          description:
            "Direct algorithmic compilation to vector PDF primitives eliminates headless browser overhead, memory bloat, and non-deterministic line wrapping.",
          telemetry: {
            "Compiler Latency": "2.2 ms",
            "Output Size": "1,942 bytes",
            "Chromium Baseline": "1,820 ms / 241 KB",
            "ATS Compatibility": "100% Parsable",
          },
          codeSample: `# resume_compiler.py
def compile_resume_pdf(data: ResumeModel) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=letter, leftMargin=36, rightMargin=36)
    story = [Paragraph(data.name, styles['Heading1']), *render_sections(data)]
    doc.build(story)
    return buf.getvalue()`,
        },
        {
          id: "risk-auditor",
          label: "Claim Risk & Scam Auditor",
          headline: "Authenticity scoring (0–100) & 3-tier interview claim defense",
          description:
            "LangGraph audit workflow parses job descriptions for deceptive patterns (unpaid commissions, phantom recruiter emails) and classifies resume bullet claims into Low, Medium, and High inquiry-risk tiers.",
          telemetry: {
            "Authenticity Threshold": "75/100",
            "Risk Tiers": "Verified / Elaborate / Defend",
            "Test Coverage": "445 tests",
            "Bundle Impact": "151 kB gzipped",
          },
          codeSample: `# claim_auditor.py
class ClaimRiskTier(str, Enum):
    LOW = "verified_fact"
    MEDIUM = "clarification_expected"
    HIGH = "deep_technical_defense"

def audit_claim_risk(claim: str, evidence: List[str]) -> ClaimEvaluation:
    score = score_evidence_alignment(claim, evidence)
    return ClaimEvaluation(claim=claim, risk_tier=categorize_tier(score))`,
        },
      ],
    },
  },
];

export const ARCHIVE_SYSTEMS = [
  {
    id: "agentic-ragchatbot",
    name: "agentic-RagChatbot",
    description: "Multi-step agentic retrieval workflows and grounded response synthesis with session persistence.",
    language: "Python",
    stack: ["Python", "FastAPI", "LangChain", "Vector Search"],
    url: "https://github.com/Krishiv1611/agentic-RagChatbot",
  },
  {
    id: "summarizeyou",
    name: "SummarizeYou",
    description: "YouTube RAG Chrome extension and automated transcript processing pipeline with local chat storage.",
    language: "Python",
    stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Chrome API"],
    url: "https://github.com/Krishiv1611/SummarizeYou",
  },
  {
    id: "ridemates",
    name: "RideMates",
    description: "Peer-to-peer campus ride coordination platform with JWT authentication and live Socket.io messaging.",
    language: "JavaScript",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    url: "https://github.com/Krishiv1611/RideMates",
  },
];

export const RECOGNITION_RECORD = [
  {
    title: "Technical Volunteer & Mentor",
    org: "AIML Hub, JIIT Noida",
    timeline: "Jul 2025 – May 2026",
    details:
      "Mentored 100+ students in data structures, algorithms, competitive programming, and software development. Organised technical workshops, coding events, and peer-learning sessions.",
  },
  {
    title: "NPTEL Scalable Data Science",
    org: "IIT Kharagpur",
    timeline: "Jul – Sep 2026",
    details:
      "Elite + Silver Medal, Top 1% nationally in scalable data systems and distributed computation.",
  },
  {
    title: "2nd Place — Execute 26.2",
    org: "Knuth Programming Hub, JIIT",
    timeline: "May 2026",
    details:
      "Competitive team coding contest solving advanced graph and dynamic programming challenges.",
  },
  {
    title: "Competitive Programming Foundation",
    org: "LeetCode & CodeChef",
    timeline: "Active Record",
    details:
      "500+ DSA problems solved on LeetCode (1,625 contest rating); 3-Star rating on CodeChef.",
  },
];

export const TECHNICAL_SPEC_LINE = {
  languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML/CSS"],
  frameworks: ["React 19", "Next.js", "FastAPI", "LangGraph", "Node.js", "Express.js", "Tailwind CSS"],
  dataStorage: ["PostgreSQL", "pgvector", "MongoDB", "MySQL"],
  tooling: ["Docker", "Git", "GitHub", "Vite", "ReportLab", "WebSockets"],
};

export const ABOUT_ESSAY = [
  {
    id: "computational-curiosity",
    paragraph:
      "My path into software engineering began in the algorithmic discipline of C++ and competitive programming, solving 500+ challenges across LeetCode and CodeChef. That rigorous training in asymptotic complexity and memory layout grounded my understanding of how software runs before I wrote my first line of web framework code. When I began building distributed applications, that foundation pushed me to look beyond surface-level ergonomics and focus on what happens down at the I/O layer, the network socket, and the database index.",
  },
  {
    id: "systems-discipline",
    paragraph:
      "During my summer traineeship at GlobalLogic, I saw firsthand how quickly modern AI systems crumble without strict software engineering rigor. An early prototype of the Compass developer workbench was freezing for six seconds on synchronous HTTP calls and saturating PostgreSQL connections with unbuffered event logs. By re-architecting the execution pipeline around WebSocket state streaming, introducing a bounded in-memory buffer, and splitting frontend routes, we slashed time-to-first-byte to under 250 milliseconds while cutting database write pressure by 90%. I don't treat language models as black-box magic; I treat them as asynchronous, high-latency external dependencies that require deterministic boundaries, contract validation, and high test density.",
  },
  {
    id: "measured-craft",
    paragraph:
      "Whether designing hybrid pgvector and full-text search pipelines for Synora, compiling deterministic 1.9 KB vector PDFs in milliseconds for CareerPilot AI, or mentoring over a hundred junior peers at the JIIT AIML Hub, I prioritize dependability over hype. I value typed schemas over implicit assumptions, reproducible test suites over manual verification, and compact, verifiable frontend bundles over runaway framework weight. I am an aspiring software engineer eager to join a high-caliber team where systems precision and product craft directly solve hard engineering problems.",
  },
];

export const RESUME_DATA = {
  pdfUrl: "/2401030298_Krishiv_Arora.pdf",
  backupPdfUrl: "/Krishiv-Arora-Resume.pdf",
  personal: {
    name: "Krishiv Arora",
    role: "Aspiring Software Engineer",
    headline: "Aspiring software engineer building AI systems and dependable web applications.",
    email: "krishivarora150@gmail.com",
    phone: "+91 9557187881",
    location: "New Delhi, India",
    github: "https://github.com/Krishiv1611",
    linkedin: "https://linkedin.com/in/krishivarora25",
    leetcode: "https://leetcode.com/u/krishivarora25/",
    codechef: "https://www.codechef.com/users/krishivarora25",
  },
  education: [
    {
      institution: "Jaypee Institute of Information Technology (JIIT)",
      location: "Noida, India",
      degree: "B.Tech in Computer Science & Engineering",
      timeline: "2024 – 2028",
      cgpa: "7.44 / 10",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Scalable Data Science",
      ],
    },
  ],
  experience: [
    {
      role: "Summer Trainee, Software Engineering",
      company: "GlobalLogic, a Hitachi Group company",
      location: "Noida, India",
      timeline: "Jun 2026 – Jul 2026",
      bullets: [
        "Engineered Compass, a repository-aware developer workbench integrating LangGraph for Ask, Edit, and Plan execution modes.",
        "Re-architected synchronous execution into WebSocket state streaming, cutting time-to-first-byte ~85% (from ~6.5 s to <250 ms).",
        "Implemented a bounded in-memory event buffer that batches high-frequency run events, reducing database write load by ~90%.",
        "Applied route-level code splitting across Ask, Edit, and Plan workbenches, maintaining the base client bundle at 363 kB.",
        "Maintained 436 automated unit and contract tests with a 100% pass rate.",
      ],
    },
    {
      role: "Technical Volunteer & Mentor",
      company: "AIML Hub, JIIT Noida",
      location: "Noida, India",
      timeline: "Jul 2025 – May 2026",
      bullets: [
        "Mentored 100+ students in data structures, algorithms, competitive programming, and web development fundamentals.",
        "Organized coding competitions, workshops, and peer review sessions across the campus developer community.",
      ],
    },
  ],
  projects: [
    {
      name: "Compass",
      role: "Summer Trainee Project · GlobalLogic",
      timeline: "Jun 2026 – Jul 2026",
      tech: "Python, FastAPI, React, TypeScript, LangGraph, PostgreSQL",
      highlights: [
        "Repository-aware developer workbench streaming token & node deltas over WebSockets (<250 ms TTFB).",
        "Bounded in-memory ring buffer saving ~90% database write I/O.",
        "436 automated tests, 100% pass rate; 363 kB base bundle.",
      ],
    },
    {
      name: "Synora",
      role: "System Architect & Engineer",
      timeline: "Personal Project",
      tech: "Next.js, TypeScript, PostgreSQL, pgvector, Tailwind CSS",
      highlights: [
        "Multi-tenant customer support and real-time voice RAG platform.",
        "Hybrid retrieval combining pgvector and full-text search with Reciprocal Rank Fusion (>72% Top-1 overlap).",
        "Entity-aware query rewriter compressing prompt tokens ~60%; Vapi voice payload pruned 86% (18k to 2.5k chars).",
        "Strict multi-tenancy refactor across 10 tables, validated by a 67-test E2E suite.",
      ],
    },
    {
      name: "CareerPilot AI",
      role: "Core Developer",
      timeline: "Personal Project",
      tech: "Python, FastAPI, React 19, LangGraph, PostgreSQL, ReportLab, Vite",
      highlights: [
        "Deterministic vector ReportLab compiler generating 1.9 KB ATS resumes in 2.2 ms (>99% size reduction vs Chromium).",
        "Authenticity scoring model (0–100) flagging ghost job postings and classifying resume claims into 3 risk tiers.",
        "445 automated tests (184 unit, 230 contract, 31 UI); 151 kB React 19 gzipped client bundle.",
      ],
    },
    {
      name: "agentic-RagChatbot",
      role: "Developer",
      timeline: "Personal Project",
      tech: "Python, FastAPI, LangChain, Vector Search",
      highlights: [
        "Multi-step agentic retrieval workflows with grounded response synthesis and session persistence.",
      ],
    },
    {
      name: "SummarizeYou",
      role: "Developer",
      timeline: "Personal Project",
      tech: "Python, FastAPI, LangChain, ChromaDB, Chrome Extension APIs",
      highlights: [
        "YouTube RAG Chrome extension with automated transcript processing pipeline and local chat persistence.",
      ],
    },
    {
      name: "RideMates",
      role: "Developer",
      timeline: "Personal Project",
      tech: "React, Node.js, Express.js, MongoDB, Socket.io, JWT",
      highlights: [
        "Peer-to-peer campus ride coordination platform with JWT authentication and live Socket.io messaging.",
      ],
    },
  ],
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML/CSS"],
    frameworks: ["React 19", "Next.js", "FastAPI", "LangGraph", "Node.js", "Express.js", "Tailwind CSS"],
    databases: ["PostgreSQL", "pgvector", "MongoDB", "MySQL"],
    tools: ["Docker", "Git", "GitHub", "Vite", "ReportLab", "WebSockets"],
  },
  honors: [
    {
      title: "NPTEL Scalable Data Science — Elite + Silver Medal",
      issuer: "IIT Kharagpur",
      timeline: "Jul – Sep 2026",
      detail: "Ranked in Top 1% nationally in scalable data systems and distributed computation.",
    },
    {
      title: "2nd Place — Execute 26.2",
      issuer: "Knuth Programming Hub, JIIT",
      timeline: "May 2026",
      detail: "Team competitive coding contest solving complex graph and DP problems.",
    },
    {
      title: "Competitive Programming Foundation",
      issuer: "LeetCode & CodeChef",
      timeline: "Active Record",
      detail: "500+ problems solved on LeetCode (1,625 rating); 3-Star on CodeChef.",
    },
  ],
};
