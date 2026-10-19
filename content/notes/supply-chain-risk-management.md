---
title: Supply chain risk management: check what your backup depends on
date: 2026-10-19
summary: Follow a delayed component through stock, transport and customer commitments. Compare risk responses and check whether a backup shares the same weak point.
seoTitle: Supply chain risk management: a practical example
seoDescription: Follow a delayed component through stock, transport and customer commitments. Compare risk responses and check whether a backup shares the same weak point.
status: published
topic: Supply chain
keywords: supply chain risk management, supply chain risk example, supply chain resilience, supplier risk
---

The business has two approved suppliers. Both ship through the same port, use the same freight service and rely on the same component maker.

A supplier count of two can conceal a single point of failure.

**Supply chain risk management identifies what could interrupt supply or demand, assesses the consequences and prepares responses the business can actually use.** It includes suppliers, routes, internal operations, customers and supporting systems.

[CIPS's vendor-risk guidance](https://1prd-dxp.cips.org/intelligence-hub/risk-management/vendor-risk/assessment) supports checking suppliers and their risk factors. The network matters too: a backup is useful only for the disruption it can survive.

## Follow one delay to the customer

Take a fictional manufacturer using 100 identical components a working day. It has 700 usable units and expects a receipt before work starts on day 5. A route disruption now moves that receipt to the start of day 12.

At the assumed constant use, existing stock lasts through day 7. Without another response, days 8 to 11 need 400 components the company does not have. Demand, quality release and production capacity are assumed unchanged in this small example.

The delay passes through several decisions: purchasing confirms the receipt, planning checks the stock position, operations tests what can be built and Sales reviews affected promises.

::figure paa-risk-dependency | Fictional supply network. The two suppliers share a component source and transport route. The local alternative avoids that route only if its own upstream supply and usable capacity are verified.

## Describe the risk before scoring it

A risk is a possible event or condition with uncertain consequences. A disruption is something that has happened. A routine service problem may reveal exposure, but repeatedly calling an existing late receipt a future risk can delay the response.

| Area to examine | Question for this manufacturer |
| --- | --- |
| Supply | Do the suppliers share upstream production or tooling? |
| Transport | Can a route closure affect both receipts? |
| Operations | Can the plant use an approved substitute safely and correctly? |
| Demand | Which customer commitments become exposed if usage changes? |
| Systems | Can orders and inventory still be checked if a planning service is unavailable? |

These categories help review this manufacturer's exposure; a different network may need others. [Supplier segmentation](/notes/kraljic-matrix-example/) can help decide where a deeper review is warranted; it does not verify the backup's capacity.

## Put feasible responses beside the exposure

For this example, the team considers three independent responses. Their quantities and dates are assumptions to verify, not supplier offers.

| Response | What it could cover | Check before relying on it |
| --- | --- | --- |
| Expedite the original receipt | Avoid the gap if stock is usable by day 8 | Route, confirmed capacity, release checks and incremental cost |
| Buy 400 local components | Cover the four-day gap at constant use | Approval, available quantity, arrival before day 8 and independent upstream supply |
| Agree a different production and delivery sequence | Protect priority commitments while some work waits | Customer agreement, substitute work and the effects on other orders |

The operations manager owns the response in this fictional setup. The planner triggers a review as soon as projected usable stock goes below the confirmed requirement before receipt. Purchasing verifies the supply option; Quality checks any substitute; Sales confirms changed promises.

If the local order cannot arrive in time, the fallback is the approved production and customer plan. Residual risk remains: usage could rise, the local batch could fail inspection or the delayed receipt could slip again.

A buffer can reduce exposure, but [safety stock](/notes/safety-stock-reorder-point/) needs the relevant uncertainty and service assumptions. [Risk pooling](/notes/inventory-risk-pooling/) explains why shared shocks limit the benefit of combining or diversifying stocks.

## A real route disruption shows why the detail matters

UNCTAD's [2024 account of Red Sea disruption](https://unctad.org/news/red-sea-crisis-and-implications-trade-facilitation-africa) documents rerouting around Africa and implications for trade facilitation and ports. It is a dated maritime example, distinct from the component calculation above.

A manufacturer dependent on that shipping lane has a different exposure from a retailer buying locally. For a decision today, check the current route conditions and the suppliers using it.

Record the dates, routes, items and shared dependencies behind the assessment. Here, the immediate question is whether 400 approved components can be usable before day 8.

## Exercise the response before the interruption

Ask the local supplier to confirm what it could provide, check its upstream dependencies and test the approval and ordering route. Give each important assumption an owner and a refresh date.

For systems risk, rehearse how people would find orders, allocate stock and record decisions during an outage. An exported spreadsheet is only a fallback if its data, access and update method can support the work.

The [risk-versus-issue guide](/notes/project-risk-vs-issue/) provides a related distinction for project reviews. In the supply chain, follow the disruption all the way to the customer and back through the response. Record which customer commitments the response can protect and what happens if it falls short.

## Sources and example notes

- [CIPS: Vendor risk assessment](https://1prd-dxp.cips.org/intelligence-hub/risk-management/vendor-risk/assessment), supplier checks and common risk factors.
- [UNCTAD: Red Sea crisis and trade facilitation in Africa](https://unctad.org/news/red-sea-crisis-and-implications-trade-facilitation-africa), 17 April 2024. A dated disruption example, not a 2026 ranking.

The manufacturer, component usage, stock, delivery dates and alternatives are fictional. The 400-unit exposure assumes constant use and a usable receipt at the start of day 12. No disruption probability, expected loss or service guarantee is estimated.
