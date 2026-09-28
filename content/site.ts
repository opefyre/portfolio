/**
 * Everything the site says, in one place.
 *
 * Rules: every fact traces back to Firestore, the LinkedIn text Abolfazl
 * supplied, or an asset in this repo. Real numbers over adjectives. No filler
 * copy, no em dashes.
 */

export const site = {
  url: "https://abosh.io",
  name: "Abolfazl Shirkavand",
  nickname: "Abosh",
  role: "Founder, Vrolen",
  email: "hello@abosh.io",
  location: "Lisbon",
  linkedin: "https://www.linkedin.com/in/abolfazl-shirkavand/",
  github: "https://github.com/opefyre",
  description:
    "Abolfazl Shirkavand (Abosh), founder of Vrolen. Ten years making factories and companies run measurably better, now building the software for it.",
} as const;

/** Share image (app/opengraph-image.jpg, a capture of the real hero render). */
export const ogImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Abolfazl Shirkavand, beside the Abosh Lens",
};

export const hero = {
  line: "Founder of Vrolen. I make operations measurably better, and build the software that does it.",
};

export type Shot = { src: string; alt: string; width: number; height: number };

export type Work = {
  slug: string;
  name: string;
  /** One sentence. What it is, in plain words. */
  line: string;
  status: string;
  href?: string;
  hrefLabel?: string;
  image: Shot;
  gallery: Shot[];
  stats: { value: string; label: string }[];
  /** Case study, three short paragraphs at most. */
  body: string[];
};

