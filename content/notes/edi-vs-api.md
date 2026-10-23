---
title: EDI vs API: differences, integration and a supply-chain example
date: 2026-10-15
summary: An order can arrive without being accepted. Follow the same purchase order through EDI, an API and a combined route, including the retry that must not create a second order.
seoTitle: EDI vs API: differences and integration example
seoDescription: Understand EDI and API integration through one purchase order. Compare the routes, business responses and duplicate-message handling that both need.
updated: 2026-10-23
status: published
topic: Digital transformation
keywords: EDI vs API, EDI explained, API integration supply chain, electronic data interchange, purchase order integration
---

**Electronic data interchange (EDI) exchanges business documents between computer systems using agreed standards. An application programming interface (API) defines how software can request data or ask another system to do something.** An order can use either, and one route can include both.

Purchasing sends an order for 100 brackets, needed on Wednesday. The integration screen says it went through.

On Wednesday, nothing arrives. The supplier received the message, but its response offered Friday. That response never reached the buyer's order screen.

The buyer still needs to decide whether Friday is acceptable. The integration must distinguish a received message from an accepted delivery commitment.

## EDI vs API: what actually differs?

EDI gives trading partners a shared structure for documents such as purchase orders, invoices and shipping notices. Each partner still needs to agree the document version, fields and business rules, and map them to its own system.

An API exposes an interface, such as submitting an order or asking for its status. Its contract describes the permitted requests and responses. The software on either side still needs to understand the item, unit, dates and outcome.

[IBM's EDI/API comparison](https://www.ibm.com/think/topics/edi-vs-api) explains both approaches and their use together. Modern EDI can support rapid exchange too; it is not necessarily a nightly file. Equally, an API request can start work that completes later. [Batch vs stream processing](/notes/batch-vs-stream-processing/) explains the timing choice separately from the interface.

| Question | EDI | API |
| --- | --- | --- |
| What does the partner receive? | A business document in an agreed standard and partner specification | A request or response defined by the interface contract |
| An order example | Translate the buyer's purchase order into the supplier's order record | Call an order-submission interface that creates the supplier's order record |
| How do updates return? | Agreed response documents or status messages | A status request, notification or another documented response route |
| What sets the timing? | Transport, processing schedule and partner commitments | Interface behaviour, queues and the receiving business process |
| What still needs agreeing? | Item mapping, units, identity, business response and exception handling | The same business meanings, alongside the interface rules |

Compare the partner connection, its response times and the work required to maintain it. The label alone tells you little about those costs or performance.

## EDI and API integration example: one purchase order

Our fictional buyer uses EDI with a supplier. The supplier's integration service translates the document and calls an internal API to put it into its enterprise resource planning system, or ERP.

One order crosses both interfaces; it should still create only one supplier order.

::interactive order-exchange-route | Fictional purchase order PO-1042 for 100 individual brackets, requested for Wednesday. The fields show the business information, not a message format to implement. The supplier offers Friday; this is not a confirmed revised date until the buyer agrees.

The transport receipt tells the buyer that the message reached the receiving service. The ERP's record tells the supplier that an order exists. The business response tells the buyer whether its quantity and requested date can be met.

Those are separate events. The response needs to reach the order's owner, not just a technical log. Here, the buyer must accept Friday, agree an alternative or keep the order unresolved while looking for supply.

The [ATP and CTP example](/notes/atp-vs-ctp/) explains the supply and capacity checks behind a promise. A quick message cannot make an unavailable delivery date feasible.

## API retries and duplicate-order prevention

Now suppose the internal API creates supplier order SO-310, but its reply is lost. The sender sees a timeout and tries again.

Without duplicate handling, a second request could create another order for the same 100 brackets. The buyer asked once, but the supplier now has two records to fulfil.

A safer design gives the intended operation a stable identity and makes retries return or refer to the existing result. This is called **idempotency**: repeating the operation has no additional effect beyond the first successful application. AWS's [guide to safe API retries](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) explains why a caller-provided request identifier helps express that intent.

| Event in our proposed design | Identity and handling | Supplier order count |
| --- | --- | ---: |
| First submission succeeds; reply is lost | Buyer + PO-1042 + revision 1 creates SO-310 | 1 |
| Same submission is retried | Recognise the same operation and return the recorded outcome for SO-310 | 1 |
| Buyer later changes the requested date | Process an explicit authorised amendment, with its own revision and checks | Still 1 order, updated only if the amendment is accepted |

This identity rule is an example to agree with the partner, not a universal EDI or API feature. Define how long duplicate records are retained, what happens if the same identity carries different content, and how order creation stays consistent with the duplicate record.

Apply that thinking across the whole route. Protecting the API call does not help if a retried EDI message receives a fresh identity upstream and creates another order before the check can recognise it.

## EDI and API data mapping: items, units and dates

The buyer's code BRKT-01 may map to a different supplier code. “100” needs a unit. A requested delivery date is different from a shipping date. If those meanings are wrong, a perfectly delivered message can create the wrong order.

The [master-data guide](/notes/master-data-vs-transactional-data/) follows a box-size change that distorts quantities. Vrolen's [manufacturing software guide](https://vrolen.com/blog/manufacturing-software-guide/) goes further into which systems own records and how information should pass between them.

For this connection, agree who owns the order record, the permitted changes, the business response time and the person who handles a rejection or missing reply. State what the buyer's screen should show while acceptance is pending.

## Interoperability: transfer, meaning and usable work

**Interoperability is the ability of systems to exchange information and use it appropriately together.** A successful connection handles only part of that requirement.

[IBM's interoperability overview](https://www.ibm.com/think/topics/interoperability) uses four levels: foundational, structural, semantic and organisational. Other authors group these levels differently. Check which distinctions the team needs for the systems being connected.

| Level in IBM's description | Check on our purchase order |
| --- | --- |
| Foundational: transfer | Can the message reach the intended receiving system? |
| Structural: format | Can that system read the agreed fields and document version? |
| Semantic: meaning | Do both sides interpret 100 as individual brackets and Wednesday as a delivery request? |
| Organisational: working arrangements | Who can accept Friday, who receives the exception and when must they respond? |

The existing order route shows why all four matter. A valid message can still carry the wrong unit or leave a changed date without an owner. [Data governance](/notes/data-governance-explained/) helps establish who agrees those meanings and rules; the interface must then implement them.

## Test the missing reply as well as the successful order

Send the 100-piece order, lose the reply, retry it and check that SO-310 still exists only once. Send an unknown item and check that it becomes a visible exception rather than a silent substitution. Return Friday instead of Wednesday and confirm that the buyer sees an unresolved delivery change.

These are business-flow tests. The [SIT and UAT note](/notes/sit-vs-uat/) separates checking that systems exchange information from checking that people can use the result to do the job.

Choose the route the partners can support, then follow an order from submission through response, amendment and receipt. For the buyer waiting on Wednesday's brackets, the valuable result is a clear supply commitment and a visible exception when it cannot be met.

## Sources and example notes

- [IBM: Interoperability](https://www.ibm.com/think/topics/interoperability). Four-level description used in the comparison.
- IBM. [EDI vs API](https://www.ibm.com/think/topics/edi-vs-api). Document exchange, software interfaces and combined implementations.
- Amazon Web Services Builders' Library. [Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/). Request identity and repeated operations.

The company, order references and message route are fictional. Transport, document validation, record creation and business acceptance are distinct checks; a particular connection may expose them differently. Agree amendment and duplicate-handling rules across every step that can create an order.
