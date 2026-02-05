"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        setActiveSection(href.slice(1));
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 glass-strong"
                style={{
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="max-w-[90rem] mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        {/* Bold Logo */}
                        <a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#home");
                            }}
                            className="text-4xl font-black gradient-text-animated hover:scale-110 transition-transform"
                        >
                            AS
                        </a>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-12">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className={`relative text-lg font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === item.href.slice(1)
                                                ? "text-electric-blue scale-110"
                                                : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {item.name}
                                        {activeSection === item.href.slice(1) && (
                                            <motion.div
                                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue to-electric-purple"
                                                layoutId="activeSection"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden relative w-12 h-12 flex items-center justify-center"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <div className="flex flex-col gap-2">
                                <motion.span
                                    className="w-8 h-1 bg-electric-blue"
                                    animate={isMobileMenuOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
                                />
                                <motion.span
                                    className="w-8 h-1 bg-electric-blue"
                                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                />
                                <motion.span
                                    className="w-8 h-1 bg-electric-blue"
                                    animate={isMobileMenuOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ul className="flex flex-col items-center justify-center h-full gap-10">
                        {navItems.map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    className="text-5xl font-black gradient-text-animated hover:scale-110 transition-transform"
                                >
                                    {item.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </>
    );
}
