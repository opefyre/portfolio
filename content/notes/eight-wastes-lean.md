---
title: The eight wastes of Lean, explained through one order
date: 2026-10-14
summary: An order needs 60 cartons. The team packs 90, walks for labels and corrects errors. Follow the work to see the eight wastes and choose what to change first.
seoTitle: Eight wastes of Lean: definitions and examples
seoDescription: Learn the eight wastes of Lean through one warehouse order. Compare motion with transport, see how wastes overlap, and choose a change worth testing.
status: published
topic: Operational excellence
keywords: eight wastes of lean, 8 wastes examples, DOWNTIME lean, motion vs transportation, overproduction vs inventory
---

A customer orders 60 cartons. The packing team prepares 90 because the machine is already set up. An operator walks away to collect labels. Six of the ordered cartons need relabelling, and dispatch waits for missing release information.

Everyone has been busy. The order still leaves later than it needed to.

**The eight wastes of Lean are categories of work, stock and delay that consume resources without adding customer value.** They help a team notice where effort goes, then investigate why. Several categories can describe the same problem, so keep that overlap in mind when assessing the loss.

The familiar acronym **DOWNTIME** stands for Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion and Extra-processing. [ASQ lists these eight categories](https://asq.org/quality-resources/lean). The original seven, described by the [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/seven-wastes/), don't include the later addition of unused talent.

Let's follow that order. The warehouse and every quantity below are fictional.

## The eight wastes, with examples from the same order

The customer needs 60 cartons for this dispatch. There is no approved requirement for the extra 30. That matters: stock held for a justified future need would require a different assessment.

| Waste | Plain meaning | What happens to this order |
| --- | --- | --- |
| Defects | Output needs correction or replacement | Six of the 60 ordered cartons receive the wrong label and need relabelling |
| Overproduction | Making more, or earlier, than needed | The team packs 90 cartons against the confirmed need for 60 |
| Waiting | Work cannot proceed when it needs to | The shipment waits 20 minutes for missing release information |
| Non-utilized talent | People's knowledge and ability go unused | A packer suggests moving the printer, but nobody reviews the idea |
| Transportation | Unnecessary movement of material or product | Cartons travel 40 metres through a holding area whose purpose is unclear |
| Inventory | Stock beyond what the process needs | The 30 extra cartons remain in the holding area |
| Motion | Unnecessary movement by people | The operator walks 12 metres to fetch labels |
| Extra-processing | Work beyond what the requirement needs | Someone retypes all 60 tracking references into a spreadsheet with no confirmed purpose |

These observations have different units. Don't add 20 minutes, 40 metres and 30 cartons into a waste score. Keep them attached to the work and the consequence you want to change.

## Motion vs transportation: follow who or what moves

An operator walking to a printer is motion. Cartons travelling to another area are transportation. A trolley trip can involve both, but counting the categories doesn't tell you whether the trip is unnecessary.

Perhaps the holding area separates unchecked shipments from released ones. Moving everything directly to dispatch could remove an important quality boundary. Find out what the route protects before shortening it.

The order view below connects each observation to the place where it happens. Select a waste to inspect the next question; all eight definitions remain visible in the table above.

::interactive lean-waste-order | Fictional order for 60 cartons. Distances and delays are illustrative observations, not measured business results. Highlighted stages locate the observation; they do not identify a proven cause or calculate savings. The unused suggestion concerns the label station and the way ideas are reviewed.

The 12-metre walk gives the team a specific layout question. Could the printer move closer while preserving safe access, the correct labels and the operator's working space? The answer needs a trial at the station, not a rule that every movement is bad.

[Standard work](/notes/standard-work-vs-sop/) adds the sequence and timing needed to judge whether a shorter walk changes the work cycle. A movement can become easier without making the whole order finish sooner.

## Overproduction creates inventory, but count the cartons once

Packing 90 instead of 60 creates 30 extra cartons. Overproduction describes the decision to make them. Inventory describes the stock left afterwards.

They are connected views of the same 30 cartons. Reporting “30 cartons of overproduction plus 30 cartons of inventory” as 60 cartons saved would double the quantity.

The consequences may still differ. Packing the extras uses capacity now; storing them takes space and may expose them to damage or a later label change. Measure those consequences separately if they affect the decision. Don't invent a disposal cost when the cartons may still be used.

Ask why making the extra batch seemed sensible. Was the team trying to avoid a long setup? Was its target based on machine output? Was the next order uncertain? Each explanation points to different work.

[SMED and smaller batches](/notes/smed-changeover-smaller-batches/) explore the setup problem. A [Kanban replenishment rule](/notes/kanban-pull-system/) can make permission to produce clearer where a suitable repeatable loop exists. Neither follows automatically from spotting a pile of cartons.

## A waste label doesn't explain the cause

The six wrong labels are a defect observation. “Be more careful” leaves the team with the same station, files and choices.

Check which label was selected, how the order reached the printer and whether old rolls or versions were available. The [5 Whys example](/notes/5-whys-example/) shows how to connect an explanation to evidence from the actual event.

The same discipline applies to the spreadsheet. Confirm who uses it and what obligation it serves before removing it. If nobody needs the copy, stop the duplicate entry. If Finance relies on it because another record is incomplete, repair that gap before deleting the workaround.

Some non-value-creating work cannot be removed immediately. The [Lean Enterprise Institute distinguishes those cases](https://www.lean.org/lexicon-terms/muda-mura-muri/) from waste that can be eliminated now. Inspection or a protective buffer may need to remain while the underlying process is improved.

## Start with one observed problem

For this order, suppose the team chooses the label station. It has a clear problem, a suggestion from the packer and a small change it can test.

Record the current walk, label errors and interruptions across representative orders. Trial the agreed printer location and current-label storage with the people who use them. The [5S station example](/notes/5s-methodology-example/) shows how to make tool locations and label identity clearer. Check whether the walk falls, whether errors change and whether replenishment becomes harder.

Use [PDCA](/notes/pdca-cycle-example/) to compare the result with that prediction. If the arrangement works, update the working method and ownership. If it creates another problem, revise it before spreading it.

[Vrolen's eight-wastes guide](https://vrolen.com/blog/eight-wastes-lean-manufacturing/) gives a wider view of selecting improvements around flow. For this warehouse, the immediate task is narrower: make one order easier to complete correctly, then check that the change helped.

## Sources and example notes

- [ASQ: What is Lean?](https://asq.org/quality-resources/lean), eight wastes and DOWNTIME.
- [Lean Enterprise Institute: Seven Wastes](https://www.lean.org/lexicon-terms/seven-wastes/), original categories and definitions.
- [Lean Enterprise Institute: Muda, Mura, Muri](https://www.lean.org/lexicon-terms/muda-mura-muri/), including work that cannot immediately be eliminated.

The order, observations and proposed trial are fictional. Six wrong labels belong to the 60 ordered cartons; no defect rate is asserted for all 90. There is no combined loss total, measured improvement or cash-saving estimate.
