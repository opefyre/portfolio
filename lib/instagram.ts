import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { InstagramFeed } from "@/scripts/fetch-instagram";

const FILE = path.join(process.cwd(), "content", "instagram.generated.json");

/** Latest posts written by the prebuild script; empty when it hasn't run or had no token. */
export function getInstagram(): InstagramFeed {
  if (!existsSync(FILE)) return { username: "", profile: "", posts: [] };
  return JSON.parse(readFileSync(FILE, "utf8")) as InstagramFeed;
}
