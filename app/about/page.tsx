import type { Metadata } from "next";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { about, ogImage, site } from "@/content/site";
import { getExperiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Abolfazl Shirkavand (Abosh): engineer, operator and founder of Vrolen, based in Lisbon.",
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Abolfazl Shirkavand (Abosh)", url: "/about/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "About Abolfazl Shirkavand (Abosh)", images: [ogImage] },
};

/** "Sep 2016 to Aug 2017" → [2016, 2017]; "Present" → null. */
function years(period: string): [number, number | null] {
  const ys = period.match(/\d{4}/g)?.map(Number) ?? [];
  const now = /present/i.test(period);
  return [ys[0] ?? 0, now ? null : (ys[ys.length - 1] ?? ys[0] ?? 0)];
}

export default async function AboutPage() {
  const experiences = await getExperiences();
  const rows = experiences.map((e) => {
    const spans = e.positions.map((p) => years(p.period));
    const start = Math.min(...spans.map((s) => s[0]));
    const ongoing = spans.some((s) => s[1] === null);
    const end = ongoing ? null : Math.max(...spans.map((s) => s[1] ?? 0));
    return {
      company: e.company.replace(/\s*\(.*\)\s*$/, ""),
      role: e.positions[0]?.title ?? "",
      when: end === null ? `${start} to now` : start === end ? `${start}` : `${start} to ${end}`,
    };
  });

  return (
    <>
      <section className="about" data-nav-tone="dark" aria-labelledby="about-title">
        <div className="frame about-grid">
          <div className="about-media">
            <GLImage id="portrait" src="/prof.webp" alt="Illustrated portrait of Abosh" width={320} height={480} radius={14} priority />
            <LensAnchor id="about" className="about-lens" sizeRatio={1} plateLines={0} plateHalo={0} thickness={0.7} />
          </div>
          <div className="about-copy">
            <h1 id="about-title" className="about-title">
              {about.bio[0]}
            </h1>
            {about.bio.slice(1).map((p, i) => (
              <p key={i} className="about-p">
                {p}
              </p>
            ))}
            <p className="about-p about-edu">{about.education}</p>
            <p className="about-contact">
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="career" data-nav-tone="dark" aria-labelledby="career-title">
        <div className="frame">
          <h2 id="career-title" className="h-section">
            Career
          </h2>
          <ol className="career-list">
            {rows.map((r) => (
              <li key={r.company} className="career-row">
                <span className="career-company">{r.company}</span>
                <span className="career-role">{r.role}</span>
                <span className="career-when">{r.when}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
