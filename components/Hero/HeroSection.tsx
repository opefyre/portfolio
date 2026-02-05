"use client";

import { useEffect, useRef } from "react";
import { Scene3D } from "./Scene3D";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current && subtitleRef.current && ctaRef.current) {
            const tl = gsap.timeline();

            // Dramatic entrance animation
            tl.fromTo(
                titleRef.current.children,
                {
                    opacity: 0,
                    y: 100,
                    rotationX: -90,
                    transformOrigin: "top center"
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out"
                }
            ).fromTo(
                subtitleRef.current,
                { opacity: 0, y: 60, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            ).fromTo(
                ctaRef.current.children,
                { opacity: 0, y: 40, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
                "-=0.4"
            );
        }
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
        >
            {/* 3D Background */}
            <Scene3D />

            {/* Radial Glow */}
            <div className="absolute inset-0 radial-glow -z-10" />

            {/* Grid Background */}
            <div className="absolute inset-0 grid-background opacity-40 -z-10" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black -z-10" />

            {/* Content */}
            <div className="relative z-10 max-w-[90rem] mx-auto px-6 text-center">
                {/* Oversized Name */}
                <h1
                    ref={titleRef}
                    className="font-bold mb-12 font-display leading-none"
                    style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
                >
                    <div className="gradient-text-animated" style={{ display: "inline-block" }}>
                        {personalInfo.name.split(" ")[0]}
                    </div>
                    <br />
                    <div className="gradient-text-animated" style={{ display: "inline-block", animationDelay: "0.1s" }}>
                        {personalInfo.name.split(" ")[1]}
                    </div>
                </h1>

                {/* Bold Title with Dramatic Glow */}
                <p
                    ref={subtitleRef}
                    className="text-3xl md:text-5xl lg:text-6xl mb-16 font-bold leading-tight max-w-5xl mx-auto"
                    style={{
                        background: "linear-gradient(135deg, #00D9FF 0%, #A855F7 50%, #EC4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 40px rgba(0, 217, 255, 0.4))"
                    }}
                >
                    {personalInfo.title}
                </p>

                {/* Revolutionary CTA Buttons */}
                <motion.div
                    ref={ctaRef}
                    className="flex gap-8 justify-center flex-wrap"
                >
                    <a
                        href="#experience"
                        className="group relative px-12 py-6 text-xl font-bold overflow-hidden rounded-none border-2 border-electric-blue hover:border-electric-purple transition-all duration-500"
                        style={{
                            background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(168, 85, 247, 0.1))",
                            boxShadow: "0 0 40px rgba(0, 217, 255, 0.2)"
                        }}
                    >
                        <span className="relative z-10 group-hover:text-electric-blue transition-colors">
                            Experience
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </a>

                    <a
                        href="#projects"
                        className="group relative px-12 py-6 text-xl font-bold overflow-hidden rounded-none border-2 border-electric-purple hover:border-electric-pink transition-all duration-500"
                        style={{
                            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                            boxShadow: "0 0 40px rgba(168, 85, 247, 0.2)"
                        }}
                    >
                        <span className="relative z-10 group-hover:text-electric-purple transition-colors">
                            Projects
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-electric-pink/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </a>

                    <a
                        href="#contact"
                        className="group relative px-12 py-6 text-xl font-bold overflow-hidden rounded-none"
                        style={{
                            background: "linear-gradient(135deg, #00D9FF, #A855F7, #EC4899)",
                            boxShadow: "0 0 60px rgba(0, 217, 255, 0.4)",
                        }}
                    >
                        <span className="relative z-10 text-black group-hover:text-white transition-colors">
                            Contact
                        </span>
                        <div className="absolute inset-0 bg-black/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                </motion.div>

                {/* Minimalist Scroll Indicator */}
                <motion.div
                    className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <motion.div
                        className="w-1 h-20 bg-gradient-to-b from-electric-blue to-transparent"
                        animate={{ scaleY: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
