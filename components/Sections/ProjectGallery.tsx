"use client";

import { Project } from "@/lib/db";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";
import { ArrowUpRight, Sparkles, LayoutGrid } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { easings, durations } from "@/lib/motion";

// --- Desktop Project Card — outcome visible by default, soft 3D on hover ---
const DesktopProjectCard = ({
    project,
    index,
    isHovered,
    isAnyHovered,
    onHoverStart,
    onHoverEnd,
    onClick,
}: {
    project: Project;
    index: number;
    isHovered: boolean;
    isAnyHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    onClick: () => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 100%", "start 80%"]
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

    const isDimmed = isAnyHovered && !isHovered;

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, y, perspective: "2000px" }}
            className={clsx(
                "relative w-full max-w-5xl mx-auto mb-12 lg:mb-16 transition-opacity duration-500",
                isDimmed ? "opacity-40" : "opacity-100"
            )}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <motion.button
                type="button"
                onClick={onClick}
                aria-label={`View case study: ${project.title}`}
                animate={{
                    scale: isHovered ? 1.02 : 1,
                    rotateY: isHovered ? -4 : 0,
                    rotateX: isHovered ? 2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28, mass: 1 }}
                className="block text-left w-full rounded-2xl md:rounded-[2rem] bg-card border border-border hover:border-brand-blue/40 overflow-hidden shadow-2xl cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[280px]">
                    {/* Left: text — always visible */}
                    <div className={clsx(
                        "p-8 md:p-12 flex flex-col justify-between relative bg-gradient-to-br from-card to-card-hover",
                        project.thumbnail ? "md:col-span-7" : "md:col-span-12"
                    )}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-full border border-brand-blue/30 flex items-center justify-center text-brand-blue font-mono text-sm bg-brand-blue/5 tabular-nums">
                                {(index + 1).toString().padStart(2, '0')}
                            </div>
                            <span className="text-secondary tracking-widest uppercase text-xs font-mono">
                                {project.category}
                            </span>
                        </div>

                        <div className="space-y-5">
                            <h3 className="text-3xl md:text-4xl font-display font-medium leading-tight text-primary">
                                {project.title}
                            </h3>

                            {/* Outcome — the recruiter-scan line */}
                            {project.outcomeShort && (
                                <p className="flex items-start gap-2 text-secondary text-sm md:text-base leading-relaxed max-w-prose">
                                    <Sparkles className="w-4 h-4 text-brand-blue mt-1 shrink-0" aria-hidden="true" />
                                    <span>{project.outcomeShort}</span>
                                </p>
                            )}

                            <p className="text-tertiary text-sm leading-relaxed line-clamp-2 max-w-prose">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/60">
                            <div className="flex flex-wrap gap-1.5">
                                {project.skills.slice(0, 4).map((skill) => (
                                    <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-tertiary font-mono">
                                        {skill}
                                    </span>
                                ))}
                                {project.skills.length > 4 && (
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-brand-blue font-mono">
                                        +{project.skills.length - 4}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-brand-blue text-sm font-medium tracking-wide group-hover:gap-3 transition-all">
                                <span>View case study</span>
                                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                            </div>
                        </div>
                    </div>

                    {/* Right: thumbnail when present */}
                    {project.thumbnail && (
                        <div className="hidden md:block md:col-span-5 relative border-l border-border/40 overflow-hidden">
                            <Image
                                src={project.thumbnail}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/40 pointer-events-none" />
                        </div>
                    )}
                </div>
            </motion.button>
        </motion.div>
    );
};

// --- Mobile Project Card — flatter, always-on outcome line ---
const MobileProjectCard = ({
    project,
    index,
    onClick
}: {
    project: Project;
    index: number;
    onClick: () => void;
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`View case study: ${project.title}`}
            className="block text-left w-full rounded-3xl bg-card border border-border shadow-xl overflow-hidden mb-6 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
            <div className="p-6 bg-gradient-to-br from-card to-card-hover">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full border border-brand-blue/30 flex items-center justify-center text-brand-blue font-mono text-xs bg-brand-blue/5 tabular-nums">
                        {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <span className="text-secondary tracking-widest uppercase text-xs font-mono">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-2xl font-display font-medium leading-tight mb-3 text-white">
                    {project.title}
                </h3>

                {project.outcomeShort && (
                    <p className="flex items-start gap-2 text-secondary text-sm leading-relaxed mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-brand-blue mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{project.outcomeShort}</span>
                    </p>
                )}
            </div>

            <div className="bg-deep/80 border-t border-border/50 p-6 space-y-5">
                <div>
                    <h4 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <LayoutGrid className="w-3 h-3" aria-hidden="true" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {project.skills.slice(0, 4).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-secondary font-mono">
                                {skill}
                            </span>
                        ))}
                        {project.skills.length > 4 && (
                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-brand-blue font-mono">
                                +{project.skills.length - 4}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between text-brand-blue pt-4 border-t border-border/30">
                    <span className="text-xs font-medium tracking-wide">Tap to read case study</span>
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </button>
    );
};

export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredProjectIdx, setHoveredProjectIdx] = useState<number | null>(null);
    const lastInvokerRef = useRef<HTMLElement | null>(null);

    const openModal = (project: Project) => {
        lastInvokerRef.current = (document.activeElement as HTMLElement) ?? null;
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Return focus to the invoking element after the modal exit animation settles
        window.setTimeout(() => {
            lastInvokerRef.current?.focus();
        }, 50);
    };

    const isAnyHovered = hoveredProjectIdx !== null;

    return (
        <section className="relative py-24 md:py-32 overflow-hidden" id="projects">
            {/* Subtle ambient backdrop — single static layer, no perpetual orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-canvas" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-brand-purple/10 blur-[100px] rounded-full" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    animate={{ opacity: isAnyHovered ? 0.55 : 1 }}
                    transition={{ duration: durations.slow, ease: easings.ui }}
                >
                    <SectionHeader
                        title="Selected Work"
                        subtitle="A curated selection of impactful projects driving digital transformation."
                        centered
                        className="mb-20"
                    />
                </motion.div>

                <div className="flex flex-col gap-8 lg:gap-16 w-full max-w-7xl mx-auto px-4 md:px-0">
                    {projects.map((project, idx) => (
                        <div key={project.id || idx}>
                            <div className="hidden md:block">
                                <DesktopProjectCard
                                    project={project}
                                    index={idx}
                                    isHovered={hoveredProjectIdx === idx}
                                    isAnyHovered={isAnyHovered}
                                    onHoverStart={() => setHoveredProjectIdx(idx)}
                                    onHoverEnd={() => setHoveredProjectIdx(null)}
                                    onClick={() => openModal(project)}
                                />
                            </div>
                            <div className="block md:hidden">
                                <MobileProjectCard
                                    project={project}
                                    index={idx}
                                    onClick={() => openModal(project)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
