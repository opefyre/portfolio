---
title: How to read a control chart: common cause, special cause and the rules that matter
date: 2026-09-29
summary: Compare a run chart with a control chart using the same observations. Calculate provisional individuals limits, inspect signal rules and distinguish stability from meeting requirements.
updated: 2026-10-20
status: published
topic: Operational excellence
keywords: run chart vs control chart, run chart example, control chart, statistical process control, SPC, I-MR chart, individuals chart, Western Electric rules, common cause variation, special cause variation, Shewhart chart, control limits
seoTitle: How to read a control chart: rules and example
seoDescription: Compare run charts and control charts, then build an individuals chart. Follow limits, signal rules, variation and the distinction from customer specifications.
---

A weekly result rises, and the team is asked to explain it. The next week it falls, and someone wants to repeat whatever caused the improvement. Both changes may be ordinary variation.

**A control chart plots a measure over time with limits calculated from the process data.** It helps identify observations or patterns worth investigating, rather than treating every movement as a separate event. Walter Shewhart developed the approach at Bell Labs in the 1920s.

Start with a consistent measure and a suitable chart. Its signals guide investigation; they do not identify the cause on their own.

:::card The short version
- Every process varies. Most of that variation is **common cause**: the normal noise of the system.
- Occasionally something specific changes. That's **special cause** variation, and it's worth investigating.
- Control limits come from the process data and the selected chart model. An individuals chart commonly uses estimated three-sigma limits. A point or pattern meeting an agreed rule is a signal to investigate, not proof of a particular cause.
- Investigate signals. If a stable process still cannot meet the requirement, improve the process rather than adjusting it after each ordinary fluctuation.
:::

## Two kinds of variation

:::grid
- **Common cause** Built into the process: small differences in people, materials, machines and conditions. Reacting to each ordinary fluctuation can add variation instead of reducing it.
- **Special cause** Something specific and new: a broken tool, a new supplier, a system outage, a new hire on their first day. It's worth finding while the trail is fresh.
:::

Deming argued that many problems require management to change the system. His often-quoted 94% estimate came from his experience, not a measured split to apply to every dataset. A chart cannot assign responsibility from a percentage alone.

## Control limits are not targets

Control limits and specification limits answer different questions:

| | Control limits | Specification limits |
| --- | --- | --- |
| Come from | The process's own data | The customer, the contract, a regulation |
| Answer | "Is the process behaving as usual?" | "Is this output acceptable?" |
| Often called | The voice of the process | The voice of the customer |
| You set them by | Calculating | Deciding |

A process can be perfectly in control and still produce bad output, if its normal range sits outside the specification. Then you need to change the process itself. And a process can be out of control while every output is still in spec, which is an early warning worth having.

## Run chart vs control chart

