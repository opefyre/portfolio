"use client";

import { motion } from "framer-motion";
import { skills, certifications, education } from "@/lib/data";
import clsx from "clsx";

const Card = ({ className, title, children }: { className?: string; title: string; children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={clsx(
            "bg-card border border-border p-6 rounded-2xl flex flex-col hover:border-brand-blue/30 hover:bg-card-hover transition-colors duration-300 shadow-sm dark:shadow-none backdrop-blur-sm",
            className
        )}
    >
        <h3 className="text-xs font-mono uppercase tracking-widest text-tertiary mb-4 border-b border-border pb-2">{title}</h3>
        <div className="flex-1">{children}</div>
    </motion.div>
);

const SkillTag = ({ item }: { item: string }) => (
    <span className="inline-flex items-center px-2.5 py-1 rounded bg-page border border-border text-[11px] text-secondary hover:border-brand-blue/30 hover:text-brand-blue transition-colors cursor-default whitespace-nowrap">
        {item}
    </span>
);

export default function ExpertiseSection() {
    return (
        <section className="container-wide section-padding">
            <h2 className="section-title mb-12 md:mb-16">Technical Command Center</h2>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
                {/* Main Domain: Process Excellence */}
                <Card className="md:col-span-3 lg:col-span-2 md:row-span-2" title="Core Domain: Process Excellence">
                    <div className="flex flex-wrap gap-2 content-start h-full">
                        {skills.find(s => s.category === "Process Excellence")?.items.map(skill => (
                            <span key={skill} className="px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                        {skills.find(s => s.category === "Digital Transformation")?.items.map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-page border border-border text-secondary rounded text-xs">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Card>

                {/* Certifications */}
                <Card className="md:col-span-3 lg:col-span-2" title="Active Certifications">
                    <ul className="space-y-3">
                        {certifications.map((cert, idx) => (
                            <li key={idx} className="flex items-center justify-between text-xs sm:text-sm text-secondary border-b border-border last:border-0 pb-2 last:pb-0">
                                <span className="truncate pr-4">{cert.name}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Education */}
                <Card className="md:col-span-2 lg:col-span-1 md:row-span-2" title="Academic Log">
                    <div className="space-y-6 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                        {education.map((edu, idx) => (
                            <div key={idx} className="relative pl-5">
                                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-border" />
                                <div className="text-primary text-xs font-semibold leading-tight mb-1">{edu.degree}</div>
                                <div className="text-tertiary text-[10px] uppercase tracking-wider">{edu.institution}</div>
                                <div className="text-tertiary/70 text-[10px] font-mono mt-0.5">{edu.period}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Tech Stacks */}
                <Card className="md:col-span-2 lg:col-span-1" title="Enterprise Systems">
                    <div className="flex flex-wrap gap-1.5">
                        {skills.find(s => s.category === "Enterprise Systems")?.items.map(sk => (
                            <SkillTag key={sk} item={sk} />
                        ))}
                    </div>
                </Card>

                <Card className="md:col-span-2 lg:col-span-1" title="Automation & Dev">
                    <div className="flex flex-wrap gap-1.5">
                        {skills.find(s => s.category === "Automation & Dev")?.items.map(sk => (
                            <SkillTag key={sk} item={sk} />
                        ))}
                    </div>
                </Card>

                <Card className="md:col-span-4 lg:col-span-1" title="Cloud & Intelligence">
                    <div className="flex flex-wrap gap-1.5">
                        {skills.find(s => s.category === "Cloud & AI")?.items.map(sk => (
                            <SkillTag key={sk} item={sk} />
                        ))}
                        {skills.find(s => s.category === "Data & BI")?.items.map(sk => (
                            <SkillTag key={sk} item={sk} />
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
}
