import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterNotes, type NotesIndexItem } from './notes-index';
const note=(slug:string,title:string,topic:string,keywords:string[]=[]):NotesIndexItem=>({slug,title,topic,keywords,summary:'A worked example.',date:'2026-10-20',displayDate:'20 Oct 2026',readingMinutes:5,image:'/test.webp'});
const notes=[note('accuracy','MAPE vs WAPE','Supply chain',['forecast accuracy']),note('bias','Forecast bias','Supply chain',['demand']),note('owner','Project ownership','Project management',['RACI matrix'])];
test('search combines title and keyword terms and ignores case and punctuation',()=>{
 assert.deepEqual(filterNotes(notes,'  mape/WAPE accuracy  ','').map(n=>n.slug),['accuracy']);
 assert.deepEqual(filterNotes(notes,'RACI','').map(n=>n.slug),['owner']);
 assert.deepEqual(filterNotes(notes,'forecast','').map(n=>n.slug),['accuracy','bias']);
});
test('category and query are intersected without reordering or losing zero-result states',()=>{
 assert.deepEqual(filterNotes(notes,'forecast','Project management'),[]);
 assert.deepEqual(filterNotes(notes,'','Supply chain').map(n=>n.slug),['accuracy','bias']);
 assert.deepEqual(filterNotes(notes,'   ','').map(n=>n.slug),notes.map(n=>n.slug));
 assert.deepEqual(filterNotes(notes,'unmatched',''),[]);
});
