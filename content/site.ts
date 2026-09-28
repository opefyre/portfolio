/**
 * Editorial layer for abosh.io.
 *
 * Firestore stays the source of truth for projects, experiences, education
 * and profile data. This file holds the *curation* on top of it: what the
 * homepage features, in which order, and the short editorial lines.
 *
 * Rule: every fact here must trace back to Firestore content, the LinkedIn
 * profile text supplied by Abolfazl, or an asset in this repo. No invented
 * metrics, clients or anecdotes.
 */

export const site = {
  url: "https://abosh.io",
  name: "Abolfazl Shirkavand",
  nickname: "Abosh",
  role: "Founder, Vrolen",
  email: "hello@abosh.io",
  location: "Lisbon, Portugal",
  /** Lisbon — shown as marginalia in the hero. */
  coordinates: "38.7223° N, 9.1393° W",
  linkedin: "https://www.linkedin.com/in/abolfazl-shirkavand/",
  github: "https://github.com/opefyre",
  description:
    "Abolfazl Shirkavand (Abosh) builds products, systems and companies — across physical products, operations, software and AI. Founder of Vrolen.",
} as const;

/** Share image (app/opengraph-image.jpg — a capture of the real hero render). */
export const ogImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Abolfazl Shirkavand — I build products, systems and companies.",
};

export const hero = {
  statement: "I build products, systems and companies.",
  disciplines: ["Product", "Operations", "AI", "Physical Products"],
} as const;

/* ------------------------------------------------------------------------ */
/* 02 — Things I'm building                                                  */
/* ------------------------------------------------------------------------ */

export type BuildingIdentity = "vrolen" | "amber" | "verde" | "terminal" | "graphite" | "paper";

export type BuildingItem = {
  slug: string;
  name: string;
  line: string;
  status: string;
  /** Status dot tone. */
  tone: "live" | "soon" | "wip";
  identity: BuildingIdentity;
  image: string;
  imageAlt: string;
  /** object-position for the crop inside its frame */
  focus?: string;
};

export const building = {
  featured: {
    slug: "vrolen",
    name: "Vrolen",
    sentence:
      "A continuous-improvement operating layer: see how work actually flows, find what matters, improve it — then verify the result held.",
    meta: ["Founder", "Since Jun 2026", "Industrial AI", "Launching Nov 2026"],
    surfaces: {
      back: { src: "/work/vrolen/editor-dark.webp", alt: "Vrolen simulation editor: a production line of stations — fillers, capper, QC — modelled as a graph" },
      front: { src: "/work/vrolen/results.webp", alt: "Vrolen results panel after a simulation run: throughput, line efficiency, bottleneck" },
    },
  },
  others: [
    {
      slug: "elixiary-ai-bartender",
      name: "Elixiary",
      line: "An AI bartender that mixes from what's actually in your cabinet.",
      status: "Live",
      tone: "live",
      identity: "amber",
      image: "/elixiary/hero.webp",
      imageAlt: "Elixiary home page on desktop",
      focus: "0% 30%",
    },
    {
      slug: "finkavo",
      name: "Finkavo",
      line: "Sourced, bilingual tax guidance for people living in Portugal.",
      status: "Launching Sep 2026",
      tone: "soon",
      identity: "verde",
      image: "/work/finkavo/thumbnail.webp",
      imageAlt: "Finkavo mobile screens: sign-in, AI tax assistant and deadline calendar",
      focus: "20% 50%",
    },
    {
      slug: "freeloader-coder",
      name: "Freeloader Coder",
      line: "Autonomous coding behind a review quorum — with zero paid API spend.",
      status: "In progress",
      tone: "wip",
      identity: "terminal",
      image: "/work/freeloader-coder/thumbnail.webp",
      imageAlt: "Freeloader Coder pipeline workspace: review quorum and bounded self-healing panels",
      focus: "70% 40%",
    },
    {
      slug: "household-app",
      name: "Household",
      line: "A private, local-AI operating system for family life.",
      status: "In progress",
      tone: "wip",
      identity: "graphite",
      image: "/work/household-app/thumbnail.webp",
      imageAlt: "Household app dashboard with calendar, tasks and live family location",
      focus: "30% 40%",
    },
    {
      slug: "pmp-learning-app",
      name: "PMP Study",
      line: "The study system I built to pass my own PMP.",
      status: "Live · private",
      tone: "live",
      identity: "paper",
      image: "/work/pmp-learning-app/thumbnail.webp",
      imageAlt: "PMP study app screens: learning path, exam simulator and readiness score",
      focus: "40% 40%",
    },
  ] satisfies BuildingItem[],
};

/* ------------------------------------------------------------------------ */
/* 03 — Some problems I've worked on                                          */
/* ------------------------------------------------------------------------ */

export type ProblemGlyph = "signal" | "gantt" | "compress" | "flow" | "dialog" | "defects";

export const problems: {
  slug: string;
  title: string;
  where: string;
  glyph: ProblemGlyph;
}[] = [
  { slug: "sfp-real-time-monitoring", title: "Seeing a machine stop while it's still stopped", where: "Smart Factory Planning · Product lead", glyph: "signal" },
  { slug: "sfp-shop-floor-planning", title: "Scheduling a shop floor without the spreadsheet", where: "Smart Factory Planning · Product lead", glyph: "gantt" },
  { slug: "npi-readiness-scale-up-execution-framework", title: "Launching a product in two months instead of five", where: "British American Tobacco · Supply chain NPI", glyph: "compress" },
  { slug: "early-defect-detection-in-process-quality-feedback-loop", title: "Catching defects on the line, not at the end of it", where: "Manufacturing · Quality", glyph: "defects" },
  { slug: "jml-request-automation-jira-provisioning-system", title: "Joiners, movers and leavers without the ticket ping-pong", where: "Snoonu · Process automation", glyph: "flow" },
  { slug: "enterprise-ai-assistant-knowledge-automation-platform", title: "Letting people ask the company instead of a colleague", where: "Snoonu · AI operations", glyph: "dialog" },
];

