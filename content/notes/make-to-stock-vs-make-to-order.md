---
title: Make-to-stock vs make-to-order: what happens before the order?
date: 2026-10-14
summary: A customer wants 20 lights dispatched in three days. Compare finished stock, common components and production from raw material to see which promise each can support.
seoTitle: Make-to-stock vs make-to-order: MTS, MTO and ATO
seoDescription: Compare make-to-stock, make-to-order and assemble-to-order using one product. Explore customer waiting time, stock choices and the effect of a production queue.
updated: 2026-10-20
status: published
topic: Supply chain
keywords: make to stock vs make to order, MTS vs MTO, assemble to order example, ATO vs MTO, order decoupling point, manufacturing strategy
---

A customer asks for 20 industrial bench lights, dispatched within three days. Sales knows how long assembly takes: two days. The order sounds achievable.

That answer depends on what is ready now. Twenty finished lights, twenty sets of common parts and enough raw material for twenty lights are three different starting points.

**Make-to-stock (MTS) finishes products before a customer order arrives. Make-to-order (MTO) makes the product after the order. Assemble-to-order (ATO) stocks common components and completes assembly after the order.** These are the distinctions described in [ASCM's supply chain dictionary](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1).

The choice changes which work the customer waits for. It also changes what the business has already committed to making.

## One product, three starting points

Our fictional manufacturer offers lights assembled from a common housing and standard selectable fittings. Making the housings takes four working days. Assembly takes two. Final checking, packing and dispatch take one more.

These are elapsed times for the whole 20-light order, not times per light. Transport to the customer is excluded because the request is for dispatch within three days.

Assume the correct stock is usable, available and not allocated to another order. For this first comparison, production capacity is ready when needed.

| Approach | Available when the order arrives | Work still required | Earliest dispatch |
| --- | --- | --- | ---: |
| Make-to-stock | 20 finished lights of the requested version | Check, pack and dispatch | Day 1 |
| Assemble-to-order | 20 common housings and all required fittings | Assemble, then check, pack and dispatch | Day 3 |
| Make-to-order | Raw material and purchased parts for 20 lights | Fabricate, assemble, then check, pack and dispatch | Day 7 |

The work hasn't disappeared in MTS or ATO. Some of it happened before the customer committed. That is why the response can be shorter.

The point where work switches from preparation for expected demand to fulfilment of a specific order is often called the [customer order decoupling point](https://portal.research.lu.se/en/publications/managing-customer-order-decoupling-points-in-supply-chains/). Here it sits at finished stock, common components or the raw-material stage.

## See what a queue does to the promise

All three approaches remain visible below. Add a wait for the first production stage that still needs doing. The finished-stock case does not enter that queue because its fabrication and assembly are already complete.

::interactive order-strategy-timing | Fictional 20-light order placed at day 0. Fabrication takes 4 working days, assembly 2 and final check/pack/dispatch 1. Correct uncommitted stock is available at the stated stage. The slider adds a wait before the first production stage after the order, with no other delays. Negative positions illustrate work completed before the order; they do not measure inventory age. Transport is excluded.

With no queue, ATO reaches dispatch on day 3. Add a two-day wait for assembly and it moves to day 5. The parts can be ready while the order is still too late for the customer's request.

MTO moves from day 7 to day 9 with the same added wait. Its raw material is available throughout. Availability of material and availability of production capacity are separate checks.

The [APICS master-planning excerpt](https://learningsystem.ascm.org/wp-content/uploads/2018/11/APICS_CPIM_2019_Excerpt.pdf) connects order promises with uncommitted stock and capacity. A label such as “assemble-to-order” cannot establish a date by itself.

For a factory application, [Vrolen's production scheduling guide](https://vrolen.com/blog/production-scheduling-optimization/) explains how machines, people, materials and existing commitments affect the executable plan.

## Moving work earlier also moves the stock decision

In the MTS case, the manufacturer chose the finished version before knowing this customer's order. If customers buy a different fitting, those finished lights may wait while the requested version is unavailable.

ATO leaves that final choice open for longer. The common housing can serve several standard versions, provided the required fittings and assembly capacity are available. It still needs a decision about how many housings and fittings to hold.

This illustrates **postponement**, also called delayed differentiation: deliberately leave final assembly, packaging or another version-specific step until later, when the requirement is better known. [ASCM's dictionary](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1), printed page 143, defines the strategy. It does not mean delivering an accepted order late.

For these lights, finish common housings in advance but select and fit the requested version after the order. The existing timeline shows that split. It works only if common stock, the right fittings and finishing capacity can meet the three-day dispatch promise. The [risk-pooling example](/notes/inventory-risk-pooling/) explains why sharing a stock form can reduce some uncertainty, without making total demand certain.

MTO postpones more production until demand is confirmed. In our example it still holds raw material and purchased parts. “Made to order” does not mean “no inventory”, and it doesn't mean every order requires a new design. Engineer-to-order adds a separate design requirement.

The [ABC/XYZ inventory example](/notes/abc-xyz-inventory-analysis/) helps review item value and demand patterns. Use that evidence alongside the customer's acceptable wait, the cost of holding each stock form and the chance that a version becomes obsolete. There is no universal best approach for every item in the catalogue.

## Make-to-order still needs advance planning

Waiting for a firm order before manufacturing doesn't remove the need to prepare people, equipment, supplier capacity or long-lead parts.

Suppose every confirmed order needs the same housing material. The business can plan that shared requirement before it knows the exact finished-product mix. When orders arrive, the dated production plan and bill of materials translate them into component requirements.

The [MRP worked example](/notes/material-requirements-planning-example/) explains that calculation. Forecast demand can inform the wider plan; component demand for a particular build comes from what that build contains.

That is also a useful connection to [Foreviq](/work/foreviq/), the forecasting project I'm working on. The forecast supports preparation. The order promise still needs the stock, capacity and dates behind it.

## Choose by product family, then check a real order

A business can stock a few popular finished versions, assemble less common standard combinations and make unusual products to order. Its planning rules should make the difference clear to sales and production.

For the bench-light order, the next conversation is specific. Are the finished lights the requested version? If using ATO, are every required fitting and an assembly slot available? If using MTO, will the customer accept the longer dispatch time?

Agree that dispatch promise before accepting the order. Then measure against it. The [OTIF article](/notes/otif-vs-on-time-delivery/) follows the next question: did the full order actually reach the customer within the agreed delivery window?

## Sources and example notes

- [ASCM Supply Chain Dictionary, 18th edition](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1), printed pages 14, 110 and 143. ATO, MTO, MTS and postponement definitions.
- [Olhager and Van Donk: Managing customer order decoupling points in supply chains](https://portal.research.lu.se/en/publications/managing-customer-order-decoupling-points-in-supply-chains/), 2024. Public research abstract defining the link between a product and a specific customer order.
- [APICS CPIM 2019 public excerpt: Master Scheduling and Sales](https://learningsystem.ascm.org/wp-content/uploads/2018/11/APICS_CPIM_2019_Excerpt.pdf), printed pages 1-207 to 1-208 and 1-211. Available stock, capacity and order promising.

The product, stock positions and durations are fictional. Each approach is a separate alternative for the same order. The comparison isolates the work remaining after receipt of the order; it does not optimise inventory, estimate stockout probabilities or include replenishment, cost, yield loss or transport.
