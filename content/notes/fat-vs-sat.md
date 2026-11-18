---
title: FAT vs SAT: testing equipment before you accept it
date: 2026-11-18
summary: A supplier test and an installed-site test answer different questions. Agree what each must prove, keep the evidence and close the remaining issues.
seoTitle: FAT vs SAT: equipment acceptance testing explained
seoDescription: Compare factory and site acceptance testing. Learn what to test, who should witness it and how to handle defects before accepting industrial equipment.
status: published
topic: Project management
keywords: FAT vs SAT, factory acceptance test, site acceptance test, equipment acceptance checklist, commissioning
---

A factory acceptance test, or FAT, checks the agreed equipment or automation scope before shipment, usually at the supplier. A site acceptance test, or SAT, checks the installed scope at its destination. Site utilities, field connections and neighbouring systems can introduce conditions the supplier's test could not reproduce.

Agree the tests while the requirements are still being written. Waiting until a machine is ready to ship leaves everyone arguing about what a successful demonstration was supposed to establish.

I participated in production-line commissioning at Unilever and BAT. Acceptance testing is one part of the wider work of getting equipment ready for use. The distinction below helps project teams keep track of what they have actually checked.

## FAT and SAT compared

| Question | FAT | SAT |
| --- | --- | --- |
| Where does it happen? | Usually at the supplier before shipment | At the installed site |
| What can it establish? | Agreed functions under the available test conditions | Agreed functions with the actual installation and site interfaces |
| What may be represented? | Field signals, utilities or connected systems | Any site conditions still unavailable must be recorded |
| What evidence should remain? | Procedure, configuration, observations and outstanding defects | Installed configuration, results, deviations and retests |
| What follows? | An agreed shipment decision | An agreed acceptance or further-test decision |

The [IEC 62381 preview](https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec62381%7Bed3.0%7Db.pdf) separates factory, site and integration testing for process-industry automation. Its contents also identify test plans and outstanding-item lists at several stages. The standard's scope is narrower than every possible machinery purchase.

::figure acceptance-path | Requirements feed both tests. A shipment decision and an acceptance decision need their own evidence. Unresolved items remain visible between stages.

## Write a test someone can repeat

For each requirement, write the starting conditions, the action, the expected result and the evidence to keep. Name the person who will witness or approve the result. Record the software revision, settings and equipment configuration.

“Demonstrate normal operation” leaves too much open. Define the product or load, operating conditions and acceptance measure in the purchase specification. Then use those agreed values in the test. A short demonstration at one setting cannot prove performance across an untested operating range.

Use a [requirements traceability record](/notes/requirements-traceability-matrix-example/) to connect each requirement to its test and result. Include failure responses and recovery where the agreed scope calls for them. Equipment specialists must define the applicable safety verification separately.

## Keep open items attached to the decision

A test may pass some requirements and fail others. Record each unresolved item with its consequence, owner, due date and required retest. Agree which items prevent shipment or use and who can authorise a conditional decision.

After transport and installation, check what changed. Wiring, field devices, software revisions and site services can alter the result. Record what needs repeating at SAT rather than treating the FAT signature as permanent proof.

For broader commissioning context, [TQC describes FAT and SAT](https://www.tqc.co.uk/insight/factory-acceptance-vs-site-acceptance-test/) as checks before delivery and in the final environment. The exact obligations still belong in the contract and test plan.

## Plan the move into operations

Acceptance leaves practical work behind it. Operators need the current instructions. Maintenance needs drawings, spare-parts information and access arrangements. The receiving owner needs to know which issues remain and what monitoring is required.

The [project handover note](/notes/project-handover-checklist/) covers that transfer. For software projects, [SIT and UAT](/notes/sit-vs-uat/) explain related test purposes. There, SIT means system integration testing. IEC 62381 uses SIT for site integration testing, so spell out the term in your plan.

Vrolen's poka-yoke video gives a useful way to think about error prevention when writing test cases. It explains a separate process example rather than FAT or SAT.

::video _EG1a4nhQnw | Use the error-prevention example to consider what should happen when a user makes a foreseeable mistake. Agree the actual equipment tests with its engineers.

Before the next acceptance meeting, pick one requirement and follow it through the procedure, result and open-item record. Resolve any missing link before asking someone to sign.

## Sources

- [IEC 62381:2024 preview](https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec62381%7Bed3.0%7Db.pdf). Scope and test-stage structure. The preview does not provide the full procedures.
- [TQC on factory and site acceptance testing](https://www.tqc.co.uk/insight/factory-acceptance-vs-site-acceptance-test/). Equipment supplier explanation of the two environments.
