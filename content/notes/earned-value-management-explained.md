---
title: Earned value management: follow a €200k project
date: 2026-09-29
updated: 2026-10-23
summary: Follow a €200k warehouse-system project through planned value, earned value and actual cost. Calculate CPI, SPI, EAC and TCPI, then check the assumptions behind the forecasts.
status: published
topic: Project management
keywords: earned value management, EVM, CPI, SPI, estimate at completion, EAC, TCPI, earned schedule, cost performance index, project controls, PMP
seoTitle: Earned value management: CPI, SPI and EAC formulas
seoDescription: Calculate CPI, SPI and EAC with a €200k project example. Learn PV, EV, AC and TCPI, compare forecast formulas and understand where SPI misleads.
---

"We've spent 40% of the budget and we're about 40% done." Before accepting that update, check which work the team completed and how it measured progress.

**Project teams use earned value management (EVM) to compare planned work, measured progress and actual cost on the same budget basis.** They can then investigate variances and forecast the cost of the remaining work. The forecast depends on their assumptions about that work.

:::card The short version
- **PV** (planned value): what the plan said should be done by now, in budget terms.
- **EV** (earned value): what is actually done, valued at its budget.
- **AC** (actual cost): what the done work actually cost.
- **CPI = EV ÷ AC** tells you cost efficiency. **SPI = EV ÷ PV** tells you schedule efficiency. Below 1.0 calls for investigation.
- The most common forecast is **EAC = BAC ÷ CPI**: the final cost if the current efficiency continues.
:::

## Three numbers

:::grid
- **Planned value (PV)** The budgeted cost of the work scheduled up to today. It comes straight from your baseline plan.
- **Earned value (EV)** The budgeted cost of the work actually completed up to today. The key idea: you earn the *budget* of a task by finishing it, whatever it really cost.
- **Actual cost (AC)** What you actually spent on the work completed up to today, from timesheets and invoices.
:::

One more you'll need: **BAC**, the budget at completion, which is simply the total budget.

## The example: a €200k, ten-month program

A company is replacing its warehouse management system. The budget (BAC) is **€200,000** over **10 months**. At the end of month 4, the project manager collects the numbers.

The plan calls for 40% of the budgeted work by now, so **PV = €80,000**. Finance records **AC = €75,000** spent. To judge that spending, the manager also needs the value of work actually completed.

Now the earned value. It's calculated per work package, from the budget and how much is really finished:

| Work package | Budget | Complete | Earned |
| --- | --- | --- | --- |
| Requirements and design | €20,000 | 100% | €20,000 |
| Data migration design | €30,000 | 100% | €30,000 |
| Build integrations | €50,000 | 20% | €10,000 |
| Testing | €40,000 | 0% | €0 |
| Training | €30,000 | 0% | €0 |
| Go-live and hypercare | €30,000 | 0% | €0 |
| **Total** | **€200,000** | | **EV = €60,000** |

The team has earned €60,000 against planned value of €80,000, at an actual cost of €75,000.

:::card How to measure "% complete" honestly
Unclear progress rules can overstate earned value. Use objective rules where you can: **0/100** (no credit until finished) for short tasks, **50/50** (half at start, half at finish) for tasks of a few weeks, and **milestones with fixed weights** for longer ones. Keep work packages small enough that nobody has to guess.
:::

## Variances and indices

:::formula Month 4
**CV** (cost variance) = EV − AC = 60,000 − 75,000 = **−€15,000**
**SV** (schedule variance) = EV − PV = 60,000 − 80,000 = **−€20,000**
**CPI** (cost performance index) = EV ÷ AC = 60,000 ÷ 75,000 = **0.80**
**SPI** (schedule performance index) = EV ÷ PV = 60,000 ÷ 80,000 = **0.75**
:::

A CPI of 0.80 means the team earned 80 cents of budgeted value for each euro spent. An SPI of 0.75 means it earned three quarters of the value planned by this date. Check the underlying packages: those ratios do not measure physical quantities or identify which delay controls the finish.

::figure evm-scurve | The classic S-curve. The plan (PV) climbs slowly, then fast, then slowly again. At month 4, earned value sits below both the plan and the actual cost. If efficiency stays at 0.80, the program finishes around €250k.

## Forecasting the finish

Choose an estimate-at-completion (EAC) formula that matches the evidence about the remaining work:

| If you believe… | Formula | Result |
| --- | --- | --- |
| Current cost efficiency will continue | EAC = BAC ÷ CPI | **€250,000** |
| The overrun was a one-off; the rest will go to plan | EAC = AC + (BAC − EV) | €215,000 |
| Cost *and* schedule pressure will both keep hurting | EAC = AC + (BAC − EV) ÷ (CPI × SPI) | €308,333 |

