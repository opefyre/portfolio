import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scheduleFlow, itemState, type TransferSize } from './batch-flow-model';
test('known equal-time cases', () => {
  assert.equal(scheduleFlow(10, [1,1,1]).first, 21);
  assert.equal(scheduleFlow(10, [1,1,1]).finish, 30);
  assert.equal(scheduleFlow(1, [1,1,1]).first, 3);
  assert.equal(scheduleFlow(1, [1,1,1]).finish, 12);
});
test('group releases and station capacity hold across configurations', () => {
  for (const batch of [1,2,5,10] as TransferSize[]) for (const times of [[1,1,1],[1,3,1],[5,1,2]]) {
    const s = scheduleFlow(batch,times);
    for (const op of s.operations) {
      assert.equal(op.end-op.start,times[op.station]);
      if (op.item) assert.ok(op.start >= s.operations.find(p=>p.station===op.station && p.item===op.item-1)!.end);
      if (op.station) assert.ok(op.start >= s.operations.find(p=>p.station===op.station-1 && p.item===Math.floor(op.item/batch)*batch+batch-1)!.end);
    }
    assert.equal(s.completions.length,10);
    assert.equal(itemState(s,9,s.finish).label,'Finished');
    assert.ok(s.averageWaiting >= 0);
  }
});
test('intermediate transfer sizes have checked completion times',()=>{assert.equal(scheduleFlow(2,[1,1,1]).first,5);assert.equal(scheduleFlow(2,[1,1,1]).finish,14);assert.equal(scheduleFlow(5,[1,1,1]).first,11);assert.equal(scheduleFlow(5,[1,1,1]).finish,20);});
test('rejects invalid durations',()=>assert.throws(()=>scheduleFlow(1,[0,1,1])));

test('pallet slots never change when other pieces arrive or leave', async()=>{
  const { palletState } = await import('./batch-flow-pallet');
  const s = scheduleFlow(5,[1,1,1]);
  for (let item=0;item<10;item++) {
    const initial = palletState(s,item,0);
    assert.equal(initial.pallet,0);
    for (let time=0;time<=s.finish;time+=.25) {
      const state=palletState(s,item,time);
      assert.equal(state.slotX,initial.slotX);
      assert.equal(state.slotZ,initial.slotZ);
    }
  }
  assert.equal(palletState(s,0,4.9).pallet,1);
  for (let item=0;item<5;item++) assert.equal(palletState(s,item,5).pallet,2);
  assert.equal(palletState(s,5,5).pallet,1);
});

test('continuous playback repeats after the result hold',async()=>{
  const { advancePlayback } = await import('./batch-flow-playback');
  assert.equal(advancePlayback(29,1,30),30);
  assert.equal(advancePlayback(30,1,30),31);
  assert.equal(advancePlayback(31,1.5,30),.5);
});
