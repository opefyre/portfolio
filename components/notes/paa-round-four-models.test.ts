import assert from "node:assert/strict";
import test from "node:test";
import { fisherComparison } from "./paa-round-four-models";

// Independent exact-integer enumeration references are recorded in the article review.
const references: Array<[number, number, number, number, number]> = [
  [10, 30, 4, 30, 0.125278403507509],
  [0, 30, 0, 30, 1],
  [30, 30, 30, 30, 1],
  [10, 10, 0, 10, 0.00001082508822446903],
  [0, 1, 1, 1, 1],
  [3, 7, 4, 13, 0.6513544891640867],
  [1, 500, 0, 500, 1],
  [500, 500, 0, 500, 7.399507995628054e-300],
  [9, 16, 3, 19, 0.029821494782562637],
];

test("two-sided Fisher probabilities agree with independent exact tables", () => {
  for (const [a, n, b, m, expected] of references) {
    const result = fisherComparison(a, n, b, m);
    assert.ok(Math.abs(result.p - expected) <= Math.max(Number.MIN_VALUE * 10, expected * 1e-9));
    assert.ok(Math.abs(result.totalProbability - 1) < 1e-9);
    assert.ok(result.p > 0 && result.p <= 1);
    assert.equal(result.beforeOnTime, n - a);
    assert.equal(result.afterOnTime, m - b);
  }
});

test("exchanging periods or outcome labels preserves the two-sided test", () => {
  for (const [a, n, b, m] of references) {
    const original = fisherComparison(a, n, b, m);
    const exchanged = fisherComparison(b, m, a, n);
    const complemented = fisherComparison(n - a, n, m - b, m);
    const tolerance = Math.max(Number.MIN_VALUE * 10, original.p * 1e-9);
    assert.ok(Math.abs(original.p - exchanged.p) <= tolerance);
    assert.ok(Math.abs(original.p - complemented.p) <= tolerance);
    assert.ok(Math.abs(original.difference + exchanged.difference) < 1e-12);
  }
});

test("invalid or unsupported counts cannot produce a test result", () => {
  const invalid: Array<[number, number, number, number]> = [
    [-1, 30, 4, 30], [31, 30, 4, 30], [10, 0, 4, 30],
    [10, 501, 4, 30], [10.5, 30, 4, 30], [NaN, 30, 4, 30],
    [10, 30, -1, 30], [10, 30, 31, 30], [10, 30, 4, 0],
    [10, 30, 4, Infinity],
  ];
  for (const args of invalid) assert.throws(() => fisherComparison(...args));
});
