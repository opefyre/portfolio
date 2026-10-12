import assert from "node:assert/strict";
import { test } from "node:test";
import { Timer } from "three";
import { createFiberTimer } from "./fiber-timer.mjs";

test("Timer adapter starts automatically and tracks seconds", context => {
  let now = 1000;
  context.mock.method(performance, "now", () => now);
  const clock = createFiberTimer(Timer);
  assert.equal(clock.getDelta(), 0);
  now += 250; assert.equal(clock.getDelta(), .25);
  now += 125; assert.equal(clock.getDelta(), .125);
  assert.equal(clock.getElapsedTime(), .375);
  assert.equal(clock.oldTime, 1375);
});
test("stop freezes time; start resets the elapsed count", context => {
  let now = 1000;
  context.mock.method(performance, "now", () => now);
  const clock = createFiberTimer(Timer); clock.start();
  now += 500; clock.stop(); assert.equal(clock.elapsedTime, .5);
  now += 5000; assert.equal(clock.getDelta(), 0); assert.equal(clock.getElapsedTime(), .5);
  clock.start(); assert.equal(clock.elapsedTime, 0);
  now += 100; assert.equal(clock.getDelta(), .1);
});
test("manual Fiber advancement can write elapsedTime without restarting the timer", () => {
  const clock = createFiberTimer(Timer); clock.stop(); clock.elapsedTime = 0;
  clock.oldTime = clock.elapsedTime; clock.elapsedTime = 1 / 60;
  assert.equal(clock.getDelta(), 0); assert.equal(clock.getElapsedTime(), 1 / 60);
  clock.oldTime = clock.elapsedTime; clock.elapsedTime = 1 / 30;
  assert.equal(clock.elapsedTime - clock.oldTime, 1 / 60);
});
