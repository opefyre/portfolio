"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { focusLensAt } from "./anchors";
import { useLensFragment, type FragmentStyle } from "./fragments";

/**
 * Text with something underneath it. The DOM button is the layout box and
 * the accessible text (its own glyphs are transparent); the visible text and
 * the hidden line are drawn in the lens scene so the glass genuinely refracts
 * them. Focus and taps move the lens onto it.
 */
export function LensFragment({
  anchorId,
  id,
  surface,
  through,
  kind,
  label,
  rest = false,
  className = "",
  style,
}: {
  anchorId: string;
  id: string;
  surface: string;
  through: string;
  kind: FragmentStyle;
  /** Accessible name; defaults to both lines. */
  label?: string;
  /** Park the lens on this fragment until the visitor moves it. */
  rest?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useLensFragment(ref, id, surface, through, kind);
  useEffect(() => {
    if (!rest) return;
    // After the anchor has registered (parents' effects run after children's).
    const raf = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      focusLensAt(anchorId, r.left + r.width / 2, r.top + r.height / 2);
    });
    return () => cancelAnimationFrame(raf);
  }, [rest, anchorId]);
  const aim = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    focusLensAt(anchorId, r.left + r.width / 2, r.top + r.height / 2);
  };
  return (
    <button
      ref={ref}
      type="button"
      className={`frag frag--${kind} ${className}`}
      style={style}
      data-through={through}
      aria-label={label ?? `${surface}. Underneath: ${through}`}
      onFocus={(e) => aim(e.currentTarget)}
      onClick={(e) => aim(e.currentTarget)}
    >
      <span className="frag-surface" aria-hidden="true">
        {surface}
      </span>
    </button>
  );
}
