import type { MetadataRoute } from "next";
import { site, works } from "@/content/site";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified = now): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified,
    priority,
  });
  return [
    page("/", 1),
    ...works.map((w) => page(`/work/${w.slug}/`, 0.8)),
    page("/about/", 0.7),
    page("/notes/", 0.7),
    ...getNotes().map((n) => page(`/notes/${n.slug}/`, 0.6, new Date(`${n.date}T12:00:00Z`))),
  ];
}
