/**
 * Tiny damped-spring integrator. Semi-implicit Euler, mass = 1.
 * Used for everything the lens does physically: rotation toward the pointer,
 * velocity deformation, placement between sections.
 */
export type Spring = { x: number; v: number };

export const spring = (x = 0): Spring => ({ x, v: 0 });

export function stepSpring(
  s: Spring,
  target: number,
  dt: number,
  stiffness: number,
  damping: number,
) {
  // Clamp dt so a backgrounded tab doesn't explode the integration.
  const h = Math.min(dt, 1 / 30);
  s.v += (stiffness * (target - s.x) - damping * s.v) * h;
  s.x += s.v * h;
  return s.x;
}

/** Exponential decay toward zero, frame-rate independent. */
export const decay = (value: number, rate: number, dt: number) =>
  value * Math.exp(-rate * dt);

/**
 * Quasi-periodic drift: sum of sines at mutually irrational frequencies.
 * It never repeats on a visible period, so idle motion doesn't read as a loop.
 */
export function drift(t: number, seed: number) {
  return (
    Math.sin(t * 0.071 + seed) * 0.55 +
    Math.sin(t * 0.0413 * Math.SQRT2 + seed * 1.7) * 0.3 +
    Math.sin(t * 0.0237 * Math.PI + seed * 2.3) * 0.15
  );
}
