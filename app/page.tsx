"use client";

import DigitalHero from "@/components/Hero/DigitalHero";
import BentoGrid from "@/components/Sections/BentoGrid";
import ExperienceStack from "@/components/Sections/ExperienceStack";

export default function Home() {
  return (
    <main>
      <DigitalHero />
      <BentoGrid />
      <ExperienceStack />

      {/* Simple Footer for now */}
      <footer className="py-24 text-center text-muted font-mono text-xs border-t border-white/5">
        <p>SYSTEM.STATUS: OPERATIONAL</p>
        <p className="mt-2">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
