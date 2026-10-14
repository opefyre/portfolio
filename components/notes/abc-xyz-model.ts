export type StockItem = {
  id: string;
  name: string;
  unit: string;
  unitCost: number;
  monthly: readonly (number | null)[];
  critical?: boolean;
};
export type Abc = "A" | "B" | "C";
export type Xyz = "X" | "Y" | "Z";
export type Thresholds = { a: number; b: number; x: number; y: number };
export const DEFAULT_RULE: Thresholds = { a: 0.8, b: 0.95, x: 0.25, y: 0.5 };
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const STOCK: readonly StockItem[] = [
  { id: "labels", name: "Label rolls", unit: "rolls", unitCost: 4, monthly: Array(12).fill(1000) },
  { id: "cartons", name: "Cartons", unit: "cartons", unitCost: 1, monthly: [500, 500, 1000, 1000, 1500, 2000, 2000, 2500, 3000, 4500, 6000, 7500] },
  { id: "tape", name: "Tape rolls", unit: "rolls", unitCost: 10, monthly: [50, 100, 150, 50, 100, 150, 50, 100, 150, 50, 100, 150] },
  { id: "film", name: "Stretch film", unit: "rolls", unitCost: 5, monthly: Array(12).fill(50) },
  { id: "fluid", name: "Cleaning fluid", unit: "litres", unitCost: 10, monthly: [10, 20, 20, 10, 20, 20, 10, 20, 20, 10, 20, 20] },
  { id: "gloves", name: "Glove boxes", unit: "boxes", unitCost: 5, monthly: Array(12).fill(25) },
  { id: "batteries", name: "Scanner batteries", unit: "batteries", unitCost: 100, monthly: [0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0] },
  { id: "fuses", name: "Drive fuses", unit: "fuses", unitCost: 50, monthly: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 9], critical: true },
];

export function usageStats(monthly: readonly (number | null)[]) {
  if (monthly.length !== 12 || monthly.some(v => v === null || !Number.isFinite(v) || v < 0)) return null;
  const values = monthly as readonly number[];
  const units = values.reduce((sum, n) => sum + n, 0);
  const mean = units / values.length;
  // Describe this full 12-month window: population SD, divisor 12.
  const sd = Math.sqrt(values.reduce((sum, n) => sum + (n - mean) ** 2, 0) / values.length);
  return { units, mean, sd, cv: mean === 0 ? null : sd / mean };
}

export function classify(items: readonly StockItem[], rule: Thresholds = DEFAULT_RULE) {
  if (!(0 < rule.a && rule.a < rule.b && rule.b < 1 && 0 <= rule.x && rule.x < rule.y && Number.isFinite(rule.y))) throw new Error("Invalid classification thresholds");
  const ranked = items.map(item => {
    if (!Number.isFinite(item.unitCost) || item.unitCost < 0) throw new Error("Invalid unit cost");
    const stats = usageStats(item.monthly);
    return { ...item, stats, value: stats === null ? null : stats.units * item.unitCost };
  }).sort((a, b) => (b.value ?? -1) - (a.value ?? -1) || a.id.localeCompare(b.id));
  const total = ranked.reduce((sum, item) => sum + (item.value ?? 0), 0);
  let accumulated = 0;
  const rows = ranked.map(item => {
    const before = total === 0 ? null : accumulated / total;
    // Include the item reaching or crossing a boundary in the earlier class.
    // Zero-value and missing-history items are left for a separate review.
    const abc: Abc | null = item.value === null || item.value === 0 || before === null ? null : before < rule.a - 1e-12 ? "A" : before < rule.b - 1e-12 ? "B" : "C";
    accumulated += item.value ?? 0;
    const cv = item.stats?.cv ?? null;
    const xyz: Xyz | null = cv === null ? null : cv <= rule.x ? "X" : cv <= rule.y ? "Y" : "Z";
    return { ...item, abc, xyz, share: total === 0 || item.value === null ? null : item.value / total, cumulative: total === 0 || item.value === null ? null : accumulated / total, cell: abc && xyz ? `${abc}${xyz}` : null };
  });
  return { total, rows, excluded: rows.filter(row => row.cell === null).length };
}
