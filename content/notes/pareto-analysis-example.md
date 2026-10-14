---
title: Pareto analysis example: count, delay or cost?
date: 2026-10-14
summary: Late deliveries lead the complaint count. Damaged items lead the cost. Build a Pareto chart from the same records and see why the measure changes where you look first.
seoTitle: Pareto analysis example: count, delay or cost?
seoDescription: Build and read a Pareto chart using 100 fictional complaints. Switch between count, delay and cost, and calculate the cumulative percentage.
status: published
topic: Operational excellence
keywords: pareto analysis example, pareto chart example, how to read a pareto chart, cumulative percentage, 80 20 rule
---

The complaint report says late deliveries are the biggest problem. There are 40 of them, more than any other category. The team starts discussing the transport provider.

Then Finance sorts the same report by direct cost. Damaged items come first.

Both rankings are correct. They answer different questions.

A **Pareto chart** puts categories in descending order of a chosen measure, such as frequency, time or cost. A cumulative line shows how much of the total you have covered as you move across the bars. Pareto analysis uses that view to focus an investigation.

Before choosing the first project, decide what the height of a bar should mean.

## One set of complaints, three possible rankings

Our fictional distributor records 100 complaints in one month. Each complaint has one main category. The table includes total delay associated with those orders and directly assigned credits, replacements and extra freight costs.

The delay hours are added across affected orders. They are not hours during which the whole business stopped. The costs are separate recorded amounts, not an hourly valuation of the same delay.

| Complaint category | Complaints | Order delay, hours | Direct cost |
| --- | ---: | ---: | ---: |
| Late delivery | 40 | 200 | €800 |
| Wrong item | 25 | 100 | €1,000 |
| Damaged item | 15 | 60 | €1,800 |
| Missing documents | 10 | 240 | €200 |
| Billing error | 8 | 16 | €400 |
| Safety concern | 2 | 24 | €800 |
| Total | 100 | 640 | €5,000 |

These are teaching inputs, not a survey or a benchmark. We hold the records and period constant so we can see the effect of changing the measure.

## Build the Pareto chart

[ASQ's Pareto procedure](https://asq.org/quality-resources/pareto) starts with categories, measurement and period, then totals and ranks the observations. For the complaint-count view, late delivery is first with 40, followed by wrong item with 25.

Divide each count by all 100 complaints to calculate its share. Add those shares in ranked order for the cumulative percentage.

:::formula Complaint-count calculation
Late delivery share: 40 ÷ 100 × 100 = 40%
First two categories: (40 + 25) ÷ 100 × 100 = 65%
First three categories: (40 + 25 + 15) ÷ 100 × 100 = 80%
:::

Switch measures below. The bars, order, units, denominator and cumulative line all change together.

::interactive pareto-measures | Fictional month: the same 100 complaints in every view. Bars show category totals; the line shows cumulative share. Hover, focus or select a category to inspect it. The 80% line is a reference, not a rule for approving work.

To read the chart, use the left axis for a bar's measured value and the right axis for the line's cumulative share. The final point reaches 100% because it includes every category in that view.

The line above wrong item is 65% in the count view. That means the first two categories together represent 65 complaints. It doesn't mean wrong items alone account for 65%.

## Change the question and the first bar changes

By complaint count, late delivery leads with 40%. By delay, missing documents leads with 240 of 640 order-hours, or 37.5%. By direct cost, damaged items leads with €1,800 of €5,000, or 36%.

If the team wants to reduce how often customers complain, frequency is a reasonable starting view. If it needs to understand prolonged order delays, use the delay view. If it is investigating recorded expense, start with the cost view.

Keep the other views available. A fix for frequent late deliveries might affect only a small portion of direct cost. It could still improve service. Say which outcome the proposed work is meant to change.

For manufacturing records, Vrolen's [downtime Pareto guide](https://vrolen.com/blog/downtime-pareto-analysis/) compares event frequency with lost minutes and explains how one stop can affect several machines. Its event model matters before those minutes can be ranked.

:::link https://www.youtube.com/watch?v=UsFA-kIoGho | Watch Vrolen's Pareto chart example
An animated walkthrough of ranking complaints and reading cumulative share. It uses a separate example; use the figures above for this article's calculations.
:::

## The 80/20 rule isn't a required result

In our count view, three of the six categories account for 80% of complaints. That is half the categories, not 20%.

Nothing is wrong with the chart. The measured concentration just doesn't match an exact 80/20 split.

Use the actual shares. Don't merge categories, remove awkward records or adjust the period to produce the familiar ratio. The reference line can help show concentration, but crossing it doesn't establish which fixes will work or what they will cost.

Also keep severe cases outside a simple popularity contest. The two safety concerns require prompt assessment and any necessary containment even though they sit near the bottom of the count ranking. The [FMEA example](/notes/fmea-step-by-step/) explains why severity can require attention independently of a combined ranking.

## Check what went into the categories

“Late delivery” describes the customer outcome. It doesn't tell us whether the supplier shipped late, the carrier missed a collection or our team promised an impossible date.

Read a sample of the underlying records before assigning the transport provider an action. Then split the category where the evidence supports a more useful comparison.

Keep unknowns visible. If half the records have no classification, a neat ranking of the other half doesn't describe the whole month. The [data quality checks](/notes/data-quality-dimensions/) explain how missing values and duplicate records can alter an apparently simple total.

Comparisons across periods need care too. If orders double, a higher complaint count might accompany a lower complaint rate. Use a comparable period and exposure, and show the denominator. A within-month Pareto ranks the month's complaints; it doesn't establish a trend in service quality.

## Turn the first bar into a testable investigation

Suppose the team chooses damaged items because it wants to reduce direct cost. It can check which products, packaging methods and routes appear in those 15 cases. The category gives a manageable place to start looking.

The next step is to test an explanation. The [5 Whys worked example](/notes/5-whys-example/) shows how to keep observations separate from assumptions and choose an action that addresses the mechanism.

After the change, check both the chosen outcome and total performance. A smaller damage share could mean damage fell, or that another complaint category grew. Report counts, costs and relevant order volumes alongside the new chart.

Choose the measure before choosing the first bar. Then follow the records far enough to know what action the evidence supports.

## Sources

- ASQ. [What is a Pareto Chart?](https://asq.org/quality-resources/pareto). Category ranking, choice of measure, cumulative shares and chart construction.

All complaints, delays and costs are fictional. Each complaint has one main category; attributed costs are counted once. The example makes no causal claim, assigns no probability to a safety event and estimates no benefit from a proposed fix.
