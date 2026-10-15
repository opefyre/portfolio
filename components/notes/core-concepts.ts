/** Original teaching cases. Day numbers are elapsed working-day boundaries. */
export function promiseDates(receiptDay: number, materialDay: number, capacityDay: number) {
  for (const d of [receiptDay, materialDay, capacityDay]) {
    if (!Number.isInteger(d) || d < 0 || d > 14) throw new Error('Use whole working days from 0 to 14.');
  }
  const stock = 80, allocated = 50, requested = 50, incoming = 40;
  const free = stock - allocated;
  const extra = requested - free;
  const start = Math.max(materialDay, capacityDay);
  const finish = start + 1;
  const atp = receiptDay;
  const ctp = Math.min(atp, finish);
  return { stock, allocated, requested, incoming, free, extra, start, finish, atp, ctp,
    chosen: finish < atp ? 'build' as const : 'existing' as const,
    existingRemainder: free + incoming - requested };
}

export function failureWindow(failures: number) {
  if (!Number.isInteger(failures) || failures < 1 || failures > 20) throw new Error('Use 1 to 20 completed failures.');
  const operating = 80, restoration = 20, window = operating + restoration;
  const run = operating / failures, stop = restoration / failures;
  const events = Array.from({ length: failures }, (_, i) => ({
    number: i + 1, runStart: i * window / failures,
    failed: i * window / failures + run, restored: (i + 1) * window / failures,
  }));
  return { failures, operating, restoration, window, mtbf: run, mttr: stop,
    observedRunningShare: operating / window, events };
}

const receipt = Object.freeze({ id: 'R-082', product: 'P-204', boxes: 10, packAtPosting: 12, postedUnits: 120 });
export function receiptHistory(currentPack: number) {
  if (currentPack !== 12 && currentPack !== 24) throw new Error('This example uses a 12-unit or 24-unit pack.');
  return { receipt, currentPack, recomputed: receipt.boxes * currentPack,
    inventedIncrease: receipt.boxes * currentPack - receipt.postedUnits,
    proposedBoxes: 10, proposedUnits: 10 * currentPack };
}
