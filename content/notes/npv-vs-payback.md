---
title: NPV vs payback: a worked example with two projects
date: 2026-10-15
summary: One project returns the initial cash sooner. Another produces more value over four years. Compare both measures on the same cash flows, then change the discount rate.
seoTitle: NPV vs payback: worked example and calculator
seoDescription: Compare net present value and payback on two fictional projects. Inspect annual cash flows, change the discount rate and see why the rankings can differ.
status: published
topic: Project management
keywords: NPV vs payback, net present value worked example, project investment appraisal, payback period calculator
---

**Payback measures how long a project takes to recover its initial investment from net cash inflows. Net present value (NPV) discounts future cash flows to today's value and subtracts the investment.** They answer different questions, so they can favour different projects.

An operations team has two proposals, each costing €40,000 upfront. The first returns cash quickly. The second takes longer, but keeps producing larger inflows later.

If the approval pack shows only payback, that later value disappears from the comparison. The four-year cash flows below show the difference.

## NPV vs payback: the main differences

| Measure | Question | What it leaves out |
| --- | --- | --- |
| Simple payback | When does cumulative undiscounted net cash recover the investment? | Time value of money and cash after recovery |
| Discounted payback | When does cumulative discounted net cash recover it? | Cash after discounted recovery |
| NPV | What is the net present value of all included cash flows? | Anything missing or wrong in those cash flows or the rate |

[ACCA's payback explanation](https://www.accaglobal.com/gb/en/student/exam-support-resources/foundation-level-study-resources/ffm/ffm-technical-articles/discounted-payback.html) distinguishes the first two methods and their limits. Payback remains useful for discussing cash recovery, especially when funding is tight. It cannot describe the whole investment on its own.

## Worked example: use the same four-year horizon

The two fictional projects are alternative ways to improve one operation. Assume the organisation can choose at most one. The table shows the extra net cash each project would generate, after its additional operating costs, in thousands of euros.

| Time | Project A: earlier inflows | Project B: later inflows |
| --- | --- | --- |
| Today, year 0 | −40 | −40 |
| End of year 1 | +25 | +10 |
| End of year 2 | +20 | +15 |
| End of year 3 | +5 | +20 |
| End of year 4 | +5 | +25 |
| Total undiscounted net cash | +15 | +30 |

Assume no residual value or further cash flows after year 4. The example is in constant purchasing-power euros with an illustrative real discount rate of 8%. Tax, financing and working-capital changes are excluded.

In a real appraisal, include relevant future incremental cash flows and keep cash assumptions consistent with the discount rate. [ACCA's investment-appraisal guidance](https://www.accaglobal.com/gb/en/student/exam-support-resources/prodipsust-study-resources/technical-articles/investment-appraisal.html) explains those choices.

## Calculate payback before discounting

Project A is still €15,000 short after year 1. Its year-2 inflow takes cumulative net cash to +€5,000, so simple payback occurs at the end of year 2.

Project B is €15,000 short after year 2. Its year-3 inflow takes cumulative net cash to +€5,000, so it pays back at the end of year 3.

All inflows arrive at year-end here, so payback occurs at a year-end too. Cash arriving throughout the year would need different timing.

A has faster simple payback. We still need to value the rest of the cash flows.

## Calculate NPV and inspect the timing

For each future inflow, divide by (1 + r) raised to its year number, where r is the annual discount rate. Add those present values to the negative year-0 investment.

:::formula Project A at 8%, in €000
NPV = −40 + 25/1.08 + 20/1.08² + 5/1.08³ + 5/1.08⁴
NPV ≈ 7.939, or €7,939
:::

Project B's NPV is approximately **€16,372** at the same rate. B pays back later and has the higher NPV under these assumptions.

::interactive project-npv-comparison | Fictional alternatives with €40,000 upfront cost each and year-end inflows over four years. Change the illustrative real discount rate. The figure shows every annual contribution, NPV and both payback measures. Rounded display values may not add exactly.

As the rate rises, later cash receives a larger discount. The NPV ranking crosses at about **27.37%** for these exact cash flows. At that rate, both NPVs are already negative. A higher relative NPV does not make either proposal worthwhile under the model.

Use the control to see how the chosen rate affects the ranking. The example does not select a company's rate or assess the projects' risks.

## Check what could change the investment decision

Before selecting B, examine whether its larger late inflows are credible. A delayed launch, lower volume or higher support bill could change the result. Update the underlying cash forecast rather than using an unexplained rate increase to cover every uncertainty.

Check funding and non-financial requirements separately. A higher-NPV proposal may still be unaffordable in the required period or fail an essential operating constraint.

The [automation-selection note](/notes/what-to-automate-first/) connects the process choice to a business case. The [build vs buy example](/notes/build-vs-buy-software/) compares the cash costs of obtaining software. NPV adds a consistent treatment of timing to that discussion.

## Keep the cash forecast connected to delivery

Once a project is approved, assign an owner to each expected cash change and record when it should occur. Time released from a task is not automatically a reduction in payroll payments.

The [benefits realisation note](/notes/benefits-realisation-automation/) follows that distinction after go-live. Compare the forecast with actual results as they arrive, including changes to operating costs.

Put payback and NPV next to each other in the decision pack. Then show the cash flows behind them. Readers should be able to explain why the measures disagree before choosing which trade-off they can accept.

## Sources and example notes

- ACCA. [Payback and discounted payback](https://www.accaglobal.com/gb/en/student/exam-support-resources/foundation-level-study-resources/ffm/ffm-technical-articles/discounted-payback.html), timing and limitations.
- ACCA. [Investment appraisal](https://www.accaglobal.com/gb/en/student/exam-support-resources/prodipsust-study-resources/technical-articles/investment-appraisal.html), relevant cash flows and consistent inflation treatment.

Cash flows and rates are fictional. Both projects have an assumed four-year life and no residual value; 8% is an illustrative real rate, not a recommended company rate.
