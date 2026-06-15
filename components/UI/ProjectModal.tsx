"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/db";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { easings, durations } from "@/lib/motion";

// React-19-friendly "are we on the client?" — no setState-in-effect.
// SSR returns false; client first render returns true; hydration matches.
const subscribeNoop = () => () => {};
const getClientSnap = () => true;
const getServerSnap = () => false;
function useIsClient() {
    return useSyncExternalStore(subscribeNoop, getClientSnap, getServerSnap);
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    // Portal the modal to <body> — ancestor sections (RevealStack, pinned
    // ScrollTrigger sections) carry transforms that become the containing
    // block for `position: fixed`, which would otherwise anchor the dialog
    // to the section's frame (~2700px tall) instead of the viewport.
    const isClient = useIsClient();

    // Body scroll lock + Lenis pause + Esc-to-close + focus trap
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "unset";
            window.__lenis?.start();
            return;
        }

        document.body.style.overflow = "hidden";
        window.__lenis?.stop();

        // Initial focus on the close button when the dialog opens
        const focusFirst = () => {
            const el = dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]");
            el?.focus();
        };
        const t = window.setTimeout(focusFirst, 50);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                onClose();
                return;
            }
            if (e.key !== "Tab" || !dialogRef.current) return;
            // Focus trap
            const nodes = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "unset";
            window.__lenis?.start();
            window.clearTimeout(t);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onClose]);

    if (!project) return null;
    if (!isClient) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: durations.base, ease: easings.ui }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm cursor-pointer"
                        aria-hidden="true"
                    />

                    <div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                    >
                        <motion.div
                            ref={dialogRef}
                            initial={{ opacity: 0, scale: 0.96, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            transition={{ type: "spring", duration: durations.slow, bounce: 0.2 }}
                            className="bg-card w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl md:rounded-3xl shadow-2xl pointer-events-auto border border-white/10 relative"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <div
                                className="p-5 md:p-8 overflow-y-auto flex-1 min-h-0 custom-scrollbar relative z-10 overscroll-contain"
                                data-lenis-prevent="true"
                                onTouchMove={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs uppercase tracking-widest px-2 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded font-bold">
                                                {project.category}
                                            </span>
                                        </div>
                                        <h2 id={titleId} className="text-2xl md:text-4xl font-display font-bold text-primary">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        data-autofocus
                                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/5 transition-colors text-tertiary hover:text-white shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                                        aria-label="Close case study"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <div className="space-y-8">
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

                                    <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-6 relative overflow-hidden mt-8">
                                        <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
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
        </AnimatePresence>,
        document.body,
    );
}
