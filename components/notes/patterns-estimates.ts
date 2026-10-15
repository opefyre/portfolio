export const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const seasonal=[-20,-15,-10,0,5,10,15,20,10,0,-5,-10];
const irregular=[0,2,-2,0,1,-1,0,2,-2,0,1,-1,0,-2,2,0,-1,1,0,28,-2,0,-1,1];
export const DEMAND=irregular.map((remainder,i)=>({label:`${MONTHS[i%12]}, year ${Math.floor(i/12)+1}`,trend:100+2*i,seasonal:seasonal[i%12],remainder,observed:100+2*i+seasonal[i%12]+remainder}));
export function rolloutEstimate(stations:8|12,extraTesting:boolean){
 const riskScenario=extraTesting?1800:0;
 const analogousRows:[string,number][]=[['Earlier eight-station rollout',18000],['New security review',1200],['Additional stations at €1,500',(stations-8)*1500]];
 const parametricRows:[string,number][]=[['Common setup, including security',6500],[`${stations} stations at €1,550`,stations*1550]];
 const bottomUpRows:[string,number][]=[['Hardware at €1,200 per station',1200*stations],['Installation at €300 per station',300*stations],['Configuration',2600],['Acceptance testing',1800],['Training',1000],['Coordination',1600],['Security review',1200]];
 return [
  {name:'Analogous',basis:'Adjust a comparable rollout',rows:analogousRows},
  {name:'Parametric',basis:'Apply the cost model',rows:parametricRows},
  {name:'Bottom-up',basis:'Add the work packages',rows:bottomUpRows},
 ].map(m=>({...m,base:m.rows.reduce((s,[,v])=>s+v,0),extra:riskScenario,total:m.rows.reduce((s,[,v])=>s+v,0)+riskScenario}));
}
