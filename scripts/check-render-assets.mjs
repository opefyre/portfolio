import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
const dir = path.resolve("out");
const urls = [...readFileSync(path.join(dir, "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const errors = [];
for (const url of urls) {
  const file = path.join(dir, new URL(url).pathname, "index.html");
  const html = readFileSync(file, "utf8");
  if (/<style\b/i.test(html)) errors.push(`${url}: inline style element conflicts with the hosting CSP`);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    if (match[1].startsWith("/") && !existsSync(path.join(dir, decodeURIComponent(match[1])))) errors.push(`${url}: missing image ${match[1]}`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Rendering asset check passed for ${urls.length} pages: no inline style blocks and all local images present.`);
