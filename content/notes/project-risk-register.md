---
title: A project risk register that drives decisions: probability, impact and expected monetary value
date: 2026-09-29
summary: How to write risks people can act on, score them on a probability and impact matrix, turn them into expected monetary value, size a contingency reserve, choose responses (including for opportunities), and use EMV to decide whether a mitigation is worth paying for.
status: published
topic: Project management
keywords: risk register, project risk management, probability impact matrix, expected monetary value, EMV, contingency reserve, risk response strategies, risk assessment, decision tree, PMP
---

Most risk registers are written once, at kickoff, and then left to age. They list vague worries ("resources", "scope creep", "vendor issues"), each tagged red, amber or green, and nobody makes a decision because of them.

A useful risk register does three jobs. It says clearly what could happen. It puts a size on it, ideally in money and days. And it forces a decision: do something, or consciously accept it. This note builds one for a real-world style project, and shows how a little arithmetic turns it into budget and design decisions.

:::card The short version
- Write each risk as **cause → event → effect**, so it's specific enough to act on.
- Score **probability** and **impact** on defined scales, and plot them on a matrix to see what matters.
- Multiply probability by impact in money to get **expected monetary value (EMV)**. Add them up to size a contingency reserve.
- Choose a response for every risk: **avoid, transfer, mitigate or accept**. Opportunities get their own: **exploit, share, enhance or accept**.
- Use EMV to decide whether a mitigation is worth its cost.
:::

## Write risks you can act on

"Data migration" is a topic, not a risk. A good risk statement names a cause, an uncertain event and an effect on the project's objectives:

:::formula Risk statement
Because **[cause]**, **[uncertain event]** may happen, which would lead to **[effect on objectives]**.
:::

For example: *Because the legacy customer data has never been cleaned, migration errors may be found late in testing, which would delay go-live by up to six weeks and cost about €120,000.*

That sentence tells you what to watch (the data quality), when it would bite (testing), and what's at stake. It also tells you what a response could target: the cause.

## The example project

A mid-sized company is replacing its ERP system. Budget €2.4 million, go-live in 10 months. The team's risk register, after a workshop:

| ID | Risk | Probability | Impact | EMV |
| --- | --- | --- | --- | --- |
| R1 | Uncleaned legacy data causes migration errors late in testing, delaying go-live | 40% | €120,000 | €48,000 |
| R2 | The key integration engineer leaves mid-project, slowing interfaces | 20% | €80,000 | €16,000 |
| R3 | The vendor raises licence prices at renewal | 35% | €30,000 | €10,500 |
| R4 | Users keep old spreadsheets, so benefits arrive months late | 30% | €150,000 | €45,000 |
| R5 | The security review finds gaps that need rework | 25% | €40,000 | €10,000 |
| O1 | Existing test scripts can be reused, saving effort | 60% | −€25,000 | −€15,000 |
| | **Total expected value** | | | **€114,500** |

O1 is an opportunity: an uncertain event that would *help*. It belongs in the same register, with a negative value.

## Probability and impact, on defined scales

"High" means different things to different people, so define the scales before anyone scores:

| Level | Probability | Impact (cost) |
| --- | --- | --- |
| Very low | 10% or less | Under €10,000 |
| Low | 11% to 25% | €10,000 to €49,999 |
| Medium | 26% to 39% | €50,000 to €99,999 |
| High | 40% to 69% | €100,000 to €149,999 |
| Very high | 70% or more | €150,000 or more |

Most projects also score impact on schedule, quality or reputation, and take the worst of them. Then plot every risk on the matrix:

::figure risk-heatmap | The register on a probability and impact matrix. R1 (data migration) and R4 (low adoption) sit in the red zone and need a response now. O1 is an opportunity worth chasing.

The matrix is good for one thing: making the few big risks visible at a glance, so the steering committee spends its time on R1 and R4, not on R5.

Don't ask more of it than that. Tony Cox showed that typical risk matrices can rank risks wrongly, sometimes putting a smaller risk above a bigger one, and in some cases do worse than random. Use the matrix to spot what needs attention, and numbers to decide.

## Expected monetary value

The matrix ranks risks. EMV sizes them:

