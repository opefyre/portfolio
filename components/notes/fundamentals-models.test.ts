import assert from "node:assert/strict";
import test from "node:test";
import {packingCycle,materialPlan,scopeExample,WBS} from "./fundamentals-models";

test("packing cycle accounts for overlap and reconciles operator time",()=>{
 const m=packingCycle();assert.equal(m.takt,60);assert.equal(m.cycle,48);assert.equal(m.wait,2);assert.equal(m.manual+m.walk+m.wait,m.cycle);
 assert.equal(m.steps.filter(s=>s.kind==="manual").reduce((n,s)=>n+s.end-s.start,0),40);
 assert.deepEqual(m.steps.find(s=>s.id==="seal"),{id:"seal",label:"Automatic sealing",kind:"machine",start:5,end:25});
});
test("shorter walking becomes waiting until the machine stops governing the return",()=>{
 const short=packingCycle(420,3),long=packingCycle(420,14),busy=packingCycle(560,6);
 assert.equal(short.wait,5);assert.equal(short.cycle,48);assert.equal(long.wait,0);assert.equal(long.cycle,54);assert.equal(busy.takt,45);assert.equal(busy.margin,-3);
 for(const demand of [300,420,560,600])for(const walk of [0,2,6,8,14,18]){const m=packingCycle(demand,walk);assert.equal(m.manual+m.walk+m.wait,m.cycle);assert.ok(m.steps.every(s=>s.end>=s.start));assert.ok(m.axisMax>=m.takt&&m.axisMax>=m.cycle);}
 assert.throws(()=>packingCycle(0));
});
test("MRP default nets existing supply once and offsets release dates",()=>{
 const m=materialPlan();assert.equal(m.needWeek,5);
 assert.deepEqual(m.rows.map(r=>[r.gross,r.onTime,r.net,r.proposed,r.release,r.laterBalance]),[[100,30,50,50,3,0],[50,0,40,40,4,0],[200,100,20,20,4,0]]);
});
test("a late receipt cannot cover an earlier need and remains visible later",()=>{
 const r=materialPlan(6).rows[0];assert.equal(r.onTime,0);assert.equal(r.net,80);assert.equal(r.proposed,80);assert.equal(r.atNeed,0);assert.equal(r.laterBalance,30);
 const early=materialPlan(5).rows[0];assert.equal(early.onTime,30);assert.equal(early.net,50);
});
test("MRP flags past release dates and rounds pack sizes without hiding stock",()=>{
 const m=materialPlan(4,4,100),brackets=m.rows[0],bolts=m.rows[2];assert.equal(brackets.release,1);assert.equal(brackets.lateRelease,true);assert.equal(bolts.net,20);assert.equal(bolts.proposed,100);assert.equal(bolts.atNeed,80);
 for(const week of [4,5,6])for(const lead of [1,2,4])for(const pack of [1,100])for(const r of materialPlan(week,lead,pack).rows){assert.ok(r.net>=0&&r.atNeed>=0);assert.equal(r.stock+r.receipt+r.proposed-r.gross,r.laterBalance);assert.equal(r.proposed%r.pack,0);}
 assert.throws(()=>materialPlan(4,0));
});
test("the WBS covers twelve defined packages exactly once",()=>{
 const m=scopeExample();assert.equal(m.required,12);assert.equal(m.covered,12);assert.equal(m.missing.length,0);assert.equal(m.duplicated.length,0);assert.equal(new Set(m.items.map(i=>i.id)).size,12);
 assert.equal(WBS.length,5);assert.equal(m.items.find(p=>p.id==="2.3")!.owner,"Integration lead");
});
test("WBS gap and overlap views report scope coverage without changing the reference",()=>{
 const gap=scopeExample("gap"),overlap=scopeExample("overlap");assert.equal(gap.covered,11);assert.deepEqual(gap.missing.map(p=>p.id),["2.3"]);assert.equal(overlap.covered,12);assert.equal(overlap.items.length,13);assert.deepEqual(overlap.duplicated.map(p=>p.scopeKey),["4.2"]);assert.equal(scopeExample().items.length,12);
});
