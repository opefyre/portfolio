---
title: DPMO vs DPU vs PPM: formulas and examples
date: 2026-10-25
summary: Calculate DPU, DPO, DPMO and defective-unit PPM from one published example. Use the calculator to keep defects and denominators separate.
seoTitle: DPMO vs DPU vs PPM: formulas and examples
seoDescription: Calculate DPU, DPO, DPMO and defective-unit PPM from one published example. Use the calculator to keep defects and denominators separate.
status: published
topic: Continuous improvement
keywords: DPMO vs DPU, DPMO calculation, DPU vs DPO, defective PPM vs DPMO
---

Defects per unit (DPU) divides the defect count by the inspected unit count. Defects per million opportunities (DPMO) scales defects against defined opportunities. Defective-unit PPM reports failed units per million units inspected; PPM means per million.

Those measures can give different numbers for the same inspected work because they count different things.

[Minitab's printing-order example](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/what-are-dpu-dpo-and-dpmo/) contains 50 inspected orders, six orders with problems and seven defects. One order has two defects. Each order has four defined defect opportunities: incomplete, damaged, incorrect and typo.

## Follow the same counts through each formula

| Measure | Calculation | Result |
| --- | --- | ---: |
| DPU | 7 defects ÷ 50 orders | 0.14 defects/order |
| DPO | 7 defects ÷ (50 orders × 4 opportunities/order) | 0.035 defects/opportunity |
| DPMO | 0.035 × 1,000,000 | 35,000 defects/million opportunities |
| Defective-unit PPM | 6 defective orders ÷ 50 orders × 1,000,000 | 120,000 defective orders/million orders |

Seven defects do not mean seven defective orders. The damaged-and-incorrect order contributes two defects but only one defective unit.

::interactive aici-defect-calculator | Initial inputs reproduce Minitab's published teaching example. The calculator assumes a fixed whole-number count of defined opportunities per unit and at most one counted defect per opportunity. It does not estimate a future defect rate or sigma level.

## Define the opportunity before comparing results

An opportunity needs an agreed defect definition that the inspection actually checks. Keep that definition stable when comparing periods or suppliers.

Increasing the number of declared opportunities while retaining the same observed defects reduces DPMO arithmetically. It does not establish that the process improved.

The [check-sheet guide](/notes/check-sheet-vs-checklist/) shows how one order can enter several defect categories. Preserve order identity if the report also needs the count of unique defective orders.

## Say which PPM you mean

PPM is a scaling convention: per million. The label alone does not identify the numerator. A supplier might report defective units, defects or another specified event.

Use an explicit label such as defective orders per million inspected orders. Retain the period and inspection boundary too. The [supplier-scorecard example](/notes/supplier-scorecard-example/) explains why a rate needs a consistent measurement rule before it supports comparison.

## Keep severity and uncertainty visible

These counts do not describe the consequence of each defect. A category with fewer events can still need immediate attention because of its safety or customer impact.

The 50-order example demonstrates arithmetic. It does not establish a precise long-run rate. Do not convert its DPMO automatically into a sigma level using an unstated distribution or shift assumption.

For the next quality report, put inspected units, defective units, defects and the opportunity definition beside the final number. That makes the denominator reviewable before anyone compares performance.

## Sources

- [Minitab defects per unit and opportunity](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/capability-analysis/supporting-topics/capability-metrics/what-are-dpu-dpo-and-dpmo/).
