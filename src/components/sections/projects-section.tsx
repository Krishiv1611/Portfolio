"use client";

import { animate, set, stagger } from "animejs";
import { ArrowUpRight, Code2, ExternalLink, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { pinnedProjectDetails, profile } from "@/lib/profile";
import type { GitHubRepo } from "@/lib/types";

const AUTO_REFRESH_MS = 15 * 60 * 1000;
const compassModes = [
  { label: "Ask", detail: "Repository context" },
  { label: "Edit", detail: "Reviewable patches" },
  { label: "Plan", detail: "Change strategy" }
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const loadRepos = useCallback(async (refresh = false, silent = false) => {
    if (!silent) setSyncing(true);
    setError("");

    try {
      const response = await fetch(`/api/github/repos${refresh ? "?refresh=1" : ""}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error("GitHub API request failed");
      const data = (await response.json()) as { repos: GitHubRepo[] };
      setRepos(data.repos);
      setLastSynced(new Date());
    } catch {
      setError("GitHub is unavailable right now. No project data has been substituted.");
    } finally {
      setLoading(false);
      if (!silent) setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => loadRepos());
    const interval = window.setInterval(() => void loadRepos(true, true), AUTO_REFRESH_MS);
    return () => window.clearInterval(interval);
  }, [loadRepos]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || repos.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spotlight = Array.from(root.querySelectorAll<HTMLElement>(".project-card"));
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".project-row"));
    const trigger = root.querySelector<HTMLElement>(".featured-project-grid");
    if (!trigger) return;

    set(spotlight, { opacity: 0, translateY: 30 });
    set(rows, { opacity: 0, translateX: -16 });

    let spotlightAnimation: ReturnType<typeof animate> | null = null;
    let rowAnimation: ReturnType<typeof animate> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        spotlightAnimation = animate(spotlight, {
          opacity: 1,
          translateY: 0,
          duration: 760,
          ease: "outExpo"
        });
        rowAnimation = animate(rows, {
          opacity: 1,
          translateX: 0,
          delay: stagger(45),
          duration: 620,
          ease: "outExpo"
        });
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.01 }
    );

    observer.observe(trigger);
    return () => {
      observer.disconnect();
      spotlightAnimation?.revert();
      rowAnimation?.revert();
    };
  }, [repos.length]);

  useEffect(() => {
    if (repos.length === 0) return;

    const targetId = window.location.hash.slice(1);
    const sectionsAfterProjects = new Set(["skills", "activity", "leetcode", "resume", "contact"]);
    if (!sectionsAfterProjects.has(targetId)) return;

    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (target) window.scrollTo(0, Math.max(target.offsetTop - 68, 0));
      });
    });

    return () => {
      window.cancelAnimationFrame(outerFrame);
      if (innerFrame) window.cancelAnimationFrame(innerFrame);
    };
  }, [repos.length]);

  const featured = repos.slice(0, 1);
  const other = repos.slice(1);

  return (
    <section ref={sectionRef} id="projects" className="section-band bg-[#070708] py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="03 / Selected work" title="Public projects, ranked by what I pin.">
          GitHub remains the source of truth. Only public pinned repositories are shown, in profile order, with a fresh check every 15 minutes.
        </SectionHeading>

        <div className="mb-8 flex flex-col gap-4 border-y border-white/12 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase text-white/34">
            {lastSynced
              ? `Synced ${lastSynced.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "Connecting to GitHub"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="pressable focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-xs font-medium text-white/58 hover:bg-white/[0.05] hover:text-white"
            >
              GitHub profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => void loadRepos(true)}
              disabled={syncing}
              className="pressable focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-white/14 px-3 text-xs font-medium text-white/68 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing" : "Sync pins"}
            </button>
          </div>
        </div>

        {loading ? <ProjectsSkeleton /> : null}

        {!loading && repos.length > 0 ? (
          <>
            <div className="featured-project-grid">
              {featured.map((repo, index) => (
                <FeaturedProject key={repo.id} repo={repo} index={index} />
              ))}
            </div>

            {other.length > 0 ? (
              <div className="mt-14">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white/70">Other pinned work</h3>
                  <span className="font-mono text-[10px] uppercase text-white/28">{other.length} repositories</span>
                </div>
                <div className="other-project-list border-t border-white/12">
                  {other.map((repo, index) => (
                    <OtherProject key={repo.id} repo={repo} index={index + featured.length} />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        {!loading && repos.length === 0 ? (
          <div className="border-y border-white/12 py-8 text-white/48">
            <p className="font-medium text-white/76">No live pinned projects loaded.</p>
            <p className="mt-2 text-sm">Open the GitHub profile or retry the sync to see the current public pins.</p>
          </div>
        ) : null}

        {error ? <p className="mt-5 text-sm text-coral">{error}</p> : null}
      </div>
    </section>
  );
}

function FeaturedProject({ repo, index }: { repo: GitHubRepo; index: number }) {
  const detail = pinnedProjectDetails[repo.name.toLowerCase()];
  const Icon = detail?.icon ?? Code2;
  const isCompass = repo.name.toLowerCase() === "compass";

  return (
    <article className="project-card grid overflow-hidden rounded-lg border border-white/12 bg-[#0c0c0e] lg:grid-cols-[0.42fr_0.58fr]">
      <div className="flex min-h-[360px] flex-col justify-between border-b border-white/10 bg-[#101012] p-6 lg:border-b-0 lg:border-r md:p-8">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-white/42">
            <Icon className="h-4 w-4" />
            Pinned 0{index + 1}
          </span>
          <span className="font-mono text-[10px] uppercase text-white/28">Public</span>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase text-white/30">{detail?.kicker ?? repo.language ?? "Repository"}</p>
          <p className="mt-4 text-5xl font-semibold text-white md:text-6xl">{repo.name}</p>
        </div>

        <div className="grid border-l border-t border-white/10 sm:grid-cols-3">
          {(isCompass ? compassModes : (detail?.stack ?? []).slice(0, 3).map((item) => ({ label: item, detail: "Core technology" }))).map((item) => (
            <div key={item.label} className="border-b border-r border-white/10 p-4">
              <p className="font-mono text-xs text-white/72">{item.label}</p>
              <p className="mt-1.5 text-[10px] leading-4 text-white/30">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-8 lg:p-10">
        <p className="font-mono text-[10px] uppercase text-white/30">Flagship public project</p>
        <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
          {detail?.description || repo.description || "Public pinned repository."}
        </h3>
        {detail?.impact ? <p className="mt-5 max-w-2xl text-sm leading-7 text-white/46">{detail.impact}</p> : null}

        <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
          {(detail?.stack ?? [repo.language ?? "Code"]).map((item) => (
            <span key={item} className="font-mono text-[10px] text-white/34">{item}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-9">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="pressable focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-black hover:bg-white/84"
          >
            <Code2 className="h-4 w-4" />
            GitHub source
          </a>
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="pressable focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-white/16 px-4 text-sm font-medium text-white/74 hover:border-white/34 hover:text-white"
            >
              Live product <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function OtherProject({ repo, index }: { repo: GitHubRepo; index: number }) {
  const detail = pinnedProjectDetails[repo.name.toLowerCase()];

  return (
    <article className="project-row grid gap-5 border-b border-white/12 py-6 transition-colors duration-200 md:grid-cols-[0.08fr_0.25fr_0.47fr_0.2fr] md:items-center md:px-3">
      <span className="font-mono text-[10px] text-white/24">0{index + 1}</span>
      <div>
        <h4 className="font-medium text-white/88">{repo.name}</h4>
        <p className="mt-1 font-mono text-[10px] uppercase text-white/30">{detail?.kicker ?? repo.language ?? "Repository"}</p>
      </div>
      <p className="text-sm leading-6 text-white/44">{detail?.description || repo.description || "Public pinned repository."}</p>
      <div className="flex items-center gap-2 md:justify-end">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/12 text-white/58 hover:border-white/30 hover:text-white"
          aria-label={`Open ${repo.name} source`}
          title="View source"
        >
          <Code2 className="h-4 w-4" />
        </a>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="pressable focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/12 text-white/58 hover:border-white/30 hover:text-white"
            aria-label={`Open ${repo.name} live product`}
            title="Open live product"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="min-h-[480px] animate-pulse rounded-lg border border-white/10 bg-white/[0.025]" aria-label="Loading public pinned repositories">
      <div className="grid h-full lg:grid-cols-[0.42fr_0.58fr]">
        <div className="min-h-[360px] border-b border-white/8 bg-white/[0.03] lg:border-b-0 lg:border-r" />
        <div className="p-8">
          <div className="h-3 w-28 rounded bg-white/[0.06]" />
          <div className="mt-6 h-8 w-3/4 rounded bg-white/[0.06]" />
          <div className="mt-5 h-3 w-full rounded bg-white/[0.045]" />
          <div className="mt-2 h-3 w-5/6 rounded bg-white/[0.045]" />
        </div>
      </div>
    </div>
  );
}
