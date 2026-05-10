export const pinnedRepoOrder = [
  "Synora",
  "careerPilot",
  "RideMates",
  "SummarizeYou",
  "agentic-RagChatbot",
  "virtualAssistant"
] as const;

export const pinnedRepoRank = new Map(
  pinnedRepoOrder.map((repoName, index) => [repoName.toLowerCase(), index])
);

export const pinnedRepoFallbacks = [
  {
    id: 1158004326,
    name: "Synora",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/Synora",
    homepage: "https://synora-dev.vercel.app/",
    language: "TypeScript",
    topics: [],
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-10T00:00:00Z",
    featured: true
  },
  {
    id: 1101130591,
    name: "careerPilot",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/careerPilot",
    homepage: "https://career-pilot-frontend.vercel.app/",
    language: "Jupyter Notebook",
    topics: [],
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-10T00:00:00Z",
    featured: true
  },
  {
    id: 1015975112,
    name: "RideMates",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/RideMates",
    homepage: null,
    language: "JavaScript",
    topics: [],
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-10T00:00:00Z",
    featured: true
  },
  {
    id: 1064685897,
    name: "SummarizeYou",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/SummarizeYou",
    homepage: null,
    language: "Python",
    topics: [],
    stars: 0,
    forks: 0,
    updatedAt: "2025-11-28T07:46:25Z",
    featured: true
  },
  {
    id: 1079783774,
    name: "agentic-RagChatbot",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/agentic-RagChatbot",
    homepage: null,
    language: "Python",
    topics: [],
    stars: 0,
    forks: 0,
    updatedAt: "2025-11-09T18:32:34Z",
    featured: true
  },
  {
    id: 1079563262,
    name: "virtualAssistant",
    description: "",
    htmlUrl: "https://github.com/Krishiv1611/virtualAssistant",
    homepage: null,
    language: "JavaScript",
    topics: [],
    stars: 1,
    forks: 0,
    updatedAt: "2025-11-09T14:21:48Z",
    featured: true
  }
];
