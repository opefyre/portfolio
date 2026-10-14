import test from 'node:test';
import assert from 'node:assert/strict';
import {cycleCount,countBins,qualityCost,preparedStock,inventorySource} from './record-models';

test('net stock agreement does not erase two wrong bin records; confirmed transfer changes only book locations',()=>{
 const original=JSON.stringify(countBins),before=cycleCount(false),after=cycleCount(true);
 assert.deepEqual([before.matching,before.checked,before.accuracy,before.net,before.systemTotal,before.countedTotal],[3,5,60,0,180,180]);
 assert.deepEqual(before.rows.map(r=>r.variance),[0,-5,5,0,0]);
 assert.deepEqual([after.matching,after.accuracy,after.net,after.systemTotal,after.countedTotal],[5,100,0,180,180]);
 assert.deepEqual(before.rows.map((r,i)=>after.rows[i].system-r.system),[0,-5,5,0,0]);
 assert.deepEqual(before.rows.map(r=>r.counted),after.rows.map(r=>r.counted));
 assert.equal(before.rows[4].counted,0);assert.equal(JSON.stringify(countBins),original);assert.equal(cycleCount(false).accuracy,60);
});
test('quality comparison changes at the failure-cost threshold and keeps resource cost separate from cash',()=>{
 assert.deepEqual(qualityCost(700),{baseline:2000,prevention:600,appraisal:200,failure:700,total:1500,difference:500,breakEvenFailure:1200,baselineCopq:1500});
 assert.equal(qualityCost(1200).difference,0);assert.equal(qualityCost(1500).difference,-300);
 assert.equal(qualityCost(0).total,800);assert.equal(qualityCost(1800).total,2600);
 for(let f=0;f<=1800;f+=100){const r=qualityCost(f);assert.equal(r.total+r.difference,r.baseline);assert.equal(r.total,r.prevention+r.appraisal+f);}
 for(const bad of [-1,NaN,Infinity])assert.throws(()=>qualityCost(bad),RangeError);
});
test('both pipeline routes retain unknown quantities and item-specific conversion exceptions',()=>{
 const original=JSON.stringify(inventorySource),known=preparedStock(10),unknown=preparedStock(null);
 assert.deepEqual(known.rows.map(r=>r.pieces),[20,5,null]);
 assert.deepEqual([known.extracted,known.ready,known.unresolved,known.etlTargetLoaded,known.eltRawLoaded],[3,2,1,2,3]);
 assert.deepEqual(unknown.rows.map(r=>r.pieces),[null,5,null]);
 assert.deepEqual([unknown.ready,unknown.unresolved,unknown.etlTargetLoaded,unknown.eltRawLoaded],[1,2,1,3]);
 assert.equal(unknown.rows[0].reason,'Pack reference missing');assert.equal(unknown.rows[2].reason,'Quantity unknown');
 assert.equal(preparedStock(12).rows[0].pieces,24);assert.equal(preparedStock(12).rows[1].pieces,5);
 for(const r of [known,unknown])assert.equal(r.ready+r.unresolved,r.extracted);
 for(const bad of [0,-1,NaN,Infinity])assert.throws(()=>preparedStock(bad),RangeError);
 assert.equal(JSON.stringify(inventorySource),original);
});
