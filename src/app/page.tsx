import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { GitHubSection } from "@/components/sections/github-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeetCodeSection } from "@/components/sections/leetcode-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { Navbar } from "@/components/ui/navbar";
import { PageMotion } from "@/components/ui/page-motion";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-ink text-paper">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <PageMotion />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <GitHubSection />
      <LeetCodeSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
