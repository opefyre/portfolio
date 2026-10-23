---
title: What to automate first: a scoring model for processes, and when to use RPA, workflows or AI agents
date: 2026-09-29
updated: 2026-10-23
summary: A practical way to choose which processes to automate, score them, pick the right kind of automation (API, workflow, RPA, document AI or an AI agent) and build a business case with a payback period.
status: published
topic: Digital transformation
keywords: process automation, what to automate, automation roadmap, RPA vs AI agents, workflow automation, agentic AI, automation business case, process mining, digital transformation, intelligent automation
seoTitle: What to automate first: a process scoring model
seoDescription: Score processes before automating them. Compare APIs, workflows, RPA and AI agents, then build a business case with a worked payback example.
---

A supplier-invoice process handles 3,000 cases a month at six minutes each. That makes 300 hours of work worth examining. Before choosing a tool, the team needs to know how many cases follow clear rules, what happens to exceptions and which hours a change could release.

Compare the work first, then choose among an integration, workflow, software robot, document AI or an agent. Keep the permissions and support required by each option in the decision.

:::card The short version
1. **List candidates with numbers:** volume, minutes per case, exceptions, systems touched.
2. **Score each one for automation fit** on five criteria.
3. **Plot fit against value.** High on both goes first. High value, low fit means fix the process before automating it.
4. **Pick the most predictable tool that can do the job:** an API integration before a workflow, a workflow before a bot, a bot before an agent.
5. **Build a business case** on hours actually released, not hours theoretically saved.
:::

## Step 1: list the candidates, with numbers

Ask each department to identify repetitive work and estimate its volume, time per case and exceptions. Label estimates so the team knows what needs measuring before approval.

| Process | Cases a month | Minutes each | Hours a month |
| --- | --- | --- | --- |
| Supplier invoices | 3,000 | 6 | 300 |
| Month-end close | 1 close | team effort | 210 |
| Customer refunds | 1,100 | 9 | 165 |
| Contract review | 90 | 90 | 135 |
| Employee onboarding | 30 | 180 | 90 |
| Sales quotes | 220 | 15 | 55 |
| Travel bookings | 400 | 6 | 40 |

If your ERP or ticketing system has suitable event logs, use [process mining](/notes/process-mining-vs-process-mapping/) to inspect recorded paths, elapsed times and repeated steps. Check the case IDs and event coverage before treating those records as the whole process.

## Step 2: score automation fit

Recorded hours show how much work the process consumes. To assess automation fit, score each candidate from 1 to 5 against the same five criteria. Check the evidence behind each score before using the ranking.

| Criterion | Weight | Scores 5 when… | Scores 1 when… |
| --- | --- | --- | --- |
| Clear rules | 25% | Decisions follow written rules | Every case needs judgment |
| Structured input | 20% | Data arrives in fields and forms | Free text, scans, phone calls |
| Stability | 20% | The process hasn't changed in a year | It changes every quarter |
| Low exceptions | 15% | Under 5% of cases need special handling | Over half do |
| System access | 20% | Every system has an API | Only screens, or paper |

Scoring supplier invoices:

:::formula Supplier invoices
Rules 5 × 0.25 + Input 4 × 0.20 + Stability 5 × 0.20 + Exceptions 3 × 0.15 + Access 4 × 0.20
= 1.25 + 0.80 + 1.00 + 0.45 + 0.80 = **4.3 out of 5**
:::

Do this with the people who run the process, not just with IT. They know where the exceptions hide.

## Step 3: plot fit against value

::figure automation-matrix | Each process placed by its fit score and the hours it takes. Top right goes first. Top left is valuable but messy: redesign it before automating it.

Each quadrant has a different next step:

:::grid
- **Automate first** High value, high fit. Supplier invoices and customer refunds. Start here, and use the early wins to fund the rest.
- **Fix the process, then automate** High value, low fit. For month-end close and contract review, resolve unclear rules and recurring exceptions before selecting automation.
- **Quick wins, if cheap** Low value, high fit. Onboarding and travel. Worth doing with off-the-shelf tools, not with a custom build.
- **Leave for now** Low value, low fit. Sales quotes. Revisit next year.
:::

## Step 4: pick the right kind of automation

Choose a tool whose behaviour the team can test and support for this task. An integration can move agreed fields; a workflow can route known approval rules. An agent needs additional checks when it chooses steps or uses tools. Compare actual costs and controls before selecting it.

