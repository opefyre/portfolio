"use client";

import { useId, useState } from 'react';
import { inventoryReview, newlyDelayed } from './inventory-review';
import './CoreConcepts.css';
import './FieldConcepts.css';

export type FieldConceptName = 'inventory-review-replay' | 'rollout-stakeholders' | 'gemba-order-journey';

function InventoryReplay() {
  const [interval, setInterval] = useState(5), [day, setDay] = useState(7), id = useId();
  const cases = [{ name: 'Continuous', rows: inventoryReview('continuous') }, { name: 'Periodic', rows: inventoryReview('periodic', interval) }];
  const x = (d: number) => 60 + d * 35;
  return <>
    <header><p>Same 140-unit opening stock and demand</p><h3>When does each rule release the next order?</h3><p>Demand is 20 units a working day, except day 4 uses 40. Continuous review orders 100 at position 40 or below. Periodic review tops up to its selected coverage target.</p></header>
    <div className="concept-inputs field-inputs"><label>Periodic review interval<select aria-label="Periodic review interval" value={interval} onChange={e => setInterval(Number(e.target.value))}>{[3,5,7].map(r => <option value={r} key={r}>Every {r} working days</option>)}</select></label><label>Inspect working-day boundary<select aria-label="Inspect working-day boundary" value={day} onChange={e => setDay(Number(e.target.value))}>{Array.from({ length:16 },(_,d) => <option key={d} value={d}>Day {d}</option>)}</select></label></div>
    <div className="concept-results" aria-live="polite"><p><span>Continuous trigger, s</span><strong>40 units</strong><span>20 units/day × 2-day lead time; fixed order 100</span></p><p><span>Periodic target, S</span><strong>{20 * (interval + 2)} units</strong><span>20 units/day × ({interval}-day review + 2-day lead time)</span></p></div>
    <p className="field-key"><span className="field-key-line">Solid: net stock</span><span className="field-key-dash">Dashed: inventory position</span><span>○ release &nbsp; ◆ receipt</span></p>
    <p className="concept-scroll-hint">Scroll sideways for both full timelines. Select a day above for its values below.</p>
    <div className="concept-scroll" role="region" tabIndex={0} aria-label="Both inventory-policy timelines"><svg className="concept-timeline" viewBox="0 0 640 535" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Stock and inventory position under continuous and periodic review</title><desc id={`${id}-desc`}>{`Fifteen working days. The continuous rule delays ${newlyDelayed(cases[0].rows)} units at their demand event. Reviewing every ${interval} days delays ${newlyDelayed(cases[1].rows)} units. Negative net stock denotes backorders. Select a day for exact quantities or read the daily table.`}</desc>
      {cases.map((c,i) => {
        const top = 50+i*252, y = (v:number) => top+(200-v)*.65;
        const stock = c.rows.flatMap(r => r.day === 0 ? [`${x(0)},${y(r.net)}`] : [`${x(r.day)},${y(r.beforeReceipt)}`,`${x(r.day)},${y(r.net)}`]).join(' ');
        const position = c.rows.flatMap(r => r.day === 0 ? [`${x(0)},${y(140)}`,`${x(0)},${y(r.position)}`] : [`${x(r.day)},${y(r.positionBeforeOrder)}`,`${x(r.day)},${y(r.position)}`]).join(' ');
        return <g key={c.name}>
          <text x="14" y={top-23} className="field-plot-title">{c.name}</text><text x="625" y={top-23} textAnchor="end">{i ? `Review days 0, ${interval}, ${interval*2}…` : 'Review after each demand posting'}</text>
          {[-40,0,100,200].map(v => <g key={v}><line x1="60" x2="585" y1={y(v)} y2={y(v)} className={v===0?'field-zero':'concept-grid'}/><text x="49" y={y(v)+4} textAnchor="end">{v}</text></g>)}
          <line x1={x(day)} x2={x(day)} y1={top} y2={top+156} className="field-day"/>
          <polyline points={position} className="field-position"/><polyline points={stock} className="field-stock"/>
          {c.rows.filter(r => r.ordered).map(r => <circle key={r.day} cx={x(r.day)} cy={y(r.position)} r="4.5" className="field-release"><title>{`${c.name}: release ${r.ordered} on day ${r.day}; due day ${r.due}.`}</title></circle>)}
          {c.rows.filter(r => r.received).map(r => <path key={r.day} d={`M${x(r.day)},${y(r.net)-6}l6,6 -6,6 -6,-6Z`} className="concept-rust"><title>{`${c.name}: receive ${r.received} on day ${r.day}; net stock after receipt ${r.net}.`}</title></path>)}
          {[0,3,6,9,12,15].map(d => <text key={d} x={x(d)} y={top+180} textAnchor="middle">{d}</text>)}
          <text x="60" y={top+206} className="concept-small">Units vertically; elapsed working days horizontally. Values connected between daily events.</text>
        </g>;
      })}
    </svg></div>
    <div className="concept-reading" aria-live="polite"><h4>Day {day}: {cases[1].rows[day].review ? 'a periodic review is due' : 'the periodic rule waits for its review'}</h4><p>{cases.map(c => `${c.name}: ${Math.max(0,c.rows[day].net)} on hand, ${Math.max(0,-c.rows[day].net)} backordered, ${c.rows[day].position-c.rows[day].net} on order after decisions.`).join(' ')}</p></div>
    <div className="concept-scroll" role="region" tabIndex={0} aria-label="Selected day quantities for both policies"><table><caption>Day {day}. Demand is posted first, receipts become usable next, then the review makes its order decision.</caption><thead><tr><th scope="col">Policy</th><th scope="col">Net before receipt</th><th scope="col">Receipt</th><th scope="col">New order</th><th scope="col">Net after receipt</th><th scope="col">Position after order</th></tr></thead><tbody>{cases.map(c => {const r=c.rows[day];return <tr key={c.name}><th scope="row">{c.name}</th><td>{r.beforeReceipt}</td><td>{r.received}</td><td>{r.ordered}{r.due!==null ? `; due day ${r.due}` : ''}</td><td>{r.net}</td><td>{r.position}</td></tr>;})}</tbody></table></div>
    <p className="field-summary" aria-live="polite">Across this history, {newlyDelayed(cases[0].rows)} continuous-policy units and {newlyDelayed(cases[1].rows)} periodic-policy units wait at their demand event. The count shows units that waited, not how long they waited.</p>
    <details><summary>Event timing and full daily record</summary><p>Day 0 is the opening review, with 140 units and no pipeline. At each later day boundary, the preceding day&apos;s demand posts, due receipts arrive and clear any backorders, then the policy reviews. A day-4 order is usable at the day-6 boundary, after that day&apos;s demand. Orders beyond day 15 remain in the pipeline. Position equals net stock plus outstanding orders; there are no separate allocations.</p><p>Both policies use the same demand and two-day lead time. The periodic target is 20 × (review interval + 2), without safety stock. The continuous trigger stays 40 and its lot stays 100. The initial stock is not reset when the interval changes. No minimum lot, supplier limit, cost or stochastic service model is included.</p><div className="concept-scroll" role="region" tabIndex={0} aria-label="Full daily inventory ledger"><table><caption>Units. Net stock below zero represents unfilled backorders.</caption><thead><tr><th scope="col">Day</th><th scope="col">Demand</th><th scope="col">Policy</th><th scope="col">Receipt</th><th scope="col">Order</th><th scope="col">Net</th><th scope="col">Position</th></tr></thead><tbody>{cases.flatMap(c=>c.rows.map(r=><tr key={`${c.name}-${r.day}`}><th scope="row">{r.day}</th><td>{r.demand}</td><td>{c.name}</td><td>{r.received}</td><td>{r.ordered}</td><td>{r.net}</td><td>{r.position}</td></tr>))}</tbody></table></div></details>
  </>;
}

