---
title: Master data vs transactional data: differences and ERP examples
date: 2026-10-15
summary: Ten boxes arrived with 12 units each. After the product's pack size changes to 24, a report doubles the old receipt. Follow the records to see how that happens.
seoTitle: Master data vs transactional data: ERP examples
seoDescription: Understand master, transactional and reference data through one stock receipt. See why changing a product record should not rewrite an earlier movement.
updated: 2026-10-24
status: published
topic: Digital transformation
keywords: master data vs transactional data, master data examples, reference data examples, ERP master data, unit of measure conversion
---

**Master data describes business entities such as products, customers and suppliers. Transactional data records events such as orders, receipts and invoices. Reference data provides shared codes and categories used by those records.** [IBM's master-data guide](https://www.ibm.com/think/topics/master-data-management) distinguishes these types.

Ten boxes arrived on Monday, with 12 cartridges in each. The warehouse posted a receipt of 120 cartridges.

The supplier later introduced a 24-cartridge box. Someone updated the product record. A report then multiplied Monday's ten boxes by the new pack size and displayed 240 cartridges received.

No extra delivery had arrived. The report had used today's product definition to reinterpret an earlier event.

[Data governance](/notes/data-governance-explained/) assigns who can agree and approve that definition. The distinction between data types matters whenever a record changes. It tells us what should use the new value and what needs to keep its original meaning.

## Master data, transactional data and reference data compared

| Data type | What it describes | Example in this receipt |
| --- | --- | --- |
| Master | The product we buy and stock | Product P-204, description, inventory unit and box conversion |
| Transactional | A particular business event | Receipt R-082: ten boxes received on Monday |
| Reference | Shared codes and their meanings | EA means individual unit; BOX means box |

The unit code BOX doesn't tell us how many cartridges it contains. That relationship belongs with the particular product and pack definition.

[Microsoft's units-of-measure documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/inventory-how-setup-units-of-measure) explains the relationship between an item's base inventory unit and alternate purchase or sales units. One product's box can contain a different quantity from another's.

Master data isn't necessarily permanent, and transactional data isn't only financial. A supplier address can change; a warehouse movement is still a transaction even before an invoice exists.

## What master data management does

Master data management, or MDM, is the work of keeping shared entity records usable across the systems and teams that depend on them. [IBM's MDM explanation](https://www.ibm.com/think/topics/master-data-management) covers the processes, ownership and technology involved.

For P-204, the responsible owner needs to approve the new pack definition, record when it applies and share it with purchasing, receiving and reporting. The team then checks an old receipt and a new order to confirm that each uses the intended definition.

That work continues whenever the product changes. An MDM tool can distribute a record; the business still has to agree its meaning and protect its history.

## ERP example: preserve the original transaction

Our fictional distributor stores cartridges in individual units, using EA as the base unit. When it posts receipt R-082, it keeps the received quantity, original unit, conversion used and resulting base quantity.

| Receipt R-082 | Recorded value |
| --- | --- |
| Product | P-204 |
| Received quantity and unit | 10 BOX |
| Conversion used for this receipt | 12 EA per BOX |
| Posted inventory quantity | 120 EA |

:::formula Original receipt
10 boxes × 12 cartridges per box = 120 cartridges
:::

Keeping those details means someone can reconstruct the movement after the product record changes. An ERP may keep them in the posted document, a versioned record or another part of its history.

The [inventory-record accuracy note](/notes/cycle-counting-inventory-accuracy/) covers checking the recorded stock against the physical stock. Here, the receipt itself was right. The later report introduced the wrong interpretation.

## Change the current product record, then inspect the past

The new 24-cartridge pack applies to a future supply arrangement. The old receipt still represents ten boxes of 12. The comparison below keeps both versions visible.

::interactive master-record-history | Fictional receipt of ten 12-unit boxes, posted as 120 cartridges. Changing the current pack definition affects the separate future proposal. Recomputing the old receipt can change the report, but no stock adjustment or extra receipt has occurred.

At 24 per box, a new ten-box proposal represents 240 cartridges. That can be correct for the new pack arrangement. Applying the same multiplication to R-082 creates an apparent extra 120 in the receipt history.

The error is easy to introduce when a report joins old movements to the current product table and recalculates every base quantity. The product ID matches, but the pack size belongs to a later date.

This is why “the records matched” is an incomplete test. The [data-quality note](/notes/data-quality-dimensions/) explains consistency and accuracy; this example adds the question of which definition applied when the event happened.

## Updating master data vs correcting a transaction

Suppose the warehouse actually received 240 cartridges on Monday and posted 120 by mistake. That is a different case. It needs evidence of what arrived and an approved correction to the inventory record.

Updating the current pack size doesn't document that correction. It could also change how unrelated movements are interpreted if reports rely on the current value.

Keep the original posting, correction reason and correcting entry connected according to the system's process. If a physical count also changes, reconcile the movement and count before adding both adjustments. Otherwise, the same discrepancy can be corrected twice.

When introducing the new pack, agree how open orders, labels, scanning and receiving will distinguish it from the old one. A new conversion in one screen doesn't establish that every team or interface will apply it correctly.

## Test the change across the records it affects

Before releasing the update, check an old receipt, an open order and a new proposal. The old receipt should still explain what was posted. The open order needs the pack terms actually agreed with the supplier. The new proposal should use the intended new definition.

The [SIT vs UAT example](/notes/sit-vs-uat/) shows why transferring the correct fields and supporting the correct business outcome are separate checks. Both matter when a conversion travels between purchasing, the warehouse and reporting. The [data migration reconciliation example](/notes/data-migration-vs-integration/) applies those checks to a replacement system's opening stock.

Vrolen's [manufacturing data analytics guide](https://vrolen.com/blog/manufacturing-data-analytics/) extends that record check across production and quality data. A product ID, unit and timestamp need to retain their meaning when records are combined.

Start with one movement someone can trace back to the goods. If today's product update changes its reported history without a correcting transaction, check how the report is applying the master data before changing the stock balance.

## Sources and example notes

- IBM. [Master data management](https://www.ibm.com/think/topics/master-data-management), data-type definitions and product examples.
- Microsoft Learn. [Set up units of measure](https://learn.microsoft.com/en-us/dynamics365/business-central/inventory-how-setup-units-of-measure), base units, alternate units and item-specific conversion quantities.

All records, quantities and pack changes are fictional. The example keeps the original receipt conversion. Check how your ERP preserves that history; its storage and correction methods may differ.
