"use client";
import {useId,useState} from 'react';
import {purchasingScenario,REQUIREMENTS,traceReview,type PurchaseGroup} from './portfolio-trace';
import './CoreConcepts.css';
import './SupplyCareTrace.css';
export type SupplyCareTraceName='purchasing-portfolio'|'equipment-care-week'|'requirements-evidence-map';

function PurchasingPortfolio(){
 const [exits,setExits]=useState(false),items=purchasingScenario(exits);
 const groups:{key:PurchaseGroup;title:string;levels:string;focus:string}[]=[
  {key:'competitive',title:'Compare qualified offers',levels:'Higher profit impact / lower supply risk',focus:'Compare suppliers on the full requirement.'},
  {key:'strategic',title:'Develop the supply plan',levels:'Higher profit impact / higher supply risk',focus:'Work on continuity, capacity and feasible alternatives.'},
  {key:'routine',title:'Make ordering easy',levels:'Lower profit impact / lower supply risk',focus:'Keep specification and administration simple.'},
  {key:'bottleneck',title:'Protect continuity',levels:'Lower profit impact / higher supply risk',focus:'Confirm availability and a workable fallback.'},
 ];
 return <><header><p>Four purchasing situations</p><h3>Annual spend does not set both axes</h3><p>Profit impact reflects the financial importance to this factory. Supply risk reflects access to usable supply. The labels below describe possible buying responses.</p></header>
 <div className="concept-choices" role="group" aria-label="Carton supplier availability"><button aria-pressed={!exits} onClick={()=>setExits(false)}>3 qualified carton suppliers</button><button aria-pressed={exits} onClick={()=>setExits(true)}>2 leave; 1 remains</button></div>
 <p className="sct-axis">Supply risk: lower → higher</p><div className="sct-matrix">{groups.map(g=><section key={g.key}><p className="sct-level">{g.levels}</p><h4>{g.title}</h4><div className="sct-items">{items.filter(i=>i.group===g.key).map(i=><p key={i.name}>{i.name}<span>€{i.spend.toLocaleString('en-IE')} annual spend</span></p>)}{!items.some(i=>i.group===g.key)&&<p className="sct-empty">No category in this scenario</p>}</div><p className="sct-focus">{g.focus}</p></section>)}</div>
 <div className="concept-reading" aria-live="polite"><h4>{exits?'Cartons move to higher supply risk':'Cartons have three usable sources'}</h4><p>{exits?'Two independent qualified suppliers have exited. One remains, with no approved replacement. The high profit impact and €600,000 annual spend are unchanged. Review the remaining capacity and alternatives before choosing a response.':'The three sources are independent, qualified and have available capacity for the approved design. The control module remains high impact and high risk despite its €12,000 annual spend.'}</p></div>
 <p className="concept-scroll-hint">Scroll sideways to read the full evidence table. All four situations remain visible above.</p><div className="concept-scroll" role="region" tabIndex={0} aria-label="Evidence for all four purchasing categories"><table><caption>Qualitative judgements for this fictional factory. No numerical scores or universal spend thresholds are used.</caption><thead><tr><th scope="col">Category and annual spend</th><th scope="col">Profit impact</th><th scope="col">Supply risk</th></tr></thead><tbody>{items.map(i=><tr key={i.name}><th scope="row">{i.name}<br/>€{i.spend.toLocaleString('en-IE')}</th><td>{i.impact}</td><td>{i.risk}</td></tr>)}</tbody></table></div></>;
}

