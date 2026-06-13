"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { Skill, Certification, Education } from "@/lib/db";
import SectionHeader from "@/components/UI/SectionHeader";
import GlassTerminal from "@/components/UI/GlassTerminal";
import { ShieldCheck, GraduationCap, ArrowDownRight } from "lucide-react";
import { easings } from "@/lib/motion";
import clsx from "clsx";

// ---------- helpers --------------------------------------------------------

function lastYearOfPeriod(period: string | undefined): string | null {
    if (!period) return null;
    if (/\b(present|current|now|ongoing)\b/i.test(period)) return "Present";
    const m = Array.from(period.matchAll(/\b(19|20)\d{2}\b/g));
    if (m.length === 0) return null;
    return m[m.length - 1][0];
}
function firstYearOfPeriod(period: string | undefined): string | null {
    if (!period) return null;
    const m = period.match(/\b(19|20)\d{2}\b/);
    return m ? m[0] : null;
}

type Item =
    | { kind: "cert"; title: string; subtitle?: string; year: string; sortYear: number }
    | { kind: "degree"; title: string; subtitle?: string; periodLabel: string; year: string; sortYear: number };

function buildChronicle(certs: Certification[], edu: Education[]): Array<[string, Item[]]> {
    const items: Item[] = [];

    for (const c of certs) {
        const y = c.year && c.year.trim() ? c.year.trim() : "Undated";
        const sortY = parseInt(y, 10);
        items.push({
            kind: "cert",
            title: c.name,
            subtitle: c.issuer,
            year: y,
            sortYear: Number.isFinite(sortY) ? sortY : -Infinity,
        });
    }

    for (const e of edu) {
        const end = lastYearOfPeriod(e.period);
        const start = firstYearOfPeriod(e.period);
        const display = end ?? start ?? "Undated";
        const sortY = parseInt(end ?? start ?? "0", 10);
        items.push({
            kind: "degree",
            title: e.degree,
            subtitle: e.institution,
            periodLabel: e.period,
            year: display === "Present" ? "Present" : display,
            sortYear: Number.isFinite(sortY) ? sortY : -Infinity,
        });
    }

    const groups = new Map<string, Item[]>();
    for (const it of items) {
        const key = it.year;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(it);
    }

    return Array.from(groups.entries()).sort(([a, av], [b, bv]) => {
        if (a === "Present") return -1;
        if (b === "Present") return 1;
        if (a === "Undated") return 1;
        if (b === "Undated") return -1;
        // Use max sortYear within the group as the chapter rank
        const av0 = Math.max(...av.map((x) => x.sortYear));
        const bv0 = Math.max(...bv.map((x) => x.sortYear));
        return bv0 - av0;
    });
}

// ---------- card layouts --------------------------------------------------

const SPAN_PATTERNS = [
    "col-span-12 md:col-span-7",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-4",
    "col-span-12 md:col-span-8",
    "col-span-12 md:col-span-6",
    "col-span-12 md:col-span-6",
];

const ENTRANCE_PATTERNS: Array<{ x: number; y: number; rotate: number }> = [
    { x: -30, y: 14, rotate: -1.8 },
    { x: 30, y: 0, rotate: 1.4 },
    { x: 0, y: 28, rotate: 0 },
    { x: -10, y: -8, rotate: 2.4 },
    { x: 20, y: 16, rotate: -1.2 },
    { x: -22, y: -4, rotate: 0.8 },
];

