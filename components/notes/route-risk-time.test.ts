import test from 'node:test';
import assert from 'node:assert/strict';
import {crossdockModel,acceptanceProbability,samplingModel,compressionModel} from './route-risk-time';
const close=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
test('Dock routes respect receiving release, loading cutoff and complete elapsed time at every supported arrival',()=>{
 const r=crossdockModel(510);assert.equal(r.cross.ready,580);assert.equal(r.store.ready,650);assert.equal(r.cross.margin,80);assert.equal(r.store.margin,10);
 assert.equal(crossdockModel(570).cross.ready,640);assert.equal(crossdockModel(570).store.ready,680);
 assert.equal(crossdockModel(590).cross.meets,true);assert.equal(crossdockModel(591).cross.meets,false);
 for(let a=510;a<=630;a+=10){for(const held of [false,true]){const p=crossdockModel(a,held);assert.equal(p.departure-p.cutoff,15);for(const route of [p.cross,p.store]){for(let i=1;i<route.steps.length;i++)assert.equal(route.steps[i].start,route.steps[i-1].end);if(held){assert.equal(route.ready,null);assert.equal(route.margin,null);assert.equal(route.meets,false);assert.equal(route.steps.length,2);}else{assert.equal(route.work+route.wait,route.ready!-a);assert.equal(route.meets,route.ready!<=660);assert.ok(route.steps[2].start>=p.release!);}}}}
});
test('Finite-lot acceptance matches independent integer-combination results and preserves risk trade-offs',()=>{
 close(acceptanceProbability(1000,10,50,1),0.9146924262258119);close(acceptanceProbability(1000,50,50,1),0.27169117580505153);close(acceptanceProbability(1000,100,50,1),0.030773035266288495);close(acceptanceProbability(1000,10,100,1),0.736296642729162);close(acceptanceProbability(1000,100,100,1),0.00019817796195691688);
 const choose=(n:number,k:number):number=>{if(k<0||k>n)return 0;let v=1;for(let i=1;i<=k;i++)v=v*(n-i+1)/i;return v;};
 for(let N=4;N<=12;N++)for(let D=0;D<=N;D++)for(let n=0;n<=N;n++)for(let c=0;c<=2;c++){let num=0;for(let k=0;k<=c;k++)num+=choose(D,k)*choose(N-D,n-k);close(acceptanceProbability(N,D,n,c),num/choose(N,n));}
 for(const n of [50,100] as const)for(const c of [0,1,2] as const){const r=samplingModel(n,c,50);close(r.alpha+acceptanceProbability(1000,10,n,c),1);close(r.beta,acceptanceProbability(1000,100,n,c));let prev=1;for(const p of r.points){assert.ok(p.selected<=prev+1e-12);prev=p.selected;}assert.equal(acceptanceProbability(1000,0,n,c),1);assert.equal(acceptanceProbability(1000,1000,n,c),0);}
 assert.throws(()=>acceptanceProbability(1000,1.5,50,1));
});
test('Compression recalculates both branches, total float and rework rather than subtracting from the headline finish',()=>{
 const b=compressionModel('baseline');assert.equal(b.finish,18);assert.equal(b.tasks.find(t=>t.id==='C')!.float,2);
 const f=compressionModel('overlap',0);assert.equal(f.finish,16);assert.equal(f.tasks.find(t=>t.id==='B')!.start,2);assert.equal(f.controlling,'Both branches');
 const delayed=compressionModel('overlap',2);assert.equal(delayed.finish,18);assert.equal(delayed.cost,1200);
 const c=compressionModel('crash',0,2),c3=compressionModel('crash',0,3);assert.equal(c.finish,16);assert.equal(c.cost,1800);assert.equal(c.controlling,'Both branches');assert.equal(c3.finish,16);assert.equal(c3.cost,2700);assert.equal(c3.controlling,'Site branch');assert.equal(c3.tasks.find(t=>t.id==='B')!.float,1);
 for(let rw=0;rw<=4;rw++)for(let cut=0;cut<=3;cut++)for(const mode of ['baseline','overlap','crash'] as const){const r=compressionModel(mode,rw,cut),t=Object.fromEntries(r.tasks.map(t=>[t.id,t]));assert.equal(t.C.start,t.A.end);assert.equal(t.B.start,mode==='overlap'?t.A.start+2:t.A.end);assert.equal(t.D.start,Math.max(t.B.end,t.C.end));assert.equal(t.E.start,t.D.end);assert.equal(t.E.end,r.finish);assert.equal(t.D.duration,4);assert.equal(t.E.duration,2);for(const task of r.tasks)assert.ok(task.float>=0);}
});
