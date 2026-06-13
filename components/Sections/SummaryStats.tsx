"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";
import { Cpu, Briefcase, GraduationCap, Code } from "lucide-react";
import clsx from "clsx";

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

    return <motion.span ref={ref} className="tabular-nums">{displayValue}</motion.span>;
};

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
    const strValue = String(value);
    const numMatch = strValue.match(/^(\d+)(.*)$/);
    const isNumber = !!numMatch;
    const numValue = numMatch ? parseInt(numMatch[1], 10) : 0;
    const suffix = numMatch ? numMatch[2] : "";

    return (
        <div
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
            className={clsx(
                "relative flex items-center justify-center px-4 sm:px-5 lg:px-8 cursor-pointer md:cursor-default transition-colors duration-300 rounded-2xl md:rounded-none h-16 md:h-full w-full md:w-auto",
                isHovered ? "bg-white/[0.06]" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-3 md:gap-4 z-10 w-full justify-center">
                <div className="flex-shrink-0 flex items-center justify-center text-brand-blue">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                <div className="flex-shrink-0 flex items-baseline text-2xl md:text-3xl font-display font-bold text-white tracking-tight tabular-nums">
                    {isNumber ? (
                        <>
                            <AnimatedCounter value={numValue} />
                            <span className="text-xl md:text-2xl ml-[2px] text-brand-blue">{suffix}</span>
                        </>
                    ) : (
                        value
                    )}
                </div>

                <div
                    className={clsx(
                        "grid transition-all duration-300 ease-out origin-left",
                        isHovered ? "opacity-100 ml-2 md:ml-3" : "opacity-0 ml-0"
                    )}
                    style={{ gridTemplateColumns: isHovered ? '1fr' : '0fr' }}
                >
                    <div className="overflow-hidden whitespace-nowrap">
                        <span className="text-xs md:text-sm uppercase tracking-widest text-secondary font-mono font-medium block">
                            {label}
                        </span>
                    </div>
                </div>
            </div>

            {!hideDivider && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-white/10 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0 : 1 }} />
            )}
        </div>
    );
};

function earliestYearFromExperiences(experiences: Experience[]): number | null {
    const years = experiences
        .flatMap(e => e.positions)
        .flatMap(p => Array.from(p.period.matchAll(/\b(19|20)\d{2}\b/g)).map(m => parseInt(m[0], 10)))
        .filter(n => !Number.isNaN(n));
    if (years.length === 0) return null;
    return Math.min(...years);
}

function formatYearsExperience(experiences: Experience[]): string {
    const earliest = earliestYearFromExperiences(experiences);
    if (!earliest) return "—";
    const now = new Date().getUTCFullYear();
    const years = Math.max(1, now - earliest);
    return `${years}+`;
}

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
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    const handlePointerEnter = (e: React.PointerEvent, i: number) => {
        if (e.pointerType === "mouse") setHoveredIndex(i);
    };

    const handlePointerLeave = () => {
        // Container-level leave resets to 0
    };

    const handleClick = (i: number) => {
        setHoveredIndex(i);
    };

    const stats = useMemo(() => {
        const positionCount = experiences.reduce((acc, e) => acc + (e.positions?.length ?? 0), 0);
        const credentialCount = certifications.length + education.length;
        return [
            { value: formatYearsExperience(experiences), label: "Years Experience", icon: Briefcase },
            { value: `${projects.length}+`, label: "Major Projects", icon: Code },
            { value: `${positionCount}`, label: "Distinct Roles", icon: Cpu },
            { value: `${credentialCount}+`, label: "Credentials", icon: GraduationCap },
        ];
    }, [experiences, projects, certifications, education]);

    return (
        <section className="container-wide pt-2 pb-12 md:pt-4 md:pb-20 relative flex justify-center w-full">
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[150px] bg-brand-blue/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-0 flex flex-col items-center justify-center gap-6 md:gap-10">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="text-tertiary font-mono text-xs uppercase tracking-[0.3em] text-center"
                >
                    At&nbsp;a&nbsp;glance
                </motion.p>

                <div
                    onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredIndex(0) }}
                    className="flex flex-col md:flex-row w-full max-w-[340px] md:max-w-none md:w-auto p-2 md:p-0 md:h-20 rounded-[2rem] md:rounded-full bg-deep/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden items-center justify-center cursor-default gap-2 md:gap-0"
                >
                    {stats.map((stat, i) => (
                        <IslandSegment
                            key={stat.label}
                            {...stat}
                            isHovered={hoveredIndex === i}
                            onPointerEnter={(e) => handlePointerEnter(e, i)}
                            onPointerLeave={() => handlePointerLeave()}
                            onClick={() => handleClick(i)}
                            hideDivider={i === stats.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
