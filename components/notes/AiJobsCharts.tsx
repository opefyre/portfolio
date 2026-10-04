"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import data from "./ai-jobs-data.json";
import "./AiJobsCharts.css";

export type AiJobsChartName = "ai-jobs-adoption" | "ai-jobs-work" | "ai-jobs-employment" | "ai-jobs-baseline" | "ai-jobs-history" | "ai-jobs-demand";
type Age = keyof typeof data.employment;
type Row = { date: string; q1: number; q3: number; q5: number };
type Point = { x: number; y: number; label: string; color: string; open?: boolean; detail: string };
type Line = { label: string; color: string; dash?: string; values: { x: number; y: number }[] };
const INK = "#0f1011", RUST = "#b4532a", GREY = "#6c7176";
const month = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const quarter = (date: string) => `Q${Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1} ${date.slice(0, 4)}`;
const pct = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(1)}%`;
const ages = Object.keys(data.employment) as Age[];
const sourceCanaries = "https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/";

function usePlotWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

function Evidence({ children, source, label = "Source and data" }: { children: ReactNode; source?: string; label?: string }) {
  return <details className="ai-evidence"><summary>{label}</summary><div>{children}{source && <p><a href={source} target="_blank" rel="noopener noreferrer">Open source ↗</a></p>}</div></details>;
}

function Frame({ title, subtitle, children, caption }: { title: string; subtitle: string; children: ReactNode; caption: string }) {
  const id = useId();
  return <figure className="note-interactive" aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`}>
    <div className="ai-heading"><h3 id={`${id}-title`}>{title}</h3><p>{subtitle}</p></div>
    {children}<figcaption id={`${id}-caption`}>{caption}</figcaption>
  </figure>;
}

function Legend({ lines }: { lines: { label: string; color: string; dash?: string; open?: boolean }[] }) {
  return <div className="ai-legend">{lines.map(line => <span key={line.label}><i style={{ borderColor: line.color, background: line.open ? "transparent" : line.color, borderStyle: line.dash ? "dashed" : "solid" }} />{line.label}</span>)}</div>;
}

