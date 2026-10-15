---
title: Jidoka vs andon: meanings, differences and an example
date: 2026-10-15
summary: A missing washer raises a signal. The next cycle is still possible. Follow the difference between noticing a problem and having a defined stop, help and restart response.
seoTitle: Jidoka vs andon: meaning, differences and example
seoDescription: Understand jidoka and andon through a missing-component example. Follow detection, signalling, a controlled stop, help and the evidence needed before restart.
status: published
topic: Operational excellence
keywords: jidoka explained, andon vs jidoka, jidoka example, andon system, built in quality
---

**Jidoka is the ability to detect an abnormal condition and stop work so the problem can be addressed before defective work moves on. Andon makes the operating condition visible and signals that attention is needed.** The signal is one part of the response.

A washer is missing before fastening. The station detects it and a warning light comes on. The operator calls for help, but nobody has agreed who responds or what must happen to the part.

The light has identified the problem without preventing the next cycle.

The Lean Enterprise Institute defines [jidoka](https://www.lean.org/lexicon-terms/jidoka/) around detection and stopping, and [andon](https://www.lean.org/lexicon-terms/andon/) around visible status and abnormality signals. An andon call does not always mean the entire line stops immediately.

## Jidoka vs andon: separate the principle from the signal

An operator can raise an andon call, or a detected condition can raise one automatically. A light, cord, board or digital message can tell the team where help is needed.

That signal still needs an operating response. Someone must know whether work can continue, what is held, who should arrive and what permits restart.

| Element | What it does | Missing-washer example |
| --- | --- | --- |
| Detection | Identifies a stated abnormal condition | Washer presence has not been confirmed |
| Andon | Makes the condition visible and calls attention to it | The station and condition appear on the board |
| Defined stop and containment | Prevents the stated problem from passing the control point | Fastening is blocked and the unverified unit is held |
| Response and restart | Resolves the condition and checks readiness | The team checks the washer, affected work and station before authorised restart |

A warning that someone can acknowledge is not the same as a condition that has been resolved. Resetting the display should not substitute for the required check.

## Jidoka and andon example: a missing washer

Our fictional station assembles a cover with a required washer. A presence check identifies an unconfirmed washer before fastening. Assume the check works as stated; this example focuses on what follows it.

One arrangement lights the board but has no defined hold or responder. The other connects the call to a controlled hold, a team response and a stated restart check.

::interactive jidoka-response | Fictional assembly response, shown as an event sequence with no time scale. Both start with the washer check working as described. The second prevents the stated fastening step while washer presence remains unconfirmed. The actual hold and restart controls need to suit the equipment.

In the first arrangement, the light may be perfectly visible while the next action remains unclear. Calling this an operator problem would overlook the missing rule and support.

In the second, the operator knows how to request help and keep the unit at the control point. The team lead knows the call is theirs to answer. The process owner has defined what evidence is required before work resumes.

The [poka-yoke example](/notes/poka-yoke-mistake-proofing/) looks at what a particular device can prevent or detect. Jidoka adds the wider operating question: how do detection, stopping, support and learning work together?

## Andon calls, stop rules and restart checks

Different processes need different stop behaviour. LEI's [andon explanation](https://www.lean.org/lexicon-terms/andon/) describes Toyota's fixed-position stop: a call brings help, and an unresolved problem stops the line at a predetermined position.

That stop behaviour is designed around the process. Apply the site's defined stop method and safety and quality requirements.

For our separate washer station, the stated control point is before fastening. The example doesn't require a moving-line stop. It requires a clear way to hold the affected unit and prevent that step until the condition is resolved.

Before relying on the response, walk through the abnormal case with the people who use and support the station. Check the trigger, help route, hold condition and restart authority. Include what happens when the first responder is unavailable.

## Restoring work and preventing recurrence are different jobs

Suppose the response finds an empty washer bin. Replenishing it may restore this station. The record still needs to say what was found, which work was checked and who confirmed readiness.

Then investigate why the bin ran out. A missed refill signal, a delayed supply route and an incorrect quantity require different changes. Record the empty bin as the observed condition; don't turn the first explanation into a confirmed root cause.

The [5 Whys example](/notes/5-whys-example/) helps follow that evidence. If the refill arrangement is the problem, the [Kanban note](/notes/kanban-pull-system/) explains how consumption and replenishment time connect to a repeatable supply loop.

:::link https://www.youtube.com/watch?v=rs1NfE8DNAc | Watch: investigate the cause before choosing the fix
Vrolen's 5 Whys walkthrough uses a separate root-cause example. Use it for the recurrence review, after the immediate response and required restart checks.
:::

Record when the call was acknowledged, help arrived, work was held, operation resumed and follow-up took place. Those times expose unanswered calls, long waits and recurring conditions. A single “alarm closed” timestamp hides those differences.

[Vrolen's andon guide](https://vrolen.com/blog/andon-system-manufacturing/) takes that response record further, including escalation and recurrence. More signals are only useful if the operation can act on them.

## Make calling for help part of normal work

If people expect criticism for stopping a process, a written stop rule may not be used when it matters. Leaders need to support the agreed response and make the help available.

Review the affected unit and any other work that evidence puts in scope. Verify the correction and required checks before restart. Then give the recurring problem an owner rather than asking the operator to live with the same empty bin tomorrow.

At this station, confirm that fastening stays blocked until the washer is checked. Name the responder and agree what they must verify before restart.

## Sources and example notes

- [Lean Enterprise Institute: Jidoka](https://www.lean.org/lexicon-terms/jidoka/). Detection, stopping and quality built into the process.
- [Lean Enterprise Institute: Andon](https://www.lean.org/lexicon-terms/andon/). Visible operating status, calls for help and fixed-position stopping.

The station, response roles and washer-bin finding are fictional. The example assumes a working presence check; it does not test detection performance.
