"use client";

import { motion } from "framer-motion";
import { Skill, Certification, Education } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";
import HolographicCard from "@/components/UI/HolographicCard";
import { GraduationCap, ShieldCheck } from "lucide-react";
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

            {/* PART 2: HOLOGRAPHIC CREDENTIALS VAULT */}
            <div id="credentials" className="container max-w-6xl mx-auto px-6 scroll-mt-32">
                <SectionHeader
                    kicker="AUTHORIZATIONS"
                    title="Verified credentials"
                    subtitle="Industry-standard certifications and professional authorizations."
                />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.08, ease: easings.ui }}
                            className="h-32"
                        >
                            <HolographicCard>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                            <span className="label-mono text-emerald-400">Authorized</span>
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-white/20" aria-hidden="true" />
                                    </div>
                                    <h4 className="font-display text-lg md:text-xl font-medium text-white leading-tight">
                                        {cert.name}
                                    </h4>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PART 3: ACADEMIC LOG — console readout */}
            <div className="container max-w-6xl mx-auto px-6 mt-32 relative">
                <SectionHeader
                    kicker="FORMAL EDUCATION"
                    title="Academic log"
                    subtitle="Formal degrees and foundational training, ordered most recent first."
                />

                {/* Readout header */}
                <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-b border-border py-3 mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <span className="label-mono bracket text-brand-blue">EDU.LOG</span>
                        <span className="label-mono text-tertiary hidden sm:inline">FORMAL CURRICULUM · CHRONOLOGICAL READOUT</span>
                    </div>
                    <span className="label-mono text-tertiary tabular-nums">{String(education.length).padStart(2, "0")} entries</span>
                </div>

                {/* Vertical log entries */}
                <ol className="space-y-0">
                    {education.map((edu, idx) => {
                        const { start, end } = eduRange(edu.period);
                        const isPresent = end === "Present";
                        return (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: idx * 0.06, ease: easings.ui }}
                                className="group relative grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border last:border-b-0 hover:bg-white/[0.015] transition-colors"
                            >
                                {/* Connector node on far left */}
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 -ml-1 rounded-full border border-border bg-page text-brand-blue group-hover:border-brand-blue/40 transition-colors"
                                >
                                    <GraduationCap className="w-4 h-4" />
                                </span>

                                {/* LOG code */}
                                <div className="col-span-12 sm:col-span-2 pl-12 flex items-center">
                                    <span className="label-mono text-brand-blue tabular-nums">
                                        LOG.{String(idx + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Year span — editorial italic */}
                                <div className="col-span-12 sm:col-span-4 lg:col-span-3 pl-12 sm:pl-0 flex flex-col">
                                    <span className="label-mono text-tertiary mb-1">— TENURE</span>
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="font-editorial italic text-brand-blue text-4xl md:text-5xl leading-[0.85] tabular-nums">
                                            {start}
                                        </span>
                                        {end && (
                                            <span
                                                className={`font-editorial italic text-tertiary text-2xl md:text-3xl leading-[0.85] ${isPresent ? "" : "tabular-nums"}`}
                                            >
                                                → {end}
                                            </span>
                                        )}
                                    </div>
                                    {isPresent && (
                                        <span className="mt-1.5 label-mono inline-flex items-center gap-2 text-online">
                                            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                                            IN PROGRESS
                                        </span>
                                    )}
                                </div>

                                {/* Degree + institution */}
                                <div className="col-span-12 sm:col-span-6 lg:col-span-7 pl-12 sm:pl-0 flex flex-col gap-2 justify-center">
                                    <h4 className="font-display font-medium text-primary text-xl md:text-2xl leading-tight tracking-tight">
                                        {edu.degree}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span className="label-mono text-brand-blue/90">
                                            {edu.institution}
                                        </span>
                                        <span aria-hidden="true" className="text-tertiary/60">·</span>
                                        <span className="label-mono text-tertiary">{edu.period}</span>
                                    </div>
                                </div>
                            </motion.li>
                        );
                    })}
                </ol>

                {/* Readout footer */}
                <div className="flex items-center justify-end gap-3 pt-4 text-tertiary">
                    <span className="label-mono">— END OF LOG</span>
                    <span aria-hidden="true" className="h-px w-12 bg-brand-blue/30" />
                </div>
            </div>
        </section>
    );
}
