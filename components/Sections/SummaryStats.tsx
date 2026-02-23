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

// Provide a uniform smooth transition to kill subpixel vibration
const springTransition = { type: "spring" as const, bounce: 0, duration: 0.4 };

// --- Dynamic Island Segment ---
interface IslandSegmentProps {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isHovered: boolean;
    onInteract: () => void;
    onClick: () => void;
    hideDivider?: boolean;
}

const IslandSegment = ({
    value,
    label,
    icon: Icon,
    isHovered,
    onInteract,
    onClick,
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
            transition={springTransition}
            onMouseEnter={onInteract}
            onClick={onClick}
            className={clsx(
                "relative flex items-center justify-center px-4 sm:px-5 lg:px-8 cursor-pointer md:cursor-default transition-colors duration-300 rounded-2xl md:rounded-none h-16 md:h-full w-full md:w-auto",
                isHovered ? "bg-white/[0.08]" : "bg-transparent"
            )}
        >
            <motion.div layout transition={springTransition} className="flex items-center gap-3 md:gap-4 z-10 w-full justify-center">
                {/* Icon */}
                <motion.div layout transition={springTransition} className="flex-shrink-0 flex items-center justify-center text-brand-blue drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>

                {/* Number */}
                <motion.div layout transition={springTransition} className="flex-shrink-0 flex items-baseline text-2xl md:text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">
                    {isNumber ? (
                        <>
                            <AnimatedCounter value={numValue} />
                            <motion.span layout transition={springTransition} className="text-xl md:text-2xl ml-[2px] text-brand-blue">{suffix}</motion.span>
                        </>
                    ) : (
                        value
                    )}
                </motion.div>

                {/* Expanding Label */}
                <AnimatePresence initial={false}>
                    {isHovered && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{ opacity: 1, width: "max-content", marginLeft: 8 }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={springTransition}
                            className="overflow-hidden whitespace-nowrap flex-shrink-0 origin-left"
                        >
                            <span className="text-[11px] md:text-sm uppercase tracking-widest text-secondary font-mono font-medium block">
                                {label}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Divider */}
            {!hideDivider && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-white/10" />
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

                {/* Unified Dynamic Island Container - Responsive Mobile + Desktop */}
                <motion.div
                    layout
                    transition={springTransition}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col md:flex-row w-full max-w-[340px] md:max-w-none md:w-auto p-2 md:p-0 md:h-20 rounded-[2rem] md:rounded-full bg-deep/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden items-center justify-center cursor-default gap-2 md:gap-0"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {stats.map((stat, i) => (
                            <IslandSegment
                                key={i}
                                {...stat}
                                isHovered={hoveredIndex === i}
                                onInteract={() => setHoveredIndex(i)}
                                onClick={() => window.innerWidth < 768 ? setHoveredIndex(hoveredIndex === i ? null : i) : setHoveredIndex(i)}
                                hideDivider={i === stats.length - 1}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
