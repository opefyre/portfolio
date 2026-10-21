/** Teaching models. All inputs are fictional. No network, temporary files or mutable random state. */
export const jobTimes = [8,9,9,10,10,10,10,11,11,12,8,8,9,9,10,10,11,11,12,12];
const t95: Record<number,number> = {5:2.7764451051977987,10:2.2621571628540993,20:2.093024054408263};
export function meanInterval(n: number) {
  if (![5,10,20].includes(n)) throw Error('Choose 5, 10 or 20 observations.');
  const values=jobTimes.slice(0,n),mean=values.reduce((a,b)=>a+b,0)/n;
  const sd=Math.sqrt(values.reduce((a,b)=>a+(b-mean)**2,0)/(n-1));
  const se=sd/Math.sqrt(n),margin=t95[n]*se;
  return {n,values,mean,sd,se,margin,low:mean-margin,high:mean+margin};
}
export type RiskMode = 'none'|'shared'|'separate';
export const riskLabels: Record<RiskMode,string> = {none:'No extra risk',shared:'One shared event',separate:'Separate events'};
export const activities = [
  {id:'A',duration:5,predecessors:[]},
  {id:'B',duration:10,predecessors:['A']},
  {id:'C',duration:8,predecessors:['B']},
  {id:'D',duration:12,predecessors:['B']},
  {id:'E',duration:6,predecessors:['A']},
  {id:'F',duration:5,predecessors:['C','D']},
  {id:'G',duration:4,predecessors:['E','F']},
  {id:'H',duration:3,predecessors:['G']},
];
export function finishNetwork(overrides: Record<string,number>={}) {
  const finish: Record<string,number>={};
  for(const a of activities) {
    const duration=overrides[a.id]??a.duration;
    if(!Number.isFinite(duration)||duration<0)throw Error('Invalid activity duration');
    finish[a.id]=Math.max(0,...a.predecessors.map(p=>finish[p]))+duration;
  }
  return {finish:finish.H,configurationCritical:finish.C>finish.D};
}
function random(seed: number) {
  let state=seed>>>0;
  return ()=>{state=(state+0x6D2B79F5)>>>0;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
export function triangular(u:number,low:number,mode:number,high:number) {
  if(u<0||u>1||!Number.isFinite(u)||!(low<high&&low<=mode&&mode<=high))throw Error('Invalid triangular input');
  const cut=(mode-low)/(high-low);
  return u<cut?low+Math.sqrt(u*(high-low)*(mode-low)):high-Math.sqrt((1-u)*(high-low)*(high-mode));
}
export function percentile(sorted:number[],q:number) {
  if(!sorted.length||q<0||q>1)throw Error('Invalid percentile');
  const i=(sorted.length-1)*q,lo=Math.floor(i),hi=Math.ceil(i);
  return sorted[lo]+(sorted[hi]-sorted[lo])*(i-lo);
}
export function scheduleSample(mode:RiskMode,runs=20000) {
  if(!['none','shared','separate'].includes(mode)||!Number.isInteger(runs)||runs<1)throw Error('Invalid scenario');
  const rng=random(20261021),finishes:number[]=[];let configurationCritical=0,bothEvents=0;
  for(let i=0;i<runs;i++) {
    // Draw all four uniforms in every scenario so comparisons retain the same base samples.
    const c=triangular(rng(),6,8,16),d=triangular(rng(),9,12,21),u=rng(),v=rng();
    const bDelay=mode!=='none'&&u<.2?4:0;
    const dDelay=mode==='shared'?(u<.2?4:0):mode==='separate'?(v<.2?4:0):0;
    if(bDelay&&dDelay)bothEvents++;
    const r=finishNetwork({B:10+bDelay,C:c,D:d+dDelay});
    finishes.push(r.finish);if(r.configurationCritical)configurationCritical++;
  }
  finishes.sort((a,b)=>a-b);
  return {mode,runs,seed:20261021,finishes,p50:percentile(finishes,.5),p80:percentile(finishes,.8),configurationCritical:configurationCritical/runs,bothEvents:bothEvents/runs};
}
export function shareByDeadline(sorted:number[],deadline:number) {
  if(!Number.isFinite(deadline))throw Error('Invalid deadline');
  let l=0,r=sorted.length;
  while(l<r){const m=(l+r)>>>1;if(sorted[m]<=deadline)l=m+1;else r=m;}
  return l/sorted.length;
}
