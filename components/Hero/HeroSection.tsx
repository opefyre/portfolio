"use client";

import { useEffect, useRef } from "react";
import { Scene3D } from "./Scene3D";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (titleRef.current && subtitleRef.current) {
            // Animate title with glitch effect
            const tl = gsap.timeline();

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            ).to(titleRef.current, {
                x: -2,
                duration: 0.05,
                repeat: 6,
                yoyo: true,
                ease: "power1.inOut",
            }).fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.3"
            );
        }
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <Scene3D />

            {/* Grid Background Overlay */}
            <div className="absolute inset-0 grid-background opacity-30 -z-10" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Name */}
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold mb-6 font-display"
                    >
                        <span className="gradient-text">{personalInfo.name}</span>
                    </h1>

                    {/* Title */}
                    <p
                        ref={subtitleRef}
                        className="text-2xl md:text-4xl mb-8 text-neon-blue text-glow"
                    >
                        {personalInfo.title}
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex gap-6 justify-center flex-wrap"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <a
                            href="#experience"
                            className="group relative px-8 py-4 glass-strong hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 text-lg font-semibold">
                                View Experience
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>

                        <a
                            href="#projects"
                            className="group relative px-8 py-4 glass-strong hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 text-lg font-semibold">
                                See Projects
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>

                        <a
                            href="#contact"
                            className="group relative px-8 py-4 holographic hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10 text-lg font-semibold">
                                Get In Touch
                            </span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                >
                    <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 bg-neon-blue rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
