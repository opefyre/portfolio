'use client';

import { Component, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { itemState, scheduleFlow, type FlowSchedule, type TransferSize } from './batch-flow-model';
import './batch-flow.css';
import './bottleneck.css';
import { advancePlayback } from './batch-flow-playback';

const Scene = dynamic(() => import('./BottleneckScene'), {
  ssr: false,
  loading: () => <div className="bf-loading" role="status">Loading the 3D view…</div>,
});
const number = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1);


class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="bf-loading">The 3D view is unavailable. Use the timeline to compare finished pieces and times.</p> : this.props.children; }
}

function Lane({ schedule, time, fixed, reduced }: {
  schedule: FlowSchedule; time: number; batch: number; fixed: boolean;
  reduced: boolean;
}) {
  const done = schedule.completions.filter(t => t <= time).length;
  const waiting = Array.from({ length: 10 }, (_, i) => itemState(schedule, i, time)).filter(s => s.label === 'Waiting').length;
  return <section className={`bf-lane ${fixed ? 'copper' : 'blue'}`} aria-label={`${fixed ? 'Original line' : 'Upgraded line'}`}>
    <header>
      <div><p className="bf-row-tag">{fixed ? 'Top / original' : 'Bottom / your upgrade'}</p><h2>{fixed ? 'Original line' : 'One faster step'}</h2></div>
      <div className="bf-done"><strong>{done}<span> / 10</span></strong><span>pieces finished</span></div>
    </header>
    <div className="bf-station-names" aria-hidden="true"><span>Ready</span>{[0,1,2].map(station => {
      const stage = schedule.operations.filter(op => op.station === station);
      const active = stage.some(op => time >= op.start && time < op.end);
      const complete = time >= stage[stage.length-1].end;
      return <span key={station}>Step {station+1}<small>{stage[0].end-stage[0].start} min / piece<br/>{time === 0 ? 'Not started' : active ? 'Working' : complete ? 'Done' : 'Waiting'}</small></span>;
    })}<span>Finished</span></div>
    <p className="bf-pallet-help"><span>Moving press = working now.</span></p>
    <div className="bf-scene"><SceneBoundary><Scene schedule={schedule} time={time} color={fixed ? '#b87754' : '#4b8ca3'} reduced={reduced}/></SceneBoundary></div>
    <div className="bf-lane-bottom">
      <p className="bf-live-note">{time === 0 ? '10 pieces ready' : done === 10 ? 'All 10 pieces finished' : `${waiting} ${waiting === 1 ? 'piece waiting' : 'pieces waiting'} between steps`}</p>
      <dl><div><dt>First piece finished</dt><dd>{time >= schedule.first ? `${number(schedule.first)} min` : 'Not yet'}</dd></div><div><dt>All 10 finished</dt><dd>{time >= schedule.finish ? `${number(schedule.finish)} min` : 'Not yet'}</dd></div></dl>
    </div>
  </section>;
}

