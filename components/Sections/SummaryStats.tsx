"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const StatCard = ({ label, value, subtext, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col justify-center items-start hover:border-brand-blue/30 transition-colors"
    >
        <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{value}</div>
        <div className="text-brand-blue text-sm uppercase tracking-wider font-semibold mb-1">{label}</div>
        {subtext && <div className="text-muted text-xs">{subtext}</div>}
    </motion.div>
);

export default function SummaryStats() {
    return (
        <section className="container-wide py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
