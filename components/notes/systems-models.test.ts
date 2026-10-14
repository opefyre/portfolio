import test from "node:test";
import assert from "node:assert/strict";
import { scopePlan, productionBalance, requestTraces, traceResult, transitionCounts } from "./systems-models";

test("scope alternatives preserve the original work or explicitly remove the report", () => {
  assert.equal(scopePlan("add",4).duration,12); assert.equal(scopePlan("add",4).cost,7200);
  assert.equal(scopePlan("swap",4).duration,10); assert.equal(scopePlan("swap",4).cost,6000);
  assert.equal(scopePlan("defer",4).duration,8); assert.equal(scopePlan("defer",4).cost,4800); assert.equal(scopePlan("defer",4).futureCost,2400);
  assert.equal(scopePlan("swap",2).duration,8); assert.equal(scopePlan("add",6).duration,14);
  for (const option of ["add","swap","defer"] as const) {
    const plan=scopePlan(option,4); assert.equal(plan.tasks[0].start,0);
    for(let i=1;i<plan.tasks.length;i++) assert.equal(plan.tasks[i].start,plan.tasks[i-1].end);
    assert.equal(plan.tasks.filter(t=>t.name==="Daily report").length,option==="swap"?0:1);
  }
});
test("a machine's gross output never erases scrap from the good-output requirement", () => {
  assert.equal(productionBalance(0).actualRemaining,40);assert.equal(productionBalance(0).screenRemaining,40);
  assert.equal(productionBalance(1).screenRemaining,0);assert.equal(productionBalance(1).actualRemaining,40);assert.equal(productionBalance(1).discrepancy,40);
  assert.equal(productionBalance(2).screenRemaining,1000);assert.equal(productionBalance(2).confirmed,false);assert.equal(productionBalance(2).good,960);
});
test("case durations, interval boundaries and route counts reconcile with all 22 events", () => {
  const results=requestTraces.map(t=>traceResult(t.events));
  assert.deepEqual(results.map(t=>t.duration),[40,155,60,115]);
  assert.equal(results.reduce((sum,t)=>sum+t.duration,0)/results.length,92.5);
  assert.equal(results.filter(t=>t.returned).reduce((sum,t)=>sum+t.duration,0)/2,135);
  assert.equal(results.filter(t=>!t.returned).reduce((sum,t)=>sum+t.duration,0)/2,50);
  assert.equal(requestTraces.reduce((sum,t)=>sum+t.events.length,0),22);
  for(const result of results) assert.equal(result.intervals.reduce((sum,e)=>sum+e.minutes,0),result.duration);
  assert.equal(results[1].intervals[2].minutes,100);
  assert.deepEqual(transitionCounts(),{"Submitted → Reviewed":4,"Reviewed → Approved":4,"Approved → Closed":4,"Reviewed → Returned":2,"Returned → Resubmitted":2,"Resubmitted → Reviewed":2});
});
