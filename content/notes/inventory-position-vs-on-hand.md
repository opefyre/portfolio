---
title: Inventory position vs on-hand stock: why both matter
date: 2026-10-14
summary: There are 20 pieces on the shelf and an inventory position of 60. Both numbers are correct. Follow the receipts and commitments to see which question each can answer.
seoTitle: Inventory position vs on-hand stock: an example
seoDescription: Calculate inventory position from on-hand stock, open orders and backorders. A dated example shows why a healthy total can still leave demand unfilled.
status: published
topic: Supply chain
keywords: inventory position vs on hand, inventory position formula, on hand inventory, on order inventory, inventory position example
---

Stores reports 20 pieces. Planning reports 60. Before asking which system is wrong, check what each number includes.

**On-hand stock is physically present. Inventory position adds outstanding replenishment orders and subtracts backorders.** It describes the position across stock already here, stock still coming and demand already owed. It doesn't mean every piece is available to pick today.

Evan Porteus's [inventory theory overview at Stanford](https://www.gsb.stanford.edu/faculty-research/working-papers/stochastic-inventory-theory) sets out this distinction. It also separates backorders, where the customer waits, from lost sales, where the demand is no longer waiting to be filled.

The two numbers support different decisions. A replenishment review needs to know what is already on order. A dispatch promise needs to know when usable stock will actually be available.

## Calculate inventory position from one snapshot

Our fictional warehouse holds one bracket item. At the opening snapshot, it has 20 released pieces on hand, 50 on an outstanding purchase order and ten pieces still owed on overdue customer orders.

The team has just received stock and hasn't yet dispatched those ten backordered pieces. They remain included in the physical 20. There are no other reservations or commitments in this example.

| Opening quantity | Pieces | Treatment |
| --- | ---: | --- |
| Released on hand | 20 | Add |
| Outstanding purchase-order balance | 50 | Add |
| Backordered customer demand | 10 | Subtract |
| Inventory position | 60 | 20 + 50 − 10 |

:::formula Inventory position, in pieces
Inventory position = on hand + on order − backorders
20 + 50 − 10 = 60
:::

After dispatching the ten overdue pieces, on hand falls to ten and backorders fall to zero. Inventory position is still 10 + 50 − 0 = 60. Fulfilling that already-counted demand changes both terms together.

This is also why commitments need to be counted once. If a system has already deducted the same ten pieces from an “available” balance, subtracting them again understates the position. Read the field definition before using it in a formula.

The [data quality example](/notes/data-quality-dimensions/) covers the same discipline for units, locations and timestamps. A perfectly calculated total is still misleading if its inputs describe different things.

## Keep the receipt date beside the quantity

Now add two new requirements: ten pieces at the end of day 1 and ten at the end of day 2. These are additional demand, separate from the ten old backorders cleared at the start.

Compare two possible receipt dates for the same 50-piece purchase order:

| Receipt assumption | Opening inventory position | Stock after new day-2 demand | Demand still owed at end of day 2 |
| --- | ---: | ---: | ---: |
| Available at the start of day 1 | 60 | 40 pieces | 0 pieces |
| Available at the start of day 3 | 60 | 0 pieces | 10 pieces |

In the early case, the receipt is ready before either new requirement. In the late case, the ten pieces left after clearing old backorders cover day 1. Day 2's ten pieces must wait until day 3.

The opening inventory position is 60 in both cases. It contains the same outstanding order, even though its arrival date changes the service result.

::interactive inventory-position-dates | Fictional single-item example in individual pieces. Day 0 shows the balance after clearing ten old backorders from the opening 20 pieces. New demand is ten pieces at each end of days 1 and 2. The same 50-piece order becomes usable at the start of day 1 or day 3. Negative net balance means demand still owed, not negative physical stock. No further demand is assumed through day 3.

The chart shows both dates together. Inspect a day to see the physical quantity and the outstanding demand separately. Once the late receipt arrives on day 3, it clears the ten-piece backlog and leaves 40 pieces, matching the early case's final balance.

The temporary shortage still happened. Equal final stock doesn't make the two delivery histories equivalent.

## An open order is not another shelf

Including on-order quantity helps prevent ordering again simply because the shelf looks low. Receiving those pieces moves them from on order to on hand; it doesn't create a second 50-piece supply.

Keep the outstanding balance accurate. If a 50-piece order has already delivered 20, only 30 remain on order. Counting the full original order alongside the received stock adds the same 20 twice.

A cancelled order shouldn't remain in the supply total. An order with an uncertain date needs follow-up. Expediting an existing order and placing another order are different responses, with different cost and excess-stock consequences.

The [MRP example](/notes/material-requirements-planning-example/) takes the next step by placing requirements and receipts against dates. The [safety stock and reorder point note](/notes/safety-stock-reorder-point/) explains the buffer and replenishment threshold. Neither replaces checking what an outstanding order can supply before a particular need date.

## Match the number to the decision

For an immediate pick, inspect the correct item's usable stock at the right location, after existing commitments. Physical on hand can include held or unsuitable stock in a real system; our 20 pieces are all released.

For a replenishment decision, include the remaining open supply and demand commitments according to the policy's definition. Then check dates where a delay can leave an uncovered requirement.

If physical stock itself is doubtful, start with [cycle counting](/notes/cycle-counting-inventory-accuracy/). A more detailed planning calculation won't establish what is actually in the bin.

For our planner, the next action is to confirm when the existing 50 pieces become usable and address the day-2 gap if they arrive late. Reporting 60 without that date leaves the person making the delivery promise with half the answer.

## Source

- Evan L. Porteus, Stanford Graduate School of Business. [Stochastic Inventory Theory](https://www.gsb.stanford.edu/faculty-research/working-papers/stochastic-inventory-theory), 1988, public overview. On-hand stock, outstanding orders, backorders and inventory position.

All quantities and movements are fictional. The date comparison covers the stated old backlog, new requirements and one 50-piece order.
