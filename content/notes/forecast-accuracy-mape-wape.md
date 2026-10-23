---
title: Forecast accuracy: MAPE vs WAPE, with a worked example
date: 2026-10-03
updated: 2026-10-23
summary: MAPE and WAPE can pick different winners from the same forecasts. Compare their formulas, try the calculator and see what each score hides.
status: published
topic: Supply chain
keywords: MAPE vs WAPE, WMAPE, forecast accuracy calculator, forecast bias, demand planning
seoTitle: Forecast accuracy: MAPE vs WAPE worked example
seoDescription: Compare MAPE and WAPE with a worked example and interactive calculator. Change demand and forecasts to see how volume, zero demand and bias affect the scores.
---

The planning team brings two forecasts to the review. Forecast A has the lower average percentage error. Forecast B misses far fewer units. Before purchasing chooses a forecast, the team needs to agree whether the decision depends on relative error, units missed or the cost of the resulting shortage.

The difference is simple: **MAPE averages each observation's percentage error. WAPE adds the absolute errors and divides by total actual demand.** A small product can dominate MAPE; a large product has more influence on WAPE. Neither tells you how costly a miss will be.

## MAPE vs WAPE: the differences

| Question | MAPE | WAPE |
| --- | --- | --- |
| What does it measure? | Average absolute percentage error per observation | Total absolute error relative to total actual demand |
| How is it calculated? | Average of (absolute error ÷ actual) × 100 | Sum of absolute errors ÷ sum of absolute actuals × 100 |
| What gets more weight? | Each observation's percentage error has equal weight | For positive demand, larger actual quantities have more weight |
| What if actual demand is zero? | Undefined for a set containing any zero actual | Still usable if total absolute actual demand is positive |
| What should you watch? | Small actuals can produce huge percentages | Large products can hide small but critical ones; changing demand changes the denominator |

