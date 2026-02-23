"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/db";
import { useEffect } from "react";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    // Prevent body scroll AND stop Lenis smooth scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Stop Lenis so native overflow-y-auto works inside the modal
            window.__lenis?.stop();
        } else {
            document.body.style.overflow = "unset";
            // Resume Lenis smooth scrolling
            window.__lenis?.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            window.__lenis?.start();
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content - onWheel stopPropagation prevents Lenis from eating scroll events */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-card w-full max-w-2xl max-h-[85vh] mt-16 md:mt-0 flex flex-col rounded-2xl md:rounded-3xl shadow-2xl pointer-events-auto border border-white/5 relative"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={(e) => e.stopPropagation()} // Block Lenis from intercepting wheel events inside the modal
                        >
                            <div
                                className="p-5 md:p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar relative z-10 overscroll-contain"
                                data-lenis-prevent="true"
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded font-bold">
                                                {project.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-display font-bold text-primary">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/5 transition-colors text-tertiary hover:text-white shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                {/* Content Grid */}
                                <div className="space-y-8">
                                    {/* Problem & Solution */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-mono uppercase tracking-widest text-secondary border-b border-border pb-2">The Challenge</h3>
                                            <p className="text-secondary text-sm leading-relaxed pb-4">
                                                {project.problem}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-mono uppercase tracking-widest text-brand-blue border-b border-brand-blue/30 pb-2">The Solution</h3>
                                            <div className="text-primary text-sm leading-relaxed whitespace-pre-wrap">
                                                {project.solution}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-mono uppercase tracking-widest text-secondary border-b border-border pb-2">Tools & Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills?.map((tech) => (
                                                <span key={tech} className="px-3 py-1.5 bg-page border border-border rounded text-xs font-mono text-tertiary">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Impact Box */}
                                    <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl p-6 relative overflow-hidden mt-8">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-sm font-mono uppercase tracking-widest text-brand-blue mb-2">Business Impact</h3>
                                        <p className="text-lg md:text-xl font-medium text-primary relative z-10">
                                            {project.impact}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
