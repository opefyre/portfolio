---
title: ERP implementation: big bang vs phased rollout
date: 2026-10-21
summary: Switching two sites together concentrates disruption. Switching them separately creates a period where old and new systems must cooperate. Compare that temporary work too.
seoTitle: ERP implementation: big bang vs phased rollout
seoDescription: Compare big bang and phased ERP rollout with a two-site example. Check temporary interfaces, stock authority, readiness, support and recovery decisions.
status: published
topic: Digital transformation
keywords: ERP implementation strategy, big bang vs phased rollout, ERP cutover, phased implementation
---

**A big-bang ERP rollout switches the agreed scope to the new system at one go-live point. A phased rollout switches defined portions at different times.** A phase might be a site, business unit or process, provided the remaining work can still operate coherently.

Phased does not automatically mean safer. It reduces the scope switched at once and adds a period in which old and new processes must work together.

For two warehouses that exchange stock daily, that temporary arrangement can be a substantial piece of the project.

## Compare two release boundaries

Our fictional company is replacing the ERP functions supporting two sites' orders and stock records. The approved end state is the same in both options. The choice is whether both sites switch in week 6, or site A switches in week 6 and site B in week 9.

| Rollout question | Both sites in week 6 | Site A in week 6, site B in week 9 |
| --- | --- | --- |
| Immediate operating scope affected | Both sites | One site at each switch |
| Old/new coexistence between sites | Limited to the agreed cutover work | Three weeks of live cross-system work |
| Support demand | Two sites need launch support together | Support A while preparing and supporting B |
| Learning before the second switch | Rehearsals and pilots only | Actual A operation, if the findings apply to B |
| Major risk to resolve | Concentrated disruption | Temporary interfaces and conflicting records |

All weeks and site arrangements are fictional. A phased plan could use a different boundary; the label does not establish which dependencies are manageable.

[Microsoft's Dynamics deployment guidance](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/implementation-strategy-define-strategy-deployment-release) discusses big-bang and phased choices, including integration, change and support.

::figure gap-rollout-calendar | Fictional release calendars. The phased option includes three weeks of deliberate coexistence, with stock authority defined separately for each site. The temporary connection is part of delivery scope.

## Follow a stock transfer through the temporary state

During the phased period, A posts its warehouse movements in the new service. B still uses the old service. A transfer leaves A for B.

The team needs one authoritative dispatch event from A, a matching in-transit record and one receipt at B. It must agree identifiers, units, timing and what happens if the transfer message fails. Re-entering the same movement in both systems without a clear rule can double the stock reduction or create a second shipment.

The [data-migration and integration note](/notes/data-migration-vs-integration/) separates the one-off movement of records from the ongoing exchanges needed while systems coexist. Both may be required here.

Add the temporary interface to the scope, reconciliation checks and retirement plan. Calling it temporary does not reduce the need to test it.

## Use readiness evidence at each go-live decision

The release owner needs a short set of evidence for the proposed boundary, including the open-order reconciliation, stock records, user roles, critical order paths and support cover. The exact thresholds should be agreed before the cutover review.

| Readiness check for this example | Evidence to bring |
| --- | --- |
| Stock and open orders agree | Reconciliation with explained differences and approval |
| A normal shipment can complete | Tested order, pick, dispatch and financial posting |
| Held stock stays blocked | Test evidence for the relevant statuses and roles |
| A transfer message fails safely | Identifiable error, controlled retry and reconciliation |
| Users and support can operate the service | Role-based practice, named cover and escalation route |

A passed demonstration of one order does not cover every important path. [SIT and UAT](/notes/sit-vs-uat/) serve different purposes; the readiness decision needs appropriate evidence from both.

## Parallel running needs a clear posting rule

Parallel operation can be useful for comparing calculations or rehearsing a result. It is not automatically a third release strategy equivalent to big bang or phased.

If users enter actual transactions twice, define which system creates the official stock, financial and customer records. A comparison copy should not send a second purchase order or invoice. Include the effort of reconciling differences and the exit condition for stopping the duplicate work.

## Plan recovery around transactions already committed

Before go-live, agree who can stop the switch and on what evidence. After shipments, invoices or external messages have been committed, restoring yesterday's database may not restore the business to a usable state.

The [business-continuity comparison](/notes/business-continuity-vs-disaster-recovery/) explains why restored technology and a functioning service are different outcomes. Rehearse the actual recovery steps and their limits.

Choose the rollout boundary the business can support through both the switch and the temporary state. Then put the readiness and support obligations into the [handover record](/notes/project-handover-checklist/). The work between go-live dates belongs in the plan as much as the dates themselves.

## Source and example notes

- [Microsoft Learn: Plan your deployment and release](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/implementation-strategy-define-strategy-deployment-release). Release scope, big bang, phasing, integration and support.

All sites, weeks and transaction scenarios are fictional. Actual rollout choices depend on service dependencies, system architecture, regulation, recovery options and available support.
