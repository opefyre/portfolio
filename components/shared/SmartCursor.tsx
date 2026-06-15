"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Mission-control cursor. A small disc by default; expands into a 56px ring with an
 * optional uppercase label when hovering an interactive surface. Hidden on touch/coarse
 * pointers and when the user requests reduced motion.
 *
 * Triggers are declarative via DOM:
 *   - Native interactive elements (a, button, input, textarea, [role=button]) → ring
 *   - [data-cursor="view"] → label "view"
 *   - [data-cursor="open"] → label "open"
 *   - [data-cursor="copy"] → label "copy"
 *   - [data-cursor="hide"] → cursor hides (use sparingly)
 */
export default function SmartCursor() {
    const reducedMotion = useReducedMotion();
    const dotRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const [active, setActive] = useState(false);

    // Activate only on devices that actually have a fine pointer
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (reducedMotion) return;
        const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setActive(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, [reducedMotion]);

    useEffect(() => {
        if (!active) {
            document.documentElement.classList.remove("smart-cursor-active");
            return;
        }
        document.documentElement.classList.add("smart-cursor-active");
        return () => document.documentElement.classList.remove("smart-cursor-active");
    }, [active]);

    useEffect(() => {
        if (!active) return;
        const dot = dotRef.current;
        const label = labelRef.current;
        if (!dot || !label) return;

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const pos = { x: target.x, y: target.y };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const tick = () => {
            pos.x = lerp(pos.x, target.x, 0.22);
            pos.y = lerp(pos.y, target.y, 0.22);
            dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
            label.style.transform = `translate(${pos.x}px, ${pos.y + 38}px) translate(-50%, -50%)`;
            rafRef.current = requestAnimationFrame(tick);
        };
        tick();

        const onMove = (e: PointerEvent) => {
            target.x = e.clientX;
            target.y = e.clientY;
        };

        const evaluateTarget = (el: Element | null): { hover: boolean; label: string; hide: boolean; press: boolean } => {
            let cur: Element | null = el;
            while (cur && cur instanceof Element) {
                const hint = cur.getAttribute("data-cursor");
                if (hint === "hide") return { hover: false, label: "", hide: true, press: false };
                if (hint && hint !== "true") return { hover: true, label: hint, hide: false, press: false };
                const tag = cur.tagName;
                if (
                    tag === "A" || tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" ||
                    cur.getAttribute("role") === "button" || cur.getAttribute("tabindex") === "0"
                ) {
                    return { hover: true, label: "", hide: false, press: false };
                }
                cur = cur.parentElement;
            }
            return { hover: false, label: "", hide: false, press: false };
        };

        const onPointerOver = (e: PointerEvent) => {
            const state = evaluateTarget(e.target as Element | null);
            dot.classList.toggle("is-hover", state.hover && !state.hide);
            dot.style.opacity = state.hide ? "0" : "1";
            if (state.label) {
                label.textContent = state.label;
                label.classList.add("is-visible");
            } else {
                label.classList.remove("is-visible");
            }
        };

        const onPointerDown = () => dot.classList.add("is-press");
        const onPointerUp = () => dot.classList.remove("is-press");

        const onLeave = () => {
            dot.style.opacity = "0";
            label.classList.remove("is-visible");
        };
        const onEnter = () => {
            dot.style.opacity = "1";
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onPointerOver, { passive: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true });
        window.addEventListener("pointerup", onPointerUp, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onPointerOver);
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointerup", onPointerUp);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [active]);

    if (!active) return null;

    return (
        <>
            <div ref={dotRef} className="smart-cursor" aria-hidden="true" />
            <div ref={labelRef} className="smart-cursor-label" aria-hidden="true" />
        </>
    );
}
