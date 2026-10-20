---
title: Inventory shrinkage: formula, causes and a worked example
date: 2026-10-20
summary: The stock record says 500 units. The count finds 480. Reconcile the difference before calling it a loss, then choose a rate with a denominator you can explain.
seoTitle: Inventory shrinkage: formula, causes and example
seoDescription: Work through an inventory shrinkage calculation. Reconcile count differences, distinguish two rate denominators and investigate loss without assuming theft.
status: published
topic: Supply chain
keywords: inventory shrinkage formula, inventory shrinkage example, shrinkage causes, inventory loss calculation
---

The system shows 500 units. The count finds 480. Someone records twenty stolen units in the monthly loss report.

That explanation arrived before the investigation.

**Inventory shrinkage is inventory loss identified by comparing recorded stock with physical stock, under the business's accounting rules.** A difference can involve theft, damage, spoilage or recording errors. [NRF's explanation](https://nrf.com/blog/the-misperception-of-shrink-and-its-impact-on-organized-retail-crime) warns that a shrink figure does not identify how much theft occurred.

The first job is to establish which difference is real.

## From count difference to confirmed loss

Our fictional warehouse counts one item at a fixed cutoff. The record shows 500 units at €20 each, so book value is €10,000. A checked physical count finds 480 units worth €9,600 on the same basis.

:::formula Initial difference
Book quantity − physical quantity = 500 − 480 = 20 units
Initial value difference = 20 × €20 = €400
:::

During reconciliation, the team finds a recorded receipt of eight units that never arrived. The receipt was entered twice. Correcting it brings the book quantity down to 492.

Twelve units remain missing: €240 at the stated cost. Their cause still needs investigation. No further timing or location differences have been found.

::figure paa3-shrink-reconciliation | Fictional count at one cutoff and a constant €20 unit cost. An eight-unit duplicate receipt explains part of the twenty-unit difference. Twelve units remain a loss requiring investigation; the count does not establish their cause.

[Cycle counting](/notes/cycle-counting-inventory-accuracy/) explains the reconciliation process, including movements between bins. Two offsetting location errors should not become two physical losses.

## Inventory shrinkage formulas need a named denominator

For a snapshot comparison, a team might divide the confirmed loss by corrected book inventory at that cutoff:

:::formula Inventory-based loss rate in this example
12 missing units ÷ 492 corrected book units × 100 = 2.44%
€240 ÷ €9,840 corrected book value × 100 = 2.44%
:::

The matching results depend on all units having the same value. A mix of expensive and cheap products can give very different quantity and value rates.

Retail shrink reporting often expresses loss value as a percentage of sales instead. Suppose this warehouse's agreed reporting period has €80,000 of sales and €240 of loss, with loss valued at cost and sales measured as net sales revenue. This is the agreed convention for that report. The sales-based calculation is €240 ÷ €80,000 × 100 = **0.30%**.

| Measure | Denominator | Result here |
| --- | --- | ---: |
| Snapshot inventory loss rate | Corrected book inventory at the count | 2.44% |
| Period loss as a share of sales | Sales for the agreed period | 0.30% |

These answer different questions. Never compare one against a benchmark calculated with the other. State whether losses are valued at cost or retail, which adjustments are included and when they are recognised.

## Investigate causes without assigning them from the percentage

Five areas worth checking are receiving and transaction errors, picking or dispatch errors, damage, expiry or spoilage, and theft or fraud. Those are investigation categories, not five causes proved by a count.

For the missing twelve units, check receipt evidence, transfers, dispatch quantities, damage records and access history. Preserve uncertainty where the records cannot resolve it. Closing the adjustment in the system does not close the investigation.

Expiry also needs a clear boundary. [Obsolete inventory](/notes/obsolete-inventory-explained/) can still be physically present. If it has already been written off, do not recognise the same loss again when it is disposed of.

## What is a good shrinkage rate?

There is no useful universal target without a comparable business, valuation method and reporting period. NRF notes that measurement approaches vary and that it stopped publishing an industry average in 2023.

Start with your own reconciled pattern by location, item and cause. A lower reported rate caused by delaying adjustments is not an improvement. A count programme that discovers old losses may temporarily make the number worse while making the records more reliable.

Choose the response from the evidence. A duplicate-receipt problem needs a receiving control; damaged stock needs a different change. Track whether that cause returns at the next count.

## Source and example notes

- [NRF: The misperception of shrink](https://nrf.com/blog/the-misperception-of-shrink-and-its-impact-on-organized-retail-crime). Loss categories, valuation differences and limits of industry comparisons.

All quantities, costs and sales are fictional. The €240 sales-based example assumes it is the entire recognised loss for the stated period. The snapshot rate is an agreed example convention, not an industry-wide formula.
