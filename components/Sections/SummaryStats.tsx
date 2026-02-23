"use client";

import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";
import { Cpu, Briefcase, GraduationCap, Code } from "lucide-react";
import clsx from "clsx";

// --- Animated Number Counter ---
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 50,
        damping: 15,
        duration: duration * 1000
    });

    const displayValue = useTransform(springValue, (current) => Math.floor(current));

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// --- Dynamic Island Segment ---
interface IslandSegmentProps {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isHovered: boolean;
    onHoverEnter: () => void;
    onHoverLeave: () => void;
    isMobile?: boolean;
    hideDivider?: boolean;
}

const IslandSegment = ({
    value,
    label,
    icon: Icon,
    isHovered,
    onHoverEnter,
    onHoverLeave,
    isMobile = false,
    hideDivider = false
}: IslandSegmentProps) => {
    // Extract number for AnimatedCounter
    const strValue = String(value);
    const numValue = parseInt(strValue.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && strValue.match(/\d+/);
    const suffix = strValue.replace(/[\d\.]/g, '') || '';

    return (
        <motion.div
            layout
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            className={clsx(
                "relative flex items-center h-full px-5 lg:px-8 cursor-default transition-colors duration-300",
                isHovered ? "bg-white/[0.08]" : "bg-transparent",
                isMobile && "px-4 w-full rounded-2xl bg-white/[0.03]"
            )}
        >
            <motion.div layout className="flex items-center gap-3 md:gap-4 z-10 w-full justify-center">
                {/* Icon */}
                <motion.div layout className="flex-shrink-0 flex items-center justify-center text-brand-blue drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>

                {/* Number */}
                <motion.div layout className="flex-shrink-0 flex items-baseline text-2xl md:text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">
                    {isNumber ? (
                        <>
                            <AnimatedCounter value={numValue} />
                            <span className="text-xl md:text-2xl ml-[2px] text-brand-blue">{suffix}</span>
                        </>
                    ) : (
                        value
                    )}
                </motion.div>

                {/* Expanding Label (Only visible on hover or mobile) */}
                <AnimatePresence>
                    {(isHovered || isMobile) && (
                        <motion.div
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden whitespace-nowrap flex-shrink-0"
                        >
                            <span className="text-[11px] md:text-sm uppercase tracking-widest text-secondary font-mono font-medium">
                                {label}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Divider */}
            {!hideDivider && !isMobile && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-white/10" />
            )}
        </motion.div>
    );
};

export default function SummaryStats({
    experiences,
    projects,
    certifications,
    education
}: {
    experiences: Experience[],
    projects: Project[],
    certifications: Certification[],
    education: Education[]
}) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // -- Data Processing --
    let earliestYear = new Date().getFullYear();
    experiences.forEach(exp => {
        exp.positions.forEach(pos => {
            const match = pos.period.match(/\d{4}/);
            if (match) {
                const year = parseInt(match[0]);
                if (year < earliestYear) earliestYear = year;
            }
        });
    });
    const yearsExperience = new Date().getFullYear() - earliestYear;
    const totalRoles = experiences.reduce((acc, exp) => acc + exp.positions.length, 0);
    const totalCredentials = education.length + certifications.length;
    const credentialsDisplay = totalCredentials >= 10 ? '10+' : totalCredentials.toString();

    const stats = [
        { value: `${yearsExperience}+`, label: "Years Experience", icon: Briefcase },
        { value: `${projects.length}+`, label: "Major Projects", icon: Code },
        { value: `${totalRoles}`, label: "Distinct Roles", icon: Cpu },
        { value: `${credentialsDisplay}`, label: "Credentials", icon: GraduationCap },
    ];

    return (
        <section className="container-wide py-12 md:py-24 relative flex justify-center w-full my-8">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[150px] bg-brand-blue/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-0 flex justify-center">

                {/* Mobile View: Vertical Stack of Pills */}
                <div className="flex md:hidden flex-col gap-3 w-full max-w-[320px]">
                    {stats.map((stat, i) => (
                        <div key={i} className="h-[60px] rounded-2xl bg-card/60 backdrop-blur-xl border border-white/5 shadow-lg flex items-center justify-center overflow-hidden">
                            <IslandSegment
                                {...stat}
                                isHovered={true} // Always expanded on mobile
                                onHoverEnter={() => { }}
                                onHoverLeave={() => { }}
                                isMobile={true}
                                hideDivider={true}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop View: The Dynamic Island Strip */}
                <motion.div
                    layout
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="hidden md:flex h-20 rounded-full bg-deep/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden items-center justify-center cursor-default"
                >
                    <AnimatePresence mode="popLayout">
                        {stats.map((stat, i) => (
                            <IslandSegment
                                key={i}
                                {...stat}
                                isHovered={hoveredIndex === i}
                                onHoverEnter={() => setHoveredIndex(i)}
                                onHoverLeave={() => { }}
                                hideDivider={i === stats.length - 1}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
