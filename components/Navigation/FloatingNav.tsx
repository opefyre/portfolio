"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
    LayoutDashboard,
    Wrench,
    Briefcase,
    Rocket,
    FolderKanban,
    GraduationCap,
} from "lucide-react";

// Nav items with icons for mobile view
const navItems = [
    { name: "Overview", id: "overview", icon: LayoutDashboard },
    { name: "Skills", id: "expertise", icon: Wrench },
    { name: "Education", id: "credentials", icon: GraduationCap },
    { name: "History", id: "experience", icon: Briefcase },
    { name: "Venture", id: "venture", icon: Rocket },
    { name: "Projects", id: "projects", icon: FolderKanban },
];

export default function FloatingNav({ email }: { email: string }) {
    const [activeSection, setActiveSection] = useState("overview");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Use getBoundingClientRect for accurate detection of nested elements
            // Iterate in reverse so the LAST section whose top is above the threshold wins
            let found = false;
            for (let i = navItems.length - 1; i >= 0; i--) {
                const el = document.getElementById(navItems[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(navItems[i].id);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                setActiveSection("overview");
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // getBoundingClientRect gives accurate position even for deeply nested elements
            const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: absoluteTop - 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
            <div className={clsx(
                "pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 border backdrop-blur-md",
                scrolled
                    ? "bg-page/80 border-border shadow-lg shadow-brand-blue/5"
                    : "bg-transparent border-transparent"
            )}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={clsx(
                                "relative px-2 md:px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300",
                                activeSection !== item.id && "text-tertiary hover:text-white"
                            )}
                            aria-label={item.name}
                        >
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white rounded-full border border-border shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {/* Icon on mobile, text on desktop */}
                            <span className={clsx(
                                "relative z-10 font-bold transition-colors duration-300 md:hidden flex items-center justify-center",
                                activeSection === item.id ? "text-black" : ""
                            )}>
                                <Icon className="w-4 h-4" />
                            </span>
                            <span className={clsx(
                                "relative z-10 font-bold transition-colors duration-300 hidden md:inline",
                                activeSection === item.id ? "text-black" : ""
                            )}>
                                {item.name}
                            </span>
                        </button>
                    );
                })}

                <div className="w-px h-4 bg-border mx-1" />

                {/* Primary CTA */}
                <button
                    onClick={() => window.open(`mailto:${email}`)}
                    className="hidden md:flex items-center px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-blue/90 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300 mr-1"
                >
                    Let&apos;s Chat
                </button>
            </div>
        </motion.div>
    );
}
