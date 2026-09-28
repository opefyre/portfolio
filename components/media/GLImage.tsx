"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useGLImage } from "@/components/lens/glImages";

/**
 * An image the lens scene can take over. The <img> stays in the DOM for
 * SEO, no-JS and no-WebGL; once the WebGL plane is ready it stands in for
 * it pixel for pixel, then adds the motion (reveal, scroll bend, pointer
 * press, parallax) and becomes something the glass can refract.
 */
export function GLImage({
  id,
  src,
  alt,
  width,
  height,
  radius = 10,
  priority = false,
  className = "",
  ratio,
  follow = false,
}: {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  radius?: number;
  priority?: boolean;
  className?: string;
  /** Box aspect ratio when it should differ from the image's own (cover-cropped). */
  ratio?: string;
  /** Hover preview: starts hidden, leans with the pointer (toggle data-gl-visible to show). */
  follow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGLImage(ref, id, src, radius);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.inview = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`gl-image ${className}`}
      data-gl-follow={follow ? "true" : undefined}
      data-gl-visible={follow ? "false" : undefined}
      style={{ aspectRatio: ratio ?? `${width} / ${height}`, "--radius": `${radius}px` } as CSSProperties}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </div>
  );
}
