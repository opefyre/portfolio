---
title: Attribute agreement analysis explained
date: 2026-10-25
summary: Read an attribute agreement study using Minitab's fabric example. Separate repeat ratings, agreement between inspectors and reference matches.
seoTitle: Attribute agreement analysis explained
seoDescription: Read an attribute agreement study using Minitab's fabric example. Separate repeat ratings, agreement between inspectors and reference matches.
status: published
topic: Continuous improvement
keywords: attribute agreement analysis, attribute MSA example, inspector agreement, attribute agreement acceptance criteria
---

An inspector can repeat the same rating every time and still disagree with the reference. Minitab's published fabric example shows this directly: Amanda repeats her ratings on all 50 samples, but matches the reference across trials on 47.

**Attribute agreement analysis examines categorical ratings:** whether each assessor repeats their decision, whether assessors agree with one another and whether their ratings agree with a suitable reference.

That differs from [continuous Gage R&R](/notes/gage-rr-explained/), which examines variation in measured values.

## Follow the fabric-rating study

In [Minitab's teaching example](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/example/), four assessors rate the print quality of 50 cotton-fabric samples twice, in random order, using a scale from 1 to 5. The dataset includes a known standard for each sample.

The design produces 400 ratings: four people × 50 samples × two trials. The following match percentages use 50 samples as their denominator, not 400 ratings.

| Assessor | Repeats agree across trials | Ratings agree with reference across trials |
| --- | ---: | ---: |
| Amanda | 50/50 = 100% | 47/50 = 94% |
| Britt | 48/50 = 96% | 46/50 = 92% |
| Eric | 43/50 = 86% | 41/50 = 82% |
| Mike | 45/50 = 90% | 45/50 = 90% |

::figure aici-attribute-agreement | Minitab's fabric teaching dataset. Self-agreement and agreement with the reference use different matching conditions.

Amanda's three reference mismatches remain hidden if the report shows only her 100% repeat agreement. The two checks answer different questions.

## Check agreement across people too

The same published output reports agreement among all assessors on 37 of 50 samples, or 74%, under its across-trial matching rule. Strong individual repetition does not guarantee that everyone uses the scale in the same way.

Keep the matching rule beside the percentage. Agreement between two individual ratings, agreement across every repeat and agreement with a reference are not interchangeable measures.

[Minitab's overview](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/overview/) distinguishes binary, nominal and ordinal ratings. Ordered categories such as this quality scale need an interpretation suited to their order; a pass/fail study asks a different classification question.

## Inspect disagreements before choosing a threshold

Review which categories and samples produce disagreement. Check the written criteria, reference examples, viewing conditions and instructions. Preserve independent ratings during the study so assessors do not copy earlier answers.

The reference also needs a defensible basis. Agreement with an uncertain reference should not be reported as proven accuracy.

A kappa statistic can provide another view of agreement, but its interpretation depends on the categories, prevalence and study design. There is no single universal value that approves every inspection task.

## Use the finding in the work

If the model-training labels come from these decisions, resolve unclear categories before expanding annotation. The [manufacturing labelling guide](/notes/data-labelling-manufacturing/) follows that connection.

For an inspection method, record the decision it must support and the consequences of its disagreements. Then repeat the appropriate study after clarifying the method. Retain the individual ratings so the team can see what changed.

## Sources

- [Minitab fabric rating study](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/example/).
- [Minitab attribute agreement analysis](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/overview/).
