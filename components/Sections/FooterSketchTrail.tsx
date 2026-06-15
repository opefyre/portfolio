"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Pencil-sketch trail rendered onto a canvas overlaid on the cream footer.
 * The pointer leaves a warm sepia ink line that fades over ~1.4s so the
 * surface reads like paper rather than a screen.
 *
 * Implementation notes:
 *  - rAF draws every live stroke each frame and clears the canvas
 *  - Strokes are recorded as line segments between consecutive pointer
 *    samples; stale segments are GC'd once their age exceeds STROKE_LIFE
 *  - Each segment endpoint gets a tiny random jitter so the line doesn't
 *    look mechanically straight
 *  - Canvas is DPR-aware so the line stays crisp on retina
 *  - Reduced-motion: no canvas at all
 */
type Pt = { x: number; y: number };
type Stroke = { from: Pt; to: Pt; born: number; jitter: number };

const STROKE_LIFE_MS = 1400;
const MIN_DIST = 3;
const INK = [60, 35, 10]; // warm sepia

export default function FooterSketchTrail() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const host = canvas.parentElement;
        if (!host) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let dpr = Math.max(1, window.devicePixelRatio || 1);
        let hostRect = host.getBoundingClientRect();
        const strokes: Stroke[] = [];
        let lastPt: Pt | null = null;

        const resize = () => {
            dpr = Math.max(1, window.devicePixelRatio || 1);
            hostRect = host.getBoundingClientRect();
            canvas.width = Math.max(1, Math.floor(hostRect.width * dpr));
            canvas.height = Math.max(1, Math.floor(hostRect.height * dpr));
            canvas.style.width = `${hostRect.width}px`;
            canvas.style.height = `${hostRect.height}px`;
            // Reset transform after canvas.width/height resets it
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        const onMove = (e: PointerEvent) => {
            // Only track inside the footer
            const x = e.clientX - hostRect.left;
            const y = e.clientY - hostRect.top;
            if (x < 0 || y < 0 || x > hostRect.width || y > hostRect.height) {
                lastPt = null;
                return;
            }
            if (lastPt) {
                const dx = x - lastPt.x;
                const dy = y - lastPt.y;
                if (dx * dx + dy * dy >= MIN_DIST * MIN_DIST) {
                    strokes.push({
                        from: lastPt,
                        to: { x, y },
                        born: performance.now(),
                        jitter: (Math.random() - 0.5) * 1.2,
                    });
                    lastPt = { x, y };
                }
            } else {
                lastPt = { x, y };
            }
        };
        const onLeave = () => { lastPt = null; };

        // Keep the rect fresh on scroll (the footer translates during reveal)
        const onScroll = () => { hostRect = host.getBoundingClientRect(); };

        document.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);
        window.addEventListener("scroll", onScroll, { passive: true });

        let raf = 0;
        const tick = () => {
            ctx.clearRect(0, 0, hostRect.width, hostRect.height);
            const now = performance.now();
            // Filter stale strokes in-place
            let w = 0;
            for (let r = 0; r < strokes.length; r++) {
                if (now - strokes[r].born < STROKE_LIFE_MS) {
                    strokes[w++] = strokes[r];
                }
            }
            strokes.length = w;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            for (let i = 0; i < strokes.length; i++) {
                const s = strokes[i];
                const age = (now - s.born) / STROKE_LIFE_MS;
                const fade = 1 - age;
                const alpha = (fade * fade) * 0.55; // ease-out fade
                if (alpha <= 0.01) continue;
                ctx.strokeStyle = `rgba(${INK[0]},${INK[1]},${INK[2]},${alpha.toFixed(3)})`;
                ctx.lineWidth = 1.0 + fade * 1.4;
                ctx.beginPath();
                ctx.moveTo(s.from.x, s.from.y + s.jitter);
                ctx.lineTo(s.to.x, s.to.y - s.jitter);
                ctx.stroke();
            }

            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            document.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("scroll", onScroll);
            ro.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [reducedMotion]);

    if (reducedMotion) return null;
    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
        />
    );
}
