---
title: Explainable AI: reading a factory prediction
date: 2026-10-25
summary: Learn how to read an explainable AI output in manufacturing. Check what it explains, who it serves and why feature importance is not a cause.
seoTitle: Explainable AI: reading a factory prediction
seoDescription: Learn how to read an explainable AI output in manufacturing. Check what it explains, who it serves and why feature importance is not a cause.
status: published
topic: Industrial AI
keywords: explainable AI manufacturing, explainable AI example, feature importance manufacturing, explainable vs interpretable AI
---

Explainable AI provides information intended to help people understand a model's output or behaviour. The explanation needs to match both the model and the decision someone is making.

A ranked list of influential inputs may explain a prediction. It does not establish that changing the top-ranked input will improve the production process.

[NIST's four principles](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=933399) separate providing an explanation, making it meaningful to the user, reflecting the system accurately and recognising its knowledge limits. Those are distinct checks; an understandable story can still misdescribe the model.

## Ask what the explanation covers

An explanation for one prediction differs from a summary of model behaviour across many records. Keep that scope visible.

| Explanation question | What to inspect |
| --- | --- |
| Which output is explained? | The identified prediction, model version and input record |
| Is the scope local or general? | One decision, a group of records or the wider model |
| What does the method report? | Contributions, sensitivity, examples or another defined quantity |
| Can the user verify it? | Relevant evidence, limitations and access to the underlying record |

Do not compare scores from different explanation methods as though their numbers share a meaning. Read the method's definition before interpreting the scale.

::figure aici-explanation-limits | An explanation describes a model decision. A process intervention needs additional causal and operating evidence.

## Connect the explanation to the operating decision

The [inspection case](/notes/ai-visual-inspection-roi/) requires someone to review flagged parts. An explanation could help locate the area to inspect, if the method is suitable and tested for that use.

It would not replace the independent finding about whether the part meets the requirement. Nor would an attractive highlighted region prove that the model used the intended physical feature.

Evaluate the explanation on the task it supports. Check whether reviewers can identify the relevant evidence and notice incorrect outputs, rather than asking only whether they find the display convincing.

## Keep an explanation from becoming an unsupported cause

A model can rely on a feature that accompanies an outcome without causing it. The explanation can faithfully describe that reliance while offering poor advice about what to change.

[The manufacturing causal-AI demonstration](https://www.databricks.com/blog/manufacturing-root-cause-analysis-causal-ai) distinguishes symptoms from assumed causes in a fictional production example. The [AI root-cause Note](/notes/ai-root-cause-analysis-manufacturing/) follows the additional evidence an intervention claim needs.

## Retain the possibility of an unanswered question

Document the operating range and situations in which the explanation method is unreliable or unavailable. A system should not fill that gap with a confident narrative that has no defined connection to its decision process.

For an acceptance review, select real output records, identify the exact explanation method and test the decisions the intended users must make with it. Keep explanation accuracy and user usefulness as separate findings.

## Sources

- [NIST explainable AI principles](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=933399).
- [Databricks causal manufacturing example](https://www.databricks.com/blog/manufacturing-root-cause-analysis-causal-ai).
