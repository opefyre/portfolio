"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function BentoGridSection() {
    const stats = [
        { number: "8+", label: "Years Experience", span: "col-span-2 row-span-2", color: "#00D9FF" },
        { number: "50+", label: "Process Projects", span: "col-span-1 row-span-1", color: "#A855F7" },
        { number: "12+", label: "Team Members", span: "col-span-1 row-span-1", color: "#EC4899" },
        { number: "100%", label: "Innovation", span: "col-span-1 row-span-2", color: "#10B981" },
        { number: "∞", label: "Continuous Improvement", span: "col-span-2 row-span-1", color: "#F97316" },
    ];

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-black px-12" style={{ flexShrink: 0 }}>
            <div className="w-full max-w-7xl">
                {/* Title */}
                <motion.h2
                    className="text-8xl md:text-9xl font-black mb-16 gradient-text-animated"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Achievements
                </motion.h2>

                {/* Bento Grid */}
                <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[600px]">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`group relative ${stat.span} p-8 overflow-hidden cursor-pointer`}
                            style={{
                                background: `linear-gradient(135deg, ${stat.color}15, transparent)`,
                                border: `2px solid ${stat.color}30`,
                            }}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{
                                scale: 1.05,
                                border: `3px solid ${stat.color}`,
                                background: `linear-gradient(135deg, ${stat.color}25, ${stat.color}10)`,
                            }}
                        >
                            {/* Animated background gradient */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, ${stat.color}20, transparent)`,
                                }}
                            />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div
                                    className="text-7xl md:text-8xl font-black leading-none"
                                    style={{
                                        color: stat.color,
                                        textShadow: `0 0 40px ${stat.color}80`,
                                    }}
                                >
                                    {stat.number}
                                </div>

                                <div className="text-xl md:text-2xl font-bold text-white/90 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Particle effect on hover */}
                            <div className="absolute inset-0 pointer-events-none">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 rounded-full"
                                        style={{
                                            background: stat.color,
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileHover={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                                        transition={{
                                            duration: 1,
                                            delay: i * 0.05,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary Text */}
                <motion.p
                    className="mt-16 text-2xl md:text-3xl text-white/70 max-w-4xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {personalInfo.summary}
                </motion.p>
            </div>
        </div>
    );
}
