"use client";

import { useId, useState } from "react";
import { calculateForecastMetrics, forecastExamples, type ForecastInput } from "./forecast-metrics";
import "./ForecastCalculator.css";

const units = (n: number) => n !== 0 && (Math.abs(n) < 0.01 || Math.abs(n) >= 1e9) ? n.toExponential(2) : n.toLocaleString("en-GB", { maximumFractionDigits: 2 });
const percent = (n: number | null) => n === null ? "Undefined" : `${(Math.abs(n) < 0.005 ? 0 : n).toFixed(2)}%`;
function lower(a: number | null, b: number | null) {
  if (a === null || b === null) return "Unavailable";
  return Math.abs(a - b) <= 1e-10 * Math.max(1, a, b) ? "Tie" : a < b ? "A" : "B";
}
const exampleLabels = { comparison: "Different winners", zeros: "Zero demand", bias: "Errors cancel out" };

export function ForecastCalculator({ caption }: { caption: string }) {
  const id = useId();
  const [inputs, setInputs] = useState<ForecastInput[]>(forecastExamples.comparison);
  const [selected, setSelected] = useState("comparison");
  const [focused, setFocused] = useState(1);
  const result = calculateForecastMetrics(inputs);
  const scores = result.a && result.b ? [result.a, result.b] : null;
  const row = result.rows.find(row => row.id === focused) ?? result.rows[0];
  const max = Math.max(1, ...result.rows.flatMap(row => [Math.abs(row.a - row.actual), Math.abs(row.b - row.actual)]));
  function update(rowId: number, field: "actual" | "a" | "b", value: string) {
    setInputs(rows => rows.map(row => row.id === rowId ? { ...row, [field]: value } : row));
    setSelected("");
  }
  return <figure className="note-interactive forecast-calculator" aria-labelledby={`${id}-title`}>
    <header className="forecast-heading"><p className="forecast-kicker">Try the numbers</p><h3 id={`${id}-title`}>MAPE, WAPE and bias calculator</h3><p>Edit demand and both forecasts. Each row is one product-period or one period for a single product, in the same units.</p></header>
    <div className="forecast-presets" role="group" aria-label="Fictional forecast examples">{(Object.keys(exampleLabels) as (keyof typeof exampleLabels)[]).map(key => <button type="button" key={key} aria-pressed={selected === key} onClick={() => { setInputs(forecastExamples[key]); setSelected(key); setFocused(1); }}>{exampleLabels[key]}</button>)}</div>
    <div className="forecast-inputs">{inputs.map((input, index) => {
      const issue = result.issues.find(issue => issue.id === input.id);
      return <fieldset key={input.id}><legend>{input.label}</legend><div className="forecast-input-row">{(["actual", "a", "b"] as const).map(field => <label key={field} htmlFor={`${id}-${input.id}-${field}`}><span>{field === "actual" ? "Actual" : `Forecast ${field.toUpperCase()}`}</span><input id={`${id}-${input.id}-${field}`} type="text" inputMode="decimal" value={input[field]} onChange={e => update(input.id, field, e.target.value)} aria-label={`${input.label}, ${field === "actual" ? "actual demand" : `forecast ${field.toUpperCase()}`}`} aria-invalid={issue?.fields.includes(field) || undefined} aria-describedby={issue ? `${id}-validation` : `${id}-input-help`} /></label>)}<button type="button" className="forecast-remove" aria-label={`Remove ${input.label}`} onClick={() => { setInputs(rows => rows.filter(row => row.id !== input.id)); setSelected(""); }} disabled={inputs.length === 1}>×</button></div>{issue && <p className="forecast-row-warning">Complete all three fields with nonnegative numbers.</p>}<span className="sr-only">Observation {index + 1}</span></fieldset>;
    })}</div>
    <div className="forecast-actions"><button type="button" disabled={inputs.length >= 12} onClick={() => { const next = Math.max(0, ...inputs.map(row => row.id)) + 1; setInputs(rows => [...rows, { id: next, label: `Observation ${next}`, actual: "", a: "", b: "" }]); setSelected(""); }}>Add row</button><button type="button" onClick={() => { setInputs(forecastExamples.comparison); setSelected("comparison"); setFocused(1); }}>Reset example</button></div>
    <p className="forecast-help" id={`${id}-input-help`}>Use a decimal point, without thousands separators. Blank rows are unused; zero is an actual value. Up to 12 rows. Inputs stay in this page and are not saved or sent by the calculator.</p>
    <div className="forecast-status" id={`${id}-validation`} role="status">{result.issues.length ? "Results paused: fix the highlighted fields. Neither forecast is scored on an incomplete set." : result.overflow ? "These values are too large to calculate safely. Use smaller quantities or a consistent smaller unit." : !scores ? "Enter at least one complete row to calculate results." : `${result.rows.length} observations / ${units(result.actual)} actual units${result.unused ? ` / ${result.unused} unused blank ${result.unused === 1 ? "row" : "rows"}` : ""}. ${result.zeroRows ? `MAPE is undefined: ${result.zeroRows} ${result.zeroRows === 1 ? "row has" : "rows have"} zero actual demand.` : "Both forecasts use the same rows."}${result.actual === 0 ? " WAPE and percentage bias are also undefined because total demand is zero." : ""}`}</div>
    {scores && <>
      <div className="forecast-results-wrap"><table className="forecast-results"><caption>Current results. Lower MAPE and WAPE mean less error.</caption><thead><tr><th scope="col">Measure</th><th scope="col">Forecast A</th><th scope="col">Forecast B</th><th scope="col">Lower error</th></tr></thead><tbody>
        {(["mape", "wape"] as const).map(metric => <tr key={metric}><th scope="row">{metric.toUpperCase()}</th><td>{percent(scores[0][metric])}</td><td>{percent(scores[1][metric])}</td><td>{lower(scores[0][metric], scores[1][metric])}</td></tr>)}
        <tr><th scope="row">Bias</th><td>{percent(scores[0].bias)}</td><td>{percent(scores[1].bias)}</td><td>Direction only</td></tr>
        <tr><th scope="row">Absolute error</th><td>{units(scores[0].absolute)} units</td><td>{units(scores[1].absolute)} units</td><td>{lower(scores[0].absolute, scores[1].absolute)}</td></tr>
      </tbody></table></div>
      <p className="forecast-direction">Bias uses forecast minus actual: positive means overforecasting, negative means underforecasting. A zero can hide offsetting errors.</p>
      <div className="forecast-legend"><span><i className="forecast-a" />Forecast A</span><span><i className="forecast-b" />Forecast B</span><span>Absolute error, in units</span></div>
      <div className="forecast-bars" role="group" aria-label="Absolute error for each observation">{result.rows.map(row => <button type="button" key={row.id} className={`forecast-bar${row.id === (result.rows.find(row => row.id === focused)?.id ?? result.rows[0]?.id) ? " is-focused" : ""}`} onMouseEnter={() => setFocused(row.id)} onFocus={() => setFocused(row.id)} onClick={() => setFocused(row.id)} aria-pressed={row.id === (result.rows.find(row => row.id === focused)?.id ?? result.rows[0]?.id)} aria-label={`${row.label}: A misses ${units(Math.abs(row.a - row.actual))} units, B misses ${units(Math.abs(row.b - row.actual))} units. Inspect percentage errors.`}><span className="forecast-bar-label">{row.label}</span>{(["a", "b"] as const).map(key => <span className="forecast-bar-line" key={key}><span>{key.toUpperCase()}</span><span className="forecast-track"><span className={`forecast-${key}`} style={{ width: `${Math.abs(row[key] - row.actual) / max * 100}%` }} /></span><b>{units(Math.abs(row[key] - row.actual))}</b></span>)}</button>)}</div>
      <p className="forecast-axis">Shared scale: 0 to {units(max)} units. Hover over, select or focus a row to inspect it.</p>
      {row && <div className="forecast-inspect" aria-live="polite"><strong>{row.label}</strong><p>Actual demand: {units(row.actual)} units. Percentage error: A {percent(row.actual ? Math.abs(row.a - row.actual) / row.actual * 100 : null)}, B {percent(row.actual ? Math.abs(row.b - row.actual) / row.actual * 100 : null)}.{result.actual > 0 ? ` This row accounts for ${percent(row.actual / result.actual * 100)} of total demand.` : " Total demand is zero."}</p></div>}
    </>}
    <details className="forecast-method"><summary>Formulas and limits</summary><p>MAPE = mean of |forecast − actual| ÷ actual × 100. WAPE = sum of absolute errors ÷ sum of actual demand × 100. Bias = sum of (forecast − actual) ÷ sum of actual demand × 100. Quantities must be nonnegative and use the same unit. Results are rounded for display only.</p><p>A zero actual makes MAPE undefined for the full set, including when its forecast is also zero. WAPE retains errors on zero-demand rows when total demand is positive. Completely blank rows are excluded; partially filled or invalid rows pause all results. No zero-demand rows are removed to make a score look better.</p><p>This calculator compares point forecasts. It does not estimate stock requirements, service levels or the cost of a miss. Definitions: <a href="https://otexts.com/fpp3/accuracy.html">Forecasting: Principles and Practice</a> and <a href="https://robjhyndman.com/hyndsight/wape.html">Rob Hyndman on WAPE</a>.</p></details>
    <noscript><p>The worked-example inputs and results are shown above. Enable JavaScript to edit them.</p></noscript>
    <figcaption>{caption}</figcaption>
  </figure>;
}
