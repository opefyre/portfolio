---
title: Standard work vs SOP: a packing-station example
date: 2026-10-14
summary: The procedure is approved, but each shift packs differently. Use one work cycle to see what sequence, timing and in-process stock add to the instructions.
seoTitle: Standard work vs SOP: a practical comparison
seoDescription: Compare standard work, SOPs and work instructions through a packing example. Explore takt time, overlapping machine work and the stock needed at the station.
status: published
topic: Operational excellence
keywords: standard work vs SOP, standardized work example, standard work instructions, work combination chart, takt time vs cycle time
---

The packing procedure says to prepare the carton, seal it, check it and apply the label. Everyone has been trained. Yet one shift prepares the next carton while the sealer runs, and another waits until the finished carton has left the station.

Both can follow those instructions. They still have different working methods.

An **SOP**, or standard operating procedure, is a written set of instructions for recurring work. **Production standardized work** makes the work sequence, the required production pace and the stock needed within the process explicit. It gives the team a method they can observe, teach and improve.

A document called “SOP” can include all of that. The name on the cover doesn't settle whether the working method is clear.

## What each document helps you do

For this packing station, the contents would look like this.

| What we need | What it contains here | Packing example |
| --- | --- | --- |
| SOP | The procedure, checks and response to a problem | Check the seal and label; separate a carton that fails inspection |
| Standardized work | Sequence, timing against demand, and required in-process stock | Prepare the next carton while the sealer runs; show where the two cartons belong |
| Training instruction | The detail someone needs to learn each task | How to recognise an unacceptable seal and why the check matters |

The [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/standardized-work/) distinguishes production standardized work from related quality and training documents. Its three elements are takt time, work sequence and standard in-process inventory.

The [EPA's SOP-writing guidance](https://www.epa.gov/sites/default/files/2015-06/documents/g6-final.pdf#page=6) describes written instructions for recurring activities and stresses making the current procedure available where the work happens.

Let's put the timing and stock beside the packing instructions.

## One packing cycle, with the overlap visible

Take a fictional station with 420 minutes of available production time per day, after planned breaks. It needs to pack 420 cartons that day.

**Takt time is available production time divided by customer demand.** Here, 420 × 60 ÷ 420 = 60 seconds per carton. That's the required pace, not a measured cycle time.

Our proposed working method repeats every 48 seconds. The operator loads a prepared carton, then prepares the next one while the guarded sealer runs automatically.

| Work element | Time | Where it falls in the cycle |
| --- | ---: | --- |
| Load the prepared carton | 5 s | 0–5 s |
| Automatic sealing | 20 s | 5–25 s, overlapping other work |
| Prepare the next carton | 12 s | 5–17 s |
| Walk back to the sealer | 6 s | 17–23 s |
| Wait for sealing to finish | 2 s | 23–25 s |
| Unload and check the seal | 8 s | 25–33 s |
| Apply and verify the label | 10 s | 33–43 s |
| Move the finished carton | 5 s | 43–48 s |

The operator has 40 seconds of manual work, six seconds of walking and two seconds of waiting. The machine's 20 seconds overlap that sequence, so adding them again would overstate the cycle.

::interactive standard-work-cycle | Fictional steady-state cycle for one operator and one automatic sealer. The method starts with a prepared carton available. Preparation takes place outside the guarded machine area. Times describe this example, not an observed factory or a validated workstation design.

This is a simplified **work combination chart**: it puts manual work, walking and automatic processing on the same time axis. The overlap explains why a list of task durations can mislead you.

## Less walking doesn't always shorten the cycle

Try reducing the walk from six seconds to three. The operator gets back at second 20, but sealing still finishes at second 25. Waiting grows from two seconds to five. The cycle remains 48 seconds.

With a 14-second walk, the operator returns at second 31. Now the machine is waiting for the operator, and the cycle grows to 54 seconds.

Moving materials closer may still be worthwhile. In this example, though, you can't claim a three-second cycle reduction just because you removed three seconds of walking.

The demand setting raises a different question. At 560 cartons per day, takt becomes 45 seconds. Our 48-second cycle no longer fits that pace, even though the instructions haven't changed.

That needs a review of the work, equipment and available capacity. Changing the number on the target board doesn't make the sequence faster. Check variation and interruptions too; a nominal cycle below takt isn't a promise that the whole day will meet demand.

## Show the stock that makes the sequence possible

The method also relies on having the next carton ready. At its busiest point, this small process has two cartons in progress: one in the sealer and one being prepared or waiting for the next load.

::figure standard-work-stock | Fictional station arrangement. Two cartons are the maximum in-process quantity in this sequence, excluding incoming supplies and the finished-carton area. This quantity follows from the proposed method; it is not a general recommendation for packing stations.

If one shift keeps five prepared cartons nearby and another starts with none, the work has changed again. Show the locations and quantities so the team can see a shortage, excess or missing preparation before blaming someone's speed.

Safety, quality and the actual layout still govern what work can overlap. Check those conditions when developing the sequence.

## Test the method, then keep it current

Build the sequence with the people doing the work. Observe representative cycles, including how they handle replenishment, defects and interruptions. Check that the method can be followed across shifts before calling it the standard.

Keep the sequence, key checks, stock locations and current revision together at the station. Use the training instructions to explain how and why. When a trial supports a better method, update the standard and check what happens afterwards.

The [Control stage of DMAIC](/notes/dmaic-step-by-step/) covers that handover. [Did the improvement hold?](/notes/did-it-hold/) follows the question beyond the launch date.

The same idea carries into software through shared conventions and a definition of done, as I described in [Three factory habits I use in software](/notes/factory-floor-software/). A repetitive production timing chart won't fit every kind of work. A clear, testable working method still helps people see where they differ.

For the wider connection to flow and pull, see [Vrolen's Lean manufacturing guide](https://vrolen.com/blog/lean-manufacturing/).

## Sources and example notes

- [Lean Enterprise Institute: Standardized Work](https://www.lean.org/lexicon-terms/standardized-work/). The three elements, combination chart and related training forms.
- [Lean Enterprise Institute: Takt Time](https://www.lean.org/lexicon-terms/takt-time/). Available production time divided by customer demand.
- [EPA: Guidance for Preparing Standard Operating Procedures](https://www.epa.gov/sites/default/files/2015-06/documents/g6-final.pdf), 2007, sections 1 and 2. Definition, preparation and review of SOPs.

All quantities, timings and station conditions are fictional. The model assumes one product, one operator, no defects or unplanned stops, and a repeatable automatic sealing time. The chart calculates the proposed sequence; an actual workplace needs direct observation and an approved method.
