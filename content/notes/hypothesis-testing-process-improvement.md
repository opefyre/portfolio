---
title: Hypothesis testing example: ten late quotes become four
date: 2026-10-24
summary: The late rate falls by twenty percentage points. Work through a hypothesis test, inspect the counts and keep the missed target and before-and-after limits visible.
seoTitle: Hypothesis testing: a process improvement example
seoDescription: Learn hypothesis testing through late-quote counts. Calculate a two-sided Fisher exact test and separate the observed improvement, p-value and causal evidence.
status: published
topic: Continuous improvement
keywords: hypothesis testing process improvement, hypothesis testing example, Fisher exact test, p value explained, Six Sigma hypothesis testing
---

Hypothesis testing compares observed data with what a stated statistical hypothesis would lead us to expect. Teams use it to assess whether a difference is difficult to explain under that hypothesis and its assumptions.

The [A3 quoting example](/notes/a3-problem-solving-example/) gives us a concrete comparison: ten late quotes out of thirty before a trial, then four out of thirty afterwards. The late rate falls. The team still needs to decide how much the evidence supports and what to do next.


## Keep the original counts beside the rates

The fictional A3 follows routine requests through to a final reply. A quote is late when the reply takes more than two working days, including clarification time. The pilot target is at most three late quotes in the next thirty, with no incorrect quotes.

| Outcome | Baseline | Pilot |
| --- | ---: | ---: |
| Late | 10 | 4 |
| On time | 20 | 26 |
| Total followed to reply | 30 | 30 |
| Late rate | 33.3% | 13.3% |

The observed reduction is **20 percentage points**. The pilot also misses the operating target by one quote. Neither fact should disappear when we calculate a p-value.

## State the hypothesis and comparison before testing

For an additional teaching analysis, use a two-sided Fisher exact test. Its null says that period and late/on-time outcome have no association, conditional on the table margins. The two-sided comparison allows a difference in either direction.

The [R statistics manual](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fisher.test.html) describes that conditional test. It uses the possible two-by-two count tables with the same margins, then sums probabilities at least as unusual as the observed table under its stated two-sided convention.

The calculation needs independent observations and a meaningful comparison. Requests sharing the same customer, batch or staffing disruption can violate that independence. A changing request mix can also change lateness without the new guide causing it.

For illustration, compare the p-value with 0.05. [NIST recommends choosing the decision level in advance](https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm). The original A3 did not specify a statistical test, so this retrospective calculation is not a claim that its team prespecified one.

## Calculate and interpret the p-value

For the table above, the two-sided Fisher exact p-value is approximately **0.1253**.

A p-value describes how likely a result at least as extreme would be under the null and the test assumptions. It is not a 12.53% probability that the guide had no effect, nor a probability that chance caused the observed change.

At the illustrative 0.05 decision level, this test does not reject the null. That does not establish that the two periods have the same late rate or that the change is useless. Thirty requests per group leave substantial uncertainty.

::interactive r4-fisher-comparison | Defaults reuse the fictional A3 counts: 10 late of 30 before, 4 of 30 after. The calculator shows rates, their difference and the two-sided Fisher exact p-value. Changing counts is a teaching exercise, not additional observed evidence. Independence, comparable cases and the before-and-after design still require review.

Use the calculator to inspect how both the counts and group sizes affect the result. Do not keep changing the sample or test direction until a preferred decision appears.

## Separate the test result from the improvement claim

The A3 records no incorrect quotes in either completed group. The team should retain that quality check alongside lateness. A faster response that introduces quote errors would need a different operating decision.

| Finding | Supported statement |
| --- | --- |
| Ten late quotes become four | The observed late rate fell in these groups |
| Four exceed the target of three | The pilot missed its stated lateness target |
| Two-sided p ≈ 0.1253 | This test does not reject its null at 0.05 under the assumptions |
| Before-and-after periods | The comparison does not isolate the guide from other changes |

A team applying [DMAIC](/notes/dmaic-step-by-step/) can use a test during its investigation, after checking the measurement and comparison design. The method should follow the outcome: binary late/on-time counts need a different analysis from a mean dispatch time.

The [design-of-experiments example](/notes/design-of-experiments-example/) explains how planning the comparison can make competing explanations easier to assess.

## Decide what evidence the next trial needs

Return to the request histories. In the original A3, the remaining delays include approval waits. Check whether staff used the dimension guide and whether the two groups had comparable work.

Before another trial, define the eligible requests, outcome, comparison, practical improvement worth detecting and planned analysis. Choose the observation period and sample from that decision, rather than from the number needed to cross 0.05.

For this pilot, inspect the four remaining late requests and the approval route before extending the change. Keep the twenty-point observed reduction, missed target and statistical uncertainty together in that review.

## Sources and calculation notes

- [NIST: critical values and p-values](https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm), conditional interpretation and advance choice of the decision level.
- [R statistics manual: Fisher exact test](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/fisher.test.html), fixed-margin inference and the probability-based two-sided convention used here.
- [The A3 case](/notes/a3-problem-solving-example/), fictional quote counts, operating target and remaining-delay evidence.

The calculator enumerates feasible tables with the observed row and column totals. It sums table probabilities no greater than the observed table's probability, allowing a small numerical tolerance. It does not calculate power, a causal effect or a required sample size. All quote inputs are fictional.
