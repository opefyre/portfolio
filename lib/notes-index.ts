export type NotesIndexItem = {
  slug: string; title: string; summary: string; topic: string; keywords: string[];
  date: string; displayDate: string; readingMinutes: number; image: string;
};

const fold = (text: string) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export function filterNotes(notes: NotesIndexItem[], query: string, topic: string) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  return notes.filter(note => (topic === '' || note.topic === topic) && terms.every(term => fold([note.title, note.summary, note.topic, ...note.keywords].join(' ')).includes(term)));
}
