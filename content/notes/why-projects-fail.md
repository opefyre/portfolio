---
title: Why projects fail: the warning signs a status report can hide
date: 2026-10-19
updated: 2026-10-23
summary: Learn how weak scope, untested assumptions and missing dependencies undermine projects. Compare practical checks with two National Audit Office case studies.
seoTitle: Why projects fail: warning signs and real cases
seoDescription: Learn how weak scope, untested assumptions and missing dependencies undermine projects. Compare practical checks with two National Audit Office case studies.
status: published
topic: Project management
keywords: why projects fail, project failure causes, project warning signs, IT project failure
---

The status report is green. The supplier has completed its build. Training is booked. Nobody has run a real order through the connected system.

The team can be busy and close to its activity targets while still being far from a usable result.

**Projects fail when they cannot deliver an acceptable result within the commitments that matter, or when the result does not produce the intended benefit.** Those are different failures. A missed date, rejected handover and disappointing business outcome need different evidence.

The review needs to establish which commitment is in trouble, what evidence is missing and who can decide the response. A headline failure rate cannot answer those questions for this project.

## Test what “nearly finished” means

Take a fictional order-status portal. The supplier's code is complete, but it has not connected to the current order records. The service team has not accepted the exception route. Training uses screenshots from an older version.

Calling the build 95% complete would leave most of those facts hidden. Ask for accepted outputs instead: a tested connection, a correct customer view, an agreed response to missing data and support that can recover a failed update.

The [requirements traceability example](/notes/requirements-traceability-matrix-example/) connects each requirement to its test and evidence. It helps distinguish work performed from a requirement met.

::figure paa-project-warning | Fictional portal review. Each warning leads to a check and a decision. These are prompts for investigation, not a prediction of failure.

## Bring the disagreement into the plan

| Warning sign | Check before accepting the report | Decision it may need |
| --- | --- | --- |
| “Everyone agrees on scope” but requests keep appearing | Compare requirements and exclusions with approved changes | Authorise, defer or reject the extra work |
| The finish date stays fixed while work grows | Recalculate remaining dependencies and confirmed capacity | Change resources, scope or the commitment |
| A test has no named owner | Ask who supplies data, executes it and accepts the result | Assign the work and a review deadline |
| A supplier is paid for build progress | Compare the payment milestone with usable, tested outputs | Apply contract controls and resolve the acceptance gap |
| The benefit belongs to “the business” | Name the operating owner and the follow-up measure | Fund adoption and benefit verification |

A pending decision can hold up dependent work, so record its owner and the date it is needed. The [stage-gate guide](/notes/stage-gate-review-example/) helps make a review a decision about evidence rather than another presentation.

[Earned value](/notes/earned-value-management-explained/) can reveal cost and progress differences against a baseline. Its result still depends on what the measurement calls completed. It does not repair a weak acceptance definition.

## Two documented cases show different parts of the problem

In its [2013 review of Universal Credit's early progress](https://www.nao.org.uk/reports/universal-credit-early-progress-2/), the UK National Audit Office found an overambitious timetable and scope, inadequate progress measures and weak controls. The department could not assess the value of systems it had developed. That was an early implementation assessment, not a verdict on every later outcome of the programme.

The lesson for the portal review is specific: a delivery claim needs evidence of how the complete service works, not just spending or development activity.

The NAO's [2019 Completing Crossrail report](https://www.nao.org.uk/reports/crossrail/) identified a compressed schedule, the absence of a realistic plan and other delivery choices that drove unnecessary cost. At that point, it explicitly did not conclude on the programme's eventual overall value for money.

That case makes a different check useful: does the finish plan include the remaining integration and readiness work, with a sequence that can actually happen?

| Audit | Finding useful for this review | Limit |
| --- | --- | --- |
| Universal Credit, early progress, 2013 | Unreliable progress information and controls can obscure the state of delivery | One early programme assessment, not a failure rate for IT projects |
| Completing Crossrail, 2019 | A compressed commitment does not create a realistic completion plan | An assessment at that date, not the final value of the railway |

Both cases give the portal team something specific to check: whether the reported progress reflects accepted work, and whether the remaining plan is feasible.

## Respond while there are still choices

For the portal, the sponsor can require an end-to-end trial before expanding deployment. The team can freeze optional features, confirm the test environment and give the service desk time to accept the support route.

Those actions follow from the gaps found. Adding a generic “risk of delay” line or sending more reports would leave the missing tests unchanged.

[Scope change control](/notes/scope-creep-change-control/) records what a new request changes. If the project is already late, the [recovery example](/notes/recover-delayed-project/) rebuilds the remaining plan and compares the choices.

At the next status meeting, choose one claimed deliverable and inspect its acceptance evidence. Assign any missing dependency to an owner, with a decision date that leaves time to complete the affected work.

## Sources and example notes

- [NAO: Universal Credit, early progress](https://www.nao.org.uk/reports/universal-credit-early-progress-2/), 2013.
- [NAO: Completing Crossrail](https://www.nao.org.uk/reports/crossrail/), 2019.
- [GAO: Schedule Assessment Guide](https://www.gao.gov/products/gao-16-89g), 2015, reliable schedules and the cost implications of delay.

The portal is fictional. The NAO cases concern separate programmes and the findings at the dates shown.
