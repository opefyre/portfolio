"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function SkillsSection() {
    return (
        <section id="skills" className="relative min-h-screen py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <motion.h2
                    className="text-5xl md:text-6xl font-bold mb-16 text-center font-display"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="gradient-text">Skills & Expertise</span>
                </motion.h2>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skillCategory, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="glass-strong p-6 hover:scale-105 transition-transform"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.15, duration: 0.6 }}
                        >
                            {/* Category Title */}
                            <h3 className="text-2xl font-bold mb-6 text-neon-blue text-glow">
                                {skillCategory.category}
                            </h3>

                            {/* Skills List */}
                            <div className="space-y-3">
                                {skillCategory.items.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="relative"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: catIndex * 0.15 + skillIndex * 0.05,
                                            duration: 0.4,
                                        }}
                                    >
                                        <div className="flex items-center gap-2 group">
                                            <motion.div
                                                className="w-2 h-2 rounded-full bg-neon-purple"
                                                whileHover={{ scale: 1.5 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            />
                                            <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                                                {skill}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Tools */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-3xl font-bold mb-8 text-center text-neon-purple">
                        Core Competencies
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Process Discovery",
                            "Continuous Improvement",
                            "System Integration",
                            "Cloud Platforms",
                            "Data Analytics",
                            "AI Automation",
                            "KPI Frameworks",
                            "Change Management",
                        ].map((tool, index) => (
                            <motion.div
                                key={index}
                                className="holographic px-6 py-3"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.1, rotate: 2 }}
                            >
                                <span className="font-semibold">{tool}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
