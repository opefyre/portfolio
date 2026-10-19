---
title: How to recover a delayed project without hiding the delay
date: 2026-10-19
summary: Rebuild a delayed project from verified remaining work. Compare extra resources, reduced scope and a revised date without erasing the original baseline.
seoTitle: How to recover a delayed project: a worked plan
seoDescription: Rebuild a delayed project from verified remaining work. Compare extra resources, reduced scope and a revised date without erasing the original baseline.
status: published
topic: Project management
keywords: recover delayed project, project recovery plan, project delay, schedule recovery
---

The project has eight working days left before its approved finish. The latest estimate says “about two weeks”. Someone suggests adding people and keeping the date.

Before making that promise, the team needs to know what remains and which work can happen together.

**Project recovery means agreeing and carrying out a feasible response when the current plan no longer meets the commitment.** It can involve extra resources, an authorised scope change or a revised date. Changing the baseline alone does not recover the work.

The [GAO Schedule Assessment Guide](https://www.gao.gov/products/gao-16-89g) explains why an integrated schedule needs to show the remaining route to completion and the effects of change.

## Establish the position at a status date

Our fictional system migration is reviewed at the close of 19 October 2026. Eight working days remain to the original finish. Count the next working day as day 1 in the comparison below.

The migration team confirms these remaining tasks. Durations are working days, resources are available for the stated sequence and there are no holidays or other constraints in this simplified model.

| Remaining work | Duration | Must wait for |
| --- | ---: | --- |
| Finish integration | 4 days | Status date |
| System testing | 5 days | Integration complete |
| User acceptance testing | 3 days | System testing complete |
| Training | 2 days | Integration complete; separate trainer |
| Release | 1 day | Acceptance and training complete |

With a separate trainer, training can run alongside system testing. The governing sequence is integration, system test, acceptance and release: **4 + 5 + 3 + 1 = 13 working days**. The plan is five working days beyond the remaining commitment.

That calculation is more useful than an overall percentage complete. A task marked 90% complete can still have four days of necessary work left.

## Compare changes to the remaining sequence

::figure paa-recovery-schedule | Fictional remaining schedules, starting after the status date. The dashed marker is the original finish at day 8. Training uses a separate person and fits before acceptance ends in every option. None of these options meets day 8.

The test lead considers an additional qualified tester and confirms that a separable part of system testing could reduce its duration from five to three days. The assumed additional cost is €2,400. Acceptance testing still needs three days after the system tests pass.

That produces **4 + 3 + 3 + 1 = 11 days**. More people help, but do not recover all five days.

A second option defers an optional reporting feature. If the sponsor and users approve that boundary, remaining integration falls to two days and system testing to four. The core service still needs the same three-day acceptance and one-day release.

That gives **2 + 4 + 3 + 1 = 10 days**. The deferred feature still needs a later plan, resources and funding.

| Option | Remaining finish | Beyond original finish | Decision needed |
| --- | ---: | ---: | --- |
| Keep remaining scope and resources | Day 13 | 5 working days | Accept the later commitment and its consequences |
| Add the confirmed testing help | Day 11 | 3 working days | Authorise €2,400 and secure the qualified tester |
| Defer the optional feature | Day 10 | 2 working days | Approve reduced scope and the later feature plan |

These are separate alternatives. Their estimates cannot simply be combined without reviewing dependencies, workload and test coverage again.

## Do not cut the evidence to improve the date

Skipping acceptance would shorten the drawing while leaving the migration's fitness for use unresolved. Starting user tests against an unstable version may create rework. Before overlapping tasks, confirm that the later task can use the earlier output in its current state, and allow for rework.

[Fast tracking and crashing](/notes/fast-tracking-vs-crashing/) compare those compression choices. [Resource levelling and smoothing](/notes/resource-leveling-vs-smoothing/) explain why apparent spare days may not belong to the person the delayed task needs.

Check the consequences outside the project too: customer communications, old-system support, contractual dates and the operating team's availability. A feasible build schedule can still be an unacceptable release window.

## Take a decision to the sponsor

The sponsor needs the current evidence, options, additional cost, remaining risks and the effects of waiting. The project manager recommends a feasible route within their remit; the appropriate authority approves changes to the commitment.

For our example, none of the three supported plans reaches day 8. The honest response is to decide which later date and scope the business can accept, or investigate another feasible option. Keeping day 8 would require a further change the team can support with evidence.

Keep the original baseline and the reason for revision. [Change control](/notes/scope-creep-change-control/) records the decision; the [critical-path guide](/notes/critical-path-method-worked-example/) explains the dependency calculation.

## Watch the recovered plan closely

At each update, record actual completion, revised remaining durations and unresolved decisions. Recalculate the finish when an assumption changes. Keep the operating handover and acceptance criteria visible alongside the schedule.

The causes of delay differ. In this case, the immediate recovery depends on integration and testing. Another project may be waiting for a permit, equipment or a commercial decision. Find that constraint before paying for extra people.

End the recovery review with an approved option, confirmed people and a next check. Report the forecast finish against the original commitment so the effect of the decision stays visible.

## Sources and example notes

- [GAO: Schedule Assessment Guide](https://www.gao.gov/products/gao-16-89g), 2015, dependency logic, resource realism and maintaining schedules against an approved plan.

The work, durations and costs are fictional. Durations are fixed for this comparison; the model does not estimate the likelihood of further delay. Day numbers are working-day offsets, not a full calendar schedule.
