/**
 * Prebuild: fetch the latest @abosh.io posts with the official Instagram API
 * (Instagram API with Instagram Login), store the images locally as WebP and
 * write content/instagram.generated.json for the home page.
 *
 * Token: INSTAGRAM_ACCESS_TOKEN (GitHub secret) seeds it; the current token
 * lives in Firestore at integrations/instagram (the rules deny all client
 * access, only the admin SDK can read it). Long-lived tokens last 60 days, so
 * the script refreshes it weekly and writes the new one back.
 *
 * Never fails the build: without a token or on any API error the strip is
 * simply left out. The token is never logged.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import sharp from "sharp";

const GRAPH = "https://graph.instagram.com";
const COUNT = 6;
const SIZE = 900;
const REFRESH_AFTER_MS = 7 * 24 * 3600 * 1000;

const ROOT = process.cwd();
const OUT_JSON = path.join(ROOT, "content", "instagram.generated.json");
const OUT_DIR = path.join(ROOT, "public", "instagram");

type Media = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export type InstagramPost = { id: string; permalink: string; caption: string; timestamp: string; video: boolean; src: string; width: number; height: number };
export type InstagramFeed = { username: string; profile: string; posts: InstagramPost[] };

function firestore() {
  if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)) });
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || "abosh-portfolio" });
    else return null;
  }
  return getFirestore();
}

async function api<T>(url: string): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Instagram API ${res.status}: ${body?.error?.message ?? "request failed"}`);
  return body as T;
}

/** The newest usable token: Firestore first (it gets refreshed), the env secret as the seed. */
async function getToken() {
  const db = firestore();
  const ref = db?.collection("integrations").doc("instagram");
  const stored = ref ? (await ref.get()).data() : undefined;
  let token: string | undefined = stored?.token ?? process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;
  const refreshedAt: number = stored?.refreshedAt ?? 0;

  if (ref && Date.now() - refreshedAt > REFRESH_AFTER_MS) {
    try {
      const r = await api<{ access_token: string; expires_in: number }>(
        `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`,
      );
      token = r.access_token;
      await ref.set({ token, refreshedAt: Date.now(), expiresAt: Date.now() + r.expires_in * 1000 });
      console.log(`Instagram: token refreshed, valid for ${Math.round(r.expires_in / 86400)} days`);
    } catch (e) {
      // A brand-new token can't be refreshed for 24 hours; store it so the next run can.
      if (!stored) await ref.set({ token, refreshedAt: 0 });
      console.warn(`Instagram: token not refreshed (${(e as Error).message})`);
    }
  }
  return token;
}

async function main() {
  const empty: InstagramFeed = { username: "", profile: "", posts: [] };
  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  try {
    const token = await getToken();
    if (!token) {
      console.log("Instagram: no token, skipping the feed");
      await writeFile(OUT_JSON, JSON.stringify(empty));
      return;
    }
    const t = encodeURIComponent(token);
    const me = await api<{ username: string }>(`${GRAPH}/me?fields=username&access_token=${t}`);
    const media = await api<{ data: Media[] }>(
      `${GRAPH}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${COUNT * 2}&access_token=${t}`,
    );

    await rm(OUT_DIR, { recursive: true, force: true });
    await mkdir(OUT_DIR, { recursive: true });
    const posts: InstagramPost[] = [];
    for (const m of media.data) {
      if (posts.length >= COUNT) break;
      const url = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
      if (!url) continue;
      const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (!res.ok) continue;
      const file = `${m.id}.webp`;
      await sharp(Buffer.from(await res.arrayBuffer()))
        .resize(SIZE, SIZE, { fit: "cover" })
        .webp({ quality: 84 })
        .toFile(path.join(OUT_DIR, file));
      posts.push({
        id: m.id,
        permalink: m.permalink,
        caption: (m.caption ?? "").replace(/\s+/g, " ").trim().slice(0, 140),
        timestamp: m.timestamp,
        video: m.media_type === "VIDEO",
        src: `/instagram/${file}`,
        width: SIZE,
        height: SIZE,
      });
    }
    const feed: InstagramFeed = { username: me.username, profile: `https://www.instagram.com/${me.username}/`, posts };
    await writeFile(OUT_JSON, JSON.stringify(feed, null, 2));
    console.log(`Instagram: ${posts.length} posts from @${me.username}`);
  } catch (e) {
    console.warn(`Instagram: feed skipped (${(e as Error).message})`);
    await writeFile(OUT_JSON, JSON.stringify(empty));
  }
}

main();
