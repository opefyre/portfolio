"use client";

import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState, type HTMLAttributes } from "react";

/**
 * Liquid Glass surface for the functional UI layer (nav, controls, sheets).
 *
 * Everywhere: real translucency: backdrop blur + saturation, layered
 * edge highlights, and a specular highlight that follows the pointer.
 *
 * Chromium: real refraction of what's underneath. We compute a displacement
 * map for this element's exact rounded-rect shape (strongest at the edge,
 * like a thick lens) and apply it as an SVG filter inside backdrop-filter.
 * Safari/Firefox don't render url() in backdrop-filter, so they keep the
 * translucent version rather than a fake.
 */
function isChromium() {
  if (typeof navigator === "undefined") return false;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  return !!brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/i.test(b.brand));
}

function buildDisplacementMap(w: number, h: number, radius: number, band: number) {
  const scale = 1; // map is sampled at element resolution
  const W = Math.max(2, Math.round(w * scale));
  const H = Math.max(2, Math.round(h * scale));
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(W, H);
  const r = Math.min(radius, W / 2, H / 2);
  const hw = W / 2;
  const hh = H / 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // signed distance to a rounded rect centred at (hw, hh)
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const inside = Math.min(Math.max(qx, qy), 0);
      const sdf = outside + inside - r; // < 0 inside
      let dx = 0;
      let dy = 0;
      if (sdf < 0 && sdf > -band) {
        // outward normal of the rounded rect
        let nx: number;
        let ny: number;
        if (qx > 0 && qy > 0) {
          nx = (ox / (outside || 1)) * Math.sign(px);
          ny = (oy / (outside || 1)) * Math.sign(py);
        } else if (qx > qy) {
          nx = Math.sign(px);
          ny = 0;
        } else {
          nx = 0;
          ny = Math.sign(py);
        }
        const t = 1 + sdf / band; // 0 at inner edge of band → 1 at the rim
        const mag = t * t * t;
        dx = nx * mag;
        dy = ny * mag;
      }
      const i = (y * W + x) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  radius?: number;
  /** Width of the refracting rim in px. */
  band?: number;
  /** Displacement strength in px at the rim. */
  strength?: number;
  tone?: "dark" | "light";
};

export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(function LiquidGlass(
  { radius = 999, band = 18, strength = 34, tone = "dark", className = "", style, children, onPointerMove, ...rest },
  ref,
) {
  const el = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => el.current!, []);
  const id = useId().replace(/:/g, "");
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);
  const [chromium, setChromium] = useState(false);

  useEffect(() => setChromium(isChromium()), []);

  useEffect(() => {
    if (!chromium || !el.current) return;
    const node = el.current;
    let t: ReturnType<typeof setTimeout>;
    const rebuild = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const { width, height } = node.getBoundingClientRect();
        if (width < 4 || height < 4) return;
        const r = Math.min(radius, height / 2, width / 2);
        setMap({ url: buildDisplacementMap(width, height, r, Math.min(band, height / 2)), w: width, h: height });
      }, 140);
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(node);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [chromium, radius, band]);

  const filterId = `lg-${id}`;
  return (
    <div
      ref={el}
      {...rest}
      className={`glass ${className}`}
      data-tone={tone}
      data-refract={chromium && map ? "on" : "off"}
      style={{
        borderRadius: radius,
        ...(chromium && map ? ({ "--glass-refract": `url(#${filterId})` } as React.CSSProperties) : null),
        ...style,
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
        onPointerMove?.(e);
      }}
    >
      {chromium && map && (
        <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
          <filter id={filterId} x="0" y="0" width={map.w} height={map.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
});
