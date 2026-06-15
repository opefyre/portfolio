// One-shot converter: take the 5 new venture screenshots in public/NEW/,
// resize to 1280px wide, and emit png+webp+avif triplets into public/elixiary/
// under the names the ElixiaryFeature3D showcase already references.
//
// Run: node scripts/convert-elixiary-images.mjs

import { mkdir, readdir, unlink } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("public/NEW");
const DEST_DIR = path.resolve("public/elixiary");
const WIDTH = 1280;

// new file name → slot name used by showcaseImages
const MAP = {
    "home.png": "hero",
    "curated_cocktails.png": "cocktail-cards",
    "cocktail_details.png": "recipe-detail",
    "my_recipes.png": "collection",
    "articles.png": "blog-history",
};

const KEEP_SLOTS = new Set(Object.values(MAP));

await mkdir(DEST_DIR, { recursive: true });

for (const [srcName, slot] of Object.entries(MAP)) {
    const srcPath = path.join(SRC_DIR, srcName);
    if (!existsSync(srcPath)) {
        console.warn(`SKIP ${srcName} — not found`);
        continue;
    }
    const base = sharp(srcPath).resize({ width: WIDTH, withoutEnlargement: true });

    const pngOut = path.join(DEST_DIR, `${slot}.png`);
    const webpOut = path.join(DEST_DIR, `${slot}.webp`);
    const avifOut = path.join(DEST_DIR, `${slot}.avif`);

    await base.clone().png({ compressionLevel: 9, quality: 90 }).toFile(pngOut);
    await base.clone().webp({ quality: 82 }).toFile(webpOut);
    await base.clone().avif({ quality: 60 }).toFile(avifOut);

    const sizes = [pngOut, webpOut, avifOut]
        .map(p => `${path.basename(p)}=${(statSync(p).size / 1024).toFixed(1)}KB`)
        .join("  ");
    console.log(`${srcName} → ${sizes}`);
}

// Drop unused slots (formats we no longer reference)
const removedSlots = new Set();
const allFiles = await readdir(DEST_DIR);
for (const f of allFiles) {
    const ext = path.extname(f).toLowerCase();
    if (![".png", ".webp", ".avif"].includes(ext)) continue;
    const slot = path.basename(f, ext);
    if (!KEEP_SLOTS.has(slot)) {
        await unlink(path.join(DEST_DIR, f));
        removedSlots.add(slot);
    }
}
if (removedSlots.size) {
    console.log(`\nRemoved unused slots: ${[...removedSlots].join(", ")}`);
}
