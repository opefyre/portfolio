"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { glNav, useGLImages, type GLImageEntry } from "./glImages";
import { LAYER } from "./layers";
import { lensStore } from "./lensStore";
import { spring, stepSpring, type Spring } from "./physics";

/** Image planes sit behind the lens and its plate, so the glass refracts them. */
const Z = -3;

const geometry = new THREE.PlaneGeometry(1, 1, 48, 24);
const textures = new Map<string, Promise<THREE.Texture>>();

function loadTexture(src: string, gl: THREE.WebGLRenderer) {
  let p = textures.get(src);
  if (!p) {
    p = new THREE.TextureLoader().loadAsync(src).then((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      gl.initTexture(t);
      return t;
    });
    textures.set(src, p);
  }
  return p;
}

const vertexShader = /* glsl */ `
  uniform float uVelocity;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Scroll speed curves the sheet away from the viewer, like paper in air.
    float bend = sin(uv.x * 3.14159265);
    p.z -= bend * uVelocity * 0.3;
    p.y -= bend * uVelocity * 0.012;
    // The pointer presses the surface toward the viewer.
    float d = distance(uv, uMouse);
    p.z += uHover * 0.16 * exp(-d * d * 7.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uCover;
  uniform vec2 uSize;
  uniform float uRadius;
  uniform float uReveal;
  uniform float uVelocity;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    // Reveal: a soft, uneven front rising from the bottom edge.
    float n = noise(vUv * vec2(6.0, 2.0) + vec2(uTime * 0.2, 0.0)) - 0.5;
    float front = uReveal * 1.4 - 0.2 + n * 0.18;
    float shown = smoothstep(vUv.y - 0.1, vUv.y, front);

    // Cover-fit. The zoom only exists while revealing and settles to exactly 1,
    // so a screenshot is always shown edge to edge, never cropped.
    float zoom = 1.0 + (1.0 - uReveal) * 0.12;
    vec2 uv = (vUv - 0.5) * uCover / zoom + 0.5;

    float s = uVelocity * 0.0045;
    // Negative LOD bias: sample the sharper mip level. Default trilinear
    // filtering blurs screenshots and photos noticeably when they're shown
    // at 50-80% of their source size.
    vec3 col = vec3(
      texture2D(uMap, uv + vec2(0.0, s), -0.9).r,
      texture2D(uMap, uv, -0.9).g,
      texture2D(uMap, uv - vec2(0.0, s), -0.9).b
    );

    // A thin line of light rides the reveal front.
    col += smoothstep(0.045, 0.0, abs(vUv.y - front)) * (1.0 - uReveal) * 0.5;

    // Rounded corners in pixels.
    vec2 px = vUv * uSize;
    vec2 hs = uSize * 0.5;
    vec2 q = abs(px - hs) - (hs - uRadius);
    float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
    float corner = clamp(0.5 - sd, 0.0, 1.0);

    gl_FragColor = vec4(col, shown * corner * uOpacity);
    #include <colorspace_fragment>
  }
`;

function makeUniforms() {
  return {
    uMap: { value: null as THREE.Texture | null },
    uCover: { value: new THREE.Vector2(1, 1) },
    uSize: { value: new THREE.Vector2(1, 1) },
    uRadius: { value: 0 },
    uReveal: { value: 0 },
    uVelocity: { value: 0 },
    uOpacity: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
  };
}

/** The plane can stand in for the DOM <img> now: let CSS hide it. */
function markReady(el: HTMLElement) {
  if (el.dataset.gl !== "ready") el.dataset.gl = "ready";
}

type PlaneState = {
  lastEl: HTMLElement | null;
  shownPrev: boolean;
  lean: Spring;
  x: Spring;
  y: Spring;
  w: Spring;
  h: Spring;
  claim: number;
  flying: boolean;
  placed: boolean;
  revealStart: number;
  instant: boolean;
  vel: Spring;
  hover: Spring;
  opacity: Spring;
};

