"use client";
import {useId,useState} from 'react';
import {DEMAND,rolloutEstimate} from './patterns-estimates';
import './CoreConcepts.css';
import './PatternFigures.css';
export type PatternFigureName='demand-components'|'estimate-builds'|'order-exchange-route';
const money=(n:number)=>`€${n.toLocaleString('en-IE')}`;

function DemandComponents(){
 const [selected,setSelected]=useState(19),[reference,setReference]=useState(true),id=useId();
 const d=DEMAND[selected],x=(i:number)=>64+i*24;
 const panels=[{label:'Observed demand',key:'observed',min:60,max:200,top:42},{label:'Trend',key:'trend',min:90,max:150,top:207},{label:'Seasonal contribution',key:'seasonal',min:-30,max:30,top:372},{label:'Remainder',key:'remainder',min:-10,max:30,top:537}] as const;
 return <><header><p>Read the same month across four plots</p><h3>August contains more than the summer peak</h3><p>The original series stays visible. Hover over the plots or use the month control to inspect the components. Each panel has its own labelled scale in pieces.</p></header>
 <label className="concept-range">Month to inspect<output>{d.label}</output><input type="range" min="0" max="23" value={selected} aria-valuetext={d.label} onChange={e=>setSelected(Number(e.target.value))}/></label>
 <button aria-pressed={reference} onClick={()=>setReference(!reference)}>{reference?'Hide':'Show'} trend + season reference</button>
 <p className="concept-scroll-hint">Scroll sideways to see both years. The month control also selects every point.</p>
 <div className="concept-scroll" role="region" tabIndex={0} aria-label="Aligned demand and component charts"><svg className="pattern-chart" viewBox="0 0 660 720" role="img" aria-labelledby={`${id}-title ${id}-desc`} onPointerMove={e=>{const rect=e.currentTarget.getBoundingClientRect();setSelected(Math.max(0,Math.min(23,Math.round(((e.clientX-rect.left)*660/rect.width-64)/24))));}}>
 <title id={`${id}-title`}>Fictional monthly demand and its known components over two years</title><desc id={`${id}-desc`}>The top plot shows observed demand, with an optional dashed trend plus season reference. The lower three plots show trend, seasonality and remainder at the same dates, on separately labelled scales. The selected values and all 24 rows are available below.</desc>
 {panels.map(p=>{const y=(v:number)=>p.top+112-(v-p.min)/(p.max-p.min)*100;
 return <g key={p.key}><text x="0" y={p.top-10} className="pattern-panel-label">{p.label}</text>{[p.min,(p.min+p.max)/2,p.max].map(v=><g key={v}><line x1="64" x2="616" y1={y(v)} y2={y(v)} className="concept-grid"/><text x="51" y={y(v)+4} textAnchor="end">{v}</text></g>)}
 <line x1={x(selected)} x2={x(selected)} y1={p.top+6} y2={p.top+118} className="pattern-cursor"/>
 <polyline points={DEMAND.map((v,i)=>`${x(i)},${y(v[p.key])}`).join(' ')} className={p.key==='observed'?'pattern-observed':'pattern-component'}/>
 {p.key==='observed'&&reference&&<polyline points={DEMAND.map((v,i)=>`${x(i)},${y(v.trend+v.seasonal)}`).join(' ')} className="pattern-reference"/>}
 <circle cx={x(selected)} cy={y(d[p.key])} r="5" className="pattern-dot"/>
 {[0,6,12,18,23].map(i=><text key={i} x={x(i)} y={p.top+140} textAnchor="middle">{i===0?'Jan Y1':i===6?'Jul Y1':i===12?'Jan Y2':i===18?'Jul Y2':'Dec Y2'}</text>)}
 </g>;})}</svg></div>
 <p className="pattern-legend">Solid graphite: observed demand. Dashed rust: trend + season, when shown. Lower plots: individual contributions.</p>
 <div className="pattern-equation" aria-live="polite"><p>{d.label}, pieces</p><div><span><strong>{d.trend}</strong>Trend</span><b>+</b><span><strong>{d.seasonal}</strong>Seasonal</span><b>+</b><span><strong>{d.remainder}</strong>Remainder</span><b>=</b><span><strong>{d.observed}</strong>Observed</span></div></div>
 <details><summary>See all 24 months and the construction</summary><p>Trend = 100 + 2 × month index, starting at zero. The twelve seasonal effects sum to zero and repeat in year 2. Remainders are specified teaching values; the second August has +28. No statistical model is fitted. Turning off the reference changes only its visibility, not the data or lower plots.</p><div className="concept-scroll" role="region" tabIndex={0} aria-label="All monthly component values"><table><caption>All values are pieces per month. Negative contributions reduce the total; they are not negative demand.</caption><thead><tr><th scope="col">Month</th><th scope="col">Trend</th><th scope="col">Seasonal</th><th scope="col">Remainder</th><th scope="col">Observed</th></tr></thead><tbody>{DEMAND.map(v=><tr key={v.label}><th scope="row">{v.label}</th><td>{v.trend}</td><td>{v.seasonal}</td><td>{v.remainder}</td><td>{v.observed}</td></tr>)}</tbody></table></div></details></>;
}

