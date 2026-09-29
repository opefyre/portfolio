---
title: Safety stock and reorder point: the formulas, a worked example, and what service level really costs
date: 2026-09-29
summary: How to calculate safety stock and the reorder point step by step, why lead-time variability usually matters more than demand, how cycle service level differs from fill rate, and what each extra point of service costs in inventory.
status: published
topic: Supply chain
keywords: safety stock formula, reorder point, safety stock calculation, service level, fill rate, lead time variability, inventory management, supply chain planning, z-score
---

Every planner has been in this meeting. Stock ran out, a customer was let down, and someone says "we need more safety stock". Six months later, the warehouse is full, cash is tied up, and someone else says "we need less". Both are guessing.

Safety stock doesn't have to be a guess. It's a buffer against uncertainty, and uncertainty can be measured. This note walks through the standard formulas on one product, shows which input usually matters most, and puts a price on the service level you choose.

:::card The short version
- **Reorder point** = expected demand during the lead time + safety stock.
- **Safety stock** = z × the standard deviation of demand over the lead time. The z comes from the service level you want: 1.645 for 95%.
- If lead times vary, include that variation. It's often bigger than the demand variation.
- Service level has a steep cost curve. Going from 95% to 99% can need 40% more safety stock.
- "95% service level" usually means 95% of replenishment cycles without a stock-out. That's not the same as filling 95% of demand.
:::

## The example product

A distributor stocks a fast-moving spare part. From the last six months of data:

| Input | Value |
| --- | --- |
| Average daily demand (d) | 120 units |
| Standard deviation of daily demand (σ<sub>d</sub>) | 30 units |
| Average supplier lead time (L) | 9 days |
| Standard deviation of lead time (σ<sub>L</sub>) | 2 days |
| Target cycle service level | 95% (z = 1.645) |
| Order quantity (Q) | 1,200 units |

## Step 1: demand during the lead time

The reorder point exists to cover the wait between placing an order and receiving it. On an average day, that's:

:::formula Expected demand during the lead time
d × L = 120 × 9 = **1,080 units**
:::

If demand and lead time never varied, you'd reorder at 1,080 and the delivery would arrive exactly as the shelf emptied. They do vary. That's what safety stock is for.

## Step 2: safety stock when only demand varies

The textbook starting point assumes the lead time is fixed and daily demand varies independently from day to day. Over L days, the variation grows with the square root of L, not with L itself, because good and bad days partly cancel out.

:::formula Demand variability only
σ over the lead time = σ<sub>d</sub> × √L = 30 × √9 = 90 units
Safety stock = z × 90 = 1.645 × 90 = **148 units**
:::

## Step 3: add lead-time variability

Now the realistic part. The supplier doesn't always take 9 days. Sometimes it's 7, sometimes 12. When the lead time runs long, you're selling 120 units a day for days you didn't plan for. The combined formula accounts for both sources of uncertainty:

:::formula Demand and lead-time variability
σ = √( L × σ<sub>d</sub>² + d² × σ<sub>L</sub>² )
= √( 9 × 30² + 120² × 2² ) = √( 8,100 + 57,600 ) = **256 units**
Safety stock = 1.645 × 256 = **422 units**
:::

Look at the two terms under the square root. Demand variation contributes 8,100. Lead-time variation contributes 57,600, seven times more. The safety stock nearly triples, from 148 to 422 units, and almost all of the increase comes from the supplier, not the customer.

This is the most useful insight in the whole calculation. Before arguing about forecast accuracy, look at your suppliers' delivery reliability. Cutting σ<sub>L</sub> from 2 days to 1 would bring the safety stock down to about 247 units, a 41% reduction, without touching demand.

## Step 4: the reorder point

:::formula Reorder point
ROP = demand during the lead time + safety stock = 1,080 + 422 = **1,502 units**
:::

When stock on hand plus stock on order falls to 1,502, place the next order.

::figure ss-sawtooth | The classic sawtooth. Stock falls by about 120 units a day. The order goes out at 1,502 and arrives nine days later, on an average cycle just as stock reaches the safety stock. On a bad cycle, the buffer absorbs the difference.

## What service level really costs

The service level decides z, and z doesn't grow in a straight line. The higher you go, the more each extra point costs.

| Cycle service level | z | Safety stock (units) |
| --- | --- | --- |
| 90% | 1.282 | 328 |
| 95% | 1.645 | 422 |
| 98% | 2.054 | 526 |
| 99% | 2.326 | 596 |
| 99.9% | 3.090 | 792 |

