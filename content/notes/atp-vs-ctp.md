---
title: ATP vs CTP: differences and an order promising example
date: 2026-10-15
summary: There are 80 units in stock, but only 30 are free. Follow a 50-unit order through existing supply and an extra production option to see what changes the promise.
seoTitle: ATP vs CTP: differences and order promising
seoDescription: Learn available-to-promise and capable-to-promise with a worked order example. Compare stock, commitments, incoming supply and production capacity.
status: published
topic: Supply chain
keywords: ATP vs CTP, available to promise, capable to promise, order promising example, ATP calculation
---

**Available-to-promise (ATP) checks what uncommitted supply can cover an order, and when. Capable-to-promise (CTP) adds a check on the materials and capacity needed to provide supply.** ATP can include future receipts, not just stock on the shelf.

A customer asks for 50 units. The stock screen shows 80. Sending a confirmation looks straightforward until someone checks the 50 units already promised to other customers.

That leaves 30. The new order needs another 20 before it can leave in full.

[Microsoft's order-promising documentation](https://learn.microsoft.com/en-us/dynamics365/supply-chain/sales-marketing/delivery-dates-available-promise-calculations) makes that distinction. The rules vary by system. Here is how they affect this order.

## ATP vs CTP: key differences

| Check | ATP | CTP |
| --- | --- | --- |
| Stock and existing commitments | Included | Included |
| Dated incoming supply | Included under the planning rules | Included under the planning rules |
| Materials and capacity for additional production | Does not check a new production route by itself | Checks the production option against relevant constraints |
| What the result supports | A quantity and date from the supply being considered | A quantity and date that also account for the production option |

Both checks need to protect existing allocations and flag unconfirmed receipts.

The [inventory-position note](/notes/inventory-position-vs-on-hand/) explains a related distinction: a replenishment total can look healthy while a particular order still has to wait. Here, we're deciding a date for one new commitment.

## ATP calculation example: stock and planned receipts

Our fictional warehouse supplies finished assemblies. All quantities below are individual units. The new customer wants 50 together, with no partial shipment.

| Supply or commitment | Quantity | When it is usable |
| --- | ---: | --- |
| Released finished stock | 80 | Now, day 0 |
| Existing customer allocations | −50 | Protected throughout this example |
| Free stock after those allocations | 30 | Day 0 |
| Uncommitted finished goods from a supplier | 40 | Start of working day 4 |

There are no other demands or receipts in the example. On day 0, we can offer 30, not the requested 50. At the start of day 4, the supplier receipt brings uncommitted supply to 70.

The whole 50-unit order can therefore be ready on day 4. Accepting it would leave 20 units uncommitted from this supply.

These are **ready-to-dispatch dates**. Transport, loading cutoffs and the customer's receiving calendar still belong in a delivered-date promise.

## CTP example: check materials and production capacity

There is also a small workshop that could make the shortfall. Its materials are released at the start of day 1. A suitable crew and machine become available at the start of day 2. The 20-unit batch needs one full working day, including its required checks.

It can start on day 2 and become usable at the start of day 3. Together with the 30 finished units already free, that would make all 50 available one working day before the supplier receipt.

:::formula Additional batch, in elapsed working days
Earliest start = later of material readiness and capacity readiness
Later of day 1 and day 2 = day 2
One working day of production and checks gives usable supply on day 3
:::

The supplier's 40 units and the workshop's extra 20 are separate supply options. The workshop resources aren't already booked to make that supplier receipt. Counting the same batch twice would create a promise neither route can fulfil.

The [MRP example](/notes/material-requirements-planning-example/) explains how to calculate the materials needed. A material requirement alone doesn't establish that the crew and machine are free at the required time.

## Compare ATP and CTP dates in the interactive example

Try delaying the receipt, the materials or the available capacity. Both routes stay visible. CTP can keep the existing-supply date when the extra batch would finish later.

::interactive promise-routes | Fictional 50-unit order. Both routes protect existing allocations and use the same 30 free units. The optional batch takes one working day. Dates show when the order could be ready to dispatch, before transport.

With the supplier receipt on day 4 and capacity unavailable until day 5, the extra batch finishes on day 6. Making it doesn't improve this promise. The existing receipt still supports day 4.

Move the supplier receipt to day 7 and keep that day-6 batch feasible, and production becomes the earlier route. Nothing about the opening stock has changed. The dates have changed which option helps.

:::link https://vrolen.com/blog/production-scheduling-optimization/ | Check whether the production slot is feasible
Vrolen's scheduling guide adds calendars, skills, tooling and competing work to the capacity check.
:::

## Separate the feasible date from the decision to use it

The workshop route is one day earlier in the original case. That doesn't tell us whether it is worth doing. It could create extra setup cost, use material needed elsewhere or consume capacity for another urgent order.

If the customer can accept 30 now and 20 later, evaluate that as a separate offer. Don't silently turn a full-order promise into a partial shipment.

Keep the customer request, protected allocations, receipt assumptions and production option together. Agree the route, reserve its supply and resources, then confirm the shipment and delivery dates. Recheck affected promises when one of those assumptions changes.

## Source and example notes

- Microsoft Learn. [Order promising](https://learn.microsoft.com/en-us/dynamics365/supply-chain/sales-marketing/delivery-dates-available-promise-calculations). ATP, CTP, commitments and dated availability.

The quantities, resources and dates are fictional. The model covers one item, its existing allocations, one independent receipt and one optional batch. Capacity remains available from its stated start; materials remain usable once released.
