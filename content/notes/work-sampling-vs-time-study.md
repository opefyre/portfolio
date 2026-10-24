---
title: Work sampling vs time study: choose what you need to observe
date: 2026-10-24
summary: A timer measures a job's duration. Random snapshots estimate how time is distributed. Compare the observations and units before using either to plan capacity.
seoTitle: Work sampling vs time study: practical comparison
seoDescription: Compare work sampling and time study with published and existing teaching data. See what each observation measures and why activity share is not job time.
status: published
topic: Continuous improvement
keywords: work sampling vs time study, work sampling example, time study example, time study vs motion study, work measurement
---

A time study follows defined work and records how long it takes. Work sampling records the activity seen at selected moments to estimate how time is distributed across activity categories.

They require different observations. A sequence of timed jobs gives durations. A set of random snapshots gives counts and proportions. Choose the method around the decision before collecting either.

[NPTEL's work-sampling lesson](https://archive.nptel.ac.in/content/storage2/courses/112107142/part1/lecture10.htm) describes instantaneous observations at random intervals. That sampling design matters: repeatedly looking when a queue is usually quiet would bias the view of the work.

## Time study: follow a defined start and finish

The [confidence-interval Note](/notes/confidence-interval-example/) uses ten fictional dispatch-check job times, in minutes:

**8, 9, 9, 10, 10, 10, 10, 11, 11, 12.**

The total is 100 minutes and the observed mean is ten minutes per job. The Note also calculates uncertainty in that mean under its stated sampling and population assumptions.

Before timing more jobs, define what starts and ends the task. Record whether waiting for missing information belongs inside that boundary, and keep the job type and operating conditions with the reading.

That mean is an observation-based estimate for the defined task. It is not automatically a labour standard. [NPTEL explains the performance-rating and allowance work](https://archive.nptel.ac.in/content/storage2/courses/112107142/part1/lecture9.htm) needed when developing a time standard. We have not supplied those inputs here.

## Work sampling: record the activity at random moments

NPTEL gives a separate teaching example with 500 random observations: 365 record the operator working and 135 record other time, labelled idle in that example.

:::formula Published work-sampling example
Working observations = 365 ÷ 500 = 73%
Other observations = 135 ÷ 500 = 27%
:::

Those are estimated shares for the sampled conditions. The 27% does not tell us why the operator was waiting, whether a check was necessary or how much time a change could recover.

Define categories that help investigate the actual process. Waiting for parts, checking an order and planned breaks should not be combined into an undifferentiated label if the decision depends on separating them.

::figure r4-work-observations | Two separate teaching datasets. Ten timed dispatch jobs come from the confidence-interval Note. The 500 snapshots, including 365 working observations, come from NPTEL's published illustration. They do not describe the same process or support a performance comparison.

## Compare the methods and the units

| Method | Observation | Result | What it cannot supply alone |
| --- | --- | --- | --- |
| Time study | Start, finish and work elements for a defined task | Duration per task or element | A justified standard time without the required study method and assumptions |
| Work sampling | Activity category at a sampled instant | Estimated share of observations in each category | Minutes per completed job or the cause of each wait |
| Motion study | How people move and perform the work | Evidence about method, reach, handling and movement | A duration estimate merely from identifying a movement |

Time and motion observations can support the same investigation. The [standard-work example](/notes/standard-work-vs-sop/) puts manual work, walking and automatic sealing on one time axis. It shows why removing three seconds of walking need not shorten the cycle when the machine still governs the wait.

## Design the observations around representative work

For timing, sample eligible jobs across the conditions the result must represent. Keep unusual observations and their reasons. Ten easy jobs from a quiet period cannot establish the average for a mixed, busy workload.

For work sampling, define the people or equipment, operating window and categories before creating the observation schedule. Select moments in a way that represents that window; explain the study to the people involved so observations do not become a hidden individual score.

Repeated snapshots close together can share the same waiting episode. More records do not automatically mean proportionately more independent information. Check whether the plan represents different days, shifts and operating states.

Keep each study's uncertainty visible. NPTEL discusses sample size in relation to the required accuracy; its example is not a universal instruction to collect exactly 500 observations.

## Use the result without changing its meaning

The dispatch study can inform a task-time estimate. The work-sampling study can identify activity categories needing closer investigation. Combining 73% from one case with ten minutes from another would produce a number with no supported interpretation.

Neither result by itself estimates cash savings or a safe reduction in staffing. Capacity also depends on the work sequence, equipment, demand and interruptions. The [takt and cycle-time example](/notes/takt-time-vs-cycle-time/) connects those operating conditions.

Before the next measurement session, write down the required result and its unit. If you need minutes per job, define and time the job. If you need the distribution of activity across an operating window, design the snapshots for that window.

## Sources and example notes

- [NPTEL: work sampling, lecture 10](https://archive.nptel.ac.in/content/storage2/courses/112107142/part1/lecture10.htm), random instantaneous observations, activity proportions and the published 365-of-500 illustration.
- [The existing confidence-interval Note](/notes/confidence-interval-example/), ten fictional dispatch times and their mean.
- [The existing standard-work Note](/notes/standard-work-vs-sop/), manual, walking and automatic-time overlap.

The two datasets are teaching examples from different sources. No combined productivity estimate, standard time, staffing requirement or cash benefit is calculated.
