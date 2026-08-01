import { NextResponse } from "next/server";
import type { LeetCodeStats } from "@/lib/types";

type ProgressItem = { difficulty: string; count: number };
type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      username: string;
      profile?: { ranking?: number | null };
      submissionCalendar?: string;
      submitStatsGlobal?: { acSubmissionNum?: ProgressItem[] };
    };
    userContestRanking?: {
      rating?: number | null;
      globalRanking?: number | null;
      attendedContestsCount?: number | null;
    };
  };
};

const USERNAME = "krishivarora25";
export const revalidate = 1800;

export async function GET(request: Request) {
  try {
    const shouldRefresh = new URL(request.url).searchParams.has("refresh");
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${USERNAME}/`
      },
      body: JSON.stringify({
        variables: { username: USERNAME },
        query: `
          query portfolioStats($username: String!) {
            matchedUser(username: $username) {
              username
              profile { ranking }
              submissionCalendar
              submitStatsGlobal { acSubmissionNum { difficulty count } }
            }
            userContestRanking(username: $username) {
              rating
              globalRanking
              attendedContestsCount
            }
          }
        `
      }),
      ...(shouldRefresh ? { cache: "no-store" as const } : { next: { revalidate: 1800 } })
    });

    if (!response.ok) throw new Error(`LeetCode responded with ${response.status}`);

    const payload = (await response.json()) as LeetCodeResponse;
    const user = payload.data?.matchedUser;
    if (!user) throw new Error("LeetCode profile was not found.");

    const progress = user.submitStatsGlobal?.acSubmissionNum ?? [];
    const easySolved = getCount(progress, "Easy");
    const mediumSolved = getCount(progress, "Medium");
    const hardSolved = getCount(progress, "Hard");
    const contest = payload.data?.userContestRanking;

    const stats: LeetCodeStats = {
      username: user.username,
      ranking: user.profile?.ranking ?? null,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestGlobalRanking: contest?.globalRanking ?? null,
      contestsAttended: contest?.attendedContestsCount ?? null,
      totalSolved: getCount(progress, "All") || easySolved + mediumSolved + hardSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      calendar: parseCalendar(user.submissionCalendar)
    };

    return NextResponse.json(stats, shouldRefresh ? { headers: { "Cache-Control": "no-store" } } : undefined);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to fetch LeetCode stats." },
      { status: 502 }
    );
  }
}

function getCount(progress: ProgressItem[], target: string) {
  return progress.find((entry) => entry.difficulty.toLowerCase() === target.toLowerCase())?.count ?? 0;
}

function parseCalendar(calendar?: string) {
  if (!calendar) return {};
  try {
    return JSON.parse(calendar) as Record<string, number>;
  } catch {
    return {};
  }
}
