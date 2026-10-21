---
title: Transport mode selection: compare freight, time and stock
date: 2026-10-21
summary: The lowest freight quote arrives after the stock runs out. Compare arrival dates first, then price the feasible options on the same shipment and inventory basis.
seoTitle: Transport mode selection: cost, time and stock
seoDescription: Compare sea, rail and air for one shipment. Check arrival feasibility, pipeline inventory cost and the delay that would change the transport decision.
status: published
topic: Supply chain
keywords: transport mode selection, transportation mode comparison, freight vs inventory cost, pipeline inventory
---

**Transport mode selection means choosing how a shipment will move while meeting its delivery, handling and cost requirements.** A cheap mode that cannot meet the required arrival is a different proposal from a more expensive one that can.

A planner needs replenishment available by day 18. Sea costs €800 and takes 24 days. Rail costs €1,600 and takes 14. Air costs €4,000 and takes four.

Picking sea from the freight column alone would approve a six-day shortage before the shipment even leaves.

## Compare door-to-available-stock time

This fictional shipment contains 1,000 identical units with a purchase value of €50 each. All three services cover the same origin and destination. The quoted times include pickup, terminal handling, clearance and receiving until the units are available to use.

| Mode | Freight for the shipment | Available on day | Meets day-18 requirement? |
| --- | ---: | ---: | --- |
| Sea | €800 | 24 | No |
| Rail | €1,600 | 14 | Yes, four days of margin |
| Air | €4,000 | 4 | Yes, fourteen days of margin |

Fictional costs and service times on a route where all three are available. They are not current carrier quotes or general mode-speed benchmarks.

::figure gap-mode-timeline | The same day-18 availability requirement applied to three fictional door-to-stock services. A nominal arrival before the line does not establish a delivery reliability percentage.

Four days of margin is useful information. It is not evidence of a 95% on-time service. For that, the planner needs comparable lane history, the departure schedule and the reasons shipments miss their expected arrival.

## Add inventory cost without charging for the goods twice

The goods cost €50,000 whichever mode is selected. That purchase value is common to the comparison. What changes here is the time that value is tied up during transit.

Assume the buyer owns the goods from dispatch and uses a 20% annual carrying rate on a 365-day basis. The rate is a declared planning input that includes the carrying costs relevant to this decision. The [MIT logistics transportation material](https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/resources/lect20/) connects transport choices with inventory costs.

:::formula Carrying cost during this shipment
Transit carrying cost = goods value × annual carrying rate × transit days ÷ 365
:::

| Mode | Transit carrying cost, rounded | Freight plus transit carrying cost |
| --- | ---: | ---: |
| Sea | €658 | €1,458 |
| Rail | €384 | €1,984 |
| Air | €110 | €4,110 |

These are costs through arrival, not a complete inventory bill through final consumption. Air may bring the same goods into warehouse stock earlier, where carrying cost continues. Do not treat every day removed from transit as a day removed from total stockholding.

For a steady replenishment flow, average pipeline stock can also be estimated as demand per day × transit days, provided the flow and ownership assumptions fit. That is an inventory level, not another bill to add to the carrying-cost line.

## Choose among the options that meet the requirement

Sea remains cheaper in this partial ledger, but it misses the stated need. The planner must either reject it or explicitly change the proposal: earlier dispatch, existing cover stock, a split shipment or an agreed later requirement.

Rail is the least expensive feasible service in the example. Air costs €2,400 more in freight. Its use needs a reason, such as credible rail disruption that would create a larger avoidable loss, rather than a preference for extra speed.

Check that reason with evidence. A full stopped-production estimate must include what stock is actually available, which work can be rescheduled and what cost the shortage would cause. The [supply-chain risk note](/notes/supply-chain-risk-management/) separates an exposure from a forecast of loss.

## Test the decision against the likely disruption

Suppose a rail cancellation would add seven days. That service would then arrive on day 21, three days after the need. Ask how often that happens on comparable departures and whether another option can still be booked when the cancellation is known.

If the information is missing, keep the uncertainty visible. An invented late-delivery probability would make the comparison look more complete while adding no evidence.

Before booking, check damage risk, temperature control, shipment size, dangerous-goods restrictions and route availability. Where emissions matter, compare shipment-specific estimates on a common method rather than attaching an unsourced green label to a mode.

:::link /notes/total-landed-cost-example/ | Build the complete landed-cost comparison
Freight is only one part of getting stock to its destination. Add duties, handling and other relevant charges once the feasible route is clear.
:::

## Source and calculation notes

- [MIT OpenCourseWare: Transportation I](https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/resources/lect20/). Fundamental transport concepts and connections to inventory planning.

All shipment values, rates, service times and disruption scenarios are fictional. The ledger excludes common purchase cost, post-arrival holding, taxes, damage and shortage consequences. Check those items before using it for an actual booking.
