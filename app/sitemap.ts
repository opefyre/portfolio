import type { MetadataRoute } from "next";
import { ogImage, site, works } from "@/content/site";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];
const abs = (path: string) => `${site.url}${path}`;

/** Images referenced by a note (::image lines), so they can appear in image search. */
function noteImages(html: string) {
  return [...html.matchAll(/<img src="([^"]+)"/g)].map((m) => (m[1].startsWith("http") ? m[1] : abs(m[1])));
}

/**
 * Every public page, generated from content, so new works and notes appear
 * automatically. /lab is excluded (dev only, disallowed in robots.txt).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const notes = getNotes();
  const latestNote = notes.length ? new Date(`${notes[0].date}T12:00:00Z`) : now;

  const home: Entry = {
    url: abs("/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    images: [abs(ogImage.url), ...works.filter((w) => w.featured).map((w) => abs(w.image.src))],
  };

  const workPages: Entry[] = works.map((w) => ({
    url: abs(`/work/${w.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: w.featured ? 0.8 : 0.7,
    images: [w.image, ...w.gallery].map((g) => abs(g.src)),
  }));

  const about: Entry = {
    url: abs("/about/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [abs("/about/portrait.webp")],
  };

  const notesIndex: Entry = {
    url: abs("/notes/"),
    lastModified: latestNote,
    changeFrequency: "weekly",
    priority: 0.7,
  };

  const notePages: Entry[] = notes.map((n) => {
    const images = noteImages(n.html);
    return {
      url: abs(`/notes/${n.slug}/`),
      lastModified: new Date(`${n.date}T12:00:00Z`),
      changeFrequency: "yearly",
      priority: 0.8,
      ...(images.length ? { images } : {}),
    };
  });

  return [home, ...workPages, about, notesIndex, ...notePages];
}
