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
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/notes/${n.slug}/`,
  };

  return (
    <>
      <div className="paper">
        <article className="note" data-nav-tone="light">
          <header className="note-head frame">
            <nav className="t-mono note-crumbs" aria-label="Breadcrumb">
              <TLink href="/notes/">Notes</TLink>
              <span aria-hidden="true">/</span>
              <time dateTime={n.date}>{formatDate(n.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{n.readingMinutes} min read</span>
            </nav>
            <h1 className="note-h1">{n.title}</h1>
            <p className="note-dek">{n.summary}</p>
          </header>
          <div className="note-body frame">
            <div className="prose" dangerouslySetInnerHTML={{ __html: n.html }} />
            <p className="note-sign t-mono">
              — {site.nickname}, {site.location.split(",")[0]}
            </p>
          </div>
          {next && next.slug !== n.slug && (
            <nav className="note-next frame" aria-label="Next note">
              <TLink href={`/notes/${next.slug}/`} className="note-next-link">
                <span className="t-label">Next note</span>
                <span className="note-next-title">{next.title}</span>
              </TLink>
            </nav>
          )}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
      <SiteFooter index="—" />
    </>
  );
}
