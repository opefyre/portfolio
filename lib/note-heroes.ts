import heroes from '@/content/note-heroes.json';

export type NoteHeroImage = {
  src: string;
  smallSrc: string;
  width: number;
  height: number;
  alt: string;
};

export function getNoteHero(slug: string): NoteHeroImage {
  const hero = (heroes as Record<string, NoteHeroImage>)[slug];
  if (!hero) throw new Error(`Missing reviewed Note hero: ${slug}`);
  return hero;
}
