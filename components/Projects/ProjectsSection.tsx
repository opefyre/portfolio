"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useState } from "react";

export function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        ...Array.from(new Set(projects.map((p) => p.category))),
    ];

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="relative min-h-screen py-20">
            {/* Background */}
            <div className="absolute inset-0 grid-background opacity-15 -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <motion.h2
                    className="text-5xl md:text-6xl font-bold mb-8 text-center font-display"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="gradient-text">Key Projects</span>
                </motion.h2>

                <motion.p
                    className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Transformative initiatives driving operational excellence and digital
                    innovation
                </motion.p>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === category
                                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg"
                                    : "glass hover:scale-105"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="holographic p-6 group hover:scale-105 transition-all duration-300"
                            initial={{ opacity: 0, y: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{
                                rotateY: 5,
                                rotateX: 5,
                                transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Category Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full border border-neon-purple/50">
                                    {project.category}
                                </span>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-xl font-bold mb-3 text-neon-blue group-hover:text-glow-purple">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            {/* Impact */}
                            <div className="border-t border-gray-700 pt-4">
                                <p className="text-xs text-gray-500 mb-2">Impact:</p>
                                <p className="text-sm text-neon-green">{project.impact}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
