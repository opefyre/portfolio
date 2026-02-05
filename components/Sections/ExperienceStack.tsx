"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function ExperienceStack() {
    return (
        <section className="container-wide py-12 md:py-24">
            <h2 className="section-title mb-12">Professional History</h2>

            <div className="space-y-16">
                {experiences.map((role, idx) => (
                    <div key={idx} className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/5 pt-12 hover:border-white/10 transition-colors duration-500">
                        {/* Timeline Year */}
                        <div className="md:col-span-3">
                            <span className="text-display text-5xl md:text-6xl text-gray-800 group-hover:text-gray-600 transition-colors duration-500">
                                0{experiences.length - idx}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-9 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                <h3 className="text-3xl md:text-4xl font-display font-medium text-white group-hover:text-brand-blue transition-colors duration-300">
                                    {role.company}
                                </h3>
                                <span className="text-muted font-mono text-sm">{role.location}</span>
                            </div>

                            <div className="space-y-10">
                                {role.positions.map((pos, pIdx) => (
                                    <div key={pIdx} className="relative pl-6 border-l border-white/10 group-hover/pos:border-brand-purple/50 transition-colors">
                                        {/* Dot */}
                                        <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-gray-800 group-hover:bg-brand-purple transition-colors" />

                                        <h4 className="text-xl text-silver font-medium">{pos.title}</h4>
                                        <p className="text-muted text-sm font-mono mb-3">{pos.period}</p>

                                        <ul className="space-y-2">
                                            {pos.achievements.map((item, i) => (
                                                <li key={i} className="text-gray-400 text-sm leading-relaxed max-w-3xl flex items-start gap-2">
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
