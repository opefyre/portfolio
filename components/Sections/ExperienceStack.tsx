"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function ExperienceStack() {
    return (
        <section className="container-wide section-padding">
            <h2 className="section-title mb-12 md:mb-16">Professional History</h2>

            <div className="space-y-16">
                {experiences.map((role, idx) => (
                    <div key={idx} className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12 hover:border-brand-blue/30 transition-colors duration-500">
                        {/* Timeline Year */}
                        <div className="md:col-span-3">
                            <span className="text-display text-5xl md:text-6xl text-tertiary/30 group-hover:text-tertiary transition-colors duration-500">
                                0{experiences.length - idx}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-9 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                <h3 className="text-3xl md:text-4xl font-display font-medium text-primary group-hover:text-brand-blue transition-colors duration-300">
                                    {role.company}
                                </h3>
                                <span className="text-secondary font-mono text-sm">{role.location}</span>
                            </div>

                            <div className="space-y-10">
                                {role.positions.map((pos, pIdx) => (
                                    <div key={pIdx} className="relative pl-6 border-l border-border group-hover/pos:border-brand-purple/50 transition-colors">
                                        {/* Dot */}
                                        <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-border group-hover:bg-brand-purple transition-colors" />

                                        <h4 className="text-xl text-primary font-medium">{pos.title}</h4>
                                        <p className="text-tertiary text-sm font-mono mb-3">{pos.period}</p>

                                        <ul className="space-y-2">
                                            {pos.achievements.map((item, i) => (
                                                <li key={i} className="text-secondary text-sm leading-relaxed max-w-3xl flex items-start gap-2">
                                                    <span className="text-brand-blue/50 mt-1.5 text-[6px]">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
