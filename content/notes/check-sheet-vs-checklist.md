---
title: Check sheet vs checklist: examples and uses
date: 2026-10-25
summary: Compare a check sheet with a checklist. Use a published order-inspection example to separate event counts from task completion.
seoTitle: Check sheet vs checklist: examples and uses
seoDescription: Compare a check sheet with a checklist. Use a published order-inspection example to separate event counts from task completion.
status: published
topic: Continuous improvement
keywords: check sheet vs checklist, what is a check sheet, check sheet example, check sheet quality control
---

A check sheet collects observations in a form that makes them easy to count or analyse. A checklist confirms that specified actions or conditions have been checked.

The marks can look similar. Their units tell you what the record means.

[ASQ's check-sheet guidance](https://asq.org/quality-resources/check-sheet) starts with defining the event, collection period and recording method. That definition prevents a completed task from being mistaken for evidence that no defects occurred.

## Count defects in a published example

[Minitab's printing-order example](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/what-are-dpu-dpo-and-dpmo/) inspects 50 orders. It records two incomplete orders, one order that is both damaged and incorrect, and three orders with typos. Six orders have problems, containing seven defects.

The same order contributes two different defect observations. That is legitimate in this check sheet because the sheet counts defects, not unique defective orders.

| Defect category | Count |
| --- | ---: |
| Incomplete | 2 |
| Damaged | 1 |
| Incorrect | 1 |
| Typo | 3 |
| Total defects | 7 |

::figure aici-check-sheet | Counts from Minitab's published teaching example. The damaged and incorrect observations belong to the same order, so seven defects occur on six orders.

## Keep completion checks separate

A checklist for conducting an inspection would record whether the required checks were completed. Completing every checklist item does not establish that every inspected order passed.

| Record | Unit represented by a mark | What a blank means |
| --- | --- | --- |
| Defect check sheet | One observation under a defined counting rule | Requires a declared distinction between zero observations and missing data |
| Task checklist | A completed or verified item | Usually an incomplete or unrecorded check, depending on the procedure |

Keep the inspected volume with the counts. Seven defects among 50 orders means something different from seven defects among a much larger sample. The [DPU and DPMO guide](/notes/dpmo-vs-dpu-vs-ppm/) follows the denominators through the calculation.

## Design the sheet around the next analysis

Retain the date or period, product and other grouping fields needed to investigate the result. A grand total with no useful grouping may leave the team unable to examine where the problem occurs.

Choose whether a record can enter several categories. If it can, do not later add the category counts and call the sum unique orders. If it cannot, document the rule for deciding which category takes priority.

The [Pareto guide](/notes/pareto-analysis-example/) shows why counts, delay and cost can produce different priorities. The collection sheet must preserve the information needed for the measure you intend to use.

## Trial the form before collecting a large dataset

Ask the people doing the work to record a short run of actual observations. Compare how they interpret the categories and handle blanks or multiple defects. Revise unclear instructions before extending collection.

Use the check sheet to answer how often the defined events occur. Use a checklist to confirm the required work. Keep both records when the process needs both answers.

## Sources

- [ASQ check sheet](https://asq.org/quality-resources/check-sheet).
- [Minitab defects per unit and opportunity](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/what-are-dpu-dpo-and-dpmo/).
