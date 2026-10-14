---
title: S&OP explained: a demand plan meets a capacity limit
date: 2026-10-14
summary: Sales plans 12,000 units. Operations can make 10,000. Compare overtime, an earlier stock build and changed commitments, then record the decision S&OP needs to produce.
seoTitle: S&OP explained: a worked planning example
seoDescription: Learn sales and operations planning through a 12,000-unit demand plan and a capacity gap. Compare options, costs and the difference between S&OP and S&OE.
status: published
topic: Supply chain
keywords: what is S&OP, sales and operations planning example, S&OP process, S&OP vs S&OE, demand supply planning
---

Sales brings a demand plan for 12,000 units next month. Operations can produce 10,000 in normal time. Finance's budget assumes the sales plan will happen without extra cost.

All three figures fit on the same slide. They don't yet form a workable plan.

**Sales and operations planning**, or S&OP, is the recurring process through which the business reconciles demand, supply and financial consequences, then approves a plan people can act on.

The output needs to say what the company will do about the 2,000-unit gap. Agreeing that the forecast looks reasonable doesn't resolve it.

## Establish what the 12,000 actually represents

Our fictional manufacturer plans one product family. Units are comparable for the capacity calculation, and there is no spare finished stock already available.

The 12,000 units are expected demand, not 12,000 units of confirmed customer orders. The team still needs to separate firm orders, the forecast for additional demand and commercial assumptions such as a planned promotion.

[SAP's S&OP overview](https://www.sap.com/resources/sop-sales-and-operations-planning) describes a recurring process that brings demand, supply and financial planning together. A monthly review is common, but the working horizon and cadence should fit the business.

Keep the unconstrained demand view visible even if capacity is lower. Changing the forecast to 10,000 solely because the factory can make 10,000 hides the gap rather than explaining it.

The [forecast-bias example](/notes/forecast-bias-calculation/) helps with a separate question: whether the demand estimate has been systematically high or low. S&OP needs that evidence, then a decision about what to do with the current estimate.

## Establish what the 10,000 can really deliver

Use expected good output for the planned product mix and period. A machine's design rate multiplied by all calendar hours can overstate available supply.

For this example, assume the team has checked materials, staffing, planned stops, product mix and quality losses. Normal-time output in the peak month is 10,000 acceptable units.

There is also enough genuinely spare capacity in the preceding month to make up to 1,500 units early. Overtime in the peak month can add up to 2,000 units. Those are fictional, checked limits for our comparison, not general capacity rules.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch Vrolen's cycle time and lead time example
The video follows a different example to separate work time from total elapsed time. Keep that distinction when checking whether a capacity figure can support the promised delivery date.
:::

For the detailed production choices behind a monthly capacity figure, see Vrolen's [production scheduling guide](https://vrolen.com/blog/production-scheduling-optimization/). Product routes, materials and changeovers still need checking after an aggregate plan balances.

## Put the options on the same basis

Assume overtime costs €4 extra per unit above normal production cost. Making units early adds €0.80 per unit for one full month of holding. Earlier production uses spare capacity without displacing other work, and the product can be stored safely.

Normal production cost is the same per unit in either month. We exclude that shared cost from the extra-cost comparison, while keeping supply volumes visible.

| Option | Earlier stock available | Peak-month normal output | Overtime output | Supply for peak demand | Gap to 12,000 | Extra cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Normal time only | 0 | 10,000 | 0 | 10,000 | 2,000 | €0 |
| Overtime only | 0 | 10,000 | 2,000 | 12,000 | 0 | €8,000 |
| Earlier production only | 1,500 | 10,000 | 0 | 11,500 | 500 | €1,200 |
| Earlier production plus overtime | 1,500 | 10,000 | 500 | 12,000 | 0 | €3,200 |

The last option carries 1,500 units early for €1,200 and adds 500 overtime units for €2,000. It covers the same 12,000-unit demand plan as the overtime-only option, with €4,800 less modelled extra cost.

The €0 row is not a free equivalent. It leaves 2,000 units of expected demand uncovered. Any resulting service, revenue or customer consequence is outside that expense column.

## Test the availability behind the chosen option

Change the earlier stock build and the overtime limit below. The example uses only enough overtime to close the remaining gap, up to the selected limit.

::interactive sop-supply-gap | Fictional plan for 12,000 units. Earlier stock, normal output, overtime and uncovered demand reconcile to the same demand total. Extra cost includes one full month of holding and the overtime premium only. A balanced total doesn't establish a feasible detailed schedule.

If the earlier 1,500 units are available but overtime falls to zero, the plan is short by 500. Someone needs to change the supply option or the commercial commitment. The calculator leaves that gap visible.

The team could reconsider a promotion, negotiate dates or evaluate another supply source. Those choices need their own costs and customer implications. They aren't equivalent to lowering the demand estimate until the table turns green.

## Record the decision, conditions and owners

Suppose the team chooses the combined option. A useful approval record would look like this.

| Decision field | Fictional record |
| --- | --- |
| Demand basis | 12,000 expected units; retain the dated demand assumptions |
| Supply plan | Make 1,500 early, then 10,000 in normal time and 500 in overtime |
| Extra-cost allowance | €3,200 for the stated holding cost and overtime premium |
| Conditions | Earlier material and storage confirmed; overtime and good-output capacity confirmed |
| Owners | Operations delivers the supply plan; Sales owns commitments; Finance checks the cost basis |
| Escalation | Reopen the decision if a condition fails or the demand and mix change materially |

An aggregate family plan still needs item quantities and dates. [MRP](/notes/material-requirements-planning-example/) translates a production plan into component requirements. The [data quality example](/notes/data-quality-dimensions/) shows why apparently available stock needs evidence before it enters that calculation.

## Keep execution connected without turning every review into expediting

**Sales and operations execution**, or S&OE, deals with more immediate imbalances: a late component delivery, today's production shortfall or an order that needs a new promise date.

[ASCM's explanation](https://www.ascm.org/ascm-insights/direct-your-supply-chain-plans-to-execution/) distinguishes this detailed, shorter-horizon work from S&OP and stresses the connection between them. Weekly or more frequent execution reviews can feed constraints and recurring misses back into the broader plan. The exact boundary varies.

If a component slips, the execution team should use the agreed priorities and escalation rules. If repeated slips invalidate the monthly supply assumption, S&OP needs to revisit it. A monthly meeting shouldn't have to approve every dispatch, and a daily workaround shouldn't quietly rewrite the business plan.

The [AI supply chain planning example](/notes/ai-supply-chain-planning/) follows the same transition from a forecast to a decision about stock, capacity and delivery. More accurate numbers help, but the company still needs to choose an option and own its consequences.

Leave the review with one dated plan, its unresolved conditions and the people responsible for them. Then compare what happened with what the approval assumed. That gives the next review something firmer than three departments repeating their original numbers.

## Sources

- SAP. [What is sales and operations planning?](https://www.sap.com/resources/sop-sales-and-operations-planning). Definition and demand, supply, reconciliation and approval stages. Vendor outcome and software claims are not used here.
- Bower, P., ASCM, 2022. [Direct Your Supply Chain Plans to Execution](https://www.ascm.org/ascm-insights/direct-your-supply-chain-plans-to-execution/). S&OE's shorter horizon and its connection to S&OP.

All volumes, capacities, costs and decisions are fictional. The example assumes comparable units, usable earlier stock, sufficient components and no displaced production. Extra-cost totals exclude common production cost and unpriced commercial consequences. They aren't profit estimates or a full inventory and scheduling model.
