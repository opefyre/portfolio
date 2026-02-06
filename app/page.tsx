"use client";

import DigitalHero from "@/components/Hero/DigitalHero";
import SummaryStats from "@/components/Sections/SummaryStats";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";
import FloatingNav from "@/components/Navigation/FloatingNav";
import ElixiaryFeature from "@/components/Sections/ElixiaryFeature";


export default function Home() {
  return (
    <main className="bg-deep min-h-screen selection:bg-brand-blue/30 selection:text-white pb-32">
      <FloatingNav />
      {/* Scroll Margin corrections included */}
      <section id="hero" className="scroll-mt-0">
        <DigitalHero />
      </section>

      <section id="stats" className="scroll-mt-32">
        <SummaryStats />
      </section>

      <div className="space-y-0">
        <section id="expertise" className="scroll-mt-32">
          <ExpertiseSection />
        </section>

        {/* FEATURED VENTURE: Elixiary AI */}
        <section id="venture" className="scroll-mt-32">
          <ElixiaryFeature />
        </section>

        <section id="experience" className="scroll-mt-32">
          <ExperienceStack />
        </section>

        <section id="projects" className="scroll-mt-32">
          <ProjectGallery />
        </section>
      </div>



      {/* Footer Refactor: Semantic Colors */}
      <footer className="py-12 text-center text-tertiary font-mono text-[10px] tracking-widest border-t border-border mt-0 bg-page">
        <p>PROCESS EXCELLENCE // DIGITAL TRANSFORMATION</p>
        <p className="mt-2 text-tertiary/60">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
