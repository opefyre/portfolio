"use client";

import { useId, useState } from 'react';
import { failureWindow, promiseDates, receiptHistory } from './core-concepts';
import './CoreConcepts.css';

export type CoreConceptName = 'promise-routes' | 'failure-patterns' | 'master-record-history';
const fmt = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1);

function PromiseRoutes() {
  const [receipt, setReceipt] = useState(4);
  const [material, setMaterial] = useState(1);
  const [capacity, setCapacity] = useState(2);
  const p = promiseDates(receipt, material, capacity), id = useId();
  const x = (day: number) => 142 + day * 55;
  return <>
    <header><p>One order for 50 units, shipped together</p><h3>Thirty are free. When can we cover the other twenty?</h3><p>Keep the 50 existing allocations protected. Compare the supplier receipt with a separate, optional 20-unit workshop batch.</p></header>
    <div className="concept-inputs">
      <label>Supplier receipt usable<select aria-label="Supplier receipt usable" value={receipt} onChange={e => setReceipt(Number(e.target.value))}>{[2, 4, 7].map(d => <option value={d} key={d}>Day {d}</option>)}</select></label>
      <label>Workshop materials ready<select aria-label="Workshop materials ready" value={material} onChange={e => setMaterial(Number(e.target.value))}>{[1, 4].map(d => <option value={d} key={d}>Day {d}</option>)}</select></label>
      <label>Workshop capacity free from<select aria-label="Workshop capacity free from" value={capacity} onChange={e => setCapacity(Number(e.target.value))}>{[2, 5].map(d => <option value={d} key={d}>Day {d}</option>)}</select></label>
    </div>
    <div className="concept-results" aria-live="polite">
      <p><span>Existing supply, ATP</span><strong>Day {p.atp}</strong><span>30 free now, then 40 from the supplier</span></p>
      <p><span>Earliest with the CTP check</span><strong>Day {p.ctp}</strong><span>{p.chosen === 'build' ? 'Use 30 free units and the extra 20-unit batch' : 'Keep the existing-supply route; no extra batch needed'}</span></p>
    </div>
    <p className="concept-scroll-hint">Scroll sideways for the full working-day timeline.</p>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Existing supply and optional production timeline">
      <svg className="concept-timeline" viewBox="0 0 640 285" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Two ways to make the complete 50-unit order ready</title>
        <desc id={`${id}-desc`}>Existing supply supports day {p.atp}. Materials are ready day {material}; capacity is free from day {capacity}. The extra batch can run from day {p.start} to day {p.finish}. Considering both routes, the earliest date is day {p.ctp}. All dates are ready for dispatch, excluding transport.</desc>
        <text x="14" y="24">Elapsed working day</text>
        {Array.from({ length: 9 }, (_, d) => <g key={d}><line x1={x(d)} x2={x(d)} y1="44" y2="233" className="concept-grid"/><text x={x(d)} y="39" textAnchor="middle">{d}</text></g>)}
        <text x="14" y="88" className="concept-row">Existing supply</text>
        <text x="14" y="110" className="concept-small">30 free + 40 incoming</text>
        <line x1={x(0)} x2={x(receipt)} y1="90" y2="90" className="concept-wait"/>
        <circle cx={x(receipt)} cy="90" r="7" className="concept-ink"><title>{`Supplier receipt adds 40 on day ${receipt}; 70 uncommitted units before accepting this new order.`}</title></circle>
        <text x={x(receipt)} y="134" textAnchor="middle" className="concept-row">Ready day {receipt}</text>
        <text x="14" y="183" className="concept-row">Extra batch option</text>
        <text x="14" y="205" className="concept-small">30 free + 20 made</text>
        <line x1={x(0)} x2={x(p.start)} y1="184" y2="184" className="concept-wait"/>
        <rect x={x(p.start)} y="171" width="55" height="26" className="concept-rust"><title>{`Make and check 20 units from day ${p.start} to day ${p.finish}. Both material and capacity must be ready.`}</title></rect>
        <text x={x(p.finish)} y="230" textAnchor="middle" className="concept-row">Ready day {p.finish}</text>
        <text x="14" y="276" className="concept-small">A line is waiting; the rust block is one working day of production and checks.</text>
      </svg>
    </div>
    <div className="concept-reading" aria-live="polite"><h4>{p.chosen === 'build' ? `The extra batch could bring the date forward by ${p.atp - p.ctp} working ${p.atp - p.ctp === 1 ? 'day' : 'days'}` : 'Existing supply is already as early or earlier'}</h4><p>{p.chosen === 'build' ? `Materials and capacity allow the batch to finish on day ${p.finish}, before the day-${receipt} receipt. Its cost and effect on other work still need a decision.` : `The workshop option finishes on day ${p.finish}. The supplier receipt is usable on day ${receipt}, so adding production would not improve this order's date.`}</p></div>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Current order-promising calculation values"><table><caption>Current scenario. All quantities are individual finished units.</caption><thead><tr><th scope="col">Check</th><th scope="col">Quantity or date</th></tr></thead><tbody>
      <tr><th scope="row">Opening free stock</th><td>80 − 50 = 30 units</td></tr><tr><th scope="row">New whole-order requirement</th><td>50 units; shortfall 20</td></tr><tr><th scope="row">Existing supplier receipt</th><td>40 units, day {receipt}</td></tr><tr><th scope="row">Extra batch start</th><td>Later of days {material} and {capacity}: day {p.start}</td></tr><tr><th scope="row">Extra batch usable</th><td>20 units, day {p.finish}</td></tr><tr><th scope="row">Earliest complete-order readiness</th><td>Day {p.ctp}</td></tr>
    </tbody></table></div>
    <details><summary>Readiness assumptions</summary><p>Material remains usable after its release. Qualified workshop capacity remains free from the selected day. The 20-unit batch takes exactly one full working day including checks, with no minimum lot or extra setup. The supplier receipt uses independent resources. Both routes retain the existing 50-unit allocation.</p><p>Choosing the earlier route still requires a cost decision, resource bookings and a check on the customer delivery date.</p></details>
  </>;
}

