import test from 'node:test';
import assert from 'node:assert/strict';
import {cashCycle,eightDVerification,CONTAINMENT_COHORTS,migrationReconciliation} from './working-records';
test('Cash cycle keeps credit revenue, purchase cost and inventory ratios separate, including negative cycles',()=>{
 const b=cashCycle(30,40);assert.equal(b.dio,60);assert.equal(b.ccc,50);assert.equal(b.collect,90);assert.equal(b.pay,40);assert.equal(b.receivables,90000);assert.equal(b.payables,80000);
 assert.equal(cashCycle(15,40).ccc,35);assert.equal(cashCycle(15,40).receivables,45000);assert.equal(cashCycle(15,90).ccc,-15);
 for(let ds=15;ds<=60;ds+=15)for(let dp=20;dp<=100;dp+=10){const r=cashCycle(ds,dp);assert.equal(r.ccc,r.collect-r.pay);assert.equal(r.ccc,r.dio+r.dso-r.dpo);assert.equal(r.receivables/(r.sales/365),ds);assert.equal(r.payables/(r.purchases/365),dp);assert.equal(r.inventory/(r.cogs/365),60);}
});
test('8D keeps original containment and later verification populations distinct and does not turn a failed lot into a passed check',()=>{
 assert.equal(CONTAINMENT_COHORTS.reduce((v,c)=>v+c.units,0),1600);assert.equal(CONTAINMENT_COHORTS.reduce((v,c)=>v+c.failed,0),28);for(const c of CONTAINMENT_COHORTS)assert.equal(c.failed+c.conforming,c.units);
 for(const fail of [false,true]){const r=eightDVerification(fail);assert.equal(r.originalFailed,28);assert.equal(r.originalConforming,1572);assert.equal(r.verificationUnits,3000);assert.equal(r.verificationFailed,fail?1:0);assert.equal(r.reviewCanProceed,!fail);assert.equal(r.lots[0].failed,0);assert.equal(r.lots[2].failed,0);assert.equal(r.proposedReviewDay,15);}
});
test('Migration matching aggregate totals does not hide item and hold errors, and the final movement is applied once',()=>{
 const bad=migrationReconciliation(false,true);assert.equal(bad.sourceTotal,240);assert.equal(bad.targetTotal,240);assert.equal(bad.mismatches.length,3);assert.equal(bad.sourcePickable,180);assert.equal(bad.targetPickable,190);
 const fixed=migrationReconciliation(true,true);assert.equal(fixed.mismatches.length,0);assert.equal(fixed.sourcePickable,fixed.targetPickable);assert.equal(fixed.target[0].physical,110);
 const stale=migrationReconciliation(true,false);assert.equal(stale.targetTotal,250);assert.deepEqual(stale.mismatches,[{item:'P01',fields:['physical']}]);
 for(const map of [false,true])for(const delta of [false,true]){const r=migrationReconciliation(map,delta);assert.equal(r.source.length,3);assert.equal(r.target.length,3);for(const row of [...r.source,...r.target]){assert.equal(row.physical,row.pickable+row.held+row.allocated);assert.ok(row.pickable>=0);}assert.equal(r.targetTotal,delta?240:250);}
});
