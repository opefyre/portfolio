"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as random from "maath/random/dist/maath-random.cjs";

function StarField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#38BDF8"
                    size={0.003} // Ultra fine
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function DigitalHero() {
    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 mix-blend-screen">
                <h2 className="text-brand-blue font-bold tracking-[0.2em] text-sm uppercase mb-6 animate-pulse-slow">
                    Process Excellence Leader
                </h2>
                <h1 className="text-display text-5xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-8">
                    DIGITAL<br />ARCHITECT
                </h1>
                <p className="max-w-xl mx-auto text-muted text-lg md:text-xl font-light leading-relaxed">
                    Designing the future of enterprise operations through automation, data intelligence, and strategic innovation.
                </p>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-brand-blue to-transparent" />
                <span className="text-[10px] uppercase tracking-widest text-brand-blue">Initialize</span>
            </div>
        </section>
    );
}
