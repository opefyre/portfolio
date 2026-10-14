"use client";

import { useId, useState } from "react";
import { scopeChoices, scopePlan, type ScopeOption, productionCases, productionBalance, requestTraces, traceResult, transitionCounts } from "./systems-models";
import "./SystemsFigures.css";

export type SystemsName = "scope-change-options" | "manufacturing-order-records" | "process-event-traces";
const n = (v:number) => v.toLocaleString("en-GB");
const eur = (v:number) => `€${n(v)}`;

function ScopeChange() {
  const id = useId(), [option,setOption] = useState<ScopeOption>("add"), [days,setDays] = useState(4), [task,setTask] = useState(0);
  const baseline=scopePlan("defer",days), plan=scopePlan(option,days), selected=plan.tasks[Math.min(task,plan.tasks.length-1)];
  return <>
    <header><p>Same work capacity, different choices</p><h3>Where will the new work fit?</h3><p>One delivery specialist, eight working days in the original remaining plan. All work below runs in sequence.</p></header>
    <div className="systems-choices">{scopeChoices.map(choice=><button key={choice.id} aria-pressed={option===choice.id} onClick={()=>{setOption(choice.id);setTask(0);}}>{choice.label}</button>)}</div>
    <label className="systems-range">Dashboard build and additional tests<output>{days} specialist-days</output><input aria-label="Dashboard effort" type="range" min="2" max="6" step="1" value={days} onChange={e=>setDays(Number(e.target.value))}/></label>
    <div className="systems-results" aria-live="polite"><p>Revised pilot finish<strong>Day {plan.duration}</strong><span>{plan.difference===0 ? "Original target retained" : `${plan.difference} working days beyond the target`}</span></p><p>Remaining pilot cost<strong>{eur(plan.cost)}</strong><span>{option==="defer" ? `${eur(plan.futureCost)} of possible later work excluded` : `${eur(plan.cost-4800)} above the remaining baseline`}</span></p></div>
    <p className="systems-mobile-hint">Swipe sideways or focus the timeline and use arrow keys. The task selector and table show the same values.</p>
    <div className="systems-scroll" role="region" aria-label="Remaining project schedules, horizontally scrollable" tabIndex={0}>
      <svg className="scope-schedule" viewBox="0 0 700 244" role="img" aria-labelledby={id}><title id={id}>{`Baseline finishes day 8; selected plan finishes day${plan.duration}. Time is working days from now.`}</title>
        {[0,2,4,6,8,10,12,14].map(v=><g key={v}><line x1={115+v*39} x2={115+v*39} y1="42" y2="185" className="systems-grid"/><text x={115+v*39} y="215" textAnchor="middle">{v}</text></g>)}
        <text x="0" y="82">Baseline</text><text x="0" y="155">Selected plan</text>
        {[baseline,plan].map((p,row)=>p.tasks.map((t,i)=><g key={`${row}-${t.name}`} onMouseEnter={()=>row===1&&setTask(i)}><rect x={115+t.start*39} y={row===0?56:129} width={t.days*39-2} height="43" className={t.kind==="change"?"systems-new":"systems-original"}/><text className="scope-task-label" x={115+(t.start+t.days/2)*39} y={row===0?83:156} textAnchor="middle">{t.name==="Daily report"?"Report":t.name==="Acceptance"?"Checks":t.name==="Handover"?"End":t.name==="Dashboard"?"Dash":t.name} {t.days}d</text></g>))}
        <line x1="427" x2="427" y1="30" y2="190" className="systems-limit"/><text x="427" y="22" textAnchor="middle">Original target: day 8</text><text x="115" y="240">Working days from now</text>
      </svg>
    </div>
    <label className="systems-select">Inspect planned work<select value={Math.min(task,plan.tasks.length-1)} onChange={e=>setTask(Number(e.target.value))}>{plan.tasks.map((t,i)=><option key={t.name} value={i}>{t.name}</option>)}</select></label>
    <p className="systems-inspect" aria-live="polite"><strong>{selected.name}</strong>: day {selected.start} to day {selected.end}, {selected.days} specialist-days. {scopeChoices.find(c=>c.id===option)!.note}</p>
    <div className="systems-scroll" role="region" aria-label="Selected remaining work table" tabIndex={0}><table><caption>Selected option, working days from now</caption><thead><tr><th>Work</th><th>Start</th><th>Finish</th><th>Cost</th></tr></thead><tbody>{plan.tasks.map(t=><tr key={t.name}><th scope="row">{t.name}</th><td>{t.start}</td><td>{t.end}</td><td>{eur(t.days*600)}</td></tr>)}</tbody></table></div>
  </>;
}

