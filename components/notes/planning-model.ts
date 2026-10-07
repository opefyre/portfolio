export const planningAssumptions = {
  stock: 200,
  overtimeUnits: 200,
  overtimeSetup: 300,
  overtimePremium: 2,
  externalUnits: 400,
  externalPremium: 4,
  externalFreight: 100,
  lateCost: 8,
  carryCost: 2,
} as const;

export function comparePlanningOptions(demand: number, regularOutput: number) {
  const a = planningAssumptions;
  const base = a.stock + regularOutput;
  const options = [
    { id: "regular", name: "Regular production", extra: 0, premium: 0 },
    { id: "overtime", name: "Add overtime", extra: a.overtimeUnits, premium: a.overtimeSetup + a.overtimeUnits * a.overtimePremium },
    { id: "external", name: "Buy externally", extra: a.externalUnits, premium: a.externalFreight + a.externalUnits * a.externalPremium },
  ];
  return options.map(option => {
    const available = base + option.extra;
    const late = Math.max(0, demand - available);
    const leftover = Math.max(0, available - demand);
    const lateCost = late * a.lateCost;
    const carryCost = leftover * a.carryCost;
    return { ...option, available, late, leftover, lateCost, carryCost, total: option.premium + lateCost + carryCost };
  });
}
