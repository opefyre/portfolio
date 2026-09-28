"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { path, type PathStage } from "@/content/site";
import type { Experience } from "@/lib/data";
import { PathMaterial } from "./PathMaterial";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = { experiences: Experience[]; education: { degree: string; institution: string; period: string }[] };

function StageDetail({ stage, experience, education }: { stage: PathStage; experience?: Experience; education: Props["education"] }) {
  return (
    <div className="stage-detail">
      <p className="t-label">
        {stage.years} · {stage.where}
      </p>
      <Dialog.Title className="stage-detail-title">{stage.era}</Dialog.Title>
      <Dialog.Description className="t-lead stage-detail-note">{stage.note}</Dialog.Description>
      {experience ? (
        <div className="stage-roles">
          {experience.positions.map((pos) => (
            <section key={pos.title} className="stage-role">
              <h3 className="stage-role-title">{pos.title}</h3>
              <p className="t-mono stage-role-period">{pos.period}</p>
              <ul>
                {pos.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="stage-education">
          {education.map((e) => (
            <li key={e.degree}>
              <span>{e.degree}</span>
              <span className="t-mono">
                {e.institution} · {e.period}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Path({ experiences, education }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const line = useRef<SVGPathElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const byId = new Map(experiences.map((e) => [e.id, e]));

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(el).paddingLeft));
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      // the engraved line draws itself as the eras pass
      const len = line.current?.getTotalLength() ?? 0;
      if (line.current) {
        gsap.set(line.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.7 },
        });
      }
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  const current = path.find((s) => s.id === open);

  return (
    <section ref={section} id="path" className="path" data-nav-tone="dark" aria-labelledby="path-title">
      <div className="frame path-head">
        <p className="section-index">
          <span>04</span>
        </p>
        <h2 id="path-title" className="t-h2">
          My path
        </h2>
        <p className="t-lead path-intro">
          Different environments. The same obsession: making systems work better.
        </p>
      </div>

      <div className="path-viewport">
        <svg className="path-thread" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true">
          <path ref={line} d="M0 10 C 160 2, 320 18, 500 10 S 840 2, 1000 10" />
        </svg>
        <ol ref={track} className="path-track">
          {path.map((stage, i) => (
            <li key={stage.id} className="stage">
              <button
                type="button"
                className="stage-card"
                onClick={() => setOpen(stage.id)}
                aria-haspopup="dialog"
                aria-label={`${stage.era}, ${stage.years}, ${stage.where}. Open details.`}
              >
                <span className="stage-num t-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="stage-years t-mono">{stage.years}</span>
                <span className="stage-material">
                  <PathMaterial kind={stage.material} />
                </span>
                <span className="stage-era">{stage.era}</span>
                <span className="stage-where t-serif">{stage.where}</span>
                <span className="stage-note">{stage.note}</span>
                <span className="stage-open t-mono">
                  Open <span aria-hidden="true">+</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <AnimatePresence>
          {current && (
            <Dialog.Portal keepMounted>
              <Dialog.Backdrop
                render={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />}
                className="sheet-backdrop"
              />
              <Dialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "translateY(24px) scale(0.98)" }}
                    animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                    exit={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                }
                className="sheet glass"
                data-lenis-prevent
              >
                <Dialog.Close className="sheet-close" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </Dialog.Close>
                <StageDetail stage={current} experience={current.experienceId ? byId.get(current.experienceId) : undefined} education={education} />
              </Dialog.Popup>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
