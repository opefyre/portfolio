import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const lifetime = 30 * 24 * 60 * 60 * 1000;
export function retainedInstagramAssets(files: { name: string; modified: number }[], current: Set<string>, now = Date.now()) {
  const eligible = files.filter(file => /^\d+\.webp$/.test(file.name) && (current.has(file.name) || now - file.modified <= lifetime));
  const selected = eligible.filter(file => current.has(file.name));
  const previous = eligible.filter(file => !current.has(file.name)).sort((a, b) => b.modified - a.modified || a.name.localeCompare(b.name));
  return new Set([...selected, ...previous.slice(0, Math.max(0, 60 - selected.length))].map(file => file.name));
}

/** Seed a first CI cache from this site's public thumbnails, then retain recent
 * assets across deployments so a prefetched page can still request its images.
 */
export async function seedInstagramAssets(dir: string) {
  await mkdir(dir, { recursive: true });
  if ((await readdir(dir)).some(file => /^\d+\.webp$/.test(file))) return;
  try {
    const response = await fetch("https://abosh.io/", { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return;
    const paths = new Set([...((await response.text()).matchAll(/\/instagram\/(\d+)\.webp/g))].map(match => match[1]));
    for (const id of [...paths].slice(0, 12)) {
      const image = await fetch(`https://abosh.io/instagram/${id}.webp`, { signal: AbortSignal.timeout(10000) });
      if (image.ok && image.headers.get("content-type")?.includes("image/webp")) await writeFile(path.join(dir, `${id}.webp`), Buffer.from(await image.arrayBuffer()));
    }
  } catch { /* Optional seed; the official Instagram fetch still runs. */ }
}

export async function pruneInstagramAssets(dir: string, current: Set<string>) {
  const files = await Promise.all((await readdir(dir)).filter(name => /^\d+\.webp$/.test(name)).map(async name => ({ name, modified: (await stat(path.join(dir, name))).mtimeMs })));
  const keep = retainedInstagramAssets(files, current);
  await Promise.all(files.filter(file => !keep.has(file.name)).map(file => unlink(path.join(dir, file.name))));
}
