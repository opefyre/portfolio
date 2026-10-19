---
title: Scaling AI in manufacturing: what changes at plant two?
date: 2026-10-14
summary: The pilot reduced overtime at one factory. Before rolling it out, check whether the next plant has the same problem, the same data and enough savings to cover the work.
seoTitle: Scaling AI in manufacturing: beyond the pilot
seoDescription: Follow an AI pilot into a second factory. Compare local data, operating conditions and rollout costs before copying the first site's business case.
updated: 2026-10-19
status: published
topic: Industrial AI
keywords: scaling AI in manufacturing, manufacturing AI pilot to production, multi-site AI deployment, industrial AI ROI
---

An AI application helps a packaging team find recurring faults. The team fixes them, overtime spending falls, and management wants to put the application in the other factories.

At the second plant, the fault records look familiar. The columns even have the same names. But a stop code includes events that the first plant records separately, and the supervisors have less time to investigate warnings.

Copying the software is straightforward compared with checking all of that. The question is whether it can help this plant enough to justify the cost of using it.

That's the difficulty with scaling AI in manufacturing. A successful pilot gives you a place to start. You still have to find out which parts of its success will travel.

## What did the pilot actually prove?

Deloitte's [2026 manufacturing AI survey](https://www.deloitte.com/de/de/Industries/industrial-construction/research/ai-in-manufacturing.html), covering more than 140 manufacturing organisations, reports that 84% see measurable AI value. Around one in five use cases has scaled consistently across sites or the enterprise.

Reported value at one site and consistent use across sites measure different things. An application that stays at one plant may still be worth having.

Take the packaging application. In our fictional example, Plant A cuts annual overtime and rework spending by €60,000. Support costs €12,000 a year, and the team can trace the spending reduction to the changes it made.

Plant B has shorter production runs. Its operators already catch some of the faults A needed help finding. Even with the same model, there may be less spending left to reduce.

Before putting A's saving into B's proposal, find out what B currently loses and what people there could do differently.

## Does 80% of AI work really fail?

