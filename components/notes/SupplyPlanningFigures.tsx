"use client";

import { useId, useState } from "react";
import { annualDemand, bullwhip, eoqChoice, eoqCosts, sopPlan, weeklyPurchases } from "./supply-planning-models";
import "./SupplyPlanningFigures.css";

export type SupplyPlanningName = "bullwhip-batching" | "eoq-costs" | "sop-supply-gap";
const n = (v: number, digits = 0) => v.toLocaleString("en-GB", { maximumFractionDigits: digits, minimumFractionDigits: digits });
const euro = (v: number) => `€${n(v, 2)}`;

function BullwhipBatching() {
  const [retailerCadence, setRetailer] = useState(2), [distributorCadence, setDistributor] = useState(4), [week, setWeek] = useState(3);
  const model = bullwhip(retailerCadence, distributorCadence);
  const lanes = [
    { label: "Customer purchases", values: weeklyPurchases, tone: "customer" },
    { label: "Retailer → distributor orders", values: model.retailer.map(r => r.order), tone: "retailer" },
    { label: "Distributor → manufacturer orders", values: model.distributor.map(r => r.order), tone: "distributor" },
  ];
  return <>
    <header><p>Same demand, different releases</p><h3>Where do the peaks enter the order signal?</h3><p>Every lane totals 800 units over eight weeks. These are orders placed, not shipments or inventory levels.</p></header>
    <div className="supply-controls"><label>Retailer releases an order<select value={retailerCadence} onChange={e => setRetailer(Number(e.target.value))}><option value="1">Every week</option><option value="2">Every 2 weeks</option></select></label><label>Distributor releases an order<select value={distributorCadence} onChange={e => setDistributor(Number(e.target.value))}>{[1, 2, 4].map(v => <option key={v} value={v}>Every {v === 1 ? "week" : `${v} weeks`}</option>)}</select></label></div>
    <p className="supply-small">Common scale: 0 to 400 units per week. Select a bar or use the week control to inspect the requests.</p>
    <div className="batch-lanes">{lanes.map(lane => <section key={lane.tone} className={`batch-lane batch-lane--${lane.tone}`}><header><h4>{lane.label}</h4><p>Peak {n(Math.max(...lane.values))}</p></header><div className="batch-bars">{lane.values.map((value, i) => <button key={i} aria-label={`${lane.label}, week ${i + 1}: ${value} units`} aria-pressed={week === i} onClick={() => setWeek(i)} onMouseEnter={() => setWeek(i)} onFocus={() => setWeek(i)}><span>{value}</span><i aria-hidden="true" style={{ height: `${Math.max(1, value / 400 * 108)}px` }}/><small>W{i + 1}</small></button>)}</div></section>)}</div>
    <label className="supply-inspector">Inspect week<select value={week} onChange={e => setWeek(Number(e.target.value))}>{weeklyPurchases.map((_, i) => <option value={i} key={i}>Week {i + 1}</option>)}</select></label>
    <div className="batch-ledger" aria-live="polite"><h4>Week {week + 1}, after releases</h4><dl><div><dt>Customer purchases</dt><dd>{weeklyPurchases[week]}</dd></div><div><dt>Retailer order released</dt><dd>{model.retailer[week].order}</dd></div><div><dt>Retailer requests carried forward</dt><dd>{model.retailer[week].pending}</dd></div><div><dt>Distributor order released</dt><dd>{model.distributor[week].order}</dd></div><div><dt>Distributor requests carried forward</dt><dd>{model.distributor[week].pending}</dd></div></dl></div>
    <details><summary>Timing, assumptions and full data</summary><p>Each stage accumulates the requests it receives. At week end, the retailer releases first when its calendar allows, then the distributor receives that order and releases if its own calendar allows. Both start with zero unsubmitted requests. These are information balances, not physical stock. No forecasting, shipment delay, shortage, cancellation or capacity limit is modelled.</p><div className="supply-scroll" role="region" aria-label="Weekly batching data" tabIndex={0}><table><caption>Units per week. Both stages finish with zero unsubmitted requests.</caption><thead><tr><th>Week</th><th>Purchases</th><th>Retailer order</th><th>Distributor order</th></tr></thead><tbody>{weeklyPurchases.map((q, i) => <tr key={i}><th scope="row">{i + 1}</th><td>{q}</td><td>{model.retailer[i].order}</td><td>{model.distributor[i].order}</td></tr>)}</tbody></table></div></details>
  </>;
}