function EquipmentCareWeek(){
 const id=useId(),events=[
 {day:'Monday',role:'Operator',title:'Record the recurring fault',copy:'Record the indication, location and operating conditions from the normal working position. Report the fault and link the earlier event.'},
 {day:'Tuesday',role:'Production and maintenance leads',title:'Plan access for maintenance',copy:'Agree Wednesday access, the assigned technician, needed resources and the response owner. The report now has planned follow-up.'},
 {day:'Wednesday',role:'Qualified maintenance staff',title:'Inspect and restore the condition',copy:'The example inspection finds a loose mounting. Restore the approved condition, record the finding and complete return-to-service checks.'},
 {day:'Thursday',role:'Engineering, maintenance and operator',title:'Investigate recurrence',copy:'Review why the mounting became loose and what the current tasks could detect. Keep observations separate from proposed explanations.'},
 {day:'Friday',role:'Engineering and production leads',title:'Agree the next trial',copy:'Define any approved change, trial conditions, care-task updates and review date. The trial result is still unknown.'},
 ];
 return <><header><p>One recurring conveyor fault</p><h3>Connect daily observation to technical follow-up</h3><p>Several teams act during the week. The finding stays in the equipment history so the next shift and the next review can use it.</p></header><p className="concept-scroll-hint">Scroll sideways for the full week. The five dated records follow below.</p>
 <div className="concept-scroll" role="region" tabIndex={0} aria-label="Weekly equipment-care responsibility map"><svg className="sct-week" viewBox="0 0 700 330" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>Equipment care moves between observation, planning, restoration and review</title><desc id={`${id}-desc`}>Monday operator observation. Tuesday leads plan access. Wednesday maintenance restores the mounting. Thursday engineering and the operating team review recurrence. Friday leads and engineering agree the next trial. This timeline shows responsibility handoffs, not repair instructions or a measured outcome.</desc>
 {['Mon','Tue','Wed','Thu','Fri'].map((day,i)=><g key={day}><text x={172+i*112} y="25" textAnchor="middle">{day}</text><line x1={172+i*112} x2={172+i*112} y1="42" y2="305" className="concept-grid"/></g>)}
 {['Operators','Maintenance','Engineering','Leads'].map((role,i)=><g key={role}><text x="0" y={83+i*66}>{role}</text><line x1="152" x2="640" y1={78+i*66} y2={78+i*66} className="sct-week-track"/></g>)}
 <path d="M172 78L284 276L396 144L508 210L620 210" className="sct-handoff"/>
 {[[172,78,'01'],[284,276,'02'],[396,144,'03'],[508,210,'04'],[620,210,'05']].map(([x,y,label])=><g key={label}><circle cx={Number(x)} cy={Number(y)} r="17" className="sct-week-dot"/><text x={Number(x)} y={Number(y)+5} textAnchor="middle" className="sct-week-number">{label}</text></g>)}
 <text x="0" y="326" className="concept-small">Primary role shown at each handoff; the dated records name the collaborating roles.</text></svg></div>
 <ol className="sct-care-events">{events.map((e,i)=><li key={e.day}><span aria-hidden="true">0{i+1}</span><section><p className="sct-day">{e.day} / {e.role}</p><h4>{e.title}</h4><p>{e.copy}</p></section></li>)}</ol></>;
}

function RequirementsEvidence(){
 const r=traceReview();
 return <><header><p>Build 1 / review snapshot</p><h3>Read the requirements beside the test results</h3><p>DW-01 version 1 is the approved source. R02 has no implementation link or verification result; T99 has no recorded test basis.</p></header>
 <div className="concept-results"><p><span>Executed tests passing</span><strong>{r.passed} of {r.executed}</strong><span>T01, T03 and T99 all pass</span></p><p><span>Requirements with linked passing evidence</span><strong>{r.withPassingEvidence} of {r.requirements}</strong><span>R01 and R03; this is not a completeness score</span></p></div>
 <div className="sct-trace-chain" aria-label="The missing requirement path"><span>DW-01 v1</span><b aria-hidden="true">→</b><span>R02: held stock</span><b aria-hidden="true">→</b><span className="sct-gap">Implementation link missing</span><b aria-hidden="true">→</b><span className="sct-gap">Test evidence missing</span></div>
 <p className="concept-scroll-hint">Scroll sideways for every column. The full requirement set remains in the table.</p><div className="concept-scroll" role="region" tabIndex={0} aria-label="Requirements traceability matrix"><table className="sct-trace-table"><caption>All three agreed requirements, with the implementation links and results available at this review.</caption><thead><tr><th scope="col">Requirement and source</th><th scope="col">Implementation link</th><th scope="col">Test evidence</th><th scope="col">Review decision</th></tr></thead><tbody>{REQUIREMENTS.map(row=><tr className={row.id==='R02'?'sct-gap-row':undefined} key={row.id}><th scope="row"><strong>{row.id}</strong><br/>{row.requirement}<span className="sct-source">{row.source}</span></th><td>{row.implementation}</td><td>{row.test}</td><td>{row.decision}</td></tr>)}</tbody></table></div>
 <aside className="sct-orphan"><p className="sct-level">Reverse check / T99</p><h4>Passed: export a dashboard chart image</h4><p>No approved requirement or other test basis is recorded. Investigate whether it belongs to another requirement, a valid derived need or shared regression coverage. Keep it flagged until that basis is resolved.</p></aside>
 <p className="sct-evidence-limit">A passing link is a starting point for reviewing coverage. R01, R02 and R03 may each need several test cases, different data or roles. Review the actual test evidence before accepting the requirement.</p></>;
}
export function SupplyCareTrace({name,caption}:{name:SupplyCareTraceName;caption:string}){return <figure className="concept-figure sct-figure">{name==='purchasing-portfolio'?<PurchasingPortfolio/>:name==='equipment-care-week'?<EquipmentCareWeek/>:<RequirementsEvidence/>}<figcaption>{caption}</figcaption></figure>;}
