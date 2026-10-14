export const weeklyPurchases = [98, 102, 99, 101, 100, 100, 97, 103];
export function batchOrders(demand: readonly number[], cadence: number) {
  if (!Number.isInteger(cadence) || cadence < 1) throw new Error("Positive whole-week cadence required.");
  let pending = 0;
  return demand.map((units, i) => {
    pending += units;
    const order = (i + 1) % cadence === 0 ? pending : 0;
    pending -= order;
    return { week: i + 1, received: units, order, pending };
  });
}
export function bullwhip(retailerCadence: number, distributorCadence: number) {
  const retailer = batchOrders(weeklyPurchases, retailerCadence);
  const distributor = batchOrders(retailer.map(r => r.order), distributorCadence);
  return { retailer, distributor, total: weeklyPurchases.reduce((s, q) => s + q, 0) };
}

export const annualDemand = 12000, holdingCost = 3;
export function eoqCosts(quantity: number, orderingCost = 60) {
  if (quantity <= 0 || orderingCost <= 0) throw new Error("Positive quantity and cost required.");
  const orders = annualDemand / quantity;
  const ordering = orders * orderingCost;
  const holding = quantity / 2 * holdingCost;
  return { quantity, orders, averageStock: quantity / 2, ordering, holding, total: ordering + holding };
}
export function eoqChoice(orderingCost = 60, pack = 1, minimum = 0) {
  if (pack < 1 || !Number.isInteger(pack) || minimum < 0) throw new Error("Invalid order constraints.");
  const optimum = Math.sqrt(2 * annualDemand * orderingCost / holdingCost);
  const minFeasible = Math.max(pack, Math.ceil(minimum / pack) * pack);
  const candidates = [...new Set([Math.max(minFeasible, Math.floor(optimum / pack) * pack), Math.max(minFeasible, Math.ceil(optimum / pack) * pack)])];
  const best = candidates.map(q => eoqCosts(q, orderingCost)).sort((a, b) => a.total - b.total)[0];
  return { optimum, minimumCost: eoqCosts(optimum, orderingCost).total, best, candidates };
}

export function sopPlan(prebuild: number, overtimeLimit: number) {
  if (prebuild < 0 || prebuild > 1500 || overtimeLimit < 0 || overtimeLimit > 2000) throw new Error("Outside the fictional capacity limits.");
  const demand = 12000, normal = 10000;
  const overtime = Math.min(demand - normal - prebuild, overtimeLimit);
  const supply = prebuild + normal + overtime;
  const uncovered = demand - supply;
  const holding = prebuild * 0.8, overtimePremium = overtime * 4;
  return { demand, normal, prebuild, overtime, supply, uncovered, holding, overtimePremium, extraCost: holding + overtimePremium };
}
