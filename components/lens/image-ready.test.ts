import assert from "node:assert/strict";
import { test } from "node:test";
import { imageReady } from "./image-ready";
class ImageStub extends EventTarget { complete = false; naturalWidth = 0; }
const imageElement = (image: ImageStub) => image as unknown as HTMLImageElement;
test("completed images distinguish a decoded image from a failed one", async () => {
  const image = new ImageStub(); image.complete = true;
  assert.equal(await imageReady(imageElement(image), new AbortController().signal), false);
  image.naturalWidth = 640;
  assert.equal(await imageReady(imageElement(image), new AbortController().signal), true);
});
test("image load resolves ready and ordinary load errors resolve false without rejection", async () => {
  const loaded = new ImageStub();
  const success = imageReady(imageElement(loaded), new AbortController().signal);
  loaded.naturalWidth = 640; loaded.dispatchEvent(new Event("load")); assert.equal(await success, true);
  const failed = new ImageStub();
  const failure = imageReady(imageElement(failed), new AbortController().signal);
  failed.dispatchEvent(new Event("error")); assert.equal(await failure, false);
});
test("navigation aborts pending image readiness cleanly", async () => {
  const controller = new AbortController(); const image = new ImageStub();
  const waiting = imageReady(imageElement(image), controller.signal);
  controller.abort(); assert.equal(await waiting, false);
  assert.equal(await imageReady(imageElement(image), controller.signal), false);
});
