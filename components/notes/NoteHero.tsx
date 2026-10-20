import type { Note } from '@/lib/notes';
import type { NoteHeroImage } from '@/lib/note-heroes';
import { formatDate } from '@/lib/notes';
import { author, site } from '@/content/site';
import { TLink } from '@/components/shell/transitions';
import './NoteHero.css';

export function NoteHero({note, image}: {note: Note; image: NoteHeroImage}) {
  const length = note.title.length > 110 ? 'note-hero--very-long' : note.title.length > 78 ? 'note-hero--long' : '';
  return <header className={`note-hero ${length}`} aria-labelledby="note-title">
    <div className="note-hero-art">
      <img src={image.src} srcSet={`${image.smallSrc} 960w, ${image.src} ${image.width}w`} sizes="(max-width: 760px) 170vw, 88vw" width={image.width} height={image.height} alt={image.alt} loading="eager" fetchPriority="high" decoding="async" />
    </div>
    <div className="note-hero-copy">
      <TLink href="/notes/" className="note-hero-back"><span aria-hidden="true">←</span> All notes</TLink>
      {note.topic && <p className="note-hero-topic">{note.topic}</p>}
      <h1 id="note-title" className="note-hero-title">{note.title}</h1>
      <p className="note-hero-summary">{note.summary}</p>
      <div className="note-hero-byline">
        <TLink href="/about/" className="note-hero-author" rel="author">
          <img src={author.avatar} alt="" width={40} height={40} decoding="async" />
          <span><span className="note-hero-name">{site.name}</span><span className="note-hero-role">{author.line}</span></span>
        </TLink>
        <p className="note-hero-dates"><time dateTime={note.date}>{formatDate(note.date)}</time>{note.updated!==note.date && <span>Updated <time dateTime={note.updated}>{formatDate(note.updated)}</time></span>}<span>{note.readingMinutes} min read</span></p>
      </div>
    </div>
    <p className="note-hero-caption">Conceptual clay illustration</p>
  </header>;
}
