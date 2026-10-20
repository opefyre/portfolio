import type { Metadata } from "next";
import { NoteHero } from "@/components/notes/NoteHero";
import { getNoteHero } from "@/lib/note-heroes";
import { NoteArticleContent } from "@/components/notes/NoteArticleContent";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { SocialLinks } from "@/components/site/SocialLinks";
import { author, site } from "@/content/site";
import { getNote, getNotes } from "@/lib/notes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

type NoteCta = { title: string; text: string };

const vrolenCtas: Partial<Record<string, NoteCta>> = {
  "scaling-ai-manufacturing": {
    title: "Check the next plant before copying the proposal",
    text: "Bring one recurring production problem to Vrolen’s private pilot. Connect its records to a proposed change and check the assumptions before planning a wider rollout.",
  },
  "ai-supply-chain-planning": {
    title: "Test the change before committing",
    text: "Vrolen’s private pilot helps operations teams compare proposed changes and check whether the expected improvement held. Bring the capacity assumptions behind your planning decision.",
  },
  "smed-changeover-smaller-batches": {
    title: "What should your faster changeovers make possible?",
    text: "More output or more frequent runs? Vrolen helps operations teams model the process and compare proposed changes before trying them on the line.",
  },
  "value-stream-mapping-example": {
    title: "Which change would actually shorten your lead time?",
    text: "Take the current-state map into a model you can test. Vrolen helps teams compare changes to capacity, buffers and schedules, with the assumptions visible.",
  },
  "5-whys-example": {
    title: "Where is the loss really coming from?",
    text: "Vrolen helps teams follow losses across the operation and test whether a proposed explanation fits the system. Confirm the cause with evidence from the process.",
  },
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  const hero = getNoteHero(slug);
  return {
    title: n.seoTitle,
    description: n.seoDescription,
    keywords: n.keywords,
    alternates: { canonical: `/notes/${slug}/` },
    authors: [{ name: site.name, url: `${site.url}/about/` }],
    openGraph: {
      title: n.seoTitle,
      description: n.seoDescription,
      type: "article",
      publishedTime: n.date,
      modifiedTime: n.updated,
      authors: [`${site.url}/about/`],
      section: n.topic || undefined,
      tags: n.keywords,
      url: `/notes/${slug}/`,
      images: [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }],
    },
    twitter: { card: "summary_large_image", title: n.seoTitle, description: n.seoDescription, images: [{ url: hero.src, alt: hero.alt }] },
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const notes = getNotes();
  const i = notes.findIndex((n) => n.slug === slug);
  if (i < 0) notFound();
  const n = notes[i];
  const next = notes[(i + 1) % notes.length];
  const cta = vrolenCtas[n.slug];
  const hero = getNoteHero(n.slug);

  const url = `${site.url}/notes/${n.slug}/`;
  const personId = `${site.url}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: n.title,
        description: n.summary,
        url,
        mainEntityOfPage: url,
        datePublished: n.date,
        dateModified: n.updated,
        inLanguage: "en",
        ...(n.topic ? { articleSection: n.topic, about: { "@type": "Thing", name: n.topic } } : {}),
        keywords: n.keywords.join(", "),
        wordCount: n.words,
        timeRequired: `PT${n.readingMinutes}M`,
        isAccessibleForFree: true,
        image: `${site.url}${hero.src}`,
        author: { "@id": personId },
        publisher: { "@id": personId },
        isPartOf: { "@type": "Blog", "@id": `${site.url}/notes/#blog`, name: "Notes by Abolfazl Shirkavand", url: `${site.url}/notes/` },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.nickname,
        url: site.url,
        image: `${site.url}${author.avatar}`,
        jobTitle: site.role,
        description: author.bio,
        worksFor: { "@type": "Organization", name: "Vrolen", url: "https://vrolen.com" },
        knowsAbout: site.expertise,
        sameAs: [site.linkedin, site.instagram, site.github],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Notes", item: `${site.url}/notes/` },
          { "@type": "ListItem", position: 3, name: n.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <div className="paper" data-nav-tone="light">
        <article className="note note--with-hero">
          <NoteHero note={n} image={hero} />
          <div className="note-article-frame frame">
            <div className="note-layout">
              {n.toc.length > 0 && (
                <nav className="note-toc" aria-label="Contents">
                  <p className="note-toc-title">Contents</p>
                  <ol>
                    {n.toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="note-body">
                <NoteArticleContent html={n.html} />

                {next && next.slug !== n.slug && (
                  <TLink href={`/notes/${next.slug}/`} className="note-next">
                    <span className="note-next-label">Next</span>
                    <span className="note-next-title">{next.title}</span>
                  </TLink>
                )}
              </div>
            </div>
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
      <section className="note-cta" data-nav-tone="dark" aria-labelledby="note-cta-title">
        <div className="frame note-cta-inner">
          <div className="note-cta-copy">
            <h2 id="note-cta-title" className="note-cta-title">
              {cta?.title ?? "Working on something like this?"}
            </h2>
            <p className="note-cta-text">
              {cta ? cta.text : (
                <>
                  I work with operations and transformation teams on operational excellence, digital transformation programs,
                  supply chains and industrial AI. If this sounds like your line, your program or your problem, I&rsquo;d be
                  glad to compare notes.
                </>
              )}
            </p>
            <div className="note-cta-links">
              {cta ? (
                <a href="https://vrolen.com/" target="_blank" rel="noopener noreferrer" className="text-link">
                  Explore Vrolen&rsquo;s private pilot <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <>
                  <a href={`mailto:${site.email}`} className="text-link">
                    {site.email}
                  </a>
                  <SocialLinks only={["linkedin", "instagram"]} />
                </>
              )}
            </div>
          </div>
          <div className="note-cta-media">
            <GLImage id="note-cta-portrait" src={author.avatar} alt={site.name} width={480} height={480} radius={999} />
            <LensAnchor id="note-cta" className="note-cta-lens" sizeRatio={1} plateLines={0} plateHalo={0.5} thickness={0.75} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
