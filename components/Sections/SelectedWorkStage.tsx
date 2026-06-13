"use client";

import { ReactNode } from "react";

interface SelectedWorkStageProps {
    children: ReactNode;
    /** Total number of programs (shown on the marquee stripe). */
    totalCount: number;
}

/**
 * 'Projector stage' frame for the Selected Work section. Lives inside the
 * sticky-at-end reveal stack in app/page.tsx — natural flow height; no
 * internal overflow scroll. The parent's `sticky bottom-0` is what makes
 * the section lock at its end so the footer can rise over it.
 */
export default function SelectedWorkStage({ children, totalCount }: SelectedWorkStageProps) {
    return (
        <div className="relative w-full bg-section-tinted">
            {/* STAGE marquee header strip */}
            <div className="relative border-b border-brand-blue/15 bg-[linear-gradient(180deg,rgba(56,189,248,0.06),transparent)]">
                <div className="container-wide flex items-center justify-between gap-4 py-3 text-tertiary">
                    <div className="flex items-center gap-3">
                        <span className="label-mono bracket text-brand-blue">STAGE.05</span>
                        <span className="label-mono">SELECTED WORK · NOW PROJECTING</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                        <span className="label-mono text-brand-blue tabular-nums">
                            {String(totalCount).padStart(2, "0")} ENTRIES
                        </span>
                    </div>
                </div>
            </div>

            {/* Ambient decoration layers (no pointer events) */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Content flows naturally — page scroll handles overflow */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
