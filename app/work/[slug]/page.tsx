import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { CountUp } from "@/components/motion/CountUp";
import { SplitChars } from "@/components/motion/SplitChars";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ogImage, works } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.name,
    description: w.line,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: { title: w.name, description: w.line, type: "article", url: `/work/${slug}/`, images: [ogImage] },
    twitter: { card: "summary_large_image", title: w.name, description: w.line, images: [ogImage] },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const i = works.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = works[i];
  const next = works[(i + 1) % works.length];

  return (
    <>
      <article className="cs" data-nav-tone="dark" aria-labelledby="cs-title">
        <header className="cs-head frame">
          <TLink href="/#work" className="text-link cs-back">
            <span aria-hidden="true">←</span> Work
          </TLink>
          <h1 id="cs-title" className="cs-title">
            <SplitChars text={w.name} />
          </h1>
          <p className="cs-line">{w.line}</p>
          <p className="cs-meta">
            <span>{w.status}</span>
            {w.href && (
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="text-link">
                {w.hrefLabel} <span aria-hidden="true">↗</span>
              </a>
            )}
          </p>
        </header>

        <div className="cs-hero frame">
          <div className="cs-hero-media">
            <GLImage id={`work-${w.slug}`} src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} radius={12} priority />
            <LensAnchor id="case" className="cs-lens" sizeRatio={1} plateLines={0} plateHalo={0} thickness={0.8} />
          </div>
        </div>

        {w.stats.length > 0 && (
          <dl className="cs-stats frame">
            {w.stats.map((s) => (
              <div key={s.label} className="cs-stat">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="cs-stat-value" />
                  <span className="cs-stat-label" aria-hidden="true">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="cs-body frame">
          {w.body.map((p, k) => (
            <p key={k} className={k === 0 ? "cs-p cs-p--lead" : "cs-p"}>
              {p}
            </p>
          ))}
        </div>

        {w.gallery.length > 0 && (
          <div className="cs-gallery frame">
            {w.gallery.map((g, k) => (
              <GLImage
                key={g.src}
                id={`shot-${w.slug}-${k}`}
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                radius={10}
                className={w.gallery.length > 2 && (k === 1 || k === 2) ? "cs-shot cs-shot--half" : "cs-shot"}
              />
            ))}
          </div>
        )}

        <nav className="cs-next frame" aria-label="Next work">
          <TLink href={`/work/${next.slug}/`} keep={`work-${next.slug}`} className="cs-next-link">
            <span className="cs-next-label">Next</span>
            <span className="cs-next-name">{next.name}</span>
            <span className="cs-next-media">
              <GLImage id={`work-${next.slug}`} src={next.image.src} alt="" width={next.image.width} height={next.image.height} radius={8} />
            </span>
          </TLink>
        </nav>
      </article>
      <SiteFooter />
    </>
  );
}
