---
title: Scatter diagram: read a process relationship
date: 2026-10-25
summary: Read a scatter diagram using 36 published NIST calibration pairs. Inspect individual observations, the relationship and limits of the conclusion.
seoTitle: Scatter diagram: read a process relationship
seoDescription: Read a scatter diagram using 36 published NIST calibration pairs. Inspect individual observations, the relationship and limits of the conclusion.
status: published
topic: Continuous improvement
keywords: scatter diagram quality control, scatter diagram example, scatter diagram in QC, when to use scatter diagram
---

A scatter diagram plots paired numerical observations: one variable on the horizontal axis and another on the vertical axis. Each point must join values that belong to the same observation.

The plot can reveal shape, spread and unusual pairs. It cannot establish the effect of changing a process variable by itself.

[NIST's scatter-plot guidance](https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm) describes the relationship view. The pairing matters as much as the choice of axes.

## Inspect published calibration observations

[NIST's Norris dataset](https://www.itl.nist.gov/div898/strd/lls/data/LINKS/DATA/Norris.dat) contains 36 observed pairs from ozone-monitor calibration. It names the variables x and y but does not state physical units in the data file. The figure keeps x and y as supplied.

The records range from x = 0.2 to x = 999.0. Readings near the high end can dominate the visual scale, so the figure also lets you inspect y − x.

::interactive aici-norris-scatter | NIST Norris observed calibration data, all 36 pairs. The difference view plots y minus x using the same records and identifies its changed vertical scale. Point details and the table retain observation identity. No process intervention or acceptance tolerance is supplied by this dataset.

For the pair x = 884.6 and y = 888.0, the difference is 3.4 in the source variable scale. For x = 999.0 and y = 998.5, it is −0.5. A strong overall relationship can coexist with differences that deserve examination against the measurement decision.

## Keep the meaning of the pair intact

| Check | Why it matters |
| --- | --- |
| Observation identity | Avoid joining one item's x value to another item's y value |
| Units and transformation | Prevent an apparent relationship caused by inconsistent scales |
| Operating group | Keep equipment, product or other recorded conditions available |
| Range | Avoid generalising beyond the conditions actually observed |
| Reference status | Establish whether either variable is a reference or simply another observation |

The Norris file supports inspecting the supplied pairs. It does not provide a modern operating tolerance or a complete measurement-system study. The [Gage R&R guide](/notes/gage-rr-explained/) explains the additional repeat and reference questions.

## Examine patterns before adding a line

Look for curvature, changes in spread, separate groups and individual points that need a data check. Do not remove an inconvenient point merely because it weakens a relationship.

[ASQ's scatter-diagram guidance](https://asq.org/quality-resources/scatter-diagram) warns that a third factor can affect both variables. A relationship can guide investigation without settling a causal explanation.

The [regression Note](/notes/regression-analysis-process-improvement/) fits the same published dataset and examines residuals. That adds a model with assumptions; it does not turn the scatter plot into evidence of a process intervention.

## Use the plot to choose the next check

For a paired-measurement review, verify the join and units first. Then inspect where the differences matter to the intended decision and identify the reference evidence or repeat study needed to assess them.

Keep the point identities with the chart. They let someone return to the original record when the visual reveals a question worth investigating.

## Sources

- [NIST scatter plot guidance](https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm).
- [NIST Norris calibration data](https://www.itl.nist.gov/div898/strd/lls/data/LINKS/DATA/Norris.dat).
- [ASQ scatter diagram](https://asq.org/quality-resources/scatter-diagram).
