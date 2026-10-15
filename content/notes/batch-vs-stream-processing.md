---
title: Batch vs stream processing: differences and a data example
date: 2026-10-15
summary: At 09:06:30, one stock view says 80, another says 70 and the source balance is 60. Follow event time, arrival time and publication to see why.
seoTitle: Batch vs stream processing: differences and example
seoDescription: Compare batch and stream processing through a stock timeline. Change refresh timing and inspect late events, duplicates and the balance users can see.
status: published
topic: Digital transformation
keywords: batch vs stream processing, real time vs batch data, data latency example, event time vs processing time, inventory data freshness
---

**Batch processing handles a defined group of records in one job. Stream processing handles an ongoing flow as records become available.** Streaming usually aims to shorten the wait, but it still has collection, processing and publication delays.

At 09:06:30, a stock dashboard shows 80 pieces. A five-minute batch view shows 70. The source balance in our example is already 60.

The stream has processed a newer receipt but has not received an earlier issue. The batch is behind both. A recent update can still leave a missing movement.

[Microsoft's architecture guide](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/big-data-architectures) describes the two processing routes. The same timing choices appear in an ordinary stock feed.

## Batch vs stream processing: key differences

| Question | Batch processing | Stream processing |
| --- | --- | --- |
| What work is grouped? | A defined set of records for a job | An ongoing flow handled as records become available |
| When is a result visible? | After the job prepares and publishes it | After ingestion, processing and publication delays |
| What happens with a missing event? | It stays absent until a later job receives it | It stays absent until it arrives and is processed |
| A use to consider | Periodic reconciled reporting | A view that needs frequent updates |

Neither route proves that every earlier event has arrived. To understand the stock number, separate the clocks behind it.

## Event time, arrival time and visible time

A movement happens in the warehouse, reaches a processing service, then appears in the user's view. Those times can differ.

| Clock | What it tells you | Example |
| --- | --- | --- |
| Event time | When the business movement happened | Twenty pieces were issued at 09:04 |
| Arrival time | When its record reached the receiving service | The issue record arrived at 09:07 |
| Visible time | When the prepared view exposed the result | The streaming view showed it at 09:07:10 |

[Microsoft's time-handling documentation](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-time-handling) explains why event and arrival times need separate treatment. It also describes policies for late and out-of-order data. Choose the policy for the system and the decision it supports.

For a planner, “updated just now” describes only one clock unless the screen explains which one.

## Data processing example: stock events and a duplicate

Our fictional item starts with a confirmed 100 pieces at 09:00. All records refer to the same item, location and stock definition. Issues reduce the balance; receipts increase it.

| Record | Movement | Event time | Arrival time |
| --- | ---: | --- | --- |
| E1 | Issue 30 pieces | 09:02:00 | 09:02:10 |
| E2 | Issue 20 pieces | 09:04:00 | 09:07:00 |
| E1 again | Same issue, repeated delivery | 09:02:00 | 09:05:00 |
| E3 | Receipt 10 pieces | 09:06:00 | 09:06:10 |

The service recognises the repeated E1 and applies that movement once. E2 arrives after E3, even though its issue happened earlier.

We define the streaming view to publish each accepted movement ten seconds after arrival. The batch view collects all arrivals up to a scheduled cutoff, removes duplicates and publishes thirty seconds later. Both start from the confirmed 09:00 balance.

These are teaching timings. A batch can run frequently; a stream can lag. Measure the actual path rather than inferring a delay from its label.

## Compare batch and streaming results over time

At 09:06:30, the source has issued 30 and 20, then received ten: 100 − 30 − 20 + 10 = **60 pieces**.

The streaming view has E1 and E3, so it shows 80. E2 has not arrived. The five-minute batch published its 09:05 cutoff at 09:05:30, so it shows 70. A fifteen-minute batch has not published a new result and still shows 100.

::interactive data-freshness-clock | Fictional stock-movement replay from 09:00 to 09:16. The source balance uses the known event list; a real downstream screen may not know which events are missing. Stream publication is ten seconds after arrival. Batch jobs cut off every five or fifteen minutes and publish thirty seconds later. Both retain E2 and apply E1 only once.

Move the decision time forward. The stream becomes 60 at 09:07:10, after the late issue is processed. The five-minute batch reaches 60 at 09:10:30. The fifteen-minute batch reaches it at 09:15:30.

At 09:06:30, the newest event in the streaming view happened at 09:06. That recent timestamp hides the missing 09:04 issue. A “last updated” label alone cannot tell the planner whether the history is complete.

## Late events vs duplicate events

E2 is new information arriving late. It must reduce the balance once it is accepted. E1's repeated delivery is information already applied; subtracting it again would invent a second issue.

The [EDI and API note](/notes/edi-vs-api/) follows the same identity problem for orders. The processing contract needs a stable event identity, a duplicate-retention rule and a defined response when the same identity carries conflicting content.

Here, each record adds to or subtracts from the balance, so their final sum is unchanged by arrival order when every unique movement is retained. A stock snapshot, a cumulative counter or a business action may need a different ordering rule. Do not add snapshots together as though they were movements.

Vrolen's [OPC UA and MQTT guide](https://vrolen.com/blog/opc-ua-mqtt-manufacturing/) uses a separate cumulative-counter example to explain that distinction and the source context that must travel with a value.

## When to use batch or stream processing

A monthly stock-cost review may tolerate a completed daily batch. A screen used to release a pick needs a much tighter agreement on how recent and complete its input must be.

| Decision question | What to agree |
| --- | --- |
| How old can the input be? | A maximum acceptable delay for that decision, including processing and screen refresh |
| What happens when records are late? | Retain, correct, hold or flag results under an explicit policy |
| Can the user see incomplete input? | Show the relevant cutoff, delay or unresolved status |
| Who owns the operational balance? | Name the system that confirms the action, rather than treating an analytical copy as a reservation |

[ETL and ELT](/notes/etl-vs-elt/) explain where data preparation happens. Batch and stream processing describe how that work is organised over time. Either route still needs the right units, identities and stock definition.

For our planner, the next task is to find why E2 took three minutes to arrive and decide how the screen should behave while a feed is delayed. Shortening the batch interval helps one part of the path. It cannot make a missing source event arrive sooner.

## Sources and example notes

- Microsoft Learn. [Big data architectures](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/big-data-architectures). Batch and stream-processing routes.
- Microsoft Learn. [Understand time handling in Azure Stream Analytics](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-time-handling). Event and arrival time, late data and ordering policies.

All quantities, events and delays are fictional. Each movement has a stable item, location and event ID; all unique records eventually arrive. The batch result is rebuilt from all accepted unique arrivals up to its cutoff. Before using either feed to authorise dispatch, agree how stale or incomplete records will be handled.
