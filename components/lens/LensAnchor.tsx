"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useLensAnchor, type LensAnchorOptions } from "./anchors";

/**
 * Placement target for the Abosh Lens. Usually empty; interactive anchors
 * wrap the content the lens reads (pointer and touch events bubble to it).
 */
export function LensAnchor({
  className,
  style,
  children,
  ...options
}: LensAnchorOptions & { className?: string; style?: CSSProperties; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLensAnchor(ref, options);
  return (
    <div ref={ref} aria-hidden={children ? undefined : true} data-lens-anchor={options.id} className={className} style={style}>
      {children}
    </div>
  );
}
