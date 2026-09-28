"use client";

import { useEffect, useRef } from "react";

const NUM = /\d[\d,]*(?:\.\d+)?/;

/**
 * Counts a real figure up from zero the first time it comes into view,
 * keeping its prefix and suffix ("37K+", "1,000+", "~200", "$0").
 * Server render, reduced motion and already-visible figures show the final
 * value. Frames are written straight to the text node: no React re-renders.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = outer.current;
    const out = inner.current;
    const match = value.match(NUM);
    if (!el || !out || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    const raw = match[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    if (!target) return;
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const render = (n: number) => {
      const s = raw.includes(",") ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals);
      return value.replace(raw, s);
    };
    out.textContent = render(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          out.textContent = p >= 1 ? value : render(target * (1 - Math.pow(2, -10 * p)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      out.textContent = value;
    };
  }, [value]);

  return (
    <span ref={outer} className={className}>
      <span className="sr-only">{value}</span>
      <span ref={inner} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
