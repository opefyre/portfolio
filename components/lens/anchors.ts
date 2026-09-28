"use client";

import { useEffect, type RefObject } from "react";
import { lensStore } from "./lensStore";

/**
 * Lens anchors: invisible DOM elements that tell the single, persistent lens
 * where to be. Each section places one; the stage picks the most relevant
 * anchor every frame and springs the SAME WebGL object between them.
 */
export type LensAnchorOptions = {
  id: string;
  /** Lens diameter as a fraction of min(anchor width, anchor height). */
  sizeRatio?: number;
  /** 0 = clear studio glass, 1 = darkened / simplified. */
  darkness?: number;
  /** Visibility of the engraved calibration grid behind the lens (0..1). */
  plateLines?: number;
  /** Strength of the studio halo behind the lens (0..1). */
  plateHalo?: number;
  /** Lower bound for the diameter in CSS px (keeps the lens usable on phones). */
  minSize?: number;
  /** Glass thickness: lower means less magnification (used where the lens must read text). */
  thickness?: number;
  /**
   * Interactive anchors let the lens follow the pointer (or a touch drag)
   * within the anchor's bounds: used where the lens reads hidden text.
   */
  interactive?: boolean;
  /** Where the lens rests inside an interactive anchor before any input, as fractions [x, y]. */
  rest?: [number, number] | null;
  /** Tie-breaker when two anchors score similarly. */
  priority?: number;
};

export type AnchorEntry = {
  el: HTMLElement;
  opts: Required<LensAnchorOptions>;
  near: boolean;
  /** Last touch/tap/focus target, in CSS px relative to the anchor's top-left (survives scrolling). */
  touch: { x: number; y: number; active: boolean };
};

const DEFAULTS: Omit<Required<LensAnchorOptions>, "id"> = {
  sizeRatio: 0.82,
  darkness: 0,
  plateLines: 1,
  plateHalo: 1,
  thickness: 0.95,
  minSize: 0,
  rest: null,
  interactive: false,
  priority: 0,
};

export const anchors = new Map<string, AnchorEntry>();

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        for (const a of anchors.values()) if (a.el === e.target) a.near = e.isIntersecting;
      }
      lensStore.dirty = true;
    },
    // "near" = within one viewport of the screen, so the lens is ready early
    { rootMargin: "100% 0px 100% 0px" },
  );
  return observer;
}

export function anyAnchorNear() {
  for (const a of anchors.values()) if (a.near) return true;
  return false;
}

export function useLensAnchor(ref: RefObject<HTMLElement | null>, options: LensAnchorOptions) {
  const { id, sizeRatio, darkness, plateLines, plateHalo, thickness, minSize, rest, interactive, priority } = options;
  const restX = rest?.[0];
  const restY = rest?.[1];
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry: AnchorEntry = {
      el,
      opts: {
        ...DEFAULTS,
        id,
        ...(sizeRatio !== undefined && { sizeRatio }),
        ...(darkness !== undefined && { darkness }),
        ...(plateLines !== undefined && { plateLines }),
        ...(plateHalo !== undefined && { plateHalo }),
        ...(thickness !== undefined && { thickness }),
        ...(minSize !== undefined && { minSize }),
        ...(restX !== undefined && restY !== undefined && { rest: [restX, restY] as [number, number] }),
        ...(interactive !== undefined && { interactive }),
        ...(priority !== undefined && { priority }),
      },
      near: false,
      touch: { x: 0, y: 0, active: false },
    };
    anchors.set(id, entry);
    getObserver()?.observe(el);

    // Touch: drag the lens with a finger inside interactive anchors.
    const onTouch = (e: PointerEvent) => {
      if (!entry.opts.interactive || e.pointerType === "mouse") return;
      const r = el.getBoundingClientRect();
      entry.touch.x = e.clientX - r.left;
      entry.touch.y = e.clientY - r.top;
      entry.touch.active = true;
      lensStore.dirty = true;
    };
    el.addEventListener("pointerdown", onTouch);
    el.addEventListener("pointermove", onTouch);

    lensStore.dirty = true;
    return () => {
      el.removeEventListener("pointerdown", onTouch);
      el.removeEventListener("pointermove", onTouch);
      getObserver()?.unobserve(el);
      if (anchors.get(id)?.el === el) anchors.delete(id);
      lensStore.dirty = true;
    };
  }, [ref, id, sizeRatio, darkness, plateLines, plateHalo, thickness, minSize, restX, restY, interactive, priority]);
}

/** Programmatically point the lens at a spot inside an interactive anchor (keyboard focus). */
export function focusLensAt(id: string, x: number, y: number) {
  const a = anchors.get(id);
  if (!a) return;
  const r = a.el.getBoundingClientRect();
  a.touch.x = x - r.left;
  a.touch.y = y - r.top;
  a.touch.active = true;
  lensStore.dirty = true;
}
