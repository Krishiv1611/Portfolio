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

export type LeetCodeStats = {
  username: string;
  ranking: number | null;
  contestRating: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  calendar: Record<string, number>;
};
