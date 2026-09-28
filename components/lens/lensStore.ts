/**
 * Mutable, non-React state shared between the DOM and the WebGL lens.
 *
 * Everything here is read inside `useFrame` (every animation frame), so it is
 * deliberately a plain object mutated in place: no React state, no
 * allocation per frame, no re-renders.
 */

export type LensAppearance = {
  /** 0 = clear studio glass, 1 = darkened / simplified (footer). */
  darkness: number;
};

export type LensPlacement = {
  /** Screen-space centre of the lens in CSS pixels. */
  x: number;
  y: number;
  /** Target on-screen diameter in CSS pixels. */
  size: number;
  darkness: number;
  /** Glass thickness for the active anchor. */
  thickness: number;
  /** Whether a placement is active at all (lens hidden otherwise). */
  visible: boolean;
};

export const lensStore = {
  pointer: {
    /** Normalised device coords, -1..1 (y up). */
    x: 0,
    y: 0,
    /** Velocity in NDC units / second, smoothed. */
    vx: 0,
    vy: 0,
    /** True once the pointer has moved at least once (hover-capable device). */
    seen: false,
    lastTime: 0,
  },
  scroll: {
    /** Scroll velocity in px / frame as reported by Lenis (signed). */
    velocity: 0,
  },
  /** Where the lens should currently sit. Written by the anchor system. */
  placement: {
    x: 0,
    y: 0,
    size: 0,
    darkness: 0,
    thickness: 0.95,
    visible: false,
  } as LensPlacement,
  reducedMotion: false,
  /** Set when anything changed that requires a new frame in demand mode. */
  dirty: true,
};

let listening = false;

/** Global pointer tracking. The canvas itself never receives pointer events. */
export function startPointerTracking() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  const p = lensStore.pointer;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return; // touch handled as tap/drag elsewhere
    const now = performance.now();
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    if (p.seen) {
      const dt = Math.max(1, now - p.lastTime) / 1000;
      const ivx = (nx - p.x) / dt;
      const ivy = (ny - p.y) / dt;
      // light smoothing of instantaneous velocity
      p.vx += (ivx - p.vx) * 0.35;
      p.vy += (ivy - p.vy) * 0.35;
    }
    p.x = nx;
    p.y = ny;
    p.lastTime = now;
    p.seen = true;
    lensStore.dirty = true;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
}
