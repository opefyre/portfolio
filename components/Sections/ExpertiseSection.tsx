"use client";

import { motion } from "framer-motion";
import { Skill, Certification, Education } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";
import HolographicCard from "@/components/UI/HolographicCard";
import { GraduationCap, ShieldCheck } from "lucide-react";
export default function ExpertiseSection({
    skills,
    certifications,
    education
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="h-32" // Fixed height for consistent cards
                        >
                            <HolographicCard>
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Authorized</span>
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-white/20" />
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

            {/* PART 3: ACADEMIC TIMELINE */}
            <div className="container max-w-4xl mx-auto px-6 mt-32 relative">
                <motion.div>
                    <SectionHeader
                        kicker="FORMAL EDUCATION"
                        title="Academic log"
                        subtitle="Formal education and foundational knowledge."
                    />

                    <div className="mt-16 md:mt-24 space-y-16 relative before:absolute before:inset-0 before:ml-4 md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                        {education.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Center Timeline Node */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-deep border border-brand-blue/30 shadow-[0_0_15px_rgba(56,189,248,0.2)] z-10">
                                    <GraduationCap className="w-4 h-4 text-brand-blue" />
                                </div>

                                {/* Content Card */}
                                <div className={`ml-12 md:ml-0 w-full md:w-[45%] ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                                    <div className="bg-deep/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/[0.02] hover:border-brand-blue/30 transition-colors">
                                        <h4 className="text-xl font-display font-medium text-white mb-2">{edu.degree}</h4>
                                        <div className="text-brand-blue/80 font-mono text-sm uppercase tracking-widest mb-4">
                                            {edu.institution}
                                        </div>
                                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-tertiary">
                                            {edu.period}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
