"use client";

import { motion } from "framer-motion";
import { skills, certifications, education } from "@/lib/data";
import clsx from "clsx";
import SectionHeader from "@/components/UI/SectionHeader"; // Importing the standard header

// Cast to any to bypass strict Framer Motion type checks
const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const Card = ({ className, title, children }: { className?: string; title: string; children: React.ReactNode }) => (
    <motion.div
        variants={cardVariants}
        className={clsx(
            "bg-card border border-border p-6 rounded-2xl flex flex-col hover:border-brand-blue/30 hover:bg-card-hover transition-colors duration-300 shadow-sm dark:shadow-none backdrop-blur-sm",
            className
        )}
    >
        <h3 className="text-xs font-mono uppercase tracking-widest text-tertiary mb-4 border-b border-border pb-2">{title}</h3>
        <div className="flex-1">{children}</div>
    </motion.div>
);

const SkillTag = ({ item }: { item: string }) => (
    <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-page border border-border text-xs text-secondary hover:border-brand-blue/30 hover:text-brand-blue transition-colors cursor-default select-none whitespace-nowrap">
        {item}
    </span>
);

export default function ExpertiseSection() {
    // Separate skills into primary focus vs others
    const processSkills = skills.find(s => s.category === "Process Excellence");
    const strategySkills = skills.find(s => s.category === "Strategic Leadership");
    const otherSkills = skills.filter(s => s.category !== "Process Excellence" && s.category !== "Strategic Leadership");

    return (
        <section className="container-wide section-padding space-y-24 md:space-y-32" id="expert-section"> {/* Added generic id wrapper context if needed, but inner divs carry ids */}

            {/* PART 1: COMPETENCIES (Skills) */}
            <div id="expertise"> {/* ID for Navigation */}
                <SectionHeader
                    title="Technical Command Center"
                    subtitle="Core competencies across Process Excellence, Strategic Leadership, and Digital Transformation."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6"
                >
                    {/* Primary Focus: Process Excellence (Large Card) */}
                    <Card className="md:col-span-3 lg:col-span-2 md:row-span-2 border-brand-blue/20 bg-brand-blue/5" title="Process Excellence & Optimization">
                        <div className="flex flex-wrap gap-2.5 content-start h-full">
                            {processSkills?.items.map(skill => (
                                <span key={skill} className="px-4 py-2 bg-brand-blue text-white shadow-lg shadow-brand-blue/20 rounded-lg text-sm font-bold tracking-wide">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Secondary Focus: Strategic Leadership */}
                    <Card className="md:col-span-3 lg:col-span-2" title="Strategic Leadership">
                        <div className="flex flex-wrap gap-2">
                            {strategySkills?.items.map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-md text-xs font-semibold">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Other Categories Dynamically Mapped */}
                    {otherSkills.map((skillGroup, idx) => (
                        <Card key={idx} className="md:col-span-2 lg:col-span-1" title={skillGroup.category}>
                            <div className="flex flex-wrap gap-1.5">
                                {skillGroup.items.map(item => (
                                    <SkillTag key={item} item={item} />
                                ))}
                            </div>
                        </Card>
                    ))}
                </motion.div>
            </div>

            {/* PART 2: CREDENTIALS (Education & Certs) */}
            <div id="credentials"> {/* Added ID for Navigation */}
                <SectionHeader
                    title="Credentials & Academic Log"
                    subtitle="Formal education, certifications, and professional milestones."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Education */}
                    <Card className="h-full" title="Academic Milestones">
                        <div className="space-y-8 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative pl-6 group">
                                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-border group-hover:bg-brand-blue transition-colors" />
                                    <div className="text-primary text-sm font-bold leading-tight mb-1">{edu.degree}</div>
                                    <div className="text-tertiary text-xs uppercase tracking-wider font-semibold">{edu.institution}</div>
                                    <div className="text-tertiary/70 text-[10px] font-mono mt-1">{edu.period}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Certifications */}
                    <Card className="h-full" title="Professional Certifications">
                        <ul className="space-y-4">
                            {certifications.map((cert, idx) => (
                                <li key={idx} className="flex items-start justify-between group">
                                    <span className="text-sm text-secondary group-hover:text-primary transition-colors pr-4 leading-relaxed font-medium">
                                        {cert.name}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0 mt-1.5" />
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>
            </div>

        </section>
    );
}
