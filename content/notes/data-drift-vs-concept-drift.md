---
title: Data drift vs concept drift: a factory guide
date: 2026-10-25
summary: Separate data drift from concept drift in manufacturing. See which records reveal a change and why changed inputs do not prove model failure.
seoTitle: Data drift vs concept drift: a factory guide
seoDescription: Separate data drift from concept drift in manufacturing. See which records reveal a change and why changed inputs do not prove model failure.
status: published
topic: Industrial AI
keywords: data drift vs concept drift, data drift example, concept drift meaning, how to detect data drift
---

Data drift describes a change in the distribution of model inputs. Concept drift describes a change in the relationship between those inputs and the outcome the model predicts.

The distinction affects the investigation. Changed inputs can be a warning without establishing worse predictions. A changed input-to-outcome relationship requires evidence about outcomes too.

[Google's ML glossary](https://developers.google.com/machine-learning/glossary#concept-drift) illustrates concept drift with the changing meaning of a fuel-efficient car. A classification learned from an earlier period may no longer match the later definition. The label's meaning has moved, even when the recorded vehicle features remain understandable.

## Compare like records before interpreting a shift

An input distribution summarises what the model is seeing. Before treating a difference as equipment deterioration, check the product, operating state, data units and collection method.

The [data-quality guide](/notes/data-quality-dimensions/) separates accurate records from complete and consistent records. A unit conversion or changed code can alter the inputs without describing a physical process change.

::figure aici-drift-questions | Input monitoring asks what changed in the observations. Outcome monitoring asks whether the learned relationship and resulting decisions still hold. Both require comparable records.

| Evidence | What it can help establish | What it cannot establish alone |
| --- | --- | --- |
| Changed input distribution | The model is receiving different observations | The predictions have become less accurate |
| Changed prediction distribution | The model is producing different outputs | Whether those outputs are wrong |
| Predictions joined to verified outcomes | How performance behaves under the observed conditions | The cause of the change without further investigation |

## Keep the outcome definition stable and visible

The [inspection example](/notes/ai-visual-inspection-roi/) assumes independent checks identify 100 defective parts among 10,000. The meaning of defective is part of that evaluation.

If a team changes an inspection criterion, the model owner needs the effective date and the old and new definitions. Combining both versions as though they were identical targets would make later comparisons difficult to interpret.

That is also a reason to keep the [training-label instructions](/notes/data-labelling-manufacturing/) with the model version.

## Choose a response after identifying the change

A data pipeline error may require a correction and a replay of affected records. A legitimate operating change may require a new evaluation. Confirmed performance loss may support retraining or a revised operating limit.

Retraining immediately on every distribution change can hide a collection problem. It can also adopt a changed label before the organisation has agreed what that label should mean.

[Google's production guidance](https://developers.google.com/machine-learning/managing-ml-projects/production) notes that ground truth may be unavailable during serving. Retain the later inspection, repair or other outcome records and join them to the original predictions when they arrive.

## Keep the decision evidence

Record the monitoring period, comparison baseline, product or operating groups and the action taken. Report the model's error measures alongside the input change when suitable outcomes exist.

For the next monitoring alert, first establish whether the change concerns the data record, the operating conditions or the prediction relationship. Then decide what needs correction, evaluation or an approved model release.

## Sources

- [Google concept drift definition](https://developers.google.com/machine-learning/glossary#concept-drift).
- [Google production model monitoring](https://developers.google.com/machine-learning/managing-ml-projects/production).
