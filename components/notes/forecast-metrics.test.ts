import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateForecastMetrics as calculate, forecastExamples, type ForecastInput } from "./forecast-metrics";

const close = (actual: number | null, expected: number) => { assert.notEqual(actual, null); assert.ok(Math.abs(actual! - expected) < 1e-9, `${actual} != ${expected}`); };
const row = (actual: string, a: string, b = a): ForecastInput => ({ id: 1, label: "Test", actual, a, b });

test("the published comparison has opposite winners and signed underforecasting", () => {
  const r = calculate(forecastExamples.comparison);
  assert.equal(r.actual, 1110);
  assert.equal(r.a!.absolute, 111); assert.equal(r.b!.absolute, 20);
  close(r.a!.mape, 10); close(r.b!.mape, 56 / 3);
  close(r.a!.wape, 10); close(r.b!.wape, 200 / 111);
  close(r.a!.bias, -10); close(r.b!.bias, -200 / 111);
});
test("zero actuals are retained in WAPE but make full-set MAPE undefined", () => {
  const r = calculate(forecastExamples.zeros);
  assert.equal(r.zeroRows, 2); assert.equal(r.a!.mape, null); assert.equal(r.b!.mape, null);
  assert.equal(r.a!.absolute, 2); assert.equal(r.b!.absolute, 6);
  close(r.a!.wape, 100 / 6); close(r.b!.wape, 50); close(r.b!.bias, 100 / 6);
});
test("offsetting errors give zero bias but substantial absolute error", () => {
  const r = calculate(forecastExamples.bias);
  close(r.a!.bias, 0); close(r.a!.wape, 20); close(r.b!.bias, -10); close(r.b!.wape, 10);
});
test("all-zero actuals leave percentages undefined even with perfect forecasts", () => {
  const r = calculate([row("0", "0", "2")]);
  assert.equal(r.a!.absolute, 0); assert.equal(r.b!.absolute, 2);
  for (const score of [r.a!, r.b!]) { assert.equal(score.mape, null); assert.equal(score.wape, null); assert.equal(score.bias, null); }
});
test("unused rows do not change the sample and missing inputs pause both scores", () => {
  const complete = row("10", "8", "9");
  const blank = { ...row("", ""), id: 2 };
  const r = calculate([complete, blank]); assert.equal(r.unused, 1); assert.equal(r.rows.length, 1); close(r.a!.wape, 20);
  const partial = calculate([complete, { ...blank, actual: "10" }]);
  assert.deepEqual(partial.issues[0].fields, ["a", "b"]); assert.equal(partial.a, null); assert.equal(partial.b, null);
});
test("malformed, negative and nonfinite quantities cannot become zero", () => {
  for (const value of ["-1", "NaN", "Infinity", "1,000", "0x10", "1e999", "hello"]) {
    const r = calculate([row(value, "0")]); assert.equal(r.a, null); assert.deepEqual(r.issues[0].fields, ["actual"]);
  }
});
test("decimals and unit rescaling preserve percentage errors", () => {
  const original = calculate([row("20", "25", "10")]);
  const scaled = calculate([row(".2", ".25", ".1")]);
  close(scaled.a!.mape, original.a!.mape!); close(scaled.a!.wape, original.a!.wape!); close(scaled.b!.bias, -50);
});
test("errors over 100 percent are reported without clamping", () => {
  const r = calculate([row("1", "4")]); close(r.a!.mape, 300); close(r.a!.wape, 300); close(r.a!.bias, 300);
});
test("empty sets and numeric overflow do not produce misleading scores", () => {
  assert.equal(calculate([]).a, null);
  const r = calculate([row("1e308", "0"), { ...row("1e308", "0"), id: 2 }]);
  assert.equal(r.overflow, true); assert.equal(r.a, null); assert.equal(r.b, null);
});
