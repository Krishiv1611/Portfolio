"use client";

import { motion } from "framer-motion";
import { highlights, interests, profile, skillTags } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-shell relative py-24">
      <SectionHeading eyebrow="About" title="A builder at the intersection of AI systems and polished products.">
        {profile.summary}
      </SectionHeading>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-semibold text-white">Engineering Profile</h3>
          <p className="mt-4 leading-8 text-slate-300">
            I build end-to-end applications where AI is not a bolt-on feature: it is part of
            the product architecture. My work spans RAG-powered agents, voice support systems,
            resume intelligence, realtime collaboration, and scalable backend foundations.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <motion.span
                key={interest}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              className="glass rounded-3xl p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              whileHover={{ y: -6, borderColor: "rgba(103,232,249,0.35)" }}
            >
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-3 font-medium text-primary">{item.label}</p>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap gap-2">
          {skillTags.map((skill, index) => (
            <motion.span
              key={skill}
              className="rounded-full bg-slate-900 px-3 py-2 text-sm text-slate-300 ring-1 ring-white/10"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.025 }}
              whileHover={{ scale: 1.06, color: "#ffffff" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
