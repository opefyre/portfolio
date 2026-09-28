import type { ProblemGlyph as Glyph } from "@/content/site";

/**
 * Small line diagrams for each problem — illustrative, not decorative:
 * each one sketches the actual mechanism of the problem.
 */
export function ProblemGlyph({ type }: { type: Glyph }) {
  const common = { width: 132, height: 72, viewBox: "0 0 132 72", fill: "none", "aria-hidden": true } as const;
  switch (type) {
    case "signal":
      // live machine signal — a stop, caught as it happens
      return (
        <svg {...common} className="glyph glyph--signal">
          <path d="M4 44 L18 40 L26 46 L34 34 L42 42 L50 38 L56 38 L56 60 L78 60 L78 40 L88 36 L96 44 L104 30 L112 40" stroke="currentColor" strokeWidth="1.25" />
          <line x1="56" y1="66" x2="78" y2="66" stroke="currentColor" strokeWidth="1" opacity=".45" />
          <circle cx="112" cy="40" r="3" className="glyph-live" />
        </svg>
      );
    case "gantt":
      // workload across stations, balanced
      return (
        <svg {...common} className="glyph glyph--gantt">
          {[
            [8, 12, 46],
            [36, 26, 52],
            [20, 40, 58],
            [60, 54, 50],
          ].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height={7} rx={1.5} stroke="currentColor" strokeWidth="1.1" className="glyph-bar" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
          <line x1="4" y1="66" x2="128" y2="66" stroke="currentColor" strokeWidth="1" opacity=".4" />
        </svg>
      );
    case "compress":
      // launch lead time: ~5 months → ~2 months (real figures)
      return (
        <svg {...common} className="glyph glyph--compress">
          <rect x="8" y="18" width="110" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1" opacity=".45" />
          <rect x="8" y="42" width="44" height="10" rx="1.5" fill="currentColor" className="glyph-fill" />
          <text x="122" y="27" fontSize="9" fill="currentColor" opacity=".6" fontFamily="var(--font-mono)">5</text>
          <text x="58" y="51" fontSize="9" fill="currentColor" fontFamily="var(--font-mono)">2 mo</text>
        </svg>
      );
    case "defects":
      // a line of units; defects caught early, not at the end
      return (
        <svg {...common} className="glyph glyph--defects">
          <line x1="4" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="1" opacity=".35" />
          {Array.from({ length: 11 }, (_, i) => (
            <circle key={i} cx={10 + i * 11.2} cy={36} r={3} stroke="currentColor" strokeWidth="1.1" fill={i === 2 || i === 3 ? "currentColor" : "none"} className={i === 2 || i === 3 ? "glyph-hit" : undefined} />
          ))}
          <path d="M30 22 L30 28 M41 22 L41 28" stroke="currentColor" strokeWidth="1.1" />
          <path d="M26 18 H45" stroke="currentColor" strokeWidth="1" opacity=".6" />
        </svg>
      );
    case "flow":
      // request → approval → provisioned, without hand-offs
      return (
        <svg {...common} className="glyph glyph--flow">
          {[14, 60, 106].map((x, i) => (
            <rect key={i} x={x - 10} y={26} width={20} height={20} rx={4} stroke="currentColor" strokeWidth="1.1" />
          ))}
          <path d="M24 36 H50 M70 36 H96" stroke="currentColor" strokeWidth="1.1" className="glyph-dash" />
          <path d="M101 36 l4 4 l8 -8" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "dialog":
      // ask the company, get a sourced answer
      return (
        <svg {...common} className="glyph glyph--dialog">
          <rect x="8" y="12" width="64" height="18" rx="9" stroke="currentColor" strokeWidth="1.1" />
          <rect x="50" y="38" width="74" height="22" rx="11" stroke="currentColor" strokeWidth="1.1" />
          <line x1="62" y1="49" x2="100" y2="49" stroke="currentColor" strokeWidth="1" opacity=".6" />
          <circle cx="110" cy="49" r="2" fill="currentColor" className="glyph-live" />
        </svg>
      );
  }
}
