"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { useState } from "react";

export function ExperienceTimeline() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <section id="experience" className="relative min-h-screen py-section">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-electric-purple/5 to-black -z-10" />
            <div className="absolute inset-0 grid-background opacity-15 -z-10" />

            <div className="max-w-[90rem] mx-auto px-6">
                {/* Massive Section Title */}
                <motion.div
                    className="mb-30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-massive md:text-giant font-black leading-none tracking-tight">
                        <span className="block text-white/20">My Journey</span>
                        <span className="block gradient-text-animated mt-4">Experience</span>
                    </h2>
                </motion.div>

                {/* Bold Timeline */}
                <div className="space-y-12">
                    {experiences.map((exp, expIndex) =>
                        exp.positions.map((position, posIndex) => {
                            const globalIndex = experiences
                                .slice(0, expIndex)
                                .reduce((acc, e) => acc + e.positions.length, 0) + posIndex;
                            const isExpanded = expandedIndex === globalIndex;

                            return (
                                <motion.div
                                    key={`${expIndex}-${posIndex}`}
                                    className="group relative"
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: posIndex * 0.1 }}
                                >
                                    <div
                                        onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                                        className="cursor-pointer p-10 md:p-14 border-l-8 hover:border-l-[16px] transition-all duration-500"
                                        style={{
                                            borderColor: globalIndex % 3 === 0 ? "#00D9FF" : globalIndex % 3 === 1 ? "#A855F7" : "#EC4899",
                                            background: "linear-gradient(90deg, rgba(0, 217, 255, 0.05), transparent)",
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-3xl md:text-5xl font-black mb-3 text-electric-blue group-hover:text-electric-purple transition-colors">
                                                    {position.title}
                                                </h3>
                                                <p className="text-2xl md:text-3xl text-white/80 mb-2">{exp.company}</p>
                                                <p className="text-lg text-gray-500">{position.period}</p>
                                            </div>
                                            <motion.div
                                                className="text-5xl text-electric-blue"
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                            >
                                                ▼
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="space-y-4 pt-8 border-t-2 border-white/10">
                                                {position.achievements.map((achievement, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="flex gap-6 text-xl text-gray-300 leading-relaxed"
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: isExpanded ? 0 : -20, opacity: isExpanded ? 1 : 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                    >
                                                        <span className="text-3xl text-electric-purple">→</span>
                                                        <span>{achievement}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
