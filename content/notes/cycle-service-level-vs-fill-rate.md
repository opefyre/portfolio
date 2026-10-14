---
title: Cycle service level vs fill rate: count cycles and units separately
date: 2026-10-14
summary: One item has an 80% cycle service level and a 90% unit fill rate. Both are correct. Five replenishment cycles show what each number measures and what it misses.
seoTitle: Cycle service level vs fill rate: worked example
seoDescription: Compare cycle service level and unit fill rate using five replenishment cycles. Explore shortage size, different denominators and what a service target means.
status: published
topic: Supply chain
keywords: cycle service level vs fill rate, unit fill rate formula, cycle service level calculation, inventory service level, stockout rate
---

The inventory report says service was 80%. The demand report says 90%. They cover the same item, location and period. Neither calculation is wrong.

One counts replenishment cycles with no shortage. The other counts units supplied from stock when requested.

**Cycle service level measures the probability of avoiding a stockout during a replenishment cycle. Unit fill rate measures the share of demand supplied directly from available stock.** In a completed history, we can calculate the observed share of cycles with no unmet demand and the observed share of units filled immediately.

The distinction appears in [MIT's inventory teaching material](https://courses.edx.org/assets/courseware/v1/1aed951435b4231202cb4ff2c9b2d5b2/asset-v1%3AMITx%2BCTL.SC1x_1%2B3T2023%2Btype%40asset%2Bblock/W08_L1_ContinuousReviewPolicies_CLEAN.pdf#page=19). The two percentages answer different service questions. A target needs the name of the measure beside it.

## A five-cycle example

Take one fictional item at one warehouse. Each row covers a completed replenishment cycle, from one usable receipt up to the next. All five cycles contain demand. Every requested unit is recorded, including units that cannot be supplied immediately.

For this example, a shortage cycle means at least one requested unit couldn't be filled from stock. Reaching exactly zero after satisfying the last request doesn't count as a failure unless demand goes unmet. The ten short units below are backordered and fulfilled later; that later delivery doesn't turn them into immediate fills.

| Cycle | Units demanded | Filled immediately | Not filled immediately | Any unmet demand? |
| --- | ---: | ---: | ---: | --- |
| 1 | 20 | 20 | 0 | No |
| 2 | 20 | 20 | 0 | No |
| 3 | 20 | 20 | 0 | No |
| 4 | 20 | 20 | 0 | No |
| 5 | 20 | 10 | 10 | Yes |
| Total | 100 | 90 | 10 | 1 of 5 cycles |

Four of five cycles had no shortage. Ninety of 100 units were supplied immediately.

:::formula Two denominators, one demand history
Observed cycle service level: 4 no-shortage cycles ÷ 5 cycles × 100 = 80%
Observed unit fill rate: 90 immediately supplied units ÷ 100 demanded units × 100 = 90%
:::

Cycle service level registers that the fifth cycle had a shortage. Unit fill rate registers its size relative to all demand. A one-unit shortage and a ten-unit shortage each make one cycle fail, but they remove different quantities from the fill-rate numerator.

## Change the shortage pattern

Use the presets below to spread the same ten short units across all five cycles, or make the single shortage smaller. The table and chart use the same 100 units of demand.

::interactive service-metric-cycles | Five fictional completed replenishment cycles for one item and location, with 20 units demanded per cycle. All unmet units are recorded at their original request. Later backorder fulfilment is excluded from immediate fills. Percentages describe this small history; they do not estimate a stable future service probability or size safety stock.

With two units short in every cycle, all five cycles fail. Observed cycle service level is 0%, while unit fill rate stays at 90%. The same ten units go unfilled immediately, but the interruptions are spread differently.

With only two units short in the fifth cycle, cycle service level returns to 80% and unit fill rate rises to 98%. The cycle count hasn't noticed that the shortage became smaller. The quantity measure has.

Neither result tells you the whole customer experience. Ten missing units could affect one customer or several. The history needs order and line identities before you can calculate those measures.

## Unit, line and order fill rates are different too

Suppose a separate fictional order requests ten lines of ten units each. Nine lines are supplied completely; the tenth receives eight of its ten units.

| Measure for this one order | Calculation | Result |
| --- | --- | ---: |
| Unit fill rate | 98 immediately filled units ÷ 100 requested | 98% |
| Complete-line fill rate | 9 completely filled lines ÷ 10 requested | 90% |
| Complete-order fill rate | 0 fully filled orders ÷ 1 requested | 0% |

These are declared measurement rules for the example. A business may use a different cutoff or first-shipment rule. Record that choice instead of assuming every field called “fill rate” has the same definition.

Our order can have a high unit fill rate and still be unusable to a customer who needs the missing line to complete an assembly. The commercial consequence needs the product and order context.

## Don't average item percentages without their volumes

Imagine two items over a period. Item A supplies five of ten requested units. Item B supplies all 90 requested units.

The simple average of their fill rates is (50% + 100%) ÷ 2 = 75%. The combined unit fill rate is (5 + 90) ÷ (10 + 90) = 95%.

The first number gives each item equal weight. The second gives each demanded unit equal weight. Use the second when reporting the combined unit fill rate, and retain the item view so a large seller doesn't hide another item's shortage.

The [ABC/XYZ note](/notes/abc-xyz-inventory-analysis/) explains why products may need different planning attention. Segmentation doesn't remove the need to define and count service consistently.

## Turn the target into a usable rule

Before accepting “98% service”, specify the item and location, the metric, the demand population and when a request counts as filled. Decide how to treat substitutions, cancellations, partial quantities and later fulfilment.

A high target won't repair missing demand records. If the system records only what was shipped, the unmet units disappear from the denominator. The [stockouts and demand forecasting article](/notes/demand-forecasting-stockouts/) explains why sales can understate demand when stock is unavailable.

The [safety stock and reorder point note](/notes/safety-stock-reorder-point/) takes the next step into inventory policy. Its service factor targets cycle service under stated assumptions. A unit fill-rate target needs its own shortage calculation; replacing one percentage with the other doesn't preserve the promise.

For the next service review, show the demand units, immediate fills, shortage cycles and the declared measurement rule together. The disagreement between 80% and 90% then becomes easy to explain, and the team can decide which consequence it needs to improve.

## Sources and example notes

- [MIT Center for Transportation & Logistics: Continuous Review Inventory Policies](https://courses.edx.org/assets/courseware/v1/1aed951435b4231202cb4ff2c9b2d5b2/asset-v1%3AMITx%2BCTL.SC1x_1%2B3T2023%2Btype%40asset%2Bblock/W08_L1_ContinuousReviewPolicies_CLEAN.pdf), slides 19 and 30. Cycle service level and item fill rate.
- [Dennis Bricker, University of Iowa: Reorder Point](https://user.engineering.uiowa.edu/~dbricker/stacks_pdf1/reorder_point.pdf), slides 5–6. Cycle-based and quantity-based service measures.

All orders and cycles are fictional. The five-cycle example is a complete illustrative ledger with positive demand in every cycle, no substitutions and no unrecorded lost demand. It is not a statistical estimate, inventory-policy simulation or service benchmark. Unit, line and order rules are kept separate.
