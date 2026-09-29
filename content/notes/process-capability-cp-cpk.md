---
title: Process capability explained: Cp, Cpk, Pp and Ppk with one worked example
date: 2026-09-29
summary: What Cp and Cpk actually measure, how to calculate them by hand, why a process can have a good Cp and a poor Cpk, how Ppk differs, what the common targets mean in defects per million, and the checks to do before trusting any capability number.
status: published
topic: Operational excellence
keywords: process capability, Cpk, Cp, Ppk, Pp, Cpk formula, capability index, six sigma, statistical process control, specification limits, ppm defects
---

"All the parts are in spec" sounds like good news. But it doesn't tell you whether they'll stay in spec next week, or how close to the edge they already are. Process capability answers that. It compares how much your process varies with how much the customer allows, and turns it into one number that suppliers, customers and auditors all understand.

This note calculates capability by hand on one example, so the formulas stop being a black box in your statistics software.

:::card The short version
- **Cp** compares the width of the specification with the width of the process (six standard deviations). It ignores where the process is centred.
- **Cpk** does the same, but only on the side nearest to a limit. It penalises a process that's off-centre.
- **Pp and Ppk** use the overall, long-term variation instead of the short-term variation. A big gap between Cpk and Ppk means the process drifts.
- 1.33 is the most common minimum target. Below 1.0, you're making defects.
- Capability only means something if the process is stable. Check the control chart first.
:::

## Two voices

Capability puts two things side by side. The **voice of the customer** is the specification: the lower and upper limits (LSL and USL) a part or service must meet. The **voice of the process** is its natural spread, usually taken as six standard deviations (±3σ), which covers about 99.73% of output from a stable, normally distributed process.

If the process spread fits comfortably inside the specification, the process is capable. If it's wider, or pushed against one side, it will produce defects no matter how carefully people work.

## The example

A machine turns shafts with a specified diameter of **25.00 ± 0.05 mm**. So LSL = 24.95 and USL = 25.05. From a stable control chart with 25 subgroups:

| Input | Value |
| --- | --- |
| Process mean (x̄) | 25.012 mm |
| Within-subgroup standard deviation (σ) | 0.012 mm |
| Specification width (USL − LSL) | 0.10 mm |

The standard deviation here is the *within-subgroup* estimate, taken from the control chart (for example, R̄ ÷ d₂). That detail matters later.

## Cp: could the process fit?

:::formula Cp
Cp = (USL − LSL) ÷ 6σ = 0.10 ÷ (6 × 0.012) = 0.10 ÷ 0.072 = **1.39**
:::

The specification is 1.39 times as wide as the process spread. If the process sat exactly in the middle, it would fit with room to spare.

## Cpk: does it fit where it is?

Cpk measures the distance from the mean to the *nearest* limit, in units of 3σ.

:::formula Cpk
Upper side: (USL − x̄) ÷ 3σ = (25.05 − 25.012) ÷ 0.036 = 1.06
Lower side: (x̄ − LSL) ÷ 3σ = (25.012 − 24.95) ÷ 0.036 = 1.72
Cpk = the smaller of the two = **1.06**
:::

The process has the potential of 1.39 but delivers 1.06, because it runs 0.012 mm high. All the risk is on the upper side.

::figure cpk-centering | Same spread, two positions. Off-centre, the tail crosses the upper limit and about 770 parts per million are out of spec. Centred on target, the same process produces about 31 per million.

## What the numbers mean in defects

Assuming a normal distribution, each Cpk value corresponds to an expected defect rate:

| Cpk | Out of spec beyond the nearer limit |
| --- | --- |
| 0.67 | about 22,000 ppm (2.2%) |
| 1.00 | about 1,350 ppm |
| 1.33 | about 32 ppm |
| 1.67 | about 0.3 ppm |
| 2.00 | about 0.001 ppm |

In the example, the off-centre process produces about 770 ppm above the upper limit. Centring it at 25.000 brings both sides to 1.39 and the total down to about 31 ppm, a 25-fold improvement from an adjustment, not a new machine.

## Cp and Cpk together tell you what to do

