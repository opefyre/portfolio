---
title: AI visual inspection ROI: a worked business case
date: 2026-10-03
summary: A pilot reports 98% accuracy. Translate that into missed defects, false alarms and annual cost, then calculate the payback against today's inspection process. Includes an Excel model.
status: published
topic: Industrial AI
keywords: AI visual inspection ROI, AI inspection business case, automated visual inspection cost, false positives quality inspection, AI quality control ROI, inspection payback
---

An AI inspection pilot reports 98% accuracy. The quality team sees a promising detector. Finance sees a budget request. The line team wants to know how often it will have to stop and check a part.

Those questions need more than the headline percentage.

An inspection system can classify most parts correctly while creating a considerable review workload. Whether it is worth buying depends on the defects it catches, the good parts it flags, and what happens to each of them on the line.

## Translate accuracy into parts

Take a fictional pilot of 10,000 parts. Independent checks establish that 100 are defective and 9,900 are good. The system catches 95 of the defects and incorrectly flags 198 good parts.

| Outcome | Parts | What happens next in this example |
| --- | ---: | --- |
| Defective, flagged correctly | 95 | Review and normal defect handling |
| Defective, missed | 5 | The defect escapes this inspection |
| Good, flagged incorrectly | 198 | Review confirms it is good and releases it |
| Good, passed correctly | 9,702 | No review needed |
| Total | 10,000 | |

::figure inspection-outcomes | Fictional pilot. The system flags 293 parts, of which 95 are defective. Good parts dominate the sample, so a high overall accuracy can coexist with a substantial false-alarm workload.

:::formula Four different measures
Accuracy: (95 + 9,702) ÷ 10,000 = **97.97%**
Detection rate: 95 ÷ 100 = **95%**
False positive rate: 198 ÷ 9,900 = **2%**
Precision: 95 ÷ (95 + 198) = **32.42%**
:::

