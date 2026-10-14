export const inventoryCases=[
 {label:'Baseline',cogs:1200000,average:200000},
 {label:'Less stock, same activity',cogs:1200000,average:150000},
 {label:'Less stock, lower activity',cogs:900000,average:150000}
];
export function inventoryRatios(cogs:number,average:number,days=365){
 if(![cogs,average,days].every(Number.isFinite)||cogs<=0||average<=0||days<=0)throw new Error('Positive finite cost, average stock and period required.');
 const turns=cogs/average;
 return {cogs,average,turns,days:days/turns};
}
export const readinessOrders=Array.from({length:10},(_,i)=>({id:201+i,ready:i<6,onTime:![5,9].includes(i)}));
export type ReadinessGroup='all'|'ready'|'not-ready';
export function readinessSummary(group:ReadinessGroup){
 const rows=readinessOrders.filter(o=>group==='all'||(group==='ready'?o.ready:!o.ready));
 return {rows,total:rows.length,ready:rows.filter(o=>o.ready).length,onTime:rows.filter(o=>o.onTime).length,late:rows.filter(o=>!o.onTime).length};
}
export const acceptanceCases=[
 {id:'full',label:'Full shipment',requested:100,available:100,picks:1,shipped:100,expectedOpen:0,visibleOpen:0,packing:'Complete',transferPass:true,acceptancePass:true,explanation:'One order, 100 units shipped, no balance due. The listed transfer checks and the full-shipment acceptance criterion pass.'},
 {id:'partial',label:'Partial shipment',requested:100,available:40,picks:1,shipped:40,expectedOpen:60,visibleOpen:null,packing:'Complete',transferPass:true,acceptancePass:false,explanation:'The request, available quantity and 60-unit backorder transfer correctly, once. The service view omits the open balance and the packing record says complete. The partial-shipment criterion fails.'},
 {id:'duplicate',label:'Duplicate message',requested:100,available:100,picks:2,shipped:0,expectedOpen:100,visibleOpen:100,packing:'Not dispatched',transferPass:false,acceptancePass:false,explanation:'A retry with the same order ID creates a second pick order. That fails the single-order integration rule and the business requirement to avoid duplicate picking. No goods have shipped in this case.'}
] as const;
