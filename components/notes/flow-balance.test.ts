import test from 'node:test';
import assert from 'node:assert/strict';
import {poolingModel,heijunkaModel,freshnessModel,WITHDRAWALS} from './flow-balance';
const close=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('Pooling respects covariance, rounding and identical regional moments across supported correlations',()=>{
 for(const rho of [-.5,0,.5,1]){
  const r=poolingModel(rho),a=r.days.map(d=>d.north-100),b=r.days.map(d=>d.south-100);
  close(a.reduce((s,v)=>s+v,0),0);close(b.reduce((s,v)=>s+v,0),0);
  close(a.reduce((s,v)=>s+v*v,0)/8,400);close(b.reduce((s,v)=>s+v*v,0)/8,400);
  close(a.reduce((s,v,i)=>s+v*b[i],0)/8,400*rho);
  close(r.combinedSigma**2,800+800*rho);assert.equal(r.separateRounded,66);
 }
 close(poolingModel(0).pooled,1.645*Math.sqrt(800));assert.equal(poolingModel(0).pooledRounded,47);
 close(poolingModel(1).pooled,65.8);close(poolingModel(1).reduction,0);
 close(poolingModel(-.5).pooled,32.9);close(poolingModel(-.5).reduction,50);
});
test('The known levelling sequence needs60 opening pieces; shortages persist and every piece is conserved',()=>{
 const full=heijunkaModel(60);assert.deepEqual(full.days.map(d=>d.net),[20,60,0,20,60]);assert.equal(full.firstShortage,null);assert.equal(full.minimumOpening,60);
 assert.equal(heijunkaModel(40).firstShortage?.day,'Wednesday');assert.equal(heijunkaModel(40).firstShortage?.backlog,20);
 assert.equal(heijunkaModel(0).firstShortage?.day,'Monday');
 for(let opening=0;opening<=100;opening+=20){const r=heijunkaModel(opening);for(const d of r.days){assert.equal(opening+d.cumulativeProduction,d.fulfilled+d.physical);assert.equal(d.cumulativeDemand,d.fulfilled+d.backlog);assert.equal(d.net,opening+d.cumulativeProduction-d.cumulativeDemand);assert.ok(d.physical>=0&&d.backlog>=0);assert.ok(d.produced<=160&&d.followingOutput<=160);}assert.equal(r.days[4].physical,opening);assert.equal(r.days[4].backlog,0);}
 assert.equal(WITHDRAWALS.reduce((s,v)=>s+v,0),500);
});
test('Freshness keeps occurrence, arrival, visibility and duplicate identity separate at every boundary',()=>{
 assert.deepEqual([freshnessModel(390,5).source,freshnessModel(390,5).stream,freshnessModel(390,5).batch],[60,80,70]);
 assert.equal(freshnessModel(390,15).batch,100);assert.deepEqual(freshnessModel(390,5).missing,['E2']);assert.equal(freshnessModel(390,5).latestStreamEvent,360);
 assert.equal(freshnessModel(419,5).stream,80);assert.equal(freshnessModel(429,5).stream,80);assert.equal(freshnessModel(430,5).stream,60);
 assert.equal(freshnessModel(629,5).batch,70);assert.equal(freshnessModel(630,5).batch,60);
 assert.equal(freshnessModel(929,15).batch,100);assert.equal(freshnessModel(930,15).batch,60);
 for(const interval of [5,15] as const){const end=freshnessModel(960,interval);assert.deepEqual([end.source,end.stream,end.batch],[60,60,60]);assert.equal(end.streamIds.length,3);assert.deepEqual([freshnessModel(0,interval).source,freshnessModel(0,interval).stream,freshnessModel(0,interval).batch],[100,100,100]);}
});