/** Visible readouts are shared by hover, touch and keyboard controls. */
function Plot({ label, lines = [], points = [], xDomain, yDomain, xTicks, yTicks, yLabel, xLabel, selectedX, onInspect }: {
  label: string; lines?: Line[]; points?: Point[]; xDomain: [number, number]; yDomain: [number, number];
  xTicks: { value: number; label: string }[]; yTicks: number[]; yLabel: string; xLabel?: string;
  selectedX?: number; onInspect?: (x: number) => void;
}) {
  const { ref, width } = usePlotWidth();
  const [active, setActive] = useState<Point | null>(null);
  const height = 300, left = 42, right = 18, top = 30, bottom = 44;
  const x = (value: number) => left + (value - xDomain[0]) / (xDomain[1] - xDomain[0]) * (width - left - right);
  const y = (value: number) => top + (1 - (value - yDomain[0]) / (yDomain[1] - yDomain[0])) * (height - top - bottom);
  const path = (values: Line["values"]) => values.map((p, i) => `${i ? "L" : "M"}${x(p.x).toFixed(2)},${y(p.y).toFixed(2)}`).join(" ");
  const ticks = width < 480 && xTicks.length > 3 ? [xTicks[0], xTicks[Math.floor(xTicks.length / 2)], xTicks[xTicks.length - 1]] : xTicks;
  return <div ref={ref} className="ai-plot">
    <svg viewBox={`0 0 ${width} ${height}`} role={points.length ? "group" : "img"} aria-label={label}
      onPointerMove={onInspect ? event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const coordinate = (event.clientX - bounds.left) * width / bounds.width;
        const value = xDomain[0] + (coordinate - left) / (width - left - right) * (xDomain[1] - xDomain[0]);
        onInspect(Math.max(xDomain[0], Math.min(xDomain[1], Math.round(value))));
      } : undefined}>
      <title>{label}</title>
      <text x={left} y={15} className="ai-axis-label">{yLabel}</text>
      {yTicks.map(value => <g key={value}><line x1={left} x2={width - right} y1={y(value)} y2={y(value)} className="ai-grid-line" /><text x={left - 9} y={y(value) + 4} textAnchor="end" className="ai-tick">{value}</text></g>)}
      <line x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} className="ai-axis-line" />
      {ticks.map((tick, i) => <text key={tick.value} x={x(tick.value)} y={height - 22} textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"} className="ai-tick">{tick.label}</text>)}
      {lines.map(line => <path key={line.label} d={path(line.values)} fill="none" stroke={line.color} strokeWidth={2.3} strokeDasharray={line.dash} />)}
      {selectedX !== undefined && <g><line x1={x(selectedX)} x2={x(selectedX)} y1={top} y2={height - bottom} className="ai-crosshair" />{lines.map(line => { const p = line.values.find(v => v.x === selectedX); return p ? <circle key={line.label} cx={x(p.x)} cy={y(p.y)} r={4} fill={line.color} stroke="var(--color-paper-bg, #eeebe4)" strokeWidth={2} /> : null; })}</g>}
      {points.map(point => <g key={`${point.label}-${point.x}`} tabIndex={0} role="button" aria-label={`${point.label}: ${point.y.toFixed(1)}%. ${point.detail}`} onPointerEnter={() => setActive(point)} onPointerDown={() => setActive(point)} onFocus={() => setActive(point)} onBlur={() => setActive(null)} onKeyDown={event => { if (event.key === "Escape") setActive(null); if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(point); } }} className="ai-mark">
        <circle cx={x(point.x)} cy={y(point.y)} r={16} fill="transparent" />
        <circle cx={x(point.x)} cy={y(point.y)} r={5.5} fill={point.open ? "var(--color-paper-bg, #eeebe4)" : point.color} stroke={point.color} strokeWidth={1.8} />
      </g>)}
    </svg>
    {active && <div className="ai-tooltip" role="status"><strong>{active.label}: {active.y.toFixed(1)}%</strong><span>{active.detail}</span><button type="button" aria-label="Close point details" onClick={() => setActive(null)}>×</button></div>}
    {xLabel && <p className="ai-axis-footer">{xLabel}</p>}
  </div>;
}

function MonthControl({ dates, selected, onChange, label, format = month }: { dates: string[]; selected: number; onChange: (n: number) => void; label: string; format?: (date: string) => string }) {
  const id = useId();
  return <div className="ai-month"><label htmlFor={id}>{label}<output htmlFor={id}>{format(dates[selected])}</output></label><input id={id} type="range" min={0} max={dates.length - 1} step={1} value={selected} aria-valuetext={format(dates[selected])} onChange={e => onChange(Number(e.target.value))} /><span>{format(dates[0])}</span><span>{format(dates[dates.length - 1])}</span></div>;
}

