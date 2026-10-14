import type { Metadata } from "next";
import { NotesField } from "@/components/notes/NotesField";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ogImage } from "@/content/site";
import { formatDate, getNotes } from "@/lib/notes";

const description = "Practical guides to operations, supply chains, Lean Six Sigma and AI by Abolfazl Shirkavand, with worked examples, interactive charts and sources.";

export const metadata: Metadata = {
  title: "Operations & supply chain notes",
  description,
  alternates: { canonical: "/notes/" },
  openGraph: { title: "Operations & supply chain notes", description, type: "website", url: "/notes/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Operations & supply chain notes", description, images: [ogImage] },
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <>
      <div className="paper notes-index" data-nav-tone="light">
        <NotesField />
        <section className="notes-index-list frame" id="latest" aria-labelledby="latest-title">
          <header className="notes-index-head">
            <h2 id="latest-title">Latest writing</h2>
            <p>{notes.length} notes</p>
          </header>
          <ol className="note-rows note-rows--page">
            {notes.map((n) => (
              <li key={n.slug}>
                <TLink href={`/notes/${n.slug}/`} className="note-row">
                  <span className="note-row-main">
                    <span className="note-row-title">{n.title}</span>
                    <span className="note-row-summary">{n.summary}</span>
                  </span>
                  <span className="note-row-date">
                    {n.topic && <span className="note-row-topic">{n.topic}</span>}
                    <time dateTime={n.date}>{formatDate(n.date)}</time>
                    <span>{n.readingMinutes} min</span>
                  </span>
                </TLink>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
