---
title: Project assumptions vs constraints: what is the plan relying on?
date: 2026-10-14
summary: The outage window is eight hours. The plan fits only if each station takes 30 minutes. One is a limit; the other needs evidence. A worked example shows what changes when the assumption moves.
seoTitle: Project assumptions vs constraints: worked example
seoDescription: Learn the difference between project assumptions and constraints. Test an eight-hour rollout plan, record the evidence needed and connect assumptions to risks.
status: published
topic: Project management
keywords: project assumptions vs constraints, project assumption examples, project constraints examples, assumption log example, assumptions and risks
---

The rollout plan fits the approved Saturday outage. Twelve stations, eight hours, all work complete before operations resumes.

There is one condition behind that neat schedule: each station must take 30 minutes to install and check. The estimate comes from a bench trial. Nobody has confirmed it on the site.

**A project assumption is something the team treats as true for planning while it still needs confirmation. A constraint is a limit the plan has to respect.** Here, 30 minutes per station is an assumption. The approved eight-hour outage is a constraint.

Writing both in the same “notes” cell makes it easy to miss the different follow-up each needs.

## Assumptions and constraints, compared

| | Assumption | Constraint |
| --- | --- | --- |
| Role in the plan | A condition treated as true | A limit on the available choices |
| Rollout example | Each station takes 30 minutes with the assigned crew | Site outage is approved only from 08:00 to 16:00 |
| What the team needs next | Evidence, an owner and a date to confirm or revise it | The source of the limit and who can authorise a change |
| If it doesn't hold | Recalculate the affected plan and decide a response | Obtain a permitted change or plan within the limit |

A [PMI scope-planning paper](https://www.pmi.org/learning/library/project-scope-statement-skills-tools-7981) separates assumptions that influence deliverables from physical, policy and other limits on the solution. The distinction helps turn a list of statements into specific planning work.

A constraint isn't necessarily permanent. The site could approve a longer outage. Until that approval exists, the project team can't quietly extend it to make the schedule fit.

## Work through the eight-hour plan

Take a fictional scanning-system rollout at 12 warehouse stations. One crew works through the stations sequentially. The model assigns one hour to common setup and one hour to final acceptance checks, in addition to the per-station work.

The required outcome is all 12 stations working and accepted. The approved outage is 08:00 to 16:00, giving eight hours. All access, equipment and prerequisites are assumed ready at 08:00 for this timing example.

:::formula Planned elapsed time with one sequential crew
Station work = 12 × 30 minutes = 360 minutes = 6 hours
Total = 1 hour setup + 6 hours station work + 1 hour final checks = 8 hours
:::

There is no spare time in that calculation. If the station work takes 45 minutes instead, it needs nine hours before the common setup and final checks are added. The total becomes 11 hours, three beyond the approved window.

The limit hasn't changed. Our understanding of the work has.

## Change the assumption without moving the limit

The visual holds the eight-hour window fixed. Try 30, 45 and 60 minutes per station, then compare all 12 stations with a proposed first phase of eight.

::interactive assumption-window | Fictional sequential rollout with one crew. Common setup and final checks each take one hour. Each station takes the selected duration, with no parallel work or added delays. The approved outage remains eight hours. An eight-station phase reduces the tested scope; it is a proposal requiring approval, not completion of the original 12-station requirement.

At 45 minutes per station, an eight-station first phase uses six hours for stations and two for common work. It fits the eight-hour window, but leaves four stations outside that phase.

That could be worth considering if the business can operate with a split rollout. It could also be unacceptable because the stations must change together. The time calculation can't decide that requirement for the sponsor and operations team.

Nor does adding a second crew automatically halve elapsed time. Work may share access, equipment, checks or dependencies. The [project dependency note](/notes/project-dependency-types/) explains how those relationships constrain a schedule. Any parallel plan needs its own sequence and evidence.

## Write an assumption that someone can check

“Site readiness will be fine” gives the project manager little to follow up. For our timing assumption, keep a short record like this:

| Field | Example entry |
| --- | --- |
| Assumption | The assigned crew can complete each representative station in 30 minutes |
| Current basis | One bench trial; live-site conditions not yet tested |
| Owner | Deployment lead |
| Check needed | Timed trial on representative station types using the planned method and crew |
| Due | Before the outage plan is approved for execution |
| Affected work | Twelve sequential station activities and the final-check start |
| If evidence disagrees | Recalculate time and submit a revised scope, method or outage request |

The owner isn't promising that the assumption will come true. The owner is responsible for getting evidence and bringing the result back into the plan.

A [PMI paper on assumption-based planning](https://www.pmi.org/learning/library/assumptions-based-planning-analyze-techniques-6582) discusses identifying assumptions that could force a significant change to the plan. Our 30-minute duration is one: a small increase repeated 12 times consumes hours the approved window doesn't contain.

## Connect the assumption to a risk

The assumption states the planning basis: 30 minutes per station. A related risk describes what uncertainty could do to the objective: if live-site installation takes longer, the crew may not finish all 12 stations within the approved outage.

The [risk register example](/notes/project-risk-register/) shows how to add an owner, response and trigger. Here the early trigger can be a representative trial that exceeds the planning duration. Waiting until Saturday afternoon would leave much less room to change the approach.

If a trial shows 45 minutes, update the duration estimate. Don't keep the old figure in the schedule and leave the new evidence only in the risk register. The [risk vs issue article](/notes/project-risk-vs-issue/) helps distinguish an uncertain consequence from a condition already confirmed.

A trial also has limits. One easy station doesn't establish the duration of every variant. Record which conditions it covers and which still need checking.

## Keep revisions visible

The [project charter](/notes/project-charter-example/) establishes the purpose, boundaries and authority behind the work. If an eight-station phase changes the agreed outcome or operating approach, take that through [change control](/notes/scope-creep-change-control/) before treating it as the new plan.

Keep the original eight-hour limit, the new duration evidence and the proposed response together. If someone approves a longer outage, record the approval and revised limit. If the window remains fixed, keep working on a feasible method or an explicitly approved scope change.

For the next planning review, choose one assumption that could change the date or required resources. Name the evidence needed and when it must arrive. Then check that the schedule actually changes when the evidence does.

## Sources and example notes

- [Paul Burek, PMI: Developing a complete project scope statement in 2 days](https://www.pmi.org/learning/library/project-scope-statement-skills-tools-7981), 2006. Sections on project constraints and assumptions.
- [PMI: Using assumptions effectively](https://www.pmi.org/learning/library/assumptions-based-planning-analyze-techniques-6582), 2010. Assumption-based planning, important assumptions and warning signs that prompt review.

The rollout, crew, durations, approval window and record are fictional. This is a simple elapsed-time comparison, not a complete deployment plan or a probability estimate. Setup, acceptance, readiness and possible parallel work would need evidence in an actual project.
