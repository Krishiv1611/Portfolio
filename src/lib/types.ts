export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  featured?: boolean;
};

export type GitHubStats = {
  username: string;
  publicRepos: number;
  followers: number;
  publicCommits: number;
  contributionsLastYear: number;
  contributionCalendar: Record<string, number>;
  updatedAt: string;
};

export type LeetCodeStats = {
  username: string;
  ranking: number | null;
  contestRating: number | null;
  contestGlobalRanking: number | null;
  contestsAttended: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  calendar: Record<string, number>;
};
