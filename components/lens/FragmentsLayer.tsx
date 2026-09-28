"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { LAYER } from "./layers";
import { useFragmentEntries, type FragmentEntry, type FragmentStyle } from "./fragments";
import { lensStore } from "./lensStore";

const FONTS: Record<FragmentStyle, string> = {
  display: "/fonts/funnel-display-500.woff",
  chip: "/fonts/funnel-display-500.woff",
  serif: "/fonts/newsreader-300-italic.woff",
  mono: "/fonts/fragment-mono-400.woff",
};

/** Letter-spacing (em) matching the CSS for each style. */
const TRACKING: Record<FragmentStyle, number> = { display: -0.035, chip: -0.01, serif: -0.01, mono: 0.01 };

const SURFACE_COLOR = "#ecebe6";
const THROUGH_COLOR = "#f6f3ea";
const THROUGH_ACCENT = "#d3ff3b";

type TroikaText = { fontSize: number; maxWidth: number; sync: () => void };

function setLayer(obj: THREE.Object3D | null, layer: number) {
  obj?.traverse((o) => o.layers.set(layer));
}

/**
 * One fragment: the surface text (visible normally, hidden from the glass)
 * and the through text (exists only in the transmission buffer).
 */
function Fragment({ entry }: { entry: FragmentEntry }) {
  const group = useRef<THREE.Group>(null!);
  const surface = useRef<THREE.Mesh>(null!);
  const through = useRef<THREE.Mesh>(null!);
  const chip = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const fontPx = useRef(32);
  const lastLayout = useRef("");

  useLayoutEffect(() => {
    setLayer(surface.current, LAYER.SURFACE);
    setLayer(through.current, LAYER.THROUGH);
    if (chip.current) setLayer(chip.current, LAYER.DEFAULT);
  }, []);

  useFrame(() => {
    const r = entry.el.getBoundingClientRect();
    const onScreen = r.bottom > -200 && r.top < size.height + 200;
    group.current.visible = onScreen;
    if (!onScreen) return;
    const worldH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const upp = worldH / size.height;
    const x = (r.left + r.width / 2 - size.width / 2) * upp;
    const y = -(r.top + r.height / 2 - size.height / 2) * upp;
    group.current.position.set(x, y, 0);

    // The hidden line is ink under the surface: only what's near the glass is
    // lit enough to read, so neighbours don't crowd the lens.
    const pl = lensStore.placement;
    const rad = Math.max(1, (pl.size || 300) / 2);
    const d = Math.hypot(r.left + r.width / 2 - pl.x, r.top + r.height / 2 - pl.y);
    const k = THREE.MathUtils.clamp((rad * 1.25 - d) / (rad * 0.75), 0, 1);
    (through.current as unknown as { fillOpacity: number }).fillOpacity = k * k * (3 - 2 * k);

    // Re-layout the SDF text only when the DOM box or the lens size changed.
    const lensPx = lensStore.placement.size || 300;
    const layoutKey = `${Math.round(r.width)}x${Math.round(r.height)}@${size.height}/${Math.round(lensPx / 8)}`;
    if (layoutKey !== lastLayout.current) {
      lastLayout.current = layoutKey;
      fontPx.current = parseFloat(getComputedStyle(entry.el).fontSize) || 32;
      const fs = fontPx.current * upp;
      const s = surface.current as unknown as TroikaText;
      const t = through.current as unknown as TroikaText;
      s.fontSize = fs;
      // Match the DOM: unwrapped text stays on one line, wrapped text wraps at the box.
      s.maxWidth = getComputedStyle(entry.el).whiteSpace === "nowrap" ? Infinity : r.width * upp * 1.04;
      // The hidden line is set to the lens, not to the surface word: it has
      // to fit inside the glass (which magnifies ~1.3x at its centre).
      t.fontSize = lensPx * 0.098 * upp;
      t.maxWidth = lensPx * 0.5 * upp;
      s.sync();
      t.sync();
      if (chip.current) chip.current.scale.set(r.width * upp, r.height * upp, 1);
    }
  });

  const accent = entry.style === "mono" || entry.style === "chip";

  return (
    <group ref={group}>
      {entry.style === "chip" && (
        <RoundedBox ref={chip} args={[1, 1, 0.04]} radius={0.02} smoothness={4} position={[0, 0, -0.03]}>
          <meshStandardMaterial color="#1b1e21" metalness={0.2} roughness={0.35} envMapIntensity={0.9} />
        </RoundedBox>
      )}
      <Text
        ref={surface}
        font={FONTS[entry.style]}
        color={SURFACE_COLOR}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        letterSpacing={TRACKING[entry.style]}
        lineHeight={1}
      >
        {entry.surface}
      </Text>
      <Text
        ref={through}
        font={FONTS.serif}
        color={accent ? THROUGH_ACCENT : THROUGH_COLOR}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        lineHeight={1.08}
      >
        {entry.through}
      </Text>
    </group>
  );
}

export function FragmentsLayer() {
  const entries = useFragmentEntries();
  return (
    <>
      {entries.map((e) => (
        <Fragment key={e.key} entry={e} />
      ))}
    </>
  );
}
