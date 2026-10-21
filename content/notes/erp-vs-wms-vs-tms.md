---
title: ERP vs WMS vs TMS: follow one customer order
date: 2026-10-21
summary: The order exists, the warehouse has picked it and transport still shows no departure. See what each system does and why one green status cannot describe the whole delivery.
seoTitle: ERP vs WMS vs TMS: roles and a delivery example
seoDescription: Follow one order through ERP, warehouse management and transport management. Compare responsibilities, stock states and the events that connect the systems.
status: published
topic: Digital transformation
keywords: ERP vs WMS vs TMS, warehouse management system, transportation management system, order fulfilment systems
---

**ERP means enterprise resource planning, WMS means warehouse management system, and TMS means transportation management system.** In a common fulfilment setup, ERP supports business orders and records, WMS directs warehouse execution, and TMS plans and manages transport.

Products overlap. These can be separate applications or modules in a suite, and the actual division of responsibility needs to be agreed.

An order marked “picked” is a good way to see why those boundaries matter. The goods may still be sitting at the loading bay.

## What does each system do?

[Oracle describes WMS](https://www.oracle.com/scm/logistics/warehouse-management/what-is-warehouse-management/) around warehouse inventory and fulfilment, and [TMS](https://www.oracle.com/scm/logistics/transportation-management/what-is-transportation-management-system/) around planning and executing goods movement. The table below uses those broad roles for one fictional architecture, rather than claiming universal product boundaries.

| System | Main role in this example | Record or task it handles | What that record alone does not prove |
| --- | --- | --- | --- |
| ERP | Coordinate the business order and related commercial records | Sales order, agreed allocation, financial posting | That the goods are physically picked or delivered |
| WMS | Direct and record warehouse work | Location, lot, pick, pack and dispatch confirmation | That the carrier has completed delivery |
| TMS | Arrange and track transport execution | Load plan, carrier booking, departure and delivery events | That every warehouse or financial record has updated |

ERP can contain warehouse functions. A WMS can help build loads. A TMS may handle freight settlement. Check the requirements and the configured product before buying another application to fill an assumed gap.

## Follow a 40-unit order through the three systems

The fictional warehouse has 70 physical units of one product. Ten are on quality hold and twenty are already allocated to earlier orders. That leaves 40 usable, uncommitted units for the new order.

The agreed availability service confirms that quantity, and ERP records the allocation. WMS receives the warehouse task, directs the pick from the right released lot and records the packed quantity. TMS has a carrier booking for the consignment.

::figure gap-system-events | Fictional order sequence. Order allocation, warehouse pick confirmation, physical dispatch and proof of delivery are separate events. The architecture must define which record is authoritative at each step.

If the warehouse picks all 40 units, it can report the pick complete. The stock has changed location or status inside the warehouse. That alone does not mean a vehicle has departed or a customer has received anything.

The [ATP and CTP explanation](/notes/atp-vs-ctp/) goes deeper into supply promises. This example assumes the availability decision is valid and follows what happens after it.

## Give each status a precise event

At 14:05, the vehicle departs and the warehouse records dispatch. ERP receives the shipment confirmation at 14:06. A carrier tracking event reaches TMS at 14:20.

For fourteen minutes, transport tracking is behind the warehouse event. That can be an expected information delay or an integration fault. A single label such as “not shipped” would hide which one the user is seeing.

Show the source and event time where the distinction matters. The dispatch record, the carrier departure and proof of delivery answer different operational questions. Define which event drives each customer message and performance measure.

The [OTIF note](/notes/otif-vs-on-time-delivery/) explains why the chosen delivery event and quantity basis matter. Counting a complete pick as a complete delivery would give the wrong result even if every system message arrived perfectly.

## Make retries safe before connecting the systems

If the dispatch message is resent after a timeout, the receiver needs to recognise the same shipment event rather than post a second stock issue. The design also needs a route for missing, rejected or out-of-sequence events.

Record the shipment and event IDs, status, relevant quantity, unit, source time and processing result. Reconcile the business totals as well as the technical message count. Ten messages received is not proof that ten distinct shipments posted correctly.

:::link /notes/event-driven-architecture-example/ | See how separate event consumers handle the same business event
The event-driven example follows processing, retries and failure handling without treating a sent message as a completed business action.
:::

## Decide ownership before arguing about interfaces

The warehouse lead needs to know where to correct a wrong lot. The transport team needs to know who can amend a booking after packing. Finance needs to know which accepted event creates its record.

Write those rules into the [data-governance record](/notes/data-governance-explained/) and test them with actual exception cases. An interface specification that lists fields without naming the decision owner leaves important work undefined.

For a factory view, the [ERP, MES and SCADA note](/notes/erp-mes-scada/) follows the production layers. ERP/WMS/TMS follows fulfilment beyond the factory. The two maps should meet at agreed events rather than compete to own the same status.

## Sources and example notes

- [Oracle: What is a WMS?](https://www.oracle.com/scm/logistics/warehouse-management/what-is-warehouse-management/). Warehouse execution and inventory scope.
- [Oracle: What is a TMS?](https://www.oracle.com/scm/logistics/transportation-management/what-is-transportation-management-system/). Transport planning, execution and system overlap.

All quantities, architecture choices and event times are fictional.
