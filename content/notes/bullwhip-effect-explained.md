---
title: The bullwhip effect: why orders swing more than sales
date: 2026-10-14
summary: Customers buy about 100 units a week. The manufacturer sees orders of 400, then nothing. Follow the order batches to see how the same demand becomes a very different signal.
seoTitle: Bullwhip effect: a worked supply chain example
seoDescription: Understand the bullwhip effect with an interactive example. See how order batching changes the demand signal, why it happens and what to investigate.
status: published
topic: Supply chain
keywords: bullwhip effect, bullwhip effect example, bullwhip effect causes, order batching, demand variability
---

Customers buy about 100 units a week. The retailer places an order for 200 every other week. Further upstream, the manufacturer receives an order for 400, followed by three weeks of silence.

Nobody has found four times as many customers. The ordering rules have changed the shape of the demand signal.

The **bullwhip effect** is the tendency for replenishment orders to become more variable than the demand they serve, with variation potentially growing further up the supply chain. A supplier sees what its customer orders, which can look quite different from what the final customer buys.

Order batching gives us a simple way to see it happen.

## Follow the same 800 units

Our fictional product sells 800 units over eight weeks. Weekly sales barely move.

| Week | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Customer purchases | 98 | 102 | 99 | 101 | 100 | 100 | 97 | 103 |
| Retailer orders to distributor | 0 | 200 | 0 | 200 | 0 | 200 | 0 | 200 |
| Distributor orders to manufacturer | 0 | 0 | 0 | 400 | 0 | 0 | 0 | 400 |

The retailer groups replacement requests into two-week orders. The distributor groups the requests it receives into four-week orders. Both calendars start in week 1, and both release at the end of their review period.

Each stage orders exactly 800 units by the end of week 8. The manufacturer still receives a much less even workload signal.

This example follows order information only. We assume stock is available so shortages don't suppress purchases. We don't calculate physical inventory, shipment dates, production queues or backlogs. Those would need a fuller model of replenishment and transport.

## Change the ordering calendar

Try having the retailer order every week. Then change the distributor's calendar. Watch what happens to the orders received by the manufacturer.

::interactive bullwhip-batching | Fictional eight-week ordering example. Each stage starts with zero unsubmitted replacement requests. Requests pass upstream at the end of the same week; physical fulfilment isn't simulated. All views use the same customer purchases and a common 0 to 400-unit scale.

If the distributor still releases orders every four weeks, more frequent retailer orders don't remove the manufacturer's four-week peaks. The distributor continues collecting requests before passing them on.

When both order weekly, the order series matches customer purchases in this example. That result follows from our deliberately simple rule: pass on the exact quantity purchased, without forecasting, stock adjustments or other constraints.

It doesn't establish that weekly ordering would eliminate the bullwhip effect in a real supply chain. It isolates one mechanism so we can discuss the others clearly.

## Why businesses create these patterns

Large orders can be sensible for the team placing them. A full truck can cost less per unit than several small deliveries. A supplier may require a case multiple. A production line may need a long changeover before making the product.

The problem appears when the next business treats that order pattern as a direct reading of consumer demand.

[Lee, Padmanabhan and Whang's research](https://doi.org/10.1287/mnsc.43.4.546) identifies four sources of distortion. They give us four different things to investigate.

| Mechanism | What to look for in practice |
| --- | --- |
| Demand signal processing | Each stage updates its forecast and stock target from the orders it receives |
| Order batching | Purchasing calendars, transport rules or setup costs collect demand into fewer releases |
| Price variation | Promotions or temporary discounts encourage purchases earlier than consumption requires |
| Rationing and shortage gaming | Customers inflate requests when they expect the supplier to allocate only part of each order |

These mechanisms can overlap. A discounted large batch can also change the forecast used to set the next stock target.

## Put orders beside consumption before changing the forecast

Start with one product and one time basis. Compare final-customer purchases, orders received, orders placed, cancellations, promotion dates and changes to stock targets.

Keep zeros visible. In our table, a zero order means no release that week. It doesn't mean customers stopped buying. Treating those weeks as zero underlying demand would teach the forecast the ordering calendar.

Sales need checking too. An empty shelf can hide demand that never became a transaction. The [stockout forecasting example](/notes/demand-forecasting-stockouts/) shows why low recorded sales don't always mean low customer interest.

If the calendars differ, inspect both the weekly pattern and the total over a complete cycle. Don't compare a four-week order with one week of sales and call the difference forecast error.

## Change the rule that creates the extra swing

If batching is responsible, test whether smaller releases are practical. That could mean a simpler order process, consolidated transport across products or shorter production setups. Count the extra ordering and freight work alongside any reduction in stock or disruption.

The [EOQ worked example](/notes/economic-order-quantity-eoq/) makes that trade-off explicit: reducing the cost per replenishment changes the quantity worth ordering. In production, the [SMED example](/notes/smed-changeover-smaller-batches/) explores what shorter changeovers can make possible.

If the main issue is repeated forecast updates, give upstream planners access to consumption and context, rather than asking them to infer everything from orders. Keep promotions, stock rebuilding and genuine demand growth distinguishable.

If allocation encourages inflated requests, review how allocation works and which consumption evidence supports it. A better forecast alone won't change an incentive to over-order.

Our [procurement savings example](/notes/when-procurement-savings-increase-total-cost/) is relevant here: an ordering rule can help one budget while moving cost elsewhere. Judge the test across service, inventory, freight and production, rather than by purchase price alone.

## Check what the smoother pattern actually achieves

More even orders can make planning easier. They don't, by themselves, prove that stock fell or customers received goods sooner.

Keep the observation window long enough to include full order cycles. Check fulfilment, stock availability and the extra work required to place and receive orders. Make sure a smoother supplier order pattern hasn't been achieved by leaving customer requests waiting somewhere else.

For a related flow check, Vrolen's [Little's Law guide](https://vrolen.com/blog/littles-law-wip-lead-time/) explains how average inventory, throughput and lead time fit together, and why changing one doesn't guarantee the others stay fixed.

Before calling a supplier's demand unpredictable, put its orders beside the purchases those orders ultimately serve. Some of the apparent volatility may come from decisions the businesses can change.

## Sources

- Lee, H. L., Padmanabhan, V. and Whang, S., 1997. [Information Distortion in a Supply Chain: The Bullwhip Effect](https://doi.org/10.1287/mnsc.43.4.546). Definition and four mechanisms identified in the research abstract. The interactive example is our own batching arithmetic, not a reproduction of the paper's model or data.

All purchases and orders in the example are fictional. Information transfers take place at week end in retailer-to-distributor-to-manufacturer order. Unsubmitted requests are carried forward, not discarded. No inventory, delivery performance or savings result is estimated.
