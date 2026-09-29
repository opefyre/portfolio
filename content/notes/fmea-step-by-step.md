---
title: FMEA step by step: find what could go wrong before it does
date: 2026-09-29
summary: A practical guide to process FMEA: the seven steps, how to rate severity, occurrence and detection, why ranking by RPN can hide your worst risk, how action priority fixes it, and a worked example on an order fulfilment process.
status: published
topic: Operational excellence
keywords: FMEA, failure mode and effects analysis, process FMEA, PFMEA, RPN, risk priority number, action priority, AIAG VDA FMEA, severity occurrence detection, risk analysis
---

Most problem-solving starts after something has gone wrong. Failure mode and effects analysis (FMEA) starts before. It began as a US military procedure in 1949, helped NASA through the Apollo program in the 1960s, and has been standard in the automotive industry for decades. It asks a team to walk through a process step by step and imagine, systematically, every way each step could fail, what that failure would cause, and how likely you'd be to catch it.

Done well, it's one of the highest-return hours a team can spend. Done badly, it's a spreadsheet nobody reads. The difference is mostly in how you prioritise, and that's where the most common method, the risk priority number, quietly lets people down.

:::card The short version
1. List the process steps.
2. For each step, list how it could fail (the failure mode), what would happen (the effect) and why (the cause).
3. Rate **severity** of the effect, **occurrence** of the cause, and **detection** by current controls, each from 1 to 10.
4. Prioritise, with severity first. Don't rank only by S × O × D.
5. Act on the top risks: remove the cause if you can, catch it earlier if you can't. Then re-rate.
:::

## The vocabulary, once

People mix these up constantly, so it's worth being precise:

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

The first three steps look like admin. They're where most of the value comes from, because a clear map of the process is what lets a team see failure modes nobody had written down.

## The example: order fulfilment at a food distributor

A distributor picks, labels, packs and ships mixed food orders to shops. Some products contain allergens. The team runs a process FMEA and, among many lines, records these:

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

Rate severity for the effect, occurrence for the cause, and detection for the best current control. Rate as a team, and move on when you're within a point: the discussion is worth more than the decimals.

## The trap: ranking by RPN

The traditional way to prioritise is the risk priority number: RPN = S × O × D. Sort by RPN, work from the top. In the example, that puts the allergen line **last**.

::figure fmea-rpn | Ranked by RPN, the only failure that could hurt someone comes bottom, with 40, below a late dispatch. Multiplying three ordinal scores hides the one that matters most.

This isn't a quirk of the example. RPN has well-known flaws:

- **It treats the three factors as equal.** A severity of 10 counts no more than an occurrence of 10. But a rare catastrophe and a frequent nuisance are not the same risk.
- **The scores are rankings, not measurements.** A detection of 6 isn't "twice as bad" as a 3. Multiplying them produces a number with no real meaning.
- **Very different risks get the same RPN.** 10 × 2 × 2 and 2 × 5 × 4 both give 40.
- **It invites gaming.** Teams learn that lowering any factor lowers the RPN, and choose the easiest one, often detection.

Reliability researchers have pointed this out for over twenty years. One well-cited review called RPN prioritisation seriously flawed from a technical perspective.

## Action priority: severity first

The AIAG and VDA handbook replaced RPN with **action priority (AP)**: a lookup table that sorts every combination of S, O and D into high, medium or low priority. The logic behind it is what matters:

1. **Severity comes first.** A high-severity effect is high priority unless you can show that occurrence is genuinely very low *and* detection is very reliable.
2. **Occurrence comes second.** Preventing the cause beats catching the failure.
3. **Detection comes last.** An inspection is the weakest control, because it relies on catching problems rather than stopping them.

In the example, the team asked the question action priority forces: is the allergen line's low occurrence and detection actually proven? It wasn't. The scan at packing only works if every carton is scanned, and night shift sometimes skipped it under pressure. With one failure able to harm a consumer, the team made it the first action, followed by the wrong pick and the damaged shipments. A severity of 9 or 10 should always get a deliberate decision, never a quiet place at the bottom of a sorted list.

## Optimisation: the actions

Good actions follow the same order as the logic: remove the cause, then prevent it, then detect it.

| Failure mode | Action | Owner and date | New S / O / D |
| --- | --- | --- | --- |
| Allergen product in the wrong carton | Store allergen products in a separate zone; the scanner blocks packing if an allergen item goes into a non-allergen order | Warehouse manager, end of Q1 | 10 / 1 / 1 |
| Wrong item picked | Scan-to-pick on every line; separate look-alike items | Operations lead, end of Q2 | 5 / 3 / 2 |
| Damaged in transit | Palletising standard with a photo check; stretch-wrap settings fixed | Shipping supervisor, next month | 6 / 2 / 4 |

Notice that severity rarely changes. It's a property of the effect. What you can change is how often the cause happens and how early it's caught. The best actions are mistake-proofing (*poka-yoke*): designs that make the error impossible, like the scanner that won't let an allergen item into the wrong carton.

## Mistakes that turn FMEA into paperwork

1. **Doing it alone.** One engineer filling in a template misses most of the failure modes. The people who do the work know where it breaks.
2. **Doing it once.** An FMEA should change whenever the process does, and whenever a failure happens that it didn't predict.
3. **Arguing about scores.** Agree within a point and move on. The ranking matters, not the precision.
4. **Actions without owners and dates.** "Improve training" isn't an action. "New pick-path training for night shift, owned by Ana, by 15 March" is.
5. **Stopping at detection.** Adding an inspection feels like progress, but prevention is almost always cheaper over the life of the process.

## Where FMEA fits

FMEA is a forward-looking tool. It pairs naturally with the backward-looking ones: when something does fail, a root cause analysis should feed back into the FMEA, and the control plan from a [DMAIC project](/notes/dmaic-step-by-step/) should cover its highest risks. Used together, they turn "that should never have happened" into "we'd already planned for that".

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