function Adoption() {
  const [internet, setInternet] = useState(false);
  const rows = data.adoption.filter(r => r.years <= 14 && (internet || !r.technology.startsWith("Internet")));
  const colors: Record<string, string> = { PC: INK, GenAI: RUST, "Internet (CPS)": GREY, "Internet (ITU)": GREY };
  return <>
    <label className="ai-checkbox"><input type="checkbox" checked={internet} onChange={e => setInternet(e.target.checked)} /> Include internet observations</label>
    <Legend lines={[{ label: "PC", color: INK }, { label: "GenAI", color: RUST }, ...(internet ? [{ label: "Internet, ages 18-64", color: GREY, open: true }, { label: "Internet, all ages", color: GREY }] : [])]} />
    <Plot label="Historical overall adoption survey points by years since the chosen mass-market anchor" points={rows.map(r => ({ x: r.years, y: r.value, label: `${r.technology}, ${r.surveyYear}`, color: colors[r.technology], open: r.technology === "Internet (CPS)", detail: `${r.population}. Use at work or home.${r.technology === "GenAI" ? " Revised from 39.4% after a question-order experiment; roughly 21 months after launch." : " Observed source point; no interpolation."}` }))} xDomain={[0, 14]} yDomain={[0, 85]} xTicks={[0, 2, 4, 6, 8, 10, 12, 14].map(value => ({ value, label: String(value) }))} yTicks={[0, 20, 40, 60, 80]} yLabel="Overall use (%)" xLabel="Years since source anchor" />
    <p className="ai-hint">Hover, tap or focus a point for its year and population.</p>
    {internet && <p className="ai-caution">The all-age internet series has a different denominator. It is context, not a matched comparison.</p>}
    <Evidence source="https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025">
      <p>Anchors: IBM PC in 1981, commercial internet in 1995, ChatGPT in 2022. Historical observations come from the September 2024 Fed workbook. AI&rsquo;s August 2024 overall-use estimate uses the November 2025 revision. No intermediate survey values are invented.</p>
      <table><caption>Visible historical survey points</caption><thead><tr><th>Technology</th><th>Year</th><th>Source year</th><th>Use</th></tr></thead><tbody>{rows.map(r => <tr key={`${r.technology}-${r.years}`}><td>{r.technology}</td><td>{r.surveyYear}</td><td>{r.years}</td><td>{r.value.toFixed(1)}%</td></tr>)}</tbody></table>
    </Evidence>
  </>;
}

function Work() {
  const [view, setView] = useState<"people" | "hours">("people");
  const [selected, setSelected] = useState(data.work.length - 1);
  const rows = data.work, current = rows[selected];
  const lines: Line[] = view === "people" ? [
    { label: "Uses AI for work", color: INK, values: rows.map((r, i) => ({ x: i, y: r.any_work_use_pct })) },
    { label: "Used it last week", color: RUST, dash: "5 4", values: rows.map((r, i) => ({ x: i, y: r.weekly_work_use_pct })) },
  ] : [
    { label: "Hours assisted", color: INK, values: rows.flatMap((r, i) => r.hours_assisted_pct === null ? [] : [{ x: i, y: r.hours_assisted_pct }]) },
    { label: "Reported hours saved", color: RUST, dash: "5 4", values: rows.flatMap((r, i) => r.hours_saved_pct === null ? [] : [{ x: i, y: r.hours_saved_pct }]) },
  ];
  return <>
    <div className="ai-tabs" role="group" aria-label="Adoption measurement"><button type="button" aria-pressed={view === "people"} onClick={() => setView("people")}>People using AI</button><button type="button" aria-pressed={view === "hours"} onClick={() => setView("hours")}>Hours assisted or saved</button></div>
    <Legend lines={lines} />
    <Plot label={view === "people" ? "AI work use and previous-week use among employed US adults ages 18-64" : "AI-assisted and self-reported saved hours as a share of total work hours"} lines={lines} xDomain={[0, rows.length - 1]} yDomain={view === "people" ? [0, 60] : [0, 8]} xTicks={[0, 2, 4, 7].map(i => ({ value: i, label: quarter(rows[i].date) }))} yTicks={view === "people" ? [0, 15, 30, 45, 60] : [0, 2, 4, 6, 8]} yLabel={view === "people" ? "Employed adults (%)" : "Total work hours (%)"} selectedX={selected} onInspect={setSelected} />
    <div className="ai-readout" aria-live="polite"><span>{quarter(current.date)}</span>{view === "people" ? <><strong>{current.any_work_use_pct.toFixed(1)}%<small>Uses AI for work</small></strong><strong>{current.weekly_work_use_pct.toFixed(1)}%<small>Used it last week</small></strong></> : <><strong>{current.hours_assisted_pct === null ? "No data" : `${current.hours_assisted_pct.toFixed(1)}%`}<small>Hours assisted</small></strong><strong>{current.hours_saved_pct === null ? "No data" : `${current.hours_saved_pct.toFixed(1)}%`}<small>Reported hours saved</small></strong></>}</div>
    <MonthControl dates={rows.map(r => r.date)} selected={selected} onChange={setSelected} label="Inspect quarter" format={quarter} />
    <Evidence source="https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREWORK">
      <p>RPS via FRED, captured 4 October 2026. Use rates count employed US adults ages 18-64. Hours use all work hours, including non-users; missing hours observations remain missing. Assisted hours use response-bracket midpoints. Saved hours are a hypothetical comparison reported by respondents.</p>
      <p><a href="https://fred.stlouisfed.org/series/RPSGENAIUSAGESHARELWWORK">Last-week use</a> · <a href="https://fred.stlouisfed.org/series/RPSGENAIASSISTWRKHRSALL">Assisted hours</a> · <a href="https://fred.stlouisfed.org/series/RPSGENAITSALL">Saved hours</a></p>
      <table><caption>All eight survey quarters</caption><thead><tr><th>Quarter</th><th>Work use</th><th>Last week</th><th>Assisted</th><th>Saved</th></tr></thead><tbody>{rows.map(r => <tr key={r.date}><td>{quarter(r.date)}</td><td>{r.any_work_use_pct.toFixed(1)}%</td><td>{r.weekly_work_use_pct.toFixed(1)}%</td><td>{r.hours_assisted_pct === null ? "No data" : `${r.hours_assisted_pct.toFixed(1)}%`}</td><td>{r.hours_saved_pct === null ? "No data" : `${r.hours_saved_pct.toFixed(1)}%`}</td></tr>)}</tbody></table>
    </Evidence>
  </>;
}

