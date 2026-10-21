---
title: Demand forecasting during stockouts: sales aren't demand
date: 2026-10-14
summary: You forecast 60 units and sell 60. The shelf was empty by lunch. A worked example shows how stockouts can reward the wrong forecast and keep orders too low.
seoTitle: Demand forecasting during stockouts: hidden demand
seoDescription: See how stockouts hide demand and make a weak forecast look accurate. Work through sales, lost demand and the records needed for better replenishment.
status: published
topic: Supply chain
keywords: demand forecasting during stockouts, sales vs demand, lost sales forecasting, censored demand, forecast accuracy, stockout forecasting
---

You forecast 60 units and sell 60. In the planning report, that's a perfect match.

The shelf was empty by lunchtime. Customers who came later couldn't buy the product, so the sales file has nothing to say about them.

Feed that file into the next forecast without checking availability, and 60 can become the plan again. The next order arrives, the shelf empties, and the report keeps making the forecast look good.

Demand forecasting during stockouts starts with this distinction: sales record what customers bought. They can only tell you what customers wanted while the product was available to buy.

::image /notes/demand-forecasting-stockouts/stockout-editorial.webp | A paper shelf with one carton, empty spaces and a short receipt | Sales receipts record purchases; they cannot count customers who found no stock.

## How a lower forecast gets the better score

Take a fictional product with demand of 100 units a day for five days. Customers who can't buy it leave without ordering or choosing a substitute.

The shop has 100 units on Monday and Tuesday, then only 60 a day for the rest of the week. There are no deliveries during the day.

| Day | Customer demand | Units available | Units sold | Demand left unfilled |
| --- | ---: | ---: | ---: | ---: |
| Monday | 100 | 100 | 100 | 0 |
| Tuesday | 100 | 100 | 100 | 0 |
| Wednesday | 100 | 60 | 60 | 40 |
| Thursday | 100 | 60 | 60 | 40 |
| Friday | 100 | 60 | 60 | 40 |
| Total | 500 | 380 | 380 | 120 |

The shop records 380 sales. We know about the other 120 units because we set the demand for this example. In a real stockout, that missing quantity is usually unknown.

Now compare two forecasts issued before the week. A predicts 100 units every day. B predicts 60.

We'll use **WAPE**, or weighted absolute percentage error. Add up the forecast's errors without letting positive and negative misses cancel, divide by the total actual quantity and multiply by 100.

Lower means closer to that quantity. The [MAPE and WAPE comparison](/notes/forecast-accuracy-mape-wape/) explains both measures.

Against sales, A misses by 40 on each of the three stockout days: 120 ÷ 380 × 100 = 31.6%. B misses by 40 on Monday and Tuesday: 80 ÷ 380 × 100 = 21.1%.

| What we compare the forecasts with | A: 100 a day | B: 60 a day |
| --- | ---: | ---: |
| Recorded sales, 380 units | 31.6% WAPE | 21.1% WAPE |
| Demand, 500 units in our example | 0% WAPE | 40% WAPE |

The sales report ranks B first. Yet if we used B to set stock at 60 every day, it would leave 40 units of daily demand unfilled.

The calculation is correct. The score answers how closely the forecast matched sales, including the days when stock limited those sales. That is a different question from how much customers wanted to buy.

## When the shortage reaches the next order

Researchers call this **censored demand**: you observe demand only up to the amount available. If you sell all 60 units, you know demand reached at least 60. You don't know how far beyond it went.

A forecast that ignores this limit can learn the shortage as though it were a demand pattern. If replenishment follows that forecast, the low order can keep producing the same misleading history.

::figure stockout-feedback | How a shortage can repeat when the forecast treats sales as complete demand and the next order follows it. Availability records help identify the limit.

Try changing the stock and forecast below. Demand stays at 100 so you can see the quantity a real sales file would miss.

::interactive stockout-demand | Fictional one-day example with demand fixed at 100 units. Compare the errors against sales and demand as you change the available stock. This illustrates the gap; it does not estimate real lost sales.

