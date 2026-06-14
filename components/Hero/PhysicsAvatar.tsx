"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

interface PhysicsAvatarProps {
    src: string;
    alt: string;
    /** Avatar diameter in CSS pixels (matches design system). */
    size?: number;
    /** id of the parent canvas element. The avatar is constrained to its bounds. */
    canvasId: string;
    /** Px from canvas LEFT. Wins if both left + right are provided. */
    initialOffsetLeft?: number;
    /** Px from canvas RIGHT. Used when initialOffsetLeft is undefined. */
    initialOffsetRight?: number;
    /** Px from canvas TOP. */
    initialOffsetTop?: number;
}

/**
 * Production-grade physics-driven avatar.
 *
 * Mechanics:
 *  - Semi-implicit Euler integration with capped dt for stability
 *  - Pointer drag with offset; pointer capture so the avatar follows even when
 *    the cursor leaves the avatar's box mid-drag
 *  - Release velocity is computed from a sliding 100ms window of pointer
 *    samples (weighted average), then clamped to a max throw speed so a
 *    flick doesn't yeet it through walls in one frame
 *  - Gravity, air drag (per-second exponential), ground friction
 *  - Wall + floor restitution with separate coefficients
 *  - Squish/stretch deformation triggered by impact normal velocity, eased
 *    back to identity over ~180ms
 *  - Idle: subtle two-axis sine float when speed < threshold AND not resting
 *    on the floor (rest on floor is its own quiet state — no jitter)
 *  - Reduced-motion fallback: static avatar in the initial position, no rAF
 *
 * Rendering: a single requestAnimationFrame loop writes inline transform on
 * the avatar element. No React re-renders during physics — refs only.
 */
