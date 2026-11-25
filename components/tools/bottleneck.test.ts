import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scheduleFlow} from './batch-flow-model';
test('bottleneck upgrades separate startup gains from sustained pace',()=>{
 const base=[1,3,1];assert.equal(scheduleFlow(1,base).finish,32);
 for(const step of [0,1,2]){
  const times=base.map((t,i)=>i===step?t/2:t),s=scheduleFlow(1,times);
  assert.equal(s.finish,step===1?17:31.5);
  for(let i=1;i<10;i++)assert.equal(s.completions[i]-s.completions[i-1],Math.max(...times));
 }
});
test('queue opening snapshot equals its full-run chart',async()=>{
 const {queueSchedule,queueSnapshot,queuePlot}=await import('./queue-capacity-model');
 for(const group of [1,2,4] as const){const s=queueSchedule(10,5,group);assert.equal(queueSnapshot(s,0).waiting,queuePlot(s,s.finish)[0].waiting);}
});
