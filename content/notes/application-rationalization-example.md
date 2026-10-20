---
title: Application rationalization: process and a worked example
date: 2026-10-20
summary: Two apps have the same label in the software inventory. Before retiring one, check the work, records and connections it supports, then compare the full cost of leaving.
seoTitle: Application rationalization: process and example
seoDescription: Work through application rationalization with two supplier apps. Check functional overlap, dependencies, migration and ongoing costs before retiring a system.
status: published
topic: Digital transformation
keywords: application rationalization example, application portfolio rationalization, application rationalization process, software consolidation
---

The application inventory lists two supplier portals. Each costs €18,000 a year. Removing one looks like an easy saving.

One portal approves suppliers. The other stores inspection evidence and customer-specific records. The names overlap more than the work does.

**Application rationalization reviews an organisation's existing applications and decides which to keep, improve, replace, consolidate or retire.** [GSA's infrastructure playbook](https://coe.gsa.gov/docs/2020/Infrastructure%20Optimization%20Playbook%20Sept%202020.pdf#page=8) describes a structured assessment with both business and application owners involved.

An application portfolio is the set of applications being managed. The job is broader than choosing a cheaper licence for one requirement.

## Inventory the service behind each application

Our fictional manufacturer uses Portal A for supplier approval and Portal B for inspection evidence. The initial inventory calls both “supplier management”. A closer review finds these dependencies:

| Question | Portal A | Portal B |
| --- | --- | --- |
| What work depends on it? | Supplier requests, approvals and account status | Inspection history and customer evidence packs |
| Who uses it? | Purchasing and Finance | Quality and customer-service teams |
| What connects to it? | ERP supplier creation | Inspection import and evidence export |
| What must survive a change? | Approval history and active requests | Linked inspection records and readable evidence packs |

The [business capability map](/notes/business-capability-mapping-example/) helps group this work without confusing an application name with a capability. It identifies relationships to investigate; it cannot decide that either system is disposable.

## Assess the options against the same work

The team has several possible routes. It could keep both, improve their handoff, extend A to cover B's work, replace both or retire an application once its required work has somewhere suitable to go.

::figure paa3-application-exit | Fictional consolidation proposal. Portal B can be retired only after its active work, integrations and retained evidence have accepted destinations. Removing a licence is the end of this route, not the starting action.

For this example, extending A appears feasible, but the proposal still needs a trial of inspection imports, record links, evidence exports and access. A feature list saying “attachments supported” does not demonstrate those journeys.

[Build vs buy](/notes/build-vs-buy-software/) covers the sourcing choice. This review first establishes what the current portfolio supports and what a change must preserve.

## Calculate the saving after the cost of leaving

Assume the trial succeeds. The following are fictional incremental costs for the consolidation option. Portal A's existing €18,000 annual cost is unchanged and therefore left out of both sides of this comparison.

| Cost affected by the decision | Keep B | Consolidate into A |
| --- | ---: | ---: |
| B licence each year | €18,000 | €0 after exit |
| Extra support for A each year | €0 | €4,000 |
| Readable retained-record archive each year | €0 extra | €2,000 |
| One-off migration and transition | €0 | €24,000 |

Annual recurring saving is €18,000 − €4,000 − €2,000 = **€12,000**. Simple payback is €24,000 ÷ €12,000 = **two years**.

In year one, consolidation costs €30,000 within this boundary, against €18,000 to keep B: €12,000 more. By the end of year two, both options have cost €36,000, assuming the same rates and no overlapping licence charges.

Those assumptions need checking. A cancellation window, longer dual operation or a failed evidence export can change the result. Use [NPV](/notes/npv-vs-payback/) when timing and a longer investment comparison matter.

## Retire the application against an exit checklist

The application owner should confirm that active work has transferred, integrations work, required records remain usable, access has been reviewed and support ownership is agreed. The business owners need to accept the resulting service.

[Data migration vs integration](/notes/data-migration-vs-integration/) explains why moving old records and maintaining a continuing connection are different jobs. Retaining a database dump may not preserve a readable evidence pack with the right links and permissions.

Only then should the company complete the contract exit and remove the old service through its controlled process. Keep the portfolio record and decision history current so the next review can see which costs and responsibilities actually disappeared.

## Source and calculation notes

- [GSA: Infrastructure Optimization Playbook](https://coe.gsa.gov/docs/2020/Infrastructure%20Optimization%20Playbook%20Sept%202020.pdf), printed pages 3 and 8. Application rationalization definition, shared assessment and functional mapping. The federal context does not make its process mandatory for other organisations.

Applications, requirements and costs are fictional. The comparison uses constant annual rates, no discounting and no overlap charges. Archive scope and duration must follow actual record requirements. The example does not claim a real retirement or saving.
