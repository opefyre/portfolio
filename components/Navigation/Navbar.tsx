"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map((item) => item.href.slice(1));
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-strong shadow-lg" : "bg-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="#home"
                            className="text-2xl font-bold font-display gradient-text hover:scale-105 transition-transform"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#home");
                            }}
                        >
                            AS
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className={`relative text-sm font-medium transition-colors duration-300 hover:text-neon-blue ${activeSection === item.href.slice(1)
                                                ? "text-neon-blue"
                                                : "text-gray-300"
                                            }`}
                                    >
                                        {item.name}
                                        {activeSection === item.href.slice(1) && (
                                            <motion.div
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
                                                layoutId="activeSection"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden relative w-10 h-10 flex items-center justify-center"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col gap-1.5">
                                <motion.span
                                    className={`w-6 h-0.5 bg-neon-blue transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                                        }`}
                                />
                                <motion.span
                                    className={`w-6 h-0.5 bg-neon-blue transition-all ${isMobileMenuOpen ? "opacity-0" : ""
                                        }`}
                                />
                                <motion.span
                                    className={`w-6 h-0.5 bg-neon-blue transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.ul
                            className="relative flex flex-col items-center justify-center h-full gap-8"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className={`text-3xl font-bold transition-all duration-300 ${activeSection === item.href.slice(1)
                                                ? "text-neon-blue text-glow"
                                                : "text-gray-300 hover:text-neon-purple"
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
