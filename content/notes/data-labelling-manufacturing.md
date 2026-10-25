---
title: Data labelling in manufacturing explained
date: 2026-10-25
summary: Define manufacturing training labels before annotating data. Keep defect criteria, uncertain cases, reference decisions and revisions visible.
seoTitle: Data labelling in manufacturing explained
seoDescription: Define manufacturing training labels before annotating data. Keep defect criteria, uncertain cases, reference decisions and revisions visible.
status: published
topic: Industrial AI
keywords: data labeling manufacturing, data labelling example, defect annotation, manufacturing training labels
---

Data labelling assigns the target information a model will learn or use during evaluation. In manufacturing, that might be a part-level defect decision, a defect location or a confirmed equipment event.

A label records a decision under a definition. Its presence in a dataset does not establish that the decision is correct.

[Google's labelling guidance](https://cloud.google.com/use-cases/data-labeling) distinguishes different annotation tasks. A whole-image class, an object location and a detailed segmentation require different instructions and checks.

## Define the target the model actually needs

The [inspection case](/notes/ai-visual-inspection-roi/) counts good and defective parts. It assumes independent checks establish that status. Those labels support its evaluation, but they do not identify every defect's location or failure mode.

Choose the required target before commissioning annotation. If the application needs a defect location, a pass/fail label alone cannot supply it.

| Instruction field | What to record |
| --- | --- |
| Characteristic | The feature or event being assessed |
| Decision boundary | The applicable specification or agreed category definition |
| Unit | Whole part, image region, event or time interval |
| Uncertain cases | Review route and how unresolved records are retained |
| Reference | Who or what establishes the accepted decision |
| Revision | Effective version and treatment of earlier labels |

::figure aici-label-reference | The target definition comes before the label. Keep uncertain records and reference decisions visible instead of silently converting them into good parts.

## Check agreement without assuming correctness

Two people can agree because they follow the same mistaken interpretation. One person can also repeat a decision consistently while disagreeing with the reference.

[Attribute agreement analysis](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/overview/) separates those checks for categorical ratings. The [worked agreement Note](/notes/attribute-agreement-analysis/) uses Minitab's published fabric-rating example to show the difference.

Inspect disagreements by category and near the decision boundary. A high overall match rate can conceal a weak distinction in the class the model most needs to recognise.

## Retain when the label becomes available

A later laboratory or maintenance finding may provide a useful training target. It is not necessarily available when the model must make its prediction.

Keep the original observation time, the finding time and any later correction. The [leakage guide](/notes/data-leakage-machine-learning/) explains why using later information as an input can inflate an evaluation result.

A change in defect criteria also needs a dated revision. Mixing old and new meanings without recording the change can make model performance appear to move for reasons the team cannot reconstruct.

## Make the dataset reviewable

Preserve the annotation instructions, reference examples, review decisions and versions with the data. Decide how the team handles uncertain and corrected labels before training begins.

For the next annotation task, ask a second qualified reviewer to apply the instructions to the same source records independently. Use the disagreements to improve the definition before multiplying the number of labels.

## Sources

- [Google data labelling guidance](https://cloud.google.com/use-cases/data-labeling).
- [Minitab attribute agreement analysis](https://support.minitab.com/en-us/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/attribute-agreement-analysis/attribute-agreement-analysis/before-you-start/overview/).
