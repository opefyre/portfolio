---
title: Proof of concept vs prototype vs MVP vs pilot
date: 2026-10-24
summary: A technical test, a usable model and a small operational rollout answer different questions. Use the evidence you need to choose the next test.
seoTitle: Proof of concept vs prototype vs MVP vs pilot
seoDescription: Compare a proof of concept, prototype, MVP and pilot through a warehouse example. See what each test can establish before approving wider rollout.
status: published
topic: Digital transformation
keywords: proof of concept vs prototype, PoC vs MVP vs pilot, prototype vs pilot, MVP meaning, proof of concept example
---

A proof of concept tests whether an approach can work. A prototype lets people inspect or try a proposed design.

A minimum viable product, or MVP, supports learning from a minimal usable product. A pilot tests an arrangement in a bounded operating setting.

Teams use these labels differently. Microsoft's [technical PoC guidance](https://learn.microsoft.com/en-us/power-bi/guidance/powerbi-migration-proof-of-concept) even notes that organisations may use names such as prototype, pilot or MVP for the same early technical work. Agree the question and evidence before deciding what to call the test.

The distinction becomes useful when someone says, “The pilot worked. Let's roll it out.” We need to know what they actually tested.

## Compare the four tests in one view

The [warehouse stage-gate example](/notes/stage-gate-review-example/) follows a day-shift scanning pilot. Its results meet the stated dispatch and picking targets, but nobody has tested overnight support.

The table below uses that established fictional setting to show different possible tests. It does not claim the team completed all four or followed this sequence.

| Test | Question to answer | Evidence to inspect | What remains open |
| --- | --- | --- | --- |
| Proof of concept | Can the scanner and warehouse transaction route work together? | A bounded technical test of the connection and recorded transaction | Whether staff can use the whole process during a shift |
| Prototype | Can staff understand and use the proposed scanning steps? | People trying the design, with observed difficulties and changes | Production reliability and sustained operating performance |
| MVP | Can a minimal usable product support meaningful learning? | Actual use of the smallest coherent product, with the learning question defined | The full feature set and whether more investment is justified |
| Pilot | Can this bounded operating arrangement work under the conditions tested? | Shift results, errors, operating ownership and support evidence | Untested shifts, sites, volumes and exceptions |

An MVP does not mean releasing a half-working stock transaction. “Minimal” limits scope; the required safety, data and operating checks still apply to the part people use. The [Lean Startup principles](https://theleanstartup.com/principles) connect an MVP to testing assumptions and learning from use.

## Start with the uncertainty that blocks the decision

If the scanner cannot post the required transaction, a technical test can resolve that uncertainty before the team trains a shift.

If the connection works but staff cannot tell a successful scan from a failed one, the team needs to inspect the user journey. Another demonstration of the connection would leave that problem untouched.

A working design may then need a bounded operating test. The team must state which users, transactions, shift conditions and support arrangements the test includes.

Those questions can overlap. A team might learn about technical limits and the interface in the same small test. It does not need four projects merely to use four labels.

## Record what the pilot actually established

In the stage-gate case, the day-shift pilot records 20 late dispatches among 1,000 orders, or 2%, and eight orders with picking errors, or 0.8%. Both meet that pilot's management targets.

Those observations describe the tested day shift. They do not establish that scanning caused the rates, and they do not test a support route at 2am.

| Evidence available | Decision it can support | Evidence still needed for the proposed rollout |
| --- | --- | --- |
| Day-shift dispatch and error records | Review the bounded pilot against its agreed targets | Check whether the next shifts face different operating conditions |
| Trained day staff | Confirm the training covered those users | Prepare and check users on the additional shifts |
| No overnight support test | Keep that readiness condition open | Test the response and recovery route with the people who will provide it |

The [handover guide](/notes/project-handover-checklist/) covers the operating responsibility behind that last row. A small pilot can expose a missing dependency precisely because someone has tried the process in use.

## Keep test results separate from spending authority

The pilot has used €8,000. The team requests a separate €40,000 rollout stage. A successful technical demonstration or a good pilot result does not authorise that spending.

The sponsor still needs to review scope, readiness, costs and the conditions for the next stage. The [stage-gate Note](/notes/stage-gate-review-example/) keeps go, hold, rework and stop visible. The [benefits review](/notes/benefits-realisation-automation/) then follows the result after delivery.

Before the next test, write one sentence naming the uncertainty it should resolve. Add the evidence required, operating boundary and person who will decide what happens next. At the review, return to those items before accepting “it worked.”

## Sources and example notes

- [Microsoft: planning a technical proof of concept](https://learn.microsoft.com/en-us/power-bi/guidance/powerbi-migration-proof-of-concept), narrow technical scope, decisions and overlapping organisational labels.
- [The Lean Startup: product learning](https://theleanstartup.com/principles), MVP and build-measure-learn.
- [The existing day-shift pilot](/notes/stage-gate-review-example/), fictional counts, targets, support gap and spending request reused here.

The comparison states the meanings used in this Note; organisations may use different labels. The candidate tests are teaching applications to the existing warehouse setting, not a record of completed experiments or a mandatory delivery sequence.