function Plane({ entry }: { entry: GLImageEntry }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let live = true;
    loadTexture(entry.src, gl).then((t) => {
      if (!live) return;
      setTex(t);
      lensStore.dirty = true;
    });
    return () => {
      live = false;
    };
  }, [entry.src, gl]);

  // Mutated every frame through the ref, as three.js materials are meant to be.
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => makeUniforms(), []);
  useEffect(() => {
    if (matRef.current) matRef.current.uniforms.uMap.value = tex;
  }, [tex]);

  const st = useRef<PlaneState>({
    lastEl: null,
    shownPrev: false,
    lean: spring(),
    x: spring(),
    y: spring(),
    w: spring(),
    h: spring(),
    claim: -1,
    flying: false,
    placed: false,
    revealStart: -1,
    instant: false,
    vel: spring(),
    hover: spring(),
    opacity: spring(),
  });

  useFrame((state, dt) => {
    const s = st.current;
    const u = matRef.current.uniforms;
    const W = size.width;
    const H = size.height;
    const t = state.clock.elapsedTime;
    const reduced = lensStore.reducedMotion;
    const el = entry.el;
    let busy = false;

    // ---- where the DOM says the image is --------------------------------------
    let tx = s.x.x;
    let ty = s.y.x;
    let tw = s.w.x;
    let th = s.h.x;
    if (el) {
      const r = el.getBoundingClientRect();
      tx = r.left + r.width / 2;
      ty = r.top + r.height / 2;
      tw = r.width;
      th = r.height;
    }

    // ---- a new element claimed this id: land on it, or fly to it --------------
    if (el && entry.claim !== s.claim) {
      s.claim = entry.claim;
      const sameEl = el === s.lastEl; // StrictMode re-registration, not a handoff
      const handoff = !sameEl && s.placed && !!tex && s.opacity.x > 0.05;
      s.lastEl = el;
      if (handoff && !reduced) {
        s.flying = true;
        s.instant = true;
        if (s.revealStart < 0) s.revealStart = t;
      } else if (!sameEl || !s.placed) {
        s.x.x = tx;
        s.y.x = ty;
        s.w.x = tw;
        s.h.x = th;
        s.flying = false;
        s.placed = true;
        if (!sameEl) {
          s.revealStart = -1;
          s.instant = false;
        }
      }
    }

    if (s.flying) {
      const k = 70;
      const c = 15;
      stepSpring(s.x, tx, dt, k, c);
      stepSpring(s.y, ty, dt, k, c);
      stepSpring(s.w, tw, dt, k, c);
      stepSpring(s.h, th, dt, k, c);
      const err = Math.abs(s.x.x - tx) + Math.abs(s.y.x - ty) + Math.abs(s.w.x - tw) + Math.abs(s.h.x - th);
      const spd = Math.abs(s.x.v) + Math.abs(s.y.v) + Math.abs(s.w.v) + Math.abs(s.h.v);
      if (err < 1 && spd < 20) s.flying = false;
      busy = true;
    } else if (el) {
      // Exact tracking: the same frame as the DOM, so they never drift apart.
      s.x.x = tx;
      s.y.x = ty;
      s.w.x = tw;
      s.h.x = th;
      s.x.v = s.y.v = s.w.v = s.h.v = 0;
    }

    const top = s.y.x - s.h.x / 2;
    const bottom = s.y.x + s.h.x / 2;
    const onScreen = s.w.x > 2 && s.h.x > 2 && bottom > -40 && top < H + 40;

    // ---- opacity: survive a page change only if this is the kept image ---------
    const kept = glNav.keep === entry.id;
    const leaving = (glNav.leaving && !kept) || (!el && !kept);
    // Elements can hide their plane (hover previews) with data-gl-visible="false".
    const follow = !!el && el.dataset.glFollow === "true";
    const shown = !el || el.dataset.glVisible !== "false";
    if (follow && shown && !s.shownPrev && tex) {
      s.revealStart = t;
      s.instant = false;
    }
    s.shownPrev = shown;
    const targetOpacity = tex && s.placed && !leaving && shown ? 1 : 0;
    if (reduced) s.opacity.x = targetOpacity;
    else stepSpring(s.opacity, targetOpacity, dt, leaving ? 160 : 120, leaving ? 24 : 22);
    if (Math.abs(s.opacity.x - targetOpacity) > 0.002) busy = true;

    // ---- reveal ---------------------------------------------------------------
    if (tex && el && s.revealStart < 0) {
      if (el.dataset.inview === "true" && el.dataset.gl !== "ready") {
        // The DOM <img> is already on screen: swap in place, no second reveal.
        s.instant = true;
        s.revealStart = t;
        s.opacity.x = 1;
        s.opacity.v = 0;
      } else if (onScreen && top < H * 0.88 && !follow) {
        s.revealStart = t;
      }
    }
    const rp = s.revealStart < 0 ? 0 : s.instant || reduced ? 1 : Math.min(1, (t - s.revealStart) / (follow ? 0.7 : 1.6));
    const reveal = 1 - Math.pow(1 - rp, 3);
    if (rp > 0 && rp < 1) busy = true;

    // Hand over from the DOM <img> once the plane can stand in for it.
    if (el && tex && s.placed) markReady(el);

    // ---- motion inputs --------------------------------------------------------
    const v = reduced ? 0 : THREE.MathUtils.clamp(lensStore.scroll.velocity / 26, -1.4, 1.4);
    stepSpring(s.vel, v, dt, 90, 14);
    const p = lensStore.pointer;
    const px = ((p.x + 1) / 2) * W;
    const py = ((1 - p.y) / 2) * H;
    const left = s.x.x - s.w.x / 2;
    const inside = !!el && p.seen && !reduced && px > left && px < left + s.w.x && py > top && py < bottom;
    stepSpring(s.hover, inside ? 1 : 0, dt, 110, 18);
    if (inside) u.uMouse.value.set((px - left) / s.w.x, 1 - (py - top) / s.h.x);
    if (Math.abs(s.vel.x) > 0.002 || Math.abs(s.hover.v) > 0.002) busy = true;

    // ---- world transform ------------------------------------------------------
    const upp = (2 * (camera.position.z - Z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / H;
    const m = mesh.current;
    m.visible = onScreen && s.opacity.x > 0.003 && !!tex;
    m.position.set((s.x.x - W / 2) * upp, -(s.y.x - H / 2) * upp, Z);
    // Hover previews lean into the pointer's motion, like a card on a string.
    const lean = follow && !reduced ? THREE.MathUtils.clamp(-p.vx * 0.05, -0.2, 0.2) : 0;
    stepSpring(s.lean, lean, dt, 80, 11);
    m.rotation.z = s.lean.x;
    m.rotation.y = s.lean.x * -0.6;
    m.renderOrder = follow ? -5 : -20;
    if (Math.abs(s.lean.v) > 0.001) busy = true;
    m.scale.set(Math.max(1e-4, s.w.x * upp), Math.max(1e-4, s.h.x * upp), 1);

    if (tex) {
      const img = tex.image as { width: number; height: number };
      const pa = s.w.x / Math.max(1, s.h.x);
      const ia = img.width / img.height;
      if (pa > ia) u.uCover.value.set(1, ia / pa);
      else u.uCover.value.set(pa / ia, 1);
    }
    u.uSize.value.set(s.w.x, s.h.x);
    u.uRadius.value = entry.radius;
    u.uReveal.value = reveal;
    u.uVelocity.value = s.vel.x;
    u.uHover.value = s.hover.x;
    u.uOpacity.value = s.opacity.x;
    u.uTime.value = t;

    if (busy) lensStore.dirty = true;
  });

  return (
    <mesh ref={mesh} geometry={geometry} layers={LAYER.DEFAULT} renderOrder={-20} frustumCulled={false} visible={false}>
      <shaderMaterial ref={matRef} args={[{ vertexShader, fragmentShader, uniforms, transparent: true, depthWrite: false }]} />
    </mesh>
  );
}

export function GLImagesLayer() {
  const list = useGLImages();
  return (
    <>
      {list.map((e) => (
        <Plane key={e.id} entry={e} />
      ))}
    </>
  );
}
