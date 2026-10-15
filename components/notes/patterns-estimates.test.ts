import test from 'node:test';
import assert from 'node:assert/strict';
import {DEMAND,rolloutEstimate} from './patterns-estimates';
test('All 24 observed months reconstruct exactly; annual seasonal effects centre on zero',()=>{
 assert.equal(DEMAND.length,24);
 for(const d of DEMAND)assert.equal(d.observed,d.trend+d.seasonal+d.remainder);
 assert.equal(DEMAND.slice(0,12).reduce((s,d)=>s+d.seasonal,0),0);
 assert.deepEqual(DEMAND.slice(0,12).map(d=>d.seasonal),DEMAND.slice(12).map(d=>d.seasonal));
 assert.deepEqual(DEMAND[19],{label:'Aug, year 2',trend:138,seasonal:20,remainder:28,observed:186});
 assert.equal(DEMAND[18].observed,151);assert.equal(DEMAND[20].observed,148);
});
test('Quantity changes only the stated variable work, and the testing scenario is added once',()=>{
 const eight=rolloutEstimate(8,false),twelve=rolloutEstimate(12,false),risk=rolloutEstimate(12,true);
 assert.deepEqual(eight.map(m=>m.base),[19200,18900,20200]);
 assert.deepEqual(twelve.map(m=>m.base),[25200,25100,26200]);
 assert.deepEqual(twelve.map((m,i)=>m.base-eight[i].base),[6000,6200,6000]);
 risk.forEach((m,i)=>{assert.equal(m.total,twelve[i].base+1800);assert.equal(m.extra,1800);assert.equal(m.rows.reduce((s,[,v])=>s+v,0),m.base);});
 assert.deepEqual(rolloutEstimate(8,true).map(m=>m.total),[21000,20700,22000]);
});
