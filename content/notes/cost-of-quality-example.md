---
title: Cost of quality: what belongs in the calculation?
date: 2026-10-14
summary: Inspection costs €200. Rework and customer failures cost another €1,500. Follow one monthly ledger to calculate cost of quality and test a prevention proposal.
seoTitle: Cost of quality: formula and worked example
seoDescription: Understand the four cost of quality categories, calculate COQ and COPQ, and test how much failure cost a prevention proposal must remove to break even.
status: published
topic: Operational excellence
keywords: cost of quality, cost of poor quality, COQ formula, COPQ calculation, prevention appraisal internal external failure costs
---

The quality review shows €200 spent on inspection. The rework hours sit in production's report. Return freight sits in logistics. Customer service has been handling complaints between its other jobs.

Look only at the inspection budget and most of the cost stays out of view.

**Cost of quality (COQ) groups the resources used to prevent problems, check conformance and deal with failures.** It includes four categories: prevention, appraisal, internal failure and external failure. [ASQ's explanation](https://asq.org/quality-resources/cost-of-quality) uses this structure to make the wider cost visible.

The point is to understand where the effort goes and which problem deserves attention. Cutting one budget line doesn't establish that the company spends less overall.

## The four cost of quality categories

The department paying the bill doesn't decide the category. The activity does.

| Category | What it covers | Example |
| --- | --- | --- |
| Prevention | Work intended to avoid quality failures | Reviewing a method and practising it before production |
| Appraisal | Checking whether requirements are met | Planned product inspection |
| Internal failure | Dealing with a defect found before customer receipt | Scrap and rework |
| External failure | Dealing with a defect found after customer receipt | Returns and complaint handling |

Under the ASQ convention used here, **cost of poor quality (COPQ) is internal plus external failure cost**. Prevention and appraisal belong in COQ, but not in that narrower COPQ total.

This distinction explains why spending more on prevention can coincide with spending less in total. Whether a particular proposal achieves that depends on what actually happens to failures.

## Build one ledger before comparing proposals

Here is a fictional month's quality-related resource cost for one product family. The figures combine direct expenses and labour valued at stated internal rates. They aren't all additional cash payments.

| Activity | Category | Monthly cost |
| --- | --- | ---: |
| Method review and operator practice | Prevention | €300 |
| Planned inspection | Appraisal | €200 |
| Scrapped material | Internal failure | €200 |
| Rework labour | Internal failure | €400 |
| Return freight | External failure | €150 |
| Incremental replacement cost | External failure | €500 |
| Complaint-handling labour | External failure | €250 |
| Total | Cost of quality | €2,000 |

The internal failure total is €600. External failure adds €900. COPQ is therefore €1,500, or 75% of this example's €2,000 COQ.

:::formula Monthly totals from the same ledger
COQ = prevention + appraisal + internal failure + external failure
COQ = €300 + €200 + €600 + €900 = €2,000
COPQ = €600 + €900 = €1,500
:::

Count each cost once. The €500 replacement line covers incremental replacement resources; it doesn't repeat the scrapped material or include a second warranty credit for the same loss. Ordinary planned production costs sit outside this ledger.

A rejected unit's selling price isn't automatically a cost. Nor can we add a guessed lost sale every time someone complains. Keep those estimates separate if there is a reason to model them, with their assumptions visible.

## Test what extra prevention would need to achieve

Suppose the team proposes an additional €300 of recurring monthly prevention work. Total prevention becomes €600, while planned inspection stays at €200. The comparison assumes the same monthly output, mix and costing basis, with no separate setup investment.

The unknown is the combined cost of internal and external failures. Use the calculator to test it. Changing the input represents an assumption about a future month, not a measured effect of the prevention work.

::interactive quality-cost-threshold | Fictional monthly resource-cost comparison at the same output and mix. Baseline COQ is €2,000. The proposal has €600 prevention and €200 appraisal; its combined internal and external failure cost is an editable assumption. Lower modelled cost is not proof of a cash saving or a successful intervention.

With failure cost at €700, the proposal totals €1,500. That is €500 below the baseline. With failure cost at €1,200, it totals €2,000 and breaks even on this cost comparison.

The extra €300 of prevention therefore needs failure cost to fall by €300, from €1,500 to €1,200, just to offset it. Below €1,200, total modelled cost falls. Above it, total cost rises.

None of that tells us whether the proposed activity can deliver the reduction. A completed training session is evidence of activity; fewer repeat failures at a comparable workload would be evidence toward the intended result.

## Connect the money to the failure

Choose a recurring problem and examine its work history. The [first-pass yield example](/notes/first-pass-yield-vs-final-yield/) shows how eventually accepted output can hide repeated correction. Add the actual time and resources consumed by those repeats before assigning a cost.

For a different single-stage example, [Vrolen's first-pass yield and rework guide](https://vrolen.com/blog/first-pass-yield-rework/) follows 1,000 units through acceptance, repair and scrap. Its numbers are separate from this monthly ledger.

If the proposal is a fixture or an interlock, specify which error it addresses. The [poka-yoke comparison](/notes/poka-yoke-mistake-proofing/) shows why stopping a reversed part doesn't also check its material grade. Costing a device doesn't establish its coverage.

Run a small, defined trial. Record prevention effort, failures, rework and customer outcomes over a suitable period. Check volume and product mix before attributing a lower bill to the change. Retain the required quality checks while the proposal is being tested.

:::link https://www.youtube.com/watch?v=p5687M5EoGM | Watch Vrolen's PDCA worked example
A separate process example shows how to test one change, compare the result with a prediction and decide what to do next.
:::

Labour needs particular care in the result. Removing four hours of rework may free four hours for useful work. It doesn't reduce payroll by four hours if staffing and paid time stay the same. The [benefits realisation note](/notes/benefits-realisation-automation/) explains how to distinguish released capacity from money actually saved.

Start with a ledger small enough to reconcile with the people doing the work and the people holding the costs. It is more useful to understand one recurring loss properly than to present a large total nobody can trace.

## Source

- ASQ. [Cost of Quality](https://asq.org/quality-resources/cost-of-quality). The four categories and the internal/external failure definition of COPQ used here.

All activities, amounts and proposal outcomes are fictional. The example is a monthly resource-cost comparison, not an observed return on prevention spending. No unmeasured reputation cost, lost sale or cash saving is included.
