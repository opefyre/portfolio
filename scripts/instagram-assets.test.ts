import assert from "node:assert/strict";
import { test } from "node:test";
import { retainedInstagramAssets } from "./instagram-assets";
const now = 40 * 86400000;
test("retain recent previous assets and current images even when their mtime is older", () => {
  const keep = retainedInstagramAssets([{ name: "1.webp", modified: 0 }, { name: "2.webp", modified: now - 86400000 }, { name: "3.webp", modified: 0 }], new Set(["1.webp"]), now);
  assert.deepEqual([...keep].sort(), ["1.webp", "2.webp"]);
});
test("archive is bounded to 60 images, keeping newest previous thumbnails", () => {
  const files = Array.from({ length: 80 }, (_, i) => ({ name: `${i}.webp`, modified: now - i * 1000 }));
  const keep = retainedInstagramAssets(files, new Set(["79.webp"]), now);
  assert.equal(keep.size, 60); assert.equal(keep.has("79.webp"), true); assert.equal(keep.has("58.webp"), true); assert.equal(keep.has("59.webp"), false);
});
test("unrelated files and unsafe paths never become archive assets", () => {
  assert.equal(retainedInstagramAssets([{ name: "../1.webp", modified: now }, { name: "secret.json", modified: now }, { name: "thumbnail.webp", modified: now }], new Set(), now).size, 0);
});
