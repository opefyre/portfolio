import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ogImage, site } from "@/content/site";
import { formatDate, getNote, getNotes } from "@/lib/notes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.summary,
    keywords: n.keywords,
    alternates: { canonical: `/notes/${slug}/` },
    openGraph: { title: n.title, description: n.summary, type: "article", publishedTime: n.date, authors: [site.name], url: `/notes/${slug}/`, images: [ogImage] },
    twitter: { card: "summary_large_image", title: n.title, description: n.summary, images: [ogImage] },
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const notes = getNotes();
  const i = notes.findIndex((n) => n.slug === slug);
  if (i < 0) notFound();
  const n = notes[i];
  const next = notes[(i + 1) % notes.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: n.title,
    description: n.summary,
    datePublished: n.date,
    keywords: n.keywords.join(", "),
    image: `${site.url}${ogImage.url}`,
    author: { "@type": "Person", name: site.name, url: site.url, jobTitle: site.role, knowsAbout: site.expertise },
    mainEntityOfPage: `${site.url}/notes/${n.slug}/`,
  };

  return (
    <>
      <div className="paper" data-nav-tone="light">
        <article className="note frame">
          <header className="note-head">
            <TLink href="/notes/" className="text-link note-back">
              <span aria-hidden="true">←</span> Notes
            </TLink>
            <h1 className="note-title">{n.title}</h1>
            <p className="note-meta">
              <time dateTime={n.date}>{formatDate(n.date)}</time>
              <span>{n.readingMinutes} min read</span>
            </p>
          </header>
          <div className="prose" dangerouslySetInnerHTML={{ __html: n.html }} />
          <aside className="note-cta" aria-label="Work together">
            <p className="note-cta-title">Working on something like this?</p>
            <p className="note-cta-text">
              I work with operations and transformation teams on continuous improvement, operational excellence, supply
              chains and industrial AI. If this sounds like your line, your program or your problem, I&rsquo;d be glad to
              compare notes.
            </p>
            <p className="note-cta-links">
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </p>
          </aside>
          {next && next.slug !== n.slug && (
            <TLink href={`/notes/${next.slug}/`} className="note-next">
              <span className="note-next-label">Next</span>
              <span className="note-next-title">{next.title}</span>
            </TLink>
          )}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
      <SiteFooter />
    </>
  );
}
