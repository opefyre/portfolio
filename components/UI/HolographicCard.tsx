"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HolographicCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position relative to the center of the card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the tilt
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    // Map mouse position to rotation axes (max tilt: 15 degrees)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Calculate dynamic glare based on mouse position
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Calculate mouse position relative to card boundaries (-0.5 to 0.5)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset to flat position
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative perspective-[1000px] w-full h-full z-10 block">
            <motion.div
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`
                    relative w-full h-full rounded-2xl p-6 transition-all duration-300
                    bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/10
                    shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]
                    ${isHovered ? 'z-50 shadow-[0_20px_40px_-10px_rgba(56,189,248,0.2)] border-brand-blue/30' : ''}
                `}
            >
                {/* Dynamic Glare Overlay */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 mix-blend-overlay transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* Content translated slightly forward for depth */}
                <div
                    className="relative w-full h-full"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
