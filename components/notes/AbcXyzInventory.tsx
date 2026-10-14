"use client";

import { useId, useState } from "react";
import { classify, DEFAULT_RULE, MONTHS, STOCK, type Abc, type Xyz } from "./abc-xyz-model";
import "./AbcXyzInventory.css";

const num = (n: number, digits = 0) => n.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const singularUnits: Record<string, string> = { rolls: "roll", cartons: "carton", litres: "litre", boxes: "box", batteries: "battery", fuses: "fuse" };
const quantity = (n: number, unit: string) => `${num(n)} ${n === 1 ? (singularUnits[unit] ?? unit) : unit}`;
const money = (n: number) => `€${num(n)}`;
const pct = (n: number) => `${num(n * 100, 1)}%`;
const abcGroups: Abc[] = ["A", "B", "C"];
const xyzGroups: Xyz[] = ["X", "Y", "Z"];

function AnnualValue({ caption }: { caption: string }) {
  const id = useId(), m = classify(STOCK);
  return <figure className="abc-figure" aria-labelledby={`${id}-title`}>
    <header><p>Eight fictional stock items</p><h3 id={`${id}-title`}>Where the €100,000 goes</h3><p>Share of annual consumption value. Items are ranked from highest to lowest.</p></header>
    <div className="abc-value-bars">{m.rows.map(row => <div className="abc-value-row" key={row.id}>
      <div className="abc-value-label"><span className={`abc-letter abc-letter--${row.abc}`}>{row.abc}</span><span>{row.name}</span><span>{money(row.value!)} <small>{pct(row.share!)}</small></span></div>
      <div className="abc-value-track" aria-hidden="true"><span className={`abc-value-fill abc-value-fill--${row.abc}`} style={{ width: `${row.share! * 100}%` }}/></div>
    </div>)}</div>
    <div className="abc-totals">{abcGroups.map(group => { const rows = m.rows.filter(r => r.abc === group); return <p key={group}><span>{group}: {rows.length} items</span><strong>{money(rows.reduce((s,r)=>s+r.value!,0))}</strong><span>{pct(rows.reduce((s,r)=>s+r.share!,0))} of annual value</span></p>; })}</div>
    <details><summary>Inputs and ABC calculation</summary><p>Annual value = units used × fixed unit cost. All items cover January to December of the same fictional year. Unit cost is per roll, carton, litre, box, battery or fuse as named below. Values describe annual use, not on-hand inventory.</p>
      <div className="abc-table-scroll" tabIndex={0} role="region" aria-label="ABC calculation table, scroll horizontally on small screens"><table><caption>Annual inputs and cumulative value</caption><thead><tr><th scope="col">Item</th><th scope="col">Units used</th><th scope="col">€/unit</th><th scope="col">Annual value</th><th scope="col">Cumulative</th><th scope="col">Class</th></tr></thead><tbody>{m.rows.map(r=><tr key={r.id}><th scope="row">{r.name}</th><td>{num(r.stats!.units)}</td><td>{money(r.unitCost)}</td><td>{money(r.value!)}</td><td>{pct(r.cumulative!)}</td><td>{r.abc}</td></tr>)}</tbody></table></div>
      <p>Whole-item boundary rule: include the item that reaches or crosses 80% in A, then the item that reaches or crosses 95% in B. Remaining positive-value items are C. Groups can overshoot their cutoffs. Exact ties are ordered by item ID. This small catalogue lands exactly on both default boundaries.</p>
    </details><figcaption>{caption}</figcaption>
  </figure>;
}

