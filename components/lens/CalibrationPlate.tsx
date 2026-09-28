"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { LAYER } from "./layers";

/**
 * An engraved optical calibration plate that sits behind the lens.
 *
 * It is deliberately almost invisible on its own: fine graphite lines on a
 * graphite halo: and only reads clearly where the glass bends and magnifies
 * it. Straight lines curving through the lens is the honest proof that the
 * refraction is real.
 *
 * Colours are authored in sRGB and converted to linear by THREE.Color, and the
 * shader re-encodes on output, so the plate's base colour matches the CSS page
 * background exactly and fades into it without a seam.
 */
const vertex = /* glsl */ `
varying vec2 vLocal;
void main() {
  vLocal = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
varying vec2 vLocal;
uniform vec3 uBase;
uniform vec3 uHalo;
uniform vec3 uLine;
uniform vec2 uHalf;
uniform float uLineStrength;
uniform float uHaloStrength;

float lineAA(float d, float w) {
  float fw = fwidth(d);
  return 1.0 - smoothstep(w * 0.5, w * 0.5 + fw * 1.25, abs(d));
}

float grid(vec2 p, float spacing, float w) {
  vec2 g = (fract(p / spacing + 0.5) - 0.5) * spacing;
  return max(lineAA(g.x, w), lineAA(g.y, w));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 p = vLocal;
  vec2 q = p / uHalf;               // -1..1 across the plate
  float r = length(q * vec2(1.0, 1.15));

  // Studio halo: a soft pool of light behind the object.
  float halo = pow(1.0 - smoothstep(0.0, 0.95, r), 2.2);
  vec3 col = mix(uBase, uHalo, halo * uHaloStrength);

  // Studio strip light behind the object: a soft vertical band, slightly
  // off-centre. Seen directly it's a quiet glow; through the glass it bends
  // into a bright curved highlight, the way glass is lit in product photos.
  float strip = exp(-pow((p.x - 0.55) / 0.42, 2.0)) * (1.0 - smoothstep(0.1, 0.9, abs(q.y)));
  col += uHalo * strip * 0.9 * halo;

  // Engraving: fine 0.2 grid, stronger 1.0 grid, centre axes, x-axis ticks.
  float minor = grid(p, 0.2, 0.004) * 0.28;
  float major = grid(p, 1.0, 0.006) * 0.62;
  float axes = max(lineAA(p.x, 0.008), lineAA(p.y, 0.008));
  float tickX = lineAA((fract(p.x / 0.1 + 0.5) - 0.5) * 0.1, 0.004) * (1.0 - step(0.07, abs(p.y)));
  float tickY = lineAA((fract(p.y / 0.1 + 0.5) - 0.5) * 0.1, 0.004) * (1.0 - step(0.07, abs(p.x)));
  // One precise circle: the nominal lens aperture.
  float ring = lineAA(length(p) - 1.55, 0.006) * 0.7;

  float lines = max(max(minor, major), max(max(axes, ring), max(tickX, tickY) * 0.8));
  float engrave = lines * uLineStrength * (0.15 + 0.85 * halo);
  col = mix(col, uLine, engrave);

  // Fade the whole plate into the page background. When neither the engraving
  // nor the halo is wanted (over screenshots), the plate disappears entirely,
  // so the glass refracts what's really behind it.
  float alpha = 1.0 - smoothstep(0.35, 1.0, r);
  alpha *= clamp(max(uLineStrength * 2.5, uHaloStrength * 1.25), 0.0, 1.0);

  // Grain / dither: kills banding in the dark gradient.
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export type PlateHandle = THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

export const CalibrationPlate = forwardRef<PlateHandle, {
  width?: number;
  height?: number;
  z?: number;
  base?: string;
  halo?: string;
  line?: string;
  lineStrength?: number;
  haloStrength?: number;
}>(function CalibrationPlate({
  width = 9,
  height = 6,
  z = -1.8,
  base = "#0b0c0d",
  halo = "#3b3f44",
  line = "#8a9096",
  lineStrength = 0.6,
  haloStrength = 1,
}, ref) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uBase: { value: new THREE.Color(base) },
          uHalo: { value: new THREE.Color(halo) },
          uLine: { value: new THREE.Color(line) },
          uHalf: { value: new THREE.Vector2(width / 2, height / 2) },
          uLineStrength: { value: lineStrength },
          uHaloStrength: { value: haloStrength },
        },
      }),
    // lineStrength / haloStrength are initial values only; the stage animates
    // the uniforms directly every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [base, halo, line, width, height],
  );

  return (
    <mesh ref={ref} position={[0, 0, z]} layers={LAYER.DEFAULT} renderOrder={-10} material={material}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
});
