---
title: Forecast accuracy: MAPE vs WAPE, with a worked example
date: 2026-10-03
summary: Two forecasts, two metrics, two different winners. Calculate MAPE, WAPE and bias, check what the averages hide, and use the Excel sheet to review your own demand data.
status: published
topic: Supply chain
keywords: MAPE vs WAPE, forecast accuracy calculation, forecast bias, forecast accuracy Excel, demand planning, demand forecast accuracy
---

The planning team brings two forecasts to the review. Forecast A has the lower average percentage error. Forecast B misses far fewer units. Both teams can point to a number that says their forecast is better.

Which one should purchasing use?

Before answering, look at how the scores were calculated. MAPE and WAPE put different weight on the same errors. Choosing between them changes which problems get attention, and which products disappear into the average.

## Two forecasts, different winners

A fictional distributor stocks three spare parts. All quantities below are individual parts, for the same month. Both forecasts were issued before that month started, at the same planning horizon.

| Product | Actual demand | Forecast A | Forecast B |
| --- | ---: | ---: | ---: |
| High-volume part | 1,000 | 900 | 990 |
| Medium-volume part | 100 | 90 | 95 |
| Low-volume part | 10 | 9 | 5 |
| Total | 1,110 | 999 | 1,090 |

A underestimates every product by 10%. B gets much closer on the first two products, but forecasts only half the demand for the third.

| Measure | Forecast A | Forecast B | Lower error |
| --- | ---: | ---: | --- |
| MAPE | 10.00% | 18.67% | A |
| WAPE | 10.00% | 1.80% | B |
| Absolute error | 111 parts | 20 parts | B |

The disagreement is built into the measures. MAPE gives each product's percentage error equal weight here. WAPE measures the total absolute error against total demand, so the larger products have more influence.

::figure forecast-error-comparison | Fictional example. B misses fewer units overall, but its five-unit miss on the low-volume part is a 50% error. The same data can support different priorities.

## Calculate MAPE on each observation

