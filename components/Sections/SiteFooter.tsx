"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Linkedin, Download } from "lucide-react";
import { easings } from "@/lib/motion";

interface SiteFooterProps {
    location?: string;
    linkedin?: string;
    resumeUrl: string;
}

const QUICK_LINKS = [
    { name: "Overview", id: "overview" },
    { name: "Skills", id: "expertise" },
    { name: "Education", id: "credentials" },
    { name: "History", id: "experience" },
    { name: "Venture", id: "venture" },
    { name: "Projects", id: "projects" },
];

export default function SiteFooter({ location, linkedin, resumeUrl }: SiteFooterProps) {
    const rootRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: rootRef,
        offset: ["start 80%", "end end"],
    });
    const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1]);
    const yearScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

    return (
        <footer
            ref={rootRef}
            className="relative bg-section-tinted border-t border-border overflow-hidden"
            aria-labelledby="footer-cta"
        >
            {/* Top label bar */}
            <div className="container-wide flex items-center justify-between gap-4 border-b border-border py-3 text-tertiary">
                <span className="label-mono bracket text-brand-blue">SYS.OUT</span>
                <span className="label-mono">END OF TRANSMISSION</span>
            </div>

            {/* Editorial CTA */}
            <div className="container-wide pt-16 md:pt-24 pb-10 relative">
                <div className="flex items-center gap-3 text-tertiary mb-5">
                    <span className="label-mono text-brand-blue">[ NEXT STEP ]</span>
                    <span aria-hidden="true" className="h-px w-12 bg-brand-blue/40" />
                    <span className="label-mono">OPEN CHANNEL</span>
                </div>

                <motion.h2
                    id="footer-cta"
                    style={{ opacity: headlineOpacity }}
                    className="font-display font-medium tracking-[-0.025em] text-primary leading-[0.9]"
                >
                    <span className="block text-[clamp(2.75rem,7vw,6rem)]">Let&apos;s engineer</span>
                    <span className="block text-[clamp(2.75rem,7vw,6rem)]">
                        <span className="editorial text-brand-blue">measurable</span>{" "}
                        <span className="editorial text-secondary/80">outcomes.</span>
                    </span>
                </motion.h2>

                <p className="mt-6 max-w-2xl text-secondary text-base md:text-lg leading-relaxed border-l border-brand-blue/30 pl-4">
                    If you&apos;re hiring a Head, Director or VP of Transformation — or sourcing
                    on behalf of a client who is — the fastest way to start a conversation is below.
                </p>

                {/* CTA row */}
                <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
                    <Link
                        href="/contact"
                        data-cursor="contact"
                        className="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-brand-blue text-deep font-bold text-sm tracking-wide hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-section-tinted transition-colors duration-200"
                    >
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-deep text-brand-blue group-hover:bg-page transition-colors">
                            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        Start a conversation
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </Link>

                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="connect"
                            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-blue/40 text-white font-medium text-sm tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                        >
                            <Linkedin className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                            LinkedIn
                        </a>
                    )}

                    <a
                        href={resumeUrl}
                        download
                        data-cursor="download"
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent text-secondary font-medium text-sm tracking-wide border border-white/10 hover:text-white hover:border-brand-blue/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Résumé PDF
                    </a>
                </div>
            </div>

            {/* Meta grid */}
            <div className="container-wide grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 py-10 border-t border-border">
                <div className="col-span-2 md:col-span-4 space-y-3">
                    <span className="label-mono text-tertiary">PROFILE</span>
                    <p className="text-primary font-display text-2xl tracking-tight leading-tight">
                        Abolfazl <span className="editorial text-secondary/90">Shirkavand</span>
                    </p>
                    <p className="text-tertiary text-sm">
                        Process Excellence · Digital Transformation
                    </p>
                </div>

                <div className="col-span-1 md:col-span-3 space-y-3">
                    <span className="label-mono text-tertiary">DIRECT CHANNEL</span>
                    <ul className="space-y-1.5">
                        <li>
                            <a
                                href="mailto:hello@abosh.io"
                                className="group inline-flex items-center gap-2 text-secondary hover:text-brand-blue transition-colors"
                                data-cursor="email"
                            >
                                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                                <span className="text-sm">hello@abosh.io</span>
                            </a>
                        </li>
                        {linkedin && (
                            <li>
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-secondary hover:text-brand-blue transition-colors"
                                    data-cursor="connect"
                                >
                                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span className="text-sm">in/abolfazl-shirkavand</span>
                                </a>
                            </li>
                        )}
                        {location && (
                            <li className="label-mono text-tertiary">
                                {`[ ${location.toUpperCase()} ]`}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="col-span-1 md:col-span-3 space-y-3">
                    <span className="label-mono text-tertiary">QUICK NAV</span>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                        {QUICK_LINKS.map((q) => (
                            <li key={q.id}>
                                <a
                                    href={`#${q.id}`}
                                    className="text-secondary hover:text-brand-blue transition-colors inline-flex items-center gap-1"
                                >
                                    <span aria-hidden="true" className="text-brand-blue/60">·</span>
                                    {q.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-2 md:col-span-2 space-y-3 md:text-right">
                    <span className="label-mono text-tertiary">STATUS</span>
                    <div className="space-y-1">
                        <p className="label-mono inline-flex items-center gap-2 text-online">
                            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                            AVAILABLE
                        </p>
                        <p className="label-mono text-tertiary">FOR HEAD / DIR / VP</p>
                        <p className="label-mono text-tertiary">TRANSFORMATION ROLES</p>
                    </div>
                </div>
            </div>

            {/* Giant year flourish */}
            <div className="container-wide pt-2 pb-6 flex items-end justify-between gap-6 border-t border-border">
                <div className="flex items-center gap-3 text-tertiary">
                    <span className="label-mono">© 2026 · ABOLFAZL SHIRKAVAND</span>
                </div>
                <motion.span
                    aria-hidden="true"
                    style={{ scale: yearScale }}
                    className="font-editorial italic text-brand-blue/80 tabular-nums leading-none origin-bottom-right"
                >
                    <span className="block text-[clamp(4rem,12vw,11rem)]">2026</span>
                </motion.span>
            </div>

            {/* Subtle scan-line at very bottom */}
            <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: easings.ui }}
                className="h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent origin-left"
            />
        </footer>
    );
}
