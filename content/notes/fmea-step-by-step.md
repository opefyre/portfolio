---
title: FMEA step by step: find what could go wrong before it does
date: 2026-09-29
updated: 2026-10-23
summary: A practical guide to process FMEA: the seven steps, how to rate severity, occurrence and detection, why ranking by RPN can hide your worst risk, how action priority fixes it, and a worked example on an order fulfilment process.
status: published
topic: Operational excellence
keywords: FMEA, failure mode and effects analysis, process FMEA, PFMEA, RPN, risk priority number, action priority, AIAG VDA FMEA, severity occurrence detection, risk analysis
seoTitle: FMEA step by step: ratings and a worked example
seoDescription: Build a process FMEA with a worked example. Rate severity, occurrence and detection, compare RPN with action priority, and choose what to fix first.
---

**Teams use failure mode and effects analysis (FMEA) to examine how a process could fail, what the effects would be and which controls address the causes or detect the failures.** They record that reasoning before choosing actions and revise it as they learn about the process.

The food-distribution example below shows why the team must examine severity alongside any total score. Its highest-severity failure has the lowest risk priority number (RPN).

:::card The short version
1. List the process steps.
2. For each step, list how it could fail (the failure mode), what would happen (the effect) and why (the cause).
3. Rate **severity** of the effect, **occurrence** of the cause, and **detection** by current controls, each from 1 to 10.
4. Prioritise, with severity first. Don't rank only by S × O × D.
5. Act on the top risks: remove the cause if you can, catch it earlier if you can't. Then re-rate.
:::

## The vocabulary, once

Use separate fields for the failure, its effect, its cause and the current control:

:::grid
- **Failure mode** How the step fails. "Wrong item picked."
- **Effect** What the customer or next step experiences. "Customer receives the wrong product."
- **Cause** Why the failure mode happens. "Similar items stored side by side."
- **Control** What currently prevents the cause or detects the failure. "Visual check at packing."
:::

A simple test: effects are about the customer, modes are about the step, causes are about the conditions.

## The seven steps

The 2019 AIAG and VDA handbook, now the reference for automotive and widely used elsewhere, organises FMEA into seven steps:

| Step | What you do |
| --- | --- |
| 1. Planning and preparation | Scope, team, timing, what's in and out |
| 2. Structure analysis | Break the process into steps (and, for each, the people, machines, materials and environment involved) |
| 3. Function analysis | State what each step is supposed to achieve |
| 4. Failure analysis | Link failure modes, their effects and their causes |
| 5. Risk analysis | Record current controls; rate severity, occurrence and detection |
| 6. Optimisation | Decide actions, owners and dates; re-rate after they're done |
| 7. Results documentation | Record and communicate what was found and changed |

Agree the scope and intended functions before rating failures. Otherwise, the team may assign scores to different understandings of what the process must do.

## The example: order fulfilment at a food distributor

In this fictional example, a distributor picks, labels, packs and ships mixed food orders to shops. Some products contain allergens. The team records these lines in its process FMEA:

| Step | Failure mode | Effect | S | Cause | O | Current control | D | RPN |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pick | Wrong item picked | Shop receives the wrong product | 5 | Similar items stored side by side | 6 | Visual check at packing | 5 | 150 |
| Pack | Damaged in transit | Refund and re-shipment | 6 | Poor palletising | 4 | Customer complaint | 6 | 144 |
| Dispatch | Late dispatch | Missed delivery slot | 4 | Wave planning overload | 6 | End-of-day report | 4 | 96 |
| Label | Batch code missing | Traceability lost in a recall | 8 | Printer ribbon runs out | 2 | Operator glance | 3 | 48 |
| Pack | Allergen product in the wrong carton | Allergic reaction for a consumer | 10 | Similar outer packaging | 2 | Scan at packing | 2 | 40 |

## Rating: keep the scales concrete

Every organisation tunes its own scales, but they should describe observable things, not feelings. A simplified version:

| Score | Severity (of the effect) | Occurrence (of the cause) | Detection (by current controls) |
| --- | --- | --- | --- |
| 9 to 10 | Safety or legal consequence | Happens very often, or no prevention in place | Almost certainly won't be caught before the customer |
| 7 to 8 | Customer seriously affected, product unusable | Happens often | Caught only by chance or by the customer |
| 4 to 6 | Customer noticeably affected | Happens occasionally | Caught by a manual check |
| 2 to 3 | Minor annoyance | Rare, with good prevention | Caught by an automatic check |
| 1 | No noticeable effect | Practically impossible | Failure is prevented or always caught |

