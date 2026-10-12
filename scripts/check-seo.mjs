import { readFileSync } from "node:fs";
import path from "node:path";

// These are editorial budgets, not fixed limits imposed by Google.
// Inspect the actual exported pages so layout templates count toward the title.
const out = path.resolve(process.argv[2] ?? "out");
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const decode = (text) => text.replace(/&(amp|quot|apos|lt|gt);/g, (_, name) => ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" })[name]);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
const errors = [];
const titles = new Set();
const descriptions = new Set();

for (const url of urls) {
  const html = readFileSync(path.join(out, new URL(url).pathname, "index.html"), "utf8");
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  const tags = [...html.matchAll(/<(meta|link)\b([^>]+)>/g)].map((match) => {
    const attrs = Object.fromEntries([...match[2].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attr) => [attr[1], decode(attr[2])]));
    return { tag: match[1], ...attrs };
  });
  const meta = (key) => tags.filter((tag) => tag.name === key || tag.property === key);
  const requireMeta = (key) => {
    const found = meta(key);
    if (found.length !== 1 || !found[0].content) errors.push(`${url}: missing or duplicate ${key}`);
    return found[0]?.content ?? "";
  };
  const description = requireMeta("description");
  if ([...html.matchAll(/<title>/g)].length !== 1 || title.length < 30 || title.length > 60) errors.push(`${url}: title has ${title.length} characters (budget 30–60)`);
  if (description.length < 110 || description.length > 160) errors.push(`${url}: description has ${description.length} characters (budget 110–160)`);
  if (titles.has(title)) errors.push(`${url}: duplicate title`);
  if (descriptions.has(description)) errors.push(`${url}: duplicate description`);
  titles.add(title);
  descriptions.add(description);
  const canonical = tags.filter((tag) => tag.tag === "link" && tag.rel === "canonical");
  if (canonical.length !== 1 || canonical[0].href !== url) errors.push(`${url}: canonical does not match sitemap URL`);
  if (!/<h1\b[^>]*>[\s\S]*?\S[\s\S]*?<\/h1>/.test(html)) errors.push(`${url}: no populated h1`);
  if (meta("robots").some((tag) => /noindex/.test(tag.content))) errors.push(`${url}: sitemap page is noindex`);
  for (const key of ["og:title", "og:description", "og:type", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description"]) requireMeta(key);
}

if (!urls.length) errors.push("Sitemap contains no pages");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`SEO check passed for ${urls.length} exported pages: titles, descriptions, canonical URLs, headings and social tags.`);
}
