/**
 * three.js render layers used by the lens pipeline.
 *
 * - DEFAULT (0): seen normally AND through the glass (e.g. the calibration plate).
 * - SURFACE (1): seen normally but NOT through the glass. The lens itself lives
 *   here (so it's excluded from its own transmission buffer), as does any text
 *   that the lens should "replace" when it passes over.
 * - THROUGH (2): only visible through the glass. Hidden secondary text lives
 *   here: it exists only in the transmission buffer, so the lens genuinely
 *   reveals it by refraction.
 */
export const LAYER = {
  DEFAULT: 0,
  SURFACE: 1,
  THROUGH: 2,
} as const;
