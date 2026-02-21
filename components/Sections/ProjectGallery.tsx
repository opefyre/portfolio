"use client";

import { Project } from "@/lib/db";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useVelocity, useTransform, MotionValue } from "framer-motion";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

// --- Liquid Cursor Hover Preview ---
const CursorPreviewOverlay = ({ activeProject, mousePosition }: { activeProject: Project | null; mousePosition: { x: MotionValue<number>; y: MotionValue<number> } }) => {
    // Smooth out mouse position
    const smoothX = useSpring(mousePosition.x, { damping: 20, stiffness: 200, mass: 0.5 });
    const smoothY = useSpring(mousePosition.y, { damping: 20, stiffness: 200, mass: 0.5 });

    // Calculate velocity for liquid stretch
    const xVelocity = useVelocity(smoothX);
    const yVelocity = useVelocity(smoothY);

    // Map velocity to distortion (skew and scale)
    const skewX = useTransform(xVelocity, [-1000, 1000], [10, -10]);
    const skewY = useTransform(yVelocity, [-1000, 1000], [-10, 10]);
    const stretchX = useTransform(xVelocity, [-2000, 0, 2000], [1.1, 1, 1.1]);
    const stretchY = useTransform(yVelocity, [-2000, 0, 2000], [1.1, 1, 1.1]);

    return (
        <AnimatePresence>
            {activeProject && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        x: smoothX,
                        y: smoothY,
                        skewX,
                        skewY,
                        scaleX: stretchX,
                        scaleY: stretchY,
                        // Center the preview exactly on the cursor
                        translateX: "-50%",
                        translateY: "-50%"
                    }}
                    className="fixed top-0 left-0 w-72 aspect-[4/3] pointer-events-none z-[100] rounded-2xl overflow-hidden shadow-2xl shadow-brand-blue/10 border border-white/10"
                >
                    {/* Placeholder Block (Image Fallback) */}
                    <div className="w-full h-full bg-card/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                        {/* Abstract background blobs */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-gradient-to-br from-brand-blue to-brand-purple blur-3xl mix-blend-overlay" />

                        <span className="text-secondary text-xs uppercase tracking-widest font-mono mb-2">Preview</span>
                        <h4 className="text-white font-display font-medium text-xl leading-tight text-balance">
                            {activeProject.title}
                        </h4>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// --- Individual Roster Row ---
const ProjectRow = ({
    project,
    index,
    onClick,
    onHoverStart,
    onHoverEnd
}: {
    project: Project;
    index: number;
    onClick: () => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover="hover"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onClick={onClick}
        className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 border-b border-border/50 cursor-pointer transition-colors hover:bg-white/[0.02] px-4 -mx-4 rounded-xl"
    >
        {/* Left side: Num & Title */}
        <div className="flex items-baseline gap-6 md:gap-12 w-full md:w-auto">
            <span className="text-tertiary font-mono text-sm">
                {(index + 1).toString().padStart(2, '0')}
            </span>
            <div className="flex-1">
                <h3 className="text-xl md:text-3xl font-display font-medium text-primary md:group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                </h3>
            </div>
        </div>

        {/* Right side: Category & Arrow */}
        <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0 pl-11 md:pl-0">
            <span className="text-sm text-secondary uppercase tracking-widest bg-page px-3 py-1 rounded-full border border-border">
                {project.category}
            </span>

            {/* Animated Arrow */}
            <motion.div
                variants={{
                    hover: { x: 0, opacity: 1 }
                }}
                initial={{ x: -10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="hidden md:flex w-10 h-10 rounded-full bg-brand-blue/10 items-center justify-center text-brand-blue"
            >
                <ArrowUpRight className="w-5 h-5" />
            </motion.div>
        </div>
    </motion.div>
);

export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // Dynamic Categories
    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    // Mouse position tracking explicitly for this container instead of global to avoid unnecessary renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Only track mouse when hovered over a project (reduces calculation)
        if (hoveredProject) {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        }
    };

    // Filtered projects
    const displayProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        setHoveredProject(null); // hide preview
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section
            className="container-wide section-padding relative"
            id="projects"
            onMouseMove={handleMouseMove}
        >
            <SectionHeader
                title="Select Projects"
                subtitle="A curated selection of impactful projects driving digital transformation and procedure optimization."
            />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-12 sticky top-24 z-30 bg-page/80 backdrop-blur-md py-4 -mx-4 px-4 border-y border-border/30">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={clsx(
                            "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border relative",
                            activeCategory === cat
                                ? "border-transparent text-black"
                                : "border-border text-tertiary hover:text-primary hover:border-border/80"
                        )}
                    >
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="active-category"
                                className="absolute inset-0 bg-white rounded-full -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{cat}</span>
                    </button>
                ))}
            </div>

            {/* Roster List */}
            <motion.div layout className="flex flex-col">
                <AnimatePresence mode="popLayout">
                    {displayProjects.map((project, idx) => (
                        <ProjectRow
                            key={project.id || project.title}
                            index={idx}
                            project={project}
                            onClick={() => openModal(project)}
                            onHoverStart={() => setHoveredProject(project)}
                            onHoverEnd={() => setHoveredProject(null)}
                        />
                    ))}
                </AnimatePresence>

                {displayProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center text-secondary"
                    >
                        No projects found in this category.
                    </motion.div>
                )}
            </motion.div>

            {/* Desktop Only: Liquid Hover Preview */}
            <div className="hidden md:block">
                <CursorPreviewOverlay
                    activeProject={hoveredProject}
                    mousePosition={{ x: mouseX, y: mouseY }}
                />
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
