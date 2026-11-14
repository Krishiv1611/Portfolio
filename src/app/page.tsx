"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { SystemsSection } from "@/components/sections/systems-section";
import { AboutSection } from "@/components/sections/about-section";
import { FooterSection } from "@/components/sections/footer-section";
import { ResumeModal } from "@/components/ui/resume-modal";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <div className="min-h-screen bg-canvas text-ink-primary font-sans antialiased selection:bg-signal selection:text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-ink-primary focus:border focus:border-focus focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar onOpenResume={handleOpenResume} />
      <main id="main-content">
        <HeroSection onOpenResume={handleOpenResume} />
        <SystemsSection />
        <AboutSection onOpenResume={handleOpenResume} />
        <FooterSection onOpenResume={handleOpenResume} />
      </main>
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  );
}
