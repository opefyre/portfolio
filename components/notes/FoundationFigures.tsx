"use client";

import { useId, useState } from "react";
import { complaints, measureLabels, netRequirement, qualityCases, rankComplaints, type ParetoMeasure, type QualityCase } from "./foundation-data";
import "./FoundationFigures.css";

export type FoundationFigureName = "digital-invoice-map" | "data-quality-records" | "pareto-measures";
const format = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 1 });

function InvoiceMap() {
  const [caseId, setCase] = useState("matching");
  const matching = caseId === "matching";
  return <>
    <header><p>Follow one invoice</p><h3>The file, the route and the responsibility</h3><p>Switch invoices to see where digitized information stops being enough.</p></header>
    <div className="foundation-controls"><label>Fictional invoice<select value={caseId} onChange={e => setCase(e.target.value)}><option value="matching">€1,200, order and receipt match</option><option value="exception">€8,200, quantity mismatch</option></select></label></div>
    <div className="invoice-lanes">
      <section><header><span>01</span><h4>Digitization</h4></header><div className="invoice-document"><span>Invoice</span><strong>{matching ? "€1,200" : "€8,200"}</strong><p>PDF + captured fields</p><div className="invoice-document-lines" aria-hidden="true"/></div><p>The information is digital. The approval method can still be the old email chain.</p></section>
      <section><header><span>02</span><h4>Digitalization</h4></header><ol className="invoice-steps"><li>Read invoice fields</li><li>Compare order + receipt</li><li className="invoice-highlight">{matching ? "Match confirmed" : "Quantity mismatch found"}</li><li>{matching ? "Send to approved route" : "Route to receiving"}</li></ol><p>{matching ? "Matching removes an exception. Approval still depends on the agreed policy." : "The workflow exposes the discrepancy. Someone still has to resolve what happened."}</p></section>
      <section><header><span>03</span><h4>Wider operating change</h4></header><div className="invoice-authority"><span>Example approval policy</span><strong>{matching ? "Authorised team lead" : "Receiving team first"}</strong><p>{matching ? "May approve a matching invoice below €5,000, within the agreed controls." : "Resolve the quantity difference. If it remains above €5,000, send to the named higher-value approver."}</p></div><p>Ownership, cover and escalation are agreed across Purchasing, Receiving and Finance.</p></section>
    </div>
    <p className="foundation-inspect" aria-live="polite">{matching ? "The matching invoice can follow the lower-value route only because the authority and checks are approved. The PDF alone grants no authority." : "The mismatch remains visible. Neither a digital file nor a routing rule proves that the supplier's invoice or the warehouse receipt is right."}</p>
  </>;
}

function QualityRecords() {
  const [selected, setSelected] = useState<QualityCase>("accuracy");
  const item = qualityCases[selected];
  const rawNeed = netRequirement(item.rawQuantity), reviewedNeed = netRequirement(item.reviewedQuantity);
  return <>
    <header><p>One planning decision</p><h3>Can we trust the usable-stock quantity?</h3><p>Need: 120 individual brackets. No receipts or other requirements. Inspect each issue separately.</p></header>
    <div className="foundation-controls"><label>Data quality case<select value={selected} onChange={e => setSelected(e.target.value as QualityCase)}>{Object.entries(qualityCases).map(([id, r]) => <option value={id} key={id}>{r.label}</option>)}</select></label></div>
    <div className="quality-evidence"><section><p>What the file says</p><h4>{item.rawQuantity === null ? "Quantity missing" : `${format(item.rawQuantity)} brackets`}</h4><p>{item.record}</p></section><section><p>What we can verify</p><h4>{item.reviewedQuantity === null ? "Unresolved" : `${format(item.reviewedQuantity)} brackets`}</h4><p>{item.evidence}</p></section></div>
    <div className="foundation-results" aria-live="polite"><p>Net need from displayed data<strong>{rawNeed === null ? "Cannot calculate" : `${format(rawNeed)} brackets`}</strong></p><p>Net need after evidence review<strong>{reviewedNeed === null ? "Hold for review" : `${format(reviewedNeed)} brackets`}</strong></p></div>
    <div className="quality-action"><h4>{item.action}</h4><p>{item.explanation}</p></div>
    <details><summary>Calculation and record boundaries</summary><p>Net need = max(0, 120 − usable stock), in individual brackets. A missing, invalid or disputed quantity is unresolved. The duplicate case shows the naive 200-unit total only to demonstrate the error. It is not an approved stock balance.</p><p>Cases are independent. Nothing here automatically edits a record, resolves a conflict or issues a purchase order.</p></details>
  </>;
}

