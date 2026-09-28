"use client";

import { useEffect, useRef } from "react";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { GLImage } from "@/components/media/GLImage";
import { CountUp } from "@/components/motion/CountUp";
import { SplitChars } from "@/components/motion/SplitChars";
import { TLink } from "@/components/shell/transitions";
import { WorksIndex } from "./WorksIndex";
import { works, type Work } from "@/content/site";

/** Composition per work: screenshots are placed by their own proportions. */
function layoutOf(w: Work, i: number) {
  const ratio = w.image.width / w.image.height;
  if (ratio > 2.2) return "wide";
  return i % 2 === 0 ? "left" : "right";
}

function WorkBlock({ work, index }: { work: Work; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const layout = layoutOf(work, index);

  // Arrival is triggered once, when the block is well into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const href = `/work/${work.slug}/`;
  const glId = `work-${work.slug}`;

  return (
    <article
      ref={ref}
      className="work"
      data-layout={layout}
      data-long={work.name.length > 12 || undefined}
      aria-labelledby={`${work.slug}-name`}
    >
      <TLink href={href} keep={glId} className="work-media" aria-label={`${work.name} case study`} tabIndex={-1}>
        <GLImage id={glId} src={work.image.src} alt={work.image.alt} width={work.image.width} height={work.image.height} radius={10} />
        <LensAnchor id={`lens-${work.slug}`} className="work-lens" sizeRatio={1} plateLines={0} plateHalo={0} thickness={0.8} />
      </TLink>

      <div className="work-copy">
        <h2 id={`${work.slug}-name`} className="work-name">
          <TLink href={href} keep={glId}>
            <SplitChars text={work.name} />
          </TLink>
        </h2>
        <p className="work-line">{work.line}</p>
        {work.stats.length > 0 && (
          <dl className="work-stats">
            {work.stats.map((s) => (
              <div key={s.label} className="work-stat">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="work-stat-value" />
                  <span className="work-stat-label" aria-hidden="true">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <p className="work-foot">
          <span className="work-status">{work.status}</span>
          <TLink href={href} keep={glId} className="work-more">
            Case study <span aria-hidden="true">→</span>
          </TLink>
        </p>
      </div>
    </article>
  );
}

export function Works() {
  const featured = works.filter((w) => w.featured);
  const more = works.filter((w) => !w.featured);
  return (
    <section id="work" className="works" data-nav-tone="dark" aria-label="Work">
      <div className="frame">
        {featured.map((w, i) => (
          <WorkBlock key={w.slug} work={w} index={i} />
        ))}
        {more.length > 0 && (
          <div className="index">
            <h2 className="sr-only">More work</h2>
            <WorksIndex works={more} />
          </div>
        )}
      </div>
    </section>
  );
}
