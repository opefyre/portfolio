"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

interface SectionDividerProps {
    label: string;
    code: string;
}

/**
 * Mission-control divider used between major sections. A scan-line that draws across
 * the screen when in view, anchored by a left mono code and a right label.
 */
export default function SectionDivider({ label, code }: SectionDividerProps) {
    return (
        <div className="container-wide py-12 md:py-16" aria-hidden="true">
            <div className="flex items-center gap-4">
                <span className="label-mono text-brand-blue whitespace-nowrap">[ {code} ]</span>
                <div className="relative flex-1 h-px overflow-hidden">
                    <span className="absolute inset-0 bg-white/5" />
                    <motion.span
                        className="absolute top-0 left-0 h-full bg-brand-blue origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-30%" }}
                        transition={{ duration: 1.2, ease: easings.ui }}
                    />
                </div>
                <span className="label-mono text-tertiary whitespace-nowrap">{label}</span>
            </div>
        </div>
    );
}
