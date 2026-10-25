---
title: Data leakage in machine learning: factory checks
date: 2026-10-25
summary: Find data leakage before trusting a machine-learning score. Check feature timing, preprocessing and train/test boundaries in industrial data.
seoTitle: Data leakage in machine learning: factory checks
seoDescription: Find data leakage before trusting a machine-learning score. Check feature timing, preprocessing and train/test boundaries in industrial data.
status: published
topic: Industrial AI
keywords: data leakage in machine learning, time series data leakage, train test split manufacturing, data leakage examples
---

Data leakage occurs when model development uses information that would not be available for a genuinely new prediction. The evaluation can then look better than later performance.

This use of leakage concerns the validity of an ML test. It is different from disclosing confidential information.

[scikit-learn's documentation](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) demonstrates the problem with 200 samples, 10,000 randomly generated features and random target labels. Selecting features before separating the test data produces an accuracy of 0.76 in its example. The features contain no genuine predictive relationship; the test information has influenced their selection.

## Follow when each input becomes known

A feature belongs in a prediction only if the application can obtain it at the time that prediction is needed.

In the fictional [inspection case](/notes/ai-visual-inspection-roi/), the independent inspection outcome establishes whether a part is defective. It can serve as the target used to evaluate the model. It cannot also be an input to a model expected to predict that outcome before inspection.

The same timing check applies to repair findings, later test results and corrected records. [The documentation's leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) recommends separating development and test data before learning preprocessing steps.

::figure aici-leakage-boundary | Keep later outcomes and test information outside model fitting. A label can be valid evaluation evidence while being unavailable as a prediction input.

## Check the preprocessing as well as the model

| Development step | Leakage to check |
| --- | --- |
| Fill missing values | Was the replacement value learned using the test records? |
| Scale inputs | Did the mean or range include the test period? |
| Select features | Did test outcomes influence which variables were retained? |
| Choose a threshold | Was the final test set repeatedly used to tune the decision? |

Apply the transformation learned from training data to the test data. Do not fit a fresh transformation to the full dataset and then report the resulting score as independent validation.

## Split records around the future use

Random row splitting is not sufficient for every industrial dataset. Repeated images of the same part or overlapping sensor windows may share information. Keep related records together where that relationship would make the test easier than later use.

For a time-dependent task, train on the past and evaluate on later data. [TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html) illustrates forward validation and states its equal-spacing condition for comparable fold durations. A time split still needs the feature-availability check; a future repair code remains unavailable even when the rows are ordered correctly.

The [forecasting-methods Note](/notes/demand-forecasting-methods/) uses the same principle of judging forecasts on demand they have not seen.

## Preserve one final evaluation

Use development data to choose the method and its settings. Retain a final evaluation period or group that does not repeatedly feed back into those choices.

Record the split rule, data cutoff, preprocessing fit and model version with the result. If someone cannot reconstruct what the model knew at prediction time, the score is not yet a dependable basis for a pilot decision.

## Sources

- [scikit-learn data leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage).
- [scikit-learn time ordered validation](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html).
