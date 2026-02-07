"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as random from "maath/random/dist/maath-random.cjs";
import { personalInfo } from "@/lib/data";
import { useTheme } from "next-themes";

function StarField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }));
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

export default function DigitalHero() {
    return (
        <section className="relative h-[85vh] w-full flex flex-col justify-center items-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-40 opacity-30">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Grid Overlay: Moved behind content but above background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Title Gradient - Simplified to 2-stop for reliability */}
                <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[var(--hero-gradient-from)] to-[var(--hero-gradient-to)] mb-6 leading-tight drop-shadow-sm pb-2 transition-colors duration-500">
                    {personalInfo.name}
                </h1>
                <h2 className="text-brand-blue font-bold tracking-[0.1em] text-lg md:text-xl uppercase mb-8">
                    PROCESS EXCELLENCE & DIGITAL TRANSFORMATION
                </h2>
                {/* Semantic text color update */}
                <p className="text-secondary text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                    Driving operational excellence and enterprise-wide efficiency through Lean Six Sigma, system integration, and AI-enabled automation across industrial and digital environments.
                </p>
            </div>
        </section>
    );
}
