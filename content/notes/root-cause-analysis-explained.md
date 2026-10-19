---
title: Root cause analysis: follow the evidence past the first explanation
date: 2026-10-19
summary: Learn root cause analysis through a missed dispatch. Compare possible causes, choose corrective action and check effectiveness without stopping at human error.
seoTitle: Root cause analysis explained: steps and evidence
seoDescription: Learn root cause analysis through a missed dispatch. Compare possible causes, choose corrective action and check effectiveness without stopping at human error.
status: published
topic: Operational excellence
keywords: root cause analysis, RCA steps, root cause analysis example, RCA responsibility, RCA vs FMEA
---

An order misses its carrier collection. The incident record says “operator error”. The next week, the same thing happens on another shift.

The label has not explained which part of the process needs to change.

**Root cause analysis, or RCA, investigates why a problem happened so the team can address the conditions that produced it.** It uses evidence to test explanations. The explanation needs to agree with the event records and what people observed.

[ASQ describes RCA](https://asq.org/quality-resources/root-cause-analysis) as a family of approaches and tools, rather than a single prescribed worksheet. The corrective action and its follow-up belong in the wider problem-solving work.

## Contain the problem and preserve the sequence

In our fictional warehouse, a customer needs an urgent replacement. The supervisor arranges an approved recovery shipment and checks similar orders. That protects current service while the investigation continues.

Containment is not the same as preventing recurrence. Extra supervision might catch the next case without explaining why an ordinary shift cannot reliably dispatch it.

Keep the order version, promised deadline, pick completion, release event and carrier collection record. Ask the people involved what they saw before replacing those records with the latest system status.

::figure paa-rca-evidence | Fictional missed-dispatch investigation. The release queue is one supported explanation to test. The proposed cover and escalation still need testing, comparable orders and follow-up.

## Test explanations that would lead to different fixes

The order was picked before the cutoff but waited for release until after collection. That makes “the picker was too slow” a poor explanation for this case.

| Possible explanation | Evidence to inspect | What would follow if supported |
| --- | --- | --- |
| Picking finished too late | Pick-completion time and cutoff rule | Investigate workload, sequence or picking delays |
| The release approval waited | Queue entry, approver availability and actual release | Check cover, authority and escalation |
| The carrier left early | Collection record and agreed window | Resolve transport performance and the dispatch arrangement |
| The timestamp is wrong | Device clocks and original event records | Repair the measurement before trusting the timeline |

A plausible sequence can have several contributing conditions. An absent approver, missing cover and an invisible queue can combine. Choosing one “root cause” for the form should not erase those relationships.

The [5 Whys example](/notes/5-whys-example/) follows a questioning method. The [A3 example](/notes/a3-problem-solving-example/) keeps the problem, evidence and countermeasure together. Use the tool that helps investigate this event, rather than filling all the templates.

## Move from an explanation to a controlled change

Suppose the records support a release queue with no cover when the approver is away. The team proposes named cover and escalation before cutoff. It checks that the substitute approver has the required authority.

An alert alone would be weak if nobody can act on it. Training alone would not create delegated authority. The action needs to change the condition the evidence identified.

[IHI's RCA² guidance](https://www.ihi.org/library/tools/rca2-improving-root-cause-analyses-and-actions-prevent-harm) emphasises actions and follow-through alongside analysis. Its setting is patient safety; this warehouse example applies the general distinction between an explanation and a change that can prevent recurrence.

Safety-critical investigations need the relevant specialist and regulatory process. A short business example is not a substitute for it.

## Who is responsible for the quality of the investigation?

In this example, the warehouse manager owns the operating result. A facilitator keeps the inquiry moving; operators, IT and the carrier provide evidence. The person who approves an action needs authority over the process it changes.

That is an example allocation, not a universal RCA job title. A quality team may facilitate the investigation, while the operating manager remains responsible for a change in the warehouse.

A useful review asks whether the evidence supports the explanation, whether alternatives were checked and whether the chosen action addresses the identified condition. Assign someone to verify implementation and someone to review effectiveness at a stated date.

## Five, six or seven steps?

RCA methods group the work differently. For this case, the sequence is: define the event, contain the immediate problem, collect evidence, test explanations, implement an authorised action and check recurrence.

Those six headings organise this example; another RCA method may group the same work differently. Within Six Sigma's [DMAIC](/notes/dmaic-step-by-step/), cause investigation sits mainly in Analyze, while action and sustained performance require Improve and Control too.

[FMEA](/notes/fmea-step-by-step/) asks what could go wrong and how risks are controlled. RCA investigates an event or recurring problem that has occurred. Findings from one can improve the other.

At the next review, inspect orders that faced the same release conditions, including busy shifts and absent approvers. A week without a recurrence is useful only beside the number of opportunities and the conditions tested. Keep the original finding open if the changed process has not yet faced the situation it was meant to handle.

## Sources and example notes

- [ASQ: Root cause analysis](https://asq.org/quality-resources/root-cause-analysis), approaches, evidence and participation.
- [IHI: RCA²](https://www.ihi.org/library/tools/rca2-improving-root-cause-analyses-and-actions-prevent-harm), analysis linked with action and effectiveness.

This is a fictional investigation. The proposed cover arrangement still needs a trial and a review of comparable orders.
