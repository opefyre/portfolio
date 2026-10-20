---
title: Data lineage explained: trace a number to its source
date: 2026-10-20
summary: A report says 50 pieces are available. Trace the source fields, calculation version and downstream uses so the team can explain the number and check what a change affects.
seoTitle: Data lineage explained with a stock-data example
seoDescription: Trace a stock figure through source fields, transformation rules and reports. A data-lineage example shows how to investigate errors and assess a rule change.
status: published
topic: Digital transformation
keywords: data lineage example, data lineage meaning, lineage in ETL, field level lineage, data lineage vs data governance
---

The order-promise report says 50 pieces are available. A spreadsheet says 70. The team can inspect both numbers, but it cannot yet explain where the difference entered the calculation.

**Data lineage records where data came from, the changes applied to it and where the result is used.** It can help trace an unexpected number upstream and identify which outputs a proposed change would affect downstream.

[IBM's lineage explanation](https://www.ibm.com/think/topics/data-lineage) includes source information and transformations across ETL or ELT. A list of connected systems is a start. To explain this stock figure, we need the fields and rules inside that route.

## Data lineage example: follow one item at one location

Use a fictional snapshot for item A at location L1, effective at 09:00 on the warehouse's local clock. The systems provide these records:

| Input | Value | Source field and meaning |
| --- | ---: | --- |
| Physical quantity | 100 pieces | Warehouse record: quantity physically present |
| Quality-held quantity | 20 pieces | Quality record: present stock not released for picking |
| Allocated quantity | 30 pieces | Order-reservation record: other released stock already committed |

The held and allocated groups do not overlap in this example. The intended field answers how much unallocated stock can be picked now.

:::formula Agreed stock rule, version 2
Pickable quantity = physical − held − allocated
100 − 20 − 30 = 50 pieces
:::

The [data-governance example](/notes/data-governance-explained/) explains who agrees that meaning. Lineage records which inputs and implementation produced the result. It does not give the technical team authority to choose the business definition.

## Record the transformation, not just the source name

The reporting pipeline reads the snapshot at 09:05 and calculates the field at 09:07. The order-promise report displays it at 09:10. These are separate events from the stock's 09:00 effective time.

Keep the item and location identifiers, source snapshot, field names, units, transformation version and resulting output with the record. A later load time does not make the underlying stock more recent.

::figure paa2-lineage-route | Fictional field-level lineage for A/L1. The same 09:00 stock snapshot supplies physical 100, held 20 and allocated 30 pieces. Version 1 produces 70 by omitting the hold; version 2 produces 50. The diagram identifies two documented consumers and leaves an unverified spreadsheet route unresolved.

The earlier version used physical minus allocated: 100 − 30 = 70. Applying both versions to the same snapshot explains the twenty-piece difference. It does not imply that twenty pieces physically disappeared.

The [ETL vs ELT example](/notes/etl-vs-elt/) explains where transformation happens. Lineage needs the derivation in either arrangement, including the relevant reference data and rule version.

## Trace an error upstream before changing the report

If the order-promise report unexpectedly displays 70, inspect the route backwards. Does it use version 1? Did the quality input arrive blank and get converted to zero? Did the item/location join miss the twenty held pieces?

Those possibilities can produce the same displayed number. They need different corrections. Keep a missing input distinguishable from a confirmed zero.

The [data-quality dimensions](/notes/data-quality-dimensions/) help describe what failed. Lineage can show that a missing hold record reached the output. It cannot establish the correct hold quantity without evidence from the operation.

Also inspect overlap rules. If some allocated pieces are held, subtracting both quantities could count the same exclusion twice. Our example rules out that overlap; a real implementation must resolve it.

## Follow a proposed change downstream

Before releasing version 2, list the documented consumers. In this example, the order-promise report and a planning export both read the derived field.

| Consumer | What needs checking before the change |
| --- | --- |
| Order-promise report | It uses the intended immediate-picking field, with the approved hold rule |
| Planning export | It still has the dated receipt and future-release information its own decision needs |
| Manually maintained priority spreadsheet | Its source and calculation are unverified; an owner must trace them |

The planning export may need a different view from immediate picking. Do not change its business meaning merely to make every screen show 50. Record which field each use requires.

Test a shared snapshot through the affected outputs, then retain the release version. A correct new rule in one pipeline does not update a workbook that copied the old formula last month.

## How to start a useful lineage record

Begin with a number used for an important decision. Record its output field and owner, follow its direct inputs, and write down each derivation and reference it depends on. Then identify the consumers that need to know when it changes.

A small maintained diagram and a field table can be enough for a bounded example. Automated lineage tools can help discover technical paths, but unsupported connectors and manual exports leave gaps. Mark those gaps instead of drawing a complete-looking route.

A runtime log answers when a job ran and what it did. Lineage describes the derivation and dependencies; a particular record or event log can add evidence of what happened in one run. Keep both when the decision requires them.

For this stock field, the team should be able to reproduce 50 from the identified snapshot and rule, explain the earlier 70 and name the reports to check before the next rule change. That is more useful than an unexplained assurance that every dashboard uses the same data platform.

## Source and example notes

- [IBM: Data lineage](https://www.ibm.com/think/topics/data-lineage), origin, transformations, destinations and impact analysis.

All records, times, rule versions and consumers are fictional. Times use one local warehouse clock. Held and allocated quantities are disjoint. The map establishes a stated derivation, not that the source records are accurate or that every possible downstream use has been discovered.
