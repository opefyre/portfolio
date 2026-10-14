export function positionTimeline(receiptDay:1|3){
 const onHand=20,onOrder=50,oldBackorders=10,openingPosition=onHand+onOrder-oldBackorders;
 let net=onHand-oldBackorders;
 const rows=[{day:0,receipt:0,newDemand:0,net,onHand:Math.max(net,0),backorders:Math.max(-net,0)}];
 for(let day=1;day<=3;day++){
  const receipt=day===receiptDay?onOrder:0,newDemand=day<=2?10:0;net+=receipt-newDemand;
  rows.push({day,receipt,newDemand,net,onHand:Math.max(net,0),backorders:Math.max(-net,0)});
 }
 return {receiptDay,openingPosition,rows};
}
export const plannedSeconds=450*60;
export function stationPace(demand:number,trial:boolean){
 if(!Number.isFinite(demand)||demand<=0)throw new RangeError('Demand must be a positive finite number.');
 const takt=plannedSeconds/demand,stations=[{name:'A',seconds:55},{name:'B',seconds:trial?60:75},{name:'C',seconds:50}];
 const slowest=Math.max(...stations.map(s=>s.seconds)),capacity=plannedSeconds/slowest;
 return {demand,takt,stations,slowest,capacity,gap:Math.max(0,demand-capacity),above:stations.filter(s=>s.seconds>takt).map(s=>s.name)};
}
export const resourcePlans=[
 {id:'early',name:'Earliest dates',aStart:0,aEnd:4,bStart:0,bEnd:2},
 {id:'float',name:'Move within float',aStart:0,aEnd:4,bStart:2,bEnd:4},
 {id:'serial',name:'One-person sequence',aStart:0,aEnd:4,bStart:4,bEnd:6},
] as const;
export function resourceLoads(engineers:1|2){
 return resourcePlans.map(p=>{
  const daily=Array.from({length:6},(_,d)=>({day:d,required:Number(d>=p.aStart&&d<p.aEnd)+Number(d>=p.bStart&&d<p.bEnd)}));
  const finish=Math.max(p.aEnd,p.bEnd),overloadDays=daily.filter(d=>d.required>engineers).length;
  return {...p,daily,finish,engineerDays:daily.reduce((n,d)=>n+d.required,0),peak:Math.max(...daily.map(d=>d.required)),overloadDays,fits:overloadDays===0,delay:Math.max(0,finish-4)};
 });
}
