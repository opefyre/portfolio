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
                const duration = 2;
                const obj = { val: 0 };

                gsap.to(obj, {
                    val: target,
                    duration: duration,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 80%",
                    },
                    onUpdate: () => {
                        const current = Math.ceil(obj.val);
                        stat.textContent = current.toString();
                    },
                });
            });
        }
    }, []);

    return (
        <section id="about" className="relative min-h-screen flex items-center py-20">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-background opacity-20 -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center font-display">
                        <span className="gradient-text">About Me</span>
                    </h2>

                    {/* Summary */}
                    <div className="glass-strong p-8 md:p-12 mb-12">
                        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                            {personalInfo.summary}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div
                        ref={statsRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {[
                            {
                                number: 8,
                                suffix: "+",
                                label: "Years of Experience",
                                color: "neon-blue",
                            },
                            {
                                number: 50,
                                suffix: "+",
                                label: "Process Optimization Projects",
                                color: "neon-purple",
                            },
                            {
                                number: 12,
                                suffix: "+",
                                label: "Team Members Led",
                                color: "neon-pink",
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="holographic p-6 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-5xl md:text-6xl font-bold mb-2 font-display">
                                    <span
                                        className={`stat-number text-${stat.color}`}
                                        data-target={stat.number}
                                    >
                                        0
                                    </span>
                                    <span className={`text-${stat.color}`}>{stat.suffix}</span>
                                </div>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Key Focus Areas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: "🔄",
                                title: "Process Excellence",
                                description:
                                    "Expert in continuous improvement methodologies (Kaizen, PDCA, VSM), process discovery, and operational optimization",
                            },
                            {
                                icon: "🚀",
                                title: "Digital Transformation",
                                description:
                                    "Leading enterprise-wide automation, system integration, and cloud-based solution delivery",
                            },
                            {
                                icon: "📊",
                                title: "Data-Driven Strategy",
                                description:
                                    "Implementing analytics platforms, KPI frameworks, and predictive insights for strategic decision-making",
                            },
                            {
                                icon: "🤖",
                                title: "AI-Enabled Innovation",
                                description:
                                    "Leveraging AI and automation to replace manual workflows and enhance operational efficiency",
                            },
                        ].map((area, index) => (
                            <motion.div
                                key={index}
                                className="glass p-6"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-4xl mb-4">{area.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-neon-blue">
                                    {area.title}
                                </h3>
                                <p className="text-gray-400">{area.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
