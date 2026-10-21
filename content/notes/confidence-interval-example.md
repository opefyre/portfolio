---
title: Confidence intervals explained: a process-time example
date: 2026-10-21
summary: Ten jobs average ten minutes. That does not make ten the process's known average. Calculate a confidence interval and see what another sample can change.
seoTitle: Confidence intervals: a worked process-time example
seoDescription: Calculate a 95% confidence interval for a process mean using ten job times. Explore sample size and distinguish uncertainty from process variation.
status: published
topic: Continuous improvement
keywords: confidence interval example, confidence interval for mean, 95 percent confidence interval, standard error vs standard deviation
---

**A confidence interval describes uncertainty in an estimate, such as a process's average job time.** It puts a range around the sample estimate using a stated method and assumptions.

Ten observed jobs average ten minutes. Reporting “the process takes ten minutes” would hide two separate things: individual jobs vary, and another sample would probably give a different average.

A confidence interval addresses the second problem. It does not describe the spread of every job.

## Start with the observations and how they were selected

Our fictional team wants the mean time for a defined dispatch-check task. It samples separate comparable jobs across the operating period, rather than taking only the easiest orders or repeated timings from one job.

The ten teaching observations, in minutes, are **8, 9, 9, 10, 10, 10, 10, 11, 11, 12**. Their mean is 10 and their sample standard deviation is about 1.155 minutes.

For the calculation below, assume the observations are independent and come from a reasonably stable, approximately normal job-time population. Ten observations would be a weak basis for ignoring serious skew, outliers or mixed task types. Check the process and sampling design before relying on the formula.

## Calculate the 95% confidence interval for the mean

[NIST gives the one-sample t interval](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm) as the sample mean plus or minus a t multiplier times the standard error. The t multiplier depends on sample size and the confidence level.

:::formula Ten-job calculation
Standard error = sample standard deviation ÷ √sample size
Standard error = 1.155 ÷ √10 = 0.365 minutes
95% margin = 2.262 × 0.365 = 0.826 minutes
95% confidence interval = 10 ± 0.826 = 9.17 to 10.83 minutes
:::

The standard deviation describes variation between these job times. The standard error describes uncertainty in the estimated mean. They have the same units but different purposes.

::interactive gap-confidence | Fictional job times. Choose a nested sample of 5, 10 or 20 separate teaching observations to inspect the raw values and a two-sided 95% t interval. Values are fixed, not live measurements. A larger sample can change both the mean and the estimated spread.

The control shows the data, not just a shrinking bar. That matters because collecting more jobs can move the estimate as well as narrow its interval.

## What does 95% confidence actually mean?

If we repeatedly drew samples in the same valid way and calculated the interval each time, about 95% of those intervals would contain the population mean. [NIST distinguishes that repeated-sampling interpretation](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm) from assigning a 95% probability to a fixed mean lying inside this particular interval.

It also does not mean that 95% of jobs take between 9.17 and 10.83 minutes. Several of our observed jobs already fall outside that range. A prediction interval for an individual future job answers a different question.

Nor are the endpoints operating limits. Use [control charts](/notes/control-charts-explained/) to investigate process behaviour over time. A narrow confidence interval can estimate the average precisely while the individual jobs still vary enough to disrupt planning.

## A precise average can still answer the wrong question

Suppose the team sampled only uncomplicated orders during a quiet shift. More observations of the same restricted work could produce a narrow interval for a mean that does not represent the full dispatch workload.

Repeated observations from one operator or one batch may also share conditions. Treating strongly related readings as independent can understate uncertainty. Decide whether the analysis needs paired comparisons, grouping or another method before combining them.

Record which jobs were eligible, how they were selected, what start and finish mean, and which interruptions belong in the time. Unknown or inconvenient observations should not disappear during cleanup.

## Use a separate comparison to assess improvement

The ten-job interval estimates one mean. It does not establish that a new dispatch screen reduced time.

To assess a change, define the relevant before-and-after comparison, control for case mix where possible and estimate the difference with a method suited to the sampling design. Do not infer the uncertainty of a difference merely by checking whether two separate intervals overlap.

The [design-of-experiments example](/notes/design-of-experiments-example/) discusses planned comparisons. The [benefits-realisation note](/notes/benefits-realisation-automation/) connects observed time changes to the business result, including whether released time can actually be used.

If the decision depends on saving at least one minute per job, keep that threshold visible alongside the uncertainty in the estimated saving. A precisely estimated change that is too small to matter will not justify the investment.

## Source and calculation notes

- [NIST Engineering Statistics Handbook: Confidence limits for the mean](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm). The one-sample t formula and its interpretation.

All job times are fictional teaching data. The calculator uses sample standard deviation with n − 1 in its denominator and the two-sided 95% t multiplier for n − 1 degrees of freedom. It estimates one population mean under the stated assumptions; it does not estimate causal improvement or an individual job's prediction range.
