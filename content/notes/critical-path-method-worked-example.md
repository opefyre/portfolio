---
title: The critical path method, step by step: a worked example you can copy
date: 2026-09-29
summary: How to find the critical path by hand: build the network, run the forward and backward pass, calculate float, and use the result to decide where extra effort actually shortens a project.
status: published
topic: Project management
keywords: critical path method, CPM, critical path, total float, free float, forward pass, backward pass, project scheduling, project management, network diagram
---

Every project plan answers one question sooner or later: *what is the earliest we can finish, and what exactly decides that date?* The critical path method (CPM) answers it with simple arithmetic. It came out of a joint project between DuPont and Remington Rand in the late 1950s, led by Morgan Walker and James Kelley. Its first real test was maintenance shutdowns at a DuPont plant, where it cut downtime by about a quarter. It's still the backbone of every scheduling tool you've used.

You don't need software to understand it. This note works through one small project by hand, so you can copy the method onto your own.

:::card The short version
1. List the activities, their durations and what each one depends on.
2. **Forward pass:** work out the earliest start and finish of each activity.
3. **Backward pass:** work out the latest start and finish without delaying the project.
4. **Float** is the gap between the two. Activities with zero float form the critical path. Delay one of them by a day and the whole project finishes a day later.
:::

## The example project

Say you're rolling out a new expense management tool across a company. Eight activities, durations in working days:

| ID | Activity | Duration | Depends on |
| --- | --- | --- | --- |
| A | Agree requirements | 5 | none |
| B | Select the vendor | 10 | A |
| C | Configure workflows | 8 | B |
| D | Integrate with ERP and HR systems | 12 | B |
| E | Write policy and training material | 6 | A |
| F | Pilot with one team | 5 | C, D |
| G | Train everyone | 4 | E, F |
| H | Go live and support | 3 | G |

Add up the durations and you get 53 days. But several activities can run in parallel, so the project will be shorter than that. The question is by how much, and which activities set the pace.

## Step 1: draw the network

Each activity becomes a box, and each dependency an arrow. This is the "activity on node" style most tools use.

::figure cpm-network | The network for the example. In each box, the top corners show the earliest start and finish, and the bottom corners the latest start and finish. Dark boxes have zero float: that's the critical path.

Drawing it is worth the ten minutes, even if a tool will do it for you later. It's where missing dependencies show up. ("Wait, can we really pilot before the policy is written?")

## Step 2: the forward pass

Start at the beginning and move right, calculating the earliest each activity can start (ES) and finish (EF).

:::formula Forward pass
**ES** = the largest EF among its predecessors (0 for the first activity)
**EF** = ES + duration
:::

- A starts at 0 and finishes at 5.
- B and E both start at 5. B finishes at 15, E at 11.
- C and D both start at 15. C finishes at 23, D at 27.
- F needs both C and D, so it can't start until the *later* of the two: **max(23, 27) = 27**. It finishes at 32.
- G needs E (day 11) and F (day 32), so it starts at 32 and finishes at 36.
- H runs from 36 to 39.

The project's earliest finish is **day 39**. The merge points (F and G) are where the forward pass does its real work: the later predecessor always wins.

## Step 3: the backward pass

Now start at the end and move left, calculating the latest each activity can start (LS) and finish (LF) without pushing the finish past day 39.

:::formula Backward pass
**LF** = the smallest LS among its successors (the project finish for the last activity)
**LS** = LF − duration
:::

- H must finish by 39, so it must start by 36. G: 32 to 36. F: 27 to 32.
- C and D both feed F, which starts at 27. So D must start by 15, and C by **19**.
- E feeds G, which starts at 32, so E can start as late as **26**.
- B feeds both C (latest start 19) and D (latest start 15). The smaller wins: B must finish by **15**.
- A feeds B (15) and E (26), so A must finish by 5.

At split points (B, and A), the backward pass takes the *earlier* successor. It's the mirror image of the forward pass.

## Step 4: calculate float

:::formula Float
**Total float** = LS − ES (or LF − EF)
**Free float** = earliest ES of its successors − its own EF
:::

Total float is how long an activity can slip without delaying the project. Free float is how long it can slip without delaying *anything*, not even the next activity's early start.

