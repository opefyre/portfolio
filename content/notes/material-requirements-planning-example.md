---
title: MRP explained: what to order and when
date: 2026-10-14
updated: 2026-10-23
summary: Fifty stands need 100 brackets, but you shouldn't order all 100. Work through the bill of materials, usable stock, incoming deliveries and the dates that decide the shortage.
seoTitle: MRP explained: what to order and when
seoDescription: Learn material requirements planning with a worked example. Calculate component needs, net off usable stock and receipts, then work back to order dates.
status: published
topic: Supply chain
keywords: material requirements planning, MRP example, MRP calculation, gross vs net requirements, bill of materials example, planned order release
---

A customer needs 50 display stands. Each stand uses two brackets, so purchasing orders 100 brackets.

There are already 20 usable brackets in the warehouse and another 30 due before assembly starts. The order should have allowed for those 50. But if the incoming delivery slips until after assembly, the quantity needed on time changes again.

**Material requirements planning**, or MRP, works through those quantities and dates. It starts from what you plan to make, calculates the components required, allows for usable supply, and proposes when to order or make the missing material.

It can also recommend moving existing orders. The planner checks those proposals against usable stock, incoming supply and the component dates in the finished-product plan.

## Start with what one finished product contains

A **bill of materials**, or BOM, lists the components and quantities used to make a product. Our fictional display stand needs two brackets, one base and four bolts.

There are no finished stands available, so all 50 must be assembled. That gives us 100 brackets, 50 bases and 200 bolts before we consider stock or deliveries. These are the **gross requirements**.

::figure mrp-product-tree | Fictional one-level bill of materials. Quantities on the branches are per stand; the totals are for 50 stands. No scrap or yield loss is assumed.

The component requirements follow from the stands we plan to assemble. This is **dependent demand**. We don't need to forecast bracket sales separately to calculate the brackets for these 50 stands.

[Oracle's MRP overview](https://docs.oracle.com/cd/A60725_05/html/comnls/us/mrp/mrpover.htm) describes the main inputs: the production schedule, BOM, inventory, scheduled receipts, lead times and order rules.

## Work back from the finished-product date

The stands must be ready at the start of week 6. Assembly takes one week, so it starts at the start of week 5. All three components must be available then.

For this example, a delivery recorded in week 5 is usable at the start of that week. Receiving and any necessary inspection are already included in its availability date.

::figure mrp-need-dates | Fictional planning dates. Components are needed at the start of week 5, one week before the finished stands are due. Brackets with a two-week supply lead time need release at the start of week 3.

Those dates prevent an easy mistake: using a delivery that arrives during the right month but after the material is needed. [SAP's net-requirements documentation](https://help.sap.com/saphelp_SCM700_ehp01/helpdata/en/a4/2ec95360267614e10000000a174cb4/content.htm?no_cache=true) explicitly considers requirement dates and receipt availability.

## Subtract the supply you can actually use

Assume the stock below is usable, unallocated to other work and recorded in the right units. The scheduled receipts are existing orders, separate from that stock.

| Component | Gross need in week 5 | Usable stock | Existing receipt before need | Net need |
| --- | ---: | ---: | ---: | ---: |
| Brackets | 100 | 20 | 30 in week 4 | 50 |
| Bases | 50 | 10 | 0 | 40 |
| Bolts | 200 | 80 | 100 in week 4 | 20 |

For brackets, net need = max(0, 100 − 20 − 30) = 50. The maximum with zero prevents a surplus from becoming a negative order.

These are the quantities missing by the assembly date. They become proposed receipt quantities only after we apply the order rules. For now, we'll order exactly the shortage, often called **lot-for-lot**.

The bracket lead time is two weeks. The bases and bolts each take one week. To receive the missing material in week 5, release the bracket order in week 3 and the other two orders in week 4.

A **planned order release** is the recommended start or ordering date. It isn't confirmation that a purchase order has been placed or the supplier has accepted it.

## Try a late receipt, a longer lead time or a case pack

The example below keeps assembly in week 5. Change one condition and follow its effect on the quantity or release date. The planning date is the start of week 2.

::interactive mrp-netting | Fictional material plan for 50 stands. All receipts and requirements occur at the start of the named week. The calculation shows additional supply needed by week 5 if existing receipts remain on their selected dates; it is not a full MRP engine.

Move the existing 30 brackets to week 6. They no longer cover week 5's requirement, so the on-time shortfall becomes 80 brackets.

That doesn't automatically mean buying 80 more. First check whether the existing 30 can be brought forward. If they can, the extra requirement returns to 50. If you buy 80 for week 5 and leave the original 30 arriving in week 6, this example ends with 30 excess brackets.

The lead-time control changes a different part of the plan. A four-week bracket lead time means the order needed release in week 1. We're already in week 2. Showing that date is an exception to resolve, not an instruction to place an order in the past.

For bolts, a 100-unit case pack turns a 20-unit shortage into a proposed order of 100. With 80 already on hand and 100 already coming, that leaves 80 after the 200-bolt requirement is met. The calculation hasn't lost the surplus; the order rule created it.

## Why MRP and a reorder point give different instructions

A **reorder point** triggers replenishment when the inventory position reaches a chosen level. MRP uses dated requirements from the production plan, with the component quantities coming from the BOM.

Both depend on reliable records. They organise the replenishment decision differently, and a company may use different methods for different materials.

The [safety-stock and reorder-point example](/notes/safety-stock-reorder-point/) works through the trigger-and-buffer approach. [ABC and XYZ analysis](/notes/abc-xyz-inventory-analysis/) helps you review item value and demand patterns before choosing how closely to manage each group.

A forecast may help create the finished-product plan. That's the connection to [Foreviq](/work/foreviq/), the forecasting project I'm working on. The bracket requirement still comes from the BOM and the dated assembly plan.

## Check feasibility before treating the proposal as a promise

Our arithmetic assumes no other demand, no safety stock, no scrap, no shortages during assembly and the same lead time for each proposed order. Real settings can change all of those conditions.

Also check capacity. Having components available doesn't establish that the assembly team, machine or supplier can do the work in the allotted time. Oracle's basic MRP documentation separates the material plan from the capacity check.

Before releasing an order, check the BOM revision, usable stock, existing commitments and receipt dates. If the finished-product plan changes, follow the effect into the component plan rather than leave yesterday's orders untouched.

:::link /notes/ai-supply-chain-planning/ | Connect the forecast to the planning decision
A forecast is one input. The next decision still needs stock, capacity, delivery dates and a person who can approve the trade-off.
:::

## Sources and calculation notes

- [Oracle: Overview of Material Requirements Planning](https://docs.oracle.com/cd/A60725_05/html/comnls/us/mrp/mrpover.htm). Inputs, proposed orders and the separate capacity check.
- [Oracle: Overview of Planning Logic](https://docs.oracle.com/cd/A60725_05/html/comnls/us/mrp/logicovr.htm). Material policies and dated requirements.
- [SAP: Net Requirements Calculation](https://help.sap.com/saphelp_SCM700_ehp01/helpdata/en/a4/2ec95360267614e10000000a174cb4/content.htm?no_cache=true). Stock, receipts and requirement dates. Specific system behaviour depends on settings.

The product, quantities and dates are fictional. Weeks are equal planning buckets, not calendar promises. Existing orders stay on their selected dates in the tool; no automatic rescheduling is assumed. Net need, pack rounding, release offsets and later surplus are shown separately so the same receipt isn't counted twice.