MAPE stands for mean absolute percentage error. Calculate the absolute error as a percentage of actual demand for each observation, then average those percentages. The definition and its limitations are explained in [Forecasting: Principles and Practice](https://otexts.com/fpp3/accuracy.html).

In this example, an observation is one product in one month. In a longer review it might be each product in each month. Decide that level before calculating the score.

:::formula Forecast B's MAPE
High-volume part: |990 − 1,000| ÷ 1,000 = 1%
Medium-volume part: |95 − 100| ÷ 100 = 5%
Low-volume part: |5 − 10| ÷ 10 = 50%
MAPE = (1% + 5% + 50%) ÷ 3 = **18.67%**
:::

That last product supplies a third of the average despite accounting for fewer than 1% of the parts demanded. This is useful if equal attention to each product is the aim. It can be misleading if the score is supposed to represent the total volume the business planned incorrectly.

There is also a practical problem: when actual demand is zero, that observation's percentage error is undefined. A very small actual quantity can produce a very large percentage. Don't quietly remove those rows and report the result as though it covered the whole catalogue.

## Calculate WAPE across the same rows

WAPE stands for weighted absolute percentage error. Add the absolute errors first, then divide by total absolute actual demand. For our nonnegative demand data, that denominator is simply total demand. [Rob Hyndman](https://robjhyndman.com/hyndsight/wape.html) sets out the definition and the reasons to be careful with it.

:::formula Forecast B's WAPE
Absolute errors: 10 + 5 + 5 = 20 parts
Actual demand: 1,000 + 100 + 10 = 1,110 parts
WAPE = 20 ÷ 1,110 = **1.80%**
:::

For A, the absolute errors total 111 parts, so WAPE is 111 ÷ 1,110 = 10%. B is clearly closer if the question is how many parts the forecast missed across this group.

But the five-unit miss on the third product still exists. If that product is a cheap accessory, it may be a small issue. If it is the only part that can keep a customer's machine running, it deserves its own review.

Volume does not tell us that. Add product criticality to the decision rather than expecting a portfolio percentage to contain it.

## Bias tells you which way the forecast misses

Both measures discard the sign of the error. They cannot distinguish a forecast that is usually too high from one that is usually too low.

For this note, signed error means forecast minus actual. Positive means overforecasting; negative means underforecasting. The bias percentage divides the sum of those signed errors by total actual demand. Other reports may reverse the sign or use a different denominator, so put the definition beside the result.

:::formula Bias with forecast minus actual
A: (999 − 1,110) ÷ 1,110 = **−10.00%**
B: (1,090 − 1,110) ÷ 1,110 = **−1.80%**
:::

Every error in this example points downwards, which is why the bias magnitude equals WAPE. When errors point in opposite directions, bias can be close to zero even with substantial misses. Overforecasting one product does not supply the missing stock of another.

One month of underforecasting is an observation. Repeated underforecasting across comparable periods is a reason to investigate the model, promotions, overrides or the demand data. It is not a reason to add 10% to every forecast without checking.

:::card What the three measures answer
MAPE: how large is the average percentage miss per observation?

WAPE: how large is the total absolute miss relative to the demand in this group?

Bias: does the forecast run high or low overall, under the stated sign convention?
:::

## Compare the forecast that drove the order

There is another way to produce an excellent score: compare actual demand with a forecast revised after most of the demand was already known.

Suppose purchasing commits to a supplier eight weeks before delivery. A forecast updated two days before delivery may be useful for the warehouse, but it cannot explain the order placed eight weeks earlier.

Keep the issued versions. Compare A and B at the same horizon, on the same products and periods. When choosing a forecasting method, evaluate it on later data that were not used to fit it. The [forecasting textbook](https://otexts.com/fpp3/accuracy.html) distinguishes this from judging how closely a model fits its training data.

Also agree what actual demand means. Recorded sales can understate what customers wanted when an item was out of stock. If the data only capture sales, name that limitation instead of labelling them unconstrained demand.

## Use the score to make a decision

For the three products here, B gives the better total-volume forecast. A gives the better average product-level percentage error. The low-volume part needs attention under either model because its importance to the customer has not yet been established.

That is a more useful conclusion than declaring one metric the winner.

For a regular planning review, keep the portfolio result and the product exceptions together:

1. Fix the forecast version, planning horizon, units and evaluation period.
2. Review absolute error, WAPE and signed bias for a meaningful product group.
3. Inspect the critical products and large individual misses, including zero-demand rows.
4. Check whether the proposed forecast improves decisions across several periods, against a simple baseline such as last period's demand.

WAPE is also sensitive to its denominator. If demand rises while absolute error stays unchanged, WAPE falls. That does not prove that forecasting improved. Hyndman discusses this problem for trending demand and recommends considering scaled measures such as MASE or RMSSE for model evaluation. Use those where appropriate, with a consistent baseline.

:::link /notes/forecast-accuracy-mape-wape/forecast-comparison.xlsx | Download the forecast comparison sheet
The worked example and a blank input sheet, with MAPE, WAPE, signed bias and explicit handling of missing values and zero demand.
:::

The sheet compares the two forecasts on complete, nonnegative rows. It flags rows with missing or invalid inputs. A zero actual makes MAPE unavailable for the full set; WAPE remains available if total demand is positive. Blank unused rows are excluded. Record issue dates and the target period so comparisons can be checked at the same horizon.

A better forecast may change the inventory you need. It does not mean you can cut every buffer by the same percentage. Lead-time variation and the service requirement still matter.

:::link /notes/safety-stock-reorder-point/ | Translate uncertainty into inventory
Calculate the safety stock and reorder point before changing the buffer. Check supplier variability alongside forecast error.
:::

When someone says the forecast improved, ask where, at which horizon, and according to which measure. Then look at the products the average made hard to see.

## Sources

- Hyndman, R. J. and Athanasopoulos, G. [Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html). Forecasting: Principles and Practice, third edition. Evaluation data, MAPE and scaled measures.
- Hyndman, R. J. [WAPE: Weighted Absolute Percentage Error](https://robjhyndman.com/hyndsight/wape.html). Definition, zero-demand limitations and the effect of a changing denominator.

The distributor, products and forecasts are fictional. The three-row example explains the metrics; it is too small to establish which forecasting method will perform best over time.
