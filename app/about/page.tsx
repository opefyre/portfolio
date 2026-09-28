import type { Metadata } from "next";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { LensFragment } from "@/components/lens/LensFragment";
import { PageHead } from "@/components/site/PageHead";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RoleDetails } from "@/components/site/RoleDetails";
import { about, ogImage, site } from "@/content/site";
import { getCertifications, getEducation, getExperiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Abolfazl Shirkavand (Abosh): engineer, operator and founder of Vrolen. Ten years of continuous improvement across Unilever, British American Tobacco, Snoonu and Smart Factory Planning.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About — Abolfazl Shirkavand (Abosh)", url: "/about/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "About — Abolfazl Shirkavand (Abosh)", images: [ogImage] },
};

export default async function AboutPage() {
  const [experiences, education, certifications] = await Promise.all([getExperiences(), getEducation(), getCertifications()]);

  return (
    <>
      <PageHead
        kicker="About"
        title={
          <>
            {site.name.split(" ")[0]}
            <br />
            {site.name.split(" ").slice(1).join(" ")}
          </>
        }
        lead={
          <p className="about-aka">
            <span className="t-serif-inline">Abosh</span>, mostly.
          </p>
        }
      >
        <ul className="about-headline t-mono" aria-label="Headline">
          {about.headline.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </PageHead>

      <section className="section about-bio" data-nav-tone="dark" aria-label="Biography">
        <div className="frame about-bio-grid">
          <figure className="about-portrait">
            <div className="about-portrait-mat">
              <img src="/prof.webp" alt="Illustrated portrait of Abosh on a balcony above a forest, next to a castle tower" width={320} height={480} />
            </div>
            <figcaption className="t-mono">Fig. — Abosh, illustrated</figcaption>
          </figure>
          <div className="about-bio-text">
            {about.bio.map((para, i) => (
              <p key={i} className={i === 0 ? "about-lead" : "about-para"}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-loop" data-nav-tone="dark" aria-labelledby="loop-title">
        <div className="frame">
          <div className="about-loop-head">
            <h2 id="loop-title" className="t-h2">
              How I work
            </h2>
            <p className="t-body">
              <span className="hint-pointer">Move the lens over each line.</span>
              <span className="hint-touch">Tap a line to move the lens.</span>
              <span className="hint-tail"> There&rsquo;s a real example underneath.</span>
              <span className="hint-fallback">Each line has a real example underneath.</span>
            </p>
          </div>
          <LensAnchor id="about" className="about-field" interactive sizeRatio={0.5} minSize={230} thickness={0.42} plateLines={0} plateHalo={0.55}>
            <ol className="about-principles">
              {about.principles.map((p, i) => (
                <li key={p.surface}>
                  <span className="t-mono about-principle-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <LensFragment anchorId="about" id={`about-${i}`} surface={p.surface} through={p.through} kind="display" className="frag--flow" />
                </li>
              ))}
            </ol>
          </LensAnchor>
        </div>
      </section>

      <section className="section about-path" data-nav-tone="dark" aria-labelledby="record-title">
        <div className="frame">
          <div className="sub-head">
            <h2 id="record-title" className="t-h3">
              The record
            </h2>
            <p className="t-mono sub-head-meta">2016 — now</p>
          </div>
          <ol className="record">
            {experiences.map((e) => (
              <li key={e.id} className="record-company">
                <div className="record-company-head">
                  <h3 className="record-company-name">{e.company.replace(/\s*\(.*\)\s*$/, "")}</h3>
                  <p className="t-mono record-company-where">{e.location}</p>
                </div>
                <ol className="record-roles">
                  {e.positions.map((pos) => (
                    <li key={pos.title + pos.period} className="record-role">
                      <p className="record-role-title">{pos.title}</p>
                      <p className="t-mono record-role-period">{pos.period}</p>
                      {pos.achievements.length > 0 && <RoleDetails items={pos.achievements} label={`${pos.title} — details`} />}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-facts" data-nav-tone="dark" aria-label="Education, certifications and links">
        <div className="frame facts-grid">
          <div>
            <h2 className="t-label facts-title">Education</h2>
            <ul className="facts-list">
              {education.map((ed) => (
                <li key={ed.degree}>
                  <span className="facts-main">{ed.degree}</span>
                  <span className="t-mono facts-sub">
                    {ed.institution} · {ed.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-label facts-title">Certifications</h2>
            <ul className="facts-list">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span className="facts-main">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="t-label facts-title">Elsewhere</h2>
            <ul className="facts-list">
              <li>
                <a className="facts-main underline-draw" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a className="facts-main underline-draw" href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a className="facts-main underline-draw" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter index="—" />
    </>
  );
}
