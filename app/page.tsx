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
    <main className="bg-page min-h-screen selection:bg-brand-blue/30 selection:text-white">
      <FloatingNav />
      {/* Scroll Margin corrections included */}
      <section id="overview" className="scroll-mt-0">
        <DigitalHero name={personalInfo.name} title={personalInfo.title} />
        <SummaryStats />
      </section>

      {/* Skills — TINTED section with integrated wave edges */}
      <section className="scroll-mt-32 relative bg-section-tinted mt-0" style={{ clipPath: 'none' }}>
        {/* Top wave edge — extends above the section */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full h-16 md:h-24 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none" fill="none">
            <path d="M0 96L60 85.3C120 75 240 53 360 48C480 43 600 53 720 58.7C840 64 960 64 1080 56C1200 48 1320 32 1380 24L1440 16V96H0Z" className="fill-section-tinted" />
          </svg>
        </div>

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10">
          <ExpertiseSection
            skills={skills}
            certifications={certifications}
            education={education}
          />
        </div>

        {/* Bottom wave edge — extends below the section */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full h-16 md:h-24 overflow-hidden">
          <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none" fill="none">
            <path d="M0 0L60 10.7C120 21 240 43 360 48C480 53 600 43 720 37.3C840 32 960 32 1080 40C1200 48 1320 64 1380 72L1440 80V0H0Z" className="fill-section-tinted" />
          </svg>
        </div>
      </section>

      {/* Spacer for the wave overflow */}
      <div className="h-16 md:h-24" />

      {/* Experience — PLAIN section */}
      <section id="experience" className="scroll-mt-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
        <ExperienceStack experiences={experiences} />
      </section>

      {/* ── Subtle separator between Experience and Venture ── */}
      <div className="container-wide">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* FEATURED VENTURE: Elixiary AI */}
      <section id="venture" className="scroll-mt-32">
        <ElixiaryFeature elixiaryVenture={elixiaryVenture} />
      </section>

      {/* Projects — TINTED section with integrated wave edges */}
      <section id="projects" className="scroll-mt-32 relative bg-section-tinted" style={{ clipPath: 'none' }}>
        {/* Top wave edge */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full h-16 md:h-24 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none" fill="none">
            <path d="M0 96L48 80C96 64 192 32 288 21.3C384 11 480 11 576 21.3C672 32 768 53 864 58.7C960 64 1056 53 1152 48C1248 43 1344 43 1392 43L1440 43V96H0Z" className="fill-section-tinted" />
          </svg>
        </div>

        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10">
          <ProjectGallery projects={projects} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-tertiary font-mono text-[10px] tracking-widest border-t border-border bg-section-tinted">
        <p>PROCESS EXCELLENCE // DIGITAL TRANSFORMATION</p>
        <p className="mt-2 text-tertiary/60">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
