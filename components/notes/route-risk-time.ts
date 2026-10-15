export const minuteLabel = (t:number) => `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
export type DockStep={name:string;start:number;end:number;kind:'work'|'wait'};
export function crossdockModel(arrival:number,held=false){
 const cutoff=660,departure=675,release=held?null:arrival+40;
 const common:DockStep[]=[{name:'Unload',start:arrival,end:arrival+20,kind:'work'},{name:held?'Receiving checks; release pending':'Receiving checks and release',start:arrival+20,end:arrival+40,kind:'work'}];
 const cross:DockStep[]=[...common],store:DockStep[]=[...common];
 if(release!==null){
  cross.push({name:'Stage outbound',start:release,end:release+10,kind:'work'},{name:'Load',start:release+10,end:release+30,kind:'work'});
  store.push({name:'Put away',start:release,end:release+20,kind:'work'});
  const pickStart=Math.max(release+20,600);
  if(pickStart>release+20)store.push({name:'Wait for pick team',start:release+20,end:pickStart,kind:'wait'});
  store.push({name:'Pick from storage',start:pickStart,end:pickStart+30,kind:'work'},{name:'Load',start:pickStart+30,end:pickStart+50,kind:'work'});
 }
 const route=(steps:DockStep[])=>{const ready=release===null?null:steps.at(-1)!.end;return {steps,ready,margin:ready===null?null:cutoff-ready,meets:ready===null?false:ready<=cutoff,work:steps.filter(s=>s.kind==='work').reduce((v,s)=>v+s.end-s.start,0),wait:steps.filter(s=>s.kind==='wait').reduce((v,s)=>v+s.end-s.start,0)};};
 return {arrival,release,cutoff,departure,cross:route(cross),store:route(store)};
}

function logChoose(n:number,k:number){
 if(k<0||k>n)return -Infinity;
 let sum=0;const m=Math.min(k,n-k);
 for(let i=1;i<=m;i++)sum+=Math.log(n-m+i)-Math.log(i);
 return sum;
}
/** Exact finite-lot model, evaluated in log space. D counts nonconforming units. */
export function acceptanceProbability(N:number,D:number,n:number,c:number){
 if(![N,D,n,c].every(Number.isInteger)||N<1||D<0||D>N||n<0||n>N||c<0)throw new Error('Invalid sampling inputs');
 const lo=Math.max(0,n-(N-D)),hi=Math.min(c,n,D),den=logChoose(N,n);
 let p=0;for(let k=lo;k<=hi;k++)p+=Math.exp(logChoose(D,k)+logChoose(N-D,n-k)-den);
 return Math.max(0,Math.min(1,p));
}
export function samplingModel(n:50|100,c:0|1|2,D:number){
 const points=Array.from({length:31},(_,i)=>({D:i*5,percent:i/2,selected:acceptanceProbability(1000,i*5,n,c),other:acceptanceProbability(1000,i*5,n===50?100:50,c)}));
 return {N:1000,n,c,D,accept:acceptanceProbability(1000,D,n,c),alpha:1-acceptanceProbability(1000,10,n,c),beta:acceptanceProbability(1000,100,n,c),points};
}

export type ActivityId='A'|'B'|'C'|'D'|'E';
export type CompressionMode='baseline'|'overlap'|'crash';
export const ACTIVITIES:[ActivityId,string][]=[['A','Interface design'],['B','Configuration'],['C','Site preparation'],['D','Integrated testing'],['E','Handover']];
export function compressionModel(mode:CompressionMode,rework=0,crashDays=2){
 const duration:Record<ActivityId,number>={A:4,B:mode==='crash'?8-crashDays:8+(mode==='overlap'?rework:0),C:6,D:4,E:2};
 const edges:{from:ActivityId;to:ActivityId;lag:number}[]=[{from:'A',to:'B',lag:mode==='overlap'?2:4},{from:'A',to:'C',lag:4},{from:'B',to:'D',lag:duration.B},{from:'C',to:'D',lag:6},{from:'D',to:'E',lag:4}];
 const es={} as Record<ActivityId,number>;
 for(const [id] of ACTIVITIES)es[id]=Math.max(0,...edges.filter(e=>e.to===id).map(e=>es[e.from]+e.lag));
 const finish=es.E+duration.E,ls={} as Record<ActivityId,number>;
 for(const [id] of [...ACTIVITIES].reverse())ls[id]=Math.min(finish-duration[id],...edges.filter(e=>e.from===id).map(e=>ls[e.to]-e.lag));
 const tasks=ACTIVITIES.map(([id,name])=>({id,name,duration:duration[id],start:es[id],end:es[id]+duration[id],float:ls[id]-es[id]}));
 return {mode,finish,cost:mode==='crash'?crashDays*900:mode==='overlap'?rework*600:0,saved:18-finish,tasks,controlling:tasks.find(t=>t.id==='B')!.float===0?(tasks.find(t=>t.id==='C')!.float===0?'Both branches':'Configuration branch'):'Site branch'};
}
