"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell relative py-24">
      <SectionHeading eyebrow="Experience" title="Professional software engineering experience.">
        Internships and industry roles focused on production-grade systems and engineering best practices.
      </SectionHeading>

      <div className="space-y-6">
        {experience.map((item, index) => (
          <motion.article
            key={item.company}
            className="glass rounded-3xl p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            whileHover={{ y: -4, borderColor: "rgba(103,232,249,0.35)" }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
                  <BriefcaseBusiness className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{item.company}</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 md:items-end">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  {item.duration}
                </span>
                <span className="text-xs text-slate-500">{item.location}</span>
              </div>
            </div>
            
            <ul className="mt-6 space-y-3 text-slate-300">
              {item.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span className="leading-7">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
