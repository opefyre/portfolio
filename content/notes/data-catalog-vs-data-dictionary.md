---
title: Data catalog vs data dictionary: a worked comparison
date: 2026-10-20
summary: Two datasets both say inventory. One answers a picking question; the other values month-end stock. Use a catalog to choose the data and a dictionary to understand its fields.
seoTitle: Data catalog vs data dictionary: a comparison
seoDescription: Compare a data catalog, data dictionary and business glossary with stock examples. Find the right dataset, define its fields and keep the documentation current.
status: published
topic: Digital transformation
keywords: data catalog vs data dictionary, data dictionary example, business glossary vs data dictionary, active passive data dictionary
---

A **data catalog helps people find and assess data assets** such as datasets and reports. A **data dictionary describes the fields inside a dataset**, including their structure and meaning. They work together: finding a table is different from understanding what its columns mean.

[IBM's comparison](https://www.ibm.com/think/topics/data-catalog) distinguishes that broad asset view from field-level definitions. The difference becomes practical when two datasets both have “inventory” in their name.

An operations analyst needs to know what can be picked now. Finance has a month-end inventory file. The warehouse has a current item/location view. Downloading the most familiar file could answer the wrong question very accurately.

## Data catalog example: choose the dataset before using it

Our fictional company records the following information about two assets. **Grain** means what one row represents.

| Catalog detail | Warehouse pickable-stock view | Month-end inventory valuation |
| --- | --- | --- |
| Purpose | Identify unallocated pieces released for immediate picking | Report stock value at the month-end cutoff |
| Grain | One item at one location per snapshot | One product family at one month end |
| Main quantity or value | Individual pieces, with item/location identity | Euros at the stated valuation basis |
| Business owner | Inventory operations lead | Finance inventory owner |
| Timing | Expected five-minute refresh; latest load 09:05, source snapshot 09:00 | Monthly; example cutoff 30 September |
| Access and checks | Request access through the named route; inspect unresolved stock statuses | Finance access route and reconciliation record |

The catalog makes the warehouse view the better candidate for the immediate-picking question. It also exposes a freshness question: a load at 09:05 still contains a 09:00 snapshot.

An entry may describe data without giving everyone permission to read it. Discovery and access approval remain separate.

::figure paa2-catalog-dictionary | Fictional stock-data documentation. A catalog entry identifies the asset, purpose, grain, owner and timing. A dictionary describes its fields. A business glossary supplies the agreed term used by people across teams. None of the three replaces access approval or source-data checks.

## Data dictionary example: make the fields usable

Once the analyst chooses the warehouse view, the dictionary should answer the questions that a column name leaves open.

| Field | Type and unit | Meaning and important rule |
| --- | --- | --- |
| item_id | Text identifier | Approved item identity; required, not a description to match approximately |
| location_id | Text identifier | Location the quantity belongs to; required |
| snapshot_time | Timestamp with documented time zone | Time the stock state represents, distinct from import time |
| pickable_qty | Integer, individual pieces | Released, unallocated quantity for that item/location under the approved rule; missing means unresolved, not zero |
| calculation_version | Text identifier | Version of the rule used to derive pickable_qty |

Also document allowed values, precision, keys and relevant relationships where they affect use. An identifier that looks numeric may still need to retain leading zeros. A quantity needs an explicit rule for partial units if those are possible.

The dictionary should link the calculated field to its definition and derivation. The [data-lineage example](/notes/data-lineage-example/) shows how a reported stock value can be followed through its source inputs and rule version.

## Where does a business glossary fit?

A **business glossary defines the terms people use**, such as “unallocated pickable stock”. The dictionary links that business meaning to fields, formats and rules in a particular dataset.

A catalog may hold or link both. That does not make the three terms interchangeable. The same business term can appear in several systems, while one technical column name can mean different things in different datasets.

In this example, the glossary must establish whether quality-held stock is pickable. The [governance Note](/notes/data-governance-explained/) follows who makes that decision and how it reaches the reports.

You may also see “metadata repository” used for a wider store of information about data. Check the contents and role of the particular repository instead of treating the label as an exact synonym for a dictionary or catalog.

## Active vs passive data dictionaries

One common classification concerns how the dictionary stays in sync. The [IRS analysis guidance](https://www.irs.gov/irm/part2/irm_02-005-011) describes an active dictionary updated by the database management system and a passive dictionary maintained separately and manually.

Under that convention, an automatically maintained database dictionary can reflect a changed column type. A separately maintained field document needs someone to update it. Neither automatically settles the business meaning of “available”.

A spreadsheet can be a useful first dictionary for a small scope, provided its owner, version and update route are clear. A purchased catalog can contain stale descriptions if nobody maintains them. The distinction is about the work being done, not whether the tool is expensive.

## Create the minimum record that supports the next decision

Start with the dataset the analyst actually needs. Record its purpose, grain, owner, access route and effective timing. Define the fields that could change the decision: identity, units, status, missing-value rules and derived quantities.

Ask a user to interpret a sample without help from the person who wrote the record. If “qty” still requires a phone call to discover whether it means pieces, cases or euros, the documentation is incomplete.

Check it again when the schema, calculation or business rule changes. [Data-quality checks](/notes/data-quality-dimensions/) can reveal invalid values and missing records; the catalog and dictionary make those checks easier to interpret and maintain.

For the picking request, use the current item/location view, inspect its source time and read the pickable-quantity rule. The month-end valuation file remains useful for Finance. It simply serves a different decision.

## Sources and example notes

- [IBM: What is a data catalog?](https://www.ibm.com/think/topics/data-catalog), especially catalog versus dictionary and metadata context.
- [IRS: Analysis techniques and deliverables](https://www.irs.gov/irm/part2/irm_02-005-011), section 2.5.11.4.1, dictionary contents and active/passive maintenance convention.

The company, assets, field names, timings and assignments are fictional. The table is a compact example, not a complete database schema or access policy. A populated metadata record does not prove that its data is correct, current or appropriate for every use.
