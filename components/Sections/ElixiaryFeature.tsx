"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, Mail, Instagram, Github } from "lucide-react";
import MagneticButton from "@/components/UI/MagneticButton";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Custom Icons
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.44a4.85 4.85 0 01-1-.75z" />
        </svg>
    );
}

interface Module {
    name: string;
    url: string;
}
interface Socials {
    github: string;
    x: string;
    instagram: string;
    tiktok: string;
    email: string;
}
interface ElixiaryVenture {
    title: string;
    tagline: string;
    description: string;
    modules: Module[];
    techStack: string[];
    website: string;
    socials: Socials;
}

const showcaseImages = [
    { src: "/elixiary/hero.png", alt: "Elixiary AI Landing Page" },
    { src: "/elixiary/cocktail-cards.png", alt: "AI-Generated Cocktail Cards" },
    { src: "/elixiary/recipe-detail.png", alt: "Recipe Detail View" },
    { src: "/elixiary/collection.png", alt: "My Cocktail Collection" },
    { src: "/elixiary/blog-history.png", alt: "Cocktail History Articles" },
    { src: "/elixiary/achievements.png", alt: "Gamification & Achievements" },
    { src: "/elixiary/featured-card.png", alt: "Featured Cocktail Highlight" },
    { src: "/elixiary/cocktail-grid.png", alt: "AI-Generated Cocktail Gallery" },
];

export default function ElixiaryFeature({ elixiaryVenture }: { elixiaryVenture: ElixiaryVenture }) {
    const [activeImage, setActiveImage] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Scroll-linked animation
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "0.6 1"] // Animation finishes when card is 60% above the bottom of the viewport
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const yPulse = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const blur = useTransform(scrollYProgress, [0, 1], ["blur(20px)", "blur(0px)"]);

    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

    // Auto-rotate images
    const nextImage = useCallback(() => {
        setActiveImage((prev) => (prev + 1) % showcaseImages.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextImage, 4000);
        return () => clearInterval(timer);
    }, [nextImage]);

    // (Removed isInView timer)

    return (
        <section className="container-wide section-padding">

            <div ref={cardRef} className="relative">
                {/* Glow flash behind the card linked to scroll */}
                <motion.div
                    style={{ opacity: glowOpacity, scale: glowScale }}
                    className="absolute inset-0 rounded-2xl bg-brand-blue/30 blur-3xl -z-10"
                />

                {/* Main card with Scroll-tied 3D Holographic Parallax */}
                <motion.div
                    style={{
                        opacity,
                        rotateX,
                        scale,
                        y: yPulse,
                        filter: blur,
                        transformPerspective: 2000,
                        transformStyle: "preserve-3d"
                    }}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

                        {/* Left: Content — 2 columns */}
                        <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-wider"
                                >
                                    <Zap className="w-2.5 h-2.5" />
                                    <span>Featured Project</span>
                                </motion.div>

                                <h3 className="text-2xl md:text-3xl font-display font-medium text-primary leading-tight">
                                    {elixiaryVenture.title}
                                </h3>
                                <p className="text-base text-brand-blue font-light">
                                    {elixiaryVenture.tagline}
                                </p>
                                <p className="text-secondary text-sm leading-relaxed">
                                    {elixiaryVenture.description}
                                </p>

                                {/* Key Modules — compact */}
                                <div className="flex flex-wrap gap-2">
                                    {elixiaryVenture.modules.map((mod: Module) => (
                                        <a
                                            key={mod.name}
                                            href={mod.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-[10px] font-bold uppercase tracking-wider hover:bg-brand-purple/10 transition-colors flex items-center gap-1.5"
                                        >
                                            {mod.name} <ArrowUpRight className="w-2.5 h-2.5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack — compact inline */}
                            <div className="space-y-2">
                                <h4 className="text-[10px] uppercase tracking-widest text-tertiary">Tech Stack</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {elixiaryVenture.techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 rounded-md bg-page border border-border text-secondary text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA + Socials — compact row */}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <MagneticButton as="a" strength={0.4}>
                                    <a
                                        href={elixiaryVenture.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                                    >
                                        Visit App <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </MagneticButton>

                                <div className="flex items-center gap-4">
                                    {[
                                        { name: "GitHub", url: elixiaryVenture.socials.github, icon: Github },
                                        { name: "X", url: elixiaryVenture.socials.x, icon: XIcon },
                                        { name: "Instagram", url: elixiaryVenture.socials.instagram, icon: Instagram },
                                        { name: "TikTok", url: elixiaryVenture.socials.tiktok, icon: TikTokIcon },
                                        { name: "Email", url: elixiaryVenture.socials.email, icon: Mail },
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-tertiary hover:text-brand-blue transition-colors duration-300"
                                            aria-label={social.name}
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Screenshot Showcase — 3 columns */}
                        <div className="lg:col-span-3 relative border-t lg:border-t-0 lg:border-l border-border p-4 md:p-6 flex flex-col bg-[#060d1b]">
                            {/* Browser-style top bar */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                </div>
                                <div className="flex-1 h-5 rounded-md bg-white/5 border border-white/10 flex items-center px-2">
                                    <span className="text-[9px] text-tertiary/60 font-mono">elixiary.com</span>
                                </div>
                            </div>

                            {/* Image container with clear border */}
                            <div className="relative flex-1 rounded-lg overflow-hidden ring-1 ring-white/10 shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)] min-h-[260px] md:min-h-[360px]">
                                {showcaseImages.map((img, i) => (
                                    <motion.div
                                        key={img.src}
                                        initial={false}
                                        animate={{ opacity: i === activeImage ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                            priority={i === 0}
                                        />
                                    </motion.div>
                                ))}

                                {/* Bottom gradient overlay for dots */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

                                {/* Dot indicators */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                    {showcaseImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={`rounded-full transition-all duration-300 ${i === activeImage
                                                ? "w-6 h-2 bg-brand-blue"
                                                : "w-2 h-2 bg-white/40 hover:bg-white/60"
                                                }`}
                                            aria-label={`View ${showcaseImages[i].alt}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
