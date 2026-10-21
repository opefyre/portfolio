---
title: Schedule risk analysis: what is the chance of finishing on time?
date: 2026-10-21
summary: The schedule finishes on day 39 when every activity uses one duration. Allow two paths to vary and the finish becomes a range. Explore what that means for a promise.
seoTitle: Schedule risk analysis: a Monte Carlo example
seoDescription: Explore a Monte Carlo schedule example with uncertain durations, changing critical paths and a shared delay. Learn how to interpret completion percentiles.
status: published
topic: Project management
keywords: schedule risk analysis, Monte Carlo project schedule, P50 P80 completion date, PERT vs Monte Carlo
---

**Schedule risk analysis examines how uncertainty and risks could change a project's completion date.** It combines the schedule's dependencies with assumptions about durations and events, rather than treating every activity estimate as certain.

The [critical-path worked example](/notes/critical-path-method-worked-example/) finishes on working day 39. That is correct for its fixed inputs. It is not a statement that the project has a particular probability of meeting day 39.

We can keep the same eight activities and ask what happens when configuration and integration take different amounts of time.

## Start with a schedule whose logic works

The fictional expense-system rollout has this network. All links are finish-to-start, all durations are working days and there are no resource clashes or calendar exceptions in the model.

| ID | Activity | Predecessors | Fixed duration, or range used here |
| --- | --- | --- | --- |
| A | Agree requirements | None | 5 |
| B | Select vendor | A | 10 |
| C | Configure workflows | B | 6 minimum, 8 most likely, 16 maximum |
| D | Integrate systems | B | 9 minimum, 12 most likely, 21 maximum |
| E | Prepare policy and training material | A | 6 |
| F | Pilot | C and D | 5 |
| G | Train users | E and F | 4 |
| H | Go live and support | G | 3 |

The ranges are fictional bounded triangular distributions, chosen to make the method inspectable. They are not observed delivery distributions. In real work, justify the ranges with comparable records, current conditions and informed estimates, including risks outside an ordinary range.

## Monte Carlo simulation recalculates the network repeatedly

For each simulated project, the model draws one duration for C and one for D, then recalculates the finish. F starts only after both have finished. A long configuration result can therefore make C critical even though D was critical in the fixed schedule.

The baseline model samples C and D independently. It runs 20,000 projects with a fixed random seed so the result can be reproduced.

::interactive gap-schedule | Fictional 20,000-run simulation of the eight-activity network, using a fixed seed. C and D use the stated triangular distributions; other base durations are fixed. Change the deadline and compare no extra risk, one shared event, or separate events. Percentages describe these assumptions, not measured delivery odds.

The default chart shows the cumulative share of simulated finishes by each working day. Move the deadline to see how many simulated projects finish on or before it. The activity ranges and dependencies stay fixed.

[GAO's Schedule Assessment Guide](https://www.gao.gov/assets/gao-16-89g.pdf), Best Practice 8, describes this repeated recalculation and the need to include relevant paths and risks. A detailed simulation cannot rescue missing dependencies or impossible staffing.

## P50 and P80 are model outputs, not guarantees

P50 is the completion time by which 50% of simulated projects finish. P80 is the time by which 80% finish. A higher percentile allows more time under the same assumptions.

Use the displayed percentiles to discuss the commitment and available margin. Keep the model assumptions with that decision. Adding more simulation runs reduces numerical sampling noise; it does not validate a guessed duration range.

The chart reports continuous working-day elapsed time. If it gives a value between days, a real schedule still needs the correct calendar and an agreed rounding convention before anyone promises a date.

## One event can delay several activities together

Suppose a supplier issue has an assumed 20% chance of adding four working days to vendor selection B and four to integration D. In the shared-event scenario, the same simulated event affects both activities together.

The comparison scenario gives B and D separate 20% four-day events. Each activity has the same individual delay chance, but their relationship changes. These are deliberately different assumptions for the same teaching network, not interchangeable estimates of the supplier risk.

In the shared model, both additions occur together in about 20% of runs. Under independent events, both occur together in about 4%. Examine the full completion curve: the relationship can affect the tail even when average delay looks similar.

For an actual supplier risk, identify which activities it can affect and how. Do not add the same contingency into every duration and then charge the full event again.

## A PERT average does not answer the deadline question

A common PERT three-point blend is (optimistic + 4 × most likely + pessimistic) ÷ 6. For integration, (9 + 4 × 12 + 21) ÷ 6 gives 13 days.

That creates one duration estimate. Putting 13 into CPM still produces a single deterministic finish, not a deadline probability. Our triangular simulation has a different distribution assumption: its integration mean is (9 + 12 + 21) ÷ 3 = 14 days. Do not mix the two without explaining the model.

## Use the result to choose what to investigate

If the commitment depends heavily on integration's upper range, obtain better interface evidence or trial that work early. If a shared event changes the promise, assign its response through the [risk register](/notes/project-risk-register/) and rerun the agreed scenario after mitigation.

The [critical-chain comparison](/notes/critical-chain-vs-critical-path/) addresses a different planning question: how shared resources and project buffers affect the plan. Any such changes need to be reflected in the network before its completion risk is simulated.

Record the agreed model version, evidence, risks and decision. Revisit them when actual progress changes what remains. Day 39 remains a useful baseline; it becomes misleading only when presented as a promise the uncertainty analysis never supported.

## Source and calculation notes

- [GAO: Schedule Assessment Guide, GAO-16-89G](https://www.gao.gov/assets/gao-16-89g.pdf). Best Practice 8 covers simulation, paths, risk drivers and dependence.

All durations, distributions and event probabilities are fictional. The model retains the existing teaching network and varies C, D and the specified extra events only. It omits other duration uncertainty, resource restrictions and calendar effects. Its percentages are conditional on that model.
