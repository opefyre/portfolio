"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { easings } from "@/lib/motion";

// Client-only — listens to pointer events, owns a canvas + rAF loop.
const FooterSketchTrail = dynamic(() => import("./FooterSketchTrail"), {
    ssr: false,
    loading: () => null,
});

interface SiteFooterProps {
    location?: string;
    linkedin?: string;
    github?: string;
    resumeUrl: string;
}

const QUICK_LINKS = [
    { name: "Overview", id: "overview" },
    { name: "History", id: "experience" },
    { name: "Skills", id: "expertise" },
    { name: "Education", id: "credentials" },
    // FEATURED_VENTURE (hidden) — restore alongside the section in app/page.tsx.
    // { name: "Venture", id: "venture" },
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
// Cream surface palette — a deliberate hard cut from the dark-blue body.
// Reads as a back-page editorial letter; the brand-blue CTAs pop on it.
const INK = "#0a0a0a";
const INK_MUTED = "rgba(10,10,10,0.62)";
const INK_FAINT = "rgba(10,10,10,0.42)";
const INK_HAIR = "rgba(10,10,10,0.12)";

export default function SiteFooter({ linkedin, github, resumeUrl }: SiteFooterProps) {
    return (
        <footer
            aria-labelledby="footer-cta"
            className="relative w-full overflow-hidden flex flex-col"
            style={{
                height: "100dvh",
                minHeight: "640px",
                // Warm bone/cream — maximum contrast against the dark blue body.
                background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(56,189,248,0.10), transparent 55%), linear-gradient(180deg, #F5EFE3 0%, #E8DECB 100%)",
                color: INK,
            }}
        >
            {/* Cursor leaves a fading sepia sketch line — sells the paper feel of the cream surface. */}
            <FooterSketchTrail />

            {/* Top edge: brand-blue scan-line — kept as the only thread tying back to the dark body. */}
            <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: easings.ui }}
                className="h-px bg-gradient-to-r from-transparent via-brand-blue/80 to-transparent origin-left shrink-0"
            />

            {/* Giant decorative '2026' — warm dark watermark, sits like a press date stamp on cream. */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none select-none leading-none"
                style={{
                    right: "-1vw",
                    bottom: "12vh",
                    fontFamily: "var(--font-editorial)",
                    fontStyle: "italic",
                    color: "rgba(31,18,5,0.07)",
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
                    className="font-display font-medium tracking-[-0.025em] leading-[0.9] max-w-4xl"
                    style={{ fontSize: "clamp(2.5rem, min(7vw, 12vh), 7rem)", color: INK }}
                >
                    Let&apos;s engineer{" "}
                    <span className="editorial text-brand-blue">measurable</span>{" "}
                    <span className="editorial" style={{ color: INK_MUTED }}>outcomes.</span>
                </h2>

                {/* Minimal CTAs — Mail is primary (brand-blue pops on cream), LinkedIn + CV are ink outlines. */}
                <div className="mt-10 md:mt-12 flex items-center gap-3 flex-wrap">
                    <Link
                        href="/contact"
                        data-cursor="contact"
                        aria-label="Contact"
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-deep hover:bg-brand-blue/90 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-all duration-300"
                        style={{ ['--tw-ring-offset-color' as string]: '#F5EFE3' }}
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
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-[rgba(10,10,10,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-colors duration-200"
                            style={{ border: `1px solid ${INK_HAIR}`, color: INK, ['--tw-ring-offset-color' as string]: '#F5EFE3' }}
                        >
                            <Linkedin className="w-5 h-5" aria-hidden="true" />
                        </a>
                    )}

                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="connect"
                            aria-label="GitHub"
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-[rgba(10,10,10,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-colors duration-200"
                            style={{ border: `1px solid ${INK_HAIR}`, color: INK, ['--tw-ring-offset-color' as string]: '#F5EFE3' }}
                        >
                            <Github className="w-5 h-5" aria-hidden="true" />
                        </a>
                    )}

                    <a
                        href={resumeUrl}
                        download
                        data-cursor="download"
                        aria-label="Download CV"
                        className="group inline-flex items-center gap-2 h-12 px-5 rounded-full bg-transparent hover:bg-[rgba(10,10,10,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-colors duration-200 font-bold text-sm tracking-wide"
                        style={{ border: `1px solid ${INK_HAIR}`, color: INK, ['--tw-ring-offset-color' as string]: '#F5EFE3' }}
                    >
                        <Download className="w-4 h-4" aria-hidden="true" strokeWidth={2.4} />
                        CV
                    </a>
                </div>
            </div>

            {/* BOTTOM: single compact meta row, NO column labels */}
            <div
                className="container-wide py-4 shrink-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 relative"
                style={{ borderTop: `1px solid ${INK_HAIR}` }}
            >
                {/* Left: single copyright (one name only) */}
                <span className="label-mono" style={{ color: INK_FAINT }}>
                    © 2026 · Abolfazl Shirkavand
                </span>

                {/* Center: inline nav, no heading */}
                <nav aria-label="Page sections" className="flex items-center gap-3 md:gap-5 flex-wrap">
                    {QUICK_LINKS.map((q) => (
                        <a
                            key={q.id}
                            href={`#${q.id}`}
                            className="label-mono hover:text-brand-blue transition-colors"
                            style={{ color: INK_FAINT }}
                        >
                            {q.name}
                        </a>
                    ))}
                </nav>

                {/* Right: status pip — keep brand-blue identity */}
                <span className="label-mono inline-flex items-center gap-2 text-brand-blue">
                    <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                    AVAILABLE
                </span>
            </div>
        </footer>
    );
}
