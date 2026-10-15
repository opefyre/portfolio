---
title: Role-based access control: RBAC and least privilege explained
date: 2026-10-15
summary: A temporary warehouse worker needs to post receipts. Copying an administrator's role also lets them approve adjustments. Separate the job from the permissions.
seoTitle: Role-based access control and least privilege
seoDescription: Learn RBAC and least privilege through a warehouse permissions matrix. Compare users, roles, tasks and temporary access without confusing them with RACI.
status: published
topic: Digital transformation
keywords: role based access control explained, RBAC vs least privilege, least privilege example, access permissions matrix
---

**Role-based access control (RBAC) assigns permissions to roles, then assigns people to those roles. Least privilege is the principle of giving only the access needed for the task.** RBAC organises access. Least privilege helps judge whether that access is appropriate.

A temporary warehouse worker needs to record receipts for two weeks. To get them started quickly, someone copies a supervisor's access. The worker can now approve stock adjustments and manage users as well.

The copied role gives the worker more access than the receiving job needs.

[NIST's RBAC explanation](https://csrc.nist.gov/Projects/role-based-access-control/faqs) describes the user, role and permission relationship. Its [least-privilege definition](https://csrc.nist.gov/glossary/term/least_privilege) limits access to what the assigned task requires. A role can still contain unnecessary permissions.

## Users, roles and permissions are different things

| Element | Meaning | Warehouse example |
| --- | --- | --- |
| User | An identified person or service account | The temporary receiving worker's individual account |
| Role | A defined set of permissions | Receiver |
| Permission | An allowed action on a resource | Post a receipt for the permitted warehouse |
| Assignment | Which role a user can use | This worker receives the Receiver role for the agreed period |

The resource matters. Permission to post receipts at one warehouse does not necessarily include every site, supplier or stock category.

The account should identify the person performing the work. Sharing a supervisor's login would also make the audit history harder to interpret, regardless of which role it carries.

## A warehouse RBAC permissions matrix

Our fictional application separates five actions: view stock, post a receipt, request an adjustment, approve it and manage users. The matrix below shows each action the roles allow.

::interactive warehouse-access-matrix | Fictional permissions, users and expiry rule. Compare the intended Receiver assignment with an overbroad administrator role. When the assignment expires, the contractor loses the permissions it supplied.

A Receiver can view stock and post receipts. An Adjuster can propose a correction but cannot approve it. An Approver can approve requests, subject to the separate rule that they cannot approve their own request.

That last restriction must be checked for each request. A role matrix by itself cannot show whether the person approving is also the person who submitted that particular request. The application must enforce the rule at the point of action.

## Why RBAC does not guarantee least privilege

Select the administrator role for the contractor. The assignment now includes every action in this example, even though the receiving job needs only two.

The system still uses roles. It simply uses a role that is too broad for this task. The same problem can arise when a person accumulates several roles over time or inherits permissions through another role.

Review everything the person can actually do, including access from other roles or exceptions. Checking only that a role name sounds right can miss the actual access.

The [data governance note](/notes/data-governance-explained/) helps establish who can agree a stock definition or correction policy. Access controls then need to implement the relevant actions and boundaries.

## Temporary access needs an end condition

In this example, the contractor assignment expires after the agreed receiving work ends. Change the assignment state in the figure: its effective permissions fall to zero because no other role is assigned to this user.

A real system may use dated assignments, an identity-management process or a scheduled removal. Decide how the end will be enforced, who checks it and what happens if the contract changes.

Removing current access should not erase the history of receipts already posted. The [master vs transactional data example](/notes/master-data-vs-transactional-data/) explains why later changes to a current record should preserve the meaning of earlier events.

Review access when a person changes jobs as well as when they leave. A permanent employee can retain obsolete permissions just as easily as a contractor.

## RBAC vs RACI: authority in the process and in the system

A [RACI matrix](/notes/raci-matrix-guide/) assigns responsibility for work and decisions. It does not grant application permissions. An accountable manager might approve access through the process without needing the technical ability to administer accounts.

Conversely, a system administrator may be able to configure a role without having business authority to decide who should approve inventory adjustments. Keep those decisions connected without treating them as the same task.

For a new application, transfer the agreed roles and their owner through [project handover](/notes/project-handover-checklist/). Support teams need a clear route for joiners, role changes, temporary exceptions and removals.

## Review one actual job before copying a role

Ask what the person needs to do, on which records and for how long. Compare that answer with the permissions the proposed assignment actually grants. Check a denied action as well as an allowed one.

For the temporary receiver, that means being able to post a valid receipt while being unable to approve an adjustment or manage users. Confirm the end condition before the first shift, while the request still has an owner.

## Sources and example notes

- NIST. [Role-based access control FAQs](https://csrc.nist.gov/Projects/role-based-access-control/faqs), roles, users, permissions and constraints.
- NIST. [Least privilege](https://csrc.nist.gov/glossary/term/least_privilege), minimum access for assigned work.

The roles and application are fictional. Test the actual permission rules in the service you use.
