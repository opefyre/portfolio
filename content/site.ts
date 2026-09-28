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
  /** Featured works get a full block on the homepage; the rest sit in the index below them. */
  featured?: boolean;
};

export const works: Work[] = [
  {
    slug: "vrolen",
    featured: true,
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
    featured: true,
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
    slug: "cargo-and-consequence",
    featured: true,
    name: "Cargo & Consequence",
    line: "A free browser game about running a supply chain, where every cheap shortcut comes back as a cost later.",
    status: "Live since September 2026",
    href: "https://playcargo.vrolen.com",
    hrefLabel: "playcargo.vrolen.com",
    image: { src: "/work/cargo-and-consequence/campus.webp", alt: "Cargo & Consequence: an isometric pixel campus with a factory, warehouse, quality lab and port", width: 2400, height: 1500 },
    gallery: [
      { src: "/work/cargo-and-consequence/care.webp", alt: "Customer Care desk: a customer complaint traced back to the purchase order behind it", width: 2400, height: 1500 },
      { src: "/work/cargo-and-consequence/network.webp", alt: "The freight network: a pixel world map with suppliers in Shenzhen, Taipei, Osaka and Bangkok", width: 2400, height: 1500 },
      { src: "/work/cargo-and-consequence/procurement.webp", alt: "Procurement desk: four suppliers with price, lead time, minimum order and return rate", width: 2400, height: 1500 },
      { src: "/work/cargo-and-consequence/quality.webp", alt: "Quality lab: sampling a batch of headphones before release", width: 2400, height: 1500 },
    ],
    stats: [
      { value: "60", label: "shifts in a career, then endless play" },
      { value: "48", label: "events, random and story" },
      { value: "10", label: "departments sharing one company" },
    ],
    body: [
      "Supply-chain trade-offs are hard to teach because the cost of a decision shows up weeks after it was made. By then nobody connects the two.",
      "In Cargo & Consequence you run a headphone company one three-minute shift at a time: buy parts, build, test, ship to Europe and handle returns. Every batch remembers where its parts came from, so when customers call about dead batteries on day 22, you can trace it back to the cheap supplier you picked on day 1.",
      "Everything is drawn and composed in code, from the isometric campus and ships to the portraits and the sound. It launched in September 2026, with a page for teachers and a 60-minute class plan.",
    ],
  },
  {
    slug: "finkavo",
    featured: true,
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
    slug: "foreviq",
    name: "Foreviq",
    line: "Monthly demand forecasts for every customer and product, built from sales history and open orders.",
    status: "In progress",
    image: { src: "/work/foreviq/outlook.webp", alt: "Foreviq forecast outlook: actual demand, the six-month forecast and its planning range", width: 2400, height: 1500 },
    gallery: [
      { src: "/work/foreviq/methods.webp", alt: "Foreviq method comparison: Holt-Winters, Theta, AutoARIMA, AutoETS and more, with selection and later-check error", width: 2400, height: 1500 },
      { src: "/work/foreviq/accuracy.webp", alt: "Foreviq accuracy view: later-period error, bias and range coverage per item", width: 2400, height: 1500 },
      { src: "/work/foreviq/orders.webp", alt: "Foreviq sales forecast: confirmed orders and expected demand by month", width: 2400, height: 1500 },
    ],
    stats: [
      { value: "19", label: "forecasting methods compared on every product line" },
      { value: "4.6%", label: "error on a later period it never saw (sample data)" },
    ],
    body: [
      "Most sales forecasts are last year's numbers with a gut feeling on top. They also count demand twice: once in the forecast, and again when the orders arrive.",
      "Foreviq tries 19 methods on every customer and product line, from seasonal smoothing to machine learning, picks the best one on earlier months and checks it on a later period it never saw. Every forecast comes with an 80% planning range.",
      "Open orders are netted against the forecast, so a fully ordered month counts once. Plans move from draft to review to approved, and the assistant can propose a new forecast but can't publish one without a person.",
    ],
  },
  {
    slug: "chanshambe",
    name: "Chanshambe",
    line: "One private app for a family's calendar, chores, meals, bills and whereabouts.",
    status: "Built, pre-launch",
    image: { src: "/work/chanshambe/overview.webp", alt: "Chanshambe overview: today's three priorities, chores, events, shopping and bills", width: 2400, height: 1500 },
    gallery: [
      { src: "/work/chanshambe/map.webp", alt: "Chanshambe family map with saved places and safe zones", width: 2400, height: 1500 },
      { src: "/work/chanshambe/tasks.webp", alt: "Chanshambe chores board: to do, in progress, blocked and done", width: 2400, height: 1500 },
      { src: "/work/chanshambe/meals.webp", alt: "Chanshambe weekly meal planner with missing ingredients", width: 2400, height: 1500 },
      { src: "/work/chanshambe/approvals.webp", alt: "Chanshambe approvals: an assistant's plan waiting for a person to approve it", width: 2400, height: 1500 },
    ],
    stats: [
      { value: "4,061", label: "tests, all passing" },
      { value: "96", label: "routes" },
      { value: "2", label: "languages, English and Persian, right to left" },
    ],
    body: [
      "Family life runs on a patchwork of calendars, group chats and spreadsheets, and the AI assistants that could help aren't trusted with where the kids are.",
      "Chanshambe puts the calendar, chores, meal plans, shopping, bills, documents and a family map with safe zones in one place. Its assistant drafts plans, and nothing happens until someone in the family approves them.",
      "It's designed to keep personal data at home: sensitive information may only go to a model running on the family's own machine. It works fully in English and in Persian, right to left.",
    ],
  },
  {
    slug: "azshambe",
    name: "Azshambe",
    line: "Turns \u201cI'll start on Saturday\u201d into a commitment you schedule, lock and prove.",
    status: "In progress",
    image: { src: "/work/azshambe/screens.webp", alt: "Four Azshambe screens in Persian: home, writing a commitment, Friday planning and a timer proof", width: 2400, height: 1200 },
    gallery: [
      { src: "/work/azshambe/more-screens.webp", alt: "Four more Azshambe screens: group progress, private notes, who can see a commitment and quiet hours", width: 2400, height: 1200 },
    ],
    stats: [{ value: "80", label: "prototype screens, all in Persian" }],
    body: [
      "In Persian, \u201caz shambe\u201d means \u201cfrom Saturday\u201d: the day the week starts in Iran, and the day everything we keep putting off is supposed to begin.",
      "Azshambe turns that promise into a commitment. Write it in your own words, schedule a small first step on the Persian calendar, lock it 12 hours before it starts, then prove it with a timer, a live photo or a friend's check. A counter keeps track of how many times you've postponed.",
      "Friends and groups can hold each other to it. It's a working prototype today, with iOS and Android components on one shared design system.",
    ],
  },
  {
    slug: "elsewhere-hotel",
    name: "Elsewhere Hotel",
    line: "A drawn hotel room for a real city. The view, radio, book and painting inside it are live and real.",
    status: "In progress",
    image: { src: "/work/elsewhere-hotel/paris.webp", alt: "Elsewhere Hotel: the Paris room, with a live view of Pont Alexandre III and Van Gogh's Bedroom on the wall", width: 2400, height: 1500 },
    gallery: [
      { src: "/work/elsewhere-hotel/lobby.webp", alt: "Elsewhere Hotel lobby: tell the concierge a mood to check in", width: 2400, height: 1500 },
      { src: "/work/elsewhere-hotel/painting.webp", alt: "The painting on the wall: Van Gogh's The Bedroom, with its museum record", width: 2400, height: 1500 },
      { src: "/work/elsewhere-hotel/book.webp", alt: "The book on the bed: Journey to the Centre of the Earth, with a door to Reykjavik", width: 2400, height: 1500 },
      { src: "/work/elsewhere-hotel/window.webp", alt: "The window: Paris at dusk with the live local time, weather, sunrise and sunset", width: 2400, height: 1500 },
    ],
    stats: [
      { value: "20", label: "rooms in real cities" },
      { value: "32", label: "doors from one city to another" },
      { value: "11", label: "live data sources" },
    ],
    body: [
      "Tell the concierge a mood, like \u201csomewhere it's getting dark, with rain\u201d, and it checks live weather and daylight to pick one of 20 rooms.",
      "The room is illustrated, but everything in it is real: a photo of the view taken within 120 km, the local weather and sunset, a live local radio station, a public-domain book, a painting from a museum's open collection and a snack from an open food database.",
      "Some objects are doors. Van Gogh's Bedroom on the wall in Paris leads to Arles, and the Jules Verne on the bed leads to Reykjavik. A travel journal keeps your stamps, and you can send the route to a friend.",
    ],
  },
  {
    slug: "content-engine",
    name: "Content engine",
    line: "The system that writes, films, scores and schedules posts for my products, from a spare Mac.",
    status: "Running",
    image: { src: "/work/content-engine/posts.webp", alt: "Four finished posts: an Elixiary reel, an Azshambe explainer, a Vrolen LinkedIn visual and a Dr. Quackpot cover", width: 2400, height: 1040 },
    gallery: [
      { src: "/work/content-engine/cast.webp", alt: "Finkavo's cast of nine illustrated characters", width: 2800, height: 406 },
      { src: "/work/content-engine/posts-2.webp", alt: "Four more posts: a 104-cocktail data reel, an Azshambe explainer, a Vrolen OEE visual and an Elixiary skit", width: 2400, height: 1040 },
    ],
    stats: [
      { value: "5", label: "brands on Instagram, TikTok and LinkedIn" },
      { value: "60+", label: "finished videos" },
    ],
    body: [
      "Each of my products needs a steady stream of posts, and I didn't want to spend my evenings making them.",
      "So I built a pipeline. Claude and ChatGPT write from real facts, like recipes from Elixiary's database or tax rules checked against primary sources. Higgsfield generates the shots, ElevenLabs the voices, and ffmpeg cuts everything to music.",
      "It runs on a spare Mac at home, with n8n and Buffer handling the schedule, and most posts wait as drafts for my approval. It covers Elixiary, Finkavo, Vrolen, Azshambe and a comedy channel starring a duck professor, Dr. Quackpot.",
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
