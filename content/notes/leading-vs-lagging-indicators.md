---
title: Leading vs lagging indicators: a warning you can still act on
date: 2026-10-14
updated: 2026-10-23
summary: Last week's dispatch score tells you what happened. Monday's readiness check can help with Friday's orders. Ten orders show why you need both, and why an early signal isn't a prediction.
seoTitle: Leading vs lagging indicators: practical examples
seoDescription: Compare leading and lagging indicators through ten orders. See how an early readiness check supports action, why warnings can be wrong and how to pair measures.
status: published
topic: Continuous improvement
keywords: leading vs lagging indicators, leading indicator examples, lagging indicator examples, operational KPIs, leading and lagging measures
---

Friday's dispatch report shows that two orders missed their deadline. By the time the team reviews it, both customers have already been kept waiting.

The report is still useful. It just arrives too late to change those two dispatches.

**A lagging indicator measures a result that has happened. A leading indicator checks a condition or activity earlier in the process, while there is still a chance to influence that result.** The distinction depends on the outcome you're trying to manage.

For dispatch reliability, a Monday check of parts readiness might help. Counting Monday's meetings probably won't tell you enough. A measure needs a plausible connection to the work, enough warning time and someone who can respond.

## Leading and lagging indicators, side by side

The [Health and Safety Executive's indicator guide](https://books.hse.gov.uk/gempdf/hsg254.pdf#page=7) pairs checks that controls are working with evidence of whether the intended outcome was achieved. It was written for process safety. We can apply that general measurement idea to ordinary operations without treating a dispatch example as safety guidance.

| Question | Leading indicator | Lagging indicator |
| --- | --- | --- |
| What does it check? | A condition or action before the chosen result | The result after it occurs |
| Dispatch example | Orders with a complete, verified parts kit by Monday 16:00 | Orders dispatched by Friday's promised cutoff |
| What can the team do? | Investigate gaps and arrange recovery while time remains | Investigate failures and improve the next cycle |
| Main limitation | The signal may miss problems or flag work that later recovers | It cannot change the result already recorded |

Both measures use things that have already been observed. A leading indicator isn't a reading from the future. Its value comes from where it sits in relation to a later outcome.

## Follow the same ten orders from Monday to Friday

Take a fictional assembly business with ten orders due for dispatch by Friday 17:00. Every order needs a parts kit before assembly. Monday's check records whether all required parts are verified and allocated to that order. A purchase order for missing parts doesn't count as readiness.

Six kits are ready at Monday 16:00. Four are not. That makes the early readiness measure 6 ÷ 10 = 60%.

By Friday, eight orders have dispatched on time. The other two are late. The lagging measure is 8 ÷ 10 = 80%.

The [OTIF and on-time delivery article](/notes/otif-vs-on-time-delivery/) explains why the event matters. This example measures dispatch from the supplier, not arrival at the customer, and doesn't claim an OTIF result.

::interactive indicator-order-history | Ten fictional orders, all due for dispatch by Friday 17:00. Readiness is recorded Monday at 16:00, before any recovery action; dispatch is assessed after Friday's cutoff. The full history stays visible. Buttons highlight the same order IDs across both observations. This small invented history illustrates warning errors, not predictive accuracy in a real operation.

Five of the six ready orders dispatch on time. One still runs late. Among the four not-ready orders, three recover in time and one remains late.

A missing kit therefore doesn't mean an order will certainly fail. Nor does a complete kit guarantee dispatch. Assembly, quality checks, packing or another constraint can still interrupt it.

The two percentages don't contradict each other. They describe different events at different times. Keeping the order identities lets the team see what happened between them.

## A readiness check needs a response

In this example, the four incomplete kits go to a named planner for review on Tuesday morning. The planner checks the missing items, their usable arrival dates and whether assembly can still finish before Friday's dispatch cutoff.

One gap may need a supplier follow-up. Another may be a stock-record error. A third may need a changed assembly slot. The [data quality note](/notes/data-quality-dimensions/) explains why a complete-looking stock record is not proof that the parts are available.

Record the response against the original Monday result. Don't overwrite “not ready” with “ready” after recovery and then claim the warning never existed.

The three recovered orders don't prove the review saved them. We haven't observed what would have happened without the response. They do give the team cases to examine: what changed, when did it change and did it leave enough time?

## How to choose a leading indicator

Start with one outcome and the part of the process that could prevent it. For our orders, missing kits are a candidate because assembly needs those parts. The team must still investigate whether that is a frequent source of real delays.

Other pairs could look like this:

| Desired result | Candidate earlier check | What needs checking before relying on it |
| --- | --- | --- |
| Quotes returned within two working days | New requests with confirmed dimensions at the first review | Whether clarification actually drives late quotes |
| Acceptance testing starts as planned | Required test data and access verified before the test window | Whether the check leaves enough time to repair a gap |
| Fewer repeat defects | Agreed corrective actions checked in use | Whether the action addresses the tested cause and stays in use |

These are candidates, not proven predictors. “Training complete” could measure attendance without showing that someone can perform the task. “Action closed” could mean a document was signed without a working change.

Choose a check close enough to the work that a failed result suggests a practical response. Then compare it with later outcomes over repeated periods. Keep the cases that went wrong despite passing the check, as well as those that recovered after failing it.

## Keep the outcome in the review

If readiness rises but late dispatches continue, inspect the missed orders. The check may overlook an important condition, or the kit may be ready too late for the remaining work. The [value stream mapping example](/notes/value-stream-mapping-example/) helps locate that waiting and processing time.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch Vrolen's three production clocks
This separate order example compares takt time, cycle time and lead time. It helps distinguish time spent working from the full time an order needs, including waiting.
:::

For a broader explanation of flow and pull, [Vrolen's Lean manufacturing guide](https://vrolen.com/blog/lean-manufacturing/) connects these checks to the work moving through the process. Adding another score doesn't remove a queue.

For the next dispatch cycle, pair Monday's readiness check with dispatch against the original promise. Record the flagged order IDs, follow-up owners and review times, then check whether those actions reached the orders before their deadlines.

## Sources and example notes

- [HSE: Developing process safety indicators, HSG254](https://books.hse.gov.uk/gempdf/hsg254.pdf), 2006, pages 7–8, 22–23 and 26. Paired leading and lagging measures, checks close to critical activities and review when measures and outcomes disagree. Its subject is major-hazard process safety; this article's order example is an original application to dispatch planning.

All orders, times, actions and outcomes are fictional. The ten-order history isn't a study of the relationship between readiness and delivery. No causal effect or validated prediction is claimed, and the suggested review times are choices for this example.
