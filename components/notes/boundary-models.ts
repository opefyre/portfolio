export type PromiseBasis='original'|'revised';
export type DeliveryOrder={id:number;required:number;accepted:number;receipt:number;windowStart:number;originalEnd:number;revisedEnd?:number;revisionRecorded?:number};
export const deliveryOrders:DeliveryOrder[]=Array.from({length:10},(_,i)=>({id:101+i,required:100,accepted:i===6||i===7?80:100,receipt:i<8?770:840,windowStart:480,originalEnd:780,...(i>=8?{revisedEnd:840,revisionRecorded:720}:{})}));
export function assessDelivery(order:DeliveryOrder,basis:PromiseBasis,review=1020){
 const end=basis==='revised'?(order.revisedEnd??order.originalEnd):order.originalEnd;
 const recorded=order.receipt<=review;
 const onTime=recorded&&order.receipt>=order.windowStart&&order.receipt<=end;
 const inFull=recorded&&order.accepted>=order.required;
 return {...order,end,onTime,inFull,otif:onTime&&inFull};
}
export function deliverySummary(orders:DeliveryOrder[],basis:PromiseBasis,review=1020){
 const rows=orders.map(o=>assessDelivery(o,basis,review));
 const both=rows.filter(o=>o.otif),timeOnly=rows.filter(o=>o.onTime&&!o.inFull),fullOnly=rows.filter(o=>!o.onTime&&o.inFull),neither=rows.filter(o=>!o.onTime&&!o.inFull);
 const total=rows.length,rate=(n:number)=>total?100*n/total:null;
 return {rows,total,groups:[both,timeOnly,fullOnly,neither],onTime:rate(both.length+timeOnly.length),inFull:rate(both.length+fullOnly.length),otif:rate(both.length),received:rows.reduce((s,o)=>s+(o.receipt<=review?Math.min(o.accepted,o.required):0),0),onTimeUnits:rows.reduce((s,o)=>s+(o.onTime?Math.min(o.accepted,o.required):0),0)};
}
export function receiptClock(minutes:number){return `${Math.floor(minutes/60).toString().padStart(2,'0')}:${(minutes%60).toString().padStart(2,'0')}`;}
export const dependencyTypes=['FS','SS','FF','SF'] as const;
export type DependencyType=typeof dependencyTypes[number];
export function dependencyWindow(type:DependencyType,lag:number,aStart=4,aDuration=6,bDuration=3,notBefore=0){
 if (![lag,aStart,aDuration,bDuration,notBefore].every(Number.isFinite)||lag<0||aDuration<=0||bDuration<=0)throw new Error('Use finite dates, positive durations and a non-negative lag.');
 const aFinish=aStart+aDuration;
 const controlling=type[0]==='F'?aFinish:aStart;
 const bStart=Math.max(notBefore,controlling+lag-(type[1]==='F'?bDuration:0));
 return {type,lag,aStart,aFinish,bStart,bFinish:bStart+bDuration,controlling,requiredEndpoint:controlling+lag};
}
