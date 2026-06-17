import DigitalHero from "@/components/Hero/DigitalHero";
import SummaryStats from "@/components/Sections/SummaryStats";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";
import FloatingNav from "@/components/Navigation/FloatingNav";
import ElixiaryFeature from "@/components/Sections/ElixiaryFeature3D";
import SectionDivider from "@/components/UI/SectionDivider";
import SelectedWorkStage from "@/components/Sections/SelectedWorkStage";
import SiteFooter from "@/components/Sections/SiteFooter";
import RevealStack from "@/components/Sections/RevealStack";
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
          github={personalInfo.github}
          location={personalInfo.location}
          resumeUrl={personalInfo.resumeUrl}
        />
      </section>

      {/* === SLIDE 2: DASHBOARD SUMMARY === */}
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
        <SectionDivider code="SYS.02" label="PROFESSIONAL HISTORY" />
      </section>

      {/* Experience — pinned horizontal scroll */}
      <ExperienceStack experiences={experiences} />

      <SectionDivider code="SYS.03" label="COMPETENCY MATRIX" />

      {/* Skills + Credentials + Academic Log — tall, free-scroll */}
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

      {/* === SLIDE: FEATURED VENTURE === */}
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

      {/*
        REVEAL STACK — JS-controlled 'new page rolls over' pattern.

        - Selected Work scrolls normally
        - When SW.bottom hits viewport.bottom, SW is pinned visually via
          a transform — it does not move further while the user scrolls
        - The fixed-positioned footer slides UP from viewport.bottom to
          viewport.top via translateY, covering the pinned SW like a sheet
        - The 'end of SW' is effectively the 'end of the website' — the
          extra 100dvh of scroll only drives the footer reveal
      */}
      <RevealStack
        footer={
          <SiteFooter
            location={personalInfo.location}
            linkedin={personalInfo.linkedin}
            github={personalInfo.github}
            resumeUrl={personalInfo.resumeUrl}
          />
        }
      >
        <SelectedWorkStage totalCount={projects.length}>
          <ProjectGallery projects={projects} />
        </SelectedWorkStage>
      </RevealStack>
    </main>
  );
}