/* ------------------------------------------------------------------------ */
/* 04 — My path                                                               */
/* ------------------------------------------------------------------------ */

export type PathStage = {
  id: string;
  era: string;
  years: string;
  where: string;
  /** Firestore experience doc id, if this stage maps to one. */
  experienceId?: string;
  /** Short contextual note revealed on hover / focus. */
  note: string;
  /** Material used for the stage's visual. */
  material: "drafting" | "carton" | "launch" | "flow" | "signal" | "loop";
};

export const path: PathStage[] = [
  {
    id: "engineering",
    era: "Engineering",
    years: "2012 – 2016",
    where: "B.Sc. Engineering · IUST",
    note: "Where the habit started: understand how a thing works before trying to make it work better.",
    material: "drafting",
  },
  {
    id: "manufacturing",
    era: "Manufacturing",
    years: "2016 – 2020",
    where: "Unilever",
    experienceId: "unilever",
    note: "World Class Manufacturing on real lines — OEE, MTBF, changeovers, and 10+ improvement projects.",
    material: "carton",
  },
  {
    id: "supply-chain",
    era: "Supply chain & launches",
    years: "2020 – 2023",
    where: "British American Tobacco",
    experienceId: "british-american-tobacco-(bat)",
    note: "Owned the supply-chain side of new product launches — and took launch time from five months to two.",
    material: "launch",
  },
  {
    id: "digital",
    era: "Digital systems",
    years: "2023 – 2026",
    where: "Snoonu",
    experienceId: "snoonu",
    note: "From project manager to Head of Digital Innovation: automation, integrations and AI across a fast company.",
    material: "flow",
  },
  {
    id: "product-ai",
    era: "Product & industrial AI",
    years: "2024 – now",
    where: "Smart Factory Planning",
    experienceId: "smart-factory-planning",
    note: "Product lead for manufacturing software: planning, live monitoring, skills and MRP.",
    material: "signal",
  },
  {
    id: "building",
    era: "Building",
    years: "2026 – now",
    where: "Vrolen",
    experienceId: "vrolen",
    note: "Everything above, turned into a product: an operating layer for continuous improvement.",
    material: "loop",
  },
];

/* ------------------------------------------------------------------------ */
/* 05 — Outside the job description                                          */
/* The lens reveals `through` when it passes over `surface`.                  */
/* ------------------------------------------------------------------------ */

export type Fragment = {
  surface: string;
  through: string;
  style: "display" | "serif" | "mono" | "chip";
};

export const fragments: Fragment[] = [
  { surface: "Mechanical engineering", through: "how things actually behave", style: "display" },
  { surface: "Building weird apps", through: "a household OS · a coder that won't pay for APIs", style: "serif" },
  { surface: "Lisbon", through: "38.7223° N, 9.1393° W", style: "chip" },
  { surface: "Cocktails", through: "an AI bartender named Marlow", style: "serif" },
  { surface: "Continuous improvement", through: "Kaizen, but hourly", style: "display" },
  { surface: "Studying for the PMP", through: "with 2,000+ questions I generated myself", style: "mono" },
  { surface: "Physical products", through: "40+ SKUs · 10+ launches", style: "chip" },
  { surface: "Three degrees", through: "engineering · an MBA · tech management", style: "mono" },
];

/* ------------------------------------------------------------------------ */
/* 06 — Now                                                                   */
/* ------------------------------------------------------------------------ */

export const now = {
  updated: "September 2026",
  items: [
    { label: "Building", value: "Vrolen", tone: "live" },
    { label: "Launching", value: "Finkavo — Portugal tax, finally clear", tone: "soon" },
    { label: "Based in", value: "Lisbon, Portugal", tone: "neutral" },
    { label: "Thinking about", value: "How to prove an improvement actually held", tone: "neutral" },
    { label: "Studying", value: "PMP certification", tone: "neutral" },
    { label: "Latest experiment", value: "Freeloader Coder", tone: "wip" },
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* 08 — Closing                                                               */
/* ------------------------------------------------------------------------ */

export const closing = {
  lines: ["Curiosity in systems,", "for a better tomorrow."],
} as const;

/* ------------------------------------------------------------------------ */
/* /about                                                                    */
/* ------------------------------------------------------------------------ */

export const about = {
  /** LinkedIn headline, split into its parts. */
  headline: ["Founder, Vrolen", "Continuous improvement", "Operational excellence", "Industrial AI", "Digital transformation"],
  bio: [
    "I'm Abolfazl Shirkavand — Abosh to most people. I trained as an engineer and have spent the ten years since making systems work better: on manufacturing lines at Unilever, launching products in British American Tobacco's supply chain, running digital innovation at Snoonu, and leading AI product for Smart Factory Planning.",
    "The environments kept changing; the work didn't. Understand how something actually behaves, find the loss that matters, change it, and check that the change held.",
    "Now I'm building Vrolen, which turns that loop into software. On the side I build things I want to exist — an AI bartender, a Portuguese tax assistant, a household operating system, and a coder that refuses to pay for APIs. I live in Lisbon.",
  ],
  /** The loop, as a lens field: each line hides a real example from the record. */
  principles: [
    { surface: "See how work actually flows", through: "OEE = A × P × Q" },
    { surface: "Find what matters", through: "usually, the bottleneck" },
    { surface: "Improve it", through: "a five-month launch, done in two" },
    { surface: "Verify it held", through: "or it was only a change" },
  ],
};
