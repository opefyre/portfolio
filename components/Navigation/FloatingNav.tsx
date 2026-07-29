"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import MagneticButton from "@/components/UI/MagneticButton";
import {
    LayoutDashboard,
    Wrench,
    Briefcase,
    // FEATURED_VENTURE (hidden) — restore the Rocket icon alongside the nav item below.
    // Rocket,
    FolderKanban,
    MessageSquare,
} from "lucide-react";
import { useReducedMotion, easings } from "@/lib/motion";

interface NavItem {
    name: string;
    id: string;
    icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
    { name: "Overview", id: "overview", icon: LayoutDashboard },
    // FEATURED_VENTURE (hidden) — restore alongside the section in app/page.tsx.
    // { name: "Venture", id: "venture", icon: Rocket },
    { name: "Projects", id: "projects", icon: FolderKanban },
    { name: "History", id: "experience", icon: Briefcase },
    { name: "Skills", id: "expertise", icon: Wrench },
];

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState<string>(navItems[0].id);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const reducedMotion = useReducedMotion();
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
    const lastScrollY = useRef(0);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
    const scrollPercentage = useTransform(scaleX, (latest) => `${Math.round(latest * 100)}%`);

    // Track scrolled state + scroll direction (hide on down, show on up / near top)
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            const dy = y - lastScrollY.current;
            // Always show near the top
            if (y < 120) {
                setHidden(false);
            } else if (dy > 6) {
                setHidden(true);
            } else if (dy < -6) {
                setHidden(false);
            }
            lastScrollY.current = y;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // IntersectionObserver-based scroll spy
    useEffect(() => {
        if (typeof window === "undefined") return;

        const elements = navItems
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        // Cache for later use by scrollTo
        elements.forEach((el) => sectionRefs.current.set(el.id, el));

        // Visible regions ranked by topmost position above a 35%-from-top threshold
        const visibleIds = new Set<string>();
        const updateActive = () => {
            // Find the section nearest the top of the viewport but past the threshold
            const sorted = navItems
                .filter((it) => visibleIds.has(it.id))
                .map((it) => ({ id: it.id, top: document.getElementById(it.id)?.getBoundingClientRect().top ?? Infinity }))
                .filter((s) => s.top < window.innerHeight * 0.35);

            if (sorted.length === 0) return;
            // Take the lowest top value that's still above the threshold (most recently entered)
            sorted.sort((a, b) => b.top - a.top);
            const next = sorted[0].id;
            setActiveSection((prev) => (prev === next ? prev : next));
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visibleIds.add(entry.target.id);
                    else visibleIds.delete(entry.target.id);
                }
                updateActive();
            },
            {
                // Treat a section as "in" when its top crosses 35% from the viewport top
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0,
            }
        );

        elements.forEach((el) => observer.observe(el));
        // Initial pass
        elements.forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.35) visibleIds.add(el.id);
        });
        updateActive();

        return () => observer.disconnect();
    }, []);

    // Hash-based deep linking: read hash on first load and scroll to that section.
    // The IntersectionObserver effect above takes over from there.
    useEffect(() => {
        if (typeof window === "undefined") return;
        const initial = window.location.hash.replace(/^#/, "");
        if (!initial || !navItems.some((i) => i.id === initial)) return;
        const el = document.getElementById(initial);
        if (!el) return;
        window.setTimeout(() => {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "auto" });
            setActiveSection(initial);
        }, 30);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const url = new URL(window.location.href);
        if (url.hash !== `#${activeSection}`) {
            url.hash = activeSection;
            window.history.replaceState(null, "", url.toString());
        }
    }, [activeSection]);

    const scrollTo = useCallback(
        (id: string) => {
            const element = sectionRefs.current.get(id) ?? document.getElementById(id);
            if (!element) return;
            const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: absoluteTop - 100,
                behavior: reducedMotion ? "auto" : "smooth",
            });
        },
        [reducedMotion]
    );

    return (
        <motion.nav
            aria-label="Section navigation"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.35, ease: easings.ui }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
            <div
                className={clsx(
                    "pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 border backdrop-blur-md",
                    scrolled
                        ? "bg-page/80 border-border shadow-lg shadow-brand-blue/5"
                        : "bg-transparent border-transparent"
                )}
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollTo(item.id)}
                            aria-current={isActive ? "true" : undefined}
                            className={clsx(
                                "relative cursor-pointer px-2 md:px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                                !isActive && "text-tertiary hover:text-white"
                            )}
                            aria-label={`Jump to ${item.name}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white rounded-full border border-border shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span
                                className={clsx(
                                    "relative z-10 font-bold transition-colors duration-300 md:hidden flex items-center justify-center",
                                    isActive ? "text-black" : ""
                                )}
                            >
                                <Icon className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span
                                className={clsx(
                                    "relative z-10 font-bold transition-colors duration-300 hidden md:inline",
                                    isActive ? "text-black" : ""
                                )}
                            >
                                {item.name}
                            </span>
                        </button>
                    );
                })}

                <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

                {/* Primary CTA */}
                <MagneticButton strength={0.3}>
                    <Link
                        href="/contact"
                        className="flex cursor-pointer items-center px-2.5 md:px-4 py-2 rounded-full bg-brand-blue text-deep text-xs font-bold uppercase tracking-wider hover:bg-brand-blue/90 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page transition-all duration-300 mr-1"
                    >
                        <MessageSquare className="w-4 h-4 md:hidden" aria-hidden="true" />
                        <span className="hidden md:inline">Contact</span>
                    </Link>
                </MagneticButton>

                {/* Circular scroll progress */}
                <div
                    className="relative w-8 h-8 flex items-center justify-center ml-1 bg-page/50 rounded-full border border-border/50"
                    aria-hidden="true"
                >
                    <svg className="w-8 h-8 transform -rotate-90 absolute" viewBox="0 0 36 36">
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-border"
                        />
                        <motion.circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="transparent"
                            stroke="url(#progress-gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{ pathLength: scaleX }}
                            className="text-brand-blue"
                        />
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#c084fc" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <motion.span className="absolute text-[10px] font-mono font-bold text-white z-10 pointer-events-none tabular-nums">
                        {scrollPercentage}
                    </motion.span>
                </div>
            </div>
        </motion.nav>
    );
}
