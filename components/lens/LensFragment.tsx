"use client";

import { useRef, type CSSProperties } from "react";
import { focusLensAt } from "./anchors";
import { useLensFragment, type FragmentStyle } from "./fragments";

/**
 * A piece of text with something hidden underneath it. The DOM button is the
 * layout box and the accessible text (its own glyphs are transparent); the
 * visible surface text and the hidden line are rendered in the lens scene so
 * the glass genuinely refracts them. Keyboard focus and taps move the lens.
 */
export function LensFragment({
  anchorId,
  id,
  surface,
  through,
  kind,
  className = "",
  style,
}: {
  anchorId: string;
  id: string;
  surface: string;
  through: string;
  kind: FragmentStyle;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useLensFragment(ref, id, surface, through, kind);
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
      onFocus={(e) => aim(e.currentTarget)}
      onClick={(e) => aim(e.currentTarget)}
    >
      <span className="frag-surface">{surface}</span>
      <span className="sr-only">. Through the lens: {through}</span>
    </button>
  );
}
