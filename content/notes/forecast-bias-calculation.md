---
title: Forecast bias calculation: why zero bias can hide a bad forecast
date: 2026-10-12
summary: A forecast can get the total right and miss every week. Calculate signed bias, compare it with WAPE and see what a balanced result hides from a planning team.
seoTitle: Forecast bias calculation: what zero bias hides
seoDescription: Calculate forecast bias with a four-week example. See why zero bias can hide errors, how sign conventions differ and what to check before adjusting demand.
status: published
topic: Supply chain
keywords: forecast bias calculation, forecast bias formula, forecast bias vs accuracy, positive negative forecast bias, demand planning
---

MAPE (mean absolute percentage error) averages absolute percentage errors across products or periods. WAPE (weighted absolute percentage error) divides total absolute error by total actual demand. Bias tells you whether forecasts run high or low overall. The [MAPE/WAPE guide](/notes/forecast-accuracy-mape-wape/) introduces all three with a worked example.

The monthly forecast was 400 units. Actual demand was 400. The report shows zero bias, so the team moves on.

Yet every weekly forecast was wrong.

Overforecasting and underforecasting can cancel in the total, even when the timing is poor. That is why a zero-bias result needs an absolute-error measure beside it.

## The forecast bias formula, with the sign stated

For this note, signed error is **forecast minus actual**. Percentage bias is the sum of those errors divided by total actual demand.

:::formula Our bias convention
Bias (%) = sum of (forecast − actual) ÷ sum of actual × 100
Positive = overforecasting
Negative = underforecasting
Zero = signed errors cancel, or there were no errors
:::

Some reports subtract forecast from actual, reversing the sign. [Oracle's demand-planning documentation](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25c/fasdm/how-you-measure-forecast-accuracy.html), for example, labels demand above forecast as positive bias. Check the denominator too. “Bias: −10%” without a definition is an invitation to argue about the wrong thing.

The [forecasting textbook](https://otexts.com/fpp3/accuracy.html) uses actual minus forecast for its error definition. That is a valid convention. The important thing is to translate the sign correctly and use it consistently.

## Same monthly total, wrong every week

A fictional distributor needs 100 units of one product in each of four weeks. Both forecasts were fixed before the evaluation period. These are demand forecasts, not simulated delivery or inventory outcomes.

| Week | Actual | Forecast A | A: signed error | Forecast B | B: signed error |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 100 | 80 | −20 | 90 | −10 |
| 2 | 100 | 120 | +20 | 90 | −10 |
| 3 | 100 | 80 | −20 | 90 | −10 |
| 4 | 100 | 120 | +20 | 90 | −10 |
| Total | 400 | 400 | 0 | 360 | −40 |

A has zero bias. But its absolute errors total 80 units, giving WAPE of **20%**. B's bias is **−10%**, while its absolute errors total only 40 units: WAPE of **10%**.

::figure forecast-bias-offsets | Fictional four-week comparison. A's alternating errors cancel in the total. B runs low each week but misses fewer units overall. Each bar uses forecast minus actual.

B is closer week by week. It also runs low throughout this sample. Those are two separate findings, both worth keeping.

The [MAPE/WAPE calculator](/notes/forecast-accuracy-mape-wape/#two-forecasts-different-winners) includes these inputs under “Errors cancel out”. Change them to see how bias and absolute error respond.

## Aggregate first, and the error disappears

If you add up the month before calculating absolute error, A's error becomes |400 − 400| = 0. If you calculate each weekly miss first, then add, it is 20 + 20 + 20 + 20 = 80.

Both calculations answer a question. Monthly total error asks whether the month's quantity was right. Weekly absolute error asks how far off the weekly plan was. Use the level that matches the decision.

The same issue appears across products. Overforecasting one item cannot supply a different item that was underforecast. A balanced portfolio total can hide opposing problems. Keep the product or customer comparisons that matter to purchasing and production.

You cannot infer stockouts from this table alone. Starting stock, replenishment dates and order quantities determine what customers actually receive. That is why the forecast score belongs beside delivery and inventory results, rather than replacing them.

## What to do when the forecast keeps running low

Four low forecasts are a reason to investigate. They are not proof that a model has a lasting statistical bias, and they do not justify adding 10% to every future forecast.

Check which products, customers and horizons carry the pattern. Compare the stored forecasts with later actuals, including promotions and manual changes. If sales were limited by stock availability, recognise that the recorded actuals may understate demand.

Then compare the original method, any proposed adjustment and a simple baseline on later periods. A correction that repairs these four weeks can still damage the next four.

In a regular review, report direction, absolute error and sample coverage together. A useful line is: “In this four-week review, this product ran low in four of four weeks; percentage bias was −10%, WAPE was 10%.” Add the forecast's issue date and horizon. That says much more than “accuracy improved”.

## Keep the forecast and the decision together

If purchasing orders eight weeks ahead, evaluate that version of the forecast. A revision made just before delivery cannot explain the original commitment. [Foreviq](/work/foreviq/) connects to this distinction by selecting methods on earlier data and checking them on a later period.

A persistent directional error may affect the stock you need, but the remedy depends on its cause and the cost of being wrong. Check lead-time variation and service targets before changing buffers. The [safety stock example](/notes/safety-stock-reorder-point/) takes that next step; the [AI planning note](/notes/ai-supply-chain-planning/) shows why a forecast still needs a decision about capacity and cost.

Zero bias is useful information. It becomes misleading when the review stops there.

## Sources

- Hyndman, R. J. and Athanasopoulos, G. [Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html). Signed errors, absolute errors and evaluation on later data.
- Hyndman, R. J. [WAPE: Weighted Absolute Percentage Error](https://robjhyndman.com/hyndsight/wape.html). The summed absolute-error definition used here.
- Oracle. [How you measure forecast accuracy](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25c/fasdm/how-you-measure-forecast-accuracy.html). An example of the opposite bias sign convention.

*The distributor and four-week forecasts are fictional. Bias here uses forecast minus actual, divided by actual demand; it describes this sample, not a proven long-run tendency.*
