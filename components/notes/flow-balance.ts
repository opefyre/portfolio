export function poolingModel(rho:number){
 if(!Number.isFinite(rho)||rho<-.5||rho>1)throw new Error('Correlation outside teaching range');
 const z=1.645,sigma=20,local=z*sigma,separate=2*local,combinedSigma=sigma*Math.sqrt(2+2*rho),pooled=z*combinedSigma;
 const u=[1,-1,1,-1,1,-1,1,-1],v=[1,1,-1,-1,1,1,-1,-1];
 const days=u.map((x,i)=>{const north=100+20*x,south=100+20*(rho*x+Math.sqrt(1-rho*rho)*v[i]);return {day:i+1,north,south,total:north+south};});
 return {rho,local,separate,combinedSigma,pooled,separateRounded:2*Math.ceil(local),pooledRounded:Math.ceil(pooled),reduction:100*(1-pooled/separate),days};
}
export const WITHDRAWALS=[140,60,160,80,60];
export const WEEKDAYS=['Monday','Tuesday','Wednesday','Thursday','Friday'];
export function heijunkaModel(opening:number){
 if(!Number.isInteger(opening)||opening<0||opening>100)throw new Error('Opening stock outside teaching range');
 let physical=opening,backlog=0,fulfilled=0,cumulativeDemand=0;
 const days=WITHDRAWALS.map((demand,i)=>{const produced=100,available=physical+produced,need=backlog+demand,served=Math.min(available,need);physical=available-served;backlog=need-served;fulfilled+=served;cumulativeDemand+=demand;return {day:WEEKDAYS[i],demand,produced,net:physical-backlog,physical,backlog,fulfilled,cumulativeDemand,cumulativeProduction:100*(i+1),followingOutput:demand,followingStock:opening};});
 let deficit=0;const minimumOpening=Math.max(0,...WITHDRAWALS.map(d=>deficit+=d-100));
 return {opening,minimumOpening,days,firstShortage:days.find(d=>d.backlog>0)??null};
}
export const STOCK_EVENTS=[
 {id:'E1',delta:-30,event:120,arrival:130,duplicate:false},
 {id:'E2',delta:-20,event:240,arrival:420,duplicate:false},
 {id:'E1',delta:-30,event:120,arrival:300,duplicate:true},
 {id:'E3',delta:10,event:360,arrival:370,duplicate:false},
];
export function clockLabel(seconds:number){const s=Math.round(seconds);return `09:${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;}
function acceptedBalance(accept:(e:typeof STOCK_EVENTS[number])=>boolean){const seen=new Set<string>();let balance=100;const applied:typeof STOCK_EVENTS=[];for(const e of [...STOCK_EVENTS].sort((a,b)=>a.arrival-b.arrival)){if(accept(e)&&!seen.has(e.id)){seen.add(e.id);balance+=e.delta;applied.push(e);}}return {balance,applied};}
export function freshnessModel(seconds:number,interval:5|15){
 if(!Number.isInteger(seconds)||seconds<0||seconds>960)throw new Error('Decision time outside teaching range');
 const source=acceptedBalance(e=>e.event<=seconds),stream=acceptedBalance(e=>e.arrival+10<=seconds),cutoff=Math.max(0,Math.floor((seconds-30)/(interval*60))*interval*60),batch=acceptedBalance(e=>e.arrival<=cutoff);
 const missing=source.applied.filter(e=>!stream.applied.some(s=>s.id===e.id)).map(e=>e.id);
 return {source:source.balance,stream:stream.balance,batch:batch.balance,cutoff,batchPublished:cutoff===0?0:cutoff+30,streamIds:stream.applied.map(e=>e.id),missing,latestStreamEvent:stream.applied.length?Math.max(...stream.applied.map(e=>e.event)):null};
}
