---
title: Digital transformation strategy: start with the work
date: 2026-09-26
summary: Lessons from 50+ automation projects: choose the operating problem, plan the change and decide which actions AI may take.
updated: 2026-10-23
status: published
topic: Digital transformation
keywords: digital transformation, process automation, AI in operations, agentic AI, change management, program management, operational excellence
seoTitle: Digital transformation strategy: from plan to work
seoDescription: Build a digital transformation strategy around work, ownership and measured results. Follow a payroll example and set clear limits for AI agents.
---

At Snoonu I led more than 50 automation and process projects with a team of 12+ people. Much of the value came from connecting systems and fixing work that people repeated every week.

A **digital transformation strategy** sets out which business outcomes digital changes should improve, what needs to change to achieve them, and who will deliver and check the result. A list of software purchases leaves most of that undecided.

If the terminology is new, the [digitization, digitalization and transformation comparison](/notes/digitization-digitalization-transformation/) follows one invoice through the differences. Here, the question is how to turn a worthwhile change into a programme people can deliver.

## Start with the loop people repeat every week

A good starting point is a process that repeats, crosses systems and takes time away from the people running it.

| Process | Before | After | What changed |
| --- | --- | --- | --- |
| Payroll | 4+ days, 3 to 4 people across finance and HR | Under 1 hour | One custom Odoo module pulling salary, leave, expense and loan data from BambooHR, Rydoo and internal portals |
| Expense reimbursement | Manual, slow, hard to enforce policy | 70% faster | Rydoo, integrated with Odoo and BambooHR, from trip approval to payout |
| Access to software | Manual provisioning and shadow IT | 300+ apps under governance | Lumos with automatic provisioning and role-based approvals |
| Joiners, movers, leavers | Tickets raised by hand for every change | Created automatically | Employee changes trigger IT provisioning in Jira |

Payroll made the problem easy to explain. The numbers lived in several places and had to be gathered by hand every month. Connecting those sources changed the work Finance and HR had to do.

## Three lessons that held up

**1. Connect the data before you add intelligence.** Every project above was, underneath, an integration. The internal AI assistant we built later was only as useful as the knowledge it could draw on, so connecting policies and documents mattered as much as the model.

**2. Set access and approval rules early.** An incorrect automated action can repeat across many records before anyone notices. We agreed who could use each system, what required approval and who would resolve exceptions.

**3. Measure the process itself.** For payroll, we compared the time needed to complete the run before and after the change. The launch date alone could not tell us whether the work had improved.

The [benefits realisation example](/notes/benefits-realisation-automation/) follows that distinction: shorter processing time can create useful capacity without reducing payroll spending.

## Turn the operating problem into a strategy

For a process like payroll, this is how I'd build the plan.

| Step | What the plan needs to settle |
| --- | --- |
| Understand the current work | Where the time goes, which records are needed and how errors are found |
| Design the change | Which data should connect, who owns it and which approvals must remain |
| Test a bounded version | A defined group, comparison with the current process and checks for incorrect or missing results |
| Introduce it into normal work | Named operating owner, trained users, support and a way to recover when something fails |
| Review the outcome | Processing time, errors and total effort, including maintenance and exception handling |

Agree the outcome and review method before choosing a tool. The process owner needs a result they can accept; the delivery team needs a boundary it can estimate. [Hoshin Kanri and OKRs](/notes/hoshin-kanri-vs-okrs/) help connect that choice to the wider business priorities.

### Where the 4Ds and pillar lists fit

