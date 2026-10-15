import assert from 'node:assert/strict';
import test from 'node:test';
import {distributionPlan,distributionReplay} from './distribution-plan';
test('local netting and one-week offsets create the declared source requirement',()=>{
 const {north,south,central}=distributionPlan();
 assert.deepEqual(north.receipts,[0,0,30,20]);assert.deepEqual(north.releases,[0,30,20,0]);assert.deepEqual(north.end,[20,10,0,0]);
 assert.deepEqual(south.receipts,[0,10,30,30]);assert.deepEqual(south.releases,[10,30,30,0]);
 assert.deepEqual(central.demand,[10,60,50,0]);assert.deepEqual(central.receipts,[0,0,20,0]);assert.deepEqual(central.releases,[0,20,0,0]);assert.deepEqual(central.end,[90,30,0,0]);
 assert.equal(north.beforeHorizon+south.beforeHorizon+central.beforeHorizon,0);
});
test('network conservation counts internal transfers once and keeps the opening pipeline separate',()=>{
 for(const delayed of [false,true]){const r=distributionReplay(delayed);let demand=0,external=0;
 r.weeks.forEach((w,i)=>{demand+=r.plan.north.demand[i]+r.plan.south.demand[i];external+=r.plan.central.receipts[i];
 assert.equal(w.centralStock+w.northNet+w.southNet+w.inTransit,190+external-demand);
 const physical=w.centralStock+Math.max(0,w.northNet)+Math.max(0,w.southNet)+w.inTransit;
 assert.equal(physical,190+external-w.delivered);
 assert.ok(w.centralStock>=0);
 });assert.equal(r.weeks[3].delivered,210);assert.equal(r.weeks[3].inTransit,0);}
});
test('one delayed30-piece arrival creates a week3 backlog without adding a duplicate release',()=>{
 const normal=distributionReplay(false),late=distributionReplay(true);
 assert.deepEqual(late.southReceipts,[0,10,0,60]);assert.equal(late.weeks[2].southNet,-30);assert.equal(late.weeks[2].backlog,30);
 assert.equal(late.weeks[2].inTransit-normal.weeks[2].inTransit,30);assert.equal(late.weeks[3].backlog,0);
 assert.deepEqual(late.plan,normal.plan);assert.equal(late.transfers.reduce((s,t)=>s+t.quantity,0),140);
 assert.equal(late.transfers.filter(t=>t.destination==='south').reduce((s,t)=>s+t.quantity,0),70);
});
