export type RequirementPlan={opening:number;demand:number[];scheduled:number[];receipts:number[];releases:number[];end:number[];beforeHorizon:number};
/** Lot-for-lot netting, receipts before requirements, then one-week release offset. */
function netPlan(opening:number,demand:number[],scheduled:number[]):RequirementPlan{
 let balance=opening,beforeHorizon=0;
 const receipts:number[]=[],releases=Array(demand.length).fill(0) as number[],end:number[]=[];
 demand.forEach((quantity,i)=>{const missing=Math.max(0,quantity-balance-scheduled[i]);receipts.push(missing);balance+=scheduled[i]+missing-quantity;end.push(balance);if(i>0)releases[i-1]+=missing;else beforeHorizon+=missing;});
 return {opening,demand,scheduled,receipts,releases,end,beforeHorizon};
}
export function distributionPlan(){
 const north=netPlan(40,[20,30,40,20],[0,20,0,0]);
 const south=netPlan(30,[20,20,30,30],[0,0,0,0]);
 const central=netPlan(100,north.releases.map((q,i)=>q+south.releases[i]),[0,0,0,0]);
 return {north,south,central};
}
export function distributionReplay(delayed:boolean){
 const plan=distributionPlan();
 const transfers=[{destination:'north',quantity:20,released:0,due:2},...(['north','south'] as const).flatMap(destination=>plan[destination].releases.flatMap((quantity,i)=>quantity?[{destination,quantity,released:i+1,due:delayed&&destination==='south'&&i===1?4:i+2}]:[]))];
 const northReceipts=[1,2,3,4].map(week=>transfers.filter(t=>t.destination==='north'&&t.due===week).reduce((s,t)=>s+t.quantity,0));
 const southReceipts=[1,2,3,4].map(week=>transfers.filter(t=>t.destination==='south'&&t.due===week).reduce((s,t)=>s+t.quantity,0));
 let northNet=40,southNet=30,delivered=0;
 const weeks=[1,2,3,4].map((week,i)=>{
  const previousBacklog=Math.max(0,-northNet)+Math.max(0,-southNet);
  northNet+=northReceipts[i]-plan.north.demand[i];southNet+=southReceipts[i]-plan.south.demand[i];
  const backlog=Math.max(0,-northNet)+Math.max(0,-southNet),due=plan.north.demand[i]+plan.south.demand[i];
  delivered+=due+previousBacklog-backlog;
  const inTransit=transfers.filter(t=>t.released<=week&&t.due>week).reduce((s,t)=>s+t.quantity,0);
  return {week,northNet,southNet,centralStock:plan.central.end[i],inTransit,backlog,delivered};
 });
 return {plan,northReceipts,southReceipts,weeks,transfers};
}
