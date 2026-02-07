"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalIntroProps {
    onComplete: () => void;
}

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const terminalLines = [
            "> Initializing portfolio system...",
            "> Loading process excellence modules...",
            "> Connecting to digital transformation framework...",
            "> System online. Welcome.",
            "",
            "> Launching visual interface...",
        ];

        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < terminalLines.length) {
                setLines((prev) => [...prev, terminalLines[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                // Wait a moment then complete
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 400);

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(interval);
            clearInterval(cursorInterval);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono"
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
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
                        <motion.span
                            className="inline-block w-3 h-6 bg-neon-green"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
