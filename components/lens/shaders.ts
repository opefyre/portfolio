/**
 * GLSL for the Abosh Lens.
 *
 * The lens starts as a unit icosphere. Every vertex is pushed along its
 * direction by `lensRadius(n)`: a fixed, seeded asymmetry (the "pebble")
 * plus a slow living deformation plus a pointer-velocity bulge. Normals are
 * rebuilt from two neighbouring samples on the deformed surface so the
 * refraction and reflections follow the real, deformed shape: not the
 * original sphere.
 */

// Ashima Arts / Stefan Gustavson 3D simplex noise (MIT). Prefixed to avoid
// colliding with the `snoise` drei injects into the fragment shader.
export const simplexNoise3 = /* glsl */ `
vec3 lns_mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 lns_mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 lns_permute(vec4 x) { return lns_mod289(((x * 34.0) + 10.0) * x); }
vec4 lns_taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float lns_snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = lns_mod289(i);
  vec4 p = lns_permute(lns_permute(lns_permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = lns_taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const lensVertexHead = /* glsl */ `
uniform float uLensTime;
uniform float uLensLiving;     // amplitude of the slow living deformation
uniform float uLensVelocity;   // extra deformation driven by pointer/scroll velocity
uniform vec3  uLensVelDir;     // object-space direction of that velocity
uniform vec3  uLensShape;      // non-uniform scale of the base volume
uniform float uLensSeed;
uniform float uLensAsymmetry;  // strength of the fixed, seeded asymmetry
${simplexNoise3}

float lensRadius(vec3 n) {
  // Fixed asymmetry: two very low-frequency octaves, seeded, never animated.
  // This is what makes it a specific pebble instead of a generic blob.
  vec3 sp = n + vec3(uLensSeed, uLensSeed * 0.37, -uLensSeed * 0.61);
  // One very low octave + a smooth "egg" bias along a tilted axis: asymmetric,
  // but every curvature stays gentle so reflections remain unbroken.
  float fixedShape = lns_snoise(sp * 0.48) * 0.85
                   + dot(n, normalize(vec3(0.85, 0.3, -0.2))) * 0.6
                   + pow(max(dot(n, normalize(vec3(-0.6, -0.55, 0.5))), 0.0), 2.0) * 0.45;

  // Living deformation: very slow drift through 3D noise space so the motion
  // never repeats on a visible period.
  float t = uLensTime;
  vec3 lp = n * 0.7 + vec3(t * 0.061, -t * 0.043, t * 0.052);
  float living = lns_snoise(lp);

  // Velocity response: the glass leans into the direction of motion.
  float along = dot(n, uLensVelDir);
  float lean = along * abs(along);

  return 1.0 + fixedShape * uLensAsymmetry + living * uLensLiving + lean * uLensVelocity;
}

vec3 lensSurface(vec3 n) {
  return n * lensRadius(n) * uLensShape;
}
`;

/** Replaces `#include <beginnormal_vertex>`: computes deformed position AND its normal. */
export const lensBeginNormal = /* glsl */ `
vec3 lnsDir = normalize(position);
vec3 lnsRef = abs(lnsDir.y) < 0.98 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
vec3 lnsT = normalize(cross(lnsDir, lnsRef));
vec3 lnsB = normalize(cross(lnsDir, lnsT));
const float lnsEps = 0.012;
vec3 lnsP  = lensSurface(lnsDir);
vec3 lnsP1 = lensSurface(normalize(lnsDir + lnsT * lnsEps));
vec3 lnsP2 = lensSurface(normalize(lnsDir + lnsB * lnsEps));
vec3 objectNormal = normalize(cross(lnsP1 - lnsP, lnsP2 - lnsP));
if (dot(objectNormal, lnsP) < 0.0) objectNormal = -objectNormal;
`;

/** Replaces `#include <begin_vertex>`. */
export const lensBeginVertex = /* glsl */ `
vec3 transformed = lnsP;
`;
