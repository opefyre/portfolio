---
title: Requirements traceability matrix: a worked project example
date: 2026-10-15
summary: Every executed test passes, but nobody checked that held stock cannot ship. A worked traceability matrix makes the missing requirement and an unexplained test visible.
seoTitle: Requirements traceability matrix: example and use
seoDescription: Build a requirements traceability matrix that connects business needs, implementation and tests. Spot an untested requirement and an unmapped test.
status: published
topic: Project management
keywords: requirements traceability matrix example, RTM explained, requirements to test cases, bidirectional traceability
---

**Requirements traceability connects each requirement to its source, the work that implements it and the evidence used to check it.** A requirements traceability matrix, often shortened to RTM, puts those links beside each other so the team can see missing work and assess changes.

The warehouse rollout has three executed tests. All three pass, so the report shows 100%.

One agreed requirement says stock on quality hold must not ship. Nobody wrote a test for it.

Compare the test list with the agreed requirements: the pass rate says nothing about the missing hold check.

## Requirements traceability matrix fields and IDs

Our fictional warehouse is adding a dispatch screen connected to its existing stock records. The approved dispatch workshop record, DW-01 version 1, contains three requirements.

| ID | Agreed requirement | Source and owner |
| --- | --- | --- |
| R01 | Dispatching released stock must post the selected lot and quantity to the dispatch record | DW-01, dispatch lead |
| R02 | A user must be unable to dispatch a held lot; the screen must identify the lot and the hold reason | DW-01, quality lead |
| R03 | The dispatch record must retain the user and posting time so a shipment can be investigated | DW-01, dispatch lead |

A stable ID keeps the link clear when the wording changes. A source tells the team where the requirement came from and who should help resolve a question about it.

[NASA's verification-matrix guidance](https://www.nasa.gov/reference/appendix-d-requirements-verification-matrix/) calls for unique requirement identifiers and identifiable sources. The same identifying fields help the warehouse team follow its requirements.

The agreed wording matters too. “Handle held stock correctly” would leave the team guessing whether to block dispatch, show a warning or just record the event.

## RTM example: connect requirements, implementation and tests

For R01, the team builds the posting function and runs T01: select a released lot, dispatch a stated quantity and compare the resulting record with the expected lot and quantity.

For R03, T03 checks that the record includes the correct user and posting time. Both tests pass against build 1.

R02 has no linked implementation record and no test result. The team needs to find out whether the hold check was built and obtain the missing test evidence.

Meanwhile, T99 confirms that a dashboard exports a chart image. It also passes, but nobody has linked it to an agreed requirement or another approved test basis.

::interactive requirements-evidence-map | Fictional requirements and build 1 review records. Three executed tests pass: T01, T03 and T99. Only two of the three requirements have linked passing evidence. The matrix shows the missing links; it does not run tests.

The gap is easy to miss in a list organised only by tests. Looking down the requirements exposes R02. Looking back from the tests exposes T99.

A link to a passing test still needs review: does that test exercise the stated requirement, with the right data, role and expected result? One row can need several checks. Counting links cannot answer that question.

## Forward and backward requirements traceability

**Forward:** start from R02 and find the implementation and verification evidence. Here, the route stops before either. The team needs to establish what was built and how to check both the dispatch block and its message.

**Backward:** start from T99 and find the reason it belongs in the release. It may support another approved requirement, a shared regression check or a valid requirement derived during design. Find and record that basis before treating the test as unnecessary work.

[NASA's requirements-management guidance](https://www.nasa.gov/reference/6-2-requirements-management/) describes maintaining links across requirements, design and test plans, including assessing approved changes. In this warehouse, those links let a reviewer follow the business reason as well as the technical result.

The [SIT and UAT explanation](/notes/sit-vs-uat/) covers the different purposes of integration and user acceptance testing. Traceability helps check that the agreed needs have appropriate evidence across those activities. It does not assign every requirement to one test level.

## Close the held-stock gap before claiming acceptance

The quality lead confirms the relevant stock statuses and permitted roles. The delivery team locates or adds the implementation, then defines test cases for R02.

Those cases need to establish that a held lot cannot be dispatched and that the correct lot and hold reason are visible. Check the normal released-lot path too, so a correction does not simply block every dispatch.

Record the tested build, role, data, expected outcome and actual evidence. A planned test is not an executed one. If the test fails, retain that result, track the defect and link the later retest to the corrected build.

After the required checks pass, the acceptance owner can make the agreed decision with the evidence in view. A test ID without its result would leave the question unanswered.

## Use the links when the requirement changes

Suppose the business later proposes that a supervisor may override some holds. That changes R02, including which holds, roles, approvals and records are permitted.

Trace the proposed change into the dispatch control, user permissions, message, history and relevant tests. Then assess and approve the scope before updating the requirement and its linked work. The [change-control example](/notes/scope-creep-change-control/) shows that decision separately.

::figure requirement-change-impact | Fictional change-impact map for a proposed R02 amendment. Each affected rule and test needs review before an override can be approved.

Keep the earlier version and its evidence identifiable. A pass against build 1 and the old rule does not show whether build 2 satisfies the revised rule.

A [work breakdown structure](/notes/work-breakdown-structure-example/) helps define the deliverables. The traceability record connects the requirements inside those deliverables to what was built and checked. They support each other without being the same planning tool.

## Keep the record small enough to maintain

For these three requirements, a short linked table is enough. A larger project may need a requirements tool, but it still needs clear sources, current versions and evidence someone can inspect.

At the next review, start from the agreed requirements and follow their links. Then check tests and changes that have no clear basis. That would expose the held-stock gap before a green test summary became a release decision.

## Sources and example notes

- NASA Systems Engineering Handbook. [Appendix D: Requirements Verification Matrix](https://www.nasa.gov/reference/appendix-d-requirements-verification-matrix/). Unique identifiers and sources.
- NASA Systems Engineering Handbook. [6.2 Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/). Traceability, derived requirements and change impact.

All requirements, records, build and test results are fictional. Two of three requirements have linked passing evidence. Review the quality of those checks as well as the missing links; investigate T99 before deciding whether to keep it.
