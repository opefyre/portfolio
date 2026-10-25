import data from './industrial-ci-data.json';

export const norris = data.norris;
export const pickObservations = data.pickMinutes.map((value,index)=>({value,day:index+1}));
export const pickMean = data.pickMinutes.reduce((s,v)=>s+v,0)/data.pickMinutes.length;
export const movingRangeMean = data.pickMinutes.slice(1).reduce((s,v,i)=>s+Math.abs(v-data.pickMinutes[i]),0)/(data.pickMinutes.length-1);
export const pickLimits = {lower:pickMean-3*movingRangeMean/1.128,upper:pickMean+3*movingRangeMean/1.128};

export function histogram(values:number[]) {
  const edges=[11.2,11.6,12,12.4,12.8,13.2];
  return edges.slice(0,-1).map((lower,i)=>({lower,upper:edges[i+1],count:values.filter(v=>v>=lower-1e-9&&(i===edges.length-2?v<=edges[i+1]+1e-9:v<edges[i+1]-1e-9)).length}));
}

export function fitLine<T extends {x:number;y:number}>(rows:T[]) {
  if(rows.length<3||rows.some(r=>!Number.isFinite(r.x)||!Number.isFinite(r.y)))throw Error('A fit needs at least three finite pairs.');
  const n=rows.length,mx=rows.reduce((s,r)=>s+r.x,0)/n,my=rows.reduce((s,r)=>s+r.y,0)/n;
  const sxx=rows.reduce((s,r)=>s+(r.x-mx)**2,0);
  if(sxx===0)throw Error('The x values must vary.');
  const slope=rows.reduce((s,r)=>s+(r.x-mx)*(r.y-my),0)/sxx,intercept=my-slope*mx;
  const fitted=rows.map(r=>({...r,fitted:intercept+slope*r.x,residual:r.y-intercept-slope*r.x}));
  const sse=fitted.reduce((s,r)=>s+r.residual**2,0),sst=rows.reduce((s,r)=>s+(r.y-my)**2,0);
  return {slope,intercept,sse,rSquared:sst===0?null:1-sse/sst,residualSD:Math.sqrt(sse/(n-2)),fitted};
}

export type DefectInputs={units:string;defective:string;defects:string;opportunities:string};
export function defectMetrics(input:DefectInputs){
  const keys=['units','defective','defects','opportunities'] as const;
  if(keys.some(k=>input[k].trim()===''))return {error:'Complete every field. A blank is not zero.',result:null};
  const [units,defective,defects,opportunities]=keys.map(k=>Number(input[k]));
  if([units,defective,defects,opportunities].some(v=>!Number.isSafeInteger(v)||v<0))return {error:'Use finite, non-negative whole numbers within the supported range.',result:null};
  if(opportunities<1)return {error:'Define at least one opportunity per unit.',result:null};
  if(!Number.isSafeInteger(units*opportunities))return {error:'The opportunity total exceeds the supported range.',result:null};
  if(defective>units)return {error:'Defective units cannot exceed units inspected.',result:null};
  if(defective>defects)return {error:'Each defective unit needs at least one counted defect in this model.',result:null};
  if(defects>defective*opportunities)return {error:'Defects exceed the opportunities on the defective units. Check the definitions and counts.',result:null};
  return {error:null,result:{units,defective,defects,opportunities,totalOpportunities:units*opportunities,dpu:units?defects/units:null,dpo:units?defects/(units*opportunities):null,dpmo:units?defects/(units*opportunities)*1e6:null,ppm:units?defective/units*1e6:null}};
}
