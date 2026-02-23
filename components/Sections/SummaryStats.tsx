"use client";

import { motion, useInView, useSpring, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";
import { Cpu, Briefcase, GraduationCap, Code } from "lucide-react";

// --- Animated Number Counter ---
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

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

// --- Spotlight Bento Card ---
interface BentoCardProps {
    value: string;
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    delay?: number;
    className?: string; // For CSS Grid spanning (e.g. col-span-2)
}

const BentoCard = ({ value, label, subLabel, icon: Icon, delay = 0, className = "" }: BentoCardProps) => {
    // Spotlight Hover Effect Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Extract number for AnimatedCounter
    const strValue = String(value);
    const numValue = parseInt(strValue.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && strValue.match(/\d+/);
    const suffix = strValue.replace(/[\d\.]/g, '') || '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-white/5 p-8 transition-all hover:border-white/10 ${className}`}
        >
            {/* The Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(56, 189, 248, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Top Row: Icon & Status Label */}
            <div className="flex items-start justify-between relative z-10 w-full mb-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                    <Icon className="h-5 w-5" />
                </div>

                {/* Tech Status Pill */}
                <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-tertiary font-mono font-medium">
                        {subLabel}
                    </span>
                </div>
            </div>

            {/* Bottom Row: Data */}
            <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
                    {label}
                </h3>
                <div className="flex items-baseline text-5xl md:text-6xl font-display font-medium text-white tracking-tight">
                    {isNumber ? (
                        <>
                            <AnimatedCounter value={numValue} />
                            <span className="text-4xl ml-1 text-brand-blue">{suffix}</span>
                        </>
                    ) : (
                        value
                    )}
                </div>
            </div>
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

    return (
        <section className="container-wide py-16 md:py-32 relative overflow-hidden">
            {/* Ambient Background Blur for Contrast */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[400px] bg-brand-blue/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* 
                  The Bento Grid 
                  - Mobile: 1 column
                  - Tablet: 2 columns
                  - Desktop: 4 columns
                  Certain cards span 2 columns on larger screens to create the "Bento" aesthetic.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                    {/* Primary Large Card - Spans 2 columns on Tablet+ */}
                    <BentoCard
                        value={`${yearsExperience}+`}
                        label="Industry Experience"
                        subLabel="SYS.ACTIVE"
                        icon={Briefcase}
                        delay={0.1}
                        className="md:col-span-2"
                    />

                    {/* Standard Square Card */}
                    <BentoCard
                        value={`${projects.length}+`}
                        label="Major Projects"
                        subLabel="BUILD.DEPLOYED"
                        icon={Code}
                        delay={0.2}
                    />

                    {/* Standard Square Card */}
                    <BentoCard
                        value={`${totalRoles}`}
                        label="Distinct Roles"
                        subLabel="CAREER.TRACK"
                        icon={Cpu}
                        delay={0.3}
                    />

                    {/* Wide Footer Card - Spans full width on tablet, 2 cols on desktop */}
                    <BentoCard
                        value={`${credentialsDisplay}`}
                        label="Verified Credentials (Education & Certs)"
                        subLabel="AUTH.VERIFIED"
                        icon={GraduationCap}
                        delay={0.4}
                        className="md:col-span-2 lg:col-span-2"
                    />

                </div>
            </div>
        </section>
    );
}
