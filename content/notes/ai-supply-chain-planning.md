---
title: AI supply chain planning: a better forecast is only the start
date: 2026-10-07
summary: Turn a demand forecast into a decision about stock, capacity and delivery. A worked example and interactive comparison show what AI planning needs beyond accuracy.
status: published
topic: Supply chain
keywords: AI supply chain planning, AI demand forecasting, forecast consumption, demand planning, production planning, human oversight
---

The forecast says next month's demand will reach 1,000 units. Sales wants to promise delivery. Production can make 600. There are another 200 in stock.

Someone has to decide what to do about the gap.

A better forecast helps. It still doesn't tell you whether to book overtime, buy from another supplier or accept some late deliveries. That depends on the costs, the constraints and what you have promised customers.

This is where AI supply chain planning needs to prove its value: helping people choose a workable response, then checking whether it worked.

PwC's September 29 article, [From plans to decisions](https://www.pwc.com/us/en/services/consulting/supply-chain-operations/library/from-plans-to-decisions-ai-supply-chain-planning.html), argues for planning that responds to changing conditions, with clear limits on what AI can do. The direction makes sense. The practical test is what happens to one order, one capacity decision and one customer promise.

Let's work through that test.

## First, count the demand once

Our fictional manufacturer has a forecast of 1,000 units for next month. Customers have already placed orders for 600 of those units. All figures refer to the same product, customer group and delivery month.

Adding the forecast and the orders would produce demand of 1,600 units. But the forecast already includes the orders. The remaining demand still to arrive is 400.

::figure planning-demand-netting | Fictional example. The 600 confirmed units are part of the 1,000-unit forecast. They leave 400 units of forecast demand still to be ordered, not another 1,000.

