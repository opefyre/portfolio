---
title: Theory of Constraints: five focusing steps with an example
date: 2026-10-21
summary: Cutting can make 120 units an hour, testing 80 and packing 100. See which change raises output, why another does not, and when the constraint moves.
seoTitle: Theory of Constraints: 5 steps and a worked example
seoDescription: Apply the five focusing steps to a three-stage production line. Compare local capacity with shipped output and recheck the constraint after each change.
status: published
topic: Operational excellence
keywords: theory of constraints, five focusing steps, bottleneck example, constraint management
---

**The Theory of Constraints is an approach to improving a system by managing the factor that limits its goal.** In a factory, that may be a production resource. It can also be demand, a policy or another condition outside the machines.

A line can cut 120 units an hour, test 80 and pack 100. Buying faster cutting equipment would make the first number better. It would leave the same 80 units passing through testing.

The [Lean Enterprise Institute's explanation](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/) sets out the five focusing steps. The work starts by identifying the current limit, rather than choosing the most visible improvement.

## Identify the constraint using the whole flow

In this fictional steady-state example, customers want 110 good units an hour. Material is available, each unit follows all three stages, and the rates below are sustainable good-unit capacities after ordinary losses. There are no additional setup or transport limits.

| Stage | Sustainable capacity | Load needed for customer demand | Position in this example |
| --- | ---: | ---: | --- |
| Cutting | 120 units/hour | 110 units/hour | Spare capacity |
| Testing | 80 units/hour | 110 units/hour | Current limiting resource |
| Packing | 100 units/hour | 110 units/hour | Next potential limit |

Testing limits the simplified line to **80 good units an hour**. A queue before testing is consistent with that explanation, but queue length alone would not prove it. Check starvation, blocking, failures, product mix and the time period before diagnosing a real line.

::figure gap-constraint-shift | Fictional steady-state line. Improving cutting alone leaves output at 80 units/hour. Recovering test capacity shifts the limit to packing at 100. The figures are sustainable good-unit rates, not theoretical machine speeds.

## Exploit the constraint: recover usable time first

The second step asks how to get more from the current constraint without a major expansion. That can mean preparing materials, preventing avoidable interruptions or keeping defective upstream work from consuming scarce test time.

Suppose the team observes avoidable waits at testing and trials a preparation change. After checks across representative runs, sustainable test capacity reaches 105 units an hour. This is an assumed result for the example, not a promised return from the method.

The line can now supply 100 units an hour because packing becomes the limit. Recovering 25 units of test capacity has raised system output by 20, not 25.

## Subordinate other work to the constraint

Subordinate means arrange the rest of the operation to support the limiting step. Cutting at 120 while testing takes 80 would accumulate 40 units an hour before testing if nothing else interrupts the flow.

The release plan should supply the constraint with the right work and enough protection against interruption, while controlling unnecessary work in progress. It does not require every other resource to be busy all the time.

The [Little's Law note](/notes/busy-machines-slower-orders/) explains the connection between work in progress, output rate and lead time. A protected queue needs a purpose and a review rule; an unlimited pile is not a buffer policy.

## Elevate the constraint when the remaining limit justifies it

Elevation can require extra shifts, equipment, outsourcing or another change beyond recovering current capacity. First check that the remaining shortage is worth solving and that the rest of the line can support the gain.

After the test change, packing is at 100 and demand is 110. Suppose an approved packing change raises its rate to 115. Testing at 105 now limits the line again. If testing subsequently reaches 115, customer demand at 110 becomes the ceiling on useful output, while cutting remains at 120.

| Scenario | Cutting | Testing | Packing | Demand | Possible steady-state output |
| --- | ---: | ---: | ---: | ---: | ---: |
| Starting point | 120 | 80 | 100 | 110 | 80 |
| Faster cutting only | 140 | 80 | 100 | 110 | 80 |
| Recover test capacity | 120 | 105 | 100 | 110 | 100 |
| Then raise packing capacity | 120 | 105 | 115 | 110 | 105 |
| Then raise test capacity | 120 | 115 | 115 | 110 | 110 |

All rates are good units per hour under the same simplified conditions. The last row has spare capacity; producing 115 for demand of 110 would build unwanted stock.

## Repeat the check when conditions change

The fifth step returns to identification. Do not let yesterday's bottleneck become a permanent assumption after a different product mix, staffing pattern or improvement changes the load.

Where products use different amounts of scarce time, the [throughput-accounting example](/notes/throughput-accounting-example/) examines the feasible product mix. This note identifies and manages the system limit; that calculation asks what to make within it.

:::link https://vrolen.com/blog/oee-improved-throughput-did-not/ | When better OEE leaves shipments unchanged
Vrolen follows the units through a separate filler-and-capper example, including the stock balance that exposes a local improvement becoming a larger queue.
:::

Improving cutting may still have a valid safety, quality or resilience benefit. State that benefit directly. Calling it an output increase would promise something the line cannot deliver.

## Source and example notes

- [Lean Enterprise Institute: Theory of Constraints and Lean thinking](https://www.lean.org/the-lean-post/articles/what-is-the-theory-of-constraints-and-how-does-it-compare-to-lean-thinking/). Constraints and the five focusing steps.

All capacities, demand and intervention results are fictional. The minimum-rate comparison assumes one serial product flow and steady-state operation. Real lines need checks for variation, setups, buffers, availability and shared resources.
