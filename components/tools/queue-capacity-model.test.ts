import {test} from 'node:test';
import assert from 'node:assert/strict';
import {queueSchedule,queueSnapshot,queuePlot,queueSlot} from './queue-capacity-model';
test('default comparison: same ten jobs and work, different waits',()=>{
 const even=queueSchedule(10,5,1),burst=queueSchedule(10,5,4);
 assert.equal(even.finish,59);assert.equal(even.maxWait,0);assert.equal(burst.finish,64);assert.equal(burst.maxWait,15);
 assert.equal(even.jobs.length,burst.jobs.length);
 assert.equal(even.jobs[9].arrival,burst.jobs[9].arrival);
 assert.equal(even.jobs.reduce((n,j)=>n+j.finish-j.start,0),50);
 assert.equal(burst.jobs.reduce((n,j)=>n+j.finish-j.start,0),50);
 assert.deepEqual(queueSnapshot(burst,0),{arrived:4,waiting:3,completed:0,busy:true,longestWait:0});
 assert.equal(queueSnapshot(burst,.1).waiting,3);
});
test('jobs are conserved and the workbench never overlaps jobs',()=>{
 for(const n of [6,8,10,12,15])for(const minutes of [3,4,5,6,8])for(const group of [1,2,4] as const){
  const s=queueSchedule(n,minutes,group);
  s.jobs.forEach((j,i)=>{assert.ok(j.start>=j.arrival);assert.ok(Math.abs(j.finish-j.start-minutes)<1e-9);if(i)assert.ok(j.start>=s.jobs[i-1].finish);});
  for(let t=.1;t<=s.finish+1;t+=.5){const q=queueSnapshot(s,t);assert.equal(q.arrived,q.waiting+q.completed+Number(q.busy));assert.ok(q.longestWait>=0);}
  assert.equal(queueSnapshot(s,s.finish).completed,n);
  assert.equal(queuePlot(s,s.finish).at(-1)?.waiting,0);
 }
});
test('capacity overload also queues evenly spaced arrivals',()=>assert.ok(queueSchedule(15,5,1).maxWait>0));
test('fixed slots are unique for up to fifteen jobs',()=>assert.equal(new Set(Array.from({length:15},(_,i)=>JSON.stringify(queueSlot(i)))).size,15));
test('reject unsupported inputs',()=>{assert.throws(()=>queueSchedule(0,5,1));assert.throws(()=>queueSchedule(10,0,1));});
