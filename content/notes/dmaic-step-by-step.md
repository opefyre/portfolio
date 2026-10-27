---
title: DMAIC step by step: a Lean Six Sigma project from problem to control
date: 2026-09-29
summary: Follow a fictional filling problem through Define, Measure, Analyze, Improve and Control. See how the same approach can investigate supply-chain errors.
updated: 2026-10-27
status: published
topic: Operational excellence
keywords: DMAIC, Lean Six Sigma, Six Sigma, define measure analyze improve control, process improvement, root cause analysis, SIPOC, measurement system analysis, control plan, operational excellence
seoTitle: DMAIC step by step: a Lean Six Sigma example
seoDescription: Follow a Lean Six Sigma project through Define, Measure, Analyze, Improve and Control, with a worked example, phase tools and tollgate questions.
---

A filling line has been set high to avoid underweight packs. It protects one requirement while giving away more product than intended. Lowering the setting without understanding the variation could create a different problem.

**DMAIC means Define, Measure, Analyze, Improve and Control.** It structures an improvement project around a defined problem, trustworthy measurement, cause investigation, a tested change and follow-up. It is widely used in Six Sigma, which focuses on reducing defects and variation.

[ASQ's DMAIC guide](https://asq.org/quality-resources/dmaic) describes that five-phase process. The fictional filling example below follows it from the requirement to the operating control plan.

:::card The short version
DMAIC is five questions, asked in order, with evidence required before moving on:
1. **Define:** what's the problem, for whom, and what does success look like?
2. **Measure:** how big is it really, and can we trust our data?
3. **Analyze:** which explanations does the evidence support?
4. **Improve:** what fixes the causes, and does the fix work in a pilot?
5. **Control:** how do we make sure the gain holds after the project team leaves?
:::

:::grid
- **Define** Charter, SIPOC, voice of the customer. Output: a problem everyone agrees on.
- **Measure** Operational definitions, measurement system check, baseline. Output: a trusted number.
- **Analyze** Compare possible causes with observations and tests. Output: supported explanations.
- **Improve** Select a change, check risks and run a pilot. Output: a tested method.
- **Control** Agree operating checks, standard work and handover. Output: owners and a response when performance changes.
:::

## The example: giving product away

A food plant fills 500 g packs of rice on a 12-head filling machine, about 2 million packs a year. For this fictional example, the plant requires an average of at least 500 g and rejects packs below 495 g. These are assumed internal rules, not a statement of legal packing requirements. Every gram above 500 is product given away for free. Finance suspects the giveaway is large, but nobody knows how large.

## Define: agree on the problem

The first deliverable is a short project charter. The hard part is the problem statement. It should describe the gap in numbers, without blaming anyone and without hinting at a solution.

| Charter element | Example |
| --- | --- |
| Problem statement | Average pack weight on Line 3 is estimated at 505 to 510 g against a 500 g label, costing an estimated €50k to €60k a year in product given away |
| Goal | Reduce average giveaway by at least 50% by the end of Q2, with no pack below 495 g |
| Scope | Line 3 filler, 500 g rice packs. Out of scope: other lines, packaging material |
| Team | Line lead, maintenance technician, quality analyst, a process engineer as project lead |
| Sponsor | Plant manager |

Map the process with a **SIPOC**: Suppliers, Inputs, Process, Outputs and Customers. It gives the team a shared view of the boundary:

| Suppliers | Inputs | Process | Outputs | Customers |
| --- | --- | --- | --- | --- |
| Rice supplier, film supplier, maintenance | Rice, film, filler settings | Feed, weigh, fill, seal, check-weigh | Filled 500 g packs | Retailers, consumers, finance |

Keep equipment choices out of the problem statement until the team understands the weight variation.

## Measure: get a number you can trust

**First, check the measurement.** Compare the check-weigher with a suitable reference and repeat measurements under representative operating conditions. If the same pack gets substantially different readings, investigate that before interpreting differences between filler heads. A [gage repeatability and reproducibility study](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/gage-study/crossed-gage-r-r-study/interpret-the-results/key-results/) can help separate measurement variation from differences between parts; its design must fit the equipment and measurement method.

**Then collect a baseline.** For this teaching case, assume the team sampled across heads, shifts and two weeks and established the following baseline. A real sampling plan needs to represent the conditions the decision concerns:

:::formula Baseline
Mean weight = **507.4 g**, standard deviation = **3.1 g**
Giveaway = 7.4 g × 2,000,000 packs = 14.8 tonnes a year
At €4 a kilo: **€59,200 a year**
:::

The baseline gives the team a number to investigate. Settings records also show that operators raised the target after low-weight rejects. The team needs to understand that variation before reducing the target.

## Analyze: test the possible causes

A fishbone diagram can collect possible causes under headings such as people, methods, machines, materials, measurement and environment. Use observations and tests to check those explanations. The fictional investigation below illustrates the evidence to look for; it is not a supplied statistical dataset.

| Suspected cause | How it was tested | Result |
| --- | --- | --- |
| Some filler heads fill differently | Compare weights by head using analysis of variance (ANOVA), with checks on its assumptions | Heads 4 and 9 have lower means and greater variation in the assumed study |
| Worn valve seals on those heads | Inspection, then weights before and after swapping seals on one head | Variation fell by more than half in the assumed trial; check comparable runs and other changes |
| Operators set a high target to compensate | Settings log compared with shift reports | Records show the target was raised twice after low-weight rejects |
| Rice from the second supplier is denser | Weights split by supplier lot | The assumed sample did not establish a difference; check whether it was large enough to detect one relevant to the decision |

In this example, the evidence supports work on the filler heads and seals. It does not support changing supplier. Testing those explanations prevents the team from treating the preferred theory as a finding.

## Improve: fix the causes, then pilot

On that evidence, the team proposes these changes:

- Replace the worn seals, and add seal checks to the weekly preventive maintenance.
- Add a weight check per head at start-up, so a drifting head is caught in minutes, not days.
- After checking the revised process and low-weight rejection controls, test a lower target.

Assume a bounded pilot and follow-up support the revised method across the relevant conditions. The fictional result used here is:

::figure dmaic-fill | Fictional normal curves with means of 507.4 g and 503.0 g, and standard deviations of 3.1 g and 1.2 g. They illustrate reduced variation, not a guarantee that no pack falls below 495 g. Actual rejection controls still need verification.

:::formula Gross material-value reduction at unchanged annual volume
New mean = **503.0 g**, standard deviation = **1.2 g**
Giveaway = 3.0 g × 2,000,000 = 6.0 tonnes a year
Gross material value = (14.8 − 6.0) × 1,000 kg × €4/kg = **€35,200 a year**
:::

The €35,200 is a gross annual material-value estimate at unchanged volume and price. Deduct maintenance, testing and any additional rejection or rework costs before claiming a net saving. Lowering the mean while leaving the old variation unchanged would increase the risk of underweight packs; the mean and standard deviation alone cannot guarantee every pack meets the minimum.

## Control: make the gain hold

A **manufacturing control plan** records the characteristic to monitor, the checking method and frequency, the limit, the response and the owner. It gives the operating team a specific check and action after the improvement project.

<h3 id="control-plan-example">Control plan example: checks, limits and owners</h3>

The limits and responses below belong to this fictional filling process. Use the approved requirements for the line you are working on.

| What | How | How often | Limit | Reaction | Owner |
| --- | --- | --- | --- | --- | --- |
| Average pack weight | Check-weigher, control chart | Every hour | Control limits from the new baseline | Stop, check heads, log cause | Line lead |
| Mean by filler head | Mean of 5 consecutive packs per head | Every start-up | Mean below 501 g or above 505 g | Hold that head; investigate, correct and recheck | Operator |
| Valve seal condition | Visual and wear check | Weekly | Wear standard | Replace seal | Maintenance |
| Target setting | Settings log | Every shift | 503 g, changes need approval | Reset, escalate | Shift supervisor |

The start-up trigger applies when a head's five-pack mean is more than 2 g from the 503 g target. This action limit is separate from the hourly chart's control limits. Reject and investigate any individual pack below 495 g, even if its group's mean passes.

A control chart helps the team distinguish ordinary variation from a signal that needs investigation. [How to read one](/notes/control-charts-explained/) is its own note.

## Tollgate questions

For this project, the sponsor and team agree to review each phase before moving on. Their review questions are:

| Phase | Ask before moving on |
| --- | --- |
| Define | Is the problem stated in numbers, with no solution hidden in it? Is the scope feasible with the agreed people and time? |
| Measure | Did we check the measurement system? Is the baseline based on enough data, over enough time? |
| Analyze | Which explanations are supported? Were alternatives and possible confounding changes checked? |
| Improve | Does each fix address a verified cause? Did a pilot show the result? What could go wrong? |
| Control | Is there a control plan with owners? Is the process owner ready to take it over? |

## How Six Sigma applies in a supply chain

The same structure can investigate delivery defects. Suppose a fictional distributor records 30 late order lines out of 600 due lines in four weeks: 5%. A line is late against its confirmed delivery window, counted once. Start with that definition before comparing carriers or suppliers.

Measure promise changes, dispatch and receipt events, product mix and the measurement's completeness. Then test explanations such as a recurring release delay or an unreliable route. A later lower rate is not proof of the cause unless the investigation and comparison support it.

The [OTIF and on-time-delivery guide](/notes/otif-vs-on-time-delivery/) shows why whole orders, lines and units produce different service measures. Use the [Kaizen, Lean and Six Sigma comparison](/notes/kaizen-lean-six-sigma/) to decide how much investigation the problem needs.

Six Sigma has not been replaced by one universal successor. It remains relevant where reducing defects or variation is the job. A different problem may need flow redesign, a simple correction or a new process design instead of a full DMAIC project.

## When DMAIC is the wrong tool

Match the investigation to what remains uncertain:

- **The cause is verified and the fix is straightforward.** Make an authorised correction and check the result.
- **The problem is small and local.** A short trial with the people doing the work may be enough.
- **The process does not exist yet.** Consider a design approach such as DMADV (Define, Measure, Analyze, Design, Verify) or [3P](/notes/3p-production-preparation-process/).
- **The problem is mostly waste and flow, not variation.** Lean tools like value stream mapping may get you there sooner.

## DMAIC vs DMADV: improving a process or designing one

**DMADV means Define, Measure, Analyze, Design and Verify.** [ASQ](https://asq.org/quality-resources/dmaic) describes it for new products or services and substantial redesign. Both approaches use evidence; their later phases answer different questions.

| | DMAIC | DMADV |
| --- | --- | --- |
| Starting point | An existing process with a performance gap | A new design or an existing design needing substantial replacement |
| Five phases | Define, Measure, Analyze, Improve, Control | Define, Measure, Analyze, Design, Verify |
| In this filling context | Investigate variation on the current line, test a correction and maintain it | Define requirements for a new pack format, compare design concepts, develop and verify the selected design |
| Evidence needed | A supported cause, a tested improvement and an operating control plan | A design demonstrated to meet the agreed requirements |

The current rice-filling problem has a process to investigate, so this article follows DMAIC. A new pack format the equipment cannot handle may call for design work instead. [3P](/notes/3p-production-preparation-process/) offers a related way to explore and test process concepts before committing to equipment. Choose the approach around the work required, rather than changing the acronym on the same project.

## A note on sigma levels

"Six Sigma" refers to a process so consistent that it produces about 3.4 defects per million opportunities. That figure assumes the conventional 1.5 sigma shift, which allows for drift over the long term. For a centred normal distribution with limits six standard deviations from the mean, the two-sided tail is about 0.002 per million. Those are different assumptions. The table below uses the conventional 1.5-sigma shift:

| Sigma level | Defects per million opportunities | Share of opportunities without a defect |
| --- | --- | --- |
| 2 | 308,537 | 69.1% |
| 3 | 66,807 | 93.3% |
| 4 | 6,210 | 99.38% |
| 5 | 233 | 99.977% |
| 6 | 3.4 | 99.99966% |

Choose performance requirements for the product and its consequences. A sigma label does not replace the pack-weight specification or the checks needed to enforce it.

:::link https://vrolen.com/blog/lean-six-sigma/ | Connect variation and flow in a manufacturing problem
Vrolen's guide discusses the two kinds of evidence together. Keep the method tied to the cause being investigated rather than selecting a tool from its name.
:::

## Sources

- ASQ. [DMAIC process: define, measure, analyze, improve, control](https://asq.org/quality-resources/dmaic)
- ASQ. [What is Six Sigma?](https://asq.org/quality-resources/six-sigma)
- Barney, M. (2002). [Motorola's second generation](https://web.ist.utl.pt/ist11038/acad/gesQ/text/MotorolaSixSigma.pdf). *Six Sigma Forum Magazine*, ASQ.
- Coşkun, A. & Ialongo, C. (2020). [Six Sigma revisited](https://pmc.ncbi.nlm.nih.gov/articles/PMC6999184/). *Biochemia Medica*, 30(1), on the 1.5 sigma shift.
- [Minitab: Crossed gage R&R interpretation](https://support.minitab.com/minitab/help-and-how-to/quality-and-process-improvement/measurement-system-analysis/how-to/gage-study/crossed-gage-r-r-study/interpret-the-results/key-results/), measurement variation and study interpretation.

*The plant, observations and results are fictional. Annual material values assume 2 million packs and €4/kg throughout. The curves are normal-distribution illustrations, not observed data or a zero-defect guarantee.*
