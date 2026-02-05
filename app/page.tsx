import { HeroSection } from "@/components/Hero/HeroSection";
import { Navbar } from "@/components/Navigation/Navbar";
import { AboutSection } from "@/components/About/AboutSection";
import { ExperienceTimeline } from "@/components/Experience/ExperienceTimeline";
import { SkillsSection } from "@/components/Skills/SkillsSection";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { ContactSection } from "@/components/Contact/ContactSection";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
