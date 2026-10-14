---
title: ABC inventory analysis: when to add XYZ
date: 2026-10-14
summary: Two A items can need very different planning. Classify eight stock items by value and demand variation, then see why a cheap spare still needs attention.
seoTitle: ABC inventory analysis: when to add XYZ
seoDescription: Learn ABC and XYZ inventory analysis with a worked example and interactive matrix. Compare annual usage value, demand variation and critical spare parts.
status: published
topic: Supply chain
keywords: ABC inventory analysis, ABC XYZ analysis, inventory classification example, annual consumption value, XYZ analysis
---

Suppose a factory uses €48,000 of label rolls and €32,000 of cartons over a year. In its inventory report, both are A items and get more attention from planning.

The labels move at a steady rate. Carton use is fifteen times as high in December as in January. That difference matters when deciding when to place orders.

**ABC inventory analysis** groups items by their contribution to a chosen value measure. **XYZ** adds how much their demand varies over time. Together, they help you decide which items need a closer look and what to look at.

We'll use annual consumption value for ABC: the quantity used over a year multiplied by its unit cost. XYZ will use monthly quantities. Here's how that works for eight fictional stock items.

## How to calculate ABC inventory classes

Start with the same 12 months for every item. Calculate each item's annual consumption value, sort from highest to lowest, then work down the list adding up each item's share of the total.

For the label rolls, 12,000 rolls used × €4 per roll = €48,000. Cartons add €32,000. Together, they account for €80,000 of the catalogue's €100,000 annual consumption value.

In this example, A covers the first 80% of value, B the next 15%, and C the remaining 5%. Those are chosen boundaries, not a law about how inventory must behave.

::interactive abc-inventory-value | Fictional catalogue, January to December of one year. Values are annual quantities used multiplied by fixed unit costs. They are not the value of stock currently on hand. Open the calculation table for inputs and cumulative shares.

Two of eight items account for 80% of value here. Your catalogue might need ten items or a thousand to reach that share. Don't assign 20% of your items to A just because you've heard of the 80/20 rule.

