---
title: Resource levelling vs smoothing: one engineer, two tasks
date: 2026-10-14
summary: Both tasks can start on day zero. Both need the same engineer. Compare moving work within float with a plan that actually fits the available person.
seoTitle: Resource leveling vs smoothing: a worked example
seoDescription: Compare resource leveling and smoothing with a two-task schedule. See why moving work within float may preserve the finish while leaving an overload.
status: published
topic: Project management
keywords: resource leveling vs resource smoothing, resource levelling example, resource smoothing example, project resource allocation, total float
---

The schedule shows two configuration tasks running together. Neither needs the other to finish first. There is no dependency error, but both have been assigned to the same engineer for a full working day.

The work is allowed to overlap. The person cannot do both assignments at once.

**Resource levelling adjusts dates to fit resource availability and may move the project finish. Resource smoothing uses float to spread resource demand while keeping the scheduled finish.** Float is how far a task can move without delaying the relevant finish under the current dependencies.

[PMI's project-management lexicon](https://www.pmi.org/-/media/pmi/documents/registered/pdf/pmbok-standards/pmi-lexicon-pm-terms.pdf?rev=447328d841c249af985d14177ddd5f95) distinguishes the two techniques. The [Association for Project Management](https://www.apm.org.uk/resources/find-a-resource/difference-between-resource-smoothing-and-resource-levelling/) describes the practical choice: whether the finish date or the resource limit takes priority.

Neither technique makes an unavailable person appear. The schedule needs to show the consequence of the choice.

## Start with the work and the shared person

Our fictional project must configure two independent interfaces before a readiness milestone. A takes four working days and B takes two. Each needs one qualified engineer for eight hours per day, throughout its duration.

Both can start at elapsed working day 0. The milestone occurs when both are complete. There are no other tasks, weekends or waits in this small example.

| Activity | Duration | Daily assignment | Earliest interval without checking resources |
| --- | ---: | --- | --- |
| Interface A | Four working days | One engineer, eight hours | Day 0 to day 4 |
| Interface B | Two working days | One engineer, eight hours | Day 0 to day 2 |
| Configuration ready | Zero-duration milestone | Both interfaces complete | Day 4 |

The dependency-only calculation finishes at day 4. B can move to days 2–4 without delaying that milestone, giving it two days of float in this network.

There is only one engineer available. The first two days of the earliest plan require 16 engineer-hours per day against eight available. A valid set of links has produced an infeasible assignment.

The [project dependencies note](/notes/project-dependency-types/) explains why overlapping bars don't establish that the people or equipment are available. This example follows that resource check through to the dates.

## Moving B within float leaves the conflict

Move B from days 0–2 to days 2–4. The milestone still lands at day 4. This stays within B's float, so it respects the timing boundary used for smoothing.

A is still running during days 2–4. Those two days now contain the same 16-hour requirement that previously appeared at the start.

The conflict has moved. Peak resource demand is still two engineers. Calling the plan “smoothed” doesn't make it feasible for one.

## Levelling around one engineer moves the milestone

Keep A first, then schedule B after it. A occupies days 0–4 and B days 4–6. The readiness milestone moves to day 6.

There is no overload: each working day requires eight engineer-hours, matching the available person. Both tasks retain their original duration and scope.

:::formula Check the effort against the available time
A: 4 days × 8 hours = 32 engineer-hours
B: 2 days × 8 hours = 16 engineer-hours
Total: 48 engineer-hours
One engineer for four days: 4 × 8 = 32 available hours
One engineer for six days: 6 × 8 = 48 available hours
:::

Within these assumptions, four days cannot contain 48 hours of work from a person providing eight hours per day. Moving the bars inside that window won't close the 16-hour gap.

The day-6 plan changes the forecast. It doesn't approve a later commitment. If day 4 is required, the team needs a decision about capacity, scope, method or the date.

## Compare the dates and daily load together

All three plans remain visible below. Changing the available capacity tests whether a second suitably qualified engineer would remove the conflict. It doesn't shorten either task.

::interactive resource-load-plans | Fictional two-task project on an elapsed working-day axis. A needs four full engineer-days; B needs two. Each task requires one person throughout, with no splitting or multitasking. Both must finish before the readiness milestone. The within-float move keeps day 4 but moves the overload. The serial plan finishes at day 6. A second engineer is a scenario assumption, not an approved resource.

With two qualified engineers available for these tasks, the original four-day plan fits this resource model. The serial six-day plan also fits, but takes longer. With one engineer, only the serial option shown avoids overload.

This doesn't mean levelling always extends a project. Some networks have enough float and alternative assignments to remove a conflict without moving the finish. It also doesn't mean smoothing always removes every overload. The available timing flexibility may be too small.

## Choose which constraint can change

| Situation | What to investigate |
| --- | --- |
| Resource availability is fixed | A feasible sequence and the resulting finish date |
| Finish date is fixed | Movements within float, eligible capacity or a revised work approach |
| Both are fixed and the work doesn't fit | An explicit decision about the unresolved gap |

Check qualifications, calendars and other assignments before assuming a second person is usable. A two-day task doesn't necessarily become a one-day task when two people join it. In this example, the extra person works on the other independent interface instead.

Vrolen's [production scheduling guide](https://vrolen.com/blog/production-scheduling-optimization/) applies the same availability check to factory schedules, where people, machines, materials and tooling must be ready together. Its production example is separate from these project tasks.

The [critical path worked example](/notes/critical-path-method-worked-example/) explains the dependency calculation behind the original finish. After changing resource assignments, review that network and the affected milestones again. Don't keep quoting float from an old plan as if the resource decision changed nothing.

When the forecast conflicts with an approved commitment, use the [change-control process](/notes/scope-creep-change-control/) to present the alternatives and their consequences.

Bring the task bars and daily resource load to the same review. Our engineer's availability changes the answer from four days to six. The calendar should show that before the team is asked to deliver it.

## Sources

- Project Management Institute. [PMI Lexicon of Project Management Terms, version 5.0](https://www.pmi.org/-/media/pmi/documents/registered/pdf/pmbok-standards/pmi-lexicon-pm-terms.pdf?rev=447328d841c249af985d14177ddd5f95), printed page 24. Resource levelling and smoothing definitions.
- Association for Project Management. [Resource smoothing and resource levelling](https://www.apm.org.uk/resources/find-a-resource/difference-between-resource-smoothing-and-resource-levelling/). Time-limited and resource-limited scheduling.

All tasks and assignments are fictional. The comparison covers only these two activities, rather than a full project.