function EstimateBuilds(){
 const [stations,setStations]=useState<8|12>(8),[extra,setExtra]=useState(false),estimates=rolloutEstimate(stations,extra);
 return <><header><p>One scope, three estimating bases</p><h3>See which costs move with the station count</h3><p>One existing warehouse, normal-hours installation and sufficient network capacity. All three include hardware, installation, configuration, testing, training, coordination and security review.</p></header>
 <div className="concept-choices" role="group" aria-label="Scanning station count"><button aria-pressed={stations===8} onClick={()=>setStations(8)}>8 stations</button><button aria-pressed={stations===12} onClick={()=>setStations(12)}>12 stations</button></div>
 <label className="pattern-check"><input type="checkbox" checked={extra} onChange={e=>setExtra(e.target.checked)}/> Include three extra test days (+€1,800)</label>
 <div className="pattern-estimates">{estimates.map((m,i)=><section key={m.name}><div className="pattern-estimate-heading"><div><p>0{i+1} / {m.basis}</p><h4>{m.name}</h4></div><strong aria-live="polite" aria-atomic="true">{money(m.total)}</strong></div><dl>{m.rows.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{money(value)}</dd></div>)}<div className="pattern-subtotal"><dt>Base estimate</dt><dd>{money(m.base)}</dd></div><div><dt>Additional testing scenario</dt><dd>{money(m.extra)}</dd></div></dl></section>)}</div>
 <p className="pattern-scope">Excluded from every estimate: VAT, building work, a new server, recurring subscriptions and ongoing support. Extra testing is separate from the acceptance testing already in the base.</p>
 <details><summary>Inputs behind the estimates</summary><p>Analogous: the earlier eight-station rollout cost €18,000 at a comparable price date. Add the new €1,200 security review. Four extra stations are assumed to cost €1,500 each; that rate would need separate evidence in practice.</p><p>Parametric: fictional comparable records for 4, 8 and 12 stations cost €12,700, €18,900 and €25,100. They follow €6,500 + €1,550 × stations. These invented records illustrate the formula. Real estimates need comparable project data; this model covers only the stated station range.</p><p>Bottom-up: fixed work totals €8,200. Hardware and installation total €1,500 per station. Shared work stays fixed at 8 and 12 stations; a second training group or changed network needs would invalidate that assumption. The three-day testing scenario adds €1,800 once to each method. No confidence level or complete risk reserve is calculated.</p></details></>;
}

function OrderExchange(){
 const steps=[
  {label:'Buyer ERP',title:'Create the purchase order',fields:[['Order','PO-1042 / revision 1'],['Item and unit','BRKT-01 / individual pieces'],['Quantity and request','100 / delivery Wednesday']],next:'EDI purchase order →'},
  {label:'Supplier integration service',title:'Receive, validate and translate',fields:[['Receipt','Message reached the service'],['Mapping','Buyer item → supplier item'],['Operation identity','Buyer + PO-1042 + revision 1']],next:'Internal order API →'},
  {label:'Supplier ERP',title:'Create one order and check supply',fields:[['Supplier record','SO-310'],['Requested delivery','Wednesday'],['Supply response','100 offered for Friday']],next:'Business response → buyer'},
  {label:'Buyer order owner',title:'Resolve the delivery change',fields:[['Wednesday request','Cannot be met as requested'],['Friday offer','Awaiting buyer agreement'],['Next step','Agree a revision or another supply option']],next:null},
 ];
 return <><header><p>EDI and an API in the same route</p><h3>Carry the business response back to the buyer</h3><p>Each step needs the same order identity. A transport receipt confirms message delivery, not the supplier&apos;s acceptance of Wednesday.</p></header><ol className="pattern-route">{steps.map((s,i)=><li key={s.label}><span className="pattern-step" aria-hidden="true">0{i+1}</span><section><p className="pattern-system">{s.label}</p><h4>{s.title}</h4><dl>{s.fields.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>{s.next&&<p className="pattern-transfer">{s.next}</p>}</section></li>)}</ol><aside className="pattern-retry"><p>Reply lost after SO-310 is created?</p><strong>Retry the same operation → return SO-310</strong><p>The proposed duplicate check preserves one order for 100 pieces. Process an agreed change as an amendment to that order.</p></aside></>;
}
export function PatternFigure({name,caption}:{name:PatternFigureName;caption:string}){return <figure className="concept-figure pattern-figure">{name==='demand-components'?<DemandComponents/>:name==='estimate-builds'?<EstimateBuilds/>:<OrderExchange/>}<figcaption>{caption}</figcaption></figure>;}
