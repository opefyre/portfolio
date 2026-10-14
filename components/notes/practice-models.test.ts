import test from 'node:test';
import assert from 'node:assert/strict';
import {allocationResult,allocationOptions} from './practice-models';
test('Removing invoices alone does not resolve the twenty-day capacity conflict',()=>{
 const all=allocationResult('all',20),defer=allocationResult('defer',20),phase=allocationResult('phase',20);
 assert.deepEqual([all.assigned,all.overload],[28,8]);
 assert.deepEqual([defer.assigned,defer.deferred,defer.overload],[22,6,2]);
 assert.deepEqual([phase.assigned,phase.deferred,phase.overload,phase.unallocated],[20,8,0,0]);
 assert.equal(phase.rows.find(r=>r.kind==='barcode')!.deferred,2);
 assert.equal(phase.rows.find(r=>r.kind==='support')!.assigned,4);
});
test('Every capacity scenario retains all requested work either assigned or deferred',()=>{
 for(const option of allocationOptions)for(let capacity=16;capacity<=32;capacity++){
  const r=allocationResult(option.id,capacity);
  assert.equal(r.assigned+r.deferred,r.requested);
  assert.equal(r.assigned-r.overload+r.unallocated,capacity);
  assert.ok(!(r.overload>0&&r.unallocated>0));
  for(const row of r.rows){assert.equal(row.assigned+row.deferred,row.requested);assert.ok(row.deferred>=0);}
 }
 assert.equal(allocationResult('phase',16).overload,4);
 assert.equal(allocationResult('all',24).overload,4);
 assert.equal(allocationResult('all',32).unallocated,4);
});
test('Reject invalid availability rather than showing a misleading allocation',()=>{
 for(const capacity of [NaN,Infinity,15,33,20.5])assert.throws(()=>allocationResult('all',capacity),RangeError);
});
