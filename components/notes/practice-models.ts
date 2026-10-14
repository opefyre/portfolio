export const specialistWork = [
  {name:"ERP promise rules", requested:10, kind:"erp"},
  {name:"Barcode project", requested:8, kind:"barcode"},
  {name:"Invoice automation", requested:6, kind:"invoice"},
  {name:"Ongoing support", requested:4, kind:"support"},
] as const;
export const allocationOptions = [
  {id:"all", label:"All requests", days:[10,8,6,4], note:"All 28 days remain in this window. Any shortage needs an explicit decision before these commitments can be accepted."},
  {id:"defer", label:"Defer invoices", days:[10,8,0,4], note:"Six invoice days move outside the window. The dispatch work and support still require 22 days."},
  {id:"phase", label:"Phase barcode work", days:[10,6,0,4], note:"Two barcode days and six invoice days move outside the window. The full barcode deliverable and combined dispatch benefit remain incomplete."},
] as const;
export type AllocationOption = typeof allocationOptions[number]["id"];
export function allocationResult(option:AllocationOption, capacity:number) {
  if(!Number.isInteger(capacity)||capacity<16||capacity>32)throw new RangeError("Capacity must be an integer from 16 to 32 specialist-days.");
  const selected=allocationOptions.find(v=>v.id===option);
  if(!selected)throw new RangeError("Unknown allocation option.");
  const rows=specialistWork.map((w,i)=>({...w,assigned:selected.days[i],deferred:w.requested-selected.days[i]}));
  const requested=rows.reduce((s,r)=>s+r.requested,0),assigned=rows.reduce((s,r)=>s+r.assigned,0),deferred=rows.reduce((s,r)=>s+r.deferred,0);
  return {rows,requested,assigned,deferred,overload:Math.max(0,assigned-capacity),unallocated:Math.max(0,capacity-assigned),note:selected.note};
}
