"use client";

import { useLayoutEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { LAYER } from "./layers";

/**
 * Owns rendering for the lens canvas (useFrame priority 1 disables R3F's
 * automatic render).
 *
 * Every frame:
 *  1. Transmission pass — render everything the glass should "see" into an
 *     off-screen buffer: DEFAULT + THROUGH layers, never SURFACE (so the lens
 *     is excluded from its own refraction, and hidden text appears only here).
 *  2. Main pass — DEFAULT + SURFACE layers to the screen.
 *
 * The buffer's background is the page's base colour, so regions of the glass
 * with nothing behind them refract a colour identical to the CSS background.
 */
export function useLensBuffer(scale = 1) {
  const size = useThree((s) => s.size);
  const dpr = useThree((s) => s.viewport.dpr);
  const w = Math.max(2, Math.round(size.width * dpr * scale));
  const h = Math.max(2, Math.round(size.height * dpr * scale));
  return useFBO(w, h, { samples: 0, type: THREE.HalfFloatType });
}

export function LensRenderer({
  buffer,
  background = "#0b0c0d",
  enabled = true,
  onAfterRender,
}: {
  buffer: THREE.WebGLRenderTarget;
  background?: string;
  enabled?: boolean;
  onAfterRender?: (gl: THREE.WebGLRenderer) => void;
}) {
  const camera = useThree((s) => s.camera);
  const bg = useMemo(() => new THREE.Color(background), [background]);

  useLayoutEffect(() => {
    camera.layers.enable(LAYER.DEFAULT);
    camera.layers.enable(LAYER.SURFACE);
    camera.layers.disable(LAYER.THROUGH);
  }, [camera]);

  useFrame(({ gl, scene, camera }) => {
    if (!enabled) return;
    const mainMask = camera.layers.mask;

    // 1) transmission buffer
    camera.layers.set(LAYER.DEFAULT);
    camera.layers.enable(LAYER.THROUGH);
    const oldBg = scene.background;
    const oldTone = gl.toneMapping;
    scene.background = bg;
    gl.toneMapping = THREE.NoToneMapping;
    gl.setRenderTarget(buffer);
    gl.clear();
    gl.render(scene, camera);

    // 2) screen
    gl.setRenderTarget(null);
    scene.background = oldBg;
    gl.toneMapping = oldTone;
    camera.layers.mask = mainMask;
    gl.render(scene, camera);
    onAfterRender?.(gl);
  }, 1);

  return null;
}
