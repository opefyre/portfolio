"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useState } from "react";

export function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
    const filteredProjects = selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="relative min-h-screen py-section">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neon-green/5 to-black -z-10" />
            <div className="absolute inset-0 grid-background opacity-20 -z-10" />

            <div className="max-w-[90rem] mx-auto px-6">
                <motion.div
                    className="mb-30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-massive md:text-giant font-black leading-none tracking-tight">
                        <span className="block text-white/20">Portfolio</span>
                        <span className="block gradient-text-animated mt-4">Projects</span>
                    </h2>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap gap-6 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all duration-500 ${selectedCategory === category
                                    ? "bg-electric-blue text-black scale-110"
                                    : "border-2 border-white/20 text-white hover:border-electric-blue"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group p-10 border-2 border-white/10 hover:border-electric-purple transition-all duration-500"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            style={{
                                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.05), transparent)",
                            }}
                        >
                            <div className="text-sm px-4 py-2 bg-electric-purple/20 text-electric-purple inline-block mb-6 uppercase tracking-wider font-bold">
                                {project.category}
                            </div>

                            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-electric-purple transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                            <div className="pt-6 border-t-2 border-white/10">
                                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Impact</p>
                                <p className="text-neon-green font-bold">{project.impact}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
