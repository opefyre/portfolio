"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function SkillsSection() {
    return (
        <section id="skills" className="relative min-h-screen py-section">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-electric-pink/5 to-black -z-10" />
            <div className="absolute inset-0 grid-background opacity-10 -z-10" />

            <div className="max-w-[90rem] mx-auto px-6">
                <motion.div
                    className="mb-30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-massive md:text-giant font-black leading-none tracking-tight">
                        <span className="block text-white/20">What I Do</span>
                        <span className="block gradient-text-animated mt-4">Expertise</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {skills.map((skillCategory, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="group p-12 border-2 border-white/10 hover:border-electric-blue transition-all duration-500"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.15 }}
                            whileHover={{ scale: 1.02, y: -10 }}
                            style={{
                                background: "linear-gradient(135deg, rgba(0, 217, 255, 0.03), rgba(168, 85, 247, 0.03))",
                            }}
                        >
                            <h3 className="text-4xl font-black mb-10 text-electric-blue group-hover:text-electric-purple transition-colors">
                                {skillCategory.category}
                            </h3>

                            <div className="space-y-5">
                                {skillCategory.items.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="flex items-center gap-4 text-xl text-gray-300"
                                        initial={{ x: -30, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: skillIndex * 0.05 }}
                                        whileHover={{ x: 10 }}
                                    >
                                        <div className="w-3 h-3 bg-electric-purple" />
                                        <span className="font-medium">{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
