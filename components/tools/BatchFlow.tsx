'use client';

import { Component, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { itemState, scheduleFlow, type FlowSchedule, type TransferSize } from './batch-flow-model';
import './batch-flow.css';
import { advancePlayback } from './batch-flow-playback';

const Scene = dynamic(() => import('./BatchFlowScene'), {
  ssr: false,
  loading: () => <div className="bf-loading" role="status">Loading the 3D view…</div>,
});
const number = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1);
const groupLabel = (n: number) => `${n} at a time`;

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="bf-loading">The 3D view is unavailable. Use the timeline to compare finished pieces and times.</p> : this.props.children; }
}

function Lane({ schedule, time, batch, fixed, reduced }: {
  schedule: FlowSchedule; time: number; batch: number; fixed: boolean;
  reduced: boolean;
}) {
  const done = schedule.completions.filter(t => t <= time).length;
  const waiting = Array.from({ length: 10 }, (_, i) => itemState(schedule, i, time)).filter(s => s.label === 'Waiting').length;
  return <section className={`bf-lane ${fixed ? 'copper' : 'blue'}`} aria-label={`${fixed ? 'Top row, fixed' : 'Bottom row, your choice'}: ${groupLabel(batch)}`}>
    <header>
      <div><p className="bf-row-tag">{fixed ? 'Top row / fixed' : 'Bottom row / your choice'}</p><h2>{groupLabel(batch)}</h2></div>
      <div className="bf-done"><strong>{done}<span> / 10</span></strong><span>pieces finished</span></div>
    </header>
    <div className="bf-station-names" aria-hidden="true"><span>Ready</span>{[0,1,2].map(station => {
      const stage = schedule.operations.filter(op => op.station === station);
      const active = stage.some(op => time >= op.start && time < op.end);
      const complete = time >= stage[stage.length-1].end;
      return <span key={station}>Step {station+1}<small>{time === 0 ? 'Not started' : active ? 'Working' : complete ? 'Done' : 'Waiting'}</small></span>;
    })}<span>Finished</span></div>
    <p className="bf-pallet-help"><span><i aria-hidden="true"/>Green dot = working now.</span></p>
    <div className="bf-scene"><SceneBoundary><Scene schedule={schedule} time={time} color={fixed ? '#b87754' : '#4b8ca3'} reduced={reduced}/></SceneBoundary></div>
    <div className="bf-lane-bottom">
      <p className="bf-live-note">{time === 0 ? '10 pieces ready' : done === 10 ? 'All 10 pieces finished' : `${waiting} ${waiting === 1 ? 'piece waiting' : 'pieces waiting'} between steps`}</p>
      <dl><div><dt>First piece finished</dt><dd>{time >= schedule.first ? `${number(schedule.first)} min` : 'Not yet'}</dd></div><div><dt>All 10 finished</dt><dd>{time >= schedule.finish ? `${number(schedule.finish)} min` : 'Not yet'}</dd></div></dl>
    </div>
  </section>;
}

