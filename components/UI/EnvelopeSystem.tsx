"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EnvelopeSystem({
    isSubmitting,
    isSuccess,
    formComponent,
    ticketComponent
}: {
    isSubmitting: boolean;
    isSuccess: boolean;
    formComponent: React.ReactNode;
    ticketComponent: React.ReactNode;
}) {
    const [phase, setPhase] = useState<"idle" | "forming" | "sliding" | "sealed" | "flying" | "success">("idle");

    useEffect(() => {
        if (isSubmitting && phase === "idle") {
            setTimeout(() => setPhase("forming"), 0);     // Fade in envelope background
            setTimeout(() => setPhase("sliding"), 300);   // Scale and slide letter deeply into pocket
            setTimeout(() => setPhase("sealed"), 800);    // Hinge flap closed + Stamp Wax Seal
            setTimeout(() => setPhase("flying"), 1500);   // Launch package upward
        } else if (isSuccess && phase === "flying") {
            // Once the fetch is done AND the envelope has flown away, reveal the ticket
            setTimeout(() => setPhase("success"), 500);
        } else if (!isSubmitting && !isSuccess && phase !== "idle") {
            setTimeout(() => setPhase("idle"), 0);
        }
    }, [isSubmitting, isSuccess, phase]);

    return (
        <div className="relative w-full flex items-center justify-center perspective-[2000px]">
            <AnimatePresence mode="wait">
                {phase !== "success" ? (
                    <motion.div
                        key="envelope-container"
                        className="relative w-full max-w-lg mx-auto"
                        animate={{
                            y: phase === "flying" ? -1000 : 0,
                            scale: phase === "flying" ? 0.3 : 1,
                            rotateZ: phase === "flying" ? 10 : 0,
                            opacity: phase === "flying" ? 0 : 1
                        }}
                        transition={{
                            duration: phase === "flying" ? 0.8 : 0.5,
                            ease: phase === "flying" ? "easeInOut" : "easeInOut"
                        }}
                        exit={{ opacity: 0 }}
                    >
                        {/* ABSOLUTE ENVELOPE BOUNDS */}
                        {/* By pushing the envelope borders outward, the letter has physical space to shrink and slide inside. */}
                        <div className="absolute -inset-4 md:-inset-8 pointer-events-none">

                            {/* 1. TOUGH BACK LAYER */}
                            <motion.div
                                className="absolute inset-0 bg-[#12141a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl z-0 shadow-2xl"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: phase !== "idle" ? 1 : 0, scale: phase !== "idle" ? 1 : 0.95 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* 2. THE TOP FLAP */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-[#1b1e26] to-[#12141a] z-30 origin-top rounded-t-2xl drop-shadow-xl"
                                style={{
                                    // A true envelope flap is wide at the top hinges, then angles down to a point.
                                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)",
                                    backfaceVisibility: "hidden"
                                }}
                                initial={{ opacity: 0, rotateX: -180 }}
                                animate={{
                                    opacity: phase !== "idle" ? 1 : 0,
                                    rotateX: (phase === "sealed" || phase === "flying") ? 0 : -180,
                                }}
                                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            />

                            {/* 3. THE FRONT POCKET */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-tr from-[#16181f] to-[#1f222b] border border-white/10 rounded-b-2xl z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
                                style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 35%, 0 0)" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: phase !== "idle" ? 1 : 0, y: phase !== "idle" ? 0 : 20 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* 4. THE WAX SEAL */}
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-[0_4px_15px_rgba(220,38,38,0.5),inset_0_-2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center"
                                style={{ top: "calc(60% - 32px)" }} // Perfectly straddles the exact tip of the 60% flap
                                initial={{ scale: 3, opacity: 0 }}
                                animate={{
                                    scale: (phase === "sealed" || phase === "flying") ? 1 : 4,
                                    opacity: (phase === "sealed" || phase === "flying") ? 1 : 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    delay: phase === "sealed" ? 0.3 : 0 // Stamp delay
                                }}
                            >
                                <div className="w-12 h-12 rounded-full border border-red-900/40 bg-gradient-to-br from-red-600 to-red-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                                    <span className="text-red-950/80 font-serif font-bold text-2xl" style={{ textShadow: "0px 1px 1px rgba(255,255,255,0.2)" }}>A</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* 5. THE LETTER (FORM - Normal Flow Component) */}
                        <motion.div
                            className="relative bg-deep/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-8 md:p-12 shadow-2xl z-10 w-full"
                            initial={{ y: 0, scale: 1 }}
                            animate={{
                                y: (phase === "sliding" || phase === "sealed" || phase === "flying") ? 70 : 0,
                                scale: (phase === "sliding" || phase === "sealed" || phase === "flying") ? 0.75 : 1,
                            }}
                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        >
                            {formComponent}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="ticket"
                        className="w-full"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    >
                        {ticketComponent}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
