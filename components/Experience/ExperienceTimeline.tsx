"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { useState } from "react";

export function ExperienceTimeline() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section id="experience" className="relative min-h-screen py-20">
            {/* Background */}
            <div className="absolute inset-0 grid-background opacity-10 -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Section Title */}
                <motion.h2
                    className="text-5xl md:text-6xl font-bold mb-16 text-center font-display"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="gradient-text">Experience</span>
                </motion.h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink transform md:-translate-x-1/2" />

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.map((exp, expIndex) =>
                            exp.positions.map((position, posIndex) => {
                                const globalIndex = experiences
                                    .slice(0, expIndex)
                                    .reduce((acc, e) => acc + e.positions.length, 0) + posIndex;
                                const isExpanded = expandedIndex === globalIndex;
                                const isLeft = globalIndex % 2 === 0;

                                return (
                                    <motion.div
                                        key={`${expIndex}-${posIndex}`}
                                        className={`relative flex items-center ${isLeft ? "md:flex-row-reverse" : "md:flex-row"
                                            } flex-col md:gap-8`}
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: posIndex * 0.2, duration: 0.6 }}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-neon-blue transform md:-translate-x-1/2 shadow-lg shadow-neon-blue/50 z-10" />

                                        {/* Content Card */}
                                        <div className="w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0">
                                            <motion.div
                                                className="glass-strong p-6 cursor-pointer group hover:scale-[1.02] transition-transform"
                                                onClick={() =>
                                                    setExpandedIndex(isExpanded ? null : globalIndex)
                                                }
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {/* Company & Title */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-2xl font-bold text-neon-blue group-hover:text-glow">
                                                        {position.title}
                                                    </h3>
                                                    <motion.span
                                                        className="text-neon-purple"
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        ▼
                                                    </motion.span>
                                                </div>

                                                <p className="text-lg text-gray-300 mb-2">
                                                    {exp.company} • {exp.location}
                                                </p>

                                                <p className="text-sm text-gray-500 mb-4">
                                                    {position.period}
                                                </p>

                                                {/* Achievements */}
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        height: isExpanded ? "auto" : 0,
                                                        opacity: isExpanded ? 1 : 0,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="space-y-2 mt-4 border-t border-gray-700 pt-4">
                                                        {position.achievements.map((achievement, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                className="flex gap-3 text-gray-400"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{
                                                                    opacity: isExpanded ? 1 : 0,
                                                                    x: isExpanded ? 0 : -10,
                                                                }}
                                                                transition={{ delay: idx * 0.05 }}
                                                            >
                                                                <span className="text-neon-purple mt-1">▹</span>
                                                                <span>{achievement}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
