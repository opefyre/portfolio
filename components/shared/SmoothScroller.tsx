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
 * Lenis smooth scroll + opt-in guided slide snap.
 *
 * Snap rules (in order — all must pass):
 *   1. Section carries `data-snap="true"`
 *   2. User stopped scrolling for ~260ms (debounced)
 *   3. Lenis velocity is near zero (the user's gesture has ended)
 *   4. Target section top is within ±22vh of viewport top
 *   5. Candidate matches the last scroll direction
 *
 * On a snap fire, a 900ms cooldown blocks re-snap so the user can never
 * be trapped in a back-and-forth loop.
 *
 * Sections taller than the viewport (Skills, Education, Projects) MUST
 * NOT have `data-snap`, so the user can browse them freely.
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

        // ---- Guided slide snap ----
        let snapTimeout: number | null = null;
        let lastDirection = 0;
        let lastY = window.scrollY;
        let isSnapping = false;
        let cooldownUntil = 0;

        const PROXIMITY_VH = 0.22; // section top must be within ±22vh
        const VELOCITY_FLOOR = 0.05; // Lenis units; tune so 'still scrolling' doesn't trigger snap
        const SETTLE_MS = 260;

        const findSnapTargets = () =>
            Array.from(document.querySelectorAll<HTMLElement>("[data-snap='true']"));

        const tryFire = () => {
            if (reducedMotion || isSnapping) return;
            if (performance.now() < cooldownUntil) return;

            // Don't snap while Lenis is still actively interpolating.
            const velocity = Math.abs((lenis as unknown as { velocity?: number }).velocity ?? 0);
            if (velocity > VELOCITY_FLOOR) {
                scheduleSnap();
                return;
            }

            const vh = window.innerHeight;
            const curY = window.scrollY;
            const targets = findSnapTargets();
            if (targets.length === 0) return;

            let best: { el: HTMLElement; offset: number } | null = null;
            for (const el of targets) {
                const rect = el.getBoundingClientRect();
                const top = rect.top;
                const abs = Math.abs(top);
                if (rect.bottom <= 80) continue; // already past this slide
                if (abs < vh * PROXIMITY_VH) {
                    if (!best || abs < Math.abs(best.offset)) {
                        best = { el, offset: top };
                    }
                }
            }
            if (!best) return;

            // Direction sanity check: don't snap backwards against the user's last gesture.
            if (lastDirection > 0 && best.offset < -16) return;
            if (lastDirection < 0 && best.offset > 16) return;

            const targetY = best.el.getBoundingClientRect().top + window.scrollY;
            if (Math.abs(targetY - curY) < 6) return;

            isSnapping = true;
            cooldownUntil = performance.now() + 900;
            lenis.scrollTo(targetY, {
                duration: 0.85,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                onComplete: () => {
                    isSnapping = false;
                },
            });
        };

        const scheduleSnap = () => {
            if (snapTimeout !== null) window.clearTimeout(snapTimeout);
            snapTimeout = window.setTimeout(tryFire, SETTLE_MS);
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
        window.addEventListener("keydown", cancelSnap, { passive: true });

        return () => {
            if (snapTimeout !== null) window.clearTimeout(snapTimeout);
            cancelAnimationFrame(rafId);
            window.removeEventListener("wheel", cancelSnap);
            window.removeEventListener("touchstart", cancelSnap);
            window.removeEventListener("keydown", cancelSnap);
            lenis.destroy();
            delete window.__lenis;
        };
    }, [reducedMotion]);

    return <>{children}</>;
}
