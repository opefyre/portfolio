"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";

export function AboutSection() {
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (statsRef.current) {
            const stats = statsRef.current.querySelectorAll(".stat-number");

            stats.forEach((stat) => {
                const target = parseInt(stat.getAttribute("data-target") || "0");
                const obj = { val: 0 };

                gsap.to(obj, {
                    val: target,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 80%",
                    },
                    onUpdate: () => {
                        stat.textContent = Math.ceil(obj.val).toString();
                    },
                });
            });
        }
    }, []);

    return (
        <section id="about" className="relative min-h-screen flex items-center py-section">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-electric-blue/5 to-black -z-10" />
            <div className="absolute inset-0 grid-background opacity-20 -z-10" />

            <div className="max-w-[90rem] mx-auto px-6 w-full">
                {/* Revolutionary Section Title */}
                <motion.div
                    className="mb-30"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-massive md:text-giant font-black leading-none mb-8 tracking-tight">
                        <span className="block text-white/20">Who I Am</span>
                        <span className="block gradient-text-animated mt-4">Process Excellence Leader</span>
                    </h2>
                </motion.div>

                {/* Bold Summary */}
                <motion.div
                    className="mb-26"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <p className="text-2xl md:text-4xl lg:text-5xl leading-relaxed font-light text-gray-300 max-w-6xl">
                        {personalInfo.summary}
                    </p>
                </motion.div>

                {/* Massive Stats */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-26">
                    {[
                        { number: 8, suffix: "+", label: "Years Experience", color: "electric-blue" },
                        { number: 50, suffix: "+", label: "Process Projects", color: "electric-purple" },
                        { number: 12, suffix: "+", label: "Team Members Led", color: "electric-pink" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-12 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: "backOut" }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            style={{
                                background: `linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(168, 85, 247, 0.05))`,
                                border: "2px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            <div className="text-8xl md:text-9xl font-black mb-4 leading-none">
                                <span className={`stat-number text-${stat.color}`} data-target={stat.number}>
                                    0
                                </span>
                                <span className={`text-${stat.color}`}>{stat.suffix}</span>
                            </div>
                            <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, rgba(0, 217, 255, 0.1), transparent 70%)`
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bold Focus Areas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {[
                        {
                            icon: "🔄",
                            title: "Process Excellence",
                            desc: "Expert in continuous improvement methodologies, process discovery, and operational optimization",
                        },
                        {
                            icon: "🚀",
                            title: "Digital Transformation",
                            desc: "Leading enterprise-wide automation, system integration, and cloud-based solution delivery",
                        },
                        {
                            icon: "📊",
                            title: "Data-Driven Strategy",
                            desc: "Implementing analytics platforms, KPI frameworks, and predictive insights",
                        },
                        {
                            icon: "🤖",
                            title: "AI-Enabled Innovation",
                            desc: "Leveraging AI and automation to replace manual workflows and enhance efficiency",
                        },
                    ].map((area, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-10 overflow-hidden border-l-4 hover:border-l-8 transition-all duration-500"
                            style={{
                                borderColor: index % 2 === 0 ? "#00D9FF" : "#A855F7",
                                background: "linear-gradient(90deg, rgba(0, 217, 255, 0.03), transparent)",
                            }}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            whileHover={{ x: 20 }}
                        >
                            <div className="text-6xl mb-6">{area.icon}</div>
                            <h3 className="text-3xl font-black mb-4 text-electric-blue group-hover:text-electric-purple transition-colors">
                                {area.title}
                            </h3>
                            <p className="text-xl text-gray-400 leading-relaxed">{area.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
