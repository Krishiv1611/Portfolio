"use client";

import { motion } from "framer-motion";
import { Download, Eye, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, resumeHighlights } from "@/lib/profile";

export function ResumeSection() {
  return (
    <section id="resume" className="section-shell relative py-24">
      <SectionHeading eyebrow="Resume" title="A concise record of AI, backend, and full-stack execution.">
        Education, responsibility, and project work are summarized here, with the full PDF available instantly.
      </SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass rounded-[32px] p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.72 }}
        >
          <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
            <GraduationCap className="inline h-6 w-6" />
          </span>
          <h3 className="mt-7 text-2xl font-semibold text-white">Krishiv Arora Resume</h3>
          <p className="mt-4 leading-7 text-slate-300">
            Includes AI platform work, multi-agent career systems, full-stack realtime apps,
            technical volunteering, programming achievements, and core engineering skills.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Eye className="h-4 w-4" />
              View PDF
            </a>
            <a
              href={profile.links.resume}
              download
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </motion.div>

        <div className="space-y-4">
          {resumeHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ x: 4, borderColor: "rgba(103,232,249,0.28)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  {item.meta}
                </span>
              </div>
              <p className="mt-3 leading-7 text-slate-300">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
