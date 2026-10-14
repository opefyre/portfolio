---
title: FIFO vs FEFO: the oldest delivery may expire last
date: 2026-10-14
summary: A newer batch can run out of shelf life before an older one. Compare FIFO and FEFO on the same stock, then see how a minimum remaining-life rule changes the pick.
seoTitle: FIFO vs FEFO: stock rotation with a worked example
seoDescription: Compare FIFO and FEFO using five inventory lots. See why receipt dates and expiry dates differ, how stock holds work and when minimum remaining life matters.
status: published
topic: Supply chain
keywords: FIFO vs FEFO, first in first out, first expiry first out, FEFO inventory example, stock rotation methods, remaining shelf life
---

Stores picks the oldest delivery first. A newer batch waits behind it, even though it expires sooner. Following receipt order leaves the shorter-life stock waiting.

**FIFO means first in, first out: issue eligible stock in receipt order. FEFO means first expiry, first out: issue eligible stock with the earliest expiry date.** FEFO is also written as first-expired-first-out, but it doesn't mean issuing expired goods.

A later delivery can have less remaining life than stock already on the shelf. When that happens, the two rules produce different picks.

## FIFO and FEFO compared

The [Lean Enterprise Institute's FIFO definition](https://www.lean.org/lexicon-terms/first-in-first-out-fifo/) describes preserving the order in which material enters a process. [Microsoft's FEFO picking documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/warehouse-picking-by-fefo) describes sorting tracked inventory by expiry date.

| Question | FIFO | FEFO |
| --- | --- | --- |
| Which date sets the order? | Receipt date | Expiry date |
| What goes first? | Earliest receipt among eligible stock | Earliest expiry among eligible stock |
| What can it overlook? | A newer receipt that expires sooner | Missing or incorrect expiry records, or stock unsuitable for this requirement |
| What must happen before sorting? | Confirm the stock is eligible for this use | Confirm the stock is eligible for this use |

Neither rule releases a quality hold, overrides an allocation or turns an expired lot into usable stock. Sorting comes after those checks.

## Five lots, one request

Take a fictional stores area holding one type of unopened adhesive cartridge. Assembly requests 50 cartridges for use on 14 October 2026. All quantities below are individual cartridges, and lots A, B and C are interchangeable for this job.

For this example, the stated expiry date is the last permitted use date. Storage conditions are confirmed, and there are no other reservations. The dates and shelf-life rules are invented for the calculation.

| Lot | Received | Expiry | Quantity | Stock status on 14 October |
| --- | --- | --- | ---: | --- |
| A | 1 October | 31 December | 40 | Released |
| B | 8 October | 31 October | 40 | Released |
| C | 12 October | 30 November | 40 | Released |
| D | 10 October | 20 October | 20 | Quality hold |
| E | 25 September | 10 October | 10 | Expired |

The shelf contains 150 cartridges. Only 120 are eligible for immediate use: 40 each from A, B and C. D is held, and E has expired.

FIFO takes 40 from A and 10 from B. FEFO takes 40 from B and 10 from C. Both fill the 50-unit request, but they leave different stock behind.

Under FIFO, 30 cartridges from B remain, due to expire on 31 October. Under FEFO, none of B remains. That reduces the quantity from this lot still needing a use before that date. It doesn't prove that 30 cartridges would otherwise have been wasted; we haven't specified later demand.

## Compare the picks, then change the requirement

The visual shows both policies together. Change the quantity, or require at least 30 days of remaining life from the use date.

::interactive fifo-fefo-lots | Fictional stock and use date, 14 October 2026. Eligibility requires released status and an expiry at least the selected number of calendar days after use. Expiry dates are usable through the stated date in this example. Sorting applies only after eligibility. No later demand, expiry loss, transport, cost or replenishment is modelled.

With the 30-day requirement, B no longer qualifies. It has 17 days remaining. C has 47, and A has 78, so 80 cartridges qualify between them.

For the same 50-unit request, FIFO now takes 40 from A and 10 from C. FEFO takes 40 from C and 10 from A. B remains physically present and released, but it cannot satisfy this particular remaining-life requirement.

Don't rewrite its expiry date to make the request work. Check whether it has another permitted use, or escalate the shortage or allocation decision through the normal process.

## Why FEFO needs more than an expiry field

The expiry has to belong to the right lot and physical location. A perfect date attached to the wrong pallet can produce a perfectly sorted wrong pick.

Keep lot identity, quantity, receipt date, expiry, release status and reservations connected. If a date is missing or contradictory, record the exception and resolve it rather than treating the lot as having unlimited life. The [data quality example](/notes/data-quality-dimensions/) shows why a plausible field value isn't enough.

The picking process must also follow the selected lot. If the screen requests B but the accessible bin contains A, the theoretical sort hasn't changed what leaves stores. Check the pick and stock movement against the actual lot.

Microsoft's implementation includes settings for expiry exclusion and respects specifically assigned lots before sorting the remaining quantity. Those details are a reminder to check how your own system applies the business rule. Switching on a field named FEFO doesn't define the whole policy.

## Stock rotation is different from inventory valuation

FIFO also appears in accounting. That use concerns which costs are assigned to inventory issues. It doesn't by itself tell a picker which physical lot to take.

[Microsoft's inventory costing FAQ](https://learn.microsoft.com/en-us/dynamics365/supply-chain/cost-management/inventory-costing-faq#when-is-fefo-used) explicitly separates FEFO reservations from costing. Keep the warehouse rule and financial valuation method clear when discussing a system change.

The [inventory turnover note](/notes/inventory-turnover-days/) uses inventory values to calculate a ratio. Here, we need lot dates and quantities to decide what can actually be issued. A turnover figure can't identify the 30 cartridges still in B.

## Check the next receipt against stock already held

At goods receipt, compare the incoming lot's expiry with existing lots. If it expires sooner, a receipt-order queue may need a different picking sequence. Record the lot before placing it where the next pick can find it.

Then review the near-expiry quantities against dated requirements. Rotation helps choose among usable stock. It won't create demand for excess material or make a held lot available. The [MRP example](/notes/material-requirements-planning-example/) explains the dated requirements side; shelf-life and release checks must still qualify the stock used to meet them.

For our stores team, the immediate decision is simple: agree the use requirement, exclude unsuitable lots, then apply the chosen date order. That makes the pick explainable before anyone moves a cartridge.

## Sources and example notes

- [Lean Enterprise Institute: First In, First Out](https://www.lean.org/lexicon-terms/first-in-first-out-fifo/). Receipt or entry sequence in material flow.
- [Microsoft Learn: Enable picking items by FEFO](https://learn.microsoft.com/en-us/dynamics365/business-central/warehouse-picking-by-fefo). Expiry ordering, tracked lots, specific assignments and expiry settings in one implementation.
- [Microsoft Learn: Inventory costing FAQ](https://learn.microsoft.com/en-us/dynamics365/supply-chain/cost-management/inventory-costing-faq#when-is-fefo-used). Physical reservation and costing are separate choices.

All lots, dates, quantities and eligibility rules are fictional. Actual use conditions and remaining-life requirements come from the applicable product and process requirements.
