"use client";

import DigitalHero from "@/components/Hero/DigitalHero";
import SummaryStats from "@/components/Sections/SummaryStats";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";

export default function Home() {
  return (
    <main className="bg-deep min-h-screen selection:bg-brand-blue/30 selection:text-white pb-32">
      <DigitalHero />
      <SummaryStats />

      <div className="space-y-0">
        <ExpertiseSection />
        <ExperienceStack />
        <ProjectGallery />
      </div>

      <footer className="py-12 text-center text-muted font-mono text-[10px] tracking-widest border-t border-white/5 mt-24">
        <p>PROCESS EXCELLENCE // DIGITAL TRANSFORMATION</p>
        <p className="mt-2 text-white/20">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
