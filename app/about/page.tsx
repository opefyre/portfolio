import type { Metadata } from "next";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialLinks } from "@/components/site/SocialLinks";
import { about, ogImage, site } from "@/content/site";
import { publications, scholarProfile } from "@/content/publications";
import { getCertifications, getExperiences } from "@/lib/data";

const description = "Operational excellence, digital transformation and engineering research. Career at Unilever, British American Tobacco and Snoonu. Founder of Vrolen.";

export const metadata: Metadata = {
  title: "About Abolfazl Shirkavand",
  description,
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Abolfazl Shirkavand", description, type: "website", url: "/about/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "About Abolfazl Shirkavand", description, images: [ogImage] },
};

/** "Sep 2016 to Aug 2017" → [2016, 2017]; "Present" → null. */
function years(period: string): [number, number | null] {
  const ys = period.match(/\d{4}/g)?.map(Number) ?? [];
  const now = /present/i.test(period);
  return [ys[0] ?? 0, now ? null : (ys[ys.length - 1] ?? ys[0] ?? 0)];
}

export default async function AboutPage() {
  const [experiences, certifications] = await Promise.all([getExperiences(), getCertifications()]);
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
            <GLImage id="portrait" src="/about/portrait.webp" alt="Abolfazl Shirkavand" width={1335} height={1178} radius={14} priority />
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
            <p className="about-p about-certs">
              Certified: {certifications.map((c) => c.name).join(", ")}.
            </p>
            <div className="about-contact">
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
              <SocialLinks only={["linkedin", "instagram"]} />
            </div>
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
      <section className="publications" data-nav-tone="dark" aria-labelledby="publications-title" id="publications">
        <div className="frame">
          <div className="publications-heading">
            <h2 id="publications-title" className="h-section">Publications</h2>
            <a href={scholarProfile} className="text-link" target="_blank" rel="noopener noreferrer">
              Google Scholar<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="publications-intro">My engineering research covers composite structures, heat transfer and building performance.</p>
          <ol className="publication-list">
            {publications.map((p) => (
              <li key={p.id} className="publication-row">
                <time dateTime={p.date} className="publication-year">{p.date.slice(0, 4)}</time>
                <div className="publication-copy">
                  <p className="publication-venue">{p.journal ?? "Research study"}{p.volume ? ` / Volume ${p.volume}` : ""}</p>
                  <h3 className="publication-title"><a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}<span className="sr-only"> (opens in a new tab)</span></a></h3>
                  <p className="publication-summary">{p.summary}</p>
                  <p className="publication-authors">{p.authors.join(", ")}</p>
                  {p.doi && <a className="publication-doi" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">DOI: {p.doi}<span className="sr-only"> (opens in a new tab)</span></a>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": publications.map((p) => ({
          "@type": p.journal ? "ScholarlyArticle" : "CreativeWork",
          "@id": p.doi ? `https://doi.org/${p.doi}` : p.href,
          name: p.title,
          url: p.href,
          datePublished: p.date,
          description: p.summary,
          author: p.authors.map((name) => ({ "@type": "Person", name, ...(name === site.name ? { "@id": `${site.url}/#person` } : {}) })),
          ...(p.journal ? { isPartOf: { "@type": "Periodical", name: p.journal } } : {}),
          ...(p.doi ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi } } : {}),
        })),
      }).replace(/</g, "\\u003c") }} />
      <SiteFooter />
    </>
  );
}
