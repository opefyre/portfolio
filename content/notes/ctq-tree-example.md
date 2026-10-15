---
title: Critical-to-quality (CTQ) tree: a worked customer requirements example
date: 2026-10-15
summary: A customer asks for reliable deliveries. Does that mean earlier, within a receiving window, complete or usable? Build a CTQ tree before deciding what to measure.
seoTitle: CTQ tree example: voice of the customer to CTQ
seoDescription: Build a CTQ tree from customer feedback. Turn reliable delivery into agreed timing, quantity and condition requirements, then test the same shipment.
status: published
topic: Continuous improvement
keywords: CTQ tree example, voice of customer to CTQ, critical to quality requirements, VOC vs CTQ, CTQ delivery example
---

**A critical-to-quality requirement, or CTQ, describes a measurable characteristic that matters to the customer. A CTQ tree breaks a broad need into the factors that matter and specific requirements you can check.** Voice of the customer, often shortened to VOC, is the evidence about what customers need and experience.

“Your deliveries need to be more reliable.”

The supplier hears that and promises earlier arrivals. The customer has a different problem: trucks arrive before the receiving shift or turn up with part of the order missing.

Moving every arrival earlier could improve the supplier's report and make the customer's morning harder. Before changing the target, find out what reliable means in that customer's work.

## VOC vs CTQ: feedback is the start of the definition

[ASQ's voice-of-customer guide](https://asq.org/quality-resources/voice-of-the-customer) describes collecting feedback and translating it into customer needs. Interviews, complaints and observation can help, but a quoted complaint does not specify every required feature.

| Part of the conversation | Example | What to confirm |
| --- | --- | --- |
| Customer voice | “Deliveries are unreliable” | Which deliveries, and what happened? |
| Need | Receive usable supply without disrupting the shift | Whether this captures the customer's actual problem |
| Driver | Predictable timing, complete supply, usable condition | Which aspects matter for this service |
| Measurable requirement | A stated receiving window, quantity and acceptance rule | The exact definition, evidence and customer agreement |

The [SIPOC example](/notes/sipoc-diagram-example/) helps identify the process output and its customer. Here, the receiving team and the people scheduling production may need different things from the same delivery. Speak to both before assuming purchasing's summary covers them.

## Build a CTQ tree from the delivery problem

Our fictional customer orders 100 units of one item for an agreed delivery date. Its receiving shift needs arrivals between 08:00 and 10:00. Production needs the full quantity in usable condition.

Those details are proposed requirements until the customer confirms them. Record the conversation and the reason for each boundary, rather than treating a number chosen in a workshop as a customer specification.

The [Chartered Quality Institute's CTQ-tree explanation](https://www.quality.org/file-download/download/public/23803) separates needs, quality drivers and performance criteria. The tree below is our own delivery example.

::interactive ctq-requirements-tree | Original fictional CTQ tree. The timing, quantity and condition branches are proposed interpretations to validate with the customer. The numbers are invented for this example, not industry targets.

A request for live tracking might emerge during the discussion. Ask what it would help the customer do. If the need is to reschedule people when a delivery will be late, the requirement may concern the timing and accuracy of an exception notice. A tracking screen is one possible solution.

Add that requirement only if it addresses this customer's problem, and agree how to check it.

## Write a requirement someone else can measure

A number still needs a definition. “On time” could refer to departure, arrival at the gate, unloading or accepted receipt.

For the comparison below, both parties have agreed these fictional rules:

| Characteristic | Agreed rule for this example | Evidence needed |
| --- | --- | --- |
| Receiving time | Arrival/receipt at the named customer dock from 08:00 through 10:00 on the agreed date | Dated customer receipt record |
| Complete supply | All 100 correct-item units received by 10:00 | Order identity and cumulative received quantity |
| Usable condition | Delivered units meet the agreed product and packaging requirements | Inspection or acceptance evidence linked to the receipt |

This simple record treats arrival and receipt as one event. If a truck can wait outside for an hour, separate those timestamps before using the rule in a real review.

Keep specification limits separate from improvement targets. A customer-agreed receiving window defines conformity here. An internal aim to reduce average transport time describes a different objective. The process does not earn wider limits because it currently struggles to meet them.

## Test one delivery against two timing rules

A shipment arrives at 07:30 with all 100 correct units and no recorded damage. It passes a rule that says only “by 10:00.” It fails the agreed 08:00 to 10:00 receiving window.

Nothing about the shipment changed. The first definition omitted the customer's earliest acceptable time.

::interactive ctq-delivery-check | Fictional order for 100 units on its agreed date, with one receipt and known quantity and condition. Compare an upper deadline with an inclusive receiving window. Both use the same shipment. Damage is the only condition failure modelled; a real product needs its own agreed acceptance checks.

Change the arrival to 09:30. The timing checks now agree. Reduce the quantity to 80 and both views fail the complete-supply requirement. Restore 100 but mark five damaged: the quantity arrived, yet only 95 units are usable.

At 10:30, none of those units arrived by the deadline. A complete delivery after 10:00 is still late.

The [OTIF worked example](/notes/otif-vs-on-time-delivery/) extends this into a score across several orders. Define the requirements first, then decide how orders, lines or units contribute to the report.

## Agree the requirement before assessing the process

Review the draft tree with the customer. Confirm scope, units, event, window, acceptance method and how exceptions or revised promises are recorded. Keep the original requirement identifiable when an agreement changes.

For a system project, put the agreed requirements into a [traceability matrix](/notes/requirements-traceability-matrix-example/) so they reach the design and the tests. “Reliable delivery” alone gives a developer little basis for choosing the correct timestamp or warning.

For a production characteristic, the next question may be whether the process can meet the specification consistently. [Cp and Cpk](/notes/process-capability-cp-cpk/) assess capability under appropriate conditions; they do not decide what the customer should accept. Check the measurement method and process stability before using those indices.

A delivery discussion does not need a large tree. For this customer, three clear branches expose the important disagreement. Take those definitions back to the people receiving the goods before spending time improving the wrong version of reliability.

## Sources and example notes

- [ASQ: Voice of the Customer](https://asq.org/quality-resources/voice-of-the-customer). Gathering customer evidence and translating stated features or complaints into needs.
- [Chartered Quality Institute: Critical to Quality Trees](https://www.quality.org/file-download/download/public/23803), Darren O'Neill. Need, driver and measurable performance-criteria structure.

The customer, order, limits and deliveries are fictional. The tree proposes the requirements. The delivery comparison assumes the customer has agreed them and tests one shipment against those rules.
