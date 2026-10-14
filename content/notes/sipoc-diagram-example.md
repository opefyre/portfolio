---
title: SIPOC diagram example: where does the process actually end?
date: 2026-10-14
summary: Maintenance has logged the request. Production is waiting for a repair. A SIPOC diagram helps the team agree what its process delivers, and who needs that output.
seoTitle: SIPOC diagram: definition and a worked example
seoDescription: Build a SIPOC diagram using a maintenance planning example. Define suppliers, inputs, process, outputs and customers, then check where the handoff stops.
status: published
topic: Continuous improvement
keywords: SIPOC diagram example, what is SIPOC, SIPOC suppliers inputs process outputs customers, SIPOC vs process map, SIPOC Six Sigma
---

Maintenance says the request is complete. Production says the machine still isn't working. Both teams are looking at the same job, but “complete” means something different to each of them.

**SIPOC stands for Suppliers, Inputs, Process, Outputs and Customers.** A SIPOC diagram gives a high-level view of a process: what it needs, who provides those inputs, what happens, what comes out and who uses the result.

It helps settle a basic question before an improvement project starts: which piece of work are we trying to improve?

The [AHRQ workflow toolkit](https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/sipoc) describes the method and recommends reviewing it with people who know the process. A tidy diagram made by one person can still describe a process nobody actually follows.

## Start with the handoff you're responsible for

Take a fictional factory improving how it prepares routine maintenance jobs. Emergency response is outside this example.

The planning process starts when a request arrives. It ends with either a work order released for assignment or a recorded hold explaining what is missing. Carrying out the repair and returning equipment to production belong to the next process.

That boundary matters. A request number proves that someone recorded the issue. It doesn't prove that a technician has enough information, parts or an agreed access window to do the job.

For this factory, a released work order needs an identified asset, a defined task, confirmed parts and an agreed window, with the required local release checks completed. A held request remains visible as unfinished planning work.

## A SIPOC diagram, filled in

Read the five parts together. The operator is an internal supplier of information. The technician is an internal customer of the work order. Neither term requires a purchase or a sale.

::interactive sipoc-maintenance-boundary | Fictional routine maintenance planning process. Start: request received. End: released work order or recorded hold. The five SIPOC elements stay visible; the buttons inspect three separate input situations. A released work order does not mean the equipment has been repaired or cleared to run.

The diagram lists the main suppliers and customers for the whole process. It isn't a five-column spreadsheet where every entry must line up with exactly one entry in the next column.

Notice the two possible outputs. The team can release a usable work order, or return a clear hold with a named follow-up. Calling every request “processed” would hide that distinction.

## Check an input before changing the process

Suppose the request says “pump leaking”, without an equipment ID. The planner has to find out which pump before defining the work. Moving that request into an approved queue would leave the missing information unresolved.

Now give the planner a complete request, but make the required seal unavailable. The asset is clear. The obstacle sits later, at the parts check. Adding another mandatory field to the request form wouldn't make the seal arrive.

The complete case reaches release. Even then, the output is a prepared job. The technician still needs to perform the work, and production needs its own return-to-service confirmation.

These examples show where to look. They don't establish why real requests wait. The team needs actual job records and conversations with the people doing the work before choosing a fix.

## How to make a SIPOC for your process

Start by naming the result and its user. “Handle maintenance” is too broad. “Prepare a routine work order for assignment” gives the team something it can inspect.

Then work through the boundary and handoffs:

1. Agree the event that starts the process and the output that ends it.
2. Describe the main steps at a level people can follow in one view.
3. Ask the receiving team what makes the output usable.
4. List the inputs needed to produce it and who supplies them.
5. Walk through a real case together, including one that got held or sent back.

Keep input and output requirements concrete. “Good information” could mean anything. “Asset ID matches the equipment register” gives the operator and planner a shared check.

[ASQ's SIPOC job-aid description](https://asq.org/quality-resources/articles/sipoc-job-aid?id=232019f796fc447dad7cdb2cf242f48a) includes requirements alongside inputs and outputs. That small addition makes the handoff easier to discuss.

## SIPOC vs process map vs value stream map

Each view helps with a different part of the investigation.

| Tool | What it helps you see | For the maintenance example |
| --- | --- | --- |
| SIPOC | Boundary, main steps and suppliers and users of the work | What must reach the technician, and what planning needs to produce it |
| Detailed process map | Decisions, branches, returns and handoffs inside the boundary | How a missing asset ID gets clarified and how a parts hold is resolved |
| Value stream map | Material or information flow, with processing and waiting time | Where a request spends its time between arrival and release |

Once the boundary is agreed, the [process mapping note](/notes/process-mining-vs-process-mapping/) explains how to look inside it. The [value stream mapping example](/notes/value-stream-mapping-example/) adds the time view when waiting is the problem.

In a [DMAIC project](/notes/dmaic-step-by-step/), SIPOC helps establish the process being studied. It won't replace the measurements and cause testing that come later.

## Before adding another dashboard

An automatic alert can enter the same planning process. It still needs an identified asset, someone to assess it and a route to an executable job. [Vrolen's predictive maintenance guide](https://vrolen.com/blog/predictive-maintenance-in-manufacturing/) covers that wider journey from equipment signals to an intervention.

For our factory, the first improvement meeting can stay much smaller. Put one released work order and one held request beside the SIPOC. Ask the technician whether the released order is usable, and ask the planner whether the hold makes the next action clear.

If either answer is no, change the handoff definition before building a report that counts it as success.

## Sources and example notes

- [AHRQ: SIPOC workflow tool](https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/sipoc). Definition and method for identifying process boundaries, outputs, users, inputs and suppliers.
- [ASQ: SIPOC Job Aid](https://asq.org/quality-resources/articles/sipoc-job-aid?id=232019f796fc447dad7cdb2cf242f48a), Gerald R. Linnins, 2011. Public description of the tool, including input and output requirements. The full job aid requires access.

The factory, process, roles and three input situations are fictional. They illustrate a planning boundary, not a maintenance procedure or evidence of an improvement result.
