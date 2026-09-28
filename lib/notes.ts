import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { marked } from "marked";

/**
 * Notes are Markdown files in content/notes with a tiny frontmatter block:
 *
 *   ---
 *   title: …
 *   date: 2026-09-28
 *   summary: …
 *   status: draft | published
 *   ---
 */
export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  status: "draft" | "published";
  html: string;
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content", "notes");

function parse(file: string): Note {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`Note ${file} is missing frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m[2].trim();
  const words = body.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    date: meta.date ?? "",
    summary: meta.summary ?? "",
    status: meta.status === "published" ? "published" : "draft",
    html: marked.parse(body, { async: false, gfm: true }) as string,
    readingMinutes: Math.max(1, Math.ceil(words / 230)),
  };
}

export const getNotes = cache((): Note[] =>
  readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)),
);

export const getNote = cache((slug: string) => getNotes().find((n) => n.slug === slug));

export function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
