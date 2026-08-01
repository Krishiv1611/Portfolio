import {
  Blocks,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Mail,
  Server,
  Terminal,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Krishiv Arora",
  title: "Aspiring Full-Stack & AI Engineer",
  email: "krishivarora150@gmail.com",
  phone: "+91-9557187881",
  location: "New Delhi, India",
  githubUsername: "Krishiv1611",
  leetcodeUsername: "krishivarora25",
  codechefUsername: "krishivarora25",
  links: {
    github: "https://github.com/Krishiv1611",
    linkedin: "https://www.linkedin.com/in/krishivarora25",
    leetcode: "https://leetcode.com/u/krishivarora25/",
    codechef: "https://www.codechef.com/users/krishivarora25",
    email: "mailto:krishivarora150@gmail.com",
    resume: "/Krishiv-Arora-Resume.pdf"
  },
  summary:
    "Third-year B.Tech Computer Science student at JIIT, currently training at GlobalLogic and building full-stack and applied AI systems.",
  availability: "Open to software engineering internships, applied AI product teams, and roles where I can grow across the stack."
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks = [
  { label: "GitHub", href: profile.links.github, icon: Code2 },
  { label: "LinkedIn", href: profile.links.linkedin, icon: BriefcaseBusiness },
  { label: "Email", href: profile.links.email, icon: Mail }
];

export const proofPoints = [
  { value: "500+", label: "LeetCode problems", note: "Resume-verified achievement" },
  { value: "3 Star", label: "CodeChef", note: "Competitive programming" },
  { value: "2nd", label: "Execute 26.2", note: "Knuth Programming Hub" },
  { value: "100+", label: "Students mentored", note: "DSA and development" }
];

export const interests = [
  "Agentic AI",
  "Retrieval systems",
  "Backend architecture",
  "Developer tools",
  "Realtime products",
  "Product engineering"
];

export const skillPathways = [
  {
    id: "ai",
    label: "AI systems",
    icon: BrainCircuit,
    color: "#f5f5f7",
    summary:
      "Agent orchestration, retrieval, embeddings, evaluation, and LLM workflows designed as product systems.",
    nodes: ["Python", "LangChain", "LangGraph", "RAG", "Gemini", "ChromaDB", "pgvector"]
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#c8c8ce",
    summary:
      "Typed APIs, authentication, data models, realtime events, persistence, and containerized services.",
    nodes: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Socket.io", "Docker"]
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Blocks,
    color: "#98989f",
    summary:
      "Responsive product interfaces with clear interaction states, accessible controls, and measured motion.",
    nodes: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Vite"]
  },
  {
    id: "foundations",
    label: "Foundations",
    icon: Terminal,
    color: "#68686f",
    summary:
      "Core computer science and engineering practices that keep systems understandable and maintainable.",
    nodes: ["C++", "SQL", "DSA", "OOP", "DBMS", "Computer Networks", "Git"]
  }
] as const;

export const techCategories = [
  { title: "Languages", icon: Code2, items: ["Python", "C++", "TypeScript", "JavaScript", "SQL"] },
  { title: "AI engineering", icon: Bot, items: ["LangChain", "LangGraph", "RAG", "Gemini", "ChromaDB", "pgvector"] },
  { title: "Product stack", icon: Workflow, items: ["React", "Next.js", "FastAPI", "Node.js", "Express.js", "Tailwind CSS"] },
  { title: "Data and delivery", icon: Database, items: ["PostgreSQL", "MongoDB", "MySQL", "Docker", "Git", "Vercel"] }
];

export const experience = [
  {
    role: "Summer Trainee - Software Engineering",
    company: "GlobalLogic, a Hitachi Group company",
    location: "India",
    duration: "Jun 2026 - Present",
    bullets: [
      "Developing Compass as an individual project under an assigned mentor to reduce context switching across repository exploration, code changes, debugging, and review.",
      "Implemented LangGraph workflows and repository-aware retrieval for Ask, Edit, and Plan modes with relevant code context and reviewable patches.",
      "Built a FastAPI and React workbench with JWT authentication, PostgreSQL persistence, isolated workspaces, and approval controls for code changes."
    ]
  },
  {
    role: "Technical Volunteer & Mentor",
    company: "AIML Hub, JIIT Noida",
    location: "Noida, India",
    duration: "Jul 2025 - May 2026",
    bullets: [
      "Mentored 100+ students in data structures, algorithms, competitive programming, and software development.",
      "Organized technical workshops, coding events, and peer-learning sessions for student developers."
    ]
  }
];

export const pinnedProjectDetails: Record<
  string,
  { kicker: string; description: string; impact: string; stack: string[]; icon: typeof Bot }
> = {
  compass: {
    kicker: "AI developer workbench",
    description: "A repository-aware workbench for asking questions, planning changes, editing code, debugging, and review.",
    impact: "Built LangGraph Ask, Edit, and Plan workflows with reviewable patches, a FastAPI and React workbench, JWT authentication, PostgreSQL persistence, isolated workspaces, and approval controls.",
    stack: ["Python", "FastAPI", "React", "LangGraph", "PostgreSQL"],
    icon: Workflow
  },
  synora: {
    kicker: "Omnichannel AI platform",
    description: "An enterprise platform for creating text, voice, and phone-based AI support agents grounded in business knowledge.",
    impact: "Implemented knowledge ingestion for text, Markdown, and URLs, then integrated Vapi webhooks for transcripts, recordings, summaries, and conversation metrics.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Vapi", "Tailwind CSS"],
    icon: Bot
  },
  careerpilot: {
    kicker: "Multi-agent career platform",
    description: "Resume parsing, ATS analysis, semantic job matching, and application workflows coordinated by specialized agents.",
    impact: "Orchestrated parsing, job matching, skill-gap analysis, and roadmap generation with LangGraph, semantic search, live job listings, JWT auth, and PostgreSQL.",
    stack: ["Python", "FastAPI", "React", "LangGraph", "PostgreSQL"],
    icon: BrainCircuit
  },
  ridemates: {
    kicker: "Realtime ride sharing",
    description: "A full-stack ride-sharing product connecting drivers and passengers through booking and live communication flows.",
    impact: "Implemented JWT and Google auth, ride creation and booking, request management, dashboards, and Socket.io chat.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    icon: Workflow
  },
  summarizeyou: {
    kicker: "YouTube RAG extension",
    description: "A Chrome extension that summarizes and answers questions about YouTube videos from their transcripts.",
    impact: "Built multilingual transcript retrieval, LangChain and ChromaDB search, Groq inference, and persistent local chat history.",
    stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Groq", "Chrome APIs"],
    icon: Bot
  },
  "agentic-ragchatbot": {
    kicker: "Agentic retrieval system",
    description: "A modular RAG chatbot with a separate FastAPI backend and session-aware frontend.",
    impact: "Structured a retrieve-evaluate-generate pipeline with vector storage, tool-ready agents, and persistent conversation context.",
    stack: ["Python", "FastAPI", "RAG", "Vector search", "Agent orchestration"],
    icon: BrainCircuit
  },
  virtualassistant: {
    kicker: "JavaScript assistant",
    description: "A public JavaScript assistant project from Krishiv's pinned GitHub work.",
    impact: "Explore the repository for the latest implementation details and source history.",
    stack: ["JavaScript"],
    icon: Code2
  }
};

export const resumeHighlights = [
  {
    title: "Education",
    body: "B.Tech in Computer Science Engineering at Jaypee Institute of Information Technology, Noida.",
    meta: "CGPA 7.44 / 10"
  },
  {
    title: "Current work",
    body: "GlobalLogic summer trainee building Compass with repository-aware Ask, Edit, and Plan workflows, reviewable patches, isolated workspaces, and approval controls.",
    meta: "Jun 2026 - Present"
  },
  {
    title: "Coding achievement",
    body: "Secured second place in Execute 26.2, a team coding contest organized by Knuth Programming Hub, JIIT.",
    meta: "May 2026"
  },
  {
    title: "Competitive programming",
    body: "Solved 500+ data structures and algorithms problems on LeetCode and achieved a 3-star CodeChef rating.",
    meta: "Resume verified"
  }
];