| Tool | Best for | Weak at | Example |
| --- | --- | --- | --- |
| API integration | Moving data between systems, at volume | Anything that needs judgment | A new hire in HR creates accounts in every other system |
| Workflow automation | Multi-step flows with approvals across apps | Legacy systems with no API | Expense approvals routed by amount and cost centre |
| RPA (software robots) | Old systems that only have screens | Screens that change; unstructured input | Keying invoice data into a legacy ERP |
| Document AI | Reading invoices, forms, emails, contracts | Guaranteed accuracy without checks | Pulling supplier, amount and PO number from a PDF invoice |
| AI agent | Multi-step tasks with varied input and tool use | High-stakes, irreversible actions | Triaging supplier queries and drafting replies for approval |

Real processes usually combine them. For supplier invoices: document AI reads the invoice, rules match it to the purchase order and goods receipt, an API posts it to the ERP, and a workflow sends the mismatches to a person. No agent needed.

## Step 5: build the business case

For supplier invoices, compare the current work with the expected exception workload:

:::formula Hours
Today: 3,000 invoices × 6 min = **300 hours a month**
After: 80% flow straight through. 600 exceptions × 4 min = **40 hours a month**
Released: **260 hours a month**
:::

The money calculation below values released capacity at €35 an hour. Treat its payback as conditional: the released hours must produce that much avoided spending or another demonstrated financial benefit. If payroll and other costs stay unchanged, report the time as capacity released.

:::formula Conditional financial case
Benefit: 260 h × €35 per hour (fully loaded) = €9,100 a month, **€109,200 a year**
Costs: €45,000 to build, €1,500 a month to run (€18,000 a year)
Payback: 45,000 ÷ (9,100 − 1,500) ≈ **6 months**
First-year net benefit: 109,200 − 18,000 − 45,000 = **€46,200**
:::

Two things make a business case honest:

- **Count released hours, not saved minutes.** Saving 12 minutes a day for 20 people doesn't free a person. The savings only become real when capacity is redeployed, hiring is avoided, or overtime disappears. Say which one, and who owns it.
- **Check benefits beyond hours.** For invoices, inspect missed early-payment discounts, duplicate payments and month-end delays. Include only benefits the team can evidence, without counting the same saving twice.

This matters more than it sounds. In Deloitte's intelligent automation survey, more than half of organisations hadn't even calculated what their automation saved, and average payback for pilots had stretched from 16 to 22 months.

## Where AI agents fit

AI agents can plan, use tools and take actions, which makes them powerful for work that's too varied for rules. It also makes them easy to overuse. Gartner has predicted that more than 40% of agentic AI projects will be cancelled by the end of 2027, because of rising costs, unclear value or weak risk controls. Its advice matches the rule above: agents where decisions are needed, plain automation for routine workflows.

Before giving an agent a process, decide how much it's allowed to do on its own:

- **Read:** it gathers and summarises permitted information. Confirm which records it may access.
- **Recommend:** it proposes an action; a person decides.
- **Orchestrate:** it runs approved workflows and hands exceptions to people.
- **Act:** it executes within explicit limits, with every action logged and reversible.

Move a process up a level only when mistakes would be small, reversible and noticed quickly. I wrote more about this ladder in [digital transformation that sticks](/notes/digital-transformation-that-sticks/).

## Five mistakes to avoid

1. **Automating a broken process.** If the process has five approval loops nobody needs, remove them first. McKinsey's 2026 State of AI survey found that nearly three quarters of the companies getting the most from AI had fundamentally redesigned their workflows, against a quarter of the rest.
2. **Ignoring the exceptions.** Measure the handling effort for the cases that need people, and include their route in the design.
3. **No process owner.** Every automation needs a business owner who notices when it drifts, not just an IT ticket queue.
4. **Using screens without checking the API.** Compare the supported API with screen automation, including access, missing functions and maintenance after an interface changes.
5. **Closing the review at go-live.** Check hours, errors and cycle time a quarter later. Confirm with Finance which released hours changed spending.

:::link /notes/change-management-adkar-kotter/ | Next: getting people to adopt it
Automation changes how people work. Here's how to make sure they actually switch to the new way.
:::

## Sources

- Gartner (2025). [Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). Press release.
- McKinsey (2026). [The state of AI in 2026](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai).
- Deloitte (2022). [Automation with intelligence](https://www.deloitte.com/us/en/insights/topics/talent/intelligent-automation-2022-survey-results.html). Global intelligent automation survey.
- van der Aalst, W. et al. (2012). [Process mining manifesto](https://www.tf-pm.org/resources/manifesto). IEEE Task Force on Process Mining.
- Schluntz, E. & Zhang, B. (2024). [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents). Anthropic, on workflows versus agents.

*The processes, volumes and costs are illustrative.*
