import assert from 'node:assert/strict';
import test from 'node:test';
import {customerCost,throughputMix} from './paa-round-three-models';

test('consolidating orders changes service cost, not product margin or retained sales',()=>{
 for(const [orders,service,result,reduction] of [[1,307,2693,893],[4,448,2552,752],[20,1200,1800,0]]){
  const m=customerCost(orders);
  assert.equal(m.service,service);assert.equal(m.result,result);assert.equal(m.reduction,reduction);
  assert.equal(m.service+m.result,3000);
 }
});
test('whole-unit constraints can reverse the throughput-per-minute ranking',()=>{
 const one=throughputMix(1);
 assert.equal(one.bFirst.throughput,1180);assert.equal(one.best.throughput,1200);
 assert.deepEqual([one.best.a,one.best.b],[20,0]);
 for(const [cap,a,b,value] of [[2,19,2,1220],[3,19,3,1260],[30,10,30,1800]]){
  const m=throughputMix(cap).best;
  assert.deepEqual([m.a,m.b,m.throughput],[a,b,value]);
  assert.equal(m.afterExpense,value-1000);
 }
});
test('every demand setting respects capacity and demand and cannot underperform either comparison',()=>{
 for(let cap=0;cap<=30;cap++){
  const m=throughputMix(cap);
  for(const r of [m.best,m.aFirst,m.bFirst]){
   assert(r.a>=0&&r.a<=20&&Number.isInteger(r.a));assert(r.b>=0&&r.b<=cap&&Number.isInteger(r.b));
   assert(r.minutes<=600);assert.equal(r.throughput,60*r.a+40*r.b);
  }
  assert(m.best.throughput>=m.aFirst.throughput&&m.best.throughput>=m.bFirst.throughput);
 }
});
test('invalid demand and order inputs are rejected instead of silently clamped',()=>{
 for(const n of [NaN,Infinity,-1,31,1.5])assert.throws(()=>throughputMix(n),RangeError);
 for(const n of [NaN,Infinity,0,21,1.5])assert.throws(()=>customerCost(n),RangeError);
});
