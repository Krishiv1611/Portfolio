import { NextResponse } from "next/server";
import { pinnedRepoOrder } from "@/lib/github-projects";
import type { GitHubRepo } from "@/lib/types";

type RawGitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  private: boolean;
  visibility?: string;
  archived: boolean;
};

export const revalidate = 3600;

async function getPinnedRepoRank(shouldRefresh: boolean) {
  try {
    const response = await fetch("https://github.com/Krishiv1611", {
      headers: {
        "User-Agent": "Krishiv portfolio"
      },
      ...(shouldRefresh ? { cache: "no-store" as const } : { next: { revalidate: 3600 } })
    });

    if (!response.ok) {
      throw new Error(`GitHub profile responded with ${response.status}`);
    }

    const html = await response.text();
    const listStart = html.indexOf("js-pinned-items-reorder-list");
    const listEnd = html.indexOf("</ol>", listStart);
    const pinnedList = listStart >= 0 && listEnd >= 0 ? html.slice(listStart, listEnd) : "";
    const names = [...pinnedList.matchAll(/href="\/Krishiv1611\/([^"]+)"/g)].map((match) =>
      match[1].toLowerCase()
    );
    const uniqueNames = Array.from(new Set(names));

    if (uniqueNames.length > 0) {
      return new Map(uniqueNames.map((repoName, index) => [repoName, index]));
    }
  } catch {
    // Keep the portfolio stable if GitHub profile HTML changes or rate-limits.
  }

  return new Map(pinnedRepoOrder.map((repoName, index) => [repoName.toLowerCase(), index]));
}

export async function GET(request: Request) {
  try {
    const shouldRefresh = new URL(request.url).searchParams.has("refresh");
    const pinnedRepoRank = await getPinnedRepoRank(shouldRefresh);
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      "https://api.github.com/users/Krishiv1611/repos?per_page=100&sort=updated&type=owner",
      {
        headers,
        ...(shouldRefresh ? { cache: "no-store" as const } : { next: { revalidate: 3600 } })
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const rawRepos = (await response.json()) as RawGitHubRepo[];
    const repos: GitHubRepo[] = rawRepos
      .filter((repo) => !repo.private && !repo.fork && !repo.archived && (repo.visibility ?? "public") === "public")
      .filter((repo) => pinnedRepoRank.has(repo.name.toLowerCase()))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? "",
        htmlUrl: repo.html_url,
        homepage: repo.homepage?.trim() || null,
        language: repo.language,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        featured: true
      }))
      .sort((a, b) => {
        const aRank = pinnedRepoRank.get(a.name.toLowerCase());
        const bRank = pinnedRepoRank.get(b.name.toLowerCase());

        if (aRank !== undefined && bRank !== undefined) {
          return aRank - bRank;
        }

        if (aRank !== undefined) {
          return -1;
        }

        if (bRank !== undefined) {
          return 1;
        }

        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      });

    return NextResponse.json(
      { repos },
      shouldRefresh ? { headers: { "Cache-Control": "no-store" } } : undefined
    );
  } catch (error) {
    return NextResponse.json(
      {
        repos: [],
        message: error instanceof Error ? error.message : "Unable to fetch GitHub repositories."
      },
      { status: 502 }
    );
  }
}
