"use client";

import { Experience, Position } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/UI/SectionHeader";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

const entryVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const numberVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
};

const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
};

const dotVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" as const },
    },
};

export default function ExperienceStack({ experiences }: { experiences: Experience[] }) {
    return (
        <section className="container-wide section-padding" id="experience">
            <SectionHeader
                title="Professional History"
                subtitle="A chronological record of roles, responsibilities, and key achievements."
            />

            <div className="space-y-16">
                {experiences.map((role, idx) => (
                    <motion.div
                        key={idx}
                        variants={entryVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12 hover:border-brand-blue/30 transition-colors duration-500"
                    >
                        {/* Timeline Number */}
                        <motion.div variants={numberVariants} className="md:col-span-3">
                            <span className="text-display text-5xl md:text-6xl text-tertiary/30 group-hover:text-tertiary transition-colors duration-500">
                                0{experiences.length - idx}
                            </span>
                        </motion.div>

                        {/* Content */}
                        <motion.div variants={contentVariants} className="md:col-span-9 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                <h3 className="text-3xl md:text-4xl font-display font-medium text-primary group-hover:text-brand-blue transition-colors duration-300">
                                    {role.company}
                                </h3>
                                <span className="text-secondary font-mono text-sm">{role.location}</span>
                            </div>

                            <div className="space-y-10">
                                {role.positions.map((pos, pIdx) => (
                                    <PositionItem key={pIdx} pos={pos} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function PositionItem({ pos }: { pos: Position }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="group/pos relative pl-6 border-l border-border hover:border-brand-purple/50 transition-colors cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Animated Dot */}
            <motion.div
                variants={dotVariants}
                className={clsx(
                    "absolute left-[-5px] top-2 w-2 h-2 rounded-full transition-colors duration-300",
                    isOpen ? "bg-brand-purple" : "bg-border group-hover/pos:bg-brand-purple/50"
                )}
            />

            {/* Header Content */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="text-xl text-primary font-medium group-hover/pos:text-brand-purple transition-colors">{pos.title}</h4>
                    <p className="text-tertiary text-[13px] uppercase tracking-wider font-mono mb-2">{pos.period}</p>
                </div>

                {/* Chevron Toggle */}
                <div className={clsx(
                    "p-1.5 md:p-2 rounded-full border transition-all duration-300 flex-shrink-0 mt-1 group-hover/pos:bg-brand-purple/5",
                    isOpen
                        ? "rotate-90 bg-brand-purple/10 border-brand-purple/30 text-brand-purple shadow-[0_0_10px_rgba(192,132,252,0.2)]"
                        : "bg-page border-border text-tertiary group-hover/pos:text-secondary group-hover/pos:border-border/80"
                )}>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
            </div>

            {/* Expandable Details */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2">
                            <ul className="space-y-3">
                                {pos.achievements.map((item, i) => (
                                    <li key={i} className="text-secondary text-sm leading-relaxed max-w-3xl flex items-start gap-3">
                                        <span className="text-brand-purple mt-1.5 text-[8px]">✦</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