function Employment() {
  const [age, setAge] = useState<Age>("22-25");
  const [compare, setCompare] = useState<"q1" | "q3">("q1");
  const [view, setView] = useState<"paths" | "ages">("paths");
  const [selected, setSelected] = useState(59);
  const rows: Row[] = data.employment[age], current = rows[selected];
  const relative = 100 * current.q5 / current[compare] - 100;
  const lines: Line[] = [{ label: "Most exposed (Q5)", color: RUST, values: rows.map((r, i) => ({ x: i, y: r.q5 })) }, { label: compare === "q1" ? "Least exposed (Q1)" : "Middle exposure (Q3)", color: INK, dash: "5 4", values: rows.map((r, i) => ({ x: i, y: r[compare] })) }];
  const ageId = useId(), compareId = useId();
  return <>
    <div className="ai-tabs" role="group" aria-label="Employment view"><button type="button" aria-pressed={view === "paths"} onClick={() => setView("paths")}>Employment paths</button><button type="button" aria-pressed={view === "ages"} onClick={() => setView("ages")}>Compare ages</button></div>
    <div className="ai-controls">{view === "paths" && <label htmlFor={ageId}>Age group<select id={ageId} value={age} onChange={e => setAge(e.target.value as Age)}>{ages.map(a => <option key={a} value={a}>{a}</option>)}</select></label>}<label htmlFor={compareId}>Comparison group<select id={compareId} value={compare} onChange={e => setCompare(e.target.value as "q1" | "q3")}><option value="q1">Least exposed (Q1)</option><option value="q3">Middle exposure (Q3)</option></select></label></div>
    {view === "paths" ? <>
      <Legend lines={lines} />
      <Plot label={`Employment indices for ages ${age}, most exposed occupations compared with ${compare === "q1" ? "least exposed" : "middle exposure"}. November 2022 equals 100.`} lines={lines} xDomain={[0, 59]} yDomain={[70, 125]} xTicks={[0, 14, 28, 40, 59].map(i => ({ value: i, label: month(rows[i].date) }))} yTicks={[70, 85, 100, 115]} yLabel="Employment index" selectedX={selected} onInspect={setSelected} />
      <div className="ai-readout" aria-live="polite"><span>{month(current.date)}</span><strong>{current.q5.toFixed(2)}<small>Most exposed group</small></strong><strong>{current[compare].toFixed(2)}<small>Comparison group</small></strong><strong>{pct(relative)}<small>Gap vs comparison</small></strong></div>
      <MonthControl dates={rows.map(r => r.date)} selected={selected} onChange={setSelected} label="Inspect month" />
    </> : <div className="ai-age-comparison" aria-live="polite"><p>Relative employment change, November 2022 to August 2026</p>{ages.map(a => {
      const r = data.employment[a][59], value = 100 * r.q5 / r[compare] - 100;
      return <button type="button" key={a} className="ai-age-row" aria-label={`Ages ${a}: ${pct(value)}. Open employment paths.`} onClick={() => { setAge(a); setView("paths"); setSelected(59); }}><span>{a}</span><span className="ai-age-track"><i style={{ width: `${Math.abs(value) / 25 * 100}%`, left: value < 0 ? `${80 - Math.abs(value) / 25 * 100}%` : "80%", background: value < 0 ? RUST : INK }} /><b /></span><strong>{pct(value)}</strong></button>})}<div className="ai-age-axis" aria-hidden="true"><span /><span><i>−20%</i><b>0%</b><em>+5%</em></span><span /></div><p className="ai-hint">Select an age group to inspect its monthly path. A negative gap means employment grew less, or fell more, than in the comparison group.</p></div>}
    <Evidence source={sourceCanaries}>
      <p>Balanced, occupation-matched ADP firm sample; September 2021 to August 2026. Each exported quintile index equals 100 in November 2022. Relative change = 100 × Q5 index ÷ comparison index − 100. These are changing age populations. Quintiles contain equal numbers of occupations, not workers. No confidence intervals or causal attribution are available for our aggregate ratios.</p>
      <table><caption>Selected age {age}: all monthly source indices, November 2022 = 100</caption><thead><tr><th>Month</th><th>Q5</th><th>{compare.toUpperCase()}</th><th>Relative change</th></tr></thead><tbody>{rows.map(r => <tr key={r.date}><td>{month(r.date)}</td><td>{r.q5.toFixed(2)}</td><td>{r[compare].toFixed(2)}</td><td>{pct(100 * r.q5 / r[compare] - 100)}</td></tr>)}</tbody></table>
    </Evidence>
  </>;
}

