import assert from "node:assert/strict";
import test from "node:test";
import { defectMetrics, fitLine, histogram, norris, pickLimits, pickMean, pickObservations } from "./industrial-ci-models";

const published = { units:"50", defective:"6", defects:"7", opportunities:"4" };
const near = (actual:number, expected:number, tolerance=1e-10) => assert.ok(Math.abs(actual-expected)<tolerance, `${actual} differs from ${expected}`);

test("Minitab defect counts retain distinct unit and opportunity denominators", () => {
  const a=defectMetrics(published).result!;
  assert.equal(a.dpu,.14);assert.equal(a.dpo,.035);assert.equal(a.dpmo,35000);assert.equal(a.ppm,120000);
  const b=defectMetrics({...published,opportunities:"8"}).result!;
  assert.equal(b.dpmo,17500);assert.equal(b.ppm,a.ppm);assert.equal(b.dpu,a.dpu);
  const scaled=defectMetrics({...published,units:"100",defective:"12",defects:"14"}).result!;
  assert.equal(scaled.dpmo,a.dpmo);assert.equal(scaled.ppm,a.ppm);
});

test("unknown, impossible and unsupported counts do not produce rates", () => {
  const invalid=[{units:""},{units:" "},{units:"-1"},{units:"1.5"},{units:"NaN"},{units:"Infinity"},
    {defective:"51"},{defects:"5"},{opportunities:"0"},{defective:"0"},
    {units:"1000000000",opportunities:"1000000000"}];
  for(const update of invalid){const r=defectMetrics({...published,...update});assert.ok(r.error);assert.equal(r.result,null);}
  const zero=defectMetrics({...published,units:"0",defective:"0",defects:"0"});
  assert.equal(zero.error,null);
  for(const key of ["dpu","dpo","dpmo","ppm"] as const)assert.equal(zero.result![key],null);
});

test("Norris fit reproduces independently certified NIST statistics", () => {
  assert.equal(norris.length,36);
  const f=fitLine(norris);
  near(f.intercept,-.262323073774029);near(f.slope,1.00211681802045);
  near(f.rSquared!,.999993745883712);near(f.residualSD,.884796396144373);near(f.sse,26.6173985294224);
  near(f.fitted.reduce((s,r)=>s+r.residual,0),0);
  const permuted=fitLine([...norris].reverse());near(permuted.slope,f.slope);near(permuted.intercept,f.intercept);
  const translated=fitLine(norris.map(r=>({...r,y:r.y+10})));
  near(translated.slope,f.slope);near(translated.intercept,f.intercept+10);near(translated.sse,f.sse);
  assert.throws(()=>fitLine([{x:1,y:2},{x:1,y:3},{x:1,y:4}]));
  assert.throws(()=>fitLine([{x:1,y:2},{x:2,y:3}]));
});

test("sorting preserves all histogram counts without changing the source history or limits", () => {
  const original=pickObservations.map(r=>r.value);
  const sorted=[...original].sort((a,b)=>a-b);
  assert.deepEqual(histogram(original).map(b=>b.count),[1,7,7,4,1]);
  assert.deepEqual(histogram(original),histogram(sorted));
  assert.equal(histogram(original).reduce((s,b)=>s+b.count,0),20);
  assert.equal(pickObservations[0].day,1);assert.equal(pickObservations[0].value,12.1);
  near(pickMean,12.08);near(pickLimits.lower,10.498253079507279);near(pickLimits.upper,13.661746920492721);
});
