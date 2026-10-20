import assert from 'node:assert/strict';
import test from 'node:test';
import {capacityMix,landedAllocation} from './paa-round-two-models';

test('an unchanged 300-unit total can overrun, exactly fill or leave bench capacity',()=>{
 for(const [b,hours,gap,spare,load] of [[100,40,8,0,125],[50,35,3,0,109.375],[20,32,0,0,100],[0,30,0,2,93.75],[150,45,13,0,140.625]]){
  const m=capacityMix(b);
  assert.equal(m.productA+m.productB,300);
  assert.equal(m.required,hours);assert.equal(m.gap,gap);assert.equal(m.spare,spare);assert.equal(m.load,load);
 }
});
test('the capacity teaching model rejects missing, fractional and out-of-scope quantities',()=>{
 for(const b of [NaN,Infinity,-1,151,20.5])assert.throws(()=>capacityMix(b));
});
test('changing the allocation moves product cost while conserving the bill',()=>{
 const weight=landedAllocation('weight'),value=landedAllocation('value');
 assert.deepEqual([weight.unitA,weight.unitB],[25.5,45]);
 assert.deepEqual([value.unitA,value.unitB],[24,48]);
 for(const m of [weight,value]){
  assert.equal(m.freightA+m.freightB,500);
  assert.equal(m.a+m.b,4800);
  assert.equal(m.unitA*100+m.unitB*50,4800);
 }
 assert.equal(value.a-weight.a,-150);assert.equal(value.b-weight.b,150);
});
test('an unrecognised freight basis is rejected instead of silently selecting value',()=>{
 assert.throws(()=>landedAllocation('volume' as 'weight'));
});
