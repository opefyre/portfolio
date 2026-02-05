"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalIntro } from "@/components/Intro/TerminalIntro";
import { FloatingOrbNav } from "@/components/Navigation/FloatingOrbNav";
import { HorizontalScrollContainer } from "@/components/Scroll/HorizontalScrollContainer";
import { LiquidDistortionHero } from "@/components/Hero/LiquidDistortionHero";
import { BentoGridSection } from "@/components/Sections/BentoGridSection";
import { ExperienceTimeline } from "@/components/Experience/ExperienceTimeline";
import { SkillsSection } from "@/components/Skills/SkillsSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { ContactSection } from "@/components/Contact/ContactSection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <TerminalIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <FloatingOrbNav />

          <HorizontalScrollContainer>
            {/* Section 1: Liquid Distortion Hero */}
            <LiquidDistortionHero />

            {/* Section 2: Bento Grid Achievements */}
            <BentoGridSection />

            {/* Section 3: Experience */}
            <div className="w-screen h-screen flex-shrink-0">
              <ExperienceTimeline />
            </div>

            {/* Section 4: Skills */}
            <div className="w-screen h-screen flex-shrink-0">
              <SkillsSection />
            </div>

            {/* Section 5: Projects */}
            <div className="w-screen h-screen flex-shrink-0">
              <ProjectsSection />
            </div>

            {/* Section 6: Contact */}
            <div className="w-screen h-screen flex-shrink-0">
              <ContactSection />
            </div>
          </HorizontalScrollContainer>
        </>
      )}
    </>
  );
}
