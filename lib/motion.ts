"use client";

import { useEffect, useState } from "react";
import type { Transition } from "framer-motion";

/**
 * Single source of truth for motion. Every component should import from here
 * instead of inlining easing literals or magic durations.
 */

// Easing curves used across the app. Two only.
export const easings = {
    /** Default UI ease — calm decel for entrances and reveals. */
    ui: [0.16, 1, 0.3, 1] as const,
    /** Snappier ease for state changes (tabs, toggles). */
    snap: [0.4, 0, 0.2, 1] as const,
};

// Duration tokens in seconds (framer-motion convention).
export const durations = {
    fast: 0.15,
    base: 0.24,
    slow: 0.36,
    /** Reserved for hero-scale entrances. Use sparingly. */
    cinematic: 0.6,
} as const;

// Spring presets. Avoid hand-tuning per component.
export const springs = {
    /** Soft physics for ambient parallax and layout transitions. */
    soft: { stiffness: 200, damping: 25, mass: 1 } satisfies Transition,
    /** Snappy spring for primary controls. */
    snappy: { stiffness: 400, damping: 30, mass: 0.8 } satisfies Transition,
} as const;

/** Common transition presets to avoid redefining. */
export const transitions = {
    enterFast: { duration: durations.fast, ease: easings.ui } satisfies Transition,
    enter: { duration: durations.base, ease: easings.ui } satisfies Transition,
    enterSlow: { duration: durations.slow, ease: easings.ui } satisfies Transition,
} as const;

/**
 * Reduced-motion hook. Returns true when the OS reports
 * `prefers-reduced-motion: reduce`. Components should guard non-informational
 * animations behind this and provide a static fallback.
 *
 * SSR-safe: returns `false` until mounted (no animations skipped on the server
 * render path).
 */
export function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return reduced;
}

/**
 * Returns the given transition, or a near-instant fallback if reduced motion
 * is requested. Use this for animations where you want to *honour* the user
 * preference without removing the motion call entirely.
 */
export function useMotionTransition(t: Transition): Transition {
    const reduced = useReducedMotion();
    if (reduced) return { duration: 0.001 };
    return t;
}
