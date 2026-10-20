---
title: Project status report: a short example that supports decisions
date: 2026-10-20
summary: The build is complete, but seven days of work remain in a five-day window. Report accepted outputs, current forecasts and the decision needed before the deadline slips quietly.
seoTitle: Project status report: a short worked example
seoDescription: See a short project status report with baseline, forecast, costs and decisions. Compare activity updates with evidence of accepted work and remaining delivery.
updated: 2026-10-20
status: published
topic: Project management
keywords: project status report example, how to write project status report, status vs progress report, project reporting
---

“The portal build is complete. Training is being arranged.” That update tells the sponsor something happened. It does not tell them whether the project can finish on time.

A **project status report describes where the project stands at a stated date**, against its agreed plan, with the current forecast and any action needed. [APM's glossary](https://www.apm.org.uk/resources/glossary/) includes accomplishments and variances to spending and schedule plans in that purpose.

For a useful short report, start with the result the sponsor must understand. Put the supporting evidence and decision beside it.

## Project status report example: five days left, seven needed

Our fictional order-status portal has an approved twenty-working-day plan and a €20,000 budget. The report is prepared at the end of working day 15. The dates below all use the same project calendar.

The build is complete. Integrated validation still needs four days, followed by two days of training and one day of acceptance. Assume those activities must be sequential and the required people are available.

Seven remaining days give a day-22 finish, two working days later than the approved plan. “Build complete” has not removed that gap.

::figure paa2-status-forecast | Fictional report at the end of working day 15. The baseline finishes on day 20. Four days of validation, two of training and one of acceptance give a current day-22 forecast under the stated sequential-work assumption. No recovery has been assumed.

## A short report with the fields filled in

The following is a possible report, not a universal template.

| Field | Current report |
| --- | --- |
| Status date and scope | End of working day 15. Agreed order-status portal, including integration, training, acceptance and handover |
| Headline | Delivery decision needed: forecast finish is two working days after the approved plan |
| Baseline and forecast | Approved finish day 20; current forecast day 22; no approved change to the commitment |
| Accepted work | Build review complete. Six of ten agreed requirements have acceptance evidence; four remain open |
| Remaining delivery | Validation 4 days, training 2, acceptance 1, sequential under the current plan |
| Cost | €12,000 actual cost to date plus €11,000 remaining forecast = €23,000 forecast total, €3,000 above budget |
| Current issue | Validation has not started; its environment is now ready, but the work no longer fits the original window |
| Decision requested | Sponsor to decide by day 16 whether to accept the revised cost/date forecast or require a credible alternative for review |
| Owners and next update | Test lead confirms validation evidence; service lead owns acceptance; project manager updates the forecast after the day-16 decision |

The €11,000 is remaining cost only. It does not include costs already counted in the €12,000 actual figure. Neither number establishes cash paid or the value of the benefit delivered.

Keep the commitment and forecast separate. Updating the forecast to day 22 informs the decision; it does not automatically approve a new baseline.

## Show what is accepted, not just what was busy

Six accepted requirements out of ten is a useful evidence count. It is not necessarily 60% of the effort, value or delivery time. The four remaining requirements might contain most of the integration work.

Link the count to the [requirements and acceptance record](/notes/requirements-traceability-matrix-example/). Give the sponsor a way to inspect an important claimed result without reading a long list of meetings.

The [project-failure Note](/notes/why-projects-fail/) explains why a green build report can hide unfinished delivery. This report should expose that situation early enough to change it.

If your organisation uses red, amber and green, define the thresholds. One team's green can mean on schedule; another team's green can mean no new problem this week. A shared colour with different meanings adds confusion.

## Separate a current issue from a possible future problem

Validation not having started is a current issue. A possible defect discovered during that validation is a future risk. Both can affect the finish date, but their records and responses differ.

For this example, day 22 assumes validation takes four days and produces no additional rework beyond the stated plan. Record that assumption rather than presenting day 22 as a certainty.

The [risk vs issue example](/notes/project-risk-vs-issue/) follows that distinction. When a possible problem occurs, update the issue, remaining work and forecast together.

## Turn the update into a decision

“Please advise” is difficult to act on. The sponsor needs the choice, its consequences and a decision date.

The current request is explicit: decide by day 16 whether to accept the revised forecast or ask for an alternative with a checked delivery method. Extra staff or parallel testing may be candidates, but they have not been shown to recover the two days.

The [delayed-project example](/notes/recover-delayed-project/) examines that recovery work. Don't put an unverified improvement into the status report as though it has already saved time.

After the sponsor decides, record the decision, any authorised changes and who must act. The next report should show what changed because of it.

## Decision log example: retain what the sponsor approved

A **decision log records an agreed decision and the reason for it**, with enough context to follow its consequences. It differs from the issue log, which tracks the current problem and its resolution.

Extend this fictional case to day 16. Suppose the sponsor has authority to approve the revised budget and date, reviews the evidence and approves the change. The status report's request now needs a durable record:

| Decision D04 | Recorded outcome |
| --- | --- |
| Date, approver and state | Day 16; project sponsor; approved, with implementation assigned |
| Options considered | Approve the €23,000/day-22 plan, or require another feasible option before proceeding |
| Decision and reason | Approve the revised budget and finish. No checked alternative currently demonstrates the same accepted scope by day 20 |
| Effect on the plan | Authorise €3,000 additional budget and a two-working-day finish change; retain the previous baseline in the change history |
| Action and owner | Project manager updates the authorised plan and informs the test and service leads |
| Revisit condition | Validation finds rework beyond the four-day assumption, or the remaining forecast changes materially |

[Atlassian's decision-documentation example](https://www.atlassian.com/software/confluence/templates/decision/) includes the context, options, participants, status and outcome. A small entry linked to the evidence is enough here. The next status report should confirm that the plan was updated; approval and implementation are separate events.

## Status report vs progress report

A progress report often emphasises what happened during a period. A status report often emphasises where the project now stands and where it is heading. Organisations use the names differently; the reports can overlap.

This project needs both views. The completed build explains recent progress. The remaining seven-day sequence explains current status. Keep enough of each to support the next decision, and remove activity detail that changes none of it.

## Source and example notes

- [Atlassian: Decision documentation](https://www.atlassian.com/software/confluence/templates/decision/). Context, options, approver, status and outcome.
- [APM: Project management glossary](https://www.apm.org.uk/resources/glossary/), entries for project status report, status report and actual progress.

The project, day numbers, costs and acceptance counts are fictional. The forecast assumes sequential remaining work and available resources. It excludes additional defect rework; the initial report approves no recovery option or revised commitment. The later D04 extension states its separate approval assumption.

Decision D04 is a separate fictional extension after the report: it assumes the sponsor has the stated authority and approves the revised baseline.
