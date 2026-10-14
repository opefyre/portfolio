import test from "node:test";
import assert from "node:assert/strict";
import { complaints, rankComplaints, netRequirement, qualityCases } from "./foundation-data";

test("the same six categories reconcile to 100 complaints, 640 order-hours and 5000 EUR", () => {
  assert.equal(new Set(complaints.map(r => r.id)).size, 6);
  assert.deepEqual(["count", "delay", "cost"].map(m => rankComplaints(m as "count" | "delay" | "cost").total), [100, 640, 5000]);
});
test("changing measure changes rank and cumulative denominator together", () => {
  const count = rankComplaints("count").rows, delay = rankComplaints("delay").rows, cost = rankComplaints("cost").rows;
  assert.deepEqual([count[0].id, delay[0].id, cost[0].id], ["late", "documents", "damage"]);
  assert.deepEqual([count[1].cumulative, count[2].cumulative, delay[0].share, cost[0].share], [65, 80, 37.5, 36]);
  for (const measure of ["count", "delay", "cost"] as const) {
    const { rows } = rankComplaints(measure);
    assert.equal(rows.at(-1)!.cumulative, 100);
    rows.forEach((r, i) => { if (i) { assert.ok(r.value <= rows[i - 1].value); assert.ok(r.cumulative >= rows[i - 1].cumulative); } });
  }
});
test("ties retain deterministic category order and do not change the original records", () => {
  const before = JSON.stringify(complaints);
  assert.deepEqual(rankComplaints("cost").rows.filter(r => r.value === 800).map(r => r.id), ["late", "safety"]);
  assert.equal(JSON.stringify(complaints), before);
});
test("unknown and invalid quantities remain unresolved, distinct from zero stock", () => {
  for (const q of [null, -5, NaN, Infinity, 1.5]) assert.equal(netRequirement(q), null);
  assert.equal(netRequirement(0), 120);
  assert.equal(netRequirement(200), 0);
});
test("stock review cases reconcile without treating conflicting evidence as a correction", () => {
  assert.deepEqual(["accuracy", "uniqueness", "timeliness"].map(k => netRequirement(qualityCases[k as keyof typeof qualityCases].reviewedQuantity)), [40, 20, 50]);
  for (const k of ["completeness", "consistency", "validity"] as const) assert.equal(netRequirement(qualityCases[k].reviewedQuantity), null);
  assert.equal(netRequirement(qualityCases.uniqueness.rawQuantity), 0);
});
