import { TLink } from "@/components/shell/transitions";
import { formatDate, type Note } from "@/lib/notes";

export function HomeNotes({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;
  return (
    <section id="notes" className="home-notes" data-nav-tone="light" aria-labelledby="home-notes-title">
      <div className="frame">
        <div className="home-notes-head">
          <h2 id="home-notes-title" className="h-section">
            Notes
          </h2>
          <TLink href="/notes/" className="text-link">
            All notes <span aria-hidden="true">→</span>
          </TLink>
        </div>
        <ol className="note-rows">
          {notes.slice(0, 3).map((n) => (
            <li key={n.slug}>
              <TLink href={`/notes/${n.slug}/`} className="note-row">
                <span className="note-row-title">{n.title}</span>
                <time className="note-row-date" dateTime={n.date}>
                  {formatDate(n.date)}
                </time>
              </TLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
