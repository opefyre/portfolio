"use client";

import { useEffect, useRef } from "react";
import { GLImage } from "@/components/media/GLImage";
import { TLink } from "@/components/shell/transitions";
import type { Work } from "@/content/site";

/**
 * The rest of the work as an index. Hovering (or focusing) a row brings its
 * screenshot up as a WebGL card that trails the pointer and leans with its
 * speed; clicking flies that same card into the case study. On touch screens
 * the screenshot simply sits under each row.
 */
export function WorksIndex({ works }: { works: Work[] }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let active: HTMLElement | null = null;
    let raf = 0;

    const place = (el: HTMLElement) => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    const show = (row: HTMLElement | null) => {
      if (row === active) return;
      if (active) {
        active.classList.remove("is-active");
        const g = active.querySelector<HTMLElement>(".gl-image");
        if (g) g.dataset.glVisible = "false";
      }
      active = row;
      root.classList.toggle("has-active", !!row);
      if (!row) return;
      row.classList.add("is-active");
      const preview = row.querySelector<HTMLElement>(".index-preview");
      if (preview) place(preview);
      const g = row.querySelector<HTMLElement>(".gl-image");
      if (g) g.dataset.glVisible = "true";
    };
    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.14;
      pos.y += (pos.ty - pos.y) * 0.14;
      const preview = active?.querySelector<HTMLElement>(".index-preview");
      if (preview) place(preview);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pos.tx = e.clientX - r.left;
      pos.ty = e.clientY - r.top;
      if (!active) {
        pos.x = pos.tx;
        pos.y = pos.ty;
      }
      show((e.target as HTMLElement).closest<HTMLElement>(".index-row"));
    };
    const onLeave = () => show(null);
    const onFocus = (e: FocusEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>(".index-row");
      if (!row) return;
      const r = root.getBoundingClientRect();
      const rr = row.getBoundingClientRect();
      pos.tx = pos.x = rr.left - r.left + rr.width * 0.7;
      pos.ty = pos.y = rr.top - r.top + rr.height / 2;
      show(row);
    };
    const onBlur = () => show(null);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("focusout", onBlur);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("focusout", onBlur);
    };
  }, []);

  return (
    <ol ref={list} className="index-list">
      {works.map((w) => (
        <li key={w.slug}>
          <TLink href={`/work/${w.slug}/`} keep={`work-${w.slug}`} className="index-row">
            <span className="index-name">{w.name}</span>
            <span className="index-line">{w.line}</span>
            <span className="index-status">{w.status}</span>
            <span className="index-preview" aria-hidden="true">
              <span className="index-preview-inner" data-wide={w.image.width / w.image.height > 2.2 || undefined}>
                <GLImage id={`work-${w.slug}`} src={w.image.src} alt="" width={w.image.width} height={w.image.height} radius={10} follow />
              </span>
            </span>
          </TLink>
        </li>
      ))}
    </ol>
  );
}
