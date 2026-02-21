"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as random from "maath/random/dist/maath-random.cjs";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function StarField(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }) as Float32Array);
    const { theme } = useTheme();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={theme === 'light' ? "#020617" : "#38BDF8"}
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

    return (
        <section className="relative h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

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

                {/* Animated rotating subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="h-10 flex items-center justify-center mb-8 overflow-hidden"
                >
                    <span className="text-tertiary font-mono text-sm md:text-base uppercase tracking-[0.2em] mr-3">
                        {"//"}
                    </span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentIdentity}
                            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="text-brand-blue font-bold text-sm md:text-lg uppercase tracking-[0.15em]"
                        >
                            {identities[currentIdentity]}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-tertiary font-mono text-sm md:text-base uppercase tracking-[0.2em] ml-3">
                        {"//"}
                    </span>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-tertiary font-mono text-[10px] uppercase tracking-widest">Scroll</span>
                        <div className="w-px h-8 bg-gradient-to-b from-tertiary/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
