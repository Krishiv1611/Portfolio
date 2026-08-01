"use client";

import { Award, BarChart3, ExternalLink, RefreshCw, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/profile";
import type { LeetCodeStats } from "@/lib/types";

export function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  async function loadStats(refresh = false) {
    setSyncing(true);
    setError("");

    try {
      const response = await fetch(`/api/leetcode${refresh ? "?refresh=1" : ""}`, { cache: "no-store" });
      if (!response.ok) throw new Error("LeetCode API request failed");
      setStats((await response.json()) as LeetCodeStats);
    } catch {
      setStats(null);
      setError("Live LeetCode details are unavailable. No counts or ratings have been substituted.");
    } finally {
      setSyncing(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(() => loadStats());
  }, []);

  const difficulty = [
    { label: "Easy", value: stats?.easySolved ?? null, color: "#d4d4d8" },
    { label: "Medium", value: stats?.mediumSolved ?? null, color: "#929298" },
    { label: "Hard", value: stats?.hardSolved ?? null, color: "#5f5f65" }
  ];

  return (
    <section id="leetcode" className="section-band bg-[#070708] py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="06 / Problem solving" title="Practice that compounds over time.">
          The live profile supplies difficulty counts, contest records, and submission activity. The resume independently verifies 500+ solved problems and a 3-star CodeChef rating.
        </SectionHeading>

        <div data-reveal className="border border-white/12 bg-[#0b0b0d]">
          <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
            <div className="border-b border-white/12 p-6 lg:border-b-0 lg:border-r md:p-8">
              <div className="flex items-center justify-between">
                <Trophy className="h-5 w-5 text-white/46" />
                <button
                  type="button"
                  onClick={() => void loadStats(true)}
                  disabled={syncing}
                  className="pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/14 text-white/50 hover:border-white/30 hover:text-white disabled:opacity-50"
                  aria-label="Refresh LeetCode records"
                  title="Refresh LeetCode records"
                >
                  <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                </button>
              </div>

              <p className="mt-8 font-mono text-[10px] uppercase text-white/30">Problems solved</p>
              <p className="mt-2 min-h-[72px] text-6xl font-semibold text-white">
                {stats ? <AnimatedCounter value={stats.totalSolved} /> : <span className="text-white/16">--</span>}
              </p>
              <p className="mt-2 text-xs text-white/34" aria-live="polite">
                {stats ? "Live from LeetCode" : error || "Loading public records..."}
              </p>

              <div className="mt-8 space-y-5">
                {difficulty.map((item) => {
                  const width = item.value !== null && stats?.totalSolved ? (item.value / stats.totalSolved) * 100 : 0;
                  return (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-medium text-white/66">{item.label}</span>
                        <span className="font-mono text-white/34">{item.value ?? "--"}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full transition-[width] duration-700"
                          style={{ width: `${width}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid border-l border-t border-white/10 sm:grid-cols-3">
                <Record label="Contest rating" value={stats?.contestRating?.toLocaleString() ?? "--"} icon={BarChart3} />
                <Record label="Global rank" value={stats?.ranking?.toLocaleString() ?? "--"} icon={Trophy} />
                <Record label="Contests" value={stats?.contestsAttended?.toString() ?? "--"} icon={Award} />
              </div>

              <div className="mt-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Submission calendar</h3>
                    <p className="mt-1 text-xs text-white/34">Accepted submissions from the public profile.</p>
                  </div>
                  <a
                    href={profile.links.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md text-white/46 hover:bg-white/[0.05] hover:text-white"
                    aria-label="Open LeetCode profile"
                    title="Open LeetCode profile"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <LeetCodeHeatmap calendar={stats?.calendar ?? {}} />
              </div>

              <a
                href={profile.links.codechef}
                target="_blank"
                rel="noreferrer"
                className="pressable focus-ring mt-7 flex min-h-20 items-center justify-between gap-5 border border-white/12 px-5 hover:border-white/28"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase text-white/28">CodeChef</p>
                  <p className="mt-2 font-medium text-white/78">3-star competitive programmer</p>
                  <p className="mt-1 text-xs text-white/32">Verified in the current resume</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-white/38" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Record({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Trophy }) {
  return (
    <article className="border-b border-r border-white/10 p-5">
      <Icon className="h-4 w-4 text-white/36" />
      <p className="mt-5 text-xl font-semibold text-white/84">{value}</p>
      <p className="mt-1 text-xs text-white/32">{label}</p>
    </article>
  );
}

function LeetCodeHeatmap({ calendar }: { calendar: Record<string, number> }) {
  const days = useMemo(() => {
    const byDate: Record<string, number> = {};
    for (const [timestamp, count] of Object.entries(calendar)) {
      const numeric = Number(timestamp);
      const date = Number.isFinite(numeric) ? new Date(numeric * 1000) : new Date(timestamp);
      if (!Number.isNaN(date.getTime())) byDate[date.toISOString().slice(0, 10)] = count;
    }

    const today = new Date();
    return Array.from({ length: 196 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (195 - index));
      const iso = date.toISOString().slice(0, 10);
      return { iso, count: byDate[iso] ?? 0 };
    });
  }, [calendar]);

  const max = Math.max(...days.map((day) => day.count), 1);
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, index) =>
    days.slice(index * 7, index * 7 + 7)
  );

  return (
    <div className="scrollbar-thin overflow-x-auto border border-white/10 p-4">
      <div className="flex min-w-[430px] gap-1" aria-label="LeetCode submission heatmap">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1">
            {week.map((day) => {
              const level = day.count === 0 ? 0 : Math.max(1, Math.ceil((day.count / max) * 4));
              return (
                <div
                  key={day.iso}
                  className="h-3 w-3 rounded-[2px]"
                  style={{ backgroundColor: leetCodeHeatColor(level) }}
                  title={`${day.iso}: ${day.count} submissions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function leetCodeHeatColor(level: number) {
  if (level <= 0) return "rgba(255,255,255,0.055)";
  if (level === 1) return "#36363a";
  if (level === 2) return "#69696f";
  if (level === 3) return "#a7a7ad";
  return "#eeeeef";
}
