---
title: Scope creep: what one extra dashboard does to the plan
date: 2026-10-14
summary: The dashboard is a good idea. It still needs time, testing and someone to build it. Compare adding it, replacing another deliverable and saving it for the next release.
seoTitle: Scope creep and change control: a worked example
seoDescription: Learn what scope creep means through a barcode pilot. Compare adding, swapping or deferring a dashboard, with an interactive schedule and cost example.
status: published
topic: Project management
keywords: scope creep example, project change control, scope change request, scope management, change impact assessment
---

The warehouse barcode pilot is nearly ready. During a review, someone asks for a live dashboard showing picking progress.

It would help the supervisors. The team says yes, puts it on the task list and keeps the same launch date. Nobody decides what happens to the work already promised.

**Scope creep is uncontrolled growth in what a project is expected to deliver.** A new request becomes a problem when the team absorbs it without assessing and agreeing its effect on time, resources, cost or the original result.

Change control gives the team a way to evaluate that request and record a decision. A worthwhile change can be approved. The plan then needs to reflect what was approved.

## First, check what was already included

Our fictional project covers a barcode pilot in one warehouse zone. It includes working transactions, labels, trained users and a simple daily report. A live dashboard was explicitly excluded from this release.

That last detail matters. If the dashboard had been part of the agreed acceptance criteria, discovering it late would expose missing planned work. It wouldn't become optional just because the estimate omitted it.

The [project charter example](/notes/project-charter-example/) establishes the assignment and decision authority. The [work breakdown structure](/notes/work-breakdown-structure-example/) makes the deliverables easier to inspect. Use those agreed boundaries before arguing about whether a request is small.

Here, the dashboard adds a new deliverable. The manager asks the delivery specialist to estimate the build, its additional tests and the effect on the remaining pilot work.

## Four days of work need somewhere to go

There are eight working days left in this simplified plan. One delivery specialist does the remaining work in sequence, with the warehouse team available for the planned reviews.

| Remaining work | Specialist effort and duration |
| --- | ---: |
| Complete the transaction interface | 3 working days |
| Build the agreed daily report | 2 working days |
| Run pilot acceptance checks | 2 working days |
| Train users and hand over | 1 working day |
| Total | 8 working days |

The dashboard needs four more specialist-days, including its additional tests. It must be ready before the pilot acceptance checks if it is included at launch. The original two-day acceptance activity still covers the integrated pilot.

For this example, each specialist-day costs €600. The remaining baseline work therefore costs 8 × €600 = €4,800. These are fictional remaining delivery costs, not the project's full budget or an estimate for a real dashboard.

There is no spare capacity in this sequence. Changing the task list changes the finish unless something else changes too.

## Compare the responses before agreeing to one

The team has three responses worth putting beside each other.

| Response | Pilot work remaining | Finish from now | Remaining pilot cost | Consequence |
| --- | ---: | ---: | ---: | --- |
| Add the dashboard | 12 specialist-days | Working day 12 | €7,200 | Keep the daily report and add four days |
| Replace the daily report | 10 specialist-days | Working day 10 | €6,000 | Remove two days, add four; confirm the dashboard meets the reporting need |
| Defer the dashboard | 8 specialist-days | Working day 8 | €4,800 | Keep this pilot unchanged; assess and fund later work separately |

Replacing the report doesn't recover all four days. It releases two. The net addition is still two days and €1,200.

Deferring the dashboard doesn't make its cost disappear. It leaves the work outside this pilot. Someone must decide whether and when to fund it later.

Try a different dashboard estimate below. Keep the same specialist and original work so the comparison stays clear.

::interactive scope-change-options | Fictional remaining-work plan, with one delivery specialist and no overlapping activities, holidays or interruptions. The dashboard estimate includes its build and additional tests. Costs use €600 per specialist-day, excluding other project costs. Day 8 is the original target. Options are alternatives, not cumulative changes.

At a two-day estimate, replacing the two-day report preserves day 8 in this model. Adding the dashboard still pushes the finish to day 10. That difference follows from the work removed, rather than from calling the request minor.

Actual projects need dependency and resource checks. The [critical path example](/notes/critical-path-method-worked-example/) shows why extra effort on one activity doesn't always move the finish by the same amount. Our sequential example deliberately keeps that arithmetic simple.

## Put the trade-off into a short change request

A useful request gives the decision-maker enough information to choose. For this pilot, it could read as follows.

:::card Change request: live picking dashboard
**Reason.** Supervisors need to see progress during the shift, rather than waiting for the next daily report.

**Proposed change.** Replace the daily report with a dashboard. Include the report's required fields and retained history in the acceptance criteria.

**Estimated effect.** Four days added and two removed, giving ten working days remaining and €6,000 remaining specialist cost. The launch moves two working days.

**Decision needed.** The sponsor must approve the reporting substitution and revised launch. The warehouse owner must accept the reporting coverage. Funding approval follows the organisation's normal limits.
:::

The request is a proposal, not an approval. Keep the estimate, assumptions and decision with the revised plan so the next review starts from the same agreement.

[PMI's scope-creep discussion](https://www.pmi.org/learning/library/controlling-scope-creep-4614) describes how small additions can accumulate and calls for impact assessment and agreed handling of changes. The process can be brief when the impact is brief. It still needs a clear owner for the decision.

## Update the work people actually use

If the sponsor approves the substitution, remove the daily report from the current scope and add the dashboard's definition and acceptance conditions. Update the schedule, remaining cost forecast and responsibilities together.

Tell the users what has changed. Otherwise one team can expect both outputs while another works to the substituted plan. The [RACI guide](/notes/raci-matrix-guide/) helps separate who prepares the change, who approves it and who needs to know.

For iterative delivery, the same issue can appear when a new item enters a full release. Reprioritising may be appropriate, but the team still needs to know which other item leaves or which commitment changes. Agree the change process around how the team works.

If the dashboard is deferred, keep it visible for a later investment decision without leaving it on the pilot's completion checklist. The [benefits realisation note](/notes/benefits-realisation-automation/) helps separate the expected benefit from the fact that a feature was delivered.

The next time a useful request arrives, compare the revised work with the people and time available before promising a date. Then record the choice. The team can support the idea and still give an honest answer about its consequences.

## Sources and example notes

- Abramovici, A., PMI, 2000. [Controlling scope creep](https://www.pmi.org/learning/library/controlling-scope-creep-4614). Accumulating additions, impact assessment and handling agreed changes. The barcode example and all calculations here are original.

All work estimates, costs and scope decisions are fictional. The model starts today, after earlier work, and excludes spending already incurred. Its single-specialist sequence is illustrative; it does not calculate a general project network or estimate delivery risk.