A **run chart shows observations in time order**, often with a median reference line. A control chart adds model-based limits and a defined set of signal rules. [ASQ's glossary](https://asq.org/quality-resources/quality-glossary) defines the time-sequence plot; its [control-chart guide](https://asq.org/quality-resources/control-chart) explains limits and investigation.

| | Run chart | Control chart |
| --- | --- | --- |
| What is plotted? | A consistently defined measure over time | A consistently defined measure with chart-specific limits |
| Reference | Often a median; the plain time plot below has no centre line | A centre line and calculated control limits |
| Useful for | Seeing the sequence and examining a change | Assessing signals using the selected chart model and rules |
| What it cannot establish | The cause of a pattern | The cause of a signal, or whether customer specifications are met |

To prepare a run chart, keep the observations in their actual order, label the time and units, and plot them on a consistent scale. Record when a change was introduced. If using run-chart rules, state that rule set; do not borrow control-chart zones for a chart without those limits.

The following two views use the same twenty initial observations from the worked example below. Neither gains evidence by changing the vertical scale.

::figure paa3-run-control | Fictional pick durations, days 1–20, shown on the same scale. The run view plots time-ordered values; the individuals view adds mean 12.08 minutes and provisional limits 10.498 and 13.662. No separate run-chart signal rules are applied. These limits rely on the stated model and initial-data assumptions.

## Build an individuals chart by hand

An individuals and moving range chart (I-MR) can suit a sequence of individual numerical observations. Check the measurement, sampling and dependence between observations before choosing it. Counts, proportions and grouped measurements may need other chart models.

For this fictional illustration, a warehouse records one order's pick duration each day under a fixed sampling rule for comparable orders. Assume these observations adequately represent one stable process for the initial calculation. Here are twenty days:

| Day | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Minutes | 12.1 | 11.6 | 12.4 | 11.9 | 12.8 | 11.7 | 12.2 | 12.0 | 11.4 | 12.6 |

| Day | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Minutes | 12.3 | 11.8 | 12.5 | 11.9 | 12.1 | 12.7 | 11.6 | 12.2 | 12.0 | 11.8 |

Four steps:

1. **The mean.** Average the 20 values: **12.08 minutes**.
2. **The moving ranges.** The absolute difference between each day and the day before: 0.5, 0.8, 0.5, 0.9 and so on. There are 19 of them.
3. **The average moving range.** Average those 19 differences: **0.595**.
4. **The limits.** Multiply the average moving range by 2.66, then add and subtract it from the mean.

:::formula Individuals chart limits
UCL = mean + 2.66 × average moving range = 12.08 + 2.66 × 0.595 = **13.66**
LCL = mean − 2.66 × average moving range = 12.08 − 1.58 = **10.50**
Estimated σ = average moving range ÷ 1.128 = **0.53**
:::

Where does 2.66 come from? It's 3 ÷ 1.128. The constant 1.128 converts an average moving range of two points into an estimate of the standard deviation, so 2.66 × the average moving range is simply three standard deviations.

The companion moving range chart has an upper limit of 3.267 × 0.595 = 1.94. Any single day-to-day jump bigger than that is a signal too.

Now plot the next ten days against those fixed limits:

::figure spc-imr | Days 1 to 20 set the limits. Day 21 lands above the upper limit: a signal to investigate. From day 22 onwards the process settles at a new, higher level, still inside the limits. A single-point rule would miss that shift. The run rules catch it.

## The rules for spotting a signal

A point outside the limits is one signal. Defined patterns inside the limits can also warrant investigation. The classic set comes from Western Electric's 1956 quality handbook. Divide the space between the mean and each limit into three zones of one standard deviation each, and look for:

| Rule | Pattern | In the example |
| --- | --- | --- |
| 1 | One point beyond 3σ (outside a limit) | Day 21 |
| 2 | Two of three points in a row beyond 2σ, on the same side | Not triggered |
| 3 | Four of five points in a row beyond 1σ, on the same side | Triggered on day 27 |
| 4 | Eight points in a row on the same side of the mean | Triggered on day 28 |

Rules 3 and 4 caught what rule 1 couldn't: from day 22, picking takes about 12.7 minutes instead of 12.1. Investigate what changed: the layout, product mix, measurement method or another operating condition. The signal does not choose the explanation.

Use the rules sensibly. Each extra rule catches more real shifts, but also raises false alarms. Choose and document the rule set before interpreting the result, with an understanding of its false-alarm behaviour.

## What to do when you see a signal

1. **Investigate quickly.** Special causes are easiest to find within hours or days, while people remember what was different.
2. **If it's bad, remove the cause** and make sure it can't come back.
3. **If it's good, keep it.** A special cause can be an improvement nobody planned. Find out what happened and make it the standard.
4. **Recalculate the limits only when the process has genuinely changed**, and you know why. Then the new limits describe the new process.

And when there's no signal? Resist the urge to explain every up and down. If the normal range isn't good enough, improving it is a project on the system, like the [DMAIC walk-through](/notes/dmaic-step-by-step/), not a reaction to last Tuesday.

## Which chart for which data

| Your data | Example | Chart |
| --- | --- | --- |
| One measurement per period | Daily pick time, weekly lead time | I-MR (individuals and moving range) |
| Small subgroups of measurements (2 to about 9) | Five pack weights every hour | X̄ and R |
| Larger subgroups (10 or more) | 20 call durations per shift | X̄ and S |
| Share of defective items, varying sample size | % of orders shipped late each day | p chart |
| Number of defective items, fixed sample size | Defective parts in every batch of 100 | np chart |
| Count of defects, same area of opportunity | Scratches per panel | c chart |
| Count of defects, varying area of opportunity | Errors per 1,000 invoice lines | u chart |

Choose the chart around the data and sampling method. A numerical column alone does not establish that an I-MR model is appropriate.

## Mistakes that make control charts useless

- **Drawing specification limits or targets as control limits.** Then the chart shows opinions, not the process.
- **Recalculating the limits every period.** The limits chase the data, and shifts disappear into them.
- **Too little representative history.** Treat limits estimated from this twenty-point illustration as provisional. Use enough representative data for the chart model and review signals before treating the baseline as established.
- **Mixing different processes.** Two machines, two shifts or two product types on one chart produce strange patterns. Stratify first.
- **Charting and not reacting.** A chart nobody acts on is decoration. Agree in advance who responds to a signal, and how.

:::link /notes/did-it-hold/ | Did the improvement hold?
Follow the changed process over time, with a measurement and chart suited to the work. The follow-up matters after the first better result.
:::

## Sources

- NIST/SEMATECH. [How did statistical quality control begin?](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc11.htm) *e-Handbook of Statistical Methods*.
- NIST/SEMATECH. [What are variables control charts?](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm), including the Western Electric rules.
- NIST/SEMATECH. [Individuals control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc322.htm).
- ASQ. [Control chart](https://asq.org/quality-resources/control-chart).
- Shewhart, W. A. (1931). *Economic Control of Quality of Manufactured Product*. Van Nostrand.
- Western Electric Company (1956). *Statistical Quality Control Handbook*.
- Deming, W. E. (1986). *Out of the Crisis*. MIT Press. The 94% estimate, [via the W. Edwards Deming Institute](https://deming.org/quotes/i-should-estimate-that-in-my-experience-most-troubles-and-most-possibilities-for-improvement-add-up-to-the-proportions-something-like-this94-belongs-to-the-system-responsibility-of-management6-sp-3/).

*The warehouse and its numbers are fictional. The initial twenty observations provide provisional limits under the stated assumptions. Signal rules prompt investigation; a chart alone does not establish a cause or prove that a process is stable.*
