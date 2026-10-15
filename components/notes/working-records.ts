export function cashCycle(dso:number,dpo:number){
 const days=365,cogs=730000,sales=1095000,purchases=730000,inventory=120000;
 const dio=inventory/(cogs/days),collect=dio+dso,pay=dpo,ccc=collect-pay;
 return {days,cogs,sales,purchases,inventory,dio,dso,dpo,collect,pay,ccc,receivables:dso*sales/days,payables:dpo*purchases/days};
}
export const CONTAINMENT_COHORTS=[{name:'Returned lot',units:1000,failed:20,conforming:980},{name:'Plant stock',units:600,failed:8,conforming:592}];
export function eightDVerification(failedLot=false){
 const lots=[{id:'V1',day:7,units:1000,failed:0},{id:'V2',day:10,units:1000,failed:failedLot?1:0},{id:'V3',day:14,units:1000,failed:0}];
 return {lots,originalUnits:1600,originalFailed:28,originalConforming:1572,verificationUnits:3000,verificationFailed:lots.reduce((v,l)=>v+l.failed,0),reviewCanProceed:!failedLot,proposedReviewDay:15};
}
export type StockRecord={item:string;physical:number;held:number;allocated:number;pickable:number};
const stock=(item:string,physical:number,held:number,allocated:number):StockRecord=>({item,physical,held,allocated,pickable:physical-held-allocated});
export function migrationReconciliation(correctMapping=false,includeFinal=true){
 const source=[stock('P01',110,10,20),stock('P02',80,20,0),stock('P03',50,0,10)];
 const target=correctMapping?[stock('P01',120,10,20),stock('P02',80,20,0),stock('P03',50,0,10)]:[stock('P01',120,0,20),stock('P02',100,20,0),stock('P03',30,0,10)];
 if(includeFinal)target[0]=stock('P01',target[0].physical-10,target[0].held,target[0].allocated);
 const fields=['physical','held','allocated'] as const;
 const mismatches=source.map((s,i)=>({item:s.item,fields:fields.filter(k=>s[k]!==target[i][k])})).filter(d=>d.fields.length);
 return {source,target,mismatches,sourceTotal:source.reduce((v,s)=>v+s.physical,0),targetTotal:target.reduce((v,s)=>v+s.physical,0),sourcePickable:source.reduce((v,s)=>v+s.pickable,0),targetPickable:target.reduce((v,s)=>v+s.pickable,0)};
}
