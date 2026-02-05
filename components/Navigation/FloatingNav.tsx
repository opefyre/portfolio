"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
    { name: "Overview", id: "hero" },
    { name: "Impact", id: "stats" },
    { name: "Expertise", id: "expertise" },
    { name: "History", id: "experience" },
    { name: "Projects", id: "projects" },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Simple spy logic
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
            <div className={clsx(
                "pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 border backdrop-blur-md",
                scrolled
                    ? "bg-deep/80 border-white/10 shadow-lg shadow-brand-blue/5"
                    : "bg-transparent border-transparent"
            )}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={clsx(
                            "relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300",
                            activeSection === item.id
                                ? "text-white"
                                : "text-muted hover:text-silver"
                        )}
                    >
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
