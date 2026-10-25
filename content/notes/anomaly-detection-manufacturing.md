---
title: Anomaly detection in manufacturing explained
date: 2026-10-25
summary: Understand anomaly detection in manufacturing, how it differs from fault diagnosis, and what a team should check before acting on an alert.
seoTitle: Anomaly detection in manufacturing explained
seoDescription: Understand anomaly detection in manufacturing, how it differs from fault diagnosis, and what a team should check before acting on an alert.
status: published
topic: Industrial AI
keywords: anomaly detection manufacturing, anomaly detection example, manufacturing anomaly detection, fault detection vs anomaly detection
---

An anomaly detector identifies observations that differ from the behaviour it treats as normal. In manufacturing, those observations might come from vibration, temperature, pressure or several signals considered together.

An unusual reading can justify a check. It does not identify the cause on its own.

[MathWorks' maintenance guide](https://www.mathworks.com/help/predmaint/gs/what-is-predictive-maintenance.html) treats anomaly detection and fault diagnosis as separate tasks. A detector asks whether the current behaviour differs. A diagnostic method tries to distinguish among faults or other explanations.

## Define the normal operating conditions

The reference data determine what the detector recognises as familiar. Retain the operating state, product, load and measurement method with the signal. Without that context, the team cannot tell whether the model has found deterioration or an ordinary condition absent from its training records.

The [multi-site AI guide](/notes/scaling-ai-manufacturing/) describes a related problem: plants can use different event definitions and local operating practices. Combining those records without understanding the differences can change what a model learns.

::figure aici-anomaly-response | Detection produces a reason to investigate. Context checks and equipment findings are needed before the team records a diagnosis.

## Separate the alert from the finding

| Record | What belongs in it |
| --- | --- |
| Detector output | Score or flag, time, model version and input record |
| Operating context | Product, machine state, load and relevant recent changes |
| Investigation | What someone checked and the evidence they found |
| Final decision | Continue, inspect, intervene or escalate under the approved procedure |

Keep these records linked. If the database stores only an alarm label, the next model developer may treat an unconfirmed alert as a confirmed fault.

That can create a feedback problem: the model learns from its own earlier guesses rather than from independent equipment findings.

## Measure the work an alert creates

The [inspection business case](/notes/ai-visual-inspection-roi/) uses a different kind of detector, but its workload arithmetic is instructive. In that fictional case, 198 good parts join 95 defective parts in the review queue. A high overall accuracy does not remove the review work.

For equipment alerts, choose an evaluation unit that fits the job. An event, an alarm episode and an individual sensor sample are different units. Thousands of flagged samples during one incident should not be reported as thousands of separate detected failures.

Record investigation time, confirmed findings, missed events and warning time. An alert that arrives after the failure needs a different interpretation from one that supports a planned intervention.

## Use control charts where they fit

A [control chart](/notes/control-charts-explained/) uses a defined statistical model and signal rules to examine process behaviour over time. An ML detector may learn a more complex relationship across several signals. More complexity does not establish that it makes the better operating decision.

Compare methods on the same records and the same event definitions. Retain the simple baseline when it answers the question adequately.

For the next alert review, put the model output beside the operating state and the independent finding. If those cannot be joined, fix that record before using the alert history to train another model.

## Sources

- [MathWorks predictive maintenance overview](https://www.mathworks.com/help/predmaint/gs/what-is-predictive-maintenance.html).
- [Google production model monitoring](https://developers.google.com/machine-learning/managing-ml-projects/production).
