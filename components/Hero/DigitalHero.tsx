"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import * as random from "maath/random/dist/maath-random.cjs";

import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function StarField(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }) as Float32Array);

    const mouse = useRef({ x: 0, y: 0 });
    const { size } = useThree();

    // Listen for mouse movement on the canvas
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1
            mouse.current.x = (e.clientX / size.width - 0.5) * 2;
            mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [size]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Base rotation
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;

            // Mouse-responsive tilt (subtle, lerped for smoothness)
            const targetRotX = mouse.current.y * 0.15;
            const targetRotZ = mouse.current.x * 0.1;
            ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * delta * 0.5;
            ref.current.rotation.z += (targetRotZ - ref.current.rotation.z) * delta * 0.5;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#38BDF8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

// Rotating identities for the animated subtitle
const identities = [
    "Process Excellence",
    "Digital Transformation",
    "Enterprise Systems",
    "AI & Automation",
    "Operational Strategy",
    "Lean Six Sigma",
    "Data-Driven Decisions",
    "Intelligent Workflows",
    "Agile Program Delivery",
    "Cross-Functional Leadership",
    "Stakeholder Management",
    "Risk & Resource Planning",
];

export default function DigitalHero({ name, title }: { name: string; title: string }) {
    const [currentIdentity, setCurrentIdentity] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdentity((prev) => (prev + 1) % identities.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Split the name into first & last for styling
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const scrollToContent = useCallback(() => {
        // Scroll past the hero to the first content section
        window.scrollTo({
            top: window.innerHeight * 0.85,
            behavior: "smooth",
        });
    }, []);

    return (
        <section className="relative h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden">
            {/* 3D Background — interactive, responds to mouse */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                {/* Small label */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-brand-blue font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-6"
                >
                    {title}
                </motion.p>

                {/* Name — oversized, screen-dominating */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    className="font-display font-bold leading-[0.9] tracking-tight mb-8"
                >
                    <span className="block text-[clamp(3.5rem,12vw,10rem)] bg-clip-text text-transparent bg-gradient-to-b from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] transition-colors duration-500">
                        {firstName}
                    </span>
                    <span className="block text-[clamp(3.5rem,12vw,10rem)] bg-clip-text text-transparent bg-gradient-to-b from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] transition-colors duration-500">
                        {lastName}
                    </span>
                </motion.h1>

                {/* Terminal-style rotating identity */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="inline-flex items-center justify-center mb-8"
                >
                    <div className="relative rounded-lg bg-[#0a0f0a] border border-[#00ff41]/20 w-[280px] md:w-[380px] px-5 py-3 shadow-[0_0_20px_rgba(0,255,65,0.08),inset_0_1px_0_rgba(0,255,65,0.05)] overflow-hidden">
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,65,0.03)_2px,rgba(0,255,65,0.03)_4px)] pointer-events-none" />

                        <div className="relative flex items-center gap-2 font-mono text-left">
                            <span className="text-[#00ff41]/50 text-xs md:text-sm select-none">&gt;_</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentIdentity}
                                    initial={{ opacity: 0, filter: "blur(2px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(2px)" }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-[#00ff41] text-sm md:text-base tracking-wide font-medium"
                                    style={{ textShadow: "0 0 8px rgba(0,255,65,0.5)" }}
                                >
                                    {identities[currentIdentity]}
                                </motion.span>
                            </AnimatePresence>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                                className="text-[#00ff41] text-sm md:text-base font-mono"
                                style={{ textShadow: "0 0 8px rgba(0,255,65,0.5)" }}
                            >
                                █
                            </motion.span>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator — clickable, anchored to section bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.button
                    onClick={scrollToContent}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    aria-label="Scroll to content"
                >
                    <span className="text-tertiary group-hover:text-brand-blue font-mono text-[10px] uppercase tracking-widest transition-colors">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-tertiary/50 group-hover:from-brand-blue/50 to-transparent transition-colors" />
                </motion.button>
            </motion.div>
        </section>
    );
}
