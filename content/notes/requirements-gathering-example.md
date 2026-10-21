---
title: Requirements gathering: turn a request into a testable need
date: 2026-10-21
summary: “We need a faster dashboard” names a solution before the problem is clear. Follow one dispatch request through observation, disagreement and agreed acceptance checks.
seoTitle: Requirements gathering: a worked project example
seoDescription: Turn a vague dashboard request into clear requirements. Use observation, stakeholder discussion and acceptance criteria before approving the project scope.
status: published
topic: Project management
keywords: requirements gathering, requirements elicitation, business requirements example, acceptance criteria
---

**Requirements gathering is the work of discovering, checking and agreeing what a project or product needs to achieve.** It is often called requirements elicitation because people do not arrive with a complete, consistent specification ready to collect.

A dispatch manager asks for a faster dashboard. The developer hears a page-speed problem. The shift lead wants to know which orders can actually leave. Quality wants held stock to stay blocked.

Building the first request literally could produce a quick screen that still sends the wrong order to the loading bay.

## Observe the task before agreeing the solution

In this fictional project, a business analyst watches the morning dispatch review. The shift lead opens three screens, checks a separate hold list and phones stores when the records disagree.

The issue is partly speed, but it also concerns which stock status is current and who may act on it. A workshop alone could have missed the phone calls because nobody included them in the formal process description.

[PMI's paper on project management and business analysis](https://www.pmi.org/learning/library/partnership-project-managers-business-analysts-9865) describes elicitation, analysis and validation as connected work. In this example, observation gives the workshop something specific to resolve.

## Separate the business outcome from the system behaviour

The business need is to make a reliable dispatch-readiness decision without repeatedly searching for the same evidence. The team then defines what the proposed screen must do to support that task.

| Type of need | Agreed wording for this example | How the team will check it |
| --- | --- | --- |
| Business outcome | Reduce repeated information gathering during the morning dispatch review | Observe comparable reviews before and after, including calls and rechecks |
| Functional | Show the order, selected lot, available quantity and quality-hold status together | Check agreed released, short-stock and held-lot cases |
| Performance | Open the readiness view within two seconds for at least 95 of 100 requests under the agreed test load | Record response times under that load and environment |
| Exception behaviour | When the stock-status feed is over five minutes old, show its age and prevent a readiness confirmation | Interrupt the feed and verify the displayed state and blocked action |
| Transition | Train authorised dispatch users and reconcile open orders before the switch | Review training evidence and the agreed reconciliation totals |

These thresholds are fictional decisions for this task, not standard dashboard requirements. The owner must confirm what the business can tolerate and the delivery team must assess feasibility before approval.

## Write requirements someone can interpret the same way

“The dashboard should be fast and reliable” leaves too much open. Which action? What load? How old may the information be? What should happen if it is missing?

[NASA's requirement-writing checklist](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/) prompts checks for clarity, consistency and verification.

::figure gap-requirements-chain | Fictional discovery chain: an initial screen request leads to an observed dispatch task, agreed system behaviour and a defined test. Each link retains its source and decision owner.

Keep each requirement focused enough to review. A requirement to display lot status and a requirement to block dispatch of a held lot are related, but a screen can satisfy the first and fail the second.

## Resolve disagreement before calling the requirement approved

The shift lead initially asks for a supervisor override when a feed is stale. Quality rejects a general override because the missing update could contain a new hold.

The analyst records both positions and the affected operation. The authorised decision owners agree the five-minute stop rule and a separate, documented recovery process. The disagreement does not disappear into “stakeholders aligned” in the meeting minutes.

A [stakeholder map](/notes/stakeholder-mapping-example/) helps identify whose input is missing. A [RACI matrix](/notes/raci-matrix-guide/) can clarify who approves the decision. Neither tells the team what the stale-data behaviour should be.

## Connect agreed requirements to delivery and tests

Give the approved requirements stable IDs, a source, an owner and an identifiable version. Keep open questions separate so a developer does not mistake a proposed override for an accepted rule.

:::link /notes/requirements-traceability-matrix-example/ | Follow an agreed requirement into implementation and evidence
The traceability example starts where this discovery work ends. It exposes a held-stock requirement missing from the implementation and test records.
:::

If the requirement changes later, assess the affected work and evidence through [change control](/notes/scope-creep-change-control/). Requirements will develop as the team learns. Keeping their decisions visible is more useful than pretending the first workshop found everything.

Before approving this dashboard, the team should be able to demonstrate the normal dispatch task, the held-lot case and the stale-feed response. That conversation is far clearer than asking whether everyone likes the screen.

## Sources and example notes

- [PMI: Project management and business analysis](https://www.pmi.org/learning/library/partnership-project-managers-business-analysts-9865). Elicitation, analysis and acceptance, from a conference paper rather than a statement about the latest PMBOK edition.
- [NASA: How to write a good requirement](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/). Clarity and verification checks.

All requests, observations, thresholds and project decisions are fictional. Performance and freshness tests need agreed data, load, environment and failure conditions before execution.
