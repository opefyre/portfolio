import { readFileSync } from 'node:fs';
import path from 'node:path';

// This checks vocabulary and punctuation, not whether prose sounds human.
// The editorial review still covers meaning, rhythm, evidence and story.
const out = path.resolve(process.argv[2] ?? 'out');
const banned = /\b(?:delv(?:e|es|ed|ing)|tap(?:s|ped|ping)?|leverag(?:e|es|ed|ing)|unlock(?:s|ed|ing)?|navigat(?:e|es|ed|ing)|testaments?|beacons?|landscapes?|revolution(?:s|ary)?|synerg(?:y|ies)|frameworks?|crucial|vital|paramount|transforming|pioneering|seamlessly|meticulously|fostering|tapestry|game[- ]changer|robust|seamless|cutting[- ]edge|furthermore|moreover)\b/gi;
const decode = text => text
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&(amp|quot|apos|lt|gt|nbsp|mdash|middot);/g, (_, name) => ({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',mdash:'\u2014',middot:'\u00b7'})[name]);
const visible = html => decode(html
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<!--[^]*?-->/g, ' ')
  .replace(/<[^>]+>/g, ' '));
const sitemap = readFileSync(path.join(out, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).filter(url => /^\/notes\/[a-z0-9-]+\/$/.test(new URL(url).pathname));
const errors = [];
for (const url of urls) {
  const html = readFileSync(path.join(out, new URL(url).pathname, 'index.html'), 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) { errors.push(`${url}: no article main element`); continue; }
  const labels = [...html.matchAll(/\b(?:alt|aria-label|content)="([^"]*)"/g)].map(m => m[1]);
  const text = [visible(main), ...labels.map(decode)].join(' ').replace(/https?:\/\/[^\s]+/g, '');
  const words = [...new Set(text.match(banned) ?? [])];
  if (words.length) errors.push(`${url}: banned wording: ${words.join(', ')}`);
  if (/[\u2014\u00b7]/.test(text)) errors.push(`${url}: em dash or middot in rendered text`);
}
if (!urls.length) errors.push('No article URLs found in sitemap');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Wording check passed for ${urls.length} articles, including rendered labels and metadata. Manual voice review remains required.`);
