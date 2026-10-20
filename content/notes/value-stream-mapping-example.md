---
title: Value stream mapping example: 40 minutes of work, 10 days of waiting
date: 2026-10-03
summary: Follow an order from release to dispatch. Map its work, queues and instructions, then compare speeding up one task with changing the wait between tasks.
updated: 2026-10-20
status: published
topic: Operational excellence
keywords: value stream mapping example, current state value stream map, value stream mapping lead time, value stream mapping template Excel, VSM cycle time vs lead time
seoTitle: Value stream mapping: work time vs waiting time
seoDescription: Follow a value stream mapping example through work, queues and lead time. Compare process cycle efficiency with activity ratio before choosing an improvement.
---

Orders take nearly two working weeks to get through the operation. The first request is for faster preparation equipment. It is the most visible place where people are busy.

Follow an order and the picture changes. Approval takes 12 minutes, preparation takes 18, and checking and dispatch take 10. Forty minutes of active work, spread across days of waiting.

That does not settle which investment to make. It tells the team what to find out before making it: where does the order wait, and what allows it to move?

## Choose one route and a clear boundary

A value stream map shows the work and the information that controls its movement. The [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/value-stream-mapping/) distinguishes the current state, what happens now, from the future state, how the team proposes the flow should work.

For this fictional example, choose one family of repeat orders with the same route. Start when a complete order enters release and approval. Finish when it is dispatched. Supplier replenishment and time in transit sit outside this boundary.

The operation completes 50 orders per working day. A working day contains 480 minutes. Several people or benches can handle different orders at once, so an 18-minute processing step does not imply that one person completes all 50 orders.

Before drawing, agree what an order is. Mixing individual items, pallets and customer orders in one calculation makes the result meaningless, even if every number came from a real system.

## Collect the waiting as carefully as the work

Walk the route with the people who do it. Record an order's arrival, start and finish at each stage. Separate active processing from time waiting for a decision, material, a batch or a free resource.

Here are the fictional observations used in our map. Queue counts are averages over a representative, reasonably stable period, rather than one snapshot taken on a quiet morning.

| Stage | Average orders waiting before it | Active processing per order | What tells the team to start |
| --- | ---: | ---: | --- |
| Release and approval | 100 | 12 min | The planner releases a list |
| Prepare the order | 150 | 18 min | The preparation team selects from its list |
| Check and dispatch | 250 | 10 min | A ready list is reviewed for checking and dispatch |

The start rules are part of the investigation. How often are those lists updated? Do all teams use the same priorities? Does an order wait after it is ready because nobody can see that fact?

::figure vsm-current-state | Fictional, simplified current-state map. The information path tells each team what to start; the order path shows where work waits. Counts are average waiting orders, excluding orders being processed.

A route of boxes alone would miss those questions. Draw the instructions as well as the order movement, and label the decisions that are still unclear.

## Build the timeline in consistent units