export function BottleneckFinder({ hero }: { hero: ReactNode }) {
  const id = useId();
  const [step, setStep] = useState(0);
  const batch: TransferSize = 1;
  const times = useMemo(() => [1,3,1], []);
  const [playhead, setPlayhead] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [reduced, setReduced] = useState(false);
  const last = useRef<number | null>(null);
  const lanesRef = useRef<HTMLDivElement>(null);
  const reference = useMemo(() => scheduleFlow(1,times), [times]);
  const comparison = useMemo(() => scheduleFlow(1,times.map((t,i)=>i===step?t/2:t)), [step,times]);
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
  

  return <main className="bf-page bn-page" id="main">
    <div className="bf-guide-hero">{hero}</div>
    <section className="bf-article-intro"><h2>Choose which step to speed up</h2><p>A bottleneck is the step that limits how quickly a line can keep finishing work. In this example, Step 1 and Step 3 each take one minute per piece. Step 2 takes three. Pieces collect before Step 2 while the last step waits for work.</p><p>Choose one step to cut its work time in half. The top row keeps the original times; the bottom shows your change. Compare the waiting pieces, finished pieces and time to finish all ten. A faster step can bring the first piece forward slightly while leaving the line’s ongoing pace unchanged.</p></section>
    <noscript><p className="bf-nojs">Enable JavaScript to compare upgrades. The original line finishes ten pieces in 32 minutes. Halving Step 2 reduces this to 17 minutes; halving Step 1 or 3 gives 31.5 minutes.</p></noscript>
    <div className="bf-module">
      <div className="bf-run-area"><div className="bf-toolbar" id={`${id}-playback`} role="region" aria-label="Playback, timeline and chart">
        <div className="bf-comparison"><div className="bf-fixed"><span>Top / unchanged</span><strong>1 → 3 → 1 min</strong></div><fieldset className="bf-choice"><legend>Bottom / halve the time at</legend><div className="bf-batches">{[0,1,2].map(n=><label key={n} className={step===n?'is-selected':''}><input type="radio" aria-label={`Speed up Step ${n+1}`} name={`${id}-step`} checked={step===n} onChange={()=>{setPlayhead(0);setStep(n);}}/><strong>{n+1}</strong></label>)}</div></fieldset></div>
        <div className="bf-control-line"><div className="bf-transport">
          <button className="bf-play" onClick={play} aria-label={reduced ? 'Show results' : running ? 'Pause' : 'Play'} title={reduced ? 'Show results' : running ? 'Pause' : 'Play continuously'}><span aria-hidden="true">{reduced ? '▥' : running ? 'Ⅱ' : '▶'}</span></button>

          <div className="bf-speed-choices" role="group" aria-label="Playback speed">{[1,1.3,1.5].map(rate=><button type="button" key={rate} aria-label={`${rate} times playback speed`} aria-pressed={speed===rate} onClick={()=>setSpeed(rate)}>{rate}×</button>)}</div>
          <output className="bf-clock" aria-live="off" aria-label="Current time">{number(time)} <span>min</span></output>
        </div>
        <p className="bn-selected">Step {step+1}: {times[step]} → {times[step]/2} min per piece</p></div>
        <div className="bf-timeline"><label htmlFor={`${id}-time`}>Look at any moment</label><input id={`${id}-time`} aria-label="Time in the comparison" aria-valuetext={`${number(time)} of ${number(end)} simulated minutes`} type="range" min="0" max={end} step=".1" value={time} onChange={e => { setPlayhead(Number(e.target.value)); }}/><div><span>0 min</span><span>{end} min</span></div></div>
        <div className="bf-mini-chart"><h2>Finished pieces <span className="bf-full-run">Full run</span></h2><p className="bf-mini-legend"><span aria-label="Original line"><i className="copper"/>Original</span><span aria-label="Upgraded line"><i className="blue"/>Upgraded</span></p><div className="bf-mini-plot"><span className="bf-mini-high" aria-hidden="true">10</span><span className="bf-mini-low" aria-hidden="true">0</span><svg viewBox="0 0 400 100" preserveAspectRatio="none" role="img" aria-label={`Full run: Original line finishes at ${reference.finish} minutes, Upgraded line at ${comparison.finish} minutes. Marker at ${number(time)} minutes.`}><path d="M5 5V95H395" fill="none" stroke="currentColor" strokeOpacity=".25"/>{[reference,comparison].map((schedule,i)=><path key={i} d={`M5 95 ${schedule.completions.map((t,j)=>`H${5+t/end*390}V${95-(j+1)*9}`).join(' ')} H395`} fill="none" stroke={i===0?'#9c522d':'#28647b'} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray={i===0?'5 3':undefined}/>)}<path d={`M${5+time/end*390} 3V97`} stroke="currentColor" strokeOpacity=".55" vectorEffect="non-scaling-stroke"/></svg></div><div className="bf-mini-axis"><span>0 min</span><span>{end} min</span></div></div>
      </div>
      <div className="bf-lanes" ref={lanesRef}>
        <Lane schedule={reference} time={time} batch={1} fixed reduced={reduced}/>
        <Lane schedule={comparison} time={time} batch={batch} fixed={false} reduced={reduced}/>
      </div>

      </div>
    </div>
    <section className="bf-explain"><p>The original line finishes ten pieces in {reference.finish} minutes. Your change finishes them in {comparison.finish} minutes, saving {reference.finish-comparison.finish} minutes. Once the line fills, its slowest step sets the pace: {Math.max(...times)} minutes per piece originally, {Math.max(...times.map((t,i)=>i===step?t/2:t))} after your change.</p><p>Pieces pass on individually. Each step works on one piece at a time, and waiting pieces keep their own tray slots. The run repeats until paused. There are no breakdowns, changeovers or transport delays.</p><p>Read the <Link href="/notes/theory-of-constraints-example/">Theory of Constraints example</Link>, or compare <Link href="/tools/batch-vs-flow/">batch sizes</Link> and <Link href="/tools/queue-capacity/">arrival timing</Link>.</p></section>
    <footer className="bf-footer"><span>Built by Abosh</span><Link href="/notes/">Explore the Notes ↗</Link></footer>
  </main>;
}
