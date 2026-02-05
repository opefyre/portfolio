"use client";

import { motion } from "framer-motion";
import { skills, certifications, Education, education } from "@/lib/data";

const SkillBadge = ({ item }: { item: string }) => (
    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-silver hover:bg-white/10 hover:border-brand-blue/30 transition-all cursor-default">
        {item}
    </span>
);

export default function ExpertiseSection() {
    return (
        <section className="container-wide py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Skills Column */}
            <div>
                <h3 className="section-title mb-8">Technical Expertise</h3>
                <div className="space-y-8">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx}>
                            <h4 className="text-brand-blue text-sm uppercase tracking-widest mb-4 font-semibold">
                                {skillGroup.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <SkillBadge key={skill} item={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certs & Education Column */}
            <div className="space-y-12">
                {/* Certifications */}
                <div>
                    <h3 className="section-title mb-8">Certifications</h3>
                    <ul className="space-y-4">
                        {certifications.map((cert, idx) => (
                            <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                                <div className="mt-1 w-2 h-2 rounded-full bg-brand-purple shrink-0" />
                                <span className="text-silver font-medium">{cert.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Education */}
                <div>
                    <h3 className="section-title mb-8">Education</h3>
                    <div className="space-y-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="border-l-2 border-white/10 pl-6">
                                <h4 className="text-white font-medium text-lg">{edu.degree}</h4>
                                <div className="text-brand-blue text-sm mb-1">{edu.institution}</div>
                                <div className="text-muted text-xs font-mono">{edu.period}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
