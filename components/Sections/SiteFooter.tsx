"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Linkedin, Download } from "lucide-react";
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
 * Editorial footer — exactly one viewport tall.
 *
 * Signature design moments kept: the big editorial CTA headline, the giant
 * decorative italic '2026' watermark, the pulsing AVAILABLE indicator.
 * Everything else (column labels, kickers, AI-style paragraph copy,
 * duplicate name) stripped. Background uses a distinct deep-plum tone so
 * the footer reads as its own surface, not 'another dark blue section'.
 */
export default function SiteFooter({ linkedin, resumeUrl }: SiteFooterProps) {
    return (
        <footer
            aria-labelledby="footer-cta"
            className="relative w-full overflow-hidden flex flex-col"
            style={{
                height: "100dvh",
                minHeight: "640px",
                // Distinct surface: warm near-black with a subtle plum undertone
                background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(56,189,248,0.07), transparent 55%), linear-gradient(180deg, #0b0612 0%, #07040d 100%)",
            }}
        >
            {/* Top edge: brand-blue scan-line, the only marker of the section boundary */}
            <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: easings.ui }}
                className="h-px bg-gradient-to-r from-transparent via-brand-blue/70 to-transparent origin-left shrink-0"
            />

            {/* Giant decorative '2026' — soft, low-opacity watermark anchored bottom-right */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none select-none leading-none"
                style={{
                    right: "-1vw",
                    bottom: "12vh",
                    fontFamily: "var(--font-editorial)",
                    fontStyle: "italic",
                    color: "rgba(56,189,248,0.08)",
                    fontSize: "clamp(8rem, 26vw, 22rem)",
                    letterSpacing: "-0.04em",
                }}
            >
                2026
            </div>

            {/* MAIN: big headline + minimal CTAs, vertically centered */}
            <div className="container-wide flex-1 min-h-0 flex flex-col justify-center relative">
                <h2
                    id="footer-cta"
                    className="font-display font-medium tracking-[-0.025em] text-primary leading-[0.9] max-w-4xl"
                    style={{ fontSize: "clamp(2.5rem, min(7vw, 12vh), 7rem)" }}
                >
                    Let&apos;s engineer{" "}
                    <span className="editorial text-brand-blue">measurable</span>{" "}
                    <span className="editorial text-secondary/80">outcomes.</span>
                </h2>

                {/* Minimal CTAs — Mail is primary, LinkedIn + CV are secondary */}
                <div className="mt-10 md:mt-12 flex items-center gap-3 flex-wrap">
                    <Link
                        href="/contact"
                        data-cursor="contact"
                        aria-label="Contact"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-deep hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-deep transition-colors duration-200"
                    >
                        <Mail className="w-5 h-5" aria-hidden="true" strokeWidth={2.4} />
                    </Link>

                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="connect"
                            aria-label="LinkedIn"
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 text-brand-blue hover:bg-white/[0.08] hover:border-brand-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-deep transition-colors duration-200"
                        >
                            <Linkedin className="w-5 h-5" aria-hidden="true" />
                        </a>
                    )}

                    <a
                        href={resumeUrl}
                        download
                        data-cursor="download"
                        aria-label="Download CV"
                        className="group inline-flex items-center gap-2 h-12 px-5 rounded-full bg-white/[0.04] border border-white/10 text-secondary hover:text-white hover:border-brand-blue/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-deep transition-colors duration-200 font-bold text-sm tracking-wide"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" strokeWidth={2.4} />
                        CV
                    </a>
                </div>
            </div>

            {/* BOTTOM: single compact meta row, NO column labels */}
            <div className="container-wide border-t border-white/10 py-4 shrink-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 relative">
                {/* Left: single copyright (one name only) */}
                <span className="label-mono text-tertiary">
                    © 2026 · Abolfazl Shirkavand
                </span>

                {/* Center: inline nav, no heading */}
                <nav aria-label="Page sections" className="flex items-center gap-3 md:gap-5 flex-wrap">
                    {QUICK_LINKS.map((q) => (
                        <a
                            key={q.id}
                            href={`#${q.id}`}
                            className="label-mono text-tertiary hover:text-brand-blue transition-colors"
                        >
                            {q.name}
                        </a>
                    ))}
                </nav>

                {/* Right: status pip */}
                <span className="label-mono inline-flex items-center gap-2 text-online">
                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                    AVAILABLE
                </span>
            </div>
        </footer>
    );
}
