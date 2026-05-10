import { NextResponse } from "next/server";
import type { LeetCodeStats } from "@/lib/types";

type LeetCodeProgressItem = {
  difficulty: "EASY" | "MEDIUM" | "HARD" | "Easy" | "Medium" | "Hard";
  count: number;
};

type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      username: string;
      profile?: {
        ranking?: number | null;
      };
      submissionCalendar?: string;
      submitStatsGlobal?: {
        acSubmissionNum?: Array<{
          difficulty: string;
          count: number;
        }>;
      };
    };
    userProfileUserQuestionProgressV2?: {
      numAcceptedQuestions?: LeetCodeProgressItem[];
    };
  };
  errors?: unknown[];
};

const USERNAME = "krishivarora25";

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${USERNAME}/`
      },
      body: JSON.stringify({
        operationName: "portfolioLeetCodeStats",
        variables: {
          username: USERNAME,
          userSlug: USERNAME
        },
        query: `
          query portfolioLeetCodeStats($username: String!, $userSlug: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submissionCalendar
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userProfileUserQuestionProgressV2(userSlug: $userSlug) {
              numAcceptedQuestions {
                count
                difficulty
              }
            }
          }
        `
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`LeetCode responded with ${response.status}`);
    }

    const payload = (await response.json()) as LeetCodeResponse;
    const user = payload.data?.matchedUser;

    if (!user) {
      throw new Error("LeetCode profile was not found.");
    }

    const progress =
      payload.data?.userProfileUserQuestionProgressV2?.numAcceptedQuestions ??
      user.submitStatsGlobal?.acSubmissionNum ??
      [];

    const easySolved = getCount(progress, "Easy");
    const mediumSolved = getCount(progress, "Medium");
    const hardSolved = getCount(progress, "Hard");
    const totalSolved = getCount(progress, "All") || easySolved + mediumSolved + hardSolved;
    const calendar = parseCalendar(user.submissionCalendar);

    const stats: LeetCodeStats = {
      username: user.username,
      ranking: user.profile?.ranking ?? null,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      calendar
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        username: USERNAME,
        ranking: null,
        totalSolved: 400,
        easySolved: 160,
        mediumSolved: 200,
        hardSolved: 40,
        calendar: {},
        message: error instanceof Error ? error.message : "Unable to fetch LeetCode stats."
      },
      { status: 502 }
    );
  }
}

function getCount(progress: Array<{ difficulty: string; count: number }>, target: string) {
  const item = progress.find((entry) => entry.difficulty.toLowerCase() === target.toLowerCase());
  return item?.count ?? 0;
}

function parseCalendar(calendar?: string) {
  if (!calendar) {
    return {};
  }

  try {
    const parsed = JSON.parse(calendar) as Record<string, number>;
    return parsed;
  } catch {
    return {};
  }
}
