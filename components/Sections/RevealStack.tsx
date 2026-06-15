"use client";

import { ReactNode, useEffect, useRef } from "react";

interface RevealStackProps {
    children: ReactNode;
    footer: ReactNode;
}

/**
 * 'New page rolling over' reveal — rAF-polled so it survives Lenis.
 *
 * Layout:
 *   wrap (relative)
 *     ├─ <Selected Work />              (transformed when overshooting)
 *     ├─ spacer 100dvh                  (NEVER transformed — used as the
 *     │                                  natural scroll reference)
 *     └─ footer (position: fixed)       (slides in from below via translateY)
 *
 * Math (per frame):
 *   spacerTop = spacer.getBoundingClientRect().top      (natural scroll ref)
 *   overshoot = clamp(0, vh - spacerTop, vh)
 *   sw.transform   = translateY(overshoot)              (visually pins SW)
 *   footer.transform = translateY((1 - overshoot/vh) * 100%)
 *
 * Why poll instead of listen: with Lenis hijacking scroll, neither native
 * 'scroll' events on window nor Lenis's own 'scroll' event fire reliably
 * for every visual position change. A continuous rAF tick (one
 * getBoundingClientRect + two style writes per frame) is cheap and
 * deterministic.
 *
 * Why read the SPACER's rect and not SW's: SW gets transformed each frame,
 * so its getBoundingClientRect would include the transform and create a
 * fixed-point feedback loop. The spacer is a plain, never-transformed
 * sibling.
 */
export default function RevealStack({ children, footer }: RevealStackProps) {
    const swRef = useRef<HTMLDivElement>(null);
    const spacerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sw = swRef.current;
        const spacer = spacerRef.current;
        const footerEl = footerRef.current;
        if (!sw || !spacer || !footerEl) return;

        let rafId = 0;
        let lastSwY = -Infinity;
        let lastFooterY = -Infinity;

        const tick = () => {
            const spacerRect = spacer.getBoundingClientRect();
            const vh = window.innerHeight;

            const raw = vh - spacerRect.top;
            const overshoot = Math.max(0, Math.min(vh, raw));

            // Only write to the DOM if the value actually changed by ≥ 0.5px,
            // so we don't trigger needless style invalidation when idle.
            if (Math.abs(overshoot - lastSwY) >= 0.5) {
                lastSwY = overshoot;
                sw.style.transform = `translate3d(0, ${overshoot}px, 0)`;
            }
            const footerTranslate = (1 - overshoot / vh) * 100;
            if (Math.abs(footerTranslate - lastFooterY) >= 0.1) {
                lastFooterY = footerTranslate;
                footerEl.style.transform = `translate3d(0, ${footerTranslate}%, 0)`;
            }

            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="relative">
            {/* Selected Work — gets translated down when overshooting */}
            <div ref={swRef} style={{ willChange: "transform" }} className="relative z-0">
                {children}
            </div>

            {/* Spacer — NEVER transformed. Used as the natural-scroll reference. */}
            <div
                ref={spacerRef}
                aria-hidden="true"
                className="h-[100dvh] pointer-events-none"
            />

            {/* Footer — fixed at viewport bottom, slides up via translate */}
            <div
                ref={footerRef}
                style={{ transform: "translate3d(0, 100%, 0)", willChange: "transform" }}
                className="fixed bottom-0 left-0 right-0 h-[100dvh] z-50"
            >
                {footer}
            </div>
        </div>
    );
}
