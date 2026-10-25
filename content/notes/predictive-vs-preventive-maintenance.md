---
title: Predictive vs preventive maintenance explained
date: 2026-10-25
summary: Compare predictive, preventive and condition-based maintenance. See what a prediction needs before it can support a maintenance decision.
seoTitle: Predictive vs preventive maintenance explained
seoDescription: Compare predictive, preventive and condition-based maintenance. See what a prediction needs before it can support a maintenance decision.
status: published
topic: Industrial AI
keywords: predictive maintenance machine learning, predictive vs preventive maintenance, condition based vs predictive maintenance, AI predictive maintenance
---

Preventive maintenance schedules work by time, usage or another planned interval. Condition-based maintenance responds to evidence about equipment condition. Predictive maintenance uses data and a model to anticipate a future condition or maintenance need.

The approaches can coexist on the same machine. A team can inspect a seal weekly, respond to a measured condition and use a model to estimate when another component may need attention.

[MathWorks' predictive maintenance guide](https://www.mathworks.com/help/predmaint/gs/what-is-predictive-maintenance.html) separates unusual-condition detection, fault diagnosis and remaining useful life estimation. Buying a model that does the first task does not mean the team has obtained all three.

## Compare the trigger for the work

| Approach | Trigger | Evidence the team needs |
| --- | --- | --- |
| Preventive | A planned date or usage interval | Maintenance requirements, operating history and the consequences of the interval |
| Condition-based | An observed condition reaches a defined criterion | A credible measurement, operating context and an agreed response |
| Predictive | A model anticipates a condition or maintenance need | Suitable historical evidence, validation and enough warning to act |

The [DMAIC filling example](/notes/dmaic-step-by-step/) already includes a weekly valve-seal check. That is a scheduled preventive task in a fictional teaching case. It does not become predictive because someone stores the result in a database.

A prediction would need an additional relationship between available observations and a future event. The team would then have to test that relationship on equipment histories the model had not used to learn it.

::figure aici-maintenance-triggers | A scheduled check, an observed condition and a forecast trigger different maintenance decisions. The weekly seal check is a teaching example, not evidence of a predictive model.

## Check whether the model predicts something useful

Start with the maintenance decision. Identify the component, the event to anticipate and the time needed to inspect, obtain parts or arrange a safe operating window.

Then examine the records. A failure log needs a consistent event definition. Sensor readings need timestamps, units and operating states. A repair can change the equipment condition, so the model must not treat every historical reading as part of one uninterrupted deterioration path.

The [MTBF and MTTR guide](/notes/mtbf-vs-mttr/) explains how definitions change reliability measures. Those measures summarise past events. They do not supply an individual machine's remaining life.

## Include the response to an alert

A useful warning arrives early enough for someone to act. Record which alerts led to inspection, what the inspection found and whether a timely intervention was possible. Include unnecessary checks and missed events in the review.

A long warning interval may be too vague for scheduling. A short one may arrive after the team can obtain the required part. The operating window belongs in the validation, alongside the model's prediction error.

Vrolen's [maintenance-event guide](https://vrolen.com/blog/mtbf-vs-mttr-oee/) provides a separate worked example of turning a failure log into measures. Keep that example's equipment and time boundary separate from your pilot.

## Choose the method the evidence can support

A machine with few recorded failures may not support a model that needs many run-to-failure histories. [Remaining-life methods](https://www.mathworks.com/company/technical-articles/three-ways-to-estimate-remaining-useful-life-for-predictive-maintenance.html) use different evidence, including component lifetime records, comparable degradation histories and a defined condition threshold.

Keep scheduled tasks where the maintenance requirement calls for them. Before adding prediction, identify the decision it would change and collect the evidence needed to compare that decision with the current method.

## Sources

- [MathWorks predictive maintenance overview](https://www.mathworks.com/help/predmaint/gs/what-is-predictive-maintenance.html).
- [MathWorks remaining useful life methods](https://www.mathworks.com/company/technical-articles/three-ways-to-estimate-remaining-useful-life-for-predictive-maintenance.html).