function Baseline() {
  const [selected, setSelected] = useState(2);
  const { ref, width } = usePlotWidth();
  const left = 88, right = 18, x = (value: number) => left + (value + 25) / 25 * (width - left - right);
  return <>
    <div ref={ref} className="ai-plot"><svg viewBox={`0 0 ${width} 260`} role="group" aria-label="Changing the baseline changes the youngest workers' relative employment gap. Each comparison ends August 2026.">
      <title>Baseline sensitivity, ages 22-25, Q5 versus Q1</title>
      {[-25, -20, -15, -10, -5, 0].map(value => <g key={value}><line x1={x(value)} x2={x(value)} y1={18} y2={216} className="ai-grid-line" /><text x={x(value)} y={242} textAnchor="middle" className="ai-tick">{value}%</text></g>)}
      {data.baseline.map((r, i) => <g key={r.date} tabIndex={0} role="button" aria-label={`${month(r.date)} baseline: ${pct(r.value)} through August 2026`} className="ai-mark" onFocus={() => setSelected(i)} onPointerEnter={() => setSelected(i)} onClick={() => setSelected(i)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(i); } }}><text x={0} y={38 + i * 41} className="ai-tick">{month(r.date)}</text><circle cx={x(r.value)} cy={34 + i * 41} r={18} fill="transparent" /><circle cx={x(r.value)} cy={34 + i * 41} r={selected === i ? 6 : 4.5} fill={selected === i ? RUST : GREY} /></g>)}
    </svg></div>
    <div className="ai-readout" aria-live="polite"><span>{month(data.baseline[selected].date)} to Aug 2026</span><strong>{pct(data.baseline[selected].value)}<small>Relative employment change</small></strong></div>
    <p className="ai-hint">Hover, tap or focus a point to inspect its comparison period.</p>
    <Evidence source={sourceCanaries}><p>For each baseline b, relative change = 100 × (Q5 in August 2026 ÷ Q5 at b) ÷ (Q1 in August 2026 ÷ Q1 at b) − 100. Every row measures a different period. These are not statistical confidence bounds.</p><table><caption>All five baseline calculations</caption><thead><tr><th>Baseline</th><th>Relative change to Aug 2026</th></tr></thead><tbody>{data.baseline.map(r => <tr key={r.date}><td>{month(r.date)}</td><td>{pct(r.value)}</td></tr>)}</tbody></table></Evidence>
  </>;
}

