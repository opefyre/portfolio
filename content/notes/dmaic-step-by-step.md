---
title: DMAIC step by step: a Lean Six Sigma project from problem to control
date: 2026-09-29
summary: A practical walk through Define, Measure, Analyze, Improve and Control on one real-world style problem, with the tools for each phase, the questions to ask at every tollgate, and when DMAIC is the wrong tool.
status: published
topic: Operational excellence
keywords: DMAIC, Lean Six Sigma, Six Sigma, define measure analyze improve control, process improvement, root cause analysis, SIPOC, measurement system analysis, control plan, operational excellence
---

Most improvement projects fail in one of two ways. Either the team jumps to a solution before understanding the problem, or it understands the problem beautifully and the gain quietly fades six months later. DMAIC is designed to stop both.

It's the problem-solving backbone of Six Sigma, which Bill Smith introduced at Motorola in 1986. (Motorola's original version was MAIC; the Define phase came later, once companies learned how many projects failed for lack of a clear problem.) It works just as well in an office as on a production line. This note walks through all five phases on one example, with the tools that matter in each.

:::card The short version
DMAIC is five questions, asked in order, with evidence required before moving on:
1. **Define:** what's the problem, for whom, and what does success look like?
2. **Measure:** how big is it really, and can we trust our data?
3. **Analyze:** what's causing it? Proven, not assumed.
4. **Improve:** what fixes the causes, and does the fix work in a pilot?
5. **Control:** how do we make sure the gain holds after the project team leaves?
:::

:::grid
- **Define** Charter, SIPOC, voice of the customer. Output: a problem everyone agrees on.
- **Measure** Operational definitions, measurement system check, baseline. Output: a trusted number.
- **Analyze** Fishbone, stratification, hypothesis tests. Output: verified root causes.
- **Improve** Solution selection, pilot, risk check. Output: a proven fix.
- **Control** Control plan, SPC, standard work, handover. Output: a gain that lasts.
:::

## The example: giving product away

A food plant fills 500 g packs of rice on a 12-head filling machine, about 2 million packs a year. The plant's rule: the average must be at least 500 g, and no pack may go below 495 g. Every gram above 500 is product given away for free. Finance suspects the giveaway is large, but nobody knows how large.

## Define: agree on the problem

The first deliverable is a short project charter. The hard part is the problem statement. It should describe the gap in numbers, without blaming anyone and without hinting at a solution.

| Charter element | Example |
| --- | --- |
| Problem statement | Average pack weight on Line 3 is estimated at 505 to 510 g against a 500 g label, costing an estimated €50k to €60k a year in product given away |
| Goal | Reduce average giveaway by at least 50% by the end of Q2, with no pack below 495 g |
| Scope | Line 3 filler, 500 g rice packs. Out of scope: other lines, packaging material |
| Team | Line lead, maintenance technician, quality analyst, a process engineer as project lead |
| Sponsor | Plant manager |

Then map the process at a high level with a **SIPOC**, so everyone sees the same boundaries:

| Suppliers | Inputs | Process | Outputs | Customers |
| --- | --- | --- | --- | --- |
| Rice supplier, film supplier, maintenance | Rice, film, filler settings | Feed, weigh, fill, seal, check-weigh | Filled 500 g packs | Retailers, consumers, finance |

Notice what the goal is *not*: "install a new filler". That's a solution, and it doesn't belong in Define.

## Measure: get a number you can trust

**First, check the measuring device.** Before collecting a baseline, the team runs a measurement system analysis on the check-weigher: several people weigh the same packs several times. If the scale's own variation is a big share of the process variation, every conclusion after this is built on sand. A common rule of thumb from the automotive industry's MSA manual: under 10% of the variation from the measurement system is good, 10% to 30% may be acceptable, above 30% is not.

**Then collect a baseline.** Five packs every hour from each shift for two weeks gives a solid picture:

:::formula Baseline
Mean weight = **507.4 g**, standard deviation = **3.1 g**
Giveaway = 7.4 g × 2,000,000 packs = 14.8 tonnes a year
At €4 a kilo: **€59,200 a year**
:::

Now the project has a real number. It also has a clue: with a spread of 3.1 g, operators had nudged the target upwards to stay safely away from 495 g.

## Analyze: find the causes, and prove them

Brainstorm possible causes with a fishbone (people, methods, machines, materials, measurement, environment), then test the likely ones with data. The rule in Analyze is simple: *a cause isn't a root cause until the data says so.*

| Suspected cause | How it was tested | Result |
| --- | --- | --- |
| Some filler heads fill differently | Weights split by head, compared with an ANOVA test | **Confirmed.** Heads 4 and 9 run lower and far more erratically |
| Worn valve seals on those heads | Inspection, then weights before and after swapping seals on one head | **Confirmed.** Spread on that head fell by more than half |
| Operators set a high target to compensate | Settings log compared with shift reports | **Confirmed.** Target raised twice after low-weight rejects |
| Rice from the second supplier is denser | Weights split by supplier lot | Not confirmed. No meaningful difference |

