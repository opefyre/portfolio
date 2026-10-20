---
title: Risk vs issue in project management: what changes when it happens?
date: 2026-10-14
summary: A supplier misses a milestone. The issue is real, but the effect on testing is still uncertain. One timeline shows what to record, what to act on and what to forecast.
seoTitle: Risk vs issue in project management: an example
seoDescription: Understand risks and issues through a missed supplier milestone. Separate confirmed events from uncertain effects, link the records and plan the response.
updated: 2026-10-20
status: published
topic: Project management
keywords: risk vs issue project management, risk register vs issue log, when risk becomes issue, project issue example, risk trigger, issue management
---

The vendor was supposed to have the test environment ready today. It isn't available. The project report still lists “possible late access” as a risk.

The wording now hides a decision. The team needs a recovery plan for a missed commitment, while it works out what that means for the rest of the schedule.

**A project risk concerns an uncertain event or condition that could affect an objective. An issue is a present condition or problem that needs to be managed.** A risk can help or hurt; here we're following a threat that becomes a confirmed problem.

[PMI's discussion of risks and issues](https://www.pmi.org/learning/library/risks-vs-issues-project-failure-2328) makes the distinction between something that may happen and something already at hand. Knowing that the event happened doesn't make every consequence certain.

## Follow one commitment through the week

A fictional manufacturer is connecting its order system to a supplier's service. The supplier commits to a usable test environment by the end of day 6. Integration testing is planned to start at the beginning of day 8.

The plan therefore has one full intervening day, day 7, before testing starts. All day numbers below are working-day markers on the same project calendar.

| Review point | What the team knows | What remains uncertain | What to do |
| --- | --- | --- | --- |
| Day 1 | Access is promised by the end of day 6 | Whether the supplier will meet it | Record the risk, owner, response and review point |
| Day 5 | The supplier hasn't confirmed readiness | Whether access will be usable by the deadline | Chase evidence and prepare the agreed fallback |
| End of day 6 | The deadline has passed and access is unavailable | When it will be usable, and whether testing will move | Open or update the issue, confirm recovery work and assess the schedule |

A warning is a reason to respond before the deadline. It doesn't prove that the specific delivery commitment has already been missed. The missing confirmation may itself need a tracked action.

At the end of day 6, there is no need to estimate the chance that this deadline was missed. It was. The remaining uncertainty concerns recovery and its effects.

## A real issue can have an uncertain impact

Suppose the environment becomes usable at the beginning of day 7. Testing can still begin on day 8, assuming the required people and test data are ready.

If access instead becomes usable on day 9, the earliest test start moves to day 9. Day 11 recovery moves it to day 11. These are alternative forecasts, not successive recovery claims.

::interactive risk-issue-recovery | Fictional supplier test-environment commitment. Access was due by the end of day 6 and is confirmed unavailable then. Testing was planned for the beginning of day 8. Recovery choices mean access is usable at the beginning of day 7, 9 or 11. Earliest test start is the later of planned start and usable access. One shared calendar, with other resources ready; no go-live impact is calculated.

The missed commitment is an issue in every case. The forecast effect on test start ranges from zero to three working days later than planned.

This is why “the vendor is two days late, so go-live is two days late” needs checking. The affected task may have room before it starts, or later activities may absorb some movement. It may also sit on a sequence that has no room left.

The [dependency types article](/notes/project-dependency-types/) explains the links between activities. The [critical path worked example](/notes/critical-path-method-worked-example/) takes the next step into the effect on the project finish. Our small calculation stops at test start.

## RAID log: connect risks, assumptions, issues and dependencies

A **RAID log** brings risks, assumptions, issues and dependencies into a connected view. That is the expansion used here and in the [UK government's Gate 1 review guidance](https://www.gov.uk/government/publications/gate-review-1-business-justification/gate-1-review-business-justification). Some teams use actions or decisions for particular letters; agree the names and record types before using the acronym.

The same need applies on an Agile project: uncertain conditions, current problems and outside commitments still need owners and follow-up. Keep the log proportionate to the work.

| Record | Entry at the end of day 6 | Owner, next check and status |
| --- | --- | --- |
| Risk R07 | Supplier might miss day 6 readiness | Integration lead: event occurred; linked to I03, not counted again as an independent threat |
| Assumption A02 | The agreed test data will work in the delivered environment | Test lead: validate during readiness checks on recovery; still unconfirmed |
| Issue I03 | Day 6 readiness missed; environment unavailable | Integration lead: obtain a supported recovery date by the next working-day review; open |
| Dependency D02 | Testing needs usable supplier access before it can start | Test lead: update the test start after recovery and readiness are confirmed; blocked |

Recovery taking longer than estimated remains a new uncertainty. Assess it separately rather than leaving the old missed deadline recorded as though it might still happen.

The [assumptions guide](/notes/project-assumptions-vs-constraints/) explains how to check A02. The dependency record can link directly to the scheduled test activity instead of maintaining a second, conflicting start date.

Keep R07 marked as having occurred, with a link to I03. Don't delete the earlier record or keep counting the same missed event as a second independent threat.

The issue needs a named owner, current status, next action, action owner and review date. “Vendor informed” records a message. It doesn't establish when the environment will be usable.

[PMI's paper on integrated risk and issue management](https://www.pmi.org/learning/library/integrated-project-risk-issue-management-6303) also separates the known situation from uncertain effects. Definitions vary between methods, so agree the terms your team will use and keep that practical distinction clear.

## Update the plan as well as the log

For I03, the integration lead needs a recovery date supported by the supplier's remaining work. The test lead needs to know whether to hold the booked team, resequence other work or request a new slot.

A proposed workaround has its own checks. Testing against a substitute environment might answer some questions while leaving supplier-specific behaviour untested. State that limit before reporting the interface as accepted.

If recovery changes an agreed milestone or needs resources beyond the project manager's authority, take the options to the decision-maker. The [scope and change-control example](/notes/scope-creep-change-control/) shows how to make that request concrete.

The [risk register guide](/notes/project-risk-register/) covers assessment before an event occurs. Once a particular event is confirmed, don't use its old probability-weighted allowance as though it were the actual recovery bill. Re-estimate the work, remaining uncertainty and funding needed.

## Close the issue against evidence

A new promised date isn't closure. For this example, closure needs evidence that the agreed environment is accessible and passes its readiness checks. Testing can then proceed under the updated plan.

Keep any later integration defect separate from the access issue. It may be related, but it describes a different condition and needs its own owner and resolution.

At the next review, ask what is known now, what still might happen and which decision is due. That keeps the current problem visible without pretending the rest of the outcome is already settled.

## Sources and example notes

- [UK government: Gate 1 review](https://www.gov.uk/government/publications/gate-review-1-business-justification/gate-1-review-business-justification), project documentation section, RAID and connected registers.
- [PMI: Risks vs. issues](https://www.pmi.org/learning/library/risks-vs-issues-project-failure-2328), PM Network, June 2012. Practitioner discussion of the distinction, registers and linking realised risks to issues.
- [PMI: Integrated project risk and issue management](https://www.pmi.org/learning/library/integrated-project-risk-issue-management-6303), 2012. Known conditions, uncertain effects and connected management of risks and issues.

The project, dates, records and recovery alternatives are fictional. The timing example assumes usable access and all other prerequisites at test start. It shows a local scheduling effect, not a forecast of go-live or a universal risk-log policy.

The RAID entries and their review arrangements extend the same fictional project.
