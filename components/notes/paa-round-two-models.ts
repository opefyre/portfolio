/** Fictional teaching models. Keep units, boundaries and totals explicit. */
export const capacityMix = (productB: number) => {
  if (!Number.isFinite(productB) || productB < 0 || productB > 150 || !Number.isInteger(productB)) throw new Error('Product B must be a whole quantity from 0 to 150.');
  const productA = 300 - productB;
  const hoursA = productA * 0.10, hoursB = productB * 0.20;
  const required = hoursA + hoursB, available = 32;
  return { productA, productB, hoursA, hoursB, required, available, gap: Math.max(0, required - available), spare: Math.max(0, available - required), load: required / available * 100 };
};
export type FreightBasis = 'weight' | 'value';
export const landedAllocation = (basis: FreightBasis) => {
  if (basis !== 'weight' && basis !== 'value') throw new Error('Unknown freight allocation basis.');
  const freightA = 500 * (basis === 'weight' ? 200 / 250 : 2000 / 4000), freightB = 500 - freightA;
  const a = 2000 + freightA + 50 + 80 + 20, b = 2000 + freightB + 50 + 80 + 20;
  return { freightA, freightB, a, b, unitA: a / 100, unitB: b / 50, total: a + b };
};
