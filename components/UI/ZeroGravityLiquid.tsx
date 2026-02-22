"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ZeroGravityLiquid() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            setMousePosition({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* The SVG filter that creates the liquid surface tension effect */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="zero-gravity-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* The liquid mass container */}
            <motion.div
                className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-70"
                style={{ filter: "url(#zero-gravity-goo)" }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{ type: "spring", stiffness: 40, damping: 20, mass: 2 }}
            >
                {/* Core floating body */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-blue rounded-full mix-blend-screen"
                    animate={{
                        scale: [1, 1.1, 0.9, 1],
                        rotate: [0, 90, 180, 360],
                        borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "50% 50% 60% 40%", "40% 60% 70% 30%"]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Orbiting droplet 1 */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-brand-purple rounded-full mix-blend-screen"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 60, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Orbiting droplet 2 */}
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[25%] h-[25%] bg-white/20 rounded-full mix-blend-screen overflow-hidden"
                    animate={{
                        x: [0, -60, 40, 0],
                        y: [0, 50, -30, 0],
                        scale: [1, 0.9, 1.3, 1],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}
