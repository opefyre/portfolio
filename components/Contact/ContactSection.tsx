"use client";

import { motion } from "framer-motion";
import { education, certifications, personalInfo } from "@/lib/data";

export function ContactSection() {
    return (
        <section id="contact" className="relative min-h-screen py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/10 via-transparent to-transparent -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                {/* Section Title */}
                <motion.h2
                    className="text-5xl md:text-6xl font-bold mb-16 text-center font-display"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="gradient-text">Get In Touch</span>
                </motion.h2>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            icon: "📧",
                            label: "Email",
                            value: personalInfo.email,
                            href: `mailto:${personalInfo.email}`,
                        },
                        {
                            icon: "📱",
                            label: "Phone",
                            value: personalInfo.phone,
                            href: `tel:${personalInfo.phone}`,
                        },
                        {
                            icon: "📍",
                            label: "Location",
                            value: personalInfo.location,
                            href: null,
                        },
                        {
                            icon: "💼",
                            label: "LinkedIn",
                            value: "Connect",
                            href: personalInfo.linkedin,
                        },
                    ].map((contact, index) => (
                        <motion.div
                            key={index}
                            className="holographic p-6 text-center group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <div className="text-4xl mb-3">{contact.icon}</div>
                            <p className="text-sm text-gray-500 mb-2">{contact.label}</p>
                            {contact.href ? (
                                <a
                                    href={contact.href}
                                    target={contact.label === "LinkedIn" ? "_blank" : undefined}
                                    rel={contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                                    className="text-neon-blue hover:text-glow transition-all"
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <p className="text-white">{contact.value}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Education */}
                    <motion.div
                        className="glass-strong p-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-neon-purple">
                            Education
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-neon-blue pl-4">
                                    <h4 className="font-bold text-white">{edu.degree}</h4>
                                    <p className="text-gray-400 text-sm">{edu.institution}</p>
                                    <p className="text-gray-500 text-xs">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        className="glass-strong p-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-neon-purple">
                            Certifications
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <span className="text-neon-blue mt-1">✓</span>
                                    <span className="text-gray-300">{cert}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xl text-gray-400 mb-6">
                        Ready to drive transformation together?
                    </p>
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-block px-8 py-4 holographic text-lg font-semibold hover:scale-105 transition-all duration-300"
                    >
                        Let's Connect
                    </a>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                className="mt-20 text-center text-gray-500 text-sm pb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p>© 2026 {personalInfo.name}. All rights reserved.</p>
            </motion.footer>
        </section>
    );
}
