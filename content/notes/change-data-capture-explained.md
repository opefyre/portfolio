---
title: Change data capture: CDC vs ETL, with an order example
date: 2026-10-20
summary: An order disappears from the source table but stays in the report. Follow inserts, updates and deletes, then check what happens when the receiving process restarts.
seoTitle: Change data capture: CDC vs ETL, with an example
seoDescription: Understand change data capture through an order-table example. Follow inserts, updates, deletes and restarts, and see how CDC can supply an ETL pipeline.
status: published
topic: Digital transformation
keywords: change data capture explained, CDC vs ETL, change data capture example, database changes, incremental data load
---

The report imports every order changed since yesterday. Updated quantities arrive correctly. An order removed from the source table remains in the report.

The load cannot find a deleted row by looking for its new modification date. The row is no longer there.

**Change data capture, or CDC, identifies changes to source data so another process can consume them.** It can include inserts, updates and deletes. [Microsoft's SQL Server documentation](https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-ver17) describes reading the transaction log and exposing captured changes through change tables.

That is one implementation. The operating question is whether the receiving process can account for every relevant change, including after an interruption.

## CDC vs ETL: they can work together

[ETL means extract, transform, load](/notes/etl-vs-elt/). It describes how data is collected and prepared for a destination. CDC can provide the changed records used in that pipeline.

| Concept | Question it answers |
| --- | --- |
| CDC | Which source records changed, and how? |
| ETL or ELT | Where and how are records prepared for the destination? |
| Batch or stream processing | When and how are groups or flows of records processed? |

A CDC feed can be consumed in periodic batches. It does not automatically mean continuous processing, zero delay or a complete real-time view.

## Follow a snapshot and three changes

Our fictional reporting source is a simple order table. At 09:00, the reporting copy contains order 1042 for 100 units and order 1043 for 50. The copy is complete at the stated starting position.

Then the source changes:

| Change position | Source change | Required effect on this reporting copy |
| --- | --- | --- |
| 201 | Update 1042 from 100 to 80 units | Replace its reported quantity with 80 |
| 202 | Delete the row for 1043 | Remove that row from this copy |
| 203 | Insert 1044 for 40 units | Add the new row |

After all three changes, the copy should contain 1042 at 80 and 1044 at 40: **120 units**. An update-and-insert load that misses the deletion would show 170.

::figure paa3-cdc-records | Fictional simplified mirror of an order table. Positions 201–203 are teaching identifiers, not a vendor's log format. After update, delete and insert are applied, two rows remain with a total quantity of 120 units. Deleting a database row does not, by itself, define the business meaning of the deletion.

The example mirrors rows. It does not instruct the warehouse to cancel a shipment because a row disappeared. Archiving, cancellation and an upstream correction can have different meanings. Agree that contract before downstream systems act on the changes.

## A restart needs more than a green connection

Suppose the receiver commits changes through position 202, then stops before 203. It should resume from a recorded position consistent with what it has actually committed.

Recording 203 before its effect is saved could skip the new order. Replaying an earlier range could deliver a change again. The consumer needs a deliberate way to handle replay, such as recognising the applied change identity or safely applying a versioned state.

The [batch and stream example](/notes/batch-vs-stream-processing/) follows late and repeated records. A newer timestamp on the dashboard does not establish completeness.

## Plan the starting point and the retention window

The initial snapshot and change feed need a consistent handover. Otherwise a change occurring during the copy can be missed or applied against the wrong starting state. Use the source system's documented snapshot and position method.

Captured changes are also retained under a policy. If the receiver falls behind beyond the available history, it may need a new consistent snapshot rather than pretending it has caught up.

Agree how schema changes, access and deleted records affect the destination. Keep reconciliation counts and selected business totals alongside the feed's technical status. [Data lineage](/notes/data-lineage-example/) helps show which source and transformations produced the report people are using.

For this example, checking both row identities and quantities exposes the missing deletion. A successful import alone would leave the extra fifty units looking perfectly plausible.

## Source and example notes

- [Microsoft: SQL Server change data capture](https://learn.microsoft.com/en-us/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-ver17). Log capture, change tables, query ranges and retained history. Product behaviour is version-specific.

Orders, quantities and positions are fictional. The diagram is a conceptual row mirror, not a SQL Server setup procedure. Initial-copy consistency, replay and schema handling need implementation-specific tests.
