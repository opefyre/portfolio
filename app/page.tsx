import DigitalHero from "@/components/Hero/DigitalHero";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ExperienceStack from "@/components/Sections/ExperienceStack";
import ProjectGallery from "@/components/Sections/ProjectGallery";
import FloatingNav from "@/components/Navigation/FloatingNav";
// FEATURED_VENTURE (hidden) — restore this import to bring back the section.
// import ElixiaryFeature from "@/components/Sections/ElixiaryFeature3D";
import SectionDivider from "@/components/UI/SectionDivider";
import SelectedWorkStage from "@/components/Sections/SelectedWorkStage";
import SiteFooter from "@/components/Sections/SiteFooter";
import RevealStack from "@/components/Sections/RevealStack";
import {
  getPersonalInfo,
  getExperiences,
  getProjects,
  getSkills,
  // FEATURED_VENTURE (hidden) — restore alongside the section below.
  // getElixiaryVenture,
} from "@/lib/db";

export default async function Home() {
  const [
    personalInfo,
    experiences,
    projects,
    skills,
    // FEATURED_VENTURE (hidden) — restore the destructured slot + Promise.all entry.
    // elixiaryVenture,
  ] = await Promise.all([
    getPersonalInfo(),
    getExperiences(),
    getProjects(),
    getSkills(),
    // getElixiaryVenture(),
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

      {/* === SLIDE: FEATURED VENTURE (hidden) ===
          To restore: uncomment this section AND re-enable the ElixiaryFeature
          import, the getElixiaryVenture data fetch, and the elixiaryVenture
          destructure at the top of this file. Also uncomment the "Venture"
          entry in components/Navigation/FloatingNav.tsx and in
          components/Sections/SiteFooter.tsx (QUICK_LINKS).

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
      */}

      {/* === SELECTED WORK — leads right after the hero so the portfolio
            opens with the work itself, not the resume history. === */}
      <SelectedWorkStage totalCount={projects.length}>
        <ProjectGallery projects={projects} />
      </SelectedWorkStage>

      <SectionDivider code="SYS.03" label="PROFESSIONAL HISTORY" />

      {/* Experience — pinned horizontal scroll on desktop (its own
          ScrollTrigger pin). Kept OUT of RevealStack: nesting it inside
          RevealStack's translate-based pin fought with GSAP's own pin
          math and clipped the top of the pinned station content. */}
      <ExperienceStack experiences={experiences} />

      <SectionDivider code="SYS.04" label="COMPETENCY MATRIX" />

      {/*
        REVEAL STACK — JS-controlled 'new page rolls over' pattern.

        - Skills & competencies scrolls normally
        - When its bottom hits viewport.bottom, it is pinned visually via
          a transform — it does not move further while the user scrolls
        - The fixed-positioned footer slides UP from viewport.bottom to
          viewport.top via translateY, covering the pinned section like a sheet
        - This is the site's closing beat. GlassTerminal has no competing
          scroll-jack pin of its own, so it's safe to wrap here (unlike
          ExperienceStack above).
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
        <section className="relative bg-section-tinted">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10">
            <ExpertiseSection skills={skills} />
          </div>
        </section>
      </RevealStack>
    </main>
  );
}
