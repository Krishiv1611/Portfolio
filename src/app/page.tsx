import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeetCodeSection } from "@/components/sections/leetcode-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { Navbar } from "@/components/ui/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-radial-soft" />
      <div className="grid-surface pointer-events-none fixed inset-0 opacity-80" />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <LeetCodeSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
