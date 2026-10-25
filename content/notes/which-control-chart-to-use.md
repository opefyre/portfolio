---
title: Which control chart to use: a practical guide
date: 2026-10-25
summary: Choose a control chart using measurement type, subgroup design and denominator. Compare I-MR, Xbar-R, Xbar-S, p, np, c and u charts.
seoTitle: Which control chart to use: a practical guide
seoDescription: Choose a control chart using measurement type, subgroup design and denominator. Compare I-MR, Xbar-R, Xbar-S, p, np, c and u charts.
status: published
topic: Continuous improvement
keywords: which control chart to use, control chart selection, I MR vs Xbar R, p chart vs u chart
---

Choose a control chart around the observations you collect. Start by separating measured values from counts. For counts, distinguish defective units from individual defects and retain the amount inspected.

A chart name cannot repair a counting rule that changes between periods.

[Minitab's chart-selection guidance](https://support.minitab.com/en-us/real-time-spc/quality-analyses/available-analyses-by-measurement-type/) uses measurement type and subgroup size. The [control-chart guide](/notes/control-charts-explained/) explains how to read signals once the chart and baseline are appropriate.

## Measurements: individual values or rational groups

| Observations | Common starting chart | What to check |
| --- | --- | --- |
| One measured value per sampling occasion | I-MR | Time order, dependence and the meaning of each observation |
| Small rational subgroups of measurements | Xbar-R | The subgroup design and within-group ranges |
| Larger rational subgroups | Xbar-S | The subgroup design and within-group standard deviations |

The I-MR pair follows individual measurements and the moving range between them. Xbar follows subgroup means, R follows subgroup ranges, and S follows subgroup standard deviations.

Minitab recommends Xbar-S for subgroup sizes of nine or more in the cited product guidance. Treat that as guidance for its analysis, not a law covering every charting method.

The [DMAIC filling example](/notes/dmaic-step-by-step/) proposes five start-up packs per filler head. Those records could support a subgroup analysis only after the team defines the process being monitored and checks how the observations belong together.

Pooling packs from different heads can hide the difference the study needs to see. The [rational subgrouping guide](/notes/rational-subgrouping-spc/) examines that choice.

::figure aici-chart-selection | Select the observation type first. Subgroup structure and inspection exposure then distinguish common chart families. Check each chart's assumptions before calculating limits.

## Counts: units or defects

A defective unit is counted once under its acceptance rule. A unit can contain several defects. [NIST's count-chart guidance](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm) keeps these concepts separate.

| Data being charted | Common chart | Denominator or exposure condition |
| --- | --- | --- |
| Number of defective units | np | Usually a constant number of units inspected |
| Proportion of defective units | p | Retain units inspected; limits reflect sample size |
| Number of defects | c | A consistent inspection unit or exposure |
| Defects per inspection unit | u | Retain the exposure for each period |

The [DPU/DPMO comparison](/notes/dpmo-vs-dpu-vs-ppm/) works through defects and defective orders using the same inspected set.

## Check the statistical conditions

[NIST's proportion-chart explanation](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc332.htm) uses a binomial model and independent units. Count-of-defect charts commonly use a Poisson model. Clustering, dependence and changing exposure can make those assumptions unsuitable.

Investigate the process and consider an appropriate alternative method when the basic model does not fit.

Specification limits remain separate from control limits. A stable process can fail its specification, while a point within the specification can still signal a change in behaviour.

## Write the counting rule beside the chart

Record what one observation represents, when it is collected, the subgroup or denominator and the process boundary. Check those fields with the people who collect the data.

Then choose the chart and its baseline. Preserve the source observations so a later analyst can reconstruct what each plotted point means.

## Sources

- [Minitab chart selection by measurement type](https://support.minitab.com/en-us/real-time-spc/quality-analyses/available-analyses-by-measurement-type/).
- [NIST count control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc331.htm).
- [NIST proportion control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc332.htm).
- [ASQ control chart guide](https://asq.org/quality-resources/control-chart).
