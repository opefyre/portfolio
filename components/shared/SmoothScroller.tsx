"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";

declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Single source of truth for scroll.
 *
 *  - GSAP's ticker drives Lenis's raf so we never get two raf loops fighting
 *  - Lenis 'scroll' event keeps ScrollTrigger in sync with smooth-scrolled position
 *  - On reduced motion, Lenis becomes a passthrough and snap is disabled
 *
 * Guided slide snap:
 *  - Fires only when ALL of: section has data-snap, user settled (no input
 *    for ~260ms), Lenis velocity is near zero, section top is within ±22vh,
 *    and the candidate matches the user's last scroll direction
 *  - 900ms cooldown after each snap so the user can never get trapped
 */
export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !reducedMotion,
            touchMultiplier: 2,
        });
        window.__lenis = lenis;

        // Single ticker. GSAP drives Lenis; Lenis drives ScrollTrigger.
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onLenisScroll);

        const gsapTicker = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(gsapTicker);
        gsap.ticker.lagSmoothing(0);

        // ---- Guided slide snap ----
        let snapTimeout: number | null = null;
        let lastDirection = 0;
        let lastY = window.scrollY;
        let isSnapping = false;
        let cooldownUntil = 0;

        const PROXIMITY_VH = 0.22;
        const VELOCITY_FLOOR = 0.05;
        const SETTLE_MS = 260;

        const findSnapTargets = () =>
            Array.from(document.querySelectorAll<HTMLElement>("[data-snap='true']"));

        const tryFire = () => {
            if (reducedMotion || isSnapping) return;
            if (performance.now() < cooldownUntil) return;

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
                if (rect.bottom <= 80) continue;
                if (abs < vh * PROXIMITY_VH) {
                    if (!best || abs < Math.abs(best.offset)) {
                        best = { el, offset: top };
                    }
                }
            }
            if (!best) return;

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

        const onScrollListener = () => {
            const y = window.scrollY;
            const dy = y - lastY;
            if (Math.abs(dy) > 0) lastDirection = Math.sign(dy);
            lastY = y;
            if (isSnapping) return;
            scheduleSnap();
        };
        lenis.on("scroll", onScrollListener);

        const cancelSnap = () => {
            if (snapTimeout !== null) {
                window.clearTimeout(snapTimeout);
                snapTimeout = null;
            }
        };
        window.addEventListener("wheel", cancelSnap, { passive: true });
        window.addEventListener("touchstart", cancelSnap, { passive: true });
        window.addEventListener("keydown", cancelSnap, { passive: true });

        return () => {
            if (snapTimeout !== null) window.clearTimeout(snapTimeout);
            window.removeEventListener("wheel", cancelSnap);
            window.removeEventListener("touchstart", cancelSnap);
            window.removeEventListener("keydown", cancelSnap);
            gsap.ticker.remove(gsapTicker);
            ScrollTrigger.getAll().forEach((s) => s.kill());
            lenis.destroy();
            delete window.__lenis;
        };
    }, [reducedMotion]);

    return <>{children}</>;
}