[Little's Law](https://doi.org/10.1287/opre.1110.0940) relates average work in a system, throughput and time in that system. Applied to a waiting queue with consistent boundaries and stable flow, average queue count divided by its flow rate estimates the average wait.

Here, all orders pass through each queue, so the stated flow rate is 50 a working day at each stage. Split routes, rework and changing throughput would need separate treatment.

:::formula Waiting time estimate
Before approval: 100 ÷ 50 = 2 working days
Before preparation: 150 ÷ 50 = 3 working days
Before check and dispatch: 250 ÷ 50 = 5 working days
Total waiting: **10 working days**
:::

The queue counts exclude orders being processed, so add the 40 minutes of active processing. The simplified estimate is 10 working days plus 40 minutes, or 4,840 working minutes.

If your WIP count already includes orders being processed, dividing it by throughput estimates their total time inside that boundary. Adding processing again would count it twice.

Check the estimate against actual order timestamps. A growing backlog or a period with unusual demand can make a tidy average a poor description of the current experience. Look at the spread as well as the mean, especially for late orders.

Working days also need a calendar. Ten working days are not necessarily ten calendar days. The conversion here uses 480 minutes per working day for comparison; it does not promise a dispatch date.

## Process cycle efficiency: decide what counts as value-added

**Process cycle efficiency**, or PCE, is commonly used for value-added time divided by total lead time. Some sources use processing time instead. State the numerator before comparing percentages.

The [EPA metrics guide](https://www.epa.gov/sites/default/files/2014-04/documents/metrics_guide.pdf#page=6) separates an activity ratio, processing time divided by lead time, from a value-added percentage. The distinction matters in this order route.

:::formula What the current observations establish
Activity ratio = 40 active minutes ÷ 4,840 total working minutes × 100 = 0.83%
PCE, using a value-added numerator = value-added minutes ÷ 4,840 × 100
:::

We know the active time. We have not yet established how much of it changes the order in a way the customer values. Approval, searching and repeated checks can take real effort without adding that value.

| Part of the timeline | Time available from this example | What it establishes |
| --- | ---: | --- |
| Waiting | 4,800 working minutes | Time the order waits between active steps |
| Active processing | 40 minutes | Work is being done, including any checks or rework |
| Customer value-added work | Not yet classified | The numerator needed for our PCE definition |

The PCE is therefore unresolved, not zero and not automatically 0.83%. Review the work elements before assigning it. A required check may remain necessary even when it is classified as non-value-added.

::figure paa2-time-classification | Fictional route, one working-time calendar. The 40 active minutes are known; their value-added share has not been established. The activity ratio is 0.83%. The time bands are labelled and not drawn to scale.

Keep total lead time beside either ratio. Removing an unnecessary processing step can lower the activity ratio while improving the process. Raising a percentage is not a reason to preserve work the order doesn't need.

## Compare the proposed changes

Suppose faster equipment reduces preparation from 18 minutes to eight. Hold throughput and the queues fixed for this first sensitivity test.

Active processing falls from 40 to 30 minutes. Total time falls from 4,840 to 4,830 working minutes, a reduction of about 0.21%.

Now test a different assumption: the final wait falls from five working days to one, with other waits and processing unchanged. Total waiting becomes six days, so total time is 2,920 working minutes. That is about 39.67% below the current estimate.

| Simplified scenario | Waiting | Active work | Total in working minutes |
| --- | ---: | ---: | ---: |
| Current state | 10 days | 40 min | 4,840 |
| Faster preparation only | 10 days | 30 min | 4,830 |
| Shorter final wait only | 6 days | 40 min | 2,920 |

::figure vsm-time-comparison | Fictional sensitivity tests. Processing and queue changes are shown separately. The proposed shorter wait has not been demonstrated, and faster preparation could affect throughput in a real operation.

This comparison is a reason to investigate the final wait. It is not evidence that the team can remove four days just by asking it to work differently.

Faster preparation may improve throughput if that stage constrains the operation. A large downstream queue may reflect a slow check, a release rule, a shipment schedule or several causes. Queue size alone cannot distinguish them.

## Turn the future map into a test

Take a sample of orders waiting before the final stage. Record when they became ready, what held them, and what finally triggered the next action. If the ready-list routine causes a delay, test a change to that routine. If checking lacks capacity, changing the list will not solve it.

Write down the proposed rule, its owner and the conditions for the trial. For example, a more frequent review of ready orders needs a person able to check them and a dispatch arrangement able to take them. Moving the queue outside the chosen boundary would merely improve the reported number.

Compare actual order lead times, completed orders, late deliveries and errors under comparable conditions. Track queue counts throughout the trial, including any queue that grows elsewhere.

Keep necessary checks. Ten minutes spent confirming the order is correct may protect the customer; it is not automatically ten minutes of value-adding work, nor automatically ten minutes to remove. Assess the purpose of each task before classifying it.

:::link /notes/5-whys-example/ | Investigate the explanation behind the wait
Use evidence to test the cause before choosing an action. The largest queue points to a question, not a completed diagnosis.
:::

The map earns its place when it changes the next question. Before ordering faster equipment, find out whether the order is waiting for a machine, a decision or permission to move.

## Sources

- Lean Enterprise Institute. [Value stream mapping](https://www.lean.org/lexicon-terms/value-stream-mapping/). Material and information flow, current and future states, process and lead time.
- [US EPA: Lean Government Metrics Guide](https://www.epa.gov/sites/default/files/2014-04/documents/metrics_guide.pdf), printed pages 5 and 8. Activity ratio, value-added time and the difficulty of classifying office work.
- Little, J. D. C. (2011). [Little's Law as viewed on its 50th anniversary](https://doi.org/10.1287/opre.1110.0940). The relationship between average work, throughput and flow time.

The route, queue counts, work times and proposed changes are fictional. The example assumes a stable common flow through all three stages. It illustrates which assumptions to investigate, not a demonstrated lead-time reduction.
