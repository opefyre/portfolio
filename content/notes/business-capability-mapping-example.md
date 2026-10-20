---
title: Business capability mapping: meaning and a practical example
date: 2026-10-20
summary: Three teams have order dashboards. None can reliably promise a delivery date. Map what the business needs to do before choosing which system to improve.
seoTitle: Business capability mapping: meaning and example
seoDescription: Build a business capability map for customer orders. Separate capabilities from processes, departments and apps, then use evidence to choose an investment.
status: published
topic: Digital transformation
keywords: business capability mapping example, business capability map, capability vs process, capability mapping
---

Sales has an order dashboard. Planning has another. The warehouse has a third. The next proposal is to combine them into one screen.

Before approving that work, the company needs to know why nobody can give the customer a reliable delivery date.

**A business capability describes something the business needs to be able to do. A capability map groups those abilities so people can examine how they are supported.** Order promising, inventory control and returns management are examples.

[SAP LeanIX's explanation](https://www.leanix.net/en/blog/business-capability-mapping) separates this view from an organisation chart. A capability can involve several teams and systems. One department can contribute to several capabilities.

## Capability vs process vs application

Our fictional distributor wants to improve the service from customer request to accepted delivery. These are different views of that work:

| View | Example | What it helps explain |
| --- | --- | --- |
| Capability | Order promising | What the business must be able to do |
| Process | Check supply, check capacity, agree a date, record the commitment | How the work happens |
| Department | Sales or Planning | Where people and authority are organised |
| Application | Order-entry system or planning tool | Which software supports parts of the work |

A [process map](/notes/process-mining-vs-process-mapping/) shows the sequence and handoffs. A capability map does not need to repeat those steps. It provides a steadier set of subjects to examine when teams, systems or procedures change.

## Start with a small map around the decision

The distributor groups a few capabilities under customer-order service. This is a deliberately small map, not a complete model of the company.

::figure paa3-capability-map | Fictional capability map. Order promising, inventory control, fulfilment and returns are grouped around customer-order service. The evidence below identifies a gap in promising; the presence or number of applications is not a capability score.

The team then asks how each capability works today. It inspects real records rather than assigning a colour from memory.

| Capability | Current support | Evidence worth checking |
| --- | --- | --- |
| Order promising | Order system plus planner judgement | Can a promise be traced to usable supply and capacity? |
| Inventory control | Warehouse system and count routine | Do location balances reconcile and exceptions get resolved? |
| Fulfilment | Pick, pack and dispatch process | Do the correct goods reach the customer within the agreement? |
| Returns management | Service inbox and warehouse receipt | Can a return be traced through credit, stock and final disposition? |

Ten sampled order promises have recorded dates. Only four have evidence of a supply and capacity check. The other six are unresolved in the review, rather than automatically proven wrong.

The screen consolidation proposal would make all ten dates easier to see. It would not create the missing checks.

## Connect the map to an investment choice

For this distributor, the immediate work is to agree a promising method, responsibility and evidence. The [ATP vs CTP example](/notes/atp-vs-ctp/) explains the distinction between available supply and the ability to make more.

The systems may already support the required checks. If so, configuration and a changed operating method could be enough. If not, the map gives the software proposal a specific requirement to address.

Avoid treating every manual activity as a gap or every application overlap as duplication. A person can provide a capability well; several applications can support different parts of it. Inspect the outcome and the support needed.

A [digital maturity assessment](/notes/digital-maturity-assessment/) can examine those conditions in more depth. Any score should name its criteria and evidence. “Six unchecked promises” tells the team more than an unexplained amber box.

## Keep the map useful after the workshop

Agree names that people recognise, a level of detail suitable for the decision and an owner for maintaining the relationships. “Order promising” is more durable than naming the current spreadsheet as a capability.

Start with the customer service that needs attention. Map its required abilities, connect the people, processes and applications, then inspect the evidence for the proposed investment. Expand the map when another decision needs it, rather than building hundreds of boxes before using the first few.

## Source and example notes

- [SAP LeanIX: Business capability mapping](https://www.leanix.net/en/blog/business-capability-mapping). Capabilities, organisation structure, application relationships and limits of overlap-based decisions.

The distributor, sample and map are fictional. Four documented checks out of ten is an evidence count, not a validated maturity score or an estimate of how many delivery promises were correct.