function FailurePatterns() {
  const [count, setCount] = useState(10), id = useId();
  const machines = [{ name: 'Machine A', data: failureWindow(count) }, { name: 'Machine B', data: failureWindow(2) }];
  const x = (hours: number) => 96 + hours * 5;
  return <>
    <header><p>Same 100-hour window, same 20 hours stopped</p><h3>Count the interruptions as well as the lost hours</h3><p>Both machines run for 80 hours. Move A&apos;s failure count to see how the averages change while the total downtime stays fixed.</p></header>
    <label className="concept-range">Completed failures on machine A<output>{count} failures</output><input type="range" aria-label="Completed failures on machine A" aria-valuetext={`${count} failures in 100 hours`} min="2" max="10" step="1" value={count} onChange={e => setCount(Number(e.target.value))}/></label>
    <div className="concept-results" aria-live="polite">{machines.map(m => <p key={m.name}><span>{m.name}</span><strong>{fmt(m.data.mtbf)} h MTBF</strong><strong>{fmt(m.data.mttr)} h MTTR</strong><span>{m.data.failures} completed failures</span></p>)}</div>
    <p className="concept-scroll-hint">Scroll sideways to inspect the complete 100-hour windows.</p>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Machine A and B operating and restoration timelines"><svg className="concept-timeline" viewBox="0 0 640 280" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Equal downtime distributed across different numbers of failures</title><desc id={`${id}-desc`}>Both machines run for 80 hours and stop for restoration for 20 in a 100-hour window. A has {count} failures: MTBF {fmt(80 / count)} hours and MTTR {fmt(20 / count)} hours. B has two failures: MTBF 40 hours and MTTR ten hours. Events are spaced evenly only to explain the arithmetic.</desc>
      <text x="14" y="24">Hours from start of observation</text>
      {[0, 20, 40, 60, 80, 100].map(h => <g key={h}><line x1={x(h)} x2={x(h)} y1="43" y2="218" className="concept-grid"/><text x={x(h)} y="244" textAnchor="middle">{h}</text></g>)}
      {machines.map((m, i) => <g key={m.name}><text x="14" y={85 + i * 93} className="concept-row">{m.name}</text>{m.data.events.map(e => <g key={e.number}>
        <rect x={x(e.runStart)} y={62 + i * 93} width={(e.failed - e.runStart) * 5} height="34" className="concept-ink"><title>{`${m.name}, run ${e.number}: hours ${fmt(e.runStart)} to ${fmt(e.failed)}.`}</title></rect>
        <rect x={x(e.failed)} y={62 + i * 93} width={(e.restored - e.failed) * 5} height="34" className="concept-rust"><title>{`${m.name}, restoration ${e.number}: hours ${fmt(e.failed)} to ${fmt(e.restored)}, lasting ${fmt(m.data.mttr)} hours.`}</title></rect>
      </g>)}<text x="96" y={119 + i * 93}>{m.data.failures} failures; 80 h running + 20 h restoration</text></g>)}
      <text x="14" y="276" className="concept-small">Graphite = operating. Rust = failed until restored. No other stop categories.</text>
    </svg></div>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Both machines and all reliability values"><table><caption>Both machines remain visible. MTTR here includes waiting, repair and restart checks.</caption><thead><tr><th scope="col">Machine</th><th scope="col">Operating</th><th scope="col">Failures</th><th scope="col">Restoration</th><th scope="col">MTBF</th><th scope="col">MTTR</th></tr></thead><tbody>{machines.map(m => <tr key={m.name}><th scope="row">{m.name}</th><td>80 h</td><td>{m.data.failures}</td><td>20 h</td><td>{fmt(m.data.mtbf)} h</td><td>{fmt(m.data.mttr)} h</td></tr>)}</tbody></table></div>
    <details><summary>Timing and event assumptions</summary><p>Each constructed cycle contains 80 ÷ failures operating hours followed by 20 ÷ failures restoration hours. All restorations finish within the 100-hour window. Equal spacing is an illustration, not evidence of periodic failure. The control changes the event pattern, not the 80% observed share of time running.</p><p>These averages do not forecast the next failure or specify a lifetime distribution. Rounding affects displayed labels only; the model retains the unrounded intervals.</p></details>
  </>;
}

