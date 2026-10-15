---
title: Project cost estimation: analogous, parametric and bottom-up
date: 2026-10-15
summary: Eight scanning stations need a budget. Compare a previous rollout, a cost model and a detailed build-up, then see what changes when the scope grows.
seoTitle: Project cost estimation: 3 methods compared
seoDescription: Compare three project cost estimation techniques: analogous, parametric and bottom-up. Work through one rollout and see how scope changes each estimate.
status: published
topic: Project management
keywords: project cost estimation techniques, analogous estimating, parametric estimating, bottom-up estimating, project cost estimate example
---

**Analogous estimating adjusts a comparable project's cost. Parametric estimating uses a relationship between cost and quantities or other drivers. Bottom-up estimating adds the cost of the detailed work.** The choice depends on what you know about the scope and the data behind the numbers. The estimates below cover cost. Activity durations need a separate estimate.

A warehouse needs eight new scanning stations. The sponsor asks for a cost estimate before the team has finished the design.

Someone points to the last rollout. Someone else has a cost per station. The delivery team starts listing equipment, installation and testing. All three can help, but they answer the budget question from different evidence.

## Analogous vs parametric vs bottom-up cost estimation

| Technique | Starting point | What needs checking |
| --- | --- | --- |
| Analogous | A completed project that resembles this one | Differences in scope, conditions, prices and what the old cost included |
| Parametric | An evidenced cost relationship, such as fixed setup plus a cost per station | Comparable data, the model's useful range and whether its drivers still apply |
| Bottom-up | Work packages, quantities, resource rates and supplier prices | Missing work, duplicated costs and assumptions inside each package |

The [UK Infrastructure and Projects Authority guidance](https://www.gov.uk/government/publications/cost-estimating-guidance/cost-estimating-guidance) describes these methods and connects the choice to project maturity and available evidence.

More detail is not automatically more accurate. A detailed estimate can omit training; an old rollout can include it without showing it separately. [APM's estimating guidance](https://www.apm.org.uk/blog/three-ways-to-approach-cost-estimation/) highlights that risk when building a total from smaller estimates.

## Define what the project cost estimate includes

Our fictional rollout covers one existing warehouse, eight scanning stations, configuration, installation, testing, training, coordination and a new security review. Existing network capacity is sufficient. Work happens in normal hours.

The figures are illustrative euros at a common price date, excluding VAT. They exclude building work, a new server, recurring subscriptions and ongoing support. If any of those become necessary, the scope and estimate need updating.

All three estimates cover that scope, so a missing task cannot masquerade as a saving. A [work breakdown structure](/notes/work-breakdown-structure-example/) helps make the deliverables visible before the team prices them.

## Cost estimation example: price the same rollout three ways

**Analogous:** the earlier eight-station rollout cost €18,000. It covered the same work except the new security review. Add €1,200 for that review to reach €19,200. We assume the earlier prices and conditions are comparable; a real estimate would check that.

**Parametric:** suppose comparable rollout records support a fixed €6,500 plus €1,550 per station. For eight stations, €6,500 + 8 × €1,550 = €18,900. The fixed amount includes the common setup work and security review. The relationship is invented for this example, not an industry benchmark.

**Bottom-up:** price the work packages shown below. Hardware and installation vary with station count; the remaining work totals €8,200. Eight stations give 8 × €1,500 + €8,200 = €20,200.

::interactive estimate-builds | Fictional estimates for the same warehouse rollout. Change eight stations to twelve to inspect what each method assumes will grow. The optional extra test work is one explicit scenario, not a complete risk allowance or a confidence range. Values exclude VAT and recurring costs.

The eight-station estimates span €18,900 to €20,200. That span compares three estimates. It is not a probability range for the final cost.

The bottom-up build puts €8,200 against shared work. The parametric model has a €6,500 fixed part and a slightly higher rate per station. It does not say which task explains the difference. Compare the underlying work and conditions before choosing a budget; averaging the totals would leave that difference unexplained.

## What changes when eight stations become twelve?

The analogous estimate adds four stations at an assumed €1,500 each. It reaches €25,200. That adjustment needs evidence too: the old total alone does not tell us what four extra stations will cost.

The parametric estimate becomes €6,500 + 12 × €1,550 = €25,100. The bottom-up estimate becomes €8,200 + 12 × €1,500 = €26,200.

In each case, the example keeps the shared setup work fixed. Multiplying the entire eight-station estimate by 12 ÷ 8 would also scale the security review and other common work, without a reason to do so.

There are limits to keeping those costs fixed. If twelve stations need a second training group or a larger network, update the affected work. Check that the fixed costs still cover the work at twelve stations.

## Cost uncertainty, assumptions and extra-work scenarios

Suppose acceptance testing might need three additional specialist days at €600 a day. That scenario adds €1,800. If extra spending is meant to shorten the schedule, the [fast-tracking vs crashing example](/notes/fast-tracking-vs-crashing/) checks whether the affected work actually controls the finish. The control shows its effect separately so the team can see which work changes.

It is only one possible cost. It does not cover every risk, and there is no evidence here for assigning it a probability. For a real funding decision, develop the wider risk and uncertainty assessment and explain the basis for the range and allowance.

Keep assumptions attached to the estimate: station count, network readiness, access hours, supplier quote validity and the people available for testing. The [assumptions and constraints note](/notes/project-assumptions-vs-constraints/) explains how to distinguish something you expect to be true from a limit you must work within.

## Which method should you use?

Early on, a comparable project may give you a starting point while the details are incomplete. Repeatable work may support a cost model. As scope and supplier information mature, a build-up makes the individual commitments easier to inspect. You can use one method to challenge another.

For this warehouse, compare the shared work first, including training and coordination. Then validate the station rates, the security review and the network assumption. Record the estimate date, scope, exclusions and risks with the resulting figure.

The sponsor can then see what the budget includes and which unresolved items could change it.

## Sources and example notes

- UK Infrastructure and Projects Authority. [Cost Estimating Guidance](https://www.gov.uk/government/publications/cost-estimating-guidance/cost-estimating-guidance). Method selection, evidence, assumptions and uncertainty.
- Association for Project Management. [Three ways to approach cost estimation](https://www.apm.org.uk/blog/three-ways-to-approach-cost-estimation/). Top-down and bottom-up approaches. Its three approaches are not the same three-way classification used here.

All costs, reference projects and rates are fictional. The cost-model records are 4 stations at €12,700, 8 at €18,900 and 12 at €25,100, all with the same scope boundary. They were invented to illustrate the relationship, not fitted from actual projects. Station changes assume no extra shared work within this range. The additional testing scenario is separate from the base costs.
