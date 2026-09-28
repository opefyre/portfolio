import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/data";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const notes = getNotes();
  const now = new Date();
  const page = (path: string, priority: number, lastModified = now): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified,
    priority,
  });
  return [
    page("/", 1),
    page("/work/", 0.9),
    page("/about/", 0.8),
    page("/notes/", 0.7),
    page("/archive/", 0.5),
    ...projects.map((p) => page(`/work/${p.slug}/`, p.category === "Product" ? 0.8 : 0.5)),
    ...notes.map((n) => page(`/notes/${n.slug}/`, 0.6, new Date(`${n.date}T12:00:00Z`))),
  ];
}