export default function PhysicsAvatar({
    src,
    alt,
    size = 156,
    canvasId,
    initialOffsetLeft,
    initialOffsetRight = 80,
    initialOffsetTop,
}: PhysicsAvatarProps) {
    const reducedMotion = useReducedMotion();
    const avatarRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLElement | null>(null);

    // Physics state — refs avoid re-renders
    const pos = useRef({ x: 0, y: 0 });
    const vel = useRef({ vx: 0, vy: 0 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const pointerHistory = useRef<Array<{ x: number; y: number; t: number }>>([]);
    const lastTick = useRef<number | null>(null);
    const rafId = useRef<number | null>(null);
    const idleT = useRef(0);
    // Impact deformation amplitude (1 = neutral, < 1 squish axis, > 1 stretch axis)
    const squishX = useRef(0); // 0 = neutral; positive = pull-toward-horizontal
    const squishY = useRef(0); // 0 = neutral; positive = pull-toward-vertical
    const initialized = useRef(false);

    // --- physics constants -----------------------------------------------
    // Lighter, calmer ball — less gravity, more air drag, smaller bounce
    const GRAVITY = 850;          // px/s² — lighter fall
    const AIR_DRAG = 1.0;         // exponential per second (vel *= exp(-drag*dt))
    const GROUND_FRICTION = 2.4;  // exponential per second on the X axis when grounded
    const WALL_RESTITUTION = 0.45;
    const FLOOR_RESTITUTION = 0.28;
    const CEIL_RESTITUTION = 0.35;
    const REST_SPEED = 18;        // below this on floor → settle (no float)
    const FLOAT_AMP_PX = 4;
    const FLOAT_HZ = 0.5;         // ~1 cycle per 2s
    const MAX_THROW_SPEED = 2400; // px/s, prevents tunneling
    const SQUISH_RECOVER = 10;    // 1/s recovery rate of squish toward 0
    const SQUISH_GAIN = 0.00028;  // velocity (px/s) → unit deformation (gentler)

    // Initial placement: wait until the canvas has a real measured size.
    // Use a ResizeObserver AND a rAF retry — iframes / dev hot-reload often
    // report 0 width on the first layout pass, so we keep retrying until
    // either the observer or rAF picks up the real dimensions.
    useLayoutEffect(() => {
        const canvas = document.getElementById(canvasId);
        canvasRef.current = canvas;
        const avatar = avatarRef.current;
        if (!canvas || !avatar) return;

        const place = (): boolean => {
            const r = canvas.getBoundingClientRect();
            if (r.width <= 0 || r.height <= 0) return false;
            const startX = initialOffsetLeft !== undefined
                ? Math.max(0, Math.min(r.width - size, initialOffsetLeft))
                : Math.max(0, r.width - size - initialOffsetRight);
            const startY = initialOffsetTop ?? Math.max(0, r.height * 0.35);
            pos.current.x = startX;
            pos.current.y = startY;
            // Switch from CSS right/top/left to JS-driven translate
            avatar.style.right = "auto";
            avatar.style.left = "0px";
            avatar.style.top = "0px";
            avatar.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
            initialized.current = true;
            return true;
        };

        if (place()) return;

        let raf = 0;
        let attempts = 0;
        const retry = () => {
            if (initialized.current) return;
            if (place()) return;
            if (++attempts < 60) raf = requestAnimationFrame(retry);
        };
        raf = requestAnimationFrame(retry);

        const ro = new ResizeObserver(() => {
            if (initialized.current) return;
            place();
        });
        ro.observe(canvas);

        return () => {
            ro.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [canvasId, size, initialOffsetLeft, initialOffsetRight, initialOffsetTop]);

    // Physics loop
    useEffect(() => {
        if (reducedMotion) return;
        const avatar = avatarRef.current;
        if (!avatar) return;

        const step = (now: number) => {
            const dtRaw = lastTick.current == null ? 16 : now - lastTick.current;
            // Clamp dt to keep physics stable on tab-switch resume
            const dt = Math.min(0.033, Math.max(0.001, dtRaw / 1000));
            lastTick.current = now;

            const canvas = canvasRef.current;
            if (!canvas || !initialized.current) {
                rafId.current = requestAnimationFrame(step);
                return;
            }
            const r = canvas.getBoundingClientRect();
            const maxX = Math.max(0, r.width - size);
            const maxY = Math.max(0, r.height - size);

            // Decay squish toward neutral
            const squishDecay = Math.exp(-SQUISH_RECOVER * dt);
            squishX.current *= squishDecay;
            squishY.current *= squishDecay;

            if (!isDragging.current) {
                const grounded = pos.current.y >= maxY - 0.5;

                // Integrate forces (semi-implicit Euler)
                vel.current.vy += GRAVITY * dt;
                vel.current.vx *= Math.exp(-AIR_DRAG * dt);
                vel.current.vy *= Math.exp(-AIR_DRAG * dt);
                if (grounded) {
                    vel.current.vx *= Math.exp(-GROUND_FRICTION * dt);
                }

                pos.current.x += vel.current.vx * dt;
                pos.current.y += vel.current.vy * dt;

                // Wall collisions
                if (pos.current.x < 0) {
                    pos.current.x = 0;
                    if (vel.current.vx < 0) {
                        squishY.current = Math.min(0.45, Math.abs(vel.current.vx) * SQUISH_GAIN);
                        vel.current.vx = -vel.current.vx * WALL_RESTITUTION;
                    }
                } else if (pos.current.x > maxX) {
                    pos.current.x = maxX;
                    if (vel.current.vx > 0) {
                        squishY.current = Math.min(0.45, Math.abs(vel.current.vx) * SQUISH_GAIN);
                        vel.current.vx = -vel.current.vx * WALL_RESTITUTION;
                    }
                }
                if (pos.current.y < 0) {
                    pos.current.y = 0;
                    if (vel.current.vy < 0) {
                        squishX.current = Math.min(0.45, Math.abs(vel.current.vy) * SQUISH_GAIN);
                        vel.current.vy = -vel.current.vy * CEIL_RESTITUTION;
                    }
                } else if (pos.current.y > maxY) {
                    pos.current.y = maxY;
                    if (vel.current.vy > 0) {
                        squishX.current = Math.min(0.45, Math.abs(vel.current.vy) * SQUISH_GAIN);
                        vel.current.vy = -vel.current.vy * FLOOR_RESTITUTION;
                    }
                }

                // Settle: when on the floor with negligible energy, fully stop
                const speed = Math.hypot(vel.current.vx, vel.current.vy);
                const onFloor = pos.current.y >= maxY - 0.5;
                if (onFloor && speed < REST_SPEED) {
                    vel.current.vx = 0;
                    vel.current.vy = 0;
                }

                // Idle subtle float — only while in mid-air at near-zero velocity
                let floatX = 0;
                let floatY = 0;
                if (!onFloor && speed < 0.6) {
                    idleT.current += dt * FLOAT_HZ * Math.PI * 2;
                    floatY = Math.sin(idleT.current) * FLOAT_AMP_PX;
                    floatX = Math.sin(idleT.current * 0.7 + 1.1) * FLOAT_AMP_PX * 0.6;
                } else {
                    idleT.current = 0;
                }

                const renderX = pos.current.x + floatX;
                const renderY = pos.current.y + floatY;
                const scaleX = 1 + squishX.current - squishY.current * 0.5;
                const scaleY = 1 + squishY.current - squishX.current * 0.5;
                avatar.style.transform = `translate3d(${renderX}px, ${renderY}px, 0) scale(${scaleX}, ${scaleY})`;
            } else {
                // While dragging, scale is just a small grab pop (handled via class)
                const scaleX = 1 + squishX.current;
                const scaleY = 1 + squishY.current;
                avatar.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scaleX}, ${scaleY})`;
            }

            rafId.current = requestAnimationFrame(step);
        };

        rafId.current = requestAnimationFrame(step);
        return () => {
            if (rafId.current != null) cancelAnimationFrame(rafId.current);
            rafId.current = null;
            lastTick.current = null;
        };
    }, [reducedMotion, size]);

    // Pointer handlers
    useEffect(() => {
        if (reducedMotion) return;
        const avatar = avatarRef.current;
        if (!avatar) return;

        const localPointer = (e: PointerEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return { x: 0, y: 0 };
            const r = canvas.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        };

        const onPointerDown = (e: PointerEvent) => {
            // Only primary button / touch
            if (e.button !== 0 && e.pointerType === "mouse") return;
            try {
                avatar.setPointerCapture(e.pointerId);
            } catch {
                /* synthetic events or unsupported browsers — capture failure is non-fatal */
            }
            e.preventDefault();
            isDragging.current = true;
            const p = localPointer(e);
            dragOffset.current.x = p.x - pos.current.x;
            dragOffset.current.y = p.y - pos.current.y;
            pointerHistory.current = [{ x: p.x, y: p.y, t: performance.now() }];
            vel.current.vx = 0;
            vel.current.vy = 0;
            avatar.classList.add("is-dragging");
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const r = canvas.getBoundingClientRect();
            const maxX = Math.max(0, r.width - size);
            const maxY = Math.max(0, r.height - size);
            const p = localPointer(e);
            const newX = Math.max(0, Math.min(maxX, p.x - dragOffset.current.x));
            const newY = Math.max(0, Math.min(maxY, p.y - dragOffset.current.y));
            pos.current.x = newX;
            pos.current.y = newY;

            const t = performance.now();
            pointerHistory.current.push({ x: p.x, y: p.y, t });
            // Keep a 100ms sliding window
            const cutoff = t - 100;
            while (pointerHistory.current.length > 2 && pointerHistory.current[0].t < cutoff) {
                pointerHistory.current.shift();
            }
        };

        const finishDrag = (e: PointerEvent) => {
            if (!isDragging.current) return;
            try { avatar.releasePointerCapture(e.pointerId); } catch { /* noop */ }
            isDragging.current = false;
            avatar.classList.remove("is-dragging");

            // Weighted release velocity from the 100ms window
            const hist = pointerHistory.current;
            if (hist.length >= 2) {
                const recent = hist[hist.length - 1];
                const oldest = hist[0];
                const dt = (recent.t - oldest.t) / 1000;
                if (dt > 0.012) {
                    let vx = (recent.x - oldest.x) / dt;
                    let vy = (recent.y - oldest.y) / dt;
                    const sp = Math.hypot(vx, vy);
                    if (sp > MAX_THROW_SPEED) {
                        vx *= MAX_THROW_SPEED / sp;
                        vy *= MAX_THROW_SPEED / sp;
                    }
                    vel.current.vx = vx;
                    vel.current.vy = vy;
                }
            }
            pointerHistory.current = [];
        };

        // pointerdown on the avatar; move + up on the document so the drag
        // continues even if the cursor leaves the avatar's bounds.
        avatar.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", finishDrag);
        document.addEventListener("pointercancel", finishDrag);

        return () => {
            avatar.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", finishDrag);
            document.removeEventListener("pointercancel", finishDrag);
        };
    }, [reducedMotion, size]);

    // Window resize → clamp position inside the new canvas
    useEffect(() => {
        const onResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const r = canvas.getBoundingClientRect();
            const maxX = Math.max(0, r.width - size);
            const maxY = Math.max(0, r.height - size);
            pos.current.x = Math.max(0, Math.min(maxX, pos.current.x));
            pos.current.y = Math.max(0, Math.min(maxY, pos.current.y));
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [size]);

    // Reduced-motion fallback: static, no rAF
    if (reducedMotion) {
        return (
            <div
                className="absolute right-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ width: size, height: size }}
                aria-hidden="false"
            >
                <AvatarVisual src={src} alt={alt} size={size} />
            </div>
        );
    }

    // CSS pre-position via right/top — so the avatar is in the right place
    // EVEN BEFORE the physics effect runs. The effect then converts the
    // visual position into x/y refs and applies translate3d, replacing the
    // initial right/top positioning.
    return (
        <div
            ref={avatarRef}
            className="absolute z-20 select-none touch-none cursor-grab active:cursor-grabbing avatar-physics group/avatar"
            style={{
                width: size,
                height: size,
                willChange: "transform",
                transformOrigin: "50% 50%",
                ...(initialOffsetLeft !== undefined
                    ? { left: `${initialOffsetLeft}px` }
                    : { right: `${initialOffsetRight}px` }),
                top: `${initialOffsetTop ?? 140}px`,
            }}
            role="button"
            aria-label={`${alt} — drag me`}
            data-cursor="grab"
        >
            <AvatarVisual src={src} alt={alt} size={size} />
        </div>
    );
}

// Pure visual sub-component (the photo capsule + ring decoration)
function AvatarVisual({ src, alt, size }: { src: string; alt: string; size: number }) {
    return (
        <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-white/30 via-white/5 to-white/15 pointer-events-none">
            {/* Dashed ring decoration — purely visual, sticks out beyond the body */}
            <svg
                viewBox="0 0 200 200"
                className="absolute inset-[-14px] w-[calc(100%+28px)] h-[calc(100%+28px)] text-brand-blue/40 pointer-events-none"
                aria-hidden="true"
            >
                <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
            </svg>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-deep pointer-events-none">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={`${size}px`}
                    className="object-[center_15%] object-cover"
                    priority
                    draggable={false}
                />
            </div>
        </div>
    );
}
