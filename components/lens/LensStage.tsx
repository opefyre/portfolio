"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { AboshLens, type LensQuality } from "./AboshLens";
import { CalibrationPlate, type PlateHandle } from "./CalibrationPlate";
import { LensRenderer, useLensBuffer } from "./LensRenderer";
import { StudioLighting } from "./StudioLighting";
import { FragmentsLayer } from "./FragmentsLayer";
import { anchors, anyAnchorNear, type AnchorEntry } from "./anchors";
import { lensStore, startPointerTracking } from "./lensStore";
import { spring, stepSpring, decay } from "./physics";
import { devCaptureAfterRender, installDevCapture } from "./devCapture";
import { lensStore as _ls } from "./lensStore";

/** Visual diameter of the lens at scale 1, in world units. */
const LENS_BASE = 2.3;
const BG = "#0b0c0d";

type RigState = {
  active: AnchorEntry | null;
  offX: ReturnType<typeof spring>;
  offY: ReturnType<typeof spring>;
  localX: ReturnType<typeof spring>;
  localY: ReturnType<typeof spring>;
  scale: ReturnType<typeof spring>;
  lines: ReturnType<typeof spring>;
  halo: ReturnType<typeof spring>;
  placed: boolean;
};

function visibleScore(r: DOMRect, H: number, priority: number) {
  const overlap = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0));
  const vis = overlap / Math.max(1, Math.min(r.height, H));
  if (vis <= 0) return 0;
  const cy = r.top + r.height / 2;
  const d = Math.abs(cy - H / 2) / H;
  return vis * (1.25 - Math.min(d, 1)) + priority * 0.05;
}

/**
 * Places the single persistent lens (and its studio plate) according to the
 * DOM anchors. Scroll is tracked exactly; moves between anchors and pointer
 * following use springs, so the object has mass.
 */
function LensRig({ children }: { children: React.ReactNode }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const group = useRef<THREE.Group>(null!);
  const plate = useRef<PlateHandle>(null!);
  const st = useRef<RigState>({
    active: null,
    offX: spring(),
    offY: spring(),
    localX: spring(),
    localY: spring(),
    scale: spring(0.0001),
    lines: spring(1),
    halo: spring(1),
    placed: false,
  });

  useFrame((_, dt) => {
    const s = st.current;
    const W = size.width;
    const H = size.height;
    const worldH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const upp = worldH / H;

    // 1. choose the anchor
    let best: AnchorEntry | null = null;
    let bestScore = 0;
    let activeScore = 0;
    for (const a of anchors.values()) {
      if (!a.near) continue;
      const score = visibleScore(a.el.getBoundingClientRect(), H, a.opts.priority);
      if (a === s.active) activeScore = score;
      if (score > bestScore) {
        bestScore = score;
        best = a;
      }
    }
    if (s.active && !anchors.has(s.active.opts.id)) s.active = null; // unmounted (route change)
    const keep = s.active && activeScore > 0.12 && bestScore < activeScore * 1.2;
    const next = keep ? s.active : best ?? s.active;

    if (!next) {
      // No anchor on this page: shrink away.
      stepSpring(s.scale, 0.0001, dt, 22, 9.4);
      group.current.scale.setScalar(s.scale.x);
      lensStore.placement.visible = s.scale.x > 0.01;
      return;
    }

    const r = next.el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const diameter = Math.max(next.opts.minSize, next.opts.sizeRatio * Math.min(r.width, r.height));
    lensStore.placement.size = diameter;
    const baseX = (cx - W / 2) * upp;
    const baseY = -(cy - H / 2) * upp;

    // 2. anchor switch → carry the lens over from where it is (spatial move)
    if (next !== s.active) {
      if (s.placed) {
        s.offX.x = group.current.position.x - baseX - s.localX.x;
        s.offY.x = group.current.position.y - baseY - s.localY.x;
      }
      s.active = next;
      s.placed = true;
    }

    // 3. local target inside interactive anchors (pointer / touch / keyboard)
    let lx = 0;
    let ly = 0;
    if (next.opts.interactive) {
      const p = lensStore.pointer;
      const radius = diameter / 2;
      let tx: number | null = null;
      let ty: number | null = null;
      if (next.touch.active) {
        tx = next.touch.x;
        ty = next.touch.y;
      }
      if (p.seen) {
        const px = ((p.x + 1) / 2) * W;
        const py = ((1 - p.y) / 2) * H;
        if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
          tx = px;
          ty = py;
          next.touch.active = false;
        }
      }
      if (tx !== null && ty !== null) {
        const clx = THREE.MathUtils.clamp(tx, r.left + radius * 0.4, r.right - radius * 0.4);
        const cly = THREE.MathUtils.clamp(ty, r.top + radius * 0.4, r.bottom - radius * 0.4);
        lx = (clx - cx) * upp;
        ly = -(cly - cy) * upp;
      }
    }

    const reduced = lensStore.reducedMotion;
    const k = reduced ? 400 : 22;
    stepSpring(s.offX, 0, dt, k, reduced ? 40 : 9.4);
    stepSpring(s.offY, 0, dt, k, reduced ? 40 : 9.4);
    stepSpring(s.localX, lx, dt, reduced ? 400 : 38, reduced ? 40 : 11);
    stepSpring(s.localY, ly, dt, reduced ? 400 : 38, reduced ? 40 : 11);
    stepSpring(s.scale, (diameter * upp) / LENS_BASE, dt, reduced ? 400 : 20, reduced ? 40 : 9);
    stepSpring(s.lines, next.opts.plateLines, dt, 10, 6.3);
    stepSpring(s.halo, next.opts.plateHalo, dt, 10, 6.3);

    group.current.position.set(baseX + s.offX.x + s.localX.x, baseY + s.offY.x + s.localY.x, 0);
    group.current.scale.setScalar(Math.max(0.0001, s.scale.x));

    const u = plate.current.material.uniforms;
    u.uLineStrength.value = 0.48 * THREE.MathUtils.clamp(s.lines.x, 0, 1);
    u.uHaloStrength.value = THREE.MathUtils.clamp(s.halo.x, 0, 1.2);

    lensStore.placement.darkness = next.opts.darkness;
    lensStore.placement.thickness = next.opts.thickness;
    // on-screen test (generous margin for the plate)
    const sx = (group.current.position.x / upp) + W / 2;
    const sy = -(group.current.position.y / upp) + H / 2;
    const rad = (s.scale.x * LENS_BASE) / upp;
    lensStore.placement.x = sx;
    lensStore.placement.y = sy;
    lensStore.placement.visible = sx + rad * 2 > 0 && sx - rad * 2 < W && sy + rad * 2 > 0 && sy - rad * 2 < H;

    // velocities decay between scroll events
    lensStore.scroll.velocity = decay(lensStore.scroll.velocity, 6, dt);
    const settling =
      Math.abs(s.offX.v) + Math.abs(s.offY.v) + Math.abs(s.localX.v) + Math.abs(s.localY.v) + Math.abs(s.scale.v) > 0.002;
    if (settling) lensStore.dirty = true;
  });

  return (
    <group ref={group} scale={0.0001}>
      <CalibrationPlate ref={plate} width={6.2} height={4.6} />
      {children}
    </group>
  );
}