function MasterHistory() {
  const [pack, setPack] = useState(24), id = useId(), r = receiptHistory(pack);
  const bar = (units: number) => units * 1.7;
  return <>
    <header><p>One product definition changes; the posted receipt stays put</p><h3>Did more stock arrive, or did the calculation change?</h3><p>R-082 recorded ten boxes of 12 as 120 cartridges. Choose the current box definition and compare it with the original transaction.</p></header>
    <div className="concept-choices" role="group" aria-label="Current product-master pack definition"><button aria-pressed={pack === 12} onClick={() => setPack(12)}>Original pack: 12 per box</button><button aria-pressed={pack === 24} onClick={() => setPack(24)}>New pack: 24 per box</button></div>
    <div className="concept-records">
      <section aria-labelledby={`${id}-master`}><p className="concept-record-type">Current master data</p><h4 id={`${id}-master`}>Product P-204</h4><dl><dt>Inventory unit</dt><dd>EA, individual cartridge</dd><dt>Current box conversion</dt><dd>{pack} EA per BOX</dd><dt>New ten-box proposal</dt><dd>{r.proposedUnits} EA</dd></dl></section>
      <section aria-labelledby={`${id}-receipt`}><p className="concept-record-type">Original transaction</p><h4 id={`${id}-receipt`}>Receipt R-082</h4><dl><dt>Received</dt><dd>10 BOX</dd><dt>Conversion at posting</dt><dd>12 EA per BOX</dd><dt>Posted base quantity</dt><dd>120 EA, unchanged</dd></dl></section>
    </div>
    <p className="concept-reference"><strong>Reference codes:</strong> EA means individual unit. BOX means box. Neither code defines the product&apos;s pack quantity.</p>
    <div className="concept-results" aria-live="polite"><p><span>Originally posted receipt</span><strong>120 units</strong><span>10 boxes × original 12-unit conversion</span></p><p><span>Old receipt recomputed with current pack</span><strong>{r.recomputed} units</strong><span>{r.inventedIncrease ? `${r.inventedIncrease} extra units appear only in this recalculation` : 'Matches the posting while both conversions are 12'}</span></p></div>
    <p className="concept-scroll-hint">Scroll sideways to compare the two receipt quantities.</p>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Posted receipt compared with current-master recalculation"><svg className="concept-bars" viewBox="0 0 640 197" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>Original receipt versus recalculation using today&apos;s product pack</title><desc id={`${id}-desc`}>Original posted quantity is 120 cartridges. Recalculating ten boxes using the selected {pack}-unit pack gives {r.recomputed}. The difference of {r.inventedIncrease} is a reporting effect, not a physical receipt or adjustment.</desc>
      <text x="14" y="24">Receipt quantity, individual cartridges</text>
      <text x="14" y="65" className="concept-row">Posted</text><rect x="148" y="44" width={bar(120)} height="30" className="concept-ink"/><text x={158 + bar(120)} y="65" className="concept-row">120</text>
      <text x="14" y="127" className="concept-row">Recomputed</text><rect x="148" y="106" width={bar(r.recomputed)} height="30" className={r.inventedIncrease ? 'concept-rust' : 'concept-ink'}/><text x={158 + bar(r.recomputed)} y="127" className="concept-row">{r.recomputed}</text>
      <text x="14" y="183" className="concept-small">Only the current-master calculation changes. The posted transaction remains 120.</text>
    </svg></div>
    <div className="concept-reading" aria-live="polite"><h4>{r.inventedIncrease ? 'A new pack size has doubled the old receipt in the report' : 'The current and historical conversions still agree'}</h4><p>{r.inventedIncrease ? 'No stock movement created those additional 120 units. The report has applied the current pack size to an older receipt. A new ten-box proposal can correctly mean 240 units without making the old receipt 240.' : 'Both calculations give 120. Switching to the new pack shows why that agreement cannot be assumed for every historical transaction.'}</p></div>
    <div className="concept-scroll" tabIndex={0} role="region" aria-label="Original receipt and both product-pack reference cases"><table><caption>Both pack definitions, compared with the same original receipt.</caption><thead><tr><th scope="col">Current pack</th><th scope="col">Posted R-082</th><th scope="col">Recomputed R-082</th><th scope="col">Separate new ten-box proposal</th></tr></thead><tbody>{[12, 24].map(n => <tr key={n}><th scope="row">{n} EA per BOX</th><td>120 EA</td><td>{10 * n} EA</td><td>{10 * n} EA</td></tr>)}</tbody></table></div>
    <details><summary>Which records change in this example?</summary><p>The control selects a current pack definition. The fictional receipt retains its ten-box quantity, original conversion and posted 120-unit balance. No adjustment is posted. The future ten-box proposal is separate and assumes the selected pack terms will apply; open orders still need their agreed terms checked.</p><p>An actual ERP can preserve historical meaning with stored quantities, document conversion fields or versioned records. Check which records your ERP keeps before changing a historical report.</p></details>
  </>;
}

export function CoreConcept({ name, caption }: { name: CoreConceptName; caption: string }) {
  return <figure className="concept-figure">{name === 'promise-routes' ? <PromiseRoutes/> : name === 'failure-patterns' ? <FailurePatterns/> : <MasterHistory/>}<figcaption>{caption}</figcaption></figure>;
}
