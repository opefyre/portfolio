---
title: Project handover checklist: from go-live to project closure
date: 2026-10-15
summary: The warehouse app went live on Friday. At 6am on Monday, a scanner fails and nobody knows who can restore it. Handover needs to prepare for that call.
seoTitle: Project handover checklist and closure example
seoDescription: Follow a warehouse app into operation. Use a practical handover checklist for ownership, training, access, support, open issues and project closure.
status: published
topic: Project management
keywords: project handover checklist, project closure vs handover, operational readiness, project handover example
---

**Project handover transfers the knowledge, responsibilities and capability needed to operate a project's result. Project closure formally ends the project's work and deals with its remaining obligations.** Go-live is the point a service starts being used. These can happen on different dates.

A warehouse app goes live on Friday. Tests passed and the day shift has been trained. On Monday at 6am, a scanner stops posting receipts.

The shift supervisor finds the project lead's number. The lead is away. The supplier helpdesk asks for an authorised contact, and the supervisor isn't listed.

Nobody checked whether the early shift could use the support arrangement.

## Handover, go-live and closure are different decisions

| Decision or activity | What it confirms | Evidence in this example |
| --- | --- | --- |
| Handover | Operations can take on defined responsibilities | Accepted owner, working access, training and a tested support route |
| Go-live | The approved service begins operating | Release decision, cutover checks and recovery arrangements |
| Project closure | The project can finish with obligations resolved or accepted elsewhere | Accepted outputs, reconciled commitments and owned remaining work |
| Benefits review | The change is producing its intended result | Operating measures after release |

The [stage gate review example](/notes/stage-gate-review-example/) covers authority to proceed. Handover prepares the people and service that decision depends on.

[APM's handover research](https://www.apm.org.uk/resources/find-a-resource/project-handover/12-factors-for-the-successful-handover-of-projects/) recommends planning the transfer from the start, involving end users and writing information they can use. The checklist below applies that advice to the scanner incident.

## A project handover checklist built around real work

For our fictional app, start with the Monday incident. Can the shift identify the problem, contact the right person, continue safely and restore the service?

::interactive handover-evidence-map | Fictional warehouse handover. The map follows an early-shift failure from detection to recovery and pairs each responsibility with evidence. Adapt it to the service and shifts you need to support.

Use the following checks while preparing that transfer. A file marked “complete” is weaker evidence than the receiving team showing that it can do the work.

| Check | What the receiving owner needs |
| --- | --- |
| Operating scope | Which sites, shifts, devices and processes are included |
| Ownership | Named service owner and accepted day-to-day responsibilities |
| Training | Relevant users can complete normal work and handle exceptions |
| Access | Individual accounts, approved roles and a working support route |
| Recovery | Current backup, restoration instructions and a practised recovery path |
| Open issues | Impact, workaround, owner, funding or capacity, and review date |
| Acceptance | Who accepts this scope, on what evidence and with which conditions |

Adjust the depth to the service. A small reporting tool and a production-control system need different recovery evidence. Neither benefits from a checklist whose entries nobody can explain.

## Test the support route before releasing the team

Assume the supplier covers 6am starts, but only accepts calls from two registered contacts. Registering those people, confirming their access and rehearsing a call would expose Monday's gap before release.

In the rehearsal, the supervisor records the affected device and last successful receipt. The named responder checks whether the fault is local or affects all scanners. The shift uses the agreed fallback without creating duplicate receipts.

Restoring the app is only part of recovery. The owner also reconciles queued or manually recorded movements before ordinary posting resumes. The [master vs transactional data note](/notes/master-data-vs-transactional-data/) explains why the event history must still mean the same thing afterwards.

Record what the rehearsal tested and what the fallback can handle.

## Keep open issues visible at closure

Suppose a label alignment defect remains on one supported printer. The receiving owner accepts a temporary workaround, a supplier ticket and a funded correction date. That may be acceptable under the project's agreed closure rules.

An unknown receipt-loss issue would have a different consequence. Do not treat every defect as equally minor because the project is near its finish date.

For each transferred item, get the receiving person's acceptance of the work and resources. Confirm their agreement rather than just adding their name to the closure report.

The [SIT and UAT note](/notes/sit-vs-uat/) provides the test-evidence distinction. Handover adds the ability to run and support what passed those tests.

## Close the project without losing the outcome

Reconcile contracts and spending, retain the accepted configuration and evidence, arrange the end of temporary project access, and record who has authority to close the project. Use the organisation's actual requirements for those decisions.

Keep later benefits with an operating owner and a review date. If the business case expected faster receiving, someone still needs to measure it after the project team leaves. The [benefits realisation example](/notes/benefits-realisation-automation/) follows that responsibility into operation.

Before closure, ask the early shift to demonstrate how it would handle Monday's scanner failure. The answer should work without relying on the departing project lead picking up a personal phone.

## Sources and example notes

- APM. [12 factors for the successful handover of projects](https://www.apm.org.uk/resources/find-a-resource/project-handover/12-factors-for-the-successful-handover-of-projects/), transition, user involvement and knowledge transfer.
- APM. [Project life cycles](https://www.apm.org.uk/resources/what-is-project-management/what-is-a-life-cycle/), delivery and transition in a lifecycle context.

The app, incident, supplier arrangements and acceptance examples are fictional.
