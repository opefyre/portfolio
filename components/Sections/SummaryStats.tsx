"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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

interface StatCardProps {
    label: string;
    value: string;
    subtext?: string;
    delay?: number;
}

const StatCard = ({ label, value, subtext, delay = 0 }: StatCardProps) => {
    // Extract number from string if possible, or just render static if complex
    const numValue = parseInt(value.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && value.match(/\d+/);
    const suffix = value.replace(/[\d\.]/g, ''); // Extract non-digits like + or %

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            className="bg-card border border-border p-6 rounded-xl flex flex-col justify-center items-start hover:border-brand-blue/30 hover:bg-card-hover transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-sm"
        >
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 flex items-baseline">
                {isNumber ? (
                    <>
                        <AnimatedCounter value={numValue} />
                        <span>{suffix}</span>
                    </>
                ) : (
                    value
                )}
            </div>
            <div className="text-brand-blue text-sm uppercase tracking-wider font-semibold mb-1">{label}</div>
            {subtext && <div className="text-secondary text-xs">{subtext}</div>}
        </motion.div>
    );
};

import { Experience, Project, Certification } from "@/lib/db";

export default function SummaryStats({
    experiences,
    projects,
    certifications
}: {
    experiences: Experience[],
    projects: Project[],
    certifications: Certification[]
}) {
    // Calculate Years Experience based on earliest role start date
    let earliestYear = new Date().getFullYear();
    experiences.forEach(exp => {
        exp.positions.forEach(pos => {
            // Match the first 4-digit number (the start year) from strings like "Jan 2014 - Present"
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

    return (
        <section className="container-wide py-12 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    value={`${yearsExperience}+`}
                    label="Years Experience"
                    subtext="Process Excellence & Innovation"
                    delay={0.1}
                />
                <StatCard
                    value={`${projects.length}+`}
                    label="Major Projects"
                    subtext="Digital Transformation Delivery"
                    delay={0.2}
                />
                <StatCard
                    value={`${totalRoles}`}
                    label="Distinct Roles"
                    subtext="Career Progression & Leadership"
                    delay={0.3}
                />
                <StatCard
                    value={`${certifications.length}`}
                    label="Verified Credentials"
                    subtext="Industry Standard Authorizations"
                    delay={0.4}
                />
            </div>
        </section>
    );
}
