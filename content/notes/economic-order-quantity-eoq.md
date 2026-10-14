---
title: EOQ explained: how much should you order?
date: 2026-10-14
summary: Bigger orders mean fewer purchase orders and more stock. Calculate economic order quantity, compare practical batch sizes and see what changes when ordering gets cheaper.
seoTitle: EOQ formula and example: how much to order
seoDescription: Calculate economic order quantity with a worked example and interactive cost chart. Compare case packs, minimum orders and EOQ versus reorder point.
status: published
topic: Supply chain
keywords: EOQ formula, economic order quantity example, EOQ calculator, EOQ vs reorder point, ordering cost holding cost
---

Purchasing wants fewer orders. The warehouse wants smaller deliveries. Both have a cost worth understanding.

**Economic order quantity**, usually shortened to EOQ, is the replenishment quantity that balances ordering cost against inventory holding cost in a simple, steady-demand model.

It answers how much to order. A reorder point answers when to order. Neither question settles the other.

## Put a cost on each side of the argument

Consider a fictional distributor selling 12,000 units of a standard part each year. Demand is steady, replenishment arrives as a complete batch, and shortages aren't allowed in the model.

Placing and receiving an order costs €60, regardless of its size. Holding one unit in stock for a year costs €3.

| Input | Symbol | Example |
| --- | --- | ---: |
| Annual demand | D | 12,000 units per year |
| Fixed cost per replenishment | S | €60 per order |
| Annual holding cost | H | €3 per unit per year |
| Quantity in each replenishment | Q | The choice we're testing |

The €60 needs to represent work or expense that actually changes with the number of orders. Dividing the entire purchasing department's salary by its purchase-order count doesn't establish that another order costs €60 or that removing one saves €60 in cash.

Holding cost needs similar care: capital, storage, insurance, deterioration and other relevant costs can contribute. Use a consistent annual cost per unit, with its assumptions recorded.

## The two annual costs

Ordering 300 units at a time means 12,000 ÷ 300 = 40 orders a year. At €60 each, that costs €2,400.

Stock starts each cycle at 300 and falls steadily to zero. Average cycle stock is 150, so annual holding cost is 150 × €3 = €450.

:::formula Annual ordering and holding cost
Ordering cost = (D ÷ Q) × S
Holding cost = (Q ÷ 2) × H
Combined cost = (D ÷ Q) × S + (Q ÷ 2) × H
:::

Larger batches reduce the first term and increase the second. [MIT's inventory lecture](https://www.ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/6c8fec8f99bcf7059b73b82e96d43901_MIT2_854F16_Inventory.pdf) develops this trade-off and the basic assumptions behind it.

| Quantity per order | Annual ordering cost | Annual holding cost | Combined annual cost |
| --- | ---: | ---: | ---: |
| 300 | €2,400.00 | €450.00 | €2,850.00 |
| 600 | €1,200.00 | €900.00 | €2,100.00 |
| 700 | €1,028.57 | €1,050.00 | €2,078.57 |
| 1,200 | €600.00 | €1,800.00 | €2,400.00 |

These are long-run annual rates over repeated cycles. A calculated 17.14 orders per year describes the average frequency at Q = 700, not a plan to issue a fraction of a purchase order.

## Calculate EOQ, then compare usable quantities

The formula gives the minimum of that combined cost curve.

:::formula Economic order quantity
EOQ = √(2 × D × S ÷ H)
= √(2 × 12,000 × €60 ÷ €3)
= 692.82 units, approximately **693 units**
:::

At the exact mathematical minimum, ordering and holding costs are equal, about €1,039.23 each per year. The combined cost is about €2,078.46.

An order of 700 costs only about €0.11 more per year in this model. The curve is flat near the minimum. There is little reason to fight a sensible case-pack rule over that difference.

::interactive eoq-costs | Fictional inputs: D = 12,000 units/year and H = €3/unit/year. Inspect quantities, change the fixed ordering cost, and apply a case pack or minimum order. The chart shows ordering plus holding cost, not the full purchase bill.

If the supplier requires at least 800 units in cases of 100, 800 is the lowest-cost feasible quantity on the original inputs. Its combined annual cost is €2,100, about €21.54 above the unconstrained minimum.

The calculator checks the feasible pack sizes around the minimum, subject to the minimum order. It doesn't simply round every mathematical answer upward and assume that is cheapest.

## Change the ordering cost before accepting a large batch

Suppose an integration removes enough repeat handling to reduce the relevant replenishment cost from €60 to €20. EOQ falls to 400 units.

That isn't a saving claim about an installed system. It's a reason to measure what the ordering process costs and whether that cost can change.

For manufactured items, setup effort can create a similar pressure toward larger batches. Vrolen's [SMED guide](https://vrolen.com/blog/smed-changeover-reduction/) covers reducing changeover work while checking startup quality and displaced effort. Production replenishes over time, so a production-lot model may be needed instead of treating the entire batch as an instant delivery.

The [worked changeover example](/notes/smed-changeover-smaller-batches/) shows the scheduling side of that decision. Saving setup time can support smaller batches, more output or some combination, depending on the constraint.

## Keep purchase price and reorder timing separate

The chart leaves out the purchase price because annual demand and unit price are unchanged. The annual purchase bill would be D × unit price at every quantity, so adding it wouldn't change which quantity minimises cost.

A quantity discount changes that. Compare purchase cost, ordering cost and holding cost at feasible quantities, including the discount thresholds. A lower unit price can still leave a higher total cost, as the [supplier comparison example](/notes/when-procurement-savings-increase-total-cost/) demonstrates.

EOQ also doesn't tell you to wait until the shelf is empty before placing a real order. With a known positive lead time, the order needs to go out while enough stock remains to cover that wait. The [safety-stock and reorder-point guide](/notes/safety-stock-reorder-point/) explains the timing and uncertainty side.

For components tied to a production plan, [MRP](/notes/material-requirements-planning-example/) adds dated requirements and existing receipts. A cheap batch size is of little use if the parts arrive after assembly.

## Check the conditions before using the answer

The basic EOQ curve assumes steady known demand, a constant fixed ordering cost, a constant annual holding cost and replenishment as a whole batch. It omits shortages, quantity discounts, finite production rates and shelf-life limits.

Our cost calculation also excludes safety stock and pipeline inventory. The Q ÷ 2 term is cycle stock, not every unit the business owns.

If demand is seasonal, space is tight or the product expires quickly, compare the proposed quantity with those limits. Don't describe an infeasible mathematical minimum as the purchasing policy.

Start with the cost curve, check nearby workable quantities, then investigate the inputs that make large orders look necessary. In this example, a routine change to ordering cost matters far more than the difference between 693 and 700 units.

## Sources

- Gershwin, S. B., MIT OpenCourseWare, 2016. [Introduction to Manufacturing Systems: Inventory](https://www.ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/6c8fec8f99bcf7059b73b82e96d43901_MIT2_854F16_Inventory.pdf), slides 42 to 49. Basic EOQ assumptions, cost function and formula.

The demand, costs, case packs and minimum orders are fictional. Costs are modelled long-run annual amounts, not observed cash savings. The reduced-ordering-cost case assumes the €20 input has been established; no implementation cost or benefit is estimated.
