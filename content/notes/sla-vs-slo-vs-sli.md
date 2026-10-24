---
title: SLA vs SLO vs SLI: service agreements, targets and measures
date: 2026-10-24
summary: The system recovers at 11:00, but verified warehouse service resumes at 11:45. Define what the measure counts before judging the target or the agreement.
seoTitle: SLA vs SLO vs SLI: measure the service
seoDescription: Understand SLA, SLO and SLI through a warehouse outage. Compare service measures, targets and agreements, then calculate what 99.99% availability allows.
status: published
topic: Digital transformation
keywords: SLA vs SLO vs SLI, 99.99 SLA meaning, service level objective, service level indicator, four hour SLA, response vs resolution
---

An SLI is a service level indicator: the measure of service users receive. An SLO is a service level objective: the target for that measure.

An SLA is a service level agreement: the agreed commitment and what happens if the service falls short.

[Google's SRE guidance](https://sre.google/sre-book/service-level-objectives/) separates these meanings. A target such as 99.99% tells us very little until we know what counts, over which window and under which agreement.

The warehouse outage in the [continuity and recovery Note](/notes/business-continuity-vs-disaster-recovery/) shows why that definition can change the result.

## Start with when the service becomes usable

In the fictional example, the warehouse loses primary-site access at 08:00. Staff begin an approved, restricted fallback at 08:15. Technical recovery finishes at 11:00, and normal digital processing resumes at 11:45 after reconciliation and checks.

The recovery objective is four hours, ending at 12:00. That is an RTO, or recovery time objective. It does not also create a four-hour support-response SLA.

::figure r4-service-clock | Existing fictional outage on one local clock. Technical recovery at 11:00 and verified normal digital processing at 11:45 mark different events. The restricted fallback starts at 08:15. No monthly availability result or contractual service credit is inferred.

If the measure concerns technical recovery, the elapsed time is three hours. If it concerns return to verified normal digital processing, it is three hours and forty-five minutes. The fallback provides restricted service during part of that period.

Name the service boundary before calling all of that time either fully available or fully unavailable.

## Compare the indicator, objective and agreement

| Term | What the team defines | Applied to this outage |
| --- | --- | --- |
| SLI | Measurement, event boundary and method | Elapsed time from access loss to verified normal digital processing |
| SLO | Target on the defined indicator | A recovery objective can use that indicator, if agreed with the operating owner |
| SLA | Commitment, measurement terms and consequences | Any agreed recovery or support commitment must specify its clock and what follows a miss |

An SLA can refer to one or more SLOs. A team can also use internal objectives without a contractual SLA. Keep the agreement's actual wording beside the operational measure.

The [handover Note](/notes/project-handover-checklist/) connects those definitions to named support, checks and ownership after release.

## Calculate what 99.99% availability allows

For a time-based measure, define availability as eligible usable minutes divided by all eligible minutes in the measurement window. If the stated window is thirty full twenty-four-hour days, it contains 43,200 minutes.

:::formula Thirty-day time-based illustration
Unavailability allowance = (1 − 0.9999) × 43,200 minutes
Unavailability allowance = 4.32 minutes
:::

That is four minutes and 19.2 seconds. A different month length or eligible service window changes the allowance. Planned-maintenance treatment and exclusions also need agreement.

This calculation does not turn the warehouse's one outage into a measured monthly availability result. We have not supplied a complete month of eligible service observations.

A request-based SLI uses a different denominator, such as successful eligible requests divided by all eligible requests. [Google discusses both time and request-based measures](https://sre.google/sre-book/service-level-objectives/). Their percentages are not automatically interchangeable.

## A four-hour SLA needs a named finishing event

A provider might commit to acknowledging an incident, beginning a response or restoring the service. Those commitments stop their clocks at different events.

For the warehouse, a reply saying someone is investigating would not establish that staff can resume verified processing. A promise written only as “four-hour SLA” leaves that distinction unresolved.

| Definition to record | Why the support team needs it |
| --- | --- |
| Clock start | Detection, ticket creation or another agreed event |
| Clock finish | Acknowledgement, response, workaround or restored usable service |
| Eligible hours | Continuous time or a named business-hours calendar |
| Severity and escalation | Agreed impact criteria and who can change the priority |
| Evidence and consequence | Timestamps, review owner and the agreed handling of a miss |

P0, P1, P2 and other priority labels have no universal response hours. Define the impact and commitment for the actual service instead of copying another provider's table.

## Set the target around the operating consequence

The warehouse needs a support route that can protect the work at the times it runs. A target chosen from a generic availability table can miss a time-critical dispatch period or the effect of restricted fallback operation.

Ask the operating owner what service must remain possible, then agree how to measure it and which recovery capability supports the target. Keep the commitment within what the support arrangement can actually deliver.

For the next service review, put the clock start, clock finish, eligible window, owner and consequence beside each target. In this outage, retain both 11:00 and 11:45 so the team can explain technical recovery and usable service separately.

## Sources and calculation notes

- [Google SRE: service level objectives](https://sre.google/sre-book/service-level-objectives/), SLI, SLO and SLA definitions, measurement windows and time/request availability.
- [The existing continuity and recovery example](/notes/business-continuity-vs-disaster-recovery/), fictional outage and fallback timestamps, four-hour RTO and reconciliation boundary.

The 99.99% calculation is arithmetic for a stated thirty-day, time-based window, with every minute eligible. It is not a contract interpretation or an estimate of this warehouse's monthly availability. The original example supplies no SLA penalty or service-credit terms.
