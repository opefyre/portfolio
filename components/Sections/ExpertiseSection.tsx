"use client";

import { motion } from "framer-motion";
import { Skill, Certification, Education } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";
import HolographicCard from "@/components/UI/HolographicCard";
import { ShieldCheck } from "lucide-react";
import { easings } from "@/lib/motion";

function eduRange(period: string): { start: string; end: string } {
    const matches = Array.from(period.matchAll(/\b(19|20)\d{2}\b/g)).map((m) => m[0]);
    if (matches.length === 0) return { start: "—", end: "" };
    const start = matches[0];
    const end =
        /\b(present|current|now|ongoing)\b/i.test(period)
            ? "Present"
            : matches.length > 1
                ? matches[matches.length - 1]
                : "";
    return { start, end };
}

export default function ExpertiseSection({
    skills,
    certifications,
    education,
}: {
    skills: Skill[];
    certifications: Certification[];
    education: Education[];
}) {
    const totalCount = certifications.length + education.length;

    return (
        <section className="container-wide section-padding space-y-24 md:space-y-32">
            {/* PART 1: PREMIUM GLASS TERMINAL */}
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

            {/* PART 2: CREDENTIALS VAULT — dual-panel readout (authorizations + academic log) */}
            <div id="credentials" className="container max-w-6xl mx-auto px-6 scroll-mt-32">
                <SectionHeader
                    kicker="FORMAL CREDENTIALS"
                    title="Vault & academic log"
                    subtitle="Industry authorizations and formal degrees — the credentials that vouch for the work."
                />

                {/* Mission-control status bar */}
                <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-b border-border py-3 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="label-mono bracket text-brand-blue">VAULT.03</span>
                        <span className="label-mono text-tertiary hidden sm:inline">
                            CONSOLIDATED CREDENTIAL READOUT
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-tertiary">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                        <span className="label-mono tabular-nums">{String(totalCount).padStart(2, "0")} ENTRIES</span>
                    </div>
                </div>

                {/* Vault frame */}
                <div className="relative rounded-2xl border border-border bg-deep/30 backdrop-blur-md overflow-hidden">
                    {/* Decorative corner brackets */}
                    <span aria-hidden="true" className="absolute top-3 left-3 w-3.5 h-3.5 border-l border-t border-brand-blue/50" />
                    <span aria-hidden="true" className="absolute top-3 right-3 w-3.5 h-3.5 border-r border-t border-brand-blue/50" />
                    <span aria-hidden="true" className="absolute bottom-3 left-3 w-3.5 h-3.5 border-l border-b border-brand-blue/50" />
                    <span aria-hidden="true" className="absolute bottom-3 right-3 w-3.5 h-3.5 border-r border-b border-brand-blue/50" />
                    {/* Ambient backlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-brand-blue/10 blur-[80px] pointer-events-none" aria-hidden="true" />

                    {/* Two-panel grid — segregated by a faint vertical hairline on desktop */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* LEFT PANEL — AUTHORIZATIONS (compact cert grid with 3D tilt) */}
                        <div className="lg:col-span-7 p-6 md:p-8 lg:p-10 relative">
                            {/* Internal header */}
                            <div className="flex items-baseline justify-between gap-3 mb-6 pb-3 border-b border-border/60">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                                    <span className="label-mono text-brand-blue">AUTHORIZATIONS</span>
                                    <span aria-hidden="true" className="hidden sm:inline-block h-px w-8 bg-brand-blue/40" />
                                    <span className="label-mono text-tertiary hidden sm:inline">
                                        INDUSTRY CERTIFICATIONS
                                    </span>
                                </div>
                                <span className="label-mono text-tertiary tabular-nums shrink-0">
                                    {String(certifications.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Cert badges — 2 cols on md+, with HolographicCard 3D tilt */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {certifications.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.4, delay: idx * 0.04, ease: easings.ui }}
                                        className="h-32"
                                    >
                                        <HolographicCard>
                                            <div className="flex flex-col h-full justify-between gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="label-mono text-brand-blue tabular-nums">
                                                        CRT.{String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                                                </div>
                                                <h4 className="font-display text-base md:text-lg font-medium text-white leading-tight line-clamp-3">
                                                    {cert.name}
                                                </h4>
                                                <div className="flex items-center justify-between gap-2 mt-auto">
                                                    {cert.issuer && (
                                                        <span className="label-mono text-tertiary truncate">
                                                            {cert.issuer}
                                                        </span>
                                                    )}
                                                    {cert.year && (
                                                        <span className="font-editorial italic text-brand-blue/80 text-sm tabular-nums shrink-0">
                                                            {cert.year}
                                                        </span>
                                                    )}
                                                    {!cert.issuer && !cert.year && (
                                                        <span className="label-mono text-emerald-400">AUTHORIZED</span>
                                                    )}
                                                </div>
                                            </div>
                                        </HolographicCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Divider — vertical scan-line on lg, horizontal on smaller */}
                        <div
                            aria-hidden="true"
                            className="hidden lg:block lg:col-span-[0] relative"
                        >
                            <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-px">
                                <div className="h-full bg-gradient-to-b from-transparent via-brand-blue/30 to-transparent" />
                            </div>
                        </div>

                        {/* RIGHT PANEL — ACADEMIC LOG (editorial vertical entries) */}
                        <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 relative border-t lg:border-t-0 lg:border-l border-border/60">
                            {/* Internal header */}
                            <div className="flex items-baseline justify-between gap-3 mb-6 pb-3 border-b border-border/60">
                                <div className="flex items-center gap-3">
                                    <span aria-hidden="true" className="font-editorial italic text-brand-blue text-xl leading-none">α</span>
                                    <span className="label-mono text-brand-blue">ACADEMIC LOG</span>
                                </div>
                                <span className="label-mono text-tertiary tabular-nums shrink-0">
                                    {String(education.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Vertical log entries */}
                            <ol className="space-y-5">
                                {education.map((edu, idx) => {
                                    const { start, end } = eduRange(edu.period);
                                    const isPresent = end === "Present";
                                    return (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 8 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-30px" }}
                                            transition={{ duration: 0.4, delay: idx * 0.06, ease: easings.ui }}
                                            className="group relative pl-5 border-l border-border hover:border-brand-blue/60 transition-colors pb-1"
                                        >
                                            {/* Node dot on the rail */}
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue group-hover:shadow-[0_0_8px_rgba(56,189,248,0.7)] transition-all"
                                            />

                                            {/* Row 1: LOG code + year span */}
                                            <div className="flex items-baseline gap-3 mb-1.5">
                                                <span className="label-mono text-brand-blue tabular-nums">
                                                    LOG.{String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-editorial italic text-tertiary text-lg leading-none tabular-nums">
                                                    {start}
                                                    {end && (
                                                        <>
                                                            <span className="mx-1.5 text-tertiary/60">→</span>
                                                            <span className={isPresent ? "text-online" : ""}>
                                                                {end}
                                                            </span>
                                                        </>
                                                    )}
                                                </span>
                                                {isPresent && (
                                                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                                                )}
                                            </div>

                                            {/* Row 2: degree */}
                                            <h4 className="font-display font-medium text-primary text-base md:text-lg leading-tight tracking-tight">
                                                {edu.degree}
                                            </h4>

                                            {/* Row 3: institution + period */}
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                                                <span className="label-mono text-brand-blue/80">
                                                    {edu.institution}
                                                </span>
                                                <span aria-hidden="true" className="text-tertiary/50">·</span>
                                                <span className="label-mono text-tertiary">{edu.period}</span>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Vault footer label */}
                <div className="mt-4 flex items-center justify-end gap-3 text-tertiary">
                    <span className="label-mono">— END OF VAULT</span>
                    <span aria-hidden="true" className="h-px w-12 bg-brand-blue/30" />
                </div>
            </div>
        </section>
    );
}
