---
title: Business continuity vs disaster recovery: a warehouse example
date: 2026-10-20
summary: The stock system returns, but dispatch records still need reconciliation. Follow the outage, fallback work and recovery before calling the operation back to normal.
seoTitle: Business continuity vs disaster recovery: example
seoDescription: Compare business continuity and disaster recovery through a warehouse outage. Define RTO and RPO, follow fallback work and check records before normal service.
status: published
topic: Digital transformation
keywords: business continuity vs disaster recovery, BCP vs DRP, RTO vs RPO example, business continuity plan components
---

The stock system is down. Dispatch continues using the approved fallback records. Three hours later, IT restores the application at the alternate hosting site.

The screen opens. It does not yet contain everything shipped while it was unavailable.

**Business continuity concerns keeping important business work operating through a disruption. Disaster recovery concerns restoring the supporting technology and data.** Their plans must fit together: restoring a system is one part of restoring the service people depend on.

[NIST's contingency-planning guide](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-34r1.pdf) separates business-process continuity from system-focused recovery. Its federal DRP definition specifically covers recovery at an alternate site; terminology in other organisations can be broader.

## BCP, DRP and BCM in ordinary language

| Term | Meaning | In this example |
| --- | --- | --- |
| Business continuity plan (BCP) | Agreed actions to sustain priority business work during disruption | Which orders may be dispatched, by whom and with which fallback records |
| Disaster recovery plan (DRP) | Technical recovery arrangements for the affected service | Restore the stock application and data at the alternate site, then verify them |
| Business continuity management (BCM) | The continuing work of maintaining, exercising and improving continuity arrangements | Review priorities, train people, run exercises and close the gaps they reveal |

DR supports continuity, but the two are not interchangeable. A backup file cannot decide whether a customer shipment may leave. A manual dispatch process cannot rebuild a failed application.

## Follow one outage through to usable service

Our fictional warehouse loses access to its primary hosting site at 08:00. Operations activates a previously approved fallback at 08:15. It restricts dispatch to orders that can be verified under that method and records every movement.

Technical recovery at the alternate site finishes at 11:00. The operations and system owners then reconcile restored data, the last pre-outage movements and the fallback records. Normal digital processing resumes at 11:45 after their checks pass.

::figure paa3-continuity-timeline | Fictional outage on one local clock. Access is lost at 08:00, approved fallback starts at 08:15, technical recovery finishes at 11:00 and verified normal service resumes at 11:45. The four-hour recovery objective is 12:00. The last recoverable pre-outage data point is 07:50.

The fallback does not bypass product-release, access or safety controls. If an order cannot be verified, it waits or follows the agreed escalation route.

## RTO vs RPO: two different limits

**Recovery time objective (RTO)** sets how long the defined service or resource may be unavailable. **Recovery point objective (RPO)** sets the required point in the past to which data must be recoverable, often expressed as a maximum data-loss window.

For this example, the owners define the RTO as four hours to verified normal stock processing. From 08:00 to 11:45 is three hours and 45 minutes, so that agreed objective is met. Calling recovery complete at 11:00 would omit the reconciliation needed by this service definition.

The RPO is fifteen minutes. The last confirmed recoverable pre-outage data is at 07:50, ten minutes before the outage. That meets the stated window, but it does not make the ten minutes of later transactions unimportant.

The team checks independent dispatch evidence for 07:50–08:00 and the fallback records after activation. Every permitted movement during the interruption needs accounting for before the restored balance is trusted.

Objectives describe requirements. The observed recovery and recoverable point establish what happened in this exercise. A schedule saying “restore within four hours” is not evidence that the team can do it.

## Five practical parts to keep connected

For this warehouse, a short plan needs the following. They are a useful grouping for the example, not a universal five-part standard.

| Part | What must be agreed |
| --- | --- |
| Priorities and impact | Which services matter, what reduced service is acceptable and for how long |
| Activation and responsibility | Who declares the fallback, contacts others and authorises changes |
| Fallback work | Available people, records, controls, capacity and escalation |
| Recovery and return | Technical steps, reconciliation, acceptance and responsibility for restart |
| Exercises and upkeep | How the arrangement is tested and updated after findings or changes |

[Supply chain risk management](/notes/supply-chain-risk-management/) applies the same practical test to alternative supply routes: a backup must survive the disruption it is meant to cover. Here, the alternate site also needs working access, network services and the required data.

For equipment-connected systems, the [IT vs OT comparison](/notes/it-vs-ot-explained/) explains why recovery must include the physical operating state. An application restart alone may not authorise a machine restart.

Exercise the whole route. Try accessing the fallback records, recovering the service and reconciling what happened in between. Time the result and retain unresolved exceptions. The return to normal work should be a checked decision, rather than an announcement that the server is running again.

## Source and example notes

- [NIST SP 800-34 Rev. 1](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-34r1.pdf), 2010. Sections 2.2 and 3.2 cover plan relationships and recovery priorities; the guide also covers exercises and maintenance. Used as planning guidance, not a claim of compliance.

Warehouse, outage, objectives and recovery times are fictional. Recovery at an alternate site is assumed. The example does not establish a suitable fallback, RTO or RPO for another operation.
