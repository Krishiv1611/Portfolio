import { BriefcaseBusiness } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/profile";

const compassModes = [
  { name: "Ask", detail: "Repository-aware answers with relevant code context" },
  { name: "Edit", detail: "Reviewable patches with approval controls" },
  { name: "Plan", detail: "Structured implementation plans across a codebase" }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-band bg-ink py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="02 / Experience" title="Current training and technical leadership.">
          Applied software work at GlobalLogic and hands-on mentoring at JIIT, presented from the record in my resume.
        </SectionHeading>

        <div className="border-t border-white/12">
          {experience.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              data-reveal
              className="grid gap-8 border-b border-white/12 py-10 md:grid-cols-[0.28fr_0.72fr] md:py-12"
            >
              <div>
                <div className="flex items-center gap-3 text-white/64">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase">{item.duration}</span>
                </div>
                <p className="mt-3 text-sm text-white/34">{item.location}</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase text-white/36">{index === 0 ? "Current role" : "Leadership"}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{item.role}</h3>
                <p className="mt-2 text-sm font-medium text-white/54">{item.company}</p>

                {index === 0 ? (
                  <div className="mt-8 border-y border-white/12 bg-white/[0.018]">
                    <div className="grid gap-4 border-b border-white/12 px-5 py-5 sm:grid-cols-[0.22fr_0.78fr] md:px-6">
                      <p className="font-mono text-[10px] uppercase text-white/34">Project</p>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Compass</h4>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">
                          An individual mentored project reducing context switching across repository exploration, planning, code changes, debugging, and review.
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3">
                      {compassModes.map((mode) => (
                        <div key={mode.name} className="border-b border-white/10 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-6">
                          <p className="font-mono text-xs text-white/82">{mode.name}</p>
                          <p className="mt-2 text-xs leading-5 text-white/40">{mode.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <ul className="mt-7 space-y-4">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[16px_1fr] gap-3 text-sm leading-7 text-white/52 md:text-base">
                      <span className="mt-[13px] h-px w-3 bg-white/34" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
