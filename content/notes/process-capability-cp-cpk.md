---
title: Process capability: Cp, Cpk, Pp and Ppk with a worked example
date: 2026-09-29
updated: 2026-10-20
summary: A shaft process has Cp of 1.39 and Cpk of 1.06. Follow the calculation, check what the difference means and see why a target alone cannot approve a process.
status: published
topic: Operational excellence
keywords: process capability, Cp Cpk formula, Cpk vs Ppk, Pp Ppk, Cpk 1.33 meaning, process capability example
seoTitle: Process capability: Cp, Cpk, Pp and Ppk explained
seoDescription: Calculate Cp, Cpk, Pp and Ppk with a shaft example. Understand sigma distance, normal-model defect estimates and the limits of common capability targets.
---

The sampled shafts all passed inspection. The production team still wants to know how close the process runs to the diameter limit, and whether today's result represents normal operation.

**Process capability compares a process's variation and location with its specification limits.** Cp compares the widths. Cpk also considers where the mean sits. Pp and Ppk make corresponding comparisons using overall rather than within-subgroup variation.

These are estimates from data, not guarantees about the next part. The example below shows what to calculate and what needs checking before acting on the result.

## Cp and Cpk: use the same specification and variation estimate

Our fictional machine turns shafts to **25.00 ± 0.05 mm**. The lower specification limit, LSL, is 24.95 mm. The upper limit, USL, is 25.05 mm.

Assume a representative study with 25 subgroups of five measurements, a stable control chart and an approximately normal distribution. The estimated mean is 25.012 mm and the within-subgroup standard deviation is 0.012 mm.

:::formula Cp compares the widths
Cp = (USL − LSL) ÷ (6 × within-subgroup standard deviation)
Cp = 0.10 ÷ (6 × 0.012) = 1.39
:::

A Cp of 1.39 means the specification width is about 1.39 times the estimated six-standard-deviation spread. It does not tell us whether that spread is centred between the limits. A Cp of 1.33 would mean a width ratio of 1.33, with the same limitation.

Cpk uses the nearer specification limit.

:::formula Cpk includes the process location
Upper side = (25.05 − 25.012) ÷ (3 × 0.012) = 1.06
Lower side = (25.012 − 24.95) ÷ (3 × 0.012) = 1.72
Cpk = the smaller result = 1.06
:::

The mean is closer to the upper limit. That explains why Cpk is below Cp in this example. The [NIST capability reference](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm) sets out these definitions and the assumptions behind their interpretation.

## The same spread can produce different results

Holding the assumed variation fixed, centring the process at 25.000 mm makes both sides equal and lifts Cpk to 1.39.

::figure cpk-centering | Fictional normal-model comparison using unrounded inputs. At mean 25.012 mm and standard deviation 0.012 mm, about 771 parts per million lie outside the limits, almost all above the upper limit. At mean 25.000 mm, the two-tail total is about 31 per million. These are model estimates, not counted defects.

An adjustment would need engineering approval and verification. The chart does not establish that centring is safe, inexpensive or sufficient for the actual process.

When Cp is adequate but Cpk misses the agreed requirement, investigate location as well as measurement. When the estimated spread is too wide, centring alone cannot reduce it. A high Cpk still needs a stable, representative process and an acceptable measuring system.

## What does Cpk 1.33 mean in sigma and defects?

With these definitions, **3 × Cpk is the estimated distance from the mean to the nearer specification limit, in units of the same standard deviation**. At Cpk 1.33, that distance is 3.99 standard deviations.

No automatic 1.5-sigma shift is part of this calculation. If a report uses a shifted “sigma level”, it is using another convention and should say so.

Under a normal model, these nearest-limit distances imply the following one-tail estimates:

| Cpk | Distance to nearer limit | Estimated ppm beyond that limit |
| --- | ---: | ---: |
| 0.67 | 2.01 standard deviations | About 22,216 |
| 1.00 | 3.00 | About 1,350 |
| 1.33 | 3.99 | About 33 |
| 1.67 | 5.01 | About 0.27 |
| 2.00 | 6.00 | About 0.001 |

