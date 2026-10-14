---
title: Process mapping vs process mining: follow the missing loop
date: 2026-10-14
summary: The map shows an approval followed by closure. The records show requests returning for correction. Use four small event traces to see what each view adds and what it leaves unanswered.
seoTitle: Process mapping vs process mining: an example
seoDescription: Compare process mapping and process mining through four approval requests. Explore event logs, repeated steps and elapsed time, with an interactive example.
status: published
topic: Digital transformation
keywords: process mapping vs process mining, process mining example, event log example, process variants, process discovery
---

The workshop produces a simple approval map: submit the request, review it, approve it and close it. Everyone recognises the sequence.

The system records tell a longer story. Some requests come back for correction and go through review again. That loop is missing from the map.

**Process mapping** describes a process visually, often using observation, conversations and documents. **Process mining** uses recorded events to examine process behaviour, including the paths cases follow and their timing.

A map can show the agreed or observed method. Event records help test how often the recorded work follows it. For this approval process, the gap gives the team a specific question to investigate.

## Put the map beside the records

Our fictional team handles routine purchase requests. Its initial map contains four steps. It was intended to describe current work, but the workshop didn't include returned requests.

A flowchart can include decisions and loops. They aren't a feature reserved for mining software. [ASQ's flowchart guidance](https://asq.org/quality-resources/flowchart) recommends defining the boundary and checking the map with people involved, including walking through the process.

The [Process Mining Manifesto](https://www.tf-pm.org/resources/manifesto), produced by the IEEE Task Force on Process Mining, starts from events linked to activities and individual cases. Here, one case is one request. Timestamps let us examine elapsed time.

| View | What we have in this example | What it contributes |
| --- | --- | --- |
| Initial map | Submit → Review → Approve → Close | The sequence the workshop recorded |
| Event log | Request ID, activity and timestamp | The recorded path and timing for each request |
| Checked process map | The sequence plus verified return rules | An explanation the team can use and improve |

Process mining can support discovery of a model, comparison with an existing model and adding information to it. You still need to decide what the records mean.

## A small event log you can follow

Take four completed requests on the same fictional working day. Every timestamp uses UTC, and each event records the named action at that moment.

The three core fields here are the request ID, activity and timestamp. [PM4Py's introductory example](https://github.com/process-intelligence-solutions/pm4py/blob/release/docs/source/getting_started.rst) uses the same basic event-table structure, with optional additional information.

For R102, the first records are:

| Request | Activity | Time, UTC |
| --- | --- | --- |
| R102 | Submitted | 08:05 |
| R102 | Reviewed | 08:15 |
| R102 | Returned | 08:20 |
| R102 | Resubmitted | 10:00 |
| R102 | Reviewed | 10:10 |
| R102 | Approved | 10:30 |
| R102 | Closed | 10:40 |

The second Reviewed event belongs to the same request. Removing it as a duplicate would erase the loop we need to understand.

The figure below shows both recorded routes. Select a request to see its full log and the intervals between events. Hover over the timeline or use the interval control to inspect the timestamps behind it.

::interactive process-event-traces | Four fictional closed requests, 22 events, on 1 October 2026. All clocks use UTC. Timelines align each request at its own submission time and share a 0–160-minute scale. This small trace explorer reconstructs the supplied sequences; it does not run a process-discovery algorithm or estimate typical business performance.

The two direct requests take 40 and 60 minutes from submission to closure. The two returned requests take 155 and 115 minutes. Across all four, the average is 92.5 minutes.

| Recorded route | Requests | Average elapsed time |
| --- | ---: | ---: |
| Direct approval | 2 | 50 minutes |
| Returned once | 2 | 135 minutes |
| All requests | 4 | 92.5 minutes |

The returned cases are longer in this constructed example. Four teaching cases don't establish a general return rate, a service benchmark or the effect of removing a step.

## A long interval isn't automatically idle time

R102 has 100 minutes between Returned at 08:20 and Resubmitted at 10:00. That is the largest interval in its trace.

It could contain correction work, waiting for information, other tasks or a late system update. The log contains no start-and-finish record for the correction work, so it can't separate those possibilities.

Calling all 100 minutes waste, or claiming that automating a click saves 100 minutes, would go beyond these records. Ask the requester and reviewer what happened. Check the original request and the reason for return.

The [value stream mapping example](/notes/value-stream-mapping-example/) separates processing and waiting when that evidence is available. [Vrolen's cycle time and lead time video](https://www.youtube.com/watch?v=34Z2IQJOeDU) also distinguishes processing time from the longer journey, using a different example.

## Check the log before believing the path

A case ID groups the events you will treat as one journey. In this example, the request ID works because each trace describes one request from submission to closure.

For a customer order with several deliveries, that choice is harder. An order, order line and shipment can represent different journeys. Choose the boundary around the question, rather than combining every event with a shared customer number.

Check activity meaning and timestamps too. A recorded review might mean opening a screen, completing a check or changing a status. Those actions don't support the same timing conclusion. An overnight import time isn't necessarily when the work happened.

Keep unrecorded steps visible as gaps in your knowledge. A phone call or manual correction can affect the work without appearing in the exported events. The [data quality guide](/notes/data-quality-dimensions/) helps organise checks on identity, completeness and timing before drawing a convincing path from unreliable records.

For a manufacturing application, [Vrolen's process-mining guide](https://vrolen.com/blog/process-mining-manufacturing/) discusses order identities, physical work and validation at the process. This article keeps the example small enough to inspect every event.

## Bring the finding back to the team

The immediate finding here is that two recorded requests followed a return loop absent from the initial map. Update the map with that route after checking its meaning and the condition that triggers it.

Then investigate the returns. If required information was missing, inspect how the request form and review rules handle it. If the return was legitimate, preserve that route and work on making it easier to complete.

Use [5 Whys](/notes/5-whys-example/) to test an explanation, and [PDCA](/notes/pdca-cycle-example/) to trial a change. Check whether the change reduces unnecessary returns without weakening the approval decision.

For this team, the next step is to read the two returned requests and check why they came back. Then the revised map can show the route and the rule behind it.

## Sources and example notes

- [PM4Py: Getting started](https://github.com/process-intelligence-solutions/pm4py/blob/release/docs/source/getting_started.rst). Event tables, case identifiers, activity names and timestamps.
- [ASQ: Flowchart](https://asq.org/quality-resources/flowchart). Process boundaries, decisions, loops and validation with people doing the work.
- [IEEE Task Force on Process Mining: Process Mining Manifesto](https://www.tf-pm.org/resources/manifesto), 2011. Section 2 and guiding principles 1 and 2 cover event-based analysis, data quality and question-led case selection. [English PDF](https://www.tf-pm.org/upload/1580737614108.pdf).

All requests and timestamps are fictional. Elapsed intervals include whatever happened between recorded events; they are not measured labour or waiting time. The example includes only closed cases and a single return per returned case. A real review must also examine open cases, missing events and a representative period.
