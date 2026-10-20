---
title: Reverse logistics: follow a return back into the business
date: 2026-10-20
summary: Twenty returned units reach the warehouse. Seventeen eventually return to stock, but the customer credit is a separate decision. Follow inspection, repair, release and cost.
seoTitle: Reverse logistics: meaning, process and example
seoDescription: Follow 20 returned units through a reverse-logistics process. See how inspection, repair, stock release, customer credits and return costs fit together.
status: published
topic: Supply chain
keywords: reverse logistics meaning, reverse logistics process example, returns management, product disposition, reverse supply chain
---

A customer sends twenty pumps back. Receiving books the carton into the warehouse. Customer service says the return is complete.

The pumps are still uninspected, and nobody has agreed whether they can go back into saleable stock. The carton has arrived; several decisions remain.

**Reverse logistics manages goods moving back through the supply chain for recovery, reuse or disposal**, together with the records and decisions that movement requires. [DHL's explanation](https://www.dhl.com/global-en/delivered/global-trade/what-is-reverse-logistics.html) includes the administrative work as well as transport.

The [supply-chain overview](/notes/supply-chain-management-explained/) shows that return arrow. Here we will follow what happens inside it.

## Reverse logistics example: start with a controlled receipt

Our fictional distributor accepts twenty returned pumps from one customer. Each return has a reference linked to the original sale and a stated reason. Assume the agreement allows a full €40 credit for each of these units after receipt verification.

Receiving confirms the quantity and identities, records the condition and places the units in a return-hold location. They are physically present but unavailable for picking.

That distinction protects the next order. A bin balance of twenty returned units does not mean twenty usable units. Keep quantity, ownership and release status separate where the arrangement requires it.

A missing reference, mixed item or damaged serial label needs an exception route. Don't make the record look complete by assigning the nearest convenient item code.

## Inspect before choosing the disposition

The team checks condition and permitted recovery routes. By the review cutoff, it has reached these fictional outcomes:

| Outcome | Units | Evidence before release or disposal |
| --- | ---: | --- |
| Restock without repair | 12 | Required inspection passed; packaging and identity acceptable |
| Repair, then restock | 5 | Approved repair completed and required checks passed |
| Scrap | 3 | Not suitable for the approved recovery routes; disposal authorised |
| Total received and accounted for | 20 | Every unit has one final outcome in this example |

Seventeen units return to available stock: twelve directly and five after repair. Three leave through the approved disposal route. No units remain in repair or on hold at this cutoff.

::figure paa2-return-flow | Fictional completed return batch: 20 units received, 12 restocked directly, 5 repaired and then released, and 3 scrapped. Final released quantity is 17. Branches are mutually exclusive, and all 20 units reconcile.

A different cutoff might show five still awaiting repair. In that case, do not count them as released stock because repair is planned. Record what has happened, with the remaining work visible.

## Product disposition and customer credit are separate

The customer agreement determines the credit conditions. Engineering and Quality determine the permitted recovery and release checks. Finance records the credit and relevant stock-value effects.

For this case, the verified twenty-unit return produces €800 of credit under our assumed agreement. That does not establish the value recovered from the goods.

Twelve units can be saleable while the customer is still owed a credit. A unit can require scrapping while the customer remains entitled to the agreed refund. One decision should not silently stand in for the other.

The [inventory-accuracy example](/notes/cycle-counting-inventory-accuracy/) is useful here: location and status errors can cancel in a warehouse total while still causing the next pick to fail.

## Count the cost of the return route

Our completed batch incurred these additional operating costs:

| Cost | Calculation | Amount |
| --- | --- | ---: |
| Return freight | One shipment | €80 |
| Inspection | 20 units × €2 | €40 |
| Repair | 5 units × €6 | €30 |
| Disposal | 3 units × €2 | €6 |
| Total additional handling and recovery cost | | €156 |

The €800 customer credit is reported separately. Adding it to €156 would describe those two amounts together, but would not calculate the profit or loss on the original sale and return. That needs the original revenue, stock cost, valuation changes and later transactions too.

The quantity recovery is 17 ÷ 20 = 85%. It is a released-unit share, not a claim that 85% of the original cost or cash has been recovered.

Keep enough cost detail to compare future routes. At the inspection decision, a repair choice should consider its remaining costs and credible recovery, rather than being justified by freight already spent.

## Use return reasons to prevent another batch

A “customer return” code says little about why the pumps came back. Record the claimed reason separately from the confirmed finding.

A wrong item shipped, a transit-damaged unit and a correctly supplied product that the customer no longer needs require different actions. Treat a suspected defect as a lead to investigate, not an automatic root cause.

The [cost-of-quality Note](/notes/cost-of-quality-example/) helps separate defect-related costs from other operating costs. The [8D example](/notes/8d-report-example/) follows containment and corrective action when a recurring failure needs that structure.

## Keep the return open until the required work is complete

Useful measures include time from receipt to disposition, units still on hold by age, repair outcomes and customer-credit time. Define the start, finish and population for each. A fast receipt scan can coexist with a long unresolved hold.

You may see five-R or seven-R lists for reverse logistics. Different authors group activities differently. The list is less useful than knowing who owns receipt, inspection, disposition, credit and follow-up in this operation.

For these twenty pumps, the review can close when the units reconcile, the release and disposal records exist, the credit is recorded and any required investigation has an owner. Booking a carton back into the building completes only the first part.

## Source and example notes

- [DHL: Reverse logistics explained](https://www.dhl.com/global-en/delivered/global-trade/what-is-reverse-logistics.html), reverse movement, recovery/disposal and administrative work.

The pumps, agreement, outcomes and costs are fictional. Repair is complete by the stated review cutoff. Released-unit share is not a financial recovery rate, and the illustration does not prescribe return rights or product-release requirements.
