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
        <DigitalHero name={personalInfo.name} />
        <SummaryStats />
      </section>

      <div className="space-y-0">
        <section id="expertise" className="scroll-mt-32">
          <ExpertiseSection
            skills={skills}
            certifications={certifications}
            education={education}
          />
        </section>

        <section id="experience" className="scroll-mt-32">
          <ExperienceStack experiences={experiences} />
        </section>

        {/* FEATURED VENTURE: Elixiary AI */}
        <section id="venture" className="scroll-mt-32">
          <ElixiaryFeature elixiaryVenture={elixiaryVenture} />
        </section>

        <section id="projects" className="scroll-mt-32">
          <ProjectGallery projects={projects} />
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
