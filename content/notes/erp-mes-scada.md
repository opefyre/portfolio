---
title: ERP vs MES vs SCADA: follow one production order
date: 2026-10-14
summary: The machine counts 1,000 parts. The production record accepts 960. The order still needs 40. Follow the same job through three systems to see what each number means.
seoTitle: ERP vs MES vs SCADA: a manufacturing example
seoDescription: Understand ERP, MES and SCADA through one production order. Compare their roles, reconcile gross and good output, and see what breaks at the handoffs.
status: published
topic: Digital transformation
keywords: ERP vs MES vs SCADA, MES vs ERP, manufacturing systems explained, manufacturing execution system, SCADA meaning
---

The machine screen says 1,000 parts have been produced. Sales asks whether the order is ready. Production says 40 more are needed.

Before anyone chooses which screen to trust, check what each one counts.

**ERP** means enterprise resource planning. It supports business processes such as orders, materials, purchasing and finance. **MES**, a manufacturing execution system, manages and records production work. **SCADA**, supervisory control and data acquisition, gathers process data and gives operators a view and supervisory control of equipment or processes.

Their responsibilities connect. For our order, a machine count, an accepted production quantity and a business completion record each answer a different question.

## What each system helps you decide

| System | Typical responsibility | For this production order |
| --- | --- | --- |
| ERP | Plan and record business commitments and resources | Release an order for 1,000 good brackets and track what remains |
| MES | Dispatch and track production, material use and quality results | Associate the run with the order and record 960 accepted parts and 40 rejects |
| SCADA | Monitor process conditions, alarms and supervisory actions | Display the run count, equipment state and relevant alarms |

[SAP's MES overview](https://www.sap.com/australia/resources/what-is-mes) explains execution tracking and its relationship with ERP. [NIST's SCADA definition](https://csrc.nist.gov/glossary/term/supervisory_control_and_data_acquisition) describes data collection and operational control; applications extend beyond a factory line.

These are functional descriptions. Products can overlap, and a site may perform some of this work through an ERP module, a specialist application or a manual record. Buying three products doesn't establish that the responsibilities and records agree.

## Follow order PO-104 through the run

Our fictional factory needs 1,000 good brackets, part BR-01. There is no earlier accepted stock allocated to this order. All quantities below are individual parts.

The ERP releases the order. The MES assigns the work to a line and associates the run with that order. For this example, the line counter increases once for each processed bracket and resets at the run boundary.

At 09:25, the run ends with a count of 1,000. Quality checks classify 40 as scrap and accept the other 960. There is no rework or unresolved quality hold in this example.

:::formula Reconcile the run
Processed output: 1,000 parts
Accepted output: 1,000 − 40 scrap = 960 good parts
Remaining requirement: 1,000 required − 960 accepted = 40 good parts
:::

The machine count is consistent with the production record. It counts processed parts, including the rejects. Posting all 1,000 as good output would erase the remaining requirement on the business screen without producing the missing brackets.

The [OEE example](/notes/same-oee-opposite-fixes/) uses the same distinction between total and good output when examining quality losses. A count needs its definition before it can support a delivery promise.

## Test the handoff between the records

Inspect three possible ERP updates below. The run and its quality result stay the same. Only the posted business record changes.

::interactive manufacturing-order-records | Fictional snapshot at 09:30 for one order, one part and one run. The counter records processed parts, MES records accepted and scrap quantities, and ERP records posted good output. All units are individual brackets. Scenarios are alternatives. A missing update is shown as unresolved for the current run, not as proof that no production occurred.

In the reconciled case, ERP has received 960 good parts and still shows 40 required. That agrees with the MES result.

In the gross-as-good case, ERP has received 1,000 and shows no remaining quantity. The discrepancy is 40 parts. Correct the posting and investigate its mapping before closing the order.

In the delayed-update case, ERP has no receipt for this run yet. A zero posted balance describes the business record, not the current physical result. Check the failed or pending message before releasing another full batch to replace apparently missing output.

The [data quality note](/notes/data-quality-dimensions/) explains these differences in terms of meaning, accuracy and timeliness. A fast connection carrying the wrong quantity is still wrong.

## Agree the message, including what a retry means

For this handoff, the teams need more than a field called quantity.

| Message detail | Agreement needed in this example |
| --- | --- |
| Identity | Order PO-104, part BR-01 and the specific production run |
| Quantity meaning | Accepted good output, with scrap reported separately |
| Unit | Individual parts, with any case conversion explicit |
| Effective time | When the production result applies, separate from when it arrived |
| Receipt and retry | A unique confirmation reference, with repeated delivery recognised |
| Exceptions | A named owner for rejected, missing or conflicting confirmations |

If the same confirmation arrives twice, it must not create another 960 accepted parts. If it fails, somebody needs to see the failure and resolve it. The exact design depends on the systems, but the business meaning must survive either event.

Our arithmetic doesn't prove the 960 are available to ship. The warehouse may still need to receive, locate or release them. Keep those additional conditions separate from this run's accepted quantity.

## Use ISA-95 to discuss activities and exchanges

**ISA-95** is a standards family for enterprise and manufacturing-control integration. Its [public overview](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard) explains the activity models and exchanges. The [OPC Foundation's explanation](https://reference.opcfoundation.org/specs/OPC-10030/4.2.3) describes business planning, manufacturing operations and automation responsibilities.

A diagram can help organise that conversation. It can't tell you that a particular vendor application owns every activity in one box. Read the implemented functions and interfaces at your site.

For this order, establish who owns the required quantity, the run identity, the quality decision and the accepted-output posting. Then trace how the same order and part pass between them. That is more useful than arguing about a product label while the completion record remains wrong.

Vrolen's [manufacturing software guide](https://vrolen.com/blog/manufacturing-software-guide/) places these responsibilities alongside quality, maintenance and improvement tools. The [manufacturing AI rollout note](/notes/scaling-ai-manufacturing/) explains why a later analytics project also depends on those shared definitions.

Before adding another screen, follow one order from release to recorded result. Put the quantities, units, quality status and update times beside each other. You can then see whether the missing piece is a function, an interface or an agreement about what the number means.

## Sources and example notes

- [SAP: What is a manufacturing execution system?](https://www.sap.com/australia/resources/what-is-mes). Execution functions and ERP integration. Vendor performance claims are not used here.
- [NIST: Supervisory control and data acquisition](https://csrc.nist.gov/glossary/term/supervisory_control_and_data_acquisition). SCADA terminology and scope.
- [ISA: ISA-95 Series of Standards](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard). Public descriptions of activities and integration.
- [OPC Foundation: ISA-95 explanation](https://reference.opcfoundation.org/specs/OPC-10030/4.2.3), section 4.2.3. Activity responsibilities and information exchange.

The order, architecture, timestamps and quantities are fictional. The diagram is an explanatory assignment of responsibilities, not a required network design or a claim about any particular installed product. Quality acceptance is complete in this example; shipment readiness is outside it.
