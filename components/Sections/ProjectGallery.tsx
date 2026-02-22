"use client";

import { Project } from "@/lib/db";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";
import { ArrowUpRight, Plus, Box, LayoutGrid } from "lucide-react";
import clsx from "clsx";

// --- Ambient Particles Component ---
const generateParticles = () =>
    Array.from({ length: 15 }).map(() => ({
        size: Math.random() * 6 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        yEnd: Math.random() * -100 - 50,
        xEnd: (Math.random() - 0.5) * 50,
        opacityMid: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
    }));

const AmbientParticles = () => {
    // Lazy state initialization runs generateParticles EXACTLY once on mount
    const [particles] = useState(generateParticles);

    // Prevent Hydration error by tracking mount state
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
    }, []);

    if (!isMounted || particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-40">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-brand-blue rounded-full blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                    }}
                    animate={{
                        y: [0, p.yEnd],
                        x: [0, p.xEnd],
                        opacity: [0, p.opacityMid, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};


// --- The 3D Cinematic Project Card ---
const Project3DCard = ({
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

    // Scroll-based entrance purely for sliding into the page
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 100%", "start 80%"]
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    // Handle global dimming when something else is hovered
    const isDimmed = isAnyHovered && !isHovered;

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, y, perspective: "2000px" }}
            className={clsx(
                "relative w-full max-w-4xl mx-auto mb-12 lg:mb-20 transition-opacity duration-700",
                isDimmed ? "opacity-30 grayscale-[50%]" : "opacity-100"
            )}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <motion.div
                animate={{
                    // Cinematic 3D hover physics
                    scale: isHovered ? 1.05 : 0.9,
                    rotateY: isHovered ? -12 : 0,
                    rotateX: isHovered ? 5 : 0,
                    z: isHovered ? 50 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 1.2
                }}
                className="relative w-full rounded-2xl md:rounded-[2rem] bg-card border border-border overflow-hidden shadow-2xl cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
                onClick={onClick}
            >
                {/* 3D Depth Shadow (simulates physical light blocking behind card) */}
                <motion.div
                    animate={{ opacity: isHovered ? 0.3 : 0, x: isHovered ? 20 : 0, y: isHovered ? 20 : 0 }}
                    className="absolute inset-0 bg-black blur-2xl -z-10 rounded-[2rem] pointer-events-none"
                    style={{ transform: "translateZ(-50px)" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px] md:min-h-[400px]">

                    {/* Left Panel: Primary Overview (Always Visible) */}
                    <div className="md:col-span-12 p-8 md:p-12 flex flex-col justify-between relative z-10 transition-all duration-500 bg-gradient-to-br from-card to-card-hover"
                        style={{ gridColumn: isHovered ? "span 7" : "span 12" }}
                    >
                        {/* Number & Category */}
                        <div className="flex items-center gap-4 mb-12">
                            <motion.div
                                animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-10 h-10 rounded-full border border-brand-blue/30 flex items-center justify-center text-brand-blue font-mono text-sm bg-brand-blue/5"
                            >
                                {(index + 1).toString().padStart(2, '0')}
                            </motion.div>
                            <span className="text-secondary tracking-widest uppercase text-xs font-mono">
                                {project.category}
                            </span>
                        </div>

                        <div className="max-w-xl">
                            <motion.h3
                                animate={{
                                    scale: isHovered ? 1.05 : 1,
                                    transformOrigin: "left bottom",
                                    color: isHovered ? "#fff" : "#e2e8f0"
                                }}
                                className="text-3xl md:text-5xl font-display font-medium leading-tight mb-4"
                            >
                                {project.title}
                            </motion.h3>

                            {/* Detailed description only fully visible on hover */}
                            <motion.div
                                animate={{
                                    height: isHovered ? "auto" : 0,
                                    opacity: isHovered ? 1 : 0,
                                    marginTop: isHovered ? 24 : 0
                                }}
                                className="overflow-hidden text-secondary text-lg leading-relaxed"
                            >
                                {project.description}
                            </motion.div>
                        </div>

                        {/* Expand prompt (visible when NOT hovered) */}
                        <motion.div
                            animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
                            className="absolute bottom-8 right-12 flex items-center gap-2 text-tertiary"
                        >
                            <span className="text-sm font-mono tracking-widest uppercase">Explore</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                    </div>

                    {/* Right Panel: The Unhinge Reveal (Only Visible on Hover) */}
                    <motion.div
                        className="hidden md:flex flex-col bg-deep/80 backdrop-blur-xl border-l border-border/50 p-10 overflow-hidden relative"
                        initial={{ opacity: 0, x: 50, rotateY: 90 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : 50,
                            rotateY: isHovered ? 0 : 90,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                        style={{
                            transformOrigin: "left",
                            gridColumn: isHovered ? "span 5 / span 5" : "span 0",
                            display: isHovered ? "flex" : "none"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />

                        <div className="flex-1 space-y-8 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h4 className="text-brand-purple text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Box className="w-4 h-4" /> Challenge
                                </h4>
                                <p className="text-secondary text-sm leading-relaxed line-clamp-3">
                                    {project.problem}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h4 className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4" /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.slice(0, 5).map((skill, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-xs text-secondary font-mono">
                                            {skill}
                                        </span>
                                    ))}
                                    {project.skills.length > 5 && (
                                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-xs text-brand-blue font-mono">
                                            +{project.skills.length - 5}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Action Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                            transition={{ delay: 0.4 }}
                            className="pt-6 border-t border-border mt-auto flex items-center justify-between"
                        >
                            <span className="text-sm text-white font-medium">View Case Study</span>
                            <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- The Main Section Container ---
export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Track globally which project is hovered for the background shift
    const [hoveredProjectIdx, setHoveredProjectIdx] = useState<number | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const isAnyHovered = hoveredProjectIdx !== null;

    return (
        <section className="relative min-h-screen py-32 overflow-hidden" id="projects">

            {/* 🌌 Cinematic Immersive Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-canvas">
                {/* 
                  Base ambient grid. Will be tinted by the active project color. 
                  Currently using static brand-blue/purple since we don't have project-specific color data yet.
                */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <AnimatePresence>
                    {isAnyHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* Huge blurry shifting gradient orb */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.6, 0.8, 0.6],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-brand-blue/30 blur-[120px] rounded-full mix-blend-screen"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.4, 0.6, 0.4],
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-brand-purple/20 blur-[100px] rounded-full mix-blend-screen"
                            />

                            {/* Vignette mask to keep edges dark and text readable */}
                            <div className="absolute inset-0 bg-radial-gradient from-transparent via-canvas/80 to-canvas" />

                            <AmbientParticles />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Foreground Content */}
            <div className="container relative z-10">
                <motion.div
                    animate={{ opacity: isAnyHovered ? 0.3 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <SectionHeader
                        title="Selected Work"
                        subtitle="A curated selection of impactful projects driving digital transformation."
                        centered
                        className="mb-24"
                    />
                </motion.div>

                <div className="flex flex-col gap-12 lg:gap-32 w-full max-w-7xl mx-auto">
                    {projects.map((project, idx) => (
                        <Project3DCard
                            key={project.id || idx}
                            project={project}
                            index={idx}
                            isHovered={hoveredProjectIdx === idx}
                            isAnyHovered={isAnyHovered}
                            onHoverStart={() => setHoveredProjectIdx(idx)}
                            onHoverEnd={() => setHoveredProjectIdx(null)}
                            onClick={() => openModal(project)}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
