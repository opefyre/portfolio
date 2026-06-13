/**
 * Image optimization for static export.
 *
 * Reads PNG/JPG sources from /public and writes alongside:
 *   - .avif (lossy, best compression)
 *   - .webp (lossy, broad support)
 *   - resized .png/.jpg variants when target widths are exceeded
 *
 * Run manually:
 *   npx tsx scripts/optimize-images.ts
 *
 * Re-running is idempotent — output files are overwritten in place.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

interface Target {
    /** Absolute source path. */
    src: string;
    /** Hero LCP candidates get an aggressive max width. */
    maxWidth: number;
    /** Source quality for lossy formats. */
    quality: number;
}

const PUBLIC = path.resolve(__dirname, "../public");

async function listSources(): Promise<Target[]> {
    const targets: Target[] = [];

    // Hero photo — LCP candidate, cap at 320px (2x of 160px display)
    targets.push({
        src: path.join(PUBLIC, "prof.png"),
        maxWidth: 320,
        quality: 78,
    });

    // Elixiary showcase screenshots — display ~720px wide, cap at 1440 (2x)
    const elixiaryDir = path.join(PUBLIC, "elixiary");
    try {
        const entries = await fs.readdir(elixiaryDir);
        for (const entry of entries) {
            if (!/\.(png|jpg|jpeg)$/i.test(entry)) continue;
            targets.push({
                src: path.join(elixiaryDir, entry),
                maxWidth: 1440,
                quality: 72,
            });
        }
    } catch {
        // dir absent — skip
    }

    return targets;
}

async function optimizeOne(target: Target): Promise<void> {
    const ext = path.extname(target.src).toLowerCase();
    const base = target.src.slice(0, -ext.length);
    const stat = await fs.stat(target.src);
    const srcKB = (stat.size / 1024).toFixed(1);

    const input = sharp(target.src).rotate(); // honour EXIF orientation

    const meta = await input.metadata();
    const width = meta.width ?? 0;
    const targetWidth = Math.min(width, target.maxWidth);

    // 1) Resized base (overwrites original when width > maxWidth)
    if (width > target.maxWidth) {
        await input
            .clone()
            .resize({ width: targetWidth, withoutEnlargement: true })
            .toFormat(ext === ".png" ? "png" : "jpeg", { quality: target.quality, palette: ext === ".png" })
            .toFile(target.src + ".tmp");
        await fs.rename(target.src + ".tmp", target.src);
    }

    // 2) AVIF variant
    await sharp(target.src)
        .rotate()
        .resize({ width: targetWidth, withoutEnlargement: true })
        .avif({ quality: target.quality, effort: 6 })
        .toFile(`${base}.avif`);

    // 3) WebP variant
    await sharp(target.src)
        .rotate()
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: target.quality })
        .toFile(`${base}.webp`);

    const after = await fs.stat(target.src);
    const avif = await fs.stat(`${base}.avif`);
    const webp = await fs.stat(`${base}.webp`);
    const fmt = (n: number) => (n / 1024).toFixed(1);
    const rel = path.relative(PUBLIC, target.src);
    console.log(`✓ ${rel}: ${srcKB}KB → ${fmt(after.size)}KB | avif ${fmt(avif.size)}KB | webp ${fmt(webp.size)}KB`);
}

async function main(): Promise<void> {
    const targets = await listSources();
    if (targets.length === 0) {
        console.log("No images to optimize.");
        return;
    }
    console.log(`Optimizing ${targets.length} image(s)…`);
    for (const t of targets) {
        try {
            await optimizeOne(t);
        } catch (err) {
            console.error(`✗ ${path.relative(PUBLIC, t.src)}: ${(err as Error).message}`);
        }
    }
    console.log("Done.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
