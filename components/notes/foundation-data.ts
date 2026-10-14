export type ParetoMeasure = "count" | "delay" | "cost";
export const complaints = [
  { id: "late", label: "Late delivery", count: 40, delay: 200, cost: 800 },
  { id: "wrong", label: "Wrong item", count: 25, delay: 100, cost: 1000 },
  { id: "damage", label: "Damaged item", count: 15, delay: 60, cost: 1800 },
  { id: "documents", label: "Missing documents", count: 10, delay: 240, cost: 200 },
  { id: "billing", label: "Billing error", count: 8, delay: 16, cost: 400 },
  { id: "safety", label: "Safety concern", count: 2, delay: 24, cost: 800 },
];
export const measureLabels = {
  count: { label: "Complaint count", unit: "complaints", total: "100 complaints" },
  delay: { label: "Order delay", unit: "order-hours", total: "640 order-hours" },
  cost: { label: "Direct cost", unit: "EUR", total: "€5,000" },
};
export function rankComplaints(measure: ParetoMeasure) {
  const total = complaints.reduce((s, r) => s + r[measure], 0);
  let sum = 0;
  const rows = [...complaints].sort((a, b) => b[measure] - a[measure] || a.id.localeCompare(b.id)).map(r => {
    sum += r[measure];
    return { ...r, value: r[measure], share: r[measure] / total * 100, cumulative: sum / total * 100 };
  });
  return { total, rows };
}

export type QualityCase = "accuracy" | "completeness" | "uniqueness" | "consistency" | "timeliness" | "validity";
export const qualityCases: Record<QualityCase, {
  label: string; record: string; evidence: string; rawQuantity: number | null;
  reviewedQuantity: number | null; action: string; explanation: string;
}> = {
  accuracy: {
    label: "Accuracy", record: "R17: 100 individual brackets at location A1, recorded for Monday 08:00.",
    evidence: "A checked physical count for the same item, location and time finds 80 usable brackets.",
    rawQuantity: 100, reviewedQuantity: 80,
    action: "Correct and investigate the stock discrepancy.",
    explanation: "Both 100 and 80 pass a whole-number format check. The physical evidence changes the net requirement from 20 to 40.",
  },
  completeness: {
    label: "Completeness", record: "R17: item and location are present. Usable quantity is blank.",
    evidence: "No usable-stock quantity has been supplied or verified for the planning time.",
    rawQuantity: null, reviewedQuantity: null,
    action: "Get the missing quantity before approving the order.",
    explanation: "A blank is unknown. Substituting zero would produce a 120-unit order without evidence that stock is zero.",
  },
  uniqueness: {
    label: "Uniqueness", record: "Two exact copies of R17 each show 100 brackets for A1 at the same snapshot time. A naive sum gives 200.",
    evidence: "The import review confirms one snapshot was loaded twice. It represents one stock position, not two bins.",
    rawQuantity: 200, reviewedQuantity: 100,
    action: "Retain one snapshot under the verified duplicate rule.",
    explanation: "Removing the confirmed duplicate restores a 20-unit net requirement. Matching item codes alone would not justify deleting a row.",
  },
  consistency: {
    label: "Consistency", record: "ERP: 100 individual brackets at A1. Warehouse record: 8 cases at A1, with 10 brackets per case.",
    evidence: "The warehouse record converts to 80 individual brackets. No source has yet been confirmed as authoritative for this snapshot.",
    rawQuantity: 100, reviewedQuantity: null,
    action: "Reconcile the two records with the stock owner.",
    explanation: "The unit conversion exposes the conflict. It does not establish whether 80 or 100 is the right usable balance.",
  },
  timeliness: {
    label: "Timeliness", record: "The screen still displays Friday's verified balance of 100 brackets.",
    evidence: "A confirmed dispatch of 30 brackets occurred before Monday's planning time. No other movements occurred.",
    rawQuantity: 100, reviewedQuantity: 70,
    action: "Bring the confirmed movement into the current balance.",
    explanation: "The old count can be accurate for Friday and too old for Monday. Current stock is 70; the net requirement is 50.",
  },
  validity: {
    label: "Validity", record: "R17: physical count = −5 brackets. This field requires a non-negative whole number.",
    evidence: "The value fails the agreed rule for this physical-count field. No corrected count is available.",
    rawQuantity: -5, reviewedQuantity: null,
    action: "Reject the value and request a checked count.",
    explanation: "Signed adjustments may be legitimate in other fields. Here, calculating an order from an invalid physical count would disguise the error.",
  },
};
export function netRequirement(quantity: number | null, required = 120) {
  if (quantity === null || !Number.isFinite(quantity) || quantity < 0 || !Number.isInteger(quantity)) return null;
  return Math.max(0, required - quantity);
}
