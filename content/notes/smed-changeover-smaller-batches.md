---
title: SMED example: faster changeovers, smaller batches
date: 2026-10-03
summary: A changeover falls from 45 to 15 minutes. Use a worked schedule to decide whether the gain should become more output or smaller batches. Includes an Excel comparison sheet.
status: published
topic: Operational excellence
keywords: SMED example, changeover time reduction, SMED internal and external activities, SMED Excel template, changeover reduction batch size
---

The team cuts a changeover from 45 minutes to 15. The before-and-after chart looks good. The production plan stays exactly the same: three days of one product cycle before the next cycle begins.

The setup is faster. Customers still wait for the next run of the product they need.

That leaves a planning decision. Should the recovered time make more units, or let the cell make each product more often? A useful SMED project follows that question beyond the stopwatch.

## Measure the changeover people actually experience

SMED means Single-Minute Exchange of Die. The name refers to a goal of single-digit minutes, rather than a requirement that every setup must take one minute. [Vorne's guide](https://www.leanproduction.com/smed/) explains the distinction between internal work, which needs stopped equipment, and external work, which can happen while it runs.

For the fictional cell in this example, measure from the last accepted unit at the established running rate to the first accepted unit at the new product's established rate. Include the restart and validation inside that boundary.

Stopping the clock when the tooling is fitted would miss the adjustments and trial rejects that production still has to deal with. Keep the boundary consistent when comparing runs.

Observe several ordinary changeovers of the same type. Record the sequence, waiting, people involved and result. A well-prepared demonstration tells you what is possible. It does not tell you what every shift can sustain.

## Move preparation, then shorten the stopped work

Our fictional observation contains five tasks performed in sequence after the machine stops:

| Task | Current stopped time | Proposed stopped time | Proposed change |
| --- | ---: | ---: | --- |
| Gather and stage the next kit | 10 min | 0 min | Prepare the kit before the stop |
| Remove the current tooling | 8 min | 5 min | Use an approved locating and fastening arrangement |
| Fit the next tooling | 12 min | 5 min | Use the same arrangement with a prepared kit |
| Adjust the settings | 10 min | 2 min | Use checked product settings and repeatable locations |
| Restart and validate | 5 min | 3 min | Prepare the checks and reduce adjustment trials |
| Total | 45 min | 15 min | Proposed sequence, subject to validation |

The ten minutes of staging have moved. They have not disappeared. Someone still needs to do them, with space, material and time available before the stop.

The other reductions need a trial. The example assumes engineering confirms the tooling changes and quality confirms the same acceptance standard. The shorter validation time comes from preparation and fewer adjustment trials, without removing a required check.

::figure smed-stopped-time | Fictional proposal. Staging becomes ten minutes of external preparation; the remaining sequence totals 15 stopped minutes. These are target durations, not a reported result.

If two people work simultaneously, record their elapsed tasks and labour effort separately. Adding both task durations can overstate machine downtime. Watching only downtime can hide extra labour.

That distinction matters when someone turns the reduction into a cost claim. A 30-minute shorter stop does not automatically remove 30 minutes of paid work.

## Put the change into a repeated schedule

Now give planning something concrete to work with. The cell makes four products, A to D. Each needs 100 units per working day, and each unit takes one minute to run. There are 480 available minutes a day after breaks.

The simplified example assumes stable demand, accepted output at that rate, available material and equal setup times between products. It excludes other downtime and scrap. Real planning needs those allowances.

Today, the cell repeats the product cycle every three working days. Each run makes 300 units of a product, enough to cover three days of its demand.

Count all four changes in a repeated cycle, including the change from D back to A. Leaving out that return makes the schedule look easier than it is.

:::formula Current three-day cycle
Run time: 4 products × 300 units × 1 min = 1,200 min
Changeovers: 4 × 45 min = 180 min
Total: 1,380 min across 3 days = **460 min per day**
Available: 3 × 480 min = 1,440 min
:::

It fits, with 60 minutes spare across the three days. That allowance is small enough to deserve attention before treating the schedule as a delivery promise.

After the proposed change, a daily cycle can make 100 of each product:

:::formula Proposed daily cycle
Run time: 4 products × 100 units × 1 min = 400 min
Changeovers: 4 × 15 min = 60 min
Total: **460 min per day**
Available: 480 min per day
:::

Same daily output. Same average time used. Each product now appears every working day rather than once every three.

::figure smed-repeat-cycle | Fictional repeated schedules. Across three days, both make 1,200 units and use 180 setup minutes. Faster changes allow twelve smaller runs in place of four larger runs.

## Decide what the recovered time is for

Keep the three-day cycle after SMED and its setup time falls from 180 to 60 minutes. That releases 120 minutes over three days, before any new losses. The team could use those minutes for additional output, if demand and the rest of the operation can support it.

Choose the daily cycle instead and the cell makes twelve changes over the same three days. Twelve times 15 is still 180 minutes. The recovered time has paid for more frequent replenishment.

You cannot spend it twice.

| Decision | Three-day cycle after SMED | Daily cycle after SMED |
| --- | ---: | ---: |
| Batch per product | 300 units | 100 units |
| Changes over three days | 4 | 12 |
| Setup time over three days | 60 min | 180 min |
| Total time for the stated demand | 1,260 min | 1,380 min |
| Main option created | More spare capacity | More frequent product availability |

A smaller batch does not guarantee a shorter customer lead time. Orders may still wait for material, another process or dispatch. It does change how often planning can replenish each product, which is a useful condition to test.

The question is which option addresses the current problem. If orders are late because the cell cannot make enough, protect capacity. If the cell makes enough overall but the wrong products sit in stock, a shorter repeat cycle deserves a trial.

## Check the schedule before calling it standard

The daily example has only 20 spare minutes. A setup averaging 20 minutes would use the entire 480-minute day: 400 running minutes plus four 20-minute changes. Longer setups would exceed it, even before a breakdown.

Use the observed range, product sequence and restart losses to test the plan. An average can hide the one change that makes the final order late.

Check the external preparation as well. More frequent changes mean more kits to prepare and more opportunities to miss one. Confirm who prepares them, where they go, and how the next kit is checked before the current run ends.

Then review product availability, accepted output, rejected units and operator effort across normal shifts. A shorter stopped time is useful only if the operation can repeat the new method and use it for the intended result.

:::link /notes/smed-changeover-smaller-batches/changeover-schedule.xlsx | Download the changeover and schedule sheet
Separate stopped work from preparation, compare repeat cycles, and check whether the proposed daily load exceeds available time. Includes a fictional example and blank inputs.
:::

:::link /notes/same-oee-opposite-fixes/ | Choose the loss before choosing the project
Translate OEE into the minutes underneath it, then check whether changeovers are the right loss to work on.
:::

Take the new setup time back to the planning table. The useful result is the production decision it now makes possible.

## Sources

- Vorne. [SMED: Single-Minute Exchange of Die](https://www.leanproduction.com/smed/). Internal and external work, measurement boundaries and setup reduction.
- Lean Enterprise Institute. [Value stream mapping](https://www.lean.org/lexicon-terms/value-stream-mapping/). Product mix, flow and the relationship between batch production and replenishment.

The cell, task timings, demand and schedules are fictional. Proposed timings need validation. The arithmetic excludes other production losses and does not establish a cash saving or an achievable customer lead time.
