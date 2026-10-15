import assert from 'node:assert/strict';
import test from 'node:test';
import { inventoryReview, newlyDelayed } from './inventory-review';

test('default replay isolates one delayed periodic order and preserves the continuous trigger', () => {
  const c = inventoryReview('continuous'), p = inventoryReview('periodic');
  assert.deepEqual(c.filter(r => r.ordered).map(r => [r.day, r.ordered, r.due]), [[4,100,6],[9,100,11],[14,100,16]]);
  assert.deepEqual(p.filter(r => r.ordered).map(r => [r.day, r.ordered, r.due]), [[5,120,7],[10,100,12],[15,100,17]]);
  assert.equal(newlyDelayed(c), 0); assert.equal(newlyDelayed(p), 20);
  assert.equal(p[7].beforeReceipt, -20); assert.equal(p[7].net, 100);
});

test('every supported interval conserves units, respects review dates and receives exactly once', () => {
  for (const policy of ['continuous', 'periodic'] as const) for (const interval of [3,5,7]) {
    const rows = inventoryReview(policy, interval);
    for (const row of rows) {
      const history = rows.slice(0, row.day + 1);
      assert.equal(row.net, 140 + history.reduce((s,r) => s+r.received-r.demand,0));
      const inTransit = history.filter(r => r.due !== null && r.due > row.day).reduce((s,r) => s+r.ordered,0);
      assert.equal(row.position, row.net + inTransit);
      assert.equal(row.received, rows.filter(r => r.due === row.day).reduce((s,r) => s+r.ordered,0));
      if (policy === 'periodic' && row.ordered) assert.equal(row.day % interval, 0);
      if (policy === 'continuous' && row.ordered) assert.ok(row.positionBeforeOrder <= 40);
    }
  }
});
