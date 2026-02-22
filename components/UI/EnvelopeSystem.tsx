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
    const [phase, setPhase] = useState<"idle" | "folding" | "sealed" | "flying" | "success">("idle");

    useEffect(() => {
        if (isSubmitting && phase === "idle") {
            setTimeout(() => setPhase("folding"), 0);
            setTimeout(() => setPhase("sealed"), 600);
            setTimeout(() => setPhase("flying"), 1200);
        } else if (isSuccess && phase === "flying") {
            // Once the fetch is done AND the envelope has flown away, show the ticket
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
                        className="relative w-full max-w-lg"
                        animate={{
                            y: phase === "flying" ? -800 : 0,
                            scale: phase === "flying" ? 0.4 : 1,
                            rotateZ: phase === "flying" ? 15 : 0,
                            opacity: phase === "flying" ? 0 : 1
                        }}
                        transition={{
                            duration: phase === "flying" ? 0.8 : 0.5,
                            ease: phase === "flying" ? "backIn" : "easeInOut"
                        }}
                        exit={{ opacity: 0 }}
                    >
                        {/* The back of the envelope */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[80%] bg-[#1a1c23]/90 backdrop-blur-3xl border border-white/10 rounded-b-[2rem] rounded-t-xl z-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: phase !== "idle" ? 1 : 0, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* The Flap - Mathematically correct 3D hinge */}
                        <motion.div
                            className="absolute top-[20%] left-0 right-0 h-[40%] bg-gradient-to-b from-[#2a2d36] to-[#1a1c23] border-b border-white/10 z-30 origin-top pointer-events-none"
                            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
                            initial={{ opacity: 0, rotateX: -180 }}
                            animate={{
                                opacity: phase !== "idle" ? 1 : 0,
                                rotateX: phase === "sealed" || phase === "flying" ? 0 : -180,
                            }}
                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        />

                        {/* The Letter (Form) */}
                        <motion.div
                            className="relative bg-deep/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl z-10 w-full"
                            initial={{ y: 0, scale: 1 }}
                            animate={{
                                y: phase !== "idle" ? 100 : 0,
                                scale: phase !== "idle" ? 0.75 : 1,
                            }}
                            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        >
                            {formComponent}
                        </motion.div>

                        {/* The Front Pocket */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-tr from-[#1f2229]/90 to-[#2a2d36]/90 backdrop-blur-xl border border-white/10 rounded-b-[2rem] z-20 pointer-events-none"
                            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 35%, 0 0)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase !== "idle" ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        />

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
