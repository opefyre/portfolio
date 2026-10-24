---
title: SKU rationalization: decide what to keep before cutting the list
date: 2026-10-24
summary: The low-value spare looks like a candidate for removal until its shortage stops a machine. Review the assortment with demand, cost and operating consequences together.
seoTitle: SKU rationalization: deciding what to keep
seoDescription: Learn SKU rationalization with an eight-item inventory example. Compare demand, costs and critical spares before deciding which items to remove.
status: published
topic: Supply chain
keywords: SKU rationalization, SKU meaning, SKU rationalization example, SKU productivity, 80 20 inventory, product assortment review
---

SKU rationalization is a review of which stock items or product variants the business should continue offering or stocking, change, or withdraw. A **SKU**, or stock keeping unit, identifies an item the business manages separately.

The review needs a decision about the assortment. Sorting a spreadsheet by annual usage value can help select items to inspect, but it cannot establish which ones the business can safely remove.

The [ABC/XYZ Note](/notes/abc-xyz-inventory-analysis/) makes that limit concrete. Its low-value drive fuse can stop a machine if the approved replacement is unavailable.

## Start with the items' different jobs

The fictional example contains eight items. ABC classifies their annual consumption value. XYZ describes variation in monthly quantities under the stated cutoffs. Neither measure records the full consequence of dropping an item.

Use three items from that same set to organise the review.

| Existing item | What we know | What that supports now | What remains missing |
| --- | --- | --- | --- |
| AX label rolls | High annual usage value and steady monthly use | Review replenishment and delivery reliability | Margin, customer needs and substitution evidence for any assortment change |
| AZ cartons | High annual value and sharply rising monthly use in one year | Investigate the demand pattern before changing supply | Enough history and order context to explain the rise |
| CZ drive fuses | €500 annual usage value, six-week approved-part lead time, no approved substitute; a shortage stops a machine | Retain the protection decision for explicit maintenance review | A verified alternative or changed equipment requirement before removal |

The evidence supports review actions. It does not support deleting any of these items from the catalogue.

A 2024 [MIT thesis on SKU analysis](https://dspace.mit.edu/entities/publication/4a991e4e-2212-4ffc-b580-791fdc0b12b5) studies assortment decisions at a tractor-attachment manufacturer. Its case connects product variety with the operating work behind it. That is a useful research direction; its chosen assortment is not a cutoff to apply to this eight-item example.

## The 80/20 rule cannot choose the items to delete

Teams often use “80/20” to describe concentration: a relatively small share of items may account for a large share of a chosen value measure. Calculate the actual distribution rather than assuming those percentages.

The remaining items may serve an infrequent customer need, complete an order or protect equipment. They may also create avoidable complexity. The class alone cannot distinguish those cases.

For the drive fuse, ten months with no use do not establish ten months without a need for standby protection. Removing it because its usage value is small would ignore the stated six-week exposure and lack of an approved substitute.

The [obsolete-inventory Note](/notes/obsolete-inventory-explained/) addresses a related but separate decision: stock already held can need disposition even when an item remains in the future assortment.

## Measure the cost that would actually change

For a sold product, inspect sales, gross margin, order frequency, stock and the work required to serve it over a defined period. For a maintenance spare, inspect equipment need, consequence of shortage, replenishment time and approved alternatives.

A SKU-productivity measure needs an explicit numerator and denominator. Sales per active SKU describes something different from gross margin relative to average inventory. Neither includes every service or support consequence.

Our eight-item dataset supplies consumption value and monthly units. It does not supply sales margin or avoidable complexity cost, so we cannot calculate those results honestly from it.

Use the [cost-to-serve approach](/notes/cost-to-serve-example/) to trace order and delivery work before allocating a saving to removal. If the same staff and trips remain, deleting a code may release no cash cost.

## Check substitution before approving withdrawal

A proposed substitute needs evidence that it meets the customer's or equipment's requirement. Similar descriptions or dimensions are not approval.

Check open orders, supply commitments, remaining stock, product records and instructions before choosing an effective date. Record who accepts the substitution and who will handle a request for the withdrawn item.

The [master-data Note](/notes/master-data-vs-transactional-data/) explains why current product changes must preserve historical transactions. An assortment decision should not rewrite what an earlier order or receipt meant.

## Leave an item-level decision record

For each reviewed SKU, keep the evidence, proposed action, approver, effective date and follow-up measure together. “Review pending: substitute not approved” is a useful result when the evidence is incomplete.

Start with the fuse from this example. Ask maintenance to confirm the equipment requirement and available alternatives before changing its stocking policy. The same discipline lets the commercial team challenge weak product variants without treating every low-volume item as disposable.

## Sources and example notes

- [Hatteberg, H., MIT, 2024: product SKU analysis and rationalization](https://dspace.mit.edu/entities/publication/4a991e4e-2212-4ffc-b580-791fdc0b12b5), the thesis repository abstract describes a company-specific assortment analysis. No reported savings or assortment cutoff is transferred here.
- [The existing ABC/XYZ analysis](/notes/abc-xyz-inventory-analysis/), fictional item classes, annual fuse value, lead time and shortage consequence reused here.

No item withdrawal, margin, customer effect or saving is assumed. The item history identifies checks to make; it does not contain enough evidence to approve an assortment reduction.
