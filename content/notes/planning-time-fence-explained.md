---
title: Planning time fences: frozen schedules and MRP changes explained
date: 2026-10-15
summary: Next week's demand changes after materials and people have been committed. Follow what the planning run can change, what stays protected and what needs an exception.
seoTitle: Planning time fences: frozen schedules explained
seoDescription: Understand planning time fences with a six-week example. Compare frozen and open periods, inspect excess or shortages, and handle a reviewed exception.
status: published
topic: Supply chain
keywords: planning time fence explained, frozen production schedule, MRP time fences, frozen slushy liquid zones, planning fence vs demand fence
---

**A planning time fence marks a near-term period in which the planning system restricts changes to supply proposals.** The purpose is to protect commitments already being prepared or executed. The system settings and your planning policy determine which changes are restricted.

A workshop has prepared kits and booked people for next week's 100 assemblies. Then the forecast falls to 60. The next planning run wants to cut the batch.

That might be the right change. Someone still needs to check what has already been committed, what can be stopped and what happens to the unused material.

The [material requirements planning (MRP) example](/notes/material-requirements-planning-example/) explains the quantities and dates behind a supply proposal. A time fence adds a rule about when that proposal may change automatically.

## Frozen, slushy and liquid planning periods

Teams often describe their horizon in three zones. These are useful policy labels, rather than universal ERP settings. ERP means enterprise resource planning: the business system holding orders, stock and production records.

| Zone | Example operating rule | What a change needs |
| --- | --- | --- |
| Frozen | Keep the near-term quantity and date through the next automatic run | A named owner reviews exceptions and affected commitments |
| Slushy | Allow some changes within agreed limits | Check which materials, sequences or resources may move |
| Liquid | Allow more of the future plan to be recalculated | Still check lead times, supply and capacity before release |

A frozen plan can be changed deliberately. The policy should make the decision visible, with someone responsible for its consequences.

[Oracle's time-fence documentation](https://docs.oracle.com/cd/A60725_05/html/comnls/us/mrp/tfctrl.htm) connects these restrictions to the increasing disruption caused by near-term changes. Its detailed rules vary by order type. For example, that documented discrete-item planning fence can still permit postponement or cancellation of excess supply.

So “inside the fence, nothing ever changes” is too broad. Check the actual settings and order status before relying on the label.

## Planning fence vs demand fence vs firming

Several settings can use a number of days while controlling different things.

| Setting or term | Main question |
| --- | --- |
| Planning or freeze fence | Which near-term supply proposals may the planning run change? |
| Demand fence | Which demand inputs should drive the near-term calculation? |
| Firming or release horizon | When are proposals converted or released into operating orders? |
| Planning horizon | How far ahead are requirements considered? |

[Microsoft's master-plan guide](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/master-plans) separates freeze, firming and coverage settings. Oracle's documentation separately describes a demand fence that changes how forecasts are considered. The names are related, but the settings are not interchangeable across products.

This is also different from saving a forecast version before scoring its [MAPE or WAPE](/notes/forecast-accuracy-mape-wape/). A frozen forecast preserves what was predicted. A planning fence controls changes to the proposed work.

## Planning time fence example: 100 pieces becomes 60

Our fictional workshop is at the start of week 1. Its six-week plan has one receipt of 100 finished pieces per week, available before that week's requirement. Opening stock is zero.

The revised requirements are 100 each week except week 2, which falls to 60. The local freeze policy protects quantities and receipt weeks through the end of week 2.

| Week-2 view | Planned receipt | Revised requirement | Projected balance after week 2 |
| --- | ---: | ---: | ---: |
| Original plan compared with the new requirement | 100 | 60 | 40 |
| Automatic run under this freeze policy | 100 | 60 | 40 |
| Separately reviewed exception, if feasible and authorised | 60 | 60 | 0 |

The 40-piece excess remains visible while someone decides whether to change the committed batch.

## Compare a change inside and outside the fence

Move the changed requirement to week 4. With the fence ending in week 2, the example lets that planned receipt fall to 60 automatically. Extend the fence through week 4 and the same change needs an exception again.

::interactive planning-fence-calendar | Fictional six-week plan in pieces, with zero opening stock. The fence includes its final week. Only the selected receipt can change; balances are projected. The exception view assumes the change can be made and has been approved.

Try increasing the selected requirement to 140. A protected 100-piece receipt now leaves 40 uncovered. That shortage must remain visible even when the system is prevented from changing the supply proposal.

A negative projected balance means a shortage against requirements, not negative physical inventory. Later receipts cover their own unchanged requirements, so this small replay carries the gap forward until a separate change resolves it.

## Handle a frozen-schedule exception without hiding its cost

For the original reduction, ask what is already released, purchased, made or booked. Check whether reducing the batch actually avoids work or simply moves prepared material back into storage.

Record the affected order, proposed change, reason, related commitments and approving owner. Then update the relevant systems together. An approved schedule change that never reaches the shop floor leaves two versions of the plan in use.

For the increase, check where the extra 40 can come from and when. The [ATP vs CTP example](/notes/atp-vs-ctp/) separates existing available supply from a new production option. A requirement inside the fence does not create the capacity to satisfy it.

:::link https://vrolen.com/blog/production-scheduling-optimization/ | Check the commitments behind a proposed schedule change
Vrolen's scheduling guide covers materials, skills, tooling, maintenance and competing work that can make an apparently free slot unusable.
:::

## Choose and review the fence length

Start with how long the operation needs to prepare and change work: materials, supplier commitments, setup, staffing and approvals. Product families may need different rules.

Too short a fence can leave execution chasing frequent revisions. Too long a fence can protect supply that no longer matches demand. Keep the excess, uncovered requirements and exception workload visible alongside schedule stability.

As each planning date advances, the near-term boundary advances too. Review the rule when lead times or operating conditions change. Repeated exceptions deserve a discussion in the [S&OP process](/notes/sales-operations-planning-explained/), where demand and supply choices can be resolved beyond the next batch.

For this workshop, begin with week 2's 40-piece difference. Decide whether to retain the batch or authorise a feasible change, and leave the revised requirement visible either way.

## Sources and example notes

- [Oracle: Time Fence Control](https://docs.oracle.com/cd/A60725_05/html/comnls/us/mrp/tfctrl.htm). Established concepts and the documented product's demand, planning, release and firm-order rules. This older manual is not a claim about current ERP defaults.
- [Microsoft Learn: Master plans overview](https://learn.microsoft.com/en-us/dynamics365/supply-chain/master-planning/master-plans). Distinct freeze, firming and coverage horizons. Verify behaviour against the actual planning engine, version and configuration.

The workshop, quantities, six-week horizon and strict freeze policy are fictional. The replay changes one receipt only. It leaves other receipts fixed and does not recalculate the full material or capacity plan.
