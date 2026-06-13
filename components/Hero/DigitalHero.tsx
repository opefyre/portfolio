"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Download, Linkedin, ArrowDown } from "lucide-react";
import { useReducedMotion, easings, durations } from "@/lib/motion";

const StarFieldCanvas = dynamic(() => import("./StarFieldCanvas"), {
    ssr: false,
    loading: () => null,
});

interface DigitalHeroProps {
    name: string;
    title: string;
    headline: string;
    signatureMetricValue: string;
    signatureMetricLabel: string;
    linkedin?: string;
    location?: string;
    resumeUrl: string;
}

const TICKER_TAGS = [
    "Process Excellence",
    "Lean Six Sigma",
    "Digital Transformation",
    "AI & Automation",
    "Enterprise Systems",
    "Operational Strategy",
    "Cross-Functional Leadership",
    "Stakeholder Management",
    "Program Delivery",
    "Data-Driven Decisions",
    "Risk & Resource Planning",
    "Intelligent Workflows",
];

function useNumericPart(value: string) {
    return useMemo(() => {
        const m = /^(\d+(?:\.\d+)?)(.*)$/.exec(value.trim());
        if (!m) return { num: null as number | null, suffix: value };
        return { num: parseFloat(m[1]), suffix: m[2] };
    }, [value]);
}

