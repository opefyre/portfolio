---
title: VMI vs consignment inventory: ownership and replenishment
date: 2026-10-15
summary: A supplier can manage replenishment without owning the goods on your shelf. Follow one delivery and withdrawal to separate the two arrangements.
seoTitle: VMI vs consignment inventory: key differences
seoDescription: Compare VMI and consignment inventory with one delivery example. Separate replenishment decisions, ownership transfer, invoice timing and physical stock.
status: published
topic: Supply chain
keywords: VMI vs consignment, vendor managed inventory meaning, consignment inventory example, supplier managed inventory
---

**Vendor-managed inventory (VMI) gives the supplier responsibility for replenishment decisions within agreed rules. Consignment means the supplier retains ownership of stock held at the customer's location until an agreed transfer event.** They can operate together, or separately.

The supplier checks your stock and sends the next delivery. The goods sit in your warehouse, but the ownership agreement decides whose stock it is.

[Oracle's VMI documentation](https://docs.oracle.com/cd/G24469_01/fscm92pbr53/eng/fscm/sinv/UnderstandingVendorManagedInventory-9f2467.html) explicitly describes both consigned and non-consigned stock. “The supplier manages it” is not enough to decide what the ownership record should say.

## VMI vs consignment: who replenishes and who owns?

VMI answers who monitors the position and initiates replenishment. The buyer still needs agreed stock limits, delivery rules and a way to handle exceptions. Delegating routine decisions doesn't give the supplier unlimited authority to fill the warehouse.

Consignment answers who owns the goods before the agreed transfer event. In the example below, that event is withdrawal for production. Other arrangements need their own terms checked.

Those choices give four combinations. A buyer can order supplier-owned consignment stock. A supplier can replenish stock the buyer owns. Neither is a contradiction.

::interactive ownership-arrangements | Four possible arrangements. The ownership column uses receipt and withdrawal as example transfer events; the agreement defines the actual event. Replenishment responsibility and ownership are separate choices.

The distinction changes the records and settlement process. It doesn't change how many usable pieces physically remain after a withdrawal.

## VMI and consignment example: delivery and withdrawal

A fictional factory receives 1,000 brackets on Monday. They cost €2 each. Nothing else is on hand or on order, and there are no quality holds.

Compare two agreements. Under non-consigned VMI, the buyer takes ownership on receipt and the delivery forms the invoice basis: 1,000 × €2 = €2,000. Under consigned VMI, the supplier still owns the 1,000 pieces at this point. Receiving them doesn't yet trigger an invoice in this example.

On Tuesday, production withdraws 400. Both arrangements leave 600 pieces on the shelf. Under the consignment terms, those 400 transfer to the buyer and become eligible for settlement: 400 × €2 = €800. The remaining 600 are still supplier-owned at the factory.

The €1,200 value of those remaining pieces hasn't disappeared. Someone still owns and finances that stock. The price, fees, liability and settlement terms determine how the arrangement's cost is shared.

Invoice basis is also different from cash paid. Here, both agreements use a verified month-end statement and payment 30 days after its invoice. Tuesday's withdrawal does not mean €800 leaves the bank that day. The [cash conversion cycle example](/notes/cash-conversion-cycle-example/) connects inventory, customer collection and supplier payment timing.

## How VMI replenishment works under either ownership rule

The supplier receives Tuesday's confirmed balance of 600, together with the open-order record. The agreed policy requests replenishment when inventory position is 700 or less, bringing it back to 1,000.

With no incoming stock or backorders, position is 600. The supplier initiates a 400-piece request under either ownership arrangement. Once that request is confirmed as an order, position becomes 1,000 while the shelf still holds 600.

The [inventory-position example](/notes/inventory-position-vs-on-hand/) explains why that open order must be counted. A later update showing the same 600 on hand shouldn't create another 400-piece order.

Change the withdrawal quantity above. The physical balance and request change together, while the two ownership arrangements retain their different invoice triggers. The view stops before any later receipt.

::interactive vmi-ownership | Fictional 1,000-piece receipt at €2 each. Both cases use VMI. Under the stated terms, non-consigned ownership transfers on receipt and consigned ownership on withdrawal. The invoice basis is not cash paid today. No other stock movements occur before this snapshot.

If ordering only happens on a fixed weekly run, account for that timing too. The [continuous vs periodic review note](/notes/continuous-vs-periodic-inventory-review/) explains why a stock trigger alone doesn't specify the full replenishment policy.

## Agree what the supplier sees and can decide

A stock feed needs more than a total. Held stock, pending receipts, consumption and adjustments can each change the next decision. Keep item identity, units and timestamps consistent, and distinguish unavailable stock from stock that has actually been used.

Agree the stock limits, normal order authority, delivery calendar and who resolves a discrepancy. A consumption correction must also reach the settlement record; otherwise, replenishment and invoices can tell different stories about the same movement.

[Oracle's consignment guide](https://docs.oracle.com/cd/E26401_01/doc.122/e48822/T260819T260822.htm) shows how ownership transfer, consumption advice and supplier-managed replenishment can connect. Its specific transactions describe that system, rather than rules every implementation must copy.

## Compare the full arrangement before calling it a saving

Consignment can change when the buyer takes ownership and pays under the agreed terms. VMI can change who performs routine replenishment work. Neither label proves that total stock, shortages or total cost will fall.

Compare the same demand and service requirement. Include purchase price, freight, handling, support effort and any consignment fees. Establish who bears agreed losses, damage or obsolescence before treating a cost as removed.

The [procurement total-cost example](/notes/when-procurement-savings-increase-total-cost/) shows how an attractive saving can reappear in another budget. Here, a later invoice could come with a different price or stock obligation.

For the next supplier discussion, write down two separate answers: who decides the next replenishment, and what event changes ownership. Then check that the warehouse, purchasing and settlement records all follow those answers.

## Sources and example notes

- Oracle PeopleSoft. [Understanding Vendor Managed Inventory](https://docs.oracle.com/cd/G24469_01/fscm92pbr53/eng/fscm/sinv/UnderstandingVendorManagedInventory-9f2467.html). Consigned and non-consigned VMI, consumption reporting and replenishment.
- Oracle. [Consigned inventory overview and VMI integration](https://docs.oracle.com/cd/E26401_01/doc.122/e48822/T260819T260822.htm). Separate ownership and planning responsibility, and the combined process.

The item, quantities, price, limits, ownership events and payment terms are fictional. The figures stop after the replenishment request, before its receipt. Ownership and invoice timing follow the example agreements; check the terms of a real arrangement separately.
