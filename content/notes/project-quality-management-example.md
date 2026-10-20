---
title: Project quality management: a plan and worked example
date: 2026-10-20
summary: The new packing line processes 100 cartons an hour, but only 75 meet the label requirement. Follow quality from the agreed need into reviews, tests and acceptance.
seoTitle: Project quality management: plan and worked example
seoDescription: Build a project quality plan around a packing-line requirement. Separate planning, assurance, control and improvement, then follow evidence into acceptance.
status: published
topic: Project management
keywords: project quality management example, quality management plan example, quality assurance vs quality control, project quality plan
---

The new packing line processes 100 cartons in an hour. The project report shows a result above its 80-carton target.

Twenty-five cartons have the wrong label. The customer asked for 80 correctly labelled cartons an hour.

**Project quality management establishes what acceptable delivery means and arranges the work needed to achieve and demonstrate it.** It starts with the requirements, then carries through design, supplier work, checks and acceptance. [APM's explanation](https://www.apm.org.uk/resources/what-is-project-management/what-is-quality-management-and-control/) places acceptance criteria and test planning before the final inspection.

Quality work needs time and people in the project plan. Leaving it to the last day makes failures expensive to discover.

## Write the requirement so the test can answer it

Our fictional project replaces a manual packing station. The agreed output requirement is at least 80 correctly labelled cartons per hour for each of two specified carton formats, with the agreed crew and operating conditions.

The one-hour trial above covers the first format. Its gross count is 100, but accepted output is 100 − 25 = **75 cartons per hour**. It fails that requirement. This short trial does not establish long-run capacity or performance for the second format.

::figure paa3-quality-output | Fictional one-hour trial for one format. Gross output is 100 cartons; 25 fail the label requirement, leaving 75 accepted cartons against a minimum of 80. Reworked cartons are not added to this hour's accepted count.

The requirement also needs the approved label identity, verification method and treatment of rework. The [CTQ example](/notes/ctq-tree-example/) shows how to turn a broad customer need into a checkable requirement.

## A project quality plan example

The plan connects the requirement to the work and evidence needed before acceptance. Here is one part of it, rather than a complete template for every kind of project.

| Point in delivery | Planned quality work | Owner and evidence | Response if it fails |
| --- | --- | --- | --- |
| Requirements agreement | Confirm formats, good-output rate and label rules | Operations owner approves the requirement and test conditions | Resolve the definition before design approval |
| Design review | Check how the label is selected and verified | Controls lead presents design and exception handling for review | Revise the design and retain the review record |
| Supplier build | Check configuration and approved label versions | Supplier records configuration and checks; project lead reviews them | Correct and repeat the affected check |
| Site testing | Run the agreed trials and record good, rejected and reworked cartons | Test lead records counts and conditions for each format | Investigate, correct and repeat the required tests |
| Acceptance | Review complete evidence against every required criterion | Operations owner records the decision | Hold acceptance or record an explicitly authorised outcome |

Link each row to its actual record. A table saying “test complete” is less useful than the result, version and unresolved failures.

## Quality assurance vs quality control

**Quality assurance examines whether the arrangements used to deliver quality are suitable and being followed. Quality control checks the outputs against requirements.** [ASQ's glossary](https://asq.org/quality-resources/quality-glossary) distinguishes confidence in the quality arrangements from checking that requirements are fulfilled.

In this project, reviewing how label versions are approved and released is assurance work. Inspecting cartons to see whether they carry the right label is control work. Both matter: an approved procedure can still be implemented incorrectly, and a passing sample can coexist with a weak release process.

Improvement follows the findings. Suppose two label versions are available at the station. The team investigates why the old one remained selectable, changes the release method and checks its effect. That work needs evidence beyond telling the operator to be more careful.

## Acceptance needs the whole requirement

The supplier may demonstrate a fast machine. Operations still needs the complete usable process, including label control, staff readiness and the required support arrangements.

The [requirements traceability example](/notes/requirements-traceability-matrix-example/) connects each requirement to implementation and evidence. For systems, [SIT vs UAT](/notes/sit-vs-uat/) explains why successful integration alone cannot establish business acceptance.

Record the failed 75-carton result, the cause evidence, any agreed correction and the retest. Do not silently replace the original result with the best later hour. Keep enough history to show what changed and why the final acceptance decision is justified.

## Sources and example notes

- [APM: Quality management and control](https://www.apm.org.uk/resources/what-is-project-management/what-is-quality-management-and-control/). Quality planning, acceptance criteria and test arrangements.
- [ASQ: Quality glossary](https://asq.org/quality-resources/quality-glossary), quality assurance and quality control entries.

The line, counts and requirements are fictional. The table covers selected output-quality arrangements, not all safety, compliance or commissioning requirements. No production gain or validated sampling plan is claimed.
