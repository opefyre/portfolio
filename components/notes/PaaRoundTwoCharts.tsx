"use client";
import {useId,useState} from 'react';
import {capacityMix,landedAllocation,type FreightBasis} from './paa-round-two-models';
import './PaaRoundTwoCharts.css';
export type PaaRoundTwoName='paa2-capacity-mix'|'paa2-landed-allocation';
const f=(n:number)=>Number(n.toFixed(2)).toLocaleString('en-GB');
const eur=(n:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
function Capacity({caption}:{caption:string}){
 const id=useId(),[b,setB]=useState(100),m=capacityMix(b),x=(h:number)=>40+h/45*640;
 return <figure className="paa-two" aria-labelledby={id+'-title'}>
  <header><p className="paa-two-kicker">One week / 300 planned good units</p><h3 id={id+'-title'}>How much bench time does this mix need?</h3></header>
  <div className="paa-two-controls"><label htmlFor={id+'-mix'}>Product B: <strong>{b} units</strong></label><input id={id+'-mix'} type="range" min="0" max="150" step="10" value={b} onChange={e=>setB(Number(e.target.value))}/><p>Product A supplies the remaining {m.productA} units.</p></div>
  <div className="paa-two-scroll"><svg viewBox="0 0 740 260" role="img" aria-labelledby={id+'-svg-title'}><title id={id+'-svg-title'}>{`${f(m.required)} required hours against 32 available. ${f(m.hoursA)} hours for A and ${f(m.hoursB)} for B.`}</title>
   {[0,10,20,30,40,45].map(h=><g key={h}><line x1={x(h)} x2={x(h)} y1="52" y2="210" stroke="#d2cec5"/><text x={x(h)} y="238" textAnchor="middle">{h}</text></g>)}
   <text x="40" y="30">Bench hours required</text><rect x="40" y="65" width={m.hoursA/45*640} height="46" fill="#252a2d"/><rect x={x(m.hoursA)} y="65" width={m.hoursB/45*640} height="46" fill="#b4532a"/>
   <text x="40" y="151">Available after maintenance</text><rect x="40" y="167" width={32/45*640} height="30" fill="#bab7ae"/>
   <line x1={x(32)} x2={x(32)} y1="45" y2="208" stroke="#101213" strokeWidth="2" strokeDasharray="5 4"/><text x={x(32)+6} y="128">32 h</text><text x="680" y="258" textAnchor="end">Hours per week</text>
  </svg></div>
  <p className="paa-two-key"><span className="paa-two-key-a">A: {f(m.hoursA)} h</span><span className="paa-two-key-b">B: {f(m.hoursB)} h</span></p>
  <output className="paa-two-result" aria-live="polite"><strong>{f(m.required)} required hours</strong><span>{m.gap>0?`${f(m.gap)} ${m.gap===1?'hour':'hours'} above availability`:`${f(m.spare)} ${m.spare===1?'hour':'hours'} left in this simple check`}. Load: {f(m.load)}%.</span></output>
  <div className="paa-two-scroll"><table><caption>Current mix and resource calculation</caption><thead><tr><th scope="col">Product</th><th scope="col">Units</th><th scope="col">Hours/unit</th><th scope="col">Required hours</th></tr></thead><tbody><tr><th scope="row">A</th><td>{m.productA}</td><td>0.10</td><td>{f(m.hoursA)}</td></tr><tr><th scope="row">B</th><td>{m.productB}</td><td>0.20</td><td>{f(m.hoursB)}</td></tr><tr><th scope="row">Total</th><td>300</td><td>Different products</td><td>{f(m.required)}</td></tr></tbody></table></div>
  <figcaption>{caption}</figcaption>
 </figure>;
}
function Landed({caption}:{caption:string}){
 const id=useId(),[basis,setBasis]=useState<FreightBasis>('weight'),m=landedAllocation(basis);
 return <figure className="paa-two" aria-labelledby={id+'-title'}><header><p className="paa-two-kicker">One €500 freight bill</p><h3 id={id+'-title'}>Change the split, keep the same bill</h3></header>
 <div className="paa-two-controls"><label htmlFor={id+'-basis'}>Freight allocation basis</label><select id={id+'-basis'} value={basis} onChange={e=>setBasis(e.target.value as FreightBasis)}><option value="weight">Actual weight: A 200 kg, B 50 kg</option><option value="value">Product value: A €2,000, B €2,000</option></select></div>
 <div className="paa-two-scroll"><svg viewBox="0 0 740 180" role="img" aria-labelledby={id+'-svg-title'}><title id={id+'-svg-title'}>{`Freight split: A ${eur(m.freightA)}, B ${eur(m.freightB)}. Total 500 euros in both allocation methods.`}</title><rect x="30" y="45" width={m.freightA/500*680} height="55" fill="#252a2d"/><rect x={30+m.freightA/500*680} y="45" width={m.freightB/500*680} height="55" fill="#b4532a"/><text x="30" y="25">Share of the same freight bill</text><text x="30" y="134">A: {eur(m.freightA)}</text><text x="710" y="134" textAnchor="end">B: {eur(m.freightB)}</text><text x="710" y="170" textAnchor="end">Whole bill: €500.00</text></svg></div>
 <output className="paa-two-result" aria-live="polite"><strong>Shipment landed cost: {eur(m.total)}</strong><span>A: {eur(m.unitA)} per unit. B: {eur(m.unitB)} per unit.</span></output>
 <div className="paa-two-scroll"><table><caption>Cost allocations with {basis==='weight'?'weight-based':'value-based'} freight</caption><thead><tr><th scope="col">Cost</th><th scope="col">A: 100 units</th><th scope="col">B: 50 units</th><th scope="col">Total</th></tr></thead><tbody>
 <tr><th scope="row">Products</th><td>€2,000.00</td><td>€2,000.00</td><td>€4,000.00</td></tr><tr><th scope="row">Freight</th><td>{eur(m.freightA)}</td><td>{eur(m.freightB)}</td><td>€500.00</td></tr><tr><th scope="row">Insurance</th><td>€50.00</td><td>€50.00</td><td>€100.00</td></tr><tr><th scope="row">Assumed duty</th><td>€80.00</td><td>€80.00</td><td>€160.00</td></tr><tr><th scope="row">Brokerage</th><td>€20.00</td><td>€20.00</td><td>€40.00</td></tr><tr><th scope="row">Landed total</th><td>{eur(m.a)}</td><td>{eur(m.b)}</td><td>{eur(m.total)}</td></tr><tr><th scope="row">Per unit</th><td>{eur(m.unitA)}</td><td>{eur(m.unitB)}</td><td>Different products</td></tr></tbody></table></div><figcaption>{caption}</figcaption></figure>;
}
export function PaaRoundTwoChart({name,caption}:{name:PaaRoundTwoName;caption:string}){return name==='paa2-capacity-mix'?<Capacity caption={caption}/>:<Landed caption={caption}/>;}
