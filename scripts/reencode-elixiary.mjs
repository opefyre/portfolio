// Re-encode the existing public/elixiary/*.png files into higher-quality
// WebP and AVIF without changing the PNG (which is already lossless at 1280px).
// Use this when you want a quality bump on the venture screenshots without
// re-providing the original high-res sources.
//
// Run: node scripts/reencode-elixiary.mjs

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/elixiary");

// Bumped from 82 / 60 (initial convert) → +~20% each. webp uses near-lossless
// at this quality; avif gets noticeably less ringing at 72.
const WEBP_QUALITY = 98;
const AVIF_QUALITY = 72;
// Sharp encoder effort: higher = slower but smaller files at the same quality.
const WEBP_EFFORT = 6;
const AVIF_EFFORT = 6;

const slots = (await readdir(DIR))
    .filter(f => f.endsWith(".png"))
    .map(f => f.replace(/\.png$/, ""));

for (const slot of slots) {
    const pngIn = path.join(DIR, `${slot}.png`);
    const webpOut = path.join(DIR, `${slot}.webp`);
    const avifOut = path.join(DIR, `${slot}.avif`);

    const base = sharp(pngIn);
    await base.clone().webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT }).toFile(webpOut);
    await base.clone().avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT }).toFile(avifOut);

    const sizes = await Promise.all([pngIn, webpOut, avifOut].map(async p => {
        const s = await stat(p);
        return `${path.basename(p)}=${(s.size / 1024).toFixed(1)}KB`;
    }));
    console.log(`${slot} → ${sizes.join("  ")}`);
}
