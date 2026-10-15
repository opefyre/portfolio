export type GageCase = 'operators' | 'repeats' | 'bias';
export type Reading = { part: number; operator: string; trial: number; reference: number; value: number };
const parameters = {
  operators: { offset:20, repeat:5, bias:0 },
  repeats: { offset:0, repeat:20, bias:0 },
  bias: { offset:0, repeat:5, bias:30 },
};
/** Construct in integer micrometres; return millimetres for the article. */
export function gageReadings(mode:GageCase):Reading[] {
  const p=parameters[mode];
  return [9900,10000,10100].flatMap((reference,i)=>['A','B','C'].flatMap((operator,j)=>[-1,0,1].map((repeat,k)=>({part:i+1,operator,trial:k+1,reference:reference/1000,value:(reference+(j-1)*p.offset+repeat*p.repeat+p.bias)/1000}))));
}
const mean=(values:number[])=>values.reduce((s,x)=>s+x,0)/values.length;
export function gageSummary(readings:Reading[]) {
  const keys=[...new Set(readings.map(r=>`${r.part}/${r.operator}`))];
  let squares=0,df=0;
  for(const key of keys){const values=readings.filter(r=>`${r.part}/${r.operator}`===key).map(r=>r.value),m=mean(values);squares+=values.reduce((s,x)=>s+(x-m)**2,0);df+=values.length-1;}
  const operatorMeans=['A','B','C'].map(operator=>({operator,mean:mean(readings.filter(r=>r.operator===operator).map(r=>r.value))}));
  return {repeatSD:Math.sqrt(squares/df),operatorMeans,operatorRange:Math.max(...operatorMeans.map(r=>r.mean))-Math.min(...operatorMeans.map(r=>r.mean)),meanReferenceError:mean(readings.map(r=>r.value-r.reference)),degreesOfFreedom:df};
}

export function consignmentExample(withdrawn:number) {
  if(!Number.isInteger(withdrawn)||withdrawn<0||withdrawn>1000)throw new Error('Withdrawal must be 0 to 1,000 whole pieces');
  const remaining=1000-withdrawn;
  return {remaining,requested:remaining<=700?1000-remaining:0,consignedInvoice:withdrawn*2,nonConsignedInvoice:2000,supplierRetainedValue:remaining*2};
}
