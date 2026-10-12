export type ForecastInput = { id: number; label: string; actual: string; a: string; b: string };
export type ForecastRow = { id: number; label: string; actual: number; a: number; b: number };
export type ForecastScore = { total: number; absolute: number; mape: number | null; wape: number | null; bias: number | null };
export type ForecastResult = {
  rows: ForecastRow[];
  issues: { id: number; fields: ("actual" | "a" | "b")[] }[];
  unused: number;
  zeroRows: number;
  actual: number;
  a: ForecastScore | null;
  b: ForecastScore | null;
  overflow: boolean;
};

export const forecastExamples: Record<"comparison" | "zeros" | "bias", ForecastInput[]> = {
  comparison: [
    { id: 1, label: "High-volume part", actual: "1000", a: "900", b: "990" },
    { id: 2, label: "Medium-volume part", actual: "100", a: "90", b: "95" },
    { id: 3, label: "Low-volume part", actual: "10", a: "9", b: "5" },
  ],
  zeros: [
    { id: 1, label: "Week 1", actual: "0", a: "0", b: "2" },
    { id: 2, label: "Week 2", actual: "0", a: "0", b: "2" },
    { id: 3, label: "Week 3", actual: "12", a: "10", b: "10" },
  ],
  bias: [
    { id: 1, label: "Week 1", actual: "100", a: "80", b: "90" },
    { id: 2, label: "Week 2", actual: "100", a: "120", b: "90" },
    { id: 3, label: "Week 3", actual: "100", a: "80", b: "90" },
    { id: 4, label: "Week 4", actual: "100", a: "120", b: "90" },
  ],
};

/** Demand quantities only. Missing, malformed and negative values are not zeros. */
function quantity(value: string): number | null {
  const text = value.trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const n = Number(text);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function calculateForecastMetrics(inputs: ForecastInput[]): ForecastResult {
  const result: ForecastResult = { rows: [], issues: [], unused: 0, zeroRows: 0, actual: 0, a: null, b: null, overflow: false };
  for (const input of inputs) {
    if ([input.actual, input.a, input.b].every(value => !value.trim())) { result.unused++; continue; }
    const actual = quantity(input.actual), a = quantity(input.a), b = quantity(input.b);
    const fields: ("actual" | "a" | "b")[] = [];
    if (actual === null) fields.push("actual");
    if (a === null) fields.push("a");
    if (b === null) fields.push("b");
    if (fields.length) { result.issues.push({ id: input.id, fields }); continue; }
    result.rows.push({ id: input.id, label: input.label, actual: actual!, a: a!, b: b! });
  }
  // Both forecasts use exactly the same observations; never report a partial set.
  if (result.issues.length || !result.rows.length) return result;
  result.actual = result.rows.reduce((sum, row) => sum + row.actual, 0);
  result.zeroRows = result.rows.filter(row => row.actual === 0).length;
  function score(key: "a" | "b"): ForecastScore {
    const total = result.rows.reduce((sum, row) => sum + row[key], 0);
    const absolute = result.rows.reduce((sum, row) => sum + Math.abs(row[key] - row.actual), 0);
    const signed = result.rows.reduce((sum, row) => sum + row[key] - row.actual, 0);
    const mape = result.zeroRows ? null : result.rows.reduce((sum, row) => sum + Math.abs(row[key] - row.actual) / row.actual, 0) / result.rows.length * 100;
    const wape = result.actual > 0 ? absolute / result.actual * 100 : null;
    const bias = result.actual > 0 ? signed / result.actual * 100 : null;
    return { total, absolute, mape, wape, bias };
  }
  result.a = score("a"); result.b = score("b");
  result.overflow = !Number.isFinite(result.actual) || [result.a, result.b].some(score => Object.values(score).some(value => value !== null && !Number.isFinite(value)));
  if (result.overflow) { result.a = null; result.b = null; }
  return result;
}
