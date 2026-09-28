/**
 * Curation for /work, /work/[slug] and /archive.
 *
 * Case-study copy comes from Firestore (problem / solution / impact). This
 * file only adds what the database can't express: display names, which
 * products get a gallery, captions for real screenshots, and the visual mark
 * used for each category. Same rule as content/site.ts — nothing invented.
 */
import type { Project } from "@/lib/data";
import { building, problems, type BuildingIdentity, type ProblemGlyph } from "./site";

/** Products in the order they appear on /work (Vrolen first). */
export const productOrder = [building.featured.slug, ...building.others.map((b) => b.slug)];

export type ProductCard = {
  slug: string;
  name: string;
  line: string;
  status: string;
  tone: "live" | "soon" | "wip";
  identity: BuildingIdentity;
  image: string;
  imageAlt: string;
  focus?: string;
};

export const productCards: ProductCard[] = [
  {
    slug: building.featured.slug,
    name: building.featured.name,
    line: building.featured.sentence,
    status: "Launching Nov 2026",
    tone: "soon",
    identity: "vrolen",
    image: building.featured.surfaces.back.src,
    imageAlt: building.featured.surfaces.back.alt,
    focus: "0% 0%",
  },
  ...building.others,
];

export type GalleryShot = { src: string; alt: string; caption: string; wide?: boolean };

/** Real screenshots, per product. Only products that have more than a thumbnail. */
export const galleries: Record<string, GalleryShot[]> = {
  vrolen: [
    {
      src: "/work/vrolen/editor-dark.webp",
      alt: "Vrolen simulation editor: stations for fillers, capper and QC connected as a production graph",
      caption: "The editor. A line described as connected stations — each one with its own cycle time, failures and scrap.",
      wide: true,
    },
    {
      src: "/work/vrolen/results.webp",
      alt: "Vrolen results after a simulation run: throughput, line efficiency and the bottleneck station",
      caption: "After a run: throughput, per-station OEE and where the line is actually losing time.",
      wide: true,
    },
  ],
  "elixiary-ai-bartender": [
    { src: "/elixiary/hero.webp", alt: "Elixiary home page with the AI cocktail generator", caption: "Marlow, the AI bartender, on the home page.", wide: true },
    { src: "/elixiary/collection.webp", alt: "Elixiary 'My Recipes' collection with AI-generated cocktails", caption: "Your own collection — generated and saved recipes, filterable by glass, style and flavour." },
    { src: "/elixiary/recipe-detail.webp", alt: "A generated Elixiary recipe: ingredients, instructions, garnish and equipment", caption: "A generated recipe, labelled “verify before serving”." },
    { src: "/elixiary/cocktail-cards.webp", alt: "Elixiary curated cocktail library cards", caption: "The curated library, by difficulty, glass and style." },
    { src: "/elixiary/blog-history.webp", alt: "Elixiary education hub with long-form essays", caption: "The education hub: essays, technique guides, ingredient deep-dives." },
  ],
};

/**
 * Vrolen's loop, from its own positioning: see how work actually flows, find
 * what matters, improve it — then verify the result held.
 */
export const vrolenLoop = [
  { step: "See", line: "how work actually flows" },
  { step: "Find", line: "what matters" },
  { step: "Improve", line: "in simulation, before the real line" },
  { step: "Verify", line: "the result held" },
];

const CATEGORY_GLYPH: Record<string, ProblemGlyph> = {
  "Data & Analytics": "signal",
  "Enterprise Systems": "flow",
  "Process Automation": "flow",
  "Process Optimization": "defects",
  "Operations & Strategy": "compress",
  "Software Development": "dialog",
  Product: "signal",
};

const curatedProblem = new Map(problems.map((p) => [p.slug, p]));
const product = new Map(productCards.map((p) => [p.slug, p]));

export function glyphFor(p: Project): ProblemGlyph {
  return curatedProblem.get(p.slug)?.glyph ?? CATEGORY_GLYPH[p.category] ?? "flow";
}

/** "Elixiary — AI Bartender" → "Elixiary", "MRP (SFP)" → "MRP". */
export function displayName(p: Project) {
  return p.title.split(" — ")[0].replace(/\s*\((SFP|BAT)\)\s*$/, "").trim();
}

/** The headline a case study leads with: a problem statement where we have one. */
export function headlineFor(p: Project) {
  return curatedProblem.get(p.slug)?.title ?? product.get(p.slug)?.line ?? p.description;
}

export function productCard(slug: string) {
  return product.get(slug);
}

export function isProduct(p: Project) {
  return p.category === "Product" && product.has(p.slug);
}

/** Where a curated problem happened (company · function), when we know it. */
export function whereFor(p: Project) {
  return curatedProblem.get(p.slug)?.where;
}

/** Company, where the record says so unambiguously (SFP modules are named in their slugs). */
export function companyFor(p: Project) {
  if (whereFor(p)) return whereFor(p);
  if (p.slug.startsWith("sfp-")) return "Smart Factory Planning · Product lead";
  return undefined;
}
