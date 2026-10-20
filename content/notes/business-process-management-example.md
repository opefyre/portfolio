---
title: Business process management: meaning and a practical example
date: 2026-10-20
summary: Purchasing approves a supplier quickly. Finance and IT still have work to do before anyone can place an order. Follow the whole process, its owner and the measures that matter.
seoTitle: Business process management: meaning and example
seoDescription: Understand business process management through supplier onboarding. Define the process owner, handoffs, service measure and changes that need a shared decision.
status: published
topic: Digital transformation
keywords: business process management meaning, BPM example, process owner responsibilities, BPM vs project management, business process lifecycle
---

**Business process management**, or BPM, is the continuing work of defining, operating, measuring and improving a repeatable process. It follows the outcome across the people and systems involved.

That distinction matters when every department has completed its own task but the customer still cannot use the result.

For example, Purchasing approves a supplier in one day. Finance still needs to verify payment details. IT still needs to enable the supplier's ordering account. The buyer cannot yet place an order.

[IBM's BPM overview](https://www.ibm.com/think/topics/business-process-management) distinguishes repeatable end-to-end processes from individual tasks and one-time projects. A process-management tool may support the work; installing one does not supply the missing operating decisions.

## A business process example: make a supplier ready to use

Our fictional company defines the start as receipt of a complete onboarding request. The finish is an approved supplier record with the required payment and ordering arrangements ready for use.

That boundary excludes the earlier decision about whether to source from this supplier. The [supplier scorecard](/notes/supplier-scorecard-example/) later examines actual performance. Onboarding is the work between selection and being ready to transact.

One request moves through the following route:

| Step | Responsible team | Result for this request |
| --- | --- | --- |
| Approve the commercial setup | Purchasing | Completed on working day 1 |
| Verify payment details under the required controls | Finance | Completed on working day 3 |
| Enable and check the ordering account | IT and Purchasing | Ready for use on working day 6 |

All three results matter. The end-to-end time is six working days under this example's start/finish convention. A one-day purchasing result does not establish a one-day onboarding service.

::figure paa2-bpm-handoffs | Fictional supplier-onboarding route. Purchasing finishes on day 1, Finance on day 3 and the ordering account is ready on day 6. The process ends at readiness to transact, not at the first department's approval. Days are elapsed working-day positions, not staff effort.

## What does a process owner do?

A **process owner is accountable for the agreed process outcome and the decisions needed to keep that process working**. The role needs a clear boundary, authority and support from the teams involved.

For this example, the procurement operations lead owns supplier readiness. Finance retains authority over payment verification. IT retains responsibility for access and technical controls. The owner cannot waive either just to reduce the reported lead time.

The owner brings unresolved handoffs to the right decision-makers, agrees the service definition and follows recurring problems. A [RACI matrix](/notes/raci-matrix-guide/) can clarify individual activities, but the process still needs someone to follow the outcome across the columns.

A Product Owner has a different role in a product team, including ordering the backlog. A project manager has responsibility for delivering a bounded change. Similar job titles should not hide which continuing service each person actually owns.

## Measure the complete service and the work still waiting

Suppose the agreed service is readiness within five working days of a complete request. Twenty requests are due against that rule in the review period. Sixteen were ready on time, two were completed late and two remain unresolved after their deadline.

:::formula Readiness against the agreed service
On-time readiness = 16 ÷ 20 = 80%
Late or still overdue = 4 requests, kept visible in the same due population
:::

Dropping the two open requests would improve the displayed percentage without helping either supplier. Keep their age, missing evidence and responsible follow-up visible.

Also inspect where the delay occurs. A completed-request average can hide the work still stuck between teams. Time waiting for a bank verification and time waiting for an available IT administrator may need different responses.

The [process-mapping and mining comparison](/notes/process-mining-vs-process-mapping/) explains how to see the route and actual event history. A map is useful evidence for managing the process; it is not the management arrangement itself.

## Use the lifecycle to change one part of the work

IBM describes a lifecycle of design, modelling, execution, monitoring and improvement. Applied here, the team first agrees what readiness means, maps the route, tries a revised method and checks the result.

Suppose IT repeatedly receives a request without an approved supplier identifier. The proposed change is to create that identifier before the IT handoff and make its presence visible. The trial needs to check that the identifier is correct and accepted, not merely that a required field is nonblank.

Measure end-to-end readiness and exceptions after the change. A shorter IT queue accompanied by more wrong accounts would fail the purpose of the work.

The [continuous-improvement example](/notes/continuous-improvement-explained/) shows how to test and sustain a small change. BPM keeps that method connected to the wider process and its continuing ownership.

## Keep process ownership after the project closes

A project might introduce the onboarding workflow, train the teams and hand it over. Requests will continue to arrive after the project manager leaves.

Agree who maintains the definitions, manages overdue work, reviews access and approves later changes. The [project-handover example](/notes/project-handover-checklist/) makes that transfer explicit.

This is why BPM remains relevant even when a workflow is automated. A system can route a request quickly while the decision, control or source information it needs remains unresolved.

For this company, begin with the four requests that missed the service. Follow each from the agreed start to its current state, then use that evidence to change the handoff or decision that held it. Keep the person who owns supplier readiness involved after the fix is released.

## Sources and example notes

- [IBM: Business process management](https://www.ibm.com/think/topics/business-process-management), repeatable end-to-end process scope, distinction from project work and one lifecycle model.

The organisation, roles, working-day positions and request counts are fictional. The owner and authority arrangement is an illustrative operating choice. The 80% measures readiness against a stated rule, not a universal BPM benchmark or a measured improvement result.