export function BatchFlow({ hero }: { hero: ReactNode }) {
  const id = useId();
  const [batch, setBatch] = useState<TransferSize>(1);
  const [times, setTimes] = useState([1,1,1]);
  const [playhead, setPlayhead] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [reduced, setReduced] = useState(false);
  const last = useRef<number | null>(null);
  const lanesRef = useRef<HTMLDivElement>(null);
  const reference = useMemo(() => scheduleFlow(10,times), [times]);
  const comparison = useMemo(() => scheduleFlow(batch,times), [batch,times]);
  const end = Math.max(reference.finish, comparison.finish);
  const time = Math.min(playhead,end);
  const active = running && !reduced;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change',update);
    return () => media.removeEventListener('change',update);
  }, []);
  useEffect(() => {
    if (!active) return;
    let frame = 0; last.current = null;
    const tick = (now: number) => {
      const previous = last.current;
      if (previous !== null) setPlayhead(t => advancePlayback(t,Math.min(now-previous,100)/1000*speed*2,end));
      last.current = now; frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active,speed,end]);

  function play() {
    if (reduced) { setPlayhead(end); return; }
    if (!running) lanesRef.current?.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });
    setRunning(!running);
  }
  function changeTimes(next: number[]) { setPlayhead(0); setTimes(next); }

  return <main className="bf-page" id="main">
    <div className="bf-guide-hero">{hero}</div>
    <section className="bf-article-intro" aria-labelledby="bf-guide-title"><h2 id="bf-guide-title">Why smaller groups can finish sooner</h2><p>Batch transfer means finishing a group at one step before passing it to the next. With <a href="https://info.lean.org/hubfs/ebook%20files/ebook_Understanding_Lean_Thinking_final.pdf#page=6">one-piece flow</a>, each finished piece moves on immediately. The next step can start while the first step continues working on the rest of the order.</p><p>The simulated order below has ten pieces and three steps. With every step set to one minute per piece, groups of ten finish the order in 30 minutes. Moving one piece at a time finishes it in 12. Each piece still needs three minutes of work; the difference comes from how long it waits between steps.</p></section>
    <noscript><p className="bf-nojs">Enable JavaScript to run the comparison. With 1 minute at each step, groups of 10 finish the order in 30 minutes; one piece at a time finishes in 12.</p></noscript>
    <div className="bf-module">
      <div className="bf-run-area"><div className="bf-toolbar" id={`${id}-playback`} role="region" aria-label="Playback, timeline and chart">
        <div className="bf-comparison"><div className="bf-fixed"><span>Top / fixed</span><strong>10 at a time</strong></div><fieldset className="bf-choice"><legend>Bottom / at a time</legend><div className="bf-batches">{([1,2,5] as TransferSize[]).map(n=><label key={n} className={batch===n?'is-selected':''}><input type="radio" aria-label={`${n} at a time`} name={`${id}-batch`} value={n} checked={batch===n} onChange={()=>{setPlayhead(0);setBatch(n);}}/><strong>{n}</strong></label>)}</div></fieldset></div>
        <div className="bf-control-line"><div className="bf-transport">
          <button className="bf-play" onClick={play} aria-label={reduced ? 'Show results' : running ? 'Pause' : 'Play'} title={reduced ? 'Show results' : running ? 'Pause' : 'Play continuously'}><span aria-hidden="true">{reduced ? '▥' : running ? 'Ⅱ' : '▶'}</span></button>

          <div className="bf-speed-choices" role="group" aria-label="Playback speed">{[1,1.3,1.5].map(rate=><button type="button" key={rate} aria-label={`${rate} times playback speed`} aria-pressed={speed===rate} onClick={()=>setSpeed(rate)}>{rate}×</button>)}</div>
          <output className="bf-clock" aria-live="off" aria-label="Current time">{number(time)} <span>min</span></output>
        </div>
        <fieldset className="bf-step-controls"><legend>Step times / min per piece, both rows</legend><div>{times.map((duration,i)=><div key={i} className="bf-step-field"><label htmlFor={`${id}-step-${i}`}>Step {i+1}</label><select id={`${id}-step-${i}`} value={duration} onChange={e=>changeTimes(times.map((t,j)=>j===i?Number(e.target.value):t))}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}</select></div>)}</div></fieldset></div>
        <div className="bf-timeline"><label htmlFor={`${id}-time`}>Look at any moment</label><input id={`${id}-time`} aria-label="Time in the comparison" aria-valuetext={`${number(time)} of ${number(end)} simulated minutes`} type="range" min="0" max={end} step=".1" value={time} onChange={e => { setPlayhead(Number(e.target.value)); }}/><div><span>0 min</span><span>{end} min</span></div></div>
        <div className="bf-mini-chart"><h2>Finished pieces <span className="bf-full-run">Full run</span></h2><p className="bf-mini-legend"><span aria-label="10 at a time"><i className="copper"/>10<span className="bf-chart-group-label"> at a time</span></span><span aria-label={groupLabel(batch)}><i className="blue"/>{batch}<span className="bf-chart-group-label"> at a time</span></span></p><div className="bf-mini-plot"><span className="bf-mini-high" aria-hidden="true">10</span><span className="bf-mini-low" aria-hidden="true">0</span><svg viewBox="0 0 400 100" preserveAspectRatio="none" role="img" aria-label={`Full run: 10 at a time finishes at ${reference.finish} minutes, ${groupLabel(batch)} at ${comparison.finish} minutes. Marker at ${number(time)} minutes.`}><path d="M5 5V95H395" fill="none" stroke="currentColor" strokeOpacity=".25"/>{[reference,comparison].map((schedule,i)=><path key={i} d={`M5 95 ${schedule.completions.map((t,j)=>`H${5+t/end*390}V${95-(j+1)*9}`).join(' ')} H395`} fill="none" stroke={i===0?'#9c522d':'#28647b'} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray={i===0?'5 3':undefined}/>)}<path d={`M${5+time/end*390} 3V97`} stroke="currentColor" strokeOpacity=".55" vectorEffect="non-scaling-stroke"/></svg></div><div className="bf-mini-axis"><span>0 min</span><span>{end} min</span></div></div>
      </div>
      <div className="bf-lanes" ref={lanesRef}>
        <Lane schedule={reference} time={time} batch={10} fixed reduced={reduced}/>
        <Lane schedule={comparison} time={time} batch={batch} fixed={false} reduced={reduced}/>
      </div>

      </div>
    </div>
    <section className="bf-explain"><p>Each step works on one piece at a time. Smaller groups let the next step start sooner. Step times apply to both rows; changing them or the group size restarts the comparison without pausing it.</p><p className="bf-method">The run repeats until paused. Transfers take no time; waiting space is unlimited. This example excludes changeovers and breakdowns. Try the <Link href="/tools/queue-capacity/">Queue and Capacity Playground</Link>, or read about <Link href="/notes/busy-machines-slower-orders/">work in progress</Link> and <Link href="/notes/smed-changeover-smaller-batches/">changeovers</Link>.</p></section>
    <p className="bf-explain">Try <Link href="/tools/bottleneck-finder/">Bottleneck Finder</Link> to choose which step to speed up.</p>
    <footer className="bf-footer"><span>Built by Abosh</span><Link href="/notes/">Explore the Notes ↗</Link></footer>
  </main>;
}
