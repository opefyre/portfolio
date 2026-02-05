"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalIntroProps {
    onComplete: () => void;
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [showCursor, setShowCursor] = useState(true);
    const [isExploding, setIsExploding] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const terminalLines = [
        "> Initializing portfolio system...",
        "> Loading process excellence modules...",
        "> Connecting to digital transformation framework...",
        "> System online. Welcome.",
        "",
        "> Launching visual interface...",
    ];

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < terminalLines.length) {
                setLines((prev) => [...prev, terminalLines[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsExploding(true);
                    startParticleExplosion();
                }, 800);
            }
        }, 400);

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(interval);
            clearInterval(cursorInterval);
        };
    }, []);

    const startParticleExplosion = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            color: string;
        }> = [];

        const colors = ["#00D9FF", "#A855F7", "#EC4899", "#10B981"];

        // Create particles from center
        for (let i = 0; i < 200; i++) {
            const angle = (Math.PI * 2 * i) / 200;
            const speed = Math.random() * 8 + 4;
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        let frame = 0;
        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.01;

                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            frame++;
            if (frame < 150) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(onComplete, 300);
            }
        };

        animate();
    };

    return (
        <AnimatePresence>
            {!isExploding ? (
                <motion.div
                    className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-4xl w-full px-8">
                        {lines.map((line, index) => (
                            <motion.div
                                key={index}
                                className="text-neon-green text-xl mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {line}
                            </motion.div>
                        ))}
                        {showCursor && (
                            <span className="inline-block w-3 h-6 bg-neon-green animate-pulse"></span>
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="fixed inset-0 z-50"
                    exit={{ opacity: 0 }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{ background: "#000" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