::figure ss-curve | Safety stock against service level for the example. The curve is gentle up to about 95%, then climbs steeply.

Put a price on it. If the part costs €20 and holding inventory costs 25% of its value a year, each unit of safety stock costs €5 a year. Moving from 95% to 99% adds 174 units, or **€870 a year for this one part**. Across 2,000 parts, the same decision is worth well over a million euros a year. That's why service targets should be set by product segment, not as one number for the whole catalogue.

A common approach is to set targets by ABC class (high-value or high-margin items first), and adjust for how critical the item is to the customer. Spare parts that stop a production line may justify 99%. Slow-moving accessories may be fine at 90%.

## Cycle service level is not fill rate

This trips up a lot of teams. There are two common definitions of "service level":

:::grid
- **Cycle service level** The share of replenishment cycles that end without a stock-out. That's what the z in the formula targets.
- **Fill rate** The share of demand shipped straight from stock. It's usually what customers actually feel.
:::

They can be very different numbers. In the example, a 95% cycle service level means 1 cycle in 20 runs short. But when a cycle does run short, it's usually by a few units, not by all 1,200. Using the standard normal loss function, the expected shortage per cycle is about 5 units:

:::formula Expected fill rate at 95% cycle service level
Expected units short per cycle = σ × G(z) = 256 × 0.0209 ≈ 5.4 units
Fill rate = 1 − 5.4 ÷ 1,200 ≈ **99.6%**
:::

So a 95% cycle service level delivers roughly a 99.6% fill rate here. If your contract promises a 98% fill rate, you may need far less safety stock than a 98% cycle service level would suggest. Agree on the definition before agreeing on the number.

## Getting the inputs right

The formula is only as good as what you feed it:

- **Use forecast error, not raw demand variation**, if you forecast. If demand has a trend or seasonality you already predict, the uncertainty is the error around the forecast, not the swings in demand itself.
- **Match the time buckets.** If you measure weekly variation, convert with the square root: σ<sub>daily</sub> ≈ σ<sub>weekly</sub> ÷ √(days per week you sell).
- **Measure lead time from order to available stock**, including receiving and quality checks, not just the supplier's quote.
- **Check the normal assumption for slow movers.** For items that sell a few units a month, the normal distribution fits poorly. Poisson-based or simulation methods work better.
- **Be careful at low service levels.** Research by Chopra, Reinhardt and Dada found that below roughly 50% to 70% cycle service level, the normal approximation can give the wrong advice, even suggesting that more reliable suppliers need a *higher* reorder point. The formulas here are for the 90% to 99% range most planners work in.
- **Recalculate regularly.** Monthly or quarterly, and after any big change in supplier or demand pattern.

## Where the real savings are

Once the formula is in place, the levers become obvious:

| Lever | What it changes | Effect |
| --- | --- | --- |
| More reliable supplier deliveries | σ<sub>L</sub> | Usually the biggest reduction |
| Shorter lead time | L | Less demand exposure while waiting |
| Better forecasts | σ<sub>d</sub> (forecast error) | Smaller buffer for the same service |
| Differentiated service targets | z | Stock where it earns its keep |
| Reviewing more often | The period of uncertainty | Smaller buffer in periodic-review systems |

Safety stock is the price of uncertainty. The formula tells you what that price is. The work is in reducing the uncertainty itself.

:::link /notes/busy-machines-slower-orders/ | Why busy machines make customers wait
Inventory and lead time are two sides of the same flow problem. Little's Law explains the other side.
:::

## Sources

- King, P. L. (2011). [Crack the code: understanding safety stock and mastering its equations](https://web.mit.edu/2.810/www/files/readings/King_SafetyStock.pdf). *APICS Magazine*.
- MIT Center for Transportation & Logistics (2015). [Probabilistic inventory models: key concepts](https://courses.edx.org/asset-v1:MITx+CTL.SC1x_1+2T2015+type@asset+block/KeyConcept_Week7Lesson1.pdf). MITx CTL.SC1x.
- NIST/SEMATECH. [Critical values of the normal distribution](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3671.htm). *e-Handbook of Statistical Methods*.
- Chopra, S., Reinhardt, G. & Dada, M. (2004). [The effect of lead time uncertainty on safety stocks](https://doi.org/10.1111/j.1540-5414.2004.02332.x). *Decision Sciences*, 35(1).
- Silver, E. A., Pyke, D. F. & Thomas, D. J. (2017). *Inventory and Production Management in Supply Chains*, 4th edition. CRC Press.

*The product and its numbers are illustrative.*
