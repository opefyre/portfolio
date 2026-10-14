import assert from 'node:assert/strict';
import test from 'node:test';
import {inventoryCases,inventoryRatios,readinessOrders,readinessSummary,acceptanceCases} from './performance-models';
test('Turnover and days use the same cost basis and period; lower balances do not always mean more turns',()=>{
 const a=inventoryRatios(1200000,(160000+240000)/2); assert.equal(a.turns,6);assert.ok(Math.abs(a.days-60.8333333333)<1e-8);
 assert.deepEqual(inventoryCases.map(c=>inventoryRatios(c.cogs,c.average).turns),[6,8,6]);
 assert.equal(inventoryRatios(300000,200000,90).days,60);
 assert.equal(inventoryRatios(1800000,200000).turns,9);
 for(const bad of [0,-1,NaN,Infinity])assert.throws(()=>inventoryRatios(bad,200000));
 assert.equal(inventoryRatios(1200000,100000).turns,12);assert.equal(inventoryRatios(900000,300000).turns,3);
});
test('Readiness and later dispatch retain identities, including a ready failure and three recovered warnings',()=>{
 assert.equal(new Set(readinessOrders.map(o=>o.id)).size,10);
 assert.deepEqual([readinessSummary('all').ready,readinessSummary('all').onTime],[6,8]);
 assert.deepEqual([readinessSummary('ready').total,readinessSummary('ready').onTime,readinessSummary('ready').late],[6,5,1]);
 assert.deepEqual([readinessSummary('not-ready').total,readinessSummary('not-ready').onTime,readinessSummary('not-ready').late],[4,3,1]);
});
test('A correct partial transfer can still fail acceptance; duplicate picks do not count as shipped goods',()=>{
 const partial=acceptanceCases[1];assert.equal(partial.requested-partial.shipped,partial.expectedOpen);assert.equal(partial.transferPass,true);assert.equal(partial.acceptancePass,false);assert.equal(partial.visibleOpen,null);
 assert.equal(acceptanceCases[0].acceptancePass,true);
 assert.equal(acceptanceCases[2].picks,2);assert.equal(acceptanceCases[2].shipped,0);assert.equal(acceptanceCases[2].transferPass,false);
 for(const c of acceptanceCases)assert.equal(c.shipped+c.expectedOpen,c.requested);
});