| ID | ES | EF | LS | LF | Total float | Free float |
| --- | --- | --- | --- | --- | --- | --- |
| A | 0 | 5 | 0 | 5 | **0** | 0 |
| B | 5 | 15 | 5 | 15 | **0** | 0 |
| C | 15 | 23 | 19 | 27 | 4 | 4 |
| D | 15 | 27 | 15 | 27 | **0** | 0 |
| E | 5 | 11 | 26 | 32 | 21 | 21 |
| F | 27 | 32 | 27 | 32 | **0** | 0 |
| G | 32 | 36 | 32 | 36 | **0** | 0 |
| H | 36 | 39 | 36 | 39 | **0** | 0 |

The critical path is **A → B → D → F → G → H**: 5 + 10 + 12 + 5 + 4 + 3 = 39 days. Here's the same thing as a Gantt chart, with the float drawn in:

::figure cpm-gantt | The schedule on a timeline. Dark bars are critical. The dashed boxes show how far C and E can slip before they start pushing the finish date.

## What the numbers let you do

This is where CPM earns its keep. A few questions every project manager gets asked:

| What happens | Effect on the finish | Why |
| --- | --- | --- |
| Configuring workflows (C) takes 3 days longer | None, still day 39 | C has 4 days of float |
| The ERP integration (D) takes 3 days longer | Day 42 | D is critical |
| The training material (E) takes 25 days longer | Day 43 | E only had 21 days of float |
| Add a second integrator, cutting D from 12 to 9 days | Day 36 | D was critical, so the saving counts |
| Cut D to 7 days | Day 35, not 34 | The path through C (35 days) is now the critical one |

That last row is the one people miss. When you shorten the critical path (called *crashing*), another path can catch up. After cutting D to 9 days, C has only 1 day of float left. Past 8 days, you're paying for days that no longer shorten the project. Always re-run the passes after a change.

The other lesson is where *not* to spend. Adding people to write the training material (E) would cost money and change nothing, because E wasn't holding the project back.

## Five mistakes I see most often

1. **Treating float as the activity's spare time.** Float belongs to the project, not the task. If C's team uses its 4 days early, nothing is left for surprises later on that path.
2. **Ignoring near-critical paths.** An activity with 1 or 2 days of float is critical in all but name. Watch anything with float under about 10% of the project length.
3. **Assuming unlimited people.** Classic CPM assumes every activity can start the moment its predecessors finish. If the same two engineers are needed for C and D, they can't happen in parallel, and your real critical path is longer. That's what resource levelling (and methods like critical chain) deal with.
4. **Missing dependencies.** A forgotten link, like "the pilot needs the policy", quietly makes the plan look shorter than it is.
5. **Calculating it once.** The critical path moves as work finishes early or late. Recalculate at every status update, not just at kickoff.

## When durations are uncertain

CPM uses one duration per activity. When you genuinely don't know, a common approach from PERT is to estimate three values and blend them:

:::formula Three-point (PERT) estimate
Expected duration = (Optimistic + 4 × Most likely + Pessimistic) ÷ 6
:::

For the integration, an optimistic 9 days, a likely 12 and a pessimistic 21 gives (9 + 48 + 21) ÷ 6 = **13 days**. That's a day more than the "likely" guess, because bad surprises tend to be bigger than good ones. Use the blended number in your forward and backward pass, and you get a plan that's honest about its risk.

:::link /notes/earned-value-management-explained/ | Next: tracking the plan with earned value
Once the schedule exists, earned value tells you whether the project is ahead or behind on cost and time, with three numbers.
:::

## Sources

- Kelley, J. E. & Walker, M. R. (1959). [Critical-path planning and scheduling](https://doi.org/10.1145/1460299.1460318). *Proceedings of the Eastern Joint IRE-AIEE-ACM Computer Conference*.
- Kelley, J. E., Walker, M. R. & Sayer, J. S. (1989). [The origins of CPM: a personal history](https://www.pmi.org/learning/library/origins-cpm-personal-history-3762). *PM Network*, PMI.
- U.S. Government Accountability Office (2015). [Schedule Assessment Guide: Best Practices for Project Schedules](https://www.gao.gov/assets/gao-16-89g.pdf) (GAO-16-89G).
- Kramer, S. W. & Jenkins, J. L. (2006). [Understanding the basics of CPM calculations](https://www.pmi.org/learning/library/critical-path-method-calculations-scheduling-8040). PMI Global Congress.

*The project and its numbers are illustrative.*
