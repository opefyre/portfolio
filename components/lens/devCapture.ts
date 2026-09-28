"use client";

import type * as THREE from "three";

/**
 * Development-only: grab a frame from the WebGL canvas right after it renders
 * (no preserveDrawingBuffer needed) and post it to a local capture receiver.
 * Stripped from behaviour in production builds.
 */
type Req = { maxWidth: number; resolve: (url: string) => void };
let request: Req | null = null;

export function devCaptureAfterRender(gl: THREE.WebGLRenderer) {
  if (!request) return;
  const req = request;
  request = null;
  const src = gl.domElement;
  const scale = Math.min(1, req.maxWidth / src.width);
  const c = document.createElement("canvas");
  c.width = Math.round(src.width * scale);
  c.height = Math.round(src.height * scale);
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b0c0d";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(src, 0, 0, c.width, c.height);
  req.resolve(c.toDataURL("image/jpeg", 0.9));
}

export function installDevCapture() {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  w.__saveCapture = async (name: string, maxWidth = 1400) => {
    const url = await Promise.race([
      new Promise<string>((resolve) => {
        request = { maxWidth, resolve };
      }),
      new Promise<string>((_, rej) => setTimeout(() => rej(new Error("capture timeout")), 8000)),
    ]);
    const r = await fetch("http://127.0.0.1:47831", { method: "POST", body: JSON.stringify({ name, dataUrl: url }) });
    return r.text();
  };
}
