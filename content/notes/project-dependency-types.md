---
title: Project dependencies: what FS, SS, FF and SF actually mean
date: 2026-10-14
summary: A dependency connects task starts or finishes. Four timelines show how the link changes the earliest allowed dates, and why overlapping bars don't prove the work can overlap.
seoTitle: Project dependencies: FS, SS, FF and SF explained
seoDescription: Learn four project dependency types with examples and interactive timelines. Compare FS, SS, FF and SF, add lag and see which task endpoint each rule controls.
status: published
topic: Project management
keywords: project dependency types, finish to start, start to start, finish to finish, start to finish, FS SS FF SF, project dependencies examples, lag time
---

The project needs an earlier finish. Someone drags testing to the left so it overlaps development. The chart looks better. The team still needs to explain which tests can run before the software is ready.

**A project dependency is a rule connecting the start or finish of one activity to the start or finish of another.** The four basic types are finish-to-start (FS), start-to-start (SS), finish-to-finish (FF) and start-to-finish (SF).

The letters identify the endpoints. In FS, the first activity's finish controls when the second may start. The rule describes a condition the work must meet. It doesn't make the condition true just because a scheduling tool accepts the link.

## The four dependency types, side by side

Call the controlling activity A and the dependent activity B. In scheduling language, A is the predecessor and B is the successor.

| Type | Rule with no added lag | Example |
| --- | --- | --- |
| Finish-to-start, FS | B cannot start until A finishes | Acceptance testing waits for a completed, usable software release |
| Start-to-start, SS | B cannot start until A starts | Initial observations begin after a pilot starts |
| Finish-to-finish, FF | B cannot finish until A finishes | A final pilot report cannot be completed before the pilot ends |
| Start-to-finish, SF | B cannot finish until A starts | Outgoing service cover must continue until incoming cover starts |

[PMI's scheduling standard](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf?v=c7ca2721-8c26-4e07-ba47-069d0987bc0c) describes these four relationships. The examples here are illustrative; a real plan may need several links to express the full requirement.

SS permits B to start after A has started. It doesn't require them to start together. FF similarly permits B to finish later than A. [Microsoft's task-link documentation](https://support.microsoft.com/en-us/project/link-tasks-in-a-project) makes this distinction explicit.

## Move the endpoints and see the dates

Use four separate fictional activity pairs. In each one, A starts at day 4 and lasts six days, finishing at day 10. B lasts three days and cannot start before day 0.

The timelines place B at the earliest dates allowed by that pair's single link. There are no weekends, resource restrictions or other dependencies in this teaching example.

::interactive dependency-endpoints | Four separate fictional activity pairs on a continuous elapsed-day axis. A runs from day 4 to day 10; B lasts three days and cannot start before day 0. Each row applies only its named relationship and the selected non-negative lag. The diagrams show B's earliest allowed position, not four tasks in one project. Lines identify the constrained endpoints, not travel or work between activities.

With no lag, FS places B at days 10 to 13. SS allows days 4 to 7. FF allows days 7 to 10, so B can begin while A is still running, but cannot finish before A does.

SF puts B at days 1 to 4. That can look backwards if you read “predecessor” as “the thing that happens first”. Here, A's start controls B's finish. Incoming cover starts on day 4, allowing outgoing cover to end then. Those labels express the controlling relationship, not the chronological order of both starts.

## A link is a minimum condition

The FF example allows the report work to occupy days 7 to 10. It also allows days 9 to 12. Both finish after A ends at day 10.

If the report needs a day of analysis after the pilot ends, FF alone doesn't describe enough of the work. Add the analysis activity and its real dependency. Don't rely on a conveniently placed bar to preserve that requirement when the pilot moves.

The same applies to SS. A pilot starting may permit initial observation. It doesn't make enough evidence available for every analysis task on day one.

## What lag changes

Lag adds a minimum waiting interval between the linked endpoints. Select two days in the figure. FS now allows B to start at day 12, two days after A finishes. B ends at day 15.

For FF with the same lag, B cannot finish before day 12. Its earliest start is day 9. The waiting interval is measured from finish to finish, rather than from A's finish to B's start.

These are arithmetic comparisons. A real lag needs a reason. A necessary curing or settling period may be waiting time. A review someone must perform is work with an owner and duration, so show it as an activity. PMI's 2011 scheduling standard makes that recommendation.

A late delivery is an actual delay; it isn't automatically a planned lag. Record the changed forecast or actual event, then let the dependencies show its effect.

## Return to the testing plan

Our software team may genuinely be able to test completed components while development continues elsewhere. It needs to name those components and their readiness checks.

Break the delivery into usable pieces, then link each test to the piece it needs. The [work breakdown structure article](/notes/work-breakdown-structure-example/) helps define those deliverables before the schedule gets detailed.

If final acceptance needs the integrated release, keep that requirement visible even while component tests overlap. An SS link from “development started” to “testing started” cannot express the whole acceptance condition.

Resources need checking too. Two activities may be logically allowed to overlap while competing for the same engineer or test environment. Their earliest dates don't reserve either resource.

## Use the links to assess a change

Once the dependencies describe the work, the [critical path method](/notes/critical-path-method-worked-example/) can show which sequence governs the planned finish. Its worked example uses FS links; the four endpoint types here explain how other relationships differ.

When a supplier date or deliverable changes, update the relevant activity and review the effects through its links. The [scope change example](/notes/scope-creep-change-control/) explains when that review also needs a decision about the project's commitment.

For the next schedule review, choose one overlap and ask the receiving team what must be ready before its work can start, and what must be true before it can finish. Put those conditions into the plan. The dates become much easier to defend when the dependency describes a handoff people recognise.

## Sources and example notes

- [PMI: Practice Standard for Scheduling, second edition](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf?v=c7ca2721-8c26-4e07-ba47-069d0987bc0c), 2011, section 3.2.3 and Figure 3-1, printed pages 28–30. Relationship types and guidance on lag versus work activities.
- [Microsoft Support: Link tasks in a project](https://support.microsoft.com/en-us/project/link-tasks-in-a-project), “Types of tasks”. Endpoint rules and the distinction between a minimum condition and equal start or finish dates.

All activities and durations are fictional. The calculator isolates one relationship per pair. A full project also needs calendars, other dependencies, resource availability and completion requirements; the diagrams do not calculate a project finish or staffing plan.
