---
title: PDCA cycle explained: test a change before you spread it
date: 2026-10-14
summary: An approval process gets faster, but more requests come back with errors. Follow one small trial through Plan, Do, Check and Act to decide what should happen next.
seoTitle: PDCA cycle explained with a worked example
seoDescription: Learn the four steps of PDCA through an approval-routing example. Compare speed and errors, inspect the trial results and decide what to change next.
status: published
topic: Operational excellence
keywords: PDCA cycle, PDCA example, Plan Do Check Act, PDCA vs PDSA, continuous improvement
---

The team changes how purchase requests reach an approver. Two weeks later, the average approval time has fallen. It looks ready to roll out.

Then someone checks how many requests came back for correction. That number has gone up.

**PDCA means Plan, Do, Check, Act.** It is a repeating approach to improving a process: plan a change, try it on a small scale, review what happened and use that learning to decide the next move. [ASQ's explanation](https://asq.org/quality-resources/pdca-cycle) makes room for another attempt when the first change doesn't work.

The four steps help with a problem like this because the decision comes after the trial. Getting the new routing rule into use is only part of the work.

## Plan: say what should improve, and what must stay safe

Take a fictional purchasing team handling routine requests below €2,000. Requests wait in a shared inbox until someone routes them to an approver. The team thinks that handoff adds delay.

It proposes assigning the approver as soon as a complete request arrives. Financial approval limits and required checks stay in place. Urgent purchases, new suppliers and higher-value requests remain outside the trial.

Before changing anything, the team writes down its prediction: average elapsed approval time should fall from 24 hours to 18 hours or less, without increasing the share returned for correction above 5%.

Those are fictional trial criteria, not recommended targets for every purchasing process. A safety or compliance failure would stop this trial regardless of the average time.

| Stage | What the team needs here |
| --- | --- |
| Plan | A suspected source of delay, a routing change, a prediction and limits |
| Do | A small trial with recorded times, corrections and exceptions |
| Check | A comparison with the prediction, including what got worse |
| Act | A decision to revise, extend or stop the trial, with an owner |

The prediction makes the later review specific. “Improve approvals” could mean faster decisions, fewer errors or less staff effort. Here, the team has chosen speed while protecting request quality.

## Do: try the routing change where you can see it

The team tests one purchasing group for two weeks. An administrator checks that the request is complete and assigns the correct approver. It records any routing overrides and keeps a way to return to the previous method.

For each eligible request, the clock starts when the complete request arrives and stops at the final approval decision. It includes any correction loop. A returned request counts once in the correction rate, even if it comes back twice.

In a real trial, keep open requests visible too. Reporting only completed requests can make a process look faster while the difficult cases remain waiting. Our teaching example assumes every included request has reached a final decision by the review.

The team also notes workload, request value and approver availability. A quiet fortnight or an unusually simple mix could explain some of the change. The records should help it notice that before expanding the trial.

## Check: compare the result with the whole prediction

The baseline contains 100 requests, 2,400 total elapsed approval hours and five requests returned for correction. The trial contains 120 requests and 1,920 total hours, with 12 returned.

These hours are added across requests, including time spent waiting. They are not staff labour hours or hours for which the department was closed.

:::formula Compare the two periods
Baseline average: 2,400 hours ÷ 100 requests = 24 hours/request
Trial average: 1,920 hours ÷ 120 requests = 16 hours/request
Baseline correction rate: 5 ÷ 100 × 100 = 5%
Trial correction rate: 12 ÷ 120 × 100 = 10%
:::

Average time fell by one third. The correction rate doubled. Because the periods contain different numbers of requests, comparing the raw counts alone would miss part of the picture.

Inspect the two possible trial results below. The alternative keeps the same volume and approval time, but changes how many requests needed correction.

::interactive pdca-trial | Fictional teaching results, not an observed business improvement. The two trial outcomes are alternatives, not successive rounds. Criteria were chosen before the trial: at most 18 hours/request and at most 5% returned. Meeting them supports further testing; it does not establish causation or approve a full rollout.

In the first outcome, the speed prediction holds and the quality condition fails. The team should examine the returned requests. Perhaps assigning an approver earlier exposed a missing ownership rule. Perhaps the completeness check became rushed. The totals identify a problem to investigate; they don't settle which explanation is right.

The [5 Whys example](/notes/5-whys-example/) shows how to check an explanation against the actual sequence of events before choosing another change.

## Act: use what you found

For the first outcome, the team pauses expansion. It reviews the 12 returned requests, clarifies the rule that caused the corrections and plans another small trial. The next cycle has a reason to exist.

In the alternative outcome, six of 120 requests need correction. That is 5%, matching the baseline condition, while average time is still 16 hours. Both numerical criteria are met.

The next move could be a trial on another shift or a longer observation period. Check the slowest requests and the workload as well as the average. The result is encouraging, but one before-and-after comparison hasn't isolated the routing rule's effect.

Once the method has enough support to become standard, name the process owner, update the instructions and agree when to review it again. [Standard work and SOPs](/notes/standard-work-vs-sop/) explain how to make that working method clear. [Did the improvement hold?](/notes/did-it-hold/) follows it beyond the launch date.

## PDCA, PDSA and DMAIC

You may also see **PDSA**, with Study in place of Check. The [Deming Institute](https://deming.org/explore/pdsa/) explains why Deming emphasised comparing a result with a prediction to develop knowledge. The terms have related histories, but calling them interchangeable hides that emphasis.

Whichever approach your organisation uses, the review needs more than a completed-task count. In our example, it needs the approval times, correction rates and a look at why the change produced those results.

**DMAIC** means Define, Measure, Analyze, Improve and Control. The [DMAIC walkthrough](/notes/dmaic-step-by-step/) provides a fuller structure for investigating a process problem. A small PDCA trial can help test a proposed change within wider improvement work.

For another application, [Vrolen's PDCA guide](https://vrolen.com/blog/pdca-cycle/) uses a production-flow example.

:::link https://www.youtube.com/watch?v=p5687M5EoGM | Watch Vrolen's PDCA walkthrough
A short explanation of planning a test, comparing results and deciding what to do next. It uses a separate example; the approval figures in this article belong to the trial above.
:::

For your next change, write the expected result and the conditions that would make you reconsider it before the trial starts. At the review, put those beside the actual results. That gives the team a concrete decision to make, even when the answer is to try again.

## Sources and example notes

- [ASQ: Plan-Do-Check-Act Cycle](https://asq.org/quality-resources/pdca-cycle). The four steps and repeating a trial after learning from it.
- [The Deming Institute: PDSA Cycle](https://deming.org/explore/pdsa/). The emphasis on prediction, learning and the distinction from PDCA.

All approval records, targets and outcomes are fictional. The figure calculates averages and correction rates from the displayed totals. It does not simulate requests, estimate statistical confidence or claim a causal effect.
