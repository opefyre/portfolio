export type LineSnapshot={asOf:number;queue:number;rate:number};
export const lineScenes=[
 {label:"12:00 checked state",now:720,actual:{asOf:720,queue:180,rate:1.5},linked:{asOf:720,queue:180,rate:1.5}},
 {label:"12:30 slowdown",now:750,actual:{asOf:750,queue:150,rate:1},linked:{asOf:750,queue:150,rate:1}},
 {label:"12:30 delayed link",now:750,actual:{asOf:750,queue:150,rate:1},linked:{asOf:720,queue:180,rate:1.5}},
] as const;
export const plannedLine:LineSnapshot={asOf:720,queue:120,rate:2};
export function completionForecast(s:LineSnapshot){
 if(!Number.isFinite(s.asOf)||!Number.isFinite(s.queue)||!Number.isFinite(s.rate)||s.queue<0||s.rate<=0)throw new RangeError("Use a valid snapshot, non-negative queue and positive output rate.");
 return s.asOf+s.queue/s.rate;
}
export function snapshotAge(now:number,s:LineSnapshot){if(!Number.isFinite(now)||now<s.asOf)throw new RangeError("Observation cannot be later than the decision time.");return now-s.asOf;}
export function clockTime(minutes:number){const rounded=Math.round(minutes);return `${Math.floor(rounded/60).toString().padStart(2,'0')}:${(rounded%60).toString().padStart(2,'0')}`;}
export const servicePresets=[
 {label:"One shortage of 10",short:[0,0,0,0,10]},
 {label:"Two short every cycle",short:[2,2,2,2,2]},
 {label:"One shortage of 2",short:[0,0,0,0,2]},
] as const;
export function serviceMetrics(demand:readonly number[],short:readonly number[]){
 if(demand.length!==short.length)throw new RangeError("Every cycle needs demand and shortage quantities.");
 if(demand.some((d,i)=>!Number.isInteger(d)||d<=0||!Number.isInteger(short[i])||short[i]<0||short[i]>d))throw new RangeError("Cycles require positive integer demand and shortages between zero and demand.");
 const units=demand.reduce((a,b)=>a+b,0),unfilled=short.reduce((a,b)=>a+b,0),goodCycles=short.filter(s=>s===0).length;
 return {units,unfilled,filled:units-unfilled,cycles:demand.length,goodCycles,csl:demand.length?100*goodCycles/demand.length:null,fill:units?100*(units-unfilled)/units:null};
}
export type YieldPattern="repeat"|"separate";
export function unitHistory(pattern:YieldPattern){
 return Array.from({length:100},(_,i)=>{const unit=i+1;const failures=[0,1,2].filter(step=>pattern==='repeat'?unit<=10:unit>step*10&&unit<=(step+1)*10);return {unit,failures,accepted:true};});
}
export function yieldSummary(pattern:YieldPattern){
 const units=unitHistory(pattern),stepPasses=[0,1,2].map(step=>units.filter(u=>!u.failures.includes(step)).length),untouched=units.filter(u=>u.failures.length===0).length;
 return {units,stepPasses,untouched,affected:100-untouched,corrections:units.reduce((n,u)=>n+u.failures.length,0),finalAccepted:units.filter(u=>u.accepted).length,rateProduct:stepPasses.reduce((p,n)=>p*n/100,1)*100};
}