An observation could be one product in one month, or one week for a single product. Agree that level before comparing scores. The [forecasting textbook](https://otexts.com/fpp3/accuracy.html) and [Rob Hyndman's WAPE explanation](https://robjhyndman.com/hyndsight/wape.html) set out the definitions and limitations.

You may also see **WMAPE** or weighted MAPE. [SAP's definition](https://help.sap.com/doc/f34f13519204438c95bf0631a85ac4da/1908/en-US/89eed15489e16374e10000000a44538d.html) uses the summed-error ratio above. Check the formula in your own report. For zero-demand rows, use that ratio rather than multiplying an undefined percentage by a zero weight.

## Two forecasts, different winners

A fictional distributor stocks three spare parts. Actual demand is 1,000, 100 and 10 parts for the same month. Both forecasts were issued before the month started, at the same planning horizon.

A predicts 900, 90 and 9. It underestimates every product by 10%. B predicts 990, 95 and 5: closer on the first two, but only half the demand for the third.

That gives A a MAPE of **10%**, against B's **18.67%**. Yet B misses just 20 parts overall, compared with A's 111. On WAPE, B wins: **1.80%** against **10%**.

Change the numbers below to see why. Try zero demand or errors that cancel out, then reset to return to the distributor's example.

::interactive forecast-calculator | Fictional examples. The calculator scores both forecasts on the same observations and keeps zero-demand rows visible. A lower error score is not a recommendation to place an order.

The rest of the calculations use the original distributor inputs.

## Calculate MAPE on each observation

MAPE stands for mean absolute percentage error. For B:

:::formula Forecast B's MAPE
High-volume part: |990 − 1,000| ÷ 1,000 = 1%
Medium-volume part: |95 − 100| ÷ 100 = 5%
Low-volume part: |5 − 10| ÷ 10 = 50%
MAPE = (1% + 5% + 50%) ÷ 3 = **18.67%**
:::

The low-volume part supplies a third of the average while accounting for less than 1% of demand. MAPE makes its percentage miss hard to ignore. It also lets that row outweigh large improvements elsewhere.

When actual demand is zero, its percentage error is undefined. Don't quietly remove the row and call the result a score for the whole catalogue. The [zero-demand note](/notes/forecast-accuracy-zero-demand/) shows what to report instead.

## Calculate WAPE across the same rows

WAPE stands for weighted absolute percentage error. Our demand is nonnegative, so total absolute actual demand is simply total demand.

:::formula Forecast B's WAPE
Absolute errors: 10 + 5 + 5 = 20 parts
Actual demand: 1,000 + 100 + 10 = 1,110 parts
WAPE = 20 ÷ 1,110 = **1.80%**
:::

For A, absolute errors total 111 parts: 111 ÷ 1,110 = 10%. B is closer when the question is how many parts the forecast missed across this group.

But its five-unit miss on the third product still matters. A cheap accessory and a part that keeps a customer's machine running need different attention. Volume alone cannot tell you which one this is.

WAPE is also sensitive to its denominator. If demand rises while absolute error stays unchanged, WAPE falls. That alone does not establish better forecasting. For comparisons over time, consider a consistent baseline and scaled measures such as MASE or RMSSE, as [Hyndman explains](https://robjhyndman.com/hyndsight/wape.html).

## Bias tells you which way the forecast misses

MAPE and WAPE discard the sign of the error. Pair them with a directional measure.

Here, bias means total forecast minus total actual, divided by total actual. Positive means overforecasting; negative means underforecasting. Other reports reverse the sign or change the denominator, so state yours.

:::formula Bias with forecast minus actual
A: (999 − 1,110) ÷ 1,110 = **−10.00%**
B: (1,090 − 1,110) ÷ 1,110 = **−1.80%**
:::

Every miss here points downwards. When errors point in opposite directions, bias can be zero despite large misses. The [forecast bias example](/notes/forecast-bias-calculation/) shows why a balanced total can still be a poor plan.

## Compare the forecast that drove the order

Suppose purchasing commits to a supplier eight weeks before delivery. A forecast updated two days before delivery may help the warehouse, but it cannot explain that earlier order.

Keep the issued versions. Compare forecasts at the same horizon, on the same products and periods. When choosing a method, test it on later data that were not used to fit it. That is also the distinction behind [Foreviq's method comparison](/work/foreviq/): selecting a forecast and checking how it performs later are separate steps.

Agree what actual demand means, too. Sales can understate what customers wanted when an item was out of stock. Label the score as a sales comparison if that is all you can observe.

## Which metric should a planning team use?

For this group, WAPE gives a useful view of total-volume error. MAPE explains why the small product changes the ranking. Bias shows that both forecasts ran low. The product's criticality decides how much attention its miss deserves.

For a regular review, keep three things together: error across a meaningful product group, the direction of that error, and the important individual misses. Check the same forecast horizon across several periods and against a simple baseline.

There is no universal “good MAPE” or WAPE target. A percentage needs context: the demand pattern, forecast horizon, baseline and consequences of getting it wrong. Don't turn 100% minus error into a promise about how many orders you will fulfil.

:::link /notes/forecast-accuracy-mape-wape/forecast-comparison.xlsx | Download the forecast comparison sheet
Prefer Excel? Use the original worked example and blank input sheet, with MAPE, WAPE, signed bias and checks for missing values and zero demand.
:::

A better forecast may change the inventory you need. It does not justify cutting every buffer by the same percentage. Check lead-time variability and the service requirement in the [safety stock and reorder point example](/notes/safety-stock-reorder-point/).

At the next review, name the product group, forecast date, horizon and measure. Inspect the largest unit misses as well as the average before changing the orders.

## Sources

- Hyndman, R. J. and Athanasopoulos, G. [Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html). Forecasting: Principles and Practice, third edition.
- Hyndman, R. J. [WAPE: Weighted Absolute Percentage Error](https://robjhyndman.com/hyndsight/wape.html). Definition, zero-demand limitations and changing denominators.
- SAP. [Weighted mean absolute percentage error](https://help.sap.com/doc/f34f13519204438c95bf0631a85ac4da/1908/en-US/89eed15489e16374e10000000a44538d.html). The WMAPE naming used in its documentation.

*The distributor, products and forecasts are fictional. These examples explain the metrics; they do not establish which forecasting method will perform best over time.*
