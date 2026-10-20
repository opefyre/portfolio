---
title: Project risk register: probability, impact and reserve decisions
date: 2026-09-29
updated: 2026-10-20
summary: A risk register should help someone make a decision. Follow an ERP example through expected costs, response choices and the difference between two project reserves.
status: published
topic: Project management
keywords: project risk register, expected monetary value, EMV, contingency reserve vs management reserve, probability impact matrix
seoTitle: Project risk register: probability, impact and EMV
seoDescription: Build a project risk register, calculate expected monetary value and distinguish contingency from management reserve. A worked example explains the limits.
---

“Data migration” appears in the risk register. It is marked red. The next meeting brings the same entry, with no decision about the data.

A **project risk register records uncertain events, their possible effects, the people responsible and the response.** It should make the next action clearer. A colour alone won't do that.

Let's follow a fictional ERP replacement. The base cost estimate is €2.4 million over ten months, before risk reserves. The team needs to decide which risks to reduce and what funding to set aside for those that remain.

## Write a risk someone can investigate

Describe the cause, the uncertain event and its effect on the project.

“Because customer records contain unchecked duplicates, migration errors may be found during acceptance testing, delaying go-live and adding up to €120,000 of rework.”

That gives the team something to examine before testing. It also distinguishes the risk from an [issue that has already happened](/notes/project-risk-vs-issue/). Confirmed duplicates are a current issue; the later migration failure is still uncertain.

## Risk register example: keep the financial basis consistent

Here are the assumed exposures before additional responses. Each impact is an extra project cash cost if that event occurs. The amounts exclude costs already in the base estimate.

| ID | Uncertain event and effect | Probability | Extra cash cost if it happens | EMV |
| --- | --- | ---: | ---: | ---: |
| R1 | Migration errors require late rework | 40% | €120,000 | €48,000 |
| R2 | Departure of the integration engineer requires replacement support | 20% | €80,000 | €16,000 |
| R3 | Licence prices rise at the project's planned renewal | 35% | €30,000 | €10,500 |
| R4 | Slow adoption requires extended external support for parallel operation | 30% | €150,000 | €45,000 |
| R5 | Security findings require additional implementation work | 25% | €40,000 | €10,000 |
| O1 | Reusable test scripts reduce an external testing bill | 60% | −€25,000 | −€15,000 |

All probabilities and impacts are fictional. Benefits arriving late would be a different financial effect from an extra support invoice. Keep that distinction when building a real register.

## Use probability and impact to organise the review

A probability-impact matrix can bring important risks into view, provided its scales are defined. It does not calculate their expected cost or establish the right response.

For example, R1 has a larger expected cash exposure than R3. Its timing may also threaten acceptance. Both facts matter when deciding where to spend the team's attention.

[Cox's research on risk matrices](https://doi.org/10.1111/j.1539-6924.2008.01030.x) explains how coarse categories can mis-rank risks. Keep the underlying estimates and consequences beside the colour.

## Calculate expected monetary value

**Expected monetary value**, or EMV, is probability multiplied by financial impact. Use a positive sign for extra cost and a negative sign for an uncertain cost reduction in this example.

:::formula Expected exposure before additional responses
R1: 0.40 × €120,000 = €48,000
Threats R1 to R5: €129,500
Opportunity O1: 0.60 × −€25,000 = −€15,000
Net expected exposure: €129,500 − €15,000 = €114,500
:::

The total is an average under our assumptions. It is not the amount the project will necessarily spend. For R1 alone, the simplified outcome is either no extra cost or €120,000. Neither outcome is €48,000.

The expected values of distinct cost effects can be added even when the events are related. That does not make their relationship irrelevant: a shared cause can make several large costs arrive together. It changes the range of possible totals and the funding needed to cover them.

Check for overlapping impacts before adding anything. If two risks include the same rework invoice, remove the duplication. Don't reduce the funding available for a threat simply because an unrelated saving might occur.

## Contingency reserve vs management reserve

Under the budget convention described in [PMI's reserve paper](https://www.pmi.org/learning/library/model-risk-contingency-reserve-9310), contingency sits within the cost baseline, while management reserve sits outside it and within the overall project budget.

| Reserve | What it is for in that convention | How to control it |
| --- | --- | --- |
| Contingency reserve | Identified uncertainty and the agreed response to it | Record the exposure, trigger, allocation and authority to use it |
| Management reserve | Unforeseen work within the project's scope | Keep the management approval and any transfer into the baseline visible |

The organisation sets the actual approval rules. A reserve does not authorise extra scope or waive purchasing controls. The [project charter](/notes/project-charter-example/) should make the manager's authority clear.

For a budget illustration, suppose management approves €180,000 of contingency and €100,000 of management reserve. These are assumed allocations to explain the structure, not calculated recommendations.

::figure paa2-reserve-bridge | Fictional funding illustration, not a reserve-sizing result. €2.4 million base cost plus €180,000 contingency gives a €2.58 million cost baseline. A separate €100,000 management reserve brings the total budget to €2.68 million.

How much contingency is enough? Our €114,500 net expectation cannot answer that on its own. A reserve of €48,000 for R1 alone would be insufficient whenever its €120,000 event occurs. Under this two-outcome assumption, it covers the outcome only in the 60% of cases where the event does not happen.

To discuss a funding confidence level, model the remaining cost ranges and relevant relationships, then examine the distribution of total cost. [GAO's cost-estimating guidance](https://www.gao.gov/products/gao-20-195g) describes risk and uncertainty analysis for that purpose. Better arithmetic cannot repair unsupported probabilities.

## Compare a response with the exposure left behind

The team proposes a migration rehearsal costing €25,000. Assume, for this example, that credible evidence supports reducing R1's probability from 40% to 10%, with its €120,000 impact unchanged.

:::formula Rehearsal comparison
Without rehearsal: 0.40 × €120,000 = €48,000 expected cost
With rehearsal: €25,000 + 0.10 × €120,000 = €37,000 expected cost
Difference: €11,000 lower expected cost with the rehearsal
:::

The rehearsal is cheaper on expectation under those assumptions. The project still needs the €25,000 for certain and still faces a possible €120,000 event. Update the base plan for the funded rehearsal and assess the residual risk. Don't keep charging the original 40% exposure as though nothing changed.

Other responses might remove risky scope, move a contractual obligation or accept the exposure with a stated trigger. A contract can move some financial consequences while leaving the operating disruption with the project. Check what the response actually changes.

## Give the register a reason to change

Name an owner, the evidence to watch and the decision date for each important entry. For R1, the owner could report duplicate rates, rehearsal results and unresolved mapping defects before the acceptance window.

After the rehearsal, revise the estimate using what was learned. Completion of the activity is not proof that the probability fell to 10%.

Review reserve use with Finance and the sponsor. Close exposures that have passed, investigate new ones and record any approved release or transfer of funding. The register should explain what changed in the plan since the last review.

## Sources and calculation notes

- [PMI: A model to develop and use risk contingency reserve](https://www.pmi.org/learning/library/model-risk-contingency-reserve-9310), Narendra Shrivastava, 2014 conference paper. Reserve distinctions and limits of an EMV-based model.
- [GAO: Cost Estimating and Assessment Guide](https://www.gao.gov/products/gao-20-195g), 2020, risk and uncertainty analysis.
- [Cox: What's wrong with risk matrices?](https://doi.org/10.1111/j.1539-6924.2008.01030.x), 2008. Limits of categorical risk ranking.

The project, estimates, events, reserve allocations and proposed probability reduction are fictional. The budget bridge explains a stated convention. No cost distribution or funding confidence level has been estimated for this project.
