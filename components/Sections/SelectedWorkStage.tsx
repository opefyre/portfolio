"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easings } from "@/lib/motion";

interface SelectedWorkStageProps {
    children: ReactNode;
    /** Total number of programs (shown on the marquee stripe). */
    totalCount: number;
}

/**
 * Distinctive 'stage curtain' entrance for the Selected Work section.
 *
 * - Outer wrapper is full-bleed and z-indexed above the previous section
 * - Inner sheet uses rounded top corners and rises into the viewport as
 *   the user scrolls in (top-radius shrinks, y translates up)
 * - A persistent SELECTED.WORK marquee runs along the rounded edge so the
 *   section reads like a 'projector screen' rather than just another panel
 */
export default function SelectedWorkStage({ children, totalCount }: SelectedWorkStageProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: wrapRef,
        offset: ["start end", "start 30%"],
    });

    // Sheet visually 'rises' over the previous section
    const sheetY = useTransform(scrollYProgress, [0, 1], ["6%", "0%"]);
    const topRadius = useTransform(scrollYProgress, [0, 1], ["48px", "0px"]);
    const labelOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);
    const labelX = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

    return (
        <div ref={wrapRef} className="relative z-20 -mt-6 md:-mt-10">
            {/* Glow underbelly that pokes out of the sheet's rounded top, hinting at depth */}
            <div
                aria-hidden="true"
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-brand-blue/15 blur-[60px] pointer-events-none"
            />

            <motion.section
                id="projects-stage"
                style={{
                    y: sheetY,
                    borderTopLeftRadius: topRadius,
                    borderTopRightRadius: topRadius,
                }}
                className="relative bg-section-tinted border-t border-brand-blue/20 overflow-hidden shadow-[0_-30px_80px_-30px_rgba(56,189,248,0.25)]"
            >
                {/* Top edge marquee — 'STAGE' label moving like a projector film */}
                <motion.div
                    style={{ opacity: labelOpacity, x: labelX }}
                    className="relative border-b border-brand-blue/15 bg-[linear-gradient(180deg,rgba(56,189,248,0.06),transparent)] overflow-hidden"
                >
                    <div className="container-wide flex items-center justify-between gap-4 py-3 text-tertiary">
                        <div className="flex items-center gap-3">
                            <span className="label-mono bracket text-brand-blue">STAGE.05</span>
                            <span className="label-mono">SELECTED WORK · NOW PROJECTING</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                            <span className="label-mono text-brand-blue tabular-nums">
                                {String(totalCount).padStart(2, "0")} ENTRIES
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative ambient layers */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* Cross-section corner brackets */}
                <span aria-hidden="true" className="absolute top-12 left-4 md:left-8 w-4 h-4 border-l border-t border-brand-blue/40" />
                <span aria-hidden="true" className="absolute top-12 right-4 md:right-8 w-4 h-4 border-r border-t border-brand-blue/40" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, ease: easings.ui }}
                    className="relative z-10"
                >
                    {children}
                </motion.div>
            </motion.section>
        </div>
    );
}