function CredentialCard({ item, idx }: { item: Item; idx: number }) {
    const span = SPAN_PATTERNS[idx % SPAN_PATTERNS.length];
    const enter = ENTRANCE_PATTERNS[idx % ENTRANCE_PATTERNS.length];

    return (
        <motion.article
            initial={{ opacity: 0, x: enter.x, y: enter.y, rotate: enter.rotate }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            whileHover={{ y: -8, scale: 1.015, rotate: 0, transition: { duration: 0.25, ease: easings.ui } }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                ease: easings.ui,
                delay: 0.04 * (idx % 6),
            }}
            className={clsx(
                "group/card relative rounded-[28px] border border-border bg-deep/40 backdrop-blur-md",
                "p-6 md:p-7 overflow-hidden cursor-default",
                "transition-colors duration-300",
                "hover:border-brand-blue/40 hover:bg-deep/60",
                "[box-shadow:0_20px_40px_-25px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]",
                "hover:[box-shadow:0_30px_50px_-25px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]",
                span,
            )}
        >
            {/* Corner brackets fade in on hover */}
            <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-l border-t border-brand-blue/0 group-hover/card:border-brand-blue/60 transition-colors duration-300" />
            <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-r border-t border-brand-blue/0 group-hover/card:border-brand-blue/60 transition-colors duration-300" />
            <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-brand-blue/0 group-hover/card:border-brand-blue/60 transition-colors duration-300" />
            <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-brand-blue/0 group-hover/card:border-brand-blue/60 transition-colors duration-300" />

            {/* Inner glow on hover */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(56,189,248,0.10), transparent 70%)" }}
            />

            <div className="relative flex flex-col h-full justify-between gap-4 min-h-[160px]">
                {/* Top row: kind badge + index */}
                <div className="flex items-center justify-between gap-3">
                    {item.kind === "cert" ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/25 text-brand-blue label-mono">
                            <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                            AUTHORIZATION
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple label-mono">
                            <GraduationCap className="w-3 h-3" aria-hidden="true" />
                            ACADEMIA
                        </span>
                    )}
                    <span className="label-mono text-tertiary tabular-nums">#{String(idx + 1).padStart(2, "0")}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-medium text-primary text-xl md:text-2xl leading-tight tracking-[-0.01em]">
                    {item.title}
                </h3>

                {/* Bottom row: subtitle + year */}
                <div className="flex items-end justify-between gap-3 flex-wrap mt-auto">
                    <div className="flex flex-col gap-0.5 min-w-0">
                        {item.subtitle && (
                            <span className="label-mono text-brand-blue/90 truncate">
                                {item.subtitle}
                            </span>
                        )}
                        {item.kind === "degree" && (
                            <span className="label-mono text-tertiary truncate">{item.periodLabel}</span>
                        )}
                    </div>
                    <span className="font-editorial italic text-brand-blue/80 text-2xl md:text-3xl leading-none tabular-nums shrink-0">
                        {item.year}
                    </span>
                </div>
            </div>
        </motion.article>
    );
}

// ---------- year chapter --------------------------------------------------

