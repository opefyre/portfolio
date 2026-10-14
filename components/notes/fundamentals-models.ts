export type WorkStep = {id:string;label:string;kind:"manual"|"walk"|"machine"|"wait";start:number;end:number};
export function packingCycle(demand=420,walk=6) {
  if(!Number.isFinite(demand)||demand<=0||!Number.isFinite(walk)||walk<0)throw new Error("Use positive demand and nonnegative walking time");
  const availableSeconds=420*60,takt=availableSeconds/demand;
  const returnTime=17+walk,unload=Math.max(25,returnTime),wait=Math.max(0,25-returnTime),cycle=unload+23;
  const steps:WorkStep[]=[
    {id:"load",label:"Load the prepared carton",kind:"manual",start:0,end:5},
    {id:"seal",label:"Automatic sealing",kind:"machine",start:5,end:25},
    {id:"prepare",label:"Prepare the next carton",kind:"manual",start:5,end:17},
    {id:"walk",label:"Walk back to the sealer",kind:"walk",start:17,end:returnTime},
    {id:"wait",label:"Wait for sealing to finish",kind:"wait",start:returnTime,end:unload},
    {id:"check",label:"Unload and check the seal",kind:"manual",start:unload,end:unload+8},
    {id:"label",label:"Apply and verify the label",kind:"manual",start:unload+8,end:unload+18},
    {id:"move",label:"Move the finished carton",kind:"manual",start:unload+18,end:cycle},
  ];
  return {demand,walk,availableSeconds,takt,wait,cycle,margin:takt-cycle,manual:40,steps,axisMax:Math.ceil(Math.max(takt,cycle)/20)*20};
}

export type MaterialRow = {id:string;name:string;perStand:number;stock:number;receipt:number;receiptWeek:number|null;lead:number;pack:number};
export function materialPlan(bracketReceiptWeek=4,bracketLead=2,boltPack=1) {
  if(!Number.isInteger(bracketReceiptWeek)||bracketReceiptWeek<1||!Number.isInteger(bracketLead)||bracketLead<1||!Number.isInteger(boltPack)||boltPack<1)throw new Error("Use positive whole weeks and pack sizes");
  const stands=50,needWeek=5,planningWeek=2;
  const inputs:MaterialRow[]=[
    {id:"brackets",name:"Brackets",perStand:2,stock:20,receipt:30,receiptWeek:bracketReceiptWeek,lead:bracketLead,pack:1},
    {id:"bases",name:"Bases",perStand:1,stock:10,receipt:0,receiptWeek:null,lead:1,pack:1},
    {id:"bolts",name:"Bolts",perStand:4,stock:80,receipt:100,receiptWeek:4,lead:1,pack:boltPack},
  ];
  const rows=inputs.map(item=>{
    const gross=stands*item.perStand;
    const onTime=item.receiptWeek!==null&&item.receiptWeek<=needWeek?item.receipt:0;
    const net=Math.max(0,gross-item.stock-onTime),proposed=Math.ceil(net/item.pack)*item.pack;
    const release=proposed>0?needWeek-item.lead:null;
    const atNeed=item.stock+onTime+proposed-gross;
    const later=item.receipt-onTime;
    return {...item,gross,onTime,net,proposed,release,lateRelease:release!==null&&release<planningWeek,atNeed,later,laterBalance:atNeed+later};
  });
  return {stands,needWeek,planningWeek,rows};
}

