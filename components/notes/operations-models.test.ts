import assert from "node:assert/strict";
import { test } from "node:test";
import { rolloutModel, stockoutModel, robotModel } from "./operations-models";

test("two-plant proposal changes by €50,000 when B uses its own inputs", () => {
  const local = rolloutModel(30000,30000), copied = rolloutModel(60000,10000);
  assert.equal(local.firstYear,-14000);
  assert.equal(local.incrementalB,-12000);
  assert.equal(local.recurring,66000);
  assert.equal(copied.firstYear,36000);
  assert.equal(copied.firstYear-local.firstYear,50000);
});
test("shared investment is counted once and the two decision thresholds differ", () => {
  assert.equal(rolloutModel(44000,30000).firstYear,0);
  assert.equal(rolloutModel(42000,30000).incrementalB,0);
  assert.equal(rolloutModel(30000,30000).breakEvenBenefitB,44000);
});
test("a forecast can match constrained sales while missing known simulated demand", () => {
  const m = stockoutModel(60,60);
  assert.equal(m.sales,60); assert.equal(m.unfilled,40);
  assert.equal(m.salesError,0); assert.equal(m.demandError,40);
});
test("zero sales has an undefined percentage; surplus stock does not create demand", () => {
  assert.equal(stockoutModel(0,60).salesError,null);
  assert.equal(stockoutModel(0,60).demandError,40);
  assert.equal(stockoutModel(140,100).sales,100);
  assert.equal(stockoutModel(140,100).demandError,0);
});
test("five-day example reverses forecast ranking without changing forecasts", () => {
  const actual=[100,100,60,60,60], demand=[100,100,100,100,100];
  const score=(reference:number[], forecast:number)=>reference.reduce((s,n)=>s+Math.abs(n-forecast),0)/reference.reduce((s,n)=>s+n,0)*100;
  assert.equal(actual.reduce((a,b)=>a+b),380);
  assert.equal(Number(score(actual,100).toFixed(1)),31.6);
  assert.equal(Number(score(actual,60).toFixed(1)),21.1);
  assert.equal(score(demand,100),0); assert.equal(score(demand,60),40);
});
test("robot comparison covers equal output and includes all human support", () => {
  const m=robotModel(75,90,5);
  assert.equal(m.manual.total,87500);assert.equal(m.conventional.total,37750);
  assert.equal(m.humanoid.robotTasks,270000);assert.equal(m.humanoid.backupTasks,30000);
  assert.equal(m.humanoid.supportHours,225);assert.equal(m.humanoid.backupHours,250);
  assert.equal(m.humanoid.total,64625);
});
test("more support can reverse the comparison against manual work", () => {
  const m=robotModel(75,90,25);
  assert.equal(m.humanoid.total,96125);
  assert.ok(m.humanoid.total>m.manual.total);
});
test("capacity above the workload is not charged imaginary extra output", () => {
  const m=robotModel(95,140,0);
  assert.equal(m.humanoid.robotTasks,300000);
  assert.equal(m.humanoid.backupTasks,0);
  assert.equal(m.humanoid.total,48000);
});
test("cost decomposition and workload identity hold across the control ranges", () => {
  for(const share of [40,55,75,95])for(const rate of [40,90,140])for(const support of [0,5,25,30]){
    const m=robotModel(share,rate,support),r=m.humanoid;
    assert.equal(r.robotTasks+r.backupTasks,m.tasks);
    assert.equal(r.total,r.capitalAndOperating+(r.supportHours+r.backupHours)*m.labourRate);
    assert.ok(r.supportHours>=0&&r.backupHours>=0&&r.robotTasks<=m.tasks);
  }
});
