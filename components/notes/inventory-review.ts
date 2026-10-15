export type ReviewRow = {
  day: number; demand: number; received: number; ordered: number; review: boolean;
  beforeReceipt: number; net: number; positionBeforeOrder: number; position: number; due: number | null;
};

/** One item; end-of-day demand, then due receipts, then ordering. Negative net means backorders. */
export function inventoryReview(policy: 'continuous' | 'periodic', interval = 5): ReviewRow[] {
  if (![3, 5, 7].includes(interval)) throw new Error('Unsupported review interval');
  const rows: ReviewRow[] = [];
  let net = 140;
  const pipeline: { day: number; quantity: number }[] = [];
  for (let day = 0; day <= 15; day++) {
    const demand = day === 0 ? 0 : day === 4 ? 40 : 20;
    net -= demand;
    const beforeReceipt = net;
    const received = pipeline.filter(p => p.day === day).reduce((s, p) => s + p.quantity, 0);
    net += received;
    const outstanding = pipeline.filter(p => p.day > day).reduce((s, p) => s + p.quantity, 0);
    const positionBeforeOrder = net + outstanding;
    const review = policy === 'continuous' || day % interval === 0;
    const ordered = !review ? 0 : policy === 'continuous' ? (positionBeforeOrder <= 40 ? 100 : 0) : Math.max(0, 20 * (interval + 2) - positionBeforeOrder);
    if (ordered) pipeline.push({ day: day + 2, quantity: ordered });
    rows.push({ day, demand, beforeReceipt, received, net, positionBeforeOrder, ordered, position: positionBeforeOrder + ordered, review, due: ordered ? day + 2 : null });
  }
  return rows;
}

export function newlyDelayed(rows: ReviewRow[]) {
  return rows.reduce((total, row) => total + Math.min(row.demand, Math.max(0, -row.beforeReceipt)), 0);
}
