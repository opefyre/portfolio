"use client";

import { useLayoutEffect, useSyncExternalStore, type RefObject } from "react";
import { lensStore } from "./lensStore";

/**
 * Registry of images rendered as WebGL planes in the lens scene.
 *
 * The DOM element is the layout box (and holds the real <img> for SEO, no-JS
 * and no-WebGL). The plane is keyed by `id`, not by element: when a page
 * unmounts and the next page mounts an element with the same id, the same
 * plane flies from the old box to the new one. That is the shared-element
 * transition between a work on the homepage and its case study.
 */
export type GLImageEntry = {
  id: string;
  src: string;
  el: HTMLElement | null;
  /** Corner radius in CSS px. */
  radius: number;
  /** Incremented whenever an element (re)claims this id. */
  claim: number;
  timer?: ReturnType<typeof setTimeout>;
};

const entries = new Map<string, GLImageEntry>();
let snapshot: GLImageEntry[] = [];
const EMPTY: GLImageEntry[] = [];
const listeners = new Set<() => void>();

function emit() {
  snapshot = [...entries.values()];
  lensStore.dirty = true;
  listeners.forEach((l) => l());
}

/** Navigation state shared with the planes: which image survives a page change. */
export const glNav = {
  leaving: false,
  keep: null as string | null,
};

export function useGLImages() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => EMPTY,
  );
}

export function glImagesActive() {
  return entries.size > 0;
}

export function useGLImage(ref: RefObject<HTMLElement | null>, id: string, src: string, radius: number) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let entry = entries.get(id);
    if (entry) {
      if (entry.timer) clearTimeout(entry.timer);
      entry.timer = undefined;
      entry.el = el;
      entry.src = src;
      entry.radius = radius;
      entry.claim += 1;
    } else {
      entry = { id, src, el, radius, claim: 0 };
      entries.set(id, entry);
    }
    emit();
    const mine = entry;
    return () => {
      if (mine.el !== el) return;
      delete el.dataset.gl;
      mine.el = null;
      lensStore.dirty = true;
      // Give the next page a moment to claim the same id before letting go.
      mine.timer = setTimeout(() => {
        if (!mine.el) {
          entries.delete(id);
          emit();
        }
      }, 1400);
    };
  }, [ref, id, src, radius]);
}