function Matrix({ caption }: { caption: string }) {
  const id = useId();
  const [abcRule, setAbcRule] = useState("80-95"), [xyzRule, setXyzRule] = useState("25-50"), [selected, setSelected] = useState("cartons"), [month, setMonth] = useState(11);
  const rule = { ...DEFAULT_RULE, ...(abcRule === "70-90" ? {a:.7,b:.9} : {}), ...(xyzRule === "50-100" ? {x:.5,y:1} : {}) };
  const m = classify(STOCK, rule), item = m.rows.find(r => r.id === selected)!;
  const months = item.monthly as readonly number[], max = Math.max(...months, 1);
  const selectedUnits = months[month];
  return <figure className="abc-figure abc-matrix-figure" aria-labelledby={`${id}-title`}>
    <header><p>The same catalogue, two ways to group it</p><h3 id={`${id}-title`}>Value meets demand variation</h3><p>Each cell shows all its items. Choose one to see its monthly use.</p></header>
    <div className="abc-controls">
      <label htmlFor={`${id}-abc`}>ABC cumulative value boundaries<select id={`${id}-abc`} value={abcRule} onChange={e=>setAbcRule(e.target.value)}><option value="80-95">A to 80%, B to 95%</option><option value="70-90">A to 70%, B to 90%</option></select></label>
      <label htmlFor={`${id}-xyz`}>XYZ variation boundaries<select id={`${id}-xyz`} value={xyzRule} onChange={e=>setXyzRule(e.target.value)}><option value="25-50">X to 25% CV, Y to 50%</option><option value="50-100">X to 50% CV, Y to 100%</option></select></label>
    </div>
    <p className="abc-small">Illustrative cutoffs. A and B include the item that reaches or crosses each value boundary. C contains the rest.</p>
    <div className="abc-matrix" role="group" aria-label="ABC XYZ inventory matrix">
      {xyzGroups.map((group, i)=><div className="abc-column" key={group}><strong>{group}</strong><span>{i===0?`CV ≤ ${num(rule.x*100)}%`:i===1?`${num(rule.x*100)}% < CV ≤ ${num(rule.y*100)}%`:`CV > ${num(rule.y*100)}%`}</span></div>)}
      {abcGroups.flatMap(a=>xyzGroups.map(x=>{ const cell=a+x, rows=m.rows.filter(r=>r.cell===cell), active=item.cell===cell; return <button type="button" key={cell} className="abc-cell" aria-pressed={active} disabled={rows.length===0} aria-label={`${cell}: ${rows.length} ${rows.length===1?"item":"items"}${rows.length?`. ${rows.map(r=>r.name+(r.critical?", critical spare":"")).join(". ")}. Inspect monthly use.`:"."}`} onClick={()=>setSelected(rows[0].id)}>
        <span className="abc-cell-top"><b>{cell}</b><span>{rows.length} {rows.length===1?"item":"items"}</span></span><span className="abc-cell-items">{rows.length===0?"No items":rows.map(r=><span key={r.id}>{r.name}{r.critical?<em>Critical spare</em>:null}</span>)}</span><span className="abc-cell-value">{money(rows.reduce((s,r)=>s+r.value!,0))}/year</span>
      </button>;}))}
    </div>
    <div className="abc-profile">
      <div className="abc-profile-top"><label htmlFor={`${id}-item`}>Inspect an item<select id={`${id}-item`} value={selected} onChange={e=>setSelected(e.target.value)}>{m.rows.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label><p className="abc-class" aria-live="polite"><strong>{item.cell}</strong><span>{money(item.value!)} annual value</span></p></div>
      <div className="abc-profile-stats"><p>Monthly average<strong>{num(item.stats!.mean,1)} <small>{item.unit}</small></strong></p><p>Monthly CV<strong>{pct(item.stats!.cv!)}</strong></p><p>Months with no use<strong>{months.filter(n=>n===0).length} <small>of 12</small></strong></p></div>
      <p className="abc-chart-scale">Monthly use in {item.unit}. Scale: 0 to {num(max)}. Each item uses its own scale.</p>
      <div className="abc-month-chart" role="group" aria-label={`${item.name}, monthly use in ${item.unit}`}>
        {months.map((value,i)=><button type="button" key={i} className="abc-month" aria-label={`${MONTHS[i]}: ${quantity(value, item.unit)}`} aria-pressed={month===i} onMouseEnter={()=>setMonth(i)} onFocus={()=>setMonth(i)} onClick={()=>setMonth(i)}><span className="abc-month-track" aria-hidden="true"><span style={{height:`${value/max*100}%`}}/>{value===0?<i/>:null}</span><span aria-hidden="true">{MONTHS[i].slice(0,1)}</span></button>)}
      </div>
      <div className="abc-month-inspect"><label htmlFor={`${id}-month`}>Month<select id={`${id}-month`} value={month} onChange={e=>setMonth(Number(e.target.value))}>{MONTHS.map((name,i)=><option key={name} value={i}>{name}</option>)}</select></label><p aria-live="polite"><strong>{quantity(selectedUnits, item.unit)}</strong><span>{MONTHS[month]} use</span></p></div>
      <p className="abc-small">Hover, tap or focus a bar, or use the month selector. Zero months stay in the calculation.</p>
      {item.critical?<p className="abc-critical">Critical-spare assumption: a missing drive fuse stops the machine. Replenishment takes six weeks, with no approved substitute. The CZ label does not capture that consequence.</p>:null}
    </div>
    <details><summary>All monthly data and calculation rules</summary>
      <p>Fictional units used, January to December. Scroll across the table on a small screen. Each row&apos;s unit is named in the first column. Current classes follow the selected cutoffs.</p>
      <div className="abc-table-scroll" tabIndex={0} role="region" aria-label="Monthly usage table, scroll horizontally"><table><caption>All 12 months, quantities in each item&apos;s unit</caption><thead><tr><th scope="col">Item and unit</th>{MONTHS.map(name=><th key={name} scope="col">{name.slice(0,3)}</th>)}<th scope="col">CV</th><th scope="col">Class</th></tr></thead><tbody>{m.rows.map(r=><tr key={r.id}><th scope="row">{r.name} ({r.unit})</th>{r.monthly.map((v,i)=><td key={i}>{num(v!)}</td>)}<td>{pct(r.stats!.cv!)}</td><td>{r.cell}</td></tr>)}</tbody></table></div>
      <p>Mean = sum of 12 monthly quantities ÷ 12. Standard deviation = square root of [sum of (month − mean)² ÷ 12]. CV = standard deviation ÷ mean. Compare unrounded CV with the cutoffs: X includes its upper boundary, Y includes its upper boundary, Z is above it. No seasonal or trend correction is applied.</p>
      <p>ABC uses annual quantities × unit cost, descending by value. The boundary-crossing item stays in the earlier class; ties use item ID order. Items with missing months or zero annual value are excluded from the matrix for separate review. A full zero-demand year has undefined CV. This complete catalogue has {m.excluded} exclusions.</p>
      <button className="abc-reset" type="button" onClick={()=>{setAbcRule("80-95");setXyzRule("25-50");setSelected("cartons");setMonth(11);}}>Reset article example</button>
    </details><figcaption>{caption}</figcaption>
  </figure>;
}

export function AbcXyzInventory({name, caption}:{name:"abc-inventory-value"|"abc-xyz-inventory";caption:string}) {
  return name === "abc-inventory-value" ? <AnnualValue caption={caption}/> : <Matrix caption={caption}/>;
}
