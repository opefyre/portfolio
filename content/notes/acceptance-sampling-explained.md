---
title: Acceptance sampling explained: examples, AQL and the OC curve
date: 2026-10-15
summary: One nonconforming item in a sample of fifty can still lead to lot acceptance. See what that decision means, and how sample size changes the risks on both sides.
seoTitle: Acceptance sampling: example, AQL and OC curve
seoDescription: Learn acceptance sampling with a 1,000-unit lot. Explore an interactive OC curve, sample size, acceptance counts, AQL and producer and consumer risk.
status: published
topic: Operational excellence
keywords: acceptance sampling explained, acceptance sampling example, AQL meaning, operating characteristic curve, producer consumer risk
---

**Acceptance sampling uses a sample from a lot to make an accept-or-reject decision under a stated plan.** Acceptance under that plan does not mean every uninspected unit is good.

Receiving checks fifty items from a delivery of a thousand. One fails the agreed requirement. The sampling rule allows at most one, so the lot passes.

That result can sound contradictory. A nonconforming item was found, yet the lot was accepted. The distinction is between a rule for deciding what to do with the lot and evidence about every item inside it.

[NIST's introduction](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm) defines the purpose as deciding whether to accept a lot, rather than estimating its quality. The measurement method matters too. The [Gage R&R note](/notes/gage-rr-explained/) examines variation in numerical readings. Pass/fail classifications need their own agreement check before the counts can be trusted.

## Acceptance sampling plan: sample size n and acceptance count c

Take a fictional, non-destructive inspection of 1,000 identical clips. Each clip either meets the stated dimensional requirement or does not. Count nonconforming **units**, not the number of faults found on each one.

Select fifty distinct clips randomly across the entire lot. The plan is written **n = 50, c = 1**: inspect fifty and accept the lot if the sample contains no more than one nonconforming clip.

| Sample result | Decision under this teaching plan | What the result does not tell us |
| --- | --- | --- |
| Zero nonconforming clips | Accept the lot | That the other 950 all conform |
| One nonconforming clip | Accept the lot | That exactly 2% of the whole lot is nonconforming |
| Two or more | Reject the lot | That every clip is unusable |

The known failed clip still needs the agreed segregation and disposition. Lot acceptance does not authorise shipping a known nonconforming item. Rejection may lead to return, sorting or another approved response; it does not automatically mean scrapping every unit. The [8D report example](/notes/8d-report-example/) follows a customer complaint through containment and a verified correction.

This is an invented plan for learning. It is not an ISO sampling table or a recommended release rule.

## Acceptance sampling example: calculate lot acceptance

To examine the plan, imagine knowing the actual number of nonconforming clips in each 1,000-unit lot. That knowledge is available to our calculation, not to the receiving inspector.

A random sample can miss some or all of those clips. The chance of acceptance therefore changes gradually as the lot gets worse.

| Actual nonconforming units in the lot | Actual lot fraction | Chance that n = 50, c = 1 accepts it |
| --- | --- | ---: |
| 10 of 1,000 | 1% | 91.47% |
| 50 of 1,000 | 5% | 27.17% |
| 100 of 1,000 | 10% | 3.08% |

These are exact finite-lot probabilities for random sampling without replacement, calculated with the [hypergeometric distribution](https://www.itl.nist.gov/div898/software/dataplot/refman2/ch8/hyppdf.pdf). They assume the inspection classification is correct.

The 5% lot can pass even though it contains fifty nonconforming clips. Its 27.17% acceptance probability is not a 27.17% estimate that the delivery is good. It describes how often this plan would accept a lot with that known composition over repeated random selections.

## OC curve: sample size and acceptance probability

An **operating-characteristic curve**, or OC curve, plots the chance of accepting a lot against its actual nonconforming fraction. NIST's [sampling-plan guide](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc22.htm) defines it alongside the risks for the supplier and customer.

Compare samples of fifty and a hundred below. Both use the same selected acceptance count. The lot stays at 1,000 units.

::interactive sampling-oc-curve | Fictional 1,000-unit lots and example plans. Probabilities use exact random sampling without replacement and correct unit classification. The 1% and 10% lot levels are chosen teaching references. Use the applicable approved plan for an actual release decision.

With c = 1, increasing n from fifty to a hundred lowers the chance of accepting a 10% nonconforming lot from 3.08% to about 0.02%. It also lowers acceptance of the 1% lot from 91.47% to 73.63%.

That second change is important to the supplier. More inspection with the same acceptance count makes the rule stricter at both quality levels.

## AQL, LTPD, producer's risk and consumer's risk

**AQL**, or acceptable quality level, is a reference quality level used when designing or selecting a sampling scheme. It is not permission to put that percentage of known faulty units into each shipment.

For the teaching comparison, use 1% as the AQL reference and 10% as the **lot tolerance percent defective**, or LTPD: a poor-quality reference the customer wants a low chance of accepting.

| Risk | Question at the chosen reference | n = 50, c = 1 |
| --- | --- | ---: |
| Producer's risk, alpha | How often does the plan reject a lot at the 1% AQL reference? | 8.53% |
| Consumer's risk, beta | How often does the plan accept a lot at the 10% LTPD reference? | 3.08% |

Those risks apply at their stated quality levels. They do not tell the inspector the chance that this particular accepted delivery contains a faulty clip.

Set acceptable risks and follow the applicable customer agreement, specification and approved inspection scheme when choosing a real plan. Changing n while leaving c untouched is a different plan, not a harmless way to “check a few more”.

## Use the inspection result for its intended decision

Random selection matters. Taking the top fifty clips from one carton does not give the same coverage as a random sample across a mixed delivery. Preserve lot identity and the sampling method in the inspection record.

Keep the unit requirement, n, c, observed count and lot disposition together. If the result is uncomfortable, follow the agreed escalation procedure. Repeating samples until one passes changes the decision rule and its risks.

Sampling answers a question about this lot. The [control-chart note](/notes/control-charts-explained/) examines behaviour over time. Vrolen's [manufacturing control-chart guide](https://vrolen.com/blog/control-charts-manufacturing/) uses a separate reject-count example to show how to investigate a process signal.

Record “accepted under n = 50, c = 1; one nonconforming unit found”, so the next person can understand how the lot decision was made.

## Sources and example notes

- [NIST: What is acceptance sampling?](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm). Purpose and random selection.
- [NIST: Lot acceptance sampling plans](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc22.htm). Acceptance count, OC curves, AQL, LTPD and risks.
- [NIST Dataplot: Hypergeometric probability](https://www.itl.nist.gov/div898/software/dataplot/refman2/ch8/hyppdf.pdf). Finite-population sampling without replacement.

All lots, plans and quality levels are fictional. The calculation concerns incoming lot composition; it does not model sorting, replacements, outgoing quality or inspection errors.
