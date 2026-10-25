---
title: Soft sensors: estimate an unmeasured value
date: 2026-10-25
summary: Understand soft sensors and virtual measurements. Follow battery state of charge from measured inputs to an estimate that needs validation.
seoTitle: Soft sensors: estimate an unmeasured value
seoDescription: Understand soft sensors and virtual measurements. Follow battery state of charge from measured inputs to an estimate that needs validation.
status: published
topic: Industrial AI
keywords: soft sensor manufacturing, what is a soft sensor, virtual sensor manufacturing, soft sensor vs physical sensor
---

A soft sensor estimates a quantity from other available measurements and a model. Engineers also call it a virtual sensor. The estimated quantity may be difficult to measure directly, expensive to instrument or available only after a delay.

The model still needs trustworthy inputs and a way to check its output.

[MathWorks' virtual-sensor overview](https://ch.mathworks.com/videos/ai-with-model-based-design-virtual-sensor-modeling-1734713840907.html) uses battery state of charge as an example. A battery-management system needs that value, but it cannot measure state of charge in the same direct way that it measures a terminal voltage. The same overview describes estimating motor position and checking an AI model as part of the wider control system.

## Separate the measured input from the estimate

A database can display both as numbers. Keep their meanings visible.

| Record | What to retain |
| --- | --- |
| Measured input | Instrument, units, timestamp and relevant calibration information |
| Estimated quantity | Model version, input window, output unit and operating range |
| Reference check | How the comparison value was obtained, its timing and uncertainty |
| Operating use | Who may rely on the estimate and what happens when it is unavailable |

A missing input is not a zero reading. A delayed reference value is not an instantaneous observation. Those distinctions affect both model training and later use.

The [data-quality guide](/notes/data-quality-dimensions/) explains why completeness and accuracy need separate checks.

::figure aici-soft-sensor-path | A virtual measurement uses physical observations and a model. An independent reference check remains a separate part of validating the estimate.

## Check the conditions represented in training

A model can fit the available records while performing poorly in a different operating range. Check which loads, temperatures, products or equipment states the source data actually cover.

Keep development and test evidence separate. If closely related records from the same run appear in both, the evaluation may overstate how well the sensor will work on a new run. The [data-leakage guide](/notes/data-leakage-machine-learning/) follows that problem through model evaluation.

The verification also needs to reflect how the estimate will be used. An error acceptable for an advisory trend may be unacceptable in a control loop.

## Plan for inputs and models that fail

Define what the application does when an input stops arriving, a timestamp becomes stale or the operating condition moves outside the validated range. Showing the last estimate without its age can make an unavailable measurement appear current.

Keep the approved fallback with the operating procedure. The [IT and OT guide](/notes/it-vs-ot-explained/) explains why recovery for physical control needs attention to the equipment as well as the software.

## Retain a way to verify the estimate

Reducing instrumentation cost does not remove the need for reference evidence. The team may still need periodic physical checks, laboratory results or another suitable reference method.

Before replacing a reported measurement with a soft-sensor output, label it as an estimate in the data record. Then document its validated range, reference method and fallback. That lets the next person using the number understand what it represents.

## Sources

- [MathWorks virtual sensor modelling](https://ch.mathworks.com/videos/ai-with-model-based-design-virtual-sensor-modeling-1734713840907.html).
