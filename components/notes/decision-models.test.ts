import {test} from 'node:test';
import assert from 'node:assert/strict';
import {orderStrategies,orderTiming,quotePeriods,quoteSummary,recoveryDays,recoveryTiming} from './decision-models';
test('Prepared stock removes earlier work from customer response, not the route',()=>{
 assert.deepEqual(orderStrategies.map(s=>orderTiming(s,0).dispatch),[1,3,7]);
 assert.deepEqual(orderStrategies.map(s=>orderTiming(s,2).dispatch),[1,5,9]);
 for(const strategy of orderStrategies)for(let queue=0;queue<=4;queue++){
  const r=orderTiming(strategy,queue);assert.deepEqual(r.stages.map(s=>s.end-s.start),[4,2,1]);
  assert.equal(r.stages[0].end,r.stages[1].start-(strategy==='ATO'?queue:0));
  assert.equal(r.stages[1].end,r.stages[2].start);
 }
 assert.equal(orderTiming('ATO',0).meetsRequest,true);assert.equal(orderTiming('ATO',1).meetsRequest,false);
 assert.equal(orderTiming('MTO',0).meetsRequest,false);assert.throws(()=>orderTiming('ATO',-1));
});
test('Quote totals reconcile and the improved pilot misses the predeclared target',()=>{
 const [a,b]=quotePeriods.map(quoteSummary);
 assert.deepEqual([a.late,a.onTime,b.late,b.onTime],[10,20,4,26]);
 assert.ok(Math.abs(a.lateRate-b.lateRate-20)<1e-9);
 assert.equal(b.targetMet,false);assert.equal(b.incorrect,0);
 assert.equal(quoteSummary({...quotePeriods[1],dimensionLate:0}).targetMet,true);
 assert.equal(quoteSummary({...quotePeriods[1],dimensionLate:0,incorrect:1}).targetMet,false);
});
test('A missed milestone persists across recovery forecasts; test delay is separate',()=>{
 assert.deepEqual(recoveryDays.map(d=>{const r=recoveryTiming(d);return[r.testStart,r.laterBy,r.missedMilestone]}),[[8,0,true],[9,1,true],[11,3,true]]);
 assert.equal(recoveryTiming(8).testStart,8);assert.throws(()=>recoveryTiming(6));assert.throws(()=>recoveryTiming(NaN));
});
