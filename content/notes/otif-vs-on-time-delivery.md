---
title: OTIF vs on-time delivery: which promise did we measure?
date: 2026-10-14
summary: Ten orders show why 80% on-time delivery can mean 60% OTIF, and how revised promise dates can improve the report while every delivery stays the same.
seoTitle: OTIF vs on-time delivery: a worked example
seoDescription: Calculate OTIF and on-time delivery from ten orders. Compare original and revised promises, inspect partial deliveries and see why the counting rules matter.
updated: 2026-10-20
status: published
topic: Supply chain
keywords: OTIF vs on time delivery, OTIF calculation example, on time in full formula, delivery performance, original promise date, OTIF vs fill rate
---

Eight of ten orders arrived on time. Eight arrived in full. How many did both?

You can't tell from those two totals. You need to check the same order identities against both conditions.

**On-time delivery measures whether deliveries meet the agreed timing rule. OTIF means on time, in full: the delivery must also meet the quantity requirement.** For the order-based score in this article, an order passes only when its full accepted quantity arrives within its delivery window.

[ASCM's dictionary](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1) defines the concepts. The practical rules still need agreement: which date, which receipt event, which quantity and which orders belong in the report.

## Ten orders, one agreed rule

A fictional supplier has ten customer orders due today. Each requests 100 units of the correct product. Their original receiving window is 08:00 to 13:00, and the review takes place at 17:00.

Each order has one receipt. We know its time and the quantity accepted by the customer. There are no substitutions, rejected units or cancellations.

Six orders arrive at 12:50 with all 100 units. Two arrive at 12:50 with only 80 units, and their remaining units are still missing at review. Two arrive at 14:00 with all 100 units.

| Outcome against the original window | Orders | On time? | In full by review? | OTIF? |
| --- | ---: | --- | --- | --- |
| 100 units at 12:50 | 6 | Yes | Yes | Yes |
| 80 units at 12:50 | 2 | Yes | No | No |
| 100 units at 14:00 | 2 | No | Yes | No |

Here, the on-time measure checks when the recorded receipt occurred, independently of quantity. “In full by review” checks whether all 100 units have been accepted by 17:00. The OTIF rule is stricter: all 100 must arrive within the window.

:::formula Order-based calculation
On-time delivery = 8 on-time orders ÷ 10 due orders × 100 = 80%
In full by review = 8 full orders ÷ 10 due orders × 100 = 80%
OTIF = 6 orders meeting both conditions ÷ 10 due orders × 100 = 60%
:::

The two short orders help the timing score. The two late orders help the quantity score. Neither group passes OTIF.

## OTIF vs perfect order: add the other conditions

A **perfect order** meets the agreed fulfilment requirements beyond timing and quantity, such as accuracy, condition and documentation. ASCM's dictionary includes on-time, complete, accurate and undamaged fulfilment in its definitions. Agree the conditions your own measure will use.

Keep the same ten orders and original windows. In a separate extension of this fictional example, order 101 is one of the six OTIF successes, but its invoice has an incorrect reference. The goods remain correct and accepted; timing and quantity do not change. The other five OTIF successes meet every condition in our agreed perfect-order rule.

| Rule against the original promises | Passing orders | Result |
| --- | ---: | ---: |
| On time | 8 of 10 | 80% |
| On time and in full | 6 of 10 | 60% |
| OTIF plus correct documentation and no other agreed failure | 5 of 10 | 50% |

This paperwork extension is not included in the interactive ledger below, which continues to compare receipt times and quantities only.

Count the orders meeting **all** required conditions. Multiplying separate timing, quantity and documentation percentages will not reconstruct that overlap from their totals alone. The lower perfect-order score points to a documentation problem as well as the delivery failures.

## Change the date basis, keep the deliveries

Before 13:00, suppose the customer agrees to extend the two late orders' windows to 14:00. The revision is recorded at 12:00. Nothing about the actual receipts changes.

Explore both date bases below. The original promises remain visible so the revised plan doesn't replace the delivery history.

::interactive otif-promise-ledger | Ten fictional orders, 100 units each, reviewed at 17:00. Each has one accepted receipt. Original windows are 08:00–13:00. For orders 109 and 110 only, a customer-agreed revision recorded at 12:00 extends the window to 14:00. Buttons change the assessed window, not the receipt times or quantities. This example uses a binary order-based OTIF rule.

Against the revised windows, all ten receipts are on time. Eight orders are full, so OTIF becomes 80%. Against the original windows, it remains 60%.

Both views can be useful. The revised one shows whether the supplier met the updated agreement. The original one shows whether it met the earlier promise. A report should say which question it answers.

Keep the original date, revision time, agreed date and reason. A new date entered after a late delivery is a different record from a customer-approved change made beforehand. The [data quality note](/notes/data-quality-dimensions/) explains why plausible values still need evidence behind them.

## Why OTIF formulas can disagree

Our example counts complete orders. Some delivery programmes count lines or cases instead. That changes what partial fulfilment earns.

A [2019 Trading Partner Alliance and McKinsey study](https://www.mckinsey.com/capabilities/operations/our-insights/defining-on-time-in-full-in-the-consumer-sector) found differing definitions in consumer goods and proposed an on-time case-quantity measure. It credits quantities delivered within the window, even when the whole order isn't complete. That is a different rule from the binary order score used here.

With our original windows, 760 units arrive on time: 600 across six complete orders, plus 160 across two partial orders. An on-time quantity measure would therefore be 760 ÷ 1,000 = 76%. Our order-based OTIF is 60%.

By 17:00, 960 units have arrived, giving a received-quantity share of 96%. That figure includes the two late deliveries. It cannot stand in for an on-time score.

The [cycle service level and fill rate article](/notes/cycle-service-level-vs-fill-rate/) explores these different denominators. Its unit fill rate counts demand supplied immediately from stock, which is another event again.

:::link https://vrolen.com/blog/otif-calculation-manufacturing/ | OTIF across dispatch and customer receipt
Vrolen's guide follows the evidence from shipment to delivery, using a separate ten-order example. A dispatch timestamp alone doesn't establish when the customer received the goods.
:::

## Partial deliveries need the whole receipt history

The single-receipt example keeps the arithmetic easy to inspect. Real orders may arrive in several parts.

Suppose a separate order receives 80 units at 12:50 and its remaining 20 at 14:00, against a 13:00 deadline. It was complete by the 17:00 review, but it was not complete on time. Scoring only its first receipt would miss that failure.

Combine receipts against the same order and compare the time its full required quantity was accepted with the window. Agree how your rules treat damaged goods, substitutions, customer holds and missing receipt evidence.

Also decide which orders enter the denominator. A report covering all orders due today should not silently drop an undelivered order because it has no receipt timestamp. Apply the agreed rule and keep unresolved evidence visible. If no orders are eligible, the rate is not applicable, rather than 100%.

## Use the failure pattern to choose the follow-up

Against the original promises, our supplier has two short deliveries and two late ones. Those groups need investigation. The score alone doesn't tell us whether picking, stock availability, transport or appointment changes caused them.

Take the order ledger into the review. Separate quantity failures from timing failures, then show the original and revised windows beside the receipt evidence. A higher percentage after a legitimate promise change tells the team something about its revised commitments. Improving the original result requires a change in what customers actually receive and when.

## Sources and example notes

- [ASCM Supply Chain Dictionary, 18th edition](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1), printed pages 126–127 and 137. On-time delivery, OTIF, quantity completeness and perfect orders.
- [Trading Partner Alliance and McKinsey: Defining on-time, in-full in the consumer sector](https://www.mckinsey.com/capabilities/operations/our-insights/defining-on-time-in-full-in-the-consumer-sector), 2019. Differences in measurement rules and a proposed case-based approach, not a universal reporting standard.

All orders, quantities, times and revisions are fictional. The order-level rule, population and review cutoff are agreed teaching choices. The separate split-receipt example is not included in the interactive ledger.
