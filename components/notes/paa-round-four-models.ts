/** Two-sided probability-based Fisher exact test for independently observed counts. */
export function fisherComparison(beforeLate:number,beforeTotal:number,afterLate:number,afterTotal:number) {
 for(const n of [beforeLate,beforeTotal,afterLate,afterTotal])if(!Number.isFinite(n)||!Number.isInteger(n))throw Error('Use whole-number counts.');
 for(const n of [beforeTotal,afterTotal])if(n<1||n>500)throw Error('Each group needs 1 to 500 observations.');
 if(beforeLate<0||afterLate<0||beforeLate>beforeTotal||afterLate>afterTotal)throw Error('Late counts must be between zero and their group total.');
 const n=beforeTotal+afterTotal,k=beforeLate+afterLate,lf=[0];
 for(let i=1;i<=n;i++)lf[i]=lf[i-1]+Math.log(i);
 const choose=(a:number,b:number)=>lf[a]-lf[b]-lf[a-b];
 const probability=(x:number)=>choose(k,x)+choose(n-k,beforeTotal-x)-choose(n,beforeTotal);
 const lo=Math.max(0,beforeTotal-(n-k)),hi=Math.min(k,beforeTotal),observed=probability(beforeLate);
 let p=0,totalProbability=0;
 for(let x=lo;x<=hi;x++){const lp=probability(x),pr=Math.exp(lp);totalProbability+=pr;if(lp<=observed+1e-10)p+=pr;}
 return {beforeRate:beforeLate/beforeTotal,afterRate:afterLate/afterTotal,difference:beforeLate/beforeTotal-afterLate/afterTotal,p:Math.min(1,p),totalProbability,beforeOnTime:beforeTotal-beforeLate,afterOnTime:afterTotal-afterLate};
}
