export function planningFence(fence: number, changeWeek: number, requirement: number, exception = false) {
  const protectedChange = changeWeek <= fence;
  let automaticNet = 0, reviewedNet = 0;
  const rows = Array.from({ length: 6 }, (_, i) => {
    const week = i + 1, demand = week === changeWeek ? requirement : 100;
    const automatic = week === changeWeek && !protectedChange ? requirement : 100;
    const reviewed = week === changeWeek && (!protectedChange || exception) ? requirement : 100;
    automaticNet += automatic - demand;
    reviewedNet += reviewed - demand;
    return { week, demand, baseline: 100, automatic, reviewed, automaticNet, reviewedNet, frozen: week <= fence };
  });
  return { rows, protectedChange, automaticNet, reviewedNet, requirementTotal: rows.reduce((n,r)=>n+r.demand,0) };
}

export function clockLabel(minutes: number) {
  return `${Math.floor(minutes / 60).toString().padStart(2,'0')}:${(minutes % 60).toString().padStart(2,'0')}`;
}
export function ctqDelivery(arrival = 450, quantity = 100, damaged = 0) {
  const quantityByDeadline = arrival <= 600 ? quantity : 0;
  const usableByDeadline = arrival <= 600 ? quantity - damaged : 0;
  const deadlineTiming = arrival <= 600, windowTiming = arrival >= 480 && arrival <= 600;
  const quantityMet = quantityByDeadline === 100, conditionMet = damaged === 0;
  return { arrival, quantity, damaged, quantityByDeadline, usableByDeadline, deadlineTiming, windowTiming, quantityMet, conditionMet,
    deadlinePass: deadlineTiming && quantityMet && conditionMet, windowPass: windowTiming && quantityMet && conditionMet };
}

export type GateDecision = 'go' | 'hold' | 'rework' | 'stop';
export const GATE_OPTIONS: {id: GateDecision;label: string;meaning: string}[] = [
  {id:'go',label:'Go',meaning:'Authorise a defined next stage with scope, resources and conditions recorded.'},
  {id:'hold',label:'Hold',meaning:'Wait for specified missing evidence, with an owner and a return date.'},
  {id:'rework',label:'Rework',meaning:'Revise the proposal or approach and bring it back for another decision.'},
  {id:'stop',label:'Stop',meaning:'Do not proceed; organise closure, existing obligations and retained learning.'},
];
export function phaseGate(decision: GateDecision, supportReady = false) {
  const goSupported = supportReady;
  return { decision, supportReady, goSupported, pilotSpent: 8000, rolloutRequest: 40000,
    supportedGoCeiling: decision === 'go' && goSupported ? 40000 : 0,
    totalIfFullRolloutAuthorised: 48000, lateRate: 20 / 1000 * 100, errorRate: 8 / 1000 * 100 };
}
