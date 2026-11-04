---
title: Why busy machines make customers wait: Little's Law and takt time on the floor
date: 2026-09-24
updated: 2026-11-04
summary: Keeping every resource busy feels productive and often makes lead times worse. Two simple formulas explain why, and how launch times fell from five months to two.
status: published
topic: Supply chain
keywords: Little's Law, takt time, lead time, WIP, supply chain, lean manufacturing, new product introduction, operational excellence
seoTitle: Little's Law and takt time: why busy work waits
seoDescription: See how Little's Law and takt time explain longer queues and slower orders, with an example of reducing product launch lead time.
---

When I ran the supply chain side of new product launches at British American Tobacco, launch lead time came down from about five months to two. People sometimes assume that meant everyone worked faster. Very little of it did.

Most of the gain came from deciding what *not* to start. Readiness gates, clear checkpoints and one cross-functional governance routine meant work only entered the system when it could actually flow through it. The calculations below connect those release decisions to work in process, throughput and the pace set by demand.

## Little's Law, in one line

For any stable system, over a consistent period ([Little, 2011](https://doi.org/10.1287/opre.1110.0940)):

| Work in process | = | Throughput | × | Flow time |
| --- | --- | --- | --- | --- |
| Average orders inside the line | | Average completions per day | | Mean days inside the line |

Divide average work in process by average throughput to get **mean flow time**. On a saturated line, releasing more work can lengthen the queue while completions stay flat.

::figure littles-law | At the same throughput, twice the average work in process means twice the average time inside the line.

Measure average work in process and average daily completions across the same line over a stable period. At 20 completions a day, an average of 40 orders inside the line gives a mean flow time of two days. If average work in process rises to 80 and throughput stays at 20, mean flow time rises to four days. Vrolen’s [worked Little’s Law example](https://vrolen.com/blog/littles-law-wip-lead-time/) shows how to set the measurement boundary.

Vrolen’s [Little’s Law video](https://www.youtube.com/watch?v=ChviX09hIMU) works through the same calculation with two support desks.

## Faster data can make it worse

Woschank and colleagues ran 5,400 simulations of a make-to-order electronics line. More frequent updates raised machine utilisation across the strategies they tested, but lead time moved in different directions. It rose under CONWIP, which controls work release with a limit across the line, and fell under Kanban, which uses local replenishment signals. Test how often you update the release rule as well as what the rule allows. [Woschank et al., 2024](https://doi.org/10.1007/s10696-024-09550-0).

## Takt time: the pace the customer sets

Little's Law tells you what happens to work inside the system. Takt tells you the pace you need to hit. It's available production time divided by customer demand ([Lean Enterprise Institute](https://www.lean.org/lexicon-terms/takt-time/)).

An illustrative shift:

| Shift | Value |
| --- | --- |
| Shift length | 8 hours |
| Breaks and planned stops | 60 min |
| Available time | 420 min (25,200 s) |
| Customer demand | 210 units |
| **Takt time** | **25,200 ÷ 210 = 120 s per unit** |
| Observed cycle time | 144 s |

A 144-second cycle exceeds the 120-second takt by 20%. Translate that difference into the number of units the team can finish in the shift:

::figure takt-gap | Twenty percent slower than takt is 35 units short per shift, before a single breakdown.

**Thirty-five units short, before any unplanned downtime.** That's a far more useful sentence to put in front of a team than "cycle time is 20% over", because it tells everyone what the current process design can and can't deliver.

## What to watch instead of utilisation

| Instead of | Watch | Because |
| --- | --- | --- |
| Utilisation of every machine | Throughput of the constraint | Only the constraint sets the pace of the whole line |
| Orders released | WIP against a limit | WIP above what the line can finish is pure waiting |
| Average cycle time | Cycle time against takt, in units per shift | "35 short" drives action; "20% slow" doesn't |
| Starts | Flow time and on-time delivery | That's what the customer actually experiences |

## How this showed up in product launches

A new product launch is a flow problem wearing a project plan. Materials, artwork, trials, quality sign-offs and line time all queue behind each other, and every half-ready launch that gets "started early" joins the queue.

What worked for us at BAT was treating readiness as a gate every launch had to pass:

- **Clear checkpoints** with owners across sourcing, planning, manufacturing and quality, so problems surfaced while there was still time to fix them.
- **One governance routine** across functions, instead of a dozen side conversations.
- **MRP-based planning** across nine production lines and five warehouses, so material readiness was visible before a launch was released, not after.

Put simply: fewer things in flight, each one moving. That's Little's Law applied to a project portfolio.

## A few questions for your own operation

1. What decides when work is released: a due date, material availability, a WIP limit or the constraint's capacity?
2. Do you know your takt time, and do your teams see the gap in units rather than percentages?
3. If demand went up 10% tomorrow, would you release more work, or protect flow at the constraint?

## Sources

- Little, J. D. C. (2011). [Little's Law as viewed on its 50th anniversary](https://doi.org/10.1287/opre.1110.0940). *Operations Research*.
- Woschank, M., Dallasega, P., König, M. et al. (2024). [Potentials of using real-time data to increase the update frequency of production planning and control strategies in MTO](https://doi.org/10.1007/s10696-024-09550-0). *Flexible Services and Manufacturing Journal*.
- Lean Enterprise Institute, [Takt time](https://www.lean.org/lexicon-terms/takt-time/)
- Lean Enterprise Institute, [Creating continuous flow, part 1](https://www.lean.org/wp-content/uploads/2021/01/Creating-continuous-flow-part1.pdf)

*Line and shift figures are illustrative. The launch figures are from my own work.*