For two-sided specifications, add the other tail. If the process is centred, both tails are equal: Cpk 1.33 gives about 66 ppm in total under that model. If it is off-centre, Cpk alone does not identify the farther tail.

A result below 1.0 indicates the nearer limit is less than three estimated standard deviations from the mean. It does not prove defects occurred in a finite sample. Nor does a high index establish a low defect rate when the assumed distribution is wrong.

## Cpk vs Ppk: change the variation estimate, not the specification

Cp and Cpk use an estimate of variation within rational subgroups. Pp and Ppk use overall variation across the included observations. [Minitab's explanation](https://blog.minitab.com/en/blog/marilyn-wheatleys-blog/how-cpk-and-ppk-are-calculated2c-part-2) distinguishes these two views.

Suppose the overall standard deviation of our 125 measurements is 0.015 mm, with the same mean and limits.

:::formula Overall performance indices
Pp = 0.10 ÷ (6 × 0.015) = 1.11
Ppk = min(0.038, 0.062) ÷ (3 × 0.015) = 0.84
:::

Ppk 0.84 is lower than Cpk 1.06 because the estimated overall variation is larger. The difference may reflect shifts between subgroups, the grouping method or other features of the study. Plot the data over time before calling it drift.

“Overall” does not automatically mean long term. A short study can miss tool wear, material changes or later shifts even when every reading enters the overall calculation. A Ppk of 1.33 is a nearer-limit distance of 3.99 overall standard deviations; it is not a promise of long-term performance.

## One-sided specifications need one tail

A separate fictional service requires invoice processing within five days. Assume stable, approximately normal processing times with mean 3.1 days and standard deviation 0.6 days.

:::formula Upper-only capability
Cpu = (5 − 3.1) ÷ (3 × 0.6) = 1.06
Distance to deadline = (5 − 3.1) ÷ 0.6 = 3.17 standard deviations
:::

Using the unrounded distance, the model estimates about 771 late invoices per million, or roughly one in 1,300. That prediction depends on the distribution; service-time data often need a different model. Actual deadline performance should also be counted directly.

## Is 1.33 or 1.67 good enough?

The answer comes from the customer requirement, the characteristic and the evidence behind the study. Neither number is a universal approval rule.

For a specific example, Ford's [June 2026 PPAP requirements](https://www.iatfglobaloversight.org/wp/wp-content/uploads/2026/06/Ford-Specifics-for-PPAP_June-2026-SCCAF-_-Final.pdf#page=17) specify Ppk greater than 1.67 in Note 6 of the initial/final capability procedure for programs using SCCAF. That requirement belongs to its customer-specific context and conditions.

Before accepting any capability number, check the [control chart](/notes/control-charts-explained/), the [measurement study](/notes/gage-rr-explained/), the distribution and the period and conditions represented. NIST also discusses uncertainty in estimated indices. A small dataset can produce a precise-looking number with substantial uncertainty.

For our shaft process, the next step is to verify the location difference and the measurement, then test an authorised setting change. Recalculate with data that represents the changed process. Keep the underlying measurements with the index so another reviewer can follow the result.

## Sources and calculation notes

- [NIST: What is process capability?](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm), index definitions, distribution assumptions and estimation uncertainty.
- [Minitab: How Cpk and Ppk are calculated, part 2](https://blog.minitab.com/en/blog/marilyn-wheatleys-blog/how-cpk-and-ppk-are-calculated2c-part-2), within and overall variation.
- [Ford: Customer-specific PPAP requirements](https://www.iatfglobaloversight.org/wp/wp-content/uploads/2026/06/Ford-Specifics-for-PPAP_June-2026-SCCAF-_-Final.pdf), effective 15 June 2026, process-capability procedure and acceptance criteria.

All process values are fictional. Indices use unrounded inputs. Ppm values are normal-model probabilities multiplied by one million; they are not observed reject counts. The shaft figure compares total two-sided probabilities, while the interpretation table shows the nearer tail only.
