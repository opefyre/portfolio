"use client";

import { Project } from "@/lib/db";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";
import { ArrowUpRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { easings, durations } from "@/lib/motion";

interface ProjectCardProps {
    project: Project;
    index: number;
    span: "wide" | "tall" | "square";
    onClick: () => void;
}

function ProjectCard({ project, index, span, onClick }: ProjectCardProps) {
    const cardRef = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);

    // Scroll-tied entrance — opacity-only so cards don't lift and create scroll jumps
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start 95%", "start 75%"] });
    const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

    return (
        <motion.button
            ref={cardRef}
            type="button"
            onClick={onClick}
            data-cursor="view"
            aria-label={`View case study: ${project.title}`}
            style={{ opacity }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={clsx(
                "group relative text-left rounded-3xl overflow-hidden border border-border bg-card hover:border-brand-blue/40 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page",
                span === "wide" && "md:col-span-2 md:row-span-1 min-h-[240px]",
                span === "tall" && "md:col-span-1 md:row-span-2 min-h-[380px] md:min-h-[500px]",
                span === "square" && "md:col-span-1 md:row-span-1 min-h-[240px]",
            )}
        >
            {/* Background — thumbnail or very subtle decorative chart-grid */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                {project.thumbnail ? (
                    <>
                        <Image
                            src={project.thumbnail}
                            alt=""
                            fill
                            className="object-cover opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Strong dark scrim so text stays readable */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-page via-page/95 to-page/85" />
                    </>
                ) : (
                    <div className="absolute inset-0 opacity-100">
                        <svg
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            viewBox="0 0 200 200"
                            className="text-brand-blue/[0.05]"
                        >
                            <defs>
                                <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.4" />
                                </pattern>
                            </defs>
                            <rect width="200" height="200" fill={`url(#grid-${index})`} />
                            {/* Bar shapes — concentrated bottom-right corner so titles stay clear */}
                            <g className="text-brand-blue/[0.06]" fill="currentColor">
                                <rect x="135" y={170 - (index * 7) % 35} width="9" height={10 + (index * 7) % 35} />
                                <rect x="150" y={175 - (index * 11) % 30} width="9" height={5 + (index * 11) % 30} />
                                <rect x="165" y={155 - (index * 13) % 45} width="9" height={25 + (index * 13) % 45} />
                                <rect x="180" y={165 - (index * 9) % 25} width="9" height={15 + (index * 9) % 25} />
                            </g>
                        </svg>
                    </div>
                )}
            </div>

            {/* Mask-reveal scrim — slides up on hover */}
            <motion.div
                aria-hidden="true"
                initial={false}
                animate={{ y: hovered ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: easings.ui }}
                className="absolute inset-0 z-0 bg-gradient-to-t from-brand-blue/[0.06] via-transparent to-transparent pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                {/* Top bar — index + category */}
                <div className="flex items-center justify-between">
                    <span className="label-mono text-brand-blue tabular-nums">
                        CASE.{(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="label-mono text-tertiary truncate ml-2">
                        {project.category}
                    </span>
                </div>

                {/* Title + outcome */}
                <div className="space-y-4 mt-auto">
                    <h3
                        className={clsx(
                            "font-display font-medium text-primary leading-tight tracking-tight transition-colors",
                            span === "tall" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
                            hovered && "text-brand-blue",
                        )}
                    >
                        {project.title}
                    </h3>

                    {project.outcomeShort && (
                        <p className="flex items-start gap-2 text-secondary text-sm md:text-base leading-relaxed">
                            <Sparkles className="w-3.5 h-3.5 text-brand-blue mt-1 shrink-0" aria-hidden="true" />
                            <span>{project.outcomeShort}</span>
                        </p>
                    )}

                    {/* Tech chips — limited to keep scan-speed */}
                    {project.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.skills.slice(0, span === "wide" ? 5 : 3).map((skill) => (
                                <span key={skill} className="label-mono text-tertiary border border-border/60 rounded-full px-2.5 py-0.5">
                                    {skill}
                                </span>
                            ))}
                            {project.skills.length > (span === "wide" ? 5 : 3) && (
                                <span className="label-mono text-brand-blue border border-brand-blue/30 rounded-full px-2.5 py-0.5">
                                    +{project.skills.length - (span === "wide" ? 5 : 3)}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Bottom action row */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <span className="label-mono text-secondary group-hover:text-brand-blue transition-colors">
                            View case study
                        </span>
                        <span
                            aria-hidden="true"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-deep transition-colors"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Corner brackets — appear on hover */}
            <AnimatePresence>
                {hovered && (
                    <>
                        <motion.span
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: durations.fast }}
                            className="absolute top-3 left-3 w-3 h-3 border-l border-t border-brand-blue/60"
                        />
                        <motion.span
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: durations.fast }}
                            className="absolute top-3 right-3 w-3 h-3 border-r border-t border-brand-blue/60"
                        />
                        <motion.span
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: durations.fast }}
                            className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-brand-blue/60"
                        />
                        <motion.span
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: durations.fast }}
                            className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-brand-blue/60"
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

const FEATURED_COUNT = 6;

export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const lastInvokerRef = useRef<HTMLElement | null>(null);

    const openModal = (project: Project) => {
        lastInvokerRef.current = (document.activeElement as HTMLElement) ?? null;
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        window.setTimeout(() => lastInvokerRef.current?.focus(), 50);
    };

    // Asymmetric bento for the featured strip — cycle through wide/tall/square
    const getSpan = (i: number): ProjectCardProps["span"] => {
        const pattern: ProjectCardProps["span"][] = ["wide", "tall", "square", "square", "wide", "square"];
        return pattern[i % pattern.length];
    };

    const featured = projects.slice(0, FEATURED_COUNT);
    const additional = projects.slice(FEATURED_COUNT);

    return (
        <section className="relative py-24 md:py-32 overflow-hidden" id="projects">
            <div className="container relative z-10">
                <SectionHeader
                    kicker="CASE STUDIES"
                    title="Selected work"
                    subtitle={`A curated index of ${projects.length} programs delivering measurable transformation outcomes.`}
                    centered
                    className="mb-16"
                />

                {/* Featured bento — first N projects, asymmetric layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(220px,_auto)] gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
                    {featured.map((project, idx) => (
                        <ProjectCard
                            key={project.id || idx}
                            project={project}
                            index={idx}
                            span={getSpan(idx)}
                            onClick={() => openModal(project)}
                        />
                    ))}
                </div>

                {/* Reveal-the-archive — compact list of remaining projects */}
                {additional.length > 0 && (
                    <div className="mt-14 max-w-7xl mx-auto px-4 md:px-0">
                        <div className="flex items-center justify-between mb-6">
                            <span className="label-mono bracket text-brand-blue">ARCHIVE · {String(additional.length).padStart(2, "0")} MORE</span>
                            <button
                                type="button"
                                onClick={() => setShowAll((s) => !s)}
                                data-cursor={showAll ? "collapse" : "expand"}
                                className="label-mono text-tertiary hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md px-2 py-1"
                                aria-expanded={showAll}
                            >
                                {showAll ? "Collapse archive ↑" : "Expand archive ↓"}
                            </button>
                        </div>

                        {showAll && (
                            <ul className="divide-y divide-border/40 border-t border-b border-border/40">
                                {additional.map((project, idx) => (
                                    <li key={project.id || idx}>
                                        <button
                                            type="button"
                                            onClick={() => openModal(project)}
                                            data-cursor="view"
                                            className="group w-full text-left flex items-center gap-5 py-4 hover:bg-white/[0.02] px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm transition-colors"
                                        >
                                            <span className="label-mono text-tertiary w-12 tabular-nums">
                                                {String(FEATURED_COUNT + idx + 1).padStart(2, "0")}
                                            </span>
                                            <span className="label-mono text-brand-blue w-44 shrink-0 truncate">
                                                {project.category}
                                            </span>
                                            <span className="text-secondary text-base md:text-lg flex-1 truncate group-hover:text-primary transition-colors">
                                                {project.title}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-tertiary group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
