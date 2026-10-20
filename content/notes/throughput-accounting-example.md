---
title: Throughput accounting: formula and a product mix example
date: 2026-10-20
summary: Product A earns more per unit. Product B earns more per scarce test minute. Calculate the feasible mix and see why the unit margin can point production the wrong way.
seoTitle: Throughput accounting: a product mix example
seoDescription: Calculate throughput per unit and bottleneck minute, then compare two feasible product mixes. See the short-run cost and demand assumptions behind the result.
status: published
topic: Operational excellence
keywords: throughput accounting example, throughput accounting formula, bottleneck product mix, throughput per minute
---

Product A leaves €60 after direct materials. Product B leaves €40. If that were all we knew, A would look like the product to make first.

Both need the same constrained test bench. A takes thirty minutes there; B takes ten. The bench changes the comparison.

**Throughput accounting examines how sales generate money after truly variable costs, with attention to the resource limiting the whole operation.** In the short-run convention used by [ACCA](https://www.accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/throughput-constraints2.html), throughput per unit is selling price less direct materials. Other operating costs are treated as fixed over the decision period.

Here, throughput is money. In [Little's Law](/notes/busy-machines-slower-orders/), throughput is an output rate such as orders per day. Keep those units separate.

## Calculate throughput per bottleneck minute

Our fictional factory has 600 usable test-bench minutes this week. Other resources and materials can support the mixes below. There are no additional setups, losses or minimum-order commitments in this small example.

| Product | Selling price | Direct materials | Throughput per unit | Bench time | Throughput per bench minute | Weekly demand cap |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A | €100 | €40 | €60 | 30 min | €2 | 20 units |
| B | €70 | €30 | €40 | 10 min | €4 | 30 units |

:::formula The two calculations
Throughput per unit = selling price − direct materials
Throughput per constrained minute = throughput per unit ÷ bench minutes per unit
:::

The larger unit return belongs to A. The larger return on the scarce minute belongs to B.

That ranking only helps if B can be sold. Producing unwanted B units would use bench time without generating their assumed sales.

## Compare two feasible production plans

Making A first uses all 600 minutes for twenty units. Total throughput is 20 × €60 = **€1,200**. No time remains for B.

Making B first supplies its full thirty-unit demand in 300 minutes. The remaining 300 minutes make ten A. Total throughput becomes 30 × €40 + 10 × €60 = **€1,800**.

Both plans use the same bench time. The second generates €600 more throughput under the stated demand and cost assumptions.

::interactive paa3-throughput-mix | Fictional weekly choice with 600 bench minutes, whole units and demand caps of 20 A and 30 B. Change B's demand cap to compare A-first, B-first and the highest-throughput feasible whole-unit mix. Fixed operating expense is €1,000 per week. Other resources, setups and losses are assumed not to limit either plan.

If weekly operating expense is €1,000 for either plan, the simplified result after that expense is €200 for A-first and €800 for B-first. Those figures exclude any other costs outside the example. Throughput itself is not net profit.

Whole units add a wrinkle. If demand for B is just one unit, making it first leaves room for nineteen A: €40 + 19 × €60 = €1,180. Making twenty A instead gives €1,200. The leftover twenty minutes cannot make another A. The control checks every feasible whole-unit combination so the rate ranking does not hide that difference.

## What the throughput accounting ratio adds

ACCA also describes a throughput accounting ratio, or TPAR. Divide throughput return per constrained hour by operating cost per available constrained hour.

This bench has ten hours available. Its assumed €1,000 weekly operating expense gives €100 per available bench hour. A generates €120 per bench hour and B generates €240, so their ratios are **1.2** and **2.4**.

The denominator is the same for both products, so the ratio does not change their ranking. It also does not prove that every individual order below a particular ratio should be rejected. Assess the feasible mix and total result, including commitments the simple model omits.

## Is throughput costing the same thing?

The terms are related. [Becker defines throughput costing](https://www.becker.com/accounting-terms/throughput-costing-super-variable-costing) as an inventory-costing method that assigns variable direct materials to products and expenses the other costs in the period. Throughput accounting uses that cost view to help with decisions such as this product mix. This example assumes everything produced is sold, so it does not compare closing inventory valuations.

## Check the assumption that makes the ranking useful

Labour, energy or outsourced processing may change with the decision. If they are genuinely incremental in your setting, include them consistently rather than copying the direct-material-only convention without checking it.

Also check whether the bench remains the constraint after the mix changes. Packing capacity, product-specific tooling or customer commitments can make the simple ranking insufficient. [Rough-cut capacity planning](/notes/rough-cut-capacity-planning/) helps turn the mix into the other resource loads that need checking.

This is a short-run allocation decision. Buying another bench is a separate investment question, with cash flows and risks over time. Use the [NPV and payback comparison](/notes/npv-vs-payback/) for that decision rather than treating this week's extra throughput as a guaranteed annual return.

:::link https://vrolen.com/blog/oee-improved-throughput-did-not/ | When better machine performance does not raise shipped output
Vrolen follows constraint changes, unused capacity and downstream losses. It helps check whether the resource behind this week's mix decision is still the one limiting the operation.
:::

## Source and calculation notes

- [ACCA: Throughput accounting, part 2](https://www.accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/throughput-constraints2.html). Direct-material convention, constrained-resource ranking, demand caps and TPAR.

All products, prices, times, demand caps and expenses are fictional. The model assumes sales for every produced unit, one binding resource and otherwise unchanged operating expense. It illustrates a feasible comparison, not a complete factory optimisation.
