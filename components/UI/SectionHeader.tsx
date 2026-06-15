"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { easings } from "@/lib/motion";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    kicker?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    kicker,
    centered = false,
    className,
}: SectionHeaderProps) {
    const words = title.split(" ");

    return (
        <div
            className={clsx(
                "mb-12 md:mb-16",
                centered ? "text-center mx-auto max-w-3xl" : "text-left",
                className,
            )}
        >
            {/* Mono kicker with bracket frame */}
            {kicker && (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: easings.ui }}
                    className={clsx(
                        "flex items-center gap-3 mb-5",
                        centered ? "justify-center" : "justify-start",
                    )}
                >
                    <span className="label-mono bracket text-brand-blue">{kicker}</span>
                    {!centered && (
                        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                    )}
                </motion.div>
            )}

            <h2
                className={clsx(
                    "font-display font-medium text-primary",
                    "text-4xl md:text-6xl tracking-[-0.02em] leading-[0.95]",
                )}
            >
                {words.map((word, i) => (
                    <motion.span
                        key={`${word}-${i}`}
                        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{
                            delay: i * 0.06,
                            duration: 0.5,
                            ease: easings.ui,
                        }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: words.length * 0.06 + 0.1, ease: easings.ui }}
                    className={clsx(
                        "mt-5 text-secondary text-base md:text-lg leading-relaxed",
                        centered ? "mx-auto max-w-2xl" : "max-w-2xl",
                    )}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