Zero sales need the same care. No demand, no stock, a closed shop and a missing record are four different explanations. The [zero-demand accuracy note](/notes/forecast-accuracy-zero-demand/) covers how those differences affect the score.

## What to keep alongside the sales history

Start with when the product was available to the customer. Stock in a warehouse won't help explain an empty shelf if nobody replenished it.

| Record | What it helps explain |
| --- | --- |
| When the item ran out and returned | Which hours allowed a sale |
| Shelf or online availability | Whether customers could actually buy the item |
| Price, promotion and opening hours | Why one day's selling rate may differ from another's |
| Orders, cancellations and backorders | Unmet requests that were recorded; later shipments must not become new demand twice |
| Substitute purchases, where known | Demand that moved to another product |

These checks also belong in a [forecast bias review](/notes/forecast-bias-calculation/). Repeated underforecasting could reflect a weak model, growing demand or a sales history repeatedly capped by stock. A signed error doesn't tell you which explanation fits.

This matters for [Foreviq](/work/foreviq/), the forecasting project I'm working on. Comparing methods only helps if we're clear about what each one predicts: sales, orders or demand assuming the product is available.

## How can you estimate the missing demand?

One starting point is the product's selling rate during comparable hours when it was in stock. Match the weekday, price and promotion before using those hours to estimate what a stockout may have hidden.

Don't just double sales because the product ran out halfway through the day. Morning and afternoon demand can differ, and an unusually busy morning may be why the shelf emptied in the first place.

Keep the original sales and the estimated addition separate. A planner should be able to see how much of the history was observed and how much was reconstructed.

[FreshRetailNet-50K](https://arxiv.org/abs/2505.16319) provides public data for studying this problem: 50,000 store-product series from 898 stores, with hourly sales and stockout annotations. Its authors investigate recovering hidden demand before training a forecast.

A [September 2026 preprint](https://arxiv.org/abs/2609.39397) also studies inventory decisions when stockouts limit the demand you observe. These are starting points for testing a method on your data. The worked example above is fictional; it isn't an analysis of either study's dataset.

## Check the estimate before buying the extra stock

The difficult part is checking a quantity you couldn't observe.

Start with periods when the product stayed in stock. Hide sales above an artificial stock limit and ask the method to recover them. You can then compare its estimate with the sales you held back, keeping the test period separate from the data used to tune the method.

:::card A test you can check
Start with 100 known sales. Show the method only the first 60, along with the imposed stock limit. Check how close its estimate gets to the 40 you hid, then repeat across different days and conditions.
:::

That test checks recovery under a constructed limit. A real stockout can also change what customers do: buy a substitute, wait or shop elsewhere.

When trying the revised forecast in practice, watch what happens to the additional stock. Does it sell at the expected price? Do shortages fall without creating more waste or excess inventory? Compare similar trading conditions so a promotion doesn't get mistaken for a forecasting improvement.

:::link /notes/safety-stock-reorder-point/ | Work out what the demand estimate means for stock
Use the safety stock and reorder point example to include lead time, uncertainty and the service level you need.
:::

Before changing a model because its forecast ran high, check the availability record. It may have been predicting demand that the shop never had enough stock to serve.

## Sources

- Wang and colleagues. [FreshRetailNet-50K](https://arxiv.org/abs/2505.16319), revised 18 June 2026. Stockout-annotated dataset and demand-recovery research. [Original dataset](https://huggingface.co/datasets/Dingdong-Inc/FreshRetailNet-50K).
- Han and colleagues, 30 September 2026. [Towards Optimal Inventory Control under Censored Demand](https://arxiv.org/abs/2609.39397). Preprint.
- Hyndman and Athanasopoulos. [Forecasting: Principles and Practice](https://otexts.com/fpp3/accuracy.html). Forecast evaluation and separate training and test periods.

*The five-day history and calculator are fictional. They assume lost sales, no substitution, no backorders and no deliveries within a day. The recovery test is a suggested way to evaluate a method, not a study carried out for this article.*
