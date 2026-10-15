---
title: Fast-tracking vs crashing: differences, costs and a schedule example
date: 2026-10-15
summary: Overlap work or pay to shorten it? Compare both on one project, then add rework and watch the other branch become critical.
seoTitle: Fast-tracking vs crashing: differences and costs
seoDescription: Compare fast-tracking and crashing on one project schedule. Explore overlap, rework, extra cost and the critical path that limits further compression.
status: published
topic: Project management
keywords: fast tracking vs crashing, schedule compression example, project crashing cost, fast tracking project management
---

**Fast-tracking overlaps activities that were planned in sequence. Crashing shortens activity durations, often through extra resources or overtime.** Both are schedule-compression methods: ways to finish the agreed work earlier.

A warehouse project is due to finish on working day eighteen. Operations asks for day sixteen. The team has two suggestions: start configuration while design is still being finished, or pay for help to complete configuration sooner.

Both can bring the finish forward. They change different things, and the rest of the schedule decides whether those changes are enough.

A [PMI conference paper](https://www.pmi.org/learning/library/managing-crashed-fastracked-shorten-interval-project-7603) explains the distinction and the extra cost or rework exposure that can follow. Here, we'll compare the choices on one small network, keeping the tests and handover intact.

## Schedule compression example: find the critical path

Our fictional project installs a warehouse label-and-scan flow. Durations are working days, counted from day zero. An activity can start as soon as its predecessor finishes, with no extra gap between them.

The configuration and site teams are separate and available when needed. This example has no shared staffing constraint, procurement delay or restricted installation window.

| ID | Activity | Duration | Baseline dependency |
| --- | --- | ---: | --- |
| A | Agree interface design | 4 days | Start of project |
| B | Configure the application | 8 days | A finished |
| C | Prepare the site | 6 days | A finished |
| D | Test the integrated flow | 4 days | B and C finished |
| E | Handover and release | 2 days | D finished |

Configuration and site preparation run in parallel. Testing waits for both.

:::formula Baseline finish
4 + max(8, 6) + 4 + 2 = 18 working days
:::

The configuration branch sets the finish. Site preparation finishes on day ten and has two days of **total float**: it can move two days later without delaying this project's finish. The [critical-path worked example](/notes/critical-path-method-worked-example/) explains that calculation in detail.

Cutting a day from site preparation alone changes nothing at the end. Configuration would still keep testing waiting until day twelve.

## Fast-tracking example: overlap design and configuration

Suppose configuration can begin after two days of design using a reviewed preliminary interface. It then runs from day two to day ten. Final design is still due on day four; any later change must be checked against the work already done.

Site preparation stays on days four to ten. Both branches are ready for testing on day ten, so testing runs to fourteen and handover finishes on sixteen.

The team has not made eight days of configuration become six. It has started two days earlier by overlapping the work. This depends on there being useful work that can safely start from the preliminary information.

If final design changes require two extra configuration days, B finishes on twelve instead. Testing and handover move back, and the project again finishes on eighteen.

We price that specific rework scenario at €600 per extra configuration day. Two days add €1,200. No probability is attached to it, so it is not an expected rework cost.

## Crashing example: cost per day saved and critical paths

Now keep the original sequence. Assume a supplier offers a defined configuration package that reduces B by up to three days, at an incremental €900 per day removed. This fictional supplier has committed to those shortened durations for this package.

| Configuration duration | Extra direct cost | Project finish | What limits the finish? |
| --- | ---: | --- | --- |
| 8 days | €0 | Day 18 | Configuration branch |
| 7 days | €900 | Day 17 | Configuration branch |
| 6 days | €1,800 | Day 16 | Configuration and site branches |
| 5 days | €2,700 | Day 16 | Site branch |

The third day removed from B costs another €900 and buys no further project reduction. Configuration finishes on day nine, but the site is not ready until ten.

The first two days cost €900 per project day saved. That ratio stops being useful when the saving becomes zero. To finish before sixteen, the team would need another feasible change on the path that now controls the finish.

## Compare baseline, fast-tracked and crashed schedules

The baseline, overlap and crash options stay visible together below. Add configuration rework to the overlap option, or change the number of days removed from configuration in the crash option.

::interactive schedule-compression | Fictional five-activity network in working days from day zero. Fast-tracking starts B two days after A starts; extra rework extends B. Crashing preserves the original dependencies and shortens B only. Test and handover durations stay fixed. Separate teams are available, and costs include only the additional charges stated here.

With no rework and a two-day crash, both alternatives finish on sixteen. Fast-tracking has no added direct charge in this scenario; crashing costs €1,800. That does not make overlap free in practice. Review effort, coordination, uncertainty and effects on other work have not been priced.

Check which branch controls each revised finish. In the two-day versions, both branches have no float. A late site-preparation task now delays the finish just as a late configuration does.

## Choose a change the team can actually deliver

For overlap, identify the exact early work, the preliminary information it needs and who accepts the consequence if that information changes. Do not start an activity early merely because two bars can be moved over each other.

For crashing, get a credible shortened duration and price, with the people, access and supervision needed to achieve it. Check that the extra specialist is available during the required days. The [resource levelling and smoothing note](/notes/resource-leveling-vs-smoothing/) covers what happens when several activities need the same people.

Keep test coverage and release criteria visible in both options. Deleting a test or quietly reducing the deliverable changes scope. It is not equivalent to completing the same work sooner. Use [change control](/notes/scope-creep-change-control/) if the requested date requires a different scope or acceptance decision.

For this project, day sixteen has two defined routes. Bring both to the decision with their assumptions, extra costs and response to rework. Once a route is agreed, update the full schedule and its owners rather than leaving the compressed date as a note beside the original plan.

## Sources and example notes

- [PMI: Managing a crashed and fast-tracked shortened project](https://www.pmi.org/learning/library/managing-crashed-fastracked-shorten-interval-project-7603). Established definitions and cost/rework considerations; no performance benchmark is taken from the case.

All activities, durations, prices and rework scenarios are fictional. The visual recalculates dependencies and total float for each alternative. Shared staffing limits and the probability of a delay are outside this comparison.
