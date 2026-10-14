export const approvalBaseline = { requests: 100, hours: 2400, returned: 5 };
export const approvalTrials = [
  { label: "Faster, more corrections", requests: 120, hours: 1920, returned: 12 },
  { label: "Faster, same correction rate", requests: 120, hours: 1920, returned: 6 },
] as const;
export function approvalResult(record: { requests: number; hours: number; returned: number }) {
  const average = record.hours / record.requests;
  const rate = record.returned / record.requests * 100;
  return { average, rate, timeMet: average <= 18, qualityMet: rate <= 5 };
}

// Event states, not a time-stepped simulation. Only one box is withdrawn.
export const kanbanEvents = [
  { label: "Start full", shelfBoxes: 3, signal: "Attached to a full box on the shelf", upstream: "No replacement authorised", cardAt: "shelf", newBox: 0, note: "All three cards are attached to full boxes. Assembly has not withdrawn anything." },
  { label: "Withdraw a box", shelfBoxes: 2, signal: "Detached, awaiting collection", upstream: "No signal received yet", cardAt: "return", newBox: 0, note: "Assembly takes 20 brackets. The shelf has 40. The detached card still needs to reach the upstream team." },
  { label: "Return the signal", shelfBoxes: 2, signal: "Received by the upstream team", upstream: "One box of 20 authorised", cardAt: "upstream", newBox: 0, note: "The card authorises a single replacement. It gives no permission to produce tomorrow's forecast as well." },
  { label: "Make the replacement", shelfBoxes: 2, signal: "Assigned to replacement work", upstream: "One replacement box completed", cardAt: "upstream", newBox: 20, note: "The shelf still holds 40 brackets. The new box of 20 is ready upstream, not available at the shelf yet." },
  { label: "Return the box", shelfBoxes: 3, signal: "Attached to the replacement on the shelf", upstream: "No further replacement authorised", cardAt: "shelf", newBox: 0, note: "The shelf returns to 60 brackets. Another production signal requires another withdrawal." },
] as const;
export const charterRequests = [
  { label: "Zone A label trial", amount: 1200, inScope: true, reason: "Within the authorised zone and pilot purpose. Normal purchasing and technical checks still apply." },
  { label: "Extend to zone B", amount: 1200, inScope: false, reason: "Zone B is excluded. Spare budget does not authorise extending the project area." },
  { label: "Larger zone A purchase", amount: 3000, inScope: true, reason: "The proposed total exceeds the cap by €500. Revise the request or seek a funding decision before committing it." },
] as const;
export function charterDecision(request: { amount: number; inScope: boolean }) {
  const committed = 5500, cap = 8000, total = committed + request.amount;
  return { committed, cap, total, remaining: cap - total, budgetMet: total <= cap, delegated: request.inScope && total <= cap };
}
