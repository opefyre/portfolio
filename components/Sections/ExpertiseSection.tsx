"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Skill, Certification, Education } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";
import { ShieldCheck, GraduationCap } from "lucide-react";
import { easings } from "@/lib/motion";

// ---------- helpers --------------------------------------------------------

function eduRange(period: string): { start: string; end: string; isPresent: boolean } {
    const matches = Array.from(period.matchAll(/\b(19|20)\d{2}\b/g)).map((m) => m[0]);
    const isPresent = /\b(present|current|now|ongoing)\b/i.test(period);
    if (matches.length === 0) return { start: "—", end: "", isPresent };
    return {
        start: matches[0],
        end: isPresent ? "Present" : matches.length > 1 ? matches[matches.length - 1] : "",
        isPresent,
    };
}

function certSortKey(c: Certification): number {
    const y = parseInt(c.year ?? "", 10);
    return Number.isFinite(y) ? y : 0;
}

// ---------- marquee badge --------------------------------------------------

function CertBadge({ cert, idx }: { cert: Certification; idx: number }) {
    return (
        <div
            className={[
                "group/badge relative shrink-0 inline-flex items-center gap-3 pl-3 pr-4 py-2 rounded-full",
                "bg-deep/60 border border-border hover:border-brand-blue/50 hover:bg-deep",
                "transition-colors duration-300 cursor-default",
            ].join(" ")}
        >
            <span className="label-mono text-brand-blue tabular-nums shrink-0">
                CRT.{String(idx + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="inline-block w-px h-3 bg-border" />
            <span className="text-sm md:text-base text-primary font-medium whitespace-nowrap">
                {cert.name}
            </span>
            {cert.year && (
                <span className="font-editorial italic text-brand-blue/80 text-lg tabular-nums leading-none">
                    {cert.year}
                </span>
            )}
            {cert.issuer && (
                <span className="label-mono text-tertiary whitespace-nowrap hidden md:inline">
                    · {cert.issuer}
                </span>
            )}
        </div>
    );
}

// ---------- main section --------------------------------------------------

export default function ExpertiseSection({
    skills,
    certifications,
    education,
}: {
    skills: Skill[];
    certifications: Certification[];
    education: Education[];
}) {
    // Sort certs by year desc (undated drift naturally to the end)
    const certsSorted = useMemo(() => {
        return [...certifications].sort((a, b) => certSortKey(b) - certSortKey(a));
    }, [certifications]);

    const eduSorted = useMemo(() => {
        return [...education].sort((a, b) => {
            const ay = parseInt(eduRange(a.period).end || eduRange(a.period).start || "0", 10);
            const by = parseInt(eduRange(b.period).end || eduRange(b.period).start || "0", 10);
            return by - ay;
        });
    }, [education]);

    return (
        <section className="container-wide section-padding space-y-24 md:space-y-32">
            {/* PART 1: SKILLS — unchanged */}
            <div id="expertise" className="container-wide scroll-mt-32">
                <SectionHeader
                    kicker="COMPETENCIES"
                    title="Technical command center"
                    subtitle="The systems, methods and platforms I bring to enterprise transformation work."
                />

                <div className="mt-12 md:mt-24 w-full flex justify-center px-4 md:px-0">
                    <GlassTerminal skills={skills} />
                </div>
            </div>

            {/* PART 2: CREDENTIALS — one-viewport compact panel */}
            <div
                id="credentials"
                className="container max-w-6xl mx-auto px-4 md:px-6 scroll-mt-32"
            >
                <SectionHeader
                    kicker="CREDENTIALS"
                    title="Authorizations & academia"
                    subtitle="The certifications and degrees that back the work — at a glance."
                />

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: easings.ui }}
                    className="mt-10 relative rounded-3xl border border-border bg-deep/40 backdrop-blur-md overflow-hidden"
                >
                    {/* Ambient backlight */}
                    <div
                        aria-hidden="true"
                        className="absolute -top-32 left-1/4 w-[420px] h-[280px] bg-brand-blue/12 blur-[120px] rounded-full pointer-events-none"
                    />

                    {/* Decorative corner brackets */}
                    <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-l border-t border-brand-blue/40" />
                    <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-r border-t border-brand-blue/40" />
                    <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-brand-blue/40" />
                    <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-brand-blue/40" />

                    {/* Mission control header bar */}
                    <div className="relative flex items-center justify-between gap-3 border-b border-border/60 px-5 md:px-7 py-3 text-tertiary">
                        <div className="flex items-center gap-3">
                            <span className="label-mono bracket text-brand-blue">ARCHIVE.03</span>
                            <span className="label-mono hidden sm:inline">CREDENTIALS · LIVE</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                            <span className="label-mono tabular-nums">
                                {String(certifications.length + education.length).padStart(2, "0")} ENTRIES
                            </span>
                        </div>
                    </div>

                    {/* AUTHORIZATIONS — auto-scrolling marquee */}
                    <div className="relative py-6 md:py-7 border-b border-border/60">
                        <div className="flex items-center justify-between px-5 md:px-7 mb-4">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                                <span className="label-mono text-brand-blue">AUTHORIZATIONS</span>
                            </div>
                            <span className="label-mono text-tertiary tabular-nums">
                                {String(certsSorted.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Marquee — pauses on hover. Edge gradients keep the tape feel. */}
                        <div className="group/marquee relative overflow-hidden">
                            <div
                                className="flex gap-3 whitespace-nowrap will-change-transform marquee-track group-hover/marquee:[animation-play-state:paused]"
                                style={{ animationDuration: `${Math.max(20, certsSorted.length * 4)}s` }}
                            >
                                {/* Doubled list for seamless loop */}
                                {[...certsSorted, ...certsSorted].map((cert, i) => (
                                    <CertBadge
                                        key={`${cert.name}-${i}`}
                                        cert={cert}
                                        idx={i % certsSorted.length}
                                    />
                                ))}
                            </div>
                            {/* Edge fades */}
                            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-deep/95 to-transparent pointer-events-none" />
                            <div aria-hidden="true" className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-deep/95 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* ACADEMIA — compact, supporting */}
                    <div className="relative py-6 md:py-7 px-5 md:px-7">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                                <GraduationCap className="w-4 h-4 text-brand-purple" aria-hidden="true" />
                                <span className="label-mono text-brand-purple">ACADEMIA</span>
                            </div>
                            <span className="label-mono text-tertiary tabular-nums">
                                {String(eduSorted.length).padStart(2, "0")}
                            </span>
                        </div>

                        <ol className="divide-y divide-border/40">
                            {eduSorted.map((edu, idx) => {
                                const { start, end, isPresent } = eduRange(edu.period);
                                return (
                                    <li
                                        key={idx}
                                        className="group/edu grid grid-cols-12 gap-3 md:gap-4 items-baseline py-3 first:pt-1 last:pb-1 hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors"
                                    >
                                        <span className="col-span-12 sm:col-span-3 lg:col-span-2 font-editorial italic text-brand-blue/85 text-base md:text-lg leading-none tabular-nums">
                                            {start}
                                            {end && (
                                                <>
                                                    <span className="mx-1.5 text-tertiary/60 not-italic">→</span>
                                                    <span className={isPresent ? "text-online" : ""}>{end}</span>
                                                </>
                                            )}
                                        </span>
                                        <span className="col-span-12 sm:col-span-6 lg:col-span-7 text-primary font-medium text-base md:text-lg leading-snug">
                                            {edu.degree}
                                        </span>
                                        <span className="col-span-12 sm:col-span-3 lg:col-span-3 label-mono text-tertiary truncate sm:text-right">
                                            {edu.institution}
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