Also check what your report calls “value.” Ranking annual usage, revenue or current stock value answers different questions. [SAP's ABC/XYZ documentation](https://help.sap.com/saphelp_SCM700_ehp02/helpdata/en/4d/33d92edb9e00d3e10000000a42189b/content.htm) describes several possible bases; this example sticks to annual consumption value.

That ranking gives us a sensible place to focus attention. It doesn't yet explain the difference between the labels and cartons.

## What XYZ adds to ABC analysis

XYZ separates items with relatively steady use from items with larger swings. A common calculation is the [coefficient of variation](https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm), or CV: standard deviation divided by the average. It compares the size of the fluctuations with the item's own usual volume.

For the tape rolls, monthly use repeats 50, 100 and 150. The monthly average is 100 rolls. Standard deviation measures the spread around that average; here, it is about 40.8 rolls. So CV = 40.8 ÷ 100 = 0.408, or 40.8%.

We'll call CV up to 25% X, above 25% through 50% Y, and above 50% Z. These cutoffs are choices too. Under them, the steady label rolls are AX and the cartons are AZ.

Choose a cell below to inspect its items. You can change the boundaries and see which classifications move. The quantities and costs stay the same.

::interactive abc-xyz-inventory | Fictional example using the same eight items and 12 months. ABC measures annual consumption value; XYZ measures variation in monthly units. No trend or seasonal adjustment is applied. A critical-spare flag is kept separate from both classifications.

The labels use 1,000 rolls every month. Cartons rise from 500 to 7,500 a month, with a CV of 80.4%. Both deserve attention because of their annual usage value, but the carton plan needs to explain that rise before carrying an average month forward.

Changing the XYZ cutoffs to 50% and 100% moves cartons from AZ to AY. It hasn't made their demand any easier to plan. It has changed the label we put on the same history.

## A Z item isn't automatically hard to forecast

Large swings can have an explanation. A product used mostly before Christmas may vary sharply across the year while following a pattern that helps a planner prepare.

Raw CV counts that seasonal movement as variation. It doesn't check whether a forecast could have anticipated it. SAP's [MRP Monitor guide](https://help.sap.com/doc/327665004b9b4a8ba32106040dd7499f/2024.1/en-US/MRP-EN.pdf#page=38) explicitly discusses removing seasonal effects before XYZ analysis for this reason.

Our carton history rises within one year. That's enough to show variation, but it doesn't establish a recurring seasonal pattern. We'd need more history and information about orders, promotions or production plans to explain it.

To judge a forecast, compare predictions made in advance with what happened later. [MAPE and WAPE](/notes/forecast-accuracy-mape-wape/) are two ways to measure those errors. CV measures the variation in actual quantities, so it cannot replace that test.

This distinction also matters for [Foreviq](/work/foreviq/), the forecasting project I'm working on. A demand class can guide which methods to investigate. It doesn't establish which method will forecast an item best.

## Why a cheap spare can still need close attention

The drive fuses sit in CZ: €500 of annual consumption value and ten months with no use. On those two measures, they look like an obvious place to spend less planning time.

Now add one more fact to our fictional example: without a replacement fuse, a machine cannot run. The approved part takes six weeks to arrive, and there is no approved substitute available.

That deserves a separate review, even though its ABC and XYZ classes remain correct.

| Item | What the classification shows | What to check before setting stock |
| --- | --- | --- |
| AX label rolls | High annual value, steady monthly use | Delivery reliability and how often to replenish |
| AZ cartons | High annual value, large monthly swings | Why use rises and whether the next peak can be planned |
| CZ drive fuses | Low annual value, infrequent use | Equipment affected, replacement lead time and approved alternatives |

“C” means a small contribution to the value measure you chose. It doesn't mean the business can comfortably run out of the item. Keep the consequence of a shortage visible alongside the matrix.

## Use the classes to choose the next check

Before applying ABC and XYZ to your own list, agree on the site or warehouse, the period and the value measure. Keep units consistent for each item, and record the boundaries so someone else can reproduce the result.

Look at the history behind surprising classifications. Monthly totals can hide weekly swings. A missing month isn't zero demand, and low recorded use may reflect a period when the item was unavailable. The [stockout forecasting example](/notes/demand-forecasting-stockouts/) shows how that can mislead the next plan.

For items with no use throughout the year, CV has no meaningful denominator. Put them into a separate review for new items, inactive stock or standby spares. Don't quietly label all of them stable X items.

Then use the classes to organise the work: investigate the carton pattern, review replenishment for the labels, and check the fuse's shortage exposure with maintenance. Set reorder quantities and buffers using lead time, uncertainty and the service you need.

:::link /notes/safety-stock-reorder-point/ | Calculate safety stock and the reorder point
Once you've reviewed an item's demand and delivery conditions, work through how they affect the amount to keep and when to order.
:::

## Sources and calculation notes

- [SAP: ABC/XYZ Analysis](https://help.sap.com/saphelp_SCM700_ehp02/helpdata/en/4d/33d92edb9e00d3e10000000a42189b/content.htm). Value-based grouping and variation-based grouping.
- [NIST: Coefficient of Variation](https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm). Definition, interpretation and sensitivity when the mean is near zero.
- [SAP: MRP Monitor, 2024.1](https://help.sap.com/doc/327665004b9b4a8ba32106040dd7499f/2024.1/en-US/MRP-EN.pdf). Printed pages 37–39 discuss seasonality and trend; pages 41–42 and 49–51 describe classification options.

All eight items, quantities, costs and shortage conditions are fictional. The example assumes complete monthly records and no supply constraints. Classifications use unrounded values. The calculation panels disclose the boundary rule and all monthly inputs; the cutoffs are illustrative, not a recommended stock policy.
