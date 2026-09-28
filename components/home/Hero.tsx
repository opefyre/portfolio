"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { SplitChars } from "@/components/motion/SplitChars";
import { hero, site } from "@/content/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Stable pseudo-random per index, so every letter keeps its own rate. */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return x - Math.floor(x);
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-name .ch", el);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom 20%", scrub: true },
      });
      // Leaving the hero, the name comes apart: each letter lifts at its own rate.
      chars.forEach((c, i) => {
        tl.to(c, { yPercent: -(40 + rand(i) * 110), rotate: (rand(i + 7) - 0.5) * 10, opacity: 0, ease: "none" }, 0);
      });
      tl.to(".hero-line", { y: -40, opacity: 0, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <section ref={root} className="hero" data-nav-tone="dark">
      <div className="frame hero-frame">
        <h1 className="hero-name">
          <span className="hero-row">
            <SplitChars text={first} />
          </span>
          <span className="hero-row hero-row--2">
            <SplitChars text={last} offset={first.length} />
          </span>
        </h1>
        <p className="hero-line">{hero.line}</p>
        <LensAnchor id="hero" className="hero-lens" sizeRatio={0.9} plateLines={1} plateHalo={1} priority={1} />
      </div>
    </section>
  );
}
