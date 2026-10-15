import assert from 'node:assert/strict';
import test from 'node:test';
import {gageReadings,gageSummary,consignmentExample,type GageCase} from './measurement-patterns';
const close=(actual:number,expected:number)=>assert.ok(Math.abs(actual-expected)<1e-10,`${actual} != ${expected}`);
test('all 27 readings have part, operator and repeat identity; default arithmetic matches the worked example',()=>{
 const rows=gageReadings('operators'),s=gageSummary(rows);
 assert.equal(rows.length,27);assert.equal(new Set(rows.map(r=>`${r.part}/${r.operator}/${r.trial}`)).size,27);
 assert.deepEqual(rows.filter(r=>r.part===2&&r.operator==='A').map(r=>r.value),[9.975,9.98,9.985]);
 close(s.repeatSD,.005);close(s.operatorRange,.04);close(s.meanReferenceError,0);assert.equal(s.degreesOfFreedom,18);
 s.operatorMeans.forEach((m,i)=>close(m.mean,[9.98,10,10.02][i]));
});
test('constructed patterns isolate repeated scatter and common reference shift without inventing an R&R component',()=>{
 const repeated=gageSummary(gageReadings('repeats')),biased=gageSummary(gageReadings('bias'));
 close(repeated.repeatSD,.020);close(repeated.operatorRange,0);close(repeated.meanReferenceError,0);
 close(biased.repeatSD,.005);close(biased.operatorRange,0);close(biased.meanReferenceError,.030);
 for(const mode of ['operators','repeats','bias'] as GageCase[]){const rows=gageReadings(mode),s=gageSummary(rows),reversed=gageSummary([...rows].reverse());close(s.repeatSD,reversed.repeatSD);close(s.operatorRange,reversed.operatorRange);}
 const shifted=gageSummary(gageReadings('operators').map(r=>({...r,value:r.value+.1})));
 close(shifted.repeatSD,.005);close(shifted.operatorRange,.040);close(shifted.meanReferenceError,.1);
});
test('ownership terms change invoice basis while physical stock and supplier request stay conserved',()=>{
 for(const used of [0,300,400,800,1000]){const r=consignmentExample(used);assert.equal(r.remaining+used,1000);assert.equal(r.consignedInvoice+r.supplierRetainedValue,2000);assert.equal(r.nonConsignedInvoice,2000);assert.equal(r.remaining+r.requested,r.remaining<=700?1000:r.remaining);}
 assert.equal(consignmentExample(299).requested,0);assert.equal(consignmentExample(300).requested,300);
 assert.throws(()=>consignmentExample(1001));assert.throws(()=>consignmentExample(-1));
});
