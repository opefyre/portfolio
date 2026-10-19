export const training = [80,100,120,160,90,110,140,180];
export const actual = [100,125,150,190];
export const methods = ["Last quarter", "Same quarter last year", "Drift"] as const;
export type ForecastMethod = typeof methods[number];
export function forecast(method: ForecastMethod): number[] {
  if(method === "Last quarter") return actual.map(()=>training[7]);
  if(method === "Same quarter last year") return training.slice(4);
  const slope=(training[7]-training[0])/(training.length-1);
  return actual.map((_,i)=>training[7]+(i+1)*slope);
}
export function score(method: ForecastMethod, horizon: number) {
  const f=forecast(method).slice(0,horizon), a=actual.slice(0,horizon);
  const total=a.reduce((s,v)=>s+v,0);
  const signed=f.reduce((s,v,i)=>s+v-a[i],0);
  const absolute=f.reduce((s,v,i)=>s+Math.abs(v-a[i]),0);
  return {total, signed, absolute, mae:absolute/a.length, wape:100*absolute/total, bias:100*signed/total};
}
