---
title: How to improve inventory management: diagnose the shortage first
date: 2026-10-19
summary: Use one stock review to separate inaccurate records, replenishment problems and excess inventory. Choose useful KPIs and check the result of a policy change.
seoTitle: Improve inventory management: a worked example
seoDescription: Use one stock review to separate inaccurate records, replenishment problems and excess inventory. Choose useful KPIs and check the result of a policy change.
status: published
topic: Supply chain
keywords: improve inventory management, inventory management KPIs, stock accuracy, inventory replenishment
---

The system says there are 30 units. The picker finds 18. The next supplier receipt is not due for another week.

Increasing safety stock might help a genuine replenishment gap. It will not explain why the record overstates the stock by 12 units.

**Inventory management decides what stock to hold, when to replenish it and how to keep it available for the work it serves.** Improving it means finding whether the problem is the record, demand, supply timing or the policy that connects them.

[ASCM's dictionary](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1#page=97) defines inventory management around planning and controlling stock. Its accuracy definition compares on-hand quantity with the recorded balance. Let's use one fictional distributor to make those checks concrete.

## Establish what is actually usable

For part A, a count confirms 18 usable units, no stock in quarantine and no other storage location. Records show 30 because a 12-unit issue was not posted. Correct that transaction through the normal approval route, then investigate why it was missed.

Do not treat the correction as a purchase or a physical loss unless the investigation supports that conclusion. The units were already issued; the record was wrong.

The [cycle-counting guide](/notes/cycle-counting-inventory-accuracy/) follows the reconciliation and recurrence checks. Before changing a reorder point, the team needs the position it would apply the rule to.

::figure paa-stock-review | Fictional review of part A. The unposted issue explains the record difference. The replenishment review then uses the corrected on-hand balance, confirmed supply and commitments. This is a diagnosis, not a simulated service result.

## Separate demand from what the system managed to sell

Assume customers need 10 units per working day. That estimate needs checking against orders, rejected requests and stockouts. A sales history that stops when the shelf empties can understate the requirement.

The [stockout forecasting note](/notes/demand-forecasting-stockouts/) explains that problem. Seasonal or promotional demand also needs a different reading from a stable daily rate.

For this short example, assume 10 units per day remains a reasonable planning estimate and there is no other committed demand. At that rate, the 18 usable units cover 1.8 working days. Actual orders could use them faster or slower.

## Check the replenishment rule against the real delay

The supplier quotes three days. Receiving and release take another day. The buyer normally reviews this item every five working days.

That review interval matters. In a periodic-review arrangement, the next purchase decision can arrive five days after today's review, followed by four days until usable receipt. The policy needs to consider that exposure, including uncertainty. It cannot simply borrow a reorder point designed for continuous review.

[Continuous versus periodic review](/notes/continuous-vs-periodic-inventory-review/) explains the distinction. The [safety-stock note](/notes/safety-stock-reorder-point/) covers the buffer calculation under its stated assumptions.

For part A, the team could test a more frequent review if records and supplier information support it. It must first resolve today's shortage risk with an authorised action: a confirmed earlier receipt, an acceptable substitute or a revised customer commitment. Changing a future parameter does not bring today's stock forward.

## Choose measures that reveal the trade-off

Choose inventory measures around the service the stock provides. A spare that stops a machine and a short-life consumer product need different attention.

| Question in this review | Measure to bring | What it cannot settle alone |
| --- | --- | --- |
| Can customers obtain what they need? | Unit fill rate or a clearly defined order-service measure | Which specific cause created the shortage |
| Can planners trust the balances? | Count accuracy and unresolved discrepancy age | Whether the replenishment policy is sufficient |
| How much money sits in stock? | Average stock at cost, turnover and ageing | Whether lower stock is safe |
| Is supply arriving when usable? | Actual order-to-release lead time and its variation | Whether every late order needs more buffer |

The [turnover comparison](/notes/inventory-turnover-days/) and [service-level comparison](/notes/cycle-service-level-vs-fill-rate/) provide the definitions. Keep numerator, denominator and period visible when comparing weeks or sites.

A broader inventory review may segment items with [ABC and XYZ](/notes/abc-xyz-inventory-analysis/), apply different review policies and investigate obsolete stock. Those are different decisions, rather than three interchangeable techniques to apply to every item.

## Test the policy and keep the record discipline

For the next review period, record usable stock, receipts, demand supplied immediately, shortages and the effort needed to maintain the rule. Keep the old settings and the reason for the change.

If service improves while stock also rises, show both. If the balance becomes accurate but shortages continue, the counting work may have succeeded while the replenishment problem remains.

For part A, correct the issue record and confirm the next usable receipt first. Then review whether the five-day ordering cycle leaves the item exposed for too long.

## Sources and example notes

- [ASCM Supply Chain Dictionary, eighteenth edition](https://learn.ascm.org/sfc/servlet.shepherd/document/download/069R3000006PlDHIA0?operationContext=S1#page=97), 2024, inventory management, control and accuracy.
- [MIT: Probabilistic inventory models](https://courses.edx.org/asset-v1:MITx+CTL.SC1x_1+2T2015+type@asset+block/KeyConcept_Week7Lesson1.pdf), replenishment exposure and inventory policies, as used in the linked safety-stock guide.

All stock balances, rates and delays are fictional. Coverage uses an assumed constant rate. No service level, optimum inventory target or cash release has been estimated.
