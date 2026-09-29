---
title: The RACI matrix, done properly: rules, a worked example and how to read it for problems
date: 2026-09-29
summary: How to build a RACI matrix that settles who does what, the rule of one accountable person per task, how to scan rows and columns for bottlenecks and gaps, when to use RASCI, DACI or RAPID instead, and how to run the workshop.
status: published
topic: Project management
keywords: RACI matrix, RACI chart, responsibility assignment matrix, RASCI, DACI, RAPID decision making, roles and responsibilities, project management, accountability, stakeholder management
---

Two teams each think the other one is handling the supplier. A decision waits three weeks because four people believe they need to approve it. A launch slips and nobody can say who owned the artwork. Different symptoms, same cause: nobody wrote down who does what.

A RACI matrix is the simplest fix. It's a grid of tasks against roles, with one letter in each cell. It takes an hour to build, and the conversation you have while building it is often worth more than the chart.

:::card The short version
- **R, Responsible:** does the work. At least one per task.
- **A, Accountable:** owns the outcome and signs it off. **Exactly one per task.**
- **C, Consulted:** gives input before the work is done. Two-way.
- **I, Informed:** is told after. One-way.
- Read the matrix by row (is every task covered?) and by column (is any role overloaded?).
:::

## The four letters

The letters are simple. The discipline is in the difference between R and A. The responsible person does the work; the accountable person answers for it. They can be the same person on small tasks, but then write "A", because accountability includes responsibility.

The rule that makes RACI work, and the one the PMBOK Guide stresses: **one A per task**. Two accountable people means nobody is. When two managers both insist on being A, that's not a formatting problem; it's an unresolved question about who decides, and the matrix has just surfaced it.

## The example: launching a new product

A consumer goods company is launching a new product variant. The project lead maps the main tasks against six roles:

::figure raci-grid | A RACI matrix for the launch. Each row has exactly one A and at least one R. The project lead is accountable for most of the delivery; the sponsor for the two big go or no-go decisions.

## Read it by row

Each row is a task. Scan them for these patterns:

| Pattern | What it means | What to do |
| --- | --- | --- |
| No A | Nobody owns the outcome | Assign one, today |
| More than one A | Unclear decision rights | Pick one; make the other C |
| No R | Everyone assumes someone else is doing it | Assign the work |
| Lots of Cs | Slow decisions, too many voices | Keep C for people whose input changes the result; move the rest to I |
| Only I's apart from A and R | Possibly fine, or a stakeholder is missing | Check who'd be upset to be left out |

## Read it by column

Each column is a role. This is where the matrix shows things an org chart can't:

| Pattern | What it means | What to do |
| --- | --- | --- |
| Many A's in one column | A bottleneck; every decision waits for one person | Delegate accountability for smaller tasks |
| Many R's in one column | Overload; check capacity against the plan | Rebalance, or accept the risk explicitly |
| No R or A at all | The role may not need to be on the project | Keep them informed, or take them off the core team |
| Only C's | Useful expertise, or an unnecessary approval step | Check that every C really changes decisions |

In the example, the project lead has four A's. For a launch that size, that's reasonable. Across a portfolio of twelve launches, the same column would signal a bottleneck, and the fix would be to make functional leads accountable for their own deliverables.

## Variants, and when to use them

| Model | Letters | Use it when |
| --- | --- | --- |
| RACI | Responsible, Accountable, Consulted, Informed | The default for projects and processes |
| RASCI | Adds **S**upport: helps the R with the work | Many people contribute to one deliverable |
| DACI | **D**river, **A**pprover, **C**ontributors, **I**nformed | Organising a single decision, popular in software product teams |
| RAPID | **R**ecommend, **A**gree, **P**erform, **I**nput, **D**ecide | Big, contested decisions across functions |

RAPID, developed at Bain & Company, is worth knowing for its one strong idea: separating the person who *recommends* from the person who *decides*, with explicit "agree" rights for functions that can veto (like legal or quality). It's the tool for "who has the D?" arguments that RACI alone can't settle. As its authors put it, a good decision executed quickly beats a brilliant one implemented slowly.

## How to build it: a one-hour workshop

1. **Before the meeting**, list 10 to 20 tasks or decisions at the level where confusion actually happens. Not "deliver the project", not "send an email".
2. **Invite one person per role**, with enough authority to agree on behalf of their team.
3. **Fill in the A's first.** It's where the disagreements are. Settle them one by one.
4. **Then the R's, then C and I.** These go quickly once the A's are clear.
5. **Check rows and columns** with the two tables above.
6. **Publish it where the work happens**: in the project space, next to the plan. Not in an attachment.
7. **Revisit it at each phase gate**, and whenever someone new joins or a task falls through the cracks.

## Mistakes to avoid

- **Too granular.** A 200-row RACI is never read. Map the tasks that cross team boundaries; leave the rest to the teams.
- **Names instead of roles, or roles instead of names.** Use roles in the matrix, and keep a separate list of who holds each role right now.
- **Consulting everyone.** Every C adds time. Consultation is a cost, spend it where it improves the result.
- **Treating it as done.** The matrix describes a moment. Projects change phase, people move, and the matrix should follow.

A clear RACI won't make a project succeed. But a missing one reliably makes the easy parts hard, because people spend their energy on who, instead of what.

:::link /notes/change-management-adkar-kotter/ | Roles are half of it; people adopting the change is the other half
Kotter and ADKAR help make sure the change sticks once the roles are clear.
:::

## Sources

- Bristol, P. (2012). [The brick and mortar of project success](https://www.pmi.org/learning/library/project-success-core-values-key-accountabilities-6262). PMI Global Congress. On the one-accountable rule in the PMBOK Guide.
- Friedman, S. (2008). [Roles, responsibilities, and resources](https://www.pmi.org/learning/library/best-practices-managing-people-quality-management-7012). PMI Global Congress.
- Rogers, P. & Blenko, M. (2006). [Who has the D? How clear decision roles enhance organizational performance](https://hbr.org/2006/01/who-has-the-d-how-clear-decision-roles-enhance-organizational-performance). *Harvard Business Review*.
- Bain & Company. [RAPID decision making](https://www.bain.com/insights/who-has-d-how-clear-decision-roles-enhance-organizational-performance/).

*The launch and its roles are illustrative.*