From the EAC you get two more useful numbers: the **estimate to complete** (ETC = EAC − AC = €175,000 still to spend, in the first case) and the **variance at completion** (VAC = BAC − EAC = −€50,000).

Which formula should you use? Be careful with the optimistic one. A study of 155 US defence contracts found that by the time they were 20% complete, the cumulative CPI had already stabilised on 134 of them, and earlier research found it rarely moved by more than 10% after that point. Small commercial projects are less rigid than defence programs, but the lesson holds: cost problems tend to persist. "The rest will go to plan" is a claim that needs evidence, such as a clearly one-off cause that has been fixed.

## Is the budget still reachable?

The to-complete performance index (TCPI) asks: to finish on the original budget, how efficient does the remaining work need to be?

:::formula To-complete performance index
TCPI = (BAC − EV) ÷ (BAC − AC) = (200,000 − 60,000) ÷ (200,000 − 75,000) = **1.12**
:::

The team has achieved 0.80 and would need 1.12 for the remaining work, a 40% improvement in cost efficiency. It needs evidence of how that change will happen. GAO describes a TCPI more than 0.05 above CPI as a warning that an EAC may be optimistic. Here, TCPI tests the original budget instead. Review the remaining scope, costs and recovery options with the sponsor; the warning does not by itself authorise a new baseline.

## The SPI trap, and earned schedule

For completed baseline scope, EV and PV both reach BAC, so SPI returns to 1.0 even after a late finish. Near completion, review the remaining activities and forecast dates alongside SPI.

*Earned schedule* fixes this by measuring schedule in time instead of money. Ask: at what point in the plan *should* we have earned €60,000? The plan reached €44,000 at month 3 and €80,000 at month 4, so €60,000 falls at about **month 3.4**.

:::formula Earned schedule
SPI(t) = earned schedule ÷ actual time = 3.44 ÷ 4 = **0.86**
Forecast duration ≈ planned duration ÷ SPI(t) = 10 ÷ 0.86 ≈ **11.6 months**
:::

On this planned-value curve, earned progress sits about 0.6 months behind the status date. Continuing at the calculated time efficiency gives roughly 11.6 months instead of 10. Check that assumption against the remaining critical activities before using the forecast.

## Setting up EVM on a real project

You don't need a defence contract to use it. A lightweight version needs five things:

1. **A work breakdown with budgets.** Every work package has an owner and a budget, and together they add up to the BAC.
2. **A time-phased baseline.** When each package is planned to be done. This gives you PV, month by month.
3. **Objective progress rules.** Agreed up front, like the 0/100 and 50/50 rules above.
4. **Actual costs by work package.** Timesheet codes that match the breakdown, so AC lines up with EV.
5. **A monthly rhythm with thresholds.** For example, any CPI or SPI below 0.9 triggers a short review of cause and recovery options.

SAE's EIA-748-E revision, issued in 2026, sets out 27 guidelines, compared with 32 in the earlier version. Apply the edition and requirements in the contract. For this warehouse project, start by agreeing the five records above, then review a package whose earned value differs from its spending.

:::link /notes/critical-path-method-worked-example/ | Build the schedule first: the critical path method
EVM tells you whether you're behind. The critical path tells you which delays actually matter.
:::

## Sources

- U.S. Government Accountability Office (2020). [Cost Estimating and Assessment Guide](https://www.gao.gov/assets/gao-20-195g.pdf) (GAO-20-195G).
- NASA (2021). [Earned Value Management Implementation Handbook](https://ntrs.nasa.gov/api/citations/20210024466/downloads/EVM%20Implementation%20Handbook.docx.pdf).
- SAE International (2026). [EIA-748-E, Earned Value Management Systems](https://www.sae.org/standards/eia748e-earned-value-management-systems).
- NDIA (2026). [EVMS guide list](https://www.ndia.org/divisions/ipmd/division-guides-and-resources), May 2026 Intent Guide entry. Confirms the 27 guidelines in EIA-748-E.
- Christensen, D. S. & Heise, S. R. (1993). [Cost performance index stability](https://www.humphreys-assoc.com/uploads/commerce/images/pdf/Christensen_and_Heise_CPI_Stability.pdf). *National Contract Management Journal*, 25.
- Lipke, W., Zwikael, O., Henderson, K. & Anbari, F. (2009). [Prediction of project outcome](https://doi.org/10.1016/j.ijproman.2008.02.009). *International Journal of Project Management*, 27(4).

*The program and its numbers are illustrative.*