Detection rate, also called recall, tells us what share of defects the system catches. False positive rate divides false alarms by good parts. Precision tells us what share of the flagged parts actually have a defect. [Google's classification guide](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) explains these definitions.

About two-thirds of this pilot's flags are false alarms. That does not establish that the system is a poor investment. It establishes work that the business case has to include.

## Compare with today's inspection

The relevant alternative is the inspection already in place. Comparing AI with no inspection can credit it with benefits the current process already delivers.

For the worked business case, assume one million parts a year with the same 1% defect prevalence. Today's inspection catches 80% of the defects and flags 0.5% of good parts. The proposed AI system catches 95% and flags 2% of good parts.

These are fictional assumptions, not industry benchmarks. Annualising a pilot assumes its performance holds across the year's products, shifts and conditions. That assumption needs evidence before investment.

| Annual outcome | Current process | Proposed AI |
| --- | ---: | ---: |
| Defects caught | 8,000 | 9,500 |
| Defects missed | 2,000 | 500 |
| Good parts flagged | 4,950 | 19,800 |
| All parts requiring review | 12,950 | 29,300 |

AI would prevent 1,500 additional defect escapes here. It would also generate 16,350 additional reviews. Both belong in the comparison.

The example assumes every flagged part receives one review. If the actual system rejects automatically or stops the conveyor, use those consequences and costs instead. A false positive that creates scrap is a different expense from one that takes a minute to check.

## Put a cost on each outcome

For this model, each missed defect creates €30 of additional downstream cost. That is above the normal cost of dealing with the defect. Each flagged part costs €1 to review, whether it proves good or defective.

Assume the system also avoids €20,000 a year of routine inspection overtime, costs €24,000 a year to operate, and requires €45,000 upfront. The recurring cost covers the assumed licence, maintenance and monitoring. The upfront cost covers the assumed equipment and integration.

| Annual change versus the current process | Benefit or cost |
| --- | ---: |
| 1,500 fewer escapes × €30 | €45,000 benefit |
| 16,350 more reviews × €1 | €16,350 cost |
| Routine inspection overtime avoided | €20,000 benefit |
| Additional recurring system cost | €24,000 cost |
| **Annual net benefit before upfront investment** | **€24,650** |

The €20,000 is a cash saving only because this fictional operation can actually remove that overtime. If the same people stay on the same paid hours, record the released capacity separately. Do not use it to claim a cash payback.

Likewise, don't count the full product value, rework, warranty and an assumed customer loss for the same escaped defect if those estimates already include each other. Define the €30 once. Normal defect-resolution costs that are unchanged between the two options cancel out in this simplified comparison.

Equipment, integration and ongoing support belong in the calculation as well as inspection performance. [NIST's manufacturing AI lessons](https://www.nist.gov/blogs/manufacturing-innovation-blog/artificial-intelligence-manufacturing-real-world-success-stories) stress the operating problem and implementation work behind the return. None of these costs should be hidden under "the pilot already works".

## Calculate payback and first-year return

:::formula Simple cash comparison
Annual net benefit = €45,000 − €16,350 + €20,000 − €24,000 = **€24,650**
Simple payback = €45,000 ÷ €24,650 = **1.83 years**, about 22 months
First-year net benefit = €24,650 − €45,000 = **−€20,350**
First-year return on initial investment = −€20,350 ÷ €45,000 = **−45.22%**
:::

The positive annual benefit and negative first-year result are consistent: the upfront cost has not yet been recovered. This return uses the initial investment as its denominator. State that convention because "ROI" is used for several different calculations.

Simple payback assumes a full year at the modelled run rate. It excludes financing, tax, discounting, residual value and the time needed to ramp up. A staged rollout would delay recovery. Use a cash-flow model when those differences matter to approval.

If annual net benefit is zero or negative, there is no positive simple payback under those assumptions. The spreadsheet says so rather than displaying a negative recovery period.

## Find the assumption that changes the decision

Keep detection at 95% and change only the AI false positive rate. This is a sensitivity test, not a claim that the detector can reduce false alarms without losing detection performance.

| AI false positive rate | Annual net benefit | Simple payback |
| --- | ---: | ---: |
| 1% | €34,550 | 1.30 years |
| 2% | €24,650 | 1.83 years |
| 3% | €14,750 | 3.05 years |
| 5% | −€5,050 | No positive payback |

::figure inspection-payback-threshold | Fictional sensitivity. All inputs except the AI false positive rate stay fixed. Annual net benefit reaches zero at about 4.49%; a two-year simple payback requires about 2.22% or lower.

If the approval requirement is recovery within two years, the system needs at least €22,500 annual net benefit. Under these assumptions, that limits false positives to roughly 2.22% of good parts. The current 2% assumption leaves only €2,150 a year above that requirement.

That is a much clearer next pilot question than "can we reach 99% accuracy?" Test whether the system can meet both the detection requirement and the review workload at the same threshold. Changing the classification threshold can trade detection against false alarms, as the [classification guide](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) explains.

Defect prevalence matters too. At 0.5%, while holding the rates and other assumptions fixed, annual net benefit falls to €2,825. The sheet lets you test that case. A dataset selected to contain many defects can establish performance on those images, but its overall accuracy or flag mix may not represent a normal production run.

## Make the pilot answer the business case

Run the current and proposed inspections on comparable production conditions, with a dependable way to establish which parts are actually defective. Checking only flagged parts would leave missed defects poorly measured.

Record the product and defect types, good and defective counts, correct catches, misses, false alarms, review time and any line interruption. Include variations in speed, lighting, material and shift where they matter. Rare or serious defects need enough evidence of their own; a large total sample can still contain very few of them.

Assign someone to the costs as well as the detection results. Quality can verify escapes and review outcomes. Operations can verify the workload. Finance can confirm which claimed savings will actually change expenditure.

:::link /notes/ai-visual-inspection-roi/inspection-business-case.xlsx | Download the inspection business case
Editable pilot counts, an annual comparison with the current process, and sensitivity tables for false positives and defect prevalence. The fictional inputs are clearly labelled.
:::

An investment may be worthwhile with a modest accuracy figure, and disappointing with an impressive one. The useful question is whether the defects prevented are worth more than the work and costs added, while meeting the required quality standard.

:::link /notes/what-to-automate-first/ | Choose the process before buying the technology
Use the automation scoring model to compare candidates before building a detailed case for one inspection point.
:::

## Sources

- Google. [Classification: accuracy, recall, precision, and related metrics](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall). Definitions, denominators and threshold trade-offs.
- NIST. [Artificial Intelligence in Manufacturing: Real World Success Stories and Lessons Learned](https://www.nist.gov/blogs/manufacturing-innovation-blog/artificial-intelligence-manufacturing-real-world-success-stories). Operating problems, implementation requirements and financial outcomes.

The pilot, current-process comparison, annual volumes, performance rates and all costs are fictional. The model illustrates an incremental cash comparison, not a forecast of a particular system's return.
