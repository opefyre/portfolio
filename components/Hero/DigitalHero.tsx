"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Linkedin, Github, ArrowDown } from "lucide-react";
import { useReducedMotion, easings, durations } from "@/lib/motion";

const StarFieldCanvas = dynamic(() => import("./StarFieldCanvas"), {
    ssr: false,
    loading: () => null,
});

// Physics avatar — client-only, no SSR (window APIs)
const PhysicsAvatar = dynamic(() => import("./PhysicsAvatar"), { ssr: false, loading: () => null });

interface DigitalHeroProps {
    name: string;
    title: string;
    headline: string;
    signatureMetricValue: string;
    signatureMetricLabel: string;
    linkedin?: string;
    github?: string;
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
    title: _title,
    headline,
    signatureMetricValue,
    signatureMetricLabel,
    linkedin,
    github,
    location: _location,
    resumeUrl,
}: DigitalHeroProps) {
    // _title and _location intentionally unused — see strip-out request
    void _title;
    void _location;

    const reducedMotion = useReducedMotion();
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    // Mobile narrower viewport → shorter cycle so the ticker actually feels alive.
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);
    const tickerDuration = isMobile ? 16 : 38;

    const scrollToContent = useCallback(() => {
        window.scrollTo({
            top: window.innerHeight * 0.95,
            behavior: reducedMotion ? "auto" : "smooth",
        });
    }, [reducedMotion]);

    return (
        <section
            id="overview-hero"
            aria-labelledby="hero-name"
            className="hero-cockpit relative h-[100dvh] min-h-[640px] w-full overflow-hidden grid grid-rows-[1fr_auto]"
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

            {/* ----- Physics avatar — free to roam the entire hero canvas ----- */}
            <PhysicsAvatar
                src="/prof.png"
                alt={name}
                size={156}
                canvasId="overview-hero"
                // Right-side, pulled in 250px from the right edge so a natural fall
                // lands clear of the SCROLL button at bottom-right. Top offset is
                // tuned to sit BELOW the SIGNATURE OUTCOME panel so the two never overlap.
                initialOffsetRight={250}
                initialOffsetTop={380}
                // Floor is the top of the CAPABILITIES ticker — keeps the
                // resting/falling avatar from ever overlapping the marquee.
                floorAnchorId="overview-hero-ticker"
            />

            {/* ----- Signature outcome — pinned to the upper-right so a falling avatar can't overlap ----- */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: durations.slow, ease: easings.ui }}
                className="absolute z-10 w-full max-w-md"
                style={{
                    right: "var(--hero-pad-x)",
                    top: "calc(var(--hero-pad-top, 96px) + 0.5rem)",
                }}
            >
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <span className="label-mono text-brand-blue">[ SIGNATURE OUTCOME ]</span>
                    <span className="label-mono text-tertiary">M.01</span>
                </div>
                <div className="flex items-baseline gap-3 justify-end">
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
                <p className="text-secondary text-xs md:text-sm leading-snug mt-1.5 max-w-sm text-right ml-auto">
                    {signatureMetricLabel}
                </p>
            </motion.div>

            {/* ----- Main editorial content (lower-left of hero) -----
                  On mobile, anchored just below the SIGNATURE OUTCOME (top-third
                  of the viewport) so the avatar gets a clear lower band to fall
                  into without overlapping the name and CTAs. */}
            <div
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-start lg:items-end pt-[clamp(15rem,30vh,17rem)] pb-6 md:pt-0 md:pb-12"
                style={{
                    gap: "var(--hero-col-gap)",
                    paddingLeft: "var(--hero-pad-x)",
                    paddingRight: "var(--hero-pad-x)",
                }}
            >
                <div
                    className="lg:col-span-12 flex flex-col"
                    style={{ gap: "var(--hero-stack-gap)" }}
                >
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

                    {/* CTAs */}
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
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-deep font-bold text-sm tracking-wide hover:bg-brand-blue/90 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-all duration-300"
                            aria-label="Download CV (PDF)"
                        >
                            <Download className="w-4 h-4 text-deep" aria-hidden="true" strokeWidth={2.5} />
                            CV
                        </a>

                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="connect"
                                aria-label="LinkedIn"
                                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/40 text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-colors duration-200"
                            >
                                <Linkedin className="w-4 h-4" aria-hidden="true" />
                            </a>
                        )}

                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="connect"
                                aria-label="GitHub"
                                className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/40 text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-colors duration-200"
                            >
                                <Github className="w-4 h-4" aria-hidden="true" />
                            </a>
                        )}
                    </motion.div>
                </div>

            </div>

            {/* ----- Bottom band: ticker tape ----- */}
            <div id="overview-hero-ticker" className="relative z-10 border-t border-white/5 overflow-hidden">
                <div className="flex items-center gap-3 px-4 md:px-6 py-3 text-tertiary">
                    <span aria-hidden="true" className="label-mono text-brand-blue whitespace-nowrap">CAPABILITIES //</span>
                    <div className="relative overflow-hidden flex-1">
                        <div
                            className={`flex ${reducedMotion ? "" : "marquee-track"} gap-10 whitespace-nowrap will-change-transform`}
                            style={reducedMotion ? undefined : { animationDuration: `${tickerDuration}s` }}
                        >
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
                className="absolute bottom-16 left-6 right-auto md:left-auto md:right-10 z-20 flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md p-1"
                aria-label="Scroll to content"
            >
                <span className="label-mono text-secondary group-hover:text-brand-blue transition-colors">Scroll</span>
                <ArrowDown className="w-3.5 h-3.5 text-secondary group-hover:text-brand-blue transition-colors animate-bounce" aria-hidden="true" strokeWidth={2.5} />
            </motion.button>
        </section>
    );
}
