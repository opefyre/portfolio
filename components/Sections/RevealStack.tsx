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
 *   spacerRect = spacer.getBoundingClientRect()          (natural scroll ref)
 *   overshoot  = clamp(0, spacerRect.height - spacerRect.top, spacerRect.height)
 *   sw.transform     = translateY(overshoot px)          (visually pins SW)
 *   footer.transform = translateY((spacerRect.height - overshoot) px)
 *
 * Why the spacer's own height is the reference (not window.innerHeight):
 * on mobile Chrome the URL bar collapses/expands during scroll, which
 * makes window.innerHeight oscillate. If we mix `spacer.top` (from a
 * layout snapshot) with `window.innerHeight` (from another moment), the
 * math shifts under the animation and the footer stutters. Reading BOTH
 * numbers from the same getBoundingClientRect call keeps them consistent.
 *
 * Why the footer transform is in px, not %: with `h-[100dvh]`, the
 * footer's own height changes with the URL bar too, so a percent
 * translate resolves to a different pixel offset frame-to-frame. Pixels
 * decouple the transform from the element's own size.
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

        // iOS rubber-band bounces during overscroll feed weird bounding-rect
        // values into the math (top can go below 0 with velocity). Locking
        // overscroll on the root scroller stops the bounce and makes the
        // reveal always start from the same reference point.
        const prevBehavior = document.documentElement.style.overscrollBehaviorY;
        document.documentElement.style.overscrollBehaviorY = "none";

        let rafId = 0;

        const tick = () => {
            // Read BOTH values from the same layout snapshot so they are
            // internally consistent even while the URL bar is animating.
            const spacerRect = spacer.getBoundingClientRect();
            const refH = spacerRect.height;
            const raw = refH - spacerRect.top;
            const overshoot = Math.max(0, Math.min(refH, raw));
            const footerPx = refH - overshoot;

            // No threshold — GPU-composited transform writes are effectively
            // free once the layer exists, and gating them by cumulative delta
            // caused visible sub-pixel stepping on slow mobile scrolls.
            sw.style.transform = `translate3d(0, ${overshoot}px, 0)`;
            footerEl.style.transform = `translate3d(0, ${footerPx}px, 0)`;

            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(rafId);
            document.documentElement.style.overscrollBehaviorY = prevBehavior;
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

            {/* Footer — fixed at viewport bottom, slides up via translate. Initial
                transform is huge (10_000px) so the first paint keeps it fully
                offscreen even before the rAF sets a real value; this avoids a
                one-frame flash if the tick lands after the browser paints. */}
            <div
                ref={footerRef}
                style={{ transform: "translate3d(0, 10000px, 0)", willChange: "transform" }}
                className="fixed bottom-0 left-0 right-0 h-[100dvh] z-50"
            >
                {footer}
            </div>
        </div>
    );
}
