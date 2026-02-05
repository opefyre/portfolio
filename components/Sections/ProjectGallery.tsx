"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

const ProjectCard = ({ project }: any) => (
    <div className="group bg-canvas border border-white/5 hover:border-brand-blue/30 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-display font-medium text-white group-hover:text-brand-blue transition-colors">
                {project.title}
            </h3>
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded text-muted">
                {project.category}
            </span>
        </div>
        <p className="text-muted text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
            {project.description}
        </p>
        <div>
            <span className="text-brand-purple text-xs uppercase tracking-wide font-semibold block mb-2">Impact</span>
            <p className="text-silver text-sm">{project.impact}</p>
        </div>
    </div>
);

export default function ProjectGallery() {
    return (
        <section className="container-wide py-24">
            <h2 className="section-title mb-12">Select Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>
        </section>
    );
}