function EoqCosts() {
  const titleId = useId();
  const [quantity, setQuantity] = useState(700), [orderingCost, setOrderingCost] = useState(60), [pack, setPack] = useState(1), [minimum, setMinimum] = useState(0);
  const choice = eoqChoice(orderingCost, pack, minimum), cost = eoqCosts(quantity, orderingCost);
  const feasible = quantity >= minimum && quantity % pack === 0;
  const samples = Array.from({ length: 81 }, (_, i) => eoqCosts(200 + i * 20, orderingCost));
  const max = Math.ceil(Math.max(...samples.map(r => r.total)) / 1000) * 1000;
  const x = (q: number) => 66 + (q - 200) / 1600 * 530, y = (v: number) => 270 - v / max * 230;
  const line = (key: "ordering" | "holding" | "total") => samples.map(r => `${x(r.quantity)},${y(r[key])}`).join(" ");
  return <>
    <header><p>One part, long-run annual costs</p><h3>Find the minimum, then check the workable sizes</h3><p>Demand stays at {n(annualDemand)} units/year. Holding cost stays at €3 per unit per year.</p></header>
    <div className="supply-controls supply-controls--three"><label>Fixed cost per order<select value={orderingCost} onChange={e => setOrderingCost(Number(e.target.value))}><option value="60">€60, original example</option><option value="20">€20, reduced handling</option></select></label><label>Order multiple<select value={pack} onChange={e => setPack(Number(e.target.value))}><option value="1">Individual units</option><option value="100">Cases of 100</option></select></label><label>Minimum order<select value={minimum} onChange={e => setMinimum(Number(e.target.value))}><option value="0">No minimum</option><option value="800">800 units</option><option value="1200">1,200 units</option></select></label></div>
    <div className="supply-results"><p>Unconstrained EOQ<strong>{n(choice.optimum, 2)} units</strong><span>{euro(choice.minimumCost)}/year</span></p><p>Lowest-cost feasible order<strong>{n(choice.best.quantity)} units</strong><span>{euro(choice.best.total)}/year</span></p></div>
    <div className="eoq-key"><span><i/>Ordering</span><span><i/>Holding</span><span><i/>Combined</span></div>
    <p className="supply-small eoq-mobile-hint">Scroll the chart sideways on a narrow screen. The selected quantity and all its costs are also shown below.</p>
    <div className="supply-scroll" role="region" aria-label="EOQ annual cost curves, horizontally scrollable" tabIndex={0}><svg className="eoq-chart" viewBox="0 0 660 335" role="img" aria-labelledby={titleId} onPointerMove={e => { if (e.pointerType !== "mouse") return; const box = e.currentTarget.getBoundingClientRect(), px = (e.clientX - box.left) / box.width * 660, py = (e.clientY - box.top) / box.height * 335; if (px >= 66 && px <= 596 && py >= 36 && py <= 270) setQuantity(Math.round(200 + (px - 66) / 530 * 1600)); }}><title id={titleId}>{`Annual ordering, holding and combined cost. Minimum at ${n(choice.optimum, 2)} units. Selected ${quantity} units costs ${euro(cost.total)} per year.`}</title>{[0, 0.25, 0.5, 0.75, 1].map(r => <g key={r}><line x1="66" x2="596" y1={y(r * max)} y2={y(r * max)} stroke="#cbc8bf"/><text x="56" y={y(r * max) + 4} textAnchor="end">{n(r * max)}</text></g>)}<text x="66" y="18">EUR per year</text>{[200, 600, 1000, 1400, 1800].map(q => <text key={q} x={x(q)} y="295" textAnchor="middle">{n(q)}</text>)}<text x="331" y="324" textAnchor="middle">Units per order</text><polyline points={line("ordering")} fill="none" stroke="#767b7f" strokeDasharray="5 4" strokeWidth="2"/><polyline points={line("holding")} fill="none" stroke="#101213" strokeWidth="2"/><polyline points={line("total")} fill="none" stroke="#b4532a" strokeWidth="2.5"/><line x1={x(choice.optimum)} x2={x(choice.optimum)} y1="36" y2="270" stroke="#b4532a" strokeDasharray="3 5"/><circle cx={x(quantity)} cy={y(cost.total)} r="5" fill="#101213" stroke="#eeebe4" strokeWidth="2"/></svg></div>
    <p className="supply-small eoq-inspect-value">At {n(quantity)} units: ordering {euro(cost.ordering)}, holding {euro(cost.holding)}, combined {euro(cost.total)} per year. Hover over the plot or use the quantity control.</p>
    <div className="eoq-quantity"><label>Inspect an order quantity<output>{n(quantity)} units</output><input type="range" min="200" max="1800" step="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))}/></label><button type="button" onClick={() => setQuantity(choice.best.quantity)}>Inspect lowest-cost feasible order</button></div>
    <p className={`supply-inspect ${feasible ? "" : "supply-warning"}`} aria-live="polite">{feasible ? "This quantity meets the selected case-pack and minimum-order rules." : "This quantity does not meet the selected case-pack or minimum-order rule. It remains on the chart for comparison."}</p>
    <div className="supply-scroll" role="region" aria-label="Selected quantity costs" tabIndex={0}><table><caption>Selected {n(quantity)} units per order, annual model costs</caption><tbody><tr><th scope="row">Order frequency</th><td>{n(cost.orders, 2)} orders/year</td></tr><tr><th scope="row">Average cycle stock</th><td>{n(cost.averageStock, 2)} units</td></tr><tr><th scope="row">Ordering cost</th><td>{euro(cost.ordering)}</td></tr><tr><th scope="row">Holding cost</th><td>{euro(cost.holding)}</td></tr><tr><th scope="row">Combined annual cost</th><td>{euro(cost.total)}</td></tr></tbody></table></div>
    <details><summary>Calculation and limits</summary><p>EOQ = √(2 × D × S ÷ H). Ordering cost = D ÷ Q × S. Holding cost = Q ÷ 2 × H. Feasible quantities are positive whole multiples of the selected pack, at or above the minimum. Check the feasible sizes either side of the mathematical optimum; the lowest admissible pack applies if the minimum already exceeds it.</p><p>All inputs are fictional. Demand is steady and known, price is constant, batches arrive whole and shortages are excluded. Purchase spend, safety stock, pipeline stock, discount thresholds, shelf life and capacity limits are outside this model. The selected costs are readable without the chart.</p></details>
  </>;
}

