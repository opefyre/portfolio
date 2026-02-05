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

            {/* Content */}
            <div className="relative z-10 text-center px-4 mix-blend-normal dark:mix-blend-screen max-w-4xl mx-auto">
                {/* Title Gradient uses explicit tailwind colors but falls back to safe semantic concepts */}
                <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-gray-400 mb-6 leading-tight">
                    {personalInfo.name}
                </h1>
                <h2 className="text-brand-blue font-bold tracking-[0.1em] text-lg md:text-xl uppercase mb-8">
                    PROCESS EXCELLENCE & DIGITAL TRANSFORMATION
                </h2>
                {/* Semantic text color update */}
                <p className="text-secondary text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Driving enterprise-wide automation, system integration, and operational excellence through data, AI, and technology.
                </p>
            </div>

            {/* Grid Overlay: Updated to use semantic border colors implicitly or safe RGBA */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />
        </section>
    );
}
