import assert from "node:assert/strict";
import test from "node:test";
import { classify, DEFAULT_RULE, STOCK, usageStats, type StockItem } from "./abc-xyz-model";

test("the worked catalogue reconciles to 100,000 euros and the stated groups", () => {
  const m = classify(STOCK);
  assert.equal(m.total, 100000);
  assert.equal(m.excluded, 0);
  assert.deepEqual(m.rows.map(r => [r.id, r.value, r.cell]), [["labels",48000,"AX"],["cartons",32000,"AZ"],["tape",12000,"BY"],["film",3000,"BX"],["fluid",2000,"CY"],["gloves",1500,"CX"],["batteries",1000,"CZ"],["fuses",500,"CZ"]]);
  assert.deepEqual(["A","B","C"].map(c => m.rows.filter(r => r.abc === c).reduce((s,r) => s + r.value!,0)), [80000,15000,5000]);
  assert.equal(m.rows[1].cumulative, 0.8);
  assert.equal(m.rows[3].cumulative, 0.95);
});
test("CV uses monthly units and population SD, without rounding before classification", () => {
  const tape = usageStats(STOCK[2].monthly)!;
  assert.equal(tape.mean,100);
  assert.ok(Math.abs(tape.sd - Math.sqrt(5000/3)) < 1e-10);
  assert.ok(Math.abs(tape.cv! - 0.408248290463863) < 1e-10);
  assert.equal(usageStats(STOCK[0].monthly)!.cv, 0);
  const scaled = usageStats(STOCK[2].monthly.map(n => n! * 10))!;
  assert.ok(Math.abs(scaled.cv! - tape.cv!) < 1e-12);
});
test("changed cutoffs reclassify items while preserving values and criticality", () => {
  const m = classify(STOCK,{a:.7,b:.9,x:.5,y:1});
  assert.equal(m.total,100000);
  assert.equal(m.rows.find(r=>r.id==="cartons")!.cell,"AY");
  assert.equal(m.rows.find(r=>r.id==="film")!.cell,"CX");
  assert.equal(m.rows.find(r=>r.id==="tape")!.cell,"BX");
  assert.equal(m.rows.find(r=>r.id==="fuses")!.critical,true);
});
test("whole-item boundary rule keeps the crossing item in its current group", () => {
  const item = (id:string,annual:number): StockItem => ({id,name:id,unit:"units",unitCost:1,monthly:[annual,...Array(11).fill(0)]});
  const m=classify([item("a",790),item("b",150),item("c",50),item("d",10)]);
  assert.deepEqual(m.rows.map(r=>r.abc),["A","A","B","C"]);
  assert.equal(m.rows[1].cumulative,.94);
  const tied=classify([item("z",10),item("a",10)]);
  assert.deepEqual(tied.rows.map(r=>r.id),["a","z"]);
});
test("missing months remain missing; a full zero year has undefined CV", () => {
  assert.equal(usageStats([null,...Array(11).fill(0)]),null);
  assert.equal(usageStats(Array(11).fill(1)),null);
  assert.equal(usageStats([-1,...Array(11).fill(0)]),null);
  assert.equal(usageStats(Array(12).fill(0))!.cv,null);
  const zero: StockItem={id:"zero",name:"Zero",unit:"units",unitCost:1,monthly:Array(12).fill(0)};
  const m=classify([zero]);
  assert.equal(m.total,0);
  assert.equal(m.rows[0].cell,null);
  assert.equal(m.excluded,1);
  assert.throws(()=>classify(STOCK,{...DEFAULT_RULE,a:.96}));
});
