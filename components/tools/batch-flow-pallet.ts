import type { FlowSchedule } from './batch-flow-model';

/** A piece keeps its numbered slot as it moves between pallets. */
export function palletState(schedule: FlowSchedule, item: number, time: number) {
  const ops = schedule.operations.filter(op => op.item === item);
  let pallet = 0;
  if (time > 0) {
    if (time >= ops[2].end) pallet = 4;
    else if (time >= ops[2].release) pallet = 3;
    else if (time >= ops[1].release) pallet = 2;
    else if (time >= ops[0].start) pallet = 1;
  }
  const operation = pallet >= 1 && pallet <= 3 ? ops[pallet-1] : null;
  const working = !!operation && time > 0 && time >= operation.start && time < operation.end;
  return {
    pallet,
    slotX: (item % 2) * .64 - .32,
    slotZ: Math.floor(item / 2) * .58 - 1.16,
    working,
    processed: !!operation && time >= operation.end,
    progress: working && operation ? (time-operation.start)/(operation.end-operation.start) : 0,
  };
}