This is the phase where DMAIC saves the most money, because it stops you from fixing things that aren't broken. The supplier theory was the most popular one in the room, and the data didn't support it.

## Improve: fix the causes, then pilot

The fixes follow directly from the verified causes:

- Replace the worn seals, and add seal checks to the weekly preventive maintenance.
- Add a weight check per head at start-up, so a drifting head is caught in minutes, not days.
- Once the spread is down, lower the target to what the new variation safely allows.

Pilot on one shift for a week, then roll out. After the rollout:

::figure dmaic-fill | Before and after. The spread narrowed from 3.1 g to 1.2 g, so the average could come down from 507.4 g to 503.0 g while staying well clear of the 495 g minimum.

:::formula Result
New mean = **503.0 g**, standard deviation = **1.2 g**
Giveaway = 3.0 g × 2,000,000 = 6.0 tonnes a year
Saving = 14.8 − 6.0 = 8.8 tonnes, **€35,200 a year**
:::

The order matters. Lowering the target first, before reducing the spread, would have produced underweight packs. Variation came down first; the average followed.

## Control: make the gain hold

This is the phase most teams skip, and the one that decides whether the project was worth doing. The deliverable is a **control plan**: what to watch, how, how often, and what to do when it drifts.

| What | How | How often | Limit | Reaction | Owner |
| --- | --- | --- | --- | --- | --- |
| Average pack weight | Check-weigher, control chart | Every hour | Control limits from the new baseline | Stop, check heads, log cause | Line lead |
| Weight per head | Start-up check, 5 packs per head | Every start-up | Any head more than 2 g from target | Adjust or isolate the head | Operator |
| Valve seal condition | Visual and wear check | Weekly | Wear standard | Replace seal | Maintenance |
| Target setting | Settings log | Every shift | 503 g, changes need approval | Reset, escalate | Shift supervisor |

The control chart is the heart of it: it separates normal variation from a real change, so people react to signals and not to noise. [How to read one](/notes/control-charts-explained/) is its own note.

## Tollgate questions

At the end of each phase, the sponsor reviews the work before the team moves on. These are the questions worth asking:

| Phase | Ask before moving on |
| --- | --- |
| Define | Is the problem stated in numbers, with no solution hidden in it? Is the scope small enough to finish in 3 to 6 months? |
| Measure | Did we check the measurement system? Is the baseline based on enough data, over enough time? |
| Analyze | Is every root cause backed by data? Did we test the popular theories too? |
| Improve | Does each fix address a verified cause? Did a pilot show the result? What could go wrong? |
| Control | Is there a control plan with owners? Is the process owner ready to take it over? |

## When DMAIC is the wrong tool

DMAIC is thorough, which also makes it slow. Don't use it for everything:

- **The cause and fix are obvious.** Just do it, and check it worked.
- **The problem is small and local.** A one-week kaizen event with the people who do the work is faster.
- **The process doesn't exist yet.** Designing something new calls for DMADV (Define, Measure, Analyze, Design, Verify) instead.
- **The problem is mostly waste and flow, not variation.** Lean tools like value stream mapping may get you there sooner.

## A note on sigma levels

"Six Sigma" refers to a process so consistent that it produces about 3.4 defects per million opportunities. That figure assumes the conventional 1.5 sigma shift, which allows for drift over the long term. Without the shift, six sigma would mean about 0.002 defects per million, which is why some statisticians question the convention. The table uses it, as most references do:

| Sigma level | Defects per million | Yield |
| --- | --- | --- |
| 2 | 308,537 | 69.1% |
| 3 | 66,807 | 93.3% |
| 4 | 6,210 | 99.38% |
| 5 | 233 | 99.977% |
| 6 | 3.4 | 99.99966% |

Most processes never need six sigma. The point of the scale is direction: fewer defects, less variation, and the ability to prove it.

:::link https://vrolen.com | Test a fix before you touch the line
Vrolen models a production line, compares countermeasures before any change, and checks afterwards that the gain actually held.
:::

## Sources

- ASQ. [DMAIC process: define, measure, analyze, improve, control](https://asq.org/quality-resources/dmaic)
- ASQ. [What is Six Sigma?](https://asq.org/quality-resources/six-sigma)
- Barney, M. (2002). [Motorola's second generation](https://web.ist.utl.pt/ist11038/acad/gesQ/text/MotorolaSixSigma.pdf). *Six Sigma Forum Magazine*, ASQ.
- U.S. Army (2011). [Lean Six Sigma Deployment Guidebook](https://www.cool.osd.mil/army/docs/LSS_Guidebook.pdf), version 5.0, on tollgate reviews.
- Coşkun, A. & Ialongo, C. (2020). [Six Sigma revisited](https://pmc.ncbi.nlm.nih.gov/articles/PMC6999184/). *Biochemia Medica*, 30(1), on the 1.5 sigma shift.
- Automotive Industry Action Group (2010). *Measurement Systems Analysis (MSA) Reference Manual*, 4th edition.

*The plant and its numbers are illustrative.*
