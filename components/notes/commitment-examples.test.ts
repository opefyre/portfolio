import test from 'node:test';
import assert from 'node:assert/strict';
import {planningFence,ctqDelivery,clockLabel,phaseGate,GATE_OPTIONS} from './commitment-examples';

test('A fence includes its final week; automatic proposals and reviewed exceptions stay distinct',()=>{
  const r=planningFence(2,2,60);assert.equal(r.protectedChange,true);assert.equal(r.automaticNet,40);assert.equal(r.reviewedNet,40);
  assert.equal(planningFence(2,2,60,true).reviewedNet,0);assert.equal(planningFence(2,4,60).automaticNet,0);
  assert.equal(planningFence(4,4,140).automaticNet,-40);
  for(const fence of [2,4])for(const week of [2,4,6])for(const requirement of [60,140])for(const exception of [false,true]){
    const x=planningFence(fence,week,requirement,exception);let an=0,rn=0;
    for(const row of x.rows){an+=row.automatic-row.demand;rn+=row.reviewed-row.demand;assert.equal(row.automaticNet,an);assert.equal(row.reviewedNet,rn);if(row.week!==week){assert.equal(row.automatic,100);assert.equal(row.reviewed,100);}}
    assert.equal(x.requirementTotal,500+requirement);assert.equal(x.automaticNet,week<=fence?100-requirement:0);assert.equal(x.reviewedNet,week<=fence&&!exception?100-requirement:0);
  }
});
test('CTQs use the same delivery against an upper deadline and an inclusive two-sided window',()=>{
  const early=ctqDelivery();assert.equal(early.deadlinePass,true);assert.equal(early.windowPass,false);assert.equal(early.usableByDeadline,100);
  for(const time of [480,600])assert.equal(ctqDelivery(time).windowPass,true);
  assert.equal(ctqDelivery(479).windowPass,false);assert.equal(ctqDelivery(601).windowPass,false);
  const late=ctqDelivery(630);assert.equal(late.quantityByDeadline,0);assert.equal(late.usableByDeadline,0);
  assert.equal(ctqDelivery(570,80,0).quantityMet,false);const damage=ctqDelivery(570,100,5);assert.equal(damage.quantityMet,true);assert.equal(damage.conditionMet,false);assert.equal(damage.usableByDeadline,95);assert.equal(damage.windowPass,false);
  assert.equal(clockLabel(450),'07:30');assert.equal(clockLabel(600),'10:00');
});
test('A passed pilot does not satisfy missing rollout support or authorise spending',()=>{
  for(const option of GATE_OPTIONS)for(const ready of [false,true]){
    const g=phaseGate(option.id,ready);assert.equal(g.lateRate,2);assert.equal(g.errorRate,.8);assert.equal(g.pilotSpent,8000);assert.equal(g.rolloutRequest,40000);assert.equal(g.totalIfFullRolloutAuthorised,48000);
    assert.equal(g.goSupported,ready);assert.equal(g.supportedGoCeiling,option.id==='go'&&ready?40000:0);
  }
});
