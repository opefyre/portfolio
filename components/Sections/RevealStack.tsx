"use client";

import { ReactNode, useEffect, useRef } from "react";

interface RevealStackProps {
    children: ReactNode;
    footer: ReactNode;
}

/**
 * 'New page rolling over' reveal:
 *  - `children` (Selected Work) scrolls normally
 *  - When SW's bottom reaches viewport bottom, SW is visually PINNED in
 *    place via a transform (its scroll-up motion is cancelled)
 *  - At the same time the fixed-positioned footer slides up FROM BELOW
 *    via translateY(100% → 0%), covering SW like a cover sheet
 *  - End of SW = end of website. Document height = SW height + 100vh
 *    of 'reveal scroll room'
 *
 * Implemented in JS rather than CSS sticky because Lenis smooth-scroll
 * can interfere with sticky-bottom engagement timing — JS gives us a
 * deterministic, frame-accurate reveal.
 */
export default function RevealStack({ children, footer }: RevealStackProps) {
    const swWrapRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const lastY = useRef<number>(-1);

    useEffect(() => {
        const update = () => {
            rafRef.current = null;
            const swWrap = swWrapRef.current;
            const footerEl = footerRef.current;
            if (!swWrap || !footerEl) return;

            const swRect = swWrap.getBoundingClientRect();
            const vh = window.innerHeight;

            if (swRect.bottom > vh) {
                // SW hasn't reached the end yet — normal scroll
                if (swWrap.style.transform !== "") swWrap.style.transform = "";
                if (footerEl.style.transform !== "translateY(100%)") footerEl.style.transform = "translateY(100%)";
            } else {
                // SW end reached. PIN it visually at the bottom of viewport by translating
                // it down by the same amount it would have scrolled past
                const overshoot = vh - swRect.bottom; // 0 -> vh as user scrolls into the reveal zone
                const clamped = Math.max(0, Math.min(vh, overshoot));
                swWrap.style.transform = `translate3d(0, ${clamped}px, 0)`;

                // Footer slides up over the now-pinned SW
                const progress = clamped / vh; // 0 -> 1
                footerEl.style.transform = `translate3d(0, ${(1 - progress) * 100}%, 0)`;
            }
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (y === lastY.current) return;
            lastY.current = y;
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", update);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="relative">
            {/* SW wrapper — gets translated down when pinned so it stays at viewport bottom */}
            <div ref={swWrapRef} style={{ willChange: "transform" }} className="relative z-0">
                {children}
            </div>

            {/* 100dvh of scroll room AFTER SW so the footer reveal has room to play through */}
            <div aria-hidden="true" className="h-[100dvh] pointer-events-none" />

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
