export const countBins = [
  {bin:'A',before:100,counted:100,after:100},
  {bin:'B',before:50,counted:45,after:45},
  {bin:'C',before:20,counted:25,after:25},
  {bin:'D',before:10,counted:10,after:10},
  {bin:'E',before:0,counted:0,after:0},
] as const;
export function cycleCount(reconciled:boolean) {
  const rows=countBins.map(r=>({...r,system:reconciled?r.after:r.before,variance:r.counted-(reconciled?r.after:r.before)}));
  const matching=rows.filter(r=>r.variance===0).length;
  return {rows,matching,checked:rows.length,accuracy:100*matching/rows.length,systemTotal:rows.reduce((n,r)=>n+r.system,0),countedTotal:rows.reduce((n,r)=>n+r.counted,0),net:rows.reduce((n,r)=>n+r.variance,0)};
}
export const qualityBaseline={prevention:300,appraisal:200,internal:600,external:900} as const;
export function qualityCost(failure:number) {
  if(!Number.isFinite(failure)||failure<0) throw new RangeError('Failure cost must be a finite, non-negative amount.');
  const baseline=qualityBaseline.prevention+qualityBaseline.appraisal+qualityBaseline.internal+qualityBaseline.external;
  const prevention=600,appraisal=200,total=prevention+appraisal+failure;
  return {baseline,prevention,appraisal,failure,total,difference:baseline-total,breakEvenFailure:baseline-prevention-appraisal,baselineCopq:qualityBaseline.internal+qualityBaseline.external};
}
export const inventorySource=[{item:'A',quantity:2,unit:'cases'},{item:'B',quantity:5,unit:'pieces'},{item:'C',quantity:null,unit:'pieces'}] as const;
export function preparedStock(packSize:number|null) {
  if(packSize!==null&&(!Number.isFinite(packSize)||packSize<=0))throw new RangeError('Pack size must be positive or explicitly unknown.');
  const rows=inventorySource.map(r=> {
    if(r.quantity===null)return {...r,pieces:null,reason:'Quantity unknown'};
    if(r.unit==='cases'&&packSize===null)return {...r,pieces:null,reason:'Pack reference missing'};
    return {...r,pieces:r.unit==='cases'?r.quantity*packSize!:r.quantity,reason:r.unit==='cases'?`${r.quantity} cases × ${packSize} pieces per case`:'Already in pieces'};
  });
  const ready=rows.filter(r=>r.pieces!==null).length;
  return {rows,extracted:rows.length,ready,unresolved:rows.length-ready,etlTargetLoaded:ready,eltRawLoaded:rows.length};
}
