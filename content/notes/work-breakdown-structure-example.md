---
title: Work breakdown structure: a warehouse barcode example
date: 2026-10-14
summary: “Install scanners” sounds like a plan until labels, interfaces and support are missing. Build a WBS around deliverables, then turn that scope into work you can schedule.
seoTitle: Work breakdown structure: a worked example
seoDescription: Build a work breakdown structure for a warehouse barcode pilot. See deliverables, work packages, acceptance criteria and the difference from a schedule.
status: published
topic: Project management
keywords: work breakdown structure, WBS example, work package example, WBS dictionary, WBS vs project schedule, 100 percent rule
---

“Install the scanners” goes into the project plan. The devices arrive, someone configures them, and the task turns green.

The pilot still can't start. Nobody included the bin labels, the warehouse-system interface or the person who will handle a failed scan on the night shift.

A **work breakdown structure**, or WBS, helps you define that scope before you build the schedule. It breaks the agreed project into deliverables, then into smaller pieces of work with clear boundaries.

A **deliverable** is an output someone can check and accept. “Tested inventory interface” says more about the required result than “work on integration.” We still need the activities, but first we need agreement on what they must produce.

## Start with a result you can recognise

Our fictional project is a barcode pilot in one warehouse zone. It covers 120 bins, receiving and picking transactions, and users on two shifts. It must connect to the warehouse's existing enterprise resource planning system, or ERP.

The agreed end state is a working pilot with approved labels, correct transaction records, trained users and named support. Replacing the ERP and rolling out to other warehouses are outside this project's scope.

Those boundaries matter. A tree can look impressively detailed and still describe the wrong project.

[PMI's WBS guidance](https://www.pmi.org/learning/library/creating-effective-wbs-recognize-quality-7541) treats the WBS as a breakdown of project scope into deliverables. That includes work needed to manage the project, as well as the things users will receive.

For our pilot, we'll group the work into five branches: approved design, working solution, accepted pilot, supported handover and project management.

## Break each deliverable into work packages

A **work package** is the lowest level of the WBS at which you'll manage this work. It needs enough definition for someone to estimate it, take responsibility and explain when it's complete.

There isn't one correct number of levels. Split further when an item still hides separate outcomes, different responsibilities or a result nobody can verify.

The tree below has 12 illustrative work packages. Every branch stays visible. Select a package to inspect its boundary and acceptance criteria, or compare the complete example with a missing interface and duplicated support work.

::interactive wbs-deliverables | Fictional scope for a 120-bin barcode pilot in one warehouse zone, covering two shifts. The 12 packages are this example's agreed scope, not a universal barcode-project checklist. Selecting a package opens its definition; the whole breakdown remains visible.

Notice the difference between buying devices and having a working solution. Configured scanners are one deliverable. Installed, verified bin labels are another. The tested interface needs its own result too.

That separation makes a later “done” claim easier to check. A scanner can be configured while the interface is still failing.

## Use the 100% rule without counting the same work twice

The **100% rule** means the breakdown covers all the agreed scope, including internal deliverables and project management. The children under a branch should cover that branch completely, with no overlapping work.

It isn't a target to include every feature someone suggests. [PMI's practice-standard explanation](https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063) makes the boundary explicit: work outside the approved scope doesn't belong in the breakdown.

In the “interface missing” version above, every visible package could finish and the pilot would still lack an agreed outcome. The project would look busy and remain incomplete.

In the duplicated version, the same support arrangements sit under both the working solution and the handover. Two headings haven't created two separate pieces of work. They have made responsibility and estimating less clear.

The counter checks coverage against the 12 packages we've defined for this example. It can't discover a requirement that the whole team forgot. Review the breakdown against the agreed scope, user needs and handover conditions with the people who will do and receive the work.

## Define “tested interface” before assigning it

The short title won't carry everything. The **WBS dictionary** records what each package includes, excludes and must satisfy. It can be a short record alongside the tree; it doesn't need to become another large document.

For package 2.3, the tested ERP interface, the definition could look like this:

| Field | Definition for this pilot |
| --- | --- |
| Included | Receiving and picking transactions for the agreed zone |
| Excluded | ERP replacement and transactions from other warehouses |
| Responsible role | Integration lead |
| Acceptance | Agreed receipt and picking cases post once to the correct item, quantity and bin; retrying a failed transfer creates no duplicate |
| Evidence | Test-case results and warehouse-owner acceptance |

The team now knows what to build, and the receiver knows what to check.

Write the boundary where ambiguity would cost you time. In this project, scanner configuration excludes the ERP interface, and support arrangements exclude teaching the users. Those outcomes have their own packages.

## Turn the package into activities, then a schedule

Once the result is clear, list the activities needed to deliver it. The interface may need mapping, configuration, test preparation, execution and correction of defects.

Then estimate durations, identify dependencies and check who is available. A WBS code such as 2.3 tells you where the work belongs. It doesn't mean that it starts after 2.2 or finishes in week three.

| Planning view | Question it answers | Interface example |
| --- | --- | --- |
| WBS | What scope must we deliver? | Tested receiving and picking interface |
| Activity list | What work produces it? | Map fields, configure, test and fix defects |
| Schedule | In what order, with what resources and dates? | Tests need the agreed labels, data and configuration |

Use the [RACI example](/notes/raci-matrix-guide/) when you need to separate who does, approves and supports that work. The [critical path walkthrough](/notes/critical-path-method-worked-example/) shows how dependencies and durations determine the finish date.

That sequence also gives [earned value](/notes/earned-value-management-explained/) a firmer basis: progress can relate to defined work and acceptance, rather than a collection of tasks that turned green.

## Keep the breakdown aligned with decisions

If the sponsor adds another warehouse, record that as a scope decision and update the affected packages, estimates and schedule. Don't hide the extra work inside “support the pilot.”

For the original zone, review the tree with a simpler question: if every package met its acceptance conditions, would we have the pilot we agreed to deliver?

Any gap in that answer deserves attention before the dates become commitments.

## Sources and example notes

- [Eric S. Norman: Creating effective work breakdown structures](https://www.pmi.org/learning/library/creating-effective-wbs-recognize-quality-7541), PMI, 2005. Deliverable-focused scope and work-package definitions.
- [PMI: Practice standard for work breakdown structures](https://www.pmi.org/learning/library/practice-standard-work-breakdown-structures-8063). The 100% rule, dictionary and relationship to scheduling.

The warehouse, scope and package definitions are fictional. The tree illustrates the method; agree the scope and acceptance conditions for your own project.
