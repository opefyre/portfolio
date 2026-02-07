"use client";

import { Project } from "@/lib/db";
import { useState } from "react";
import ProjectModal from "@/components/UI/ProjectModal";
import SectionHeader from "@/components/UI/SectionHeader";

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="group bg-card border border-border hover:border-brand-blue/30 hover:bg-card-hover p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none cursor-pointer h-full flex flex-col"
    >
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-display font-medium text-primary group-hover:text-brand-blue transition-colors">
                {project.title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-page rounded text-tertiary border border-border">
                {project.category}
            </span>
        </div>
        <p className="text-secondary text-sm leading-relaxed mb-6 border-b border-border pb-6 flex-1">
            {project.description}
        </p>
        <div>
            <span className="text-brand-purple text-xs uppercase tracking-wide font-semibold block mb-2">Impact</span>
            <p className="text-primary text-sm line-clamp-2">{project.impact}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
            <span className="text-xs text-brand-blue font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Deep Dive <span className="text-lg">→</span>
            </span>
        </div>
    </div>
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
        <section className="container-wide section-padding" id="projects"> {/* Ensure ID is here */}
            <SectionHeader
                title="Select Projects"
                subtitle="A curated selection of impactful projects driving digital transformation and procedure optimization."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
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
