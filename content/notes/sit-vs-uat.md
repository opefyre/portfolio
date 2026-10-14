---
title: SIT vs UAT: the order arrived, but can the team use it?
date: 2026-10-14
summary: An order passes between two systems correctly. The warehouse ships part of it, but customer service can't see what remains. Follow one example through integration and user acceptance testing.
seoTitle: SIT vs UAT: differences and a worked example
seoDescription: Understand system integration testing and user acceptance testing with an order example. Compare objectives, evidence, responsibilities and acceptance criteria.
status: published
topic: Digital transformation
keywords: SIT vs UAT, system integration testing, user acceptance testing example, SIT and UAT difference, acceptance criteria ERP
---

The project team says the order interface works. The warehouse receives the right quantity, with the right order number, exactly once.

During a trial, the warehouse ships 40 of the 100 requested units. Customer service opens the order and can't find the remaining 60. The packing record describes the order as complete.

Passing the interface checks hasn't answered whether the business can use the result.

**System integration testing, or SIT, checks interactions between systems. User acceptance testing, or UAT, checks whether intended users can meet their business needs with the solution.** The same order can appear in both. The purpose and evidence differ.

The [ISTQB Foundation Level syllabus](https://istqb.org/?download_id=3345&sdm_process_download=1#page=29) distinguishes these test levels. It also separates system testing, which checks an entire system's behaviour, from integration with other systems and services. “SIT” is sometimes used more broadly in projects, so agree the scope rather than relying on the abbreviation.

## SIT and UAT compared

| Aspect | System integration testing | User acceptance testing |
| --- | --- | --- |
| Main question | Do these systems interact as required? | Can users perform the agreed business work? |
| Example basis | Interface rules, field mappings and error handling | Business requirements and acceptance criteria |
| Evidence in our order example | Order ID, quantities and units arrive correctly; retries don't duplicate the order | Users can ship a permitted partial quantity and manage the outstanding balance |
| People involved | Testers and integration specialists, with system owners | Intended users and business representatives, supported by testers and specialists |
| What a pass establishes | The interactions covered by those checks worked in that environment | The tested business scenarios met their acceptance criteria |

Neither column grants a blanket guarantee about everything the project will do. Performance, security, operational support and other release checks still need their agreed coverage.

## One order, two sets of evidence

Use a fictional distributor connecting its enterprise resource planning system, or ERP, to a warehouse system and a customer-service screen. ERP records the order; the warehouse picks and dispatches it; customer service handles the remaining commitment. The [ERP, MES and SCADA note](/notes/erp-mes-scada/) explains how system responsibilities can differ.

For this example, partial shipment is allowed. The agreed business rule says a 100-unit order shipped in two parts must remain visibly open for the unshipped balance. Users need to see what shipped, what remains and who follows it up.

The partial-order test sends a request for 100 units, with 40 available and 60 backordered. The interface transfers all three values correctly and creates one warehouse order. Those specific integration checks pass.

But the packing record says “complete”, and the customer-service screen shows no open balance. A representative cannot manage the remaining 60 through the intended process. That acceptance criterion fails.

::interactive acceptance-order-evidence | Fictional distributor and declared test results, not a live software simulation. The partial-order case passes the listed field-transfer and single-order checks, while failing the agreed outstanding-balance criterion. This does not claim that every possible SIT test passed. All three case results stay visible in the comparison table.

The normal-order case cannot expose this gap: 100 units are available, 100 ship and zero remain. The partial-order case exercises a different business rule.

The duplicate case checks another failure. Replaying a message with the same order ID creates two pick orders. That fails the stated integration rule and creates a business problem too. A useful test programme includes normal work, exceptions and recovery.

## Write the acceptance criterion before the test

“Users can process orders” leaves too much room for interpretation. The team could demonstrate one successful shipment and believe it has finished.

For the partial-order scenario, write something people can check:

:::card Acceptance criterion for this fictional order
Given an accepted order for 100 units and an authorised shipment of 40, the packing record must identify the shipment as partial. Customer service must see 40 shipped and 60 still open against the same order, with the agreed follow-up owner. The order must not appear fully fulfilled.
:::

Then specify how to test it: prepare the order and stock, use the warehouse role to dispatch 40, open the service view with the intended user's permissions and compare both records with the expected result.

The [ISTQB acceptance-testing syllabus](https://www.istqb.org/wp-content/uploads/2024/11/ISTQB-CT-AcT_Syllabus_v1.0_2019.pdf#page=11) recommends developing criteria and tests together while requirements are being defined. That discussion could expose the missing balance view before the team builds the interface.

If partial shipment was already agreed, fixing its missing behaviour is defect work. If the business is requesting a new capability, use the project's [scope and change-control process](/notes/scope-creep-change-control/) to decide it. Calling every user finding a change request can conceal an unmet requirement.

## Does SIT have to finish before UAT starts?

Some projects use a formal handoff. Others test increments with overlapping activities. Either way, plan the business scenarios early enough to shape the work.

For this distributor, the team could require working order transfer, representative test data and usable user access before running the partial-shipment acceptance test. Running it against a broken connection would make it difficult to judge the screen's business behaviour.

That doesn't mean business users should wait until the last week to discuss what “partial” means. They can review the rule and expected records while the connection is being developed.

The [risk vs issue example](/notes/project-risk-vs-issue/) follows missing test access through a project. Here too, “testing scheduled” needs evidence that the people, data and environment are ready.

## Make the acceptance decision traceable

Keep the tested version, scenario, user role, input data, expected result and actual evidence together. If the partial order fails, assign the finding, correct it and rerun the failed scenario. Check related behaviour that the fix could affect, including full shipments and duplicate-message handling.

For the wider choice of software and process responsibilities, [Vrolen's manufacturing software guide](https://vrolen.com/blog/manufacturing-software-guide/) is useful context. A successful connection is one part of making those responsibilities work together.

Before signing off our distributor's order process, ask the warehouse and customer-service users to follow the same partial order. They should be able to reconcile 100 requested, 40 shipped and 60 open without a separate spreadsheet explaining what the screen left out.

## Sources and example notes

- [ISTQB: Certified Tester Foundation Level syllabus v4.0.1](https://istqb.org/?download_id=3345&sdm_process_download=1), 15 September 2024, sections 2.2.1 and 2.2.3. Test-level objectives, possible overlap, confirmation and regression testing.
- [ISTQB: Acceptance Testing syllabus v1.0](https://www.istqb.org/wp-content/uploads/2024/11/ISTQB-CT-AcT_Syllabus_v1.0_2019.pdf), 21 June 2019, sections 1.1.2–1.1.3 and 1.2.2. Criteria, test cases and collaboration while requirements are defined.

The distributor, records, test results and business rules are fictional. The visual compares declared cases; it doesn't execute software or assess a real release. Business and integration testing can expose overlapping defects. Their labels don't reserve particular problems for particular teams.
