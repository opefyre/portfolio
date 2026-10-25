---
title: AI production scheduling: constraints first
date: 2026-10-25
summary: See how AI production scheduling differs from forecasting. Follow a published job-shop example through machine constraints and an 11-unit schedule.
seoTitle: AI production scheduling: constraints first
seoDescription: See how AI production scheduling differs from forecasting. Follow a published job-shop example through machine constraints and an 11-unit schedule.
status: published
topic: Industrial AI
keywords: AI production scheduling, AI scheduling manufacturing, production scheduling optimisation, finite capacity scheduling
---

Production scheduling assigns operations to resources and times while respecting constraints. An AI-enabled tool may predict durations or propose decisions, but the resulting schedule still has to fit the actual machines, job sequence and operating rules.

[Google's job-shop example](https://developers.google.com/optimization/scheduling/job_shop) makes those requirements visible with three jobs on three machines. It uses constraint programming, which does not require a learned prediction model. A product described as AI scheduling may combine several methods; ask which part does what.

## Put the operations and machines on the same page

Google supplies the following teaching problem. Durations are abstract time units, not factory measurements. The operations within each job must run in the stated order.

| Job | First operation | Second operation | Third operation |
| --- | --- | --- | --- |
| Job 0 | Machine 0, 3 units | Machine 1, 2 units | Machine 2, 2 units |
| Job 1 | Machine 0, 2 units | Machine 2, 1 unit | Machine 1, 4 units |
| Job 2 | Machine 1, 4 units | Machine 2, 3 units | None |

Each machine can process one operation at a time. Once an operation starts, it runs to completion. The objective is to minimise the time when all jobs have finished, called the makespan.

::figure aici-job-shop | A feasible 11-time-unit schedule for Google's published job-shop problem. Colours identify jobs. The example has no setup times, due dates or real factory calendar.

The eight durations total 21 machine-time units. That total is not the elapsed completion time because machines can operate in parallel. The displayed schedule finishes at time 11 without overlapping operations on the same machine or reversing a job's required order.

## Distinguish a prediction from a feasible assignment

A duration model estimates how long an operation may take. A scheduling method chooses where and when to place it. Better duration estimates do not remove the sequencing constraints.

The [AI planning Note](/notes/ai-supply-chain-planning/) makes the related distinction between a forecast and a capacity decision. The [RCCP explanation](/notes/rough-cut-capacity-planning/) checks broad capacity requirements; a finite schedule resolves the operations on particular resources.

## Add the rules your production actually needs

The published problem deliberately leaves out many operating details. A production implementation may need setup sequences, maintenance windows, labour availability, material release, alternative machines or promised due dates.

Describe those rules explicitly and identify the data that support them. A schedule that ignores a required setup may look shorter because it has omitted work.

Changing the objective changes the answer too. Minimising makespan is different from protecting one urgent due date or limiting schedule changes. The [planning time-fence guide](/notes/planning-time-fence-explained/) explains why repeated rescheduling also creates work.

## Check the proposal before releasing it

Retain the input snapshot, constraints, objective and version used to create the proposal. Check feasibility before comparing the reported improvement with the current schedule.

Use the same jobs and operating rules for that comparison. Then review what happens when durations or availability differ from the assumptions. A solver can optimise the stated problem; the production team must establish that the stated problem matches the work.

## Sources

- [Google OR-Tools job shop example](https://developers.google.com/optimization/scheduling/job_shop).