:::formula Expected monetary value
EMV = probability × impact
R1: 40% × €120,000 = **€48,000**
Register total: 48,000 + 16,000 + 10,500 + 45,000 + 10,000 − 15,000 = **€114,500**
:::

EMV isn't what any single risk will cost. R1 will cost either nothing or €120,000, never €48,000. But across a portfolio of risks, the sum of EMVs is a reasonable estimate of what the known risks will cost on average. That makes it a defensible starting point for a **contingency reserve**: here, about €115,000, or 4.8% of the budget.

For a big project, go one step further. Model the uncertain costs and durations as ranges and run a Monte Carlo simulation. It gives you a probability curve instead of a single number: "we have a 70% chance of finishing under €2.55 million". The U.S. Government Accountability Office's schedule guide describes Monte Carlo simulation as an accepted way to size schedule reserves on large programs.

## Choosing responses

Every risk needs an owner and a response. There are four standard responses for threats, and four mirror images for opportunities:

| Threats | What it means | Example |
| --- | --- | --- |
| Avoid | Change the plan so the risk can't happen | Don't migrate 10 years of closed orders at all; archive them |
| Transfer | Shift the impact to someone else, usually at a price | A fixed-price clause for the integration work |
| Mitigate | Reduce probability or impact | A full migration rehearsal two months before go-live |
| Accept | Consciously do nothing, and keep a reserve | Accept R3's licence risk; it's in the contingency |

| Opportunities | What it means | Example |
| --- | --- | --- |
| Exploit | Make sure it happens | Assign a tester to adapt the old scripts in week one |
| Share | Partner with someone better placed to capture it | Share the saving with the vendor if they supply scripts |
| Enhance | Raise its probability or size | Reuse scripts for regression testing after go-live too |
| Accept | Take it if it comes | Don't plan for it; enjoy it if it happens |

Accepting is a legitimate choice. What's not legitimate is accepting by accident, because nobody decided.

## Is the mitigation worth it?

Here's where EMV earns its place. The team proposes a full data migration rehearsal for R1. It costs €25,000 and, based on similar projects, would cut the probability of late migration errors from 40% to 10%.

:::formula Compare the two options
Without the rehearsal: expected cost = 40% × €120,000 = **€48,000**
With the rehearsal: €25,000 + 10% × €120,000 = **€37,000**
Expected saving from rehearsing = **€11,000**
:::

The rehearsal costs money for certain, yet it's the cheaper option on average, and it also narrows the range of outcomes, which matters to a sponsor who can't absorb a six-week slip. The same logic works in reverse: some mitigations cost more than the risk they address, and accepting is the better decision.

## Keep it alive

A risk register is only as good as its last review:

1. **Review the top risks at every steering meeting**, not the whole list. Five minutes, with owners reporting.
2. **Update probability and impact as you learn.** After the migration rehearsal, R1's probability genuinely drops. Show it.
3. **Close risks that have passed**, and release their share of the contingency.
4. **Add new risks as they appear**, especially after every surprise. A surprise means a risk nobody wrote down.
5. **Track the triggers.** For R1, the trigger is "more than 2% of test records fail validation". Agree in advance what happens when it fires.

Risk management isn't pessimism. It's the part of planning that deals honestly with what you don't know yet.

:::link /notes/fmea-step-by-step/ | The same idea for processes: FMEA
Failure mode and effects analysis applies this thinking to how a process could fail, before it does.
:::

## Sources

- U.S. Government Accountability Office (2015). [Schedule Assessment Guide](https://www.gao.gov/products/gao-16-89g) (GAO-16-89G), best practice 8: schedule risk analysis.
- NASA (2024). [Risk Management Handbook, version 2.0](https://ntrs.nasa.gov/citations/20240014019).
- Goodman, R. (2005). [The ascent of risk](https://www.pmi.org/learning/library/ascent-risk-pmbok-guide-7618). PMI Global Congress. On response strategies for threats and opportunities.
- Gump, A. (2001). [Using decision models in the real world](https://www.pmi.org/learning/library/expected-monetary-value-choices-risk-impact-3490). *PM Network*. On expected monetary value and decision trees.
- Cox, L. A. (2008). [What's wrong with risk matrices?](https://doi.org/10.1111/j.1539-6924.2008.01030.x) *Risk Analysis*, 28(2).

*The project and its figures are illustrative.*
