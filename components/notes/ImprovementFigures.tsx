"use client";

import { useId, useState } from "react";
import { approvalBaseline, approvalTrials, approvalResult, kanbanEvents, charterRequests, charterDecision } from "./improvement-models";
import "./ImprovementFigures.css";

export type ImprovementName = "pdca-trial" | "kanban-loop" | "charter-authority";
const num = (n: number) => n.toLocaleString("en-GB");
const euro = (n: number) => `€${num(n)}`;

function Trial() {
  const id = useId(), [selected, setSelected] = useState(0);
  const trial = approvalTrials[selected], before = approvalResult(approvalBaseline), after = approvalResult(trial);
  return <>
    <header><p>One change, two possible outcomes</p><h3>Faster approvals still need a quality check</h3><p>Change the trial outcome. The prediction stays fixed: at most 18 hours per request, with at most 5% returned for correction.</p></header>
    <label className="improve-select">Inspect trial outcome<select value={selected} onChange={e => setSelected(Number(e.target.value))}>{approvalTrials.map((r,i) => <option key={r.label} value={i}>{r.label}</option>)}</select></label>
    <p className="improve-mobile-hint">Swipe the chart sideways, or focus it and use the arrow keys. The table below shows every value.</p><div className="trial-chart" role="region" aria-label="Approval time and correction rate chart, horizontally scrollable" tabIndex={0}>
      <svg viewBox="0 0 680 355" role="img" aria-labelledby={id}><title id={id}>{`Average approval time: baseline 24 hours, trial 16. Returned requests: baseline 5%, trial ${after.rate}%. Dashed lines mark the limits.`}</title>
        <text x="0" y="22" className="improve-svg-heading">Elapsed approval time, hours per request</text>
        {[0, 6, 12, 18, 24, 30].map(v => <g key={v}><line x1={110+v*17} x2={110+v*17} y1="44" y2="128" className="improve-grid"/><text x={110+v*17} y="148" textAnchor="middle">{v}</text></g>)}
        <text x="0" y="70">Baseline</text><rect x="110" y="48" width={before.average*17} height="30" className="improve-baseline"/><text x={120+before.average*17} y="69">24</text>
        <text x="0" y="114">Trial</text><rect x="110" y="92" width={after.average*17} height="30" className="improve-accent"/><text x={120+after.average*17} y="113">16</text>
        <line x1={416} x2={416} y1="37" y2="132" className="improve-limit"/><text x="416" y="171" textAnchor="middle">18-hour limit</text>
        <text x="0" y="214" className="improve-svg-heading">Requests returned for correction, %</text>
        {[0, 3, 6, 9, 12].map(v => <g key={v}><line x1={110+v*42.5} x2={110+v*42.5} y1="232" y2="316" className="improve-grid"/><text x={110+v*42.5} y="336" textAnchor="middle">{v}%</text></g>)}
        <text x="0" y="258">Baseline</text><rect x="110" y="236" width={before.rate*42.5} height="30" className="improve-baseline"/><text x={120+before.rate*42.5} y="257">5%</text>
        <text x="0" y="302">Trial</text><rect x="110" y="280" width={after.rate*42.5} height="30" className="improve-accent"/><text x={120+after.rate*42.5} y="301">{after.rate}%</text>
        <line x1="322.5" x2="322.5" y1="226" y2="320" className="improve-limit"/>
      </svg>
    </div>
    <p className="improve-small">Separate scales: hours above, percentage below. Rust is the trial; graphite is the baseline. Dashed lines mark the criteria, not statistical control limits.</p>
    <div className="improve-decision" aria-live="polite"><span>Next action</span><h4>{after.qualityMet ? "Extend the test under review" : "Revise before expanding"}</h4><p>{after.qualityMet ? "Both numerical criteria are met. Check the request mix, slow cases and workload before extending to another group. This comparison alone does not establish the cause." : "Approval time meets the prediction, but 10% returned exceeds the 5% condition. Review the returned requests and change the method before another trial."}</p></div>
    <div className="improve-table" role="region" aria-label="Approval trial totals" tabIndex={0}><table><caption>Fictional totals for the selected comparison</caption><thead><tr><th>Measure</th><th>Baseline</th><th>Trial</th></tr></thead><tbody><tr><th scope="row">Requests</th><td>100</td><td>120</td></tr><tr><th scope="row">Total elapsed hours</th><td>2,400</td><td>1,920</td></tr><tr><th scope="row">Average hours/request</th><td>24</td><td>16</td></tr><tr><th scope="row">Requests returned</th><td>5</td><td>{trial.returned}</td></tr><tr><th scope="row">Returned/request</th><td>5%</td><td>{after.rate}%</td></tr></tbody></table></div>
  </>;
}

