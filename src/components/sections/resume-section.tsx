import { Download, Eye, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, resumeHighlights } from "@/lib/profile";

export function ResumeSection() {
  return (
    <section id="resume" className="section-band bg-canvas py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow="07 / Resume" title="The complete record, ready for review.">
          A one-page summary of education, current training, applied AI work, leadership, technical skills, and verified competitive-programming achievements.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
          <aside data-reveal className="border border-white/12 bg-white/[0.018] p-6 md:p-8">
            <FileText className="h-6 w-6 text-white/44" />
            <p className="mt-10 font-mono text-[10px] uppercase text-white/28">Candidate profile</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{profile.name}</h3>
            <p className="mt-2 text-sm text-white/48">Third-year B.Tech CSE student</p>
            <p className="mt-5 text-sm leading-7 text-white/42">
              Current GlobalLogic software engineering trainee with project work across agent workflows, retrieval, APIs, databases, and frontend systems.
            </p>

            <div className="mt-8 grid gap-2">
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="pressable focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/14 text-sm font-medium text-white/70 hover:border-white/30 hover:text-white"
              >
                <Eye className="h-4 w-4" />
                View PDF
              </a>
              <a
                href={profile.links.resume}
                download="Krishiv-Arora-Resume.pdf"
                className="pressable focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-semibold text-black hover:bg-white/84"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </div>
          </aside>

          <div data-reveal className="border-t border-white/12">
            {resumeHighlights.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-4 border-b border-white/12 py-7 sm:grid-cols-[0.16fr_0.62fr_0.22fr] sm:gap-6"
              >
                <span className="font-mono text-[10px] text-white/24">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-white/82">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/46">{item.body}</p>
                </div>
                <p className="font-mono text-[10px] uppercase text-white/30 sm:text-right">{item.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
