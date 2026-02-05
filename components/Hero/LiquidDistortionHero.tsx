"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function LiquidDistortionHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Liquid blob animation
        const particles: Array<{
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            vx: number;
            vy: number;
        }> = [];

        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const radius = 200;
            const x = canvas.width / 2 + Math.cos(angle) * radius;
            const y = canvas.height / 2 + Math.sin(angle) * radius;

            particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0,
            });
        }

        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw liquid blob
            ctx.beginPath();
            particles.forEach((p, i) => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    p.vx += (dx / dist) * force * 0.5;
                    p.vy += (dy / dist) * force * 0.5;
                }

                // Return to base position
                p.vx += (p.baseX - p.x) * 0.02;
                p.vy += (p.baseY - p.y) * 0.02;

                // Apply velocity
                p.x += p.vx;
                p.y += p.vy;

                // Damping
                p.vx *= 0.95;
                p.vy *= 0.95;

                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    ctx.lineTo(p.x, p.y);
                }
            });

            ctx.closePath();
            ctx.fillStyle = "rgba(0, 217, 255, 0.15)";
            ctx.fill();
            ctx.strokeStyle = "#00D9FF";
            ctx.lineWidth = 3;
            ctx.stroke();

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-black">
            <canvas ref={canvasRef} className="absolute inset-0" />

            <motion.div
                ref={textRef}
                className="relative z-10 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1
                    className="font-black leading-none mb-8"
                    style={{
                        fontSize: "clamp(4rem, 15vw, 12rem)",
                        background: "linear-gradient(135deg, #00D9FF, #A855F7, #EC4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 40px rgba(0, 217, 255, 0.5))",
                    }}
                >
                    ABOLFAZL
                    <br />
                    SHIRKAVAND
                </h1>

                <motion.p
                    className="text-3xl md:text-5xl text-white/80 font-bold"
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(0, 217, 255, 0.5)",
                            "0 0 40px rgba(168, 85, 247, 0.5)",
                            "0 0 20px rgba(0, 217, 255, 0.5)",
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    Process Excellence Leader
                </motion.p>
            </motion.div>

            {/* Particle field */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-electric-blue rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
