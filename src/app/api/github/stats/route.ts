import { NextResponse } from "next/server";
import type { GitHubStats } from "@/lib/types";

const USERNAME = "Krishiv1611";
export const revalidate = 1800;

export async function GET(request: Request) {
  try {
    const shouldRefresh = new URL(request.url).searchParams.has("refresh");
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Krishiv-portfolio"
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const cacheOptions = shouldRefresh
      ? ({ cache: "no-store" as const } as const)
      : ({ next: { revalidate: 1800 } } as const);

    const [profileResponse, commitsResponse, contributionsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, ...cacheOptions }),
      fetch(`https://api.github.com/search/commits?q=author%3A${USERNAME}&per_page=1`, {
        headers,
        ...cacheOptions
      }),
      fetch(
        `https://github.com/${USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${USERNAME}`,
        {
          headers: { "User-Agent": "Krishiv-portfolio", "X-Requested-With": "XMLHttpRequest" },
          ...cacheOptions
        }
      )
    ]);

    if (!profileResponse.ok || !commitsResponse.ok || !contributionsResponse.ok) {
      throw new Error("GitHub activity is temporarily unavailable.");
    }

    const profile = (await profileResponse.json()) as { public_repos: number; followers: number };
    const commits = (await commitsResponse.json()) as { total_count: number };
    const contributionsHtml = await contributionsResponse.text();
    const plainText = contributionsHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const totalMatch = plainText.match(/([\d,]+) contributions? in the last year/i);

    const stats: GitHubStats = {
      username: USERNAME,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      publicCommits: commits.total_count,
      contributionsLastYear: totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : 0,
      contributionCalendar: parseContributionCalendar(contributionsHtml),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(stats, shouldRefresh ? { headers: { "Cache-Control": "no-store" } } : undefined);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to fetch GitHub activity." },
      { status: 502 }
    );
  }
}

function parseContributionCalendar(html: string) {
  const calendar: Record<string, number> = {};
  const cells = html.matchAll(/<[^>]+data-date="([^"]+)"[^>]*data-level="(\d+)"[^>]*>/g);
  for (const cell of cells) calendar[cell[1]] = Number(cell[2]);

  if (Object.keys(calendar).length === 0) {
    const reversedCells = html.matchAll(/<[^>]+data-level="(\d+)"[^>]*data-date="([^"]+)"[^>]*>/g);
    for (const cell of reversedCells) calendar[cell[2]] = Number(cell[1]);
  }

  return calendar;
}
