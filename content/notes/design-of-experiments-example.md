---
title: Design of experiments: a factorial example with two settings
date: 2026-10-15
summary: A higher temperature improves one seal and weakens another. A small factorial experiment shows why changing one setting at a time can miss the relationship.
seoTitle: Design of experiments: a worked factorial example
seoDescription: Learn DOE through a two-factor sealing example. Compare all four settings, inspect repeated readings and see what an interaction changes in the decision.
status: published
topic: Continuous improvement
keywords: design of experiments example, factorial experiment, DOE vs one factor at a time, interaction plot
---

**Design of experiments (DOE) is a way to plan deliberate changes to a process so you can learn how its inputs affect a measured result.** The inputs are called factors. Their chosen settings are levels. The result you measure is the response.

Consider a packaging seal. Raising temperature seems like a reasonable way to make it stronger. A trial at one line speed supports that idea. At a different speed, the same temperature change makes the seal weaker.

The effect depends on the combination. That is an interaction, and it changes the experiment we need to run.

## What is a factorial experiment?

A full factorial experiment tests every combination of the selected factor levels. [NIST's explanation](https://www.itl.nist.gov/div898/handbook/pri/section3/pri333.htm) gives four combinations for two factors at two levels: 2 × 2.

In this fictional study, the factors are seal temperature and line speed. The response is seal strength in newtons, measured using the same test method. Higher strength is desirable within the tested conditions; a real product also needs its other quality requirements checked.

| Factor | Lower level | Higher level |
| --- | --- | --- |
| Temperature | 160°C | 180°C |
| Line speed | 20 packs/min | 30 packs/min |

The settings are invented. Choose real trial settings with the people responsible for the equipment, material and product.

## Design the trials before collecting the results

Assume one material lot, one trained operator and a consistent setup method. Each run produces a fresh test seal after the selected condition has settled. We run each combination three times, giving 12 runs. These are separate process trials, not three readings of the same seal.

Call the combinations A (160/20), B (180/20), C (160/30) and D (180/30). One example of a randomised run order is **C, A, D, B, B, C, A, D, C, B, D, A**. Each combination appears three times.

Randomising the order helps avoid consistently testing one setting early and another late. It cannot remove every time effect. If the experiment must span different lots or shifts, consider a blocked design that accounts for those differences. NIST explains [randomisation](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm) and [blocking](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm) separately.

Check the measuring process before judging small differences. The [Gage R&R example](/notes/gage-rr-explained/) distinguishes repeated-reading variation from differences between operators. Vrolen's [measurement-system guide](https://vrolen.com/blog/gage-rr-manufacturing/) goes further into study design and interpretation.

## Read the interaction plot and the individual results

The figure keeps all four combinations visible. Its lines connect group averages; the smaller marks show the three separate observations. Select either speed to inspect its temperature comparison.

::interactive doe-interaction | Fictional 12-run sealing study. Strength is measured in newtons. The lines connect the fictional group means; individual trials remain visible. Run order and conditions are listed above.

At 20 packs/min, the readings average 20 N at 160°C and 26 N at 180°C. The temperature increase adds **6 N**.

At 30 packs/min, the corresponding averages are 18 N and 14 N. The same increase subtracts **4 N**.

The difference between those temperature changes is 6 − (−4) = 10 N. That describes how much the temperature change differs between the two speeds. A real study also needs to estimate uncertainty around it.

## Why changing one factor at a time can mislead

Suppose the team starts at 160°C and 30 packs/min. It first raises temperature while holding speed fixed. Strength falls from an average 18 N to 14 N, so the team returns to 160°C.

Next it lowers speed at 160°C. Strength rises to 20 N. If it stops there, it never tries 180°C at the slower speed, which has the highest observed average: 26 N.

That particular one-factor-at-a-time path misses the combination. Another starting point or sequence might find it. The benefit of the factorial design is that we planned to inspect the relationship rather than depending on the path taken.

## What to check before changing the standard setting

Three trials per combination show how replication works. Plan a real sample size around the difference worth detecting, expected variation and the consequences of a wrong conclusion.

Analyse the actual trial data, including uncertainty and model assumptions. Check whether response variation changes across settings. Two temperature levels cannot tell us whether the relationship curves between or beyond them.

Then confirm the proposed setting under relevant operating conditions. In this example, the slower setting also reduces nominal line speed. Check acceptable seal quality, throughput and other requirements together before choosing it.

The [PDCA note](/notes/pdca-cycle-example/) explains how a trial feeds the next improvement decision. DOE helps design the comparison within that learning cycle. 

:::link https://www.youtube.com/watch?v=p5687M5EoGM | Watch: PDCA explained by Vrolen
A video explanation of the wider improvement loop, using a different worked example. Use it to connect the experiment with the next operating decision.
:::

Write the experiment around the decision you need to make: which factors, which settings, which response and which uncertainty would change the choice. That is more useful than collecting a few favourable readings after the setting has already been chosen.

## Sources and example notes

- NIST/SEMATECH. [Full factorial designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri333.htm).
- NIST/SEMATECH. [Completely randomized designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri331.htm) and [randomized block designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm).

The process, settings, run order and readings are fictional. The example illustrates an interaction without fitting a statistical model or identifying an optimum.
