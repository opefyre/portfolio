---
title: Event-driven architecture: meaning and an order example
date: 2026-10-20
summary: An accepted order reaches the warehouse before billing. Follow the event, the separate consumers and the failed delivery to see what the architecture still needs to control.
seoTitle: Event-driven architecture: meaning and example
seoDescription: Follow an order through an event-driven architecture. Compare events, commands and requests, then inspect delayed consumers, retries and missing evidence.
status: published
topic: Digital transformation
keywords: event driven architecture example, event driven architecture vs microservices, event vs command, event driven systems
---

An order is accepted. The warehouse sees it within seconds. Billing does not receive the update until five minutes later.

There is no single instant when every system necessarily knows the same thing.

**Event-driven architecture connects parts of a system through notifications that something happened.** A producer publishes an event, a channel carries it and consumers react to it. [Microsoft's architecture guide](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven) describes this separation, along with its delivery and consistency challenges.

The separation lets consumers work independently. The business still needs an agreed way to handle their different states.

## Event, command and request in the same order

Our fictional distributor accepts order 1042 for 100 units after its required checks. The order service records that acceptance and publishes an event with an identity, order reference and version.

| Message | Meaning in this example | Responsibility |
| --- | --- | --- |
| OrderAccepted | The order service has accepted the order | State a recorded fact for interested consumers |
| ReserveStock | Ask the inventory service to reserve the quantity | The receiving service must accept or reject the requested action |
| GetOrderStatus | Ask for the current recorded status | Return a response from the responsible system |

Naming a request as though it already happened would hide a failure. Publishing “StockReserved” before the reservation is confirmed would give other systems evidence that does not exist.

## Follow the consumers separately

The warehouse and billing services receive OrderAccepted independently. In this design, billing prepares an account check; it does not issue an invoice merely because the order was accepted.

::figure paa3-event-route | Fictional order example. Warehouse processing succeeds while the billing consumer is delayed. Event E1042-1 keeps the same identity on retry. An event published by the producer is not evidence that both consumers completed their work.

| Time | Order service | Warehouse consumer | Billing consumer |
| --- | --- | --- | --- |
| 09:00 | Acceptance recorded; E1042-1 published | Waiting for delivery | Waiting for delivery |
| 09:00:05 | Same accepted order | Work item recorded | Delivery failed; awaiting retry |
| 09:05 | Same accepted order | Existing work item remains | Event applied after recovery |

Keep delivery and processing evidence separate. Receiving a message does not establish that the requested business work completed.

In this example, dispatch must wait for both confirmed reservation and account clearance. An authorised coordinator checks those conditions. The architecture does not make that release rule appear automatically.

## Retries need identities and a recovery route

If the warehouse receives E1042-1 twice, it should not create two independent pick orders for the same accepted version. Its handling needs to recognise the event already applied, or otherwise make repetition safe.

If a later order version arrives before an earlier one, the consumer needs a version check rather than applying arrival order blindly. For this example, it holds the later version for reconciliation until the missing earlier change is resolved. The integration owner is responsible for that exception.

Retain the failed delivery, retry status and consumer result so the support team can find what is missing. If repeated retries cannot succeed, someone needs an exception to resolve. Quietly dropping the event leaves the order accepted in one place and invisible in another.

[EDI vs API](/notes/edi-vs-api/) follows a similar problem when an order response is lost. [Batch vs stream processing](/notes/batch-vs-stream-processing/) distinguishes when an event happened, when it arrived and when the result became visible.

## Event-driven architecture vs microservices

Microservices divide software into separately managed services. Event-driven design concerns how components communicate and react. A microservice can use a direct request and response; a larger application can use events internally.

Likewise, [Apache Kafka](https://kafka.apache.org/intro/) is an event-streaming platform that can support an architecture. Installing it does not define the business events, authority, recovery rules or complete application design.

[Change data capture](/notes/change-data-capture-explained/) detects database changes. A changed row may help produce an event, but it is not automatically the same as an accepted business fact. A status field changed during correction needs its own interpretation.

## Use the approach when independence earns its upkeep

Events can help when several consumers need the same fact and should evolve or process work independently. They also add queues, delays and recovery work that someone must operate.

For a simple workflow that needs one immediate answer, a direct request may be easier to run. For a process needing several confirmed outcomes before an irreversible action, agree the coordination and failure handling before drawing independent boxes.

For order 1042, a useful operating view shows the accepted order, reservation, account clearance and release decision together. “Event sent” alone cannot tell the team whether it may ship.

## Sources and example notes

- [Microsoft: Event-driven architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven). Producers, consumers, consistency, ordering, retries and suitability.
- [Apache Kafka: Introduction](https://kafka.apache.org/intro/). Kafka's role as an event-streaming platform.

Order, event identity, times and release conditions are fictional. The route is conceptual, not a complete transaction or security design. The example assumes acceptance is recorded before publication; implementing reliable publication and recovery requires tests.
