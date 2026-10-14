import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deliveryOrders,deliverySummary,assessDelivery,dependencyWindow,dependencyTypes} from './boundary-models';
test('Original and revised promises score unchanged receipts differently',()=>{
 const source=JSON.stringify(deliveryOrders),a=deliverySummary(deliveryOrders,'original'),b=deliverySummary(deliveryOrders,'revised');
 assert.deepEqual([a.onTime,a.inFull,a.otif,a.received,a.onTimeUnits],[80,80,60,960,760]);
 assert.deepEqual(a.groups.map(g=>g.length),[6,2,2,0]);
 assert.deepEqual([b.onTime,b.inFull,b.otif,b.received,b.onTimeUnits],[100,80,80,960,960]);
 assert.deepEqual(b.groups.map(g=>g.length),[8,2,0,0]);
 assert.equal(JSON.stringify(deliveryOrders),source);
 assert.deepEqual(a.groups.flat().map(o=>o.id).sort(),deliveryOrders.map(o=>o.id).sort());
});
test('Delivery boundary is inclusive; short and unreceived orders cannot pass',()=>{
 const order=deliveryOrders[0];
 assert.equal(assessDelivery({...order,receipt:780},'original').otif,true);
 assert.equal(assessDelivery({...order,receipt:781},'original').onTime,false);
 assert.equal(assessDelivery({...order,receipt:479},'original').onTime,false);
 assert.equal(assessDelivery({...order,accepted:99},'original').otif,false);
 assert.equal(assessDelivery({...order,receipt:1030},'original').inFull,false);
 assert.deepEqual([deliverySummary([],'original').onTime,deliverySummary([],'original').otif],[null,null]);
});
test('Each endpoint relationship produces its own earliest dates',()=>{
 assert.deepEqual(dependencyTypes.map(t=>{const r=dependencyWindow(t,0);return[r.bStart,r.bFinish]}),[[10,13],[4,7],[7,10],[1,4]]);
 assert.deepEqual(dependencyTypes.map(t=>{const r=dependencyWindow(t,2);return[r.bStart,r.bFinish]}),[[12,15],[6,9],[9,12],[3,6]]);
 for(const type of dependencyTypes)for(let lag=0;lag<=3;lag++){
  const r=dependencyWindow(type,lag),end=type[1]==='F'?r.bFinish:r.bStart;
  assert.equal(end,r.requiredEndpoint);assert.equal(r.bFinish-r.bStart,3);assert.equal(r.aFinish,10);
 }
});
test('Start boundary can make the controlled finish later than its minimum',()=>{
 const r=dependencyWindow('SF',0,1,4,3,0);
 assert.deepEqual([r.bStart,r.bFinish,r.requiredEndpoint],[0,3,1]);
 assert.throws(()=>dependencyWindow('FS',-1));assert.throws(()=>dependencyWindow('FF',NaN));assert.throws(()=>dependencyWindow('SS',0,4,6,0));
});
