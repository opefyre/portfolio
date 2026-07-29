import DigitalHero from "@/components/Hero/DigitalHero";
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
  getElixiaryVenture,
} from "@/lib/db";

export default async function Home() {
  const [
    personalInfo,
    experiences,
    projects,
    skills,
    elixiaryVenture,
  ] = await Promise.all([
    getPersonalInfo(),
    getExperiences(),
    getProjects(),
    getSkills(),
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
        />
      </section>

      <SectionDivider code="SYS.02" label="COMPETENCY MATRIX" />

      {/* Skills — tall, free-scroll */}
      <section className="relative bg-section-tinted">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <ExpertiseSection skills={skills} />
        </div>
      </section>

      {/* === SLIDE: FEATURED VENTURE === */}
      <section
        className="min-h-[100dvh] flex flex-col justify-between relative"
        data-snap="true"
        aria-label="Featured venture"
      >
        <SectionDivider code="SYS.03" label="FEATURED VENTURE" />
        <div id="venture" className="flex-1 flex items-center w-full scroll-mt-32">
          <ElixiaryFeature elixiaryVenture={elixiaryVenture} />
        </div>
      </section>

      {/* === SELECTED WORK — promoted ahead of Professional History so the
            portfolio leads with the work itself, not the resume history. === */}
      <SelectedWorkStage totalCount={projects.length}>
        <ProjectGallery projects={projects} />
      </SelectedWorkStage>

      <SectionDivider code="SYS.05" label="PROFESSIONAL HISTORY" />

      {/*
        REVEAL STACK — JS-controlled 'new page rolls over' pattern.

        - Professional History scrolls normally
        - When its bottom hits viewport.bottom, it is pinned visually via
          a transform — it does not move further while the user scrolls
        - The fixed-positioned footer slides UP from viewport.bottom to
          viewport.top via translateY, covering the pinned section like a sheet
        - This is now the site's closing beat: Selected Work was promoted
          earlier in the flow, so the reveal stack finishes on Professional
          History instead of Projects.
      */}
      <RevealStack
        footer={
          <SiteFooter
            location={personalInfo.location}
            linkedin={personalInfo.linkedin}
            github={personalInfo.github}
          />
        }
      >
        <ExperienceStack experiences={experiences} />
      </RevealStack>
    </main>
  );
}
