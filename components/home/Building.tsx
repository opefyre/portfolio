"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/components/shell/useReducedMotionSafe";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { TLink } from "@/components/shell/transitions";
import { building, type BuildingItem } from "@/content/site";

function FeatureStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  // Perspective settles as the product enters — steep → composed.
  const rotateY = useTransform(p, [0, 1], reduced ? [-16, -16] : [-34, -16]);
  const rotateX = useTransform(p, [0, 1], reduced ? [7, 7] : [16, 7]);
  const z = useTransform(p, [0, 1], reduced ? [0, 0] : [-160, 0]);
  const frontY = useTransform(p, [0, 1], reduced ? ["0%", "0%"] : ["18%", "0%"]);

  const { back, front } = building.featured.surfaces;
  return (
    <div ref={ref} className="feature-stage">
      <LensAnchor
        id="building"
        className="feature-lens"
        sizeRatio={0.76}
        plateLines={0.12}
        plateHalo={0.9}
        darkness={0.08}
      />
      <div className="feature-glow" aria-hidden="true" />
      <motion.div className="feature-space" style={{ rotateY, rotateX, z }}>
        <figure className="surface surface--back" style={{ viewTransitionName: "work-vrolen" }}>
          <img src={back.src} alt={back.alt} width={1440} height={900} loading="lazy" decoding="async" />
        </figure>
        <motion.figure className="surface surface--front" style={{ y: frontY }}>
          <img src={front.src} alt={front.alt} width={1440} height={900} loading="lazy" decoding="async" />
        </motion.figure>
      </motion.div>
    </div>
  );
}

function BuildingTile({ item, index }: { item: BuildingItem; index: number }) {
  return (
    <TLink href={`/work/${item.slug}/`} className="tile" data-identity={item.identity} data-i={index}>
      <figure className="tile-frame">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: item.focus ?? "50% 50%", viewTransitionName: `work-${item.slug}` }}
        />
      </figure>
      <div className="tile-caption">
        <h3 className="tile-name">{item.name}</h3>
        <p className="tile-status t-mono">
          <span className="dot" data-tone={item.tone} aria-hidden="true" />
          {item.status}
        </p>
        <p className="tile-line">{item.line}</p>
      </div>
    </TLink>
  );
}

export function Building() {
  const f = building.featured;
  return (
    <section id="building" className="section building" data-nav-tone="dark" aria-labelledby="building-title">
      <div className="frame">
        <p className="section-index">
          <span>02</span>
        </p>
        <header className="building-head">
          <h2 id="building-title" className="t-h2">
            Things I&rsquo;m building
          </h2>
          <p className="building-intro t-lead">Current products — some shipped, some shipping.</p>
        </header>

        <article className="feature" aria-labelledby="feature-vrolen">
          <div className="feature-copy">
            <p className="t-label">Featured · Founder</p>
            <h3 id="feature-vrolen" className="feature-title">
              {f.name}
            </h3>
            <p className="feature-sentence">{f.sentence}</p>
            <ul className="feature-meta t-mono" aria-label="Details">
              {f.meta.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <TLink href={`/work/${f.slug}/`} className="link-arrow feature-cta">
              Explore Vrolen <span className="arrow" aria-hidden="true">→</span>
            </TLink>
          </div>
          <FeatureStage />
        </article>

        <div className="tiles">
          {building.others.map((item, i) => (
            <BuildingTile key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
