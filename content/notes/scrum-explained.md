---
title: Scrum explained: roles, events and a usable sprint example
date: 2026-10-15
updated: 2026-10-24
summary: A team finishes its tickets, but the warehouse still cannot use the feature. Follow one sprint from a clear goal to a working change people can inspect.
seoTitle: Scrum explained: roles, events and sprint example
seoDescription: Understand Scrum through a warehouse software feature. Connect the team, sprint events, backlogs and Definition of Done to a usable product increment.
status: published
topic: Project management
keywords: Scrum explained, Scrum roles events artifacts, sprint example, sprint review vs retrospective, Definition of Done
---

**Teams use Scrum to develop products through short cycles of usable work, feedback and adjustment.** A cycle is a Sprint, lasting a month or less. The team works towards a goal and produces a usable addition to the product, called an Increment.

Imagine a warehouse team asking for a stock-hold feature. Quality staff need to block suspect stock, and pickers need to see that it cannot be dispatched.

The developers finish a screen labelled “Hold stock”. Their tickets are closed. But a picker can still scan the held stock onto an order. The screen works; the intended outcome doesn't.

The [2020 Scrum Guide](https://scrumguides.org/scrum-guide.html), written by its creators, defines the roles, events and terms used below.

## Start with the product goal and the sprint goal

Our fictional team maintains a warehouse application. Its Product Goal is to help staff dispatch the right stock with fewer manual checks. The Product Backlog is the ordered list of possible work towards that goal.

For a two-week Sprint, the team agrees a narrower Sprint Goal: pickers can identify and avoid stock held for quality review.

That goal connects the screen, picking rule and stock status. It also helps the team decide what can wait. A dashboard of historical holds might be useful later, but it isn't needed to make this first workflow usable.

Scrum is one way to work within an agile approach. The [agile, waterfall and hybrid comparison](/notes/agile-waterfall-hybrid/) explains the wider delivery choice. Scrum does not remove the need to plan dependencies, costs or releases.

## Scrum roles: who is accountable for what?

| Accountability | Role in Scrum | In this fictional team |
| --- | --- | --- |
| Product Owner | Maximise product value and order the Product Backlog | Decides which warehouse need deserves attention first |
| Developers | Create a usable Increment and adapt their plan | Build and test the hold workflow together |
| Scrum Master | Help establish Scrum and improve team effectiveness | Helps resolve an access delay and improve how the team works |

[Scrum.org explains that Developers](https://www.scrum.org/resources/what-is-a-scrum-developer) means the people doing the product work, not only programmers. This example includes testing and design skills in the team. The Product Owner is one person; warehouse stakeholders still contribute knowledge and feedback.

The team needs a route to Quality when a hold rule is unclear. Quality still needs to agree the rules for holding and releasing stock.

## Scrum events: follow one two-week sprint

All five events appear in the map. The Sprint contains the other four; they are not five separate delivery phases.

::interactive scrum-work-map | Fictional two-week stock-hold feature. The map connects Scrum events to the work they support. This team uses a two-week Sprint; Scrum allows Sprints up to one month.

During Planning, the team selects work it expects to complete and makes a plan. That plan changes when the team discovers that one scanner receives an old stock status.

At the next Daily Scrum, Developers inspect progress towards the goal and adjust their work. They arrange an interface check that afternoon. They do not have to wait for tomorrow's meeting to fix the problem.

At the Review, warehouse and Quality staff try the working result and discuss what should change next. [Scrum.org describes the Review](https://www.scrum.org/resources/what-is-a-sprint-review) as a collaborative working session. A slide saying “12 tickets complete” offers little to inspect.

The Retrospective concerns how the team worked. Here, it leads to arranging test-scanner access before the next Sprint. The Review examines the product result; the Retrospective examines how the team worked.

## Backlogs, increments and the Definition of Done

Scrum's three artifacts each have a commitment: Product Backlog with Product Goal, Sprint Backlog with Sprint Goal, and Increment with Definition of Done. The Sprint Backlog contains selected work and the Developers' plan for achieving the goal.

The [Definition of Done](https://www.scrum.org/node/69427) sets the quality standard for the Increment. For our example, assume it includes integrated tests, permission checks, relevant user instructions and a working picking path. A hold screen alone would not meet it.

A particular item's acceptance criteria might say that stock on hold cannot be added to a dispatch. Those criteria describe the expected behaviour of that item. They do not replace the product's wider quality standard. Scrum.org [distinguishes that item-level practice from Done](https://www.scrum.org/resources/blog/what-difference-between-definition-done-and-acceptance-criteria).

### Who defines Done, and where Ready fits

[Scrum.org explains](https://www.scrum.org/resources/what-definition-done) that organisational quality standards form the minimum Definition of Done. When those standards do not exist, the Scrum Team creates a suitable definition. Developers commit to meeting it.

Some teams also agree a **Definition of Ready**, meaning conditions that help them discuss whether an item is understood well enough to work on. [Scrum does not require it](https://www.scrum.org/resources/blog/what-difference-between-definition-done-dod-and-definition-ready-dor).

For this team, checking access to a test scanner could help before selecting the stock-hold item. That preparation does not replace the integrated picking checks needed for Done, and it should not become a compulsory handoff that blocks useful discussion.

The [requirements traceability example](/notes/requirements-traceability-matrix-example/) shows how to retain the link from a requirement to its test evidence.

## A completed sprint is not a promise of benefits

Suppose the feature meets Done and is usable. The Review can reveal that staff also need a reason code when releasing a hold. The Product Owner can then prioritise that work alongside other needs.

A usable Increment can be released before the Sprint ends. The Sprint Review is not a release gate; normal operating approvals still apply to the actual service.

The feature also needs someone to track whether suspect stock is being stopped correctly in use. Fewer picking errors would be an operating result to measure, not a benefit proved by finishing the Sprint. The [benefits realisation note](/notes/benefits-realisation-automation/) covers that next step.

Before the next Planning session, ask someone to walk the complete stock-hold journey. If held stock can still be dispatched, fix the gap in the workflow and its Done checks before treating the feature as complete.

## Sources and example notes

- Schwaber, K. and Sutherland, J. [The Scrum Guide](https://scrumguides.org/scrum-guide.html), November 2020. Accountabilities, events, artifacts and commitments.
- Scrum.org. [Developers](https://www.scrum.org/resources/what-is-a-scrum-developer), [Definition of Done](https://www.scrum.org/node/69427) and [acceptance criteria](https://www.scrum.org/resources/blog/what-difference-between-definition-done-and-acceptance-criteria), accountabilities and quality boundaries.
- Scrum.org. [What is a Sprint Review?](https://www.scrum.org/resources/what-is-a-sprint-review), stakeholder inspection and adaptation.

The warehouse, team arrangements and feature are fictional.
