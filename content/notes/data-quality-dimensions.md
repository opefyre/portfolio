---
title: Six data quality dimensions, explained with inventory
date: 2026-10-14
updated: 2026-10-23
summary: The stock file is complete, the quantity is valid, and the shelf still contains fewer units. Use six data quality checks to see what a clean-looking record can hide.
seoTitle: Six data quality dimensions: inventory examples
seoDescription: Learn the six data quality dimensions through stock records. Compare completeness, uniqueness, consistency, timeliness, validity and accuracy.
status: published
topic: Digital transformation
keywords: data quality dimensions, data quality examples, accuracy vs completeness, inventory data quality, data validation
---

The planning file passes validation: it records 100 brackets, with every required field complete and a valid positive quantity.

The shelf count finds 80 brackets.

**Data quality means data is fit for the job you need it to do.** In this case, that job is deciding how many brackets to order. A record can pass a format check and still produce the wrong order.

Six common dimensions help separate the checks: completeness, uniqueness, consistency, timeliness, validity and accuracy. They describe different ways data can fail. Combining them into one percentage can hide the failure that changes the decision.

## Start with the decision the number supports

Our fictional planner needs 120 brackets available for Monday's assembly. There are no incoming receipts, reservations or safety-stock requirements in this simplified example. Quantities are in individual brackets.

With 100 usable brackets, the net requirement is 20. With 80, it is 40. That small record changes the proposed order by 20 units.

The [MRP worked example](/notes/material-requirements-planning-example/) explains how this subtraction fits into material requirements planning, including receipt dates and lead times. Here we're checking whether the inputs deserve to enter that calculation.

## What each data quality dimension asks

The [UK government data-quality guidance](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework) sets out these six dimensions and stresses that their importance depends on the use. They are a starting point, rather than a compulsory scorecard for every dataset.

| Dimension | Plain question | Inventory example |
| --- | --- | --- |
| Completeness | Do we have the records and essential values we need? | The bracket record exists, but usable quantity is blank |
| Uniqueness | Is each thing represented once at the intended level? | One location snapshot appears twice after an import |
| Consistency | Do records describing the same thing agree? | ERP shows 100 individual brackets; the warehouse shows eight cases of ten |
| Timeliness | Is the information available and current enough for this decision? | Friday's balance remains on screen after Monday's dispatch |
| Validity | Does the value meet the field's stated rules? | A physical count contains −5, although this field requires a non-negative whole number |
| Accuracy | Does the recorded value match reality? | The screen shows 100; a checked physical count finds 80 |

A blank quantity is unknown, not zero. A repeated item code isn't automatically a duplicate either: two locations can legitimately stock the same item. Define the record first, such as one item, location and snapshot time.

The negative-count rule also belongs to this particular field. Other accounting and inventory fields may legitimately contain signed adjustments. A rule only helps when its meaning is clear.

## Inspect the record and the evidence together

The examples below are separate cases. Switching cases introduces one issue at a time; the calculator doesn't stack all six errors into the same record.

::interactive data-quality-records | Fictional planning check for 120 brackets. Each case changes the available evidence. Unknown or conflicting stock stays unresolved; the tool doesn't invent a quantity to make the calculation work.

In the accuracy case, both 100 and 80 are valid whole numbers. Only the physical check distinguishes them. A stricter spreadsheet formula won't discover the missing brackets.

In the consistency case, converting eight cases of ten gives 80 individual brackets. That exposes a disagreement with ERP's 100. It doesn't prove which source is right. Someone must reconcile the records before approving a purchase based on them.

Timeliness needs a different response. A checked balance of 100 was correct on Friday. If 30 brackets left on Monday and the movement is confirmed, the usable balance becomes 70. Calling Friday's count inaccurate misses the update problem.

## Set rules at the record's actual level

Suppose the warehouse export contains two rows with the same item, location and snapshot time. Each shows 100 brackets. Adding both gives 200, and the planning calculation proposes no order.

If investigation confirms an exact duplicate export row, keeping one gives 100 and restores the 20-unit net requirement. Preserve the original import and the rule used to remove the duplicate so someone can reproduce the answer.

That rule would be wrong for two separate bins with 100 brackets each. It would also be wrong for two stock movements that happen to have the same quantity. Identifying what one row represents comes before deduplication.

Units need the same care. Ten cases and ten individual pieces share a number, but they aren't interchangeable. Keep the original unit and the conversion rule instead of quietly relabelling both as quantity.

Vrolen's [manufacturing data analytics guide](https://vrolen.com/blog/manufacturing-data-analytics/) extends this to machine, order and quality records. Their identities, units and timestamps need to agree before the combined data can explain an operating problem.

## Keep the quality check beside the result

A useful planning screen can say “40 brackets needed, based on a verified count at 08:00.” It can also say “quantity unresolved: warehouse and ERP disagree.” Those messages support different actions.

If both become a green “data quality: 95%” badge, the planner loses the distinction.

For this case, keep the source, item and location, unit, effective time, import time and unresolved checks beside the number. The time the file arrived isn't necessarily the time the stock was counted.

Choose limits around the decision. A daily balance might serve a weekly planning review. A stock promise made while goods are being picked may need more recent movements. There is no universal refresh interval that makes both safe to use.

The [stockout forecasting example](/notes/demand-forecasting-stockouts/) shows another limit: perfectly recorded sales can still be the wrong input for unconstrained demand. Data can be accurate for what it records and unsuitable for what you ask it to represent.

## Repair the source of the recurring error

Correcting 100 to 80 fixes today's record. Find out how it became 100 before treating the problem as solved.

Was a movement missed? Did a unit conversion change? Did two files arrive? Did the count include damaged stock that isn't available for assembly? Each explanation needs different evidence and a different fix.

Assign the check to someone who can resolve it. A data engineer can repair a duplicate import; the warehouse may need to verify usable stock; Finance or the master-data owner may need to approve a conversion rule.

The [5 Whys example](/notes/5-whys-example/) is useful once the recurring failure is specific enough to investigate. Keep the corrected record, test the explanation and check whether the same issue returns in the next planning cycle.

Start with the fields that can change the order. Make those checks visible, and allow an unresolved result when the evidence isn't there. The planner needs a trustworthy quantity or a clear reason to investigate it.

## Sources

- UK Government. [Government guidance on data quality](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework), sections on dimensions and user needs. Definitions, the distinction between completeness and accuracy, and context-dependent trade-offs.

All stock records, movements, counts and purchasing calculations are fictional. The simplified net requirement excludes receipts, reservations, safety stock, lead times and order multiples. A data check doesn't replace the physical or operational evidence needed to resolve a discrepancy.
