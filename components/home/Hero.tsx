"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/components/shell/useReducedMotionSafe";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { hero, site } from "@/content/site";

export function Hero({ first, last }: { first: string; last: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Typography separates in depth as the hero leaves: lines travel at
  // slightly different rates, never more than a few percent.
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-38%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-18%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.15]);

  return (
    <section ref={ref} className="hero" data-nav-tone="dark" aria-labelledby="hero-name">
      <div className="frame hero-frame">
        <div className="hero-copy">
          <p className="hero-kicker t-mono">
            <span className="hero-kicker-aka">{site.nickname}</span>
            <span aria-hidden="true" className="hero-kicker-rule" />
            <span>{site.role}</span>
          </p>

          <h1 id="hero-name" className="t-name hero-name">
            <motion.span className="hero-line" style={{ y: y1, opacity: fade }}>
              <span className="hero-line-inner">{first}</span>
            </motion.span>{" "}
            <motion.span className="hero-line hero-line--2" style={{ y: y2, opacity: fade }}>
              <span className="hero-line-inner">{last}</span>
            </motion.span>
          </h1>

          <motion.div className="hero-sub" style={{ y: y3 }}>
            <p className="t-lead hero-statement">{hero.statement}</p>
            <ul className="hero-disciplines t-mono" aria-label="Disciplines">
              {hero.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="hero-lens-area">
          <LensAnchor id="hero" className="hero-lens" sizeRatio={0.92} plateLines={1} plateHalo={1} priority={1} />
          <p className="hero-fig t-mono" aria-hidden="true">
            <span>Fig. 01</span> The Abosh Lens — real-time glass, n&nbsp;=&nbsp;1.50
          </p>
        </div>
      </div>

      <div className="frame hero-foot t-mono" aria-hidden="true">
        <span>{site.location}</span>
        <span className="hero-foot-coords">{site.coordinates}</span>
        <span className="hero-scroll">
          Scroll <span className="hero-scroll-line" />
        </span>
      </div>
    </section>
  );
}
