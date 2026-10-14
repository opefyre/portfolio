export const stockLots=[
 {id:'A',received:'2026-10-01',expiry:'2026-12-31',quantity:40,status:'Released'},
 {id:'B',received:'2026-10-08',expiry:'2026-10-31',quantity:40,status:'Released'},
 {id:'C',received:'2026-10-12',expiry:'2026-11-30',quantity:40,status:'Released'},
 {id:'D',received:'2026-10-10',expiry:'2026-10-20',quantity:20,status:'Quality hold'},
 {id:'E',received:'2026-09-25',expiry:'2026-10-10',quantity:10,status:'Expired'}
] as const;
export type RotationPolicy='FIFO'|'FEFO';
export const useDate='2026-10-14';
export function remainingDays(expiry:string){return (Date.parse(expiry+'T00:00:00Z')-Date.parse(useDate+'T00:00:00Z'))/86400000;}
export function stockPick(policy:RotationPolicy,requested:number,minDays:number){
 if(!Number.isInteger(requested)||requested<0||!Number.isInteger(minDays)||minDays<0)throw new Error('Non-negative whole quantities and days required.');
 const rows=stockLots.map(l=>({...l,days:remainingDays(l.expiry),eligible:l.status==='Released'&&remainingDays(l.expiry)>=minDays}));
 const ordered=rows.filter(l=>l.eligible).sort((a,b)=>(policy==='FIFO'?a.received.localeCompare(b.received):a.expiry.localeCompare(b.expiry))||a.received.localeCompare(b.received)||a.id.localeCompare(b.id));
 let need=requested;const picks=ordered.map(l=>{const picked=Math.min(need,l.quantity);need-=picked;return {...l,picked};});
 return {policy,requested,eligible:ordered.reduce((s,l)=>s+l.quantity,0),unfilled:need,picks:picks.filter(l=>l.picked>0),rows:rows.map(l=>({...l,picked:picks.find(p=>p.id===l.id)?.picked||0,remaining:l.quantity-(picks.find(p=>p.id===l.id)?.picked||0)}))};
}
export const failureModes=[{id:'orientation',label:'Reversed cover'},{id:'washer',label:'Missing washer'},{id:'grade',label:'Wrong material grade'}] as const;
export type FailureMode=typeof failureModes[number]['id'];
export type ControlOutcome='detect'|'prevent'|'stop'|'none';
export const qualityControls=[
 {id:'inspection',name:'Final visual check',outcomes:{orientation:'detect',washer:'none',grade:'none'}},
 {id:'nest',name:'Keyed locating nest',outcomes:{orientation:'prevent',washer:'none',grade:'none'}},
 {id:'presence',name:'Washer interlock',outcomes:{orientation:'none',washer:'stop',grade:'none'}}
] as const;
export const outcomeLabels:Record<ControlOutcome,string>={detect:'Flags after assembly',prevent:'Blocks wrong loading',stop:'Stops before fastening',none:'Not checked'};
export function controlCoverage(mode:FailureMode){return qualityControls.map(c=>({...c,outcome:c.outcomes[mode],label:outcomeLabels[c.outcomes[mode]]}));}
export function rolloutWindow(stations:number,minutes:number){
 if(!Number.isInteger(stations)||stations<1||!Number.isFinite(minutes)||minutes<=0)throw new Error('A positive station count and duration are required.');
 const stationHours=stations*minutes/60,totalHours=stationHours+2;
 return {stations,minutes,setup:1,stationHours,finalChecks:1,totalHours,window:8,overrun:Math.max(0,totalHours-8),fits:totalHours<=8,remaining:12-stations};
}
export const rolloutReferences=[rolloutWindow(12,30),rolloutWindow(12,45),rolloutWindow(12,60),rolloutWindow(8,45)];
