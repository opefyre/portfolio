---
title: Build vs buy software: compare configuration, cost and upkeep
date: 2026-10-15
summary: A warehouse needs an approval workflow. Before choosing a new app or a custom build, compare what each route solves and what the team will have to maintain.
seoTitle: Build vs buy software: cost and configuration
seoDescription: Compare building, buying and configuring software through one warehouse workflow. Check requirements, support, integrations and costs over three to eight years.
updated: 2026-10-24
status: published
topic: Digital transformation
keywords: build vs buy software, configure vs customize, software build buy decision, software total cost of ownership
---

**Build vs buy is a decision about how to obtain and maintain software for a particular need.** Building creates a tailored solution. Buying uses an existing product. Configuration changes supported settings; customisation changes or extends behaviour through code.

Those options overlap. A bought product may need configuration and custom interfaces. A custom application may run on rented services. Work out which parts your team will have to maintain after go-live.

Consider a warehouse approval process. Staff email stock adjustments to a supervisor, then re-enter the approved quantity in the inventory system. Requests get lost between the inbox and the stock record.

The need is specific: submit an adjustment, route it to the right approver, post it once and retain an audit trail. Start there before comparing software names.

## Compare the same requirement across four routes

Our fictional warehouse has four options. The smallest change enables a workflow already available in its current system. A larger configuration uses an additional supported module. A separate bought app needs an interface. A custom build provides its own workflow and integration.

| Route | What must be demonstrated | Who maintains the extra work? |
| --- | --- | --- |
| Enable an existing workflow | Approval limits and audit history fit the need | Current system owner, with its existing support route |
| Configure an additional module | Supported settings cover the required exceptions | System owner maintains rules and tests upgrades |
| Buy a separate app | Approvals and stock posting work across both products | Supplier supports its app; customer owns the interface arrangement |
| Build a custom workflow | The whole journey works, including failed and repeated requests | Named development and operating teams |

For this example, assume all four can meet the essential need after their stated work. Without that assumption, a cost ranking would compare a working solution with an incomplete one.

[GOV.UK's purchasing guidance](https://www.gov.uk/guidance/define-your-purchasing-strategy) recommends examining needs, available products, internal capability and full lifecycle costs. The warehouse example uses those purchasing questions, without applying the government procurement process.

## Configuration vs customisation: check the boundary

Setting an approval threshold in a supported settings screen is configuration. Writing an extension that changes how stock postings are created is customisation. Either can require testing and someone who understands the rules.

Ask the supplier to demonstrate an awkward case: an approver rejects a request, an interface times out, and the requester tries again. Check that stock is not posted twice and that the audit trail explains what happened.

The [SIT and UAT note](/notes/sit-vs-uat/) separates checking the connection from checking the business outcome. Both belong in the comparison. A demonstration where nothing fails would miss the retry and rejection cases.

Vrolen's [manufacturing software guide](https://vrolen.com/blog/manufacturing-software-guide/) is useful when this decision spans several factory applications and their operating responsibilities.

## Where low-code and no-code fit

Low-code tools let people assemble an application visually and add code where the platform supports it. No-code tools aim to cover their supported work without the user writing code. [Microsoft describes the two approaches](https://www.microsoft.com/en-us/power-platform/products/power-apps/topics/low-code-no-code/low-code-no-code-development-platforms) this way. Python is a programming language, rather than a low-code platform by itself.

For the warehouse, a visual tool might provide the request form and approval route. The team still needs to demonstrate correct stock posting after a timeout or retry. If that requires a custom interface, include its testing and upkeep even when nobody writes code for the form.

A low-code product can sit in either the bought-app or custom-workflow route. Record its licences, connectors, permissions, support owner and exit method. The label does not settle the five-year cost or remove the work of operating it.

## Worked cost comparison: what changes over time?

The figures below are assumed additional cash payments, in thousands of euros. Existing system costs common to every route are excluded. Each upfront amount includes setup and integration; annual costs include the additional support and service payments assumed for that route.

Every option also has a separate exit cost paid at the selected horizon. No other residual value is assumed. These are fictional quotes, not market price estimates.

::interactive software-route-cost | Fictional comparison of additional cash costs in €000. Change the service horizon from three to eight years. Totals include upfront, annual and exit payments once each. No discounting, benefits or internal staff capacity is priced here.

At five years, the smallest change costs €50,000. The configured module costs €70,000, the separate app €105,000 and the custom build €122,000 under these assumptions.

That makes the existing workflow the lowest cash-cost route in this example. Quality, delivery time and future flexibility still need comparison.

The [procurement savings example](/notes/when-procurement-savings-increase-total-cost/) follows the same principle with suppliers: include the cost that moves elsewhere when the quoted price falls.

## Add the commitments that the price leaves out

Keep internal staff capacity separate from the cash table. Who must configure the rules, support users and retest an upgrade? An existing employee's time still matters even when it creates no additional payroll payment.

Check how each route handles data export, termination, interfaces and future rule changes. A supplier's application support may exclude your custom extension. A build contractor may finish the project without agreeing to operate the service.

Record those responsibilities alongside the requirements. The [handover note](/notes/project-handover-checklist/) shows what needs to transfer to the operating owner. If a custom shortcut makes later changes harder, the [technical debt example](/notes/technical-debt-explained/) helps estimate that consequence.

## Make a decision someone can revisit

For this warehouse, test the existing workflow first because it is assumed to meet the need at the lowest incremental cash cost. Reject it if it cannot separate requesting from approving, or cannot recover correctly after an interface failure.

Record the chosen scope, evidence, cost horizon and operating owner. State what would trigger another review, such as a major volume change or a supplier ending support.

Leave the next team a record of what was chosen, which work remains theirs and why the decision made sense.

## Sources and example notes

- GOV.UK. [Define your purchasing strategy](https://www.gov.uk/guidance/define-your-purchasing-strategy), needs, build/buy choices, configuration and lifecycle support.
- GOV.UK. [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice), the wider government technology context.

The warehouse, option fit and all costs are fictional. The cost comparison is undiscounted and excludes benefits, tax, financing and internal labour valuation. Use [NPV alongside payback](/notes/npv-vs-payback/) when comparing investment value and cash timing.
