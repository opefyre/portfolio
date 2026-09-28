import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ogImage } from "@/content/site";
import { formatDate, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Notes by Abolfazl Shirkavand on operational excellence, continuous improvement, OEE, supply chains, digital transformation and AI in operations.",
  alternates: { canonical: "/notes/" },
  openGraph: { title: "Notes by Abolfazl Shirkavand", url: "/notes/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Notes by Abolfazl Shirkavand", images: [ogImage] },
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <>
      <div className="paper" data-nav-tone="light">
        <section className="notes-page frame" aria-labelledby="notes-title">
          <h1 id="notes-title" className="notes-title">
            Notes
          </h1>
          <p className="notes-intro">
            On operational excellence, continuous improvement, supply chains and digital transformation. Written from the
            floor, with the numbers and sources.
          </p>
          <ol className="note-rows note-rows--page">
            {notes.map((n) => (
              <li key={n.slug}>
                <TLink href={`/notes/${n.slug}/`} className="note-row">
                  <span className="note-row-main">
                    <span className="note-row-title">{n.title}</span>
                    <span className="note-row-summary">{n.summary}</span>
                  </span>
                  <span className="note-row-date">
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