function SopGap() {
  const [prebuild, setPrebuild] = useState(1500), [overtimeLimit, setOvertimeLimit] = useState(2000);
  const plan = sopPlan(prebuild, overtimeLimit);
  const parts = [{ label: "Earlier stock", value: plan.prebuild, tone: "early" }, { label: "Normal output", value: plan.normal, tone: "normal" }, { label: "Overtime", value: plan.overtime, tone: "overtime" }, { label: "Uncovered demand", value: plan.uncovered, tone: "gap" }];
  return <>
    <header><p>A decision for the peak month</p><h3>Which part of the demand plan is covered?</h3><p>Demand is 12,000 units. Normal-time output is 10,000. Earlier stock is made in the preceding month.</p></header>
    <div className="supply-controls"><label>Earlier stock build<output>{n(prebuild)} units</output><input type="range" min="0" max="1500" step="250" value={prebuild} onChange={e => setPrebuild(Number(e.target.value))}/></label><label>Overtime capacity available<select value={overtimeLimit} onChange={e => setOvertimeLimit(Number(e.target.value))}><option value="2000">Up to 2,000 units</option><option value="500">Up to 500 units</option><option value="0">No overtime available</option></select></label></div>
    <div className="sop-balance" role="img" aria-label={parts.map(p => `${p.label}: ${p.value} units`).join(". ")}>{parts.filter(p => p.value > 0).map(p => <span key={p.tone} className={`sop-segment sop-segment--${p.tone}`} style={{ width: `${p.value / plan.demand * 100}%` }} title={`${p.label}: ${n(p.value)} units`}/>)}</div>
    <ul className="sop-balance-key">{parts.map(p => <li key={p.tone}><i className={`sop-segment--${p.tone}`} aria-hidden="true"/><span>{p.label}</span><strong>{n(p.value)}</strong></li>)}</ul>
    <div className="supply-results" aria-live="polite"><p>Supply for the demand plan<strong>{n(plan.supply)} units</strong><span>{n(plan.uncovered)} units uncovered</span></p><p>Modelled extra cost<strong>{euro(plan.extraCost)}</strong><span>{euro(plan.holding)} holding + {euro(plan.overtimePremium)} overtime</span></p></div>
    <p className={`supply-inspect ${plan.uncovered ? "supply-warning" : ""}`}>{plan.uncovered ? `${n(plan.uncovered)} expected units have no supply in this option. Revisit supply or commercial commitments; the model hasn't priced that consequence.` : "The aggregate quantities balance. Material, staffing, timing and customer commitments still need approval."}</p>
    <div className="sop-decision-flow"><section><span>Before the peak month</span><strong>{n(plan.prebuild)} units</strong><p>Confirm spare production capacity, materials, storage and usability.</p></section><span aria-hidden="true">→</span><section><span>During the peak month</span><strong>{n(plan.normal + plan.overtime)} units</strong><p>Normal output plus the overtime actually needed, within the available limit.</p></section></div>
    <details><summary>Costs, timing and decision boundary</summary><p>Earlier stock incurs one full month of holding at €0.80 per unit. Overtime incurs a €4 premium per unit. Common normal production cost is excluded; early production does not displace other work. Overtime used = minimum of remaining gap and available overtime capacity.</p><p>Demand is a plan, not confirmed orders. The gap is uncovered expected demand, not a measured backlog. No profit, lost-sale, detailed-schedule or finished-inventory outcome is calculated.</p></details>
  </>;
}

export function SupplyPlanningFigure({ name, caption }: { name: SupplyPlanningName; caption: string }) {
  return <figure className="supply-figure">{name === "bullwhip-batching" ? <BullwhipBatching/> : name === "eoq-costs" ? <EoqCosts/> : <SopGap/>}<figcaption>{caption}</figcaption></figure>;
}
