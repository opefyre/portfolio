import test from 'node:test';
import assert from 'node:assert/strict';
import {lineScenes,completionForecast,plannedLine,snapshotAge,serviceMetrics,servicePresets,yieldSummary} from './measurement-models';
test('A delayed observation retains its original forecast anchor and exposes its age',()=>{
 assert.equal(completionForecast(plannedLine),780);
 assert.equal(completionForecast(lineScenes[0].actual),840);
 assert.equal(completionForecast(lineScenes[1].actual),900);
 const delayed=lineScenes[2];assert.equal(snapshotAge(delayed.now,delayed.linked),30);assert.equal(completionForecast(delayed.linked),840);
 assert.notEqual(completionForecast(delayed.linked),delayed.now+delayed.linked.queue/delayed.linked.rate);
 assert.equal(completionForecast({asOf:750,queue:0,rate:1}),750);
 assert.throws(()=>completionForecast({asOf:720,queue:1,rate:0}),RangeError);
 assert.throws(()=>snapshotAge(719,plannedLine),RangeError);
});
test('Service metrics distinguish shortage incidence, severity and volume weighting',()=>{
 const cases=servicePresets.map(p=>serviceMetrics([20,20,20,20,20],p.short));
 assert.deepEqual(cases.map(r=>[r.csl,r.fill]),[[80,90],[0,90],[80,98]]);
 const unequal=serviceMetrics([10,90],[5,0]);assert.equal(unequal.fill,95);assert.equal(unequal.csl,50);
 for(const r of cases)assert.equal(r.filled+r.unfilled,r.units);
 assert.equal(serviceMetrics([],[]).fill,null);assert.equal(serviceMetrics([],[]).csl,null);
 assert.throws(()=>serviceMetrics([20],[21]),RangeError);assert.throws(()=>serviceMetrics([0],[0]),RangeError);assert.throws(()=>serviceMetrics([20],[]),RangeError);
});
test('Identical station rates do not determine distinct-unit first-pass performance',()=>{
 const a=yieldSummary('repeat'),b=yieldSummary('separate');
 assert.deepEqual(a.stepPasses,[90,90,90]);assert.deepEqual(a.stepPasses,b.stepPasses);
 assert.deepEqual([a.untouched,b.untouched],[90,70]);assert.deepEqual([a.corrections,b.corrections],[30,30]);
 assert.equal(a.finalAccepted,100);assert.equal(b.finalAccepted,100);
 assert.ok(Math.abs(a.rateProduct-72.9)<1e-10);assert.equal(a.rateProduct,b.rateProduct);
 for(const r of [a,b]){assert.equal(new Set(r.units.map(u=>u.unit)).size,100);assert.equal(r.affected+r.untouched,100);}
 assert.deepEqual(a.units[0].failures,[0,1,2]);assert.deepEqual(b.units[10].failures,[1]);assert.deepEqual(b.units[30].failures,[]);
});
