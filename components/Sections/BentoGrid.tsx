"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface BentoCardProps {
    className?: string;
    title: string;
    content: React.ReactNode;
    delay?: number;
}

const BentoCard = ({ className, title, content, delay = 0 }: BentoCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className={clsx(
            "glass-panel p-8 rounded-2xl flex flex-col justify-between group glass-panel-hover",
            className
        )}
    >
        {content}
        <h3 className="text-muted text-xs uppercase tracking-widest mt-6 group-hover:text-brand-blue transition-colors duration-300">
            {title}
        </h3>
    </motion.div>
);

export default function BentoGrid() {
    return (
        <section className="py-spacing-section container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
                {/* Main Bio - Large */}
                <BentoCard
                    className="md:col-span-2 md:row-span-2"
                    title="About Me"
                    content={
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">
                                Engineering <span className="text-white">Process Excellence</span> at the intersection of <span className="text-gradient-accent">AI & Automation</span>.
                            </h2>
                            <p className="text-muted text-lg leading-relaxed max-w-xl">
                                I transform chaotic operational workflows into streamlined, automated ecosystems. My approach combines Six Sigma rigeur with modern software architecture to deliver scalable efficiency.
                            </p>
                        </div>
                    }
                />

                {/* Stat 1 */}
                <BentoCard
                    className="md:col-span-1 md:row-span-1"
                    delay={0.1}
                    title="Experience"
                    content={
                        <div className="flex items-end gap-2">
                            <span className="text-7xl font-display font-bold text-white">8</span>
                            <span className="text-brand-purple text-4xl mb-2">+</span>
                            <span className="text-muted text-sm mb-4">Years</span>
                        </div>
                    }
                />

                {/* Stat 2 with Graph visual */}
                <BentoCard
                    className="md:col-span-1 md:row-span-1"
                    delay={0.2}
                    title="Effeciency Gain"
                    content={
                        <div className="relative h-full flex items-end">
                            {/* Decorative Bar Graph */}
                            <div className="flex gap-2 items-end h-32 w-full">
                                {[40, 65, 45, 90, 75].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="flex-1 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-sm opacity-50 group-hover:to-brand-blue transition-all duration-500"
                                    />
                                ))}
                            </div>
                            <div className="absolute top-0 right-0 text-5xl font-display font-bold text-white">40%</div>
                        </div>
                    }
                />
            </div>
        </section>
    );
}
