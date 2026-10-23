---
title: First-pass yield vs final yield: the work behind 100% accepted
date: 2026-10-14
updated: 2026-10-23
summary: All 100 units pass eventually. Some need repeated correction. Follow their first attempts to see what first-pass yield measures and why station averages miss the story.
seoTitle: First-pass yield vs final yield: a worked example
seoDescription: Calculate first-pass and final yield from the same units. Explore repeated rework, station yields and why multiplying rates may not match the unit history.
status: published
topic: Operational excellence
keywords: first pass yield formula, first pass yield vs final yield, FPY calculation, rolled throughput yield, rework yield
---

The line accepts all 100 units. The shipment report shows 100% final yield. Meanwhile, operators have been correcting parts and putting them through tests again.

The accepted count is right. It leaves out how the units got there.

**First-pass yield (FPY) is the share of incoming units that meet the requirements without another attempt or correction. Final yield is the share eventually accepted, including successfully repaired units.** Both need a defined process boundary and the same group of units.

[ASQ's glossary](https://asq.org/quality-resources/quality-glossary/f) excludes scrap, repeat runs, retests and offline repair from first-pass good output. A later pass can recover a unit for the customer. It can't change the unit's first attempt.

## Start with one completed group

Our fictional line processes 100 identified units through assembly, testing and packing. Every unit visits all three stations. A failed first attempt leads to one correction and a successful repeat at that station before the unit continues.

No unit is scrapped, replaced or left unresolved. By the end, all 100 meet the requirements. We can therefore calculate final yield without guessing what happened to work still in progress.

At each station, ten units fail their first attempt. Each station reports 90 first-pass good units out of 100, or 90% FPY.

| Measure | What counts as good | Denominator in this example |
| --- | --- | --- |
| Station FPY | Passed that station without correction or a repeat | 100 unique units entering that station |
| Whole-line FPY | Passed all three stations first time | 100 unique units entering the line |
| Final yield | Eventually accepted after all required work | The same 100 incoming units |

The station counts haven't yet told us how many units passed the entire line first time. To find that number, we need to know which units failed where.

## The same station yields can hide different histories

In the first history, units 1–10 fail at all three stations. Each gets corrected three times. Units 11–100 pass every first attempt.

In the second history, units 1–10 fail at assembly, 11–20 at testing and 21–30 at packing. Each affected unit needs one correction. Units 31–100 pass all three first attempts.

| History | FPY at each station | Whole-line FPY | Final yield |
| --- | ---: | ---: | ---: |
| Same ten units fail at every station | 90% | 90% | 100% |
| Different ten fail at each station | 90% | 70% | 100% |

::interactive yield-unit-history | Two fictional histories of the same-size completed cohort: 100 unique units and three stations. Each station has ten first-attempt failures; every failed attempt receives one successful correction. There is no scrap or pending work. Each square is one unit, not one visit or defect. Hover over a square or use the unit selector to inspect its history.

Both histories contain 30 failed station attempts and 30 corrections. One affects ten units repeatedly; the other affects 30 units once each. Those are different patterns to investigate, even though the correction count is the same.

We haven't assigned times to those corrections. The counts alone don't establish equal labour, cost or delay. A repeated failure on one unit could need very different work from a label correction on another.

## Calculate first-pass and final yield separately

For the second history, 70 units clear the line without correction and another 30 become acceptable after it.

:::formula Same 100 units, two results
Whole-line FPY: 70 ÷ 100 × 100 = 70%
Final yield: (70 + 30) ÷ 100 × 100 = 100%
Units needing at least one correction: 30 ÷ 100 × 100 = 30%
:::

A repair visit doesn't create another incoming physical unit. Keep the unit identity and add an event to its history. Otherwise the denominator starts measuring visits while the output count still measures units.

The [ERP, MES and SCADA example](/notes/erp-mes-scada/) follows a related distinction between processed and accepted output. Here, even accepted output needs a first-attempt record if the aim is to understand rework.

## Where rolled throughput yield fits

You may see **rolled throughput yield (RTY)** calculated by multiplying step yields. Our three station rates give 0.90 × 0.90 × 0.90 = 72.9%.

That is a useful projection when the rates and assumptions describe the intended route. With independent first-attempt outcomes at these rates, it is the modelled chance of clearing all three stations.

It isn't the measured whole-line FPY of either history above. Each station's rate includes all 100 units, including units already corrected elsewhere. The percentages don't tell us whether the same units fail again.

In our constructed histories, failures are deliberately concentrated on the same ten units or separated into three groups. The actual untouched counts are 90 and 70. The product stays at 72.9% because its inputs haven't changed.

The [public abstract of ASQ's RTY paper](https://asq.org/quality-resources/articles/six-sigma-rolled-throughput-yield?id=2be8d7ffb4eb4ccda87c777ffac4e478) also warns that multiplied yields are not always a literal proportion of units, depending on the process and definition. Keep a modelled product separate from a count obtained by following actual units.

If you have linked unit records, calculate the share that cleared the full boundary first time. If you have only station percentages, state the multiplication method and assumptions rather than presenting the result as an observed count.

## Use the pattern to choose the investigation

In the repeated-failure history, start by tracing those ten units. Check whether an assembly condition carries into testing and packing, whether the same material lot is involved or whether the records repeat an earlier failure incorrectly.

In the separate-group history, look at the local events at each station as well as anything the three groups share. The grid identifies a pattern; it doesn't prove its cause. The [5 Whys example](/notes/5-whys-example/) shows how to test an explanation against the event sequence.

Keep final yield alongside FPY so successfully recovered output remains visible. Add correction visits, scrap, unresolved units and elapsed time where those affect the decision. The [OEE note](/notes/same-oee-opposite-fixes/) connects first-pass quality losses to the work a team might change.

For a single-stage example with repair and scrap, see [Vrolen's first-pass yield guide](https://vrolen.com/blog/first-pass-yield-rework/). Its 1,000-unit ledger is separate from the three-station histories here.

At the next quality review, trace a completed group from first entry through acceptance, repair or scrap. Report how many passed first time and how many needed recovery. Investigate the repeated failures using those unit histories.

## Sources and example notes

- [ASQ: Quality Glossary, First Pass Yield](https://asq.org/quality-resources/quality-glossary/f), definition and exclusions.
- [Spencer Graves: Six Sigma Rolled Throughput Yield](https://asq.org/quality-resources/articles/six-sigma-rolled-throughput-yield?id=2be8d7ffb4eb4ccda87c777ffac4e478), *Quality Engineering*, 2001. The publicly available abstract was reviewed; the full paper is gated. It discusses product-based yields and limits to interpreting them as unit proportions.

The unit histories are fictional. All first-attempt failures receive one successful correction at their station, and all units complete the line. The 72.9% product is an independent-outcome projection, not an inference about either history. No rework time, causal effect or financial saving is estimated.
