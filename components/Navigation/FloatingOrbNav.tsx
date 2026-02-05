"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const sections = [
    { id: 0, name: "Intro", color: "#00D9FF" },
    { id: 1, name: "About", color: "#A855F7" },
    { id: 2, name: "Experience", color: "#EC4899" },
    { id: 3, name: "Skills", color: "#10B981" },
    { id: 4, name: "Projects", color: "#F97316" },
    { id: 5, name: "Contact", color: "#FBBF24" },
];

export function FloatingOrbNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const section = Math.floor(latest * sections.length);
            setActiveSection(Math.min(section, sections.length - 1));
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <>
            {/* Floating Orb */}
            <motion.div
                className="fixed z-50 pointer-events-none"
                style={{
                    left: mousePos.x - 50,
                    top: mousePos.y - 50,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.div
                    className="relative w-24 h-24 cursor-pointer pointer-events-auto"
                    onHoverStart={() => setIsExpanded(true)}
                    onHoverEnd={() => setIsExpanded(false)}
                    animate={{
                        scale: isExpanded ? 1.3 : 1,
                    }}
                >
                    {/* Center Orb */}
                    <div
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                            background: `conic-gradient(from 0deg, ${sections[activeSection].color}, transparent, ${sections[activeSection].color})`,
                            animation: "rotate 4s linear infinite",
                        }}
                    >
                        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full" style={{
                                background: `radial-gradient(circle, ${sections[activeSection].color}, transparent)`,
                                filter: "blur(8px)",
                            }} />
                        </div>
                    </div>

                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="44"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="48"
                            cy="48"
                            r="44"
                            fill="none"
                            stroke={sections[activeSection].color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={276}
                            strokeDashoffset={276 * (1 - scrollYProgress.get())}
                            style={{
                                filter: `drop-shadow(0 0 8px ${sections[activeSection].color})`,
                            }}
                        />
                    </svg>

                    {/* Section Dots */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            rotate: isExpanded ? 0 : 360,
                            opacity: isExpanded ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {sections.map((section, index) => {
                            const angle = (index / sections.length) * Math.PI * 2 - Math.PI / 2;
                            const radius = isExpanded ? 60 : 50;
                            const x = 48 + Math.cos(angle) * radius;
                            const y = 48 + Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={section.id}
                                    className="absolute w-3 h-3 rounded-full cursor-pointer"
                                    style={{
                                        left: x,
                                        top: y,
                                        backgroundColor: section.color,
                                        boxShadow: activeSection === index
                                            ? `0 0 12px ${section.color}`
                                            : "none",
                                    }}
                                    animate={{
                                        scale: activeSection === index ? 1.5 : 1,
                                    }}
                                    whileHover={{ scale: 2 }}
                                />
                            );
                        })}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Section Name Label */}
            {isExpanded && (
                <motion.div
                    className="fixed z-40 pointer-events-none text-2xl font-black"
                    style={{
                        left: mousePos.x + 80,
                        top: mousePos.y - 20,
                        color: sections[activeSection].color,
                        textShadow: `0 0 20px ${sections[activeSection].color}`,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                >
                    {sections[activeSection].name}
                </motion.div>
            )}
        </>
    );
}
