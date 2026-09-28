"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { lensBeginNormal, lensBeginVertex, lensVertexHead } from "./shaders";
import { LAYER } from "./layers";
import { lensStore } from "./lensStore";
import { decay, drift, spring, stepSpring } from "./physics";

export type LensQuality = "high" | "low";

export type AboshLensProps = {
  /** Transmission buffer produced by <LensRenderer/>. */
  buffer: THREE.Texture;
  quality?: LensQuality;
  /** 0 = clear studio glass, 1 = darkened (footer). Defaults to the live placement. */
  darkness?: number;
};

const QUALITY = {
  high: { detail: 56, samples: 8 },
  low: { detail: 28, samples: 4 },
} as const;

const tmpDir = new THREE.Vector3();
const tmpQuat = new THREE.Quaternion();
const CLEAR_ATTENUATION = new THREE.Color("#e8ecef");
const DARK_ATTENUATION = new THREE.Color("#3a3f45");

/**
 * The Abosh Lens: a real-time, physically-based glass volume.
 *
 * Geometry is a unit icosphere; the vertex shader sculpts it into a fixed
 * asymmetric pebble and adds slow living deformation + pointer/scroll
 * velocity response. drei's MeshTransmissionMaterial does the refraction,
 * sampling the transmission buffer rendered by <LensRenderer/>.
 */
export const AboshLens = forwardRef<THREE.Group, AboshLensProps>(function AboshLens(
  { buffer, quality = "high", darkness },
  ref,
) {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  // drei's material type isn't exported, but it is a MeshPhysicalMaterial.
  const material = useRef<THREE.MeshPhysicalMaterial & { uniforms: Record<string, THREE.IUniform> }>(null!);
  useImperativeHandle(ref, () => group.current, []);

  const { detail, samples } = QUALITY[quality];

  const uniforms = useMemo(
    () => ({
      uLensTime: { value: 0 },
      uLensLiving: { value: 0.028 },
      uLensVelocity: { value: 0 },
      uLensVelDir: { value: new THREE.Vector3(1, 0, 0) },
      uLensShape: { value: new THREE.Vector3(1.24, 0.9, 0.96) },
      uLensSeed: { value: 4.27 },
      uLensAsymmetry: { value: 0.16 },
    }),
    [],
  );

  // Chain our vertex deformation onto drei's own onBeforeCompile.
  useLayoutEffect(() => {
    const mat = material.current;
    const dreiCompile = mat.onBeforeCompile;
    mat.onBeforeCompile = (shader, renderer) => {
      dreiCompile.call(mat, shader, renderer);
      Object.assign(shader.uniforms, uniforms);
      // Idempotent: never inject twice even if compile hooks get chained.
      if (!shader.vertexShader.includes("lensSurface(")) {
        shader.vertexShader =
          lensVertexHead +
          shader.vertexShader
            .replace("#include <beginnormal_vertex>", lensBeginNormal)
            .replace("#include <begin_vertex>", lensBeginVertex);
      }
    };
    mat.customProgramCacheKey = () => `abosh-lens-${samples}`;
    mat.needsUpdate = true;
    return () => {
      // Restore drei's hook so a remount (StrictMode / HMR) doesn't stack wrappers.
      mat.onBeforeCompile = dreiCompile;
    };
  }, [uniforms, samples]);

  // Physical state
  const rotX = useRef(spring());
  const rotY = useRef(spring());
  const velAmp = useRef(spring());
  const velDir = useRef(new THREE.Vector3(1, 0, 0));
  const dark = useRef(spring(darkness ?? 0));
  const thick = useRef(spring(0.95));
  const clock = useRef(0);

  useFrame((state, dt) => {
    const p = lensStore.pointer;
    const reduced = lensStore.reducedMotion;
    const u = uniforms;

    // Time only advances when motion is allowed: reduced motion = a still object.
    if (!reduced) clock.current += dt;
    const t = clock.current;
    u.uLensTime.value = t;

    // --- Pointer: rotate slightly toward it, with inertia ---------------------
    const targetY = reduced ? 0 : p.x * 0.32 + drift(t, 0.4) * 0.09;
    const targetX = reduced ? 0 : -p.y * 0.2 + drift(t, 2.1) * 0.06;
    stepSpring(rotY.current, targetY, dt, 14, 6.5);
    stepSpring(rotX.current, targetX, dt, 14, 6.5);
    const g = group.current;
    // Resting pose is tilted 3/4 so the volume reads; pointer + drift on top.
    g.rotation.y = -0.38 + rotY.current.x + t * 0.004; // almost imperceptible spin
    g.rotation.x = 0.34 + rotX.current.x;
    g.rotation.z = -0.12 + drift(t, 5.3) * 0.025;

    // --- Velocity: the glass leans into fast motion ---------------------------
    p.vx = decay(p.vx, 5, dt);
    p.vy = decay(p.vy, 5, dt);
    const speed = Math.hypot(p.vx, p.vy);
    const scrollV = Math.abs(lensStore.scroll.velocity);
    const targetAmp = reduced ? 0 : Math.min(speed * 0.012 + scrollV * 0.0025, 0.085);
    stepSpring(velAmp.current, targetAmp, dt, 60, 11);
    u.uLensVelocity.value = velAmp.current.x;
    if (speed > 0.05 || scrollV > 0.5) {
      // world-space direction of motion → object space
      tmpDir.set(speed > 0.05 ? p.vx : 0, speed > 0.05 ? p.vy : -Math.sign(lensStore.scroll.velocity), 0).normalize();
      tmpQuat.copy(mesh.current.getWorldQuaternion(tmpQuat)).invert();
      tmpDir.applyQuaternion(tmpQuat);
      velDir.current.lerp(tmpDir, 1 - Math.exp(-8 * dt)).normalize();
      u.uLensVelDir.value.copy(velDir.current);
    }

    // --- Highlights shift with the pointer (rotate the studio, not the object)
    const env = state.scene.environmentRotation;
    env.y = rotY.current.x * 0.9 - 0.1;
    env.x = rotX.current.x * 0.6;

    // --- Darkness (footer state) ---------------------------------------------
    stepSpring(dark.current, darkness ?? lensStore.placement.darkness, dt, 20, 9);
    const d = THREE.MathUtils.clamp(dark.current.x, 0, 1);
    const m = material.current;
    (m.uniforms.attenuationColor.value as THREE.Color).copy(CLEAR_ATTENUATION).lerp(DARK_ATTENUATION, d);
    m.uniforms.attenuationDistance.value = THREE.MathUtils.lerp(3.2, 1.1, d);
    m.envMapIntensity = THREE.MathUtils.lerp(1.15, 0.55, d);

    // --- Thickness: thinner glass where it has to read text -------------------
    stepSpring(thick.current, lensStore.placement.thickness, dt, 16, 8);
    m.uniforms.thickness.value = thick.current.x;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} layers={LAYER.SURFACE}>
        <icosahedronGeometry args={[1, detail]} />
        <MeshTransmissionMaterial
          ref={material as never}
          buffer={buffer}
          resolution={1}
          backsideResolution={1}
          samples={samples}
          transmission={1}
          thickness={0.95}
          ior={1.5}
          roughness={0.02}
          chromaticAberration={0.035}
          anisotropicBlur={0.03}
          distortion={0.012}
          distortionScale={0.22}
          temporalDistortion={0.012}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationDistance={3.2}
          attenuationColor="#e8ecef"
          envMapIntensity={1.15}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
});
