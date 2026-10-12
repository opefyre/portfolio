/** Resolve image readiness without rejecting for an ordinary failed image.
 * Read the DOM image so WebGL shares the browser's request, priority and cache.
 */
export function imageReady(image: HTMLImageElement, signal: AbortSignal): Promise<boolean> {
  return new Promise(resolve => {
    if (signal.aborted) { resolve(false); return; }
    if (image.complete) { resolve(image.naturalWidth > 0); return; }
    const finish = (ready: boolean) => {
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
      signal.removeEventListener("abort", aborted);
      resolve(ready);
    };
    const loaded = () => finish(image.naturalWidth > 0);
    const failed = () => finish(false);
    const aborted = () => finish(false);
    image.addEventListener("load", loaded, { once: true });
    image.addEventListener("error", failed, { once: true });
    signal.addEventListener("abort", aborted, { once: true });
  });
}
