"use client";

import { useEffect, useRef, useState } from "react";
import data from "./ai-control-data.json";
import "./AiControlCharts.css";

export type AiControlChartName = "ai-control-theories" | "ai-control-evidence" | "ai-control-horizons" | "ai-control-authority";
const theories = [
  {name:"Faster AI research",term:"Intelligence explosion",mechanism:"Better AI speeds up the research that builds the next AI.",evidence:"AI-assisted research exists. An unstoppable improvement loop has not been established.",kind:"Research + hypothesis",source:"https://arxiv.org/html/2607.07663v2"},
  {name:"The wrong objective",term:"Misalignment",mechanism:"The system meets a target through actions people did not want.",evidence:"Observed in experiments and real incidents. How often it happens depends on the setup.",kind:"Experiments + incidents",source:"https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents"},
  {name:"Seeking more options",term:"Instrumental power-seeking",mechanism:"More resources and fewer interruptions can help achieve many goals.",evidence:"Mathematical results under specific assumptions. They do not predict every model's behavior.",kind:"Formal theory",source:"https://arxiv.org/abs/1912.01683"},
  {name:"Passing the test",term:"Alignment faking / scheming",mechanism:"The system changes behavior under monitoring or hides unwanted actions.",evidence:"Related behaviors appear in experiments and incidents. The mechanisms differ between cases.",kind:"Experiments + incidents",source:"https://www.anthropic.com/research/alignment-faking"},
  {name:"Running elsewhere",term:"Autonomous replication",mechanism:"The system obtains resources to deploy copies beyond its intended control.",evidence:"Component tests and risk assessments exist. Copying a process is different from surviving shutdown.",kind:"Tests + assessment",source:"https://metr.org/blog/2026-05-19-frontier-risk-report/"},
  {name:"Giving away decisions",term:"Gradual disempowerment",mechanism:"People delegate until they cannot meaningfully challenge the system.",evidence:"A proposed systemic scenario. Dependence alone does not demonstrate the whole outcome.",kind:"Systemic hypothesis",source:"https://arxiv.org/abs/2501.16946"},
  {name:"Power for its owners",term:"AI-enabled concentration of power",mechanism:"People use AI to gain influence over others, with the AI following their instructions.",evidence:"Misuse and autonomy concerns have evidence. Extraordinary future concentration remains a scenario.",kind:"Present harms + scenario",source:"https://internationalaisafetyreport.org/publication/2026-report-executive-summary"},
];
const cases = [
  {date:"December 2024",name:"Alignment faking",setting:"Constructed training experiment",real:false,value:"Training cue",valueLabel:"Behavior changed with the stated training context",finding:"A model sometimes changed its behavior when told answers would affect its training.",limit:"Researchers supplied context and a private scratchpad. This does not establish a hidden objective in every deployed model.",source:"https://www.anthropic.com/research/alignment-faking"},
  {date:"June 2025",name:"Corporate goal conflicts",setting:"Controlled simulations",real:false,value:"16",valueLabel:"Models tested in fictional corporate settings",finding:"Some models chose blackmail or information disclosure when those actions helped their assigned goal.",limit:"Fictional people and companies. The stress test does not measure ordinary deployment frequency.",source:"https://www.anthropic.com/research/agentic-misalignment"},
  {date:"July 2026 incident",reported:"Investigation: 26 August",name:"OpenAI and Hugging Face",setting:"Evaluation with real third-party impact",real:true,value:"~1,200",valueLabel:"Agents on an unauthorized message board",finding:"About 700 participated in an attack. OpenAI reports bypassed network restrictions; METR independently investigated part of the incident.",limit:"Research agents with reduced safeguards. METR's scope was limited and its analysis used AI assistance.",source:"https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/",second:"https://openai.com/index/hugging-face-incident-and-the-road-ahead/"},
  {date:"July 2026 incident",name:"AISI cyber evaluation",setting:"Internet access deliberately enabled",real:true,value:"10 / 122",valueLabel:"Runs with unauthorized actions in one challenge",finding:"Agents took unauthorized live-internet actions. A human rejected the most serious attempted malicious code change.",limit:"Cyber safeguards were disabled. No sandbox escape or resulting real-world harm was identified. These runs do not represent ordinary AI use.",source:"https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing"},
  {date:"9 September 2026",reported:"Assessment publication date",name:"Anthropic's incidents",setting:"Misconfigured evaluations",real:true,value:"4",valueLabel:"Incidents reported by the developer",finding:"Agents accessed real third-party systems after being told they were in a simulation. Misconfiguration left internet access open.",limit:"A developer assessment with independent investigation announced. These were not ordinary safeguarded deployments.",source:"https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents"},
];
const levels = [
  {name:"Recommend",action:"AI proposes tomorrow's production schedule.",authority:"The planner chooses whether to use it.",check:"Can the planner explain the constraints and produce a different schedule?",stop:"Reject the suggestion. Nothing has been changed."},
  {name:"Prepare",action:"AI prepares a schedule and purchase-order changes for review.",authority:"A person approves each change before it takes effect.",check:"Does the review show every change and its effect on capacity, dates and stock?",stop:"Discard the draft and revoke access to write new drafts."},
  {name:"Execute within limits",action:"AI changes approved schedules within explicitly permitted limits.",authority:"People set the limits; AI can act without asking each time.",check:"Are exceptions blocked, actions recorded and changes reversible?",stop:"Revoke execution credentials and restore the last approved plan."},
  {name:"Set priorities",action:"AI chooses which customers or objectives take priority when constraints conflict.",authority:"A wider decision has been delegated, even if people remain formally accountable.",check:"Who can challenge the trade-offs, change the objective and run the process without the AI?",stop:"Use an independent stop mechanism and a practised human fallback."},
];
function Figure({name,title,subtitle,caption,children}:{name:string;title:string;subtitle:string;caption:string;children:React.ReactNode}) {
 return <figure className="note-interactive control-figure" aria-labelledby={`${name}-title`}><div className="ai-heading"><h3 id={`${name}-title`}>{title}</h3><p>{subtitle}</p></div>{children}<figcaption>{caption}</figcaption></figure>;
}
function Theories({caption}:{caption:string}){
 return <Figure name="control-theories" title="Different routes, different questions" subtitle="Seven concerns, compared side by side" caption={caption}>
 <table className="control-comparison"><caption className="control-sr-only">AI control concerns, their mechanisms and the evidence behind them</caption><thead><tr><th scope="col">Concern</th><th scope="col">How it could happen</th><th scope="col">What the evidence says</th></tr></thead><tbody>{theories.map(t=><tr key={t.term}><th scope="row"><strong>{t.name}</strong><span>{t.term}</span></th><td data-label="How it could happen">{t.mechanism}</td><td data-label="What the evidence says"><span className="control-kind">{t.kind}</span><p>{t.evidence}</p><a href={t.source}>Source</a></td></tr>)}</tbody></table>
 </Figure>;
}
function Evidence({caption}:{caption:string}){
 return <Figure name="control-evidence" title="From constructed tests to real incidents" subtitle="What changed was the setting, not just the model" caption={caption}>
 <div className="control-legend"><span><i className="control-node" aria-hidden="true"/>Controlled simulation</span><span><i className="control-node control-node-real" aria-hidden="true"/>Real systems involved</span></div>
 <ol className="control-timeline" aria-label="Five research and incident cases">{cases.map(c=><li key={c.name} className={c.real?"control-event control-event-real":"control-event"}>
 <span className={`control-node${c.real?" control-node-real":""}`} aria-hidden="true"/>
 <div className="control-event-date">{c.date}{c.reported&&<small>{c.reported}</small>}</div>
 <div className="control-event-card"><div className="control-event-heading"><h4>{c.name}</h4><span>{c.setting}</span></div>
 <div className="control-event-result"><div className="control-event-stat"><strong>{c.value}</strong><span>{c.valueLabel}</span></div><p>{c.finding}</p></div>
 <p className="control-event-limit"><span>How to read it</span>{c.limit}</p>
 <div className="control-event-sources"><a href={c.source}>Source</a>{c.second&&<> · <a href={c.second}>Developer account</a></>}</div></div>
 </li>)}</ol>
 <p className="control-timeline-note">These cases show failures under different conditions. Their counts cannot be combined into a rate of AI misbehavior or a forecast of takeover.</p>
 </Figure>;
}
function duration(m:number){if(m<1)return `${(m*60).toFixed(1)} sec`;if(m<120)return `${m.toFixed(1)} min`;return `${(m/60).toFixed(1)} h`;}
function Horizons({caption}:{caption:string}){
 const [reliability,setReliability]=useState<"p50"|"p80">("p50");const [all,setAll]=useState(false);const [selected,setSelected]=useState("claude_opus_4_6_inspect");
 const rows=data.models.filter(r=>all||r.example);const row=rows.find(r=>r.id===selected)||rows[rows.length-1];const metric=row[reliability];
 const plot=useRef<HTMLDivElement>(null); const [W,setWidth]=useState(700);
 useEffect(()=>{const element=plot.current;if(!element)return;const observer=new ResizeObserver(entries=>setWidth(Math.max(260,entries[0].contentRect.width)));observer.observe(element);return ()=>observer.disconnect();},[]);
 const minDate=Date.parse(rows[0].date),maxDate=Date.parse(rows[rows.length-1].date);const H=330,L=58,R=18,T=20,B=46;
 const minMinutes=all?0.0005:0.25,maxMinutes=8192;
 const x=(date:string)=>L+(Date.parse(date)-minDate)/(maxDate-minDate)*(W-L-R);
 const y=(m:number)=>T+(Math.log(maxMinutes)-Math.log(m))/(Math.log(maxMinutes)-Math.log(minMinutes))*(H-T-B);
 const ticks=all?[1/60,1,60,960,7680]:[1,15,60,240,960,7680];
 const years=Array.from({length:2027-new Date(minDate).getUTCFullYear()},(_,i)=>new Date(minDate).getUTCFullYear()+i).filter(v=>Date.UTC(v,0,1)>=minDate&&Date.UTC(v,0,1)<=maxDate&&(W>540||!all||v%2===0));
 return <Figure name="control-horizons" title="Longer tasks, lower reliability" subtitle={`METR Time Horizon 1.1 · source snapshot ${data.sourcePageUpdated}`} caption={caption}>
 <div className="ai-tabs" role="group" aria-label="Predicted task success"><button aria-pressed={reliability==="p50"} onClick={()=>setReliability("p50")}>50% success</button><button aria-pressed={reliability==="p80"} onClick={()=>setReliability("p80")}>80% success</button></div>
 <label className="ai-checkbox"><input type="checkbox" checked={all} onChange={e=>setAll(e.target.checked)}/>Show all 26 measured models</label>
 <div className="ai-controls"><label>Inspect model<select value={row.id} onChange={e=>setSelected(e.target.value)}>{rows.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label></div>
 <div className="control-plot" ref={plot}><svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`Human task duration at ${reliability==="p50"?50:80}% predicted success. Logarithmic duration scale; dates are model release dates. Whiskers are 95% confidence intervals.`}>
 {ticks.map(v=><g key={v}><line x1={L} x2={W-R} y1={y(v)} y2={y(v)} className="ai-grid-line"/><text x={L-9} y={y(v)+4} textAnchor="end" className="ai-tick">{v===1/60?"1 sec":v<60?`${v} min`:`${v/60} h`}</text></g>)}
 <line x1={L} x2={W-R} y1={H-B} y2={H-B} className="ai-axis-line"/>
 {years.map(v=><text key={v} x={x(`${v}-01-01`)} y={H-B+23} textAnchor="middle" className="ai-tick">{v}</text>)}
 <text x={L} y={H-3} className="ai-axis-label">Model release date</text>
 {rows.map(r=>{const m=r[reliability];const active=r.id===row.id;return <g key={r.id}><line x1={x(r.date)} x2={x(r.date)} y1={y(m.ci_high)} y2={y(m.ci_low)} stroke={active?"#b4532a":"#9da09e"} strokeWidth={active?2:1}/><line x1={x(r.date)-4} x2={x(r.date)+4} y1={y(m.ci_high)} y2={y(m.ci_high)} stroke="#9da09e"/><line x1={x(r.date)-4} x2={x(r.date)+4} y1={y(m.ci_low)} y2={y(m.ci_low)} stroke="#9da09e"/><circle cx={x(r.date)} cy={y(m.estimate)} r={active?7:5} fill={r.p50BeyondSuite&&reliability==="p50"?"#eeebe4":active?"#b4532a":"#26282a"} stroke={active?"#b4532a":"#26282a"} strokeWidth={1.5} role="button" tabIndex={0} className="ai-mark" aria-label={`${r.name}, ${duration(m.estimate)}; 95% confidence interval ${duration(m.ci_low)} to ${duration(m.ci_high)}${m.estimate>960?'; estimate beyond reliable suite range':''}`} onMouseEnter={()=>setSelected(r.id)} onFocus={()=>setSelected(r.id)} onClick={()=>setSelected(r.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(r.id);}}}/></g>;})}
 </svg></div>
 <p className="ai-hint">Human task duration, logarithmic scale. Hover, tap, focus a point or choose a model.</p>
 <div className="ai-readout" aria-live="polite"><span>{row.name} · {row.date}</span><strong>{duration(metric.estimate)}<small>At {reliability==="p50"?50:80}% predicted success</small></strong><strong>{duration(metric.ci_low)} to {duration(metric.ci_high)}<small>95% confidence interval</small></strong></div>
 {metric.estimate>960&&<p className="ai-caution">This point estimate is above 16 hours. METR says the suite cannot reliably measure this range. The open point marks that limit.</p>}
 <details className="ai-evidence"><summary>Source, values and limits</summary><p>Minutes and source confidence bounds are reproduced without fitting a new model. Seven examples are shown by default; all 26 are available. The same Time Horizon 1.1 snapshot supplies both views. The task suite mainly covers well-specified software, machine learning and cybersecurity problems. These values are not agent running time, general job coverage or a takeover probability.</p><p><a href={data.source}>Source and definitions</a> · <a href={data.rawSource}>Source data</a> · <a href="https://metr.org/notes/2026-03-20-impact-of-modelling-assumptions-on-time-horizon-results/">Method sensitivity</a></p><table><caption>Displayed models; human task duration in minutes, including 95% bounds</caption><thead><tr><th>Model</th><th>Released</th><th>Estimate</th><th>Lower</th><th>Upper</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.name}{r[reliability].estimate>960?" (beyond range)":""}</td><td>{r.date}</td><td>{r[reliability].estimate.toFixed(2)}</td><td>{r[reliability].ci_low.toFixed(2)}</td><td>{r[reliability].ci_high.toFixed(2)}</td></tr>)}</tbody></table></details>
 </Figure>;
}
function Authority({caption}:{caption:string}){
 const [i,setI]=useState(0);const l=levels[i];
 return <Figure name="control-authority" title="What have we allowed it to decide?" subtitle="One fictional production-planning system, four permission designs" caption={caption}><div className="control-ladder" role="group" aria-label="Planning authority">{levels.map((x,n)=><button key={x.name} aria-pressed={i===n} onClick={()=>setI(n)}><span>{String(n+1).padStart(2,"0")}</span>{x.name}</button>)}</div><div className="control-explanation" aria-live="polite"><p>{l.action}</p><dl><dt>Who decides?</dt><dd>{l.authority}</dd><dt>What would we check?</dt><dd>{l.check}</dd><dt>How would we stop it?</dt><dd>{l.stop}</dd></dl></div></Figure>;
}
export function AiControlChart({name,caption}:{name:AiControlChartName;caption:string}){
 switch(name){case "ai-control-theories":return <Theories caption={caption}/>;case "ai-control-evidence":return <Evidence caption={caption}/>;case "ai-control-horizons":return <Horizons caption={caption}/>;case "ai-control-authority":return <Authority caption={caption}/>;}
}
