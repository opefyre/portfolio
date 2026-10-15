---
title: Continuous vs periodic inventory review: differences and example
date: 2026-10-15
summary: Ordering when stock reaches a trigger is different from ordering every Friday. Follow the same demand through both rules and see why the coverage period changes.
seoTitle: Continuous vs periodic inventory review
seoDescription: Compare continuous and periodic inventory review with a worked example. Change the review interval and follow stock, orders and receipts on the same timeline.
status: published
topic: Supply chain
keywords: continuous vs periodic review inventory, periodic review inventory example, order up to policy, inventory review systems
---

**Continuous review checks inventory position as it changes and orders when a trigger is reached. Periodic review makes the ordering decision at scheduled intervals.** A system can record every stock movement while still using a periodic ordering policy.

A part reaches its reorder point on Thursday. The supplier needs two working days to replenish it. The buyer places orders on Friday.

That extra wait belongs in the inventory policy. A reorder point designed for immediate ordering doesn't automatically cover a weekly purchasing routine.

[MIT's inventory lecture](https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/8b53c45fd26ffff706d815131e8d177e_lect11.pdf) separates the timing of review from the size of the order. Both decisions matter.

## Continuous vs periodic review, side by side

Two common policies show the difference. Here, s is a reorder point, Q a fixed quantity, R a review interval and S an order-up-to target.

| Decision | Continuous (s, Q) | Periodic (R, S) |
| --- | --- | --- |
| When to order | When inventory position reaches or falls below s | At each scheduled review |
| How much | Q units | Enough to bring inventory position up to S, if below it |
| Demand coverage used to size the trigger or target | Replenishment lead time | Review interval plus replenishment lead time |
| Operational fit to check | Reliable transaction updates and a supplier able to accept triggered orders | A fixed supplier run or a coordinated ordering routine |

These are two common versions, not the only ones. Continuous review can also use an order-up-to rule; periodic review can include a trigger.

Both use **inventory position**: on-hand stock plus stock on order, minus backorders and any commitments not already deducted. Our [inventory-position example](/notes/inventory-position-vs-on-hand/) explains why ordering from the shelf balance alone can duplicate supply already coming.

## Why periodic review covers a longer period

After today's periodic review, the next ordering opportunity is R days away. An order placed then needs another L days to arrive. Today's target therefore needs to account for demand over R + L.

With immediate continuous review, the trigger covers the replenishment lead time L. A delay between the trigger and order release adds time here too.

This protection-period distinction appears in [MIT's base-stock model with lead time](https://ocw.mit.edu/courses/15-772j-d-lab-supply-chains-fall-2014/0d50c5c77382852102ee30b98f1d4657_MIT15_772JF14_Lec14.pdf), slide 21. Review time and lead time must use the same calendar.

At 20 units per working day, a two-day lead time means 40 units of expected demand. Review every five working days, and the periodic target covers seven days: 140 units before adding a buffer.

The target is an inventory-position level. It doesn't mean 140 units must always sit on the shelf. Some may be on order.

## Inventory review example: reorder point vs order-up-to

Our fictional item starts with 140 units on hand and nothing on order. Normal demand is 20 units per working day. Day 4 uses 40. Both policies face exactly that history and the same two-day replenishment time; their order releases and receipts emerge from their own rules.

The continuous policy orders 100 units whenever position reaches 40 or less. The periodic policy reviews every five days and orders up to 140. Neither has safety stock. The extra 20 units on day 4 will test how each rule responds.

::interactive inventory-review-replay | Fictional 15-working-day replay. Opening stock and demand are identical across policies; orders and receipts follow each rule. At each daily step, demand is counted before receipts. Negative net stock means backorders. Neither policy has safety stock.

The continuous trigger fires on day 4, at 40 units. Its 100-unit order arrives at the end of day 6. The remaining stock covers demand until that receipt.

The five-day policy waits until day 5. It then has 20 units and orders 120 to restore position to 140. That receipt arrives at the end of day 7, after the day's demand has left 20 units waiting. The receipt clears them.

Change the review interval above. The periodic target adjusts to cover the new interval plus lead time. Opening stock remains 140, which also makes the initial adjustment visible.

## A shorter review interval still needs an operating plan

One demand history is not enough to choose the cheaper policy or set a service target. The zero-buffer settings make the timing easy to see. Different buffers, lot sizes, demand histories or lead times can change the result.

To compare policies for a real item, replay representative demand and receipt delays, including shortages. Agree the same customer-service measure, then compare stock held, orders placed and recovery costs. Don't count only the days when stock was available to sell.

The [safety-stock note](/notes/safety-stock-reorder-point/) covers uncertainty around expected demand and lead time. Size that buffer for the period the chosen policy actually has to protect. For a buffer shared across locations, [inventory risk pooling](/notes/inventory-risk-pooling/) also needs the relationship between their demands.

Before changing a parameter, confirm when the system can release an order, when the supplier can act on it and when the receipt becomes usable. If the team orders only on Friday, put Friday into the policy.

## Sources and example notes

- MIT, Chris Caplice. [Inventory Management: Probabilistic Demand](https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/8b53c45fd26ffff706d815131e8d177e_lect11.pdf), slides 5 to 7: review timing, inventory position and policy notation.
- MIT, Annie Chen. [Inventory Management, Part II](https://ocw.mit.edu/courses/15-772j-d-lab-supply-chains-fall-2014/0d50c5c77382852102ee30b98f1d4657_MIT15_772JF14_Lec14.pdf), slides 21 and 22: protection period and review comparison. This note uses R for the review interval; the second lecture uses T.

The demand history and policy parameters are our own teaching example. Lead time is exactly two elapsed working days from release to usable receipt. Orders have no minimum, capacity limit or cost in the replay. Detailed event timing and all daily values are beside the chart.