function ManufacturingOrder() {
  const [index,setIndex]=useState(0), record=productionCases[index], balance=productionBalance(index);
  return <>
    <header><p>Order PO-104 / part BR-01</p><h3>Three records, one run to reconcile</h3><p>Snapshot at 09:30. The order needs 1,000 good brackets. All quantities are individual parts.</p></header>
    <div className="systems-choices">{productionCases.map((c,i)=><button key={c.label} onClick={()=>setIndex(i)} aria-pressed={index===i}>{c.label}</button>)}</div>
    <div className="order-records">
      <section><div className="order-system"><span>Business record</span><h4>ERP</h4></div><div><span>Good output posted</span><strong>{n(record.posted)}</strong><p>Update: {record.time}. {record.confirmed ? "Receipt recorded for this run." : "Current run confirmation unresolved."}</p></div></section>
      <div className="order-transfer">↑ Accepted-output confirmation, with order and run identity</div>
      <section><div className="order-system"><span>Production record</span><h4>MES</h4></div><div><span>Quality disposition at 09:25</span><strong>960 accepted + 40 scrap</strong><p>All 1,000 processed parts accounted for. No rework or quality hold.</p></div></section>
      <div className="order-transfer">↑ Run count associated with the correct order</div>
      <section><div className="order-system"><span>Process view</span><h4>SCADA</h4></div><div><span>Processed count at 09:25</span><strong>1,000</strong><p>One counted cycle per bracket. Includes the 40 later classified as scrap.</p></div></section>
    </div>
    <div className="systems-results" aria-live="polite"><p>Remaining on ERP screen<strong>{n(balance.screenRemaining)}</strong><span>{record.confirmed ? "Based on the posted quantity" : "Posted-balance arithmetic; current run update missing"}</span></p><p>Remaining after MES acceptance<strong>40 good parts</strong><span>1,000 required − 960 accepted</span></p></div>
    <div className="systems-decision" aria-live="polite"><h4>{index===0 ? "The quantities reconcile" : index===1 ? "40 rejects were credited as good" : "Resolve the missing confirmation"}</h4><p>{record.note}</p></div>
    <details><summary>Record boundaries and next checks</summary><p>This diagram assigns responsibilities for the fictional example. It is not a network architecture or a required product layout. ERP posted output and MES quality acceptance are different records. A counter alone does not establish quality, and accepted output alone does not establish shipment readiness. No earlier stock, rework, holds, other orders or later production are included.</p></details>
  </>;
}

