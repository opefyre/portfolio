import test from 'node:test';
import assert from 'node:assert/strict';
import {meanInterval,finishNetwork,triangular,percentile,scheduleSample,shareByDeadline} from './coverage-gap-models';

const close=(actual:number,expected:number,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);

test('The ten-job example uses sample variance and a two-sided t interval, not job-level spread',()=>{
 const m=meanInterval(10);
 close(m.mean,10);close(m.sd**2,12/9);close(m.se,Math.sqrt(12/90));
 close(m.low,9.173976995521949);close(m.high,10.826023004478051);
 assert.ok(m.values.some(v=>v<m.low)&&m.values.some(v=>v>m.high));
 for(const n of [5,10,20]){const r=meanInterval(n);assert.equal(r.values.length,n);close(r.high-r.mean,r.mean-r.low);}
 for(const n of [0,7,NaN])assert.throws(()=>meanInterval(n));
});

test('The network respects both merge dependencies and can change its critical branch',()=>{
 assert.equal(finishNetwork().finish,39);
 assert.deepEqual(finishNetwork({C:16,D:9}),{finish:43,configurationCritical:true});
 // E can dominate the later merge even when the C/D branch is unchanged.
 assert.equal(finishNetwork({E:50}).finish,62);
 assert.throws(()=>finishNetwork({B:-1}));assert.throws(()=>finishNetwork({D:NaN}));
});

test('Triangular inverse sampling and interpolated percentiles retain their defined bounds',()=>{
 close(triangular(0,6,8,16),6);close(triangular(1,6,8,16),16);
 close(triangular(.2,6,8,16),8);
 close(percentile([10,20,30,40],.8),34);
 for(const u of [-.1,1.1,NaN])assert.throws(()=>triangular(u,6,8,16));
 assert.throws(()=>triangular(.5,6,18,16));assert.throws(()=>percentile([],0));
});

test('Shared and independent events change joint exposure while retaining the same base draws',()=>{
 const base=scheduleSample('none'),shared=scheduleSample('shared'),separate=scheduleSample('separate');
 assert.deepEqual(scheduleSample('none',30),scheduleSample('none',30));
 assert.equal(base.runs,20000);assert.equal(base.bothEvents,0);
 assert.ok(Math.abs(shared.bothEvents-.2)<.01);
 assert.ok(Math.abs(separate.bothEvents-.04)<.01);
 for(const r of [base,shared,separate]){
  assert.ok(r.finishes.every((v,i,a)=>v>=36&&v<=56&&(!i||v>=a[i-1])));
  assert.ok(r.p80>r.p50);assert.ok(r.configurationCritical>0&&r.configurationCritical<1);
  assert.equal(shareByDeadline(r.finishes,32),0);assert.equal(shareByDeadline(r.finishes,58),1);
 }
 assert.ok(shared.p80>separate.p80&&separate.p80>base.p80);
 assert.ok(shareByDeadline(base.finishes,42)>shareByDeadline(shared.finishes,42));
 assert.throws(()=>scheduleSample('none',0));
});

test('A deadline includes exact finishes and retains ties',()=>{
 close(shareByDeadline([35,39,39,43],39),.75);
 close(shareByDeadline([35,39,39,43],38),.25);
 assert.throws(()=>shareByDeadline([35,39],NaN));
});