The often-repeated figure does not describe the same measure as the manufacturing scaling survey. [RAND's 2024 report](https://www.rand.org/pubs/research_reports/RRA2680-1.html) cites an estimate that more than 80% of AI projects fail. Its own research interviewed 65 experienced data scientists and engineers to investigate why projects struggle. Those interviews did not measure a population-wide 80% failure rate.

That distinction matters for our packaging application. The application may work at Plant A yet need substantial changes at B. Each site also needs enough benefit to cover its additional setup, support and review work.

Use RAND's findings to investigate issues such as problem definition, data and the fit with normal work. Do not use the quoted percentage as the probability that Plant B will fail. Its proposal needs B's evidence.

## The same stop code can mean different things

At A, the label STOP means an unplanned breakdown. At B, it also includes planned changeovers.

An analysis copied from A could treat those changeovers as breakdown losses. The model would then be investigating a problem that the records have partly invented.

::figure scale-ai-local-meaning | Fictional stop records. Plant B groups planned changeovers with breakdowns. Separate them before using A's fault analysis at B.

Start with a few events people remember. Compare the log with what happened on the floor, then agree which events belong together. Vrolen's [downtime tracking guide](https://vrolen.com/blog/production-downtime-tracking/) covers how to define those records, including the difference between where a stop began and which machines it affected.

The same check applies to the action that follows a warning.

| At the pilot plant | Before using it at the next plant |
| --- | --- |
| A fault pattern appears in the records | Check that the same fault happens and is recorded the same way |
| A supervisor acts on a recommendation | Check who can act, including on nights and during short runs |
| Overtime and rework spending falls | Identify comparable spending that this plant could actually reduce |
| An operator checks doubtful recommendations | Allow time for that work and decide who handles an unresolved case |
| The application connects to the line's systems | Price the local connections and their ongoing support |

NIST's [2026 smart manufacturing roadmap](https://www.nist.gov/publications/2026-roadmap-artificial-intelligence-and-machine-learning-smart-manufacturing) identifies differences in industrial data and sensing and control systems as deployment challenges. A shared column name doesn't remove those differences.

## What plant two does to the business case

Suppose the review puts B's annual spending reduction at €30,000. B also needs €30,000 of local setup, compared with €10,000 at A.

The shared application costs €40,000 to develop once. Both plants need €12,000 a year in support.

For this comparison, give each plant a full operating year after launch and charge setup against that year. The figures are fictional.

| Input | Plant A | Plant B |
| --- | ---: | ---: |
| Annual overtime and rework saving | €60,000 | €30,000 |
| Annual support | €12,000 | €12,000 |
| Local setup, paid once | €10,000 | €30,000 |
| First-year balance before shared development | €38,000 | −€12,000 |

Including the €40,000 shared development cost, the two plants finish that first operating year **€14,000 short of covering the project costs**.

Copy A's saving and setup cost into B, though, and the proposal shows €36,000 left over. That is a €50,000 difference without changing anything about A's result.

::interactive scale-ai-rollout | Fictional costs and savings. Compare B's local estimate with a proposal that copies A's inputs. Both plants receive a full operating year; shared development is paid once.

The first-year shortfall doesn't automatically make this a bad investment. On these inputs, the plants together save €66,000 a year after recurring support. The decision also depends on how long the application remains useful, when the savings arrive and what further work it needs.

There is another distinction if A is already running and its development bill is paid. Adding B then means judging B's future saving against its additional setup and support. Don't charge B for the shared build all over again.

Here, savings mean expenses that fall. If the application instead releases staff time, the [automation benefits note](/notes/benefits-realisation-automation/) explains what has to happen before that becomes money the company stops spending.

## Try it on B's difficult work

A test on B should include the conditions that differ from A: shorter runs, different products and shifts with fewer people available to act.

Run recommendations alongside the existing process first. Keep the recommendation, what the supervisor did with it and why. If the suggestion was correct but nobody could act before the run ended, the test has found something the rollout must solve.

For a change worth trying, agree how to check the result. Compare similar products and volumes, record other changes made at the same time, and look for the spending reduction the proposal depends on.

A low override count is a poor substitute for that review. An operator who stops a bad recommendation may be doing exactly what the process needs.

:::link https://www.youtube.com/watch?v=rs1NfE8DNAc | Watch Vrolen's 5 Whys example
The video follows a wrong-size delivery back through the picking process. Check the explanation with evidence before repeating a fix at another site.
:::

## What should become easier at plant three?

After B, the team should know which code, data definitions and checks it can reuse. It should also have a more realistic estimate of the local work: connections, training, support and changes to the way people respond.

That is part of what I'm building [Vrolen](/work/vrolen/) around: keeping the operating problem, the evidence, the proposed change and the result connected.

Before approving plant three, ask the team to show how B's actual result compared with its proposal. If B took twice the setup effort and delivered half the expected saving, that belongs in the next estimate, even if A remains a success.

## Sources

- RAND (2024). [The Root Causes of Failure for Artificial Intelligence Projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html). Interview study of 65 practitioners; the more-than-80% figure is a cited estimate, not its own measured failure rate.

- Deloitte. [AI in Manufacturing 2026](https://www.deloitte.com/de/de/Industries/industrial-construction/research/ai-in-manufacturing.html). Survey of more than 140 manufacturing organisations. Reported AI value and consistent scaling are different measures.
- NIST, 3 July 2026. [2026 Roadmap on Artificial Intelligence and Machine Learning for Smart Manufacturing](https://www.nist.gov/publications/2026-roadmap-artificial-intelligence-and-machine-learning-smart-manufacturing). Industrial data and system differences.

*Plants A and B, their results and costs are fictional. The comparison assumes a full operating year at each plant, no launch delay, no overlapping benefits, no tax or discounting, and spending reductions attributable to the changes. Calculation details are available below the interactive example.*
