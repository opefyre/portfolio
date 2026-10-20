---
title: Spaghetti diagram: how to draw one, with a worked example
date: 2026-10-20
summary: A packing task sends someone back and forth across the room. Draw the actual route, total its distance and test a different layout without hiding the trips.
seoTitle: Spaghetti diagram: how to draw one, with an example
seoDescription: Draw a spaghetti diagram on a floor plan, follow one packing task and calculate travel distance. Compare layouts while checking access, reach and replenishment.
status: published
topic: Operational excellence
keywords: spaghetti diagram example, how to draw spaghetti diagram, spaghetti map, Lean movement diagram
---

The packing task takes only a few minutes at the bench. Between those minutes, the operator walks to the parts rack, returns for a label, then crosses the room to collect a printout.

The work instruction lists the tasks. It does not show where they send the person.

**A spaghetti diagram traces movement on a physical layout.** Follow a person, item or document and draw its actual route, including repeated journeys. [AHRQ's workflow-diagram guide](https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/workflow-diagram) describes this use of a floor plan and movement lines.

It answers a different question from a [value stream map](/notes/value-stream-mapping-example/), which follows work, information and waiting across a wider process.

## Choose one thing to follow

Our fictional example follows the operator packing one standard kit. Start when the operator leaves the bench to collect its parts. Finish when the kit is ready for the final check. Replenishment of the station is outside this first observation.

Draw the bench, storage, printer and usable aisles to scale. Then watch the work. Record each journey in sequence rather than drawing the route someone thinks should happen.

For a repeat visit, draw another line or record another trip against the same segment. One neat line can conceal ten journeys.

## Calculate distance from the observed route

In this example, the operator collects parts, labels and a printout separately, returning to the bench after each trip. Distances follow the usable walking route, not a diagonal through the equipment.

| Journey | One-way distance | Trips | Total distance |
| --- | ---: | ---: | ---: |
| Bench to parts rack and back | 8 m | 2 | 16 m |
| Bench to label store and back | 14 m | 2 | 28 m |
| Bench to printer and back | 6 m | 2 | 12 m |
| **Total per observed kit** | | **6** | **56 m** |

::figure paa3-spaghetti-route | Fictional, scaled route diagrams. Each route is travelled out and back, with both directions counted in the totals. Paths follow the shown horizontal and vertical routes. The proposed positions reduce this operator's travel from 56 m to 16 m per kit, before checking replenishment or other users.

The diagram makes the label journey stand out. It still does not prove that the label store should move. Other users, stock controls or a safety requirement may explain its location.

## Test the layout, including the work it moves elsewhere

Suppose a proposed point-of-use arrangement puts parts 2 m away, labels 4 m away along the aisle, and the printer 2 m away. With the same six trips, the distance is 4 + 8 + 4 = **16 m per kit**.

That is 40 m less travel, or 71.4% for this route. It is a calculated proposal, not a measured increase in packing output.

Before adopting it, check reach, safe access, emergency routes, label version control and whether the printer can work there. Include the materials runner's extra refill trips in a wider observation. The operator may walk less because someone else now walks more.

[5S](/notes/5s-methodology-example/) helps establish homes, identities and refill rules once the arrangement is suitable. A nearby tray of obsolete labels would make the route shorter and the process worse.

## Drawing a spaghetti diagram in Excel or on paper

A printed floor plan and a pen are enough to begin. In Excel, use a scaled background or grid, place the work locations and draw numbered line segments over them. Keep a separate list of segment lengths and repeat counts so the total can be checked.

The software is less important than the observation. Record detours and interruptions; do not tidy them out to make the chart attractive. If routes vary substantially by product or shift, show separate observations before averaging them.

In Lean or Six Sigma work, the diagram can provide evidence for a layout change. A multi-line statistical plot, sometimes also called a spaghetti plot, serves a different purpose. This article concerns physical movement.

Trial the proposed route with the people doing the work. Compare distance, task time, errors and the effect on other users under comparable conditions. Keep the layout that supports the whole task, even if it leaves a longer line on the page.

:::link https://www.youtube.com/watch?v=VgeTYssQsnA | Watch Vrolen's 5S explanation
A separate packing-station example shows how tool locations, labels and refill rules support the work. It does not demonstrate the distance reduction calculated here.
:::

## Source and example notes

- [AHRQ: Workflow diagram](https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/workflow-diagram). Following movement, drawing repeated trips and reviewing the layout.

The task, distances and proposed arrangement are fictional. The figure uses the stated route geometry; it is not a workstation specification. No walking speed, labour saving or output increase is assumed.