function StakeholderMap() {
  const groups = [
    {label:'Higher power / lower interest', heading:'Finance', copy:'Agree the spend decision and full cost before committing.', className:'field-quadrant'},
    {label:'Higher power / higher interest', heading:'Sponsor and IT support', copy:'Work through release criteria, resources and support readiness.', className:'field-quadrant'},
    {label:'Lower formal power / lower interest', heading:'Adjacent receiving team', copy:'Check the shared space, explain changes and leave an easy route to raise clashes.', className:'field-quadrant'},
    {label:'Lower formal power / higher interest', heading:'Night shift and customer service', copy:'Work through exceptions with users during the shifts that will use it.', className:'field-quadrant field-affected'},
  ];
  return <><header><p>Power and interest in this rollout</p><h3>The night shift needs more than an update email</h3><p>Each group has its power and interest labelled. On wider screens, power increases upward and interest increases to the right. Check each placement with the group.</p></header><div className="field-matrix">{groups.map(g=><section key={g.label} className={g.className}><p className="field-axis">{g.label}</p><h4>{g.heading}</h4><p>{g.copy}</p></section>)}</div><p className="field-note">The highlighted group uses the process daily or handles its customer consequences. A lower position on the power axis does not justify excluding it from design or trials.</p></>;
}

function GembaJourney() {
  const steps = [
    {time:'09:00', title:'Order released', wait:'40 min until picking starts', note:'Observe what makes an order selectable.'},
    {time:'09:40 → 10:00', title:'Pick the order', wait:'20 min active picking', note:'Follow this order, its priority and its completion signal.'},
    {time:'10:00 → 14:40', title:'Wait for the label', wait:'280 min before label availability', note:'Trace the request, hold and release records.'},
    {time:'14:40 → 15:00', title:'Pack and check', wait:'20 min active work', note:'Keep the required checks in the route.'},
    {time:'15:00 → 15:10', title:'Pass ready status to dispatch', wait:'10 min after checking', note:'The 15:00 cutoff passes before dispatch sees it.'},
  ];
  return <><header><p>One order from release to dispatch readiness</p><h3>Where did W-218 spend its six hours and ten minutes?</h3><p>The clocks give the duration. The route shows where to observe the handoffs; its spacing is not a time scale.</p></header><ol className="field-journey">{steps.map((s,i)=><li key={s.title} className={i===2||i===4?'field-wait-step':''}><span className="field-step" aria-hidden="true">0{i+1}</span><div><p className="field-time">{s.time}</p><h4>{s.title}</h4><p className="field-duration">{s.wait}</p><p>{s.note}</p></div></li>)}</ol><div className="field-totals"><p><strong>40 min</strong><span>Active picking, packing and checking</span></p><p><strong>330 min</strong><span>Waiting across the three handoffs</span></p></div><p className="field-note">09:00 to 15:10 = 370 minutes. Dispatch readiness is ten minutes after cutoff. The timestamps show where the order waited. Request and release records are needed to explain why.</p></>;
}

export function FieldConcept({ name, caption }: { name: FieldConceptName; caption: string }) {
  return <figure className="concept-figure field-figure">{name==='inventory-review-replay'?<InventoryReplay/>:name==='rollout-stakeholders'?<StakeholderMap/>:<GembaJourney/>}<figcaption>{caption}</figcaption></figure>;
}
