import 'server-only';
import { formatDate, getNotes } from './notes';
import { getNoteHero } from './note-heroes';
import type { NotesIndexItem } from './notes-index';

export function getNotesIndex(): NotesIndexItem[] {
  return getNotes().map(n => ({slug:n.slug,title:n.title,summary:n.summary,topic:n.topic,keywords:n.keywords,date:n.date,displayDate:formatDate(n.date),readingMinutes:n.readingMinutes,image:getNoteHero(n.slug).smallSrc}));
}