const history = [
  { period: "Mechanised textiles", title: "More output, difficult years for workers", text: "British cotton production grew, but some workers went years without wage gains and lost control over how they worked. A richer economy did not mean every worker benefited.", source: "https://www.annualreviews.org/content/journals/10.1146/annurev-economics-091823-025129", label: "Acemoglu and Johnson, historical review" },
  { period: "The 1966 automation debate", title: "Individual job losses can happen without mass unemployment", text: "The US commission found that technology could put individual workers out of a job without being the main cause of overall unemployment. That was its finding for the period it studied.", source: "https://files.eric.ed.gov/fulltext/ED023803.pdf", label: "Federal commission, printed page 109" },
  { period: "Computer era", title: "Routine office work became a smaller share of employment", text: "Clerical work fell from 19.4% of employment in 1980 to 15.8% in 2017, a drop of 3.6 percentage points. That measures its share of all jobs. Research explains how computers could replace routine tasks, although other changes also shaped the job market.", source: "https://www.bls.gov/bls/congressional-reports/assessing-the-impact-of-new-technologies-on-the-labor-market.htm", label: "BLS-hosted occupational-share report", extra: "https://www.nber.org/papers/w8337" },
  { period: "US robots, 1990-2007", title: "Employment and wages fell in more exposed areas", text: "Acemoglu and Restrepo estimate that one additional industrial robot per 1,000 workers reduced local employment-to-population by 0.39 percentage points and wages by 0.77%. The smaller implied aggregate effects are 0.2 points and 0.42%, accounting for benefits elsewhere. Those estimates concern robots in US areas, so they cannot predict the size of an AI jobs effect.", source: "https://economics.mit.edu/sites/default/files/inline-files/Robots%20and%20Jobs%20-%20Evidence%20from%20US%20Labor%20Markets.pdf", label: "Acemoglu and Restrepo, published study" },
];
function History() {
  return <div className="ai-history">{history.map((r, i) => <details key={r.period}><summary><span className="ai-history-period">{r.period}</span><strong>{r.title}</strong><span className="ai-history-number" aria-hidden="true">0{i + 1}</span></summary><div><p>{r.text}</p><a href={r.source} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>{r.extra && <p><a href={r.extra} target="_blank" rel="noopener noreferrer">Autor, Levy and Murnane, task research ↗</a></p>}</div></details>)}</div>;
}