[McKinsey's 2017 4D approach](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/from-disrupted-to-disruptor-reinventing-your-business-by-transforming-the-core) is **Discover, Design, Deliver and De-risk**: choose the ambition, design the change, organise delivery and reduce exposure through the way it is sequenced. It offers one way to organise those decisions.

Five- or seven-pillar lists depend on the author. For example, [McKinsey's 2018 survey](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/unlocking-success-in-digital-transformations) groups its success practices into leadership, capability building, involving staff in new ways of working, upgrading tools and communication. Those five categories are not five delivery stages. A roadmap needs actual work and decisions under whichever labels you choose.

The five-step sequence above is one possible roadmap for a process change. A company-wide change may need several overlapping projects and reviews, rather than five stages completed once.

## Allow for the cost of the change

Integration takes effort to build and maintain. Teams need time to learn, resolve exceptions and sometimes run old and new methods together. A new supplier can also create a dependency: check what happens if its service fails, changes price or becomes difficult to leave.

Put those costs beside the expected benefit. A process that runs faster can still cost more overall if support and review absorb the saving. [Change management](/notes/change-management-adkar-kotter/) belongs in that estimate, including the people who will use and support the result.

Disconnected systems and slow handoffs still give businesses a reason to change. That does not mean every process needs a transformation programme. If a clear rule or an existing system solves the problem, start there.

## Decide what AI may do

An AI assistant adds another decision to the strategy: which actions can it take, and which still need approval?

[NIST's AI risk-management guidance](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) calls for defined human oversight, trained people and monitoring after deployment. The ladder below is my way of making that discussion concrete in operations; it is not a NIST maturity model.

## A simple autonomy ladder

::figure autonomy-ladder | Four levels of autonomy. Move up a step only when an error would be small, reversible and noticed quickly.

| Level | AI task | Human responsibility | Operations example |
| --- | --- | --- | --- |
| 1. Read | Gathers evidence from systems | Does everything else | Summarises last night's stops by cause |
| 2. Recommend | Ranks options with reasons | Decides | Suggests which maintenance job to do first, given the production plan |
| 3. Run an approved workflow | Carries out a defined sequence within its permissions | Approves the sequence and exceptions; monitors its use | Opens tickets, notifies owners, books an authorised slot |
| 4. Act | Executes within explicit limits | Sets and reviews the limits | Adjusts a buffer target within an agreed range |

How far up the ladder a decision goes depends on four things:

- **Consequence:** what's the worst realistic outcome?
- **Reversibility:** can it be undone quickly and cheaply?
- **Confidence:** how often has the recommendation been right?
- **Detection:** how fast would anyone notice a mistake?

I'd keep a person in the loop wherever safety, product quality, compliance, customer commitments or big production changes are involved. For other decisions, increase autonomy only when the checks and response arrangements support it.

I apply the same ladder to what I build:

| Product | Where it sits | Why |
| --- | --- | --- |
| [Vrolen](/work/vrolen/) | Recommend | It tests countermeasures and suggests one; a person approves any change to the line |
| [Foreviq](/work/foreviq/) | Recommend | The assistant can propose a new forecast but can't publish one |
| [Chanshambe](/work/chanshambe/) | Recommend | The family assistant drafts plans; nothing happens until someone approves |
| [Content engine](/work/content-engine/) | Run an approved workflow | It writes, renders and schedules posts, which mostly wait as drafts for my approval |

## Start with a process you can follow end to end

Choose a recurring problem, measure the current work and agree who owns the result. Connect the data and test the proposed method before extending it to more teams.

My note on [what to automate first](/notes/what-to-automate-first/) helps choose between an integration, a workflow and AI. Once that choice is made, keep the outcome, operating owner and review date in the plan. They still matter after the project team moves on.

## Sources

- McKinsey, 2017. [McKinsey on the 4D approach](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/from-disrupted-to-disruptor-reinventing-your-business-by-transforming-the-core), the named 4D approach.
- McKinsey, 2018. [McKinsey's survey of digital transformation practices](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/unlocking-success-in-digital-transformations), five categories of practices reported in its survey, not a universal lifecycle.
- NIST. [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), human oversight, training and monitoring.

The Snoonu figures are from my own work. The planning sequence is proposed guidance; the autonomy ladder is an author-defined decision aid.
