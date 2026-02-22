"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowRight, Loader2 } from "lucide-react";
import InteractiveLiquidBackground from "@/components/UI/InteractiveLiquidBackground";
import FloatingInput from "@/components/UI/FloatingInput";
import MagneticButton from "@/components/UI/MagneticButton";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("hello@abosh.io");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using our mocked contact routing endpoint
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sent: true }),
            });

            if (res.ok) {
                setIsSuccess(true);
                // Reset form after a few seconds showing success
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsSubmitting(false);
                    (e.target as HTMLFormElement).reset();
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-12">
            {/* The underlying fluid simulation */}
            <div className="hidden md:block">
                {/* Extremely heavy effects are desktop-only to protect mobile battery/fps */}
                <InteractiveLiquidBackground />
            </div>

            <div className="md:hidden absolute inset-0 bg-canvas -z-10">
                {/* Static fallback for mobile */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh]">

                    {/* Left Column: The Vibe & Confidence */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-8 md:pr-12"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[1.1] tracking-tight">
                            Let&apos;s build <br /><span className="text-brand-blue">extraordinary.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary max-w-md leading-relaxed">
                            Looking to architect a new platform, discuss technical consulting, or just say hello?
                        </p>

                        <div className="pt-8">
                            <p className="text-sm font-mono tracking-widest uppercase text-tertiary mb-4">Direct Channel</p>
                            <button
                                onClick={handleCopyEmail}
                                className="group flex items-center gap-4 text-xl md:text-2xl font-mono text-white transition-colors hover:text-brand-blue"
                            >
                                <span className="relative">
                                    hello@abosh.io
                                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
                                </span>

                                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-white/5 group-hover:bg-brand-blue/10 transition-colors">
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Check className="w-4 h-4 text-brand-blue" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Copy className="w-4 h-4 text-secondary group-hover:text-brand-blue" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: The Unified Minimal Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="bg-deep/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Shimmer effect inside form */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent pointer-events-none" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 w-full">
                            <FloatingInput
                                id="name"
                                label="Your Name"
                                required
                            />

                            <FloatingInput
                                id="email"
                                type="email"
                                label="Email Address"
                                required
                            />

                            <FloatingInput
                                id="message"
                                label="How can I help you?"
                                isTextArea
                                required
                            />

                            <div className="pt-6">
                                <MagneticButton strength={0.2} className="w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isSuccess}
                                        className="relative w-full sm:w-auto overflow-hidden bg-brand-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-brand-blue/90 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center min-w-[200px]"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSuccess ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Check className="w-5 h-5" />
                                                    Received
                                                </motion.div>
                                            ) : isSubmitting ? (
                                                <motion.div
                                                    key="submitting"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                >
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    Transmit
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
