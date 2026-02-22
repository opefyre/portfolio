"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function InteractiveLiquidBackground() {
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to typical gradient center coords (-50vh to 50vh)
            const x = e.clientX;
            const y = e.clientY;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-canvas">
            {/* SVG Filter for Liquid/Gooey effect */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="liquid-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -20"
                            result="liquid-filter"
                        />
                        <feBlend in="SourceGraphic" in2="liquid-filter" />
                    </filter>
                </defs>
            </svg>

            {/* Background Base */}
            <div className="absolute inset-0 bg-[#060608]" />

            {/* Subtle Ambient Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />

            {/* Liquid Mesh Container */}
            <div
                className="absolute inset-0 w-full h-full opacity-60"
                style={{ filter: "url(#liquid-filter)" }}
            >
                {/* Static base liquid masses */}
                <div className="absolute top-[20%] left-[30%] w-[60vh] h-[60vh] bg-brand-blue/20 rounded-full mix-blend-screen blur-[50px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[30%] w-[50vh] h-[50vh] bg-brand-purple/20 rounded-full mix-blend-screen blur-[60px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

                {/* Mouse-following attractor mass */}
                <motion.div
                    className="absolute w-[40vh] h-[40vh] bg-white/5 rounded-full blur-[40px] mix-blend-screen"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%"
                    }}
                />
            </div>

            {/* Dark Vignette Overlay to maintain contrast for text */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-canvas/50 to-canvas mix-blend-multiply pointer-events-none" />
        </div>
    );
}
