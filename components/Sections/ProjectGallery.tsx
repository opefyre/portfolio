"use client";

import { Project } from "@/lib/db";
import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] as const,
        },
    }),
};

const ProjectCard = ({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) => (
    <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={onClick}
        className="group bg-card border border-border hover:border-brand-blue/30 hover:bg-card-hover p-6 rounded-xl transition-[color,background-color,border-color,box-shadow] duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)] cursor-pointer h-full flex flex-col"
    >
        <h3 className="text-xl font-display font-medium text-primary group-hover:text-brand-blue transition-colors mb-4">
            {project.title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-6 border-b border-border pb-6 flex-1">
            {project.description}
        </p>
        <div>
            <span className="text-brand-purple text-xs uppercase tracking-wide font-semibold block mb-2">Impact</span>
            <p className="text-primary text-sm line-clamp-2">{project.impact}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-page rounded text-tertiary border border-border">
                {project.category}
            </span>
        </div>
    </motion.div>
);

export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="container-wide section-padding" id="projects">
            <SectionHeader
                title="Select Projects"
                subtitle="A curated selection of impactful projects driving digital transformation and procedure optimization."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        index={idx}
                        project={project}
                        onClick={() => openModal(project)}
                    />
                ))}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
