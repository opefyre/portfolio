---
title: Why busy machines make customers wait: Little's Law and takt time on the floor
date: 2026-09-24
summary: Keeping every resource busy feels productive and often makes lead times worse. Two simple formulas explain why, and how launch times fell from five months to two.
status: draft
keywords: Little's Law, takt time, lead time, WIP, supply chain, lean manufacturing, new product introduction, operational excellence
---

When I ran the supply chain side of new product launches at British American Tobacco, launch lead time came down from about five months to two. People sometimes assume that meant everyone worked faster. Very little of it did.

Most of the gain came from deciding what *not* to start. Readiness gates, clear checkpoints and one cross-functional governance routine meant work only entered the system when it could actually flow through it. That sounds like common sense, and it is. It's also one of the most ignored ideas in operations, so this note walks through the two formulas behind it.

## Little's Law, in one line

For any stable system, over a consistent period ([Little, 2011](https://doi.org/10.1287/opre.1110.0940)):

| Work in process | = | Throughput | × | Flow time |
| --- | --- | --- | --- | --- |
| orders in the system | | orders finished per day | | days each order spends inside |

Turn it around and it says: **flow time = WIP ÷ throughput**. If your line finishes 20 orders a day, you don't control how fast it finishes them by pushing more in. You only control how long they wait.

::figure littles-law | Same output, double the wait. Releasing more work into a saturated line only adds queue.

With 40 orders in process, the average order spends 2 days inside. Release 80 while throughput stays at 20 a day and it spends 4. Nothing broke. Utilisation might even look better on the dashboard. The extra work simply turned into a queue.

## Faster data can make it worse

This is why "real-time" planning isn't automatically an improvement. A 2024 study modelled a make-to-order electronics line and ran 5,400 simulation experiments across several production-control strategies ([Woschank, Dallasega, König et al., 2024](https://doi.org/10.1007/s10696-024-09550-0)). Updating plans more often raised machine utilisation in every strategy they tested. For some strategies, WIP and lead time went up too.

Faster information triggered faster release, and once the line was saturated, faster release just meant more waiting.

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

144 seconds against 120 is "only" 20% slow. It sounds like a tuning problem. Here's what it means for the shift:

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

If you'd rather feel this than read it, I built a free browser game about exactly this: [Cargo & Consequence](https://playcargo.vrolen.com). You run a small company's supply chain one shift at a time, and the cheap supplier you pick on day one comes back as returns and delays weeks later. It's used in classrooms, and it's a surprisingly honest way to show a team why "just start more" backfires. More about it [here](/work/cargo-and-consequence/).

## A few questions for your own operation

1. What decides when work is released: a due date, material availability, a WIP limit or the constraint's capacity?
2. Do you know your takt time, and do your teams see the gap in units rather than percentages?
3. If demand went up 10% tomorrow, would you release more work, or protect flow at the constraint?

Release decisions start with a demand number, and that number is often the weakest link. It's why I'm also building [Foreviq](/work/foreviq/), which forecasts demand per customer and product and nets open orders against it, so the same demand isn't counted twice.

If you'd like to play with the numbers, the free [takt time calculator](https://vrolen.com/tools/takt-time-calculator/) on the [Vrolen](https://vrolen.com) site runs entirely in your browser. Testing release and scheduling rules on a model of the line, before changing the real one, is what [Vrolen](/work/vrolen/) is for.

## Sources

- Little, J. D. C. (2011). [Little's Law as viewed on its 50th anniversary](https://doi.org/10.1287/opre.1110.0940). *Operations Research*.
- Woschank, M., Dallasega, P., König, M. et al. (2024). [Potentials of using real-time data to increase the update frequency of production planning and control strategies in MTO](https://doi.org/10.1007/s10696-024-09550-0). *Flexible Services and Manufacturing Journal*.
- Lean Enterprise Institute, [Takt time](https://www.lean.org/lexicon-terms/takt-time/)
- Lean Enterprise Institute, [Creating continuous flow, part 1](https://www.lean.org/wp-content/uploads/2021/01/Creating-continuous-flow-part1.pdf)

*Line and shift figures are illustrative. The launch figures are from my own work.*
