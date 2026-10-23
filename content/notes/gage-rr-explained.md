---
title: Gage R&R explained: repeatability, reproducibility and a study example
date: 2026-10-15
summary: One operator repeats a reading closely. Another gets a different result on the same part. Inspect the individual measurements before changing the production process.
seoTitle: Gage R&R explained: measurement study example
seoDescription: Learn Gage R&R with 27 readings. Compare repeated scatter, operator differences and bias, then plan a measurement study with clear limits.
updated: 2026-10-23
status: published
topic: Operational excellence
keywords: gage R&R explained, measurement system analysis example, repeatability vs reproducibility, gauge R&R, gage repeatability
---

**Gage R&R means gage repeatability and reproducibility. It examines variation from repeated measurement under the same conditions and from changes such as the operator.** It is part of measurement system analysis, often shortened to MSA. Gage is also written gauge. The worked example shows how to read these patterns before planning a full study.

A shaft measures 9.980 mm at one inspection station and 10.020 mm when another operator checks it. The part hasn't been machined again between readings.

Adjusting production now could be a response to the measuring method rather than the shaft.

[ASQ's explanation](https://asq.org/quality-resources/gage-repeatability) separates repeated readings by one operator from differences between operators measuring the same part. The measuring process includes how the instrument is positioned and used, not just the instrument itself.

## Gage repeatability vs reproducibility

Repeatability asks how closely one operator can repeat the measurement of the same characteristic on the same part with the same instrument and method.

Reproducibility examines changes across conditions included in the study. In a common crossed Gage R&R study, every operator measures every part, so operator-related differences can be examined without giving each person a different set of parts.

| Pattern in the readings | What it suggests checking |
| --- | --- |
| One operator's repeats on the same part are widely spread | Positioning, contact force, fixturing, instrument condition and other within-method variation |
| Each operator repeats closely, but their averages differ | Differences in technique, interpretation or setup between operators |
| Operators agree and repeat closely, but all miss a reference value | Bias relative to that reference, a separate concern from R&R |

Use these patterns to choose what to investigate. To judge accuracy, you also need a suitable reference.

## Gage R&R study example: inspect 27 readings

Our teaching example has three stable parts, one instrument and three operators. Each operator measures every part three times, giving 27 readings. The values are constructed so the different patterns are easy to see.

Start with “Operators apart”. The repeats cluster tightly, but operator A reads lower and C reads higher on every part. Switch to “Repeats spread” to see a different problem while the operator averages agree.

::interactive gage-reading-patterns | Constructed measurements in millimetres: three parts × three operators × three repeats = 27 readings per case. The chart and table show every value. Three parts illustrate the patterns. Use a representative study to assess a real measuring system.

In the first case, A's readings on part 2 are 9.975, 9.980 and 9.985 mm. Their mean is 9.980. The sample standard deviation is 0.005 mm, which describes the spread of those repeats around their mean.

:::formula Within one part-and-operator group
Sample variance = (0.005² + 0² + 0.005²) ÷ (3 − 1) = 0.000025 mm²
Sample standard deviation = √0.000025 = 0.005 mm
:::

Every group has that same constructed spread. Pooling their within-group variances therefore also gives 0.005 mm. [NIST's repeatability guidance](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc441.htm) explains pooling when the groups can appropriately share a precision estimate.

Across the same three parts, the operators' overall means are 9.980, 10.000 and 10.020 mm. Their **range is 0.040 mm**. This is not a standard deviation, so adding it to 0.005 mm would not calculate total R&R.

## Repeatability, reproducibility and measurement bias

Choose “Common shift”. The operators now agree closely with one another, yet all their means sit 0.030 mm above the example's assigned reference values. The repeatability stays at 0.005 mm.

A real bias check needs a suitable reference and its uncertainty. The assigned values here are fictional teaching references. Tight clusters alone cannot show whether a real measurement is close to the value it should represent.

[NIST's gauge-study guidance](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc4.htm) treats repeatability, reproducibility, bias, resolution and stability as distinct concerns. Passing one check doesn't settle the others.

## Five MSA concerns, with different checks

[Minitab's measurement-system training example](https://www.minitab.com/content/dam/www/en/uploadedfiles/documents/sample-materials/FuelInjectorNozzles-EN.pdf#page=4) groups accuracy and precision into bias, linearity, stability, repeatability and reproducibility. These five concerns are useful for planning the work; they are not five numbers to average into a score.

| Concern | Question to investigate | Evidence the check needs |
| --- | --- | --- |
| Repeatability | Does the same method repeat closely? | Repeated readings under the stated conditions |
| Reproducibility | Do included operators or conditions give different results? | A design that compares those conditions on suitable parts |
| Bias | How far is the average reading from a reference? | A suitable reference value and its uncertainty |
| Linearity | Does bias change across the measurement range? | References spanning the range, not only a middle-sized part |
| Stability | Does the measuring system change over time? | Repeated checks over the period and conditions of use |

[NIST's linearity explanation](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc452.htm) makes the range question explicit. A gauge can agree with a reference near 10 mm while behaving differently near either end of its intended range.

NIST also treats resolution as a measurement concern. A five-item teaching list should not hide whether the display and method can distinguish the changes that matter.

### MSA vs SPC

MSA examines the measurement system. **Statistical process control**, or SPC, examines process behaviour over time using methods such as control charts. An unreliable measurement can make a steady process look unstable, or hide an actual change.

Use the [control-chart explanation](/notes/control-charts-explained/) after checking what the readings represent. There is no single “good MSA value”: percent study variation, percent tolerance, bias and stability describe different things and need criteria suited to the decision.

## Plan the study around the measurement decision

Three convenient parts are too narrow a basis for judging a production measuring system. Choose parts that represent the variation relevant to the job and operators who represent ordinary use. Keep the characteristic, fixture, method and instrument scope clear.

[Minitab's crossed-study guidance](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/gage-study/crossed-gage-r-r-study/before-you-start/data-considerations/) recommends at least ten parts, three operators and two repeats as a common starting layout, with more parts useful when process variation is poorly known. The design still needs to fit the actual system and any required method.

Randomise the part order within each repeat and retain the individual readings. Don't let operators copy earlier results. If testing destroys or changes the part, a crossed design using the identical part may not be possible; select an appropriate alternative.

A full analysis also needs to examine whether operators differ more on some parts than others. Our constructed offsets are the same for every part, so they don't demonstrate that interaction. Changes over days or shifts need suitable time coverage too.

## Use the finding before adjusting the machine

If the evidence points to a positioning difference, agree and test the locating method with the operators. If repeated readings scatter, investigate the repeat measurement conditions. Buying a finer display won't automatically fix either problem.

Compare the result with the decision the measurement must support. Sorting near a specification boundary and monitoring process changes may need different assessments. A percentage without its denominator and agreed acceptance criteria is an incomplete result.

:::link https://vrolen.com/blog/gage-rr-manufacturing/ | Compare percent study variation with percent tolerance
Vrolen uses a separate worked example to show the two denominators. Neither measures the percentage of parts classified incorrectly.
:::

[Acceptance sampling](/notes/acceptance-sampling-explained/) makes a separate decision about a lot using the inspection results; it assumes that classification is credible.

The [Cp and Cpk note](/notes/process-capability-cp-cpk/) is the next step when the measurement is credible enough to assess process capability. Keep the [measurement method and units](/notes/data-quality-dimensions/) with those quality records, especially after a fixture or gauge change.

For the shaft that started this example, remeasure the same identified parts under a planned comparison before changing the machining setting. Otherwise, a measurement disagreement can become an unnecessary production adjustment.

## Sources and example notes

- [Minitab: Statistical Quality Analysis](https://www.minitab.com/content/dam/www/en/uploadedfiles/documents/sample-materials/FuelInjectorNozzles-EN.pdf), measurement-system accuracy and precision concerns.
- [NIST: Linearity of the gauge](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc452.htm), bias across the operating range.
- [ASQ: Gage Repeatability and Reproducibility](https://asq.org/quality-resources/gage-repeatability). Definitions and crossed-study structure.
- [NIST: Gauge R&R studies](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc4.htm) and [analysis of repeatability](https://www.itl.nist.gov/div898/handbook/mpc/section4/mpc441.htm). Separate measurement concerns and pooling within-group variances.
- [Minitab: Crossed Gage R&R data considerations](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/gage-study/crossed-gage-r-r-study/before-you-start/data-considerations/). Representative parts and operators, repeat measurements and randomisation.

Readings and reference values are fictional. The tool summarises repeat variation, operator means and differences from the assigned references. A full R&R analysis needs a suitable study design and variance estimates.
