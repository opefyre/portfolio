"use client";

import { useId, useState } from "react";
import { comparePlanningOptions, planningAssumptions as a } from "./planning-model";
import "./PlanningDecision.css";

const units = (n: number) => n.toLocaleString("en-GB");
const euro = (n: number) => `€${units(n)}`;
const checkpoints = [800, 1000, 1200];

export function PlanningDecision({ caption }: { caption: string }) {
  const id = useId();
  const [demand, setDemand] = useState(1000);
  const [regular, setRegular] = useState(600);
  const [focused, setFocused] = useState("overtime");
  const rows = comparePlanningOptions(demand, regular);
  const minimum = Math.min(...rows.map(row => row.total));
  const best = rows.filter(row => row.total === minimum);
  const selected = rows.find(row => row.id === focused)!;
  const max = Math.max(1000, ...rows.map(row => row.total));
  const bestNames = best.map(row => row.name).join(" and ");
  return <figure className="note-interactive planning-decision" aria-labelledby={`${id}-title`}>
    <header className="planning-heading"><p className="planning-kicker">One month · one product · fictional inputs</p><h3 id={`${id}-title`}>What would you commit to?</h3><p>A change in demand can change which plan costs least.</p></header>
    <div className="planning-controls">
      <div><label htmlFor={`${id}-demand`}>Demand scenario <output>{units(demand)} units</output></label><input id={`${id}-demand`} type="range" min="600" max="1400" step="10" value={demand} onChange={e => setDemand(Number(e.target.value))} aria-valuetext={`${units(demand)} units of demand`} /><div className="planning-scale"><span>600</span><span>1,400 units</span></div></div>
      <div><label htmlFor={`${id}-regular`}>Regular output <output>{units(regular)} units</output></label><input id={`${id}-regular`} type="range" min="400" max="1000" step="10" value={regular} onChange={e => setRegular(Number(e.target.value))} aria-valuetext={`${units(regular)} units of regular production before the deadline`} /><div className="planning-scale"><span>400</span><span>1,000 units</span></div></div>
    </div>
    <p className="planning-context">Every plan starts with 200 units in stock. Overtime adds a fixed 200 units; external purchasing adds a fixed 400.</p>
    <div className="planning-presets" role="group" aria-label="Demand examples">{checkpoints.map(n => <button type="button" key={n} aria-pressed={demand === n} onClick={() => setDemand(n)}>{units(n)} units</button>)}<button type="button" className="planning-reset" onClick={() => { setDemand(1000); setRegular(600); setFocused("overtime"); }}>Reset example</button></div>
    <div className="planning-result" role="status"><span>{best.length > 1 ? "Lowest modelled cost: tie" : "Lowest modelled cost"}</span><strong>{bestNames}</strong><b>{euro(minimum)}</b></div>
    <div className="planning-legend" aria-label="Cost categories"><span><i className="planning-premium" />Extra commitment</span><span><i className="planning-late" />Late delivery</span><span><i className="planning-carry" />Carrying stock</span></div>
    <div className="planning-bars" role="group" aria-label="Compare additional costs in euros">{rows.map(row => <button type="button" key={row.id} className={`planning-bar-option${row.id === focused ? " is-focused" : ""}${row.total === minimum ? " is-lowest" : ""}`} aria-pressed={row.id === focused} aria-label={`${row.name}: ${euro(row.total)}, ${row.late} late units, ${row.leftover} leftover units. Inspect cost breakdown.`} onMouseEnter={() => setFocused(row.id)} onFocus={() => setFocused(row.id)} onClick={() => setFocused(row.id)}>
      <span className="planning-bar-name">{row.name}<strong>{euro(row.total)}</strong></span>
      <span className="planning-bar-track" aria-hidden="true"><span className="planning-premium" style={{ width: `${row.premium / max * 100}%` }} /><span className="planning-late" style={{ width: `${row.lateCost / max * 100}%` }} /><span className="planning-carry" style={{ width: `${row.carryCost / max * 100}%` }} /></span>
      <span className="planning-bar-note">{units(row.available)} available · {units(row.late)} late · {units(row.leftover)} left over</span>
    </button>)}</div>
    <p className="planning-axis">Additional cost (€), on a shared scale. Hover, tap or focus a plan to inspect its cost breakdown.</p>
    <div className="planning-breakdown" aria-live="polite"><span>{selected.name}</span><p>{euro(selected.premium)} commitment + {euro(selected.lateCost)} late delivery + {euro(selected.carryCost)} carrying stock = <strong>{euro(selected.total)}</strong></p></div>
    <details className="planning-methods"><summary>Assumptions, calculations and all values</summary>
      <p>All quantities refer to one product and one delivery month. The 600 confirmed orders in the story sit inside forecast demand; they are not added again. Demand cannot fall below those orders in this control. Regular output is the quantity available before the deadline, not a long-run capacity rating.</p>
      <p>Each option commits its entire additional quantity before demand is known. Materials, labour and supplier availability are assumed. Regular production is unchanged across the three plans at any chosen input; leftover units remain usable next month. No safety-stock target is imposed.</p>
      <ul><li>Stock: {a.stock} units.</li><li>Overtime: {a.overtimeUnits} extra units, {euro(a.overtimeSetup)} setup plus {euro(a.overtimePremium)} premium per extra unit = €700.</li><li>External purchasing: {a.externalUnits} extra units at {euro(a.externalPremium)} premium each plus {euro(a.externalFreight)} extra freight = €1,700.</li><li>Late-delivery cost: {euro(a.lateCost)} per unit not available by the deadline.</li><li>Carrying cost: {euro(a.carryCost)} per leftover unit for one month.</li></ul>
      <p>Available = stock + regular output + extra units. Late units = max(0, demand − available). Leftover units = max(0, available − demand). Additional cost = commitment + late units × €8 + leftover units × €2.</p>
      <div className="planning-table-wrap"><table><caption>Current scenario: {units(demand)} demand units, {units(regular)} regular units</caption><thead><tr><th scope="col">Plan</th><th scope="col">Available units</th><th scope="col">Late units</th><th scope="col">Leftover units</th><th scope="col">Commitment</th><th scope="col">Late cost</th><th scope="col">Carry cost</th><th scope="col">Total</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.name}</th><td>{units(row.available)}</td><td>{units(row.late)}</td><td>{units(row.leftover)}</td><td>{euro(row.premium)}</td><td>{euro(row.lateCost)}</td><td>{euro(row.carryCost)}</td><td>{euro(row.total)}</td></tr>)}</tbody></table></div>
      <p>This is a comparison of selected additional costs, not total company cost, profit or cash spend. It excludes ordinary unit costs, sales revenue, acquisition value of stock, quality losses, cancellation rights and wider service effects. Stock retains its value. We assign no probabilities to demand scenarios, so these are not expected costs. A lowest-cost highlight does not grant approval or recommend a real production plan.</p>
      <p>Original illustrative model for this note. The <a href="https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25d/faupc/forecast-consumption.html">order-netting principle</a> and <a href="https://otexts.com/fpp3/prediction-intervals.html">forecast uncertainty</a> are described by the linked sources; the example&apos;s costs are assumptions.</p>
    </details>
    <figcaption>{caption}</figcaption>
  </figure>;
}
