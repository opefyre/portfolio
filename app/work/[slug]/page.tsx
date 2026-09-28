import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemGlyph } from "@/components/home/ProblemGlyph";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ogImage, problems } from "@/content/site";
import { companyFor, displayName, galleries, glyphFor, headlineFor, productCard, productOrder, vrolenLoop, whereFor } from "@/content/work";
import { getProject, getProjects, type Project } from "@/lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  const title = productCard(slug)?.name ?? displayName(p);
  return {
    title,
    description: p.description,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: { title, description: p.description, type: "article", url: `/work/${slug}/`, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description: p.description, images: [ogImage] },
  };
}

/** Next case study within the same kind of work (products → products, …), wrapping around. */
function nextOf(p: Project, all: Project[]) {
  const curated = problems.map((x) => x.slug);
  let ring: string[];
  if (productOrder.includes(p.slug)) ring = productOrder;
  else if (curated.includes(p.slug)) ring = curated;
  else ring = all.filter((x) => !productOrder.includes(x.slug) && !curated.includes(x.slug)).map((x) => x.slug);
  const i = ring.indexOf(p.slug);
  const slug = ring[(i + 1) % ring.length];
  return all.find((x) => x.slug === slug);
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const all = await getProjects();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();

  const card = productCard(slug);
  const where = whereFor(p);
  const gallery = galleries[slug];
  const next = nextOf(p, all);
  const hero = gallery?.[0] ?? (card ? { src: card.image, alt: card.imageAlt, caption: "" } : undefined);
  const shipped = !card || card.tone === "live";

  // Products lead with their name; problems lead with the problem.
  const kicker = card ? p.category : displayName(p);
  const title = card ? card.name : where ? headlineFor(p) : displayName(p);
  const dek = card ? card.line : p.description;

  return (
    <>
    <article className="cs" data-identity={card?.identity ?? "problem"}>
      <header className="cs-head" data-nav-tone="dark">
        <div className="frame cs-head-frame">
          <div className="cs-head-copy">
            <nav className="cs-crumbs t-mono" aria-label="Breadcrumb">
              <TLink href="/work/">Work</TLink>
              <span aria-hidden="true">/</span>
              <span>{kicker}</span>
            </nav>
            <h1 className={card ? "cs-title cs-title--name" : "cs-title"}>{title}</h1>
            <p className="cs-dek">{dek}</p>
            <dl className="cs-meta">
              <div>
                <dt className="t-label">Area</dt>
                <dd>{p.category}</dd>
              </div>
              {companyFor(p) && (
                <div>
                  <dt className="t-label">Where</dt>
                  <dd>{companyFor(p)}</dd>
                </div>
              )}
              {(card?.status ?? p.status) && (
                <div>
                  <dt className="t-label">Status</dt>
                  <dd>
                    {card && <span className="dot" data-tone={card.tone} aria-hidden="true" />} {card?.status ?? p.status}
                  </dd>
                </div>
              )}
              {p.link && (
                <div>
                  <dt className="t-label">Link</dt>
                  <dd>
                    <a href={p.link} className="underline-draw" target="_blank" rel="noopener noreferrer">
                      {p.link.replace(/^https?:\/\//, "")} ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <LensAnchor id="case" className="cs-lens" sizeRatio={0.8} plateLines={0.5} plateHalo={0.8} darkness={0.05} />
        </div>
      </header>

      {hero ? (
        <figure className="cs-hero frame">
          <div className="cs-hero-mat tile-frame" data-identity={card?.identity}>
            <img
              src={hero.src}
              alt={hero.alt}
              decoding="async"
              fetchPriority="high"
              style={{ viewTransitionName: `work-${slug}` }}
            />
          </div>
          {hero.caption && <figcaption className="cs-caption t-mono">Fig. 01 — {hero.caption}</figcaption>}
        </figure>
      ) : (
        <figure className="cs-plate frame" aria-hidden="true">
          <div className="cs-plate-inner">
            <ProblemGlyph type={glyphFor(p)} />
          </div>
          <figcaption className="cs-caption t-mono">Fig. 01 — {p.category}</figcaption>
        </figure>
      )}

      <div className="cs-body frame">
        <section className="cs-chapter" aria-labelledby="ch-problem">
          <p className="cs-num t-mono">01</p>
          <h2 id="ch-problem" className="cs-chapter-title">
            The problem
          </h2>
          <p className="cs-text cs-text--lead">{p.problem}</p>
        </section>

        <section className="cs-chapter" aria-labelledby="ch-work">
          <p className="cs-num t-mono">02</p>
          <h2 id="ch-work" className="cs-chapter-title">
            {card ? "What I built" : "What I did"}
          </h2>
          <p className="cs-text">{p.solution}</p>
        </section>

        {slug === "vrolen" && (
          <section className="cs-loop" aria-label="The loop Vrolen closes">
            <ol>
              {vrolenLoop.map((s, i) => (
                <li key={s.step}>
                  <span className="t-mono cs-loop-i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cs-loop-step">{s.step}</span>
                  <span className="cs-loop-line">{s.line}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {gallery && gallery.length > 1 && (
          <section className="cs-gallery" aria-label="Screens">
            {gallery.slice(1).map((g, i) => (
              <figure key={g.src} className={g.wide ? "cs-shot cs-shot--wide" : "cs-shot"}>
                <div className="cs-shot-mat" data-identity={card?.identity}>
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption className="cs-caption t-mono">
                  Fig. {String(i + 2).padStart(2, "0")} — {g.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        <section className="cs-chapter" aria-labelledby="ch-impact">
          <p className="cs-num t-mono">03</p>
          <h2 id="ch-impact" className="cs-chapter-title">
            {shipped ? "What changed" : "Where it stands"}
          </h2>
          <p className="cs-text cs-text--impact">{p.impact}</p>
        </section>

        {p.skills.length > 0 && (
          <section className="cs-chapter" aria-labelledby="ch-kit">
            <p className="cs-num t-mono">04</p>
            <h2 id="ch-kit" className="cs-chapter-title">
              Toolkit
            </h2>
            <ul className="cs-skills">
              {p.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {next && next.slug !== slug && (
        <nav className="cs-next frame" aria-label="Next case study">
          <TLink href={`/work/${next.slug}/`} className="cs-next-link">
            <span className="t-label">Next</span>
            <span className="cs-next-title">{productCard(next.slug)?.name ?? (whereFor(next) ? headlineFor(next) : displayName(next))}</span>
            <span className="cs-next-arrow" aria-hidden="true">
              →
            </span>
          </TLink>
        </nav>
      )}
    </article>
    <SiteFooter index="—" />
    </>
  );
}
