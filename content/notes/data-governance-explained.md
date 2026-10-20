---
title: Data governance explained: roles, rules and a stock-data example
date: 2026-10-15
summary: Sales sees 70 pieces available. The warehouse says 50. The records agree; the definitions don't. Follow the decision from business ownership to a checked change.
seoTitle: Data governance explained: roles and example
seoDescription: Learn data governance through a disputed stock definition. Compare owners, stewards and custodians, then follow a change into reports and checks.
updated: 2026-10-20
status: published
topic: Digital transformation
keywords: data governance explained, data owner vs data steward, data governance example, data custodian, business glossary
---

**Data governance sets the rules for how data is defined, maintained, accessed and used, and who can make those decisions.** It names who can settle a disputed meaning, who looks after it in daily work and how changes reach the systems that depend on it.

Sales reports 70 pieces available. The warehouse reports 50. Both use the same stock records.

A developer receives a request to make the two dashboards agree. Before changing the calculation, someone needs to decide what the number is meant to support.

[IBM's governance overview](https://www.ibm.com/think/topics/data-governance) describes policies, standards and responsibilities across the data lifecycle. This note follows one small part of that job: a shared stock definition that affects an operating decision.

## Data governance example: define available stock

Our fictional warehouse has 100 pieces physically present. Twenty are on quality hold. Thirty other, released pieces are allocated to existing orders. The held and allocated groups do not overlap. Another 40 are due tomorrow and aren't included in the physical 100.

Sales subtracts allocations from physical stock: 100 − 30 = 70. The warehouse also excludes the hold: 100 − 20 − 30 = 50.

If the question is how many unallocated pieces can be picked now, the 50 answers it under these assumptions. The extra 20 in the sales total are physically present but not released for picking.

A planning view may legitimately consider future receipts and the expected release of held stock. It needs dates and conditions that the immediate-picking number doesn't contain. Giving both views the same vague label makes the difference easy to miss.

The [inventory-position note](/notes/inventory-position-vs-on-hand/) separates stock on hand from incoming supply and demand already owed. Here, the governance problem is who agrees which definition belongs in each use.

## Data owner vs data steward vs data custodian

The [UK Government's data ownership model](https://www.gov.uk/government/publications/data-ownership-in-government/data-ownership-model) distinguishes business accountability, day-to-day stewardship and technical custody. The titles below use that distinction; an organisation can assign them within existing jobs.

| Role | Plain responsibility | Assignment in this example |
| --- | --- | --- |
| Data owner | Makes and answers for important decisions about the data's meaning and use | The operations lead approves the stock definition with the affected business teams |
| Data steward | Maintains the definitions, checks recurring issues and coordinates corrections | An inventory specialist documents status rules and investigates conflicting reports |
| Data custodian | Implements and maintains the agreed rules in the relevant systems | The application and data team implements the calculation, access and change records |
| Data consumer | Uses the result for a stated decision and raises problems | Sales, planning and warehouse teams check that their screens answer their actual questions |

The owner needs enough authority to settle the decision. The steward needs access to the work and records. The technical team needs a clear rule to implement. Giving someone a title without those conditions leaves the same disagreement in place.

The [RACI guide](/notes/raci-matrix-guide/) can assign tasks within a definition change. Governance keeps the decision rights and definitions in use after that one change is complete.

## Document a data definition and its owner

For this example, the teams agree to keep the physical and planning views, and give the immediate-picking field a precise name: “Unallocated pickable stock”.

Its rule excludes held and allocated pieces, counts each once, and includes only stock released at the selected location. Future receipts remain in a separate dated view. A missing status or unresolved allocation isn't silently treated as zero.

::interactive governed-stock-definition | Fictional snapshot: 100 pieces physically present, including 20 held and 30 separately allocated; 40 more are incoming. Both calculations use the same records. The approved field answers immediate picking only. The example assumes the held and allocated quantities do not overlap.

Keep the formula with its unit, location, effective date, owner and intended use. A report using it should expose enough of that context for someone to recognise the number.

Changing the name alone won't fix an old report that still calculates 70. Find the calculations, exports and interfaces that use the old label before calling the issue resolved.

## System of record vs single source of truth

A **system of record** is the designated authoritative source for a particular record or field. A **single source of truth** describes the agreed view people should use. Terminology varies; here, the second term means a reconciled view with a governed definition, not necessarily one physical database.

[IBM's comparison](https://www.ibm.com/think/topics/system-of-record-vs-source-of-truth) distinguishes source records from views that bring several domains together. To make that concrete, suppose our fictional warehouse assigns these source roles:

| Information | Authoritative source in this example | Use in the picking view |
| --- | --- | --- |
| Physical quantity | Warehouse movement records | Start with 100 pieces at the selected location |
| Quality hold | Quality-status records linked to that stock | Exclude the 20 held pieces |
| Allocation | Order reservation records | Exclude 30 other pieces already committed |
| Unallocated pickable stock | Governed calculation combining the records | Show 50 pieces for immediate picking |

The systems need matching identities and a compatible snapshot. Yesterday's hold status joined to today's movements can still give a wrong result. Naming a source authoritative does not make every entry in it accurate.

An agreed shared view is a plainer description of what “single source of truth” means here. Master data management, a data warehouse and a system of record have different roles; none is an exact substitute for that meaning.

Keeping three dashboards in one database would not resolve the original disagreement about whether held stock is pickable. The owner must settle that rule, and the technical team must implement it consistently.

The [data-lineage example](/notes/data-lineage-example/) follows a calculated value back through its source fields and forward to the reports that depend on it.

## Apply the agreed definition across reports

The steward lists the sales dashboard, pick screen and planning export that use this field. Each team confirms whether it needs physical stock, immediate pickable stock or a dated planning position.

The owner approves the definition and the business choices it requires. The technical team then implements it, tests the affected uses and records the release version. If a decision exceeds the owner's authority, take it to someone who can decide.

::interactive data-definition-change | One possible change route for the fictional stock field. Roles and approval boundaries are example choices. The decision covers meaning and use; the release check confirms that the affected screens and exports implement it.

Keep the checks readable. With the original inputs, the field must give 50. Releasing the 20 held pieces should make it 70, provided allocations remain 30. Increasing tomorrow's incoming receipt should not change today's immediate-picking quantity.

If an input is unknown, the result needs an unresolved state or an agreed handling rule. An apparently healthy number produced from assumed zeros would undo the definition's purpose.

The [master vs transactional data note](/notes/master-data-vs-transactional-data/) explains why today's rule or product definition shouldn't silently rewrite the meaning of an older event. Retain the version and effective date needed to interpret historical reports.

## Keep governance useful after release

The [data quality dimensions](/notes/data-quality-dimensions/) test whether records are complete, accurate and suitable for use. Governance decides who owns those requirements and what happens when a check fails repeatedly.

A [data catalog or dictionary](/notes/data-catalog-vs-data-dictionary/) can store and expose the definition. It can't decide whether a sales promise may include quality-held stock. That business decision still needs an accountable person and the relevant evidence.

[Vrolen's manufacturing software guide](https://vrolen.com/blog/manufacturing-software-guide/) connects this to systems: define the authoritative source, permitted writers and consumers for each shared record. An integration can otherwise move the same ambiguous field faster without resolving it.

For this warehouse, start with the three screens already using “available”. Confirm each decision, agree the fields it needs and check one shared snapshot through all three. Expand the ownership arrangement when the next cross-team definition needs it.

## Sources and example notes

- [IBM: System of record vs source of truth](https://www.ibm.com/think/topics/system-of-record-vs-source-of-truth). Source authority and reconciled views.
- [IBM: What is data governance?](https://www.ibm.com/think/topics/data-governance). Policies, standards, responsibilities and data use across the lifecycle.
- UK Government. [Data ownership model](https://www.gov.uk/government/publications/data-ownership-in-government/data-ownership-model), especially roles and responsibilities. Business accountability, operational stewardship and technical custody. The warehouse adapts those role distinctions to its own team.

All stock quantities, assignments, field names and decisions are fictional. The example covers one location, one snapshot and held and allocated groups that do not overlap. An actual definition must reflect the source system's status and reservation rules so the same quantity isn't deducted twice.
