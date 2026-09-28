import type { PathStage } from "@/content/site";

/**
 * Each era gets a material — a line drawing of the environment it happened in.
 * Illustrative diagrams, drawn in the same engraved language as the lens plate.
 */
export function PathMaterial({ kind }: { kind: PathStage["material"] }) {
  const svg = { viewBox: "0 0 240 150", fill: "none", stroke: "currentColor", strokeWidth: 1, "aria-hidden": true } as const;
  switch (kind) {
    case "drafting":
      // orthographic drawing of a flanged part, with centre lines and a dimension
      return (
        <svg {...svg} className="material">
          <circle cx="92" cy="76" r="40" />
          <circle cx="92" cy="76" r="16" />
          {[0, 90, 180, 270].map((a) => (
            <circle key={a} cx={92 + 28 * Math.cos((a * Math.PI) / 180)} cy={76 + 28 * Math.sin((a * Math.PI) / 180)} r="4" />
          ))}
          <path d="M40 76 H144 M92 24 V128" strokeDasharray="6 3 1 3" opacity=".5" />
          <rect x="160" y="36" width="44" height="80" />
          <path d="M160 60 H204 M160 92 H204" opacity=".5" />
          <path d="M52 136 H132 M52 132 V140 M132 132 V140" opacity=".7" />
          <text x="80" y="148" fontSize="8" fill="currentColor" stroke="none" fontFamily="var(--font-mono)">Ø 80</text>
        </svg>
      );
    case "carton":
      // a pallet of cartons — FMCG lines
      return (
        <svg {...svg} className="material">
          {Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <g key={`${r}-${c}`} transform={`translate(${28 + c * 46 + (r % 2) * 10}, ${28 + r * 34})`}>
                <path d="M0 10 L20 0 L40 10 L20 20 Z" />
                <path d="M0 10 V26 L20 36 V20 M40 10 V26 L20 36" />
              </g>
            )),
          )}
        </svg>
      );
    case "launch":
      // launch lead time — the real 5 → 2 month compression
      return (
        <svg {...svg} className="material">
          <path d="M20 40 H220" opacity=".35" />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${20 + i * 40} 36 V44`} opacity=".5" />
          ))}
          <rect x="20" y="56" width="200" height="14" rx="2" opacity=".5" />
          <rect x="20" y="92" width="80" height="14" rx="2" fill="currentColor" className="material-accent" />
          <text x="24" y="30" fontSize="8" fill="currentColor" stroke="none" fontFamily="var(--font-mono)">months</text>
          <text x="226" y="67" fontSize="9" fill="currentColor" stroke="none" fontFamily="var(--font-mono)" textAnchor="end" opacity=".6">5</text>
          <text x="106" y="103" fontSize="9" fill="currentColor" stroke="none" fontFamily="var(--font-mono)">2</text>
        </svg>
      );
    case "flow":
      // integrations named in the Snoonu role: ERP, Jira, Slack, Notion
      return (
        <svg {...svg} className="material">
          {[
            ["ERP", 40, 40],
            ["Jira", 200, 40],
            ["Slack", 40, 112],
            ["Notion", 200, 112],
          ].map(([label, x, y]) => (
            <g key={label as string}>
              <rect x={(x as number) - 26} y={(y as number) - 12} width="52" height="24" rx="12" />
              <text x={x as number} y={(y as number) + 3} fontSize="8.5" fill="currentColor" stroke="none" fontFamily="var(--font-mono)" textAnchor="middle">{label}</text>
            </g>
          ))}
          <circle cx="120" cy="76" r="16" />
          <path d="M66 46 L106 68 M174 46 L134 68 M66 106 L106 84 M174 106 L134 84" strokeDasharray="3 3" />
        </svg>
      );
    case "signal":
      // machine signal and the three factors of OEE
      return (
        <svg {...svg} className="material">
          <path d="M10 70 L30 62 L44 72 L58 50 L72 66 L86 58 L100 58 L100 96 L128 96 L128 60 L144 54 L158 66 L172 44 L186 58 L200 52 L230 60" />
          <path d="M10 118 H230" opacity=".35" />
          {["A", "P", "Q"].map((l, i) => (
            <text key={l} x={60 + i * 60} y={138} fontSize="9" fill="currentColor" stroke="none" fontFamily="var(--font-mono)" textAnchor="middle">{l}</text>
          ))}
          <text x="120" y="24" fontSize="8" fill="currentColor" stroke="none" fontFamily="var(--font-mono)" textAnchor="middle" opacity=".6">OEE = A × P × Q</text>
        </svg>
      );
    case "loop":
      // the improvement cycle Vrolen connects end to end
      return (
        <svg {...svg} className="material">
          {["evidence", "finding", "decision", "change", "verify", "standard"].map((l, i, arr) => {
            const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
            const x = 120 + Math.cos(a) * 58;
            const y = 76 + Math.sin(a) * 50;
            return (
              <g key={l}>
                <circle cx={x} cy={y} r="3" fill={l === "verify" ? "currentColor" : "none"} className={l === "verify" ? "material-accent" : undefined} />
                <text x={x + (Math.cos(a) > 0.2 ? 8 : Math.cos(a) < -0.2 ? -8 : 0)} y={y + (Math.sin(a) > 0.5 ? 14 : Math.sin(a) < -0.5 ? -8 : 3)} fontSize="8" fill="currentColor" stroke="none" fontFamily="var(--font-mono)" textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"}>{l}</text>
              </g>
            );
          })}
          <ellipse cx="120" cy="76" rx="58" ry="50" opacity=".4" strokeDasharray="2 4" />
        </svg>
      );
  }
}
