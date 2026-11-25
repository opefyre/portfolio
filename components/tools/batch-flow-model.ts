export type TransferSize = 1 | 2 | 5 | 10;
export type Operation = { item: number; station: number; start: number; end: number; release: number };
export type FlowSchedule = { operations: Operation[]; first: number; finish: number; averageWaiting: number; completions: number[] };

/** Ten identical items, FIFO, three single-capacity stations and instantaneous transfers. */
export function scheduleFlow(batch: TransferSize, times: readonly number[]): FlowSchedule {
  if (![1, 2, 5, 10].includes(batch) || times.length !== 3 || times.some(t => !Number.isFinite(t) || t <= 0)) throw new Error("Use a valid transfer size and three positive processing times.");
  const operations: Operation[] = [];
  const stages: Operation[][] = [];
  for (let station = 0; station < 3; station++) {
    const stage: Operation[] = [];
    let available = 0;
    for (let item = 0; item < 10; item++) {
      const groupEnd = Math.min(9, Math.floor(item / batch) * batch + batch - 1);
      const release = station === 0 ? 0 : stages[station - 1][groupEnd].end;
      const start = Math.max(available, release);
      const op = { item, station, start, end: start + times[station], release };
      stage.push(op); operations.push(op); available = op.end;
    }
    stages.push(stage);
  }
  const completions = stages[2].map(op => op.end);
  const waiting = operations.reduce((sum, op) => sum + op.start - (op.station === 0 ? 0 : stages[op.station - 1][op.item].end), 0);
  return { operations, first: completions[0], finish: completions[9], averageWaiting: waiting / 10, completions };
}

export function itemState(schedule: FlowSchedule, item: number, time: number) {
  const ops = schedule.operations.filter(op => op.item === item);
  if (time >= ops[2].end) return { column: 6, processing: false, progress: 1, label: "Finished" };
  for (let s = 2; s >= 0; s--) {
    if (time >= ops[s].start && time < ops[s].end) return { column: s * 2 + 1, processing: true, progress: (time - ops[s].start) / (ops[s].end - ops[s].start), label: ["Prepare", "Process", "Finish"][s] };
    if (s > 0 && time >= ops[s - 1].end) return { column: s * 2, processing: false, progress: 0, label: "Waiting" };
  }
  return { column: 0, processing: false, progress: 0, label: "Ready" };
}
