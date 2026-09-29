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
 *   updated: 2026-10-02            (optional)
 *   status: draft | published
 *   keywords: comma, separated, terms
 *   ---
 *
 * Block extensions. One-liners:
 *
 *   ::figure <name> | <caption>          inline SVG from content/notes/figures/<name>.svg
 *   ::image </public/path> | <alt> | <caption>
 *
 * Containers (Markdown inside, closed by a line with just :::):
 *
 *   :::card <title>                      a highlighted card: a summary, a rule of thumb
 *   :::formula <title>                   formulas, one per line
 *   :::grid                              a Markdown list shown as a grid of small cards
 *   :::link <href> | <label>             a card that is one big link (tools, Vrolen, contact)
 *
 * Every h2 gets an id, and notes with four or more get a contents list.
 */
export type Note = {
  slug: string;
  title: string;
  date: string;
  /** Last meaningful edit (frontmatter `updated`), defaults to `date`. */
  updated: string;
  summary: string;
  status: "draft" | "published";
  html: string;
  readingMinutes: number;
  words: number;
  keywords: string[];
  topic: string;
  toc: { id: string; text: string }[];
};

const DIR = path.join(process.cwd(), "content", "notes");
const FIGURES = path.join(DIR, "figures");

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const inline = (md: string) => marked.parseInline(md, { async: false }) as string;
const block = (md: string) => (marked.parse(md, { async: false, gfm: true }) as string).replace(/\s*\n\s*/g, " ").trim();
const external = (href: string) => /^https?:/.test(href);

/** Expand ::: containers into single-line HTML blocks, so Markdown passes them through untouched. */
function expandContainers(body: string) {
  return body.replace(/^:::(card|formula|grid|link)[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm, (_, kind: string, arg: string, inner: string) => {
    arg = arg.trim();
    if (kind === "card") {
      return `\n<aside class="note-card">${arg ? `<p class="note-card-title">${inline(arg)}</p>` : ""}${block(inner)}</aside>\n`;
    }
    if (kind === "formula") {
      const lines = inner.split("\n").map((l) => l.trim()).filter(Boolean);
      return `\n<div class="note-formula" role="group"${arg ? ` aria-label="${escapeHtml(arg)}"` : ""}>${arg ? `<p class="note-formula-title">${inline(arg)}</p>` : ""}${lines.map((l) => `<p class="note-formula-line">${inline(l)}</p>`).join("")}</div>\n`;
    }
    if (kind === "grid") {
      return `\n<div class="note-grid">${block(inner)}</div>\n`;
    }
    const [href, label] = arg.split("|").map((x) => x.trim());
    const attrs = external(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `\n<a class="note-link" href="${escapeHtml(href)}"${attrs}><span class="note-link-label">${inline(label ?? href)}<span aria-hidden="true">${external(href) ? " ↗" : " →"}</span></span><span class="note-link-text">${inline(inner.trim())}</span></a>\n`;
  });
}

/** Expand ::figure and ::image lines into <figure> blocks (kept on one line so Markdown passes them through). */
function expandBlocks(body: string) {
  return expandContainers(body)
    .replace(/^::figure\s+([\w-]+)\s*\|\s*(.+)$/gm, (_, name: string, caption: string) => {
      const svg = readFileSync(path.join(FIGURES, `${name}.svg`), "utf8").replace(/\s*\n\s*/g, " ").trim();
      return `\n<figure class="note-figure">${svg}<figcaption>${escapeHtml(caption.trim())}</figcaption></figure>\n`;
    })
    .replace(/^::image\s+(\S+)\s*\|\s*([^|]+?)\s*\|\s*(.+)$/gm, (_, src: string, alt: string, caption: string) => {
      return `\n<figure class="note-figure note-figure--image"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(caption.trim())}</figcaption></figure>\n`;
    });
}

/** Plain text of a rendered heading, for the contents list (React escapes it again when rendering). */
function headingText(html: string) {
  let text = html;
  for (let prev = ""; prev !== text; ) {
    prev = text;
    text = text.replace(/<[^<>]*>/g, "");
  }
  const entities: Record<string, string> = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&amp;": "&" };
  return text.replace(/&(?:lt|gt|quot|#39|amp);/g, (e) => entities[e]);
}

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
  const words = body.replace(/^::.*$/gm, "").split(/\s+/).length;
  const toc: Note["toc"] = [];
  const html = (marked.parse(expandBlocks(body), { async: false, gfm: true }) as string).replace(
    /<h2>([\s\S]*?)<\/h2>/g,
    (_, inner: string) => {
      const text = headingText(inner);
      const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      let id = base;
      for (let n = 2; toc.some((t) => t.id === id); n++) id = `${base}-${n}`;
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    },
  );
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    date: meta.date ?? "",
    updated: meta.updated ?? meta.date ?? "",
    summary: meta.summary ?? "",
    status: meta.status === "published" ? "published" : "draft",
    html,
    readingMinutes: Math.max(1, Math.ceil(words / 230)),
    words,
    keywords: (meta.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
    topic: meta.topic ?? "",
    toc: toc.length >= 4 ? toc.filter((t) => t.id !== "sources") : [],
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
