"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

const wordVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            delay: i * 0.04,
            duration: 0.4,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

export default function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
    const words = title.split(" ");

    return (
        <div className={clsx(
            "mb-12 md:mb-16",
            centered ? "text-center mx-auto max-w-3xl" : "text-left",
            className
        )}>
            <h2
                className={clsx(
                    "font-display font-medium text-primary",
                    "text-3xl md:text-5xl tracking-tight leading-tight"
                )}
            >
                {words.map((word, i) => (
                    <motion.span
                        key={`${word}-${i}`}
                        custom={i}
                        variants={wordVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block mr-[0.3em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: words.length * 0.04 + 0.1 }}
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