export const works: Work[] = [
  {
    slug: "vrolen",
    name: "Vrolen",
    line: "Describe a production line in plain English. Vrolen simulates it, finds the real bottleneck and ranks the fixes.",
    status: "Launching November 2026",
    href: "https://vrolen.com",
    hrefLabel: "vrolen.com",
    image: { src: "/work/vrolen/editor-dark.webp", alt: "Vrolen editor: a production line of fillers, a capper and QC modelled as connected stations", width: 1440, height: 900 },
    gallery: [
      { src: "/work/vrolen/results.webp", alt: "Vrolen results after a run: throughput, line efficiency and the bottleneck station", width: 1440, height: 900 },
    ],
    stats: [
      { value: "Hourly", label: "improvement cycle, down from quarterly" },
    ],
    body: [
      "Continuous improvement in factories runs on a quarterly rhythm. Map the line, find the loss, agree a fix, check back in three months. Finding where throughput is really lost takes process engineers most plants don't have.",
      "Vrolen turns a plain-English description of a line into a live simulation with OEE for every station. It ranks fixes by their effect on throughput, from cutting starvation and scrap to throttling a bottleneck machine to extend its MTBF, and tests each one on the model before anyone touches the real line.",
      "Then it keeps going: it checks whether each change produced the expected result, and keeps the ones that did as the new standard.",
    ],
  },
  {
    slug: "elixiary-ai-bartender",
    name: "Elixiary",
    line: "An AI bartender that mixes from what's already in your cabinet.",
    status: "Live since April 2026",
    href: "https://elixiary.com",
    hrefLabel: "elixiary.com",
    image: { src: "/elixiary/hero.webp", alt: "Elixiary home page with Marlow, the AI cocktail generator", width: 1280, height: 669 },
    gallery: [
      { src: "/elixiary/recipe-detail.webp", alt: "A generated Elixiary recipe with ingredients, method, garnish and equipment", width: 1280, height: 665 },
      { src: "/elixiary/cocktail-cards.webp", alt: "Elixiary curated cocktail library", width: 1280, height: 667 },
      { src: "/elixiary/collection.webp", alt: "A personal Elixiary collection of AI-generated recipes", width: 1280, height: 665 },
      { src: "/elixiary/blog-history.webp", alt: "Elixiary education hub with long-form essays", width: 1280, height: 659 },
    ],
    stats: [
      { value: "37K+", label: "Google Search impressions" },
      { value: "~200", label: "organic users, $0 on marketing" },
      { value: "1,000+", label: "recipes" },
    ],
    body: [
      "Home bartenders stick to the few recipes they remember, or use recipe sites that ignore what's actually in their cabinet.",
      "Marlow, the AI bartender, builds a recipe from whatever you have. Behind it sit a library of 1,000+ classic and modern recipes, a home-bar inventory, and an education hub of long-form essays.",
      "I built it end to end on Next.js, Firebase and Gemini and launched it in April 2026. With no marketing spend it reached about 200 organic users and 37K+ Google Search impressions.",
    ],
  },
  {
    slug: "finkavo",
    name: "Finkavo",
    line: "Tax answers for people living in Portugal, cited to the exact article, in Portuguese or English.",
    status: "Launching September 2026",
    href: "https://finkavo.com",
    hrefLabel: "finkavo.com",
    image: { src: "/work/finkavo/thumbnail.webp", alt: "Finkavo on mobile: welcome, sign in, AI tax assistant, deadline calendar and document vault", width: 1280, height: 443 },
    gallery: [],
    stats: [],
    body: [
      "Tax and admin in Portugal are complex, bilingual and scattered across sources. Expats get the worst of it: cross-border rules, double-taxation treaties, deadlines nobody warns you about.",
      "Finkavo answers in Portuguese or English, cites the exact article, and fits the answer to your regime, such as IRS Jovem. It builds your deadline calendar from your profile and keeps tax, identity, health and banking documents in one vault.",
    ],
  },
  {
    slug: "freeloader-coder",
    name: "Freeloader Coder",
    line: "An autonomous coding workspace. Every change passes three independent AI reviewers, and none of it runs on paid APIs.",
    status: "In progress",
    href: "https://github.com/opefyre/freeloader-coder",
    hrefLabel: "GitHub",
    image: { src: "/work/freeloader-coder/thumbnail.webp", alt: "Freeloader Coder workspace: provider mix, review quorum and bounded self-healing", width: 1280, height: 443 },
    gallery: [],
    stats: [
      { value: "$0", label: "paid API spend" },
      { value: "3", label: "independent reviewers on every change" },
    ],
    body: [
      "Autonomous coding agents usually trust one model's judgement, burn paid API credits unpredictably, and change things you can't see.",
      "Freeloader Coder plans, writes and tests changes by routing work across local and free-tier models: Groq, Cloudflare, Gemini, OpenRouter and a local engine. Every change needs a quorum of three reviewers for function, design and security. Self-healing has a fixed retry budget and can never widen its own permissions.",
      "GitHub and Jira use least-privilege scopes, and nothing is written outside the workspace without my approval.",
    ],
  },
];

/** Career results. The lens shows the "before". */
export const results = {
  headline: { value: "67%", label: "average cycle-time reduction across 70+ transformation programs" },
  pairs: [
    { after: "2 months", before: "5 months", label: "to launch a new product at British American Tobacco" },
    { after: "< 1 hour", before: "4 days", label: "to calculate payroll, after a custom Odoo module" },
    { after: "300+ apps", before: "Shadow IT", label: "under access governance with Lumos" },
  ],
};

export const about = {
  bio: [
    "I'm Abolfazl Shirkavand. Most people call me Abosh.",
    "I'm an engineer who has spent ten years making operations run better: production lines at Unilever, product launches at British American Tobacco, automation at Snoonu, and factory software at Smart Factory Planning. Across 70+ transformation programs, cycle time came down 67% on average.",
    "The part I care about most is checking that an improvement actually held. That's why I'm building Vrolen. I live in Lisbon, and I build small products I want to use myself.",
  ],
  education: "B.Sc. in Engineering, an MBA, and a master's in technology and engineering management.",
};

export const closing = ["Curiosity in systems,", "for a better tomorrow."];
