---
title: Forecast accuracy when demand is zero: what to use instead of MAPE
date: 2026-10-12
summary: Zero demand makes MAPE undefined. A spare-part example shows what WAPE, absolute error and a historical baseline can tell you without deleting the awkward weeks.
seoTitle: Forecast accuracy with zero demand: beyond MAPE
seoDescription: Zero demand makes MAPE undefined. Compare WAPE, absolute error and MASE with a worked example, and keep quiet weeks visible in your planning review.
status: published
topic: Supply chain
keywords: MAPE zero actual, forecast accuracy zero demand, intermittent demand, WAPE, MASE, RMSSE
---

A spare part sells nothing for two weeks. In the third week, a customer buys 12. The forecast review now has a problem: dividing an error by zero does not produce a usable percentage.

**MAPE is undefined when actual demand is zero.** WAPE can still work if the evaluation period has some demand. Absolute error stays readable even when the whole period is quiet. The useful choice depends on what you need to compare.

The temptation is to delete the zero weeks. That makes the calculation easier and removes part of the planning problem.

## Two forecasts that look equal after deleting zeros

In this fictional example, both forecasts were recorded before their target weeks. Quantities are units of one spare part.

| Week | Actual demand | Forecast A | Forecast B |
| --- | ---: | ---: | ---: |
| 1 | 0 | 0 | 2 |
| 2 | 0 | 0 | 2 |
| 3 | 12 | 10 | 10 |

Keep only week 3 and both have a 16.67% percentage error. But B also predicted four units during weeks with no demand. Those misses belong in the review.

::figure zero-demand-errors | Fictional three-week example. A misses two units; B misses six. Deleting the zero-demand weeks makes the forecasts appear equal.

Across all three weeks, A's absolute error is 2 units. B's is 2 + 2 + 2 = 6. Divide by 12 actual units and WAPE is **16.67% for A and 50% for B**. MAPE remains undefined for both.

You can change these inputs using the “Zero demand” example in the [MAPE/WAPE calculator](/notes/forecast-accuracy-mape-wape/#two-forecasts-different-winners).

## What if every week has zero demand?

Then WAPE's denominator is also zero. Report it as unavailable, even if every forecast was zero too. That is different from a measured 0% error.

Mean absolute error, or **MAE**, still works. It averages the absolute misses in the original units. If actuals are 0, 0 and 0 and forecasts are 2, 2 and 2, MAE is 2 units per week. If the forecasts are all zero, MAE is 0.

| Situation | Useful report | Important limit |
| --- | --- | --- |
| Some weeks have zero demand | WAPE alongside absolute errors by week | Total demand must be positive; don't omit quiet weeks |
| All actuals are zero | MAE and total forecast units | There is no actual-demand percentage denominator |
| Comparing products with different volumes | A scaled measure such as MASE or RMSSE | Needs a suitable historical baseline with nonzero error |

The [forecasting textbook](https://otexts.com/fpp3/accuracy.html) explains MAE and scaled errors. [Kim and Kim's research](https://doi.org/10.1016/j.ijforecast.2015.12.003) examines percentage-error problems for intermittent demand, where zero periods recur.

Replacing zero with a tiny number does not fix MAPE. It makes the result depend on the number you invented. Switching to sMAPE also needs care: when actual and forecast are both zero, its usual formula still has a zero denominator.

## Use history as the denominator

MASE, mean absolute scaled error, compares the forecast's MAE with a simple forecast's average error on earlier data. It does not divide by each week's actual demand.

Take an illustrative training history of **0, 5, 0, 5 units**, separate from the three evaluation weeks above. A forecast that repeats the previous week's demand misses by 5 units on each of the three available training comparisons. Its MAE is 5.

:::formula Nonseasonal MASE in this example
A's evaluation MAE = 2 ÷ 3 = 0.67 units
B's evaluation MAE = 6 ÷ 3 = 2 units
MASE for A = (2 ÷ 3) ÷ 5 = **0.13**
MASE for B = 2 ÷ 5 = **0.40**
:::

Both are below 1: their average absolute misses are smaller than that historical baseline error. This does not prove either would beat a previous-week forecast on the evaluation weeks. To answer that, forecast those weeks with the baseline too and compare directly.

The short history is only an explanation of the arithmetic. In a real review, use enough history to represent the demand pattern, and a seasonal baseline where appropriate. A constant training series gives a zero scale, making MASE unavailable.

## A low score still needs an inventory check

For a product with mostly zero weeks, predicting zero can score well on absolute-error measures. That does not establish how much stock to keep for the occasional order.

MAE-based measures favour the median forecast; squared-error measures favour the mean. [Hyndman discusses this distinction](https://robjhyndman.com/hyndsight/wape.html) and why he prefers RMSSE for some model comparisons. Neither turns a point forecast into an inventory policy.

Check demand over the supplier lead time, the size of occasional orders and the stock actually available. Measure service and leftover inventory alongside error. A weekly percentage cannot answer all of those questions.

Before treating a quiet week as zero demand, check whether the product was available. Zero sales during a stockout may tell you little about what customers wanted. Missing records should stay missing until you can resolve them.

For the review, keep the zero periods, report the units missed, and name the percentage measures that are unavailable. Then check whether the proposed forecast changes the stocking decision. The [safety stock note](/notes/safety-stock-reorder-point/) explains the role of lead time and service targets; its worked formulas rely on assumptions that need checking for intermittent demand.

## Sources

- Kim, S. and Kim, H. [A new metric of absolute percentage error for intermittent demand forecasts](https://doi.org/10.1016/j.ijforecast.2015.12.003). International Journal of Forecasting, 2016.
- Hyndman, R. J. and Athanasopoulos, G. [Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html). MAE, MAPE and scaled measures.
- Hyndman, R. J. [WAPE: Weighted Absolute Percentage Error](https://robjhyndman.com/hyndsight/wape.html). Zero denominators and mean versus median forecasts.

*The spare part, forecasts and training history are fictional. The short examples explain calculation choices, not the performance of a forecasting method.*
