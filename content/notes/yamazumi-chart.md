---
title: Yamazumi chart: balance work between operators
date: 2026-11-18
summary: Stack the work elements for each operator against takt time. Use the chart to test a different work split, then check whether that sequence works on the floor.
seoTitle: Yamazumi chart: operator balancing explained
seoDescription: Learn how to build a Yamazumi chart, compare operator workloads with takt time and test a different work split without hiding travel or machine constraints.
status: published
topic: Continuous improvement
keywords: yamazumi chart, operator balance chart, line balancing example, operator workload, takt time
---

A Yamazumi chart, also called an operator balance chart, stacks the time for individual work elements into a bar for each operator. A line across the chart marks takt time, the production pace required by demand.

The chart helps a team see where the work is uneven and which elements might move. It also keeps the discussion specific. “Station B is too slow” becomes a review of the actual tasks, sequence and conditions at B.

The [Lean Enterprise Institute's definition](https://www.lean.org/lexicon-terms/operator-balance-chart/) describes this use of stacked work elements against takt. Our existing [takt-time example](/notes/takt-time-vs-cycle-time/) has three stations taking 55, 75 and 50 seconds. Here, we will break those same station totals into elements to examine a proposed transfer.

## Start with observed work elements

Watch representative cycles with the operators. Define where each element starts and finishes, and use the same timing basis across stations. Keep travel, material handling and checks visible.

Record variation and interruptions alongside the chart. A single fast cycle is a poor basis for assigning everyone else's work.

The table below extends the existing fictional three-station example. Its task descriptions and splits are teaching assumptions, not observations from a factory. All six elements are sequential manual work at their assigned station, with no automatic machine overlap.

| Operator | Work element | Seconds per piece |
| --- | --- | ---: |
| A | Prepare the part | 30 |
| A | Fit the first component | 25 |
| B | Assemble the next component | 45 |
| B | Check and transfer | 30 |
| C | Complete the final operation | 35 |
| C | Final check | 15 |

Takt is 60 seconds per piece. A's total is 55 seconds, B's is 75 and C's is 50. The average is 60, but B exceeds the required pace by 15 seconds.

::figure yamazumi-balance | The same 180 seconds of manual work, before and after a proposed transfer of 15 seconds from B to C. Takt remains 60 seconds per piece.

## Test a different work split

Suppose the team can split B's check-and-transfer element and move 15 seconds to C. B falls to 60 seconds, while C rises to 65. The longest station time improves from 75 to 65 seconds. The line still has a station above takt.

The transfer makes the workloads more even, but the team still needs to remove or redistribute five seconds at C to reach the 60-second pace.

With 27,000 available seconds per shift, the original longest repeat time gives an ideal rate comparison of 27,000 ÷ 75 = 360 pieces. At 65 seconds, it becomes about 415 pieces. Demand remains 450. These comparisons exclude startup, stops and rejects, just as the original takt example does.

| Work split | A | B | C | Total |
| --- | ---: | ---: | ---: | ---: |
| Original | 55 s | 75 s | 50 s | 180 s |
| Proposed | 55 s | 60 s | 65 s | 180 s |

Three operators share 180 seconds of manual work. At a 60-second takt, that leaves no spare time if the work were divided perfectly. The arithmetic alone gives no allowance for the conditions seen during an actual shift.

## Check whether a transfer is possible

Before moving the work, check access, task order, tooling and training. Determine whether the receiving operator would need extra walking or whether the transfer changes a quality check. Include those consequences in the revised times.

A stack of manual task times also cannot explain an automatic machine cycle that overlaps other work. Use a [work combination chart](/notes/standard-work-vs-sop/) to put those activities on a shared clock. Otherwise, adding all the durations can count the same elapsed time twice.

Vrolen's standard-work video follows an electric kettle cell through a separate example. It helps explain why timing, sequence and the stock between steps belong together.

::video 8_VDXl2bk90 | A separate electric kettle example connects the working sequence to takt. Its timings differ from the three-station example in this article.

## Confirm the proposed method on the floor

Trial the new sequence with the operators and check safety, quality and repeat times. Include replenishment and interruptions in the review before treating the result as the new working method.

Keep the original chart, proposed split and observed trial results together. If the transfer introduces five seconds of walking, put those five seconds into the comparison. Update the work instructions only after the team has checked the whole sequence.

## Sources and calculations

- [Lean Enterprise Institute operator balance chart](https://www.lean.org/lexicon-terms/operator-balance-chart/). Definition and work-element representation.
- [Lean Enterprise Institute on workstation standards](https://www.lean.org/the-lean-post/articles/standards-at-workstations/). Sequence, timing and work combination.
- The fictional 55/75/50-second baseline comes from the existing takt-time Note. The proposed transfer produces 55/60/65 seconds. Total manual work stays at 180 seconds per piece.
