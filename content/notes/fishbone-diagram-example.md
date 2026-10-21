---
title: Fishbone diagram example: from possible causes to checks
date: 2026-10-21
summary: A poor seal could come from heat, material or measurement. Build the cause map, then use observations to decide which branch deserves the next test.
seoTitle: Fishbone diagram: a worked cause-and-effect example
seoDescription: Build a fishbone diagram for a recurring seal defect. Group possible causes, record contradictory evidence and turn each promising branch into a check.
status: published
topic: Continuous improvement
keywords: fishbone diagram example, cause and effect diagram, Ishikawa diagram, 6M fishbone
---

**A fishbone diagram groups possible causes of a defined problem so a team can investigate them.** It is also called an Ishikawa or cause-and-effect diagram. [ASQ's guide](https://asq.org/quality-resources/fishbone) explains its construction and common categories.

The diagram can fill a wall before the team knows what caused anything. Its value comes from the checks that follow.

Consider a fictional packing line where 18 of 600 pouches fail the specified seal test during one shift. The team has three immediate suggestions: the jaw is too cold, the film is different, or the test is inconsistent.

## Define the effect before drawing the branches

“Poor quality” is too broad for this investigation. The effect is a failed seal test on product P, line 2, during the stated shift. The team retains the batch, time and test records so it can compare failures with passing samples.

The shift's observed failure proportion is 18 ÷ 600 = **3%**. That number describes the inspected pouches. It does not establish a long-run defect rate or tell the team which suggestion is right.

Quality decides which stock to hold, inspect or release while the investigation continues. Drawing a diagram does not replace that responsibility.

## Build the fishbone with people who know the work

The operator, technician, material specialist and quality colleague map the seal process together. They use machine, method, material and measurement as branches because those labels help this discussion.

The conventional 6M categories also include people and environment. They are prompts, not compulsory boxes. A service process may need entirely different headings.

::figure gap-fishbone | Fictional possible-cause map for failed pouch seals. Each branch is a hypothesis until checked. The figure retains candidates even when early evidence weakens them.

Write a mechanism on each branch. “Operator” names a person. “The changeover instruction omits a warm-up check” proposes something the team can examine without turning the diagram into a blame chart.

## Turn each possible cause into an observable check

The first checks do not need to be complicated. They need to distinguish the explanations and preserve what was actually observed.

| Possible cause | Check | Observation in this example | What remains unresolved |
| --- | --- | --- | --- |
| Film lot B seals differently | Compare retained lots at the same controlled settings | Failures also occur with lot A | Lot B alone does not explain the failures |
| Cold jaw surface after changeover | Measure the surface using a checked method during warm-up | Surface is below the specified operating range while the display says ready | Whether this difference causes the observed failures |
| Seal test varies by tester | Repeat coded retained samples using the agreed test method | Two testers agree on the selected passing and failing samples | Broader repeatability across days and samples |
| Warm-up check missing from the method | Review the instruction and observe a changeover | Instruction uses the display indication only | Whether a revised check prevents recurrence |

These fictional observations narrow the investigation. They do not prove a root cause. In particular, two testers agreeing on a few samples does not replace a [measurement-system study](/notes/gage-rr-explained/) where one is needed.

Keep the film branch on the record with its evidence. Deleting an early favourite without documenting the check invites the same discussion next week.

## Test the explanation the evidence supports

The team now has a connected hypothesis: the display permits a restart before the jaw surface reaches its required range, and the instruction has no independent warm-up check.

Plan a controlled trial with quality and engineering. Hold the relevant material and other settings consistent, check the actual surface condition and compare seal results under the approved test procedure. Decide the acceptance criteria before seeing the results.

If a new check appears to help, repeat it through representative changeovers and operating conditions. A clean trial is evidence to build on; it does not show that every future failure has the same cause.

The [design-of-experiments note](/notes/design-of-experiments-example/) is useful when several settings may interact. The [5 Whys example](/notes/5-whys-example/) follows a narrower cause chain. The fishbone keeps competing branches visible before the team chooses where to go deeper.

## Close the investigation with evidence, not a completed drawing

Update the diagram or its linked log as the checks develop. A branch can be untested, weakened, supported or contradicted under specified conditions. Those descriptions are more useful than colouring every branch green when a meeting ends.

:::link https://www.youtube.com/watch?v=p5687M5EoGM | Follow the trial with a result check
Vrolen's PDCA video uses a different process example to show how a proposed change becomes a test and a follow-up decision.
:::

If the warm-up explanation holds, change the instruction, train the affected roles and confirm the new method continues to work. Keep the failed evidence too. It explains why the team changed the process and which alternative causes it actually checked.

## Source and example notes

- [ASQ: Fishbone diagram](https://asq.org/quality-resources/fishbone). Purpose, categories and construction procedure.

All product, inspection and investigation details are fictional. The example stops short of claiming a confirmed cause or measured improvement. Actual test and containment requirements depend on the product and process.
