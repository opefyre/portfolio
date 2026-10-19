---
title: Digital maturity assessment: what does the score actually show?
date: 2026-10-19
summary: Understand digital maturity assessment with a worked evidence profile. See what a DMA score needs, why averages hide gaps and how to choose the next action.
seoTitle: Digital maturity assessment: evidence before scores
seoDescription: Understand digital maturity assessment with a worked evidence profile. See what a DMA score needs, why averages hide gaps and how to choose the next action.
status: published
topic: Digital transformation
keywords: digital maturity assessment, digital maturity, DMA score, digital readiness assessment
---

The warehouse has connected systems, digital dashboards and an AI alert. Yet item codes disagree between the stock system and the reporting database.

A high overall assessment score could sit beside a very unreliable stock decision.

**Digital maturity describes how well an organisation can use digital capabilities in its work. A digital maturity assessment checks that capability against a stated model and evidence.** Here, DMA means Digital Maturity Assessment.

A score is useful only when you know the model, version, unit assessed, date and basis for each answer. It is not a measurement of business performance or an automatic certificate that the systems are safe to trust.

## Use a model you can inspect

The European Digital Innovation Hubs network's [SME questionnaire, version 2.1](https://european-digital-innovation-hubs.ec.europa.eu/system/files/2024-02/DMA%20Questionnaire%20for%20SMEs_EDIH_network_EN_v2.1.pdf) assesses six dimensions. They cover business strategy, readiness, people, data, automation and AI, and environmental use of digital technology.

To obtain an EDIH score, use its full assessment and scoring method. Our shorter example borrows the six areas to organise a warehouse review; it does not reproduce that score.

## Look at the evidence behind the profile

The unit reviewed is one warehouse operation, on 19 October 2026. The team defines ten checks in its own “Warehouse evidence checklist v1”. A check passes only when the named record exists and has been inspected. An unverified check remains open.

| Area | Checks passed | Evidence inspected and gap found |
| --- | ---: | --- |
| Business strategy | 2 of 2 | Operating objective and accountable owner recorded |
| Readiness | 2 of 2 | Access approved and a restore exercise recorded |
| People | 1 of 2 | Training completed; out-of-hours cover not agreed |
| Data | 0 of 2 | Item-code reconciliation fails; event-completeness check missing |
| Automation and AI | 1 of 1 | Alert has a named reviewer, but its inputs still need the data checks above |
| Environmental use | 1 of 1 | Device power-management settings reviewed; no energy-saving outcome inferred |

Seven of ten checks pass: 70% checklist completion. This is a count of our selected checks, not “70% digitally mature”. The checks have different importance, so the percentage cannot authorise the stock decision.

::figure paa-maturity-evidence | Fictional Warehouse evidence checklist v1. Seven selected checks pass and three remain open. The two open data checks are dependencies for using the stock alert. Counts are not EDIH scores, maturity levels or measured business outcomes.

The data weakness can be hidden by an average but remains visible in the profile. A reviewer assigned to an alert cannot repair incorrect item identities by approving it more carefully.

The [data-quality guide](/notes/data-quality-dimensions/) explains how to turn those concerns into inspectable checks. [Data governance](/notes/data-governance-explained/) addresses who owns the definitions and corrections.

## Turn the finding into a next action

For this operation, reconciling item codes comes before expanding the alert. The data owner agrees the matching rule, investigates unmatched records and records the result. The process owner then tests whether the alert is usable for the defined decision.

The cover gap needs a different response. A manager must confirm who can review an exception outside normal hours and what happens when nobody is available. Another training session does not settle that resource decision.

| Finding | Next action | Evidence for the next review |
| --- | --- | --- |
| Item identities disagree | Reconcile the defined item population and resolve exceptions | Unmatched count, corrected records and an accepted rule |
| Cover is missing | Agree hours, responsibility and escalation | Approved cover arrangement tested on an exception |
| Alert inputs remain uncertain | Limit use until the prerequisite checks pass | Trial records showing correct cases, missed cases and review effort |

Keep the original assessment so a later review can distinguish a better process from more generous scoring. Use the same model and scope, or explain the change before comparing results.

## What about five stages or four AI stages?

Different models use different dimensions, stages and scoring rules. A five-stage digital model is not automatically the same as a four-stage AI model. AI capability, software-development process maturity and broad organisational digital maturity assess different things.

For any stage label, ask what evidence moves the unit from one level to the next and which version defines that rule. Avoid comparing a supplier's “level four” with your “level four” until those meanings match.

## Keep the business result separate

Passing the warehouse checks could make an alert more trustworthy. It does not show that stockouts fell, service improved or money was saved. Those need operating measures and a separate comparison.

The [benefits realisation note](/notes/benefits-realisation-automation/) follows that distinction. The [change-management guide](/notes/change-management-adkar-kotter/) covers whether people can use the changed method.

Before commissioning another assessment, decide which decision its findings should improve. For this warehouse, the next useful output is a reliable item record and a tested response to an alert. Repeat the same checks after the corrections, then assess whether the alert helps the stock decision.

## Sources and example notes

- [EDIH SME questionnaire v2.1](https://european-digital-innovation-hubs.ec.europa.eu/system/files/2024-02/DMA%20Questionnaire%20for%20SMEs_EDIH_network_EN_v2.1.pdf), 2024, documented assessment dimensions and questions.

The warehouse, date and ten checks are fictional. The checklist counts selected evidence checks; it does not calculate an official EDIH maturity score.
