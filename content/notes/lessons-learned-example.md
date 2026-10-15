---
title: Lessons learned example: make the next project use the lesson
date: 2026-10-15
summary: “Involve IT earlier” sounds sensible, but gives the next team little to act on. Turn one integration delay into a specific check that another project can use.
seoTitle: Lessons learned example: from report to reuse
seoDescription: Write useful project lessons learned. Follow an integration delay from evidence to a changed readiness check, an owner and reuse in the next project.
status: published
topic: Project management
keywords: lessons learned example, project lessons learned, lessons learned vs retrospective, lessons learned log
---

**Lessons learned are insights from project experience that can improve later work.** A useful lesson connects what happened, the evidence behind the explanation and a change someone can apply. Recording the incident is the start of that process.

A warehouse project finishes three weeks late. Its closing report says: “Involve IT earlier.” The next team reads it, adds IT to the first meeting and still reaches integration testing without a working connection.

“Earlier” never became a date, an owner or a testable access requirement.

[APM's lessons-learned guidance](https://www.apm.org.uk/resources/what-is-project-management/what-is-lessons-learned-in-project-management/) distinguishes recording lessons from using them. It also recommends collecting and applying them during the project, while the details and people are still available.

## Start with the event and its evidence

Our fictional project connects a receiving app to an inventory system. Its schedule assumes interface testing can start on day 10. That date arrives, but the approved test account and firewall change are still pending.

The records show that the access request was submitted on day 8. The responsible team had advised a 15-working-day preparation allowance. Access became usable on day 23, so the planned test start moved by 13 working days.

Testing started 13 working days late. The effect on the whole project may differ. The effect on the finish date depends on its [dependencies and available float](/notes/project-dependency-types/).

Before writing the lesson, ask why the request came late. Was the interface scope undecided? Was the request route unknown? Did the schedule omit the work? Separate what the records show from the team's possible explanations.

## Vague lessons vs lessons someone can use

| Vague entry | More usable entry for this example |
| --- | --- |
| Involve IT earlier | Name the interface-access owner before committing the integration-test date |
| Communication was poor | Put access, network approval and a successful connection test in the readiness record |
| Allow more time | Confirm the receiving team's current preparation allowance and schedule the request accordingly |
| Follow up next time | Test whether the next relevant project used the check before approving its test date |

The improved entries still need owners. An instruction to “check readiness” can become another vague lesson if nobody is responsible for obtaining the evidence.

## A worked lessons-learned record

The visual follows the lesson across two projects. It shows where an observation becomes an agreed practice and where the next team demonstrates reuse.

::interactive lesson-reuse-map | Fictional project records. Follow the access delay into a changed readiness check, then see where the next project uses it.

A short written record can carry the detail behind that map:

| Field | Entry |
| --- | --- |
| Context | New app needs approved access to the inventory test environment |
| Evidence | Test start planned day 10; request day 8; usable access day 23 |
| Explanation supported here | The schedule committed the test date without allowing the advised access preparation |
| Changed practice | Confirm owner, preparation time and connection evidence before committing the test start |
| Practice owner | Integration lead updates the readiness check with IT operations |
| Reuse trigger | Any new or changed interface requiring this access route |
| Review | Next relevant project shows the check and connection evidence |

Keep a link to the underlying request and schedule. The lesson itself should be short enough for another team to recognise whether it applies.

## Check reuse in the next project

A later fictional project needs the same access route. Its lead confirms the current allowance, requests access on day 2 and plans integration testing for day 20. A successful connection is recorded on day 17.

Access is working before the planned test starts. The team used the check and recorded the result; the next request will still need a current preparation allowance.

Record changed conditions too. An existing account, a different environment or an urgent priority route could explain why another request was faster. Copy the check, then confirm the current circumstances.

## Lessons learned vs a retrospective

A retrospective is a discussion of how a team worked and what it should change. In [Scrum](/notes/scrum-explained/), it is a regular event within each Sprint.

A lesson can emerge from that discussion, an incident or an ordinary milestone review. The wider learning process includes preserving enough context, finding the next relevant team and checking application. A meeting cannot perform all of those steps by itself.

For the access problem, agree the readiness change as soon as the gap is understood. There is no benefit in waiting for project closure while another team is planning the same interface.

## Put the lesson where the next decision happens

Store the record where people can find it, then connect it to the planning or approval step it should change. In this case, that is the integration-readiness check and the [project estimate](/notes/project-estimation-techniques/), not just a final report folder.

When closing the project, transfer any unfinished practice change to an accepted owner. The [handover and closure note](/notes/project-handover-checklist/) explains that transfer.

Take one recurring lesson in your own project records and find its next use. If it has no trigger, owner or change to the work, rewrite it until another team knows what to do differently.

## Sources and example notes

- APM. [Lessons learned in project management](https://www.apm.org.uk/resources/what-is-project-management/what-is-lessons-learned-in-project-management/), capture, communication and use during and across projects.

The projects, dates, preparation allowance and record are fictional. The activity-start difference is 23 − 10 = 13 working days. Whole-project delay and avoided cost have not been estimated.
