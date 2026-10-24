---
title: Procure to pay: follow the request through to payment
date: 2026-10-24
summary: A purchase order, a receipt and an invoice describe different events. Follow the records that connect an approved need to a checked supplier payment.
seoTitle: Procure to pay: process, documents and controls
seoDescription: Follow the procure-to-pay process from requisition to supplier payment. Compare PR and PO, receipt and invoice checks using an existing stock-receipt example.
status: published
topic: Supply chain
keywords: procure to pay process, P2P process, purchase requisition vs purchase order, PR before PO, three way matching
---

Procure to pay, often shortened to P2P, connects an approved purchasing need with ordering, receipt, invoice checks and supplier payment. Purchasing, the receiving team and Finance each create evidence the next step needs.

[CIPS describes that connected sequence](https://www.cips.org/intelligence-hub/procurement-technology/procure-to-pay-process). A team can split it into different numbers of steps. The records and approval boundaries matter more than whether a diagram contains seven, nine or twelve boxes.

Here P2P means procurement through payment. Payment apps also use the abbreviation for peer-to-peer transfers, which is a different subject.

## Purchase requisition vs purchase order

A **purchase requisition, or PR**, is an internal request to buy. A **purchase order, or PO**, communicates the authorised order to the supplier under the agreed purchasing process.

In the normal requisition-led sequence, the request and its approval come before the PO. Creating an order first and seeking retrospective approval leaves a different control situation, even if both documents eventually exist.

A sourcing decision can identify a suitable supplier without authorising every order placed with it. The [supplier-selection example](/notes/strategic-sourcing-supplier-selection/) covers that earlier choice.

## The procure-to-pay process in one view

Use the fictional receipt from the [master-data Note](/notes/master-data-vs-transactional-data/): ten boxes of product P-204 arrive on Monday, with twelve cartridges per box. Receipt R-082 records 120 individual cartridges.

The table shows the records a purchasing process would connect around that established receipt. It adds no product price, payment date or claim that an actual supplier was paid.

| Step | Person or team | Evidence carried forward |
| --- | --- | --- |
| Define the need | Requesting team | Product, intended use, required quantity and date |
| Approve the requisition | Authorised approver | Permission to buy within the relevant limits |
| Issue the purchase order | Purchasing | Supplier, product, quantity, unit, terms and order reference |
| Receive and check | Warehouse or receiving team | R-082: 10 BOX at 12 cartridges per box = 120 cartridges |
| Check the invoice | Accounts payable with Purchasing and receiving | Price, quantity, order and receipt references; unresolved differences |
| Approve payment | People authorised under the payment process | Accepted invoice and completed required controls |
| Pay and reconcile | Finance | Payment reference and reconciliation to the supplier account |

::figure r4-p2p-records | Teaching record chain around the fictional P-204 receipt. An internal approval, supplier order, physical receipt, checked invoice and payment are separate events. The diagram supplies no price or assumed payment result.

A system can automate parts of the chain. The business still needs rules for an order outside the approval limit, a damaged delivery or an invoice that lacks receipt evidence.

## Three-way matching: keep the documents' meanings intact

Three-way matching compares the purchase order, receipt and invoice. [Microsoft's product documentation](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/accounts-payable-invoice-matching) illustrates matching invoice prices with the order and invoice quantities with the selected receipts, using configured policies and tolerances.

For R-082, the receiving record establishes ten boxes and the twelve-per-box conversion. If the invoice uses individual cartridges, compare the quantities on the same basis. Ten boxes and 120 cartridges can describe the same receipt; ten and 120 without their units cannot.

The current product record later changes to twenty-four cartridges per box. Recalculating the old receipt as 240 would create false matching evidence. Retain the original transaction conversion.

An absent receipt is a request to investigate. It does not establish that goods never arrived, and an invoice alone does not establish that they did. The receiving team must check the delivery and posting evidence.

## Give each exception a route back to its owner

A quantity disagreement needs receiving evidence. A price disagreement needs the agreed order and commercial terms. An invoice without an order reference needs Purchasing to identify the authorised commitment.

Keep unresolved invoices visible with their reason, responsible person and next action. Automatically accepting a discrepancy just to clear an ageing list can move an unresolved purchasing problem into a payment.

The [business-process Note](/notes/business-process-management-example/) shows how ownership connects across departmental steps. A payment process needs that same end-to-end view, even when each team already has a local checklist.

## Check the payment against the order and the ledger

Finance should be able to follow an accepted invoice into its payment and supplier-account record. A payment status in one application does not, by itself, show that every related record has reconciled.

The [cash-conversion-cycle example](/notes/cash-conversion-cycle-example/) examines the cash timing. Extending payment time may change that measure; it does not replace the need to honour agreed terms or resolve the invoice correctly.

Choose one recent supplier payment and trace its request, approval, order, receipt and invoice. For each missing record, name the person who can supply or correct it. That trace is a useful starting point before buying a new P2P system.

## Sources and example notes

- [CIPS: procure to pay](https://www.cips.org/intelligence-hub/procurement-technology/procure-to-pay-process), requisition, order, receipt, invoice and payment sequence.
- [Microsoft: accounts-payable invoice matching](https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/accounts-payable-invoice-matching), document matching, configurable tolerances and receipt quantities.
- [The existing P-204 receipt](/notes/master-data-vs-transactional-data/), fictional units and historical conversion reused here.

The process is a general teaching arrangement, not a particular organisation's payment policy. The example has no invoice price or payment result. Actual approvals, matching tolerances and required checks depend on the transaction and operating rules.
