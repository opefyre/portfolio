import assert from 'node:assert/strict';
import test from 'node:test';
import {stockLots,stockPick,remainingDays,controlCoverage,rolloutWindow,rolloutReferences} from './method-models';
test('Stock picks respect release, expiry and remaining-life eligibility before either sort',()=>{
 assert.equal(stockLots.reduce((s,l)=>s+l.quantity,0),150);
 assert.deepEqual(['A','B','C'].map(id=>remainingDays(stockLots.find(l=>l.id===id)!.expiry)),[78,17,47]);
 assert.deepEqual(stockPick('FIFO',50,0).picks.map(l=>[l.id,l.picked]),[['A',40],['B',10]]);
 assert.deepEqual(stockPick('FEFO',50,0).picks.map(l=>[l.id,l.picked]),[['B',40],['C',10]]);
 assert.deepEqual(stockPick('FEFO',50,30).picks.map(l=>[l.id,l.picked]),[['C',40],['A',10]]);
 for(const policy of ['FIFO','FEFO'] as const)for(const min of [0,30])for(const requested of [0,10,50,80,120,140]){
  const p=stockPick(policy,requested,min);assert.equal(p.eligible,min===0?120:80);assert.equal(p.picks.reduce((s,l)=>s+l.picked,0)+p.unfilled,requested);assert.equal(p.rows.reduce((s,l)=>s+l.remaining+l.picked,0),150);assert.ok(p.rows.filter(l=>!l.eligible).every(l=>l.picked===0));
 }
 assert.equal(stockPick('FEFO',140,30).unfilled,60);
});
test('Control coverage separates prevention, later detection and the untested material grade',()=>{
 assert.deepEqual(controlCoverage('orientation').map(c=>c.outcome),['detect','prevent','none']);
 assert.deepEqual(controlCoverage('washer').map(c=>c.outcome),['none','none','stop']);
 assert.ok(controlCoverage('grade').every(c=>c.outcome==='none'));
});
test('Duration assumptions change time without changing the outage or silently completing reduced scope',()=>{
 assert.deepEqual(rolloutReferences.map(r=>r.totalHours),[8,11,14,8]);
 assert.equal(rolloutWindow(12,45).overrun,3);assert.equal(rolloutWindow(12,60).overrun,6);
 const phased=rolloutWindow(8,45);assert.equal(phased.fits,true);assert.equal(phased.remaining,4);assert.equal(phased.window,8);
 assert.equal(rolloutWindow(8,60).fits,false);
});
