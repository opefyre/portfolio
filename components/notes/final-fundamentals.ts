export const DOE_CELLS = [
 {id:'A',temperature:160,speed:20,readings:[19,20,21]},
 {id:'B',temperature:180,speed:20,readings:[25,26,27]},
 {id:'C',temperature:160,speed:30,readings:[17,18,19]},
 {id:'D',temperature:180,speed:30,readings:[13,14,15]},
] as const;
export const DOE_ORDER=['C','A','D','B','B','C','A','D','C','B','D','A'] as const;
export const mean=(values:readonly number[])=>values.reduce((a,b)=>a+b,0)/values.length;
export function doeChange(speed:20|30){const cells=DOE_CELLS.filter(c=>c.speed===speed);return mean(cells[1].readings)-mean(cells[0].readings);}
export const SOFTWARE_ROUTES=[
 {name:'Existing workflow',upfront:8,annual:8,exit:2},
 {name:'Configured module',upfront:20,annual:9,exit:5},
 {name:'Separate app',upfront:15,annual:16,exit:10},
 {name:'Custom build',upfront:60,annual:12,exit:2},
] as const;
export function routeCosts(years:number){if(!Number.isInteger(years)||years<3||years>8)throw new Error('Use a whole service horizon from 3 to 8 years');return SOFTWARE_ROUTES.map(r=>({...r,recurring:r.annual*years,total:r.upfront+r.annual*years+r.exit}));}
export const PROJECT_CASH={A:[-40000,25000,20000,5000,5000],B:[-40000,10000,15000,20000,25000]} as const;
export function appraise(cash:readonly number[],rate:number){
 if(!Number.isFinite(rate)||rate<0)throw new Error('Use a non-negative rate');
 const discounted=cash.map((c,t)=>c/(1+rate)**t);let balance=0,discountedBalance=0,payback:number|null=null,discountedPayback:number|null=null;
 const rows=cash.map((c,t)=>{balance+=c;discountedBalance+=discounted[t];if(t>0&&balance>=0&&payback===null)payback=t;if(t>0&&discountedBalance>=0&&discountedPayback===null)discountedPayback=t;return {year:t,cash:c,presentValue:discounted[t],balance,discountedBalance};});
 return {rows,npv:discounted.reduce((a,b)=>a+b,0),payback,discountedPayback};
}
export function debtEffort(changes:number,fix=24){if(!Number.isInteger(changes)||changes<0||!Number.isFinite(fix)||fix<0)throw new Error('Use non-negative effort and a whole change count');return {leave:10*changes,fix:fix+4*changes,equalChanges:fix/6};}
export const ACCESS_ACTIONS=['View stock','Post receipt','Request adjustment','Approve adjustment','Manage users'] as const;
export const ACCESS_ROLES=[{name:'Viewer',permissions:[true,false,false,false,false]},{name:'Receiver',permissions:[true,true,false,false,false]},{name:'Adjuster',permissions:[true,false,true,false,false]},{name:'Approver',permissions:[true,false,false,true,false]},{name:'Administrator',permissions:[true,true,true,true,true]}] as const;
export function contractorAccess(admin:boolean,expired:boolean){return ACCESS_ACTIONS.map((action,i)=>({action,allowed:!expired&&(admin||i<2)}));}
