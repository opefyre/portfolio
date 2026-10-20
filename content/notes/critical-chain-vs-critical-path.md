---
title: Critical chain vs critical path: follow the same project
date: 2026-10-20
summary: Two tasks can run in parallel on the network, but they need the same specialist. Build a feasible sequence before deciding where shared schedule protection belongs.
seoTitle: Critical chain vs critical path: a worked example
seoDescription: Compare critical chain and critical path using the same tasks and specialist. Build a feasible schedule, add a stated buffer and track what a delay consumes.
status: published
topic: Project management
keywords: critical chain vs critical path, CCPM vs CPM, critical chain example, project buffer, resource constrained schedule
---

The network says the project can finish in six days. Two independent configuration tasks can start together.

They need the same specialist, full time. The six-day plan has promised the same person to two tasks at once.

**The critical path is the longest duration path through the activity dependencies. The critical chain also accounts for resource conflicts, then uses shared buffers to help manage uncertainty.** [PMI's critical-chain explanation](https://www.pmi.org/learning/library/critical-chain-buffer-management-risk-4828) describes buffers at the project end and where other chains feed into it.

The names are often shortened to CPM (critical path method) and CCPM (critical chain project management).

Resource-aware scheduling is not exclusive to critical chain. A CPM plan can also be resource levelled. The comparison needs to keep that distinction clear.

## Start with the same activities and resources

Our fictional rollout uses working days and finish-to-start dependencies. Each task uses its named resource for its full duration. Preparation and acceptance have separate people; configuration has one specialist.

| Task | Duration | Predecessor | Resource |
| --- | ---: | --- | --- |
| A: prepare the environment | 2 days | None | Preparation team |
| B: configure station one | 3 days | A | Specialist |
| C: configure station two | 2 days | A | The same specialist |
| D: acceptance | 1 day | B and C | Acceptance team |

The dependency paths are A–B–D, six days, and A–C–D, five. In a dependency-only calculation, B and C overlap after A.

The [CPM worked example](/notes/critical-path-method-worked-example/) explains the forward and backward passes behind that calculation.

## Resolve the person conflict before adding protection

Schedule B followed by C. A runs on days 1–2, B on 3–5, C on 6–7 and D on day 8. The same person can now do the work.

That is an eight-day resource-feasible sequence under our simple assumptions. [Resource levelling](/notes/resource-leveling-vs-smoothing/) addresses this kind of conflict even without adopting critical-chain project management.

::figure paa3-critical-chain | Fictional schedule using the same tasks, durations and one specialist. The six-day dependency-only view overlaps B and C. Resolving the conflict gives eight days of work; a separately assumed two-day project buffer protects a day-10 commitment. Buffer time is not another work activity.

In this example the resource relationship creates the sequence A–B–C–D. It does not mean B is technically required before C. Another feasible ordering could place C first.

## Add an explicit project buffer

Suppose the team chooses two working days of shared protection after D. The planned work still finishes on day 8. The protected commitment is day 10.

Two days is an assumption for this illustration, not a recommended percentage. The example does not shorten any task estimates or prove that two days is sufficient.

| State | Forecast work finish | Finish commitment | Protection remaining |
| --- | ---: | ---: | ---: |
| Initial feasible plan | Day 8 | Day 10 | 2 days |
| One-day net overrun on the chain | Day 9 | Day 10 | 1 day |
| Three-day net overrun on the chain | Day 11 | Day 10 | None; forecast is 1 day late |

The one-day overrun consumes half the initial buffer. That percentage alone is not enough to choose an action. Check how much work remains, why the delay occurred and what resources the remaining sequence needs.

A feeding buffer protects a joining point from delays on a separate path. This small, serialised example has no remaining separate feeding path, so it does not need a decorative extra buffer on the diagram.

## What changes in the management routine?

Critical-chain management follows resource availability, work readiness and buffer consumption rather than treating each task's local finish date as the only priority. A specialist split across several projects can still be unavailable even when this project's network looks feasible.

Keep the resource calendar current and avoid starting work that will immediately wait. When the forecast moves, record the reason and remaining protection. The [delayed-project guide](/notes/recover-delayed-project/) explains how to assess a feasible response without hiding the new finish date.

Neither method removes uncertainty. The eight-day sequence and day-10 commitment are simply more honest than a six-day date that assumes two specialists while only one is available.

## Source and calculation notes

- [PMI: Taming uncertainty](https://www.pmi.org/learning/library/critical-chain-buffer-management-risk-4828), 2003 practitioner article. Resource conflicts, project and feeding buffers, and buffer monitoring.

Tasks, calendars and buffer size are fictional. Both methods use the same durations here. No automatic schedule reduction, probability of on-time completion or optimal buffer size is claimed.
