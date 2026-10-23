---
title: Rolling-wave planning: an example as the detail changes
date: 2026-10-20
updated: 2026-10-23
summary: The first site has a detailed plan. Later sites still have planning packages. Follow a trial finding into the next wave without hiding scope, dependencies or a changed forecast.
seoTitle: Rolling-wave planning: meaning and example
seoDescription: Learn rolling-wave planning through a three-site rollout. Compare it with progressive elaboration and see how more detail can expose a later finish.
status: published
topic: Project management
keywords: rolling wave planning example, rolling wave vs progressive elaboration, planning package, progressive elaboration project management
---

**Rolling-wave planning means planning near-term work in detail while keeping later work at a higher level until there is enough information to develop it.** The later work stays in the plan. Its uncertainty stays visible too.

That can be useful when rolling out a new warehouse method. The first trial will reveal installation and support work that the team cannot yet describe confidently for every later site.

[APM's explanation](https://www.apm.org.uk/blog/utilising-rolling-wave-planning-to-meet-funding-challenges/) connects this changing level of detail with planning packages and the longer-term objectives. It is a way to decide when to add detail, not permission to leave the rest of the project unplanned.

## Rolling-wave planning example: one team, three sites

Our fictional project introduces the same approved scanning method at three sites. For this simple schedule, one critical delivery team works on the sites sequentially. Days below are working days on one calendar.

The initial forecast allows ten working days per site. Site 1 has specific activities, responsibilities and acceptance checks. Sites 2 and 3 remain planning packages with a result, estimate, owner and dependency.

| Package | Initial plan | Detail available at the start |
| --- | --- | --- |
| S1: accepted first-site pilot | Days 1–10 | Configuration, device trial, testing, training and acceptance activities |
| S2: accepted second-site rollout | Days 11–20, after S1 | Ten-day package with an owner, acceptance conditions and assumptions |
| S3: accepted third-site rollout | Days 21–30, after S2 | Ten-day package with an owner, acceptance conditions and assumptions |

The [work breakdown structure](/notes/work-breakdown-structure-example/) still covers all three deliverables. Lower detail for S2 is different from omitting it. The estimate must still be credible enough for the decision being made, with its uncertainty recorded.

## Detail the next wave before it needs to start

During day 8, the team prepares S2 in enough detail to check staffing and readiness before day 11. It does not wait until Site 2's start date to discover what that site needs.

The pilot shows that recovery after a network interruption needs two more days of configuration and validation at Site 2 than the original estimate allowed. The agreed acceptance requirement already included recovery. The team had underestimated the work needed to meet it.

For the illustration, assume that adds two working days to S2's critical sequence, with no overlap or extra capacity available. S2 now finishes on day 22. Its dependent S3 moves to days 23–32, retaining its still-unrefined ten-day estimate.

::figure paa2-rolling-wave | Fictional sequential rollout on a working-day calendar. Initial forecast: S1 days 1–10, S2 11–20, S3 21–30. Elaborating S2 reveals two additional critical working days: S2 becomes 11–22 and S3 23–32. S3 remains a planning package; its ten-day duration is still an estimate.

Show that forecast change. Adding tasks while holding every summary date fixed would make the plan more detailed and less honest.

## Rolling-wave planning vs progressive elaboration

**Progressive elaboration** is the wider practice of refining information as the team learns. It can affect requirements, design, estimates and risks. Rolling-wave planning applies that idea to the level of planning detail over time.

| Situation | What is changing? |
| --- | --- |
| A test clarifies how a recovery requirement must be implemented | The design and estimate become more specific |
| S2's package becomes assigned activities before work starts | The next wave's plan becomes more detailed |
| A stakeholder requests an additional reporting feature | The agreed scope may need a change decision |

PMI's [discussion of developing a WBS](https://www.pmi.org/learning/library/developing-elaborating-work-breakdown-structures-7241) describes elaboration alongside decomposition and change control. More knowledge and more scope are not automatically the same thing.

For S2, the recovery work belongs to an existing agreed result. The new reporting feature would need its own assessment under [scope change control](/notes/scope-creep-change-control/). Neither finding gives the team authority to alter an approved commitment without the relevant decision.

## Keep the package connected to the whole project

A later planning package needs more than a vague name. Retain its intended result, boundary, owner, cost and duration assumptions, required inputs and acceptance conditions.

Link dependencies that cross waves. Site 3 may need training material from Site 1, while both later sites may depend on a common system change. A detailed first wave should not hide those shared requirements.

Set an elaboration date before the package's work starts. Include time to obtain people, equipment and approval. Refining a plan two days before a device order is due may be too late to act on the detail.

The [cost-estimation comparison](/notes/project-estimation-techniques/) explains why an early estimate and a later bottom-up estimate can differ. Keep both with the reason for the change, rather than replacing the old number without explanation.

## Use the new detail to make a decision

For this rollout, the team should bring the revised day-32 finish to the sponsor, with the cause and any credible alternatives. The [schedule-recovery Note](/notes/recover-delayed-project/) shows how to assess recovery without assuming extra people or overlap will automatically recover time.

The next approval may retain the scope and accept the forecast, change the delivery approach or stop for more evidence. Record the decision and update the relevant plan.

Set a review date for S3 before its work begins, allowing time to resolve the requirements, people and support still covered by the planning package.

## Sources and example notes

- [APM: Utilising rolling-wave planning to meet funding challenges](https://www.apm.org.uk/blog/utilising-rolling-wave-planning-to-meet-funding-challenges/), near-term detail, planning packages and changing schedule density.
- [PMI: Developing and elaborating effective work breakdown structures](https://www.pmi.org/learning/library/developing-elaborating-work-breakdown-structures-7241), 2007 conference paper, elaboration and controlled scope development.

Sites, working-day durations and the recovery finding are fictional. The example assumes one sequential critical team and no overlap. The ten-day S3 estimate remains uncertain; the figure is not a confidence forecast.
