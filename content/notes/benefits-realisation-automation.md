---
title: Benefits realisation: did the automation actually save money?
date: 2026-10-03
summary: The automation is live and processing time is down. Adjust for volume, separate released capacity from cash, and check the promised benefit against evidence. Includes an Excel review sheet.
status: published
topic: Digital transformation
keywords: benefits realisation, benefits realization template, benefits realisation plan, automation savings tracking, digital transformation benefits measurement
---

The automation is live. Operations says processing time has halved. The project report calls that a saving, and Finance asks which expense fell.

Nobody has to be wrong for this conversation to happen. The system can work, the process can get faster, and the financial claim can still need correcting.

Benefits realisation is the work of checking the promised result after the change enters normal use. Start with the original promise, then follow it into operating evidence and the accounts.

## Keep the promise after the project closes

A launch date tells you when a system became available. It does not establish that people use it, that work changed, or that the expected benefit followed.

For each benefit, keep a short record of the starting position, target, measurement period, evidence and person responsible for delivering it. Preserve the dated original target when the forecast changes. Otherwise, a review can become a comparison against whatever now looks achievable.

[Australia's Digital Transformation Agency](https://architecture.digital.gov.au/design/benefits-management-guides-and-tools) provides benefits guidance and templates. The [UK Government Efficiency Framework](https://www.gov.uk/government/publications/the-government-efficiency-framework/the-government-efficiency-framework--2) distinguishes cash reductions from improvements that increase output without reducing spending. These are public-sector references; the measurement distinction is also useful in a private business.

Our fictional case is an invoice process. Its original promise was to halve handling time and remove €900 a month of overtime, while maintaining the agreed accuracy and turnaround. The system costs €700 a month to run and €12,000 to introduce.

The operating promise and cash promise need different evidence. Keep both visible.

::figure benefits-evidence-chain | Fictional benefit review. A system being live, lower handling time and a verified expense reduction are separate observations. Each needs evidence and an owner.

## Compare the same workload

Before automation, the team handled 3,000 invoices a month at six minutes each. That took 300 hours. After launch, it handles 3,600 invoices at three minutes each: 180 hours.

| Measure | Baseline month | Review month |
| --- | ---: | ---: |
| Invoices | 3,000 | 3,600 |
| Average handling time | 6 min | 3 min |
| Total handling effort | 300 h | 180 h |

Subtracting those observed totals gives 120 hours. But the team now handles 20% more invoices. Use the old rate at the new volume to make the comparison explicit.

:::formula Volume-adjusted effort
Expected effort at the old rate: 3,600 × 6 ÷ 60 = 360 h
Review effort: 3,600 × 3 ÷ 60 = 180 h
Difference at the same volume: **180 h per month**
:::

The 360 hours are a counterfactual: an estimate of what the review workload would have required at the old rate. They were not observed after the change.

This example assumes a comparable invoice mix and no other process changes. In practice, simpler invoices, better source data or different staffing could explain some of the difference. Include exception handling, rework and support effort inside the measurement boundary rather than timing only the successful automated path.

A useful review asks whether the improvement remains when those conditions are accounted for. The spreadsheet can calculate a volume adjustment. It cannot establish attribution for you.

## Separate capacity from expenditure

At a fully loaded rate of €35 an hour, 180 released hours have a capacity value of €6,300 a month. That is a way to describe the scale of the operating improvement.

It is not evidence that the company spends €6,300 less.

For this fictional review, payroll records confirm that overtime spending fell by €900 a month. The team redeploys the remaining capacity to other work. Base staffing and pay stay unchanged.

| Benefit | Result in the example | Evidence to keep |
| --- | --- | --- |
| Less effort for the same volume | 180 h per month | Comparable case counts and handling measurements |
| Capacity value at the stated rate | €6,300 per month | The hours and the rate assumption |
| Lower cash expenditure | €900 per month | Overtime records and Finance's comparison |
| Better service | Needs a separate measure | Turnaround and accuracy before and after |

Do not add the €6,300 capacity value to the €900 cash reduction. They describe overlapping consequences of the same released effort. Counting both as independent money benefits would overstate the result.

Redeployed capacity can matter even when spending does not fall. Record what the team now does with it: more completed cases, a smaller backlog or work that previously had no time allocated. Check that result directly rather than leaving it as a valued number with no destination.

## Put the benefit in the right period

The €900 expense reduction is gross. The new system costs €700 a month, so recurring net cash benefit is €200 a month.

::figure benefits-cash-bridge | Fictional monthly comparison. €900 of evidenced gross cash benefit minus €700 of recurring system cost leaves €200. The separate €6,300 capacity valuation is outside this sum.

Suppose the first three post-launch months all show the same volume, handling time, overtime reduction and operating cost. Keep this simplifying assumption visible; an actual rollout usually needs monthly observations.

:::formula Three-month cash position
Gross cash benefit: 3 × €900 = €2,700
Recurring cost: 3 × €700 = €2,100
Upfront cost: €12,000
Net cash benefit to date: €2,700 − €2,100 − €12,000 = **−€11,400**
:::

The review can report a halved handling time, the promised €900 gross monthly cash benefit, and an investment that has not yet recovered its initial cost. Those statements agree.

Compare the result with the original plan for the same three months. If the business case already expected that cash position, it is on plan. If it promised €6,300 of cash savings a month, the original classification needs correcting.

Keep a reforecast beside the original plan, with a date and explanation. Do not replace the promise and then describe the revised number as achieved.

## Give a missed benefit somewhere to go

A variance needs a decision. More reminders to use the system might help when adoption is low. They will not help when the estimated cash benefit depends on an expense nobody can remove.

At the review, the process owner and Finance should be able to answer:

1. What changed at a comparable volume and case mix?
2. Which part of the change can reasonably be attributed to the intervention?
3. Which expense changed, and where is the evidence?
4. What extra costs or work appeared elsewhere?
5. What needs to change before the next review?

Check accuracy and turnaround alongside effort. A quicker process that leaves unresolved exceptions or moves work to another department can look successful inside a narrow boundary.

:::link /notes/benefits-realisation-automation/benefits-review.xlsx | Download the benefits review sheet
Keep the original promise, monthly observations and evidence together. Calculate volume-adjusted effort, capacity value and net cash separately, with planned and realised results.
:::

:::link /notes/what-to-automate-first/ | Choose a worthwhile process before building it
Use the automation scoring model and business case for selection. Return to the benefit record after the system goes live.
:::

The next benefits report should make the result easy to check. State what improved, what expense changed, what it cost, and who will act on the gap.

## Sources

- HM Treasury and Government Finance Function. [The Government Efficiency Framework](https://www.gov.uk/government/publications/the-government-efficiency-framework/the-government-efficiency-framework--2). Baselines, cash and non-cash benefits, costs and double counting.
- Australian Government Digital Transformation Agency. [Benefits management guides and tools](https://architecture.digital.gov.au/design/benefits-management-guides-and-tools). Guidance and benefit planning templates.

The invoice volumes, handling times, costs, original promise and review outcomes are fictional. The counterfactual assumes comparable case mix and no other changes. A calculated difference is not independent proof that automation caused it.
