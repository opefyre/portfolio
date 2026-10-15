---
title: Data migration vs data integration: differences and a cutover example
date: 2026-10-15
summary: Three stock rows and their total match, yet the new system has the wrong item quantities. Compare migration with ongoing integration, then reconcile a cutover snapshot.
seoTitle: Data migration vs data integration: key differences
seoDescription: Compare data migration and data integration with an ERP stock example. Check item quantities, holds and the final changes before approving a cutover.
status: published
topic: Digital transformation
keywords: data migration vs data integration, ERP data migration reconciliation, data migration example, cutover validation, delta migration
---

**Data migration moves data into a new system or environment. Data integration combines and aligns data from different sources so it can be used together.** A migration aims to leave the required data ready in the new environment. An integration often keeps supplying or updating it afterwards.

Both may use extraction, mapping, transformation and loading. The difference is the purpose and the acceptance decision, not whether someone wrote a script or called an API.

IBM's [migration](https://www.ibm.com/think/topics/data-migration) and [integration](https://www.ibm.com/think/topics/data-integration) explanations describe those purposes. Moving opening stock into a new ERP and keeping its warehouse feed working are related jobs, but a successful opening load does not show that the ongoing feed works.

## Data migration vs integration: the main differences

| Question | Data migration | Data integration |
| --- | --- | --- |
| What is the intended result? | Establish the required data in the target environment | Bring data together in a consistent, usable form |
| What happens over time? | Rehearsals and staged transfers can lead to a controlled cutover | Updates may run periodically or continuously for the required use |
| What needs checking? | Required records, relationships and opening state at an agreed cutoff | Mappings, updates, exceptions and the meaning of the combined output |
| Warehouse example | Load item stock, holds and allocations into the replacement ERP | Feed later warehouse movements into the authorised stock record |
| Are the jobs exclusive? | No; migration can use integration tools and incremental loads | No; ongoing integration may need an initial migrated baseline |

The [ETL vs ELT comparison](/notes/etl-vs-elt/) explains where transformation happens. That architecture choice can support either job. It does not supply the missing item mapping or decide which stock status is pickable.

## ERP migration example: matching totals can hide wrong records

Our fictional warehouse moves one location's stock into a replacement enterprise resource planning system, or ERP. Every quantity below is in individual pieces, identified by item and location. Held and allocated stock are separate groups.

At the initial extract, the source holds 250 pieces across three items. A trial target also has three rows and 250 pieces. Its import job reports success.

But twenty pieces belonging to P03 have been assigned to P02, and P01's ten held pieces have lost their hold quantity. The row count and total have concealed different errors.

Before cutover, the warehouse issues ten unallocated, released pieces from P01. The source now holds 240. That final movement needs to reach the target once, alongside the corrected mapping.

| Source at cutover | Physical stock | Allocated | Held | Unallocated pickable stock |
| --- | ---: | ---: | ---: | ---: |
| P01 | 110 | 20 | 10 | 80 |
| P02 | 80 | 0 | 20 | 60 |
| P03 | 50 | 10 | 0 | 40 |
| Total | 240 | 30 | 30 | 180 |

Here, pickable means physical less the separate, non-overlapping held and allocated groups. The [data governance example](/notes/data-governance-explained/) explains why that definition needs agreement before comparing screens.

## Reconcile by item, status and cutoff

The target starts with the final ten-piece issue included. Its total matches 240, but the item quantities and hold records are still wrong.

Correct the mapping, then remove the final movement to see why a correct extract can still be too old for cutover.

::interactive migration-reconciliation | Fictional source and target at one location, all quantities in pieces. The source includes a final ten-piece P01 issue. Correct the item and hold mappings, then check that the final issue is included once. Other migration checks remain outside this stock example.

A complete stock check compares the item and location keys, units, physical quantity, held quantity and allocations at the same effective time. A duplicate row, unknown status or missing item must remain visible as an exception.

The [master-data vs transactional-data example](/notes/master-data-vs-transactional-data/) shows why a correct item ID is not enough if its quantity uses the wrong pack definition. Reconcile converted values against the original quantities and approved conversion too.

Do not stop at stock totals. Open orders need their remaining quantities, status and relationships checked. Test that a held lot stays blocked and a legitimate shipment can post using the intended opening records.

## Plan the final delta and the switch in authority

A **delta load** brings changes since an earlier extraction. It is useful when a full transfer happens before the business stops using the old system.

Microsoft's [cutover-planning guide](https://learn.microsoft.com/en-us/power-platform/architecture/key-concepts/data-migration/cut-over-planning) describes full and incremental loads, comparison by business users and a final load under controlled change conditions. Its suggested timings are specific to that platform context, not deadlines used in this example.

For this warehouse, agree when the old system stops accepting stock postings, how the last movements are captured and who checks the resulting target state. Record what happens if the check fails, including the rollback decision and how any new postings would be reconciled.

Agree when each system may stop or start posting movements. If both systems can independently post the same issue after cutover, correct opening balances can diverge immediately. Record the authoritative stock system and the role of the warehouse connection.

## Keep integration controls after migration ends

The next warehouse issue still needs item identity, units, timing and a stable movement identity. Repeating a message must not issue the stock twice. The [EDI vs API example](/notes/edi-vs-api/) follows that retry problem through an order connection.

Monitor failed updates and unresolved records after go-live. Define who corrects them and how the corrected result is checked. A migration reconciliation sheet will not notice tomorrow's disconnected warehouse feed by itself.

The [SIT and UAT guide](/notes/sit-vs-uat/) separates the integration check from the user's ability to complete the business flow. Keep both in the release evidence.

For these three items, fix the mapping and replay the ten-piece issue once before reviewing the stock checks. Then follow a real permitted movement through the new operating route. That connects the opening state to the system the warehouse will actually use.

## Sources and example notes

- [IBM: Data migration](https://www.ibm.com/think/topics/data-migration). Moving data between environments.
- [IBM: Data integration](https://www.ibm.com/think/topics/data-integration). Combining and aligning sources for use.
- [Microsoft Learn: Data migration planning for go-live](https://learn.microsoft.com/en-us/power-platform/architecture/key-concepts/data-migration/cut-over-planning). Load rehearsal, delta changes, validation and controlled cutover.

All items, balances and errors are fictional. The stock figure covers one location. A migration also needs checks for lot history, open orders, accounting and access. Preserve movement IDs when replaying final changes.
