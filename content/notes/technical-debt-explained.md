---
title: Technical debt explained: an example of rising change effort
date: 2026-10-15
summary: A dispatch rule was copied to meet a deadline. It worked, but each later change had to be made twice. Compare leaving the duplication with fixing it.
seoTitle: Technical debt explained: example and change costs
seoDescription: Understand technical debt through a duplicated dispatch rule. Compare bugs and missing features, then inspect when fixing the design saves future effort.
status: published
topic: Digital transformation
keywords: technical debt explained, technical debt business example, technical debt vs bug, technical debt cost
---

**Technical debt is a design or implementation choice that makes future software changes more costly or difficult.** It can arise from a deliberate shortcut or from a design that no longer fits the system around it. Age alone does not make software debt.

A dispatch application needs a new carrier cut-off rule before launch. The team copies the rule into two workflows rather than creating one shared implementation. The release works and goes live on time.

Later, a carrier changes its collection window. Both copies need updating and testing. A small business change now touches two places, and leaving one behind could make the workflows disagree.

The [Software Engineering Institute's explanation](https://www.sei.cmu.edu/blog/the-future-of-managing-technical-debt/) connects technical debt to future change cost. Use that future work to assess whether the shortcut is worth keeping.

## A technical debt example with an immediate benefit

In our fictional release, copying the rule took 12 hours. Building the shared version would have taken an estimated 28 hours. The shortcut released the first version with **16 fewer hours of work** under those assumptions.

Those 16 hours helped the team meet the deadline. Later maintenance has to be weighed against that benefit.

Two subsequent rule changes each took 10 hours across implementation and regression testing. Those fictional records give us a starting point for estimating future work.

::interactive debt-change-history | Fictional history of one dispatch rule. The original shortcut took 12 hours instead of an estimated 28; each of two later changes took 10 hours. The decision to consolidate is assessed from today, without counting past work again.

A useful debt item names the duplicated rule, where its copies live and which kinds of change it makes harder. “The whole app is technical debt” gives the team little to estimate or prioritise.

## Technical debt vs a bug or missing feature

| Item | What is wrong or missing? | Dispatch example |
| --- | --- | --- |
| Bug | Existing behaviour fails a requirement | An order before cut-off is incorrectly rejected |
| Missing feature | Required new behaviour has not been built | No support for a second carrier |
| Technical debt | Internal design adds difficulty to later work | The same cut-off logic must be changed in two places |

A bug can reveal debt, and a feature change can expose it. They are still different entries in the work queue. Correcting one wrong threshold does not necessarily remove the duplicate design.

An old application that is easy to change may have little debt relevant to today's needs. A new app can create it during its first release.

## Estimate the choice from today

Assume consolidation now takes 24 hours, including the tests needed to preserve current behaviour. After that, a relevant rule change is expected to take 4 hours rather than 10. These future effort estimates are assumptions, not results already achieved.

Keeping the duplication requires no consolidation work today. It carries an assumed extra 6 hours each time this type of rule changes.

:::formula Effort over n future relevant changes
Leave duplication: 10 × n hours
Consolidate now: 24 + 4 × n hours
Equal effort: 24 ÷ (10 − 4) = 4 changes
:::

::interactive debt-effort-comparison | Fictional effort model from today. Change the number of future cut-off-rule changes. Both routes include implementation and regression testing for the same scope. Hours represent work capacity, not cash savings; past release effort is excluded.

At six future changes, leaving the duplication takes 60 hours. Consolidating and then changing the shared rule takes 48. The model favours consolidation by 12 hours.

If this rule never changes again, consolidation consumes 24 hours without the modelled maintenance benefit. At four changes, the routes use equal effort. The expected frequency of this particular change matters as much as the size of the code cleanup.

## Include the consequences the simple model leaves out

Duplication may also increase the chance of inconsistent behaviour. This model does not price that risk. Use actual incidents and affected business requirements to assess it rather than inventing a defect rate.

Consolidation has its own delivery and regression risks. Define the behaviour to preserve, test both workflows and identify how to recover if the change fails. The [requirements traceability example](/notes/requirements-traceability-matrix-example/) helps connect that evidence to the original requirement.

The estimates can also be wrong. If consolidation takes 48 hours instead of 24, the same six-hour saving per change moves equal effort from four changes to eight. Check the uncertain input before quoting a break-even point as a commitment.

## Put debt beside the work it affects

Record the debt item with its consequence, estimated effort to fix it and a reason to review it. For this rule, the next carrier-policy change is a sensible time to revisit the choice. A fixed percentage of every Sprint is not a substitute for understanding which debt is slowing which work.

The [build vs buy note](/notes/build-vs-buy-software/) applies the same ownership question before obtaining software. Buying a product can still leave custom extensions and interfaces to maintain.

When the change is completed, compare the next relevant maintenance work with the estimate. The [lessons-learned example](/notes/lessons-learned-example/) shows how to carry that experience into the next decision.

At the next planning review, compare the 24-hour consolidation with the rule changes expected ahead. Use that estimate to decide whether to fix the duplication now or spend the time on another priority.

## Sources and example notes

- Carnegie Mellon Software Engineering Institute. [The Future of Managing Technical Debt](https://www.sei.cmu.edu/blog/the-future-of-managing-technical-debt/), 2016. Working definition, future costs and boundaries between debt, defects and missing features.

The application, recorded efforts and estimates are fictional. The comparison assumes equivalent future changes and stable effort per change. It does not put a price on defect risk, discount future effort or turn released hours into payroll savings.
