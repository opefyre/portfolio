---
title: Random vs stratified sampling explained
date: 2026-10-25
summary: Compare random, systematic and stratified sampling for process data. Define the population, preserve groups and apply weights when needed.
seoTitle: Random vs stratified sampling explained
seoDescription: Compare random, systematic and stratified sampling for process data. Define the population, preserve groups and apply weights when needed.
status: published
topic: Continuous improvement
keywords: sampling methods quality control, random vs stratified sampling, systematic sampling quality control, representative process sample
---

Simple random sampling gives each possible sample of the chosen size an equal chance of selection from the defined population. Stratified sampling separates that population into groups and draws samples within them.

The choice depends on what the study needs to represent. A convenient sample of what is easiest to reach can leave important conditions unobserved.

[OpenStax's sampling chapter](https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling) distinguishes random, stratified, cluster and systematic methods. It also separates these probability methods from convenience sampling.

## Define the population before selecting observations

State the units, period and operating conditions the result should describe. A study of start-up output and a study of all output across the week concern different populations.

The [DMAIC teaching case](/notes/dmaic-step-by-step/) has 12 filler heads and proposes five start-up packs per head. That gives 60 start-up observations under the proposed protocol. It does not automatically represent the entire week's output.

Retaining head identity would let the team compare the groups. Dropping it would remove information the fictional investigation needs because heads 4 and 9 behave differently.

::figure aici-sampling-groups | The 12-head protocol keeps the source group visible. Sampling every head addresses coverage of heads; it does not establish coverage of every operating period or product condition.

## Compare the selection methods

| Method | Selection logic | Check before using it |
| --- | --- | --- |
| Simple random | Randomly select units from the defined population | Is the sampling list complete? |
| Stratified | Sample within defined groups | Are groups relevant, and are allocation and later weights appropriate? |
| Systematic | Select at a fixed interval after a random start | Could the interval coincide with a recurring process pattern? |
| Cluster | Select groups, then observe units within those selected groups | Does the analysis account for similarity within groups? |
| Convenience | Select readily available observations | Which conditions may be missing or overrepresented? |

## Keep sample shares separate from production shares

Equal numbers from each head give each head the same share of the sample. That does not establish equal output from each head over the population period.

If the study estimates an overall production result from disproportionate group samples, retain the relevant population shares and use an appropriate weighted estimate. If those shares are unknown, do not silently assume that an unweighted average describes all output.

The [confidence-interval guide](/notes/confidence-interval-example/) uses a specific sampling and population interpretation. Its interval should not be applied unchanged to a different sampling design.

## Separate representative sampling from two other tasks

[Rational subgrouping](/notes/rational-subgrouping-spc/) arranges observations for a process-variation question. [Acceptance sampling](/notes/acceptance-sampling-explained/) supports a lot decision using an agreed plan. Neither is a substitute name for every sample collected in a factory.

Write the population, selection method, group identity and missing-condition checks into the collection plan. Keep that plan with the data so the final average has a population it can actually describe.

## Sources

- [OpenStax sampling methods](https://openstax.org/books/introductory-statistics-2e/pages/1-2-data-sampling-and-variation-in-data-and-sampling).
