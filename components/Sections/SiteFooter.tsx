"use client";

import { motion } from "framer-motion";
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

/**
 * Editorial footer designed to fit exactly one viewport tall (100dvh).
 *
 * Lives at the bottom of the stack-reveal container in app/page.tsx — slides
 * UP over the sticky Selected Work stage as user scrolls. Layout uses
 * grid-rows-[auto_1fr_auto_auto] so the CTA expands to fill available height
 * regardless of viewport size; everything stays in-frame.
 */
export default function SiteFooter({ location, linkedin, resumeUrl }: SiteFooterProps) {
    return (
        <footer
            className="relative w-full bg-section-tinted border-t border-brand-blue/30 overflow-hidden flex flex-col"
            aria-labelledby="footer-cta"
            style={{ height: "100dvh", minHeight: "640px" }}
        >
            {/* ROW 1 — Top label bar */}
            <div className="container-wide flex items-center justify-between gap-4 border-b border-border py-3 text-tertiary shrink-0">
                <span className="label-mono bracket text-brand-blue">SYS.OUT</span>
                <span className="label-mono">END OF TRANSMISSION</span>
            </div>

            {/* ROW 2 — Editorial CTA — flex-1 to fill available space */}
            <div className="container-wide flex-1 min-h-0 flex flex-col justify-center py-8 md:py-10 relative">
                <div className="flex items-center gap-3 text-tertiary mb-4">
                    <span className="label-mono text-brand-blue">[ NEXT STEP ]</span>
                    <span aria-hidden="true" className="h-px w-12 bg-brand-blue/40" />
                    <span className="label-mono">OPEN CHANNEL</span>
                </div>

                <h2
                    id="footer-cta"
                    className="font-display font-medium tracking-[-0.025em] text-primary leading-[0.9]"
                    style={{ fontSize: "clamp(2.25rem, min(6.5vw, 11vh), 6rem)" }}
                >
                    Let&apos;s engineer{" "}
                    <span className="editorial text-brand-blue">measurable</span>{" "}
                    <span className="editorial text-secondary/80">outcomes.</span>
                </h2>

                <p
                    className="mt-4 md:mt-5 max-w-2xl text-secondary leading-relaxed border-l border-brand-blue/30 pl-4"
                    style={{ fontSize: "clamp(0.875rem, 1.4vh, 1.0625rem)" }}
                >
                    Hiring a Head, Director or VP of Transformation — or sourcing on behalf
                    of a client who is? The fastest way to start a conversation is below.
                </p>

                {/* CTA row */}
                <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4">
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

            {/* ROW 3 — Compact meta grid */}
            <div className="container-wide grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 py-5 border-t border-border shrink-0">
                <div className="col-span-2 md:col-span-4 space-y-1">
                    <span className="label-mono text-tertiary">PROFILE</span>
                    <p className="text-primary font-display text-lg md:text-xl tracking-tight leading-tight">
                        Abolfazl <span className="editorial text-secondary/90">Shirkavand</span>
                    </p>
                    <p className="label-mono text-tertiary">PROCESS EXCELLENCE · DIGITAL TRANSFORMATION</p>
                </div>

                <div className="col-span-1 md:col-span-3 space-y-1.5">
                    <span className="label-mono text-tertiary">DIRECT CHANNEL</span>
                    <a
                        href="mailto:hello@abosh.io"
                        className="block text-secondary hover:text-brand-blue transition-colors text-sm inline-flex items-center gap-2"
                        data-cursor="email"
                    >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        hello@abosh.io
                    </a>
                    {location && (
                        <p className="label-mono text-tertiary">{`[ ${location.toUpperCase()} ]`}</p>
                    )}
                </div>

                <div className="col-span-1 md:col-span-3 space-y-1.5">
                    <span className="label-mono text-tertiary">QUICK NAV</span>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-sm">
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

                <div className="col-span-2 md:col-span-2 space-y-1.5 md:text-right">
                    <span className="label-mono text-tertiary">STATUS</span>
                    <p className="label-mono inline-flex items-center gap-2 text-online md:justify-end md:w-full">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                        AVAILABLE
                    </p>
                    <p className="label-mono text-tertiary">HEAD / DIR / VP ROLES</p>
                </div>
            </div>

            {/* ROW 4 — Copyright + year flourish */}
            <div className="container-wide pt-2 pb-4 flex items-end justify-between gap-6 border-t border-border shrink-0">
                <span className="label-mono text-tertiary">© 2026 · ABOLFAZL SHIRKAVAND</span>
                <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easings.ui }}
                    className="font-editorial italic text-brand-blue/80 tabular-nums leading-none origin-bottom-right"
                    style={{ fontSize: "clamp(2.25rem, min(8vw, 10vh), 6rem)" }}
                >
                    2026
                </motion.span>
            </div>

            {/* Bottom scan-line */}
            <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: easings.ui }}
                className="h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent origin-left shrink-0"
            />
        </footer>
    );
}
