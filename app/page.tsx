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
        <SectionDivider code="SYS.02" label="COMPETENCY MATRIX" />
      </section>

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

      <SectionDivider code="SYS.03" label="PROFESSIONAL HISTORY" />

      {/* Experience — pinned horizontal scroll */}
      <ExperienceStack experiences={experiences} />

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
        STACK-REVEAL: Selected Work is sticky at top of viewport for one full
        viewport-height of scroll. The footer (also exactly one viewport tall)
        sits on top of it via z-10, so as the user scrolls, the footer rises
        UP from below and covers the sticky stage — exactly the 'new page
        rolling over' effect requested.

        Sticky math: parent height = sticky.height (100dvh) + footer.height
        (100dvh) = 200dvh, so sticky stays pinned for 100dvh of scroll, which
        is exactly the distance the footer needs to fully cover it.
      */}
      <div className="relative">
        <section className="sticky top-0 h-[100dvh] z-0 overflow-hidden" aria-label="Selected work">
          <SelectedWorkStage totalCount={projects.length}>
            <ProjectGallery projects={projects} />
          </SelectedWorkStage>
        </section>
        <div className="relative z-10 h-[100dvh] flex">
          <SiteFooter
            location={personalInfo.location}
            linkedin={personalInfo.linkedin}
            resumeUrl={personalInfo.resumeUrl}
          />
        </div>
      </div>
    </main>
  );
}
