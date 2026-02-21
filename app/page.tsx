import DigitalHero from "@/components/Hero/DigitalHero";
import SummaryStats from "@/components/Sections/SummaryStats";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";
import FloatingNav from "@/components/Navigation/FloatingNav";
import ElixiaryFeature from "@/components/Sections/ElixiaryFeature";
import {
  getPersonalInfo,
  getExperiences,
  getProjects,
  getSkills,
  getEducation,
  getCertifications,
  getElixiaryVenture
} from "@/lib/db";


export default async function Home() {
  const [
    personalInfo,
    experiences,
    projects,
    skills,
    education,
    certifications,
    elixiaryVenture
  ] = await Promise.all([
    getPersonalInfo(),
    getExperiences(),
    getProjects(),
    getSkills(),
    getEducation(),
    getCertifications(),
    getElixiaryVenture()
  ]);

  return (
    <main className="bg-deep min-h-screen selection:bg-brand-blue/30 selection:text-white pb-32">
      <FloatingNav email={personalInfo.email} />
      {/* Scroll Margin corrections included */}
      <section id="overview" className="scroll-mt-0">
        <DigitalHero name={personalInfo.name} title={personalInfo.title} />
        <SummaryStats />
      </section>

      <div className="space-y-0">
        {/* Skills — warm gradient wash + blue glow */}
        <section id="expertise" className="scroll-mt-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/[0.03] dark:bg-brand-blue/[0.08] blur-[120px] rounded-full pointer-events-none" />
          <div className="bg-gradient-to-b from-page via-card/30 to-page">
            <ExpertiseSection
              skills={skills}
              certifications={certifications}
              education={education}
            />
          </div>
        </section>

        {/* Experience — cool tint + purple glow */}
        <section id="experience" className="scroll-mt-32 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/[0.03] dark:bg-brand-purple/[0.08] blur-[120px] rounded-full pointer-events-none" />
          <div className="bg-gradient-to-b from-page via-brand-blue/[0.02] to-page">
            <ExperienceStack experiences={experiences} />
          </div>
        </section>

        {/* FEATURED VENTURE: Elixiary AI — already has glows */}
        <section id="venture" className="scroll-mt-32">
          <ElixiaryFeature elixiaryVenture={elixiaryVenture} />
        </section>

        {/* Projects — purple tint + dual glows */}
        <section id="projects" className="scroll-mt-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/[0.03] dark:bg-brand-blue/[0.08] blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/[0.03] dark:bg-brand-purple/[0.08] blur-[120px] rounded-full pointer-events-none" />
          <div className="bg-gradient-to-b from-page via-brand-purple/[0.02] to-page">
            <ProjectGallery projects={projects} />
          </div>
        </section>
      </div>

      {/* Footer — gradient sink */}
      <footer className="py-12 text-center text-tertiary font-mono text-[10px] tracking-widest border-t border-border mt-0 bg-gradient-to-b from-page to-card">
        <p>PROCESS EXCELLENCE // DIGITAL TRANSFORMATION</p>
        <p className="mt-2 text-tertiary/60">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