:::grid
- **Cp high, Cpk high** Capable and centred. Monitor it and move on.
- **Cp high, Cpk low** Capable but off-centre. Adjust the setting. Usually quick and cheap.
- **Cp low, Cpk low** Too much variation. Find and reduce the sources of variation: a project, not an adjustment.
- **Cpk higher than Cp** Impossible. Check the calculation.
:::

In the example, the first fix is to centre the process. Going further means reducing variation: bringing σ down from 0.012 to 0.009 mm would lift both indices to 1.85.

## Cpk versus Ppk

Cp and Cpk use the short-term, within-subgroup standard deviation. They describe what the process can do when nothing shifts. Pp and Ppk use the overall standard deviation of all the data, including shifts between subgroups, shifts between shifts, material lots and so on.

Suppose the overall standard deviation of all 125 measurements is 0.015 mm:

:::formula Ppk
Ppk = (USL − x̄) ÷ 3σ<sub>overall</sub> = 0.038 ÷ 0.045 = **0.84**
:::

A Cpk of 1.06 and a Ppk of 0.84 tell a story: within a subgroup the process is decent, but something moves it around between subgroups. A setting that drifts, a tool that wears, differences between operators. That's often the most valuable finding of a capability study, because it points to a specific cause worth hunting.

## One-sided specifications

Many real specifications only have one limit. A pack must weigh *at least* 495 g. An invoice must be processed *within* 5 days. Then only one side of the formula applies.

For invoices processed in an average of 3.1 days with a standard deviation of 0.6 days:

:::formula One-sided capability
Cpu = (USL − x̄) ÷ 3σ = (5 − 3.1) ÷ 1.8 = **1.06**
:::

About 1 invoice in 1,300 will take longer than 5 days. Capability works just as well for service processes, as long as the data behave.

## Before you trust a capability number

A capability index is easy to calculate and easy to get wrong. Check four things first:

1. **Is the process stable?** Plot a control chart. If it shows special causes, the process has no single capability to measure. Fix the instability first. (See [how to read a control chart](/notes/control-charts-explained/).)
2. **Is the measurement system good enough?** If the gauge's own variation is a large share of the tolerance, the capability number describes the gauge as much as the process.
3. **Is the data roughly normal?** Skewed data, like cycle times or flatness, can make the defect estimate wildly wrong. Use a transformation or a non-normal capability method.
4. **Is there enough data?** Around 100 measurements, for example 25 subgroups of 4 or 5, is a common minimum. Capability from 30 parts is a rough guess with wide error bars.

## Common targets

| Minimum | Where you see it |
| --- | --- |
| 1.00 | The bare minimum: the process just fits, with no margin |
| 1.33 | The most common general requirement for an ongoing process |
| 1.67 | New processes and critical characteristics. Automotive customers typically want a Ppk of 1.67 or more in the initial study before production approval (PPAP) |
| 2.00 | Six Sigma level: ±6σ fits inside the specification |

Treat targets as a conversation with the customer, not a law of nature. A cosmetic dimension doesn't need the same capability as a brake component.

:::link /notes/dmaic-step-by-step/ | When the answer is "reduce variation"
A low Cp calls for a structured project. DMAIC is the standard way to run one.
:::

## Sources

- NIST/SEMATECH. [What is process capability?](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm) *e-Handbook of Statistical Methods*.
- Steiner, S. H., Abraham, B. & MacKay, R. J. [Understanding process capability indices](https://sas.uwaterloo.ca/~shsteine/papers/cap.pdf). University of Waterloo, Institute for Improvement in Quality and Productivity. On Cpk versus Ppk and the AIAG requirements.
- Ford Motor Company (2024). [Ford specifics for PPAP](https://www.iatfglobaloversight.org/wp/wp-content/uploads/2024/10/Ford_Specifics_for_PPAP.pdf). On the Ppk ≥ 1.67 requirement.
- AIAG. [Statistical Process Control (SPC) reference manual](https://www.aiag.org/training-and-resources/manuals/details/SPC-3).

*The machine, the invoice process and their numbers are illustrative.*
