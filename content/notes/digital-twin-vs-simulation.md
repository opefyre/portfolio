---
title: Digital twin vs simulation: follow one changing production line
date: 2026-10-14
summary: A model says the line will finish before the cutoff. Production has slowed down. See what a current data connection adds, and why it can still give the wrong answer.
seoTitle: Digital twin vs simulation: a manufacturing example
seoDescription: Compare a digital twin with simulation through one packing line. Explore changing inputs, stale data and the checks needed before trusting a finish forecast.
status: published
topic: Digital transformation
keywords: digital twin vs simulation, digital twin manufacturing example, what is a digital twin, simulation model, digital twin data
---

At noon, the planning model says the packing line will finish by 13:00. The supervisor looks at the queue and knows that estimate is out of date. There are more cartons waiting, and the line is running slower than planned.

Someone suggests building a digital twin. Before choosing the technology, it helps to separate two jobs: calculating what might happen and keeping the model connected to the operation it represents.

**Simulation runs a model under chosen conditions to explore what could happen. A digital twin maintains a digital representation of a particular real operation through a defined connection with it.** A twin can use simulation; simulation can also use current operating data.

The [Digital Twin Consortium's definition](https://www.digitaltwinconsortium.org/initiatives/the-definition-of-a-digital-twin/) specifies synchronisation at an agreed frequency and level of detail. It doesn't require a photorealistic factory or an update every millisecond.

## What changes when a model becomes a digital twin?

Consider a model of packing line C04. It contains a queue and a processing-rate estimate. You could use it once to compare layouts, refresh it manually before a shift or maintain it through an operating data connection.

| Question | Simulation model | Digital twin |
| --- | --- | --- |
| What does it represent? | A proposed or existing system under stated assumptions | An identified real entity or process with a maintained digital representation |
| How do inputs arrive? | Manual entry, files, historical data or live feeds | Defined integration and synchronisation with the represented operation |
| Can it test a proposed change? | Yes, when the model supports that question | Yes, if it contains a suitable scenario model |
| What needs maintaining? | Model logic, assumptions and validation | Those, plus identity, integration, update rules and the link's health |
| Does it need 3D graphics? | No | No |

The terms overlap because they describe different aspects of the setup. A connected model doesn't stop using simulation. A manually refreshed simulation doesn't become useless because it lacks an automatic feed.

[NIST's manufacturing work](https://www.nist.gov/programs-projects/digital-twins-advanced-manufacturing) puts synchronisation, validation and uncertainty among the central challenges. The connection creates work to maintain as well as information to use.

## The same inputs should give the same finish estimate

Our fictional line has a 14:00 packing-completion cutoff. The original noon plan assumes 120 cartons remain and the line produces two accepted cartons per minute. At that rate, 120 ÷ 2 = 60 minutes, giving a 13:00 finish.

At 12:00, the checked queue is actually 180 cartons and the current accepted-output rate is 1.5 per minute. The estimate becomes 180 ÷ 1.5 = 120 minutes, finishing at 14:00.

Someone can type those inputs into a model. An integration can supply them. With the same calculation and inputs, both give the same answer.

::interactive twin-state-freshness | Fictional snapshots for line C04, with a 14:00 packing-completion cutoff. This is a simple constant-rate projection, not a working digital twin or a discrete-event simulation. No new arrivals, breaks, defects or future stops are modelled. The five-minute data-age limit is an illustrative operating rule, not an industry standard.

Now select the 12:30 slowdown. Only 30 cartons have been completed since noon, leaving 150. The latest rate estimate is one accepted carton per minute. Continuing at that rate takes another 150 minutes, so the finish moves to 15:00.

The manually refreshed and connected records agree again. The value of the connection is that it can keep supplying the relevant state without someone repeatedly collecting and entering it. Whether that earns its cost depends on how often the decision changes and how reliably the update works.

## A connected model can still be stale

Select the delayed-link case. The example is now at 12:30, but the linked record still contains the noon queue and rate. Its old 14:00 forecast hasn't changed.

A fresh-looking dashboard could present that as reassurance. A useful operating view shows when the underlying observation applies and whether the information is still suitable for the decision.

Here, a five-minute data-age rule flags the 30-minute-old record for review. The supervisor needs a checked update before relying on it. The old prediction remains visible as a record of what the model said at noon; it isn't recalculated as though the old queue were observed at 12:30.

The [ERP, MES and SCADA example](/notes/erp-mes-scada/) explains why event time, message arrival and quantity meaning need separate treatment. Getting data quickly won't help if a processed-carton count is being treated as accepted output.

## Current data doesn't validate the forecast

Even the refreshed 15:00 estimate assumes the recent rate will continue. A restart could restore speed. Another stoppage could make it worse. New urgent orders could join the queue.

Use the estimate to identify the decision that needs attention: can the cutoff still be met, what alternatives exist and who can authorise them? Test proposed changes with a model that includes the conditions those changes affect.

A richer simulation may need arrivals, product mix, breaks, breakdowns and shared people. [NIST's Simantha](https://www.nist.gov/services-resources/software/simantha-simulation-manufacturing) is an example of discrete-event manufacturing simulation that models lines, buffers and maintenance. More detail is useful when it changes the answer and can be supported with evidence.

Compare predictions with actual outcomes under representative conditions. Record which data and model version produced each result. The [data quality note](/notes/data-quality-dimensions/) covers input checks; validation also asks whether the model's behaviour matches the operation well enough for its intended use.

## Choose the update method around the decision

If you compare next quarter's layout options, a carefully checked model refreshed for that study may be enough. Maintaining a continuous feed could add cost without changing the decision.

If supervisors revise release decisions throughout the shift, the current queue and equipment state may matter repeatedly. That makes an operating connection more relevant, together with a response when it fails.

[Vrolen's comparison of twins, simulation and process mining](https://vrolen.com/blog/digital-twin-vs-simulation-vs-process-mining/) places those methods alongside each other. The [process mining note](/notes/process-mining-vs-process-mapping/) shows how event histories can explain the paths work took before you model alternatives.

Start by writing the decision, the state it depends on and how old that state can be before the answer becomes unreliable. That gives you a concrete requirement to test, whether the eventual system is called a simulator, a twin or something else.

## Sources and example notes

- [Digital Twin Consortium: Definition of a Digital Twin](https://www.digitaltwinconsortium.org/initiatives/the-definition-of-a-digital-twin/), including frequency, fidelity and prototypes before integration.
- [NIST: Digital Twins for Advanced Manufacturing](https://www.nist.gov/programs-projects/digital-twins-advanced-manufacturing), synchronisation, model validation and uncertainty.
- [NIST: Simantha, Simulation for Manufacturing](https://www.nist.gov/services-resources/software/simantha-simulation-manufacturing), an example of discrete-event simulation scope.

The line, counts, rates and timestamps are fictional. All forecasts assume constant future accepted output and no arrivals. Completion is packing completion, not shipment or delivery. The interactive view loads teaching snapshots when selected; it has no live factory connection and claims no validated prediction accuracy.
