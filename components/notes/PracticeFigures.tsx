"use client";
import {useId,useState} from "react";
import {allocationOptions,allocationResult,specialistWork,type AllocationOption} from "./practice-models";
import "./PracticeFigures.css";
export type PracticeName = "lean-waste-order"|"five-s-station"|"portfolio-capacity";
const wasteObservations=[
 {name:"Defects",stage:2,observation:"Six ordered cartons need a new label.",check:"Trace the label identity, file selection and verification step. Check the cause before asking the team to work more carefully."},
 {name:"Overproduction",stage:1,observation:"90 packed against a confirmed need for 60.",check:"Ask what authorised the extra 30. Review setup constraints and output targets before changing batch sizes."},
 {name:"Waiting",stage:3,observation:"20 minutes awaiting release information.",check:"Check what was missing, when it became available and who could supply it. Keep any required release check."},
 {name:"Unused talent",stage:2,observation:"A packer's printer-location suggestion gets no review.",check:"Give the suggestion an owner and a response. Include the people doing the work in the layout trial."},
 {name:"Transportation",stage:3,observation:"Cartons travel 40 metres through holding.",check:"Establish what the holding area protects. Trial a shorter route only if the required separation and checks remain effective."},
 {name:"Inventory",stage:3,observation:"30 extra cartons remain in holding.",check:"They are the same 30 created by overproduction. Assess storage and future use without counting the quantity twice."},
 {name:"Motion",stage:2,observation:"The operator walks 12 metres for labels.",check:"Test the printer's location with safe reach, clear routes and correct labels. Check the effect on the complete work cycle."},
 {name:"Extra-processing",stage:3,observation:"60 tracking references are typed again.",check:"Find the spreadsheet's user and purpose. Remove an unnecessary copy, or repair the record that made the workaround necessary."},
];
function WasteOrder(){
 const [selected,setSelected]=useState(0),v=wasteObservations[selected];
 return <><header><p>One order / 60 cartons required</p><h3>Where does the extra work appear?</h3><p>Follow the order from release to dispatch. Select an observation to highlight its location and inspect a possible next check.</p></header>
 <div className="waste-route" aria-label="Order route with selected waste location">{[
 ["01","Release","Confirmed need: 60"],["02","Pick and pack","90 packed for 60 ordered"],["03","Label and check","6 labels corrected"],["04","Dispatch","30 held; 20-minute wait"],
 ].map(([number,title,detail],i)=><section key={number} className={v.stage===i?"is-highlighted":""}><span>{number}</span><h4>{title}</h4><p>{detail}</p>{v.stage===i&&<small>Selected observation</small>}</section>)}</div>
 <div className="practice-choices waste-choices" aria-label="Inspect a waste">{wasteObservations.map((w,i)=><button key={w.name} aria-pressed={i===selected} onClick={()=>setSelected(i)}>{w.name}</button>)}</div>
 <div className="practice-inspect" aria-live="polite"><span>{v.name}</span><h4>{v.observation}</h4><p>{v.check}</p></div>
 <p className="practice-note">The route is not a time scale. Distances, quantities and elapsed time measure different things. No combined waste total is calculated.</p></>;
}
const stationStates=[
 {label:"Ready to start",area:"none",issue:"The required items are visible",response:"Confirm the order's label specification and equipment condition before use. A complete layout does not replace the working method or its checks."},
 {label:"Scanner missing",area:"scanner",issue:"The scanner home is empty",response:"Check the recorded loan. Contact the shift lead if it is unresolved and follow the approved equipment replacement method. Keep carton verification in place."},
 {label:"Reserve empty",area:"reserve",issue:"The working roll is in use; no reserve remains",response:"Confirm the refill request and its owner. The materials runner supplies the approved roll. If it cannot arrive in time, raise the shortage before the working roll runs out."},
 {label:"Wrong label roll",area:"labels",issue:"An old revision is in the active position",response:"Keep the old roll out of use and obtain the current specification. Assess any cartons already labelled under the site's quality procedure."},
] as const;
function StationDrawing({before,state}:{before:boolean;state:number}){
 const id=useId(),area=stationStates[state].area;
 return <svg viewBox="0 0 320 290" role="img" aria-labelledby={id}><title id={id}>{before?"Before: scanner has no home, current and old labels mixed, reserve arrangement unclear.":`Proposed station: ${stationStates[state].issue}.`}</title>
 <rect x="8" y="8" width="304" height="274" rx="4" className="station-bench"/><text x="24" y="35" className="station-small">PACKING BENCH / TOP VIEW</text>
 <rect x="24" y="52" width="116" height="90" className="station-item"/><path d="M50 78h64v38H50z M60 67h44v12H60z M61 103h42v24H61z" className="station-tool"/><text x="82" y="160" textAnchor="middle">Printer</text>
 <rect x="162" y="52" width="132" height="90" className={!before&&area==='scanner'?"station-alert":"station-home"}/>
 {before?<><path d="M184 83l44-16 12 29-17 7 9 25-19 7-13-31-9 3z" className="station-tool"/><text x="228" y="160" textAnchor="middle">No return home</text></>:<><text x="228" y="72" textAnchor="middle" className="station-small">SCANNER HOME</text>{area==='scanner'?<text x="228" y="111" textAnchor="middle" className="station-warning">MISSING</text>:<path d="M198 91h54v17h-20v23h-15v-23h-19z" className="station-tool"/>}<text x="228" y="160" textAnchor="middle">{area==='scanner'?"Check loan record":"Return after use"}</text></>}
 <rect x="24" y="182" width="116" height="76" className={!before&&area==='labels'?"station-alert":"station-home"}/>
 <rect x="162" y="182" width="132" height="76" className={!before&&area==='reserve'?"station-alert":"station-home"}/>
 <text x="82" y="201" textAnchor="middle" className="station-small">{before?"MIXED LABELS":"WORKING ROLL"}</text><text x="228" y="201" textAnchor="middle" className="station-small">{before?"SPARE SUPPLIES":"RESERVE HOME"}</text>
 {before?<><text x="82" y="227" textAnchor="middle">L-02 + L-03</text><text x="82" y="246" textAnchor="middle" className="station-small">Old and current</text><text x="228" y="229" textAnchor="middle">Refill: who?</text></>:<><text x="82" y="229" textAnchor="middle" className={area==='labels'?"station-warning":""}>{area==='labels'?"L-02: wrong":"L-03: current"}</text><text x="228" y="229" textAnchor="middle" className={area==='reserve'?"station-warning":""}>{area==='reserve'?"EMPTY":"1 roll, L-03"}</text><text x="228" y="247" textAnchor="middle" className="station-small">Refill on reserve use</text></>}
 </svg>;
}
function FiveSStation(){
 const [state,setState]=useState(0),current=stationStates[state];
 return <><header><p>Same work, clearer conditions</p><h3>Can the next shift see what&apos;s missing?</h3><p>The proposed layout identifies tools, label stock and the reserve position. Compare both views, then inspect an abnormal condition.</p></header>
 <div className="station-comparison"><section><h4>Before</h4><StationDrawing before state={0}/><p>A clean surface, but mixed label versions and no agreed return or refill rule.</p></section><section><h4>Proposed arrangement</h4><StationDrawing before={false} state={state}/><p>Expected: named homes, current label L-03 and a visible reserve.</p></section></div>
 <div className="practice-choices station-choices" aria-label="Proposed station condition">{stationStates.map((s,i)=><button key={s.label} aria-pressed={state===i} onClick={()=>setState(i)}>{s.label}</button>)}</div>
 <div className="practice-inspect" aria-live="polite"><span>Proposed station / {current.label}</span><h4>{current.issue}</h4><p>{current.response}</p></div>
 <details><summary>What the layout leaves to validate</summary><p>Reach, equipment access, carton routes, label specification and refill time need checking at the actual station. The reserve quantity is illustrative. Cartons and tape are outside this cropped bench view; they still need suitable locations. The drawing does not claim a measured productivity or safety improvement.</p></details></>;
}
function PortfolioCapacity(){
 const [option,setOption]=useState<AllocationOption>('all'),[capacity,setCapacity]=useState(20),id=useId(),r=allocationResult(option,capacity);
 const requested:number[]=specialistWork.map(w=>w.requested) ,assigned:number[]=r.rows.map(w=>w.assigned);
 return <><header><p>One business / connected decisions</p><h3>Which work can the company commit to?</h3><p>The dispatch program coordinates three related projects. Invoice automation and ongoing support also need a place in the wider allocation.</p></header>
 <div className="portfolio-map"><span>Portfolio view: priorities and resource commitments</span><section className="portfolio-program"><h4>Dispatch improvement program</h4><p>Combined outcome: fewer late dispatches, with order accuracy protected.</p><div className="program-projects"><span>ERP promise rules</span><span>Barcode verification</span><span>Shift training</span></div><p>Coordinate rules, warehouse handoff and readiness across shifts.</p></section><div className="portfolio-other"><section><h4>Invoice automation</h4><p>Standalone project</p></section><section><h4>Production support</h4><p>Ongoing operations</p></section></div></div>
 <p className="practice-note">Only the integration team&apos;s specialist-days are counted below. Training needs other people and its own dates.</p>
 <div className="practice-choices allocation-choices">{allocationOptions.map(o=><button key={o.id} aria-pressed={option===o.id} onClick={()=>setOption(o.id)}>{o.label}</button>)}</div>
 <label className="practice-range">Available capacity in the four-week window<output>{capacity} specialist-days</output><input type="range" aria-label="Available specialist-days" min="16" max="32" step="1" value={capacity} onChange={e=>setCapacity(Number(e.target.value))}/></label>
 <div className="practice-results" aria-live="polite"><p>Allocated in this window<strong>{r.assigned} days</strong><span>{r.deferred} requested days deferred</span></p><p>Against {capacity} available days<strong>{r.overload>0?`${r.overload} days over`:r.unallocated>0?`${r.unallocated} days unallocated`:"Fits the total"}</strong><span>Aggregate capacity only, not a dated schedule</span></p></div>
 <p className="practice-mobile-hint">Swipe the chart sideways or focus it and use arrow keys. Exact values are in the table.</p>
 <div className="practice-scroll" role="region" aria-label="Specialist allocation chart, horizontally scrollable" tabIndex={0}><svg className="allocation-chart" viewBox="0 0 700 232" role="img" aria-labelledby={id}><title id={id}>{`Requested 28 specialist-days. Selected allocation ${r.assigned}, capacity ${capacity}, deferred ${r.deferred}. Same zero to 32 day scale for both bars.`}</title>
 {[0,4,8,12,16,20,24,28,32].map(n=><g key={n}><line x1={100+n*18} x2={100+n*18} y1="42" y2="166" className="practice-grid"/><text x={100+n*18} y="194" textAnchor="middle">{n}</text></g>)}
 <text x="0" y="82">Requested</text><text x="0" y="143">Selected</text>
 {[requested,assigned].map((values,row)=>values.map((value,i)=>{const start=values.slice(0,i).reduce((a,b)=>a+b,0);return value>0?<rect key={`${row}-${i}`} x={100+start*18} y={row===0?56:117} width={value*18} height="40" className={`allocation-${specialistWork[i].kind}`}/>:null;}))}
 <line x1={100+capacity*18} x2={100+capacity*18} y1="28" y2="171" className="practice-limit"/><text x={100+capacity*18} y="20" textAnchor={capacity>28?"end":"middle"}>Capacity: {capacity}d</text><text x="100" y="225">Specialist-days in four weeks</text>
 </svg></div>
 <div className="allocation-legend">{specialistWork.map(w=><span key={w.kind}><i className={`allocation-${w.kind}`} aria-hidden="true"/>{w.name}</span>)}</div>
 <div className="practice-scroll" role="region" aria-label="Requested allocated and deferred days" tabIndex={0}><table><caption>Specialist-days; deferred work stays outside this window</caption><thead><tr><th>Work</th><th>Requested</th><th>Allocated</th><th>Deferred</th></tr></thead><tbody>{r.rows.map(row=><tr key={row.kind}><th scope="row">{row.name}</th><td>{row.requested}</td><td>{row.assigned}</td><td>{row.deferred}</td></tr>)}<tr><th scope="row">Total</th><td>{r.requested}</td><td>{r.assigned}</td><td>{r.deferred}</td></tr></tbody></table></div>
 <p className="practice-inspect" aria-live="polite">{r.note}</p>
 <details><summary>Allocation assumptions</summary><p>All estimates refer to the same four-week window and interchangeable specialist capacity. Deferred work is not eliminated or completed. Ongoing support remains four days in every option. No overtime, task dependencies, calendars, skill differences, costs or benefit values are modelled. More available days need confirmation; moving the slider does not authorise extra staffing.</p></details></>;
}
export function PracticeFigure({name,caption}:{name:PracticeName;caption:string}){
 return <figure className="practice-figure" aria-label={name==='lean-waste-order'?'Eight wastes in one order':name==='five-s-station'?'5S station comparison':'Projects program and portfolio allocation'}>{name==='lean-waste-order'?<WasteOrder/>:name==='five-s-station'?<FiveSStation/>:<PortfolioCapacity/>}<figcaption>{caption}</figcaption></figure>;
}