function Demand() {
  const [gain, setGain] = useState(15), [demand, setDemand] = useState(100);
  const gainId = useId(), demandId = useId();
  const required = demand / (1 + gain / 100), change = required - 100;
  const { ref, width } = usePlotWidth();
  const left = 18, right = 60, x = (n: number) => left + n / 160 * (width - left - right);
  const [hover, setHover] = useState<string | null>(null);
  return <>
    <p className="ai-scenario-label">Fictional example · starting point: 100 units in 100 hours</p>
    <div className="ai-sliders"><label htmlFor={gainId}>Productivity improvement<output htmlFor={gainId}>{gain}%</output><input id={gainId} type="range" min={0} max={50} value={gain} onChange={e => setGain(Number(e.target.value))} /></label><label htmlFor={demandId}>New demand<output htmlFor={demandId}>{demand} units</output><input id={demandId} type="range" min={50} max={160} value={demand} onChange={e => setDemand(Number(e.target.value))} /></label></div>
    <div className="ai-presets" role="group" aria-label="Demand examples">{[100, 115, 130].map(n => <button type="button" key={n} aria-pressed={demand === n} onClick={() => setDemand(n)}>{n} units</button>)}<button type="button" onClick={() => { setGain(15); setDemand(100); }}>Reset</button></div>
    <div ref={ref} className="ai-plot"><svg viewBox={`0 0 ${width} 210`} role="group" aria-label={`Fictional model: ${gain}% higher productivity and demand of ${demand} units require ${required.toFixed(1)} hours, compared with 100 baseline hours.`}>
      <title>Required labour hours under adjustable productivity and demand assumptions</title>
      {[{ label: "Baseline", hours: 100, color: INK }, { label: "New requirement", hours: required, color: RUST }].map((r, i) => <g key={r.label} tabIndex={0} role="button" className="ai-mark" aria-label={`${r.label}: ${r.hours.toFixed(1)} hours`} onPointerEnter={() => setHover(`${r.label}: ${r.hours.toFixed(1)} hours`)} onFocus={() => setHover(`${r.label}: ${r.hours.toFixed(1)} hours`)} onBlur={() => setHover(null)} onClick={() => setHover(`${r.label}: ${r.hours.toFixed(1)} hours`)} onKeyDown={e => { if (e.key === "Escape") setHover(null); }}><text x={left} y={24 + i * 80} className="ai-axis-label">{r.label}</text><rect x={left} y={36 + i * 80} width={x(r.hours) - left} height={26} fill={r.color} /><text x={x(r.hours) + 8} y={55 + i * 80} className="ai-value">{r.hours.toFixed(1)} h</text></g>)}
      {[0, 50, 100, 150].map(n => <text key={n} x={x(n)} y={190} textAnchor={n === 0 ? "start" : "middle"} className="ai-tick">{n}</text>)}<line x1={left} x2={width - right} y1={169} y2={169} className="ai-axis-line" />
    </svg>{hover && <p className="ai-bar-detail" role="status">{hover}</p>}</div>
    <div className="ai-readout" aria-live="polite"><strong>{required.toFixed(1)} h<small>Required hours</small></strong><strong>{pct(change)}<small>Change from 100 hours</small></strong></div>
    <p className="ai-calculation">{demand} units ÷ {(1 + gain / 100).toFixed(2)} units per hour = {required.toFixed(1)} hours</p>
    <Evidence label="Calculation and assumptions"><p>Required hours = demand ÷ (1 + productivity improvement ÷ 100). The starting rate is one unit per hour. Quality, work mix and other inputs stay constant; review effort is included in the assumed net productivity rate. Staffing, wages, scheduling and cash expenditure are outside this simplified model. The 15% starting value illustrates, rather than reproduces, the customer-support study.</p></Evidence>
  </>;
}

export function AiJobsChart({ name, caption }: { name: AiJobsChartName; caption: string }) {
  const content: Record<AiJobsChartName, { title: string; subtitle: string; component: ReactNode }> = {
    "ai-jobs-adoption": { title: "How quickly did use spread?", subtitle: "Share of people using it at work or home", component: <Adoption /> },
    "ai-jobs-work": { title: "How much work does adoption reach?", subtitle: "US Real-Time Population Survey · Q3 2024 to Q2 2026", component: <Work /> },
    "ai-jobs-employment": { title: "Follow the employment paths", subtitle: "US employment data from ADP · September 2021 to August 2026", component: <Employment /> },
    "ai-jobs-baseline": { title: "Change the starting date", subtitle: "Ages 22-25 · most exposed jobs compared with least exposed", component: <Baseline /> },
    "ai-jobs-history": { title: "What happened in earlier waves of automation?", subtitle: "Four cases showing what changed for workers", component: <History /> },
    "ai-jobs-demand": { title: "What happens when the work gets faster?", subtitle: "Change the assumptions and compare the required hours", component: <Demand /> },
  };
  const chart = content[name];
  return <Frame title={chart.title} subtitle={chart.subtitle} caption={caption}>{chart.component}</Frame>;
}
