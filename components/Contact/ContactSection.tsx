"use client";

import { motion } from "framer-motion";
import { education, certifications, personalInfo } from "@/lib/data";

export function ContactSection() {
    return (
        <section id="contact" className="relative min-h-screen py-section">
            <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/10 via-black to-black -z-10" />
            <div className="absolute inset-0 grid-background opacity-25 -z-10" />

            <div className="max-w-[90rem] mx-auto px-6">
                <motion.div
                    className="mb-30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-massive md:text-giant font-black leading-none tracking-tight">
                        <span className="block text-white/20">Let's Work</span>
                        <span className="block gradient-text-animated mt-4">Together</span>
                    </h2>
                </motion.div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-26">
                    {[
                        { icon: "📧", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                        { icon: "📱", label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                        { icon: "📍", label: "Location", value: personalInfo.location, href: null },
                        { icon: "💼", label: "LinkedIn", value: "Connect", href: personalInfo.linkedin },
                    ].map((contact, index) => (
                        <motion.div
                            key={index}
                            className="group p-10 text-center border-2 border-white/10 hover:border-electric-blue transition-all duration-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -10 }}
                            style={{
                                background: "linear-gradient(135deg, rgba(0, 217, 255, 0.03), transparent)",
                            }}
                        >
                            <div className="text-6xl mb-6">{contact.icon}</div>
                            <p className="text-sm text-gray-600 mb-3 uppercase tracking-widest">{contact.label}</p>
                            {contact.href ? (
                                <a
                                    href={contact.href}
                                    target={contact.label === "LinkedIn" ? "_blank" : undefined}
                                    rel={contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                                    className="text-xl font-bold text-electric-blue hover:text-electric-purple transition-colors"
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <p className="text-xl font-bold text-white">{contact.value}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-26">
                    <motion.div
                        className="p-12 border-l-8 border-electric-blue"
                        style={{ background: "linear-gradient(90deg, rgba(0, 217, 255, 0.05), transparent)" }}
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl font-black mb-10 text-electric-blue">Education</h3>
                        <div className="space-y-8">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="text-2xl font-bold text-white mb-2">{edu.degree}</h4>
                                    <p className="text-xl text-gray-400">{edu.institution}</p>
                                    <p className="text-gray-600">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="p-12 border-l-8 border-electric-purple"
                        style={{ background: "linear-gradient(90deg, rgba(168, 85, 247, 0.05), transparent)" }}
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl font-black mb-10 text-electric-purple">Certifications</h3>
                        <div className="space-y-6">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <span className="text-3xl text-neon-green">✓</span>
                                    <span className="text-xl text-gray-300">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-4xl text-gray-400 mb-10">Ready to drive transformation?</p>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-block px-16 py-8 text-2xl font-black"
                        style={{
                            background: "linear-gradient(135deg, #00D9FF, #A855F7, #EC4899)",
                            boxShadow: "0 0 80px rgba(0, 217, 255, 0.4)",
                        }}
                    >
                        <span className="text-black">LET'S TALK</span>
                    </a>
                </motion.div>
            </div>

            <footer className="mt-30 text-center text-gray-600 pb-10">
                <p>© 2026 {personalInfo.name}</p>
            </footer>
        </section>
    );
}
