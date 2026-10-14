export type ScopeOption = "add" | "swap" | "defer";
export const scopeChoices: { id: ScopeOption; label: string; note: string }[] = [
  { id: "add", label: "Add the dashboard", note: "Keep the daily report and add the dashboard before acceptance." },
  { id: "swap", label: "Replace the report", note: "Remove the two-day report. The dashboard must meet its agreed reporting needs." },
  { id: "defer", label: "Defer the dashboard", note: "Keep this pilot's work. Later dashboard work needs a separate decision and funding." },
];
export function scopePlan(option: ScopeOption, dashboardDays: number) {
  const work = [{ name: "Interface", days: 3, kind: "original" }, ...(option !== "swap" ? [{ name: "Daily report", days: 2, kind: "original" }] : []), ...(option !== "defer" ? [{ name: "Dashboard", days: dashboardDays, kind: "change" }] : []), { name: "Acceptance", days: 2, kind: "original" }, { name: "Handover", days: 1, kind: "original" }];
  let cursor = 0;
  const tasks = work.map(task => { const start = cursor; cursor += task.days; return { ...task, start, end: cursor }; });
  return { tasks, duration: cursor, cost: cursor * 600, difference: cursor - 8, futureCost: option === "defer" ? dashboardDays * 600 : 0 };
}

export const productionCases = [
  { label: "Reconciled update", posted: 960, confirmed: true, time: "09:27", note: "ERP received the accepted quantity. Forty good parts remain required; shipment readiness needs its own checks." },
  { label: "Gross posted as good", posted: 1000, confirmed: true, time: "09:27", note: "The posting includes the 40 scrap parts as good output. Correct and investigate the mapping before closing the order." },
  { label: "Update not received", posted: 0, confirmed: false, time: "No run receipt", note: "ERP has no receipt for this run. Reconcile the missing message with the accepted 960 before ordering another full batch." },
] as const;
export function productionBalance(index: number) {
  const record = productionCases[index], good = 1000 - 40;
  return { good, actualRemaining: 1000 - good, screenRemaining: 1000 - record.posted, discrepancy: record.posted - good, confirmed: record.confirmed };
}

export type TraceEvent = { activity: string; time: string };
export const requestTraces: { id: string; events: TraceEvent[] }[] = [
  { id: "R101", events: [{activity:"Submitted",time:"08:00"},{activity:"Reviewed",time:"08:10"},{activity:"Approved",time:"08:30"},{activity:"Closed",time:"08:40"}] },
  { id: "R102", events: [{activity:"Submitted",time:"08:05"},{activity:"Reviewed",time:"08:15"},{activity:"Returned",time:"08:20"},{activity:"Resubmitted",time:"10:00"},{activity:"Reviewed",time:"10:10"},{activity:"Approved",time:"10:30"},{activity:"Closed",time:"10:40"}] },
  { id: "R103", events: [{activity:"Submitted",time:"08:10"},{activity:"Reviewed",time:"08:20"},{activity:"Approved",time:"09:00"},{activity:"Closed",time:"09:10"}] },
  { id: "R104", events: [{activity:"Submitted",time:"08:15"},{activity:"Reviewed",time:"08:25"},{activity:"Returned",time:"08:30"},{activity:"Resubmitted",time:"09:30"},{activity:"Reviewed",time:"09:40"},{activity:"Approved",time:"10:00"},{activity:"Closed",time:"10:10"}] },
];
export function clockMinutes(time: string) { const [h,m] = time.split(":").map(Number); return h*60+m; }
export function traceResult(events: TraceEvent[]) {
  const origin = clockMinutes(events[0].time);
  const intervals = events.slice(1).map((end,i) => { const start = events[i]; return { from:start.activity, to:end.activity, startTime:start.time, endTime:end.time, start:clockMinutes(start.time)-origin, end:clockMinutes(end.time)-origin, minutes:clockMinutes(end.time)-clockMinutes(start.time) }; });
  return { duration:clockMinutes(events[events.length-1].time)-origin, returned:events.some(e=>e.activity==="Returned"), intervals };
}
export function transitionCounts() {
  const counts: Record<string,number> = {};
  for (const trace of requestTraces) for (const interval of traceResult(trace.events).intervals) { const key=`${interval.from} → ${interval.to}`; counts[key]=(counts[key]||0)+1; }
  return counts;
}
