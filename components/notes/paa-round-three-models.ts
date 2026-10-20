export function customerCost(orders: number) {
  if (!Number.isInteger(orders) || orders < 1 || orders > 20) throw new RangeError('Orders must be a whole number from 1 to 20.');
  const handling = orders * 12, delivery = orders * 35, specialPacking = 200, returns = 60;
  const service = handling + delivery + specialPacking + returns;
  return {orders, handling, delivery, specialPacking, returns, service, result: 10000 - 7000 - service, reduction: 1200 - service};
}
export type Mix = {a: number; b: number; minutes: number; throughput: number; afterExpense: number};
function mix(a: number, b: number): Mix {
  const throughput = a * 60 + b * 40;
  return {a, b, minutes: a * 30 + b * 10, throughput, afterExpense: throughput - 1000};
}
export function throughputMix(bDemand: number) {
  if (!Number.isInteger(bDemand) || bDemand < 0 || bDemand > 30) throw new RangeError('B demand must be a whole number from 0 to 30.');
  const aFirst = mix(20, 0), bFirst = mix(Math.min(20, Math.floor((600 - 10 * bDemand) / 30)), bDemand);
  let best = aFirst;
  for (let a = 0; a <= 20; a++) for (let b = 0; b <= bDemand; b++) {
    const candidate = mix(a, b);
    if (candidate.minutes <= 600 && candidate.throughput > best.throughput) best = candidate;
  }
  return {bDemand, aFirst, bFirst, best};
}
