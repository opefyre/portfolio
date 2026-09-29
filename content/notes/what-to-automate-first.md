---
title: What to automate first: a scoring model for processes, and when to use RPA, workflows or AI agents
date: 2026-09-29
summary: A practical way to choose which processes to automate, score them, pick the right kind of automation (API, workflow, RPA, document AI or an AI agent) and build a business case with a payback period.
status: published
topic: Digital transformation
keywords: process automation, what to automate, automation roadmap, RPA vs AI agents, workflow automation, agentic AI, automation business case, process mining, digital transformation, intelligent automation
---

Most automation programs don't fail because the technology doesn't work. They fail at the start, by automating the wrong things: a process nobody understood, one that changes every quarter, or one that only takes a few hours a month. Then the bots break, the savings never show up, and the next budget request is harder.

Now that AI agents can take actions on their own, the choice is wider and the stakes are higher. This note is a simple, repeatable way to choose what to automate, and what to automate it *with*.

:::card The short version
1. **List candidates with numbers:** volume, minutes per case, exceptions, systems touched.
2. **Score each one for automation fit** on five criteria.
3. **Plot fit against value.** High on both goes first. High value, low fit means fix the process before automating it.
4. **Pick the most predictable tool that can do the job:** an API integration before a workflow, a workflow before a bot, a bot before an agent.
5. **Build a business case** on hours actually released, not hours theoretically saved.
:::

## Step 1: list the candidates, with numbers

Ask each department for the processes that are repetitive, rule-based and time-consuming. Then put numbers on them. A rough estimate is fine. No estimate is not.

| Process | Cases a month | Minutes each | Hours a month |
| --- | --- | --- | --- |
| Supplier invoices | 3,000 | 6 | 300 |
| Month-end close | 1 close | team effort | 210 |
| Customer refunds | 1,100 | 9 | 165 |
| Contract review | 90 | 90 | 135 |
| Employee onboarding | 30 | 180 | 90 |
| Sales quotes | 220 | 15 | 55 |
| Travel bookings | 400 | 6 | 40 |

If you have event logs from your ERP or ticketing system, **process mining** can do much of this for you. It rebuilds the real process from timestamps: every path a case took, how long each step waited, and how often cases loop back. It's the fastest way to learn that the "standard" process covers only half the cases.

## Step 2: score automation fit

Hours tell you the value. They don't tell you whether a process *can* be automated well. For that, score each candidate from 1 to 5 on five criteria:

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
- **Fix the process, then automate** High value, low fit. Month-end close and contract review. Standardise, simplify and remove steps first. Automating a messy process just makes the mess faster.
- **Quick wins, if cheap** Low value, high fit. Onboarding and travel. Worth doing with off-the-shelf tools, not with a custom build.
- **Leave for now** Low value, low fit. Sales quotes. Revisit next year.
:::

## Step 4: pick the right kind of automation

"Automation" covers very different tools. They sit on a scale from fully predictable to adaptive, and the rule of thumb is simple: **use the most predictable tool that can do the job.** Predictable tools are cheaper to run, easier to test and easier to trust.

| Tool | Best for | Weak at | Example |
| --- | --- | --- | --- |
| API integration | Moving data between systems, at volume | Anything that needs judgment | A new hire in HR creates accounts in every other system |
| Workflow automation | Multi-step flows with approvals across apps | Legacy systems with no API | Expense approvals routed by amount and cost centre |
| RPA (software robots) | Old systems that only have screens | Screens that change; unstructured input | Keying invoice data into a legacy ERP |
| Document AI | Reading invoices, forms, emails, contracts | Guaranteed accuracy without checks | Pulling supplier, amount and PO number from a PDF invoice |
| AI agent | Multi-step tasks with varied input and tool use | High-stakes, irreversible actions | Triaging supplier queries and drafting replies for approval |

Real processes usually combine them. For supplier invoices: document AI reads the invoice, rules match it to the purchase order and goods receipt, an API posts it to the ERP, and a workflow sends the mismatches to a person. No agent needed.

## Step 5: build the business case

Here's a simple version for supplier invoices.

:::formula Hours
Today: 3,000 invoices × 6 min = **300 hours a month**
After: 80% flow straight through. 600 exceptions × 4 min = **40 hours a month**
Released: **260 hours a month**
:::

:::formula Money
Benefit: 260 h × €35 per hour (fully loaded) = €9,100 a month, **€109,200 a year**
Costs: €45,000 to build, €1,500 a month to run (€18,000 a year)
Payback: 45,000 ÷ (9,100 − 1,500) ≈ **6 months**
First-year net benefit: 109,200 − 18,000 − 45,000 = **€46,200**
:::

Two things make a business case honest:

- **Count released hours, not saved minutes.** Saving 12 minutes a day for 20 people doesn't free a person. The savings only become real when capacity is redeployed, hiring is avoided, or overtime disappears. Say which one, and who owns it.
- **Count the benefits beyond hours.** For invoices: early-payment discounts that were being missed, fewer duplicate payments, faster month-end close. These are often bigger than the labour saving.

This matters more than it sounds. In Deloitte's intelligent automation survey, more than half of organisations hadn't even calculated what their automation saved, and average payback for pilots had stretched from 16 to 22 months.

## Where AI agents fit

AI agents can plan, use tools and take actions, which makes them powerful for work that's too varied for rules. It also makes them easy to overuse. Gartner has predicted that more than 40% of agentic AI projects will be cancelled by the end of 2027, because of rising costs, unclear value or weak risk controls. Its advice matches the rule above: agents where decisions are needed, plain automation for routine workflows.

Before giving an agent a process, decide how much it's allowed to do on its own:

- **Read:** it gathers and summarises information. Low risk, useful right away.
- **Recommend:** it proposes an action; a person decides.
- **Orchestrate:** it runs approved workflows and hands exceptions to people.
- **Act:** it executes within explicit limits, with every action logged and reversible.

Move a process up a level only when mistakes would be small, reversible and noticed quickly. I wrote more about this ladder in [digital transformation that sticks](/notes/digital-transformation-that-sticks/).

## Five mistakes to avoid

1. **Automating a broken process.** If the process has five approval loops nobody needs, remove them first. McKinsey's 2026 State of AI survey found that nearly three quarters of the companies getting the most from AI had fundamentally redesigned their workflows, against a quarter of the rest.
2. **Ignoring the exceptions.** The 20% of cases that don't fit often take 80% of the effort. Design their path on day one.
3. **No process owner.** Every automation needs a business owner who notices when it drifts, not just an IT ticket queue.
4. **Building on screens when an API exists.** RPA on a system with a perfectly good API is fragile and expensive.
5. **Measuring go-live instead of results.** Track the hours, errors and cycle time a quarter later. That's the real result.

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
