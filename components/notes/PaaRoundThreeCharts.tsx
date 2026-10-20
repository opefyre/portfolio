"use client";
import {useId, useState} from 'react';
import {customerCost, throughputMix, type Mix} from './paa-round-three-models';
import './PaaRoundThreeCharts.css';
export type PaaRoundThreeName = 'paa3-customer-cost' | 'paa3-throughput-mix';
const eur = (n:number) => new Intl.NumberFormat('en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);

function Customer({caption}:{caption:string}) {
  const id=useId(),[orders,setOrders]=useState(20),m=customerCost(orders);
  return <figure className="paa-three" aria-labelledby={id+'-title'}>
    <header><p className="paa-three-kicker">Same 1,000 units / same €10,000 revenue</p><h3 id={id+'-title'}>What does changing order frequency change?</h3></header>
    <label htmlFor={id+'-orders'}>Customer B orders this month: <strong>{orders}</strong></label>
    <input id={id+'-orders'} type="range" min="1" max="20" step="1" value={orders} onChange={e=>setOrders(Number(e.target.value))}/>
    <p className="paa-three-note">One dispatch per order. Special packing and return handling stay at €260. Customer A stays at one order and €47 service cost.</p>
    <div className="paa-three-scroll"><svg viewBox="0 0 740 250" role="img" aria-labelledby={id+'-plot'}><title id={id+'-plot'}>{`Service cost: A 47 euros, B ${m.service} euros. Same zero-to-1200 euro scale.`}</title>
      <text x="28" y="28">Monthly service cost, excluding product cost</text>
      {[0,300,600,900,1200].map(v=><g key={v}><line x1={90+v/1200*590} x2={90+v/1200*590} y1="52" y2="180" stroke="#cec9bd"/><text x={90+v/1200*590} y="211" textAnchor="middle">{v}</text></g>)}
      <text x="28" y="89">A</text><rect x="90" y="65" width={47/1200*590} height="34" fill="#252a2d"/><text x="130" y="89">€47</text>
      <text x="28" y="153">B</text><rect x="90" y="129" width={m.service/1200*590} height="34" fill="#a94f35"/>
      <text x="680" y="229" textAnchor="end">Euros per month</text>
    </svg></div>
    <output className="paa-three-result" aria-live="polite"><strong>B service cost: {eur(m.service)}</strong><span>{eur(m.result)} remains after product and listed service costs. Assigned cost is {eur(m.reduction)} below the twenty-order case.</span></output>
    <div className="paa-three-scroll"><table><caption>Monthly comparison at the selected order frequency</caption><thead><tr><th scope="col">Item</th><th scope="col">A: 1 order</th><th scope="col">B: {orders} {orders===1?'order':'orders'}</th></tr></thead><tbody>
      <tr><th scope="row">Revenue</th><td>€10,000</td><td>€10,000</td></tr><tr><th scope="row">Landed product cost</th><td>€7,000</td><td>€7,000</td></tr>
      <tr><th scope="row">Handling at €12/order</th><td>€12</td><td>{eur(m.handling)}</td></tr><tr><th scope="row">Delivery at €35/dispatch</th><td>€35</td><td>{eur(m.delivery)}</td></tr>
      <tr><th scope="row">Special packing and returns</th><td>€0</td><td>€260</td></tr><tr><th scope="row">Listed service cost</th><td>€47</td><td>{eur(m.service)}</td></tr>
      <tr><th scope="row">Result after these costs</th><td>€2,953</td><td>{eur(m.result)}</td></tr>
    </tbody></table></div><figcaption>{caption}</figcaption>
  </figure>;
}
function Throughput({caption}:{caption:string}) {
  const id=useId(),[demand,setDemand]=useState(30),m=throughputMix(demand);
  const rows:[string,Mix][]=[['A first',m.aFirst],['B first',m.bFirst],['Best feasible whole-unit mix',m.best]];
  return <figure className="paa-three" aria-labelledby={id+'-title'}>
    <header><p className="paa-three-kicker">600 available minutes / A demand capped at 20</p><h3 id={id+'-title'}>How much B can actually be sold?</h3></header>
    <label htmlFor={id+'-demand'}>B demand cap this week: <strong>{demand} {demand===1?"unit":"units"}</strong></label>
    <input id={id+'-demand'} type="range" min="0" max="30" step="1" value={demand} onChange={e=>setDemand(Number(e.target.value))}/>
    <div className="paa-three-scroll"><svg viewBox="0 0 740 230" role="img" aria-labelledby={id+'-plot'}><title id={id+'-plot'}>{`Best whole-unit mix uses ${m.best.a} A and ${m.best.b} B: ${m.best.minutes} minutes and ${m.best.throughput} euros throughput.`}</title>
      <text x="28" y="28">Bench time in the best feasible mix</text>
      {[0,150,300,450,600].map(v=><g key={v}><line x1={28+v/600*680} x2={28+v/600*680} y1="52" y2="109" stroke="#cec9bd"/><text x={28+v/600*680} y="139" textAnchor="middle">{v}</text></g>)}
      <rect x="28" y="62" width={m.best.a*30/600*680} height="38" fill="#252a2d"/><rect x={28+m.best.a*30/600*680} y="62" width={m.best.b*10/600*680} height="38" fill="#a94f35"/>
      <text x="28" y="177">A: {m.best.a*30} min</text><text x="280" y="177">B: {m.best.b*10} min</text><text x="708" y="177" textAnchor="end">Unused: {600-m.best.minutes} min</text><text x="708" y="207" textAnchor="end">Available bench minutes per week</text>
    </svg></div>
    <output className="paa-three-result" aria-live="polite"><strong>{eur(m.best.throughput)} weekly throughput</strong><span>{eur(m.best.afterExpense)} after the assumed €1,000 operating expense. This is the highest result among this example&apos;s feasible whole-unit combinations.</span></output>
    <p className="paa-three-note">{m.bFirst.throughput<m.best.throughput?'B-first leaves time that cannot make another whole A. The full mix comparison gives a higher result.':'B-first matches the best result at this demand cap. Whole-unit constraints can change that; try a B cap of 1.'}</p>
    <div className="paa-three-scroll"><table><caption>Feasible mixes with the same resource, prices and expenses</caption><thead><tr><th scope="col">Choice</th><th scope="col">A units</th><th scope="col">B units</th><th scope="col">Minutes</th><th scope="col">Throughput</th><th scope="col">After €1,000 expense</th></tr></thead><tbody>{rows.map(([label,r])=><tr key={label}><th scope="row">{label}</th><td>{r.a}</td><td>{r.b}</td><td>{r.minutes}</td><td>{eur(r.throughput)}</td><td>{eur(r.afterExpense)}</td></tr>)}</tbody></table></div>
    <figcaption>{caption}</figcaption>
  </figure>;
}
export function PaaRoundThreeChart({name,caption}:{name:PaaRoundThreeName;caption:string}) {return name==='paa3-customer-cost'?<Customer caption={caption}/>:<Throughput caption={caption}/>;}
