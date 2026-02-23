"use client";

import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    // Use a spring for smoother motion than linear tween
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 50,
        damping: 15, // Critical damping-ish
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

// --- Creative 3D Zero-Gravity Orb ---
const ZeroGravityOrb = ({
    value,
    label,
    sizeClass,
    floatDelay,
    floatDuration
}: {
    value: string;
    label: string;
    sizeClass: string;
    floatDelay: number;
    floatDuration: number;
}) => {
    // 3D physics state
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Extract number for AnimatedCounter
    const numValue = parseInt(value.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && value.match(/\d+/);
    const suffix = value.replace(/[\d\.]/g, '');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: floatDelay }}
            className={`relative flex items-center justify-center pointer-events-auto ${sizeClass}`}
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    y: [0, -15, 0], // The Zero-Gravity drift
                }}
                transition={{
                    y: {
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: floatDelay
                    }
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full rounded-full bg-deep/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col items-center justify-center p-6 text-center group transition-colors duration-500 hover:border-brand-blue/40"
            >
                {/* Internal Glow */}
                <div className="absolute inset-0 rounded-full bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

                <div
                    className="relative z-10 flex flex-col items-center gap-2"
                    style={{ transform: "translateZ(30px)" }} // Pop text out in 3D
                >
                    <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white group-hover:text-brand-blue transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                        {isNumber ? (
                            <>
                                <AnimatedCounter value={numValue} />
                                <span>{suffix}</span>
                            </>
                        ) : (
                            value
                        )}
                    </div>
                    <div className="text-secondary text-[10px] md:text-xs uppercase tracking-widest font-mono font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                        {label}
                    </div>
                </div>
            </motion.div>
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
    // Calculate Years Experience based on earliest role start date
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

    // Calculate total distinct roles representing progression
    const totalRoles = experiences.reduce((acc, exp) => acc + exp.positions.length, 0);

    // Calculate Verified Credentials (Education + Certifications) and format to 10+
    const totalCredentials = education.length + certifications.length;
    const credentialsDisplay = totalCredentials >= 10 ? '10+' : totalCredentials.toString();

    return (
        <section className="container-wide py-20 md:py-32 relative overflow-hidden hidden sm:block">
            {/* Ambient Background Blur for Contrast */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[400px] bg-brand-blue/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative max-w-5xl mx-auto min-h-[500px] flex items-center justify-center pointer-events-none">
                {/* 
                  The Constellation Layout 
                  Using absolute positioning to create an organic, floating arrangement
                  rather than a boring CSS grid.
                */}

                {/* Center / Largest Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <ZeroGravityOrb
                        value={`${yearsExperience}+`}
                        label="Years Experience"
                        sizeClass="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
                        floatDelay={0}
                        floatDuration={6}
                    />
                </div>

                {/* Top Right Orb */}
                <div className="absolute top-[10%] right-[10%] md:right-[15%] lg:right-[20%] z-10">
                    <ZeroGravityOrb
                        value={`${projects.length}+`}
                        label="Major Projects"
                        sizeClass="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
                        floatDelay={1.2}
                        floatDuration={7.5}
                    />
                </div>

                {/* Bottom Left Orb */}
                <div className="absolute bottom-[5%] left-[5%] md:left-[15%] lg:left-[20%] z-10">
                    <ZeroGravityOrb
                        value={`${totalRoles}`}
                        label="Distinct Roles"
                        sizeClass="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52"
                        floatDelay={0.8}
                        floatDuration={5.5}
                    />
                </div>

                {/* Bottom Right Orb */}
                <div className="absolute bottom-[10%] right-[5%] md:right-[10%] lg:right-[15%] z-30">
                    <ZeroGravityOrb
                        value={`${credentialsDisplay}`}
                        label="Verified Credentials"
                        sizeClass="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60"
                        floatDelay={2.1}
                        floatDuration={6.5}
                    />
                </div>

                {/* Optional Small Decorative UI Orb */}
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[15%] w-12 h-12 rounded-full border border-white/10 bg-deep/40 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.1)] z-0"
                />
            </div>

            {/* Mobile Fallback - Linear Grid (Visible only on very small screens) */}
            <div className="sm:hidden grid grid-cols-2 gap-4 mt-8 px-4">
                <ZeroGravityOrb value={`${yearsExperience}+`} label="Experience" sizeClass="w-full aspect-square" floatDelay={0} floatDuration={4} />
                <ZeroGravityOrb value={`${projects.length}+`} label="Projects" sizeClass="w-full aspect-square" floatDelay={0.5} floatDuration={4.2} />
                <ZeroGravityOrb value={`${totalRoles}`} label="Roles" sizeClass="w-full aspect-square" floatDelay={1} floatDuration={4.5} />
                <ZeroGravityOrb value={`${credentialsDisplay}`} label="Credentials" sizeClass="w-full aspect-square" floatDelay={1.5} floatDuration={4.1} />
            </div>
        </section>
    );
}
