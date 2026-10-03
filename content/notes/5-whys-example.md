---
title: 5 Whys example: finding a cause you can test
date: 2026-10-03
summary: The team finishes its 5 Whys, retrains the operators, and the failure returns. A manufacturing example of checking the evidence, choosing a corrective action and testing whether it worked. Includes an Excel worksheet.
status: published
topic: Operational excellence
keywords: 5 whys example, 5 whys manufacturing example, 5 whys template Excel, root cause analysis evidence, corrective action, recurring failures
---

A packaging line keeps stopping at the infeed. The team completes a 5 Whys sheet, arrives at "the operator didn't set it correctly", and arranges retraining. Everyone signs the action off.

The stops return on the next shift.

The sheet was complete. The explanation was still untested. A sequence of plausible answers can look convincing even when nobody has checked the links between them.

This note works through a fictional investigation. The point is to make the cause specific enough to test, so the action follows from evidence rather than from whoever speaks first in the meeting.

## Start with the failure you can describe

The [5 Whys method](https://asq.org/quality-resources/five-whys) asks why a problem occurred, then questions each answer until the explanation becomes useful. ASQ notes that this can take fewer or more than five questions. Five is not a required finishing point.

Before asking why, make the problem clear. "The line is unreliable" leaves too much room for people to bring their favourite explanation.

For our fictional example, the team records this:

> Line 2 recorded 18 infeed detection stops over six comparable 7.5-hour production shifts, all while running the small carton format. The large carton format did not show the same stop pattern in the records reviewed. Each stop required the infeed to be cleared and restarted.

That statement names the line, event, product condition and observation period. It separates the problem from a proposed cause. It also gives the team somewhere to look: what changes when the small format runs?

The stop count alone cannot answer that. It guides the investigation.

## Check the first explanation before extending it

The original sheet runs from missed detection to incorrect setup, then to insufficient training. It may turn out to be right. At this point, though, the team has not observed the setup error or shown that training would prevent it.

They review the event log with operators and maintenance, watch the changeover, and inspect the detection point. Three explanations are worth checking.

| Proposed explanation | Check in the fictional investigation | What the check shows |
| --- | --- | --- |
| The sensor lens is dirty | Inspect and clean the lens, then repeat the small-format trial | The missed detections remain during the trial |
| The wrong sensor setting is loaded | Compare the loaded setting with the approved setup record | The setting matches; no mismatch is found |
| The carton position changes relative to the beam | Observe the guide during the trial and measure its position | The guide moves laterally and some cartons pass outside the beam |

The first two checks weaken those explanations under the conditions tested. They do not prove that contamination or a wrong setting could never cause another stop.

The third observation is more useful because it connects a physical change to the failure. Now the team has a reason to ask why the guide moves.

## Build a why chain with evidence beside it

They check the guide's locating arrangement. The small-format setting has no positive locating stop. Its position depends on a mark and a clamp, and the guide can move after the initial setup check.

Here is the resulting chain. All observations and records in it are fictional.

| Question | Working explanation | Evidence or check |
| --- | --- | --- |
| Why did the line stop? | Cartons passed the detection point without triggering the sensor | Event timestamps align with observed missed detections |
| Why were they not detected? | Some cartons passed outside the sensing beam | Direct observation during the small-format trial |
| Why did the carton path shift? | The side guide moved laterally after setup | Position measurements before and after the trial |
| Why could the guide move? | The small-format position relied on a mark and clamp without a positive locating stop | Inspection of the guide and its fixing arrangement |
| Why did setup approval miss this? | The acceptance check covered the first cartons, but did not check position retention through a run | Review of the setup check and approval record |

The last answer explains a weakness in the check. It is not a licence to keep asking why until the sheet accuses management of something vague.

There are two useful pieces of work here: prevent the movement, and improve the check that allowed it to go unnoticed. They have different evidence and different actions.

::figure five-whys-evidence | Fictional investigation. The observed guide movement supports a physical countermeasure. The missing retention check calls for a separate change to setup approval. Neither conclusion follows from the words "operator error" alone.

If the evidence points down two paths, draw two paths. A single vertical chain should not force a problem with several contributing causes into one answer. The [Institute for Healthcare Improvement](https://www.ihi.org/library/tools/5-whys-finding-root-cause) also recognises that a problem can have more than one root cause.

## Choose an action that changes the mechanism

Retraining is easy to record. The question is whether it can prevent the guide from moving after an operator has set it correctly.

For this example, the team proposes a positive locating stop for the small format and an updated setup check that tests position retention. Engineering needs to confirm that the change fits the equipment and can be installed safely. Operators should help make the check usable during a real changeover.

Write the action as a change someone can carry out and verify:

| Action | Proposed owner | What must be checked |
| --- | --- | --- |
| Install and validate the locating stop | Engineering | The guide stays in the required position through the agreed run conditions |
| Update the small-format setup check | Production and quality | The check includes position retention, with an explicit acceptance criterion |
| Review detections after the change | Production | The same event definition and comparable operating exposure are used |

If the guide still moves, the physical fix has failed. If the guide stays put and missed detections continue, the explanation is incomplete. Both are useful results because they tell the team what to investigate next.

## Decide what would count as improvement

The baseline is 18 stops in 45 operating hours on the small format. That is 0.40 stops per operating hour. Comparing it with one quiet hour after the change would be weak evidence.

:::formula Compare the same exposure
Baseline exposure: 6 shifts × 7.5 operating hours = 45 hours
Baseline rate: 18 stops ÷ 45 hours = **0.40 stops per hour**
Review rate: stops after the change ÷ comparable operating hours
:::

For the next review, record the product format, operating hours, speed, material conditions and event definition. Cover enough changeovers and running time to test the conditions implicated in the failure. Watch the guide position as well as the stop count.

Suppose there is one stop in the next 45 comparable hours. The observed rate would be 0.022 stops per hour, roughly 94% below the baseline. That would justify looking closely at the remaining event and continuing the review. It would not establish that the fault can never return.

Those follow-up figures are a hypothetical result, not a claimed outcome. The worksheet leaves the actual post-change result blank for the user to enter.

:::link /notes/5-whys-example/cause-investigation.xlsx | Download the cause investigation worksheet
A completed fictional example and a blank investigation record, with evidence, competing explanations, actions and an exposure-based follow-up calculation.
:::

## Use 5 Whys when the investigation fits

The method helps here because the failure is specific and the team can observe the mechanism. Its simplicity makes it easy to use at the line.

When causes branch, conditions interact or the consequences require a more formal investigation, add the methods and expertise the problem needs. A cause-and-effect diagram can organise candidate explanations. A controlled test can distinguish them. Completing five boxes does neither by itself.

The useful habit is to keep three things separate: what the team observed, what it thinks caused the event, and what test could change its mind. Do that before asking for an action owner.

:::link /notes/did-it-hold/ | Check the result after the change
Once a countermeasure is in place, review whether the improvement holds under normal operating conditions.
:::

The next time a 5 Whys ends with "retrain the operator", ask what was observed and how the action would prevent the failure. Training may be exactly what is needed. It should earn its place in the explanation.

## Sources

- ASQ. [Five Whys and Five Hows](https://asq.org/quality-resources/five-whys). The questioning method, use with other tools and flexible question count.
- Institute for Healthcare Improvement. [5 Whys: Finding the Root Cause](https://www.ihi.org/library/tools/5-whys-finding-root-cause). Use of the method and recognition of multiple causes.

The line, stop history, observations, proposed actions and hypothetical follow-up are fictional. The evidence fields and review procedure are a proposed working practice, not a claim that a completed worksheet proves causation.
