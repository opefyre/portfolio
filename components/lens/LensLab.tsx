"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AboshLens } from "./AboshLens";
import { CalibrationPlate } from "./CalibrationPlate";
import { LensRenderer, useLensBuffer } from "./LensRenderer";
import { StudioLighting } from "./StudioLighting";
import { lensStore, startPointerTracking } from "./lensStore";

declare global {
  interface Window {
    __lensCapture?: (maxWidth?: number) => Promise<string>;
  }
}

type CaptureRequest = { maxWidth: number; resolve: (url: string) => void } | null;

function LabScene({ captureRef }: { captureRef: React.RefObject<CaptureRequest> }) {
  const buffer = useLensBuffer(1);
  return (
    <>
      <StudioLighting />
      <directionalLight position={[-3, 4, 5]} intensity={1.4} color="#ffffff" />
      <CalibrationPlate />
      <AboshLens buffer={buffer.texture} />
      <LensRenderer
        buffer={buffer}
        onAfterRender={(gl) => {
          const req = captureRef.current;
          if (!req) return;
          captureRef.current = null;
          const src = gl.domElement;
          const scale = Math.min(1, req.maxWidth / src.width);
          const c = document.createElement("canvas");
          c.width = Math.round(src.width * scale);
          c.height = Math.round(src.height * scale);
          const ctx = c.getContext("2d")!;
          ctx.fillStyle = "#0b0c0d"; // page background under the transparent canvas
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(src, 0, 0, c.width, c.height);
          req.resolve(c.toDataURL("image/jpeg", 0.9));
        }}
      />
    </>
  );
}

/** Dev-only test bench for the Abosh Lens. */
export function LensLab() {
  const captureRef = useRef<CaptureRequest>(null);

  useEffect(() => {
    startPointerTracking();
    (window as unknown as Record<string, unknown>).__lensStore = lensStore;
    window.__lensCapture = (maxWidth = 1200) =>
      new Promise((resolve) => {
        captureRef.current = { maxWidth, resolve };
      });
    // Dev tooling: post a frame to a local capture receiver for visual review.
    (window as unknown as Record<string, unknown>).__saveCapture = async (name: string, w = 1400) => {
      const dataUrl = await Promise.race([
        window.__lensCapture!(w),
        new Promise<string>((_, rej) => setTimeout(() => rej(new Error("capture timeout")), 8000)),
      ]);
      const r = await fetch("http://127.0.0.1:47831", { method: "POST", body: JSON.stringify({ name, dataUrl }) });
      return r.text();
    };
    return () => {
      delete window.__lensCapture;
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0b0c0d" }}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 30, position: [0, 0, 8], near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0b0c0d"), 0);
        }}
      >
        <LabScene captureRef={captureRef} />
      </Canvas>
    </div>
  );
}
