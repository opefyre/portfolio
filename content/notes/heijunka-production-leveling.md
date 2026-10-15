---
title: Heijunka explained: production levelling with a worked example
date: 2026-10-15
summary: Orders vary from 60 to 160 pieces a day. A level plan makes 100 each day. Follow the finished stock to see how much buffer makes that week work.
seoTitle: Heijunka: production levelling with an example
seoDescription: Learn heijunka with a five-day production plan. Compare uneven orders with level output, change starting stock and follow the first shortage.
status: published
topic: Continuous improvement
keywords: heijunka example, production leveling, production levelling, heijunka vs batch production, level production schedule
---

**Heijunka levels the quantity and mix of production over a defined period.** The aim is to give the process a more repeatable pattern while still responding to customer withdrawals. The [Lean Enterprise Institute's explanation](https://www.lean.org/lexicon-terms/heijunka/) distinguishes levelling volume from levelling product mix.

Monday needs 140 pieces. Tuesday needs 60. Wednesday jumps to 160.

The production team can follow each day's quantity, or make a steadier 100 pieces a day and use finished stock to cover the difference. Both plans make 500 pieces over the week. They need different stock positions along the way.

The quantity example below follows how stock covers the gap between steady output and uneven withdrawals.

## Heijunka example: level production vs daily demand

Our fictional cell makes one product. Customer withdrawals total 500 pieces, spread unevenly across five working days. Net available capacity is 160 accepted pieces a day, after the other time allowances in this example.

For the calculation, each day's production is ready before customers withdraw stock at the end of that day. Materials and people are available, and either daily output plan is feasible. Morning dispatches would need a more detailed timetable.

| Pieces | Monday | Tuesday | Wednesday | Thursday | Friday | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Customer withdrawals | 140 | 60 | 160 | 80 | 60 | 500 |
| Output following withdrawals | 140 | 60 | 160 | 80 | 60 | 500 |
| Level planned output | 100 | 100 | 100 | 100 | 100 | 500 |

The demand-following plan changes daily output between 60 and 160. The level plan holds it at 100. Neither requires more than the stated daily capacity, and both produce the same weekly quantity.

Monday still needs 40 more pieces than the level plan produces that day.

## Calculate the inventory needed for level production

Give both plans 60 pieces of opening finished stock. Under the level plan, Monday starts with 60, produces 100 and supplies 140. Twenty remain.

Tuesday produces 100 and supplies 60, rebuilding the balance to 60. Wednesday then uses that 60 alongside its 100 produced pieces to meet a withdrawal of 160.

| Closing stock with 60 opening pieces | Monday | Tuesday | Wednesday | Thursday | Friday |
| --- | ---: | ---: | ---: | ---: | ---: |
| Demand-following plan | 60 | 60 | 60 | 60 | 60 |
| Level plan | 20 | 60 | 0 | 20 | 60 |

The level plan finishes with its original 60 pieces. It has not produced an extra 60 during the week. That stock was needed before Monday and must be available in the right item and condition.

::interactive heijunka-buffer | Fictional one-product week. Both plans have the same opening stock, withdrawals and 160-piece daily capacity. Production is available before end-of-day withdrawals. A negative net balance means backorders, not negative physical stock. Unfilled orders carry forward until stock is available.

Reduce opening stock to 40 in the control. Monday still works, but Wednesday ends 20 pieces short. Thursday's spare output clears that backlog, but Wednesday's order was still late.

At zero opening stock, Monday already ends 40 short. The plans still have equal weekly output, so a weekly total on its own would conceal the problem.

## Heijunka buffer calculation: cumulative demand and output

For this known sequence, compare cumulative withdrawals with cumulative level production:

| End of day | Cumulative withdrawals | Cumulative level output | Stock needed from before the week |
| --- | ---: | ---: | ---: |
| Monday | 140 | 100 | 40 |
| Tuesday | 200 | 200 | 0 |
| Wednesday | 360 | 300 | 60 |
| Thursday | 440 | 400 | 40 |
| Friday | 500 | 500 | 0 |

The largest gap is 60, so **60 pieces is the minimum opening buffer for this exact daily timing**. Start below it and at least one withdrawal cannot be met on its due day.

This is stock covering a known schedule mismatch. It is not a statistically calculated safety stock. Uncertain demand, defects or delayed production need additional analysis. The [safety-stock note](/notes/safety-stock-reorder-point/) explains that separate uncertainty calculation.

## Quantity levelling is only part of heijunka

One hundred pieces a day says nothing about whether the right products are available. If Monday needs product A and the cell spends the day on B, the total output can be correct while customers still wait.

Mix levelling spreads product types through a feasible repeating pattern. Frequent replenishment depends on the process being able to change product without consuming the time needed to make the next quantity.

The [SMED example](/notes/smed-changeover-smaller-batches/) follows that changeover trade-off.

:::link https://vrolen.com/blog/heijunka-production-leveling/ | See heijunka with more than one product
Vrolen's separate A, A, B, C example builds container quantities and a repeating sequence. It extends the quantity-only example here into product mix.
:::

## Check what would break the pattern

Before trying the level plan, check the actual availability of its 60 opening pieces. Then test withdrawals by time of day, product and location. An end-of-day total cannot promise a morning delivery.

Recheck capacity using the real product sequence, planned work and observed losses. The [takt-time and cycle-time note](/notes/takt-time-vs-cycle-time/) explains the distinction between the pace demand needs and the pace a process can sustain.

Agree how the team handles missed output, urgent orders and a changed [demand pattern](/notes/demand-patterns-trend-seasonality/). If the process keeps making 100 after demand falls, the pattern will build unwanted stock. If it changes after every small variation, the intended stability disappears.

The level plan works for this week with 60 opening pieces and the timing and capacity we assumed. A trial should check whether that steadier release helps the operation and whether customers still receive the products they need when they need them.

## Sources and example notes

- Lean Enterprise Institute. [Heijunka](https://www.lean.org/lexicon-terms/heijunka/). Levelling quantity and product mix over a defined period.

The cell, demand and schedules are fictional. The minimum buffer is calculated for this exact five-day sequence. The model assumes no scrap, production delay, other stock movement or intraday withdrawal. Backorders persist until stock is available; final recovery does not count as on-time service.
