export type OrderStrategy='MTS'|'ATO'|'MTO';
export const orderStrategies:OrderStrategy[]=['MTS','ATO','MTO'];
export function orderTiming(strategy:OrderStrategy,queue:number){
 if(!Number.isFinite(queue)||queue<0)throw new Error('Queue must be a non-negative number of working days.');
 const stages=strategy==='MTS'?[{name:'Fabricate',code:'F',start:-6,end:-2},{name:'Assemble',code:'A',start:-2,end:0},{name:'Check, pack, dispatch',code:'P',start:0,end:1}]:strategy==='ATO'?[{name:'Fabricate',code:'F',start:-4,end:0},{name:'Assemble',code:'A',start:queue,end:queue+2},{name:'Check, pack, dispatch',code:'P',start:queue+2,end:queue+3}]:[{name:'Fabricate',code:'F',start:queue,end:queue+4},{name:'Assemble',code:'A',start:queue+4,end:queue+6},{name:'Check, pack, dispatch',code:'P',start:queue+6,end:queue+7}];
 const dispatch=stages[2].end;
 return {strategy,stages,queue:strategy==='MTS'?0:queue,dispatch,meetsRequest:dispatch<=3};
}
export const quotePeriods=[{name:'Baseline',total:30,dimensionLate:7,approvalLate:3,incorrect:0},{name:'Pilot',total:30,dimensionLate:1,approvalLate:3,incorrect:0}];
export function quoteSummary(period:typeof quotePeriods[number]){
 const late=period.dimensionLate+period.approvalLate;
 return {...period,late,onTime:period.total-late,lateRate:100*late/period.total,targetMet:late<=3&&period.incorrect===0};
}
export const recoveryDays=[7,9,11];
export function recoveryTiming(usableDay:number){
 if(!Number.isFinite(usableDay)||usableDay<7)throw new Error('Recovery must be at or after the beginning of day 7.');
 const testStart=Math.max(8,usableDay);
 return {usableDay,plannedStart:8,testStart,laterBy:testStart-8,missedMilestone:true};
}
