"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lensStore } from "@/components/lens/lensStore";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * One scroll authority for the whole site.
 *
 * Lenis smooths wheel input and keeps DOM scroll and the WebGL lens in the
 * same animation frame (GSAP's ticker drives Lenis; Lenis drives
 * ScrollTrigger). Native scroll semantics stay intact: the page is a normal
 * document, Lenis only interpolates the wheel.
 *
 * Lessons baked in from the previous site: never call window.scrollTo while
 * Lenis is running (it gets fought) — use `scrollToTarget` below; nested
 * scrollers opt out with `data-lenis-prevent`.
 */
export const scrollStore: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(target: number | string | HTMLElement, opts: { immediate?: boolean; offset?: number } = {}) {
  const lenis = scrollStore.lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: opts.offset ?? 0, immediate: opts.immediate, force: true });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (typeof el === "number") window.scrollTo({ top: el, behavior: opts.immediate ? "auto" : "smooth" });
  else if (el instanceof HTMLElement) el.scrollIntoView({ behavior: opts.immediate ? "auto" : "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.11,
      smoothWheel: true,
      anchors: { offset: -88 },
      allowNestedScroll: true,
    });
    scrollStore.lenis = lenis;

    lenis.on("scroll", (l: Lenis) => {
      ScrollTrigger.update();
      lensStore.scroll.velocity = l.velocity;
      lensStore.dirty = true;
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      scrollStore.lenis = null;
    };
  }, []);
  return null;
}