function SignatureCounter({ value, reducedMotion }: { value: string; reducedMotion: boolean }) {
    const { num, suffix } = useNumericPart(value);
    const [display, setDisplay] = useState<string>(() => {
        if (num === null) return value;
        if (reducedMotion) return String(num);
        return "0";
    });

    useEffect(() => {
        if (num === null || reducedMotion) return;
        const duration = 1100;
        const start = performance.now();
        let raf = 0;
        const step = (t: number) => {
            const k = Math.min(1, (t - start) / duration);
            const e = 1 - Math.pow(1 - k, 3);
            const cur = num * e;
            setDisplay(num % 1 === 0 ? String(Math.round(cur)) : cur.toFixed(1));
            if (k < 1) raf = requestAnimationFrame(step);
        };
        const startDelay = window.setTimeout(() => {
            raf = requestAnimationFrame(step);
        }, 800);
        return () => {
            window.clearTimeout(startDelay);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [num, reducedMotion]);

    return (
        <span className="tabular-nums">
            {display}
            {num !== null && <span className="editorial not-italic">{suffix}</span>}
        </span>
    );
}

export default function DigitalHero({
    name,
    title,
    headline,
    signatureMetricValue,
    signatureMetricLabel,
    linkedin,
    location,
    resumeUrl,
}: DigitalHeroProps) {
    const reducedMotion = useReducedMotion();
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const scrollToContent = useCallback(() => {
        window.scrollTo({
            top: window.innerHeight * 0.95,
            behavior: reducedMotion ? "auto" : "smooth",
        });
    }, [reducedMotion]);

    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 90, damping: 18 });
    const sy = useSpring(py, { stiffness: 90, damping: 18 });

    useEffect(() => {
        if (reducedMotion) return;
        const onMove = (e: PointerEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            px.set(x);
            py.set(y);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [px, py, reducedMotion]);

    return (
        <section
            id="overview-hero"
            aria-labelledby="hero-name"
            className="hero-cockpit relative h-[100dvh] min-h-[640px] w-full overflow-hidden grid grid-rows-[auto_1fr_auto]"
        >
            {/* ----- Background stack ----- */}
            {!reducedMotion && (
                <div className="absolute inset-0 z-0 opacity-25 pointer-events-none" aria-hidden="true">
                    <StarFieldCanvas />
                </div>
            )}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 90%)",
                    WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 90%)",
                }}
            />
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-blue/15 to-transparent origin-center"
                    style={{ animation: "gridDrawY 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
                />
                <div
                    className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/15 to-transparent origin-center"
                    style={{ animation: "gridDrawX 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
                />
            </div>
            {!reducedMotion && <div className="scanline z-0" aria-hidden="true" />}

            {/* ----- Top band: corner mission labels (pushed below nav so they never overlap) ----- */}
            <div
                className="relative z-10 flex justify-between items-start gap-4 text-tertiary pb-2"
                style={{
                    paddingTop: "var(--hero-pad-top)",
                    paddingLeft: "var(--hero-pad-x)",
                    paddingRight: "var(--hero-pad-x)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.5, ease: easings.ui }}
                    className="flex flex-col gap-1.5"
                >
                    <span className="label-mono text-tertiary">[ PROFILE.01 / 04 ]</span>
                    <span className="label-mono inline-flex items-center gap-2 text-online">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                        SYSTEM ONLINE
                    </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.5, ease: easings.ui }}
                    className="flex flex-col gap-1.5 text-right items-end"
                >
                    <span className="label-mono text-tertiary">{location ? `[ ${location.toUpperCase()} ]` : "[ —— ]"}</span>
                    <span className="label-mono text-brand-blue">STATUS: AVAILABLE</span>
                </motion.div>
            </div>

            {/* ----- Main editorial grid ----- */}
            <div
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center"
                style={{
                    gap: "var(--hero-col-gap)",
                    paddingLeft: "var(--hero-pad-x)",
                    paddingRight: "var(--hero-pad-x)",
                    paddingTop: "var(--hero-stack-gap)",
                    paddingBottom: "var(--hero-stack-gap)",
                }}
            >
                {/* LEFT: 7 cols */}
                <div
                    className="lg:col-span-7 flex flex-col"
                    style={{ gap: "var(--hero-stack-gap)" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: easings.ui }}
                        className="flex items-center gap-3"
                    >
                        <span aria-hidden="true" className="h-px w-10 bg-brand-blue/60" />
                        <span className="label-mono text-brand-blue">{title}</span>
                    </motion.div>

                    {/* Name — editorial display, mask-reveal */}
                    <h1
                        id="hero-name"
                        className="font-display font-medium tracking-[-0.025em] text-primary"
                        style={{
                            fontSize: "var(--hero-name-size)",
                            lineHeight: "var(--hero-name-line)" as unknown as number,
                        }}
                    >
                        <span className="block overflow-hidden">
                            <span
                                className="block mask-reveal"
                                style={{ animationDelay: "0.25s" }}
                            >
                                {firstName.toLowerCase()}
                            </span>
                        </span>
                        {lastName && (
                            <span className="block overflow-hidden">
                                <span
                                    className="block mask-reveal"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    <span className="editorial text-secondary/90">{lastName.toLowerCase()}</span>
                                </span>
                            </span>
                        )}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: durations.slow, ease: easings.ui }}
                        className="text-secondary leading-relaxed max-w-xl border-l border-brand-blue/30 pl-4"
                        style={{ fontSize: "var(--hero-headline-size)" }}
                    >
                        {headline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: durations.slow, ease: easings.ui }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <a
                            href={resumeUrl}
                            download
                            data-cursor="download"
                            className="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-brand-blue text-deep font-bold text-sm tracking-wide hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-colors duration-200"
                        >
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-deep text-brand-blue group-hover:bg-page transition-colors">
                                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                            Download Résumé
                            <span className="label-mono text-deep/60 group-hover:text-deep/80 transition-colors">PDF</span>
                        </a>

                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="connect"
                                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/40 text-white font-medium text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-colors duration-200"
                            >
                                <Linkedin className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                                LinkedIn
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* RIGHT: 5 cols — avatar + metric stacked compactly */}
                <div
                    className="lg:col-span-5 relative flex flex-col items-center lg:items-end"
                    style={{ gap: "var(--hero-stack-gap)" }}
                >
                    <motion.div
                        style={{ x: sx, y: sy }}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: durations.cinematic, ease: easings.ui }}
                        className="relative"
                    >
                        <span aria-hidden="true" className="crosshair-tick" style={{ top: "-12px", left: "50%", width: "1.5px", height: "8px", transform: "translateX(-50%)" }} />
                        <span aria-hidden="true" className="crosshair-tick" style={{ bottom: "-12px", left: "50%", width: "1.5px", height: "8px", transform: "translateX(-50%)" }} />
                        <span aria-hidden="true" className="crosshair-tick" style={{ top: "50%", left: "-12px", height: "1.5px", width: "8px", transform: "translateY(-50%)" }} />
                        <span aria-hidden="true" className="crosshair-tick" style={{ top: "50%", right: "-12px", height: "1.5px", width: "8px", transform: "translateY(-50%)" }} />

                        <div
                            className="relative rounded-full p-[2px] bg-gradient-to-br from-white/30 via-white/5 to-white/15 shadow-[0_30px_60px_-30px_rgba(56,189,248,0.45)]"
                            style={{ width: "var(--hero-avatar)", height: "var(--hero-avatar)" }}
                        >
                            <svg
                                viewBox="0 0 200 200"
                                className="absolute inset-[-14px] w-[calc(100%+28px)] h-[calc(100%+28px)] text-brand-blue/40 pointer-events-none"
                                aria-hidden="true"
                            >
                                <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
                            </svg>
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-deep">
                                <Image
                                    src="/prof.png"
                                    alt={name}
                                    fill
                                    className="object-[center_15%] object-cover"
                                    priority
                                    sizes="(max-width: 768px) 112px, 144px"
                                />
                            </div>
                        </div>

                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 label-mono text-tertiary whitespace-nowrap">
                            <span aria-hidden="true" className="inline-block w-1 h-1 rounded-full bg-brand-blue" />
                            CAPTURE · 2026
                        </div>
                    </motion.div>

                    {/* Signature metric */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: durations.slow, ease: easings.ui }}
                        className="w-full max-w-md"
                    >
                        <div className="flex items-baseline justify-between gap-4 mb-1.5">
                            <span className="label-mono text-brand-blue">[ SIGNATURE OUTCOME ]</span>
                            <span className="label-mono text-tertiary">M.01</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span
                                aria-hidden="true"
                                className="font-editorial italic text-brand-blue tabular-nums drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]"
                                style={{
                                    fontSize: "var(--hero-metric-size)",
                                    lineHeight: "var(--hero-metric-line)" as unknown as number,
                                }}
                            >
                                <SignatureCounter value={signatureMetricValue} reducedMotion={reducedMotion} />
                            </span>
                        </div>
                        <p className="text-secondary text-xs md:text-sm leading-snug mt-1.5 max-w-sm">
                            {signatureMetricLabel}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ----- Bottom band: ticker tape ----- */}
            <div className="relative z-10 border-t border-white/5 overflow-hidden">
                <div className="flex items-center gap-3 px-4 md:px-6 py-3 text-tertiary">
                    <span aria-hidden="true" className="label-mono text-brand-blue whitespace-nowrap">CAPABILITIES //</span>
                    <div className="relative overflow-hidden flex-1">
                        <div className={`flex ${reducedMotion ? "" : "marquee-track"} gap-10 whitespace-nowrap will-change-transform`}>
                            {[...TICKER_TAGS, ...TICKER_TAGS].map((tag, i) => (
                                <span key={`${tag}-${i}`} className="label-mono text-tertiary inline-flex items-center gap-3">
                                    {tag}
                                    <span aria-hidden="true" className="text-brand-blue">·</span>
                                </span>
                            ))}
                        </div>
                        <div aria-hidden="true" className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-page to-transparent pointer-events-none" />
                        <div aria-hidden="true" className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-page to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: durations.slow }}
                onClick={scrollToContent}
                data-cursor="scroll"
                className="absolute bottom-16 right-6 md:right-10 z-20 flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md p-1"
                aria-label="Scroll to content"
            >
                <span className="label-mono text-tertiary group-hover:text-brand-blue transition-colors">Scroll</span>
                <ArrowDown className="w-3.5 h-3.5 text-tertiary group-hover:text-brand-blue transition-colors animate-bounce" aria-hidden="true" />
            </motion.button>
        </section>
    );
}