function ProcessTraces() {
  const id=useId(), [caseIndex,setCase]=useState(1), [intervalIndex,setInterval]=useState(2);
  const trace=requestTraces[caseIndex], result=traceResult(trace.events), selectedIndex=Math.min(intervalIndex,result.intervals.length-1), selected=result.intervals[selectedIndex], counts=transitionCounts();
  return <>
    <header><p>Four requests, every recorded event</p><h3>The return loop changes the journey</h3><p>Two requests go straight through. Two return for correction. Both routes are visible before selecting a case.</p></header>
    <div className="trace-routes"><section><span>Initial workshop map</span><div className="trace-route"><span>Submitted</span><i aria-hidden="true">→</i><span>Reviewed</span><i aria-hidden="true">→</i><span>Approved</span><i aria-hidden="true">→</i><span>Closed</span></div><p>Direct route appears in 2 of 4 recorded requests.</p></section><section><span>Additional route in the log</span><div className="trace-route trace-route--return"><span>Reviewed</span><i aria-hidden="true">→</i><span>Returned</span><i aria-hidden="true">→</i><span>Resubmitted</span><i aria-hidden="true">→</i><span>Reviewed again</span></div><p>Return loop appears in 2 of 4 requests. They still proceed to approval and closure.</p></section></div>
    <label className="systems-select">Inspect a request<select value={caseIndex} onChange={e=>{setCase(Number(e.target.value));setInterval(0);}}>{requestTraces.map((t,i)=><option key={t.id} value={i}>{t.id}: {traceResult(t.events).duration} minutes{traceResult(t.events).returned ? ", returned once" : ", direct"}</option>)}</select></label>
    <div className="systems-results"><p>Submission to closure<strong>{result.duration} minutes</strong><span>{trace.events[0].time} to {trace.events[trace.events.length-1].time} UTC</span></p><p>Recorded events<strong>{trace.events.length}</strong><span>{result.returned ? "Includes a second review" : "Direct recorded route"}</span></p></div>
    <p className="systems-mobile-hint">Swipe the timeline sideways, or focus it and use arrow keys. Select an interval below for its exact times.</p>
    <div className="systems-scroll" role="region" aria-label="Approval intervals, horizontally scrollable" tabIndex={0}>
      <svg className="trace-timeline" viewBox="0 0 700 170" role="img" aria-labelledby={id}><title id={id}>{`${trace.id}, ${result.duration} elapsed minutes. Each bar is time between consecutive recorded events, not measured work or idle time.`}</title>
        {[0,40,80,120,160].map(v=><g key={v}><line x1={20+v*4} x2={20+v*4} y1="40" y2="109" className="systems-grid"/><text x={20+v*4} y="136" textAnchor={v===0?"start":"middle"}>{v}</text></g>)}
        {result.intervals.map((v,i)=><g key={`${v.from}-${i}`} onMouseEnter={()=>setInterval(i)}><rect x={20+v.start*4} y="52" width={v.minutes*4-2} height="43" className={i===selectedIndex?"systems-new":"systems-original"}/><text x={20+(v.start+v.minutes/2)*4} y="79" textAnchor="middle" className="scope-task-label">{v.minutes}m</text></g>)}
        <text x="20" y="162">Minutes from this request&apos;s submission</text>
      </svg>
    </div>
    <label className="systems-select">Inspect an interval<select value={selectedIndex} onChange={e=>setInterval(Number(e.target.value))}>{result.intervals.map((v,i)=><option value={i} key={`${i}-${v.from}`}>{v.from} to {v.to}: {v.minutes} min</option>)}</select></label>
    <p className="systems-inspect" aria-live="polite"><strong>{selected.from} → {selected.to}: {selected.minutes} minutes</strong><br/>{trace.id}, {selected.startTime} to {selected.endTime} UTC. The log does not split this interval into working and waiting.</p>
    <div className="systems-scroll" role="region" aria-label="Selected request event log" tabIndex={0}><table><caption>Full log for {trace.id}, 1 October 2026, UTC</caption><thead><tr><th>Request</th><th>Activity</th><th>Time</th></tr></thead><tbody>{trace.events.map((e,i)=><tr key={`${i}-${e.activity}`}><th scope="row">{trace.id}</th><td>{e.activity}</td><td>{e.time}</td></tr>)}</tbody></table></div>
    <details><summary>All cases and counted transitions</summary><div className="systems-scroll" role="region" aria-label="All request durations" tabIndex={0}><table><thead><tr><th>Request</th><th>Route</th><th>Minutes</th></tr></thead><tbody>{requestTraces.map(t=><tr key={t.id}><th scope="row">{t.id}</th><td>{traceResult(t.events).returned?"Returned once":"Direct"}</td><td>{traceResult(t.events).duration}</td></tr>)}</tbody></table><table><caption>Consecutive recorded transitions across all four requests</caption><thead><tr><th>Transition</th><th>Count</th></tr></thead><tbody>{Object.entries(counts).map(([key,count])=><tr key={key}><th scope="row">{key}</th><td>{count}</td></tr>)}</tbody></table></div><p>All 22 events belong to closed cases on one day. A repeated review is retained because it is a separate recorded event. This is a small supplied dataset, not a fitted discovery model or a representative sample.</p></details>
  </>;
}

export function SystemsFigure({name,caption}:{name:SystemsName;caption:string}) {
  return <figure className="systems-figure" aria-label={name==="scope-change-options"?"Scope change schedule comparison":name==="manufacturing-order-records"?"ERP MES SCADA order records":"Process map and event traces"}>{name==="scope-change-options"?<ScopeChange/>:name==="manufacturing-order-records"?<ManufacturingOrder/>:<ProcessTraces/>}<figcaption>{caption}</figcaption></figure>;
}
