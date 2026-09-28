"use client";

import type { CSSProperties } from "react";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { LensFragment } from "@/components/lens/LensFragment";
import { fragments } from "@/content/site";

/**
 * Asymmetric composition. Positions are percentages of the field so the
 * layout scales; each fragment's DOM box is the layout source for its WebGL
 * mirror (the DOM text itself is transparent — the visible text is rendered
 * in the lens scene so the glass can genuinely refract it).
 */
const LAYOUT: [x: string, y: string, mobileX: string, mobileY: string][] = [
  ["3%", "6%", "0%", "3%"],
  ["50%", "17%", "30%", "13%"],
  ["82%", "4%", "60%", "24%"],
  ["9%", "40%", "4%", "33%"],
  ["36%", "54%", "0%", "47%"],
  ["63%", "38%", "30%", "60%"],
  ["74%", "74%", "38%", "73%"],
  ["7%", "80%", "4%", "87%"],
];
const place = ([x, y, mx, my]: (typeof LAYOUT)[number]) =>
  ({ "--x": x, "--y": y, "--mx": mx, "--my": my }) as CSSProperties;

export function Outside() {
  return (
    <section id="outside" className="section outside" data-nav-tone="dark" aria-labelledby="outside-title">
      <div className="frame">
        <p className="section-index">
          <span>05</span>
        </p>
        <div className="outside-head">
          <h2 id="outside-title" className="t-h2">
            Outside the
            <br />
            job description
          </h2>
          <p className="t-body outside-hint">
            <span className="hint-pointer">Move the lens over anything below.</span>
            <span className="hint-touch">Drag the lens over anything below.</span>
            <span className="hint-tail"> It shows what&rsquo;s underneath.</span>
            <span className="hint-fallback">Each one has a note underneath.</span>
          </p>
        </div>

        <LensAnchor id="outside" className="outside-field" interactive sizeRatio={0.42} minSize={230} thickness={0.42} plateLines={0} plateHalo={0.55}>
          {fragments.map((f, i) => (
            <LensFragment
              key={f.surface}
              anchorId="outside"
              id={`frag-${i}`}
              surface={f.surface}
              through={f.through}
              kind={f.style}
              style={place(LAYOUT[i])}
            />
          ))}
        </LensAnchor>
      </div>
    </section>
  );
}
