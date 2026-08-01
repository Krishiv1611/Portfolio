import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div data-reveal className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[0.25fr_0.75fr]">
      <div className="flex items-start gap-3 pt-1">
        <span className="mt-2 h-px w-6 bg-white/28" aria-hidden="true" />
        <p className="font-mono text-[11px] uppercase text-white/46">{eyebrow}</p>
      </div>
      <div>
        <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] text-paper md:text-5xl">
          {title}
        </h2>
        {children ? (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52 md:text-base md:leading-8">
            {children}
          </p>
        ) : null}
      </div>
    </div>
  );
}
