---
title: Total landed cost: formula and a per-unit example
date: 2026-10-20
summary: Two products share one freight bill. Calculate the shipment's landed cost, allocate the shared charges and see why the per-unit result depends on the chosen basis.
seoTitle: Total landed cost: formula and worked example
seoDescription: Calculate total landed cost and cost per unit for a mixed shipment. Compare freight allocations and avoid double-counting charges, taxes and ownership costs.
status: published
topic: Supply chain
keywords: total landed cost formula, landed cost calculation example, landed cost per unit, freight allocation, landed cost vs standard cost
---

The purchase order says €20 a unit. Freight, insurance and import charges arrive on separate invoices. By the time the stock reaches the warehouse, the €20 no longer describes the cost of getting it there.

**Total landed cost brings together the product cost and the relevant costs of bringing it to a named destination.** The boundary matters. A warehouse receipt and a delivery to the final customer include different journeys.

[DHL's explanation](https://www.dhl.com/discover/en-hk/logistics-advice/essential-guides/landed-cost-meaning-formula-calculation) identifies the main shipment-cost categories. Here we will use receipt at the buyer's warehouse, then work from the whole shipment to a unit of each product.

## Total landed cost formula: start with the whole shipment

Our fictional shipment contains two purchased products. All amounts are in euros on the same currency basis.

| Product | Quantity | Purchase price per unit | Product value | Weight per unit |
| --- | ---: | ---: | ---: | ---: |
| A | 100 units | €20 | €2,000 | 2 kg |
| B | 50 units | €40 | €2,000 | 1 kg |
| Total | 150 units | | €4,000 | 250 kg in total |

The quote excludes the additional charges below. No listed freight or insurance cost is already included in the product price.

| Shipment charge | Assumed amount |
| --- | ---: |
| Products | €4,000 |
| Freight to the buyer's warehouse | €500 |
| Insurance | €100 |
| Non-recoverable import duty | €160 |
| Brokerage | €40 |
| Total landed cost at the stated boundary | €4,800 |

The duty is an illustrative assumption of 4% of the €4,000 product value. It is not a real tariff or a statement of the correct customs valuation base. Actual charges depend on the goods, origin, destination and applicable rules.

:::formula Shipment landed cost
€4,000 products + €500 freight + €100 insurance + €160 duty + €40 brokerage
Total = €4,800
:::

Dividing €4,800 by all 150 units gives €32 per unit across the mix. That average does not describe either product's landed unit cost. A and B have different purchase prices and weights.

## Allocate the shared charges to each product

For our first allocation, put freight on actual weight: A contributes 200 of the 250 kg, or 80%; B contributes 20%. Allocate insurance and brokerage equally by product value, because both product lines cost €2,000. Apply the assumed duty to each line's product value.

| Cost assigned | Product A | Product B | Shipment total |
| --- | ---: | ---: | ---: |
| Products | €2,000 | €2,000 | €4,000 |
| Freight, by weight | €400 | €100 | €500 |
| Insurance, by value | €50 | €50 | €100 |
| Duty, assumed 4% of product value | €80 | €80 | €160 |
| Brokerage, by value | €20 | €20 | €40 |
| Assigned landed cost | €2,550 | €2,250 | €4,800 |
| Cost per unit | €25.50 | €45.00 | Different products; no common unit cost |

The allocation reconciles to the whole bill. It is still a method choice. In a real shipment, chargeable weight, volume, special handling or direct line charges may provide a better basis than actual mass.

## Change the allocation and follow the unit cost

If we allocate the €500 freight by product value instead, each line receives €250. Keep all other allocations unchanged. A becomes €24 per unit and B €48.

::interactive paa2-landed-allocation | Fictional mixed shipment. Select weight or product value for allocating the same €500 freight bill. Other charges stay as stated: €100 insurance and €40 brokerage by product value, plus €160 assumed duty split equally. The shipment total stays €4,800. Changing the allocation redistributes cost; it does not create a saving.

Neither selection changes what the company paid. The choice changes which product carries the cost in the comparison. Keep that basis consistent when comparing products or periods, and explain a changed method.

If one line has a specific handling charge, assign it directly before splitting the common charges. Otherwise a convenient allocation can make the unaffected product appear more expensive.

## Landed cost, standard cost and total cost of ownership

These terms answer different questions.

| Term | Question for this shipment |
| --- | --- |
| Landed cost | What costs brought these products to the chosen destination? |
| Standard cost | What planned cost does the business use under its stated costing method? |
| Total cost of ownership | What relevant costs follow across buying, holding, using and ending ownership? |

Suppose A's planned landed standard is €25 a unit on a comparable basis. Its €25.50 assigned actual landed cost gives a €0.50 difference per unit. Investigate price, freight, charges, exchange rates and allocation before calling it a purchasing failure.

The [procurement total-cost example](/notes/when-procurement-savings-increase-total-cost/) continues beyond the quote into delivery exceptions and other supplier costs. Landed cost is one part of that wider comparison.

## Separate inventory cost from the cash paid

[IAS 2's inventory guidance](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/) includes costs of bringing inventory to its present location and condition. An [IFRS staff paper reproducing paragraph 11](https://www.ifrs.org/content/dam/ifrs/meetings/2021/march/ifric/ap03-non-refundable-vat-on-lease-payments.pdf) shows the exclusion of taxes recoverable from the tax authority.

Suppose, separately, that a €400 tax payment is fully recoverable under the business's applicable rules. It may affect cash timing while remaining outside this example's €4,800 inventory-cost total. If a tax is not recoverable, the treatment can differ.

Agree the basis with Finance rather than treating every amount on a broker's invoice as the same kind of cost. A shipment-cost worksheet is not a substitute for the applicable customs and accounting rules.

Before using the unit result for pricing or supplier comparison, put the destination, quote terms, invoices, quantities and allocation basis next to it. That is enough for someone else to explain how A's €20 purchase became €25.50 at the warehouse.

## Sources and calculation notes

- [DHL: Landed cost meaning and calculation](https://www.dhl.com/discover/en-hk/logistics-advice/essential-guides/landed-cost-meaning-formula-calculation), delivered-cost categories and boundary.
- [IFRS Foundation: IAS 2 Inventories](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/), inventory cost principles. Paragraph 11 of IAS 2 addresses purchase costs and recoverable taxes.

- [An IFRS staff paper](https://www.ifrs.org/content/dam/ifrs/meetings/2021/march/ifric/ap03-non-refundable-vat-on-lease-payments.pdf), page 5, reproduces IAS 2 paragraph 11 on purchase taxes recoverable from the tax authority.

All prices, quantities, weights, charges and tax assumptions are fictional. The model allocates one shipment and excludes any later storage, use or end-of-life cost. The 4% duty assumption is not a tariff recommendation.
