import DigitalHero from "@/components/Hero/DigitalHero";
import SummaryStats from "@/components/Sections/SummaryStats";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";
import FloatingNav from "@/components/Navigation/FloatingNav";
import ElixiaryFeature from "@/components/Sections/ElixiaryFeature";
import SectionDivider from "@/components/UI/SectionDivider";
import {
  getPersonalInfo,
  getExperiences,
  getProjects,
  getSkills,
  getEducation,
  getCertifications,
  getElixiaryVenture,
} from "@/lib/db";

export default async function Home() {
  const [
    personalInfo,
    experiences,
    projects,
    skills,
    education,
    certifications,
    elixiaryVenture,
  ] = await Promise.all([
    getPersonalInfo(),
    getExperiences(),
    getProjects(),
    getSkills(),
    getEducation(),
    getCertifications(),
    getElixiaryVenture(),
  ]);

  return (
    <main className="bg-page min-h-screen selection:bg-brand-blue/30 selection:text-white">
      <FloatingNav />

      {/* === SLIDE 1: HERO === */}
      <section id="overview" className="min-h-[100dvh] scroll-mt-0" data-snap="true">
        <DigitalHero
          name={personalInfo.name}
          title={personalInfo.title}
          headline={personalInfo.headline}
          signatureMetricValue={personalInfo.signatureMetricValue}
          signatureMetricLabel={personalInfo.signatureMetricLabel}
          linkedin={personalInfo.linkedin}
          location={personalInfo.location}
          resumeUrl={personalInfo.resumeUrl}
        />
      </section>

      {/* === SLIDE 2: DASHBOARD SUMMARY (full viewport, content centered, SYS.02 divider anchored at bottom) === */}
      <section
        className="min-h-[100dvh] flex flex-col justify-between relative"
        data-snap="true"
        aria-label="At-a-glance dashboard"
      >
        <div className="flex-1 flex items-center w-full">
          <SummaryStats
            experiences={experiences}
            projects={projects}
            certifications={certifications}
            education={education}
          />
        </div>
        <SectionDivider code="SYS.02" label="COMPETENCY MATRIX" />
      </section>

      {/* Skills — TALL section, NOT a snap target (browse freely) */}
      <section className="relative bg-section-tinted">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <ExpertiseSection
            skills={skills}
            certifications={certifications}
            education={education}
          />
        </div>
      </section>

      <SectionDivider code="SYS.03" label="PROFESSIONAL HISTORY" />

      {/* Experience — has its own pinned horizontal scroll, not a snap target */}
      <ExperienceStack experiences={experiences} />

      {/* === SLIDE: FEATURED VENTURE (SYS.04 marker on top, venture centered, full viewport) === */}
      <section
        className="min-h-[100dvh] flex flex-col justify-between relative"
        data-snap="true"
        aria-label="Featured venture"
      >
        <SectionDivider code="SYS.04" label="FEATURED VENTURE" />
        <div id="venture" className="flex-1 flex items-center w-full scroll-mt-32">
          <ElixiaryFeature elixiaryVenture={elixiaryVenture} />
        </div>
      </section>

      <SectionDivider code="SYS.05" label="SELECTED WORK" />

      {/* Projects — TALL (bento + archive). NOT a snap target */}
      <section className="relative bg-section-tinted">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <footer className="py-12 text-center text-tertiary font-mono text-xs tracking-widest border-t border-border bg-section-tinted">
        <p>[ END OF TRANSMISSION ]</p>
        <p className="mt-2 text-tertiary/60">© 2026 ABOLFAZL SHIRKAVAND</p>
      </footer>
    </main>
  );
}
