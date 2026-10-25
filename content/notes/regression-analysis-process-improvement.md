---
title: Regression analysis: a process example
date: 2026-10-25
summary: Work through linear regression using NIST calibration data. Check the fitted equation, residuals and why a high R squared cannot approve a model.
seoTitle: Regression analysis: a process example
seoDescription: Work through linear regression using NIST calibration data. Check the fitted equation, residuals and why a high R squared cannot approve a model.
status: published
topic: Continuous improvement
keywords: regression analysis process improvement, regression analysis example, R squared process improvement, regression vs correlation
---

Regression estimates a relationship between a response and one or more explanatory variables. A straight-line least-squares fit chooses an intercept and slope to minimise the sum of squared residuals.

A residual is the observed response minus the fitted response. It keeps the model's errors visible after the line summarises the relationship.

[NIST's regression guide](https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm) explains the method. The worked example below uses NIST's published calibration data.

## Fit the 36 NIST observations

[The Norris dataset](https://www.itl.nist.gov/div898/strd/lls/data/LINKS/DATA/Norris.dat) contains 36 x/y pairs from ozone-monitor calibration. Recalculating ordinary least squares from those rows reproduces NIST's certified results to the displayed precision.

:::formula Fitted relationship in the source variable scale
Fitted y = −0.262323 + 1.002117 × x
Residual = observed y − fitted y
Residual standard deviation = 0.884796
R² = 0.999993746
:::

The source does not assign physical units in the data file, so the chart retains x and y. It also supplies no production acceptance tolerance.

::interactive aici-norris-regression | All 36 NIST Norris observations, an independently recalculated least-squares line and residuals. The residual panel uses a separate, labelled vertical scale. The calculation reproduces certified benchmark statistics; it does not establish a production acceptance limit or a causal relationship.

At x = 500, the fitted response is approximately 500.796. That is an estimate from the equation within the observed x range of 0.2 to 999.0, not an additional measured row.

## Read the errors after reading the fit

The R² value is close to one because the line accounts for nearly all the response variation across this broad range. It does not say that the remaining errors are small enough for a particular use.

The recalculated residuals range from about −2.352 to 1.790. Whether those differences matter requires an operating requirement that the dataset does not provide.

[NIST's validation guidance](https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd44.htm) explicitly warns that a high R² is insufficient. Inspect residuals for curvature, changing spread and other departures from the selected model's assumptions. Use the actual acquisition order for time-related checks; a row number alone does not establish a timestamp.

## Keep the model within its evidence

Extrapolating beyond the observed range adds assumptions about behaviour the data have not shown. Even an estimate within the range needs a suitable uncertainty calculation before it supports a consequential decision.

The figure shows fitted values and residuals. Confidence and prediction intervals need their own interpretation and assumptions.

The [scatter-diagram guide](/notes/scatter-diagram-quality-control/) examines the same pairs before fitting. The [confidence-interval Note](/notes/confidence-interval-example/) explains why uncertainty belongs to a defined estimate.

## Separate estimation from a process change

An observational fit can help estimate a response or plan another study. It does not establish that adjusting x will cause the predicted change in y.

Use the [design-of-experiments example](/notes/design-of-experiments-example/) when the task is to study controlled changes to settings.

For a model review, keep the equation, residuals, observed range and intended decision together. State the requirement first, then decide whether the remaining prediction error is acceptable for that use.

## Sources

- [NIST least squares regression](https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm).
- [NIST Norris calibration data](https://www.itl.nist.gov/div898/strd/lls/data/LINKS/DATA/Norris.dat).
- [NIST regression residual checks](https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd44.htm).
