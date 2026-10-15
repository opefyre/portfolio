---
title: Inventory risk pooling: formula, example and demand correlation
date: 2026-10-15
summary: Sharing stock can reduce the buffer when demand peaks do not arrive together. Change the correlation between two regions and see when that benefit disappears.
seoTitle: Inventory risk pooling: formula and example
seoDescription: Explore inventory risk pooling with two regions. See how demand correlation changes a shared buffer, and what the calculation leaves out of delivery.
status: published
topic: Supply chain
keywords: risk pooling inventory example, demand correlation risk pooling, inventory centralization, shared safety stock
---

**Inventory risk pooling combines demand so that one stock pool can cover several sources of uncertainty.** The potential reduction comes from how the demands move together, not simply from putting the same boxes in one building.

North keeps extra stock for a busy day. South does too. Some days North needs its buffer while South has stock to spare.

One shared pool could cover both, provided the stock can reach the customer in time. But if both regions get busy together, there is much less spare stock to share.

[MIT's supply-chain lecture](https://ocw.mit.edu/courses/esd-273j-logistics-and-supply-chain-management-fall-2009/34e5cfa83eac1bf9711374828c260a22_MITESD_273JF09_lec05.pdf#page=78) explains that mechanism and the wider trade-offs in centralising inventory. Here, we'll isolate the demand effect before considering the delivery route.

## How demand correlation affects risk pooling

**Correlation** describes how two quantities move together in a linear relationship. Positive correlation means higher demand in one region tends to accompany higher demand in the other. Negative correlation means their movements tend to offset.

A correlation of zero means no linear relationship; it does not generally prove independence.

The effect appears when we add the regions' demands. Their average quantities add directly. Their variability depends on the relationship between them too.

If North is above its usual demand while South is below, some of their movements cancel in the total. When they rise together, they do not.

## Inventory risk pooling formula and worked example

Our fictional distributor sells the same interchangeable item in two regions. Each region has average demand of 100 pieces over a one-day protection period, with a standard deviation of 20 pieces. Standard deviation measures the spread around that average.

We use a normal-demand model with fixed lead time, no onward delivery delay and no capacity limit. The [safety-stock guide](/notes/safety-stock-reorder-point/) explains the normal-model buffer: the selected factor, z, multiplied by demand standard deviation over the protection period.

We use z = 1.645, approximately a 95% one-sided coverage target. Each local pool targets coverage of its own day's demand. The shared pool targets the combined day. Coverage of the combined total does not guarantee the same delivery performance for each region.

| Calculation | Two separate pools | One shared pool, correlation 0 |
| --- | ---: | ---: |
| Average demand across the network | 200 pieces | 200 pieces |
| Demand standard deviation used | 20 pieces at each location | √(20² + 20²) = 28.28 pieces |
| Buffer before rounding | 2 × 1.645 × 20 = 65.80 pieces | 1.645 × 28.28 = 46.53 pieces |
| Whole-piece buffer, rounded up | 33 + 33 = 66 pieces | 47 pieces |

Pooling reduces the unrounded buffer by about 29.3% in this model. Average demand is still 200 pieces. The reduction concerns the uncertainty buffer, not all stock in the network.

## Interactive risk pooling example: change correlation

Change the correlation below. Each region keeps the same assumed average and variability. Only their relationship changes.

::interactive pooling-correlation | Fictional demand. The eight plotted days illustrate how peaks line up; they are not used to estimate the buffer inputs. Each region has assumed mean demand of 100 pieces and standard deviation 20 over one day. The shared buffer covers their combined demand.

At correlation 1, the regions move together perfectly. The shared standard deviation becomes 40 pieces, and its unrounded buffer is 65.80. The pooling benefit disappears under these equal-variability assumptions.

At correlation −0.5, the shared standard deviation is 20 pieces. Its unrounded buffer falls to 32.90, half the separate total. That is an illustrative relationship, not a forecast that two markets will offset each other reliably.

The general calculation is:

:::formula Standard deviation of combined demand
σ combined = √(σ North² + σ South² + 2 × correlation × σ North × σ South)
Shared buffer = z × σ combined
:::

The covariance identity behind this formula is set out in [MIT's probability notes](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_probability.pdf#page=111). The correlation term is why adding the two standard deviations would miss the benefit when their movements partly offset.

## Use the uncertainty that the buffer actually covers

For a real product, align dates and units before estimating the relationship. Check for shared promotions, customers, weather and shutdowns. A [heijunka example](/notes/heijunka-production-leveling/) addresses a different buffer question: stock needed to bridge known uneven withdrawals and level output. Two markets can look independent during ordinary weeks and peak together during a campaign.

If a forecast already captures the seasonal pattern, investigate the errors around that forecast. Treating predictable seasonal demand as uncertainty can overstate the buffer. The [demand-patterns note](/notes/demand-patterns-trend-seasonality/) separates those parts of a history.

Use a representative period and test how the result changes under stronger positive correlation. A short run of opposite peaks is a weak basis for removing local stock.

## Risk pooling benefits and centralisation trade-offs

A shared warehouse may reduce a calculated buffer and increase the distance to customers. If a region needs same-day availability but replenishment from the pool takes two days, the stock is not interchangeable at the moment of need.

Compare the complete route: supplier lead time, local receiving and release time, transport capacity, order cutoffs and customer commitments. Keep stock in transit visible. The [distribution-planning example](/notes/distribution-requirements-planning-example/) follows those dated transfers across locations.

Check concentration risk as well. A single pool can become a common point of failure. Separate stock may have value when a warehouse, road or system is unavailable.

Use the buffer calculation to test the opportunity. Then price the service, transport and operating changes that would make sharing possible. Only then can the stock reduction support a decision about where to hold inventory.

## Sources and example notes

- MIT OpenCourseWare, David Simchi-Levi. [Stochastic inventory models and supply contracts](https://ocw.mit.edu/courses/esd-273j-logistics-and-supply-chain-management-fall-2009/34e5cfa83eac1bf9711374828c260a22_MITESD_273JF09_lec05.pdf#page=78), pooling and centralisation trade-offs.
- MIT OpenCourseWare. [18.05 probability notes](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_probability.pdf#page=111), covariance and variance of a sum.

All demand and model inputs are fictional. The calculator compares normal-model buffers at a fixed one-day protection period. It does not model order quantities, transport, allocation rules, variable lead times or costs. Rounding is upward per stock pool; percentage reductions use unrounded quantities. The plotted days are constructed examples, not observed demand or random samples.
