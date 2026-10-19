import assert from "node:assert/strict";
import test from "node:test";
import { forecast, score } from "./paa-forecast-model";

function close(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);
}

test("the four forecasts use the information available after quarter eight", () => {
  assert.deepEqual(forecast("Last quarter"), [180, 180, 180, 180]);
  assert.deepEqual(forecast("Same quarter last year"), [90, 110, 140, 180]);
  const expected = [194.28571428571428, 208.57142857142858, 222.85714285714286, 237.14285714285714];
  forecast("Drift").forEach((value, i) => close(value, expected[i]));
});

test("full-year scores separate absolute error from cancelling signed errors", () => {
  const last = score("Last quarter", 4);
  assert.equal(last.total, 565);
  assert.equal(last.absolute, 175);
  assert.equal(last.signed, 155);
  assert.equal(last.mae, 43.75);
  close(last.wape, 30.97345132743363);
  close(last.bias, 27.43362831858407);

  const seasonal = score("Same quarter last year", 4);
  assert.equal(seasonal.absolute, 45);
  assert.equal(seasonal.signed, -45);
  assert.equal(seasonal.mae, 11.25);
  close(seasonal.wape, 7.964601769911504);
  close(seasonal.bias, -7.964601769911504);

  const drift = score("Drift", 4);
  close(drift.absolute, 297.8571428571429);
  close(drift.signed, 297.8571428571429);
  close(drift.wape, 52.7180783817952);
});

test("changing the scoring window changes the demand total and error together", () => {
  const first = score("Last quarter", 1);
  assert.equal(first.total, 100);
  assert.equal(first.absolute, 80);
  assert.equal(first.wape, 80);
  assert.equal(first.bias, 80);

  const two = score("Same quarter last year", 2);
  assert.equal(two.total, 225);
  assert.equal(two.absolute, 25);
  assert.equal(two.signed, -25);
  assert.equal(two.mae, 12.5);
  close(two.wape, 11.11111111111111);
});
