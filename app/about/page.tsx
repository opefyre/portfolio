import type { Metadata } from "next";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { TLink } from "@/components/shell/transitions";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialLinks } from "@/components/site/SocialLinks";
import { about, careerTitles, ogImage, sfpExperience, site } from "@/content/site";
import { publications, scholarProfile } from "@/content/publications";
import { getCertifications, getExperiences } from "@/lib/data";

const description = "Abolfazl Shirkavand is an engineer based in Frankfurt. He works on factory software at Smart Factory Planning and is building Vrolen.";

export const metadata: Metadata = {
  title: "About Abolfazl Shirkavand",
  description,
  alternates: { canonical: "/about/" },
  openGraph: { title: "About Abolfazl Shirkavand", description, type: "website", url: "/about/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "About Abolfazl Shirkavand", description, images: [ogImage] },
};

export default async function AboutPage() {
  const [experiences, certifications] = await Promise.all([getExperiences(), getCertifications()]);
  const rows = experiences.map((e) => ({
    id: e.id,
    company: e.company.replace(/\s*\(.*\)\s*$/, ""),
    positions: e.positions.map((position) => ({
      title: careerTitles[position.title] ?? position.title,
      period: position.period.replace(/\s+[–—]\s+/, " to "),
    })),
  }));

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
              {about.title}
            </h1>
            <p className="about-p">
              I’m an engineer based in Frankfurt. I started at <TLink href="/#unilever-projects" className="text-link" documentNavigation>Unilever</TLink>, working with factory teams to make production more reliable and efficient. I worked on projects to shorten changeovers and reduce downtime, built reports that made it easier to track line performance, and helped commission a new production line.
            </p>
            <p className="about-p">
              I joined <TLink href="/#bat-projects" className="text-link" documentNavigation>British American Tobacco</TLink> through its Global Graduate Programme. I rotated through departments to learn how the business worked and prepare for a management role. I built an Excel tool for warehouse teams to share stock updates and a reporting tool for engineers to track maintenance and line performance. I also built a tool that helped the spare parts warehouse keep more accurate stock records and order parts more efficiently, and helped commission a new production line.
            </p>
            <p className="about-p">
              After my promotion to New Product Introduction Manager, I managed the supply chain work behind changes to the product range. I took new products from development through launch and scale-up and brought in new suppliers and raw materials. I worked with each team to agree what had to be ready before a launch could move ahead. That helped cut <TLink href="/notes/busy-machines-slower-orders/" className="text-link">launch lead time from about five months to two</TLink>.
            </p>
            <p className="about-p">
              At <TLink href="/#snoonu-projects" className="text-link" documentNavigation>Snoonu</TLink>, I led digital transformation across the company. I managed a team of developers and digital transformation managers and oversaw more than 50 projects. We worked with departments to simplify everyday processes, connect their systems and decide where automation or AI could save people time.
            </p>
            <p className="about-p">
              That work ranged from payroll and expense automation to tools for teams running live operations. I designed a call-centre dashboard that showed wait times and staffing, and a tool that let staff report stock shortages and see what was available instead. I also built parts of several tools myself and worked with the team to get them into use.
            </p>
            <p className="about-p">
              At <TLink href="/#sfp-projects" className="text-link" documentNavigation>Smart Factory Planning</TLink>, I lead product development for manufacturers. I work with factory teams to understand how they plan production and run their lines, then with engineers to build, test and roll out software they can use on the floor. The tools we’ve launched help teams schedule production, plan materials, track downtime and see where operators need training. We’re also developing ways to collect machine data with sensors and detect motion with cameras.
            </p>
            <p className="about-p">
              I also build my own software. I write and test the code, set up the infrastructure and use AI tools as part of that work. One of those projects is <TLink href="/work/vrolen/" className="text-link">Vrolen</TLink>. I’m building it to help teams find where work gets stuck and see whether a change is still saving time months later.
            </p>
            <p className="about-p about-edu">{about.education}</p>
            <p className="about-p about-certs">
              Certifications include {certifications.map((c) => c.name).join(", ")}.
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
              <li key={r.id} className="career-row">
                <span className="career-company">{r.company}</span>
                <ul className="career-positions">
                  {r.positions.map((position) => (
                    <li key={position.title}>
                      <span className="career-role">{position.title}</span>
                      <span className="career-when">{position.period}</span>
                    </li>
                  ))}
                </ul>
                {r.id === "smart-factory-planning" && (
                  <ul className="career-description">
                    {sfpExperience.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
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
          <p className="publications-intro">I’ve co-authored three studies on how composite cylinders buckle and how heat moves through tissue and buildings.</p>
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