This is called **forecast consumption**: actual orders replace the matching part of the forecast. [Oracle's planning documentation](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25d/faupc/forecast-consumption.html) explains the process and its timing rules.

The matching matters. An order for a different month or customer may not belong inside this forecast. And if confirmed orders exceed the forecast, the plan must still cover those orders. Subtracting everything from everything would create a different mistake.

[Foreviq](/work/foreviq/), the demand-forecasting project I'm working on, connects sales history with open orders and nets the orders against the forecast. That is a useful connection before anyone decides how much to make.

Data quality can sound abstract until a mismatch creates a production requirement. In PwC's [2026 operations survey](https://www.pwc.com/us/en/services/consulting/supply-chain-operations/library/digital-trends-operations-survey.html), 87% of respondents said poor data quality had affected the value of digital initiatives. The survey covered 767 operations and supply chain leaders at US organisations with annual revenue of at least $100 million. It describes their reported experience.

For this decision, the first checks are quite specific: the right product, the right month, orders counted once, and stock that is actually available.

## A forecast range changes the capacity question

After correcting the demand, we still have 1,000 expected units against 800 available: 200 in stock and 600 from regular production. That leaves a 200-unit gap at the central forecast.

But 1,000 is an estimate. For this example, let's also examine demand of 800 and 1,200 units. Those are fictional scenarios, with no probabilities assigned.

At 800, regular production is enough. At 1,200, filling the central forecast's gap would still leave 200 units short.

That is why a point forecast needs context. A prediction interval describes uncertainty around future demand under a forecasting model; it is not a promise that demand will stay inside its bounds. [Forecasting: Principles and Practice](https://otexts.com/fpp3/prediction-intervals.html) explains the distinction.

Foreviq includes an 80% planning range alongside its forecasts. Our fictional scenarios below let us inspect what happens when demand comes in lower or higher than planned.

The question is now clearer: how much extra capacity is worth committing to before we know the demand?

## Compare the response, not just the forecast

Assume materials, staffing and supplier capacity are available for these three options, with all units ready by the same delivery deadline:

| Plan for next month | Units available | Assumed additional commitment |
| --- | ---: | --- |
| Keep regular production | 800 | None |
| Add 200 units through overtime | 1,000 | €300 setup plus €2 premium per extra unit: €700 |
| Buy 400 additional units externally | 1,200 | €4 premium per extra unit plus €100 extra freight: €1,700 |

The outside supplier meets the same quality requirement. Overtime and external purchasing are alternatives, not combined. These are fixed commitments made before demand is known; extra units are not cancelled when demand comes in lower.

To compare them, assume €8 of late-delivery cost for each unit we cannot supply on time, and €2 to carry each leftover unit into the next month. All these costs are fictional inputs.

We compare premiums, late-delivery costs and one month's carrying costs. Ordinary unit costs, sales revenue and stock purchases sit outside this model. Leftover stock remains usable next month, so we charge its carrying cost rather than write off its value.

At demand of 1,000 units, regular production leaves 200 late units, costing €1,600. Overtime costs €700 and covers demand. External purchasing costs €1,700 plus €400 to carry its 200 leftover units, giving €2,100.

Overtime has the lowest cost **in this comparison**. Now change the demand.

::interactive planning-decision | Fictional one-month comparison. Change demand or regular output to inspect the trade-offs. The highlighted plan has the lowest modelled additional cost at those inputs, not a proven best plan for a real business.

With the original 600-unit regular output, demand of 800 favours regular production. At 1,200, external purchasing has the lowest modelled cost. The same forecast range contains three different answers.

Choosing a plan before demand arrives also means judging how likely those scenarios are. The comparison shows what would change the choice: overtime beats regular production above 910 units; external purchasing beats overtime above 1,140. At each boundary, the two plans tie.

Those thresholds are useful questions for the team. How credible is demand above 1,140? Can we wait for more orders before committing? Would the supplier still have capacity then?

This connects to the [procurement savings example](/notes/when-procurement-savings-increase-total-cost/): compare the cost of meeting the requirement, including what happens after the purchase order. A lower price or a faster recommendation is only part of that decision.

The arithmetic here fits in a spreadsheet. AI can help a team notice changed demand, gather relevant inputs and prepare a comparison. It should make the underlying calculation easier to inspect.

A [research community vision statement on AI in supply chains](https://pubsonline.informs.org/doi/full/10.1287/msom.2025.1065) separates prediction from choosing actions and discusses language models as interfaces to planning tools. The assistant, forecast and capacity calculation have different jobs. Connecting them does not remove the need to check the result.

## Make approval worth doing

Suppose AI recommends overtime. “Approve” should mean the planner can see the 200-unit gap, the €700 commitment, the alternatives and the assumptions that made overtime look sensible.

Showing a confident paragraph is not enough. Neither is putting a person in front of a button when they cannot inspect what will change.

For this example, the approval record could be short:

| What the reviewer needs | What this decision should show |
| --- | --- |
| The demand assumption | 1,000 units, including 600 already ordered; forecast version and issue date |
| The supply assumption | 200 usable units in stock, 600 regular units and confirmed capacity for 200 overtime units |
| The comparison | €700 for overtime versus €1,600 or €2,100 in the central scenario; results at lower and higher demand |
| The authority | AI prepares the proposal; the operations manager approves the overtime commitment |
| The point of no return | Approval and cancellation deadlines, with a new review if demand or capacity changes before commitment |

Foreviq separates draft, review and approved plans. Its assistant can propose a forecast but cannot publish it without a person. Committing to overtime is a separate decision with its own owner.

The [previous note on AI and human control](/notes/can-ai-take-over/#could-we-lose-control-by-handing-it-over) asked what authority we give a system. In planning, that becomes very concrete: who may commit spend, change a delivery promise or choose which customer waits?

These choices need named owners even when the calculations are automated.

## Check the result without rewriting the decision

After the month ends, compare the approved assumptions with what happened: demand, units delivered on time, extra spend and leftover stock. Keep the original forecast and plan so the comparison survives later updates.

If demand turns out to be 800, our overtime plan looks unnecessary after the fact. That alone does not prove the original decision was careless. We made it with uncertainty. Review whether the information was reasonable, then check whether the forecasts and cost assumptions improve across several decisions.

[Vrolen](/work/vrolen/) connects to this part of the problem. It lets teams compare possible changes through guided what-if analysis and simulation, then check whether a change produced the expected result.

Forecast error still matters. The [MAPE and WAPE note](/notes/forecast-accuracy-mape-wape/) shows why different accuracy measures can point to different winners. Put those measures beside delivery performance, stock and additional cost. Otherwise a better forecast score can hide a worse operational result.

For a first AI planning pilot, choose one recurring decision and follow it through this whole process. Agree what counts as an improvement before the pilot starts. Record the assumptions, compare the alternatives, set the approval boundary and review the outcome.

The useful test is simple: when the forecast changes, can the team explain what it will do differently, why, and how it will know whether that choice worked?

## Sources

- PwC. [From plans to decisions: How AI is redefining supply chain planning](https://www.pwc.com/us/en/services/consulting/supply-chain-operations/library/from-plans-to-decisions-ai-supply-chain-planning.html), September 29, 2026. The starting point for this note.
- Oracle. [Forecast consumption](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25d/faupc/forecast-consumption.html). Matching orders to forecasts and consumption periods.
- Hyndman, R. J. and Athanasopoulos, G. [Distributional forecasts and prediction intervals](https://otexts.com/fpp3/prediction-intervals.html). Forecasting: Principles and Practice, third edition.
- PwC. [2026 Digital Trends in Operations Survey](https://www.pwc.com/us/en/services/consulting/supply-chain-operations/library/digital-trends-operations-survey.html), April 23, 2026. Online survey conducted in January and February 2026; the data-quality figure describes respondents' reported experience.
- [Supply Chain Management in the AI Era: A Vision Statement from the Operations Management Community](https://pubsonline.informs.org/doi/full/10.1287/msom.2025.1065). Manufacturing & Service Operations Management, sections 2.1 to 2.3. Research synthesis on forecasting, choosing actions and language interfaces.

*The manufacturer, quantities, options and costs are fictional. The original worked example's assumptions and calculations are available beside the visual.*
