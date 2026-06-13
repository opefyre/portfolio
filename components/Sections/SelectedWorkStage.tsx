"use client";

import { ReactNode } from "react";

interface SelectedWorkStageProps {
    children: ReactNode;
    /** Total number of programs (shown on the marquee stripe). */
    totalCount: number;
}

/**
 * Distinctive 'projector stage' frame for the Selected Work section.
 *
 * Designed to live inside a sticky-reveal container — the parent in
 * app/page.tsx makes this section sticky at top:0 h:100vh while the
 * footer scrolls up over it. No scroll-tied entrance here; the sticky
 * behaviour is the entrance.
 */
export default function SelectedWorkStage({ children, totalCount }: SelectedWorkStageProps) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-section-tinted flex flex-col">
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

            {/* Ambient decoration layers */}
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

            {/* Corner brackets */}
            <span aria-hidden="true" className="absolute top-14 left-4 md:left-8 w-4 h-4 border-l border-t border-brand-blue/40" />
            <span aria-hidden="true" className="absolute top-14 right-4 md:right-8 w-4 h-4 border-r border-t border-brand-blue/40" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 md:left-8 w-4 h-4 border-l border-b border-brand-blue/40" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 md:right-8 w-4 h-4 border-r border-b border-brand-blue/40" />

            {/* Stage content fills available height; ProjectGallery handles its own internal layout */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto custom-scrollbar" data-lenis-prevent>
                {children}
            </div>
        </div>
    );
}