function YearChapter({ year, items, chapterIdx }: { year: string; items: Item[]; chapterIdx: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 20%"],
    });
    const yearOpacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
    const yearY = useTransform(scrollYProgress, [0, 1], [40, -20]);
    const yearLetterSpacing = useTransform(scrollYProgress, [0, 1], ["0.06em", "-0.025em"]);

    const counts = useMemo(() => {
        let c = 0;
        let d = 0;
        for (const it of items) {
            if (it.kind === "cert") c++;
            else d++;
        }
        return { c, d };
    }, [items]);

    return (
        <div
            ref={ref}
            className="relative pt-16 md:pt-24 first:pt-0 pb-2"
            style={{ contain: "layout" as const }}
        >
            {/* Editorial year display — scroll-tied opacity + parallax + tracking */}
            <motion.div
                style={{ opacity: yearOpacity, y: yearY }}
                className="flex flex-wrap items-end gap-x-6 md:gap-x-10 gap-y-4 mb-10 md:mb-14"
            >
                <motion.span
                    style={{ letterSpacing: yearLetterSpacing }}
                    className={clsx(
                        "font-editorial italic text-brand-blue leading-[0.82] tabular-nums",
                        year === "Present" ? "text-online" : "",
                    )}
                    aria-hidden="false"
                >
                    <span style={{ fontSize: "clamp(5rem, 14vw, 14rem)" }}>{year}</span>
                </motion.span>

                <div className="flex flex-col gap-1.5 pb-3 md:pb-6">
                    <span className="label-mono text-brand-blue">
                        CHAPTER · {String(chapterIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3 text-tertiary">
                        <span className="label-mono tabular-nums">{items.length} CREDENTIAL{items.length === 1 ? "" : "S"}</span>
                        {counts.c > 0 && (
                            <span className="label-mono">· {counts.c} CRT</span>
                        )}
                        {counts.d > 0 && (
                            <span className="label-mono">· {counts.d} DEG</span>
                        )}
                    </div>
                    <ArrowDownRight className="w-4 h-4 text-brand-blue/60" aria-hidden="true" />
                </div>
            </motion.div>

            {/* Asymmetric brutalist grid — varied col-spans + entrance directions */}
            <div className="grid grid-cols-12 gap-4 md:gap-5 [&:hover_>_article]:opacity-50 [&_article:hover]:opacity-100 [&_article]:transition-opacity">
                {items.map((item, idx) => (
                    <CredentialCard key={`${item.title}-${idx}`} item={item} idx={idx} />
                ))}
            </div>
        </div>
    );
}

// ---------- main section --------------------------------------------------

export default function ExpertiseSection({
    skills,
    certifications,
    education,
}: {
    skills: Skill[];
    certifications: Certification[];
    education: Education[];
}) {
    const chapters = useMemo(
        () => buildChronicle(certifications, education),
        [certifications, education],
    );
    const totalCount = certifications.length + education.length;

    // Background gradient angle tied to overall scroll progress through the chronicle
    const chronicleRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: chronicleScroll } = useScroll({
        target: chronicleRef,
        offset: ["start end", "end start"],
    });
    const bgRotate = useTransform(chronicleScroll, [0, 1], [0, 60]);
    const bgY = useTransform(chronicleScroll, [0, 1], ["-10%", "10%"]);

    return (
        <section className="container-wide section-padding space-y-24 md:space-y-32">
            {/* PART 1: PREMIUM GLASS TERMINAL (unchanged) */}
            <div id="expertise" className="container-wide scroll-mt-32">
                <SectionHeader
                    kicker="COMPETENCIES"
                    title="Technical command center"
                    subtitle="The systems, methods and platforms I bring to enterprise transformation work."
                />

                <div className="mt-12 md:mt-24 w-full flex justify-center px-4 md:px-0">
                    <GlassTerminal skills={skills} />
                </div>
            </div>

            {/* PART 2: EDITORIAL CHRONICLE — credentials grouped into year chapters */}
            <div
                id="credentials"
                ref={chronicleRef}
                className="container max-w-7xl mx-auto px-4 md:px-6 scroll-mt-32 relative"
            >
                {/* Scroll-tied background gradient mesh */}
                <motion.div
                    aria-hidden="true"
                    style={{
                        rotate: bgRotate,
                        y: bgY,
                    }}
                    className="absolute -inset-x-32 -top-32 -bottom-32 pointer-events-none -z-10 opacity-30"
                >
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/15 blur-[140px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full" />
                </motion.div>

                {/* Editorial header */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="label-mono bracket text-brand-blue">CHRONICLE</span>
                        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                        <span className="label-mono text-tertiary tabular-nums">
                            {String(totalCount).padStart(2, "0")} TOTAL
                        </span>
                    </div>

                    <h2 className="font-display font-medium text-primary leading-[0.92] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                        Credentials,{" "}
                        <span className="editorial text-secondary/85">chronicled by year.</span>
                    </h2>
                    <p className="mt-5 max-w-2xl text-secondary text-base md:text-lg leading-relaxed">
                        Industry authorizations and formal degrees, grouped into chapters.
                        Hover any card to focus it — the rest of the chapter recedes.
                    </p>
                </div>

                {/* Mission control status bar */}
                <div className="flex items-center justify-between gap-3 border-t border-b border-border py-3 mb-2 text-tertiary">
                    <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full online-dot" />
                        <span className="label-mono">READOUT · LIVE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="label-mono">{chapters.length} CHAPTERS</span>
                        <span className="label-mono">{certifications.length} CRT</span>
                        <span className="label-mono">{education.length} DEG</span>
                    </div>
                </div>

                {/* Chapters */}
                <div className="relative">
                    {chapters.map(([year, items], idx) => (
                        <YearChapter key={year} year={year} items={items} chapterIdx={idx} />
                    ))}
                </div>

                {/* End marker */}
                <div className="mt-12 flex items-center justify-end gap-3 text-tertiary">
                    <span className="label-mono">— END OF CHRONICLE</span>
                    <span aria-hidden="true" className="h-px w-12 bg-brand-blue/30" />
                </div>
            </div>
        </section>
    );
}
