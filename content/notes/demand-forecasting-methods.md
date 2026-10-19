---
title: Demand forecasting methods: test them on demand they have not seen
date: 2026-10-19
summary: Compare demand forecasting methods on the same held-out data. Inspect naive, seasonal and drift forecasts, error, bias and the limits of a small example.
seoTitle: Demand forecasting methods: a worked comparison
seoDescription: Compare demand forecasting methods on the same held-out data. Inspect naive, seasonal and drift forecasts, error, bias and the limits of a small example.
status: published
topic: Supply chain
keywords: demand forecasting methods, demand forecasting definition, forecasting models, seasonal naive, forecast validation
---

The purchasing team needs a forecast for the next four quarters. A new model fits the old sales curve beautifully. The current method repeats last year's quarters.

Before choosing either method, the team needs to compare their forecasts with demand that arrived later.

**Demand forecasting estimates how much customers will need over a stated future period.** It supports decisions about stock, purchases, production and capacity. A model is the rule or mathematical relationship used to produce those estimates from information available at the time.

Recorded sales, customer orders and demand are related, but different. A stockout can suppress sales; open orders can already belong inside a forecast. A sales forecast concerns expected sales, which may differ from demand when availability limits what customers can buy. Check those meanings before fitting anything.

## Choose methods that match the information

A forecast needs an item or group, location, time bucket, issue date and horizon. Predicting total quarterly demand is a different task from predicting tomorrow's orders for one warehouse.

| Method family | What it uses | A sensible check |
| --- | --- | --- |
| Naive and seasonal naive | The latest observation, or the latest matching season | Can a more elaborate method beat this simple baseline? |
| Smoothing and trend-seasonal models | Historical levels, changes and repeating patterns | Are those patterns stable enough to extrapolate? |
| Explanatory models, including some machine learning | Variables such as price, promotions or weather | Will the required inputs be known when the forecast is issued? |
| Judgemental approaches | Structured knowledge when records are limited or events change | Who made the judgement, what evidence supported it and how will it be checked? |

The families overlap: a method can combine a seasonal pattern with explanatory variables or informed judgement. Lists of four or five methods often group them differently. For this planning task, the work follows seven steps:

1. Define the decision, item, location and forecast horizon.
2. Check the records and identify missing or constrained demand.
3. Establish a simple baseline.
4. Fit a small set of justified alternatives using earlier data.
5. Compare genuine later forecasts at the required horizon.
6. Use the forecast and its uncertainty in the operating decision.
7. Save the issued version and review outcomes before updating it.

The sequence can repeat as new records and results become available.

[Forecasting: Principles and Practice](https://otexts.com/fpp3/toolbox.html) explains simple benchmarks and testing forecasts on later observations. The [demand-patterns note](/notes/demand-patterns-trend-seasonality/) looks more closely at trend and seasonality.

## Keep the future out of the training data

For a fictional product, we have eight quarters of demand: 80, 100, 120, 160, 90, 110, 140 and 180 units. Assume these represent demand adequately, without missing stockout demand or later revisions.

At the end of quarter 8, we issue all four forecasts together. The next four actuals, held back for evaluation, are 100, 125, 150 and 190 units.

The last-quarter method predicts 180 each time. Seasonal naive repeats quarters 5 to 8: 90, 110, 140 and 180. A simple drift benchmark extends the change from the first to last training value: 100 units over seven intervals, about 14.29 per quarter.

No method sees quarters 9 to 12 when making its forecasts. The drift estimate stays fixed rather than being refitted after each actual arrives.

::interactive paa-forecast-methods | Fictional quarterly demand. All forecasts share one origin after quarter 8 and use only quarters 1 to 8. Inspect a quarter or change the scoring horizon. The four later observations illustrate evaluation; they do not establish which method will perform best in production.

## Compare the same horizon and the same rows

Across the four held-out quarters, actual demand totals 565 units. Seasonal naive has 45 units of absolute error; last-quarter naive has 175. Their weighted absolute percentage errors, or WAPE, are 8.0% and 31.0% respectively.

Seasonal naive also underforecasts by 45 units in total. With signed error defined as forecast minus actual, that is −8.0% of actual demand. A lower absolute error does not remove the need to examine the direction.

The [MAPE and WAPE guide](/notes/forecast-accuracy-mape-wape/) defines those metrics. The [forecast-bias guide](/notes/forecast-bias-calculation/) explains why errors in opposite directions can cancel. In the chart, changing the scoring horizon updates every method to use the same quarters and actual-demand total.

Seasonal naive wins this particular illustration because it follows the repeating pattern. The drift line extrapolates between a low first quarter and a high final quarter, treating part of the seasonal pattern as growth.

This small, constructed dataset favours that seasonal pattern. Before selecting a method for a real product, compare it across more forecast dates and reserve untouched data for a final check.

## Uncertainty belongs in the operating decision

A point forecast does not say how likely a shortage is. Our four test observations are not enough to establish a calibrated probability range for a real product.

In practice, evaluate prediction ranges as well as point accuracy, at the horizon the decision needs. Check how often actual demand falls inside the stated range and how wide that range is. A wide interval can cover more outcomes while providing little help with a purchase decision.

The [AI planning example](/notes/ai-supply-chain-planning/) compares different demand scenarios with available stock and capacity. Its scenarios are decision tests, separate from statistical prediction intervals.

If sales were limited by availability, fix that measurement problem first. [Forecasting through stockouts](/notes/demand-forecasting-stockouts/) explains why a better model of incomplete sales data can still plan too little stock.

## A best method needs a defined setting

For a new product, structured judgement and comparable items may be more useful than a long time-series model with no history. For repeat seasonal demand, the corresponding seasonal benchmark deserves a place. Promotion effects need information available before the promotion happens.

The 2015 paper [Golden rule of forecasting: Be conservative](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/10/Golden-Rule-of-Forcasting_Be-Conservative_2.pdf) uses conservative to mean respecting accumulated knowledge about the situation and methods. It does not mean always predicting a low number or always assuming no change.

Choose the operational decision, establish a credible simple baseline and test alternatives on later data. Keep the original issue dates, inputs and forecasts. That gives the next planning review evidence to work with, including when the simple method remains hard to beat.

## Sources and example notes

- Hyndman and Athanasopoulos, [Forecaster's toolbox](https://otexts.com/fpp3/toolbox.html), Forecasting: Principles and Practice, third edition, sections 5.2, 5.5, 5.8 and 5.10.
- Armstrong, Green and Graefe, [Golden rule of forecasting](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/10/Golden-Rule-of-Forcasting_Be-Conservative_2.pdf), Journal of Business Research, 2015.

The product and all 12 values are fictional. All forecasts are issued after Q8 without model tuning. Drift uses the unrounded 100/7 slope. Bias is total forecast minus total actual demand, divided by total actual demand. Displayed values are rounded; no prediction intervals are estimated.
