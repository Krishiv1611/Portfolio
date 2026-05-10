"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {children ? <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">{children}</p> : null}
    </motion.div>
  );
}
