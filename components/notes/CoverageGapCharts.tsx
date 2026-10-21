"use client";
import {useMemo,useState} from 'react';
import {jobTimes,meanInterval,riskLabels,scheduleSample,shareByDeadline,type RiskMode} from './coverage-gap-models';
import './CoverageGapCharts.css';

const f=(n:number,d=2)=>n.toFixed(d);
function ConfidenceChart() {
 const[n,setN]=useState(10),m=meanInterval(n);
 const x=(v:number)=>45+(v-7)*56;
 return <>
  <p className="gap-kicker">Fictional task times / minutes</p>
  <h3>See the observations behind the average</h3>
  <div className="gap-options" role="group" aria-label="Sample size">
   {[5,10,20].map(v=><button key={v} aria-pressed={n===v} onClick={()=>setN(v)}>{v} jobs</button>)}
  </div>
  <div className="gap-readout" aria-live="polite"><strong>Mean {f(m.mean)} min</strong><span>95% interval: {f(m.low)} to {f(m.high)} min</span></div>
  <div className="gap-plot" tabIndex={0} role="region" aria-label="Job times and confidence interval">
   <svg viewBox="0 0 430 310" role="img" aria-label={`${n} observations. Mean ${f(m.mean)} minutes; 95% confidence interval ${f(m.low)} to ${f(m.high)} minutes.`}>
    {[7,8,9,10,11,12,13].map(v=><g key={v}><line x1={x(v)} x2={x(v)} y1="65" y2="259" stroke="#bab8af" strokeWidth="1"/><text x={x(v)} y="285" textAnchor="middle">{v}</text></g>)}
    <text x="20" y="28">Individual job times</text>
    {m.values.map((v,i)=>{const seen=m.values.slice(0,i).filter(a=>a===v).length;return <circle key={i} cx={x(v)} cy={154-seen*15} r="5" fill="#496778"><title>{`Job ${i+1}: ${v} minutes`}</title></circle>})}
    <text x="20" y="195">Mean and 95% interval</text>
    <line x1={x(m.low)} x2={x(m.high)} y1="224" y2="224" stroke="#a35736" strokeWidth="4"/>
    {[m.low,m.high].map(v=><line key={v} x1={x(v)} x2={x(v)} y1="214" y2="234" stroke="#a35736" strokeWidth="2"/>)}
    <circle cx={x(m.mean)} cy="224" r="7" fill="#24282b"/>
   </svg>
  </div>
  <p className="gap-note">Blue dots are individual jobs; the copper line is uncertainty around the mean. They describe different kinds of spread.</p>
  <details><summary>Inspect the data and calculation</summary>
   <p>Fixed teaching dataset, in observation order: {jobTimes.join(', ')} minutes. Each choice uses the first n separate observations. Do not duplicate readings to increase a real sample size.</p>
   <table><caption>Calculation for the selected {n} jobs</caption><thead><tr><th>Quantity</th><th>Value</th></tr></thead><tbody>
    <tr><th scope="row">Selected observations</th><td>{m.values.join(', ')} min</td></tr>
    <tr><th scope="row">Sample standard deviation</th><td>{f(m.sd,4)} min</td></tr>
    <tr><th scope="row">Standard error</th><td>{f(m.se,4)} min</td></tr>
    <tr><th scope="row">Margin at 95%</th><td>{f(m.margin,4)} min</td></tr>
    <tr><th scope="row">Lower and upper limits</th><td>{f(m.low,4)} and {f(m.high,4)} min</td></tr>
   </tbody></table>
   <p>Two-sided t interval with n − 1 degrees of freedom. Assumes independent, representative observations and a suitable population shape for this small-sample method. It does not estimate the effect of an intervention.</p>
   <p><a href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm">NIST: confidence limits for the mean</a></p>
  </details>
 </>;
}
function ScheduleChart() {
 const[mode,setMode]=useState<RiskMode>('none'),[deadline,setDeadline]=useState(42);
 const models=useMemo(()=>Object.fromEntries((['none','shared','separate'] as RiskMode[]).map(k=>[k,scheduleSample(k)])) as Record<RiskMode,ReturnType<typeof scheduleSample>>,[]);
 const m=models[mode],share=shareByDeadline(m.finishes,deadline);
 const x=(v:number)=>55+(v-32)/26*380,y=(p:number)=>278-p*210;
 const curve=Array.from({length:105},(_,i)=>32+i*.25).map(t=>`${x(t)},${y(shareByDeadline(m.finishes,t))}`).join(' ');
 return <>
  <p className="gap-kicker">Fictional network / 20,000 runs / working days</p><h3>Move the deadline, then test the risk assumption</h3>
  <div className="gap-options" role="group" aria-label="Risk scenario">{(['none','shared','separate'] as RiskMode[]).map(k=><button key={k} aria-pressed={mode===k} onClick={()=>setMode(k)}>{riskLabels[k]}</button>)}</div>
  <label className="gap-slider">Deadline <output htmlFor="gap-deadline">day {deadline}</output><input id="gap-deadline" type="range" min="32" max="58" step="1" value={deadline} onChange={e=>setDeadline(Number(e.target.value))}/></label>
  <div className="gap-readout" aria-live="polite"><strong>{f(share*100,1)}% of runs finish by day {deadline}</strong><span>P50: day {f(m.p50,1)}. P80: day {f(m.p80,1)}.</span></div>
  <div className="gap-plot" tabIndex={0} role="region" aria-label="Cumulative completion curve"><svg viewBox="0 0 480 340" role="img" aria-label={`${riskLabels[mode]}: ${f(share*100,1)} percent of simulated projects finish by working day ${deadline}.`}>
   {[0,.25,.5,.75,1].map(p=><g key={p}><line x1="55" x2="435" y1={y(p)} y2={y(p)} stroke="#bab8af"/><text x="45" y={y(p)+5} textAnchor="end">{p*100}%</text></g>)}
   {[32,36,40,44,48,52,56,58].map(t=><text key={t} x={x(t)} y="305" textAnchor="middle">{t}</text>)}
   <text x="15" y="27">Cumulative share of simulated finishes</text><text x="245" y="333" textAnchor="middle">Working days since project start</text>
   <polyline points={curve} fill="none" stroke="#496778" strokeWidth="3"/>
   <line x1={x(deadline)} x2={x(deadline)} y1="62" y2="278" stroke="#a35736" strokeDasharray="5 4"/><circle cx={x(deadline)} cy={y(share)} r="6" fill="#a35736"><title>{`Day ${deadline}: ${f(share*100,1)}%`}</title></circle>
  </svg></div>
  <p className="gap-note">{mode==='none'?'C and D vary independently. The other six base durations stay fixed.':mode==='shared'?'A single assumed 20% event adds four days to both B and D in the same run.':'B and D each have a separate assumed 20% event adding four days. The event draws are independent.'} Configuration C controls the merge with D in {f(m.configurationCritical*100,1)}% of runs.</p>
  <details><summary>Compare all scenarios and inspect the method</summary>
   <table><caption>Same base draws and 20,000 runs in every scenario</caption><thead><tr><th>Scenario</th><th>P50 day</th><th>P80 day</th><th>By day {deadline}</th><th>Both delays</th></tr></thead><tbody>{(['none','shared','separate'] as RiskMode[]).map(k=>{const r=models[k];return <tr key={k}><th scope="row">{riskLabels[k]}</th><td>{f(r.p50,2)}</td><td>{f(r.p80,2)}</td><td>{f(shareByDeadline(r.finishes,deadline)*100,1)}%</td><td>{f(r.bothEvents*100,1)}%</td></tr>})}</tbody></table>
   <p>Fixed seed 20261021, Mulberry32 random generator, inverse-CDF triangular draws. C uses (6, 8, 16); D uses (9, 12, 21). A/B/E/F/G/H base durations are 5/10/6/5/4/3. Dependencies match the article table. C and D remain independently sampled in all scenarios; the toggle changes only the additional events on B and D. Percentiles use linear interpolation between sorted runs.</p>
   <p>The model recalculates every activity&apos;s finish on each run. It assumes unlimited resources, continuous working-day durations, no calendar exceptions and no other risks. These are conditional teaching results, not observed delivery probabilities.</p>
   <table><caption>Selected curve as an accessible data table</caption><thead><tr><th>Deadline day</th><th>Simulated share completed</th></tr></thead><tbody>{Array.from({length:14},(_,i)=>32+i*2).map(t=><tr key={t}><th scope="row">{t}</th><td>{f(shareByDeadline(m.finishes,t)*100,1)}%</td></tr>)}</tbody></table>
   <p><a href="https://www.gao.gov/assets/gao-16-89g.pdf">GAO Schedule Assessment Guide, Best Practice 8</a></p>
  </details>
 </>;
}
export function CoverageGapChart({name,caption}:{name:'gap-confidence'|'gap-schedule';caption:string}) {
 return <figure className="gap-chart">{name==='gap-confidence'?<ConfidenceChart/>:<ScheduleChart/>}<figcaption>{caption}</figcaption></figure>;
}
