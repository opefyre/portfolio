"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/lib/db";
import { Network, Database, Layers, Layout, Combine } from "lucide-react";
import clsx from "clsx";

export default function GlassTerminal({ skills }: { skills: Skill[] }) {
    // Default to the first category
    const [activeCategory, setActiveCategory] = useState<string>(skills[0]?.category || "");

    const getCategoryIcon = (category: string) => {
        if (category.includes("Process")) return <Combine className="w-4 h-4" />;
        if (category.includes("Project")) return <Layers className="w-4 h-4" />;
        if (category.includes("Data")) return <Database className="w-4 h-4" />;
        if (category.includes("Digital")) return <Network className="w-4 h-4" />;
        return <Layout className="w-4 h-4" />;
    };

    const activeSkills = skills.find(s => s.category === activeCategory)?.items || [];

    return (
        <div className="relative w-full max-w-5xl mx-auto perspective-[2000px] z-20">
            {/* Ambient Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ rotateX: 45, y: 100, opacity: 0, scale: 0.9 }}
                whileInView={{ rotateX: 0, y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[500px]"
            >
                {/* Glossy Screen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none z-50" />

                {/* Left Sidebar / Top Mobile Nav (Categories) */}
                <div className="w-full md:w-80 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5 flex flex-col relative z-20">
                    <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between md:block">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <h3 className="md:mt-8 font-mono text-[10px] md:text-xs text-tertiary uppercase tracking-widest hidden md:block">
                            Competency Matrix
                        </h3>
                    </div>

                    <div className="flex-1 p-3 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto hide-scrollbar">
                        {skills.map((skillGroup) => (
                            <button
                                key={skillGroup.category}
                                onClick={() => setActiveCategory(skillGroup.category)}
                                className={clsx(
                                    "flex shrink-0 items-center gap-2 md:gap-3 w-auto md:w-full p-2 md:p-4 rounded-xl text-left transition-all duration-300 relative group cursor-pointer",
                                    activeCategory === skillGroup.category
                                        ? "bg-brand-blue/10 text-white"
                                        : "hover:bg-white/5 text-secondary hover:text-white"
                                )}
                            >
                                {activeCategory === skillGroup.category && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] hidden md:block"
                                    />
                                )}
                                <div className={clsx(
                                    "p-1.5 md:p-2 rounded-lg transition-colors",
                                    activeCategory === skillGroup.category ? "bg-brand-blue/20 text-brand-blue" : "bg-white/5 text-tertiary group-hover:bg-white/10"
                                )}>
                                    {getCategoryIcon(skillGroup.category)}
                                </div>
                                <span className="font-medium text-xs md:text-sm leading-tight pr-2 md:pr-4 whitespace-nowrap">
                                    {skillGroup.category}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area (Skills Grid) */}
                <div className="flex-1 p-4 sm:p-6 md:p-12 relative z-20 bg-gradient-to-br from-transparent to-black/20">
                    <div className="flex items-center justify-between mb-8 md:mb-12">
                        <h2 className="text-xl md:text-3xl font-display font-medium text-white">
                            {activeCategory}
                        </h2>
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] md:text-xs font-mono text-tertiary">
                            {activeSkills.length} Nodes detected
                        </div>
                    </div>

                    <div className="relative min-h-[300px]">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                            >
                                {activeSkills.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.03, duration: 0.4 }}
                                        className="group flex relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/30 p-3 md:p-4 rounded-xl transition-colors items-start"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/0 via-brand-blue/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/50 mr-2 md:mr-3 mt-1.5 shrink-0 group-hover:bg-brand-blue group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all" />
                                        <span className="font-mono text-xs md:text-sm tracking-wide text-secondary group-hover:text-white transition-colors break-words min-w-0">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
