"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, GitFork, RefreshCw, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { pinnedRepoFallbacks } from "@/lib/github-projects";
import { featuredProjects } from "@/lib/profile";
import type { GitHubRepo } from "@/lib/types";

export function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>(pinnedRepoFallbacks);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const loadRepos = useCallback((refresh = false) => {
    if (refresh) {
      setSyncing(true);
      setError("");
    }

    return fetch(`/api/github/repos${refresh ? "?refresh=1" : ""}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("GitHub API request failed");
        }
        return response.json() as Promise<{ repos: GitHubRepo[] }>;
      })
      .then((data) => {
        setRepos(data.repos);
      })
      .catch(() => {
        setError("Public repositories are temporarily unavailable.");
      })
      .finally(() => {
        setLoading(false);
        setSyncing(false);
      });
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => loadRepos());
  }, [loadRepos]);

  const dynamicRepos = useMemo(() => {
    const featuredNames = new Set(
      featuredProjects.flatMap((project) => [
        project.name.toLowerCase(),
        project.href.split("/").pop()?.toLowerCase() ?? project.name.toLowerCase()
      ])
    );
    return repos.filter((repo) => !featuredNames.has(repo.name.toLowerCase())).slice(0, 6);
  }, [repos]);

  return (
    <section id="projects" className="section-shell relative py-24">
      <SectionHeading eyebrow="Projects" title="Featured AI and full-stack systems with real product depth.">
        Public pinned GitHub projects stay in profile order, with sync ready when you pin something new.
      </SectionHeading>

      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => void loadRepos(true)}
          disabled={syncing}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/40 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing" : "Sync GitHub"}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.name}
            className="glass group flex min-h-[420px] flex-col rounded-[32px] p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            whileHover={{ y: -8, borderColor: "rgba(103,232,249,0.35)" }}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
                <project.icon className="h-6 w-6" />
              </span>
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Featured
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
            <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">{project.impact}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-white/[0.055] px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-auto flex gap-3 pt-8">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Code2 className="h-4 w-4" />
                Code
              </a>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primary"
                >
                  Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <ProjectSkeleton key={index} />)
          : dynamicRepos.map((repo, index) => <RepoCard key={repo.id} repo={repo} index={index} />)}
      </div>

      {!loading && error ? (
        <p className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {error}
        </p>
      ) : null}
    </section>
  );
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  return (
    <motion.article
      className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-primary/35 hover:bg-white/[0.055]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
        <a href={repo.htmlUrl} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name}`}>
          <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-primary" />
        </a>
      </div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
        {repo.description || "Public repository from Krishiv's GitHub profile."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(repo.topics.length ? repo.topics.slice(0, 4) : [repo.language ?? "Code"]).map((item) => (
          <span key={item} className="rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>{repo.language ?? "Mixed"}</span>
        <span className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4" />
            {repo.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {repo.forks}
          </span>
        </span>
      </div>
    </motion.article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
      <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/10" />
      <div className="mt-5 space-y-3">
        <div className="h-3 animate-pulse rounded-full bg-white/8" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/8" />
      </div>
      <div className="mt-8 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-white/8" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-white/8" />
      </div>
    </div>
  );
}
