"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Linkedin, MapPin } from "lucide-react";
import { useReducedMotion, easings, durations } from "@/lib/motion";

// Dynamic-load the R3F starfield so its bundle doesn't ship in the main route chunk.
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
            top: window.innerHeight * 0.85,
            behavior: reducedMotion ? "auto" : "smooth",
        });
    }, [reducedMotion]);

    return (
        <section
            id="overview-hero"
            aria-labelledby="hero-name"
            className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden pt-28 pb-12"
        >
            {/* Background: starfield (motion-safe, dynamic) + grid overlay */}
            {!reducedMotion && (
                <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
                    <StarFieldCanvas />
                </div>
            )}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8">
                {/* Avatar — calm, no perpetual motion */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: durations.cinematic, ease: easings.ui }}
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-[2px] bg-gradient-to-br from-white/25 via-white/5 to-white/10 shadow-[0_10px_30px_-10px_rgba(56,189,248,0.25)]"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-deep">
                        <Image
                            src="/prof.png"
                            alt={name}
                            fill
                            className="object-[center_15%] object-cover"
                            priority
                            sizes="(max-width: 768px) 112px, 128px"
                        />
                    </div>
                </motion.div>

                {/* Title (current role) — quiet mono label */}
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: durations.slow, ease: easings.ui }}
                    className="text-brand-blue font-mono text-xs md:text-sm uppercase tracking-[0.3em]"
                >
                    {title}
                </motion.p>

                {/* Name — display, slightly dialed back from previous 9vw */}
                <motion.h1
                    id="hero-name"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: durations.cinematic, ease: easings.ui }}
                    className="font-display font-medium leading-[0.95] tracking-tight text-[clamp(2.5rem,7.5vw,6rem)] bg-clip-text text-transparent bg-gradient-to-b from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)]"
                >
                    {firstName}
                    {lastName && <span className="block">{lastName}</span>}
                </motion.h1>

                {/* Headline — positioning sentence */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: durations.slow, ease: easings.ui }}
                    className="text-secondary text-base md:text-xl leading-relaxed max-w-2xl"
                >
                    {headline}
                </motion.p>

                {/* Signature metric strip — the proof number */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: durations.slow, ease: easings.ui }}
                    className="flex items-baseline gap-3 md:gap-4 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                    <span
                        aria-hidden="true"
                        className="font-display font-bold text-brand-blue text-3xl md:text-4xl tabular-nums drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]"
                    >
                        {signatureMetricValue}
                    </span>
                    <span className="text-secondary text-xs md:text-sm leading-snug text-left max-w-[16rem] md:max-w-sm">
                        {signatureMetricLabel}
                    </span>
                </motion.div>

                {/* CTAs — primary resume download, secondary linkedin */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: durations.slow, ease: easings.ui }}
                    className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
                >
                    <a
                        href={resumeUrl}
                        download
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-deep font-bold text-sm tracking-wide hover:bg-brand-blue/90 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-all duration-200"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Download Résumé
                    </a>

                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/40 text-white font-medium text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-all duration-200"
                        >
                            <Linkedin className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                            Connect on LinkedIn
                        </a>
                    )}
                </motion.div>

                {/* Location pill */}
                {location && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: durations.base, ease: easings.ui }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10"
                    >
                        <MapPin className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
                        <span className="text-xs font-mono text-tertiary tracking-wide">{location}</span>
                    </motion.div>
                )}
            </div>

            {/* Scroll cue */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: durations.slow }}
                onClick={scrollToContent}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md p-1"
                aria-label="Scroll to content"
            >
                <span className="text-tertiary group-hover:text-brand-blue font-mono text-xs uppercase tracking-widest transition-colors">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-tertiary/50 group-hover:from-brand-blue/50 to-transparent transition-colors" />
            </motion.button>
        </section>
    );
}
