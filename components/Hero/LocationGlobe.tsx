"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingGlobe() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const scrollY = window.scrollY;
            const t = state.clock.getElapsedTime();

            // Dynamic rotation: base continuous spin + scroll injection
            meshRef.current.rotation.y = (t * 0.15) + (scrollY * 0.002);
            meshRef.current.rotation.x = (t * 0.08) + (scrollY * 0.001);
            meshRef.current.rotation.z = (t * 0.05);
        }
    });

    return (
        <Sphere ref={meshRef} args={[1.5, 24, 24]} scale={1.2}>
            <meshBasicMaterial
                color="#ff006e"
                wireframe={true}
                transparent
                opacity={0.3}
            />
        </Sphere>
    );
}

export default function LocationGlobe() {
    return (
        <div className="absolute top-1/2 left-[90%] md:left-[100%] translate-y-[-50%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] pointer-events-none z-[-1] opacity-80 mix-blend-screen">
            {/* Holographic Tether Line */}
            <svg
                className="absolute left-[0px] top-[50%] w-[120px] md:w-[150px] h-full overflow-visible pointer-events-none z-0 transform -translate-x-[90px] md:-translate-x-[110px]"
            >
                {/* Line connecting the pill to the sphere */}
                <line
                    x1="0" y1="0"
                    x2="100%" y2="0"
                    stroke="#ff006e"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_5px_rgba(255,0,110,0.8)]"
                />
                <circle cx="100%" cy="0" r="3" fill="#ff006e" className="drop-shadow-[0_0_8px_rgba(255,0,110,1)]" />
            </svg>

            {/* Canvas Container */}
            <div className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(255,0,110,0.4)]">
                <Canvas camera={{ position: [0, 0, 4] }}>
                    <RotatingGlobe />
                </Canvas>
            </div>
        </div>
    );
}
