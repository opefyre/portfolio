"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Mail, Instagram, Github } from "lucide-react";
import MagneticButton from "@/components/UI/MagneticButton";
import Image from "next/image";
import { easings, useReducedMotion } from "@/lib/motion";

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

interface Module { name: string; url: string }
interface Socials {
    github: string; x: string; instagram: string; tiktok: string; email: string;
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
    { src: "/elixiary/achievements.png", alt: "Achievements" },
    { src: "/elixiary/featured-card.png", alt: "Featured Cocktail" },
];

// Dynamic-load the R3F scene so the three.js bundle stays out of the main route chunk.
const VentureScene3D = dynamic(() => import("./VentureScene3D"), {
    ssr: false,
    loading: () => null,
});

export default function ElixiaryFeature3D({ elixiaryVenture }: { elixiaryVenture: ElixiaryVenture }) {
    const reducedMotion = useReducedMotion();
    const [activeImage, setActiveImage] = useState(0);
    const [hovering, setHovering] = useState(false);
    const sceneRef = useRef<HTMLDivElement>(null);

    const nextImage = useCallback(() => {
        setActiveImage((prev) => (prev + 1) % showcaseImages.length);
    }, []);

    useEffect(() => {
        if (reducedMotion || hovering) return;
        const timer = window.setInterval(nextImage, 4200);
        return () => window.clearInterval(timer);
    }, [nextImage, reducedMotion, hovering]);

    const imageSrcs = useMemo(() => showcaseImages.map((img) => img.src), []);

    return (
        <section className="container-wide w-full py-8 md:py-12">
            {/* Top mission labels */}
            <div className="flex items-center justify-between gap-4 mb-5 text-tertiary">
                <div className="flex items-center gap-3">
                    <span className="label-mono bracket text-brand-blue">SUBSYSTEM</span>
                    <span className="label-mono">VENTURE_01 · HOLOGRAPHIC READOUT</span>
                </div>
                <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                    <span className="label-mono text-online">PROJECT.STATUS: LIVE</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: easings.ui }}
                className="relative rounded-2xl md:rounded-3xl border border-brand-blue/20 bg-deep/50 backdrop-blur-md overflow-hidden shadow-[0_30px_80px_-30px_rgba(56,189,248,0.3)]"
            >
                {/* Decorative corner brackets */}
                <span aria-hidden="true" className="absolute top-3 left-3 w-4 h-4 border-l border-t border-brand-blue/50 z-20" />
                <span aria-hidden="true" className="absolute top-3 right-3 w-4 h-4 border-r border-t border-brand-blue/50 z-20" />
                <span aria-hidden="true" className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-brand-blue/50 z-20" />
                <span aria-hidden="true" className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-brand-blue/50 z-20" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* LEFT: Editorial column */}
                    <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col gap-5 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5, ease: easings.ui }}
                            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider self-start shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        >
                            <Zap className="w-2.5 h-2.5" />
                            <span>Featured Venture</span>
                        </motion.div>

                        <div className="space-y-2">
                            <h3 className="text-3xl md:text-4xl font-display font-medium text-primary leading-tight tracking-tight">
                                {elixiaryVenture.title}
                            </h3>
                            <p className="font-editorial italic text-brand-blue text-lg md:text-xl leading-snug">
                                {elixiaryVenture.tagline}
                            </p>
                        </div>

                        <p className="text-secondary text-sm md:text-base leading-relaxed border-l border-brand-blue/30 pl-4">
                            {elixiaryVenture.description}
                        </p>

                        {/* Modules */}
                        <div className="space-y-2">
                            <h4 className="label-mono text-tertiary">MODULES</h4>
                            <div className="flex flex-wrap gap-2">
                                {elixiaryVenture.modules.map((mod) => (
                                    <a
                                        key={mod.name}
                                        href={mod.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-lg bg-brand-purple/5 border border-brand-purple/15 text-brand-purple text-xs font-bold uppercase tracking-wider hover:bg-brand-purple/10 hover:border-brand-purple/30 transition-colors inline-flex items-center gap-1.5"
                                    >
                                        {mod.name} <ArrowUpRight className="w-2.5 h-2.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Tech stack */}
                        <div className="space-y-2">
                            <h4 className="label-mono text-tertiary">TECH STACK</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {elixiaryVenture.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 rounded-md bg-page border border-border text-secondary text-xs"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA + socials row */}
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto gap-4 flex-wrap">
                            <MagneticButton strength={0.4} className="inline-flex">
                                <a
                                    href={elixiaryVenture.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="visit"
                                    className="inline-flex items-center gap-2 pl-2 pr-5 py-2 rounded-full bg-brand-blue hover:bg-white text-deep text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
                                >
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-deep text-brand-blue">
                                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                    </span>
                                    Visit App
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
                                        className="text-tertiary hover:text-brand-blue transition-colors"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: 3D holographic projection */}
                    <div
                        ref={sceneRef}
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        className="lg:col-span-7 relative min-h-[420px] md:min-h-[520px] lg:min-h-[600px] border-t lg:border-t-0 lg:border-l border-brand-blue/15 overflow-hidden"
                        style={{
                            background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(56,189,248,0.12), transparent 70%), #03070f",
                        }}
                    >
                        {/* Top-left HUD label */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-3 text-tertiary">
                            <span className="label-mono text-brand-blue">HOLO.{String(activeImage + 1).padStart(2, "0")}</span>
                            <span aria-hidden="true" className="h-px w-8 bg-brand-blue/40" />
                            <span className="label-mono">{showcaseImages[activeImage].alt}</span>
                        </div>

                        {/* Top-right HUD label */}
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-tertiary">
                            <span className="label-mono text-brand-blue tabular-nums">
                                {String(activeImage + 1).padStart(2, "0")} / {String(showcaseImages.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* The 3D scene (or reduced-motion fallback) */}
                        {reducedMotion ? (
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-brand-blue/30 shadow-[0_20px_60px_-20px_rgba(56,189,248,0.4)]"
                                    >
                                        <Image
                                            src={showcaseImages[activeImage].src}
                                            alt={showcaseImages[activeImage].alt}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={activeImage === 0}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Suspense
                                fallback={
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="label-mono text-tertiary">INITIALIZING HOLOGRAM…</span>
                                    </div>
                                }
                            >
                                <VentureScene3D
                                    images={imageSrcs}
                                    activeIndex={activeImage}
                                />
                            </Suspense>
                        )}

                        {/* Scan-line overlay */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                            style={{
                                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56,189,248,0.4) 2px, rgba(56,189,248,0.4) 3px)",
                            }}
                        />
                        {/* Vignette */}
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

                        {/* Dot indicators */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                            {showcaseImages.map((img, i) => (
                                <button
                                    key={img.src}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    aria-label={`View ${img.alt}`}
                                    aria-current={i === activeImage}
                                    className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                                        i === activeImage
                                            ? "w-6 h-1.5 bg-brand-blue shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Bottom status strip */}
                        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 text-tertiary">
                            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                            <span className="label-mono text-brand-blue">PROJECTION ACTIVE</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
