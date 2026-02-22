"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useState } from "react";

export default function MagneticBackButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed top-6 left-6 z-50 md:top-12 md:left-12">
            <MagneticButton strength={0.3}>
                <Link
                    href="/"
                    className="group relative flex items-center justify-center p-4 rounded-full bg-deep/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-colors hover:bg-brand-blue/5 hover:border-brand-blue/30 overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute inset-0 bg-brand-blue/20 blur-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        transition={{ duration: 0.3 }}
                    />

                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-brand-blue transition-colors relative z-10" />

                    {/* Expanding animated text label */}
                    <motion.div
                        initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
                        animate={{
                            width: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0,
                            paddingLeft: isHovered ? 12 : 0
                        }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden whitespace-nowrap relative z-10 hidden sm:block"
                    >
                        <span className="font-mono text-xs tracking-widest uppercase text-brand-blue font-bold">
                            Return
                        </span>
                    </motion.div>
                </Link>
            </MagneticButton>
        </div>
    );
}
