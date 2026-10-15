export type PurchaseGroup='routine'|'competitive'|'bottleneck'|'strategic';
export function purchasingScenario(exits:boolean){return [
 {name:'Office labels',spend:4000,group:'routine' as PurchaseGroup,impact:'Lower impact: modest cost and approved substitutes.',risk:'Lower risk: several available sources.',action:'Standardise and simplify ordering.'},
 {name:'Cartons',spend:600000,group:(exits?'strategic':'competitive') as PurchaseGroup,impact:'Higher impact: a substantial production input cost.',risk:exits?'Higher risk: one qualified source remains; no replacement is approved.':'Lower risk: three independent qualified sources have capacity.',action:exits?'Confirm capacity and continuity; qualify an alternative.':'Compare complete offers from qualified sources.'},
 {name:'Specialist reagent',spend:8000,group:'bottleneck' as PurchaseGroup,impact:'Lower impact here: limited testing work has a qualified external-lab fallback at acceptable extra cost.',risk:'Higher risk: one qualified product source and a long replenishment lead time.',action:'Confirm supply and the laboratory fallback.'},
 {name:'Control module',spend:12000,group:'strategic' as PurchaseGroup,impact:'Higher impact: missing supply can stop a critical line.',risk:'Higher risk: one qualified source, no approved substitute.',action:'Plan continuity with maintenance and engineering.'},
 ];}
export const REQUIREMENTS=[
 {id:'R01',requirement:'Post the selected released lot and quantity.',source:'DW-01 v1 / dispatch lead',implementation:'Build 1 posting function',test:'T01 passed: released-lot posting',decision:'Linked passing evidence; review case coverage.'},
 {id:'R02',requirement:'Block dispatch of a held lot; show its ID and hold reason.',source:'DW-01 v1 / quality lead',implementation:'No implementation link recorded',test:'No test or result recorded',decision:'Gap: find the implementation and test evidence.'},
 {id:'R03',requirement:'Retain the dispatch user and posting time.',source:'DW-01 v1 / dispatch lead',implementation:'Build 1 dispatch history',test:'T03 passed: user and time',decision:'Linked passing evidence; review case coverage.'},
];
export const EXECUTED_TESTS=[{id:'T01',requirement:'R01',passed:true},{id:'T03',requirement:'R03',passed:true},{id:'T99',requirement:null,passed:true}];
export function traceReview(){return {executed:EXECUTED_TESTS.length,passed:EXECUTED_TESTS.filter(t=>t.passed).length,requirements:REQUIREMENTS.length,withPassingEvidence:REQUIREMENTS.filter(r=>EXECUTED_TESTS.some(t=>t.requirement===r.id&&t.passed)).length,unmapped:EXECUTED_TESTS.filter(t=>t.requirement===null).map(t=>t.id)};}
