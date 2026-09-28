import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import { PageHead } from "@/components/site/PageHead";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { formatDate, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes by Abolfazl Shirkavand (Abosh) on continuous improvement, operations and building software.",
  alternates: { canonical: "/notes/" },
  openGraph: { title: "Notes — Abolfazl Shirkavand", url: "/notes/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Notes — Abolfazl Shirkavand", images: [ogImage] },
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <>
      <div className="paper">
        <PageHead
          tone="light"
          lens={false}
          kicker={<>Notes &nbsp;·&nbsp; {notes.length}</>}
          title="Notes"
          lead={<p>On improvement, operations and building software. Written slowly, revised when I learn something.</p>}
        />
        <section className="section notes-index" data-nav-tone="light" aria-label="All notes">
          <div className="frame">
            <ol className="notes-list">
              {notes.map((n, i) => (
                <li key={n.slug}>
                  <TLink href={`/notes/${n.slug}/`} className="notes-row">
                    <span className="notes-row-num t-mono">{String(notes.length - i).padStart(2, "0")}</span>
                    <span className="notes-row-main">
                      <span className="notes-row-title">{n.title}</span>
                      <span className="notes-row-summary">{n.summary}</span>
                    </span>
                    <span className="notes-row-meta t-mono">
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                      <span>{n.readingMinutes} min</span>
                    </span>
                  </TLink>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
      <SiteFooter index="—" />
    </>
  );
}
