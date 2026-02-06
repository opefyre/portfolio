"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string; // Allow overrides
}

export default function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
    return (
        <div className={clsx(
            "mb-12 md:mb-16",
            centered ? "text-center mx-auto max-w-3xl" : "text-left",
            className
        )}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={clsx(
                    "font-display font-medium text-primary",
                    // Use a unified size scale. Currently seeing consistency issues.
                    // Let's standardise to text-4xl on desktop, 3xl on mobile.
                    "text-3xl md:text-5xl tracking-tight leading-tight"
                )}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={clsx(
                        "mt-4 text-secondary text-base md:text-lg leading-relaxed",
                        centered ? "mx-auto" : "max-w-2xl"
                    )}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
