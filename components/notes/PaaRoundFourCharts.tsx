'use client';
import {useId,useState} from 'react';
import {fisherComparison} from './paa-round-four-models';
import './PaaRoundFourCharts.css';
const defaults=['10','30','4','30'];
export function PaaRoundFourChart({caption}:{caption:string}){
 const id=useId(),[values,setValues]=useState(defaults);
 let result:ReturnType<typeof fisherComparison>|undefined,error='';
 try{if(values.some(v=>v.trim()===''))throw Error('Enter all four counts. A blank value is unknown.');result=fisherComparison(...values.map(Number) as [number,number,number,number]);}catch(e){error=e instanceof Error?e.message:'Check the counts.';}
 const field=(label:string,index:number)=> <label key={label} htmlFor={id+'-'+index}>{label}<input id={id+'-'+index} type="number" inputMode="numeric" min={index%2?1:0} max="500" step="1" value={values[index]} aria-describedby={id+'-help'} onChange={e=>setValues(old=>old.map((v,i)=>i===index?e.target.value:v))}/></label>;
 const p=result?(result.p<.0001?'<0.0001':result.p.toFixed(4)):'';
 const d=result?100*result.difference:0;
 return <figure className="r4-chart" aria-labelledby={id+'-title'}>
  <p className="r4-kicker">Two independent groups / late and on-time counts</p><h3 id={id+'-title'}>Inspect the difference behind the p-value</h3>
  <p id={id+'-help'} className="r4-help">Use 1 to 500 observations per group and a late count no greater than its total. These controls change teaching inputs.</p>
  <div className="r4-fields">{field('Baseline late quotes',0)}{field('Baseline total quotes',1)}{field('Pilot late quotes',2)}{field('Pilot total quotes',3)}</div>
  <button type="button" onClick={()=>setValues([...defaults])}>Reset to the article</button>
  <div aria-live="polite" className="r4-result">{error?<p role="status">{error}</p>:result&&<><strong>Two-sided p = {p}</strong><span>Baseline minus pilot: {d>0?'+':''}{d.toFixed(1)} percentage points</span><span>{result.p<.05?'Rejects the null at the illustrative 0.05 level.':'Does not reject the null at the illustrative 0.05 level.'} This does not establish causation.</span></>}</div>
  {result&&<><svg viewBox="0 0 700 220" role="img" aria-label={`Late rates: baseline ${(result.beforeRate*100).toFixed(1)} percent and pilot ${(result.afterRate*100).toFixed(1)} percent. Two-sided p ${p}.`}>
   <text x="20" y="26">Late quotes as a share of each group</text>
   {[{label:'Baseline',rate:result.beforeRate,late:values[0],n:values[1],fill:'#4e6879'},{label:'Pilot',rate:result.afterRate,late:values[2],n:values[3],fill:'#a94f35'}].map((r,i)=><g key={r.label} tabIndex={0} aria-label={`${r.label}: ${r.late} late out of ${r.n}, ${(r.rate*100).toFixed(1)} percent.`}>
    <title>{`${r.label}: ${r.late} late / ${r.n} total`}</title><text x="20" y={76+i*60}>{r.label}</text><rect x="128" y={56+i*60} width="480" height="28" fill="#d7d3ca"/><rect x="128" y={56+i*60} width={480*r.rate} height="28" fill={r.fill}/><text x="622" y={76+i*60}>{(r.rate*100).toFixed(1)}%</text>
   </g>)}
   {[0,25,50,75,100].map(v=><text key={v} x={128+4.8*v} y="190" textAnchor="middle">{v}%</text>)}
  </svg><div className="r4-table-wrap"><table><caption>Current count table used by the test</caption><thead><tr><th scope="col">Outcome</th><th scope="col">Baseline</th><th scope="col">Pilot</th></tr></thead><tbody><tr><th scope="row">Late</th><td>{values[0]}</td><td>{values[2]}</td></tr><tr><th scope="row">On time</th><td>{result.beforeOnTime}</td><td>{result.afterOnTime}</td></tr><tr><th scope="row">Total</th><td>{values[1]}</td><td>{values[3]}</td></tr></tbody></table></div></>}
  <details><summary>Calculation and assumptions</summary><p>Two-sided Fisher exact test with fixed margins. The calculation sums probabilities of feasible tables no more probable than the observed table. It uses logarithms for numerical stability. Independent observations, comparable cases and a suitable design remain requirements.</p><p>A small p-value does not remove changes in staffing, workload or request mix. The original comparison is before and after, with no randomised control.</p><p><a href="https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fisher.test.html">R manual: Fisher exact test and two-sided convention</a></p></details><figcaption>{caption}</figcaption>
 </figure>;
}
