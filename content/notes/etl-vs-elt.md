---
title: ETL vs ELT: the data arrived, but can you use it?
date: 2026-10-14
summary: Two cases, five pieces and a blank quantity arrive in a stock file. Follow them through ETL and ELT to see what changes, what doesn't, and what a planner should receive.
seoTitle: ETL vs ELT explained with an inventory example
seoDescription: Compare ETL and ELT using inventory records. See where transformation happens, how to convert units, and why loaded data may still be unusable.
status: published
topic: Digital transformation
keywords: ETL vs ELT, ETL meaning, ELT meaning, data transformation example, data integration manufacturing
---

An inventory file arrives successfully. Every row reaches its destination. Then the report puts “2 cases” beside “5 pieces” and treats a blank quantity as zero.

The transfer worked. The report still needs rules for what those values mean.

**ETL means extract, transform, load. ELT means extract, load, transform.** Both move data from its source into a destination used for analysis. The difference is where the transformation happens: before loading that target store in ETL, or inside it after loading in ELT. [Microsoft's architecture guide](https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl) sets out this distinction.

Choosing the order of those letters doesn't decide how many pieces fit in a case, or what to do when a quantity is missing. Someone still has to define those rules.

## What extract, transform and load mean

A data pipeline is the path that collects and prepares information for another use. For this example, the destination is a reporting database. It may be called a data warehouse, which means an analytical data store rather than a building full of stock.

| Step | Plain meaning | In our inventory file |
| --- | --- | --- |
| Extract | Copy the source records | Read the stock file without changing its original values |
| Transform | Check, convert or reshape the data | Convert cases to pieces using the correct item's pack size |
| Load | Store data in the target system | Save rows in the reporting database |

[AWS describes these three steps](https://aws.amazon.com/compare/the-difference-between-etl-and-elt/) as preparation for analysis. Transformation can include joining records, removing confirmed duplicates or applying business definitions. A unit conversion is a small example with a visible consequence: two cases of ten pieces becomes 20 pieces, not two.

## Follow the same three records through both routes

Our fictional file contains one row per item at location L1, effective at 09:00 on 14 October 2026. All three quantities refer to stock available for this example. The report needs individual pieces by item.

| Item | Source quantity | Source unit | Rule or missing evidence | Prepared quantity |
| --- | ---: | --- | --- | --- |
| A | 2 | Cases | Approved pack reference: 10 pieces per case | 20 pieces |
| B | 5 | Pieces | Already in the requested unit | 5 pieces |
| C | Blank | Pieces | Quantity unknown | Unresolved |

The conversion applies to item A, not every case in the warehouse. We keep the approved reference with the prepared record so the conversion can be checked later.

Item C stays unresolved. A blank isn't evidence that the bin is empty. Sending zero to a planner would change the meaning of the source.

We have two usable item records out of three. Adding 20 and 5 would mix different items into a stock figure that doesn't answer either item's planning question.

## ETL and ELT change where the work happens

With ETL, a separate processing step applies the rules before loading the prepared records into the reporting database. A and B enter the ready-to-use table. C goes to an exception record for follow-up. The original file is retained separately in this example.

With ELT, all three source-shaped rows enter a raw area of the target database first. Rules then build the ready-to-use table inside that system. A and B become usable; C remains unresolved. “Raw” here means the original form is preserved, not that planners should use it without review.

::interactive etl-elt-records | Fictional inventory file with three different items at L1, effective 09:00 on 14 October 2026. Both routes apply the same rules and preserve unresolved records. Remove A's pack reference to see why the row must wait. The diagram compares data handling, not processing speed or software cost.

Remove the approved conversion reference and item A also becomes unresolved. Both routes now produce one ready record, B. Moving transformation inside the database hasn't supplied the missing pack size.

The [six data quality dimensions](/notes/data-quality-dimensions/) help describe these two failures. A missing quantity needs evidence about stock. A missing conversion needs the right master-data reference. They need different follow-ups, even if both rows are held out of the ready table.

## Choose the route around the system you have

ETL makes sense when the target shouldn't have to perform the transformation or when preparation needs a separate processing environment. ELT puts that work in the target, so its processing capacity and access controls need to support it. These are architecture choices, not a quality ranking.

| Question to ask | Why it changes the design |
| --- | --- |
| Where can the rules run and be maintained? | The target may support the work, or a separate engine may be more appropriate |
| What original data must be retained? | Corrections and changed definitions may require rebuilding prepared records |
| Who can see and use each stage? | A raw row and an approved planning input need different treatment |
| Who owns exceptions? | A successful load can still leave quantities or references unresolved |

ETL can retain source copies and staging data too. ELT doesn't mean every loaded row is immediately exposed to users. A design can combine preparation before loading with further transformation afterwards.

Ask the team to show one real record all the way through. Where is the original value? Which rule changed it? What happens when the rule cannot run? Which table does the report actually read?

Those questions are easier to answer on three rows than after a dashboard has combined thousands of records.

## Make the prepared record explain itself

For item A, keep the source quantity of two cases, the item-specific conversion, the resulting 20 pieces and the effective time. Record when it was imported as a separate timestamp. A later arrival doesn't make the stock itself more recent.

For C, retain an unresolved reason and an owner who can check it. Don't drop it quietly and label the remaining file complete.

Vrolen's [manufacturing data analytics guide](https://vrolen.com/blog/manufacturing-data-analytics/) extends this to machine, order and quality records. Linking their identities, units and times is part of making the combined result usable.

Before approving a pipeline, check its prepared output against the decision it will support. A planner needs a trustworthy quantity for the right item at the right time, plus a visible reason to investigate anything unresolved. A green “load completed” message establishes only part of that.

## Sources

- Microsoft Learn. [Extract, transform, and load](https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl). ETL/ELT definitions, transformation location and target-processing considerations.
- AWS. [The difference between ETL and ELT](https://aws.amazon.com/compare/the-difference-between-etl-and-elt/). The three processing steps and the option to combine the two approaches.

All stock rows, conversion references and outputs are fictional. The example compares one target reporting database boundary. It does not measure platform performance, cost or production readiness.