function Kanban() {
  const [step, setStep] = useState(0), event = kanbanEvents[step];
  return <>
    <header><p>Parts forward, information back</p><h3>Follow one withdrawal through the loop</h3><p>Three production cards control three boxes of 20 brackets. Two boxes stay on the shelf while we follow the third.</p></header>
    <div className="kanban-events" aria-label="Replenishment events">{kanbanEvents.map((e,i) => <button key={e.label} aria-pressed={step===i} onClick={() => setStep(i)}><span>0{i+1}</span>{e.label}</button>)}</div>
    <div className="kanban-map">
      <section><span>Upstream process</span><div className="kanban-upstream-art"><div className="kanban-machine" aria-hidden="true"><i/><i/><i/></div>{event.newBox>0 && <div className="kanban-new-box"><strong>20</strong><small>new brackets</small></div>}</div><h4>{event.newBox ? "20 brackets ready" : step===2 ? "20 brackets authorised" : "No new box ready"}</h4><p>{event.upstream}</p><div className="kanban-marker">{event.cardAt === "upstream" ? "▱ Tracked card here" : "No tracked card here"}</div></section>
      <div className="kanban-directions"><span>Replacement parts →</span><span>← Production signal</span>{event.cardAt === "return" && <strong className="kanban-marker">▱ Card awaiting return</strong>}</div>
      <section><span>Supermarket shelf</span><div className="kanban-boxes" aria-label={`${event.shelfBoxes} full boxes on the shelf`}>{[0,1,2].map(i => <div key={i} className={i<event.shelfBoxes ? "kanban-box" : "kanban-box kanban-box--empty"}>{i<event.shelfBoxes ? <><strong>20</strong><small>brackets</small></> : <small>Withdrawn</small>}</div>)}</div><h4>{event.shelfBoxes*20} brackets on shelf</h4><p>{event.shelfBoxes} full boxes, excluding assembly and upstream work.</p><div className="kanban-marker">{event.cardAt === "shelf" ? "▱ Tracked card here" : "Tracked card away"}</div></section>
    </div>
    <div className={`kanban-card kanban-card--${event.cardAt}`}><span>Tracked production card</span><strong>BR-01 / 20 brackets</strong><p>{event.signal}</p></div>
    <div className="improve-event" aria-live="polite"><span>Event {step+1} of {kanbanEvents.length}</span><h4>{event.label}</h4><p>{event.note}</p></div>
    <div className="improve-buttons"><button disabled={step===0} onClick={() => setStep(step-1)}>Previous event</button><button disabled={step===kanbanEvents.length-1} onClick={() => setStep(step+1)}>Next event</button><button onClick={() => setStep(0)}>Reset</button></div>
    <details><summary>All events and stock boundaries</summary><p>The other two cards stay attached to full boxes. The tracked card is either on the shelf or returning to/with the upstream process, so there are always three cards. Assembly holds the withdrawn box after event 2; its later consumption is not modelled.</p><div className="improve-table" role="region" aria-label="Kanban event ledger" tabIndex={0}><table><thead><tr><th>Event</th><th>Shelf units</th><th>New units ready upstream</th></tr></thead><tbody>{kanbanEvents.map((e,i) => <tr key={e.label}><th scope="row">{i+1}. {e.label}</th><td>{e.shelfBoxes*20}</td><td>{e.newBox}</td></tr>)}</tbody></table></div></details>
  </>;
}

function Charter() {
  const id=useId(), [selected,setSelected]=useState(0);
  const request=charterRequests[selected], result=charterDecision(request);
  return <>
    <header><p>Permission has a boundary</p><h3>Does this request fit the charter?</h3><p>The pilot covers zone A, with an €8,000 total cap. Each request below starts from the same €5,500 already spent or committed.</p></header>
    <div className="charter-requests">{charterRequests.map((r,i) => <button key={r.label} onClick={() => setSelected(i)} aria-pressed={selected===i}><span>{r.label}</span><strong>{euro(r.amount)}</strong></button>)}</div>
    <p className="improve-mobile-hint">Swipe the chart sideways, or focus it and use the arrow keys. The total and remaining budget are also shown below.</p><div className="charter-budget" role="region" aria-label="Pilot budget chart, horizontally scrollable" tabIndex={0}><svg viewBox="0 0 680 138" role="img" aria-labelledby={id}><title id={id}>{`Total commitments ${euro(result.total)}, including this request. Budget cap €8,000.`}</title><text x="0" y="20">Total commitments, €</text>{[0,2000,4000,6000,8000].map(v => <text key={v} x={v/9000*620} y="123" textAnchor={v===0 ? "start" : "middle"}>{num(v)}</text>)}<rect x="0" y="44" width={5500/9000*620} height="38" className="improve-baseline"/><rect x={5500/9000*620} y="44" width={request.amount/9000*620} height="38" className="improve-accent"/><line x1={8000/9000*620} x2={8000/9000*620} y1="32" y2="96" className="improve-limit"/></svg></div>
    <p className="improve-small">Graphite: €5,500 already committed. Rust: this request. Dashed line: €8,000 cap.</p>
    <div className="charter-checks"><div><span>Scope</span><strong>{request.inScope ? "Within zone A pilot" : "Outside zone A pilot"}</strong></div><div><span>Proposed total</span><strong>{euro(result.total)}</strong></div><div><span>Against the cap</span><strong>{result.remaining>=0 ? `${euro(result.remaining)} remaining` : `${euro(-result.remaining)} over`}</strong></div></div>
    <div className="improve-decision" aria-live="polite"><span>Decision route</span><h4>{result.delegated ? "Within delegated authority, subject to checks" : "Return for a sponsor decision"}</h4><p>{request.reason}</p></div>
    <p className="improve-small">This checks scope and total budget only. It does not bypass purchasing, safety or IT controls, and sponsor support alone may not satisfy every required approval.</p>
  </>;
}

export function ImprovementFigure({name,caption}:{name:ImprovementName;caption:string}) {
  return <figure className="improve-figure" aria-label={name === "pdca-trial" ? "PDCA approval trial comparison" : name === "kanban-loop" ? "Kanban replenishment sequence" : "Project charter authority example"}>{name === "pdca-trial" ? <Trial/> : name === "kanban-loop" ? <Kanban/> : <Charter/>}<figcaption>{caption}</figcaption></figure>;
}
