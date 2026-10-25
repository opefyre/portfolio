---
title: MLOps in manufacturing: maintaining the model
date: 2026-10-25
summary: Learn what MLOps means in manufacturing. Follow model versions, monitoring, approvals and rollback through the work required after deployment.
seoTitle: MLOps in manufacturing: maintaining the model
seoDescription: Learn what MLOps means in manufacturing. Follow model versions, monitoring, approvals and rollback through the work required after deployment.
status: published
topic: Industrial AI
keywords: MLOps manufacturing, what is MLOps, model monitoring manufacturing, MLOps vs DevOps
---

Machine learning operations (MLOps) covers developing, releasing and maintaining machine-learning systems as operating software. A manufacturing application needs a maintained model, dependable data paths and an agreed response when either fails.

The model file is only one part of that system. [Google's ML operations guidance](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) includes data and model validation in the delivery process. [Its production guidance](https://developers.google.com/machine-learning/managing-ml-projects/production) also separates serving checks from checks on prediction quality.

## Keep the release identifiable

A reported result should be traceable to the model version, preprocessing code, input definition and decision threshold that produced it. Retain the training data reference and evaluation evidence with the release.

That matters when the operating team investigates an event. Without the version, the analyst may evaluate today's model while trying to explain yesterday's decision.

::figure aici-model-lifecycle | A model release includes its inputs, validation evidence and operating response. An approved earlier version provides a rollback option only when its dependencies still work.

| Record | Why the team needs it |
| --- | --- |
| Data and feature definition | Identify what each input means and when it is available |
| Model and preprocessing version | Reproduce the prediction method |
| Evaluation and acceptance evidence | Show what conditions and decisions were tested |
| Release approval | Identify who accepted the operating use |
| Monitoring and rollback instructions | Respond when the deployed system no longer meets its conditions |

## Monitor the service and its decisions

A service can respond quickly while producing poor predictions. Conversely, a sound model cannot help when the application fails to deliver a result before the operating deadline.

Monitor data arrival, missing values, service availability and response time. Separately assess predictions against verified outcomes. The [drift explanation](/notes/data-drift-vs-concept-drift/) shows why changed inputs and reduced prediction quality are different findings.

For the [inspection case](/notes/ai-visual-inspection-roi/), the useful outcome records include defects missed and good parts flagged. A count of successful software requests would not measure either.

## Make model changes reviewable

Changing training data, a threshold or preprocessing can change the operating result even if the application code barely moves.

Run the revised method on suitable retained evaluation records, then check the conditions the new version is intended to cover. Document changes to the workload as well as changes to prediction measures.

Define whether a release needs a shadow period, operator approval or another bounded introduction. Select that approach around the physical consequence of a wrong result. The [IT/OT guide](/notes/it-vs-ot-explained/) explains why a reporting change and a control change need different operating windows.

## Fund the continuing work

The [multi-site AI Note](/notes/scaling-ai-manufacturing/) includes local integration and support in the rollout decision. A model at one site also needs an owner after the project closes.

Agree who investigates missing data, reviews confirmed errors, approves a replacement model and checks the fallback. Preserve those responsibilities in the handover.

Before calling the pilot ready for operation, ask another member of the team to trace one prediction to its release record and walk through the rollback instructions. Missing evidence at that point is unfinished operating work.

## Sources

- [Google production ML operations](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning).
- [Google production model monitoring](https://developers.google.com/machine-learning/managing-ml-projects/production).
