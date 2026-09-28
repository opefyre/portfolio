"use client";

import { useMemo } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Soft-edged emissive faces for the light panels. A hard-edged Lightformer
 * reflects as a flat "sticker" shape; a diffused face reflects the way a real
 * softbox does — bright core, soft falloff.
 */
function makeSoftTexture(kind: "radial" | "strip") {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g =
    kind === "radial"
      ? ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      : ctx.createLinearGradient(0, 0, size, 0);
  if (kind === "radial") {
    g.addColorStop(0, "rgb(255,255,255)");
    g.addColorStop(0.45, "rgb(191,191,191)");
    g.addColorStop(1, "rgb(0,0,0)");
  } else {
    g.addColorStop(0, "rgb(0,0,0)");
    g.addColorStop(0.35, "rgb(217,217,217)");
    g.addColorStop(0.5, "rgb(255,255,255)");
    g.addColorStop(0.65, "rgb(217,217,217)");
    g.addColorStop(1, "rgb(0,0,0)");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Studio environment rendered once into a cube map from emissive panels —
 * no HDR download (the site CSP only allows same-origin requests anyway).
 *
 * The composition mimics a product-photography studio: a big diffused key
 * from above-left, one long strip light that draws a single edge, a faint
 * cool fill from the right, a rim from behind and a whisper of warm bounce.
 */
export function StudioLighting({ intensity = 1 }: { intensity?: number }) {
  const radial = useMemo(() => makeSoftTexture("radial"), []);
  const strip = useMemo(() => makeSoftTexture("strip"), []);

  return (
    <Environment resolution={256} frames={1} environmentIntensity={intensity}>
      {/* Key: large diffused overhead softbox */}
      <Lightformer form="rect" map={radial} intensity={2.4} color="#ffffff" position={[-1.4, 6, 1.5]} rotation-x={Math.PI / 2} scale={[9, 6, 1]} />
      {/* Strip light — one long specular line along the left edge */}
      <Lightformer form="rect" map={strip} intensity={3.6} color="#f4f5f7" position={[-6, 1.5, 3]} rotation-y={Math.PI / 2} rotation-z={0.18} scale={[0.9, 10, 1]} />
      {/* Cool fill from the right */}
      <Lightformer form="rect" map={radial} intensity={0.7} color="#e3eaf4" position={[6, -1.2, -1.5]} rotation-y={-Math.PI / 2.4} scale={[3, 4, 1]} />
      {/* Rim from behind for edge definition */}
      <Lightformer form="ring" intensity={1.4} color="#dfe6f0" position={[1.5, 1, -7]} scale={4} target={[0, 0, 0]} />
      {/* Warm bounce from the floor */}
      <Lightformer form="rect" map={radial} intensity={0.25} color="#ffe4cc" position={[0, -6, 2]} rotation-x={-Math.PI / 2} scale={[10, 5, 1]} />
    </Environment>
  );
}
