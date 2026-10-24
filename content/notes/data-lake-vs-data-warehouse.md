---
title: Data lake vs data warehouse: follow the records into the report
date: 2026-10-24
summary: Two cases, five pieces and an unknown quantity need more than somewhere to land. Follow the same records through raw storage and prepared reporting tables.
seoTitle: Data lake vs data warehouse: roles and differences
seoDescription: Compare data lakes and data warehouses using three inventory records. See how S3, SQL, ETL, ELT and prepared reporting tables fit the same data journey.
status: published
topic: Digital transformation
keywords: data lake vs data warehouse, is S3 a data lake, SQL data lake, data lake ETL ELT, lakehouse explained
---

A data lake stores data in forms that can support several later uses, often retaining source files and records. A data warehouse organises data for analytical queries and reporting.

Modern systems can combine these roles, so a product name alone may not tell you where preparation or querying happens.

[AWS's analytical-storage guidance](https://docs.aws.amazon.com/whitepapers/latest/data-warehousing-on-aws/data-storage.html) describes warehouses, marts and combined lakehouse arrangements. A lakehouse brings lake storage and warehouse-style analytical capabilities together; it is not proof that the records are ready to use.

A planner needs to know which stored quantity reaches the report and which rules made it suitable for that decision.

## Follow the same three stock records

The [ETL/ELT Note](/notes/etl-vs-elt/) uses a fictional inventory file for location L1, effective at 09:00 on 14 October 2026. It contains three different items.

| Item | Source record | Preparation needed | Reporting result |
| --- | --- | --- | --- |
| A | 2 cases | Approved conversion: 10 pieces per case | 20 pieces |
| B | 5 pieces | Preserve the stated unit | 5 pieces |
| C | Quantity blank | Find the missing stock evidence | Unresolved |

Retaining the original file helps a later reviewer see what arrived. Preparing an analytical table helps the report apply agreed quantities, units and exceptions consistently.

Neither activity supplies C's missing quantity. Storing the blank in a different product does not make it zero.

::figure r4-storage-path | Existing fictional inventory records: A becomes 20 pieces, B remains 5 pieces, and C stays unresolved. Original records and prepared analytical tables have different jobs. The drawing shows roles, not a mandatory product architecture or a measured speed comparison.

## Compare the roles without a rigid product boundary

| Question | Lake-style storage | Warehouse-style analytics |
| --- | --- | --- |
| What does it commonly retain? | Source-shaped files and datasets for several possible uses | Organised analytical tables and shared reporting definitions |
| When are rules applied? | During preparation or when a particular use reads the data | During loading, later processing or query, depending on the design |
| What should the planner receive? | A defined usable view, rather than any arbitrary raw file | The approved analytical view, with unresolved evidence visible |
| What still needs an owner? | Access, record identity, versions, preparation and retention | Definitions, transformations, exceptions, access and change control |

These columns describe roles, not exclusive feature lists. A warehouse can keep raw or semi-structured data. A lake can support curated tables and SQL queries.

## S3 is storage; SQL is a language

[Amazon S3 is object storage that can provide the storage layer for a data lake](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html). Creating a bucket does not also create the catalogue, access rules, preparation logic and reporting definitions the business needs.

SQL is a query language. Teams can use it with warehouses and with engines that query data stored in a lake. [AWS documents querying lake and warehouse data together](https://docs.aws.amazon.com/whitepapers/latest/data-warehousing-on-aws/data-storage.html), including data kept in place.

For item A, an SQL query still needs the correct ten-pieces-per-case reference. A successful query does not establish that the reference applies to this item and effective time.

The [catalog vs dictionary Note](/notes/data-catalog-vs-data-dictionary/) separates finding a dataset from understanding its fields. Both matter when several source files and prepared versions are available.

## ETL and ELT describe the preparation boundary

ETL means extract, transform, load: prepare data before loading the chosen target. ELT means extract, load, transform: load it first, then prepare it inside that target.

A design can use either or combine them. The letters do not require “ETL for warehouses” and “ELT for lakes.” State which store the word load refers to.

In the inventory example, both routes can produce 20 pieces for A, five for B and an unresolved C, provided they apply the same rules. Choosing the processing location does not change that evidence requirement.

## Make the report traceable to its inputs

Keep the original quantity and unit, item-specific conversion, effective time, prepared result and rule version connected. Record import time separately from when the stock was effective.

The [lineage example](/notes/data-lineage-example/) follows that path. If a later correction changes A's pack reference, the owner should be able to identify which prepared rows and reports need review.

For C, expose the missing quantity and the person checking it. The [data-quality Note](/notes/data-quality-dimensions/) explains why passing a format or completeness check alone cannot establish a usable stock balance.

Before choosing storage products, ask the team to trace these three records into the intended planning screen. Identify where originals remain, where rules run and who resolves C. That record-level explanation gives the architecture a job to do.

## Sources and example notes

- [AWS: analytical data storage](https://docs.aws.amazon.com/whitepapers/latest/data-warehousing-on-aws/data-storage.html), warehouses, marts, lakehouses and queries across storage roles.
- [The existing ETL/ELT example](/notes/etl-vs-elt/), fictional inventory inputs, conversion and unresolved quantity reused here.

The article compares roles using the teaching records. It does not rank products, measure query speed or estimate cost. Exact features and access controls depend on the selected products and design.
