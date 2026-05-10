import {
  Blocks,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Mail,
  Server,
  Sparkles,
  Terminal,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Krishiv Arora",
  title: "AI Engineer / Full Stack Developer",
  email: "krishivarora150@gmail.com",
  phone: "+91-9557187881",
  githubUsername: "Krishiv1611",
  leetcodeUsername: "krishivarora25",
  codechefUsername: "krishivarora25",
  links: {
    github: "https://github.com/Krishiv1611",
    linkedin: "https://linkedin.com/in/krishivarora25",
    leetcode: "https://leetcode.com/u/krishivarora25/",
    codechef: "https://www.codechef.com/users/krishivarora25",
    email: "mailto:krishivarora150@gmail.com",
    resume: "/Krishiv-resume.pdf"
  },
  summary:
    "Computer Science engineering student at JIIT building AI-native products across RAG, autonomous agents, backend systems, and polished full-stack experiences.",
  taglines: [
    "Building autonomous AI products that feel useful.",
    "Engineering RAG, agents, and production web systems.",
    "Turning complex workflows into fast, elegant software."
  ]
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks = [
  { label: "GitHub", href: profile.links.github, icon: Code2 },
  { label: "LinkedIn", href: profile.links.linkedin, icon: BriefcaseBusiness },
  { label: "Email", href: profile.links.email, icon: Mail }
];

export const highlights = [
  { label: "LeetCode Problems", value: "400+", detail: "Data structures and algorithms" },
  { label: "CodeChef Rating", value: "3 Star", detail: "Competitive programming" },
  { label: "Featured Products", value: "3", detail: "AI and full-stack systems" },
  { label: "Education", value: "JIIT", detail: "B.Tech CSE, 2024-2028" }
];

export const interests = [
  "AI Agents",
  "Generative AI",
  "RAG Systems",
  "Backend Architecture",
  "Realtime Apps",
  "Product Engineering"
];

export const skillTags = [
  "TypeScript",
  "JavaScript",
  "Python",
  "C++",
  "Next.js",
  "React",
  "FastAPI",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "LangChain",
  "LangGraph",
  "PostgreSQL",
  "MongoDB",
  "Docker"
];

export const skillPathways = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Blocks,
    color: "#67e8f9",
    summary:
      "I use this path to build responsive, high-polish interfaces with strong interaction design and production ergonomics.",
    nodes: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"]
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#a7f3d0",
    summary:
      "This stack powers APIs, auth, realtime workflows, persistence, and deployable services that can scale past demos.",
    nodes: ["Node.js", "Express.js", "FastAPI", "PostgreSQL", "MongoDB", "Docker"]
  },
  {
    id: "ai",
    label: "AI / GenAI",
    icon: BrainCircuit,
    color: "#c4b5fd",
    summary:
      "I combine retrieval, agents, embeddings, voice, and LLM orchestration to ship AI workflows with product value.",
    nodes: ["Python", "LangChain", "LangGraph", "RAG", "Gemini", "Vapi", "pgvector"]
  },
  {
    id: "systems",
    label: "Systems / Tools",
    icon: Terminal,
    color: "#fbbf24",
    summary:
      "This pathway keeps products shippable: version control, containers, cloud data, deployment, and clean API contracts.",
    nodes: ["Git", "Docker", "Neon/PostgreSQL", "Vercel", "API Design"]
  }
] as const;

export const techCategories = [
  {
    title: "Languages",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "Python", "C++"]
  },
  {
    title: "Frameworks",
    icon: Workflow,
    items: ["Next.js", "React.js", "FastAPI", "Node.js", "Express.js", "Tailwind CSS"]
  },
  {
    title: "AI Stack",
    icon: Bot,
    items: ["LangChain", "LangGraph", "Gemini", "RAG", "Vapi", "pgvector"]
  },
  {
    title: "Data & Tools",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "Docker", "Git", "Neon"]
  }
];

export const featuredProjects = [
  {
    name: "Synora",
    href: "https://github.com/Krishiv1611/Synora",
    demo: "https://synora-dev.vercel.app/",
    stack: ["Next.js", "PostgreSQL", "Gemini 2.5 Flash", "LangChain", "Vapi", "Docker"],
    description:
      "Autonomous B2B omnichannel AI platform for RAG-powered text and voice customer support agents.",
    impact:
      "Built multi-format ingestion, pgvector similarity search, team management, analytics, and webhook-driven summaries.",
    icon: Sparkles
  },
  {
    name: "Career Pilot AI",
    href: "https://github.com/Krishiv1611/careerPilot",
    demo: "https://career-pilot-frontend.vercel.app/",
    stack: ["FastAPI", "React", "LangGraph", "LLMs", "Docker"],
    description:
      "Multi-agent career assistant that analyzes resumes, scores candidate profiles, and recommends targeted jobs.",
    impact:
      "Engineered RAG-based semantic matching, resume rewriting workflows, ranking logic, and modular agent orchestration.",
    icon: BrainCircuit
  },
  {
    name: "RideMates",
    href: "https://github.com/Krishiv1611/RideMates",
    demo: "",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    description:
      "Full-stack ride-sharing app with dynamic ride creation, matching, live chat, and secure dashboards.",
    impact:
      "Implemented realtime communication, JWT auth, seat management, and responsive cross-device interfaces.",
    icon: Server
  }
];

export const resumeHighlights = [
  {
    title: "Education",
    body: "B.Tech in Computer Science Engineering, Jaypee Institute of Information Technology, Noida.",
    meta: "2024-2028"
  },
  {
    title: "Technical Volunteer",
    body: "AI/ML Hub, JIIT. Assisted workshops, mentored juniors, and helped organize coding sessions.",
    meta: "2025-Present"
  },
  {
    title: "Core Strengths",
    body: "AI agents, RAG systems, backend architecture, realtime applications, and modern frontend systems.",
    meta: "AI + Full Stack"
  }
];
