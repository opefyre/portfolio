"use client";

import { motion, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";
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
    onPointerEnter: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    onClick: () => void;
    hideDivider?: boolean;
}

const IslandSegment = ({
    value,
    label,
    icon: Icon,
    isHovered,
    onPointerEnter,
    onPointerLeave,
    onClick,
    hideDivider = false
}: IslandSegmentProps) => {
    // Extract number for AnimatedCounter
    const strValue = String(value);
    const numValue = parseInt(strValue.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && strValue.match(/\d+/);
    const suffix = strValue.replace(/[\d\.]/g, '') || '';

    return (
        <div
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
            className={clsx(
                "relative flex items-center justify-center px-4 sm:px-5 lg:px-8 cursor-pointer md:cursor-default transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl md:rounded-none h-16 md:h-full w-full md:w-auto",
                isHovered ? "bg-white/[0.08]" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-3 md:gap-4 z-10 w-full justify-center">
                {/* Icon */}
                <div className="flex-shrink-0 flex items-center justify-center text-brand-blue drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                {/* Number */}
                <div className="flex-shrink-0 flex items-baseline text-2xl md:text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">
                    {isNumber ? (
                        <>
                            <AnimatedCounter value={numValue} />
                            <span className="text-xl md:text-2xl ml-[2px] text-brand-blue">{suffix}</span>
                        </>
                    ) : (
                        value
                    )}
                </div>

                {/* Expanding Label via Fluid CSS Grid Width Interpolation (0fr -> 1fr) */}
                <div
                    className={clsx(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left",
                        isHovered ? "opacity-100 ml-2 md:ml-3" : "opacity-0 ml-0"
                    )}
                    style={{ gridTemplateColumns: isHovered ? '1fr' : '0fr' }}
                >
                    <div className="overflow-hidden whitespace-nowrap">
                        <span className="text-[11px] md:text-sm uppercase tracking-widest text-secondary font-mono font-medium block">
                            {label}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            {!hideDivider && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-white/10 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0 : 1 }} />
            )}
        </div>
    );
};

// Rotating identities for the animated subtitle
const identities = [
    "Process Excellence",
    "Digital Transformation",
    "Enterprise Systems",
    "AI & Automation",
    "Operational Strategy",
    "Lean Six Sigma",
    "Data-Driven Decisions",
    "Intelligent Workflows",
    "Agile Program Delivery",
    "Cross-Functional Leadership",
    "Stakeholder Management",
    "Risk & Resource Planning",
];

export default function SummaryStats({
    experiences: _experiences,
    projects: _projects,
    certifications: _certifications,
    education: _education
}: {
    experiences: Experience[],
    projects: Project[],
    certifications: Certification[],
    education: Education[]
}) {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [currentIdentity, setCurrentIdentity] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdentity((prev) => (prev + 1) % identities.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Differentiate precise pointer events so mobile taps don't conflict with mouse hovers
    const handlePointerEnter = (e: React.PointerEvent, i: number) => {
        if (e.pointerType === "mouse") setHoveredIndex(i);
    };

    const handlePointerLeave = (e: React.PointerEvent) => {
        // We let the container mouse leave handle the reset to 0 to prevent jitter
    };

    const handleClick = (i: number) => {
        // Only toggle via click on touch devices to open/close
        setHoveredIndex(i);
    };

    const stats = [
        { value: "10+", label: "Years Experience", icon: Briefcase },
        { value: "70+", label: "Major Projects", icon: Code },
        { value: "7", label: "Distinct Roles", icon: Cpu },
        { value: "10+", label: "Credentials", icon: GraduationCap },
    ];

    return (
        <section className="container-wide py-12 md:py-24 relative flex justify-center w-full my-8">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[150px] bg-brand-blue/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-0 flex flex-col items-center justify-center gap-8 md:gap-12">

                {/* Terminal-style rotating identity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center"
                >
                    <div className="relative rounded-lg bg-[#0a0f0a] border border-[#00ff41]/20 w-[280px] md:w-[380px] px-5 py-3 shadow-[0_0_20px_rgba(0,255,65,0.08),inset_0_1px_0_rgba(0,255,65,0.05)] overflow-hidden">
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,65,0.03)_2px,rgba(0,255,65,0.03)_4px)] pointer-events-none" />

                        <div className="relative flex items-center gap-2 font-mono text-left">
                            <span className="text-[#00ff41]/50 text-xs md:text-sm select-none">&gt;_</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentIdentity}
                                    initial={{ opacity: 0, filter: "blur(2px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(2px)" }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-[#00ff41] text-sm md:text-base tracking-wide font-medium"
                                    style={{ textShadow: "0 0 8px rgba(0,255,65,0.5)" }}
                                >
                                    {identities[currentIdentity]}
                                </motion.span>
                            </AnimatePresence>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                                className="text-[#00ff41] text-sm md:text-base font-mono"
                                style={{ textShadow: "0 0 8px rgba(0,255,65,0.5)" }}
                            >
                                █
                            </motion.span>
                        </div>
                    </div>
                </motion.div>

                {/* Unified Dynamic Island Container - Responsive Mobile + Desktop */}
                <div
                    onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredIndex(0) }}
                    className="flex flex-col md:flex-row w-full max-w-[340px] md:max-w-none md:w-auto p-2 md:p-0 md:h-20 rounded-[2rem] md:rounded-full bg-deep/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden items-center justify-center cursor-default gap-2 md:gap-0 transition-all duration-500 ease-out"
                >
                    {stats.map((stat, i) => (
                        <IslandSegment
                            key={i}
                            {...stat}
                            isHovered={hoveredIndex === i}
                            onPointerEnter={(e) => handlePointerEnter(e, i)}
                            onPointerLeave={(e) => handlePointerLeave(e)}
                            onClick={() => handleClick(i)}
                            hideDivider={i === stats.length - 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
