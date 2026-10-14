export function rolloutModel(benefitB: number, setupB: number) {
  const a = { benefit: 60000, support: 12000, setup: 10000 };
  const b = { benefit: benefitB, support: 12000, setup: setupB };
  const shared = 40000;
  return {
    a, b, shared,
    gross: a.benefit + b.benefit,
    recurring: a.benefit + b.benefit - a.support - b.support,
    upfront: shared + a.setup + b.setup,
    firstYear: a.benefit + b.benefit - a.support - b.support - shared - a.setup - b.setup,
    incrementalB: b.benefit - b.support - b.setup,
    breakEvenBenefitB: a.support + b.support + shared + a.setup + b.setup - a.benefit,
  };
}

export function stockoutModel(stock: number, forecast: number, demand = 100) {
  const sales = Math.min(stock, demand);
  return {
    stock, forecast, demand, sales,
    unfilled: demand - sales,
    salesError: sales === 0 ? null : Math.abs(forecast - sales) / sales * 100,
    demandError: demand === 0 ? null : Math.abs(forecast - demand) / demand * 100,
  };
}

export function robotModel(productiveShare: number, rate: number, supportMinutes: number) {
  const tasks = 300000, hours = 4000, labourRate = 35, manualRate = 120;
  const manual = { name: "Manual work", capitalAndOperating: 0, robotTasks: 0, backupTasks: tasks, supportHours: 0, backupHours: tasks / manualRate, total: tasks / manualRate * labourRate };
  const robot = (name: string, fixed: number, share: number, pace: number, support: number) => {
    const capacity = hours * share / 100 * pace;
    const robotTasks = Math.min(tasks, capacity);
    const backupTasks = tasks - robotTasks;
    const supportHours = robotTasks / 100 * support / 60;
    const backupHours = backupTasks / manualRate;
    return { name, capitalAndOperating: fixed, capacity, robotTasks, backupTasks, supportHours, backupHours, total: fixed + (supportHours + backupHours) * labourRate };
  };
  const conventional = robot("Conventional robot", 36000, 90, 100, 1);
  const humanoid = robot("Humanoid + backup", 48000, productiveShare, rate, supportMinutes);
  return { tasks, hours, labourRate, manualRate, manual, conventional, humanoid };
}
