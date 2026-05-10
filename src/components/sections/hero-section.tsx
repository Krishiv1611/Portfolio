"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Download, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { profile, socialLinks } from "@/lib/profile";

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const activeTagline = profile.taglines[taglineIndex];

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      setDisplayed(activeTagline.slice(0, i));
      i += 1;
      if (i >= activeTagline.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setTaglineIndex((current) => (current + 1) % profile.taglines.length);
        }, 1600);
      }
    }, 36);

    return () => window.clearInterval(interval);
  }, [activeTagline]);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        x: `${(index * 37) % 100}%`,
        y: `${(index * 53) % 100}%`,
        delay: (index % 8) * 0.18,
        duration: 4 + (index % 5)
      })),
    []
  );

  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center pb-24 pt-36">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-primary/60 shadow-[0_0_18px_rgba(103,232,249,0.65)]"
            style={{ left: particle.x, top: particle.y }}
            animate={{ opacity: [0.12, 0.85, 0.12], scale: [1, 1.8, 1], y: [-8, 12, -8] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            AI-native product engineering
          </motion.div>

          <motion.h1
            className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile.name}
            <span className="block bg-gradient-to-r from-primary via-accent to-violet bg-clip-text text-transparent">
              {profile.title}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 min-h-14 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayed}
            <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-primary" />
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52 }}
          >
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary"
            >
              View Projects
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.links.resume}
              download
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-primary/10"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="mt-7 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.64 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="focus-ring rounded-full border border-white/10 bg-white/[0.035] p-3 text-slate-300 transition hover:border-primary/40 hover:text-white"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="glass relative min-h-[420px] overflow-hidden rounded-[32px] p-6"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.18),transparent_34%)]" />
          <div className="relative flex h-full min-h-[372px] flex-col justify-between">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>portfolio.kernel</span>
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4 font-mono text-sm">
              {[
                ["engineer", "'Krishiv Arora'"],
                ["focus", "['AI Agents', 'RAG', 'Backend Systems']"],
                ["shipping", "'Synora | Career Pilot AI | RideMates'"],
                ["status", "'open to high-impact engineering work'"]
              ].map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-slate-950/52 p-4"
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + index * 0.12 }}
                >
                  <span className="text-violet">const </span>
                  <span className="text-primary">{key}</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-accent">{value}</span>
                  <span className="text-slate-500">;</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