/** Decides when a new frame is needed (frameloop="demand"). */
function FrameDriver() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const near = anyAnchorNear() || lensStore.placement.visible;
      if (near && (!lensStore.reducedMotion || lensStore.dirty)) {
        lensStore.dirty = false;
        invalidate();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);
  return null;
}

function Scene({ quality }: { quality: LensQuality }) {
  const buffer = useLensBuffer(quality === "high" ? 0.8 : 0.6);
  return (
    <>
      <StudioLighting />
      <directionalLight position={[-3, 4, 5]} intensity={1.4} color="#ffffff" />
      <LensRig>
        <AboshLens buffer={buffer.texture} quality={quality} />
      </LensRig>
      <FragmentsLayer />
      <LensRenderer buffer={buffer} background={BG} onAfterRender={process.env.NODE_ENV === "production" ? undefined : devCaptureAfterRender} />
      <FrameDriver />
    </>
  );
}

function detectQuality(): LensQuality {
  if (typeof window === "undefined") return "high";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 760;
  const lowMem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return coarse || small || (lowMem !== undefined && lowMem <= 4) ? "low" : "high";
}

export default function LensStage({ onUnavailable }: { onUnavailable: () => void }) {
  const [quality] = useState(detectQuality);
  const maxDpr = quality === "high" ? 1.75 : 1.5;
  const [dpr, setDpr] = useState(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, maxDpr));
  const lostRef = useRef(false);

  useEffect(() => {
    startPointerTracking();
    installDevCapture();
    if (process.env.NODE_ENV !== "production") (window as unknown as Record<string, unknown>).__lensStore = _ls;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      lensStore.reducedMotion = mq.matches;
      lensStore.dirty = true;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const gl = useMemo(
    () => ({ antialias: true, alpha: true, powerPreference: "high-performance" as const, stencil: false }),
    [],
  );

  return (
    <div className="lens-stage" aria-hidden="true">
      <Canvas
        flat
        frameloop="demand"
        dpr={dpr}
        gl={gl}
        camera={{ fov: 30, position: [0, 0, 8], near: 0.1, far: 50 }}
        onCreated={({ gl: renderer }) => {
          renderer.setClearColor(new THREE.Color(BG), 0);
          renderer.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            if (!lostRef.current) {
              lostRef.current = true;
              onUnavailable();
            }
          });
        }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(1, d - 0.25))}
          onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
        />
        <Scene quality={quality} />
      </Canvas>
    </div>
  );
}
