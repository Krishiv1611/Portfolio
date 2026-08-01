import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { interests, profile, proofPoints } from "@/lib/profile";

export function AboutSection() {
  return (
    <section id="about" className="section-band bg-canvas py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="01 / About" title="Learning across the stack. Building with intent.">
          {profile.summary}
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[0.58fr_0.42fr] lg:gap-20">
          <div data-reveal>
            <p className="max-w-3xl text-xl font-medium leading-8 text-white/88 md:text-2xl md:leading-9">
              My focus is becoming the kind of engineer who can understand a problem, design the system behind it, and carry the product through to a usable interface.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/52">
              I am currently in my third year of B.Tech Computer Science at JIIT. My work spans agent workflows, retrieval, typed APIs, authentication, persistence, realtime systems, and responsive frontend development.
            </p>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="pressable focus-ring mt-8 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/14 px-4 text-sm font-medium text-white/72 hover:border-white/30 hover:text-white"
            >
              LinkedIn profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div data-reveal className="border-t border-white/12">
            <div className="grid grid-cols-[0.34fr_0.66fr] border-b border-white/12 py-5">
              <p className="font-mono text-[10px] uppercase text-white/34">Education</p>
              <div>
                <p className="font-medium text-white/84">B.Tech, Computer Science</p>
                <p className="mt-2 text-sm leading-6 text-white/46">JIIT Noida, 2024 - 2028</p>
              </div>
            </div>
            <div className="grid grid-cols-[0.34fr_0.66fr] border-b border-white/12 py-5">
              <p className="font-mono text-[10px] uppercase text-white/34">Current</p>
              <div>
                <p className="font-medium text-white/84">Software Engineering Trainee</p>
                <p className="mt-2 text-sm leading-6 text-white/46">GlobalLogic, a Hitachi Group company</p>
              </div>
            </div>
            <div className="grid grid-cols-[0.34fr_0.66fr] border-b border-white/12 py-5">
              <p className="font-mono text-[10px] uppercase text-white/34">Interests</p>
              <p className="text-sm leading-7 text-white/58">{interests.join(" / ")}</p>
            </div>
          </div>
        </div>

        <div data-separator className="mt-16 h-px origin-left bg-white/12 md:mt-20" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((item) => (
            <article
              key={item.label}
              data-reveal
              className="border-b border-white/10 py-7 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="text-3xl font-semibold text-white md:text-4xl">{item.value}</p>
              <h3 className="mt-3 text-sm font-medium text-white/78">{item.label}</h3>
              <p className="mt-1.5 text-xs leading-5 text-white/38">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
