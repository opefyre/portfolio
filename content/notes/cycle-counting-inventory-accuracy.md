---
title: Cycle counting: the total is right, the bins are wrong
date: 2026-10-14
summary: The stock report and physical count both show 180 pieces. Two bins still disagree. A worked cycle count shows how to measure record accuracy and investigate the difference.
seoTitle: Cycle counting and inventory accuracy: an example
seoDescription: Learn how cycle counting works, calculate inventory record accuracy, and see why a matching stock total can hide errors between bins in a worked example.
status: published
topic: Supply chain
keywords: cycle counting, inventory record accuracy, cycle count example, cycle counting vs physical inventory, inventory accuracy formula
---

The warehouse report shows 180 pieces. The physical count finds 180. At the next pick, someone walks to a bin that contains fewer pieces than the screen promised.

The total was correct. The location records weren't.

**Cycle counting means checking selected inventory repeatedly through the year**, rather than leaving every check to one full stocktake. Count the stock, compare it with the records, then resolve the differences. [Oracle's cycle-count guidance](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26a/famml/cycle-count-criteria.html) describes this periodic approach and using item classes to set different counting frequencies.

A count can correct today's balance. It can also reveal how the record became unreliable, if we keep enough detail to investigate it.

## Count at the level people use

Our fictional warehouse holds one bracket item across five bins. At 09:00 on 14 October 2026, the team compares the system balance with a checked physical count for that same moment. Everything is measured in individual pieces. There are no held or reserved quantities in this example.

| Bin | System pieces before review | Counted pieces | Count minus system |
| --- | ---: | ---: | ---: |
| A | 100 | 100 | 0 |
| B | 50 | 45 | −5 |
| C | 20 | 25 | +5 |
| D | 10 | 10 | 0 |
| E | 0 | 0 | 0 |
| Total | 180 | 180 | 0 |

Bin E was actually checked and found empty. Its zero is evidence, not a blank cell filled in to finish the sheet.

B is five short against its record. C has five more. Adding the differences gives zero, but it doesn't make either record right. A picker asking for 50 pieces from B still has a problem.

That is why inventory accuracy needs a stated record level. Here it is one item in one bin at one time. A warehouse-wide total answers a different question.

## Calculate record accuracy before making adjustments

For this count, a record matches only when its quantity agrees exactly. Three of five records match: A, D and E.

:::formula Exact-match accuracy for these five records
Matching item-bin records ÷ checked item-bin records × 100
3 ÷ 5 × 100 = 60%
:::

This is a result for the five records we checked. They aren't a random sample that lets us estimate the whole warehouse's accuracy.

Some businesses use quantity or value tolerances. If you do, show the rule alongside the percentage. A result based on “within five pieces” won't mean the same thing as our exact-match result. Keep the underlying differences available too, particularly where a small discrepancy can stop a pick.

The [data quality note](/notes/data-quality-dimensions/) explains why a valid-looking quantity can still be inaccurate. Cycle counting supplies the physical evidence that a file check cannot.

## Reconcile the difference without erasing it

The equal and opposite differences suggest a possible missed transfer. They don't prove one. The team should also check the count, item identity, units and movements around the cutoff.

In the next part of our fictional example, a recount and transfer record T17 confirm that five pieces moved from B to C before 09:00. The movement wasn't posted. An authorised posting brings B to 45 and C to 25. The physical stock hasn't changed.

::interactive cycle-count-ledger | Fictional count of one item in five bins at 09:00 on 14 October 2026. All quantities are pieces. The second view includes a confirmed, authorised posting of transfer T17, five pieces from B to C before the cutoff. Both stages remain in the table. A matching total alone is not evidence of that transfer.

After reconciliation, all five balances match this count. Keep the original 60% finding in the count history. Replacing it with 100% would hide the errors the count discovered and make repeated misses hard to track.

[Microsoft's cycle-count workflow](https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/cycle-counting) separates counting from reviewing differences. Its warehouse implementation also allows open count work while stock remains available for outbound processing. Creating a count task doesn't necessarily freeze movements; check how your own process handles them.

Choose a common cutoff. Either control movements during the count or reconcile them so the system and physical quantities refer to the same time. Comparing a morning balance with an afternoon shelf count can create a discrepancy that is only a timing difference.

## Choose the next count around the risk

A full physical inventory covers a defined scope at one point in time. Cycle counting spreads selected checks across a schedule. Whether it can replace a required full stocktake depends on the requirements and controls that apply to your business.

[ABC/XYZ analysis](/notes/abc-xyz-inventory-analysis/) can help you distinguish high-value stock from demand variability. For counting, also consider movement frequency, repeated discrepancies and the consequence of a wrong balance. A cheap spare can still stop production.

Set a manageable schedule, with someone responsible for reviewing exceptions. Counting more locations while unresolved differences accumulate gives you more findings and the same unreliable records.

For bins B and C, the next action is to investigate why T17 wasn't posted. Was the scan missed? Was the transaction rejected? Did the transfer reach the wrong location? Each answer needs its own evidence. The [5 Whys example](/notes/5-whys-example/) shows how to work from a specific failure to a cause worth testing.

Keep three things from each count: the original discrepancy, the approved correction and the follow-up. On the next count, check whether the same failure returns. That gives the counting effort a purpose beyond repeatedly editing the balance.

## Sources

- Oracle. [Cycle Count Criteria](https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26a/famml/cycle-count-criteria.html). Periodic counting and class-based selection.
- Microsoft Learn. [Cycle counting](https://learn.microsoft.com/en-us/dynamics365/supply-chain/warehousing/cycle-counting). Count, review and adjustment workflow; movement behaviour in its warehouse implementation.

The bins, quantities, transfer and investigation are fictional. The 60% result uses exact matches in five selected item-bin records, including one verified empty bin. It is not a warehouse-wide estimate or a claim of financial loss.
