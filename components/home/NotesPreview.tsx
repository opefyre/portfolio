import { TLink } from "@/components/shell/transitions";
import { formatDate, type Note } from "@/lib/notes";

export function NotesPreview({ notes }: { notes: Note[] }) {
  const [lead, ...rest] = notes;
  return (
    <section id="notes" className="section notes-preview" data-nav-tone="light" aria-labelledby="notes-title">
      <div className="frame">
        <p className="section-index">
          <span>07</span>
        </p>
        <div className="notes-head">
          <h2 id="notes-title" className="t-h2">
            Notes
          </h2>
          <p className="t-lead">On improvement, operations and building software.</p>
        </div>
        <div className="notes-grid">
          {lead && (
            <TLink href={`/notes/${lead.slug}/`} className="note-card note-card--lead">
              <p className="t-mono note-meta">
                {formatDate(lead.date)} · {lead.readingMinutes} min
              </p>
              <h3 className="note-title">{lead.title}</h3>
              <p className="note-summary">{lead.summary}</p>
              <span className="link-arrow note-read">
                Read <span className="arrow" aria-hidden="true">→</span>
              </span>
            </TLink>
          )}
          <div className="notes-stack">
            {rest.map((n) => (
              <TLink key={n.slug} href={`/notes/${n.slug}/`} className="note-card">
                <p className="t-mono note-meta">
                  {formatDate(n.date)} · {n.readingMinutes} min
                </p>
                <h3 className="note-title">{n.title}</h3>
                <p className="note-summary">{n.summary}</p>
              </TLink>
            ))}
          </div>
        </div>
        <TLink href="/notes/" className="link-arrow notes-all">
          All notes <span className="arrow" aria-hidden="true">→</span>
        </TLink>
      </div>
    </section>
  );
}
