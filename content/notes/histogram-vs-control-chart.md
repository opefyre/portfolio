---
title: Histogram vs control chart: a practical guide
date: 2026-10-25
summary: Compare a histogram with a control chart using the same 20 observations. Change the display order to see what the histogram cannot retain.
seoTitle: Histogram vs control chart: a practical guide
seoDescription: Compare a histogram with a control chart using the same 20 observations. Change the display order to see what the histogram cannot retain.
status: published
topic: Continuous improvement
keywords: histogram vs control chart, histogram quality control, histogram vs run chart, when to use a histogram
---

A histogram shows how numerical observations are distributed across value ranges. A control chart keeps observations in sequence and adds limits calculated for a stated statistical model.

The histogram loses the order of the observations. That makes it useful for a different question from the one a time-ordered control chart answers.

[NIST's histogram guide](https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm) describes the distribution view. [ASQ's control-chart guide](https://asq.org/quality-resources/control-chart) describes following process behaviour over time with a centre line and limits.

## Look at the same 20 values in two ways

The [control-chart Note](/notes/control-charts-explained/) supplies 20 fictional daily pick-duration observations, in minutes. Their mean is 12.08. Under that Note's individuals-chart assumptions, the provisional limits are approximately 10.498 and 13.662 minutes.

The figure below reuses those values and those limits. It adds a histogram of the same observations.

::interactive aici-histogram-order | Twenty fictional daily pick durations. Sorting changes display order to illustrate the information a histogram loses. The bins, mean and original provisional limits stay fixed. The sorted display does not represent another observed history.

The histogram counts stay the same when you sort the values. The sequence changes visibly. A distribution plot alone cannot show which arrangement actually occurred.

## Read the distribution without inventing a history

A histogram can help inspect location, spread and shape. Bin boundaries affect the view, especially in a small dataset. Keep the observations available so readers can inspect what produced each bar.

These 20 values do not establish a precise population distribution. A smooth-looking shape would not prove that the process is stable or normally distributed.

| View | Information it preserves | Information it needs beyond the values |
| --- | --- | --- |
| Histogram | Counts within defined value ranges | Bin rules, units and the sampled population |
| Run chart | Observation sequence | Actual order or time and any chosen reference or run rules |
| Control chart | Sequence plus model-based references | Chart type, baseline, assumptions and signal rules |

## Keep calculated limits separate from requirements

The control limits in this example describe the provisional baseline calculation. They do not state an acceptable picking-time requirement.

A process can remain within its control limits while failing a customer requirement. Conversely, a change can deserve investigation even when every value meets the specification. The [capability guide](/notes/process-capability-cp-cpk/) follows the comparison with specification limits.

## Choose the view around the decision

Use a histogram to inspect the distribution. Retain time order when investigating a change. Use an appropriate control chart when the data and model support its limits and rules.

The [chart chooser](/notes/which-control-chart-to-use/) explains why measurements, counts and subgroup structures lead to different chart families.

For the next report, keep the distribution view beside the ordered record when both questions matter. Sorting a spreadsheet for a histogram should not destroy the source order needed for the process investigation.

## Sources

- [NIST histogram guidance](https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm).
- [ASQ control chart guide](https://asq.org/quality-resources/control-chart).
