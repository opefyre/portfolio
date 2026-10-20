---
title: Rough-cut capacity planning: RCCP vs CRP with an example
date: 2026-10-20
summary: A weekly plan needs 40 hours on a resource with 32 available. Calculate the load, change the product mix and see what rough-cut and detailed capacity checks can establish.
seoTitle: Rough-cut capacity planning: RCCP vs CRP
seoDescription: Calculate rough-cut capacity from a product mix and resource hours. Compare RCCP with CRP and test why the same unit total can require different capacity.
status: published
topic: Supply chain
keywords: rough cut capacity planning, RCCP vs CRP, capacity requirements planning example, MRP and CRP, resource load calculation
---

The production plan contains 300 units. Last week the factory also made 300, so the new plan looks reasonable.

This week's mix needs eight more hours on the critical test bench than the available calendar provides. Counting units hid the difference between the products.

**Rough-cut capacity planning**, or RCCP, checks a master production schedule against key resources. **Capacity requirements planning**, or CRP, checks the more detailed resource requirements associated with the material plan and production orders.

[Oracle's capacity overview](https://docs.oracle.com/cd/A60725_05/html/comnls/us/crp/ovwcp.htm) makes that distinction. The purpose is to find a resource conflict while there is still a choice about the plan.

## Turn the product mix into resource hours

Our fictional factory plans to make 200 units of product A and 100 of B in one week. Each good A requires 0.10 bench hours; each good B requires 0.20. These are assumed resource requirements for this teaching example.

The bench has a 40-hour staffed calendar. Eight hours are reserved for maintenance, leaving 32 for the planned work. Do not deduct those same maintenance hours again through another availability factor.

| Product | Planned production | Bench hours per good unit | Required bench hours |
| --- | ---: | ---: | ---: |
| A | 200 | 0.10 | 20 |
| B | 100 | 0.20 | 20 |
| Total | 300 | | 40 |

:::formula Weekly bench load
Required hours = 200 × 0.10 + 100 × 0.20 = 40 hours
Available hours = 40 staffed hours − 8 maintenance hours = 32 hours
Gap = 40 − 32 = 8 hours
Load ratio = 40 ÷ 32 × 100 = 125%
:::

The 125% is required work relative to the stated available hours. It is not an observed utilisation result. The plan asks for more bench time than this calendar supplies.

The [MRP example](/notes/material-requirements-planning-example/) calculates the components needed by date. All the components could be available while this bench conflict remains.

## The same 300 units can need different capacity

Suppose a different demand mix calls for 250 A and 50 B. The total stays at 300, but the bench load becomes 25 + 10 = 35 hours. It still exceeds 32, now by three hours.

At 280 A and 20 B, load is 28 + 4 = 32 hours. That fits the simple hours total exactly. There is no margin in it for an additional loss.

::interactive paa2-capacity-mix | Fictional weekly master-schedule check. Total planned production stays at 300 good units. A uses 0.10 bench hours per unit and B uses 0.20. Available bench time is 32 hours after maintenance. Changing the mix tests another requirement; it does not authorise replacing customer demand. Setup, sequencing, material shortages and unplanned losses are outside this arithmetic.

Moving the control does not make an unwanted A a substitute for an ordered B. Use it to understand why a mix assumption changes the load. If the actual requirement remains 200 A and 100 B, the eight-hour gap needs a real response.

## RCCP vs CRP: what becomes more detailed?

The [master schedule and RCCP overview](https://docs.oracle.com/cd/A60725_05/html/comnls/us/crp/rccp.htm) describes checking key resources before generating the detailed material plan. In Oracle's documented implementation, RCCP uses gross master-schedule requirements rather than netting on-hand stock and scheduled receipts. Check how your own system defines its inputs.

| Planning check | What it uses in this explanation | What it asks |
| --- | --- | --- |
| S&OP capacity view | Product-family plans and broader supply options | Can demand, supply and financial plans be reconciled? |
| RCCP | Master-schedule quantities and key resource requirements | Does the proposed mix fit the critical resources? |
| MRP | Dated production needs, product structure and usable material supply | Which components need supply, and when? |
| CRP | Detailed work from the material plan, resource requirements and calendars | Where does that work exceed available resource capacity? |

The horizon and level of detail vary with the process and system. The table describes the relationship, not four fixed time periods every factory must use.

A detailed plan can expose constraints the rough-cut view misses: work arriving on the same day, an operation assigned to the wrong resource or a route with more setup time. A weekly total alone does not reserve an executable sequence.

## Resolve the eight-hour gap without hiding it

For the original mix, compare an approved additional shift, a different week, an alternative qualified bench or a changed commitment. Check the cost and practical conditions of each option.

Overtime requires people, support and any necessary approval. An alternative bench needs a suitable method and acceptable results. Moving work to next week may solve the load while missing the customer's date.

The [S&OP example](/notes/sales-operations-planning-explained/) follows that wider trade-off. For an individual customer promise, [ATP vs CTP](/notes/atp-vs-ctp/) connects available supply with the ability to make more.

Record which response is approved and what the plan still depends on. A spreadsheet can show 32 hours required and 32 available while ignoring a missing component or an extra changeover.

## Check the inputs against ordinary operation

Review the resource hours using the actual product route, expected yield and planned calendars. Keep setup and routine losses explicit, and avoid allowing for the same loss twice. If a rate was estimated from unusually easy work, test whether it represents the planned mix.

For this week, show the 200 A, 100 B and eight-hour gap together. Then record the agreed way to cover the requirement. “We made 300 last week” is not enough information to approve this week's mix.

## Sources and calculation notes

- [Oracle: Overview of Capacity Planning](https://docs.oracle.com/cd/A60725_05/html/comnls/us/crp/ovwcp.htm), master-schedule and detailed MRP capacity checks, resource hours and production rates.
- [Oracle: Overview of Rough Cut Capacity Planning](https://docs.oracle.com/cd/A60725_05/html/comnls/us/crp/rccp.htm), selected resources, gross requirements and capacity alternatives. This is version-specific documentation used to explain the concept.

All products, quantities, rates and hours are fictional. The example checks one resource for one week. It does not model a complete factory or establish a feasible schedule. Hours per good unit and the available calendar are stated assumptions.
