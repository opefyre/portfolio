import test from 'node:test';
import assert from 'node:assert/strict';
import {purchasingScenario,traceReview,REQUIREMENTS,EXECUTED_TESTS} from './portfolio-trace';
test('Supplier exits change only the stated carton risk assessment; spend and module impact do not move',()=>{
 const original=purchasingScenario(false),changed=purchasingScenario(true);
 assert.deepEqual(original.map(x=>x.group),['routine','competitive','bottleneck','strategic']);
 assert.deepEqual(changed.map(x=>x.group),['routine','strategic','bottleneck','strategic']);
 assert.deepEqual(original.map(x=>x.spend),changed.map(x=>x.spend));
 for(const i of [0,2,3])assert.deepEqual(original[i],changed[i]);
 assert.equal(original.reduce((s,x)=>s+x.spend,0),624000);
});
test('Passing executed tests leave R02 without evidence and T99 without a requirement link',()=>{
 assert.deepEqual(traceReview(),{executed:3,passed:3,requirements:3,withPassingEvidence:2,unmapped:['T99']});
 assert.equal(EXECUTED_TESTS.some(t=>t.requirement==='R02'),false);
 assert.deepEqual(REQUIREMENTS.map(r=>r.id),['R01','R02','R03']);
 for(const t of EXECUTED_TESTS)assert.ok(t.requirement===null||REQUIREMENTS.some(r=>r.id===t.requirement));
});
