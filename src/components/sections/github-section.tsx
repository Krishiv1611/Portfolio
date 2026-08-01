"use client";

import { CalendarDays, Code2, GitCommitHorizontal, RefreshCw, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/profile";
import type { GitHubStats } from "@/lib/types";

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  async function loadStats(refresh = false) {
    setSyncing(true);
    setError("");

    try {
      const response = await fetch(`/api/github/stats${refresh ? "?refresh=1" : ""}`, { cache: "no-store" });
      if (!response.ok) throw new Error("GitHub activity request failed");
      setStats((await response.json()) as GitHubStats);
    } catch {
      setStats(null);
      setError("Live GitHub activity is unavailable. No totals have been substituted.");
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(() => loadStats());
  }, []);

  const metrics = [
    { label: "Public commits", value: stats?.publicCommits ?? null, icon: GitCommitHorizontal },
    { label: "Year contributions", value: stats?.contributionsLastYear ?? null, icon: CalendarDays },
    { label: "Public repositories", value: stats?.publicRepos ?? null, icon: Code2 },
    { label: "Followers", value: stats?.followers ?? null, icon: Users }
  ];

  return (
    <section id="activity" className="section-band bg-ink py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="05 / Public activity" title="A live record of consistent practice.">
          GitHub numbers and calendar cells load directly from the public profile. If GitHub fails, the portfolio shows the failure instead of inventing a substitute.
        </SectionHeading>

        <div data-reveal className="grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="border-b border-r border-white/12 p-6 md:p-7">
              <metric.icon className="h-4 w-4 text-white/40" />
              <p className="mt-7 min-h-10 text-3xl font-semibold text-white md:text-4xl">
                {metric.value === null ? <span className="text-white/18">--</span> : <AnimatedCounter value={metric.value} />}
              </p>
              <p className="mt-2 text-xs text-white/38">{metric.label}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-6 border border-white/12 bg-[#0a0a0c] p-5 md:p-7">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Contribution calendar</h3>
              <p className="mt-2 text-sm text-white/38" aria-live="polite">
                {stats ? "Public activity levels across the last year." : error || "Loading GitHub activity..."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="pressable focus-ring inline-flex min-h-10 items-center rounded-md px-3 text-xs font-medium text-white/54 hover:bg-white/[0.05] hover:text-white"
              >
                @{profile.githubUsername}
              </a>
              <button
                type="button"
                onClick={() => void loadStats(true)}
                disabled={syncing}
                className="pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/14 text-white/54 hover:border-white/30 hover:text-white disabled:opacity-50"
                aria-label="Refresh GitHub activity"
                title="Refresh GitHub activity"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
          <GitHubHeatmap calendar={stats?.contributionCalendar ?? {}} />
        </div>
      </div>
    </section>
  );
}

function GitHubHeatmap({ calendar }: { calendar: Record<string, number> }) {
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 365 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (364 - index));
      const iso = date.toISOString().slice(0, 10);
      return { iso, level: calendar[iso] ?? 0 };
    });
  }, [calendar]);

  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, index) =>
    days.slice(index * 7, index * 7 + 7)
  );

  return (
    <div className="scrollbar-thin overflow-x-auto pb-2">
      <div className="flex min-w-[760px] gap-1" aria-label="GitHub contribution heatmap">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1">
            {week.map((day) => (
              <div
                key={day.iso}
                className="h-3 w-3 rounded-[2px]"
                style={{ backgroundColor: githubHeatColor(day.level) }}
                title={`${day.iso}: activity level ${day.level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function githubHeatColor(level: number) {
  if (level <= 0) return "rgba(255,255,255,0.055)";
  if (level === 1) return "#343438";
  if (level === 2) return "#66666c";
  if (level === 3) return "#a4a4aa";
  return "#eeeeef";
}