Use the applicable rating tables and record the evidence supporting each score. Rate severity for the effect, occurrence for the cause, and detection for the relevant current control. Resolve a disagreement if it could change the action priority.

## The trap: ranking by RPN

The traditional way to prioritise is the risk priority number: RPN = S × O × D. Sort by RPN, work from the top. In the example, that puts the allergen line **last**.

::figure fmea-rpn | The allergen failure has the highest assigned severity, 10, but the lowest RPN, 40. Review that severity directly before using the score to choose actions.

This isn't a quirk of the example. RPN has well-known flaws:

- **It treats the three factors as equal.** A severity of 10 counts no more than an occurrence of 10. But a rare catastrophe and a frequent nuisance are not the same risk.
- **The scores are rankings, not measurements.** A detection of 6 isn't "twice as bad" as a 3. Their product does not measure the probability or cost of the effect.
- **Very different risks get the same RPN.** 10 × 2 × 2 and 2 × 5 × 4 both give 40.
- **It invites gaming.** Teams learn that lowering any factor lowers the RPN, and choose the easiest one, often detection.

Reliability researchers have pointed this out for over twenty years. One well-cited review called RPN prioritisation seriously flawed from a technical perspective.

## Action priority: severity first

The AIAG and VDA handbook uses **action priority (AP)** tables to assign high, medium or low priority to combinations of severity, occurrence and detection. Use the applicable table and its action requirements. A general instruction to put severity first cannot replace that lookup.

For each high-severity effect, review the evidence behind prevention and detection. A low occurrence or detection score needs support from the actual controls and operating conditions.

The fictional team checks the allergen line's low occurrence and detection ratings. The scan works only if every carton passes through it, and the night shift sometimes skips it under pressure. The team therefore reviews those scores and prioritises the allergen control, followed by wrong picks and transit damage. Record the safety decision and its evidence separately from the RPN ranking.

## Optimisation: the actions

Good actions follow the same order as the logic: remove the cause, then prevent it, then detect it.

| Failure mode | Action | Owner and date | Proposed S / O / D, subject to verification |
| --- | --- | --- | --- |
| Allergen product in the wrong carton | Store allergen products in a separate zone; the scanner blocks packing if an allergen item goes into a non-allergen order | Warehouse manager, end of Q1 | 10 / 1 / 1 |
| Wrong item picked | Scan-to-pick on every line; separate look-alike items | Operations lead, end of Q2 | 5 / 3 / 2 |
| Damaged in transit | Palletising standard with a photo check; stretch-wrap settings fixed | Shipping supervisor, next month | 6 / 2 / 4 |

For the same effect, retain its severity while checking whether the action changes occurrence or detection. Test the scanner's block with a wrong item, a missed scan and the recovery procedure before accepting the proposed ratings.

## Mistakes that turn FMEA into paperwork

1. **Doing it alone.** One engineer filling in a template misses most of the failure modes. The people who do the work know where it breaks.
2. **Doing it once.** An FMEA should change whenever the process does, and whenever a failure happens that it didn't predict.
3. **Scores without evidence.** Use the agreed scales and investigate differences that could change the required action.
4. **Actions without owners and dates.** "Improve training" isn't an action. "New pick-path training for night shift, owned by Ana, by 15 March" is.
5. **Stopping at detection.** Check whether the team can prevent the cause. Compare the control's coverage, operating burden and response to a failure before selecting it.

## Where FMEA fits

After a failure, update the FMEA with the cause evidence and any control that failed to work as expected. Carry accepted changes into the control plan from the [DMAIC project](/notes/dmaic-step-by-step/), with an owner and a check that the control still works in use.

:::link /notes/project-risk-register/ | The same thinking, for projects
Projects have failure modes too. Here's how to build a risk register that actually drives decisions.
:::

## Sources

- AIAG & VDA (2019). [FMEA Handbook](https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1), first edition. Design FMEA, process FMEA and FMEA for monitoring and system response.
- Quality-One. [AIAG & VDA FMEA](https://quality-one.com/aiag-vda-fmea/). A summary of the seven steps and action priority.
- Bowles, J. B. (2003). [An assessment of RPN prioritization in a failure modes effects and criticality analysis](https://doi.org/10.1109/RAMS.2003.1182019). *Proceedings of the Annual Reliability and Maintainability Symposium*.
- UK Ministry of Defence. [FMEA/FMECA](https://www.asems.mod.uk/toolkit/fmeafmeca). ASEMS toolkit, on the method's origins in MIL-P-1629 (1949).
- SAE International. *J1739, Potential Failure Mode and Effects Analysis (FMEA)*.

*The distributor, its process and ratings are illustrative.*
