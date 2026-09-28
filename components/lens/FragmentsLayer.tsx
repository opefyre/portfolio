"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { LAYER } from "./layers";
import { useFragmentEntries, type FragmentEntry } from "./fragments";
import { lensStore } from "./lensStore";
import { spring, stepSpring } from "./physics";

const FONT = "/fonts/funnel-display-500.woff";
const TRACKING = -0.04;
const SURFACE_COLOR = "#ecebe6";
/** The old value, only ever seen through the glass. */
const BEFORE_COLOR = "#a3a8ad";

type TroikaText = THREE.Mesh & {
  fontSize: number;
  maxWidth: number;
  fillOpacity: number;
  sync: (callback?: () => void) => void;
  textRenderInfo?: { blockBounds: [number, number, number, number]; visibleBounds?: [number, number, number, number] };
};

function setLayer(obj: THREE.Object3D | null, layer: number) {
  obj?.traverse((o) => o.layers.set(layer));
}

/**
 * One fragment: the surface text (seen normally, hidden from the glass) and
 * the text underneath it (exists only in the transmission buffer, so only the
 * lens can show it). For figures, the text underneath is the old value,
 * struck through: the lens shows what things were before.
 */
function Fragment({ entry, index }: { entry: FragmentEntry; index: number }) {
  const group = useRef<THREE.Group>(null!);
  const surface = useRef<TroikaText>(null!);
  const through = useRef<TroikaText>(null!);
  const strike = useRef<THREE.Mesh>(null!);
  const strikeMat = useRef<THREE.MeshBasicMaterial>(null!);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const lastLayout = useRef("");
  const appear = useRef({ s: spring(0), seenAt: -1 });

  useLayoutEffect(() => {
    setLayer(surface.current, LAYER.SURFACE);
    setLayer(through.current, LAYER.THROUGH);
    setLayer(strike.current, LAYER.THROUGH);
  }, []);

  const placeStrike = () => {
    const info = through.current?.textRenderInfo;
    if (!info || entry.style !== "figure") {
      if (strike.current) strike.current.visible = false;
      return;
    }
    const [x0, y0, x1, y1] = info.visibleBounds ?? info.blockBounds;
    const fs = through.current.fontSize;
    strike.current.visible = true;
    strike.current.scale.set(x1 - x0 + fs * 0.06, Math.max(fs * 0.03, 0.003), 1);
    strike.current.position.set((x0 + x1) / 2, (y0 + y1) / 2 - fs * 0.02, 0.001);
  };

  useFrame((state, dt) => {
    const W = size.width;
    const H = size.height;
    const r = entry.el.getBoundingClientRect();
    const onScreen = r.bottom > -200 && r.top < H + 200;
    group.current.visible = onScreen;
    if (!onScreen) return;

    const worldH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const upp = worldH / H;

    // Arrive once, when the fragment first comes into view (staggered).
    const a = appear.current;
    const t = state.clock.elapsedTime;
    if (a.seenAt < 0 && r.top < H * 0.9 && r.bottom > 0) a.seenAt = t + index * 0.09;
    const target = a.seenAt >= 0 && t >= a.seenAt ? 1 : 0;
    if (lensStore.reducedMotion) a.s.x = target;
    else stepSpring(a.s, target, dt, 70, 14);
    if (Math.abs(a.s.x - target) > 0.001) lensStore.dirty = true;
    const k = THREE.MathUtils.clamp(a.s.x, 0, 1.05);

    const x = (r.left + r.width / 2 - W / 2) * upp;
    const y = -(r.top + r.height / 2 - H / 2) * upp - (1 - k) * 28 * upp;
    group.current.position.set(x, y, 0);
    surface.current.fillOpacity = Math.min(1, k);

    // Re-layout the SDF text only when the DOM box or the lens size changed.
    const lensPx = lensStore.placement.size || 300;
    const layoutKey = `${Math.round(r.width)}x${Math.round(r.height)}@${H}/${Math.round(lensPx / 8)}`;
    if (layoutKey !== lastLayout.current) {
      lastLayout.current = layoutKey;
      const fontPx = parseFloat(getComputedStyle(entry.el).fontSize) || 32;
      const fs = fontPx * upp;
      const s = surface.current;
      const th = through.current;
      s.fontSize = fs;
      s.maxWidth = getComputedStyle(entry.el).whiteSpace === "nowrap" ? Infinity : r.width * upp * 1.04;
      if (entry.style === "figure") {
        // Same size as the value it replaces, unless the glass is too small for it.
        const fit = (lensPx * 0.56) / Math.max(1, entry.through.length * 0.56);
        th.fontSize = Math.min(fontPx, fit) * upp;
        th.maxWidth = Infinity;
      } else {
        th.fontSize = lensPx * 0.098 * upp;
        th.maxWidth = lensPx * 0.5 * upp;
      }
      s.sync();
      th.sync(placeStrike);
    }

    // The hidden line is ink under the surface: only what's near the glass is
    // lit enough to read, so neighbours don't crowd the lens.
    const pl = lensStore.placement;
    const rad = Math.max(1, (pl.size || 300) / 2);
    const d = Math.hypot(r.left + r.width / 2 - pl.x, r.top + r.height / 2 - pl.y);
    const n = THREE.MathUtils.clamp((rad * 1.25 - d) / (rad * 0.75), 0, 1);
    const vis = n * n * (3 - 2 * n) * Math.min(1, k);
    through.current.fillOpacity = vis;
    strikeMat.current.opacity = vis;
  });

  return (
    <group ref={group}>
      <Text ref={surface as never} font={FONT} color={SURFACE_COLOR} anchorX="center" anchorY="middle" textAlign="center" letterSpacing={TRACKING} lineHeight={1}>
        {entry.surface}
      </Text>
      <Text
        ref={through as never}
        font={FONT}
        color={BEFORE_COLOR}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        letterSpacing={TRACKING}
        lineHeight={1.05}
        onSync={placeStrike}
      >
        {entry.through}
      </Text>
      <mesh ref={strike} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={strikeMat} color={BEFORE_COLOR} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

export function FragmentsLayer() {
  const entries = useFragmentEntries();
  return (
    <>
      {entries.map((e, i) => (
        <Fragment key={e.key} entry={e} index={i} />
      ))}
    </>
  );
}
