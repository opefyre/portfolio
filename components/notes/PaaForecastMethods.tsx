"use client";
import {useId,useState} from "react";
import {actual,training,methods,forecast,score,type ForecastMethod} from "./paa-forecast-model";
import "./PaaForecastMethods.css";
const number=(n:number,d=1)=>n.toFixed(d);
export function PaaForecastMethods({caption}:{caption:string}) {
 const [method,setMethod]=useState<ForecastMethod>("Same quarter last year"),[horizon,setHorizon]=useState(4),[point,setPoint]=useState(0);
 const id=useId(), values=forecast(method),result=score(method,horizon),all=[...training,...actual];
 const x=(i:number)=>60+i*60,y=(v:number)=>270-v/250*220;
 const observed=all.map((v,i)=>`${x(i)},${y(v)}`).join(" ");
 const predicted=[`${x(7)},${y(training[7])}`,...values.map((v,i)=>`${x(i+8)},${y(v)}`)].join(" ");
 return <figure className="paa-forecast" aria-label="Quarterly demand forecasting comparison">
  <header><p className="paa-kicker">One forecast date / Four later quarters</p><h3>How did each forecast perform?</h3><p>All forecasts were made after quarter 8. Compare them with the next four quarters without refitting the models.</p></header>
  <div className="paa-methods" role="group" aria-label="Forecast method">{methods.map(m=><button key={m} type="button" aria-pressed={method===m} onClick={()=>setMethod(m)}>{m}</button>)}</div>
  <label className="paa-horizon" htmlFor={id+"-horizon"}>Score the first <select id={id+"-horizon"} value={horizon} onChange={e=>setHorizon(Number(e.target.value))}>{[1,2,3,4].map(n=><option value={n} key={n}>{n} {n===1?"quarter":"quarters"}</option>)}</select> after quarter 8</label>
  <div className="paa-metrics" aria-live="polite"><p><span>WAPE</span><strong>{number(result.wape)}%</strong></p><p><span>Signed bias</span><strong>{result.bias>0?"+":""}{number(result.bias)}%</strong></p><p><span>Mean absolute error</span><strong>{number(result.mae)} units</strong></p></div>
  <p className="paa-small">{method}. Actual demand in the comparison: {result.total} units across the first {horizon} test {horizon===1?"quarter":"quarters"}. Positive bias means overforecasting.</p>
  <div className="paa-chart-scroll" role="region" tabIndex={0} aria-label="Quarterly demand chart, horizontally scrollable"><svg viewBox="0 0 760 340" role="img" aria-labelledby={id+"-chart-title"}>
   <title id={id+"-chart-title"}>{`Quarterly demand and ${method} forecasts, in units`}</title><desc>Black is observed demand. Rust is the selected forecast, issued after quarter 8. Shading identifies quarters 9 to 12. Exact values are in the table.</desc>
   <rect x="510" y="40" width="230" height="230" fill="#e1d9cc" opacity=".5"/>
   {[0,50,100,150,200,250].map(v=><g key={v}><line x1="60" x2="740" y1={y(v)} y2={y(v)} stroke="#cbc7bf"/><text x="49" y={y(v)+5} textAnchor="end">{v}</text></g>)}
   <text x="60" y="23">Units per quarter</text><text x="170" y="330">Training: Q1 to Q8</text><text x="533" y="330">Test: Q9 to Q12</text>
   {all.map((_,i)=><text key={i} x={x(i)} y="296" textAnchor="middle">{i+1}</text>)}
   <line x1="510" x2="510" y1="40" y2="270" stroke="#77716a" strokeDasharray="4 4"/>
   <polyline points={observed} fill="none" stroke="#101213" strokeWidth="2.5"/>
   <polyline points={predicted} fill="none" stroke="#b4532a" strokeWidth="3" strokeDasharray="8 5"/>
   {values.map((v,i)=><circle key={i} cx={x(i+8)} cy={y(v)} r={point===i?7:5} fill="#b4532a" stroke="#ecebe6" strokeWidth="2" tabIndex={0} role="button" aria-label={`Inspect quarter ${i+9}: actual ${actual[i]}, forecast ${number(v)} units`} onMouseEnter={()=>setPoint(i)} onFocus={()=>setPoint(i)} onClick={()=>setPoint(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setPoint(i)}}}/>)}
  </svg></div>
  <p className="paa-small">Black: observed demand. Dashed rust: forecast. Horizontal axis: quarter number. Hover or focus a forecast point, or use the buttons below.</p>
  <div className="paa-quarter-buttons" role="group" aria-label="Inspect a test quarter">{actual.map((_,i)=><button key={i} type="button" aria-pressed={point===i} onClick={()=>setPoint(i)}>Q{i+9}</button>)}</div>
  <p className="paa-inspector" aria-live="polite"><strong>Quarter {point+9}</strong>: actual {actual[point]} units, {method.toLowerCase()} forecast {number(values[point])}. Signed error: {values[point]-actual[point]>0?"+":""}{number(values[point]-actual[point])} units.</p>
  <div className="paa-table-scroll" role="region" tabIndex={0} aria-label="All forecasts and test observations"><table><caption>All four forecasts remain visible. Metrics include only the first {horizon} {horizon===1?"row":"rows"}.</caption><thead><tr><th>Quarter</th><th>Actual</th>{methods.map(m=><th key={m}>{m}</th>)}<th>Scored?</th></tr></thead><tbody>{actual.map((v,i)=><tr key={i}><th scope="row">Q{i+9}</th><td>{v}</td>{methods.map(m=><td key={m}>{number(forecast(m)[i])}</td>)}<td>{i<horizon?"Yes":"No"}</td></tr>)}</tbody></table></div>
  <details className="paa-method-detail"><summary>Training values and calculation method</summary><p>Q1 to Q8: {training.join(", ")} units. Last quarter repeats 180. Seasonal naive repeats Q5 to Q8. Drift adds h × (180 − 80) ÷ 7 to 180, where h is the forecast horizon. All four values are issued together.</p><p>WAPE sums absolute errors over the selected quarters and divides by the actual total. Bias uses signed errors, forecast minus actual. MAE is absolute error divided by the number of selected quarters. Calculations use unrounded forecasts.</p><p>These four test quarters illustrate the calculation. A real method choice needs more forecast dates and checks of uncertainty.</p></details>
  <figcaption>{caption}</figcaption>
 </figure>;
}
