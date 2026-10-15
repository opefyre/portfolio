---
title: Gemba walk: meaning, steps and questions with an example
date: 2026-10-15
summary: One order misses dispatch after spending most of its journey waiting. Follow the handoffs, separate observations from explanations and decide what to check next.
seoTitle: Gemba walk: meaning, steps and example questions
seoDescription: Follow a late order in a gemba walk example. Separate what you observe from what people explain, ask better questions and plan a focused follow-up test.
status: published
topic: Operational excellence
keywords: gemba walk example, gemba walk questions, what is gemba, gemba walk vs audit, lean observation
---

**A gemba walk means going to where the work happens to understand the current situation through observation and questions.** Gemba means the actual place. In a warehouse that includes the picking area, the dispatch desk and the systems people use to pass work between them.

An order misses the afternoon dispatch. Picking took 20 minutes. By the next morning, the proposed fix is a faster picking method.

Before changing it, follow the order from release to the dock. The delay may sit between tasks rather than inside the task everyone can see.

The [Lean Enterprise Institute's definition](https://www.lean.org/lexicon-terms/gemba/) puts observation before action and suggests following a product family or customer-facing process across functions.

::image /notes/gemba-walk-example/warehouse-observation.webp | A paper-model warehouse connects storage, a packing bench with waiting cartons and an outbound dock. | Generated conceptual warehouse scene. Follow the route from storage through packing to dispatch; W-218's timings are shown separately below.

## How to prepare a gemba walk

The question is why order W-218 missed the 15:00 dispatch cutoff. Start at its 09:00 release and finish when it becomes ready for dispatch. Travel to the customer sits outside this walk.

Tell the team what you are trying to understand. Ask them to show the normal route, including what tells each person to start and how exceptions are handled. Choose a time when that work actually happens.

Observe without obstructing the work, and follow the site's safety rules.

The aim is to understand how the order moves. A surprise inspection of individual speed would answer a different question and make it harder to hear about workarounds.

## Gemba walk example: follow an order to dispatch

W-218 is released at 09:00. Picking starts at 09:40 and finishes at 10:00. A packing label isn't available until 14:40. Packing and checking take 20 minutes, then the dispatch desk receives the ready status at 15:10.

::interactive gemba-order-journey | Fictional order W-218 on one working day, with no breaks excluded. The dispatch cutoff is 15:00. Times describe this one order. Read the labels for durations; the route is not drawn to scale.

There are 40 minutes of active picking, packing and checking within a 370-minute journey. The other 330 minutes sit before picking, before label availability and before the ready status reaches dispatch.

A faster pick could still help. This record alone doesn't show why the order waits for a label or whether finishing picking earlier would change that wait. Removing ten minutes from picking doesn't establish that dispatch would happen ten minutes earlier.

The [value stream mapping example](/notes/value-stream-mapping-example/) expands this view across a product family. This walk follows one order closely enough to decide what evidence to collect next.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch: cycle time and lead time are different clocks
Vrolen follows a separate order to distinguish processing time from the full journey. Its numbers are separate from W-218.
:::

## Record observations before choosing a root cause

At the packing area, the team explains that label requests are usually released together. Check that explanation against the request and release records.

| What we can record | What the team explains | What still needs checking |
| --- | --- | --- |
| W-218 finishes picking at 10:00; its label is available at 14:40 | Label requests are usually released in batches | When was this request made, and what prevented an earlier release? |
| Packing and checking finish at 15:00; dispatch sees ready status at 15:10 | The ready list is refreshed manually | Who refreshes it, how often, and when must an order appear to meet cutoff? |
| Picking takes 20 minutes on this order | Different item mixes take different routes | Is this order representative of the late orders being discussed? |

Keep the words close to the evidence. “The label became available at 14:40” is an observation in this example. “The packing team caused the delay” adds a conclusion the record does not support.

John Shook's [gemba guidance](https://www.lean.org/the-lean-post/articles/how-to-go-to-the-gemba-go-see-ask-why-show-respect/) recommends understanding what is happening before pressing for a diagnosis. Ask someone to show the condition they are describing, then explore what makes it necessary.

## Gemba walk questions to ask at each handoff

At release: “What makes this order ready to enter the queue?” At picking: “How do you know which order to take next?” At packing: “What are you waiting for before you can start?” At dispatch: “What must be visible, and by when, for today's shipment?”

Those questions can expose missing information or conflicting rules. “Why are you so slow?” presumes the answer before the person has explained the work.

If the conversation points to a missing scanner or mixed labels, the [5S example](/notes/5s-methodology-example/) may help. Don't turn the rest of the walk into a tidy-bench score just because 5S is familiar.

## Leave with a follow-up that someone can complete

For W-218, ask the planning and packing leads to trace label requests over the next five working days. Record request time, release time, reason for any hold, order readiness and the applicable dispatch cutoff.

That should help distinguish an avoidable batch wait from a legitimate hold, missing data or a capacity problem. Include other shifts and order types before treating one route as typical.

If the records support a release-delay explanation, agree a small trial with the teams who own the rule. Compare the same order family, misses and error rates; keep the checks that protect correct dispatch. The [PDCA example](/notes/pdca-cycle-example/) shows how to structure that trial.

[Vrolen's continuous-improvement guide](https://vrolen.com/blog/continuous-improvement-manufacturing/) connects observations like these to problem selection, testing and follow-up. A walk is the start of that work, not a completed improvement.

Return to the team with what the records showed and what will happen next. Otherwise, they have spent time explaining a problem and still have to work around it tomorrow.

## Sources and example notes

- Lean Enterprise Institute. [Gemba](https://www.lean.org/lexicon-terms/gemba/). Direct observation, inquiry and following work across functions.
- John Shook, Lean Enterprise Institute. [How to Go to the Gemba: Go See, Ask Why, Show Respect](https://www.lean.org/the-lean-post/articles/how-to-go-to-the-gemba-go-see-ask-why-show-respect/). Purpose, process, people and understanding the situation before diagnosing it.

The order, timestamps, explanations and proposed follow-up are fictional. The follow-up is designed to find out how often this happens and why.
