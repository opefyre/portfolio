---
title: Takt time vs cycle time: which station needs attention?
date: 2026-10-14
summary: Three stations average 60 seconds. The middle one takes 75. Compare each station with takt to see why the average can hide a capacity gap.
seoTitle: Takt time vs cycle time: formula and example
seoDescription: Calculate takt time and compare it with each station's cycle time. An interactive example shows why an average can hide the station limiting output.
updated: 2026-10-24
status: published
topic: Operational excellence
keywords: takt time vs cycle time, takt time formula, cycle time example, takt time calculation, line balancing, takt vs lead time
---

Three assembly stations take 55, 75 and 50 seconds per piece. Their average is 60 seconds. Customer demand also calls for one finished piece every 60 seconds.

That average makes the line look balanced. The middle station still takes 75 seconds to finish its next piece.

**Takt time is the available production time divided by customer demand for the same period. Cycle time is the time the work actually takes at a defined step.** Takt describes the required pace; the measured cycle tells us whether a station can sustain it.

The Lean Enterprise Institute defines [takt time](https://www.lean.org/lexicon-terms/takt-time/) this way and distinguishes several kinds of [cycle time](https://www.lean.org/lexicon-terms/cycle-time/). State which cycle you mean before comparing it with demand.

## Calculate takt for the shift

Our fictional line has an eight-hour shift with 30 minutes of planned breaks. That leaves 450 minutes, or 27,000 seconds, of planned production time. Customer demand is 450 good units per shift.

:::formula The required completion pace
Takt = 27,000 available seconds ÷ 450 units demanded
Takt = 60 seconds per unit
:::

Use the same period on both sides. Dividing one shift's seconds by a week's demand gives a number with no useful meaning for the shift.

Here, available time is the planned window after breaks. Stops, rejects, changeovers and other losses have not been modelled. We will need to check them before turning the simple rate comparison into a delivery commitment.

## Compare each station, not their average

Each station has a dedicated operator and equipment. One piece visits A, then B, then C. Different pieces can be worked on at the three stations at the same time, but each station handles only one piece at a time.

The illustrative repeat times include that station's loading, work and unloading. They are not machine-only times or three tasks performed sequentially by one shared operator.

| Station | Seconds per piece | Compared with the 60-second takt |
| --- | ---: | --- |
| A | 55 | Five seconds shorter |
| B | 75 | Fifteen seconds longer |
| C | 50 | Ten seconds shorter |

A's spare five seconds don't automatically become time that B can use. With the current work split, B can finish one piece every 75 seconds. Running A faster would feed more work toward B without changing that pace.

:::formula What the slowest repeat time permits
27,000 seconds ÷ 75 seconds per piece = 360 pieces
450 units of demand − 360 = 90 units of rate-based capacity gap
:::

The 360 figure is an ideal steady-running comparison. It assumes repeated cycles at that pace, with material and downstream space available. It isn't a forecast of shipped good units; startup, interruptions and rejects could reduce actual output.

## Change demand and test a different work split

The figure keeps all three station times visible. Adjust demand to change takt, or test a proposed 60-second repeat at B.

::interactive takt-station-pace | Fictional three-station serial line with dedicated resources, 450 planned production minutes and one piece per station cycle. Baseline times are A: 55, B: 75 and C: 50 seconds. A 60-second cycle at B is an unverified trial assumption. Demand changes takt; it does not change the station times. The calculated output is a steady-running rate comparison, excluding startup, downtime, changeovers, starvation, blocking and quality losses.

At demand of 360 units, takt becomes 75 seconds. B's original repeat time now equals that pace, before allowing for losses. The physical process hasn't improved; the demand requirement has changed.

At 450 units, a proven 60-second repeat at B would remove this simple rate gap. It would also leave the limiting station exactly at takt, with no allowance for interruptions.

At 540 units, takt falls to 50 seconds. Even the proposed B improvement leaves both A and B above takt. The required work design has changed again. A successful trial at yesterday's demand doesn't establish capacity for tomorrow's mix and volume.

## Use the gap to investigate the work

Observe B's work elements with the people doing them. Separate the equipment's automatic time from loading, checking and movement. Identify which activities can genuinely overlap or move without transferring a new constraint elsewhere.

The [standard work vs SOP example](/notes/standard-work-vs-sop/) shows how timing and permitted overlap belong beside the sequence. That is the evidence needed for a proposed 60-second cycle, rather than a faster target written on the board.

### What line balancing would change here

**Line balancing distributes work elements between stations or operators so the process can meet the required pace.** It requires a feasible work sequence, not just equal totals. LEI's [operator balance chart](https://www.lean.org/lexicon-terms/operator-balance-chart/) stacks work elements against takt to help investigate that distribution.

For a separate proposed redesign, suppose observation identifies five seconds of preparation and ten seconds of checking at B that might move to A and C. Assume these are manual elements that can move without breaking the required sequence. That assumption needs a trial.

| Station | Original repeat | Proposed transfer | Proposed repeat |
| --- | ---: | --- | ---: |
| A | 55 s | Take 5 s of B's preparation | 60 s |
| B | 75 s | Transfer 15 s in total | 60 s |
| C | 50 s | Take 10 s of B's checking | 60 s |

The total work remains 180 seconds per piece. We have redistributed it rather than removed it. This differs from the earlier control, which changes B alone and leaves A and C unchanged.

::figure paa2-line-balance | Fictional reallocation proposal. A takes 5 seconds and C takes 10 seconds from B. Totals change from 55/75/50 to 60/60/60 seconds; total work stays at 180 seconds. Transfer feasibility and quality are unverified. All bars share a seconds-per-piece scale.

### Calculate the line-balance ratio

For this simplified line, calculate the balance ratio as total work per piece divided by the time available across all stations at the governing line cycle.

:::formula Same work, different distribution
Original ratio = 180 ÷ (3 × 75) = 80%
Proposed ratio = 180 ÷ (3 × 60) = 100%
:::

The original 225 station-seconds contain 180 seconds of work and 45 seconds of unfilled time per repeating line cycle. The proposed distribution removes that gap in the model while retaining all 180 seconds of work.

This ratio describes the assumed balance. It excludes downtime, rejects, startup and variation, so it is not [OEE](/notes/same-oee-opposite-fixes/) or a measured good-output result. The proposed 100% also leaves no spare time at a 60-second takt.

Check reach, sequence, skills, equipment and inspection conditions with the team. If some of B's 75 seconds is automatic machine time, moving a manual task may not shorten its limiting repeat by the same amount. A balanced chart does not establish a safe method or lower staffing need.

If a change is tested, check its effect on repeat time, good output and the surrounding stations. The [PDCA example](/notes/pdca-cycle-example/) explains how to compare a small trial with its prediction before changing the method.

A real line also needs a range of observed cycles. One fast repeat doesn't show what happens across products, shifts, replenishment and normal variation. Keep losses visible instead of reducing the demand target until the result appears comfortable.

## Cycle time doesn't tell the customer when the order arrives

The 55 + 75 + 50 seconds describe 180 seconds of station work on one piece in this example. They leave out waiting before and between stations, batching and dispatch.

That whole journey is lead time. The [value stream mapping example](/notes/value-stream-mapping-example/) separates work from waiting; it is the next place to look when cycle times seem short but orders still take days.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch Vrolen's three production clocks
A separate worked example compares takt, cycle and lead time. Its numbers differ from this three-station line.
:::

For a written companion, [Vrolen's three-clocks guide](https://vrolen.com/blog/takt-time-vs-cycle-time-vs-lead-time/) explains those boundaries in more detail.

Start the next capacity review with demand for the period, planned production time and the repeat time at each relevant station. In our line, the first investigation belongs at B. An average of 60 seconds doesn't make its 75-second cycle disappear.

## Sources

- Lean Enterprise Institute. [Takt Time](https://www.lean.org/lexicon-terms/takt-time/). Available time divided by matching-period demand.
- Lean Enterprise Institute. [Operator Balance Chart](https://www.lean.org/lexicon-terms/operator-balance-chart/). Distributing work elements relative to takt time.
- Lean Enterprise Institute. [Cycle Time](https://www.lean.org/lexicon-terms/cycle-time/). Measured cycle definitions and the distinction from production lead time.

All shift, demand and station figures are fictional. The steady-running calculation is separate from an actual shift result.
