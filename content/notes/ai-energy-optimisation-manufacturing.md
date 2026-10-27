---
title: AI energy optimisation: measure the result
date: 2026-10-25
updated: 2026-10-27
summary: Evaluate AI energy optimisation with clear measurement boundaries. Separate consumption, output, normalised performance and future saving scenarios.
seoTitle: AI energy optimisation: measure the result
seoDescription: Evaluate AI energy optimisation with clear measurement boundaries. Separate consumption, output, normalised performance and future saving scenarios.
status: published
topic: Industrial AI
keywords: AI energy optimization manufacturing, AI energy management manufacturing, energy per good unit, AI industrial energy efficiency
---

An AI energy-optimisation claim needs a measured energy result and an explanation of what changed in production. A smaller electricity bill alone cannot separate lower consumption from a tariff change, less output or different operating conditions.

The [IEA's Energy and AI report](https://www.iea.org/reports/energy-and-ai/ai-for-energy-optimisation-and-innovation) explores a Widespread Adoption Case for 2035. It is a scenario built around assumptions about adoption and barriers. Its estimated potential is not a saving a particular factory has already achieved.

## Define the boundary before comparing periods

Choose the equipment, process or facility being measured. Keep the energy meter, production count and observation period aligned.

[US Department of Energy guidance](https://www1.eere.energy.gov/manufacturing/eguide/iso_step_2_7.html) defines simple energy intensity as energy consumption divided by productive output. It also requires the energy and production measures to cover the same time frame.

:::formula An energy measure with a stated denominator
Electricity intensity = electricity consumed within the boundary ÷ stated productive output
Example unit: kWh per unit produced
:::

If you choose good units as the output, state the acceptance definition and keep rejected and reworked production visible. That is a defined metric choice, not a reason to drop their energy consumption from the numerator.

::figure aici-energy-boundary | Metered energy and the declared output must share a system boundary and period. This diagram introduces no assumed factory consumption or saving.

## Read consumption and intensity together

| Measure | What it describes | What to investigate beside it |
| --- | --- | --- |
| Total energy | Energy used within the boundary | Production, operating hours and relevant conditions |
| Energy per output unit | A ratio of energy to stated output | Product mix, fixed loads, rejects and the chosen denominator |
| Energy cost | Expenditure at the applicable tariffs | Price changes, demand charges and consumption |
| Normalised performance | A comparison accounting for included relevant variables | Model validity, baseline choice and unexplained changes |

[DOE's energy baselining guide](https://www.energy.gov/sites/default/files/2016/02/f29/Energy%20Intensity%20Baselining%20and%20Tracking%20Guidance.pdf#page=21) explains how regression can account for relevant variables such as production and weather when comparing periods. Dividing by output alone does not automatically account for those other influences.

## Identify what the AI actually changes

Record whether the application recommends a setting, predicts demand, detects abnormal consumption or controls equipment. Those are different interventions with different evidence needs.

Retain the recommendations, approved changes and operating outcomes. Check quality, throughput and equipment constraints alongside energy. The [benefits-realisation guide](/notes/benefits-realisation-automation/) explains why a reported technical improvement still needs a link to the claimed business result.

## Make the pilot comparison reviewable

Agree the baseline, relevant operating variables and acceptable production outcomes before the trial. Identify other changes made during the comparison period and retain them in the record.

At the review, show consumption, the declared output, operating conditions and energy cost separately. Ask the energy and production owners to verify those records before attributing a saving to the AI application.

## Sources

- [IEA AI use in energy and industry](https://www.iea.org/reports/energy-and-ai/ai-for-energy-optimisation-and-innovation).
- [DOE energy performance indicators](https://www1.eere.energy.gov/manufacturing/eguide/iso_step_2_7.html).
- [DOE: Energy Intensity Baselining and Tracking Guidance](https://www.energy.gov/sites/default/files/2016/02/f29/Energy%20Intensity%20Baselining%20and%20Tracking%20Guidance.pdf), printed pages 7 and 13, selecting relevant variables and normalising consumption with regression.
