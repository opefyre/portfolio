---
title: Digital transformation that sticks: automate the loop first, then decide what AI may do
date: 2026-09-26
summary: What 50+ automation projects taught me about digital transformation, and a simple four-step ladder for deciding how much to let AI agents do.
status: draft
keywords: digital transformation, process automation, AI in operations, agentic AI, change management, program management, operational excellence
---

At Snoonu I led digital innovation and process improvement across the company: more than 50 automation and process projects, with a team of 12+ people. Some of them were flashy. Most of the value came from the unflashy ones.

This note is what I'd tell a team starting a digital transformation today, plus a way of thinking about AI agents that I wish I'd had written down earlier.

## Start with the loop people repeat every week

The best first projects share a shape: a process that runs on a schedule, touches several systems, and quietly eats a few people's days.

| Process | Before | After | What changed |
| --- | --- | --- | --- |
| Payroll | 4+ days, 3 to 4 people across finance and HR | Under 1 hour | One custom Odoo module pulling salary, leave, expense and loan data from BambooHR, Rydoo and internal portals |
| Expense reimbursement | Manual, slow, hard to enforce policy | 70% faster | Rydoo, integrated with Odoo and BambooHR, from trip approval to payout |
| Access to software | Manual provisioning and shadow IT | 300+ apps under governance | Lumos with automatic provisioning and role-based approvals |
| Joiners, movers, leavers | Tickets raised by hand for every change | Created automatically | Employee changes trigger IT provisioning in Jira |

Payroll is my favourite example because nobody would call it transformation. It was a data problem: the numbers lived in four places and had to be gathered by hand every month. Connect the sources, and four days becomes one click.

## Three lessons that held up

**1. Connect the data before you add intelligence.** Every project above was, underneath, an integration. The internal AI assistant we built later was only as useful as the knowledge it could draw on, so connecting policies and documents mattered as much as the model.

**2. Put governance in before you scale.** Automation multiplies whatever it touches, including mistakes. Access governance, approval workflows and clear ownership came before the clever parts, not after.

**3. Measure the process itself.** Going live is a milestone; the result is "payroll now takes an hour". Every project had a before and an after, measured on the process.

That third one is also the idea behind [my note on whether improvements hold](/notes/did-it-hold/): a change only counts once you've checked it stuck.

## Now, AI agents

AI in operations is moving from answering questions to taking actions. Gartner recently assessed 20 agentic-AI use cases for manufacturers ([Gartner, 2026](https://www.gartner.com/en/documents/8396481)), and vendors are wiring agents into industrial workflows, like Siemens and Salesforce connecting digital-twin data to service and sales ([Siemens, 2026](https://press.siemens.com/global/en/pressrelease/siemens-and-salesforce-deepen-ai-partnership-redefine-industrial-sales-and-service)).

At the same time, NIST is clear that reliability, safety, metrics and verification of AI decisions are still open problems in manufacturing ([NIST](https://www.nist.gov/programs-projects/artificial-intelligence-ai-manufacturing)).

So before choosing a model, I'd answer a different question first: **which decisions are we prepared to hand over?**

## A simple autonomy ladder

::figure autonomy-ladder | Four levels of autonomy. Move up a step only when an error would be small, reversible and noticed quickly.

| Level | The AI… | A person… | Operations example |
| --- | --- | --- | --- |
| 1. Read | Gathers evidence from systems | Does everything else | Summarises last night's stops by cause |
| 2. Recommend | Ranks options with reasons | Decides | Suggests which maintenance job to do first, given the production plan |
| 3. Orchestrate | Runs workflows already approved | Approves the workflow once | Opens tickets, notifies owners, books the changeover slot |
| 4. Act | Executes within explicit limits | Sets and reviews the limits | Adjusts a buffer target within an agreed range |

How far up the ladder a decision goes depends on four things:

- **Consequence:** what's the worst realistic outcome?
- **Reversibility:** can it be undone quickly and cheaply?
- **Confidence:** how often has the recommendation been right?
- **Detection:** how fast would anyone notice a mistake?

I'd keep a person in the loop wherever safety, product quality, compliance, customer commitments or big production changes are involved. Everything else can climb, one step at a time, as the evidence builds.

## If you're starting a transformation program

- Pick three processes that repeat every week and touch at least two systems.
- Measure each one before you change it, in time or cost, not in "satisfaction".
- Connect the data first; automate second; add AI third.
- Write down the decision rights before you deploy an agent, not after something goes wrong.

Unglamorous work, and the part that makes the change stick.

## Sources

- Gartner (17 Sep 2026). [Agentic AI use-case assessment for manufacturing enterprises](https://www.gartner.com/en/documents/8396481)
- Siemens (15 Sep 2026). [Siemens and Salesforce deepen AI partnership to redefine industrial sales and service](https://press.siemens.com/global/en/pressrelease/siemens-and-salesforce-deepen-ai-partnership-redefine-industrial-sales-and-service)
- NIST. [Artificial intelligence (AI) for manufacturing](https://www.nist.gov/programs-projects/artificial-intelligence-ai-manufacturing)

*The Snoonu figures are from my own work.*
