import test from 'node:test';import assert from 'node:assert/strict';
import {positionTimeline,stationPace,resourceLoads,resourcePlans,plannedSeconds} from './planning-basics';

test('equal opening position and final balance can conceal a temporary backlog',()=>{
 const early=positionTimeline(1),late=positionTimeline(3);
 assert.equal(early.openingPosition,60);assert.equal(late.openingPosition,60);
 assert.deepEqual(early.rows.map(r=>r.net),[10,50,40,40]);assert.deepEqual(late.rows.map(r=>r.net),[10,0,-10,40]);
 assert.deepEqual([early.rows[2].onHand,early.rows[2].backorders,late.rows[2].onHand,late.rows[2].backorders],[40,0,0,10]);
 for(const t of [early,late]){assert.equal(t.rows.reduce((n,r)=>n+r.receipt,0),50);assert.equal(t.rows.reduce((n,r)=>n+r.newDemand,0),20);assert.equal(t.rows[3].net,40);for(const r of t.rows){assert.ok(r.onHand>=0&&r.backorders>=0);assert.equal(r.onHand-r.backorders,r.net);assert.ok(r.onHand===0||r.backorders===0);}}
});
test('demand changes takt while the station times change only in the stated trial',()=>{
 const baseline=stationPace(450,false),trial=stationPace(450,true);
 assert.equal(plannedSeconds,27000);assert.equal(baseline.takt,60);assert.equal(baseline.capacity,360);assert.equal(baseline.gap,90);assert.deepEqual(baseline.above,['B']);
 assert.equal(baseline.stations.reduce((n,s)=>n+s.seconds,0)/3,60);assert.equal(baseline.slowest,75);
 assert.equal(trial.capacity,450);assert.equal(trial.gap,0);assert.deepEqual(trial.above,[]);
 assert.equal(stationPace(360,false).takt,75);assert.deepEqual(stationPace(360,false).above,[]);
 assert.equal(stationPace(540,true).takt,50);assert.equal(stationPace(540,true).gap,90);assert.deepEqual(stationPace(540,true).above,['A','B']);
 for(const demand of [360,450,540])assert.deepEqual(stationPace(demand,false).stations.map(s=>s.seconds),[55,75,50]);
 for(const d of [0,-1,NaN,Infinity])assert.throws(()=>stationPace(d,false),RangeError);
});
test('moving B within float moves the same overload; added capacity changes feasibility, not durations',()=>{
 const saved=JSON.stringify(resourcePlans),one=resourceLoads(1),two=resourceLoads(2);
 assert.deepEqual(one.map(p=>p.finish),[4,4,6]);assert.deepEqual(one.map(p=>p.overloadDays),[2,2,0]);assert.deepEqual(one.map(p=>p.fits),[false,false,true]);
 assert.deepEqual(one[0].daily.map(d=>d.required),[2,2,1,1,0,0]);assert.deepEqual(one[1].daily.map(d=>d.required),[1,1,2,2,0,0]);assert.deepEqual(one[2].daily.map(d=>d.required),[1,1,1,1,1,1]);
 for(const p of [...one,...two]){assert.equal(p.engineerDays,6);assert.equal(p.aEnd-p.aStart,4);assert.equal(p.bEnd-p.bStart,2);}
 assert.deepEqual(two.map(p=>p.fits),[true,true,true]);assert.deepEqual(two.map(p=>p.finish),[4,4,6]);assert.equal(JSON.stringify(resourcePlans),saved);
});
