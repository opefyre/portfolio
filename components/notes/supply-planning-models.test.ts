import test from "node:test";
import assert from "node:assert/strict";
import { batchOrders, bullwhip, weeklyPurchases, eoqCosts, eoqChoice, sopPlan } from "./supply-planning-models";

test("batching conserves requests at each week, including an unfinished review period", () => {
  let received = 0, released = 0;
  for (const row of batchOrders([98, 102, 99], 2)) {
    received += row.received; released += row.order;
    assert.equal(released + row.pending, received);
  }
  assert.equal(batchOrders([98, 102, 99], 2).at(-1)!.pending, 99);
  assert.throws(() => batchOrders([1], 0));
});
test("default retailer and distributor calendars preserve all 800 units", () => {
  const { retailer, distributor, total } = bullwhip(2, 4);
  assert.equal(total, 800);
  assert.deepEqual(retailer.map(r => r.order), [0, 200, 0, 200, 0, 200, 0, 200]);
  assert.deepEqual(distributor.map(r => r.order), [0, 0, 0, 400, 0, 0, 0, 400]);
  for (const rows of [retailer, distributor]) {
    assert.equal(rows.reduce((s, r) => s + r.order, 0), total);
    assert.equal(rows.at(-1)!.pending, 0);
  }
});
test("removing one batching calendar does not remove the other", () => {
  assert.deepEqual(bullwhip(1, 4).distributor.map(r => r.order), [0, 0, 0, 400, 0, 0, 0, 400]);
  assert.deepEqual(bullwhip(1, 1).distributor.map(r => r.order), weeklyPurchases);
});
test("EOQ optimum equalises the two modelled annual costs", () => {
  const choice = eoqChoice(), cost = eoqCosts(choice.optimum);
  assert.ok(Math.abs(choice.optimum - 692.820323027551) < 1e-8);
  assert.ok(Math.abs(cost.ordering - cost.holding) < 1e-8);
  assert.ok(Math.abs(cost.total - 2078.460969082653) < 1e-8);
  assert.equal(eoqChoice(20).optimum, 400);
});
test("EOQ checks neighbouring pack sizes rather than always rounding up", () => {
  assert.equal(eoqChoice(60, 1).best.quantity, 693);
  assert.equal(eoqChoice(60, 100).best.quantity, 700);
  assert.equal(eoqChoice(60, 250).best.quantity, 750);
  assert.equal(eoqChoice(60, 500).best.quantity, 500);
  assert.equal(eoqChoice(20, 250).best.quantity, 500);
  assert.equal(eoqChoice(60, 100, 800).best.quantity, 800);
  assert.equal(eoqChoice(60, 100, 1200).best.quantity, 1200);
  assert.equal(eoqChoice(60, 100, 801).best.quantity, 900);
});
test("EOQ displayed examples and practical rounding agree with the cost function", () => {
  assert.deepEqual([300, 600, 1200].map(q => eoqCosts(q).total), [2850, 2100, 2400]);
  assert.ok(Math.abs(eoqCosts(700).total - 2078.5714285714284) < 1e-8);
  assert.throws(() => eoqCosts(0));
});
test("S&OP alternatives reconcile supply and uncovered demand against the same 12000 units", () => {
  const cases = [[0, 0, 10000, 2000, 0], [0, 2000, 12000, 0, 8000], [1500, 0, 11500, 500, 1200], [1500, 2000, 12000, 0, 3200]];
  for (const [early, cap, supply, gap, cost] of cases) {
    const p = sopPlan(early, cap);
    assert.equal(p.supply, supply); assert.equal(p.uncovered, gap); assert.equal(p.extraCost, cost);
    assert.equal(p.supply + p.uncovered, p.demand);
  }
});
test("S&OP only uses the overtime needed and keeps an unavailable-capacity gap visible", () => {
  assert.equal(sopPlan(1500, 2000).overtime, 500);
  assert.equal(sopPlan(1500, 500).uncovered, 0);
  assert.equal(sopPlan(0, 500).uncovered, 1500);
  assert.throws(() => sopPlan(1501, 0));
});
