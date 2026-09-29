---
title: How to read a control chart: common cause, special cause and the rules that matter
date: 2026-09-29
summary: A control chart tells you when a change in your numbers is real and when it's just noise. How to build an individuals chart by hand, the four Western Electric rules, which chart fits which data, and the mistakes that make charts useless.
status: published
topic: Operational excellence
keywords: control chart, statistical process control, SPC, I-MR chart, individuals chart, Western Electric rules, common cause variation, special cause variation, Shewhart chart, control limits
---

Every Monday, someone looks at last week's number, sees it went up, and asks what happened. Often, nothing happened. Numbers wobble. But the question sends a team off to investigate, explain and "fix" something that was never broken, and fixing a stable process often makes it worse.

A control chart is the simplest defence against this. Walter Shewhart sketched the first one in a Bell Labs memo in May 1924, and a century later it's still the best tool for one question: *is this change a signal, or just noise?*

:::card The short version
- Every process varies. Most of that variation is **common cause**: the normal noise of the system.
- Occasionally something specific changes. That's **special cause** variation, and it's worth investigating.
- A control chart draws limits from the process's own history, about three standard deviations either side of the mean. Points inside, with no odd patterns, are noise. Points outside, or unusual patterns, are signals.
- React to signals. Leave the noise alone, and if you don't like the noise, change the system.
:::

## Two kinds of variation

:::grid
- **Common cause** Built into the process: small differences in people, materials, machines and conditions. Always there. Reacting to a single data point here is tampering, and it usually adds variation.
- **Special cause** Something specific and new: a broken tool, a new supplier, a system outage, a new hire on their first day. It's worth finding while the trail is fresh.
:::

W. Edwards Deming, who spread Shewhart's ideas worldwide, estimated that 94% of problems and opportunities for improvement belong to the system, and only 6% to special causes. That's why blaming the person behind a bad week rarely helps: most of the time, the system produced that week.

## Control limits are not targets

This is the most important idea on the page. Control limits and specification limits answer completely different questions:

| | Control limits | Specification limits |
| --- | --- | --- |
| Come from | The process's own data | The customer, the contract, a regulation |
| Answer | "Is the process behaving as usual?" | "Is this output acceptable?" |
| Often called | The voice of the process | The voice of the customer |
| You set them by | Calculating | Deciding |

A process can be perfectly in control and still produce bad output, if its normal range sits outside the specification. Then you need to change the process itself. And a process can be out of control while every output is still in spec, which is an early warning worth having.

## Build an individuals chart by hand

The individuals and moving range chart (I-MR) is the most useful chart outside a factory, because it works with one number per period: daily orders shipped, hours to close a ticket, days to pay an invoice.

Example: a warehouse tracks the average minutes to pick an order, each day. Here are 20 days:

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

::figure spc-imr | Days 1 to 20 set the limits. Day 21 lands above the upper limit: a special cause. From day 22 onwards the process settles at a new, higher level, still inside the limits. A single-point rule would miss that shift. The run rules catch it.

## The rules for spotting a signal

A point outside the limits is the obvious signal. But patterns inside the limits can be just as real. The classic set comes from Western Electric's 1956 quality handbook. Divide the space between the mean and each limit into three zones of one standard deviation each, and look for:

| Rule | Pattern | In the example |
| --- | --- | --- |
| 1 | One point beyond 3σ (outside a limit) | Day 21 |
| 2 | Two of three points in a row beyond 2σ, on the same side | Not triggered |
| 3 | Four of five points in a row beyond 1σ, on the same side | Triggered on day 27 |
| 4 | Eight points in a row on the same side of the mean | Triggered on day 28 |

Rules 3 and 4 caught what rule 1 couldn't: from day 22, picking takes about 12.7 minutes instead of 12.1. Something changed that week. Perhaps a new layout, a new product range, or a system update. That's the conversation to have, and it's a much better one than "why was Tuesday bad?"

Use the rules sensibly. Each extra rule catches more real shifts, but also raises false alarms. Rule 1 plus rule 4 is a good starting pair for most teams.

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

When in doubt, the I-MR chart is a robust default for most business data.

## Mistakes that make control charts useless

- **Drawing specification limits or targets as control limits.** Then the chart shows opinions, not the process.
- **Recalculating the limits every period.** The limits chase the data, and shifts disappear into them.
- **Too little data.** Shewhart's rule of thumb was at least 25 points before judging a process. Set limits from 20 to 25, and treat early limits as provisional.
- **Mixing different processes.** Two machines, two shifts or two product types on one chart produce strange patterns. Stratify first.
- **Charting and not reacting.** A chart nobody acts on is decoration. Agree in advance who responds to a signal, and how.

:::link /notes/did-it-hold/ | Did the improvement hold?
A control chart is also the best way to check whether an improvement lasted. That's the subject of this note.
:::

## Sources

- NIST/SEMATECH. [How did statistical quality control begin?](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc11.htm) *e-Handbook of Statistical Methods*.
- NIST/SEMATECH. [What are variables control charts?](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc32.htm), including the Western Electric rules.
- NIST/SEMATECH. [Individuals control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc322.htm).
- ASQ. [Control chart](https://asq.org/quality-resources/control-chart).
- Shewhart, W. A. (1931). *Economic Control of Quality of Manufactured Product*. Van Nostrand.
- Western Electric Company (1956). *Statistical Quality Control Handbook*.
- Deming, W. E. (1986). *Out of the Crisis*. MIT Press. The 94% estimate, [via the W. Edwards Deming Institute](https://deming.org/quotes/i-should-estimate-that-in-my-experience-most-troubles-and-most-possibilities-for-improvement-add-up-to-the-proportions-something-like-this94-belongs-to-the-system-responsibility-of-management6-sp-3/).

*The warehouse and its numbers are illustrative.*