function ParetoMeasures() {
  const titleId = useId();
  const [measure, setMeasure] = useState<ParetoMeasure>("count");
  const [selected, setSelected] = useState("late");
  const { rows, total } = rankComplaints(measure), unit = measureLabels[measure];
  const current = rows.find(r => r.id === selected)!;
  const value = (n: number) => measure === "cost" ? `€${format(n)}` : `${format(n)} ${unit.unit}`;
  // Both axes share the same zero and full-total height. Cumulative share is not a category value.
  const left = 58, top = 34, bottom = 286, step = 88, barWidth = 50;
  const x = (i: number) => left + i * step + step / 2;
  const y = (share: number) => bottom - (bottom - top) * share / 100;
  return <>
    <header><p>One month, same records</p><h3>Choose the measure before the first bar</h3><p>Changing the measure re-sorts the six categories. The cumulative line uses the total for that measure.</p></header>
    <fieldset className="foundation-switch"><legend>Rank complaints by</legend>{(["count", "delay", "cost"] as const).map(m => <button key={m} aria-pressed={measure === m} onClick={() => setMeasure(m)}>{measureLabels[m].label}</button>)}</fieldset>
    <div className="foundation-results"><p>Total in this view<strong>{value(total)}</strong></p><p>Leading category<strong>{rows[0].label}</strong><span>{format(rows[0].share)}% of the total</span></p></div>
    <div className="pareto-key"><span><i aria-hidden="true"/>Category value, left axis</span><span><i aria-hidden="true"/>Cumulative share, right axis</span></div>
    <p className="foundation-small pareto-scroll-hint">On a narrow screen, scroll the chart sideways. Every value is also in the table below.</p>
    <div className="foundation-scroll" role="region" aria-label="Pareto chart, horizontally scrollable" tabIndex={0}>
      <svg className="pareto-svg" viewBox="0 0 660 375" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{`${unit.label} Pareto. Total ${value(total)}. ${rows.map(r => `${r.label}: ${value(r.value)}, cumulative ${format(r.cumulative)} percent`).join(". ")}`}</title>
        {[0, 20, 40, 60, 80, 100].map(t => <g key={t}><line x1={left} x2="586" y1={y(t)} y2={y(t)} stroke={t === 80 ? "#b4532a" : "#cbc8bf"} strokeDasharray={t === 80 ? "4 5" : undefined}/><text x="48" y={y(t) + 4} textAnchor="end">{format(total * t / 100)}</text><text x="598" y={y(t) + 4}>{t}%</text></g>)}
        <text x={left} y="15">{measure === "cost" ? "EUR" : unit.unit}</text><text x="586" y="15" textAnchor="end">Cumulative %</text>
        {rows.map((r, i) => <g key={r.id} onMouseEnter={() => setSelected(r.id)}><rect x={x(i) - barWidth / 2} y={y(r.share)} width={barWidth} height={bottom - y(r.share)} fill={selected === r.id ? "#b4532a" : "#101213"}/><text x={x(i)} y={y(r.share) - 9} textAnchor="middle" className="pareto-value">{measure === "cost" ? `€${format(r.value)}` : format(r.value)}</text><text x={x(i)} y="313" textAnchor="middle"><tspan x={x(i)}>{r.label.split(" ")[0]}</tspan><tspan x={x(i)} dy="18">{r.label.split(" ").slice(1).join(" ")}</tspan></text></g>)}
        <polyline points={rows.map((r, i) => `${x(i)},${y(r.cumulative)}`).join(" ")} fill="none" stroke="#b4532a" strokeWidth="2"/>
        {rows.map((r, i) => <circle key={r.id} cx={x(i)} cy={y(r.cumulative)} r="4" fill="#eeebe4" stroke="#b4532a" strokeWidth="2"/>)}
        <text x={left} y="365" fill="#62676a">Dashed line: 80% reference. Not a required stopping point.</text>
      </svg>
    </div>
    <label className="pareto-inspector">Inspect a category<select value={selected} onChange={e => setSelected(e.target.value)}>{rows.map(r => <option value={r.id} key={r.id}>{r.label}</option>)}</select></label>
    <p className="foundation-inspect" aria-live="polite"><strong>{current.label}:</strong> {value(current.value)}, {format(current.share)}% of this view. Cumulative through this category: {format(current.cumulative)}%.</p>
    <div className="foundation-scroll" role="region" aria-label="Ranked Pareto values" tabIndex={0}><table><caption>Current ranking: {unit.label.toLowerCase()}, total {value(total)}</caption><thead><tr><th>Category</th><th>{unit.label}</th><th>Share</th><th>Cumulative</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><th scope="row"><button onFocus={() => setSelected(r.id)} onClick={() => setSelected(r.id)} aria-pressed={selected === r.id}>{r.label}</button></th><td>{measure === "cost" ? `€${format(r.value)}` : format(r.value)}</td><td>{format(r.share)}%</td><td>{format(r.cumulative)}%</td></tr>)}</tbody></table></div>
    <details><summary>Source records and calculation</summary><p>All inputs are fictional. {complaints.reduce((sum, r) => sum + r.count, 0)} complaints have one category each. Delay is summed across affected orders, not plant downtime. Direct cost includes assigned credits, replacements and extra freight, without monetising delay again.</p><p>Category share = category total ÷ view total × 100. Cumulative share adds those category totals in descending order. Equal values use a stable alphabetical ID order. Displayed percentages are rounded; the calculations use full precision.</p></details>
  </>;
}

export function FoundationFigure({ name, caption }: { name: FoundationFigureName; caption: string }) {
  return <figure className="foundation-figure">{name === "digital-invoice-map" ? <InvoiceMap/> : name === "data-quality-records" ? <QualityRecords/> : <ParetoMeasures/>}<figcaption>{caption}</figcaption></figure>;
}
