"use client";

import { Experience, Position } from "@/lib/db";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion, easings } from "@/lib/motion";
import clsx from "clsx";

interface ExperienceStackProps {
    experiences: Experience[];
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function earliestYear(period: string): string {
    const m = period.match(/\b(19|20)\d{2}\b/);
    return m ? m[0] : "—";
}

function latestYear(period: string): string {
    const matches = Array.from(period.matchAll(/\b(19|20)\d{2}\b/g));
    if (matches.length === 0) return /present/i.test(period) ? "now" : "—";
    return matches[matches.length - 1][0];
}

function StationCard({ role, index, total }: { role: Experience; index: number; total: number }) {
    const allPositions: Position[] = role.positions ?? [];
    const startYear = earliestYear(allPositions[allPositions.length - 1]?.period ?? "");
    const endYear = latestYear(allPositions[0]?.period ?? "");

    return (
        <article className="station relative h-full w-screen flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 lg:px-20 py-24 lg:py-28">
            {/* Massive year numerals — editorial display */}
            <div className="lg:col-span-5 flex flex-col justify-between order-1 lg:order-1">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="label-mono text-brand-blue">
                            STATION {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <span aria-hidden="true" className="h-px w-12 bg-brand-blue/40" />
                    </div>
                    <h3 className="font-display font-medium text-3xl md:text-5xl text-primary leading-[0.95] tracking-tight">
                        {role.company}
                    </h3>
                    <p className="label-mono text-tertiary">{role.location}</p>
                </div>

                {/* The year span — editorial italic numerals */}
                <div className="mt-10 lg:mt-0">
                    <div className="label-mono text-tertiary mb-2">— TENURE</div>
                    <div className="flex items-end gap-4">
                        <span className="font-editorial italic text-brand-blue text-[clamp(5rem,12vw,12rem)] leading-[0.8] tabular-nums">
                            {startYear}
                        </span>
                        <span className="font-editorial italic text-tertiary text-[clamp(2.5rem,5vw,5rem)] leading-[0.8] tabular-nums pb-3">
                            → {endYear}
                        </span>
                    </div>
                </div>
            </div>

            {/* Positions + achievements — scrollable column */}
            <div className="lg:col-span-7 order-2 lg:order-2 space-y-8 lg:max-h-[78vh] lg:overflow-y-auto pr-3 custom-scrollbar">
                {allPositions.map((pos, pIdx) => (
                    <div key={pIdx} className="border-l-2 border-border hover:border-brand-blue/60 transition-colors pl-5 py-1">
                        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1.5">
                            <h4 className="font-display text-lg md:text-2xl font-medium text-primary leading-tight">
                                {pos.title}
                            </h4>
                            <span className="label-mono text-tertiary">{pos.period}</span>
                        </div>
                        <ul className="mt-3 space-y-2.5">
                            {pos.achievements.map((item, i) => (
                                <li key={i} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                                    <span aria-hidden="true" className="text-brand-blue mt-1.5 text-[8px]">◆</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </article>
    );
}

export default function ExperienceStack({ experiences }: ExperienceStackProps) {
    const reducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [activeStation, setActiveStation] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    // Track viewport size
    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsDesktop(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    // GSAP ScrollTrigger pinned horizontal — desktop only, motion-allowed only
    useIsomorphicLayoutEffect(() => {
        if (!isDesktop || reducedMotion) return;
        if (!sectionRef.current || !trackRef.current) return;

        let st: { kill: () => void } | null = null;
        let cleanup = () => {};

        (async () => {
            const gsapMod = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsapMod.registerPlugin(ScrollTrigger);

            // Bridge Lenis ↔ ScrollTrigger so smooth scroll and pinning stay in sync
            const lenis = window.__lenis;
            const lenisHandler = () => ScrollTrigger.update();
            lenis?.on("scroll", lenisHandler);
            const gsapTickerFn = (time: number) => lenis?.raf(time * 1000);
            if (lenis) gsapMod.ticker.add(gsapTickerFn);
            gsapMod.ticker.lagSmoothing(0);

            const section = sectionRef.current!;
            const track = trackRef.current!;
            const stations = track.querySelectorAll<HTMLElement>(".station");

            // Compute drift: width of track minus one viewport
            const computeDistance = () => track.scrollWidth - window.innerWidth;

            const tween = gsapMod.to(track, {
                x: () => -computeDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${computeDistance()}`,
                    pin: true,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        setProgress(self.progress);
                        const idx = Math.min(stations.length - 1, Math.round(self.progress * (stations.length - 1)));
                        setActiveStation(idx);
                    },
                },
            });

            st = tween.scrollTrigger ?? null;

            cleanup = () => {
                tween.kill();
                st?.kill();
                lenis?.off("scroll", lenisHandler);
                if (lenis) gsapMod.ticker.remove(gsapTickerFn);
                ScrollTrigger.getAll().forEach((s) => s.kill());
            };
        })();

        return () => cleanup();
    }, [isDesktop, reducedMotion, experiences.length]);

    return (
        <section ref={sectionRef} className="relative w-full" id="experience">
            {/* Section header — visible at start and again on mobile */}
            <div className="container-wide pt-24 pb-12 lg:pb-8 relative z-20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="label-mono bracket text-brand-blue">EXPERIENCE</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight leading-[0.95] max-w-2xl">
                        Professional history,
                        <br />
                        <span className="editorial text-tertiary">station by station</span>
                    </h2>
                    {isDesktop && !reducedMotion && (
                        <p className="label-mono text-tertiary max-w-xs">
                            ↓ scroll to pan the timeline horizontally →
                        </p>
                    )}
                </div>
            </div>

            {/* Desktop: pinned horizontal track */}
            {isDesktop && !reducedMotion ? (
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            ref={trackRef}
                            className="flex"
                            style={{ width: `${experiences.length * 100}vw` }}
                        >
                            {experiences.map((role, idx) => (
                                <StationCard key={idx} role={role} index={idx} total={experiences.length} />
                            ))}
                        </div>
                    </div>

                    {/* Progress indicator — top-fixed inside the pinned viewport */}
                    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
                        <div className="container-wide pt-6">
                            <div className="flex items-center gap-3">
                                <span className="label-mono text-tertiary">JOURNEY</span>
                                <div className="flex-1 relative h-px bg-white/10">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-brand-blue origin-left"
                                        style={{ scaleX: progress }}
                                        transition={{ ease: easings.ui }}
                                    />
                                </div>
                                <span className="label-mono text-brand-blue tabular-nums">
                                    {String(activeStation + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Mobile / reduced-motion fallback: vertical stack
                <div className="container-wide space-y-12 pb-12">
                    {experiences.map((role, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: easings.ui }}
                            className={clsx(
                                "relative grid grid-cols-1 gap-6 border-t border-border pt-10",
                                "hover:border-brand-blue/40 transition-colors"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className="label-mono text-brand-blue">
                                    STATION {String(idx + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                                </span>
                                <span aria-hidden="true" className="h-px flex-1 bg-brand-blue/30" />
                            </div>
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <h3 className="font-display font-medium text-3xl text-primary tracking-tight leading-tight">
                                    {role.company}
                                </h3>
                                <span className="label-mono text-tertiary">{role.location}</span>
                            </div>
                            <div className="font-editorial italic text-brand-blue text-5xl leading-none tabular-nums">
                                {earliestYear(role.positions[role.positions.length - 1]?.period ?? "")} →{" "}
                                <span className="text-tertiary">{latestYear(role.positions[0]?.period ?? "")}</span>
                            </div>
                            <div className="space-y-6 mt-2">
                                {role.positions.map((pos, pIdx) => (
                                    <div key={pIdx} className="border-l border-border pl-4">
                                        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
                                            <h4 className="font-display text-lg font-medium text-primary leading-tight">
                                                {pos.title}
                                            </h4>
                                            <span className="label-mono text-tertiary">{pos.period}</span>
                                        </div>
                                        <ul className="mt-2 space-y-2">
                                            {pos.achievements.map((item, i) => (
                                                <li key={i} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                                                    <span aria-hidden="true" className="text-brand-blue mt-1.5 text-[8px]">◆</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* End-of-section flourish */}
            <div className="container-wide py-8 flex items-center justify-end gap-2 text-tertiary">
                <span className="label-mono">END OF JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
        </section>
    );
}
