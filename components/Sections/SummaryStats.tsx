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

const StatCard = ({ label, value, subtext, delay = 0 }: any) => {
    // Extract number from string if possible, or just render static if complex
    const numValue = parseInt(value.replace(/\D/g, ''));
    const isNumber = !isNaN(numValue) && value.match(/\d+/);
    const suffix = value.replace(/[\d\.]/g, ''); // Extract non-digits like + or %

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            className="bg-card border border-border p-6 rounded-xl flex flex-col justify-center items-start hover:border-brand-blue/30 hover:bg-card-hover transition-colors shadow-sm dark:shadow-none backdrop-blur-sm"
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

export default function SummaryStats() {
    return (
        <section className="container-wide py-12 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    value="8+"
                    label="Years Experience"
                    subtext="Process Excellence & Innovation"
                    delay={0.1}
                />
                <StatCard
                    value="50+"
                    label="Projects Delivered"
                    subtext="Optimizing Enterprise Workflows"
                    delay={0.2}
                />
                <StatCard
                    value="12%"
                    label="Cost Reduction"
                    subtext="Avg savings in Supply Chain"
                    delay={0.3}
                />
                <StatCard
                    value="60%"
                    label="Report Time Cut"
                    subtext="Via Automated Dashboards"
                    delay={0.4}
                />
            </div>
        </section>
    );
}
