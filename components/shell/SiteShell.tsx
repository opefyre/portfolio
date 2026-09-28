"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { LiquidNav } from "@/components/nav/LiquidNav";
import { SmoothScroll } from "./SmoothScroll";
import { RouteChangeHandler } from "./transitions";

// The WebGL stage is client-only and loaded after first paint.
const LensStage = dynamic(() => import("@/components/lens/LensStage"), { ssr: false });

let webgl2: boolean | null = null;
function webgl2Available() {
  if (webgl2 !== null) return webgl2;
  webgl2 = probeWebgl2();
  return webgl2;
}
function probeWebgl2() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/**
 * The lens host. WebGL is the experience; the still image is used ONLY when
 * WebGL genuinely can't run (no WebGL2, or the context is lost).
 */
function LensHost() {
  // Server + hydration render "pending"; the client then probes once.
  const detected = useSyncExternalStore(
    noopSubscribe,
    () => (webgl2Available() ? "webgl" : "fallback"),
    () => "pending",
  );
  const [lost, setLost] = useState(false);
  const mode = lost ? "fallback" : detected;
  useEffect(() => {
    document.documentElement.dataset.lens = mode;
  }, [mode]);
  if (mode === "webgl") return <LensStage onUnavailable={() => setLost(true)} />;
  return null;
}

/** Persistent chrome shared by every page: studio light, lens, nav, scroll. */
export function SiteShell() {
  return (
    <>
      <div className="studio-light" aria-hidden="true" />
      <LensHost />
      <LiquidNav />
      <SmoothScroll />
      <RouteChangeHandler />
      <div className="studio-grain" aria-hidden="true" />
    </>
  );
}
