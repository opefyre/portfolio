"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/motion";

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

/**
 * Lenis smooth scroll + opt-in guided snap.
 *
 * Snap is applied only to sections that carry `data-snap="true"`. The detection
 * runs after the user stops scrolling for ~220ms; if the closest snap section
 * is within 30vh of the viewport top and the user isn't deep inside the section
 * already, the page smoothly aligns to the section top.
 *
 * Sections taller than the viewport (skills, education, projects) MUST NOT have
 * `data-snap` so the user can browse them freely.
 */
export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !reducedMotion,
            touchMultiplier: 2,
        });

        window.__lenis = lenis;

        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // ---- Guided section snap ----
        let snapTimeout: number | null = null;
        let lastDirection = 0;
        let lastY = window.scrollY;
        let isSnapping = false;
        let cooldownUntil = 0;

        const findSnapTargets = () =>
            Array.from(document.querySelectorAll<HTMLElement>("[data-snap='true']"));

        const scheduleSnap = () => {
            if (snapTimeout !== null) window.clearTimeout(snapTimeout);
            snapTimeout = window.setTimeout(() => {
                if (reducedMotion || isSnapping) return;
                if (performance.now() < cooldownUntil) return;

                const vh = window.innerHeight;
                const curY = window.scrollY;
                const targets = findSnapTargets();
                if (targets.length === 0) return;

                // Find the closest snap target whose top is within ±35vh of viewport top.
                let best: { el: HTMLElement; offset: number } | null = null;
                for (const el of targets) {
                    const rect = el.getBoundingClientRect();
                    const top = rect.top; // distance from viewport top
                    const abs = Math.abs(top);
                    // Don't snap if we're past the bottom of this section already
                    if (rect.bottom <= 60) continue;
                    if (abs < vh * 0.35) {
                        if (!best || abs < Math.abs(best.offset)) {
                            best = { el, offset: top };
                        }
                    }
                }
                if (!best) return;

                // Direction sanity: if we're scrolling down but the candidate is above us
                // (already passed), skip — picking it would scroll backwards which feels wrong.
                if (lastDirection > 0 && best.offset < -10) return;
                if (lastDirection < 0 && best.offset > 10) return;

                const targetY = best.el.getBoundingClientRect().top + window.scrollY;
                if (Math.abs(targetY - curY) < 4) return;

                isSnapping = true;
                cooldownUntil = performance.now() + 900;
                lenis.scrollTo(targetY, {
                    duration: 0.8,
                    easing: (t: number) => 1 - Math.pow(1 - t, 3),
                    onComplete: () => {
                        isSnapping = false;
                    },
                });
            }, 220);
        };

        const onScroll = () => {
            const y = window.scrollY;
            const dy = y - lastY;
            if (Math.abs(dy) > 0) lastDirection = Math.sign(dy);
            lastY = y;
            if (isSnapping) return;
            scheduleSnap();
        };

        // Cancel any pending snap on a fresh user gesture
        const cancelSnap = () => {
            if (snapTimeout !== null) {
                window.clearTimeout(snapTimeout);
                snapTimeout = null;
            }
        };

        lenis.on("scroll", onScroll);
        window.addEventListener("wheel", cancelSnap, { passive: true });
        window.addEventListener("touchstart", cancelSnap, { passive: true });

        return () => {
            if (snapTimeout !== null) window.clearTimeout(snapTimeout);
            cancelAnimationFrame(rafId);
            window.removeEventListener("wheel", cancelSnap);
            window.removeEventListener("touchstart", cancelSnap);
            lenis.destroy();
            delete window.__lenis;
        };
    }, [reducedMotion]);

    return <>{children}</>;
}
