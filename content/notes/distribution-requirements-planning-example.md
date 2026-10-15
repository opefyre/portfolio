---
title: Distribution requirements planning (DRP): a worked example
date: 2026-10-15
summary: Two depots need the same product in different weeks. Work back through their stock and transfer dates to see what the central warehouse actually needs.
seoTitle: Distribution requirements planning (DRP): example
seoDescription: Learn distribution requirements planning with two depots and a central warehouse. Follow net needs, transfer dates and the effect of one late delivery.
status: published
topic: Supply chain
keywords: distribution requirements planning example, DRP vs MRP, warehouse replenishment planning, DRP explained
---

**Distribution requirements planning (DRP) works out replenishment quantities and dates across a distribution network.** It subtracts available stock and scheduled receipts from each location's demand, then works back through transfer times to the source.

North depot has enough stock for this week. South needs a delivery next week. The central warehouse has 100 pieces, which looks healthy until both depots' requests reach it.

Adding everyone's customer demand and ordering that total would miss the stock already in the network. Looking only at the central balance would miss where and when the pieces are needed.

[Oracle's planning documentation](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T478953.htm) describes that link: a receiving location's planned orders create requirements at its source, with transit lead times included.

## DRP vs MRP: locations rather than components

The [MRP example](/notes/material-requirements-planning-example/) starts with display stands and works down their bill of materials to brackets, bases and bolts. DRP follows the same finished item through warehouses.

| Question | MRP | DRP |
| --- | --- | --- |
| What connects the requirements? | The components needed to make an item | The locations supplying and receiving an item |
| What is offset in time? | Purchasing or production lead time | Replenishment and transfer lead time |
| What does a plan propose? | Dated component supply | Dated supply at each location and the corresponding source requirement |

They can connect. A distribution plan may tell a factory when finished goods are needed; the material plan then works out what production requires. Neither establishes that every truck, supplier or production slot is available.

## DRP calculation example: net each depot's demand

Our fictional network handles one finished item in individual pieces. Central opens with 100, North with 40 and South with 30. Another 20 are already in transit to North, due at the start of week 2. Those 20 left before this horizon and are **not** still inside Central's 100.

| Customer demand due by week end | Week 1 | Week 2 | Week 3 | Week 4 |
| --- | ---: | ---: | ---: | ---: |
| North | 20 | 30 | 40 | 20 |
| South | 20 | 20 | 30 | 30 |

Receipts arrive at the start of a week, before its demand. We propose exactly the missing quantity, with no safety stock or order multiple. A transfer released at the start of one week arrives at the next week's start.

North ends week 1 with 20. Its existing 20-piece receipt gives it 40 for week 2; after 30 of demand, ten remain. Week 3 needs 40, so North needs a new receipt of 30. That transfer must leave Central in week 2.

South has a different gap. Its opening 30 covers week 1's 20 and leaves ten. Week 2 needs another 20, so a ten-piece transfer must leave Central in week 1 to arrive in week 2.

## Calculate central warehouse requirements and releases

Continuing the calculation gives these new transfer receipts:

| New receipt needed at depot | Week 1 | Week 2 | Week 3 | Week 4 |
| --- | ---: | ---: | ---: | ---: |
| North | 0 | 0 | 30 | 20 |
| South | 0 | 10 | 30 | 30 |
| Corresponding dispatch from Central | 10 | 60 | 50 | 0 |

The final row is shifted one week earlier. Central's week-2 requirement is North's 30 plus South's 30, both needed at the depots in week 3.

::figure drp-transfer-endpoints | Fictional on-time plan: dispatch 30 pieces to South in week 2 and receive those same pieces in week 3. North needs a separate 30-piece transfer.

Central ships ten in week 1 and 60 in week 2, leaving 30. Week 3 requires 50. It therefore needs a 20-piece receipt at the start of week 3. With the example's one-week external lead time, that supply needs release in week 2.

The depots' customer demand totals 210. Their new transfers total 120, and Central needs only 20 from outside this opening network. These are different levels of the same requirement, not quantities to add together.

## Follow one late transfer without ordering it twice

The original plan below covers the stated quantities. Change the South transfer due in week 3 so it arrives in week 4. Its 30 pieces remain in transit; they don't disappear from the open supply record.

::interactive drp-network | Fictional four-week plan, with an option to delay one transfer. All quantities are individual pieces. A transfer released at a week's start normally arrives at the next week's start; demand is due by week end. The delay moves one 30-piece arrival, while original releases and external receipts stay fixed. Negative depot net stock means backorders, not negative physical stock.

South then ends week 3 owing 30 pieces. Week 4 receives the delayed 30 and its normal 30, enough to clear the backlog and cover that week's demand. Its final balance matches the on-time case, but the week-3 delay still happened.

The [inventory-position note](/notes/inventory-position-vs-on-hand/) explains why an outstanding transfer must remain visible. Creating another 30-piece order without dealing with the first can turn a temporary shortage into excess stock later.

## Check the route before treating the plan as a promise

This calculation has not reserved transport capacity or confirmed the external supplier's 20 pieces. Check dispatch cutoffs, receiving calendars, release and inspection time, stock status and any minimum shipment quantities. The [cross-docking example](/notes/cross-docking-explained/) follows those checks through one warehouse loading window.

If Central cannot obtain the 20 for week 3, the plan needs a decision about the affected transfers. A neat depot receipt row cannot resolve a shortage at its source. Confirm supply, consider an approved alternative or revise the commitments with the people responsible for them.

Keep forecasts and customer orders from counting the same demand twice too. DRP needs an agreed demand input at each depot. The [bullwhip example](/notes/bullwhip-effect-explained/) shows why replenishment orders can fluctuate more than the consumption underneath them.

Start with the depot's quantity and need date. Work back to the supplying location and dispatch date, then confirm whether that supply can be provided.

## Sources and example notes

- Oracle JD Edwards. [Distribution Requirements Planning](https://docs.oracle.com/en/applications/jd-edwards/supply-chain-manufacturing/9.2/eoafm/distribution-requirements-planning.html). Finished-goods distribution planning.
- Oracle MRP User's Guide. [Supply Chain Planning](https://docs.oracle.com/cd/E26401_01/doc.122/e48795/T478564T478953.htm), especially supply/demand schedules and transit lead times. Local requirements feeding the source plan.

All quantities and dates are fictional. The replay keeps the original orders and changes one arrival. It leaves recovery planning to a separate decision. There are no losses, other demand, capacity limits or safety-stock requirements. The existing in-transit 20 and Central's opening 100 are counted separately.
