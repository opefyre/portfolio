import test from 'node:test';
import assert from 'node:assert/strict';
import { promiseDates, failureWindow, receiptHistory } from './core-concepts';

test('promising protects 50 old units and chooses the earlier feasible complete-order route', () => {
  const a = promiseDates(4, 1, 2);
  assert.deepEqual([a.free, a.extra, a.start, a.finish, a.atp, a.ctp], [30, 20, 2, 3, 4, 3]);
  const delayedCapacity = promiseDates(4, 1, 5);
  assert.equal(delayedCapacity.finish, 6);
  assert.equal(delayedCapacity.ctp, 4);
  assert.equal(delayedCapacity.chosen, 'existing');
  for (const r of [2, 4, 7]) for (const m of [1, 4]) for (const c of [2, 5]) {
    const p = promiseDates(r, m, c);
    assert.ok(p.ctp <= p.atp);
    assert.ok(p.start >= m && p.start >= c);
    assert.equal(p.finish - p.start, 1);
    assert.equal(p.free + p.extra, p.requested);
    assert.equal(p.existingRemainder, 20);
    assert.equal(p.stock - p.free, 50);
  }
  assert.equal(promiseDates(3, 1, 2).chosen, 'existing', 'a tie does not require an extra batch');
  assert.throws(() => promiseDates(-1, 1, 2));
});

test('failure timelines conserve observed time and reconcile failure and restoration clocks', () => {
  const a = failureWindow(10), b = failureWindow(2);
  assert.deepEqual([a.mtbf, a.mttr, b.mtbf, b.mttr], [8, 2, 40, 10]);
  for (let n = 1; n <= 20; n++) {
    const r = failureWindow(n);
    const run = r.events.reduce((s, e) => s + e.failed - e.runStart, 0);
    const stop = r.events.reduce((s, e) => s + e.restored - e.failed, 0);
    assert.ok(Math.abs(run - 80) < 1e-9 && Math.abs(stop - 20) < 1e-9);
    assert.equal(r.events.at(-1)?.restored, 100);
    assert.equal(r.observedRunningShare, .8);
    assert.ok(Math.abs(r.mtbf * n - 80) < 1e-9 && Math.abs(r.mttr * n - 20) < 1e-9);
    for (let i = 1; i < n; i++) assert.ok(Math.abs(r.events[i].runStart - r.events[i - 1].restored) < 1e-9);
  }
  assert.throws(() => failureWindow(0), 'zero failures must not become an infinite estimate');
});

test('a current pack change cannot rewrite the original posted receipt', () => {
  const old = receiptHistory(12), changed = receiptHistory(24), returned = receiptHistory(12);
  assert.equal(changed.receipt.postedUnits, 120);
  assert.equal(changed.receipt.boxes * changed.receipt.packAtPosting, 120);
  assert.equal(changed.recomputed, 240);
  assert.equal(changed.inventedIncrease, 120);
  assert.equal(changed.proposedUnits, 240);
  assert.equal(old.inventedIncrease, 0);
  assert.deepEqual(old, returned);
  assert.equal(Object.isFrozen(changed.receipt), true);
  assert.throws(() => receiptHistory(0));
});
