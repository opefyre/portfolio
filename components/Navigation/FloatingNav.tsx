"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 120; // Trigger offset

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
                top: element.offsetTop - 80,
                behavior: "smooth",
            });
        }
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
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
                    ? "bg-page/80 border-border shadow-lg shadow-brand-blue/5"
                    : "bg-transparent border-transparent"
            )}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={clsx(
                            "relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300",
                            // Inactive state text color
                            activeSection !== item.id && "text-tertiary hover:text-primary dark:hover:text-white"
                        )}
                    >
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white dark:bg-white rounded-full border border-border shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {/* Active state text color: Black on White Pill (both modes) */}
                        <span className={clsx(
                            "relative z-10 font-bold transition-colors duration-300",
                            activeSection === item.id ? "text-black" : ""
                        )}>
                            {item.name}
                        </span>
                    </button>
                ))}

                <div className="w-px h-4 bg-border mx-1" />

                {/* Primary CTA - ADDED */}
                <button
                    onClick={() => window.open('mailto:shirkavand.a.s@gmail.com')}
                    className="hidden md:flex items-center px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-blue/90 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300 mr-1"
                >
                    Let's Chat
                </button>

                {mounted && (
                    <button
                        onClick={toggleTheme}
                        className="relative px-3 py-2 rounded-full text-tertiary hover:text-brand-blue transition-colors group"
                        aria-label="Toggle Theme"
                    >
                        <div className="relative w-4 h-4">
                            {/* Sun Icon */}
                            <svg
                                className={clsx("absolute inset-0 w-full h-full transition-transform duration-500 rotate-0 dark:-rotate-90 dark:scale-0 text-amber-500")}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {/* Moon Icon */}
                            <svg
                                className={clsx("absolute inset-0 w-full h-full transition-transform duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-brand-blue")}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>
        </motion.div>
    );
}