export type Package = {id:string;scopeKey:string;title:string;owner:string;includes:string;excludes:string;acceptance:string;evidence:string};
export type ScopeGroup = {id:string;title:string;items:Package[]};
const pkg=(id:string,title:string,owner:string,includes:string,excludes:string,acceptance:string,evidence:string):Package=>({id,scopeKey:id,title,owner,includes,excludes,acceptance,evidence});
export const WBS:ScopeGroup[]=[
 {id:"1",title:"Approved design",items:[
  pkg("1.1","Approved requirements","Warehouse owner","Receiving and picking requirements for one zone and two shifts.","Other warehouses and ERP replacement.","Warehouse owner accepts the pilot boundary, transaction cases and exception rules.","Approved requirements record."),
  pkg("1.2","Approved label specification","Process engineer","Bin identifiers, barcode content, print format and position.","Installing the labels, covered by 2.2.","Trial labels scan correctly on the configured device at the agreed locations.","Approved label sample and scan check."),
  pkg("1.3","Verified pilot master data","Data owner","The 120 bin records, agreed item identifiers and units of measure.","Cleaning the whole company's master data.","Every pilot bin has one unique identifier and agreed item/unit mappings are checked.","Pilot data check and owner acceptance."),
 ]},
 {id:"2",title:"Working solution",items:[
  pkg("2.1","Configured scanners","Systems lead","Devices, access and configuration needed for the pilot users.","ERP transaction interface, covered by 2.3.","Named pilot users can sign in and read the approved labels in the pilot zone.","Device and access checks."),
  pkg("2.2","Installed bin labels","Warehouse lead","Installation and verification of labels on all 120 pilot bins.","Designing the label specification, covered by 1.2.","All 120 labels scan to the expected physical bin with no duplicate identifiers.","Bin-by-bin verification record."),
  pkg("2.3","Tested ERP interface","Integration lead","Receiving and picking transactions for the agreed zone.","ERP replacement and transactions from other warehouses.","Agreed receipt and picking cases post once to the correct item, quantity and bin; retrying a failed transfer creates no duplicate.","Test-case results and warehouse-owner acceptance."),
 ]},
 {id:"3",title:"Accepted pilot",items:[
  pkg("3.1","Accepted pilot results","Warehouse owner","Agreed receiving, picking and exception cases on both shifts.","A rollout beyond the pilot zone.","Pilot outcomes meet the agreed criteria, with outstanding exceptions explicitly accepted or resolved.","Pilot results and acceptance record."),
  pkg("3.2","Trained pilot users","Training lead","The named users on both pilot shifts and their training record.","Ongoing incident support, covered by 4.2.","Users demonstrate the agreed transactions and escalation steps, rather than only attend a briefing.","Observed task checks and training sign-off."),
 ]},
 {id:"4",title:"Supported handover",items:[
  pkg("4.1","Approved handover and rollback","Deployment lead","Release steps, fallback method and the handover record.","Permanent support ownership, covered by 4.2.","Warehouse and systems owners accept readiness, the fallback route and any open items.","Handover approval and rollback check."),
  pkg("4.2","Assigned support","Operations lead","Named support, coverage for both shifts and escalation contacts.","User training, covered by 3.2.","Each pilot shift knows who responds to a failed scan or transfer and who provides backup.","Accepted support rota and escalation record."),
 ]},
 {id:"5",title:"Project management",items:[
  pkg("5.1","Controlled plan and decisions","Project manager","Scope baseline, schedule, reviews, risks and approved changes.","The technical deliverables managed by other packages.","Owners use the agreed plan and material decisions are recorded with approval.","Current plan and decision records."),
  pkg("5.2","Accepted closure","Project manager","Final acceptance, open-action ownership and lessons from this pilot.","Delivery of the next warehouse rollout.","Sponsor accepts closure and a named owner receives every remaining action.","Closure acceptance and action handover."),
 ]},
];
export type WbsScenario="complete"|"gap"|"overlap";
export function scopeExample(scenario:WbsScenario="complete") {
  const groups=WBS.map(group=>({...group,items:group.items.filter(item=>!(scenario==="gap"&&item.id==="2.3")).map(item=>({...item}))}));
  if(scenario==="overlap"){
    const support=WBS.flatMap(g=>g.items).find(p=>p.id==="4.2")!;
    groups[1].items.push({...support,id:"2.4",owner:"Systems lead"});
  }
  const items=groups.flatMap(g=>g.items),required=WBS.flatMap(g=>g.items);
  const keys=new Set(items.map(p=>p.scopeKey)),missing=required.filter(p=>!keys.has(p.scopeKey));
  const duplicated=required.filter(p=>items.filter(i=>i.scopeKey===p.scopeKey).length>1);
  return {groups,items,covered:keys.size,required:required.length,missing,duplicated};
}
