---
title: Rational subgrouping: why the sample matters
date: 2026-10-25
summary: Understand rational subgrouping in SPC. Use a filling example to separate variation within a sample from differences between conditions.
seoTitle: Rational subgrouping: why the sample matters
seoDescription: Understand rational subgrouping in SPC. Use a filling example to separate variation within a sample from differences between conditions.
status: published
topic: Continuous improvement
keywords: rational subgroups SPC, rational subgrouping example, SPC subgroup size, within vs between subgroup variation
---

In statistical process control (SPC), a rational subgroup contains observations collected so that the variation within it represents the short-term variation the analysis intends to estimate. Differences between subgroups can then reveal changes across time or other defined conditions.

The word rational describes the sampling logic. It does not mean any convenient group of five readings.

[Minitab's subgroup guidance](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/data/working-with-subgroups-in-variables-control-charts/) emphasises observations collected close together under similar conditions, while also checking independence. The process and the purpose of the chart determine what belongs together.

## Keep the filler head visible

The [DMAIC example](/notes/dmaic-step-by-step/) has a 12-head filler and proposes five start-up packs per head. Its fictional investigation identifies heads 4 and 9 as having different weight behaviour.

Those conditions give the sampling design a purpose. If the team wants to monitor a particular head, a set that mixes packs from several heads introduces head-to-head differences into the within-group variation.

::figure aici-subgroups | The teaching protocol retains five packs per filler head. Mixing heads into one sample answers a different question from following the same head across sampling occasions.

| Grouping decision | What it keeps visible | Risk to examine |
| --- | --- | --- |
| Same head, close in time | Variation within that head under the sampled condition | Samples may still be dependent or unrepresentative |
| Several heads pooled | Variation across the combined output | Differences between heads can enter the within-group estimate |
| Same head across distant shifts | Change across time and conditions | Calling it one short-term subgroup can conceal the change of interest |

## Decide what should appear between groups

Write down the change the chart should help detect. Then identify which conditions should remain similar within each subgroup and which should be examined between subgroups.

Retain the time, equipment identity and operating state with each reading. A charting tool cannot reconstruct those distinctions after the collection sheet discards them.

The [sampling-methods Note](/notes/random-vs-stratified-sampling/) asks a related but different question: how selected observations represent the population being studied. A representative sample is not automatically a suitable rational subgroup for a control chart.

## Use both centre and spread

An Xbar chart follows subgroup means. Its companion range or standard-deviation chart examines within-subgroup variation. Review both; a stable average can coexist with changing spread.

The [chart chooser](/notes/which-control-chart-to-use/) connects subgroup design with the chart family. The [capability guide](/notes/process-capability-cp-cpk/) explains why the variation estimate also affects capability measures.

## Preserve the sampling method when the work changes

A new head, product or collection interval may change what the subgroup represents. Record that change before comparing the revised chart with its earlier baseline.

For the filling protocol, keep head identity and collection order with the five readings. Have the process owner explain what variation belongs within a group before the analyst calculates its limits.

## Sources

- [Minitab rational subgroups](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/control-charts/supporting-topics/data/working-with-subgroups-in-variables-control-charts/).
