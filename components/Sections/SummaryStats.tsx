"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Experience, Project, Certification, Education } from "@/lib/db";
import { Cpu, Briefcase, GraduationCap, Code } from "lucide-react";
import { easings } from "@/lib/motion";

const AnimatedCounter = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const springValue = useSpring(0, { stiffness: 60, damping: 18 });
    const displayValue = useTransform(springValue, (current) => Math.floor(current));

    useEffect(() => {
        if (inView) springValue.set(value);
    }, [inView, value, springValue]);

    return (
        <motion.span ref={ref} className="tabular-nums">
            {displayValue}
        </motion.span>
    );
};

interface Stat {
    value: string;
    label: string;
    code: string;
    icon: React.ComponentType<{ className?: string }>;
}

function earliestYearFromExperiences(experiences: Experience[]): number | null {
    const years = experiences
        .flatMap(e => e.positions ?? [])
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

function Instrument({ stat, index }: { stat: Stat; index: number }) {
    const Icon = stat.icon;
    const num = parseInt(stat.value.replace(/\D/g, ""), 10);
    const isNumber = !Number.isNaN(num);
    const suffix = stat.value.replace(/[\d.]/g, "");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: easings.ui }}
            className="group relative flex flex-col gap-4 p-6 md:p-7 border border-border bg-card/30 hover:bg-card/60 hover:border-brand-blue/30 transition-colors rounded-2xl backdrop-blur-md"
        >
            {/* Top bar — code + status dot */}
            <div className="flex items-center justify-between">
                <span className="label-mono text-tertiary">{stat.code}</span>
                <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-shadow"
                />
            </div>

            {/* Number */}
            <div className="flex items-baseline gap-1">
                <span className="font-editorial italic text-primary text-5xl md:text-6xl leading-[0.9] tabular-nums">
                    {isNumber ? <AnimatedCounter value={num} /> : stat.value}
                </span>
                {isNumber && suffix && (
                    <span className="font-editorial italic text-brand-blue text-3xl md:text-4xl">{suffix}</span>
                )}
            </div>

            {/* Footer — icon + label */}
            <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                <Icon className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" />
                <span className="label-mono text-secondary">{stat.label}</span>
            </div>
        </motion.div>
    );
}

export default function SummaryStats({
    experiences,
    projects,
    certifications,
    education,
}: {
    experiences: Experience[];
    projects: Project[];
    certifications: Certification[];
    education: Education[];
}) {
    // System time refreshes every 30s; computed via useSyncExternalStore so the lint rule is satisfied
    // and the value is correctly empty on SSR (avoids a hydration mismatch).
    const systemTime = useSyncExternalStore(
        (notify) => {
            const id = window.setInterval(notify, 30_000);
            return () => window.clearInterval(id);
        },
        () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " · UTC",
        () => "",
    );

    const stats = useMemo<Stat[]>(() => {
        const positionCount = experiences.reduce((acc, e) => acc + (e.positions?.length ?? 0), 0);
        const credentialCount = certifications.length + education.length;
        return [
            { value: formatYearsExperience(experiences), label: "Years in transformation", code: "SYS.YRS", icon: Briefcase },
            { value: `${projects.length}+`, label: "Major programs shipped", code: "SYS.PRG", icon: Code },
            { value: `${positionCount}`, label: "Distinct roles", code: "SYS.RLE", icon: Cpu },
            { value: `${credentialCount}+`, label: "Credentials", code: "SYS.CRT", icon: GraduationCap },
        ];
    }, [experiences, projects, certifications, education]);

    return (
        <section className="container-wide py-10 md:py-16 relative w-full" id="summary">
            {/* Cockpit status bar */}
            <div className="mb-8 md:mb-10 flex flex-wrap items-center justify-between gap-3 border-t border-b border-border py-3">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="label-mono bracket text-brand-blue">DASHBOARD</span>
                    <span className="label-mono text-tertiary">CREDENTIAL READOUT · LIVE</span>
                </div>
                <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                    <span className="label-mono text-tertiary tabular-nums">{systemTime || "—— · ——"}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((stat, i) => (
                    <Instrument key={stat.code} stat={stat} index={i} />
                ))}
            </div>
        </section>
    );
}
